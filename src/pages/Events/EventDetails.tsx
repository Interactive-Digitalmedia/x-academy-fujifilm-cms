// import { Headphones } from 'lucide-react'
import {  useParams } from "react-router-dom";
import goldenBadge from "/public/banner/goldenBadge.webp";
import silverBadge from "/public/banner/silverBadge.webp";
// import { Bookmark } from 'lucide-react'
import { useEffect, useState } from "react";
import React from "react";
import { EventTabs } from "@/components/events/EventTabs";
import { useActivityStore } from "@/Zustang/useActivityStore";
import { Activity } from "@/types";
import DateIcon from "@/components/Activity/DateIcon";
import TimeIcon from "@/components/Activity/TimeIcon";
import LocationIcon from "@/components/Activity/LocationIcon";
import TypeIcon from "@/components/Activity/TypeIcon";
import DurationIcon from "@/components/Activity/DurationIcon";
import LanguageIcon from "@/components/Activity/LanguageIcon";
import { TooltipComponent } from "@/components/TooltipComponent";

const ActivityDetails = () => {
  const { selectedActivity, fetchActivitiesById, fetchActivities } =
    useActivityStore();
  // const pathSegments = location.pathname.split('/').filter(Boolean)
  const { activityId } = useParams<{ activityId: string }>();
  // const { state } = useLocation()
  // const activityData = state?.activity
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("About");
  const activity: Activity | null = selectedActivity;

  const isEventConcluded = React.useMemo(() => {
    if (!activity?.startDate) return false;
    const eventDate = new Date(activity.startDate);
    const today = new Date();
    return eventDate < today;
  }, [activity]);

  const selectedImage =
    activity?.gallery?.[selectedIndex] || activity?.heroImage;
  const tabs = ["About", "Ambassador", "Schedule", "FAQs"];
  if (isEventConcluded) {
    tabs.push("Gallery");
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    if (!activityId) return;

    const fetchData = async () => {
      try {
        const response = await fetchActivitiesById(activityId);
        console.log("this is happening", response);
        // You can set data here if needed
        // setData(response.data);
      } catch (err) {
        console.error("Error fetching activity:", err);
      }
    };

    fetchData();
  }, [activityId]);

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 pt-4 pb-4 bg-white rounded-xl border border-gray-200">
        <div className="flex items-center space-x-2 py-1 text-sm">
          {activity?.status === "draft" ? (
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
              Draft
            </span>
          ) : (
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
              Published
            </span>
          )}
          {/* {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1
              return (
                <React.Fragment key={index}>
                  {index > 0 && <span className='text-gray-500'>/</span>}
                  <span
                    className={
                      isLast
                        ? 'font-medium capitalize text-gray-900 dark:text-white'
                        : 'cursor-pointer capitalize text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }
                    onClick={() => {
                      // if (!isLast && segment === 'blogs') {
                      navigate('/activity')
                      // }
                    }}
                  >
                    {activity?.title}
                  </span>
                </React.Fragment>
              )
            })} */}
        </div>

        {/* three cards  */}
        <div className="relative flex flex-col-reverse gap-6 lg:flex-row lg:items-start">
          {/* LEFT SECTION */}
          <div className="flex-1 max-h-[calc(100vh-150px)] overflow-y-scroll pr-2  scrollbar-hide">
            {/* Event Overview Card */}

            <div className="card relative  p-4">
              {/* Top-right icons */}
              {/* <div className='absolute right-4 top-4 flex gap-2'>
                  <button className='icon-button'>
                    <Headphones className='h-5 w-5' />
                  </button>
                  <button className='icon-button'>
                    <Bookmark className='h-5 w-5' />
                  </button>
                </div> */}

              {/* Title & Host Info */}
              <h2 className="mb-1 text-3xl font-bold">
                {activity?.activityName}
              </h2>
              <p className="mb-4 text-sm text-gray-400">Hosted By</p>
              {activity?.ambassadorId &&
                activity.ambassadorId.length > 0 &&
                (() => {
                  const ambassador = activity.ambassadorId[0];

                  if (typeof ambassador === "string") return null;

                  return (
                    <div className="mb-4 flex items-center gap-2">
                      {ambassador.profileImage && (
                        <img
                          src={ambassador.profileImage}
                          alt="host"
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      {ambassador.fullname && (
                        <span className="text-lg font-medium">
                          {ambassador.fullname}
                        </span>
                      )}
                      <TooltipComponent
                        text={
                          ambassador.type === "X-Ambassador"
                            ? "X-Ambassador"
                            : "Evangelist"
                        }
                      >
                        <img
                          src={
                            ambassador.type === "X-Ambassador"
                              ? goldenBadge
                              : silverBadge
                          }
                          alt="badge"
                          className="ml-1 h-6 cursor-pointer"
                        />
                      </TooltipComponent>
                    </div>
                  );
                })()}

              {/* Main Image */}
              <div className="mb-2 aspect-video overflow-hidden rounded-xl">
                <img
                  src={selectedImage}
                  alt={activity?.activityName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Dots */}
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

              {/* Thumbnail Gallery */}
              <div className="mt-6 grid w-[100%] grid-cols-5 gap-5 p-2">
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

            <EventTabs
              activity={activity}
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* RIGHT SECTION */}
          <div className="sticky top-22 w-full space-y-6 self-start lg:w-[400px]">
            {/* Details Card */}
            <div className="card space-y-4 p-4">
              <h3 className="text-lg font-semibold">Details</h3>

              <div className="space-y-4 text-sm">
                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <DateIcon />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p>{activity?.startDate}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <TimeIcon />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p>
                      {activity?.schedule?.[0]?.sessions?.[0]?.startTime}{" "}
                      Onwards
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <LocationIcon />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="cursor-pointer underline">
                      {activity?.location}
                    </p>
                  </div>
                </div>

                {/* Type */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <TypeIcon />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p>{activity?.activityType}</p>
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <DurationIcon />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p>{activity?.duration} Hours</p>
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <LanguageIcon />
                  </div>
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

export default ActivityDetails;
