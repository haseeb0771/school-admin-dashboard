import React, { useState } from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import {
  FiCalendar,
  FiClock,
  FiBook,
  FiUsers,
  FiPlus,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import { format } from "date-fns";

function MyClasses() {
  const [activeTab, setActiveTab] = useState("current");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample classes data
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Mathematics 8A",
      subject: "Algebra",
      grade: "8th Grade",
      schedule: "Mon, Wed, Fri 9:00-10:00",
      students: 24,
      startDate: "2023-09-01",
      endDate: "2024-06-15",
      status: "active",
    },
    {
      id: 2,
      name: "Biology 9B",
      subject: "Biology",
      grade: "9th Grade",
      schedule: "Tue, Thu 11:00-12:30",
      students: 18,
      startDate: "2023-09-01",
      endDate: "2024-06-15",
      status: "active",
    },
    {
      id: 3,
      name: "History 10C",
      subject: "World History",
      grade: "10th Grade",
      schedule: "Mon, Wed 13:00-14:00",
      students: 20,
      startDate: "2023-09-01",
      endDate: "2024-06-15",
      status: "active",
    },
    {
      id: 4,
      name: "Summer Math Intensive",
      subject: "Geometry",
      grade: "9th Grade",
      schedule: "Daily 10:00-12:00",
      students: 15,
      startDate: "2023-06-01",
      endDate: "2023-08-15",
      status: "completed",
    },
  ]);

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeTab === "all" ||
      (activeTab === "current" && cls.status === "active") ||
      (activeTab === "completed" && cls.status === "completed");
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              My Classes
            </h1>
            <p className="text-gray-500">Manage all your teaching classes</p>
          </div>

          <button className="mt-4 flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 md:mt-0">
            <FiPlus className="mr-2" />
            Add New Class
          </button>
        </header>

        {/* Tabs and Search */}
        <div className="mb-6 flex flex-col justify-between space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab("current")}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                activeTab === "current"
                  ? "bg-white shadow"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              Current Classes
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                activeTab === "completed"
                  ? "bg-white shadow"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                activeTab === "all"
                  ? "bg-white shadow"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              All Classes
            </button>
          </div>

          <div className="flex space-x-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search classes..."
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
              <FiFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Classes Grid */}
        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((cls) => (
              <div
                key={cls.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {cls.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {cls.subject} • {cls.grade}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        cls.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {cls.status === "active" ? "Active" : "Completed"}
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiClock className="mr-2 text-indigo-500" />
                      {cls.schedule}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiUsers className="mr-2 text-indigo-500" />
                      {cls.students} students
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiCalendar className="mr-2 text-indigo-500" />
                      {format(new Date(cls.startDate), "MMM d, yyyy")} -{" "}
                      {format(new Date(cls.endDate), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between bg-gray-50 px-5 py-3">
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View Details
                  </button>
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-500">
                    View Students
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <p className="text-gray-500">
              No classes found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyClasses;
