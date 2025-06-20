import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/commonComponents/Sidebar";
import { Edit } from "lucide-react";
import EditBranchModal from "./EditBranchModal";

function BranchDetail() {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userRole = localStorage.getItem("userRole");
  const [selectedSection, setSelectedSection] = useState(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  const openStudentModal = (section) => {
    setSelectedSection(section);
    setIsStudentModalOpen(true);
  };

  const closeStudentModal = () => {
    setIsStudentModalOpen(false);
    setSelectedSection(null);
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const openEditModal = (branch) => {
    setSelectedBranch(branch);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBranch(null);
  };

  const handleUpdateBranch = async (updatedBranch) => {
    try {
      const response = await fetch(
        `http://localhost:3300/branches/${updatedBranch._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBranch),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setIsEditModalOpen(false);
        closeEditModal();
        setBranches(
          branches.map((b) => (b._id === updatedData._id ? updatedData : b))
        );
      } else {
        console.error("Failed to update branch");
      }
    } catch (error) {
      console.error("Error updating branch:", error);
    }
  };

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
            <button
              onClick={() => openEditModal(branch)}
              className="rounded bg-blue-600 py-2 px-4 font-medium text-white hover:bg-blue-700"
            >
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
                        className="rounded border border-gray-200 p-3 shadow-md hover:scale-105 hover:border-blue-500 hover:bg-blue-50 hover:shadow-lg"
                        onClick={() => openStudentModal(section)}
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
                        <p className="rounded-lg bg-blue-500 text-center text-sm text-white">
                          Click to view details
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
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Section {selectedSection.sectionName} - Student Details
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedSection.students.length} student(s) enrolled
                </p>
              </div>
              <button
                onClick={closeStudentModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Subjects Section */}
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Subjects Offered
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedSection.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Students Section */}
            <div>
              <h3 className="mb-3 text-lg font-medium text-gray-900">
                Students List
              </h3>

              {selectedSection.students.length > 0 ? (
                <div className="space-y-4">
                  {selectedSection.students.map((student) => (
                    <div key={student._id} className="rounded-lg border p-4">
                      {/* Student Basic Info */}
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {student.studentFirstName}{" "}
                            {student.studentMiddleLastName}
                          </h4>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                              ID: {student.studentId}
                            </span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                              Roll No: {student.studentId.split("-")[1]}
                            </span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                              {student.studentStatus}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700">
                            Fee: ₹{student.studentFee}
                          </p>
                        </div>
                      </div>

                      {/* Student Details Grid */}
                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Personal Information */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-gray-500">
                            Personal Information
                          </h5>
                          <div className="text-sm">
                            <p>
                              <span className="font-medium">DOB:</span>{" "}
                              {new Date(
                                student.studentDateOfBirth
                              ).toLocaleDateString()}
                            </p>
                            <p>
                              <span className="font-medium">Gender:</span>{" "}
                              {student.studentSex}
                            </p>
                            <p>
                              <span className="font-medium">Religion:</span>{" "}
                              {student.studentReligion}
                            </p>
                            <p>
                              <span className="font-medium">Blood Group:</span>{" "}
                              {student.studentBloodGroup}
                            </p>
                          </div>
                        </div>

                        {/* Family Information */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-gray-500">
                            Family Information
                          </h5>
                          <div className="text-sm">
                            <p>
                              <span className="font-medium">Father:</span>{" "}
                              {student.fatherFullName}
                            </p>
                            <p>
                              <span className="font-medium">Mother:</span>{" "}
                              {student.motherFullName}
                            </p>
                            <p>
                              <span className="font-medium">Guardian:</span>{" "}
                              {student.guardianFullName}
                            </p>
                            <p>
                              <span className="font-medium">Contact:</span>{" "}
                              {student.guardianPhone}
                            </p>
                          </div>
                        </div>

                        {/* Address Information */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-gray-500">
                            Address
                          </h5>
                          <div className="text-sm">
                            <p>{student.addressStreet}</p>
                            <p>
                              {student.addressCity}, {student.addressState}
                            </p>
                          </div>
                        </div>

                        {/* Academic Information */}
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-gray-500">
                            Academic Information
                          </h5>
                          <div className="text-sm">
                            <p>
                              <span className="font-medium">
                                Previous School:
                              </span>{" "}
                              {student.previousSchoolName}
                            </p>
                            <p>
                              <span className="font-medium">
                                School Address:
                              </span>{" "}
                              {student.previousSchoolAddress}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Additional Information */}
                      <div className="border-t pt-3">
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-800">
                            Username: {student.username}
                          </span>
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-800">
                            Parent ID: {student.parentId}
                          </span>
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">
                            Guardian Email: {student.guardianEmail}
                          </span>
                          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-yellow-800">
                            WhatsApp: {student.guardianWhatsApp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No students enrolled
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This section doesn't have any students yet.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={closeStudentModal}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <EditBranchModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onUpdateBranch={handleUpdateBranch}
        branchData={selectedBranch}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </div>
  );
}

export default BranchDetail;
