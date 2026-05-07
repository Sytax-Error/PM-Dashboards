import { useEffect, useMemo, useState } from "react";
import { taxInvoiceDetails } from "../data/mockData";
import Pagination from "../components/Pagination";
import ColumnFilterPanel from "../components/ColumnFilterPanel";
import {
  applyColumnFilters,
  type ColumnFilters,
  type FilterField,
} from "../utils/tableFilters";

import { useParams, useNavigate } from "react-router-dom";

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

export default function TaxInvoicePage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [taxData, setTaxData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});

  useEffect(() => {
    if (projectId) {
      const fetchTaxInvoices = async () => {
        setLoading(true);
        setError(null);
        try {
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
          const token = localStorage.getItem("access_token");
          const response = await fetch(
            `${API_BASE_URL}/api/pm/tax-invoice/project/${projectId}`,
            {
              headers: {
                Authorization: token ? `Bearer ${token}` : "",
              },
            },
          );
          if (!response.ok) throw new Error("Network response was not ok");
          const apiResult = await response.json();
          if (!apiResult.data)
            throw new Error("Failed to fetch tax invoice details.");

          const mapped = apiResult.data.map((item: any, idx: number) => ({
            srNo: idx + 1,
            headerId: item.headerId || "-",
            projectNumber: item.projectNo || "N/A",
            poWoNumber: item.poNo || "N/A",
            taxInvoiceNumber: item.userBillNo || "N/A",
            billDate: item.billDate
              ? new Date(item.billDate).toLocaleDateString("en-IN")
              : "N/A",
            status: item.billStatus || "N/A",
            billingPeriodFrom: item.billingPeriodFrom || "N/A",
            billingPeriodTo: item.billingPeriodTo || "N/A",
            billStatus: item.billStatus || "N/A",
            expInvoiceNumber: item.suppInvNum || "N/A",
            taxInvoiceAmount: item.totalAmount || 0,
            ammendPoNumber: item.ampoNo || "",
            billType: item.billType || "N/A",
            stateDescription: item.stateDescription || "N/A",
            irnNo: item.irnNo || "-",
          }));
          setTaxData(mapped);
        } catch (e: any) {
          setError(e.message || "Failed to load tax invoice details.");
        } finally {
          setLoading(false);
        }
      };
      fetchTaxInvoices();
    } else {
      setTaxData(taxInvoiceDetails);
    }
  }, [projectId]);
  const filterFields: FilterField[] = [
    { key: "srNo", label: "Sr.No." },
    { key: "headerId", label: "Header ID" },
    { key: "projectNumber", label: "Project Number" },
    { key: "poWoNumber", label: "PO Number" },
    { key: "taxInvoiceNumber", label: "Tax Invoice" },
    { key: "status", label: "Status" },
    { key: "billType", label: "Bill Type" },
    { key: "stateDescription", label: "State" },
    { key: "taxInvoiceAmount", label: "Amount" },
  ];

  const projects = useMemo(
    () => [...new Set(taxData.map((d) => d.projectNumber))],
    [taxData],
  );

  const filteredData = useMemo(() => {
    let data = taxData;
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(
        (d) =>
          d.taxInvoiceNumber.toLowerCase().includes(s) ||
          d.expInvoiceNumber.toLowerCase().includes(s),
      );
    }
    if (filterProject)
      data = data.filter((d) => d.projectNumber === filterProject);
    return applyColumnFilters(data, columnFilters);
  }, [search, filterProject, columnFilters, taxData]);

  const totalAmount = filteredData.reduce((s, d) => s + d.taxInvoiceAmount, 0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="min-h-full flex flex-col gap-6">
      <div className="pm-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
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
              Project Wise Tax Invoices Details
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Generated tax invoice details
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search invoice number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white w-full sm:w-60"
          />
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white w-full sm:w-48"
          >
            <option value="">All Projects</option>
            {projects.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading/Error States */}
      {error && (
        <div className="p-20 flex flex-col items-center justify-center text-center pm-card rounded-2xl">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Failed to load tax invoice details
          </h3>
          <p className="text-sm text-slate-500 mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {!error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="pm-card rounded-2xl p-5">
              <p className="text-sm text-slate-500">Total Invoices</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {filteredData.length}
              </p>
            </div>
            <div className="pm-card rounded-2xl p-5">
              <p className="text-sm text-slate-500">Total Amount</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {formatCurrency(totalAmount)}
              </p>
            </div>
            <div className="pm-card rounded-2xl p-5">
              <p className="text-sm text-slate-500">Final Status</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {filteredData.filter((d) => d.status === "FINAL").length}
              </p>
            </div>
          </div>

          <ColumnFilterPanel
            fields={filterFields}
            filters={columnFilters}
            onChange={setColumnFilters}
          />

          <div
            className={`pm-card rounded-2xl overflow-hidden relative ${loading ? "opacity-60" : ""}`}
          >
            {loading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-600 rounded-full animate-spin"></div>
                  <span className="text-xs font-bold text-primary-700">
                    Refreshing...
                  </span>
                </div>
              </div>
            )}
            {paginatedData.length === 0 && !loading ? (
              <div className="p-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  No tax invoices found
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  There are no tax invoice records matching the current filters.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto scroll-table">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-purple-700 text-white">
                      <th className="px-4 py-3.5 text-left font-bold w-14">
                        Sr.No
                      </th>
                      <th className="px-4 py-3.5 text-left font-bold">
                        Header ID
                      </th>
                      <th className="px-4 py-3.5 text-left font-bold">
                        Project Number
                      </th>
                      <th className="px-4 py-3.5 text-left font-bold">
                        PO Number
                      </th>
                      <th className="px-4 py-3.5 text-left font-bold">
                        Tax Invoice Number
                      </th>
                      <th className="px-4 py-3.5 text-left font-bold">
                        Bill Date
                      </th>
                      <th className="px-4 py-3.5 text-left font-bold">
                        Bill Type
                      </th>
                      <th className="px-4 py-3.5 text-center font-bold border-l border-white/20">
                        Status
                      </th>
                      <th className="px-4 py-3.5 text-left font-bold">State</th>
                      <th className="px-4 py-3.5 text-right font-bold border-l border-white/20">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedData.map((d) => (
                      <tr
                        key={d.srNo}
                        className={`hover:bg-purple-50/40 transition-colors ${d.srNo % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                      >
                        <td className="px-4 py-3.5 text-slate-600">{d.srNo}</td>
                        <td className="px-4 py-3.5 text-slate-500 font-mono text-xs">
                          {d.headerId}
                        </td>
                        <td className="px-4 py-3.5 text-primary-700 font-semibold">
                          {d.projectNumber}
                        </td>
                        <td className="px-4 py-3.5 text-slate-700 font-medium">
                          {d.poWoNumber}
                        </td>
                        <td className="px-4 py-3.5 text-slate-700">
                          {d.taxInvoiceNumber}
                        </td>
                        <td className="px-4 py-3.5 text-slate-600">
                          {d.billDate}
                        </td>
                        <td className="px-4 py-3.5 text-slate-600">
                          {d.billType}
                        </td>
                        <td className="px-4 py-3.5 text-center border-l border-slate-200/60">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${d.status === "FINAL" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-600">
                          {d.stateDescription}
                        </td>
                        <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums font-bold text-purple-700">
                          {formatCurrency(d.taxInvoiceAmount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {filteredData.length > pageSize && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredData.length}
                pageSize={pageSize}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
