import React, { useEffect, useState } from "react";
import { Search, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CustomCalendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

import { dummyCommunity } from "@/assets/dummyCommunity";
import FilterCard from "@/components/ui/filtercard";
import { CommunityTable } from "@/components/community/CommunityTable";

const CommunityOptions: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [activeTab, setActiveTab] = useState("Ask the Expert");
  const [filteredCommunity, setFilteredCommunity] = useState(dummyCommunity);

  const parseDMY = (dmy: string): Date => {
    const [day, month, year] = dmy.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    const lowerSearch = searchText.toLowerCase();

    const filtered = dummyCommunity.filter((item) => {
      const matchesSearch =
        searchText.length < 3 ||
        item.raisedBy?.toLowerCase().includes(lowerSearch) ||
        item.question?.toLowerCase().includes(lowerSearch);

      const matchesFilters =
        !activeFilters.status || item.status === activeFilters.status;

      const itemDate = parseDMY(item.date);
      const from = selectedRange?.from;
      const to = selectedRange?.to;
      const matchesDate = !from || !to || (itemDate >= from && itemDate <= to);

      return matchesSearch && matchesFilters && matchesDate;
    });

    setFilteredCommunity(filtered);
  }, [searchText, selectedRange, activeFilters]);

  return (
    <div
      style={{
        display: "flex",
        width: "954px",
        padding: "16px 16px 67px 16px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        border: "1px solid #EDEDED",
        background: "#FFF",
      }}
    >
      <div className="w-full">
        <h2 className="text-xl font-bold mb-2">Community</h2>

        {/* Controls Row */}
        <div className="flex justify-between items-center mb-6 w-full">
          {/* Search Bar */}
          <div className="relative w-[738px] mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 bg-muted/50"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Date Picker + Filter Button */}
          <div className="flex items-center gap-3">
            {/* Calendar Toggle */}
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
                      if (range?.from && range?.to) {
                        setShowCalendar(false);
                      }
                    }}
                  />
                </div>
              )}
            </div>

            {/* Filter Button */}
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
                    data={dummyCommunity}
                    sections={[
                      {
                        heading: "Status",
                        key: "status",
                        type: "button-group",
                        options: ["Open", "In Progress", "Closed"],
                      },
                    ]}
                    onFiltered={(_, active) => setActiveFilters(active)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-3">
          {["Ask the Expert", "Tips & Tricks"].map((tab) => (
            <button
              key={tab}
              className={`btn-toggle ${
                activeTab === tab ? "btn-toggle-active" : "btn-toggle-inactive"
              }`}
              style={{
                display: "flex",
                width: "150px",
                padding: "6px 12px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Conditional Rendering */}
        {activeTab === "Ask the Expert" ? (
          <CommunityTable data={filteredCommunity} />
        ) : (
          <div className="text-center text-gray-600 py-8 text-lg font-medium">
            Tips & Tricks coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityOptions;
