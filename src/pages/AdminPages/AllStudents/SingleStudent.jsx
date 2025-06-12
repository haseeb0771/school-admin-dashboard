import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import User from "../../../assets/user.png";
import Sidebar from "../../../components/commonComponents/Sidebar";
import { toast } from "react-toastify";


function SingleStudent() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        if (!token) {
          setError("Authentication token is missing.");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`, // Include token in the header
        };

        // Fetch student details
        const response = await fetch(
          `http://localhost:3300/students/${studentId}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const studentData = await response.json();
        setStudent(studentData);

        // Fetch class name
        const classRes = await fetch(`http://localhost:3300/class/all`, {
          headers: headers,
        });
        if (classRes.ok) {
          const classData = await classRes.json();
          const foundClass = classData.find(
            (cls) => cls._id === studentData.classEnrolled
          );
          if (foundClass) setClassName(foundClass.className);
        }

        // Fetch section name
        if (studentData.sectionAssigned) {
          const sectionRes = await fetch(
            `http://localhost:3300/sections/${studentData.sectionAssigned}`,
            {
              headers: headers,
            }
          );
          if (sectionRes.ok) {
            const sectionData = await sectionRes.json();
            setSectionName(sectionData.sectionName || "N/A");
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  // Function to update student status
  const updateStudentStatus = async (status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3300/students/${studentId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentStatus: status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update student status");
      }

      const updatedStudent = await response.json();
      setStudent(updatedStudent.student); // Update the local state with the new student data
      toast.success(`Student status updated to ${status}`);
    } catch (err) {
      console.error("Error updating student status:", err);
      toast.success("Failed to update student status");
    }
  };

  // Handle Stuck Off / Active toggle
  const handleStuckOff = async () => {
    const newStatus =
      student.studentStatus === "StuckOff" ? "Active" : "StuckOff";
    await updateStudentStatus(newStatus);
  };

  // Handle Passed Out
  const handlePassOut = async () => {
    await updateStudentStatus("PassedOut");
  };

  // Handle Activate (if student is PassedOut or StuckOff)
  const handleActivate = async () => {
    await updateStudentStatus("Active");
  };

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!student)
    return <p className="text-center text-gray-700">No student found.</p>;

  return (
    <>
      <div className="flex h-screen">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {student.studentId} - {student.studentFirstName}{" "}
              {student.studentMiddleLastName || ""}
            </h3>
            <button className="h-9 rounded border border-blue-700 bg-blue-700 px-8 text-base font-medium text-white transition-all hover:border-blue-800 hover:bg-blue-800">
              Edit
            </button>
          </header>

          {/* Action Buttons */}
          <div className="mt-5 flex gap-4">
            <button
              onClick={handleStuckOff}
              className={`h-9 rounded px-6 text-base font-medium transition-all ${
                student.studentStatus === "StuckOff"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {student.studentStatus === "StuckOff"
                ? "Struck In"
                : "Struck Off"}
            </button>
            <button
              onClick={handlePassOut}
              className="h-9 rounded bg-purple-600 px-6 text-base font-medium text-white transition-all hover:bg-purple-700"
            >
              Pass Out
            </button>
            {student.studentStatus !== "Active" && (
              <button
                onClick={handleActivate}
                className="h-9 rounded bg-blue-600 px-6 text-base font-medium text-white transition-all hover:bg-blue-700"
              >
                Activate
              </button>
            )}
          </div>
          <div className="mt-5 ml-3 text-xl">
            <h3>Current Status : {student.studentStatus}</h3>
          </div>

          <div className="mt-5">
            <div className="mb-5 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between bg-white px-4 py-4 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Individual Details
                </h3>
                <div className="h-24 w-24 overflow-hidden rounded-full border border-gray-300 bg-gray-200">
                  <img
                    src={
                      student.studentImage
                        ? `http://localhost:3300${student.studentImage}`
                        : User
                    }
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="border-t border-gray-200">
                {[
                  { label: "First name", value: student.studentFirstName },
                  {
                    label: "Middle and Last name",
                    value: student.studentMiddleLastName,
                  },
                  { label: "Date of birth", value: student.studentDateOfBirth },
                  { label: "Religion", value: student.studentReligion },
                  { label: "Caste", value: student.studentCaste },
                  { label: "Blood group", value: student.studentBloodGroup },
                  {
                    label: "Father's full name",
                    value: student.fatherFullName,
                  },
                  {
                    label: "Mother's full name",
                    value: student.motherFullName,
                  },
                  { label: "Street address", value: student.addressStreet },
                  { label: "City", value: student.addressCity },
                  { label: "State / Province", value: student.addressState },
                  { label: "Student Fee", value: student.studentFee },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {item.value || "N/A"}
                    </dd>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Details */}
            <div className="mb-5 overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
              <div className="bg-white px-4 py-4 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Academic Details
                </h3>
              </div>
              <div className="border-t border-gray-200">
                {[
                  { label: "Class", value: className },
                  { label: "Section", value: sectionName },
                  { label: "Date of admission", value: student.createdAt },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {item.value || "N/A"}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleStudent;
