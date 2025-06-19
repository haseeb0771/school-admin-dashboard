import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AcademicDetailsForm from "./sc_forms/AcademicDetailsForm";
import GuardianDetailsForm from "./sc_forms/GuardianDetailsForm";
import IndividualDetailsForm from "./sc_forms/IndividualDetailsForm";
import PreviousSchoolDetailsForm from "./sc_forms/PreviousSchoolDetailsForm";
import Sidebar from "../../../components/commonComponents/Sidebar";
import Loading from "../../../assets/loading.svg";

function NewAdmission() {
  const [submitting, setSubmitting] = useState(false);
  const [newStudent, setNewStudent] = useState({
    studentFirstName: "John",
    studentMiddleLastName: "Doe",
    studentDateOfBirth: "2010-05-15",
    studentReligion: "Christianity",
    studentCaste: "General",
    studentSex: "Male",
    studentBloodGroup: "O+",
    fatherFullName: "Michael Doe",
    motherFullName: "Sarah Doe",
    addressStreet: "123 Maple Street",
    addressCity: "Springfield",
    addressState: "Illinois",
    studentFee: "15000",
    studentId: "STD20250609",
    dateOfAdmission: "2025-06-09",
    branch: "",
    classEnrolled: "",
    sectionAssigned: "",
    guardianFullName: "Uncle Joe",
    guardianEmail: "uncle.joe@example.com",
    guardianPhone: "9876543210",
    guardianWhatsApp: "9876543210",
    previousSchoolName: "Bright Future Public School",
    previousSchoolAddress: "456 Oak Avenue, Springfield",
    studentImage: null,
  });

  const submitButtonRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewStudent((prev) => ({
      ...prev,
      studentImage: file,
    }));
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    setSubmitting(true); // Start loading

    try {
      const response = await fetch("http://localhost:3300/students/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        toast.success(`Student Admitted Successfully`);
        setNewStudent({
          studentFirstName: "",
          studentMiddleLastName: "",
          studentDateOfBirth: "",
          studentReligion: "",
          studentCaste: "",
          studentSex: "",
          studentBloodGroup: "",
          fatherFullName: "",
          motherFullName: "",
          addressStreet: "",
          addressCity: "",
          addressState: "",
          studentFee: "",
          studentId: "",
          dateOfAdmission: "",
          branch: "",
          classEnrolled: "",
          sectionAssigned: "",
          guardianFullName: "",
          guardianEmail: "",
          guardianPhone: "",
          guardianWhatsApp: "",
          previousSchoolName: "",
          previousSchoolAddress: "",
          studentImage: null,
        });
      } else {
        const errorData = await response.json();
        toast.error(
          `Failed to admit student: ${errorData?.details || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error submitting student form:", error);
      toast.error("An error occurred while admitting the student");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="ie-na-header flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              New Admission
            </h1>
            <div className="flex gap-4">
              <Link
                to="/admin/bulk-admit"
                className="w-50 flex h-8 items-center justify-center gap-2 rounded bg-green-700 px-10 py-2 text-base text-white transition-all hover:bg-green-800"
              >
                Bulk Admit
              </Link>
            </div>
          </header>

          <div className="ie-na-content mt-5 flex w-full flex-col gap-10 2xl:flex-row">
            <form
              onSubmit={submitFormHandler}
              className="flex w-full flex-col items-end gap-10 2xl:max-w-5xl"
              encType="multipart/form-data"
            >
              <div className="IndividualDetails w-full rounded-md border border-gray-200 bg-white">
                <div className="border-b border-gray-200 py-4 px-6">
                  <span className="text-lg font-medium">
                    Individual Details
                  </span>
                </div>
                <IndividualDetailsForm
                  newStudent={newStudent}
                  setNewStudent={setNewStudent}
                />
              </div>

              <div className="personalDetails w-full rounded-md border border-gray-200 bg-white">
                <div className="border-b border-gray-200 py-4 px-6">
                  <span className="text-lg font-medium">Academic Details</span>
                </div>
                <AcademicDetailsForm
                  newStudent={newStudent}
                  setNewStudent={setNewStudent}
                />
              </div>

              <div className="personalDetails w-full rounded-md border border-gray-200 bg-white">
                <div className="border-b border-gray-200 py-4 px-6">
                  <span className="text-lg font-medium">Guardian Details</span>
                </div>
                <GuardianDetailsForm
                  newStudent={newStudent}
                  setNewStudent={setNewStudent}
                />
              </div>

              <div
                id="previous-school"
                className="personalDetails w-full rounded-md border border-gray-200 bg-white"
              >
                <div className="border-b border-gray-200 py-4 px-6">
                  <span className="text-lg font-medium">
                    Previous School Details
                  </span>
                </div>
                <PreviousSchoolDetailsForm
                  newStudent={newStudent}
                  setNewStudent={setNewStudent}
                />
              </div>

              {/* Image Upload */}
              <div className="w-full rounded-md border border-gray-200 bg-white p-6">
                <label className="block text-sm font-medium text-gray-600">
                  Upload Student Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 block w-full rounded border-gray-300 text-gray-900"
                />
              </div>

              <button
                ref={submitButtonRef}
                type="submit"
                disabled={submitting}
                className="flex items-center justify-center gap-2 rounded border border-blue-700 bg-blue-700 px-10 py-2 text-base font-medium text-white transition-all hover:border-blue-800 hover:bg-blue-800 disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <img src={Loading} alt="Loading..." className="h-8 w-8" />
                  </>
                ) : (
                  "Admit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewAdmission;
