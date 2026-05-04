import { useMemo, useState } from "react";
import { projectRecords, agencies } from "../data/mockData";
import Pagination from "../components/Pagination";

function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(num);
}

export default function AgenciesPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const agencyStats = useMemo(() => {
    return agencies
      .map((agency) => {
        const records = projectRecords.filter((r) => r.agencyName === agency);
        return {
          name: agency,
          totalProjects: records.length,
          totalPIAmount: records.reduce((s, r) => s + r.piAmount, 0),
          totalReceived: records.reduce((s, r) => s + r.amountReceived, 0),
          totalInvoicePaid: records.reduce((s, r) => s + r.invoiceAmountPaid, 0),
          totalBalance: records.reduce((s, r) => s + r.balanceAmount, 0),
        };
      })
      .filter((a) => a.totalProjects > 0)
      .sort((a, b) => b.totalPIAmount - a.totalPIAmount);
  }, []);

  const filtered = useMemo(() => {
    if (!search) return agencyStats;
    const s = search.toLowerCase();
    return agencyStats.filter((a) => a.name.toLowerCase().includes(s));
  }, [search, agencyStats]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-full flex flex-col gap-6">
      {/* Search */}
      <div className="pm-card rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <h3 className="text-lg font-semibold text-gray-900">Agencies</h3>
        <div className="relative sm:ml-auto w-full sm:w-72">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search agencies..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
        </div>
      </div>

      {/* Agency Cards */}
      <div id="agencies-grid-section" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 scroll-mt-6">
        {paginated.map((agency) => (
          <div
            key={agency.name}
            className="pm-card rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{agency.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {agency.totalProjects} project{agency.totalProjects > 1 ? "s" : ""}
                </p>
              </div>
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total PI Amount</span>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(agency.totalPIAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Amount Received</span>
                <span className="text-sm font-semibold text-accent-600">{formatCurrency(agency.totalReceived)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Invoice Paid</span>
                <span className="text-sm font-semibold text-primary-700">{formatCurrency(agency.totalInvoicePaid)}</span>
              </div>
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Balance</span>
                <span className="text-sm font-bold text-warning-500">{formatCurrency(agency.totalBalance)}</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${agency.totalPIAmount > 0 ? Math.min(100, (agency.totalReceived / agency.totalPIAmount) * 100) : 0}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 text-right">
                {agency.totalPIAmount > 0 ? ((agency.totalReceived / agency.totalPIAmount) * 100).toFixed(1) : 0}% received
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="pm-card rounded-2xl p-12 text-center text-gray-400">
          <p className="text-lg">No agencies found</p>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filtered.length}
        pageSize={pageSize}
        scrollTargetId="agencies-grid-section"
      />
    </div>
  );
}
