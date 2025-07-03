import { Blog } from "@/types";

interface PublishingDetailsProps {
  blogData: Partial<Blog>;
  updateBlogData: (field: keyof Blog, value: any) => void;
}

const PublishingDetails: React.FunctionComponent<PublishingDetailsProps> = ({
  blogData,
  updateBlogData,
}) => {
  const tagsList = [
    { name: "Event", color: "bg-purple-600" },
    { name: "Fashion", color: "bg-amber-500" },
    { name: "Street", color: "bg-blue-600" },
    { name: "Wildlife", color: "bg-emerald-700" },
    { name: "Portrait", color: "bg-pink-400" },
  ];

  // const [selectedTags, setSelectedTags] = useState<string[]>(
  //   blogData.tags || []
  // );
  // useEffect(() => {
  //   if (blogData.tags && blogData.tags.length > 0) {
  //     setSelectedTags(blogData.tags);
  //   }
  // }, [blogData.tags]);
  const selectedTags = blogData.tags || [];
  const toggleTag = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    updateBlogData("tags", updatedTags);
  };

  const removeTag = (tag: string) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);

    updateBlogData("tags", updatedTags);
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
            value={blogData.publishedDate}
            onChange={(e) => updateBlogData("publishedDate", e.target.value)}
          />
        </div>
      </div>

      {/* Blog Tags */}
      <div>
        <label className="block text-sm font-medium text-[#818181] mb-2">
          Blog Tags
        </label>
        <div className="flex gap-2 flex-wrap px-2 py-1 h-10 rounded-md border border-gray-300 bg-white shadow-sm mb-3">
          {selectedTags?.map((tag) => {
            const tagColor =
              tagsList.find((t) => t.name === tag)?.color || "bg-gray-400";
            return (
              <span
                key={tag}
                className={`flex items-center gap-1 text-white text-sm px-3 py-1 rounded-md ${tagColor}`}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-white hover:text-red-200"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>

        <div className="flex gap-2 flex-wrap">
          {tagsList?.map((tag) => (
            <button
              key={tag?.name}
              type="button"
              onClick={() => toggleTag(tag?.name)}
              disabled={selectedTags?.includes(tag?.name)}
              className={`px-3 py-1 rounded-md text-white text-sm font-medium ${tag?.color} disabled:opacity-40`}
            >
              {tag?.name}
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
