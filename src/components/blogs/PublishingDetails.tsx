import * as React from "react";
import { Input, Select, SelectItem, DatePicker } from "@nextui-org/react";

interface Tag {
  name: string;
  color: string;
}

interface BlogData {
  title: string;
  author: string;
  publishingDate: any;
  tags: Tag[];
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

interface PublishingDetailsProps {
  blogData: BlogData;
  updateBlogData: (field: keyof BlogData, value: any) => void;
}

const PublishingDetails: React.FunctionComponent<PublishingDetailsProps> = ({
  blogData,
  updateBlogData,
}) => {
  const availableTags: Tag[] = [
    { name: "Event", color: "purple" },
    { name: "Fashion", color: "orange" },
    { name: "Street", color: "blue" },
    { name: "Wildlife", color: "green" },
    { name: "Portrait", color: "pink" },
    { name: "Travel", color: "indigo" },
  ];

  const authors = [
    { key: "john-doe", label: "John Doe" },
    { key: "jane-smith", label: "Jane Smith" },
    { key: "admin", label: "Admin" },
  ];

  const removeTag = (index: number) => {
    const newTags = blogData.tags.filter((_, i) => i !== index);
    updateBlogData("tags", newTags);
  };

  const addTag = (tag: Tag) => {
    if (!blogData.tags.find((t) => t.name === tag.name)) {
      updateBlogData("tags", [...blogData.tags, tag]);
    }
  };

  //   const handleSaveAndPreview = () => {
  //     console.log("Publishing Details Data:", {
  //       title: blogData.title,
  //       author: blogData.author,
  //       publishingDate: blogData.publishingDate,
  //       tags: blogData.tags,
  //     });
  //   };

  const getTagColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      purple: "bg-purple-500 text-white",
      orange: "bg-orange-500 text-white",
      blue: "bg-blue-500 text-white",
      green: "bg-green-600 text-white",
      pink: "bg-pink-500 text-white",
      indigo: "bg-indigo-500 text-white",
      yellow: "bg-yellow-500 text-black",
      gray: "bg-gray-500 text-white",
    };
    return colorMap[color] || "bg-gray-500 text-white";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800 mb-8">
        Publishing Details
      </h2>

      {/* Blog Title */}
      <div className="space-y-2">
        <Input
          type="text"
          value={blogData.title}
          onValueChange={(value) => updateBlogData("title", value)}
          label="Blog Title"
          labelPlacement="outside"
          placeholder="Enter blog title"
          classNames={{
            label: "text-sm font-medium text-gray-600",
            inputWrapper: "bg-gray-50 border border-gray-200",
            input: "text-gray-800",
          }}
        />
      </div>

      {/* Author and Publishing Date Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          selectedKeys={blogData.author ? [blogData.author] : []}
          onSelectionChange={(keys) =>
            updateBlogData("author", Array.from(keys)[0] as string)
          }
          label="Original Author"
          labelPlacement="outside"
          placeholder="Select author's name"
          classNames={{
            label: "text-sm font-medium text-gray-600",
            trigger: "bg-gray-50 border border-gray-200",
            value: "text-gray-500",
          }}
        >
          {authors.map((author) => (
            <SelectItem key={author.key} value={author.key}>
              {author.label}
            </SelectItem>
          ))}
        </Select>

        <DatePicker
          value={blogData.publishingDate}
          onChange={(date) => updateBlogData("publishingDate", date)}
          label="Publishing Date"
          labelPlacement="outside"
          classNames={{
            label: "text-sm font-medium text-gray-600",
            inputWrapper: "bg-gray-50 border border-gray-200",
            input: "text-gray-500",
          }}
        />
      </div>

      {/* Blog Tags */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-600">
          Blog Tags
        </label>

        {/* Selected Tags Box */}
        <div className="min-h-[60px] p-4 bg-gray-50 border border-gray-200 rounded-lg">
          {blogData.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {blogData.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${getTagColorClasses(tag.color)}`}
                >
                  {tag.name}
                  <button
                    onClick={() => removeTag(index)}
                    className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm">Select tags from below</div>
          )}
        </div>

        {/* Available Tags */}
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => addTag(tag)}
              disabled={
                blogData.tags.find((t) => t.name === tag.name) !== undefined
              }
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-opacity ${getTagColorClasses(tag.color)} ${
                blogData.tags.find((t) => t.name === tag.name)
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:opacity-80 cursor-pointer"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Save & Preview Button */}
      {/* <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={handleSaveAndPreview}
          className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-lg font-medium"
        >
          Save & Preview
        </button>
      </div> */}
    </div>
  );
};

export default PublishingDetails;
