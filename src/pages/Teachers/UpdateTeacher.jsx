import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateTeacher() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    religion: "",
    gender: "",
    phoneNumber: "",
    whatsappNumber: "",
    bloodGroup: "",
    city: "",
    streetAddress: "",
    subjectSpecialization: "",
    education: "",
    joiningDate: "",
    salary: "",
    teacherImage: null,
    teacherDegreeImage: null,
    teacherIdCardImage: null,
  });

  const submitButtonRef = useRef();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/teachers/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setTeacher(data);
        } else {
          console.log("Failed to fetch teacher data");
        }
      } catch (error) {
        console.log("Error fetching teacher data:", error);
      }
    };
    fetchTeacher();
  }, [id]);

  const handleImageChange = (event, field) => {
    const file = event.target.files[0];
    setTeacher((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const key in teacher) {
      formData.append(key, teacher[key]);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Teacher updated successfully");
      } else {
        alert("Failed to update teacher");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("An error occurred while updating the teacher");
    }
  };

  const inputChangeHandler = (event) => {
    setTeacher((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
          Update Teacher
        </h1>
      </header>
      <form
        onSubmit={submitFormHandler}
        className="mt-5 flex w-full flex-col gap-6"
      >
        <input
          type="text"
          name="firstName"
          value={teacher.firstName}
          onChange={inputChangeHandler}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={teacher.lastName}
          onChange={inputChangeHandler}
          placeholder="Last Name"
        />
        <input
          type="date"
          name="dateOfBirth"
          value={teacher.dateOfBirth}
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          name="religion"
          value={teacher.religion}
          onChange={inputChangeHandler}
          placeholder="Religion"
        />
        <select
          name="gender"
          value={teacher.gender}
          onChange={inputChangeHandler}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          name="phoneNumber"
          value={teacher.phoneNumber}
          onChange={inputChangeHandler}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="whatsappNumber"
          value={teacher.whatsappNumber}
          onChange={inputChangeHandler}
          placeholder="WhatsApp Number"
        />
        <input
          type="text"
          name="bloodGroup"
          value={teacher.bloodGroup}
          onChange={inputChangeHandler}
          placeholder="Blood Group"
        />
        <input
          type="text"
          name="city"
          value={teacher.city}
          onChange={inputChangeHandler}
          placeholder="City"
        />
        <input
          type="text"
          name="streetAddress"
          value={teacher.streetAddress}
          onChange={inputChangeHandler}
          placeholder="Street Address"
        />
        <input
          type="text"
          name="subjectSpecialization"
          value={teacher.subjectSpecialization}
          onChange={inputChangeHandler}
          placeholder="Subject Specialization"
        />
        <input
          type="text"
          name="education"
          value={teacher.education}
          onChange={inputChangeHandler}
          placeholder="Education"
        />
        <input
          type="date"
          name="joiningDate"
          value={teacher.joiningDate}
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          name="salary"
          value={teacher.salary}
          onChange={inputChangeHandler}
          placeholder="Salary"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "teacherImage")}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "teacherDegreeImage")}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "teacherIdCardImage")}
        />
        <button
          ref={submitButtonRef}
          type="submit"
          className="rounded bg-blue-700 px-5 py-2 text-white"
        >
          Update Teacher
        </button>
      </form>
    </div>
  );
}

export default UpdateTeacher;
