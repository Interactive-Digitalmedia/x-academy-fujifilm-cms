import * as React from "react";
import { Button } from "@nextui-org/react";
import { uploadImage } from "@/api/activity";
import { Blog } from "@/types";

interface BlogImageProps {
  blogData: Partial<Blog>;
  updateBlogData: (field: keyof Blog, value: any) => void;
}

const BlogImage: React.FC<BlogImageProps> = ({ blogData, updateBlogData }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);

  const handleFileSelect = async (file: File) => {
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
        updateBlogData("blogImage", {
          ...blogData.blogImage,
          heroImage: encodedUrl,
        });
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("❌ Image upload failed");
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (["dragenter", "dragover"].includes(e.type)) setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleRemoveImage = () => {
    updateBlogData("blogImage", {
      ...blogData.blogImage,
      heroImage: "",
    });
  };

  const handleDescriptionChange = (desc: string) => {
    updateBlogData("blogImage", {
      ...blogData.blogImage,
      description: desc,
    });
  };

  return (
    <div className="space-y-4 ml-6 mr-6 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Blog Image<span className="text-red-500">*</span></h2>

      {/* Image Upload */}
      <div className="flex items-end gap-4">
        {/* <input
          type="text"
          placeholder="Image URL"
          value={blogData.blogImage?.heroImage || ""}
          onChange={(e) =>
            updateBlogData("blogImage", {
              ...blogData.blogImage,
              heroImage: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm bg-white text-gray-800 placeholder:text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
        /> */}
        <Button
          onPress={() => fileInputRef.current?.click()}
          variant="bordered"
          className="text-[#1098F7] border-[#1098F7]"
        >
          {blogData.blogImage?.heroImage ? "Change Image" : "Add Image"}
        </Button>
      </div>

      {/* Preview */}
      {blogData.blogImage?.heroImage ? (
        <div className="relative mt-3 rounded-lg overflow-hidden">
          <img
            src={blogData.blogImage.heroImage}
            alt="Hero"
            className="w-full h-64 object-cover rounded-lg border"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-3 right-3 bg-white/90 text-gray-800 hover:bg-red-600 hover:text-white p-2 rounded-md shadow"
            title="Remove Image"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-blue-400 bg-blue-50"
              : "border-blue-300 bg-gray-50"
          }`}
        >
          <p className="text-gray-600">
            Drag and drop or{" "}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-500 hover:underline"
            >
              browse
            </button>
          </p>
          <p className="text-sm text-gray-400 mt-1">Max 10MB, JPG/PNG/SVG</p>
        </div>
      )}

      {/* Image Description */}
      <div>
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Image Description
        </label>
        <textarea
          rows={3}
          placeholder="Image description..."
          value={blogData.blogImage?.description || ""}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm shadow-sm bg-white text-gray-800 placeholder:text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
        />
        <p className="text-xs text-gray-500 mt-1">
          This helps with accessibility and SEO.
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/jpg,image/png,image/svg+xml"
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default BlogImage;
