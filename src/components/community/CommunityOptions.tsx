import React, { useEffect, useState, useCallback } from "react";
import { Search, Calendar, Filter, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CustomCalendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

import { dummyCommunity } from "@/assets/dummyCommunity";
import FilterCard from "@/components/ui/filtercard";
import { CommunityTable } from "@/components/community/CommunityTable";
import { XStoriesTable } from "./XStoriesTable";

import XStoryDialog from "./XStoryDialog";
import { getAllXStories } from "@/api/XStory";
import TipsAndTricks from "./TipsAndTricks";

// import { useNavigate } from "react-router-dom";
import { AskToExperts, TipsAndTricksType, XStoryType } from "@/types";
import { getAskTheExperts } from "@/api/askTheExperts";
import TipsAndTricksDialog from "./TipsAndTricksDialog";
import { getTipsAndTricks } from "@/api/tipsAndTricks";

export interface XStory {
  _id: string;
  sno: number;
  title: string;
  videoLink: string;
  dateUploaded: string;
  uploadedBy: string;
  isCoverImage: boolean;
}

const CommunityOptions: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openTipsAndTricksModal, setOpenTipsAndTricksModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<XStoryType | null>(null);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [activeTab, setActiveTab] = useState("Ask the Expert");
  // const [filteredCommunity, setFilteredCommunity] = useState(dummyCommunity);
  const [xStories, setXStories] = useState<XStoryType[]>([]);
  const [refreshTipsAndTricks, setRefreshTipsAndTricks] = useState(false);
  // const navigate = useNavigate();
  // const parseDMY = (dmy: string): Date => {
  //   const [day, month, year] = dmy.split("-").map(Number);
  //   return new Date(year, month - 1, day);
  // };
  const [askExpertData, setAskExpertData] = useState<AskToExperts[]>([]);
  const [templates, setTemplates] = useState<TipsAndTricksType[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<TipsAndTricksType | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      const res = await getTipsAndTricks();

      if (res.status === 200) {
        setTemplates(res.data);
      } else {
        console.error("Failed to fetch Tips & Tricks:", res.message);
      }
    };

    fetchTemplates();
  }, [refreshTipsAndTricks]);

  const fetchStories = useCallback(async () => {
    try {
      const response = await getAllXStories();
      if (response.status == 200) {
        setXStories(response?.data);
      }
    } catch (err) {
      console.error("Failed to load X-Stories", err);
    }
  }, []);

  useEffect(() => {
    const fetchAskExperts = async () => {
      try {
        const res = await getAskTheExperts();

        if (res.success) {
          setAskExpertData(res.data);
        } else {
          console.error("Failed to fetch Ask the Experts:", res.message);
        }
      } catch (err) {
        console.error("Error fetching Ask the Experts", err);
      }
    };

    if (activeTab === "Ask the Expert") {
      fetchAskExperts();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "X-Stories") {
      fetchStories();
    }
  }, [activeTab, fetchStories]);

  // useEffect(() => {
  //   const lowerSearch = searchText.toLowerCase();
  //   const filtered = dummyCommunity.filter((item) => {
  //     const matchesSearch =
  //       searchText.length < 3 ||
  //       item.raisedBy?.toLowerCase().includes(lowerSearch) ||
  //       item.question?.toLowerCase().includes(lowerSearch);
  //     const matchesFilters =
  //       !activeFilters.status || item.status === activeFilters.status;
  //     const itemDate = parseDMY(item.date);
  //     const from = selectedRange?.from;
  //     const to = selectedRange?.to;
  //     const matchesDate = !from || !to || (itemDate >= from && itemDate <= to);
  //     return matchesSearch && matchesFilters && matchesDate;
  //   });
  //   // setFilteredCommunity(filtered);
  // }, [searchText, selectedRange, activeFilters]);

  console.log(activeFilters);

  const handleRowClick = (story: XStoryType) => {
    setSelectedStory(story);
    setDialogOpen(true);
  };

  const handleAddXStoryClick = () => {
    setSelectedStory(null);
    setDialogOpen(true);
  };
  const handleNewTemplateClick = () => {
    // navigate("/community/new-template");
    setOpenTipsAndTricksModal(true);
    setSelectedTemplate(null);
  };

  const handleEditTemplate = (template: TipsAndTricksType) => {
    setSelectedTemplate(template);
    setOpenTipsAndTricksModal(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedStory(null);
    fetchStories();
  };

  const handleCloseTipsAndTricksModal = () => {
    setOpenTipsAndTricksModal(false);
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "16px 16px 67px 16px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        border: "1px solid #EDEDED",
        background: "#FFF",
      }}
    >
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Community</h2>

          {activeTab === "X-Stories" && (
            <Button
              size="sm"
              className="h-[32px] px-4 text-sm bg-[#2196F3] text-white hover:bg-[#1976D2]"
              onClick={handleAddXStoryClick}
            >
              Add X-Story
            </Button>
          )}
          {activeTab === "Tips & Tricks" && (
            <Button
              size="sm"
              className="h-[32px] px-2 gap-1 text-sm bg-[#2196F3] text-white hover:bg-[#1976D2]"
              onClick={handleNewTemplateClick}
            >
              <CirclePlus className="h-4 w-4" />
              New Template
            </Button>
          )}
        </div>

        <div className="flex justify-between items-center mb-6 w-full">
          <div className="relative w-full mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 bg-muted/50"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
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

        <div className="mb-6 flex flex-wrap gap-3">
          {["Ask the Expert", "Tips & Tricks", "X-Stories"].map((tab) => (
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

        {activeTab === "Ask the Expert" && (
          <CommunityTable data={askExpertData} />
        )}

        {activeTab === "Tips & Tricks" && (
          <TipsAndTricks
            templates={templates}
            onEditTemplate={handleEditTemplate}
          />
        )}

        {activeTab === "X-Stories" && (
          <XStoriesTable stories={xStories} onRowClick={handleRowClick} />
        )}
      </div>

      <XStoryDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        story={selectedStory}
      />

      <TipsAndTricksDialog
        open={openTipsAndTricksModal}
        onClose={handleCloseTipsAndTricksModal}
        story={selectedTemplate}
        setRefreshTipsAndTricks={setRefreshTipsAndTricks}
      />
    </div>
  );
};

export default CommunityOptions;
