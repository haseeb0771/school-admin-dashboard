import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import Sidebar from "../../../components/commonComponents/Sidebar";

function PassedOut() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
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

        setStudents(data);
        setFilteredStudents(passedOut);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const isStudentSelected = (student) => {
    const idMatch = selectedIds.includes(student._id);
    const nameMatch = selectedNames.includes(
      `${student.studentFirstName} ${student.studentMiddleLastName}`
    );
    return (
      (selectedIds.length === 0 && selectedNames.length === 0) ||
      idMatch ||
      nameMatch
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
        <header className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Passed Out Students
          </h1>
        </header>

        <div className="mt-6">
          {loading && <p className="text-gray-700">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && filteredStudents.length === 0 && (
            <p>No passed out students found.</p>
          )}

          {!loading && filteredStudents.length > 0 && (
            <>
              {/* Filters */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <select
                  multiple
                  onChange={(e) =>
                    setSelectedIds(
                      Array.from(e.target.selectedOptions, (o) => o.value)
                    )
                  }
                  className="w-full max-w-sm rounded border border-gray-300 p-2"
                >
                  <option disabled>Select by ID</option>
                  {filteredStudents.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student._id} : {student.studentFirstName}{" "}
                      {student.studentMiddleLastName}
                    </option>
                  ))}
                </select>

                <select
                  multiple
                  onChange={(e) =>
                    setSelectedNames(
                      Array.from(e.target.selectedOptions, (o) => o.value)
                    )
                  }
                  className="w-full max-w-sm rounded border border-gray-300 p-2"
                >
                  <option disabled>Select by Name</option>
                  {filteredStudents.map((student) => (
                    <option
                      key={`${student._id}-name`}
                      value={`${student.studentFirstName} ${student.studentMiddleLastName}`}
                    >
                      {student.studentFirstName} {student.studentMiddleLastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Table */}
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
                    {filteredStudents
                      .filter(isStudentSelected)
                      .map((student, index) => (
                        <tr
                          key={student._id}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PassedOut;
