import { uploadImage } from "@/api/uploadImageApi";
import { UploadCloud, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

interface PostEventImagesProps {
  data: any;
  setData: (updatedData: any) => void;
}

const PostEventImages: React.FC<PostEventImagesProps> = ({ data, setData }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

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
      handleFilesUpload(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFilesUpload(Array.from(e.target.files));
    }
  };

  const handleFilesUpload = async (files: File[]) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
      "application/zip",
    ];

    const validFiles = files.filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`❌ ${file.name} is larger than 10MB`);
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        alert(`❌ ${file.name} has an unsupported file type`);
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;

    setUploading(true);
    try {
      const uploadResults = await Promise.all(
        validFiles.map((file) => uploadImage(file))
      );

      const uploadedUrls = uploadResults
        .filter((r) => r?.publicUrl)
        .map((r) => encodeURI(r.publicUrl));

      setData((prev: any) => ({
        ...prev,
        postEventImages: [...(prev.postEventImages || []), ...uploadedUrls],
      }));
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
    setUploading(false);
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

      {uploading && (
        <p className="text-sm text-blue-500">Uploading image(s)...</p>
      )}

      {/* Previews */}
      <div className="flex flex-wrap gap-4">
        {(data.postEventImages || []).map((url: string, index: number) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-gray-50 w-[172px] flex flex-col items-center space-y-2"
          >
            {url ? (
              <img
                src={url}
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
        ))}
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
