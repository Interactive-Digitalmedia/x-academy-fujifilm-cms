import * as React from "react";

interface PublishingDetailsProps {
  blogTitle: string;
  setBlogTitle: (title: string) => void;
  selectedAuthor: string;
  setSelectedAuthor: (author: string) => void;
  publishingDate: string;
  setPublishingDate: (date: string) => void;
  selectedTags: Array<{
    name: string;
    color: string;
    removable: boolean;
  }>;
  setSelectedTags: (
    tags: Array<{
      name: string;
      color: string;
      removable: boolean;
    }>
  ) => void;
}

const PublishingDetails: React.FunctionComponent<PublishingDetailsProps> = ({
  blogTitle,
  setBlogTitle,
  selectedAuthor,
  setSelectedAuthor,
  publishingDate,
  setPublishingDate,
  selectedTags,
  setSelectedTags,
}) => {
  const removeTag = (index: number) => {
    if (selectedTags[index].removable) {
      setSelectedTags(selectedTags.filter((_, i) => i !== index));
    }
  };

  const getTagColorClasses = (color: string) => {
    const colorMap = {
      purple: "bg-purple-500 text-white",
      orange: "bg-orange-500 text-white",
      blue: "bg-blue-500 text-white",
      green: "bg-green-600 text-white",
      pink: "bg-pink-500 text-white",
    };
    return colorMap[color] || "bg-gray-500 text-white";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Publishing Details
      </h2>

      {/* Blog Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Blog Title
        </label>
        <input
          type="text"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          placeholder="Enter blog title"
        />
      </div>

      {/* Author and Publishing Date Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Original Author
          </label>
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
          >
            <option value="">Select author's name</option>
            <option value="john-doe">John Doe</option>
            <option value="jane-smith">Jane Smith</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Publishing Date
          </label>
          <input
            type="datetime-local"
            value={publishingDate}
            onChange={(e) => setPublishingDate(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
            placeholder="Select publishing date & time"
          />
        </div>
      </div>

      {/* Blog Tags */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-600">
          Blog Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTagColorClasses(tag.color)}`}
            >
              {tag.name}
              {tag.removable && (
                <button
                  onClick={() => removeTag(index)}
                  className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublishingDetails;
