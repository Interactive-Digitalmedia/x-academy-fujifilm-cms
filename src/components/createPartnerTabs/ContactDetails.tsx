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
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Contact Details - Internal</h2>

      {/* Row 1: Email and Phone */}
      <div className="flex gap-6">
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={data.email || ""}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="phone">
            Phone
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={data.phone || ""}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
        </div>
      </div>

      {/* Row 2: Instagram and Facebook */}
      <div className="flex gap-6">
        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="instagram">
            Instagram URL
          </label>
          <Input
            id="instagram"
            type="url"
            placeholder="Paste URL"
            value={data.instagram || ""}
            onChange={(e) => setData({ ...data, instagram: e.target.value })}
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-medium" htmlFor="facebook">
            Facebook URL
          </label>
          <Input
            id="facebook"
            type="url"
            placeholder="Paste URL"
            value={data.facebook || ""}
            onChange={(e) => setData({ ...data, facebook: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
