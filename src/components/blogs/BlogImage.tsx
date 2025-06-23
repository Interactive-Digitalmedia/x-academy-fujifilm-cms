import * as React from "react";
import { Button } from "@nextui-org/react";
import { uploadImage } from "@/api/activity";

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
  };
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

interface BlogImageProps {
  blogData: BlogData;
  updateBlogData: (field: keyof BlogData, value: any) => void;
}

const BlogImage: React.FunctionComponent<BlogImageProps> = ({
  blogData,
  updateBlogData,
}) => {
  const [dragActive, setDragActive] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }
  
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Only .jpg, .png, .svg files are allowed");
      return;
    }
  
    try {
      const res = await uploadImage(file);
      if (res?.publicUrl) {
        updateBlogData("heroImage", {
          file,
          url: res.publicUrl,
          description: blogData.heroImage.description,
        });
      }
    } catch (err) {
      console.error("❌ Image upload failed", err);
      alert("Image upload failed");
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const updateHeroImageField = (field: string, value: string) => {
    updateBlogData("heroImage", {
      ...blogData.heroImage,
      [field]: value,
    });
  };

  return (
    <div className="space-y-3 ml-6 mr-6 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Blog Image</h2>

      {/* Hero Image Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Hero Image
        </label>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <input
              type="text"
              className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
              placeholder="Image URL"
              value={blogData.heroImage.url}
              onChange={(e) => updateHeroImageField("url", e.target.value)}
            />
          </div>
          <Button
  onPress={handleAddImage}
  color="primary"
  variant="bordered"
  className="px-6 text-[#1098F7] border-[#1098F7]"
>
  {blogData.heroImage.url ? "Change Image" : "Add Image"}
</Button>
        </div>
      </div>

      {/* Drag & Drop Area */}
     {/* Image Preview */}
{blogData.heroImage.url ? (
  <div className="relative w-full rounded-lg overflow-hidden">
    <img
      src={blogData.heroImage.url}
      alt="Hero preview"
      className="w-full h-64 object-cover rounded-lg border"
    />
    <button
      onClick={() =>
        updateBlogData("heroImage", {
          ...blogData.heroImage,
          url: "",
          file: null,
        })
      }
      className="absolute top-3 right-3 bg-white/90 p-2 rounded-md hover:bg-red-500 hover:text-white text-gray-700 shadow transition"
      title="Remove Image"
    >
      🗑
    </button>
  </div>
) : (
  <div
    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
      dragActive ? "border-blue-400 bg-blue-50" : "border-blue-300 bg-gray-50"
    }`}
    onDragEnter={handleDrag}
    onDragLeave={handleDrag}
    onDragOver={handleDrag}
    onDrop={handleDrop}
  >
    <div className="space-y-4">
      <div className="mx-auto h-12 w-12 text-blue-400">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>
      <div>
        <p className="text-gray-600">
          Drag your file(s) or{" "}
          <button
            onClick={handleBrowse}
            className="text-blue-500 hover:text-blue-600 underline"
          >
            browse
          </button>
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Max 10 MB files are allowed
        </p>
      </div>
    </div>
  </div>
)}


      {/* File Format Note */}
      <p className="text-sm text-gray-500">
        Note: Only support .jpg, .png and .svg and zip files
      </p>

      {/* Image Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Image Description
        </label>
        <textarea
          value={blogData.heroImage.description}
          onChange={(e) => updateHeroImageField("description", e.target.value)}
          placeholder="Event Name xyz"
          rows={3}
          className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm bg-white text-gray-800 placeholder:text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
        />
        <p className="text-sm text-gray-500">
          Note: Write a compelling description of your event. Include what
          attendees can expect to learn or experience.
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/svg+xml"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default BlogImage;
