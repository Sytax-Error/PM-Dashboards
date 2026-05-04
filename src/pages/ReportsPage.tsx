import { useMemo, useState } from "react";
import { projectRecords, ministries } from "../data/mockData";
import Pagination from "../components/Pagination";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* eslint-disable @typescript-eslint/no-explicit-any */

function formatCurrency(num: number): string {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return `₹${num}`;
}

function formatShort(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return `${num}`;
}

export default function ReportsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const ministryReport = useMemo(() => {
    return ministries
      .map((m) => {
        const records = projectRecords.filter((r) => r.ministry === m);
        return {
          name: m.replace("Ministry of ", "").replace("Department of ", ""),
          fullName: m,
          projects: records.length,
          piAmount: records.reduce((s, r) => s + r.piAmount, 0),
          received: records.reduce((s, r) => s + r.amountReceived, 0),
          paid: records.reduce((s, r) => s + r.invoiceAmountPaid, 0),
          balance: records.reduce((s, r) => s + r.balanceAmount, 0),
        };
      })
      .filter((m) => m.projects > 0);
  }, []);

  const totalPages = Math.ceil(ministryReport.length / pageSize);
  const paginated = ministryReport.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const statusData = useMemo(() => {
    const fullyPaid = projectRecords.filter((r) => r.balanceAmount === 0).length;
    const partial = projectRecords.filter((r) => r.balanceAmount > 0 && r.invoiceAmountPaid > 0).length;
    const pending = projectRecords.filter((r) => r.invoiceAmountPaid === 0).length;
    return [
      { name: "Fully Paid", value: fullyPaid },
      { name: "Partially Paid", value: partial },
      { name: "Pending", value: pending },
    ];
  }, []);

  const topProjects = useMemo(() => {
    return [...projectRecords]
      .sort((a, b) => b.piAmount - a.piAmount)
      .slice(0, 10)
      .map((r) => ({
        name: r.projectNumber,
        piAmount: r.piAmount,
        received: r.amountReceived,
        balance: r.balanceAmount,
      }));
  }, []);

  return (
    <div className="min-h-full flex flex-col gap-6">
      {/* Ministry-wise comparison */}
      <div className="pm-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Ministry-wise Financial Comparison</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ministryReport} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={formatShort} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="piAmount" name="PI Amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="received" name="Received" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="paid" name="Paid" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment status pie */}
        <div className="pm-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Status Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={["#22c55e", "#f59e0b", "#ef4444"][index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top projects */}
        <div className="pm-card rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top 10 Projects by PI Amount</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProjects} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tickFormatter={formatShort} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={55} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="piAmount" name="PI Amount" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ministry-wise table with pagination */}
      <div id="reports-table-section" className="pm-card rounded-2xl overflow-hidden scroll-mt-6">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Ministry Summary Table</h3>
        </div>
        <div className="overflow-x-auto scroll-table">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Ministry / Department</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600">Projects</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">PI Amount</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Received</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Paid</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map((m) => (
                <tr key={m.fullName} className="hover:bg-primary-50/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{m.fullName}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{m.projects}</td>
                  <td className="px-4 py-3 text-right font-medium text-primary-700">{formatCurrency(m.piAmount)}</td>
                  <td className="px-4 py-3 text-right font-medium text-accent-600">{formatCurrency(m.received)}</td>
                  <td className="px-4 py-3 text-right font-medium text-blue-600">{formatCurrency(m.paid)}</td>
                  <td className="px-4 py-3 text-right font-medium text-warning-500">{formatCurrency(m.balance)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold">
                <td className="px-4 py-3 text-gray-900">Total</td>
                <td className="px-4 py-3 text-center text-gray-900">
                  {ministryReport.reduce((s, m) => s + m.projects, 0)}
                </td>
                <td className="px-4 py-3 text-right text-primary-700">
                  {formatCurrency(ministryReport.reduce((s, m) => s + m.piAmount, 0))}
                </td>
                <td className="px-4 py-3 text-right text-accent-600">
                  {formatCurrency(ministryReport.reduce((s, m) => s + m.received, 0))}
                </td>
                <td className="px-4 py-3 text-right text-blue-600">
                  {formatCurrency(ministryReport.reduce((s, m) => s + m.paid, 0))}
                </td>
                <td className="px-4 py-3 text-right text-warning-500">
                  {formatCurrency(ministryReport.reduce((s, m) => s + m.balance, 0))}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={ministryReport.length}
          pageSize={pageSize}
          scrollTargetId="reports-table-section"
        />
      </div>
    </div>
  );
}
