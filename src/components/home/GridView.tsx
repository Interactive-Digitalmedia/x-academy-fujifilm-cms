import React, { useState, useEffect, useRef } from "react";
import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ActivityGrid from "@/components/events/ActivityGrid";
import { getActivities } from "@/api/activity";
import { Activity } from "@/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import FiltersPopover from "@/components/ui/FiltersPopover";

const GridView: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isFirstLoad = useRef(true);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchText, setSearchText] = useState("");
  const [activeType, setActiveType] = useState<string>("All");

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedConductedBy, setSelectedConductedBy] = useState<string[]>([]);

  const types = ["All", "Event", "Workshop", "Exhibition"];

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await getActivities();
      setActivities(response.data);
    };
    fetchActivities();
  }, []);

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

  useEffect(() => {
    if (isFirstLoad.current) return;
    const params: Record<string, string> = {};
    if (searchText.length >= 3) params.q = searchText;
    if (activeType !== "All") params.type = activeType.toLowerCase();
    navigate(`?${new URLSearchParams(params).toString()}`, { replace: true });
  }, [searchText, activeType]);

  const lowerSearch = searchText.toLowerCase();

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

  const filteredResults = activities.filter((event) => {
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(event.activityType);

    const matchesAmbassadors =
      selectedConductedBy.length === 0 ||
      (Array.isArray(event.ambassadorId) &&
        event.ambassadorId.some((a) => {
          const name = typeof a === "string" ? a : a.fullname;
          return selectedConductedBy.includes(name);
        }));

    const matchesSearch =
      searchText.length < 3 ||
      event.activityName.toLowerCase().includes(lowerSearch) ||
      event.location.toLowerCase().includes(lowerSearch);

    return matchesSearch && matchesType && matchesAmbassadors;
  });

  return (
    <div
      style={{
        padding: "16px 16px 67px 16px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        border: "1px solid #EDEDED",
        background: "#FFF",
      }}
    >
      <div className="w-full">
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

        {/* Search + Filters */}
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

        {/* Grid View */}
        <ActivityGrid demoActivities={filteredResults} />
      </div>
    </div>
  );
};

export default GridView;
