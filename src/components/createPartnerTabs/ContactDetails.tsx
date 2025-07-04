import * as React from "react";
import { Ambassador } from "@/types";

interface ContactDetailsProps {
  data: Partial<Ambassador>;
  setData: React.Dispatch<React.SetStateAction<Partial<Ambassador>>>;
}

export default function ContactDetails({ data, setData }: ContactDetailsProps) {
  return (
    <div className="space-y-3 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Contact Details - Internal</h2>

      {/* Row 1: Email and Phone */}
      <div className="flex gap-6">
        {/* <div className="flex-1">
          <label
            className="block text-sm font-medium text-[#818181] mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            value={data.email || ""}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div> */}

        <div className="flex-1">
          <label
            className="block text-sm font-medium text-[#818181] mb-1"
            htmlFor="contactNumber"
          >
            Phone
          </label>
          <input
            id="contactNumber"
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            value={data.contactNumber || ""}
            onChange={(e) =>
              setData({ ...data, contactNumber: e.target.value })
            }
          />
        </div>
      </div>

      {/* Row 2: Instagram and Facebook */}
      <div className="flex gap-6">
        <div className="flex-1">
          <label
            className="block text-sm font-medium text-[#818181] mb-1"
            htmlFor="instagram"
          >
            Instagram URL
          </label>
          <input
            id="instagram"
            type="url"
            placeholder="Paste URL"
            className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            value={data.socialMediaUrls?.instagram || ""}
            onChange={(e) =>
              setData({
                ...data,
                socialMediaUrls: {
                  ...data.socialMediaUrls,
                  instagram: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="flex-1">
          <label
            className="block text-sm font-medium text-[#818181] mb-1"
            htmlFor="facebook"
          >
            Facebook URL
          </label>
          <input
            id="facebook"
            type="url"
            placeholder="Paste URL"
            className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            value={data.socialMediaUrls?.facebook || ""}
            onChange={(e) =>
              setData({
                ...data,
                socialMediaUrls: {
                  ...data.socialMediaUrls,
                  facebook: e.target.value,
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
