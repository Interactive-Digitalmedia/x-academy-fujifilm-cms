import * as React from "react";
import { X } from "lucide-react";
import { Blog } from "@/types";

interface MetaDescriptionProps {
  blogData: Partial<Blog>;
  updateBlogData: (field: keyof Blog, value: any) => void;
}
type MetaDataKey = "slug" | "metaTitle" | "metaDescription" | "keywords";

const MetaDescription: React.FC<MetaDescriptionProps> = ({
  blogData,
  updateBlogData,
}) => {
  const [slugPreview, setSlugPreview] = React.useState("");
  const [metaTitleLength, setMetaTitleLength] = React.useState(0);
  const [metaDescLength, setMetaDescLength] = React.useState(0);
  const [keywordInput, setKeywordInput] = React.useState("");

  const metaData = blogData.metaData || {};

  const updateMetaData = (field: MetaDataKey, value: any) => {
    updateBlogData("metaData", {
      ...metaData,
      [field]: value,
    });
  };

  React.useEffect(() => {
    if (!metaData.slug && blogData?.title) {
      const autoSlug = blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlugPreview(autoSlug);
    } else {
      setSlugPreview(metaData.slug || "");
    }
  }, [blogData?.title, metaData.slug]);

  React.useEffect(() => {
    setMetaTitleLength(metaData.metaTitle?.length || 0);
    setMetaDescLength(metaData.metaDescription?.length || 0);
  }, [metaData.metaTitle, metaData.metaDescription]);

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && keywordInput.trim()) {
      e.preventDefault();
      const trimmed = keywordInput.trim();
      const existingKeywords = metaData.keywords || [];
      if (!existingKeywords.includes(trimmed)) {
        updateMetaData("keywords", [...existingKeywords, trimmed]);
      }
      setKeywordInput("");
    }
  };

  const removeKeyword = (index: number) => {
    const keywords = metaData.keywords || [];
    const updated = [...keywords];
    updated.splice(index, 1);
    updateMetaData("keywords", updated);
  };

  return (
    <div className="space-y-4 ml-6 mr-6 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Meta Description</h2>

      {/* Slug */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Title Slug
        </label>
        <input
          type="text"
          placeholder="custom-blog-slug"
          value={metaData.slug || ""}
          onChange={(e) => updateMetaData("slug", e.target.value)}
          className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500">
          Preview: yourwebsite.com/blog/{slugPreview || "your-blog-slug"}
        </p>
      </div>

      {/* Meta Title */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-[#818181]">
            Meta Title
          </label>
          <span className="text-xs text-gray-500">{metaTitleLength}/60</span>
        </div>
        <input
          type="text"
          placeholder="Best blog title for SEO"
          value={metaData.metaTitle || ""}
          onChange={(e) => updateMetaData("metaTitle", e.target.value)}
          className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Meta Description */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-[#818181]">
            Meta Description
          </label>
          <span className="text-xs text-gray-500">{metaDescLength}/160</span>
        </div>
        <textarea
          placeholder="Describe your blog content for search engines..."
          value={metaData.metaDescription || ""}
          onChange={(e) => updateMetaData("metaDescription", e.target.value)}
          rows={4}
          className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 text-sm shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Keywords
        </label>
        <div className="flex flex-wrap gap-2">
          {(metaData.keywords || []).map((keyword, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeKeyword(index)}
                className="text-gray-600 hover:text-red-500"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type keyword and press Enter"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          onKeyDown={handleKeywordKeyDown}
          className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500">
          Add comma-separated or press Enter to add multiple keywords
        </p>
      </div>
    </div>
  );
};

export default MetaDescription;
