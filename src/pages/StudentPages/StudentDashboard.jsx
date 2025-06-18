import React from "react";
import { logout } from "../../utils/auth";
import Sidebar from "../../components/commonComponents/Sidebar";
import {
  FiBook,
  FiCalendar,
  FiAward,
  FiBarChart2,
  FiBell,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

function StudentDashboard() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  // Sample data - replace with your actual data
  const courses = [
    { id: 1, name: "Mathematics", progress: 75, color: "bg-blue-500" },
    { id: 2, name: "Computer Science", progress: 60, color: "bg-purple-500" },
    { id: 3, name: "Literature", progress: 90, color: "bg-green-500" },
  ];

  const upcomingAssignments = [
    {
      id: 1,
      course: "Mathematics",
      title: "Algebra Homework",
      dueDate: "Tomorrow",
    },
    {
      id: 2,
      course: "Computer Science",
      title: "React Project",
      dueDate: "In 3 days",
    },
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: "Campus Closure",
      content: "Campus will be closed next Monday for maintenance",
      date: "2 hours ago",
    },
    {
      id: 2,
      title: "Scholarship Opportunity",
      content: "Applications open for STEM scholarships",
      date: "1 day ago",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Welcome back,{" "}
              <span className="text-indigo-600">
                {userData.studentFirstName}
              </span>
              !
            </h1>
            <p className="text-gray-500">
              Here's what's happening with your education today
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            <button className="rounded-full bg-white p-2 text-gray-500 shadow-sm hover:text-indigo-600">
              <FiBell size={20} />
            </button>
            <button
              onClick={logout}
              className="flex items-center space-x-1 rounded-lg bg-indigo-600 px-3 py-2 text-white transition hover:bg-indigo-700"
            >
              <FiLogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border-l-4 border-blue-500 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Enrolled Courses</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-500">
                <FiBook size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border-l-4 border-green-500 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Assignments Due</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-500">
                <FiCalendar size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border-l-4 border-purple-500 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Average Grade</p>
                <h3 className="text-2xl font-bold">A-</h3>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-500">
                <FiBarChart2 size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border-l-4 border-yellow-500 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Achievements</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
              <div className="rounded-full bg-yellow-100 p-3 text-yellow-500">
                <FiAward size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Course Progress */}
          <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Course Progress</h2>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View All
              </button>
            </div>

            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center">
                  <div className="mr-4"></div>
                  <div className="flex-1">
                    <h3 className="font-medium">{course.name}</h3>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className={`h-2 rounded-full ${course.color}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-4 text-gray-500">{course.progress}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Assignments</h2>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="rounded-lg border border-gray-100 p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{assignment.title}</h3>
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
                      {assignment.dueDate}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {assignment.course}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Announcements</h2>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="rounded-lg border border-gray-100 p-4 hover:bg-gray-50"
                >
                  <h3 className="font-medium text-indigo-600">
                    {announcement.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {announcement.content}
                  </p>
                  <p className="mt-2 text-xs text-gray-400">
                    {announcement.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">Quick Actions</h2>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center rounded-lg border border-gray-100 p-4 hover:bg-gray-50">
                <div className="mb-2 rounded-full bg-blue-100 p-3 text-blue-500">
                  <FiBook size={20} />
                </div>
                <span className="text-sm">Register Courses</span>
              </button>

              <button className="flex flex-col items-center justify-center rounded-lg border border-gray-100 p-4 hover:bg-gray-50">
                <div className="mb-2 rounded-full bg-green-100 p-3 text-green-500">
                  <FiCalendar size={20} />
                </div>
                <span className="text-sm">View Schedule</span>
              </button>

              <button className="flex flex-col items-center justify-center rounded-lg border border-gray-100 p-4 hover:bg-gray-50">
                <div className="mb-2 rounded-full bg-purple-100 p-3 text-purple-500">
                  <FiBarChart2 size={20} />
                </div>
                <span className="text-sm">View Grades</span>
              </button>

              <button className="flex flex-col items-center justify-center rounded-lg border border-gray-100 p-4 hover:bg-gray-50">
                <div className="mb-2 rounded-full bg-yellow-100 p-3 text-yellow-500">
                  <FiSettings size={20} />
                </div>
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
