import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import Sidebar from "../../../components/commonComponents/Sidebar";
import {
  UserGroupIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  XCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Loading from "../../../assets/loading.svg";
import Error from "../../../assets/no-internet.png";
import NoData from "../../../assets/no-data.png";
import Female from "../../../assets/female.png";
import MaleFemale from "../../../assets/male-female.png";
import Male from "../../../assets/male.png";

const AllStudents = () => {
  const [studentData, setStudentData] = useState({
    totalStudents: 0,
    boysCount: 0,
    girlsCount: 0,
  });
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userRole = localStorage.getItem("userRole");
  const [activeFilter, setActiveFilter] = useState("all");
  useEffect(() => {
    fetchStudents();
  }, []);
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
        toast.error(error);
        console.error("Error fetching student count:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3300/students/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sorted = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setStudents(sorted);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch students");
      toast.error("Failed to fetch Students");
    } finally {
      setLoading(false);
    }
  };

  const filterOptions = [
    {
      id: "all",
      label: "All Students",
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
    {
      id: "ACTIVE",
      label: "Active",
      icon: <CheckCircleIcon className="h-5 w-5" />,
    },
    {
      id: "PASSEDOUT",
      label: "Passed Out",
      icon: <AcademicCapIcon className="h-5 w-5" />,
    },
    {
      id: "STUCKOFF",
      label: "Struck Off",
      icon: <XCircleIcon className="h-5 w-5" />,
    },
    {
      id: "INACTIVE",
      label: "Inactive",
      icon: <NoSymbolIcon className="h-5 w-5" />,
    },
  ];
  const filteredStudents = students.filter((student) => {
    // Status filter
    if (
      activeFilter !== "all" &&
      student.studentStatus !== activeFilter.toUpperCase()
    ) {
      return false;
    }

    // Search term filter (keep your existing search logic)
    if (!searchTerm) return true;

    const fullName =
      `${student.studentFirstName} ${student.studentMiddleLastName}`.toLowerCase();
    const studentId = student.studentId?.toLowerCase() || "";
    const className = student.classEnrolled?.className?.toLowerCase() || "";
    const guardianName = student.guardianFullName?.toLowerCase() || "";
    const guardianPhone = student.guardianPhone?.toLowerCase() || "";

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      studentId.includes(searchTerm.toLowerCase()) ||
      className.includes(searchTerm.toLowerCase()) ||
      guardianName.includes(searchTerm.toLowerCase()) ||
      guardianPhone.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">All Students</h1>

        {loading && (
          <div className="flex h-full items-center justify-center">
            <img src={Loading} alt="Loading..." className="h-16 w-16" />
          </div>
        )}
        {error && (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <img src={Error} alt="Error" className="h-20 w-20" />
            <p className="text-center text-lg font-bold text-gray-600">
              {error}
            </p>
          </div>
        )}
        {!loading && students.length < 0 && (
          <div className="flex h-full items-center justify-center">
            <img src={NoData} alt="No Data" className="h-24 w-24" />
          </div>
        )}
        <div className="mt-6 flex justify-between gap-4">
          <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
            <img src={MaleFemale} alt="Total Students" className="h-12 w-12" />
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
        <div className="mb-4 mt-5 flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                activeFilter === option.id
                  ? "border border-blue-600 bg-blue-50 text-blue-700 shadow-lg"
                  : "border border-gray-200 bg-white text-gray-700 shadow-md hover:bg-gray-50"
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
        {/* Search Box and Action Button */}
        <div className="mb-4 mt-5 flex flex-wrap items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search students by name, ID, class, etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border border-gray-300 p-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <Link
            to="/admin/new-admission"
            className="flex h-10 items-center justify-center gap-2 rounded bg-green-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-green-800 md:px-6"
          >
            <span>Admit New</span>
            <span className="text-lg">+</span>
          </Link>
        </div>

        {!loading && filteredStudents.length > 0 ? (
          <>
            {/* Table */}
            <div className="overflow-x-auto rounded-md border border-gray-300 shadow-sm">
              <table className="w-full table-auto border-collapse text-sm">
                <thead className="bg-gray-200 text-left text-gray-700">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">
                      Student ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Class / Section
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Date of Admission
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Guardian's Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Branch</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-blue-700">
                        {student.studentId}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {student.studentFirstName}{" "}
                        {student.studentMiddleLastName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {student?.className || "N/A"} /{" "}
                        {student.sectionName || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {DateTime.fromISO(student.createdAt).toFormat(
                          "dd/MM/yyyy"
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {student.guardianFullName || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {student.branchName || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            student.studentStatus === "ACTIVE"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {student.studentStatus}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex flex-wrap justify-start gap-2">
                          <Link
                            to={`/admin/single-student/${student._id}`}
                            className="rounded bg-blue-600 px-3 py-1 text-xs text-white transition duration-200 hover:bg-blue-700"
                          >
                            View
                          </Link>
                          {userRole === "ADMIN" && (
                            <Link
                              to={`/admin/edit-student/${student._id}`}
                              className="rounded bg-green-600 px-3 py-1 text-xs text-white transition duration-200 hover:bg-green-700"
                            >
                              Edit
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          !loading && (
            <div className="mt-44 flex flex-col items-center justify-center">
              <img src={NoData} alt="No data" className="mb-4 h-44 w-44" />
              <p className="text-lg text-gray-500">No student found.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllStudents;
