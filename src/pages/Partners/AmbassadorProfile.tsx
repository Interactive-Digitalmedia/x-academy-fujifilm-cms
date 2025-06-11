import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { badgeColors } from "@/assets/badgeColors";
import { demoActivities } from "@/assets/demoActivities";
import GalleryMasonryGrid from "@/components/partners/partnerpreview/GalleryMasonryGrid";
import GearDetailsGrid from "@/components/partners/partnerpreview/GearDetailsGrid";
import { ambassadorGear } from "@/assets/ambassadorGear";
import { Download } from "lucide-react";

const AmbassadorProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ambassador = {
    name: "John Doe",
    image: "/images/ambassadors/sampleAmbassador.jpg",
    bio: "Award-winning photographer known for urban landscapes and portraits.",
    tags: ["Street", "Portrait", "Documentary"],
    about: {
      who: "John Doe is a self-taught photographer. He has worked across Asia and Europe.",
      about:
        "John Doe has a deep love for capturing candid human emotions and vibrant city life.\nHe has collaborated with brands like Fujifilm and Adobe.",
    },
    gallery: [
      "/images/gallery/sample1.jpg",
      "/images/gallery/sample2.jpg",
      "/images/gallery/sample3.jpg",
    ],
  };

  const tabs = ["About", "Gallery", "Gear Details"];
  const [activeTab, setActiveTab] = useState("About");

  if (!ambassador) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Ambassador not found.</p>
        <button
          className="mt-4 rounded bg-black px-4 py-2 text-white"
          onClick={() => navigate("/ambassadors")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="section pt-0 mt-0">
      {/* Banner */}
      <div className="bg-white py-5 px-5 rounded-xl w-full max-w-none mx-auto mb-6">
        <div className="relative min-h-[120px] w-full overflow-hidden rounded-t-2xl bg-[#0000001A] bg-[url('/checkerboard.svg')] bg-repeat" />

        <div className="-mt-10 flex items-end justify-between px-3 md:px-6">
          <div className="z-30 h-20 w-20 overflow-hidden rounded-full border-4 border-background md:h-28 md:w-28">
            <img
              src={ambassador.image}
              alt={ambassador.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex justify-end -mr-6 ">
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
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{ambassador.name}</h2>
          </div>

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

      {/* Tabs */}
      <div className="-mt-4">
        <div className="flex overflow-x-auto whitespace-nowrap text-sm font-medium scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 transition-all ${
                activeTab === tab
                  ? "font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white py-5 px-5 rounded-xl w-full mt-3 max-w-none mx-auto mb-6">
        {activeTab === "Gear Details" ? (
          <div className="bg-white rounded-xl p-4 w-full">
            <GearDetailsGrid gear={ambassadorGear} />
          </div>
        ) : (
          <div className="bg-white rounded-xl p-4 w-full text-sm">
            {activeTab === "About" && (
              <>
                {ambassador.about?.who && (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-400">
                      Who is {ambassador.name}?
                    </h4>
                    <ul className="list-disc space-y-1 pl-5">
                      {ambassador.about.who
                        .split(".")
                        .filter((line) => line.trim().length > 0)
                        .map((line, idx) => (
                          <li key={idx}>{line.trim()}.</li>
                        ))}
                    </ul>
                  </div>
                )}

                {ambassador.about?.about && (
                  <div>
                    <h4 className="mb-2 mt-4 text-sm font-semibold text-gray-400">
                      About Ambassador
                    </h4>
                    <p className="whitespace-pre-line leading-relaxed">
                      {ambassador.about.about}
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === "Gallery" && (
              <div className="pt-2">
                <GalleryMasonryGrid images={ambassador.gallery || []} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AmbassadorProfile;
