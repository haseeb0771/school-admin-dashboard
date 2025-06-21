import { useEffect, useState } from "react";
import { Card, Title } from "@tremor/react";
import { toast } from "react-toastify";
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
import Sidebar from "../../components/commonComponents/Sidebar";
import Female from "../../assets/female.png";
import MaleFemale from "../../assets/male-female.png";
import Male from "../../assets/male.png";
import Loading from "../../assets/loading.svg";
import Error from "../../assets/no-internet.png";

function OwnerDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    passedOutStudents: 0,
    branches: [],
  });
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const [classGenderData, setClassGenderData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No authentication token found.");
          setLoading(false);
          return;
        }

        // Fetch student counts
        const countResponse = await fetch(
          "http://localhost:3300/students/count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!countResponse.ok)
          throw new Error("Failed to fetch student counts");
        const countData = await countResponse.json();

        // Fetch branch data
        const branchResponse = await fetch(
          "http://localhost:3300/stats/branch",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!branchResponse.ok) throw new Error("Failed to fetch branch stats");
        const branchStats = await branchResponse.json();

        // Prepare branch data for dropdown and chart
        const branchChartData = branchStats.branchStats.map((branch) => ({
          name: branch.branchName,
          total: branch.totalStudents,
          active: branch.activeStudents,
          passedOut: branch.passedOutStudents,
        }));

        // Prepare default class data (first branch)
        const firstBranch = branchStats.branchStats[0] || {};
        const defaultClassData =
          firstBranch.classes?.map((cls) => ({
            className: cls.className.replace("Grade ", ""),
            boys: cls.boys,
            girls: cls.girls,
          })) || [];

        setStats({
          totalStudents: countData.totalStudents || 0,
          activeStudents: countData.activeStudents || 0,
          passedOutStudents: countData.passedOutStudents || 0,
          branches: branchStats.branchStats,
        });

        setBranchData(branchChartData);
        setClassGenderData(defaultClassData);
        setSelectedBranch(firstBranch.branchName || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setError(error.message);
        toast.error("Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleBranchChange = (branchName) => {
    setSelectedBranch(branchName);
    setIsDropdownOpen(false);
    const branch = stats.branches.find((b) => b.branchName === branchName);

    if (branch) {
      const updatedClassData = branch.classes.map((cls) => ({
        className: cls.className.replace("Grade ", ""),
        boys: cls.boys,
        girls: cls.girls,
      }));
      setClassGenderData(updatedClassData);
    }
  };

  // Sample board progress data
  const [boardProgressData] = useState([
    { Year: 2019, "Percentage Above 90%": 70 },
    { Year: 2020, "Percentage Above 90%": 75 },
    { Year: 2021, "Percentage Above 90%": 80 },
    { Year: 2022, "Percentage Above 90%": 85 },
    { Year: 2023, "Percentage Above 90%": 90 },
  ]);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Hello {userData.name}!
            </h1>
          </header>

          {/* Loading & Error Handling */}
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <img src={Loading} alt="Loading..." className="h-16 w-16" />
            </div>
          ) : error ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4">
              <img src={Error} alt="Error" className="h-20 w-20" />
              <p className="text-center text-lg font-bold text-gray-600">
                {error}
              </p>
            </div>
          ) : (
            <>
              {/* Student Status Statistics */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
                  <img
                    src={MaleFemale}
                    alt="Total Students"
                    className="h-12 w-12"
                  />
                  <h2 className="text-center text-lg font-semibold text-gray-700">
                    Total Students
                  </h2>
                  <p className="text-2xl font-bold text-blue-500">
                    {stats.totalStudents}
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
                  <img src={Male} alt="Active Students" className="h-12 w-12" />
                  <h2 className="text-center text-lg font-semibold text-gray-700">
                    Active Students
                  </h2>
                  <p className="text-2xl font-bold text-green-500">
                    {stats.activeStudents}
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
                  <img src={Female} alt="Passed Out" className="h-12 w-12" />
                  <h2 className="text-center text-lg font-semibold text-gray-700">
                    Passed Out
                  </h2>
                  <p className="text-2xl font-bold text-purple-500">
                    {stats.passedOutStudents}
                  </p>
                </div>
              </div>

              {/* Charts Section */}
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Branch-wise Statistics */}
                <Card className="hover:shadow-lg">
                  <Title>Branch-wise Student Distribution</Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={branchData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="total"
                        name="Total Students"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="active"
                        name="Active Students"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="passedOut"
                        name="Passed Out"
                        fill="#8b5cf6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                {/* Board Results Progress */}
                <Card className="hover:shadow-lg">
                  <Title>Board Result Progress</Title>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={boardProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Percentage Above 90%"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Branch Selection */}
              <div className="relative mt-12 mb-8 w-64">
                <button
                  onClick={toggleDropdown}
                  className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {selectedBranch || "Select Branch"}
                  <svg
                    className={`ml-2 h-5 w-5 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                    <div className="max-h-60 overflow-auto py-1">
                      {stats.branches.map((branch) => (
                        <button
                          key={branch.branchName}
                          onClick={() => handleBranchChange(branch.branchName)}
                          className={`block w-full px-4 py-2 text-left text-sm ${
                            selectedBranch === branch.branchName
                              ? "bg-blue-100 text-blue-800"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {branch.branchName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Class-wise Gender Distribution */}
              <Card className="mt-6 hover:shadow-lg">
                <Title>Class-wise Gender Distribution ({selectedBranch})</Title>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={classGenderData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="className" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="boys"
                      name="Boys"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="girls"
                      name="Girls"
                      fill="#ec4899"
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

export default OwnerDashboard;
