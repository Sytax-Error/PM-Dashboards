export type ColumnFilters = Record<string, string>;

export interface FilterField {
  key: string;
  label: string;
  placeholder?: string;
}

export function applyColumnFilters<T extends object>(
  rows: T[],
  filters: ColumnFilters
) {
  return rows.filter((row) =>
    Object.entries(filters).every(([key, value]) => {
      const query = value.trim().toLowerCase();
      if (!query) return true;
      return String((row as Record<string, unknown>)[key] ?? "").toLowerCase().includes(query);
    })
  );
}