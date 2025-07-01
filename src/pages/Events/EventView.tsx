import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Grid3X3, List, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventTable } from "@/components/events/EventTable";
import ActivityGrid from "@/components/events/ActivityGrid";
import { Calendar as CustomCalendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import FiltersPopover from "@/components/ui/FiltersPopover";
import { getActivities } from "@/api/activity";
import { Activity } from "@/types";

const EventView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isFirstLoad = useRef(true);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedConductedBy, setSelectedConductedBy] = useState<string[]>([]);

  const [searchText, setSearchText] = useState("");
  const [activeType, setActiveType] = useState<string>("All");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredResults, setFilteredResults] = useState<Activity[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );

  const types = ["All", "Event", "Workshop", "Exhibition"];

  const ambassadors = Array.from(
    new Map(
      activities
        .flatMap((e) =>
          Array.isArray(e.ambassadorId)
            ? e.ambassadorId.map((a) =>
                typeof a === "string"
                  ? { _id: a, fullname: a }
                  : { _id: a._id, fullname: a.fullname }
              )
            : []
        )
        .map((a) => [a.fullname, a])
    ).values()
  );

  // Get data from API on mount
  useEffect(() => {
    const load = async () => {
      const response = await getActivities();
      setActivities(response.data);
      setFilteredResults(response.data); // default
    };
    load();
  }, []);

  // Hydrate filters from URL on first load
  useEffect(() => {
    if (isFirstLoad.current) {
      const params = Object.fromEntries([...searchParams.entries()]);

      if (params.type) {
        const matched = types.find(
          (t) => t.toLowerCase() === params.type?.toLowerCase()
        );
        if (matched) setActiveType(matched);
      }

      if (params.q) setSearchText(params.q);

      isFirstLoad.current = false;
    }
  }, []);

  // Build URL query string from current filters
  const buildQueryParams = () => {
    const params: Record<string, string> = {};
    if (searchText.length >= 3) params.q = searchText;
    if (activeType !== "All") params.type = activeType.toLowerCase();
    return params;
  };

  // Update URL when filters change
  useEffect(() => {
    if (isFirstLoad.current) return;

    const params = buildQueryParams();
    const query = new URLSearchParams(params).toString();
    navigate(`?${query}`, { replace: true });
  }, [searchText, activeType]);

  // Filter results when activities or filters change
  useEffect(() => {
    const lowerSearch = searchText.toLowerCase();

    const filtered = activities.filter((event) => {
      const matchesQuickType =
        activeType === "All" ||
        event.activityType.toLowerCase() === activeType.toLowerCase();

      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(event.activityType);

      const matchesAmbassadors =
        selectedConductedBy.length === 0 ||
        (Array.isArray(event.ambassadorId) &&
          event.ambassadorId.some((a) => {
            const name = typeof a === "string" ? a : a.fullname;
            return selectedConductedBy.includes(name);
          }));

      const from = selectedRange?.from;
      const to = selectedRange?.to;
      const eventDate = new Date(event.startDate);
      const matchesDate =
        !from || !to || (eventDate >= from && eventDate <= to);

      const matchesSearch =
        searchText.length < 3 ||
        event.activityName.toLowerCase().includes(lowerSearch) ||
        event.location.toLowerCase().includes(lowerSearch);

      return (
        matchesQuickType &&
        matchesType &&
        matchesAmbassadors &&
        matchesSearch &&
        matchesDate
      );
    });

    setFilteredResults(filtered);
  }, [
    activities,
    activeType,
    selectedTypes,
    selectedConductedBy,
    searchText,
    selectedRange,
    activeFilters,
  ]);

  return (
    <div className="w-full  mx-auto px-4 pt-4 pb-6 bg-white rounded-xl border border-gray-200">
      <div className="w-full">
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
            {/* View toggle */}
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

            {/* Calendar */}
            <div className="relative">
              <Button
                size="sm"
                className={`h-[40px] px-3 gap-2 text-sm ${
                  showCalendar
                    ? "bg-[#cdeafd] border border-[#1098f7] text-black hover:bg-[#cdeafd]"
                    : "bg-white border-2 border-gray-200 text-black hover:bg-white"
                }`}
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                <Calendar className="h-4 w-4" />
                <span>Dates</span>
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

            {/* FiltersPopover (replaces old Filter button + FilterCard) */}
            <FiltersPopover
              types={[
                "Event",
                "Workshop",
                "Exhibition",
                "Online Seminars",
                "Phototours",
                "Photowalks",
                "Service Camps",
                "Others",
              ]}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              selectedConductedBy={selectedConductedBy}
              setSelectedConductedBy={setSelectedConductedBy}
              ambassadors={ambassadors}
              onReset={() => {
                setSelectedTypes([]);
                setSelectedConductedBy([]);
              }}
            />
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

        {/* Grid or Table */}
        {viewMode === "grid" ? (
          <ActivityGrid demoActivities={filteredResults} />
        ) : (
          <EventTable demoActivities={filteredResults} />
        )}
      </div>
    </div>
  );
};

export default EventView;
