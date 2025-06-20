import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../../components/commonComponents/Sidebar";
import { toast } from "react-toastify";

import User from "../../../assets/user.png";

function SingleTeacher() {
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Authentication token is missing.");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch teacher data
        const response = await fetch(
          `http://localhost:3300/teachers/${teacherId}`,
          {
            method: "GET",
            headers: headers, // Add headers to the request
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch teacher data");
        }
        const teacherData = await response.json();
        setTeacher(teacherData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  // Function to update teacher status
  const updateTeacherStatus = async (status) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:3300/teachers/status/${teacherId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacherStatus: status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update teacher status");
      }

      const updatedTeacher = await response.json();
      setTeacher(updatedTeacher.teacher); // Update the local state with the new teacher data
      toast.success(
        `Teacher status updated to ${updatedTeacher.teacher.teacherStatus}`
      );
    } catch (err) {
      console.error("Error updating teacher status:", err);
      toast.error("Failed to update teacher status");
    }
  };

  // Handle Activate/Deactivate
  const handleStatusChange = async () => {
    const newStatus =
      teacher.teacherStatus === "Active" ? "Non-Active" : "Active";
    await updateTeacherStatus(newStatus);
  };

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!teacher)
    return <p className="text-center text-gray-700">No teacher found.</p>;

  return (
    <>
      {" "}
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {teacher.teacherId} - {teacher.firstName}
            </h3>
         <Link
  to={`/admin/update-teacher/${teacher._id}`}
  className="flex items-center justify-center h-9 rounded border border-blue-700 bg-blue-700 px-8 text-base font-medium text-white transition-all hover:border-blue-800 hover:bg-blue-800"
>
  Edit
</Link>

          </header>

          {/* Action Buttons */}
          <div className="mt-5 flex gap-4">
            <button
              onClick={handleStatusChange}
              className={`h-9 rounded px-6 text-base font-medium transition-all ${
                teacher.teacherStatus === "ACTIVE"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {teacher.teacherStatus === "ACTIVE" ? "Deactivate" : "Activate"}
            </button>
          </div>
          <div className="mt-5 text-xl">
            <h1>
              Teacher's Current Status :{" "}
              <strong> {teacher.teacherStatus}</strong>
            </h1>
          </div>

          <div className="mt-5">
            {/* Individual Details */}
            <div className="mb-5 overflow-hidden rounded-md border border-gray-200">
              <div className="flex items-center justify-between bg-white px-4 py-4 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Individual Details
                </h3>
                <div className="h-24 w-24 overflow-hidden rounded-full border border-gray-300 bg-gray-200">
                  <img
                    src={
                      teacher.teacherImage
                        ? `http://localhost:3300${teacher.teacherImage}`
                        : User
                    }
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="border-t border-gray-200">
                {[
                  { label: "First name", value: teacher.firstName },
                  { label: "Last name", value: teacher.lastName },
                  { label: "Gender", value: teacher.gender },
                  {
                    label: "Date of Birth",
                    value: new Date(teacher.dateOfBirth)
                      .toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "numeric",
                        year: "numeric",
                      })
                      .replace(/\//g, "-"),
                  },
                  { label: "Religion", value: teacher.religion },
                  { label: "Blood group", value: teacher.bloodGroup },
                  { label: "Phone Number", value: teacher.phoneNumber },
                  { label: "Street address", value: teacher.streetAddress },
                  { label: "City", value: teacher.city },
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
            <div className="mb-5 overflow-hidden rounded-md border border-gray-200">
              <div className="bg-white px-4 py-4 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Educational Details
                </h3>
              </div>
              <div className="border-t border-gray-200">
                {[
                  {
                    label: "Subject Specialization",
                    value: teacher.subjectSpecialization,
                  },
                  {
                    label: "Date of Joining",
                    value: new Date(teacher.joiningDate).toLocaleDateString(
                      "en-GB",
                      { day: "2-digit", month: "numeric", year: "numeric" }
                    ),
                  },
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

export default SingleTeacher;
