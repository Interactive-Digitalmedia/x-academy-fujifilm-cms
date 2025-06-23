import * as React from "react";
import { X } from "lucide-react";

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
    isEnabled: boolean;
    style: {
      color: string;
      size: string;
      variant: string;
    };
  };
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

interface MetaDescriptionProps {
  blogData: BlogData;
  updateBlogData: (field: keyof BlogData, value: any) => void;
}

const MetaDescription: React.FunctionComponent<MetaDescriptionProps> = ({
  blogData,
  updateBlogData,
}) => {
  const [, setSlugPreview] = React.useState("");
  const [metaTitleLength, setMetaTitleLength] = React.useState(0);
  const [metaDescLength, setMetaDescLength] = React.useState(0);
  const [keywordInput, setKeywordInput] = React.useState("");

  // Auto-generate slug from title if empty
  React.useEffect(() => {
    if (!blogData.slug && blogData.title) {
      const autoSlug = blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlugPreview(autoSlug);
    } else {
      setSlugPreview(blogData.slug);
    }
  }, [blogData.title, blogData.slug]);

  // Track character counts
  React.useEffect(() => {
    setMetaTitleLength(blogData.metaTitle.length);
    setMetaDescLength(blogData.metaDescription.length);
  }, [blogData.metaTitle, blogData.metaDescription]);

  // const generateSlug = () => {
  //   const autoSlug = blogData.title
  //     .toLowerCase()
  //     .replace(/[^a-z0-9]+/g, "-")
  //     .replace(/^-+|-+$/g, "");
  //   updateBlogData("slug", autoSlug);
  // };

  // const handleSaveAndPreview = () => {
  //   console.log("Complete Blog Data:", blogData);
  //   // Here you would typically save to backend or trigger publish
  //   alert("Blog saved! Check console for complete data.");
  // };


  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && keywordInput.trim()) {
      e.preventDefault();
      const trimmed = keywordInput.trim();
      if (!blogData.keywords.includes(trimmed)) {
        updateBlogData("keywords", [...blogData.keywords, trimmed]);
      }
      setKeywordInput("");
    }
  };
  
  const removeKeyword = (index: number) => {
    const updated = [...blogData.keywords];
    updated.splice(index, 1);
    updateBlogData("keywords", updated);
  };


  return (
    <div className="space-y-3 ml-6 mr-6 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Meta Description</h2>
      {/* Title Slug */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Title Slug
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="XYZ"
            value={blogData.slug}
            onChange={(e) => updateBlogData("slug", e.target.value)}
            className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
          />
          {/* <Button
            onClick={generateSlug}
            variant="bordered"
            className="shrink-0"
          >
            Generate
          </Button> */}
        </div>
        {/* <p className="text-xs text-gray-500">
          URL Preview: yourwebsite.com/blog/{slugPreview || "your-blog-slug"}
        </p> */}
      </div>

      {/* Meta Title */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-[#818181] mb-1">
            Meta Title
          </label>
          {/* <span className={`text-xs ${titleStatus.color}`}>
            {metaTitleLength}/60 - {titleStatus.text}
          </span> */}
        </div>
        <input
          type="text"
          placeholder="XYZ"
          value={blogData.metaTitle}
          onChange={(e) => updateBlogData("metaTitle", e.target.value)}
          className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
        />
        {/* <p className="text-xs text-gray-500">
          Recommended: 30-60 characters for optimal SEO
        </p> */}
      </div>

      {/* Meta Description */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-[#818181] mb-1">
            Meta Description
          </label>
          {/* <span className={`text-xs ${descStatus.color}`}>
            {metaDescLength}/160 - {descStatus.text}
          </span> */}
        </div>
        <textarea
          placeholder="XYZ"
          value={blogData.metaDescription}
          onChange={(e) => updateBlogData("metaDescription", e.target.value)}
          rows={4}
          className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 text-sm shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
        />

        {/* <p className="text-xs text-gray-500">
          Recommended: 120-160 characters for optimal search engine display
        </p> */}
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Keywords
        </label>
        <div className="space-y-1">
  {/* Bubbles */}
  <div className="flex flex-wrap gap-2 mb-2">
    {blogData.keywords.map((keyword, index) => (
      <span
        key={index}
        className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
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

  {/* Input Field */}
  <input
    type="text"
    placeholder="Type keyword and press Enter"
    value={keywordInput}
    onChange={(e) => setKeywordInput(e.target.value)}
    onKeyDown={handleKeywordKeyDown}
    className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
  />
</div>

        {/* <p className="text-xs text-gray-500">
          Enter keywords separated by commas (e.g., blog, tutorial, web
          development)
        </p> */}
      </div>

      {/* SEO Preview */}
      {/* <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-4">SEO Preview</h3>
        <div className="space-y-2 bg-white p-4 rounded border">
          <div className="text-blue-600 text-lg hover:underline cursor-pointer line-clamp-1">
            {blogData.metaTitle || blogData.title || "Your Blog Title Here"}
          </div>
          <div className="text-green-700 text-sm">
            yourwebsite.com/blog/{slugPreview || "your-blog-slug"}
          </div>
          <div className="text-gray-600 text-sm leading-relaxed">
            {blogData.metaDescription ||
              "Your meta description will appear here. This is how your blog post will look in search engine results."}
          </div>
        </div>
      </div> */}

      {/* Save & Preview Button */}
      {/* <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <Button
          onClick={handleSaveAndPreview}
          color="primary"
          size="lg"
          className="px-8"
        >
          Save & Preview
        </Button>
      </div> */}
    </div>
  );
};

export default MetaDescription;
