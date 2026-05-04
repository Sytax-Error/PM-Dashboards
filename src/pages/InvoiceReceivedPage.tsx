import { useEffect, useMemo, useState } from "react";
import { invoiceReceivedDetails } from "../data/mockData";
import Pagination from "../components/Pagination";
import ColumnFilterPanel from "../components/ColumnFilterPanel";
import { applyColumnFilters, type ColumnFilters, type FilterField } from "../utils/tableFilters";

interface Props {
  onBack: () => void;
  projectId?: number | null;
}

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);
}

export default function InvoiceReceivedPage({ onBack, projectId }: Props) {
  const [invoiceData, setInvoiceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});

  useEffect(() => {
    if (projectId) {
      const fetchInvoices = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`http://10.23.124.23:8080/api/pm/billdesk/project/${projectId}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const apiResult = await response.json();
          if (!apiResult.data) throw new Error('Failed to fetch invoice details.');

          const mapped = apiResult.data.map((item: any, idx: number) => ({
            srNo: idx + 1,
            headerId: item.headerId || "-",
            projectNumber: item.projectNo || "N/A",
            poWoNumber: item.finalPoNo || "N/A",
            vendorName: item.vendorName || "N/A",
            invoiceNumber: item.invoiceNo || "N/A",
            invoiceDate: item.invoiceDate ? new Date(item.invoiceDate).toLocaleDateString("en-IN") : "N/A",
            receivedDate: item.receivedDate ? new Date(item.receivedDate).toLocaleDateString("en-IN") : "N/A",
            invoiceAmount: item.invoiceAmount || 0,
            bookAmount: item.invoiceAmountBk || 0,
            amountPaid: item.amountPaid || 0,
            objectionDetails: item.objectionRemarks || "-",
            invoiceStatus: item.status || "Pending",
            billMonth: item.billMonth || "-",
            createdDate: item.createdDate ? new Date(item.createdDate).toLocaleDateString("en-IN") : "N/A",
          }));
          setInvoiceData(mapped);
        } catch (e: any) {
          setError(e.message || "Failed to load invoice details.");
        } finally {
          setLoading(false);
        }
      };
      fetchInvoices();
    } else {
      setInvoiceData(invoiceReceivedDetails);
    }
  }, [projectId]);
  const filterFields: FilterField[] = [
    { key: "srNo", label: "Sr.No." },
    { key: "headerId", label: "Header ID" },
    { key: "projectNumber", label: "Project No" },
    { key: "poWoNumber", label: "PO Number" },
    { key: "vendorName", label: "Vendor" },
    { key: "invoiceNumber", label: "Invoice No" },
    { key: "invoiceStatus", label: "Status" },
    { key: "invoiceAmount", label: "Amount" },
    { key: "createdDate", label: "Created Date" },
  ];

  const projects = useMemo(() => [...new Set(invoiceData.map((d) => d.projectNumber))], [invoiceData]);

  const filteredData = useMemo(() => {
    let data = invoiceData;
    if (search) {
      const s = search.toLowerCase();
      data = data.filter((d) => d.invoiceNumber.toLowerCase().includes(s) || d.vendorName.toLowerCase().includes(s));
    }
    if (filterProject) data = data.filter((d) => d.projectNumber === filterProject);
    return applyColumnFilters(data, columnFilters);
  }, [search, filterProject, columnFilters, invoiceData]);

  const totalInvoice = filteredData.reduce((s, d) => s + d.invoiceAmount, 0);
  const totalPaid = filteredData.reduce((s, d) => s + d.amountPaid, 0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-full flex flex-col gap-6">
      <div className="pm-card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button type="button" onClick={onBack} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Project Wise Exp Invoice Details Received at Bill Desk</h2>
            <p className="text-sm text-slate-500 mt-0.5">Invoices received at Billdesk</p>
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
      {loading && <div className="p-10 text-center">Loading invoice details...</div>}
      {error && <div className="p-10 text-center text-red-600">Error: {error}</div>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="pm-card rounded-2xl p-5"><p className="text-sm text-slate-500">Total Invoices</p><p className="text-2xl font-bold text-slate-900 mt-1">{filteredData.length}</p></div>
            <div className="pm-card rounded-2xl p-5"><p className="text-sm text-slate-500">Invoice Amount</p><p className="text-2xl font-bold text-blue-600 mt-1">{formatCurrency(totalInvoice)}</p></div>
            <div className="pm-card rounded-2xl p-5"><p className="text-sm text-slate-500">Amount Paid</p><p className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(totalPaid)}</p></div>
            <div className="pm-card rounded-2xl p-5"><p className="text-sm text-slate-500">Payment Done</p><p className="text-2xl font-bold text-emerald-600 mt-1">{filteredData.filter((d) => d.invoiceStatus === "Payment Done").length}</p></div>
          </div>

          <ColumnFilterPanel fields={filterFields} filters={columnFilters} onChange={setColumnFilters} />

          <div className="pm-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto scroll-table">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-700 text-white">
                    <th className="px-4 py-3.5 text-left font-bold w-14">Sr.No</th>
                    <th className="px-4 py-3.5 text-left font-bold">Header ID</th>
                    <th className="px-4 py-3.5 text-left font-bold">Project No</th>
                    <th className="px-4 py-3.5 text-left font-bold">PO Number</th>
                    <th className="px-4 py-3.5 text-left font-bold">Vendor Name</th>
                    <th className="px-4 py-3.5 text-left font-bold">Invoice No</th>
                    <th className="px-4 py-3.5 text-left font-bold">Invoice Date</th>
                    <th className="px-4 py-3.5 text-left font-bold">Received Date</th>
                    <th className="px-4 py-3.5 text-right font-bold border-l border-white/20">Inv Amount</th>
                    <th className="px-4 py-3.5 text-right font-bold border-l border-white/20">Book Amount</th>
                    <th className="px-4 py-3.5 text-right font-bold border-l border-white/20">Paid Amount</th>
                    <th className="px-4 py-3.5 text-center font-bold border-l border-white/20">Status</th>
                    <th className="px-4 py-3.5 text-left font-bold border-l border-white/20 text-xs">Created Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedData.map((d) => (
                    <tr key={d.srNo} className={`hover:bg-green-50/40 transition-colors ${d.srNo % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
                      <td className="px-4 py-3.5 text-slate-600">{d.srNo}</td>
                      <td className="px-4 py-3.5 text-slate-500 font-mono text-xs">{d.headerId}</td>
                      <td className="px-4 py-3.5 text-primary-700 font-semibold">{d.projectNumber}</td>
                      <td className="px-4 py-3.5 text-slate-700">{d.poWoNumber}</td>
                      <td className="px-4 py-3.5 text-slate-700">{d.vendorName}</td>
                      <td className="px-4 py-3.5 text-slate-700 font-medium">{d.invoiceNumber}</td>
                      <td className="px-4 py-3.5 text-slate-600">{d.invoiceDate}</td>
                      <td className="px-4 py-3.5 text-slate-600">{d.receivedDate}</td>
                      <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums font-medium text-blue-700">{formatCurrency(d.invoiceAmount)}</td>
                      <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums text-slate-700">{d.bookAmount > 0 ? formatCurrency(d.bookAmount) : "-"}</td>
                      <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums font-medium text-green-700">{d.amountPaid > 0 ? formatCurrency(d.amountPaid) : "-"}</td>
                      <td className="px-4 py-3.5 text-center border-l border-slate-200/60">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${d.invoiceStatus === "Payment Done" ? "bg-green-100 text-green-700" : d.invoiceStatus === "Pending With Provision" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                          {d.invoiceStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 text-[10px] border-l border-slate-200/60 leading-tight">{d.createdDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={filteredData.length} pageSize={pageSize} />
          </div>
        </>
      )}
    </div>
  );
}
