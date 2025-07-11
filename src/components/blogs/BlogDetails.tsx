import { getBlogById } from "@/api/blogApi";
import { Blog } from "@/types";
import React, { useState, useEffect } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import AuthorDisplay from "./AuthorDisplay";

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
      <div className="bg-white h-max rounded-xl p-4 px-0">
        {/* Main Content */}
        <article className="px-10">
          {/* gallery image */}
          <div className="-mb-2 aspect-[16/5] overflow-hidden rounded-lg">
            <img
              src={currentBlog?.blogImage?.heroImage}
              alt={currentBlog?.blogImage?.description || "Blog image"}
              className="w-full h-full cursor-pointer object-cover"
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
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                {currentBlog?.publishedDate &&
                  new Date(currentBlog.publishedDate).toLocaleDateString(
                    "en-GB",
                    {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )}
              </div>
            </div>

            {/* Category Tags - Fixed to use tag objects */}
            <div className="mb-2 flex flex-wrap gap-2">
              {currentBlog?.tags?.map((tag: any, index: number) => {
                const tagName = typeof tag === "string" ? tag : tag?.name;

                typeof tag === "object" && tag?.color ? tag.color : "gray";

                let bgClass = "bg-blue-500";

                return (
                  <span
                    key={index}
                    className={`inline-block rounded-xl px-3 py-1 text-xs font-medium text-white ${bgClass}`}
                  >
                    {tagName}
                  </span>
                );
              })}
            </div>

            {/* Title */}
            <h1 className="mb-3 text-3xl font-bold leading-tight">
              {currentBlog?.title}
            </h1>

            {/* Author Info */}
            <div className=" bg-gray-200 mb-4 flex w-fit capitalize items-center gap-1 rounded-full p-1.5 px-4">
              {/* <span className="font-medium">{currentBlog?.author}</span> */}
              <AuthorDisplay blog={currentBlog} />
            </div>
          </header>

          {/* Article Content */}
          {/* <div className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-normal">
            {formatContent(currentBlog.content)}
          </div> */}
          <div
            className="prose max-w-none text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: currentBlog?.content }}
          />
        </article>
      </div>
    </>
  );
};

export default BlogDetails;
