import * as React from "react";

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
  keywords: string[];
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
    <div className="space-y-3 ml-6 mr-6 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Public Profile</h2>

      {/* Blog Title */}
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-[#818181] mb-1">
            Blog Title
          </label>
          <input
            type="text"
            className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            placeholder="Enter blog title"
            value={blogData.title}
            onChange={(e) => updateBlogData("title", e.target.value)}
          />
        </div>
      </div>

      {/* Author and Publishing Date Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#818181] mb-1">
            Original Author
          </label>
          <select
            className="w-full border rounded-md px-3 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            value={blogData.author}
            onChange={(e) => updateBlogData("author", e.target.value)}
          >
            <option value="" disabled>
              Select author's name
            </option>
            <option value="john-doe">John Doe</option>
            <option value="jane-smith">Jane Smith</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#818181] mb-1">
            Publishing Date
          </label>
          <input
            type="date"
            className="w-full border rounded-md px-3 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            value={blogData.publishingDate}
            onChange={(e) => updateBlogData("publishingDate", e.target.value)}
          />
        </div>
      </div>

      {/* Blog Tags */}
      <div>
        <label className="block text-sm font-medium text-[#818181] mb-2">
          Blog Tags
        </label>

        {/* Selected Tags Box */}
        <div className="flex gap-2 flex-wrap px-2 py-1 rounded-md border border-gray-300 bg-white shadow-sm mb-3">
          {blogData.tags.map((tag, index) => {
            const tagColorMap: Record<string, string> = {
              purple: "bg-purple-600",
              orange: "bg-amber-500",
              blue: "bg-blue-600",
              green: "bg-emerald-700",
              pink: "bg-pink-400",
              indigo: "bg-indigo-500",
              gray: "bg-gray-400",
            };
            const tagColor = tagColorMap[tag.color] || "bg-gray-400";

            return (
              <span
                key={index}
                className={`flex items-center gap-1 text-white text-sm px-3 py-1 rounded-md ${tagColor}`}
              >
                {tag.name}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-1 text-white hover:text-red-200"
                >
                  ×
                </button>
              </span>
            );
          })}
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
