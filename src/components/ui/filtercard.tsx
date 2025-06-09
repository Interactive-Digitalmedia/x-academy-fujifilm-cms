"use client";

import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";

export interface FilterSection {
  heading: string;
  key: string;
  type: "button-group" | "dropdown";
  options: string[];
}

type RecordLike = Record<string, unknown>;

interface FilterCardProps<T extends RecordLike> {
  data: T[];
  sections: FilterSection[];
  onFiltered: (filtered: T[], active: Record<string, string>) => void;
  title?: string;
  onClose?: () => void;
}

function FilterCard<T extends RecordLike>({
  data,
  sections,
  onFiltered,
  title = "Filters",
  onClose,
}: FilterCardProps<T>) {
  const [selected, setSelected] = useState<Record<string, string>>({});

  useEffect(() => {
    const initial: Record<string, string> = {};
    sections.forEach((s) => (initial[s.key] = ""));
    setSelected(initial);
  }, [sections]);

  useEffect(() => {
    // Only pass back the active filters, not the filtered data
    // Let the parent component handle the filtering logic
    onFiltered(data, selected);
  }, [data, selected, onFiltered]);

  const resetAll = () => {
    const cleared: Record<string, string> = {};
    Object.keys(selected).forEach((k) => (cleared[k] = ""));
    setSelected(cleared);
  };

  const update = (key: string, value: string) =>
    setSelected((prev) => ({ ...prev, [key]: value }));

  return (
    <aside
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      style={{ width: 340, height: 335 }}
    >
      <header className="flex justify-between items-center -mt-2 mb-3">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <button
          className="text-sm text-gray-500 hover:text-gray-700 underline decoration-gray-400"
          onClick={resetAll}
        >
          Reset all filters
        </button>
      </header>

      {sections.map((s) => (
        <section key={s.key} className="mb-6">
          <h3 className="text-base font-semibold text-gray-900 -mt-1 mb-1">
            {s.heading}
          </h3>

          {s.type === "button-group" && (
            <div className="flex flex-wrap gap-2">
              {s.options.map((opt) => {
                const active = selected[s.key] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => update(s.key, active ? "" : opt)}
                    className={`inline-flex items-center gap-1.2 text-sm font-medium px-2.5 py-2 rounded-full border transition-colors ${
                      active
                        ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                        : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {opt}
                    {active && <X className="h-3 w-3" />}
                  </button>
                );
              })}
            </div>
          )}

          {s.type === "dropdown" && (
            <div className="relative">
              <select
                value={selected[s.key]}
                onChange={(e) => update(s.key, e.target.value)}
                className="w-full appearance-none bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">{s.heading}</option>
                {s.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-gray-500" />
            </div>
          )}
        </section>
      ))}

      {onClose && (
        <footer>
          <button
            className="mt-4 mx-auto block text-sm text-gray-500 hover:text-gray-700 underline decoration-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      )}
    </aside>
  );
}

export default FilterCard;
