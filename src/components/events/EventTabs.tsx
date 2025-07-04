import { Accordion, AccordionItem } from "@nextui-org/react";
import GalleryMasonryGrid from "./GalleryMasonryGrid";
import FacebookIcon from "../../../public/banner/icons/facebookIcon.png";
import InstagramIcon from "../../../public/banner/icons/instagramIcon.png";
// import { badgeColors } from '@/assets/badgeColors'
// import ScheduleBulletIcon from '/public/images/banner/icons/scheduleBulletIcon.png'
import { useEffect, useState } from "react";
import { Ambassador, FaqItem } from "@/types";
import { useNavigate } from "react-router-dom";
import FrameIcon from "/public/banner/icons/Frame.svg";
import CupIcon from "/public/banner/icons/cup.svg";
import CameraIcon from "/public/banner/icons/Camera.svg";
import GiftIcon from "/public/banner/icons/Gift.svg";
import { ArrowUpRight } from "lucide-react";

interface EventTabsProps {
  activity: any;
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const humanize = (str: string) =>
  str
    .replace(/([A-Z])/g, " $1") // insert space before capitals
    .replace(/^./, (c) => c.toUpperCase());

export const EventTabs: React.FC<EventTabsProps> = ({
  activity,
  tabs,
  activeTab,
  setActiveTab,
}) => {
  const navigate = useNavigate();
  const [ambassador, setAmbassador] = useState<Ambassador | null>(null);
  const [, setFaq] = useState<FaqItem[]>([]);

  const whatsIncludedIcons: { [key: string]: string } = {
    "lunch Dinner": FrameIcon,
    "refreshments Beverages": CupIcon,
    "gear Provided": CameraIcon,
    "fujifilms Welcome Kit": GiftIcon,
  };

  useEffect(() => {
    if (activity) {
      setAmbassador(activity.ambassadorId[0] || null);
      setFaq(activity.FAQ?.items || []);
    }
  }, [activity]);

  return (
    <div className="mt-6 space-y-4">
      {/* Tabs */}
      <div className="flex overflow-x-auto text-sm font-medium scrollbar-hide">
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

      {activeTab === "Gallery" && (
        <div className="px-1 pt-2">
          <GalleryMasonryGrid images={activity?.gallery} />
        </div>
      )}

      {activeTab !== "Gallery" && (
        <div className="card space-y-5 p-4 text-sm">
          {activeTab === "About" && (
            <>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {activity?.tags?.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 text-xs rounded-full text-white bg-[#2073F0]`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Why Should You Attend */}
              {activity?.about?.whyShouldYouAttend && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-500">
                    Why Should You Attend?
                  </h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {activity.about.whyShouldYouAttend
                      .split(".")
                      .filter((s: string) => s.trim().length > 0)
                      .map((point: string, i: number) => (
                        <li key={i}>{point.trim()}.</li>
                      ))}
                  </ul>
                </div>
              )}

              {/* What's Included */}
              {activity?.about?.whatsIncluded?.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-500">
                    What's Included
                  </h4>
                  <ul className="space-y-3">
                    {activity.about.whatsIncluded.map(
                      (item: string, i: number) => {
                        const cleanLabel = item
                          .replace(/([A-Z])/g, " $1")
                          .trim(); // In case you still use camelCase
                        const iconSrc = whatsIncludedIcons[cleanLabel] || null;

                        return (
                          <li
                            key={i}
                            className="flex items-center gap-3 font-medium text-[15px]"
                          >
                            {iconSrc && (
                              <img
                                src={iconSrc}
                                alt={cleanLabel}
                                className="h-5 w-5 object-contain"
                              />
                            )}
                            {cleanLabel}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              )}

              {/* About Event */}
              {activity?.about?.about && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-gray-500">
                    About the Event
                  </h4>
                  <p className="leading-relaxed">{activity.about.about}</p>
                </div>
              )}
            </>
          )}

          {/* Placeholder content for other tabs */}
          {activeTab === "Ambassador" && ambassador && (
            <div className="flex flex-col items-start gap-6 md:flex-row">
              {ambassador?.profileImage && (
                <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white text-center md:w-1/2">
                  <img
                    src={ambassador.profileImage}
                    alt={ambassador.fullname}
                    className="w-full rounded-md object-cover"
                  />
                </div>
              )}
              <div className="flex-1 space-y-4">
                <p className="leading-relaxed">{ambassador?.bio}</p>
                {ambassador.socialMediaUrls && (
                  <div className="flex gap-3">
                    {ambassador.socialMediaUrls.instagram && (
                      <a
                        href={ambassador.socialMediaUrls.instagram}
                        target="_blank"
                        className="icon-button flex items-center gap-1 rounded-[5px] border-none py-2 text-[12px] md:px-2 md:text-base"
                      >
                        <img
                          src={InstagramIcon}
                          alt="Instagram"
                          className="mr-1 h-4 w-4"
                        />
                        Instagram
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                    {ambassador.socialMediaUrls.facebook && (
                      <a
                        href={ambassador.socialMediaUrls.facebook}
                        target="_blank"
                        className="icon-button flex items-center gap-1 rounded-[8px] border-none py-2 text-[12px] md:px-2 md:text-base"
                      >
                        <img
                          src={FacebookIcon}
                          alt="Facebook"
                          className="mr-1 h-4 w-4"
                        />
                        Facebook
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "Schedule" && (
            <div className="space-y-6">
              {activity?.schedule?.map((dayObj: any, dayIdx: number) => {
                // Use the first session’s `day` as the heading
                const dayLabel =
                  dayObj?.sessions?.[0]?.day || `Day ${dayIdx + 1}`;

                return (
                  <div key={dayIdx} className="space-y-4">
                    {/* ----- Day Title ----- */}
                    <h3 className="text-sm font-semibold text-gray-400">
                      {dayLabel}
                    </h3>

                    {/* ----- Sessions ----- */}
                    {dayObj.sessions.map((session: any, idx: number) => (
                      <div key={idx} className="relative flex gap-4">
                        {/* Timeline column */}
                        <div className="relative flex flex-col items-center">
                          {/* Vertical line except for the last item */}
                          {idx !== dayObj.sessions.length - 1 && (
                            <div className="absolute left-1/2 top-6 z-0 h-full w-px -translate-x-1/2 bg-[#006C5180]" />
                          )}
                          {/* Dot icon */}
                          <div className="z-10 h-5 w-5 rounded-full bg-[#006C51]" />
                        </div>

                        {/* Session details */}
                        <div className="flex-1 pb-4">
                          <h4 className="font-semibold leading-tight">
                            {session.title}
                          </h4>

                          {session.speaker && (
                            <p className="text-sm italic text-gray-600 mb-1">
                              by {session.speaker}
                            </p>
                          )}

                          <p className="mb-1 text-sm font-medium">
                            {session.startTime} – {session.endTime}
                          </p>

                          {session.description &&
                            // Split description on periods for bullets; fallback to plain text
                            (session.description.includes(".") ? (
                              <ul className="list-disc space-y-1 pl-5 text-sm">
                                {session.description
                                  .split(".")
                                  .filter((s: string) => s.trim())
                                  .map((pt: string, i: number) => (
                                    <li key={i}>{pt.trim()}.</li>
                                  ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-700">
                                {session.description}
                              </p>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "FAQs" && activity?.FAQ?.items?.length > 0 && (
            <div className="space-y-4">
              <Accordion className="divide-y divide-white/10 border-none shadow-none">
                {activity.FAQ.items.map((item: any, index: number) => (
                  <AccordionItem
                    key={index}
                    aria-label={`faq-${index}`}
                    title={item.question}
                  >
                    {item.answer}
                  </AccordionItem>
                ))}
              </Accordion>

              <button
                onClick={() => navigate("/profile/contact-us")}
                className="icon-button w-full rounded-md py-2 text-center font-medium transition"
              >
                Contact Us
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
