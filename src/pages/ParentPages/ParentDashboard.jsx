import React, { useState, useEffect } from "react";
import {
  LineChart,
  BarChart,
  Bar,
  Line,
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
import {
  FiUser,
  FiBook,
  FiAward,
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiCheckCircle,
  FiMeh,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";
import Sidebar from "../../components/commonComponents/Sidebar";
import Female from "../../assets/female.png";
import Male from "../../assets/male.png";

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(null);
  const [timeRange, setTimeRange] = useState("monthly");

  // Sample data - replace with API calls in real app
  const children = [
    {
      id: 1,
      name: "Sarah Khan",
      grade: "8th Grade",
      rollNumber: "S-1025",
      image: Female,
    },
    {
      id: 2,
      name: "Ali Rahman",
      grade: "5th Grade",
      rollNumber: "S-1026",
      image: Male,
    },
    {
      id: 3,
      name: "Aisha Ahmed",
      grade: "3rd Grade",
      rollNumber: "S-1027",
      image: Female,
    },
  ];

  // Performance data
  const performanceData = {
    1: {
      monthly: [
        { subject: "Math", score: 85, previous: 78 },
        { subject: "Science", score: 92, previous: 88 },
        { subject: "English", score: 78, previous: 72 },
        { subject: "History", score: 88, previous: 85 },
      ],
      weekly: [
        { day: "Mon", score: 82 },
        { day: "Tue", score: 88 },
        { day: "Wed", score: 85 },
        { day: "Thu", score: 90 },
        { day: "Fri", score: 87 },
      ],
    },
    2: {
      monthly: [
        { subject: "Math", score: 55, previous: 78 },
        { subject: "Science", score: 52, previous: 88 },
        { subject: "English", score: 58, previous: 72 },
        { subject: "History", score: 58, previous: 85 },
      ],
      weekly: [
        { day: "Mon", score: 52 },
        { day: "Tue", score: 58 },
        { day: "Wed", score: 55 },
        { day: "Thu", score: 50 },
        { day: "Fri", score: 57 },
      ],
    },
    3: {
      monthly: [
        { subject: "Math", score: 95, previous: 78 },
        { subject: "Science", score: 92, previous: 88 },
        { subject: "English", score: 98, previous: 72 },
        { subject: "History", score: 98, previous: 85 },
      ],
      weekly: [
        { day: "Mon", score: 92 },
        { day: "Tue", score: 98 },
        { day: "Wed", score: 95 },
        { day: "Thu", score: 90 },
        { day: "Fri", score: 97 },
      ],
    },
    // Add data for other children...
  };

  // Behavior data
  const behaviorData = {
    1: {
      positive: 8,
      negative: 2,
      trends: [
        { week: "Week 1", positive: 2, negative: 1 },
        { week: "Week 2", positive: 3, negative: 0 },
        { week: "Week 3", positive: 2, negative: 1 },
        { week: "Week 4", positive: 1, negative: 0 },
      ],
    },
    2: {
      positive: 8,
      negative: 2,
      trends: [
        { week: "Week 1", positive: 2, negative: 1 },
        { week: "Week 2", positive: 3, negative: 0 },
        { week: "Week 3", positive: 2, negative: 1 },
        { week: "Week 4", positive: 1, negative: 0 },
      ],
    },
    3: {
      positive: 28,
      negative: 2,
      trends: [
        { week: "Week 1", positive: 5, negative: 1 },
        { week: "Week 2", positive: 8, negative: 0 },
        { week: "Week 3", positive: 6, negative: 1 },
        { week: "Week 4", positive: 9, negative: 0 },
      ],
    },
    // Add data for other children...
  };

  // Attendance data
  const attendanceData = {
    1: {
      present: 45,
      absent: 5,
      late: 2,
      monthlyTrend: [
        { month: "Jan", present: 20, absent: 2 },
        { month: "Feb", present: 22, absent: 1 },
        { month: "Mar", present: 23, absent: 2 },
      ],
    },
    2: {
      present: 70,
      absent: 5,
      late: 2,
      monthlyTrend: [
        { month: "Jan", present: 29, absent: 2 },
        { month: "Feb", present: 13, absent: 1 },
        { month: "Mar", present: 28, absent: 2 },
      ],
    },
    3: {
      present: 35,
      absent: 5,
      late: 2,
      monthlyTrend: [
        { month: "Jan", present: 10, absent: 2 },
        { month: "Feb", present: 12, absent: 1 },
        { month: "Mar", present: 13, absent: 2 },
      ],
    },
    // Add data for other children...
  };

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const behaviorColors = { positive: "#4CAF50", negative: "#F44336" };

  useEffect(() => {
    // Auto-select first child
    if (children.length > 0 && !selectedChild) {
      setSelectedChild(children[0]);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
          <p className="text-gray-600">Track your child's academic progress</p>
        </header>

        {/* Child Selection */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Select Child
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`flex items-center rounded-xl p-4 shadow-sm transition-all ${
                  selectedChild?.id === child.id
                    ? "border-2 border-indigo-500 bg-indigo-50"
                    : "border border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <img
                  src={child.image}
                  alt={child.name}
                  className="mr-4 h-12 w-12 rounded-full"
                />
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{child.name}</h3>
                  <p className="text-sm text-gray-500">
                    {child.grade} • {child.rollNumber}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedChild && (
          <>
            {/* Time Range Selector */}
            <div className="mb-6 flex justify-end">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setTimeRange("weekly")}
                  className={`px-4 py-2 text-sm font-medium ${
                    timeRange === "weekly"
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } rounded-l-lg border border-gray-200`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTimeRange("monthly")}
                  className={`px-4 py-2 text-sm font-medium ${
                    timeRange === "monthly"
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } rounded-r-lg border border-gray-200`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Academic Performance */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="flex items-center text-lg font-semibold text-gray-800">
                    <FiBook className="mr-2 text-indigo-600" />
                    Academic Performance
                  </h2>
                  <div className="flex items-center text-sm">
                    <span className="mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                    Current
                    <span className="mx-2 h-2 w-2 rounded-full bg-gray-300"></span>
                    Previous
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData[selectedChild.id][timeRange]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey={timeRange === "monthly" ? "subject" : "day"}
                      />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar
                        dataKey="score"
                        fill="#4F46E5"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="previous"
                        fill="#E5E7EB"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Behavior Analysis */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                  <FiUser className="mr-2 text-indigo-600" />
                  Behavior Analysis
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="h-64">
                    <h3 className="mb-2 text-sm font-medium text-gray-700">
                      Positive vs Negative
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            {
                              name: "Positive",
                              value: behaviorData[selectedChild.id].positive,
                            },
                            {
                              name: "Negative",
                              value: behaviorData[selectedChild.id].negative,
                            },
                          ]}
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
                          <Cell fill={behaviorColors.positive} />
                          <Cell fill={behaviorColors.negative} />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="h-64">
                    <h3 className="mb-2 text-sm font-medium text-gray-700">
                      Weekly Trend
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={behaviorData[selectedChild.id].trends}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="positive"
                          stroke={behaviorColors.positive}
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="negative"
                          stroke={behaviorColors.negative}
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance and Quick Stats */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Attendance Trend */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
                <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                  <FiCalendar className="mr-2 text-indigo-600" />
                  Attendance Trend
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendanceData[selectedChild.id].monthlyTrend}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="present"
                        fill="#4CAF50"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="absent"
                        fill="#F44336"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                  <FiAward className="mr-2 text-indigo-600" />
                  Quick Stats
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Attendance Rate
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(
                          (attendanceData[selectedChild.id].present /
                            (attendanceData[selectedChild.id].present +
                              attendanceData[selectedChild.id].absent)) *
                            100
                        )}
                        %
                      </p>
                    </div>
                    <FiCheckCircle className="h-8 w-8 text-green-500" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-blue-50 p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Average Score
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(
                          performanceData[selectedChild.id].monthly.reduce(
                            (acc, curr) => acc + curr.score,
                            0
                          ) / performanceData[selectedChild.id].monthly.length
                        )}
                        %
                      </p>
                    </div>
                    <FiTrendingUp className="h-8 w-8 text-blue-500" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-amber-50 p-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Behavior Index
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(
                          (behaviorData[selectedChild.id].positive /
                            (behaviorData[selectedChild.id].positive +
                              behaviorData[selectedChild.id].negative)) *
                            100
                        )}
                        %
                      </p>
                    </div>
                    {behaviorData[selectedChild.id].positive /
                      (behaviorData[selectedChild.id].positive +
                        behaviorData[selectedChild.id].negative) >
                    0.7 ? (
                      <FiTrendingUp className="h-8 w-8 text-green-500" />
                    ) : (
                      <FiTrendingDown className="h-8 w-8 text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
