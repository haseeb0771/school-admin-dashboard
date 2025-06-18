import Sidebar from "../../components/commonComponents/Sidebar";
import React from "react";
import { FiSmile, FiFrown, FiAlertCircle, FiCalendar } from "react-icons/fi";

const behaviorReports = [
  {
    id: 1,
    date: "2025-06-12",
    type: "Positive",
    title: "Helped a Classmate",
    description:
      "Ali helped a classmate understand math homework during free period.",
  },
  {
    id: 2,
    date: "2025-06-10",
    type: "Warning",
    title: "Incomplete Homework",
    description:
      "Sarah missed two homework submissions this week for Science class.",
  },
  {
    id: 3,
    date: "2025-06-08",
    type: "Negative",
    title: "Disruptive in Class",
    description:
      "Aisha was repeatedly talking during lecture despite multiple warnings.",
  },
];

function StudentBehaviourReport() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
          <p className="text-gray-600">Track your child's academic progress</p>
        </header>
        <div className="space-y-4">
          {behaviorReports.map((report) => (
            <div
              key={report.id}
              className={`rounded-md border border-l-4 ${
                report.type === "Positive"
                  ? "border-green-500 bg-green-50"
                  : report.type === "Warning"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-red-500 bg-red-50"
              } p-4 shadow-sm`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center text-lg font-semibold text-gray-800">
                  {report.type === "Positive" && (
                    <FiSmile className="mr-2 text-green-600" />
                  )}
                  {report.type === "Warning" && (
                    <FiAlertCircle className="mr-2 text-yellow-600" />
                  )}
                  {report.type === "Negative" && (
                    <FiFrown className="mr-2 text-red-600" />
                  )}
                  {report.title}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FiCalendar className="mr-1" />
                  {new Date(report.date).toLocaleDateString()}
                </div>
              </div>
              <p className="text-sm text-gray-700">{report.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentBehaviourReport;
