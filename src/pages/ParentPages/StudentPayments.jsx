import React from "react";
import {
  FiDollarSign,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
} from "react-icons/fi";
import Sidebar from "../../components/commonComponents/Sidebar";

const paymentHistory = [
  {
    id: 1,
    month: "January 2025",
    amount: 5000,
    date: "2025-01-10",
    status: "Paid",
  },
  {
    id: 2,
    month: "February 2025",
    amount: 5000,
    date: "2025-02-10",
    status: "Paid",
  },
  {
    id: 3,
    month: "March 2025",
    amount: 5000,
    date: "2025-03-15",
    status: "Unpaid",
  },
];

function StudentPayments() {
  const totalPaid = paymentHistory
    .filter((p) => p.status === "Paid")
    .reduce((acc, p) => acc + p.amount, 0);
  const totalDue = paymentHistory
    .filter((p) => p.status !== "Paid")
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
          <p className="text-gray-600">Track your child's academic progress</p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow">
            <FiDollarSign className="text-2xl text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Total Paid</p>
              <h3 className="text-xl font-semibold text-gray-800">
                ₹ {totalPaid}
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow">
            <FiXCircle className="text-2xl text-red-500" />
            <div>
              <p className="text-sm text-gray-500">Outstanding Balance</p>
              <h3 className="text-xl font-semibold text-gray-800">
                ₹ {totalDue}
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow">
            <FiCalendar className="text-2xl text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Total Months</p>
              <h3 className="text-xl font-semibold text-gray-800">
                {paymentHistory.length}
              </h3>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Month</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Paid On</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {payment.month}
                  </td>
                  <td className="px-4 py-3">₹ {payment.amount}</td>
                  <td className="px-4 py-3">
                    {payment.status === "Paid" ? payment.date : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {payment.status === "Paid" ? (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        <FiCheckCircle className="mr-1" /> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                        <FiXCircle className="mr-1" /> Unpaid
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {payment.status === "Paid" ? (
                      <button className="flex items-center text-sm text-indigo-600 hover:underline">
                        <FiDownload className="mr-1" /> Download
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Reminder / Action */}
        {totalDue > 0 && (
          <div className="mt-6 flex justify-end">
            <button className="rounded-md bg-indigo-600 px-5 py-2 text-white shadow transition hover:bg-indigo-700">
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentPayments;
