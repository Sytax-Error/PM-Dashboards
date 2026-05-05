import { useEffect, useMemo, useState } from "react";
import { invoiceBookedDetails } from "../data/mockData";
import Pagination from "../components/Pagination";
import ColumnFilterPanel from "../components/ColumnFilterPanel";
import { applyColumnFilters, type ColumnFilters, type FilterField } from "../utils/tableFilters";

import { useParams, useNavigate } from "react-router-dom";

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);
}

export default function InvoiceBookedPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const [invoiceData, setInvoiceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});

  useEffect(() => {
    if (projectId) {
      const fetchBookedInvoices = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`http://10.23.124.23:8080/api/pm/invoice/project/${projectId}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const apiResult = await response.json();
          if (!apiResult.data) throw new Error('Failed to fetch booked invoices.');

          const mapped = apiResult.data.map((item: any, idx: number) => ({
            srNo: idx + 1,
            headerId: item.headerId || "-",
            projectNumber: item.projectNo || "N/A",
            managerName: item.managerName || "-",
            vendorName: item.vendorName || "N/A",
            poNumber: item.poNo || "N/A",
            invoiceRefNumber: item.invoiceNum || "N/A",
            invoiceDate: item.invoiceDate ? new Date(item.invoiceDate).toLocaleDateString("en-IN") : "N/A",
            glDate: item.glDate ? new Date(item.glDate).toLocaleDateString("en-IN") : "N/A",
            amount: item.invoiceAmount || 0,
            amountPaid: item.amountPaid || 0,
            unpaid: item.unpaid || 0,
            penAmt: item.penAmt || 0,
            objectionRemaks: item.objection || "-",
            invoiceType: item.invoiceType || "-",
            createdDate: item.createdDate ? new Date(item.createdDate).toLocaleDateString("en-IN") : "N/A",
          }));
          setInvoiceData(mapped);
        } catch (e: any) {
          setError(e.message || "Failed to load booked invoices.");
        } finally {
          setLoading(false);
        }
      };
      fetchBookedInvoices();
    } else {
      setInvoiceData(invoiceBookedDetails);
    }
  }, [projectId]);
  const filterFields: FilterField[] = [
    { key: "srNo", label: "Sr.No." },
    { key: "headerId", label: "Header ID" },
    { key: "projectNumber", label: "Project No" },
    { key: "vendorName", label: "Vendor" },
    { key: "poNumber", label: "PO Number" },
    { key: "invoiceRefNumber", label: "Invoice No" },
    { key: "invoiceType", label: "Type" },
    { key: "amount", label: "Amount" },
    { key: "amountPaid", label: "Paid" },
    { key: "createdDate", label: "Created Date" },
  ];

  const projects = useMemo(() => [...new Set(invoiceData.map((d) => d.projectNumber))], [invoiceData]);

  const filteredData = useMemo(() => {
    let data = invoiceData;
    if (search) {
      const s = search.toLowerCase();
      data = data.filter((d) => d.invoiceRefNumber.toLowerCase().includes(s) || d.vendorName.toLowerCase().includes(s));
    }
    if (filterProject) data = data.filter((d) => d.projectNumber === filterProject);
    return applyColumnFilters(data, columnFilters);
  }, [search, filterProject, columnFilters, invoiceData]);

  const totalAmount = filteredData.reduce((s, d) => s + d.amount, 0);
  const totalPaid = filteredData.reduce((s, d) => s + d.amountPaid, 0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-full flex flex-col gap-6">
      <div className="pm-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Project Wise Invoice Details</h2>
            <p className="text-sm text-slate-500 mt-0.5">Booked invoice details</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input type="text" placeholder="Search invoice or vendor..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white w-full sm:w-60" />
          <select value={filterProject} onChange={(e) => setFilterProject(e.target.value)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white w-full sm:w-48">
            <option value="">All Projects</option>
            {projects.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {/* Loading/Error States */}
      {error && (
        <div className="p-20 flex flex-col items-center justify-center text-center pm-card rounded-2xl">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Failed to load booked invoices</h3>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="pm-card rounded-2xl p-5"><p className="text-sm text-slate-500">Total Booked</p><p className="text-2xl font-bold text-slate-900 mt-1">{filteredData.length}</p></div>
            <div className="pm-card rounded-2xl p-5"><p className="text-sm text-slate-500">Total Amount</p><p className="text-2xl font-bold text-amber-600 mt-1">{formatCurrency(totalAmount)}</p></div>
            <div className="pm-card rounded-2xl p-5"><p className="text-sm text-slate-500">Amount Paid</p><p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(totalPaid)}</p></div>
            <div className="pm-card rounded-2xl p-5"><p className="text-sm text-slate-500">Pending</p><p className="text-2xl font-bold text-red-500 mt-1">{filteredData.filter((d) => d.amountPaid === 0).length}</p></div>
          </div>

          <ColumnFilterPanel fields={filterFields} filters={columnFilters} onChange={setColumnFilters} />

          <div className={`pm-card rounded-2xl overflow-hidden relative ${loading ? "opacity-60" : ""}`}>
            {loading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-600 rounded-full animate-spin"></div>
                  <span className="text-xs font-bold text-primary-700">Refreshing...</span>
                </div>
              </div>
            )}
            {paginatedData.length === 0 && !loading ? (
              <div className="p-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">No booked invoices found</h3>
                <p className="text-sm text-slate-500 mt-1">There are no booked invoice records matching the current filters.</p>
              </div>
            ) : (
            <div className="overflow-x-auto scroll-table">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-600 text-white">
                    <th className="px-4 py-3.5 text-left font-bold w-14">Sr.No.</th>
                    <th className="px-4 py-3.5 text-left font-bold">Header ID</th>
                    <th className="px-4 py-3.5 text-left font-bold">Project No</th>
                    <th className="px-4 py-3.5 text-left font-bold">PO Number</th>
                    <th className="px-4 py-3.5 text-left font-bold">Vendor Name</th>
                    <th className="px-4 py-3.5 text-left font-bold">Invoice No</th>
                    <th className="px-4 py-3.5 text-left font-bold">Invoice Date</th>
                    <th className="px-4 py-3.5 text-left font-bold text-xs">Inv Type</th>
                    <th className="px-4 py-3.5 text-right font-bold border-l border-white/20">Inv Amount</th>
                    <th className="px-4 py-3.5 text-right font-bold border-l border-white/20">Paid Amount</th>
                    <th className="px-4 py-3.5 text-right font-bold border-l border-white/20">Unpaid</th>
                    <th className="px-4 py-3.5 text-left font-bold border-l border-white/20 text-xs">Created Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedData.map((d) => (
                    <tr key={d.srNo} className={`hover:bg-orange-50/40 transition-colors ${d.srNo % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
                      <td className="px-4 py-3.5 text-slate-600">{d.srNo}</td>
                      <td className="px-4 py-3.5 text-slate-500 font-mono text-xs">{d.headerId}</td>
                      <td className="px-4 py-3.5 text-primary-700 font-semibold">{d.projectNumber}</td>
                      <td className="px-4 py-3.5 text-slate-700 font-medium">{d.poNumber}</td>
                      <td className="px-4 py-3.5 text-slate-700">{d.vendorName}</td>
                      <td className="px-4 py-3.5 text-slate-700 font-medium">{d.invoiceRefNumber}</td>
                      <td className="px-4 py-3.5 text-slate-600">{d.invoiceDate}</td>
                      <td className="px-4 py-3.5 text-slate-600 text-xs">{d.invoiceType}</td>
                      <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums font-bold text-orange-700">{formatCurrency(d.amount)}</td>
                      <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums font-medium text-green-700">{d.amountPaid > 0 ? formatCurrency(d.amountPaid) : "-"}</td>
                      <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums text-red-600">{d.unpaid > 0 ? formatCurrency(d.unpaid) : "-"}</td>
                      <td className="px-4 py-3.5 text-slate-500 text-[10px] border-l border-slate-200/60 leading-tight">{d.createdDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
            {filteredData.length > pageSize && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={filteredData.length} pageSize={pageSize} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
