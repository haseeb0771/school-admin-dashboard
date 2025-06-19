import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/commonComponents/Sidebar";

function BranchDetail() {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3300/branches/${branchId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch branch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [branchId]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  if (!data)
    return (
      <div className="flex h-screen items-center justify-center">
        Branch not found
      </div>
    );

  const { branch, stats } = data;

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg
              className="mr-1 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Branches
          </button>

          {userRole === "ADMIN" && (
            <button className="rounded bg-blue-600 py-2 px-4 font-medium text-white hover:bg-blue-700">
              Edit Branch
            </button>
          )}
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          {/* Branch Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {branch.branchName} ({branch.branchCode})
              </h1>
              <p className="text-gray-600">
                {branch.branchAddress}, {branch.city} | Established Year :{" "}
                {branch.establishedYear}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                Active
              </span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-500">
                Total Classes
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {branch.classes.length}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-500">
                Total Students
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {stats.totalStudents}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-500">
                Total Teachers
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {stats.totalTeachers}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-500">
                Total Employees
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {branch.employees.length}
              </p>
            </div>
          </div>

          {/* Class-wise Statistics */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Class Statistics
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Class
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Total Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Sections
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Subjects
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {stats.classWiseCounts.map((classStat, index) => {
                    const classInfo = branch.classes[index];
                    return (
                      <tr key={classInfo._id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {classStat.className}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {classStat.totalStudents}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1">
                            {classStat.sectionWiseCounts.map((section) => (
                              <span
                                key={section.sectionName}
                                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                              >
                                {section.sectionName}: {section.totalStudents}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {classInfo.sections[0]?.subjects?.join(", ")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Class Information */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Class Details
            </h2>
            <div className="space-y-4">
              {branch.classes.map((classItem) => (
                <div
                  key={classItem._id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <h3 className="mb-3 text-lg font-medium text-gray-900">
                    {classItem.className}
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {classItem.sections.map((section) => (
                      <div
                        key={section._id}
                        className="rounded border border-gray-200 p-3"
                      >
                        <h4 className="mb-2 font-medium text-gray-800">
                          Section {section.sectionName}
                        </h4>
                        <div className="mb-2">
                          <span className="text-sm font-medium text-gray-500">
                            Subjects:
                          </span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {section.subjects.map((subject) => (
                              <span
                                key={subject}
                                className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Students:</span>{" "}
                          {section.students.length}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Information */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Teachers Section */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Teachers
              </h2>
              {branch.teachers.length > 0 ? (
                <div className="rounded-lg border border-gray-200 p-4">
                  {/* Teacher list would go here */}
                  <p className="text-gray-600">No teachers assigned yet</p>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 p-4 text-center">
                  <p className="text-gray-500">
                    No teachers assigned to this branch
                  </p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                    Assign Teachers
                  </button>
                </div>
              )}
            </div>

            {/* Employees Section */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Employees
              </h2>
              {branch.employees.length > 0 ? (
                <div className="rounded-lg border border-gray-200 p-4">
                  {/* Employee list would go here */}
                  <p className="text-gray-600">No employees assigned yet</p>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 p-4 text-center">
                  <p className="text-gray-500">
                    No employees assigned to this branch
                  </p>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                    Assign Employees
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchDetail;
