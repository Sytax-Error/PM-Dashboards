import { useMemo, useState } from "react";
import { projectRecords } from "../data/mockData";
import Pagination from "../components/Pagination";

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const invoiceData = useMemo(() => {
    return projectRecords
      .filter((r) => r.invoiceAmountReceived > 0)
      .map((r) => ({
        id: r.id,
        project: r.projectNumber,
        ministry: r.ministry,
        agency: r.agencyName,
        invoiceReceived: r.invoiceAmountReceived,
        invoicePaid: r.invoiceAmountPaid,
        balance: r.balanceAmount,
        piDate: r.piDate,
        status:
          r.balanceAmount === 0
            ? "Paid"
            : r.invoiceAmountPaid > 0
            ? "Partial"
            : "Pending",
      }));
  }, []);

  const filtered = useMemo(() => {
    let data = [...invoiceData];
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.project.toLowerCase().includes(s) ||
          r.ministry.toLowerCase().includes(s) ||
          r.agency.toLowerCase().includes(s)
      );
    }
    return data;
  }, [search, invoiceData]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalReceived = filtered.reduce((s, r) => s + r.invoiceReceived, 0);
  const totalPaid = filtered.reduce((s, r) => s + r.invoicePaid, 0);
  const totalBalance = filtered.reduce((s, r) => s + r.balance, 0);

  return (
    <div className="min-h-full flex flex-col gap-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="pm-card rounded-2xl p-5">
          <p className="text-sm text-gray-500">Total Invoice Received</p>
          <p className="text-2xl font-bold text-primary-700 mt-1">{formatCurrency(totalReceived)}</p>
        </div>
        <div className="pm-card rounded-2xl p-5">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold text-accent-600 mt-1">{formatCurrency(totalPaid)}</p>
        </div>
        <div className="pm-card rounded-2xl p-5">
          <p className="text-sm text-gray-500">Total Balance</p>
          <p className="text-2xl font-bold text-warning-500 mt-1">{formatCurrency(totalBalance)}</p>
        </div>
      </div>

      {/* Search */}
      <div id="invoices-table-section" className="pm-card rounded-2xl overflow-hidden scroll-mt-6">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">Invoice Records</h3>
          <div className="relative sm:ml-auto w-full sm:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto scroll-table">
          <table className="w-full text-sm sticky-header">
            <thead>
              <tr className="bg-gray-50 text-left border-b border-gray-200">
                <th className="px-4 py-3 font-semibold text-gray-600">#</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Project</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Ministry</th>
                <th className="px-4 py-3 font-semibold text-gray-600">Agency</th>
                <th className="px-4 py-3 font-semibold text-gray-600 text-right">Invoice Received</th>
                <th className="px-4 py-3 font-semibold text-gray-600 text-right">Invoice Paid</th>
                <th className="px-4 py-3 font-semibold text-gray-600 text-right">Balance</th>
                <th className="px-4 py-3 font-semibold text-gray-600 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map((r, i) => (
                <tr key={r.id} className="hover:bg-primary-50/30 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{(currentPage - 1) * pageSize + i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.project}</td>
                  <td className="px-4 py-3 text-gray-600">{r.ministry}</td>
                  <td className="px-4 py-3 text-gray-600">{r.agency}</td>
                  <td className="px-4 py-3 text-right font-medium text-primary-700">{formatCurrency(r.invoiceReceived)}</td>
                  <td className="px-4 py-3 text-right font-medium text-accent-600">{formatCurrency(r.invoicePaid)}</td>
                  <td className="px-4 py-3 text-right font-medium text-warning-500">{formatCurrency(r.balance)}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        r.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : r.status === "Partial"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">No invoices found</h3>
              <p className="text-sm text-slate-500 mt-1">There are no invoice records matching the current filters.</p>
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filtered.length}
          pageSize={pageSize}
          scrollTargetId="invoices-table-section"
        />
      </div>
    </div>
  );
}
