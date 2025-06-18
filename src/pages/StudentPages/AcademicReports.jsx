import React from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import { FiDownload, FiPrinter, FiFilter, FiSearch } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data - replace with actual data from your API
const gradeData = [
  { name: "Math", midterm: 85, final: 90, average: 88 },
  { name: "Science", midterm: 78, final: 85, average: 82 },
  { name: "History", midterm: 92, final: 88, average: 90 },
  { name: "English", midterm: 80, final: 82, average: 81 },
  { name: "Art", midterm: 95, final: 93, average: 94 },
];

const reportCards = [
  {
    id: 1,
    term: "Fall 2023",
    date: "Dec 15, 2023",
    status: "Released",
    gpa: 3.75,
  },
  {
    id: 2,
    term: "Spring 2023",
    date: "May 20, 2023",
    status: "Released",
    gpa: 3.68,
  },
  {
    id: 3,
    term: "Fall 2022",
    date: "Dec 18, 2022",
    status: "Released",
    gpa: 3.52,
  },
];

function AcademicReports() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Academic Reports
            </h1>
            <p className="text-gray-500">
              View and download your academic records
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            <button className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">
              <FiFilter size={16} />
              <span>Filter</span>
            </button>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                className="rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </header>

        {/* GPA Trend Chart */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Grade Performance</h2>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-indigo-600">
                <FiDownload size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:text-indigo-600">
                <FiPrinter size={18} />
              </button>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={gradeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="midterm" fill="#8884d8" name="Midterm" />
                <Bar dataKey="final" fill="#82ca9d" name="Final Exam" />
                <Bar dataKey="average" fill="#ffc658" name="Course Average" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Report Cards */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Report Cards</h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Term
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Release Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    GPA
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {reportCards.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {report.term}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {report.date}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 
                        ${
                          report.status === "Released"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {report.gpa}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button className="mr-3 text-indigo-600 hover:text-indigo-900">
                        View
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transcript Section */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Official Transcript</h2>
              <p className="text-sm text-gray-500">
                Request your official academic transcript
              </p>
            </div>
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
              Request Transcript
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 p-6">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  Unofficial Transcript
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Last updated: June 15, 2023
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="flex items-center text-indigo-600 hover:text-indigo-800">
                  <FiDownload className="mr-1" size={16} />
                  <span>Download PDF</span>
                </button>
                <button className="flex items-center text-indigo-600 hover:text-indigo-800">
                  <FiPrinter className="mr-1" size={16} />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicReports;
