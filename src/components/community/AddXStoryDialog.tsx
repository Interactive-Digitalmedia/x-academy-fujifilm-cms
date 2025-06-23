import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadCloud, Trash2 } from "lucide-react";

interface GalleryImage {
  file: File | null;
  url: string;
}

const AddXStoryDialog: React.FC = () => {
  const [formData, setFormData] = useState({
    xStoryName: "",
    videoLink: "",
    coverImage: null as GalleryImage | null,
  });

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
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

    const previewUrl = URL.createObjectURL(file);
    setFormData({ ...formData, coverImage: { file, url: previewUrl } });
  };

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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="h-[32px] px-4 text-sm bg-[#2196F3] text-white hover:bg-[#1976D2]"
        >
          Add X-Story
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="font-bold">New X Story</DialogTitle>
          <DialogDescription>
            Fill in the details to upload a new X-Story.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              X-Story Name
            </label>
            <input
              type="text"
              className="w-full placeholder:text-[15px] border rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
              placeholder="Workshop"
              value={formData.xStoryName}
              onChange={(e) =>
                setFormData({ ...formData, xStoryName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Video Link
            </label>
            <input
              type="text"
              className="w-full placeholder:text-[15px] border rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
              placeholder="www.sample.com"
              value={formData.videoLink}
              onChange={(e) =>
                setFormData({ ...formData, videoLink: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#818181] mb-1">
              Cover Image
            </label>

            <div
              className={`relative border-2 border-dashed rounded-lg text-center transition-colors h-[180px] ${
                dragActive ? "border-blue-400 bg-blue-50" : "border-blue-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.coverImage ? (
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <img
                    src={formData.coverImage.url}
                    alt="Cover preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() =>
                      setFormData({ ...formData, coverImage: null })
                    }
                    className="absolute top-2 right-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-full p-1 shadow"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full space-y-1">
                  <UploadCloud className="w-10 h-10 text-blue-400" />
                  <p className="text-gray-600">
                    Drag your file or{" "}
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="text-blue-500 hover:text-blue-600 underline"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Max 10 MB files are allowed
                  </p>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-400 mt-1">
              Note: Only support .jpg, .png and .svg files
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/svg+xml"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Save Button Footer */}
        <div className="flex justify-end -mt-4">
          <Button
            size="sm"
            className="bg-[#2196F3] text-white hover:bg-[#1976D2]"
            onClick={() => {
              console.log("Saving story:", formData);
              // add save logic here
            }}
          >
            Save Story
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddXStoryDialog;
