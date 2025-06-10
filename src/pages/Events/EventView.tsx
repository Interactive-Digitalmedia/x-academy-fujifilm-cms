import React, { useState, useEffect } from "react";
import { Search, Grid3X3, List, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventTable } from "@/components/events/EventTable";
import ActivityGrid from "@/components/events/ActivityGrid";
import { dummyEvents } from "@/assets/dummyEvents";
import { Calendar as CustomCalendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import FilterCard from "@/components/ui/filtercard";

const EventView: React.FC = () => {
  const [activeType, setActiveType] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchText, setSearchText] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [filteredResults, setFilteredResults] = useState(dummyEvents);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [showFilters, setShowFilters] = useState(false);

  const types = ["All", "Event", "Workshop", "Exhibition"];

  const parseDMY = (dmy: string): Date => {
    const [day, month, year] = dmy.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    const lowerSearch = searchText.toLowerCase();

    const filtered = dummyEvents.filter((event) => {
      const matchesType = activeType === "All" || event.type === activeType;
      const from = selectedRange?.from;
      const to = selectedRange?.to;
      const eventDate = parseDMY(event.date);
      const matchesDate =
        !from || !to || (eventDate >= from && eventDate <= to);

      return (
        matchesType &&
        (!activeFilters.type || event.type === activeFilters.type) &&
        (!activeFilters.organizer ||
          event.organizer === activeFilters.organizer) &&
        (searchText.length < 3 ||
          event.name.toLowerCase().includes(lowerSearch) ||
          event.location.toLowerCase().includes(lowerSearch) ||
          event.organizer.toLowerCase().includes(lowerSearch)) &&
        matchesDate
      );
    });

    setFilteredResults(filtered);
  }, [activeType, searchText, selectedRange, activeFilters]);

  return (
    <div
      style={{
        display: "flex",
        width: "965px",
        padding: "16px 16px 67px 16px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        border: "1px solid #EDEDED",
        background: "#FFF",
      }}
    >
      <div className="w-full">
        {/* Search + controls */}
        <div className="flex justify-between items-center mb-6 w-full">
          <div className="relative w-[680px] mr-4">
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
            {/* view toggle */}
            <div className="flex items-center gap-1 border border-muted rounded-md bg-muted/20 p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="p-2 h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="p-2 h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* calendar */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="h-[41px] px-3 gap-2"
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Dates</span>
              </Button>

              {showCalendar && (
                <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 shadow-lg rounded-md p-2">
                  <CustomCalendar
                    mode="range"
                    selected={selectedRange}
                    onSelect={(range) => {
                      setSelectedRange(range);
                      if (range?.from && range?.to) setShowCalendar(false);
                    }}
                  />
                </div>
              )}
            </div>

            {/* filters */}
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
                    data={dummyEvents}
                    sections={[
                      {
                        heading: "Type",
                        key: "type",
                        type: "button-group",
                        options: [
                          "Workshops",
                          "Exhibitions",
                          "Events",
                          "Online Seminars",
                          "Phototours",
                          "Photowalks",
                          "Service Camps",
                          "Others",
                        ],
                      },
                      {
                        heading: "Conducted By",
                        key: "organizer",
                        type: "dropdown",
                        options: Array.from(
                          new Set(dummyEvents.map((e) => e.organizer))
                        ),
                      },
                    ]}
                    onFiltered={(filtered, active) => {
                      setActiveFilters(active);
                      setFilteredResults(filtered);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* quick type buttons */}
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

        {/* grid or list */}
        {viewMode === "grid" ? (
          <ActivityGrid
            demoActivities={filteredResults.map((e) => ({
              id: e.id,
              title: e.name,
              type: e.type,
              status: e.status.toLowerCase(),
              bannerImage: e.img,
              location: e.location,
              startDateTime: "2025-05-26T10:00:00",
              ambassadorName: e.organizer,
              time: "10:00 AM",
              duration: 60,
              language: "English",
              about: {
                whyShouldYouAttend: "Lorem ipsum dolor sit amet.",
                whatsIncluded: ["Session 1", "Session 2"],
                about: "Lorem ipsum placeholder content.",
              },
              gallery: [],
              ambassador: [],
              FAQ: [],
              seatCount: 100,
              pendingSeats: 20,
              isFeatured: false,
              tags: [],
            }))}
          />
        ) : (
          <EventTable filteredEvents={filteredResults} />
        )}
      </div>
    </div>
  );
};

export default EventView;
