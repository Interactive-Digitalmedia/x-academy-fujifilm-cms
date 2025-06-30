import { useState } from "react";
import { X } from "lucide-react";
import { uploadImage } from "@/api/activity";

export default function EventImage({ data, setData }: any) {
  const [, setHeroFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // Handle hero upload immediately after file select
  const handleHeroChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setHeroFile(file);
    setUploading(true);
    try {
      const res = await uploadImage(file);
      console.log("public url :", res);
      if (res?.publicUrl) {
        const encodedUrl = encodeURI(res.publicUrl);
        setData((prev: any) => ({ ...prev, heroImage: encodedUrl }));
      }
    } catch (err) {
      console.error("❌ Error uploading hero image:", err);
    }
    setUploading(false);
  };

  // Handle gallery upload (multiple files)
  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles((prev) => [...prev, ...files]);

    setUploading(true);
    try {
      const uploadPromises = files.map((file) => uploadImage(file));
      const results = await Promise.all(uploadPromises);
      const uploadedUrls = results
        .filter((r) => r?.publicUrl)
        .map((r) => encodeURI(r.publicUrl));

      setData((prev: any) => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...uploadedUrls],
      }));
    } catch (err) {
      console.error("❌ Error uploading gallery images:", err);
    }
    setUploading(false);
  };

  const handleRemoveGalleryImage = (index: number) => {
    const updated = [...(data.gallery || [])];
    updated.splice(index, 1);
    setData({ ...data, gallery: updated });

    const updatedFiles = [...galleryFiles];
    updatedFiles.splice(index, 1);
    setGalleryFiles(updatedFiles);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold">Event Images</h2>

      {/* Hero Section */}
      <div>
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Hero Image <span className="text-red-500">*</span>
        </label>

        {data.heroImage && (
          <div className="relative mb-3">
            <img
              src={data.heroImage}
              alt="Hero"
              className="rounded-md h-40 w-full object-cover border"
            />
            <button
              onClick={() => setData({ ...data, heroImage: "" })}
              className="absolute top-2 right-2 bg-white/80 text-red-600 border border-red-500 px-2 py-1 text-xs rounded-md hover:bg-red-600 hover:text-white transition"
            >
              Remove
            </button>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          id="hero-file-upload"
          onChange={handleHeroChange}
          className="hidden"
        />
        <label htmlFor="hero-file-upload">
          <div className="cursor-pointer border border-blue-500 px-4 py-2 text-sm text-blue-500 rounded-md inline-block hover:bg-blue-50">
            Upload Hero Image
          </div>
        </label>
      </div>

      {/* Gallery Section */}
      <div>
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Gallery Images
        </label>

        <input
          type="file"
          accept="image/*"
          id="gallery-file-upload"
          multiple
          onChange={handleGalleryChange}
          className="hidden"
        />
        <label
          htmlFor="gallery-file-upload"
          className="cursor-pointer border border-blue-500 px-4 py-2 text-sm text-blue-500 rounded-md inline-block hover:bg-blue-50"
        >
          Upload Gallery
        </label>

        {data.gallery?.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data.gallery.map((url: string, index: number) => (
              <div
                key={index}
                className="relative group border rounded overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  onClick={() => handleRemoveGalleryImage(index)}
                  className="absolute top-1 right-1 bg-white/80 hover:bg-red-600 text-black hover:text-white p-1 rounded-full transition"
                  title="Remove"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {uploading && (
        <p className="text-sm text-blue-500">Uploading image(s)...</p>
      )}
      {/* Dropzone UI Placeholder */}
      <div className="mt-6 border-2 border-dashed border-blue-400 rounded-lg py-12 text-center text-sm text-gray-600">
        <div className="flex justify-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3m0-6v-1a4 4 0 00-8 0v1"
            />
          </svg>
        </div>
        <p>
          Drag your file(s) or{" "}
          <span className="text-blue-500 underline cursor-pointer">browse</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Max 10 MB files are allowed
        </p>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Note: Only support <code>.jpg</code>, <code>.png</code>,{" "}
        <code>.svg</code> and zip files
      </p>
    </div>
  );
}
