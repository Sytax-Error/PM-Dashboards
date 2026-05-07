import { useState, useMemo, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Pagination from "../components/Pagination";
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

const COLORS = [
  "#6366f1",
  "#06b6d4",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// API response types
interface ProjectData {
  headerId: number;
  prjMgrId: number;
  prjMgrNm: string;
  prjTypCode: string;
  prjTypDescription: string;
  noOfProject: number;
  createdDate: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: ProjectData[];
  totalRecords: number;
}

// Internal data structure for the list view items
interface ManagerListItem {
  managerId: number;
  managerName: string;
  // Unique key for React rendering
  reactKey: string;
  projects: {
    type: string;
    count: number;
  }[];
}

// Internal data structure for the detail view
interface ManagerData {
  managerName: string;
  projects: {
    type: string;
    count: number;
    code: string;
    highlight?: boolean;
  }[];
}

// ─── Manager Card (used only for admin list view) ─────────────────────────────
function ManagerCard({
  manager,
  onSelect,
}: {
  manager: ManagerListItem;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left rounded-2xl p-5 transition-all cursor-pointer border pm-card hover:border-primary-300 hover:shadow-md"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold shrink-0 bg-primary-100 text-primary-700">
          {manager.managerName.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm truncate text-slate-900">
            {manager.managerName}
          </p>
          <p className="text-xs text-slate-500 truncate">
            {manager.projects[0]?.type}{" "}
            {/* Shows the type from the specific record */}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="text-2xl font-bold text-slate-900">
            {manager.projects[0]?.count.toLocaleString()}
          </p>
          <p className="text-xs mt-0.5 text-slate-500">
            projects in this record
          </p>
        </div>
      </div>
    </button>
  );
}

// ─── Shared detail table + chart ─────────────────────────────────────────────
function ManagerDetail({
  data,
  onNavigateToProjects,
}: {
  data: ManagerData;
  onNavigateToProjects: (typeCode: string, count: number) => void;
}) {
  const total = data.projects.reduce((s, p) => s + p.count, 0);
  const topProjectsData = useMemo(
    () => [...data.projects].sort((a, b) => b.count - a.count).slice(0, 8),
    [data],
  );

  const maxCount = useMemo(
    () => Math.max(...data.projects.map((p) => p.count), 1),
    [data],
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
                <th className="px-5 py-3.5 text-left font-bold text-slate-700">
                  Project Type
                </th>
                <th className="px-5 py-3.5 text-right font-bold text-slate-700 border-l border-slate-200/60 w-40">
                  No. Of Projects
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white/40">
              {data.projects.map((project) => {
                const isHighlighted = !!project.highlight;
                const widthPct = Math.max(
                  4,
                  Math.round((project.count / maxCount) * 100),
                );
                return (
                  <tr
                    key={project.code}
                    onClick={() =>
                      onNavigateToProjects(project.code, project.count)
                    }
                    title={`Click to view ${project.count} ${project.type} projects`}
                    className={`cursor-pointer transition-colors group ${isHighlighted ? "bg-yellow-50 hover:bg-yellow-100/80" : "hover:bg-primary-50/60"}`}
                  >
                    <td
                      className={`px-5 py-3 ${isHighlighted ? "font-semibold text-yellow-800" : "text-slate-700"}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="truncate group-hover:text-primary-700 transition-colors font-medium">
                          {project.type}
                        </span>
                        <div className="hidden md:block flex-1 max-w-[180px] h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${widthPct}%`,
                              backgroundColor: isHighlighted
                                ? "#eab308"
                                : "#6366f1",
                              opacity: isHighlighted ? 1 : 0.55,
                            }}
                          />
                        </div>
                        <svg
                          className="w-3.5 h-3.5 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </td>
                    <td
                      className={`px-5 py-3 text-right border-l border-slate-200/60 tabular-nums ${isHighlighted ? "font-bold text-yellow-900" : "font-medium text-slate-700 group-hover:text-primary-700"} transition-colors`}
                    >
                      {project.count.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="sticky bottom-0 z-10 bg-slate-100/95 backdrop-blur shadow-[0_-1px_0_0_#cbd5e1]">
              <tr className="font-bold">
                <td className="px-5 py-3 text-slate-800 text-sm">
                  Grand Total
                </td>
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
        <div className="pm-card rounded-2xl p-5">
          <h3 className="text-sm font-bold text-slate-700">
            Top Project Types
          </h3>
          <div className="h-48 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topProjectsData}
                layout="vertical"
                margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  horizontal={false}
                />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="type" hide />
                <Tooltip
                  cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                  {topProjectsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.highlight
                          ? "#eab308"
                          : COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ManagersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = Number(searchParams.get("page")) || 1;
  const selectedManagerId = searchParams.get("mgrId");
  const selectedManagerName = searchParams.get("mgrName");

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  console.log(user);
  const selectedManager = useMemo(() => {
    if (!isAdmin && user) {
      // Non-admin user can only view their own manager-wise data.
      // AuthUser interface in this project does not currently include `managerId`,
      // so we fall back to `user.id`.
      return { id: user.id, name: user.name };
    }
    return selectedManagerId
      ? { id: Number(selectedManagerId), name: selectedManagerName || "" }
      : null;
  }, [selectedManagerId, selectedManagerName, isAdmin, user]);

  const setSelectedManager = (mgr: { id: number; name: string } | null) => {
    if (mgr) {
      searchParams.set("mgrId", mgr.id.toString());
      searchParams.set("mgrName", mgr.name);
    } else {
      searchParams.delete("mgrId");
      searchParams.delete("mgrName");
    }
    setSearchParams(searchParams, { replace: true });
  };

  const setCurrentPage = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams, { replace: true });
  };

  // State for the paginated list
  const [managersOnPage, setManagersOnPage] = useState<ManagerListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const PAGE_SIZE = 10;

  // State for the detail view
  const [activeManagerData, setActiveManagerData] =
    useState<ManagerData | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Effect to fetch the list of manager records for the current page
  useEffect(() => {
    // Modified fetchData function with query parameters
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("access_token");
        const endpoint = isAdmin
          ? `${API_BASE_URL}/api/pm/projects/group-by-manager`
          : `${API_BASE_URL}/api/pm/projects/group-by-manager?userId=${user?.id}`;

        const response = await fetch(endpoint, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            Accept: "application/json",
          },
        });

        if (response.status === 403) {
          const txt = await response.text().catch(() => "");
          console.error("403 from", endpoint, "response:", txt);
        }

        if (!response.ok) throw new Error("Network response was not ok");

        const apiResult = await response.json();
        if (apiResult.status !== "SUCCESS" || !apiResult.data)
          throw new Error("Failed to fetch project data from API.");

        // Pagination logic remains the same
        const total = apiResult.totalRecords || apiResult.data.length;
        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const paginatedData =
          apiResult.data.length > PAGE_SIZE
            ? apiResult.data.slice(startIndex, endIndex)
            : apiResult.data;

        setManagersOnPage(
          paginatedData.map((manager: any, idx: number) => ({
            managerId: manager.prjMgrId,
            managerName: manager.prjMgrNm,
            reactKey: `mgr-${manager.prjMgrId}-${idx}`,
            projects: [{ type: "Total Projects", count: manager.projectCount }],
          })),
        );
        setTotalRecords(total);
      } catch (e: any) {
        setError(e.message || "Failed to fetch project data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); // Re-fetch only when page changes

  // Effect to fetch the full details of a selected manager
  useEffect(() => {
    if (!selectedManager) {
      setActiveManagerData(null);
      return;
    }

    const fetchManagerDetails = async () => {
      setDetailLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `${API_BASE_URL}/api/pm/projects/manager/${selectedManager.id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );
        if (!response.ok)
          throw new Error(
            `Network error fetching details for manager ${selectedManager.id}`,
          );

        const apiResult: ApiResponse = await response.json();
        if (apiResult.status !== "SUCCESS" || !apiResult.data)
          throw new Error("API did not return success for manager details.");

        const projects = apiResult.data.map((p) => ({
          type: p.prjTypDescription,
          count: p.noOfProject,
          code: p.prjTypCode,
        }));

        const managerDetailData: ManagerData = {
          managerName: selectedManager.name,
          projects: projects,
        };

        setActiveManagerData(managerDetailData);
      } catch (e: any) {
        setError(e.message || "Failed to fetch manager details.");
      } finally {
        setDetailLoading(false);
      }
    };

    fetchManagerDetails();
  }, [selectedManager?.id, selectedManager?.name]);

  const handleNavigateToProjects = (typeCode: string, count: number) => {
    navigate(
      `/projects?mgrId=${selectedManager?.id}&type=${typeCode}&count=${count}`,
    );
  };

  return (
    <div className="min-h-full flex flex-col gap-6">
      {selectedManager ? (
        <>
          <div className="pm-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSelectedManager(null)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors shrink-0"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Manager Wise Projects Details
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Viewing projects for {selectedManager.name}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="pm-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Manager Wise Projects Details
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Showing {managersOnPage.length} records on this page. Select a
              record to see full details.
            </p>
          </div>
        </div>
      )}

      {selectedManager ? (
        <>
          {detailLoading && (
            <div className="p-10 text-center text-slate-500 font-medium">
              Loading manager details...
            </div>
          )}
          {error && !detailLoading && (
            <div className="p-10 text-center text-red-600 font-medium">
              Error: {error}
            </div>
          )}
          {activeManagerData && !detailLoading && (
            <ManagerDetail
              data={activeManagerData}
              onNavigateToProjects={handleNavigateToProjects}
            />
          )}
        </>
      ) : (
        <div
          id="managers-grid"
          className="pm-card rounded-2xl overflow-hidden flex flex-col"
        >
          {loading ? (
            <div className="p-20 text-center">
              <div className="inline-block w-8 h-8 border-4 border-primary-500/30 border-t-primary-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 font-medium">
                Loading managers list...
              </p>
            </div>
          ) : error ? (
            <div className="p-20 text-center">
              <p className="text-red-500 font-medium mb-2">
                Error loading managers
              </p>
              <p className="text-slate-400 text-sm">{error}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-5">
                {managersOnPage.map((manager) => (
                  <ManagerCard
                    key={manager.reactKey}
                    manager={manager}
                    onSelect={() =>
                      setSelectedManager({
                        id: manager.managerId,
                        name: manager.managerName,
                      })
                    }
                  />
                ))}
              </div>
              {totalRecords > PAGE_SIZE && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalRecords / PAGE_SIZE)}
                  onPageChange={setCurrentPage}
                  totalItems={totalRecords}
                  pageSize={PAGE_SIZE}
                  scrollTargetId="managers-grid"
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
