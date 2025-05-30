import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import Sidebar from "../../../components/commonComponents/Sidebar";

function Finance() {
  // Sample data for charts
  const feeData = [
    { name: "Jan", verified: 4000, remaining: 2400 },
    { name: "Feb", verified: 3000, remaining: 1398 },
    { name: "Mar", verified: 2000, remaining: 9800 },
    { name: "Apr", verified: 2780, remaining: 3908 },
    { name: "May", verified: 1890, remaining: 4800 },
    { name: "Jun", verified: 2390, remaining: 3800 },
  ];

  const salaryData = [
    { name: "Paid", value: 73 },
    { name: "Remaining", value: 27 },
  ];

  const expenseData = [
    { name: "Infrastructure", value: 12000 },
    { name: "Supplies", value: 8000 },
    { name: "Salaries", value: 45000 },
    { name: "Miscellaneous", value: 5000 },
  ];

  const budgetData = [
    { name: "Allocated", value: 100000 },
    { name: "Spent", value: 70000 },
  ];

  const transactionHistory = [
    {
      id: 1,
      date: "2023-10-01",
      description: "Tuition Fee",
      amount: 5000,
      type: "Income",
    },
    {
      id: 2,
      date: "2023-10-05",
      description: "Teacher Salary",
      amount: 20000,
      type: "Expense",
    },
    {
      id: 3,
      date: "2023-10-10",
      description: "School Supplies",
      amount: 3000,
      type: "Expense",
    },
    {
      id: 4,
      date: "2023-10-15",
      description: "Donation",
      amount: 10000,
      type: "Income",
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Colors for charts

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Filter transactions
  const filteredTransactions = transactionHistory.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      {" "}
      <div className="flex h-screen">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-4xl">
              Financial Overview
            </h1>
          </header>

          {/* Metrics Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-transform hover:scale-105 hover:shadow-lg">
              <h2 className="text-center text-lg font-semibold text-gray-700">
                Verified Fees
              </h2>
              <p className="mt-2 text-2xl font-bold text-blue-500">$12,345</p>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-transform hover:scale-105 hover:shadow-lg">
              <h2 className="text-center text-lg font-semibold text-gray-700">
                Remaining Fees
              </h2>
              <p className="mt-2 text-2xl font-bold text-blue-500">$5,678</p>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-transform hover:scale-105 hover:shadow-lg">
              <h2 className="text-center text-lg font-semibold text-gray-700">
                Paid Salary
              </h2>
              <p className="mt-2 text-2xl font-bold text-blue-500">$45,678</p>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-transform hover:scale-105 hover:shadow-lg">
              <h2 className="text-center text-lg font-semibold text-gray-700">
                Remaining Salary
              </h2>
              <p className="mt-2 text-2xl font-bold text-blue-500">$10,000</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Line Chart for Fees */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">
                Fee Trends (Last 6 Months)
              </h2>
              <LineChart
                className="mt-7 ml-10"
                width={500}
                height={300}
                data={feeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="verified" stroke="#8884d8" />
                <Line type="monotone" dataKey="remaining" stroke="#82ca9d" />
              </LineChart>
            </div>

            {/* Pie Chart for Salary Breakdown */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
              <h2 className="text-xl font-semibold text-gray-700">
                Salary Breakdown
              </h2>
              <PieChart className="ml-16" width={500} height={300}>
                <Pie
                  data={salaryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {salaryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>

          {/* Expense Tracking */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Expense Breakdown
            </h2>
            <BarChart
              width={500}
              height={300}
              data={expenseData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>

          {/* Transaction History */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Transaction History
            </h2>
            <div className="mt-4 flex justify-between">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-md border border-gray-300 p-2"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-md border border-gray-300 p-2"
              >
                <option value="All">All</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <table className="mt-4 w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="p-2">{transaction.date}</td>
                    <td className="p-2">{transaction.description}</td>
                    <td className="p-2">{transaction.amount}</td>
                    <td className="p-2">{transaction.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Finance;
