import React, { useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DatePicker,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import { Filter, Calendar, X } from "lucide-react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";

// Date Filter Component
type DateFilterProps = {
  onDateRangeChange: (startDate: string | null, endDate: string | null) => void;
  onReset: () => void;
};

const DateFilterPopover: React.FC<DateFilterProps> = ({
  onDateRangeChange,
  onReset,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
    onDateRangeChange(date?.toString(), endDate?.toString());
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
    onDateRangeChange(startDate?.toString(), date?.toString());
  };

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
    onDateRangeChange(null, null);
    onReset();
  };

  return (
    <Popover placement="bottom-end" showArrow>
      <PopoverTrigger>
        <Button
          variant="bordered"
          startContent={<Calendar className="h-4 w-4" />}
          className="h-[41px] px-3 gap-2"
        >
          <span className="text-sm">Dates</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4">
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Filter by date</h4>
            <button
              onClick={resetDates}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Reset filter
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-1 block">From</label>
              <DatePicker
                value={startDate}
                onChange={handleStartDateChange}
                className="w-full"
                showMonthAndYearPickers
                maxValue={endDate || today(getLocalTimeZone())}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">To</label>
              <DatePicker
                value={endDate}
                onChange={handleEndDateChange}
                className="w-full"
                showMonthAndYearPickers
                minValue={startDate}
                maxValue={today(getLocalTimeZone())}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Filters Component
type FiltersPopoverProps = {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedAuthors: string[];
  setSelectedAuthors: (authors: string[]) => void;
  selectedStatus: string[];
  setSelectedStatus: (status: string[]) => void;
  onReset: () => void;
};

const FiltersPopover: React.FC<FiltersPopoverProps> = ({
  selectedTags,
  setSelectedTags,
  selectedAuthors,
  setSelectedAuthors,
  selectedStatus,
  setSelectedStatus,
  onReset,
}) => {
  // Available filter options
  const availableTags = [
    "Street",
    "Photography",
    "Tutorial",
    "Beginner",
    "Advanced",
    "Portrait",
    "Landscape",
  ];
  const availableAuthors = [
    "Praveen Bhat",
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
  ];
  const availableStatus = ["Published", "Draft"];

  const toggleFilter = (
    value: string,
    current: string[],
    setter: (val: string[]) => void
  ) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  const handleAuthorChange = (keys: any) => {
    setSelectedAuthors(Array.from(keys));
  };

  return (
    <Popover placement="bottom-end" showArrow>
      <PopoverTrigger>
        <Button
          variant="bordered"
          startContent={<Filter className="h-4 w-4" />}
          className="h-[41px] px-3 gap-2"
        >
          <span className="text-sm">Filters</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Filters</h4>
            <button
              onClick={onReset}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Reset all filters
            </button>
          </div>

          {/* Status Filters */}
          <div>
            <h5 className="text-sm font-medium mb-3">Status</h5>
            <div className="flex flex-wrap gap-2">
              {availableStatus.map((status) => {
                const isActive = selectedStatus.includes(status);
                return (
                  <Chip
                    key={status}
                    variant={isActive ? "solid" : "bordered"}
                    color={isActive ? "primary" : "default"}
                    onClose={
                      isActive
                        ? () =>
                            toggleFilter(
                              status,
                              selectedStatus,
                              setSelectedStatus
                            )
                        : undefined
                    }
                    className="cursor-pointer"
                    onClick={() =>
                      toggleFilter(status, selectedStatus, setSelectedStatus)
                    }
                  >
                    {status}
                  </Chip>
                );
              })}
            </div>
          </div>

          {/* Tags Filters */}
          <div>
            <h5 className="text-sm font-medium mb-3">Tags</h5>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isActive = selectedTags.includes(tag);
                return (
                  <Chip
                    key={tag}
                    variant={isActive ? "solid" : "bordered"}
                    color={isActive ? "primary" : "default"}
                    onClose={
                      isActive
                        ? () => toggleFilter(tag, selectedTags, setSelectedTags)
                        : undefined
                    }
                    className="cursor-pointer"
                    onClick={() =>
                      toggleFilter(tag, selectedTags, setSelectedTags)
                    }
                  >
                    {tag}
                  </Chip>
                );
              })}
            </div>
          </div>

          {/* Authors Filter */}
          <div>
            <h5 className="text-sm font-medium mb-3">Authors</h5>
            <Select
              label="Select authors"
              placeholder="Choose authors"
              selectionMode="multiple"
              selectedKeys={new Set(selectedAuthors)}
              onSelectionChange={handleAuthorChange}
              className="w-full"
            >
              {availableAuthors.map((author) => (
                <SelectItem key={author} value={author}>
                  {author}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { DateFilterPopover, FiltersPopover };
