import React, { useState, useEffect } from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

function FinancialHandling() {
  // Time period state
  const [timePeriod, setTimePeriod] = useState("monthly");
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinancialSummary = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3300/finance/summary"
        );
        setFinancialData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching financial summary:", err);
      }
    };

    fetchFinancialSummary();
  }, []);

  // Transform API data for charts
  const revenueData = [
    { name: "Jan", revenue: 4000, expenses: 2400 },
    { name: "Feb", revenue: 3000, expenses: 1398 },
    { name: "Mar", revenue: 2000, expenses: 9800 },
    { name: "Apr", revenue: 2780, expenses: 3908 },
    { name: "May", revenue: 1890, expenses: 4800 },
    { name: "Jun", revenue: 2390, expenses: 3800 },
    { name: "Jul", revenue: 3490, expenses: 4300 },
  ];

  const branchPerformance = financialData?.branchRevenue
    ? financialData.branchRevenue.map((branch) => ({
        name: branch.branchName,
        revenue: branch.revenue,
      }))
    : [
        { name: "Downtown", revenue: 0 },
        { name: "Westside", revenue: 0 },
        { name: "East End", revenue: 0 },
        { name: "Northside", revenue: 0 },
        { name: "Southside", revenue: 0 },
      ];

  // Use actual expense distribution from API if available
  const expenseDistribution = financialData
    ? [
        {
          name: "Teachers",
          value: financialData.breakdown.expenses.teacherSalaries,
        },
        {
          name: "Admin Staff",
          value: financialData.breakdown.expenses.adminStaffSalaries,
        },
        {
          name: "Guards",
          value: financialData.breakdown.expenses.gaurdsSalaries,
        },
        {
          name: "Janitors",
          value: financialData.breakdown.expenses.janitorsSalaries,
        },
        {
          name: "Office Boys",
          value: financialData.breakdown.expenses.officeBoysSalaries,
        },
      ]
    : [
        { name: "Salaries", value: 45 },
        { name: "Rent", value: 25 },
        { name: "Utilities", value: 15 },
        { name: "Supplies", value: 10 },
        { name: "Other", value: 5 },
      ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // Key metrics using API data
  const metrics = [
    {
      name: "Total Revenue",
      value: financialData
        ? `$${financialData.totalIncome.toLocaleString()}`
        : "$0",
      change: "+12%",
      trend: "up",
    },
    {
      name: "Total Expenses",
      value: financialData
        ? `$${financialData.totalExpenses.toLocaleString()}`
        : "$0",
      change: "+5%",
      trend: "up",
    },
    {
      name: "Net Profit",
      value: financialData
        ? `$${financialData.totalProfit.toLocaleString()}`
        : "$0",
      change: financialData
        ? financialData.totalProfit > 0
          ? "+22%"
          : "-22%"
        : "+0%",
      trend: financialData
        ? financialData.totalProfit > 0
          ? "up"
          : "down"
        : "up",
    },
    {
      name: "Profit Margin",
      value: financialData
        ? `${(
            (financialData.totalProfit / financialData.totalIncome) *
            100
          ).toFixed(1)}%`
        : "0%",
      change: financialData
        ? financialData.totalProfit > 0
          ? "+3.2%"
          : "-3.2%"
        : "+0%",
      trend: financialData
        ? financialData.totalProfit > 0
          ? "up"
          : "down"
        : "up",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 items-center justify-center overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <p>Loading financial data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 items-center justify-center overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="mb-8 flex w-full flex-col justify-between sm:flex-row sm:items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Financial Dashboard
            </h1>

            <div className="mt-4 flex items-center space-x-2 sm:mt-0">
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <button className="rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700">
                Export Report
              </button>
            </div>
          </header>

          {/* Key Metrics */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-100 bg-white p-6 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">
                    {metric.name}
                  </h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      metric.trend === "up"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {metric.value}
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  {metric.trend === "up" ? (
                    <svg
                      className="mr-1 h-4 w-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 7a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L12 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4A1 1 0 0112 7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="mr-1 h-4 w-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 13a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L12 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4A1 1 0 0112 13z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span>vs last period</span>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue vs Expenses Chart */}
          <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Revenue vs Expenses
              </h2>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-500">Revenue</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-500">Expenses</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#93C5FD"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stackId="2"
                    stroke="#EF4444"
                    fill="#FCA5A5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Branch Performance */}
            <div className="rounded-lg border-gray-100 bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-medium text-gray-900">
                Branch Performance
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={branchPerformance}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: "#6b7280" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{ fill: "#6b7280" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Revenue",
                      ]}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#8884d8"
                      radius={[0, 4, 4, 0]}
                      name="Revenue"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Expense Distribution - Now using actual data from API */}
            <div className="rounded-lg border-gray-100 bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-medium text-gray-900">
                Expense Distribution
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {expenseDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        "Amount",
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="mt-8 rounded-lg border-gray-100 bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-medium text-gray-900">
              Recent Transactions
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[
                    {
                      id: 1,
                      date: "2023-06-15",
                      description: "Office Rent",
                      amount: "$2,500",
                      category: "Rent",
                      status: "Completed",
                    },
                    {
                      id: 2,
                      date: "2023-06-14",
                      description: "Employee Salaries",
                      amount: "$12,800",
                      category: "Payroll",
                      status: "Completed",
                    },
                    {
                      id: 3,
                      date: "2023-06-12",
                      description: "Marketing Campaign",
                      amount: "$3,200",
                      category: "Marketing",
                      status: "Pending",
                    },
                    {
                      id: 4,
                      date: "2023-06-10",
                      description: "Office Supplies",
                      amount: "$450",
                      category: "Supplies",
                      status: "Completed",
                    },
                    {
                      id: 5,
                      date: "2023-06-08",
                      description: "Utility Bills",
                      amount: "$1,200",
                      category: "Utilities",
                      status: "Completed",
                    },
                  ].map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {transaction.date}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {transaction.description}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {transaction.amount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {transaction.category}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            transaction.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FinancialHandling;
