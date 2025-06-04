import * as React from "react";
import { Input, Textarea, Button } from "@nextui-org/react";

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
  keywords: string;
}

interface MetaDescriptionProps {
  blogData: BlogData;
  updateBlogData: (field: keyof BlogData, value: any) => void;
}

const MetaDescription: React.FunctionComponent<MetaDescriptionProps> = ({
  blogData,
  updateBlogData,
}) => {
  const [slugPreview, setSlugPreview] = React.useState("");
  const [metaTitleLength, setMetaTitleLength] = React.useState(0);
  const [metaDescLength, setMetaDescLength] = React.useState(0);

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

  const generateSlug = () => {
    const autoSlug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    updateBlogData("slug", autoSlug);
  };

  // const handleSaveAndPreview = () => {
  //   console.log("Complete Blog Data:", blogData);
  //   // Here you would typically save to backend or trigger publish
  //   alert("Blog saved! Check console for complete data.");
  // };

  const getTitleLengthStatus = () => {
    if (metaTitleLength === 0)
      return { color: "text-gray-400", text: "0 characters" };
    if (metaTitleLength < 30)
      return { color: "text-orange-500", text: "Too short" };
    if (metaTitleLength <= 60)
      return { color: "text-green-500", text: "Perfect length" };
    return { color: "text-red-500", text: "Too long" };
  };

  const getDescLengthStatus = () => {
    if (metaDescLength === 0)
      return { color: "text-gray-400", text: "0 characters" };
    if (metaDescLength < 120)
      return { color: "text-orange-500", text: "Too short" };
    if (metaDescLength <= 160)
      return { color: "text-green-500", text: "Perfect length" };
    return { color: "text-red-500", text: "Too long" };
  };

  const titleStatus = getTitleLengthStatus();
  const descStatus = getDescLengthStatus();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Meta Description
      </h2>

      {/* Title Slug */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Title Slug
        </label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={blogData.slug}
            onValueChange={(value) => updateBlogData("slug", value)}
            placeholder="XYZ"
            classNames={{
              inputWrapper: "bg-gray-50 border border-gray-200",
              input: "text-gray-800",
            }}
          />
          <Button
            onClick={generateSlug}
            variant="bordered"
            className="shrink-0"
          >
            Generate
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          URL Preview: yourwebsite.com/blog/{slugPreview || "your-blog-slug"}
        </p>
      </div>

      {/* Meta Title */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-600">
            Meta Title
          </label>
          <span className={`text-xs ${titleStatus.color}`}>
            {metaTitleLength}/60 - {titleStatus.text}
          </span>
        </div>
        <Input
          type="text"
          value={blogData.metaTitle}
          onValueChange={(value) => updateBlogData("metaTitle", value)}
          placeholder="XYZ"
          classNames={{
            inputWrapper: "bg-gray-50 border border-gray-200",
            input: "text-gray-800",
          }}
        />
        <p className="text-xs text-gray-500">
          Recommended: 30-60 characters for optimal SEO
        </p>
      </div>

      {/* Meta Description */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-600">
            Meta Description
          </label>
          <span className={`text-xs ${descStatus.color}`}>
            {metaDescLength}/160 - {descStatus.text}
          </span>
        </div>
        <Textarea
          value={blogData.metaDescription}
          onValueChange={(value) => updateBlogData("metaDescription", value)}
          placeholder="XYZ"
          minRows={4}
          maxRows={6}
          classNames={{
            inputWrapper: "bg-gray-50 border border-gray-200",
            input: "text-gray-800",
          }}
        />
        <p className="text-xs text-gray-500">
          Recommended: 120-160 characters for optimal search engine display
        </p>
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Keywords
        </label>
        <Input
          type="text"
          value={blogData.keywords}
          onValueChange={(value) => updateBlogData("keywords", value)}
          placeholder="XYZ"
          classNames={{
            inputWrapper: "bg-gray-50 border border-gray-200",
            input: "text-gray-800",
          }}
        />
        <p className="text-xs text-gray-500">
          Enter keywords separated by commas (e.g., blog, tutorial, web
          development)
        </p>
      </div>

      {/* SEO Preview */}
      <div className="bg-gray-50 p-6 rounded-lg">
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
      </div>

      {/* SEO Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          SEO Optimization Tips:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Include your main keyword in the meta title and description</li>
          <li>• Write compelling descriptions that encourage clicks</li>
          <li>• Keep URLs short and descriptive</li>
          <li>• Use relevant keywords but avoid keyword stuffing</li>
          <li>• Make sure your content matches your meta description</li>
        </ul>
      </div>

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
