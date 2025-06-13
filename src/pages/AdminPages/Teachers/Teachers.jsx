import React, { useState, useEffect } from "react";
import axios from "axios";
import Female from "../../../assets/female.png";
import MaleFemale from "../../../assets/male-female.png";
import Male from "../../../assets/male.png";
import { toast } from "react-toastify";
import Loading from "../../../assets/loading.svg";
import Error from "../../../assets/no-internet.png";
import NoData from "../../../assets/no-data.png";

import Sidebar from "../../../components/commonComponents/Sidebar";
import { Link } from "react-router-dom";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [teacherStats, setTeacherStats] = useState({
    totalTeachers: 0,
    maleTeachers: 0,
    femaleTeachers: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:3300/teachers/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Sort students by 'createdAt' in descending order
        const sortedTeachers = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setError("Failed to fetch teachers");
        toast.error("Failed to fetch teachers");
      } finally {
        setLoading(false);
      }
    };

    const fetchTeacherStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3300/teachers/count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTeacherStats(response.data);
      } catch (error) {
        console.error("Error fetching teacher stats:", error);
      }
    };

    fetchTeachers();
    fetchTeacherStats();
  }, [token]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  const isTeacherSelected = (teacher) => {
    const isIdMatch = selectedIds.includes(teacher._id);
    const isNameMatch = selectedNames.includes(
      `${teacher.firstName} ${teacher.lastName}`
    );

    return selectedIds.length === 0 && selectedNames.length === 0
      ? true
      : isIdMatch || isNameMatch;
  };

  // ✅ Delete Teacher API
  const handleDelete = async (teacherId) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3300/teachers/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove deleted teacher from UI
      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher._id !== teacherId)
      );

      toast.success("Teacher deleted successfully!");
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("Failed to delete teacher.");
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    if (!searchTerm) return true;

    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
    const teacherId = teacher.teacherId?.toLowerCase() || "";
    const subject = teacher.subjectSpecialization?.toLowerCase() || "";
    const phone = teacher.phoneNumber?.toLowerCase() || "";

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      teacherId.includes(searchTerm.toLowerCase()) ||
      subject.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      {" "}
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Teachers
            </h1>
          </header>
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
          {!loading && teachers.length < 0 && (
            <div className="flex h-full items-center justify-center">
              <img src={NoData} alt="No Data" className="h-24 w-24" />
            </div>
          )}

          <div className="mt-6 flex justify-between gap-4">
            <div className="hover flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md hover:shadow-lg">
              <img
                src={MaleFemale}
                alt="Total Teachers"
                className="h-12 w-12"
              />
              <h2 className="text-lg font-semibold text-gray-700">
                Total Teachers
              </h2>
              <p className="text-2xl font-bold text-blue-500">
                {teacherStats.totalTeachers}
              </p>
            </div>

            <div className="hover flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md hover:shadow-lg">
              <img src={Male} alt="Male Teachers" className="h-12 w-12" />
              <h2 className="text-lg font-semibold text-gray-700">
                Male Teachers
              </h2>
              <p className="text-2xl font-bold text-green-500">
                {teacherStats.maleTeachers}
              </p>
            </div>

            <div className="hover flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md hover:shadow-lg">
              <img src={Female} alt="Female Teachers" className="h-12 w-12" />
              <h2 className="text-lg font-semibold text-gray-700">
                Female Teachers
              </h2>
              <p className="text-2xl font-bold text-pink-500">
                {teacherStats.femaleTeachers}
              </p>
            </div>
          </div>

          <div className="mt-5">
            {/* Search + Button */}
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search teachers by name, ID, subject, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <Link
                to="/admin/add-teacher"
                className="flex h-10 items-center justify-center gap-2 rounded bg-green-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-green-800 md:px-6"
              >
                <span>Add Teacher</span>
                <span className="text-lg">+</span>
              </Link>
            </div>

            {/* Filtered Data */}
            {teachers.length > 0 && filteredTeachers.length > 0 ? (
              <div className="mt-5 overflow-x-auto rounded-md border border-gray-300 shadow-sm">
                <table className="w-full table-auto border-collapse text-sm">
                  <thead className="bg-gray-200 text-left text-gray-700">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">
                        Teacher ID
                      </th>
                      <th className="border border-gray-300 px-4 py-2">Name</th>
                      <th className="border border-gray-300 px-4 py-2">
                        Subject
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Joining Date
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Phone
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Status
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((teacher, index) => (
                      <tr
                        key={teacher._id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="border border-gray-300 px-4 py-2 font-semibold text-blue-700">
                          {teacher.teacherId}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {teacher.firstName} {teacher.lastName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {teacher.subjectSpecialization}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {new Date(teacher.joiningDate).toLocaleDateString()}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {teacher.phoneNumber}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              teacher.teacherStatus === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {teacher.teacherStatus}
                          </span>
                        </td>
                        <td className="space-x-2 border border-gray-300 px-4 py-2">
                          <Link
                            to={`/teachers/${teacher._id}`}
                            className="inline-block rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                          >
                            View
                          </Link>
                          <Link
                            to={`/teachers/edit/${teacher._id}`}
                            className="inline-block rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-32 flex flex-col items-center justify-center">
                <img src={NoData} alt="No data" className="mb-4 h-44 w-44" />
                <p className="text-lg text-gray-500">
                  {teachers.length === 0
                    ? "No teachers in the database."
                    : "No matching results found."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Teachers;
