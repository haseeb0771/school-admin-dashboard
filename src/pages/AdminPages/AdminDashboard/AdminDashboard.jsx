import { useEffect, useState } from "react";
import { Card, Title } from "@tremor/react";
import { logout } from "../../../utils/auth";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import Female from "../../../assets/female.png";
import MaleFemale from "../../../assets/male-female.png";
import Male from "../../../assets/male.png";
import Sidebar from "../../../components/commonComponents/Sidebar";

function Dashboard() {
  const [studentData, setStudentData] = useState({
    totalStudents: 0,
    boysCount: 0,
    girlsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [campusData, setCampusData] = useState([]);
  const [boardProgressData, setBoardProgressData] = useState([]);
  const [classData, setClassData] = useState([]);

  // src/utils/auth.js

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = { Authorization: `Bearer ${token}` };

        if (!token) {
          setError("No authentication token found.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3300/students/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        setStudentData({
          totalStudents: data.totalStudents || 0,
          boysCount: data.boysCount || 0,
          girlsCount: data.girlsCount || 0,
        });
      } catch (error) {
        console.error("Error fetching student count:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    const initialCampusData = [
      { Campus: "Campus A", Students: 500 },
      { Campus: "Campus B", Students: 300 },
      { Campus: "Campus C", Students: 200 },
      { Campus: "Campus D", Students: 400 },
    ];
    setCampusData(initialCampusData);

    const interval = setInterval(() => {
      const updatedCampusData = initialCampusData.map((campus) => ({
        ...campus,
        Students: campus.Students + Math.floor(Math.random() * 10 - 5), // Random change
      }));
      setCampusData(updatedCampusData);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate dynamic data updates for Board Result-wise School Progress
  useEffect(() => {
    const initialBoardProgressData = [
      { Year: 2019, "Percentage Above 90%": 70 },
      { Year: 2020, "Percentage Above 90%": 75 },
      { Year: 2021, "Percentage Above 90%": 80 },
      { Year: 2022, "Percentage Above 90%": 85 },
      { Year: 2023, "Percentage Above 90%": 90 },
    ];
    setBoardProgressData(initialBoardProgressData);

    const interval = setInterval(() => {
      const updatedBoardProgressData = initialBoardProgressData.map((year) => ({
        ...year,
        "Percentage Above 90%":
          year["Percentage Above 90%"] + Math.floor(Math.random() * 5 - 2), // Random change
      }));
      setBoardProgressData(updatedBoardProgressData);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Dummy data for Class-wise Student Distribution
  useEffect(() => {
    const initialClassData = [
      { class: "Nursery", "Number of boys": 21, "Number of girls": 18 },
      { class: "LKG", "Number of boys": 14, "Number of girls": 11 },
      { class: "UKG", "Number of boys": 9, "Number of girls": 15 },
      { class: "Class 1", "Number of boys": 19, "Number of girls": 24 },
      { class: "Class 2", "Number of boys": 26, "Number of girls": 8 },
      { class: "Class 3", "Number of boys": 10, "Number of girls": 12 },
      { class: "Class 4", "Number of boys": 14, "Number of girls": 10 },
      { class: "Class 5", "Number of boys": 12, "Number of girls": 23 },
      { class: "Class 6", "Number of boys": 23, "Number of girls": 8 },
      { class: "Class 7", "Number of boys": 29, "Number of girls": 13 },
      { class: "Class 8", "Number of boys": 7, "Number of girls": 27 },
      { class: "Class 9", "Number of boys": 19, "Number of girls": 7 },
      { class: "Class 10", "Number of boys": 26, "Number of girls": 21 },
    ];
    setClassData(initialClassData);
  }, []);

  return (
    <>
      <div className="flex h-screen">
        <div className="w-64">
          <Sidebar />
        </div>

        <div className="h-full w-full overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Hello Admin!
            </h1>
          </header>

          {/* Loading & Error Handling */}
          {loading ? (
            <p className="mt-6 text-center text-lg font-semibold text-gray-700">
              Loading...
            </p>
          ) : error ? (
            <p className="mt-6 text-center text-lg font-semibold text-red-500">
              {error}
            </p>
          ) : (
            <>
              {/* Student Statistics */}
              <div className="mt-6 flex justify-between gap-4">
                <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
                  <img
                    src={MaleFemale}
                    alt="Total Students"
                    className="h-12 w-12"
                  />
                  <h2 className="text-center text-lg font-semibold text-gray-700">
                    Total Students
                  </h2>
                  <p className="text-2xl font-bold text-blue-500">
                    {studentData.totalStudents}
                  </p>
                </div>
                <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
                  <img src={Female} alt="No of Girls" className="h-12 w-12" />
                  <h2 className="text-center text-lg font-semibold text-gray-700">
                    No of Girls
                  </h2>
                  <p className="text-2xl font-bold text-blue-500">
                    {studentData.girlsCount}
                  </p>
                </div>
                <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
                  <img src={Male} alt="No of Boys" className="h-12 w-12" />
                  <h2 className="text-center text-lg font-semibold text-gray-700">
                    No of Boys
                  </h2>
                  <p className="text-2xl font-bold text-blue-500">
                    {studentData.boysCount}
                  </p>
                </div>
              </div>

              {/* Campus-wise Student Distribution and Board Result-wise School Progress Charts */}
              <div className="mt-6 mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Campus-wise Student Distribution */}
                <Card
                  shadow={false}
                  className="transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Title>Campus-wise Student Distribution</Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={campusData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Campus" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="Students"
                        fill="#3b82f6"
                        animationDuration={1000}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                {/* Board Result-wise School Progress */}
                <Card
                  shadow={false}
                  className="transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Title>Board Result-wise School Progress</Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={boardProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Year" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Percentage Above 90%"
                        stroke="#10b981"
                        strokeWidth={2}
                        animationDuration={1000}
                        dot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Class-wise Student Distribution Chart */}
              <Card
                shadow={false}
                className="mt-10 transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Title>Class-wise Student Distribution</Title>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={classData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="Number of boys"
                      fill="#3b82f6"
                      animationDuration={1000}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="Number of girls"
                      fill="#ec4899"
                      animationDuration={1000}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
