import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import Sidebar from "../../../components/commonComponents/Sidebar";
import Loading from "../../../assets/loading.svg";
import Error from "../../../assets/no-internet.png";
import NoData from "../../../assets/no-data.png";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
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
    } finally {
      setLoading(false);
    }
  };

  const isStudentSelected = (student) => {
    const fullName = `${student.studentFirstName} ${student.studentMiddleLastName}`;
    return (
      (selectedIds.length === 0 && selectedNames.length === 0) ||
      selectedIds.includes(student._id) ||
      selectedNames.includes(fullName)
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">All Students</h1>

        {loading && (
          <div className="flex h-full items-center justify-center">
            <img src={Loading} alt="Loading..." className="h-16 w-16 " />
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
            <img src={NoData} alt="No Data..." className="h-24 w-24 " />
          </div>
        )}

        {!loading && students.length > 0 && (
          <>
            {/* Filter Boxes */}
            <div className="mb-4 flex flex-wrap gap-4">
              <select
                onChange={(e) =>
                  setSelectedIds([...(e.target.value ? [e.target.value] : [])])
                }
                className="w-64 rounded border border-gray-300 p-2 text-sm shadow-sm"
              >
                <option value="">Select by ID...</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s._id} : {s.studentFirstName} {s.studentMiddleLastName}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) =>
                  setSelectedNames([
                    ...(e.target.value ? [e.target.value] : []),
                  ])
                }
                className="w-64 rounded border border-gray-300 p-2 text-sm shadow-sm"
              >
                <option value="">Select by Name...</option>
                {students.map((s) => (
                  <option
                    key={s._id + "-name"}
                    value={`${s.studentFirstName} ${s.studentMiddleLastName}`}
                  >
                    {s.studentFirstName} {s.studentMiddleLastName}
                  </option>
                ))}
              </select>
              <Link
                to="/admin/new-admission"
                className="w-50 flex h-8 items-center justify-center gap-2 rounded bg-green-700 px-10 py-2 text-base  text-white transition-all hover:bg-green-800"
              >
                Admit New +
              </Link>
            </div>

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
                    <th className="border border-gray-300 px-4 py-2">
                      Guardian's Phone
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.filter(isStudentSelected).map((student, index) => (
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
                        {student.classEnrolled?.className} /{" "}
                        {student.sectionAssigned}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {DateTime.fromISO(student.createdAt).toFormat(
                          "dd/MM/yyyy"
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {student.guardianFullName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {student.guardianPhone}
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
                      <td className="space-x-2 border border-gray-300 px-4 py-2">
                        <Link
                          to={`/admin/single-student/${student._id}`}
                          className="inline-block rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                        >
                          View
                        </Link>
                        <Link
                          to={`/admin/edit-student/${student._id}`}
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
          </>
        )}
      </div>
    </div>
  );
};

export default AllStudents;
