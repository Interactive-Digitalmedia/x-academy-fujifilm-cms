import React, { useState } from "react";
import { Search, Grid3X3, List, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import PartnerCard from "./PartnerCard";
import { PartnersList } from "@/assets/PartnersList";

const Partners: React.FC = () => {
  const [activeType, setActiveType] = useState<string>("All"); // track selected toggle
  const types = ["All", "Ambassadors", "Evangelists"];
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPartners = PartnersList.filter((partner) => {
    const matchesType =
      activeType === "All" ||
      partner.role.toLowerCase() === activeType.toLowerCase().slice(0, -1);

    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="bg-white h-max rounded-xl p-4">
      <div className="w-full">
        {/* Search and Controls Panel */}
        <div className="flex justify-between items-center mb-6 w-full">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[280px] max-w-[840px] mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 bg-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* View Toggle Icons */}
            <div className="flex items-center gap-1 border border-muted rounded-md bg-muted/20 p-1">
              <Button variant="secondary" size="sm" className="p-2 h-8 w-8">
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-8 w-8"
                onClick={() => navigate("/PartnersListView")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

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
          {/* Partner Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
