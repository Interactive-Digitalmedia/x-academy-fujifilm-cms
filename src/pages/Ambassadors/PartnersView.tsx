import React, { useEffect, useState } from "react";
import { Search, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PartnersGridView from "@/components/partners/PartnersGridView";
import PartnersListView from "@/components/partners/PartnersListView";
// import { PartnersList } from "@/assets/PartnersList";
import { getAmbassadors, searchAmbassadors } from "@/api/ambassadors";
import { Ambassador } from "@/types";
import { debounce } from "@/utils/debounce";

const PartnersView: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeType, setActiveType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(false);
  const types = ["All", "Ambassadors", "Evangelists"];

  useEffect(() => {
    const shouldFetchAll = activeType === "All" && searchQuery.length < 3;
    if (!shouldFetchAll) return;
    const load = async () => {
      const response = await getAmbassadors();
      if (response?.data) {
        setAmbassadors(response.data);
      }
    };
    load();
  }, [activeType, searchQuery]);

  useEffect(() => {
    const shouldSearch = searchQuery.length >= 3 || activeType !== "All";
    if (!shouldSearch) return;
    setLoading(true);
    const fetchData = async () => {
      const response = await searchAmbassadors(searchQuery, activeType);
      if (response?.data) {
        setAmbassadors(response.data);
      }
      setLoading(false);
    };
    const debouncedFetch = debounce(fetchData, 1000);
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [searchQuery, activeType]);

  return (
    <div className="w-full  mx-auto px-4 pt-4 pb-6 bg-white rounded-xl border border-gray-200">
      <div className="w-full">
        {/* Search + Toggles + Filter Controls */}
        <div className="flex justify-between items-center mb-6 w-full">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[280px] w-full mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 bg-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* View Toggles + Filter Button */}
          <div className="flex items-center gap-3">
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
            {/* 
            <Button variant="outline" size="sm" className="h-[41px] px-3 gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filters</span>
            </Button> */}
          </div>
        </div>

        {/* Role Filter Toggle Buttons */}
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
              }}
              onClick={() => setActiveType(type)}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10 text-muted-foreground text-sm">
            Loading partners...
          </div>
        ) : ambassadors.length === 0 ? (
          <div className="flex justify-center items-center py-10 text-muted-foreground text-sm">
            No partners found.
          </div>
        ) : viewMode === "grid" ? (
          <PartnersGridView partners={ambassadors} />
        ) : (
          <PartnersListView partners={ambassadors} />
        )}
      </div>
    </div>
  );
};

export default PartnersView;
