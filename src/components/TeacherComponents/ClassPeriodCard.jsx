import React from "react";
import { FiClock, FiBook, FiCheck, FiX } from "react-icons/fi";

const ClassPeriodCard = ({ period, onToggleStatus }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center text-lg font-medium text-gray-900">
            <FiClock className="mr-2 text-indigo-600" />
            {period.time}
          </div>
          <div className="mt-1 flex items-center text-gray-600">
            <FiBook className="mr-2" />
            {period.class} • {period.subject}
          </div>

          {/* Status Badge */}
          <div className="mt-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                period.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : period.status === "in-progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {period.status === "completed"
                ? "Completed"
                : period.status === "in-progress"
                ? "In Progress"
                : "Upcoming"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onToggleStatus(period.id)}
            className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ${
              period.taught
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {period.taught ? (
              <>
                <FiCheck className="mr-1" /> Taught
              </>
            ) : (
              <>
                <FiX className="mr-1" /> Not Taught
              </>
            )}
          </button>
        </div>
      </div>

      {/* Suggested Topics Section */}
      <div className="mt-4">
        <h3 className="mb-2 text-sm font-medium text-gray-700">
          Suggested Topics:
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {period.topics.map((topic, index) => (
            <SuggestedTopicCard key={index} topic={topic} />
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      {period.taught && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">
            Class Notes:
          </h3>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={3}
            placeholder="Add notes about how the class went..."
          />
        </div>
      )}
    </div>
  );
};

export default ClassPeriodCard;
