import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import User from "../../assets/user.png";

function SingleStudent() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/students/${studentId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!student)
    return <p className="text-center text-gray-700">No student found.</p>;

  return (
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
                  student.studentImage
                    ? `http://localhost:5000${student.studentImage}`
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
              { label: "Father's full name", value: student.fatherFullName },
              { label: "Mother's full name", value: student.motherFullName },
              { label: "Street address", value: student.addressStreet },
              { label: "City", value: student.addressCity },
              { label: "State / Province", value: student.addressState },
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
              Academic Details
            </h3>
          </div>
          <div className="border-t border-gray-200">
            {[
              { label: "Class", value: student.classEnrolled },
              { label: "Section", value: student.sectionAssigned },
              { label: "Date of admission", value: student.dateOfAdmission },
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

        {/* Guardian Details */}
        <div className="mb-5 overflow-hidden rounded-md border border-gray-200">
          <div className="bg-white px-4 py-4 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Guardian Details
            </h3>
          </div>
          <div className="border-t border-gray-200">
            {[
              { label: "Full name", value: student.guardianFullName },
              { label: "Email", value: student.guardianEmail },
              { label: "Phone", value: student.guardianPhone },
              { label: "WhatsApp", value: student.guardianWhatsApp },
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

        {/* Attachments */}
        <div className="mb-5 overflow-hidden rounded-md border border-gray-200">
          <div className="bg-white px-4 py-4 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Attached Documents
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Attachments</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {student.attachments?.length > 0 ? (
                  <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                    {student.attachments.map((doc, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2 w-0 flex-1 truncate">
                            {doc.name}
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href={doc.url}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No attachments"
                )}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleStudent;
