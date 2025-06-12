import React, { useState, useEffect } from "react";
import axios from "axios";
import Female from "../../../assets/female.png";
import MaleFemale from "../../../assets/male-female.png";
import Male from "../../../assets/male.png";
import { toast } from "react-toastify";

import Sidebar from "../../../components/commonComponents/Sidebar";
import { Link } from "react-router-dom";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
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
      toast.success("Failed to delete teacher.");
    }
  };

  return (
    <>
      {" "}
      <div className="flex">
        <div className="fixed left-0 top-0 h-screen w-64">
          <Sidebar />
        </div>

        <div className="ml-64 w-full overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Teachers
            </h1>
          </header>

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
            <Link
              to="/admin/add-teacher"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700"
            >
              + Add New Teacher
            </Link>
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
                    <th className="border border-gray-300 px-4 py-2">Phone</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.filter(isTeacherSelected).map((teacher, index) => (
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
                        <button
                          onClick={() => handleDelete(teacher._id)}
                          className="inline-block rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teachers;
