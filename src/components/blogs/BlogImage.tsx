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
  };
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
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

  const handleFileSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
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

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    updateBlogData("heroImage", {
      ...blogData.heroImage,
      file: file,
      url: previewUrl,
    });
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
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800 mb-8">Blog Image</h2>

      {/* Hero Image Section */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-600">
          Hero Image
        </label>

        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Input
              type="text"
              value={blogData.heroImage.url}
              onValueChange={(value) => updateHeroImageField("url", value)}
              placeholder="Image URL"
              classNames={{
                inputWrapper: "bg-gray-50 border border-gray-200",
                input: "text-gray-800",
              }}
            />
          </div>
          <Button
            onClick={handleAddImage}
            color="primary"
            variant="bordered"
            className="px-6"
          >
            Add Image
          </Button>
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-blue-400 bg-blue-50"
            : "border-blue-300 bg-gray-50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {blogData.heroImage.url ? (
          <div className="space-y-4">
            <img
              src={blogData.heroImage.url}
              alt="Hero preview"
              className="max-h-64 mx-auto rounded-lg object-cover"
            />
            <p className="text-sm text-gray-600">Image uploaded successfully</p>
            <Button
              onClick={handleAddImage}
              color="primary"
              variant="flat"
              size="sm"
            >
              Change Image
            </Button>
          </div>
        ) : (
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
        )}
      </div>

      {/* File Format Note */}
      <p className="text-sm text-gray-500">
        Note: Only support .jpg, .png and .svg and zip files
      </p>

      {/* Image Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">
          Image Description
        </label>
        <Textarea
          value={blogData.heroImage.description}
          onValueChange={(value) => updateHeroImageField("description", value)}
          placeholder="Event Name xyz"
          minRows={3}
          classNames={{
            inputWrapper: "bg-gray-50 border border-gray-200",
            input: "text-gray-800",
          }}
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
