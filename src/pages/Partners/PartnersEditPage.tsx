import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import { badgeColors } from "@/assets/badgeColors";
import { PartnersList } from "@/assets/PartnersList";
import CreatePartnerLayout from "@/layouts/CreatePartnerLayout";

const PartnersEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const partner = PartnersList.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === id
  );

  const ambassador = partner && {
    ...partner,
    bio: partner.bio,
    tags: partner.tags,
    about: partner.about,
    gallery: partner.gallery,
    gear: partner.gear,
  };

  if (!ambassador) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Partner not found.</p>
        <button
          className="mt-4 rounded bg-black px-4 py-2 text-white"
          onClick={() => navigate("/partners")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="section pt-0 mt-0">
      {/* Top Card (same as AmbassadorProfile) */}
      <div className="bg-white py-5 px-5 rounded-xl w-full max-w-none mx-auto mb-6">
        <div className="relative min-h-[120px] w-full overflow-hidden rounded-t-2xl bg-[#0000001A] bg-[url('/checkerboard.svg')] bg-repeat" />
        <div className="-mt-10 flex items-end justify-between px-3 md:px-6">
          <div className="z-30 h-20 w-20 overflow-hidden rounded-full border-4 border-background md:h-28 md:w-28">
            <img
              src={ambassador.imageUrl}
              alt={ambassador.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex justify-end -mr-6">
            <button
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-100"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/reports/sample-ambassador-report.pdf";
                link.download = "Ambassador_Report.pdf";
                link.click();
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Ambassador Report
            </button>
          </div>
        </div>

        <div className="mt-[2rem] space-y-4">
          <h2 className="text-2xl font-bold">{ambassador.name}</h2>
          <p className="text-base leading-relaxed">
            <span className="font-semibold">Bio - </span>
            {ambassador.bio}
          </p>
          <div className="flex flex-wrap gap-2">
            {ambassador.tags.map((tag, index) => {
              const specificColor = badgeColors[index % badgeColors.length];
              return (
                <span key={index} className={`tag ${specificColor}`}>
                  {tag} Photography
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Edit Form Card */}
      <div className="bg-white py-5 px-5 rounded-xl w-full max-w-none mx-auto">
        <CreatePartnerLayout data={formData} setData={setFormData} />
      </div>
    </div>
  );
};

export default PartnersEditPage;
