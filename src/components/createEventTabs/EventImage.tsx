import { useState } from "react";
import { Input } from "@nextui-org/react";
import { X } from "lucide-react";

export default function EventImage({ data, setData }: any) {
  const [heroInput, setHeroInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");

  const handleAddHero = () => {
    if (!heroInput.trim()) return;
    setData({ ...data, bannerImage: heroInput.trim() });
    setHeroInput("");
  };

  const handleAddGallery = () => {
    if (!galleryInput.trim()) return;
    const updatedGallery = [...(data.gallery || []), galleryInput.trim()];
    setData({ ...data, gallery: updatedGallery });
    setGalleryInput("");
  };

  const handleRemoveGalleryImage = (index: number) => {
    const updated = [...(data.gallery || [])];
    updated.splice(index, 1);
    setData({ ...data, gallery: updated });
  };

  return (
    <div className="space-y-2 mt-[-25px]">
      <h2 className="text-base font-bold mb-1">Event Images</h2>

      {/* Hero Image */}
      <div>
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Hero Image
        </label>

        {data.bannerImage && (
          <div className="mb-4 relative">
            <img
              src={data.bannerImage}
              alt="Hero Preview"
              className="rounded-md h-40 w-full object-cover border"
            />
            <button
              onClick={() => setData({ ...data, bannerImage: "" })}
              className="absolute top-2 right-2 bg-white/80 text-red-600 border border-red-500 px-2 py-1 text-xs rounded-md hover:bg-red-600 hover:text-white transition"
            >
              Remove
            </button>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Image URL"
            value={heroInput}
            onChange={(e) => setHeroInput(e.target.value)}
            disabled={!!data.bannerImage}
            className="w-full border text-sm placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
          />
          <button
            onClick={() => {
              if (data.bannerImage) {
                alert(
                  "Only one hero image is allowed. Remove the current one first."
                );
                return;
              }
              if (!heroInput.trim()) return;
              setData({ ...data, bannerImage: heroInput.trim() });
              setHeroInput("");
            }}
            className=" text-[#1098F7] border border-[#1098F7] px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition w-[130px]"
          >
            Add Image
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Note: This is the main image that will be displayed at the top of your
          event page.
        </p>
      </div>

      {/* Gallery Images */}
      <div>
        <label className="block text-sm font-medium text-[#818181] mb-1">
          Gallery Images
        </label>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Image URL"
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            className="w-full border text-sm placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
          />
          <button
            onClick={handleAddGallery}
            className=" text-[#1098F7] border border-[#1098F7] px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition w-[130px]"
          >
            Add Image
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Note: Add additional images to showcase your event.
        </p>

        {data.gallery && data.gallery.length > 0 && (
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
            <span className="text-blue-500 underline cursor-pointer">
              browse
            </span>
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
    </div>
  );
}
