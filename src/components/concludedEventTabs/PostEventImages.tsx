import * as React from "react";
import { UploadCloud, Trash2 } from "lucide-react";

interface GalleryImage {
  file: File | null;
  url: string;
}

interface PostEventImagesProps {
  data: any;
  setData: (updatedData: any) => void;
}

const PostEventImages: React.FC<PostEventImagesProps> = ({ data, setData }) => {
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

    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      Array.from(e.dataTransfer.files).forEach(handleFileSelect);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(handleFileSelect);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      return alert("File size must be < 10MB");
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
      "application/zip",
    ];

    if (!allowedTypes.includes(file.type)) {
      return alert("Only .jpg, .png, .svg, and .zip files are allowed");
    }

    const previewUrl = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : ""; // Don't preview non-image files like zip

    const newImage: GalleryImage = {
      file,
      url: previewUrl,
    };

    setData({
      ...data,
      postEventImages: [...(data.postEventImages || []), newImage],
    });
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...(data.postEventImages || [])];
    updatedImages.splice(index, 1);
    setData({ ...data, postEventImages: updatedImages });
  };

  return (
    <div className="space-y-4">
      {/* Upload Box + Note */}
      <div className="space-y-2">
        <div
          className={`relative border-2 border-dashed rounded-lg p-10 text-center transition-colors h-[172px] ${
            dragActive ? "border-blue-400 bg-blue-50" : "border-blue-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-1">
            <UploadCloud className="w-6 h-6 text-blue-400 mb-1" />
            <p className="text-sm text-gray-700">
              Drag your file(s) or{" "}
              <button
                type="button"
                onClick={handleAddImage}
                className="text-blue-500 hover:text-blue-600 underline"
              >
                browse
              </button>
            </p>
            <p className="text-xs text-gray-400">Max 10 MB files are allowed</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 ml-1">
          Note: Only support .jpg, .png, .svg and .zip files
        </p>
      </div>

      {/* Previews */}
      <div className="flex flex-wrap gap-4">
        {(data.postEventImages || []).map(
          (img: GalleryImage, index: number) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 w-[172px] flex flex-col items-center space-y-2"
            >
              {img.url ? (
                <img
                  src={img.url}
                  alt={`Post-event image ${index + 1}`}
                  className="max-h-64 rounded-lg object-cover"
                />
              ) : (
                <div className="text-xs text-gray-500">ZIP File</div>
              )}
              <button
                onClick={() => handleDeleteImage(index)}
                className="flex items-center text-sm text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          )
        )}
      </div>

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/svg+xml,application/zip"
        onChange={handleFileInputChange}
        className="hidden"
        multiple
      />
    </div>
  );
};

export default PostEventImages;
