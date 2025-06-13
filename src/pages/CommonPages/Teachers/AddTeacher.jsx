import React, { useState, useRef } from "react";
import Sidebar from "../../../components/commonComponents/Sidebar";
import { toast } from "react-toastify";
import Loading from "../../../assets/loading.svg";

function AddTeacher() {
  const [loading, setLoading] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    firstName: "Haseeb",
    lastName: "Tariq",
    dateOfBirth: "2025-06-07",
    religion: "Islam",
    gender: "Male",
    phoneNumber: "12345678",
    whatsappNumber: "12345678",
    bloodGroup: "O-",
    city: "Gujranwala",
    streetAddress: "4",
    subjectSpecialization: "BSCS",
    education: "BSCS",
    joiningDate: "2025-06-07",
    salary: "2000",
    teacherImage: null,
    teacherDegreeImage: null,
    teacherIdCardImage: null,
  });

  const submitButtonRef = useRef();

  const handleTeacherImageChange = (event) => {
    const file = event.target.files[0];
    setNewTeacher((prev) => ({
      ...prev,
      teacherImage: file,
    }));
  };

  const handleDegreeImageChange = (event) => {
    const file = event.target.files[0];
    setNewTeacher((prev) => ({
      ...prev,
      teacherDegreeImage: file,
    }));
  };

  const handleIDImageChange = (event) => {
    const file = event.target.files[0];
    setNewTeacher((prev) => ({
      ...prev,
      teacherIdCardImage: file,
    }));
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (const key in newTeacher) {
      formData.append(key, newTeacher[key]);
    }

    try {
      const response = await fetch("http://localhost:3300/teachers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTeacher),
      });

      if (response.ok) {
        toast.success(`Teacher Admitted Successfully`);
        setNewTeacher({
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
      } else {
        toast.error("Failed to admit teacher");
      }
    } catch (error) {
      toast.error("An error occurred while admitting the teacher");
      console.log(error);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  const inputChangeHandler = (event) => {
    setNewTeacher((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  return (
    <>
      {" "}
      <div className="flex">
        <div className="fixed left-0 top-0 h-screen w-64">
          <Sidebar />
        </div>

        <div className="ml-64 w-full overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Add Teacher
            </h1>
          </header>

          <div className="ie-na-content mt-5 flex w-full flex-col gap-10 2xl:flex-row">
            <form
              onSubmit={submitFormHandler}
              className="flex w-full flex-col items-end gap-10 2xl:max-w-5xl"
              encType="multipart/form-data"
            >
              {/* ✅ Individual Details Section */}
              <div className="w-full rounded-md border border-gray-200 bg-white">
                <div className="border-b border-gray-200 py-4 px-6">
                  <span className="text-lg font-medium">
                    Individual Details
                  </span>
                </div>
                <div className="overflow-hidden sm:rounded">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-600">
                          First name
                        </label>
                        <input
                          required
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={newTeacher.firstName}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-600">
                          Middle & Last name
                        </label>
                        <input
                          required
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={newTeacher.lastName}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-600">
                          Date of birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          id="dateOfBirth"
                          value={newTeacher.dateOfBirth}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-600">
                          Religion
                        </label>
                        <input
                          required
                          type="text"
                          name="religion"
                          id="religion"
                          value={newTeacher.religion}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-600">
                          Gender
                        </label>
                        <select
                          name="gender"
                          id="gender"
                          value={newTeacher.gender}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 bg-white text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-600">
                          Phone Number
                        </label>
                        <input
                          required
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={newTeacher.phoneNumber}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-600">
                          What'sApp Number
                        </label>
                        <input
                          required
                          type="text"
                          name="whatsappNumber"
                          id="whatsappNumber"
                          value={newTeacher.whatsappNumber}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-600">
                          Blood Group
                        </label>
                        <input
                          required
                          type="text"
                          name="bloodGroup"
                          id="bloodGroup"
                          value={newTeacher.bloodGroup}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-600">
                          City
                        </label>
                        <input
                          required
                          type="text"
                          name="city"
                          id="city"
                          value={newTeacher.city}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-600">
                          Street
                        </label>
                        <input
                          required
                          type="text"
                          name="streetAddress"
                          id="streetAddress"
                          value={newTeacher.streetAddress}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Academic Information Section */}
              <div className="w-full rounded-md border border-gray-200 bg-white">
                <div className="border-b border-gray-200 py-4 px-6">
                  <span className="text-lg font-medium">
                    Academic Information
                  </span>
                </div>
                <div className="overflow-hidden sm:rounded">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-600">
                          Subject Specialization
                        </label>
                        <input
                          required
                          type="text"
                          name="subjectSpecialization"
                          id="subjectSpecialization"
                          value={newTeacher.subjectSpecialization}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-600">
                          Highest Qualification
                        </label>
                        <input
                          required
                          type="text"
                          name="education"
                          id="education"
                          value={newTeacher.education}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-600">
                          Joining Date
                        </label>
                        <input
                          type="date"
                          name="joiningDate"
                          id="joiningDate"
                          value={newTeacher.joiningDate}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-600">
                          Salary Decided
                        </label>
                        <input
                          required
                          type="text"
                          name="salary"
                          id="salary"
                          value={newTeacher.salary}
                          onChange={inputChangeHandler}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ File Uploads Section */}
              <div className="w-full rounded-md border border-gray-200 bg-white">
                <div className="border-b border-gray-200 py-4 px-6">
                  <span className="text-lg font-medium">File Uploads</span>
                </div>
                <div className="overflow-hidden sm:rounded">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-600">
                          Teacher's Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleTeacherImageChange}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in file:bg-white focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-600">
                          Degree
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleDegreeImageChange}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in file:bg-white focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-600">
                          ID Card
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleIDImageChange}
                          className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in file:bg-white focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Submit Button */}
              {loading ? (
                <div className="flex items-center justify-center px-10 py-2">
                  <img src={Loading} alt="Loading..." className="h-12 w-12 " />
                </div>
              ) : (
                <button
                  ref={submitButtonRef}
                  type="submit"
                  className="rounded border border-blue-700 bg-blue-700 px-10 py-2 text-base font-medium text-white transition-all hover:border-blue-800 hover:bg-blue-800"
                >
                  Add
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTeacher;
