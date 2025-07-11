import { UploadCloud, Trash2 } from "lucide-react";
import { uploadImage } from "@/api/uploadImageApi";
import { Ambassador } from "@/types";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface GalleryProps {
  data: Partial<Ambassador>;
  setData: React.Dispatch<React.SetStateAction<Partial<Ambassador>>>;
}

const Gallery: React.FC<GalleryProps> = ({ data, setData }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleMultipleFilesUpload(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleMultipleFilesUpload(Array.from(e.target.files));
    }
  };

  const handleMultipleFilesUpload = async (files: File[]) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];
    const validFiles = files.filter(
      (file) =>
        allowedTypes.includes(file.type) && file.size <= 50 * 1024 * 1024
    );

    if (validFiles.length === 0) {
      toast.error("No valid files to upload (Max 10MB and jpg/png/svg only)");
      return;
    }
    setUploading(true);
    try {
      const uploadPromises = validFiles.map((file) => uploadImage(file));
      const results = await Promise.all(uploadPromises);
      const uploadedUrls = results
        .filter((res) => res?.publicUrl)
        .map((res) => encodeURI(res.publicUrl));

      if (uploadedUrls.length) {
        setData((prev) => ({
          ...prev,
          gallery: [...(prev.gallery || []), ...uploadedUrls],
        }));
      }
    } catch (error) {
      console.error("Gallery upload failed:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...(data.gallery || [])];
    updatedImages.splice(index, 1); // remove the image at that index
    setData({ ...data, gallery: updatedImages });
  };

  return (
    <div className="space-y-3 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Gallery</h2>

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
          <UploadCloud className="w-10 h-10 text-blue-400" />
          <p className="text-gray-600">
            Drag images here or{" "}
            <button
              type="button"
              onClick={handleAddImage}
              className="text-blue-500 hover:text-blue-600 underline"
            >
              browse
            </button>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Upload .jpg, .png, .svg files under 10MB
          </p>
        </div>
      </div>

      {uploading && (
        <p className="text-sm text-blue-500">Uploading image(s)...</p>
      )}

      <div className="flex flex-wrap gap-4">
        {(data.gallery || []).map((url: string, index: number) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-gray-50 w-[172px] flex flex-col items-center space-y-2"
          >
            <img
              src={url}
              alt={`Gallery image ${index + 1}`}
              className="max-h-64 rounded-lg object-cover"
            />
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

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/svg+xml"
        onChange={handleFileInputChange}
        className="hidden"
        multiple
      />
    </div>
  );
};

export default Gallery;
