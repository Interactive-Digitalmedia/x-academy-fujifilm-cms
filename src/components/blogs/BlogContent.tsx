import * as React from "react";
import { Textarea } from "@nextui-org/react";

interface BlogData {
  title: string;
  author: string;
  publishingDate: any;
  tags: any[];
  heroImage: {
    file: any;
    url: string;
    description: string;
  };
  content: string;
  cta: {
    text: string;
    link: string;
  };
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

interface BlogContentProps {
  blogData: BlogData;
  updateBlogData: (field: keyof BlogData, value: any) => void;
}

const BlogContent: React.FunctionComponent<BlogContentProps> = ({
  blogData,
  updateBlogData,
}) => {
  const [wordCount, setWordCount] = React.useState(0);
  const [charCount, setCharCount] = React.useState(0);

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

  const estimatedReadingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/minute

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Blog Content
      </h2>

      {/* Content Statistics */}
      <div className="flex gap-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
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
      </div>

      {/* Content Textarea */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Blog Content
        </label>
        <Textarea
          value={blogData.content}
          onValueChange={handleContentChange}
          placeholder="Start writing your blog content here...&#10;&#10;You can write in plain text for now. Rich text editor will be added later.&#10;&#10;Include your main content, paragraphs, and any text formatting you need."
          minRows={15}
          maxRows={25}
          classNames={{
            inputWrapper: "bg-gray-50 border border-gray-200",
            input: "text-gray-800 resize-none",
          }}
        />
      </div>

      {/* Content Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          Content Guidelines:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Aim for 800-2000 words for optimal SEO performance</li>
          <li>• Use clear paragraphs and sections for better readability</li>
          <li>• Include relevant keywords naturally throughout your content</li>
          <li>• Add a compelling introduction and conclusion</li>
          <li>• Rich text formatting will be available in the next update</li>
        </ul>
      </div>

      {/* Preview Section */}
      {blogData.content && (
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
      )}
    </div>
  );
};

export default BlogContent;
