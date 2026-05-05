import { useEffect, useMemo, useState } from "react";
import Pagination from "../components/Pagination";
import ColumnFilterPanel from "../components/ColumnFilterPanel";
import { applyColumnFilters, type ColumnFilters, type FilterField } from "../utils/tableFilters";

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://10.23.124.23:8080/api";

interface ClickableCellProps {
  value: number;
  onClick: () => void;
  color?: "green" | "blue" | "purple" | "orange";
}

function ClickableCell({ value, onClick, color = "blue" }: ClickableCellProps) {
  const colorClasses = {
    green: "bg-green-100/50 text-green-700 hover:bg-green-100 cursor-pointer font-bold underline decoration-dotted underline-offset-2",
    blue: "bg-blue-100/50 text-blue-700 hover:bg-blue-100 cursor-pointer font-bold underline decoration-dotted underline-offset-2",
    purple: "bg-purple-100/50 text-purple-700 hover:bg-purple-100 cursor-pointer font-bold underline decoration-dotted underline-offset-2",
    orange: "bg-orange-100/50 text-orange-700 hover:bg-orange-100 cursor-pointer font-bold underline decoration-dotted underline-offset-2",
  };

  return (
    <td
      onClick={value > 0 ? onClick : undefined}
      title={value > 0 ? "Click to view details" : undefined}
      className={`px-4 py-3 text-right border-l border-slate-200/60 tabular-nums select-none transition-colors ${value > 0 ? colorClasses[color] : "text-slate-400 cursor-default"
        }`}
    >
      {value > 0 ? value.toLocaleString() : "0"}
    </td>
  );
}

