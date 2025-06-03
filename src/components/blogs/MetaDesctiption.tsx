import * as React from "react";

interface MetaDescriptionProps {
  // Add props here when you know what data this step needs
  // For example:
  // metaTitle: string;
  // setMetaTitle: (title: string) => void;
  // metaDescription: string;
  // setMetaDescription: (description: string) => void;
}

const MetaDescription: React.FunctionComponent<MetaDescriptionProps> = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Meta Description
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Meta Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            placeholder="Enter meta title for SEO"
          />
          <p className="text-xs text-gray-500">Recommended: 50-60 characters</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Meta Description
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 resize-none"
            placeholder="Enter meta description for SEO"
          />
          <p className="text-xs text-gray-500">
            Recommended: 150-160 characters
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Keywords (Optional)
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            placeholder="Enter keywords separated by commas"
          />
          <p className="text-xs text-gray-500">
            Example: blog, tutorial, web development
          </p>
        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            SEO Preview
          </h3>
          <div className="space-y-1">
            <div className="text-blue-600 text-lg hover:underline cursor-pointer">
              Your Blog Title Here
            </div>
            <div className="text-green-700 text-sm">
              https://yourwebsite.com/blog/your-blog-post
            </div>
            <div className="text-gray-600 text-sm">
              Your meta description will appear here. This is how your blog post
              will look in search engine results.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaDescription;
