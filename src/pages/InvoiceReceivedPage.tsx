import { useMemo, useState } from "react";
import { invoiceReceivedDetails } from "../data/mockData";
import Pagination from "../components/Pagination";
import ColumnFilterPanel from "../components/ColumnFilterPanel";
import { applyColumnFilters, type ColumnFilters, type FilterField } from "../utils/tableFilters";

interface Props { onBack: () => void; }

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);
}

export default function InvoiceReceivedPage({ onBack }: Props) {
  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});
  const filterFields: FilterField[] = [
    { key: "srNo", label: "Sr.No." },
    { key: "projectNumber", label: "Project Number" },
    { key: "poWoNumber", label: "PO/WO Number" },
    { key: "vendorName", label: "Vendor Name" },
    { key: "invoiceNumber", label: "Invoice Number" },
    { key: "invoiceDate", label: "Invoice Date" },
    { key: "receivedDate", label: "Received Date" },
    { key: "invoiceAmount", label: "Invoice Amount" },
    { key: "bookAmount", label: "Book Amount" },
    { key: "amountPaid", label: "Amount Paid" },
    { key: "invoiceStatus", label: "Status" },
  ];

  const projects = useMemo(() => [...new Set(invoiceReceivedDetails.map((d) => d.projectNumber))], []);

  const filteredData = useMemo(() => {
    let data = invoiceReceivedDetails;
    if (search) {
      const s = search.toLowerCase();
      data = data.filter((d) => d.invoiceNumber.toLowerCase().includes(s) || d.vendorName.toLowerCase().includes(s));
    }
    if (filterProject) data = data.filter((d) => d.projectNumber === filterProject);
    return applyColumnFilters(data, columnFilters);
  }, [search, filterProject, columnFilters]);

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
                <th className="px-4 py-3.5 text-left font-bold">Project Number</th>
                <th className="px-4 py-3.5 text-left font-bold">PO/WO Number</th>
                <th className="px-4 py-3.5 text-left font-bold">Vendor Name</th>
                <th className="px-4 py-3.5 text-left font-bold">Invoice Number</th>
                <th className="px-4 py-3.5 text-left font-bold">Invoice Date</th>
                <th className="px-4 py-3.5 text-left font-bold">Received Date</th>
                <th className="px-4 py-3.5 text-right font-bold border-l border-white/20">Invoice Amount</th>
                <th className="px-4 py-3.5 text-right font-bold border-l border-white/20">Book Amount</th>
                <th className="px-4 py-3.5 text-right font-bold border-l border-white/20">Amount Paid</th>
                <th className="px-4 py-3.5 text-center font-bold border-l border-white/20">Objection Details</th>
                <th className="px-4 py-3.5 text-center font-bold border-l border-white/20">Invoice Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.map((d) => (
                <tr key={d.srNo} className={`hover:bg-green-50/40 transition-colors ${d.srNo % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
                  <td className="px-4 py-3.5 text-slate-600">{d.srNo}</td>
                  <td className="px-4 py-3.5 text-primary-700 font-semibold">{d.projectNumber}</td>
                  <td className="px-4 py-3.5 text-slate-700">{d.poWoNumber}</td>
                  <td className="px-4 py-3.5 text-slate-700">{d.vendorName}</td>
                  <td className="px-4 py-3.5 text-slate-700 font-medium">{d.invoiceNumber}</td>
                  <td className="px-4 py-3.5 text-slate-600">{d.invoiceDate}</td>
                  <td className="px-4 py-3.5 text-slate-600">{d.receivedDate}</td>
                  <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums font-medium text-blue-700">{formatCurrency(d.invoiceAmount)}</td>
                  <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums text-slate-700">{d.bookAmount > 0 ? formatCurrency(d.bookAmount) : "-"}</td>
                  <td className="px-4 py-3.5 text-right border-l border-slate-200/60 tabular-nums font-medium text-green-700">{d.amountPaid > 0 ? formatCurrency(d.amountPaid) : "-"}</td>
                  <td className="px-4 py-3.5 text-center border-l border-slate-200/60 text-slate-600">{d.objectionDetails}</td>
                  <td className="px-4 py-3.5 text-center border-l border-slate-200/60">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${d.invoiceStatus === "Payment Done" ? "bg-green-100 text-green-700" : d.invoiceStatus === "Pending With Provision" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                      {d.invoiceStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={filteredData.length} pageSize={pageSize} />
      </div>
    </div>
  );
}
