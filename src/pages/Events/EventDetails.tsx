import { useLocation, useNavigate } from "react-router-dom";
import DisplayImage from "/public/banner/displayImage.png";
import ShieldImage from "/public/banner/shield.png";
import DateIcon from "/public/banner/icons/dateIcon.png";
import ClockIcon from "/public/banner/icons/clockIcon.png";
import LocationIcon from "/public/banner/icons/locationIcon.png";
import WorkshopIcon from "/public/banner/icons/workshopIcon.png";
import HourglassIcon from "/public/banner/icons/hourglassIcon.png";
import LanguageIcon from "/public/banner/icons/languageIcon.png";
import { TooltipComponent } from "@/components/TooltipComponent";
import React from "react";
import {  useState } from "react";

// import { EventTabs } from '@/components/activity/EventTabs' make this later

const EventDetails = () => {

  const { state } = useLocation();
  const activity = state?.activity;
  const [selectedIndex, setSelectedIndex] = useState(0);


  const isEventConcluded = React.useMemo(() => {
    if (!activity?.date) return false;
    const eventDate = new Date(activity.date);
    const today = new Date();
    return eventDate < today;
  }, [activity]);

  const selectedImage =
    activity?.gallery?.[selectedIndex] || activity?.bannerImage;
  const tabs = ["About", "Ambassador", "Schedule", "FAQs"];
  if (isEventConcluded) {
    tabs.push("Gallery");
  }



  return (
    <>
      <section className="px-4 -py-2">
        {/* White Card Wrapper */}
        <div
          className="mb-10 mt-4 flex flex-col gap-6 rounded-2xl bg-white p-4 shadow-lg lg:flex-row dark:bg-[#1e1e1e]"
          style={{ minHeight: "900px" }}
        >
          {/* LEFT SECTION */}
          <div className="flex-1 space-y-6 pr-2">
            <div
              className="relative rounded-xl p-6 shadow-sm dark:border-[#333] dark:bg-[#181818]"
              style={{ backgroundColor: "#F4F4F4" }}
            >
              <h2 className="mb-1 text-2xl font-bold">{activity?.title}</h2>
              <p className="mb-4 text-sm text-gray-400">Hosted By</p>
              <div className="mb-4 flex items-center gap-2">
                <img
                  src={DisplayImage}
                  alt="host"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-lg font-medium">
                  {activity?.ambassadorName}
                </span>
                <TooltipComponent text="X-Ambassador">
                  <img
                    src={ShieldImage}
                    alt="badge"
                    className="ml-1 h-6 cursor-pointer"
                  />
                </TooltipComponent>
              </div>

              <div className="mb-2 aspect-video overflow-hidden rounded-xl">
                <img
                  src={selectedImage}
                  alt={activity?.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {activity?.gallery?.map((_: any, i: any) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      selectedIndex === i
                        ? "w-8 bg-black dark:bg-white"
                        : "w-2 bg-[#999999]"
                    }`}
                  ></button>
                ))}
              </div>

              <div className="mt-6 grid w-full grid-cols-5 gap-4 rounded-xl bg-gray-50 p-3 dark:bg-[#121212]">
                {activity?.gallery
                  ?.slice(0, 5)
                  .map((img: string, idx: number) => {
                    const isSelected = selectedIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`relative h-16 w-full cursor-pointer`}
                        onClick={() => setSelectedIndex(idx)}
                      >
                        <img
                          src={img}
                          alt={`thumb-${idx}`}
                          className="h-full w-full rounded-lg object-cover"
                        />
                        {isSelected && (
                          <div>
                            <span className="corner top-left" />
                            <span className="corner top-right" />
                            <span className="corner bottom-left" />
                            <span className="corner bottom-right" />
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Uncomment when you add EventTabs */}
            {/* <EventTabs
              activity={activity}
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            /> */}
          </div>

          {/* RIGHT SECTION */}
          <div className=" top-24 w-full space-y-6 self-start rounded-xl lg:w-[310px]">
            <div
              className="rounded-xl  p-6 shadow-sm dark:border-[#333] dark:bg-[#181818] space-y-4"
              style={{ backgroundColor: "#F4F4F4" }}
            >
              <h3 className="text-lg font-semibold">Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-red-500">
                    <img src={DateIcon} />
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p>
                      {activity?.startDateTime
                        ? new Date(activity.startDateTime).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-green-500">
                    <img src={ClockIcon} />
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p>{activity?.time} Onwards</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-orange-500">
                    <img src={LocationIcon} />
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="cursor-pointer underline">
                      {activity?.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-yellow-700">
                    <img src={WorkshopIcon} />
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p>{activity?.type}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-blue-500">
                    <img src={HourglassIcon} />
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p>{activity?.duration} Hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-purple-500">
                    <img src={LanguageIcon} />
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">Language</p>
                    <p>{activity?.language}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetails;
