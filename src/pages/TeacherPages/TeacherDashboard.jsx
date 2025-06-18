import React from "react";
import {
  FiBook,
  FiUsers,
  FiCalendar,
  FiBarChart2,
  FiInbox,
  FiBell,
  FiAward,
} from "react-icons/fi";
import Sidebar from "../../components/commonComponents/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function TeacherDashboard() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  // Sample data - replace with actual API data
  const classes = [
    { id: 1, name: "Mathematics 101", students: 24, progress: 78 },
    { id: 2, name: "Advanced Calculus", students: 18, progress: 65 },
    { id: 3, name: "Statistics", students: 32, progress: 92 },
  ];

  const upcomingTasks = [
    {
      id: 1,
      type: "grading",
      course: "Mathematics 101",
      title: "Grade Quiz #3",
      due: "Tomorrow",
    },
    {
      id: 2,
      type: "preparation",
      course: "Advanced Calculus",
      title: "Prepare Lecture Slides",
      due: "In 2 days",
    },
    { id: 3, type: "meeting", title: "Department Meeting", due: "Friday 2PM" },
  ];

  const performanceData = [
    { name: "Week 1", lectures: 4, grading: 8 },
    { name: "Week 2", lectures: 6, grading: 12 },
    { name: "Week 3", lectures: 5, grading: 10 },
    { name: "Week 4", lectures: 7, grading: 15 },
  ];

  const gradeDistribution = [
    { name: "A", value: 12 },
    { name: "B", value: 18 },
    { name: "C", value: 9 },
    { name: "D", value: 3 },
    { name: "F", value: 2 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Welcome,{" "}
              <span className="text-indigo-600">Prof. {userData.lastName}</span>
            </h1>
            <p className="text-gray-500">
              Here's your teaching overview for today
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            <button className="rounded-full bg-white p-2 text-gray-500 shadow-sm hover:text-indigo-600">
              <FiBell size={20} />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
              {userData.firstName.charAt(0)}
              {userData.lastName.charAt(0)}
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border-l-4 border-blue-500 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Active Courses</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-500">
                <FiBook size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border-l-4 border-green-500 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold">124</h3>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-500">
                <FiUsers size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border-l-4 border-purple-500 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Pending Grading</p>
                <h3 className="text-2xl font-bold">23</h3>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-500">
                <FiBarChart2 size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border-l-4 border-yellow-500 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Upcoming Events</p>
                <h3 className="text-2xl font-bold">4</h3>
              </div>
              <div className="rounded-full bg-yellow-100 p-3 text-yellow-500">
                <FiCalendar size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Classes Overview */}
          <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Classes</h2>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="rounded-lg border border-gray-100 p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{cls.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {cls.students} students enrolled
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                      {cls.progress}% complete
                    </span>
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${cls.progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-3 flex justify-between text-sm text-gray-500">
                    <span>Next: Lecture on Derivatives</span>
                    <span>Mon 10:00 AM</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border border-gray-100 p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start">
                    <div
                      className={`mr-3 rounded-full p-2 ${
                        task.type === "grading"
                          ? "bg-red-100 text-red-500"
                          : task.type === "preparation"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-purple-100 text-purple-500"
                      }`}
                    >
                      {task.type === "grading" ? (
                        <FiBarChart2 size={16} />
                      ) : task.type === "preparation" ? (
                        <FiBook size={16} />
                      ) : (
                        <FiUsers size={16} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{task.title}</h3>
                      {task.course && (
                        <p className="mt-1 text-sm text-gray-500">
                          {task.course}
                        </p>
                      )}
                    </div>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      {task.due}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Performance Metrics */}
          <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-6 text-xl font-semibold">Teaching Activity</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="lectures"
                    fill="#8884d8"
                    name="Lectures Given"
                  />
                  <Bar
                    dataKey="grading"
                    fill="#82ca9d"
                    name="Assignments Graded"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">Grade Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
