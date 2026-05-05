import { useState } from "react";
import type { ColumnFilters, FilterField } from "../utils/tableFilters";

interface ColumnFilterPanelProps {
  fields: FilterField[];
  filters: ColumnFilters;
  onChange: (filters: ColumnFilters) => void;
}

export default function ColumnFilterPanel({ fields, filters, onChange }: ColumnFilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeCount = Object.values(filters).filter((value) => value && value.trim()).length;

  const updateFilter = (key: string, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onChange({});
  };

  return (
    <div className="pm-card rounded-2xl p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-slate-800">Column Filters</p>
            {activeCount > 0 && (
              <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-700">
                {activeCount} active
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">Filter this table by specific column values.</p>
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-200"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-3 py-2 text-xs font-bold text-white shadow-sm shadow-primary-600/20 transition-colors hover:bg-primary-700"
          >
            {isOpen ? "Hide Filters" : "Show Filters"}
            <svg
              className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-200/70 pt-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {fields.map((field) => (
            <label key={field.key} className="block">
              <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {field.label}
              </span>
              {field.options ? (
                <select
                  value={filters[field.key] ?? ""}
                  onChange={(e) => updateFilter(field.key, e.target.value)}
                  className="h-9 w-full rounded-xl border border-slate-200 bg-white/80 px-2 text-xs text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                >
                  <option value="">{field.placeholder ?? `All ${field.label}`}</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={filters[field.key] ?? ""}
                  onChange={(e) => updateFilter(field.key, e.target.value)}
                  placeholder={field.placeholder ?? `Filter ${field.label}`}
                  className="h-9 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-xs text-slate-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}