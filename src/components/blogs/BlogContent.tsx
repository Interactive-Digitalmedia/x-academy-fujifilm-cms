import * as React from "react";

interface BlogContentProps {
  // Add props here when you know what data this step needs
  // For example:
  // content: string;
  // setContent: (content: string) => void;
}

const BlogContent: React.FunctionComponent<BlogContentProps> = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Blog Content
      </h2>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4 min-h-[400px]">
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <p className="text-lg">Rich Text Editor</p>
              <p className="text-sm">Write your blog content here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
