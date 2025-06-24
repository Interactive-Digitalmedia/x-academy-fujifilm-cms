import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { Bookmark, ChevronLeft, Upload } from "lucide-react";
import { dummyBlogs } from "@/pages/Blogs/Blogs";
import { Button } from "@nextui-org/react";

interface BlogDetailsProps {}

const BlogDetails: React.FunctionComponent<BlogDetailsProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { blogSlug } = useParams();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const blog = location.state?.blog; // Fixed: now correctly accessing blog object

  const [currentBlog, setCurrentBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper function to create slug (same as in BlogsDirectory)
  const slugify = (title: string) =>
    title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Helper function to find blog by slug
  const findBlogBySlug = (slug: string) => {
    return dummyBlogs.find((blogItem) => slugify(blogItem.title) === slug);
  };

  useEffect(() => {
    const loadBlog = () => {
      try {
        setLoading(true);

        // Method 1: Try to get blog from navigation state (fastest)
        if (blog) {
          console.log("Loading blog from navigation state");
          setCurrentBlog(blog);
          setLoading(false);
          return;
        }

        // Method 2: Find blog by slug from URL (works when someone visits URL directly)
        if (blogSlug) {
          console.log("Loading blog by slug:", blogSlug);
          const foundBlog = findBlogBySlug(blogSlug);

          if (foundBlog) {
            setCurrentBlog(foundBlog);
            setLoading(false);
            return;
          }
        }

        // If we get here, blog not found
        setLoading(false);
      } catch (err) {
        console.error("Error loading blog:", err);
        setLoading(false);
      }
    };

    loadBlog();
  }, [blogSlug, blog]);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading blog...</p>
        </div>
      </div>
    );
  }

  // Error state - redirect to blogs directory
  if (!currentBlog) {
    console.error("Blog not found, redirecting...");
    return <Navigate to="/blogs" replace />;
  }

  // Format content paragraphs
  const formatContent = (content: string) => {
    return content
      .split("\n\n")
      .filter((paragraph) => paragraph.trim())
      .map((paragraph, index) => (
        <p
          key={index}
          className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
        >
          {paragraph.trim()}
        </p>
      ));
  };

  return (
    <>
      {/* <SearchBar /> */}
      <div className="bg-white h-max rounded-xl p-4">
        {/* Navigation Breadcrumb */}
        {/* <div className="">
          <div className="">
            <div className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate(-1)}
                className="focus:outline-none"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {pathSegments.map((segment, index) => {
                const isLast = index === pathSegments.length - 1;
                return (
                  <React.Fragment key={index}>
                    {index > 0 && <span className="text-gray-500">/</span>}
                    <span
                      className={
                        isLast
                          ? "font-medium capitalize text-gray-900 dark:text-white"
                          : "cursor-pointer capitalize text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      }
                      onClick={() => {
                        if (!isLast && segment === "blogs") {
                          navigate("/blogs");
                        }
                      }}
                    >
                      {segment === "blogs"
                        ? "Blogs"
                        : decodeURIComponent(segment).replace(/-/g, " ")}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div> */}

        {/* Main Content */}
        <article className="px-10">
          {/* gallery image */}
          <div className="-mb-2 max-h-[250px] overflow-hidden rounded-lg">
            <img
              src={currentBlog.gallery[currentImageIndex]}
              alt={currentBlog.title}
              className="h-64 w-full cursor-pointer object-cover md:h-96 lg:h-[500px]"
              onClick={() => {
                // Cycle through gallery images on click
                setCurrentImageIndex((prev) =>
                  prev === currentBlog.gallery.length - 1 ? 0 : prev + 1
                );
              }}
            />
          </div>
          {/* Article Header */}
          <header className="">
            {/* Published Date */}
            <div className="mb-2 mt-4 flex items-center justify-between space-x-2">
              <div className="text-sm font-medium">
                {currentBlog.publishedDate}
              </div>
              {/* <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  className="h-10 w-10 rounded-full p-0"
                  radius="full"
                  variant="flat"
                >
                  <Bookmark size={16} />
                </Button>
                <Button
                  isIconOnly
                  className="h-10 w-10 rounded-full p-0"
                  radius="full"
                  variant="flat"
                >
                  <Upload size={16} />
                </Button>
              </div> */}
            </div>

            {/* Category Tags - Fixed to use tag objects */}
            <div className="mb-2 flex flex-wrap gap-2">
              {currentBlog.tags?.map((tag: any, index: number) => (
                <span
                  key={index}
                  className={`inline-block rounded-md px-3 py-1 text-xs font-medium text-white ${
                    tag.color === "blue"
                      ? "bg-blue-500"
                      : tag.color === "green"
                        ? "bg-green-500"
                        : tag.color === "purple"
                          ? "bg-purple-500"
                          : tag.color === "orange"
                            ? "bg-orange-500"
                            : "bg-gray-500"
                  }`}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-2 text-3xl font-bold leading-tight">
              {currentBlog.title}
            </h1>

            {/* Author Info */}
            <div className="card mb-4 flex w-fit items-center gap-1 rounded-full p-1.5">
              <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                {currentBlog.authorAvatar ? (
                  <img
                    src={currentBlog.authorAvatar}
                    alt={currentBlog.author}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-medium">
                    {currentBlog.author.charAt(0)}
                  </span>
                )}
              </div>
              <span className="font-medium">{currentBlog.author}</span>
            </div>
          </header>

          {/* Featured Image Gallery - Now properly using gallery array */}

          {/* Image Gallery Thumbnails */}
          {/* {currentBlog.gallery.length > 1 && (
              <div className="flex justify-center space-x-2">
                {currentBlog.gallery.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-16 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                      index === currentImageIndex
                        ? "border-blue-500 opacity-100"
                        : "border-gray-200 opacity-60 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${currentBlog.title} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )} */}

          {/* Article Content */}
          <div className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-normal">
            {formatContent(currentBlog.content)}
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogDetails;
