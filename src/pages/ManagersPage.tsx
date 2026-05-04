import { useState, useMemo } from "react";
import { managerProjectsData } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#6366f1", "#06b6d4", "#8b5cf6", "#22c55e", "#f59e0b", "#ec4899", "#14b8a6", "#f97316"];

// ─── Manager Card (used only for admin list view) ─────────────────────────────
function ManagerCard({
  manager,
  isSelected,
  onSelect,
}: {
  manager: typeof managerProjectsData[number];
  isSelected: boolean;
  onSelect: () => void;
}) {
  const total = manager.projects.reduce((s, p) => s + p.count, 0);
  const topType = [...manager.projects].sort((a, b) => b.count - a.count)[0];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl p-5 transition-all cursor-pointer border ${
        isSelected
          ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-600/25"
          : "pm-card hover:border-primary-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-base font-bold shrink-0 ${
          isSelected ? "bg-white/20 text-white" : "bg-primary-100 text-primary-700"
        }`}>
          {manager.managerName.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className={`font-semibold text-sm truncate ${isSelected ? "text-white" : "text-slate-900"}`}>
            {manager.managerName}
          </p>
          <p className={`text-xs truncate ${isSelected ? "text-primary-100" : "text-slate-500"}`}>
            {manager.department}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div>
          <p className={`text-2xl font-bold ${isSelected ? "text-white" : "text-slate-900"}`}>
            {total.toLocaleString()}
          </p>
          <p className={`text-xs mt-0.5 ${isSelected ? "text-primary-100" : "text-slate-500"}`}>
            total projects
          </p>
        </div>
        <div className={`text-right ${isSelected ? "text-primary-100" : "text-slate-500"}`}>
          <p className={`text-xs font-medium ${isSelected ? "text-white" : "text-slate-700"}`}>
            Top: {topType.type}
          </p>
          <p className="text-xs">{topType.count} projects</p>
        </div>
      </div>
    </button>
  );
}

// ─── Shared detail table + chart ─────────────────────────────────────────────
function ManagerDetail({ data, onNavigateToProjects }: { data: typeof managerProjectsData[number]; onNavigateToProjects: (projectType: string, count: number) => void }) {
  const total = data.projects.reduce((s, p) => s + p.count, 0);
  const topProjectsData = useMemo(
    () => [...data.projects].sort((a, b) => b.count - a.count).slice(0, 8),
    [data]
  );
  const topShare = useMemo(
    () => topProjectsData.slice(0, 3).reduce((s, p) => s + p.count, 0),
    [topProjectsData]
  );
  const topSharePct = total > 0 ? Math.round((topShare / total) * 100) : 0;
  const maxCount = useMemo(
    () => Math.max(...data.projects.map((p) => p.count), 1),
    [data]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
      {/* Table */}
      <div className="pm-card rounded-2xl overflow-hidden flex flex-col min-w-0">
        <div className="p-4 border-b border-slate-200/60 bg-white/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold shrink-0">
              {data.managerName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-slate-900">{data.managerName}</p>
              <p className="text-xs text-slate-500">{data.department}</p>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-xl bg-primary-50 text-primary-700 text-xs font-bold ring-1 ring-primary-600/10">
            Total: {total.toLocaleString()} projects
          </span>
        </div>
        <div className="overflow-auto scroll-table max-h-[calc(100dvh-260px)] min-h-[420px]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-slate-50 backdrop-blur shadow-[0_1px_0_0_#e2e8f0]">
              <tr>
                <th className="px-5 py-3.5 text-left font-bold text-slate-700">Project Type</th>
                <th className="px-5 py-3.5 text-right font-bold text-slate-700 border-l border-slate-200/60 w-40">No. Of Projects</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white/40">
              {data.projects.map((project) => {
                const isHighlighted = !!project.highlight;
                const widthPct = Math.max(4, Math.round((project.count / maxCount) * 100));
                return (
                  <tr
                    key={project.type}
                    onClick={() => onNavigateToProjects(project.type, project.count)}
                    title={`Click to view ${project.count} ${project.type} projects`}
                    className={`cursor-pointer transition-colors group ${isHighlighted ? "bg-yellow-50 hover:bg-yellow-100/80" : "hover:bg-primary-50/60"}`}
                  >
                    <td className={`px-5 py-3 ${isHighlighted ? "font-semibold text-yellow-800" : "text-slate-700"}`}>
                      <div className="flex items-center gap-3">
                        <span className="truncate group-hover:text-primary-700 transition-colors font-medium">{project.type}</span>
                        <div className="hidden md:block flex-1 max-w-[180px] h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${widthPct}%`,
                              backgroundColor: isHighlighted ? "#eab308" : "#6366f1",
                              opacity: isHighlighted ? 1 : 0.55,
                            }}
                          />
                        </div>
                        <svg className="w-3.5 h-3.5 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </td>
                    <td className={`px-5 py-3 text-right border-l border-slate-200/60 tabular-nums ${isHighlighted ? "font-bold text-yellow-900" : "font-medium text-slate-700 group-hover:text-primary-700"} transition-colors`}>
                      {project.count.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="sticky bottom-0 z-10 bg-slate-100/95 backdrop-blur shadow-[0_-1px_0_0_#cbd5e1]">
              <tr className="font-bold">
                <td className="px-5 py-3 text-slate-800 text-sm">Grand Total</td>
                <td className="px-5 py-3 text-right text-slate-900 border-l border-slate-200/60 tabular-nums">
                  {total.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Right panel — sticky on desktop */}
      <div className="space-y-5 lg:sticky lg:top-2 lg:self-start">
        {/* Top chart */}
        <div className="pm-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-700">Top Project Types</h3>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Top 8</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProjectsData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="type" hide />
                <Tooltip
                  cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                  {topProjectsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.highlight ? "#eab308" : COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1.5">
            {topProjectsData.slice(0, 4).map((entry, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.highlight ? "#eab308" : COLORS[idx % COLORS.length] }} />
                  <span className="truncate text-slate-600">{entry.type}</span>
                </div>
                <span className="font-bold text-slate-800 shrink-0 ml-2">{entry.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats card */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-primary-600 to-indigo-700 text-white shadow-lg shadow-primary-600/25">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-100">Summary</p>
          <p className="text-xl font-bold mt-1 truncate">{data.managerName}</p>
          <div className="mt-5 space-y-3">
            <div className="flex justify-between items-center border-b border-white/20 pb-3">
              <span className="text-sm text-primary-100">Unique Project Types</span>
              <span className="text-lg font-bold">{data.projects.length}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/20 pb-3">
              <span className="text-sm text-primary-100">Total Assignments</span>
              <span className="text-lg font-bold">{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/20 pb-3">
              <span className="text-sm text-primary-100">Department</span>
              <span className="text-xs font-semibold text-right max-w-[140px] truncate">{data.department}</span>
            </div>
            <div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-primary-100">Top 3 share</span>
                <span className="font-bold">{topSharePct}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-yellow-300 rounded-full transition-all"
                  style={{ width: `${topSharePct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
interface ManagersPageProps {
  onNavigate: (projectType?: string, count?: number) => void;
}

export default function ManagersPage({ onNavigate }: ManagersPageProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  // Admin: starts with no selection (shows grid first)
  // User: automatically scoped to their own manager data
  const userManagerData = useMemo(() => {
    if (!isAdmin && user?.managerName) {
      return managerProjectsData.find((m) => m.managerName === user.managerName) || null;
    }
    return null;
  }, [isAdmin, user]);

  const [selectedManager, setSelectedManager] = useState<string | null>(
    isAdmin ? null : (user?.managerName ?? null)
  );

  const activeManagerData = useMemo(() => {
    if (!isAdmin) return userManagerData;
    if (!selectedManager) return null;
    return managerProjectsData.find((m) => m.managerName === selectedManager) || null;
  }, [isAdmin, selectedManager, userManagerData]);

  // ── USER view ──────────────────────────────────────────────────────────────
  if (!isAdmin) {
    if (!userManagerData) {
      return (
        <div className="min-h-full flex items-center justify-center">
          <div className="pm-card rounded-2xl p-10 text-center max-w-sm w-full">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <p className="font-semibold text-slate-700">No project data found</p>
            <p className="text-sm text-slate-400 mt-1">Your account is not linked to any manager profile.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-full flex flex-col gap-6">
        <div className="pm-card rounded-2xl p-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My Project Details</h2>
            <p className="text-sm text-slate-500 mt-0.5">Showing your assigned project types and counts.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-600/10">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Manager View
          </span>
        </div>
        <ManagerDetail data={userManagerData} onNavigateToProjects={onNavigate} />
      </div>
    );
  }

  // ── ADMIN view ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-full flex flex-col gap-6">
      <div className="pm-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Manager Wise Projects Details</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {selectedManager
              ? `Viewing details for ${selectedManager}`
              : `${managerProjectsData.length} managers — select one to drill down`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedManager && (
            <button
              type="button"
              onClick={() => setSelectedManager(null)}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Managers
            </button>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 ring-1 ring-primary-600/10">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Admin View
          </span>
        </div>
      </div>

      {/* Manager grid */}
      {!selectedManager && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {managerProjectsData.map((manager) => (
            <ManagerCard
              key={manager.managerName}
              manager={manager}
              isSelected={selectedManager === manager.managerName}
              onSelect={() => setSelectedManager(manager.managerName)}
            />
          ))}
        </div>
      )}

      {/* Detail view after clicking a manager card */}
      {activeManagerData && (
        <ManagerDetail data={activeManagerData} onNavigateToProjects={onNavigate} />
      )}
    </div>
  );
}
