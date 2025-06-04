import React, { useState } from "react";
import { Search, Grid3X3, List, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventTable } from "@/components/events/EventTable";
import { useNavigate } from "react-router-dom";

const EventView: React.FC = () => {
  const [activeType, setActiveType] = useState<string>("All"); // track selected toggle
  const types = ["All", "Event", "Workshop", "Exhibition"];
  const navigate = useNavigate();

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
        {/* Search and Controls Panel */}
        <div className="flex justify-between items-center mb-6 w-full">
          {/* Search Bar */}
          <div className="relative w-[680px] mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 bg-muted/50"
            />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* View Toggle Icons */}
            <div className="flex items-center gap-1 border border-muted rounded-md bg-muted/20 p-1">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8"
                onClick={() => navigate("/events")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" className="p-2 h-8 w-8">
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Dates Button */}
            <Button variant="outline" size="sm" className="h-[41px] px-3 gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Dates</span>
            </Button>

            {/* Filters Button */}
            <Button variant="outline" size="sm" className="h-[41px] px-3 gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filters</span>
            </Button>
          </div>
        </div>

        <div>
          {/* Toggle Buttons */}
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
        </div>

        <EventTable selectedType={activeType} />
      </div>
    </div>
  );
};

export default EventView;
