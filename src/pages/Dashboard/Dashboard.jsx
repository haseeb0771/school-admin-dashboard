import { useEffect, useState } from "react";
import { Card, Title, BarChart, Block } from "@tremor/react";
import Female from "../../assets/female.png";
import MaleFemale from "../../assets/male-female.png";
import Male from "../../assets/male.png";

function Dashboard() {
  const [studentData, setStudentData] = useState({
    totalStudents: 0,
    boysCount: 0,
    girlsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // If the token is missing, set an error
        if (!token) {
          setError("No authentication token found.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/students/count",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add token to the Authorization header
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        console.log("Fetched data:", data); // ✅ Debugging log

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

  const chartdata = [
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

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
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

          {/* Class-wise Student Distribution Chart */}
          <Block marginTop="mt-6">
            <Card
              shadow={false}
              className="transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Title>Class-wise Student Distribution</Title>
              <BarChart
                data={chartdata}
                dataKey="class"
                categories={["Number of boys", "Number of girls"]}
                colors={["blue", "fuchsia"]}
                marginTop="mt-6"
                stack={true}
                yAxisWidth="w-6"
              />
            </Card>
          </Block>
        </>
      )}
    </div>
  );
}

export default Dashboard;
