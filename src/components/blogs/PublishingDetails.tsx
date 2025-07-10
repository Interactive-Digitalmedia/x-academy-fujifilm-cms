import { getAmbassadors } from "@/api/ambassadors";
import { uploadImage } from "@/api/uploadImageApi";
import { getAllAdminsData } from "@/api/user";
import { Ambassador, Blog, CmsUserProfileData } from "@/types";
import { useEffect, useState } from "react";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";

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
  const [admins, setAdmins] = useState<CmsUserProfileData[]>([]);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const selectedTags = blogData.tags || [];
  const authorModel = blogData.authorModel || "";

  useEffect(() => {
    const fetchAuthors = async () => {
      const adminRes = await getAllAdminsData();
      const ambassadorRes = await getAmbassadors();

      if (adminRes?.status === 200 && Array.isArray(adminRes.data)) {
        setAdmins(adminRes.data);
      }

      if (ambassadorRes?.status === 200 && Array.isArray(ambassadorRes.data)) {
        setAmbassadors(ambassadorRes.data);
      }
    };

    fetchAuthors();
  }, []);

  const handleAuthorSelect = (e: { target: { value: string } }) => {
    const value = e.target.value;
    if (value === "other") {
      updateBlogData("author", null);
      updateBlogData("authorModel", "Other");
    } else {
      updateBlogData("author", value);
      if (admins.some((a) => a._id === value)) {
        updateBlogData("authorModel", "Admin");
      } else {
        updateBlogData("authorModel", "Ambassador");
      }
    }
  };

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

  const updateCustomAuthor = (field: string, value: string) => {
    updateBlogData("customAuthor", {
      ...blogData.customAuthor,
      [field]: value,
      socialMediaUrls: {
        ...blogData.customAuthor?.socialMediaUrls,
        ...(field === "facebook" || field === "instagram"
          ? { [field]: value }
          : blogData.customAuthor?.socialMediaUrls),
      },
    });
  };

  const handleCustomAuthorImageUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      return alert("File size must be under 10MB.");
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      return alert("Only .jpg, .png, .svg formats are supported.");
    }

    try {
      const res = await uploadImage(file);
      if (res?.publicUrl) {
        const encodedUrl = encodeURI(res.publicUrl);
        updateBlogData("customAuthor", {
          ...blogData.customAuthor,
          image: encodedUrl,
        });
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("❌ Image upload failed");
    }
  };

  return (
    <div className="space-y-3 ml-6 mr-6 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Public Profile</h2>

      {/* Blog Title */}
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-[#818181] mb-1">
            Blog Title<span className="text-red-500">*</span>
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
            Original Author<span className="text-red-500">*</span>
          </label>
          <Select
            isRequired
            variant="bordered"
            className="w-full"
            selectedKeys={
              new Set([
                authorModel === "Other"
                  ? "other"
                  : typeof blogData.author === "string"
                    ? blogData.author
                    : blogData.author?._id || "",
              ])
            }
            onChange={(e) =>
              handleAuthorSelect({
                target: { value: e.target.value },
              } as React.ChangeEvent<HTMLSelectElement>)
            }
          >
            

            {admins.filter((admin) => admin.fullname).length > 0 ? (
              <SelectSection title="Admins" className="capitalize">
                {admins
                  .filter((admin) => admin.fullname)
                  .map((admin) => (
                    <SelectItem key={admin._id}>{admin.fullname}</SelectItem>
                  ))}
              </SelectSection>
            ) : null}

            {ambassadors.filter((amb) => amb.fullname || amb.userName).length >
            0 ? (
              <SelectSection title="Ambassadors" className="capitalize">
                {ambassadors
                  .filter((amb) => amb.fullname || amb.userName)
                  .map((amb) => (
                    <SelectItem key={amb._id} className="capitalize">
                      {amb.fullname || amb.userName}
                    </SelectItem>
                  ))}
              </SelectSection>
            ) : null}

            <SelectItem key="other">Other (Manual Entry)</SelectItem>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#818181] mb-1">
            Publishing Date<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full border rounded-md px-3 py-2 text-sm bg-white text-gray-800"
            value={blogData.publishedDate || ""}
            onChange={(e) => updateBlogData("publishedDate", e.target.value)}
          />
        </div>
      </div>

      {/* Custom Author Fields */}
      {authorModel === "Other" && (
        <div className="space-y-3 mt-3 border border-gray-300 p-4 rounded-md">
          <h3 className="text-sm font-semibold text-gray-700">Custom Author</h3>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={blogData.customAuthor?.name || ""}
              onChange={(e) => updateCustomAuthor("name", e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Author's name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">About</label>
            <textarea
              value={blogData.customAuthor?.about || ""}
              onChange={(e) => updateCustomAuthor("about", e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Short bio or description"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Profile Image
            </label>
            {blogData.customAuthor?.image && (
              <img
                src={blogData.customAuthor.image}
                alt="Author"
                className="w-24 h-24 object-cover rounded-full mb-2 border"
              />
            )}
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.svg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleCustomAuthorImageUpload(file);
              }}
              className="w-full text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Facebook
              </label>
              <input
                type="text"
                value={blogData.customAuthor?.socialMediaUrls?.facebook || ""}
                onChange={(e) => updateCustomAuthor("facebook", e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Instagram
              </label>
              <input
                type="text"
                value={blogData.customAuthor?.socialMediaUrls?.instagram || ""}
                onChange={(e) =>
                  updateCustomAuthor("instagram", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      )}

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
