import React, { useState, useRef, useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Filter, X } from "lucide-react";

type Ambassador = {
  _id: string;
  fullname: string;
};

type FiltersPopoverProps = {
  types: string[];
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  selectedConductedBy: string[];
  setSelectedConductedBy: (names: string[]) => void;
  ambassadors: Ambassador[];
  onReset: () => void;
};

const FiltersPopover: React.FC<FiltersPopoverProps> = ({
  types,
  selectedTypes,
  setSelectedTypes,
  selectedConductedBy,
  setSelectedConductedBy,
  ambassadors,
  onReset,
}) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

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



  // close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`h-10 px-4 py-2 relative flex items-center gap-2 text-[14px] font-medium rounded-lg transition-colors duration-150
    ${
      open
        ? "bg-[#cdeafd] border border-[#1098f7] text-black"
        : "bg-white border-2 border-gray-200 text-black"
    }`}
      >
        <Filter size={18} strokeWidth={2.2} />
        Filters
        
      </button>

      {open && (
        <div
          className="absolute z-50 mt-2 w-[340px] p-4 rounded-xl bg-white shadow-xl border border-gray-200"
          style={{ left: "-240px" }}
        >
          <div className="mb-4 flex w-full items-center justify-between">
            <h4 className="text-lg font-semibold">Filters</h4>
            <button
              onClick={onReset}
              className="filter-reset text-sm underline"
            >
              Reset all filters
            </button>
          </div>

          {/* Type Filters */}
          <div className="mb-4 w-full">
            <h5 className="filter-title mb-2 items-center">Type</h5>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => {
                const isActive = selectedTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() =>
                      toggleFilter(type, selectedTypes, setSelectedTypes)
                    }
                    className={`filter-chip w-auto px-3 py-2.5 justify-center ${
                      isActive
                        ? "filter-chip-active"
                        : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                    {isActive && <X className="h-3 w-3 opacity-80" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conducted By Dropdown */}
          <div className="w-full">
            <Select
              placeholder="Conducted By"
              selectionMode="multiple"
              selectedKeys={new Set(selectedConductedBy)}
              onSelectionChange={(keys) =>
                setSelectedConductedBy(Array.from(keys) as string[])
              }
              className="rounded-xl w-full border placeholder:text-black"
            >
              {ambassadors.map((amb) => (
                <SelectItem key={amb.fullname} value={amb.fullname}>
                  {amb.fullname}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersPopover;
