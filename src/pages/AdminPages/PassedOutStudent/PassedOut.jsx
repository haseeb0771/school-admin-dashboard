import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import Sidebar from "../../../components/commonComponents/Sidebar";
import Loading from "../../../assets/loading.svg";
import Error from "../../../assets/no-internet.png";
import { toast } from "react-toastify";
import NoData from "../../../assets/no-data.png";

function PassedOut() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Authentication token is missing.");
          return;
        }

        const response = await fetch("http://localhost:3300/students/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();
        const passedOut = data.filter(
          (student) => student.studentStatus === "PASSEDOUT"
        );

        setStudents(passedOut);
        setFilteredStudents(passedOut);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch Passed Out Students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = students.filter((student) => {
      const fullName =
        `${student.studentFirstName} ${student.studentMiddleLastName}`.toLowerCase();
      return (
        fullName.includes(lowerSearch) ||
        student.studentId?.toLowerCase().includes(lowerSearch) ||
        student.guardianPhone?.toLowerCase().includes(lowerSearch) ||
        student.guardianFullName?.toLowerCase().includes(lowerSearch)
      );
    });

    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Passed Out Students
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
        {!loading && filteredStudents.length < 0 && (
          <div className="flex h-full items-center justify-center">
            <img src={NoData} alt="No Data" className="h-24 w-24" />
          </div>
        )}
        <div className="mt-6">
          {/* Search bar + Admit button */}
          <div className="mb-4 flex flex-wrap items-center gap-4">
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

          {/* Conditional: Table or No Data */}
          {students.length > 0 && filteredStudents.length > 0 ? (
            <div className="overflow-auto rounded-md border border-gray-300">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200 text-sm font-medium text-gray-700">
                  <tr>
                    <th className="border px-4 py-2">Student ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Class / Section</th>
                    <th className="border px-4 py-2">Date of Admission</th>
                    <th className="border px-4 py-2">Guardian's Name</th>
                    <th className="border px-4 py-2">Guardian's Phone</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {filteredStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border px-4 py-2 font-semibold text-blue-700">
                        {student.studentId}
                      </td>
                      <td className="border px-4 py-2">
                        {student.studentFirstName}{" "}
                        {student.studentMiddleLastName}
                      </td>
                      <td className="border px-4 py-2">
                        {student.classEnrolled?.className} /{" "}
                        {student.sectionAssigned}
                      </td>
                      <td className="border px-4 py-2">
                        {DateTime.fromISO(student.createdAt).toFormat(
                          "dd/MM/yyyy"
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {student.guardianFullName}
                      </td>
                      <td className="border px-4 py-2">
                        {student.guardianPhone}
                      </td>
                      <td className="border px-4 py-2">
                        <span className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                          {student.studentStatus}
                        </span>
                      </td>
                      <td className="border px-4 py-2">
                        <Link
                          to={`/students/${student._id}`}
                          className="inline-block rounded bg-gray-900 px-3 py-1 text-xs text-white hover:bg-gray-700"
                        >
                          View
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
                {students.length === 0
                  ? "No students in the database."
                  : "No matching results found."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PassedOut;
