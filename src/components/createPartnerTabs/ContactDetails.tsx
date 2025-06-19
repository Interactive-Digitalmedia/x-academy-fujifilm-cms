import * as React from "react";
import { Input } from "@/components/ui/input";

interface ContactDetailsProps {
  data: {
    email?: string;
    phone?: string;
    instagram?: string;
    facebook?: string;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      email?: string;
      phone?: string;
      instagram?: string;
      facebook?: string;
    }>
  >;
}

export default function ContactDetails({ data, setData }: ContactDetailsProps) {
  return (
    <div className="space-y-3 mt-[-8px]">
      <h2 className="text-base font-bold mb-1">Contact Details - Internal</h2>

      {/* Row 1: Email and Phone */}
      <div className="flex gap-6">
        <div className="flex-1">
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
        </div>

        <div className="flex-1">
          <label
            className="block text-sm font-medium text-[#818181] mb-1"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full border placeholder:text-[15px] rounded-lg px-3 py-2 shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 focus:bg-gray-100"
            value={data.phone || ""}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
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
            value={data.instagram || ""}
            onChange={(e) => setData({ ...data, instagram: e.target.value })}
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
            value={data.facebook || ""}
            onChange={(e) => setData({ ...data, facebook: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
