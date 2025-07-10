import AuthorDisplay from "@/components/blogs/AuthorDisplay";
import { Blog } from "@/types";

interface BlogsGridProps {
  blogs: Blog[];
  handleBlogClick: (blog: Blog) => void;
}

const BlogsGrid: React.FunctionComponent<BlogsGridProps> = ({
  blogs,
  handleBlogClick,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-3 gap-4 justify-items-center">
      {blogs?.map((blog) => (
        <div
          key={blog?._id}
          onClick={() => {
            handleBlogClick(blog);
          }}
          className=" cursor-pointer rounded-lg shadow-md transition-all hover:shadow-md bg-[#F4F4F4]"
        >
          {/* Blog Image */}
          <div className="relative overflow-hidden">
            <div className="rounded-lg relative aspect-[16/10] p-2">
              <img
                src={blog?.blogImage?.heroImage}
                alt={blog?.blogImage?.description || "Blog image"}
                className="h-full w-full  rounded-lg object-cover"
              />
            </div>

            {/* Category Badge */}
            <div className="absolute left-4 top-4">
              <span className="rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                {blog?.tags[0] || "General"}
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="px-4">
            <span
              className={`inline-block rounded-md capitalize px-2 text-xs font-medium ${
                blog?.status === "publish"
                  ? "bg-green-100 text-green-800"
                  : "bg-orange-100 text-orange-800"
              }`}
            >
              {blog?.status}
            </span>
          </div>

          {/* Blog Content */}
          <div className="px-4 pb-4 pt-1 flex flex-col justify-between">
            <h3 className="mb-3 line-clamp-2 text-base font-medium text-gray-900 dark:text-white">
              {blog?.title}
            </h3>

            {/* Author Info */}
            <AuthorDisplay blog={blog} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsGrid;
