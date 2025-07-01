import React, { useState, useEffect } from "react";
import { Search, Filter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ActivityGrid from "@/components/events/ActivityGrid";
import FilterCard from "@/components/ui/filtercard";
import { getActivities } from "@/api/activity";
import { Activity } from "@/types";
import { useNavigate } from "react-router-dom";

const GridView: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchText, setSearchText] = useState("");
  const [activeType, setActiveType] = useState<string>("All");
  // const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
  //   {}
  // );
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const types = ["All", "Event", "Workshop", "Exhibition", "Drafts"];

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await getActivities();
      setActivities(response.data);
    };
    fetchActivities();
  }, []);

  // const lowerSearch = searchText.toLowerCase();

  const demoActivities = activities.map((a) => ({
    id: a._id,
    title: a.activityName,
    type: a.activityType,
    status: a.status,
    bannerImage: a.heroImage,
    location: a.location,
    startDateTime: `${a.startDate}T10:00:00`,
    ambassadorName:
      Array.isArray(a.ambassadorId) && a.ambassadorId.length > 0
        ? typeof a.ambassadorId[0] === "string"
          ? a.ambassadorId[0]
          : ((a.ambassadorId[0] as any).name ?? "Ambassador")
        : "Ambassador",
    time: "10:00 AM",
    duration: a.duration,
    language: a.language,
    about: a.about,
    gallery: a.gallery,
    ambassador: a.ambassadorId,
    FAQ: a.FAQ,
    seatCount: a.seatCount,
    pendingSeats: a.pendingSeats,
    isFeatured: a.isFeatured,
    tags: a.tags,
  }));

  // const filteredResults = demoActivities.filter((event) => {
  //   const matchesType = activeType === "All" || event.type === activeType;

  //   return (
  //     matchesType &&
  //     (!activeFilters.type || event.type === activeFilters.type) &&
  //     (!activeFilters.organizer ||
  //       event.ambassadorName === activeFilters.organizer) &&
  //     (searchText.length < 3 ||
  //       event.title.toLowerCase().includes(lowerSearch) ||
  //       event.location.toLowerCase().includes(lowerSearch) ||
  //       event.ambassadorName.toLowerCase().includes(lowerSearch))
  //   );
  // });

  return (
    <div
      style={{
        display: "flex",
        // width: "965px",
        padding: "16px 16px 67px 16px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        border: "1px solid #EDEDED",
        background: "#FFF",
      }}
    >
      <div className="w-full  ">
        {/* Heading + Add New */}
        <div className="flex justify-between items-center -mt-2 mb-2">
          <h2 className="text-xl font-bold">Events</h2>
          <Button
            className="bg-[#0099FF] hover:bg-[#008ae6] text-white font-medium px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
            onClick={() => navigate("/events/create-events")}
          >
            <PlusCircle className="w-4 h-4 text-white" />
            Create New
          </Button>
        </div>

        {/* Search + Controls */}
        <div className="flex justify-between items-center mb-6 w-full">
          <div className="relative w-full mr-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 bg-muted/50"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Filters */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="h-[41px] px-3 gap-2"
                onClick={() => setShowFilters((prev) => !prev)}
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filters</span>
              </Button>

              {showFilters && (
                <div className="absolute right-0 z-50 mt-2 w-[300px] bg-white rounded-md">
                  <FilterCard
                    data={demoActivities}
                    sections={[
                      {
                        heading: "Type",
                        key: "type",
                        type: "button-group",
                        options: Array.from(
                          new Set(demoActivities.map((e) => e.type))
                        ),
                      },
                      {
                        heading: "Conducted By",
                        key: "organizer",
                        type: "dropdown",
                        options: Array.from(
                          new Set(demoActivities.map((e) => e.ambassadorName))
                        ),
                      },
                    ]}
                    onFiltered={() => {
                      // setActiveFilters(active);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick type filter */}
        <div className="mb-6 flex flex-wrap gap-3">
          {types.map((type) => (
            <button
              key={type}
              className={`btn-toggle ${
                activeType === type
                  ? "btn-toggle-active"
                  : "btn-toggle-inactive"
              }`}
              style={{
                display: "flex",
                width: "121px",
                padding: "6px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                alignSelf: "stretch",
              }}
              onClick={() => setActiveType(type)}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>

        {/* Render grid only */}
        <ActivityGrid demoActivities={activities} />
      </div>
    </div>
  );
};

export default GridView;
