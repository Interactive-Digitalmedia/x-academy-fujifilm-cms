import { getBlogById } from "@/api/blogApi";
import { Blog } from "@/types";
import React, { useState, useEffect } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";

interface BlogDetailsProps {}

const BlogDetails: React.FunctionComponent<BlogDetailsProps> = () => {
  const location = useLocation();
  const { blogId } = useParams();
  const [currentBlog, setCurrentBlog] = useState<Blog>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        if (location.state?.blog) {
          setCurrentBlog(location.state.blog);
          return;
        }
        if (blogId) {
          const res = await getBlogById(blogId);
          setCurrentBlog(res.data);
        }
      } catch (err) {
        console.error("Error loading blog:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [blogId]);

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
  // const formatContent = (content: string) => {
  //   return content
  //     .split("\n\n")
  //     .filter((paragraph) => paragraph.trim())
  //     .map((paragraph, index) => (
  //       <p
  //         key={index}
  //         className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300"
  //       >
  //         {paragraph.trim()}
  //       </p>
  //     ));
  // };

  return (
    <>
      {/* <SearchBar /> */}
      <div className="bg-white h-max rounded-xl p-4">
        {/* Main Content */}
        <article className="px-10">
          {/* gallery image */}
          <div className="-mb-2 max-h-[384px] overflow-hidden rounded-lg">
            <img
              src={currentBlog?.blogImage?.heroImage}
              alt={currentBlog?.blogImage?.description || "Blog image"}
              className="h-full w-full cursor-pointer object-cover md:h-96 lg:h-[500px]"
              // onClick={() => {
              //   // Cycle through gallery images on click
              //   setCurrentImageIndex((prev) =>
              //     prev === currentBlog.gallery.length - 1 ? 0 : prev + 1
              //   );
              // }}
            />
          </div>
          {/* Article Header */}
          <header className="">
            {/* Published Date */}
            <div className="mb-2 mt-4 flex items-center justify-between space-x-2">
              <div className="text-sm font-medium">
                {currentBlog?.publishedDate}
              </div>
            </div>

            {/* Category Tags - Fixed to use tag objects */}
            <div className="mb-2 flex flex-wrap gap-2">
              {currentBlog?.tags?.map((tag: any, index: number) => (
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
                  {tag?.name}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-2 text-3xl font-bold leading-tight">
              {currentBlog?.title}
            </h1>

            {/* Author Info */}
            <div className="card mb-4 flex w-fit items-center gap-1 rounded-full p-1.5">
              <span className="font-medium">{currentBlog?.author}</span>
            </div>
          </header>

          {/* Article Content */}
          {/* <div className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-normal">
            {formatContent(currentBlog.content)}
          </div> */}
          <div
            className=" max-w-none text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: currentBlog?.content }}
          />
        </article>
      </div>
    </>
  );
};

export default BlogDetails;
