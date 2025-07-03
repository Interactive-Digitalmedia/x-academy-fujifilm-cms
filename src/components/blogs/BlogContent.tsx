import * as React from "react";
// import StaticEditor from "../ui/basiceditor";
import { Blog } from "@/types";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

interface BlogContentProps {
  blogData: Partial<Blog>;
  updateBlogData: (field: keyof Blog, value: any) => void;
}

const BlogContent: React.FunctionComponent<BlogContentProps> = ({
  blogData,
  updateBlogData,
}) => {
  const [, setWordCount] = React.useState(0);
  const [, setCharCount] = React.useState(0);

  // Calculate word and character count
  React.useEffect(() => {
    const text = blogData.content || "";
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    setWordCount(words);
    setCharCount(text.length);
  }, [blogData.content]);

  const handleContentChange = (value: string) => {
    updateBlogData("content", value);
  };

  // const estimatedReadingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/minute

  return (
    <div className="space-y-3 ml-6 mr-6 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Blog Content</h2>

      {/* Content Statistics */}
      {/* <div className="flex gap-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <div>
          <span className="font-medium">Words:</span> {wordCount}
        </div>
        <div>
          <span className="font-medium">Characters:</span> {charCount}
        </div>
        <div>
          <span className="font-medium">Estimated reading time:</span>{" "}
          {estimatedReadingTime} min
        </div>
      </div> */}

      {/* Content Textarea */}
      {/* <StaticEditor value={blogData?.content} onChange={handleContentChange} /> */}
      <RichTextEditor
        value={blogData.content || ""}
        onChange={handleContentChange}
      />
      {/* Content Guidelines */}

      {/* Preview Section */}
      {/* {blogData.content && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Content Preview
          </label>
          <div className="bg-white border border-gray-200 rounded-lg p-6 max-h-64 overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              {blogData.content.split("\n").map((paragraph, index) =>
                paragraph.trim() ? (
                  <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                    {paragraph}
                  </p>
                ) : (
                  <br key={index} />
                )
              )}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default BlogContent;