import { useSearchParams, useNavigate } from "react-router-dom";

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const filterProjectType = searchParams.get("type") || "";
  const filterCount = Number(searchParams.get("count")) || 0;
  const filterMgrId = searchParams.get("mgrId");
  const currentPage = Number(searchParams.get("page")) || 1;

  const setCurrentPage = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams, { replace: true });
  };

  const onClearFilter = () => {
    if (filterMgrId) {
      navigate(-1);
    } else {
      setSearchParams({});
    }
  };
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Initialize column filters from search params
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>(() => {
    const filters: ColumnFilters = {};
    searchParams.forEach((value, key) => {
      if (!["type", "count", "mgrId", "page", "mgrName"].includes(key)) {
        filters[key] = value;
      }
    });
    return filters;
  });

  const [totalRecords, setTotalRecords] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const pageIdx = currentPage - 1;
        const params = new URLSearchParams();
        params.append("page", pageIdx.toString());
        params.append("size", pageSize.toString());

        if (filterMgrId) {
          params.append("mgrId", filterMgrId.toString());
        }
        if (filterProjectType) {
          params.append("type", filterProjectType);
        }

        // Include all column filters in API call
        Object.entries(columnFilters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });

        const baseUrl = `${API_BASE_URL}/pm/projects/all`;
        const url = `${baseUrl}?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const apiResult = await response.json();
        if (apiResult.status !== 'SUCCESS' || !apiResult.data) throw new Error('Failed to fetch projects.');

        const total = apiResult.totalRecords || filterCount || apiResult.data.length;
        const isFullList = apiResult.data.length >= total && total > 0;

        const mappedProjects = apiResult.data.map((p: any, index: number) => ({
          srNo: (isFullList ? 0 : pageIdx * pageSize) + index + 1,
          projectNumber: p.projectCd || p.projectNumber || p.prjNo || "N/A",
          customerName: p.customerName || p.prjNm || "N/A",
          projectType: p.prjType || p.prjTypCode || (filterProjectType || "Unknown"),
          budgetAmount: p.prjBudgetNo || p.projectAbp || 0,
          receivedAmount: p.amountReceived || 0,
          noOfPOs: p.noOfPo || 0,
          poAmount: p.poAmount || 0,
          noOfInvoiceReceived: p.noOfInvBilldesk || 0,
          noOfInvoiceBooked: p.noOfExpInvoice || 0,
          invoiceAmount: p.totalInvoiceAmount || 0,
          amountPaid: p.totalAmountPaid || 0,
          noOfTaxInvoice: p.noOfTaxInvoice || 0,
          taxInvoiceAmount: p.totalTaxInvoiceAmount || 0,
          ledgerBalance: (p.totalInvoiceAmount || 0) - (p.totalAmountPaid || 0),
          projectId: p.projectId || p.headerId,
        }));

        setProjects(mappedProjects);
        setTotalRecords(total);
      } catch (e: any) {
        setError(e.message || "Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filterMgrId, filterProjectType, columnFilters, currentPage, filterCount]);

  const filterFields: FilterField[] = [
    { key: "prjName", label: "Project Name", placeholder: "Search project..." },
    { key: "customerName", label: "Customer Name", placeholder: "Search customer..." },
    { key: "margin", label: "Margin", placeholder: "Filter margin..." },
    {
      key: "projectAbp",
      label: "ABP Type",
      options: [
        { label: "Positive", value: "positive" },
        { label: "Negative", value: "negative" }
      ]
    },
    { key: "projectNumber", label: "Project Number" },
    { key: "projectType", label: "Project Type" },
  ];

  const filteredProjects = useMemo(() => {
    let data = projects;
    // Further filter by free-text search
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(
        (p: any) =>
          p.projectNumber.toLowerCase().includes(s) ||
          p.customerName.toLowerCase().includes(s) ||
          p.projectType.toLowerCase().includes(s)
      );
    }
    return applyColumnFilters(data, columnFilters);
  }, [search, projects, columnFilters]);

  const totalPages = Math.ceil(totalRecords / pageSize);
  // Fallback: If API returns more than pageSize (e.g. filter endpoint), slice it locally
  const paginatedProjects = filteredProjects.length > pageSize
    ? filteredProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filteredProjects;

  return (
    <div className="min-h-full flex flex-col gap-6">
      {/* Header */}
      <div className="pm-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {(filterProjectType || filterMgrId) && (
            <button
              type="button"
              onClick={onClearFilter}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
          <div>
            <h2 className="text-xl font-bold text-slate-900">Project Details</h2>
            <p className="text-sm text-slate-500 mt-0.5">Click on highlighted numbers to view detailed records</p>
          </div>
        </div>
        <div className="w-full sm:w-80">
          <div className="relative">
            <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search in current results..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                searchParams.set("page", "1");
                setSearchParams(searchParams, { replace: true });
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white"
            />
          </div>
        </div>
      </div>

      {/* Active filter banner - purely informational now as filters are in the panel */}
      {(filterProjectType || Object.values(columnFilters).some(v => v)) && (
        <div className="flex items-center gap-3 rounded-2xl border border-primary-200 bg-primary-50 px-5 py-3 text-sm">
          <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-primary-700">
            Showing <span className="font-bold">{filteredProjects.length}</span> projects with active column filters.
          </span>
          <button
            type="button"
            onClick={onClearFilter}
            className="ml-auto text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      <ColumnFilterPanel
        fields={filterFields}
        filters={columnFilters}
        onChange={(newFilters) => {
          setColumnFilters(newFilters);

          // Update URL search params for all column filters
          // First, clear existing column filter params
          const newParams = new URLSearchParams(searchParams);
          filterFields.forEach(f => newParams.delete(f.key));

          // Add new ones
          Object.entries(newFilters).forEach(([key, value]) => {
            if (value) newParams.set(key, value);
          });

          newParams.set("page", "1");
          setSearchParams(newParams, { replace: true });
        }}
      />

      {/* Legend */}
      <div className="pm-card rounded-2xl p-4 flex flex-wrap gap-4 text-xs">
        <span className="text-slate-600 font-semibold uppercase tracking-wider">Navigation Guide:</span>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-green-500" />
          <span className="text-slate-600 font-medium">PO/WO Details</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-blue-500" />
          <span className="text-slate-600 font-medium">Bill Desk Details</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-purple-500" />
          <span className="text-slate-600 font-medium">Tax Invoices</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-orange-500" />
          <span className="text-slate-600 font-medium">Booked Invoices</span>
        </div>
      </div>

      {/* Loading/Error States - Rendered in place of the table when initial loading */}
      {error && (
        <div className="p-20 flex flex-col items-center justify-center text-center pm-card rounded-2xl">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Failed to load projects</h3>
          <p className="text-sm text-slate-500 mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-5 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Table Container */}
      {!error && (
        <div className={`pm-card rounded-2xl overflow-hidden relative ${loading ? "opacity-60" : ""}`}>
          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-600 rounded-full animate-spin"></div>
                <span className="text-xs font-bold text-primary-700">Refreshing...</span>
              </div>
            </div>
          )}
          {paginatedProjects.length === 0 && !loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">No projects found</h3>
              <p className="text-sm text-slate-500 mt-1">There are no project records matching the current filters.</p>
            </div>
          ) : (
        <div className="overflow-x-auto scroll-table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800 text-white border-b border-slate-700">
                <th className="px-4 py-3.5 text-left font-bold text-xs uppercase">Sr.No.</th>
                <th className="px-4 py-3.5 text-left font-bold text-xs uppercase">Project No</th>
                <th className="px-4 py-3.5 text-left font-bold text-xs uppercase">Customer</th>
                <th className="px-4 py-3.5 text-right font-bold text-xs border-l border-white/10 uppercase">Budget</th>
                <th className="px-4 py-3.5 text-right font-bold text-xs border-l border-white/10 uppercase">Received</th>
                <th className="px-4 py-3.5 text-right font-bold text-xs border-l border-white/10 bg-green-700 uppercase">PO Count</th>
                <th className="px-4 py-3.5 text-right font-bold text-xs border-l border-white/10 bg-green-700 uppercase">PO Amt</th>
                <th className="px-4 py-3.5 text-right font-bold text-xs border-l border-white/10 bg-blue-700 uppercase">Billdesk</th>
                <th className="px-4 py-3.5 text-right font-bold text-xs border-l border-white/10 bg-purple-700 uppercase">Tax Count</th>
                <th className="px-4 py-3.5 text-right font-bold text-xs border-l border-white/10 bg-purple-700 uppercase">Tax Amt</th>
                <th className="px-4 py-3.5 text-right font-bold text-xs border-l border-white/10 bg-orange-600 uppercase">Booked</th>
                <th className="px-4 py-3.5 text-right font-bold text-xs border-l border-white/10 bg-orange-600 uppercase">Inv Amt</th>
                <th className="px-4 py-3.5 text-right font-bold text-xs border-l border-white/10 uppercase">Paid</th>
                <th className="px-4 py-3.5 text-right font-bold text-xs border-l border-white/10 uppercase">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProjects.map((project) => (
                <tr
                  key={project.srNo}
                  className={`transition-colors hover:bg-primary-50/30 ${project.srNo % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                    }`}
                >
                  <td className="px-4 py-3.5 text-slate-600 font-medium">{project.srNo}</td>
                  <td className="px-4 py-3.5 text-primary-700 font-bold">{project.projectNumber}</td>
                  <td className="px-4 py-3.5 text-slate-800">{project.customerName}</td>
                  <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums text-slate-700">
                    {formatCurrency(project.budgetAmount)}
                  </td>
                  <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums text-slate-700">
                    {formatCurrency(project.receivedAmount)}
                  </td>

                  {/* ── Clickable: PO/WO (Green) ── */}
                  <ClickableCell value={project.noOfPOs} color="green" onClick={() => navigate(`/projects/${project.projectId}/po`)} />
                  <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums bg-green-50/40 text-green-800 font-medium">
                    {formatCurrency(project.poAmount)}
                  </td>

                  {/* ── Clickable: Bill Desk (Blue) ── */}
                  <ClickableCell
                    value={project.noOfInvoiceReceived}
                    color="blue"
                    onClick={() => navigate(`/projects/${project.projectId}/invoice-received`)}
                  />

                  {/* ── Clickable: Tax Invoice (Purple) ── */}
                  <ClickableCell value={project.noOfTaxInvoice} color="purple" onClick={() => navigate(`/projects/${project.projectId}/tax-invoice`)} />
                  <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums bg-purple-50/40 text-purple-800 font-medium">
                    {formatCurrency(project.taxInvoiceAmount)}
                  </td>

                  {/* ── Clickable: Invoice Booked (Orange) ── */}
                  <ClickableCell value={project.noOfInvoiceBooked} color="orange" onClick={() => navigate(`/projects/${project.projectId}/invoice-booked`)} />
                  <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums bg-orange-50/40 text-orange-800 font-medium">
                    {formatCurrency(project.invoiceAmount)}
                  </td>

                  <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums text-slate-700">
                    {formatCurrency(project.amountPaid)}
                  </td>

                  <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums font-bold text-slate-900">
                    {formatCurrency(project.ledgerBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginatedProjects.length === 0 && (
            <div className="py-14 text-center text-slate-400">
              <p className="font-medium">No projects found.</p>
              <p className="text-sm mt-1">Try a different search term.</p>
            </div>
          )}
        </div>
        )}
        {totalRecords > pageSize && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={totalRecords}
            pageSize={pageSize}
          />
        )}
      </div>
      )}
    </div>
  );
}
