import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AcademicDetailsForm from "./sc_forms/AcademicDetailsForm";
import GuardianDetailsForm from "./sc_forms/GuardianDetailsForm";
import IndividualDetailsForm from "./sc_forms/IndividualDetailsForm";
import PreviousSchoolDetailsForm from "./sc_forms/PreviousSchoolDetailsForm";

function UpdateSpan() {
  return <span className="text-gray-300">N/A</span>;
}

function NewAdmission() {
  const [newStudent, setNewStudent] = useState({
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
    studentId: "",
    dateOfAdmission: "",
    classEnrolled: "",
    sectionAssigned: "",
    guardianFullName: "",
    guardianEmail: "",
    guardianPhone: "",
    guardianWhatsApp: "",
    previousSchoolName: "",
    previousSchoolAddress: "",
    studentImage: null, // Store the selected image
  });

  const submitButtonRef = useRef();

  const handleFileChange = (e) => {
    setNewStudent({ ...newStudent, studentImage: e.target.files[0] });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(newStudent).forEach((key) => {
      formData.append(key, newStudent[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Student admitted successfully");
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
          studentId: "",
          dateOfAdmission: "",
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
        alert("Failed to admit student");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while admitting the student");
    }
  };

  return (
    <div className="w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="ie-na-header flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
          New Admission
        </h1>
        <div className="flex gap-4">
          <button
            onClick={submitFormHandler}
            className="h-9 rounded border border-blue-700 bg-blue-700 px-8 text-base font-medium text-white transition-all hover:border-blue-800 hover:bg-blue-800"
          >
            Admit
          </button>

          <Link
            to="/newadmission/bulkadmit"
            className="hidden h-9 rounded border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 transition-all hover:border-gray-800 hover:bg-gray-800 hover:text-white sm:flex sm:items-center sm:justify-center"
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
              <span className="text-lg font-medium">Individual Details</span>
            </div>
            <IndividualDetailsForm
              newStudent={newStudent}
              setNewStudent={setNewStudent}
            />
          </div>

          {/* Image Upload Input */}
          <div className="w-full rounded-md border border-gray-200 bg-white p-4">
            <label className="text-lg font-medium">Student Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full rounded border p-2"
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

          <button
            ref={submitButtonRef}
            type="submit"
            className="rounded border border-blue-700 bg-blue-700 px-10 py-2 text-base font-medium text-white transition-all hover:border-blue-800 hover:bg-blue-800"
          >
            Admit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewAdmission;
