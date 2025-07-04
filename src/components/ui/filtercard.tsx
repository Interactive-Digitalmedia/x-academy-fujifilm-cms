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

  // Initialize selected keys on first load / when sections change
  useEffect(() => {
    const initial: Record<string, string> = {};
    sections.forEach((s) => (initial[s.key] = ""));
    setSelected(initial);
  }, [sections]);

  // Whenever a filter changes, compute filtered list and propagate upward
  useEffect(() => {
    const filtered = data.filter((item) =>
      Object.entries(selected).every(([key, value]) => {
        if (!value) return true; // ignore empty filters
        // coerce both sides to strings + lowercase for lenient match
        return String(item[key] ?? "").toLowerCase() === value.toLowerCase();
      })
    );
    onFiltered(filtered as T[], selected);
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
          className="text-sm text-gray-500 hover:text-gray-700 underline decoration-gray-400 transition-colors"
          onClick={resetAll}
        >
          Reset all filters
        </button>
      </header>

      {sections.map((s) => {
        const active = !!selected[s.key];
        return (
          <section key={s.key} className="mb-6">
            <h3 className="text-base font-semibold text-gray-900 -mt-1 mb-1">
              {s.heading}
            </h3>

            {s.type === "button-group" && (
              <div className="flex flex-wrap gap-2">
                {s.options.map((opt) => {
                  const isActive = selected[s.key] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => update(s.key, isActive ? "" : opt)}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-2 rounded-full border transition-all duration-200 transform ${
                        isActive
                          ? "bg-gray-700 text-white border-gray-700 hover:bg-gray-800 shadow-md scale-105"
                          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 hover:shadow-sm"
                      }`}
                    >
                      {opt}
                      {isActive && <X className="h-3 w-3" />}
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
                  className={`w-full appearance-none border rounded-lg px-4 py-3 pr-10 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    active
                      ? "bg-gray-700 border-gray-700 text-white hover:bg-gray-800 shadow-md"
                      : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                  }`}
                >
                  <option value="">{s.heading}</option>
                  {s.options.map((opt) => (
                    <option
                      key={opt}
                      value={opt}
                      className="bg-white text-gray-900"
                    >
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none transition-colors ${
                    active ? "text-white" : "text-gray-500"
                  }`}
                />
              </div>
            )}
          </section>
        );
      })}

      {onClose && (
        <footer>
          <button
            className="mt-4 mx-auto block text-sm text-gray-500 hover:text-gray-700 underline decoration-gray-400 transition-colors"
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
