import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/commonComponents/Sidebar";
import { toast } from "react-toastify";

function EditStudent() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [branches, setBranches] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  // Fetch student data by ID
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("Authentication token is missing.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3300/students/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data) {
          setFormData(response.data);
          fetchBranches();
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  // Fetch available branches
  const fetchBranches = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:3300/branches", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBranches(response.data);
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  };

  const handleBranchChange = (event) => {
    const selectedBranch = branches.find(
      (branch) => branch._id === event.target.value
    );

    if (selectedBranch && selectedBranch.classes.length > 0) {
      setClasses(selectedBranch.classes);
    } else {
      setClasses([]);
    }

    setSections([]);
    setFormData((prevData) => ({
      ...prevData,
      branch: event.target.value,
      classEnrolled: "",
      sectionAssigned: "",
    }));
  };

  const handleClassChange = (event) => {
    const selectedClass = classes.find((cls) => cls._id === event.target.value);

    if (selectedClass && selectedClass.sections.length > 0) {
      setSections(selectedClass.sections);
    } else {
      setSections([]);
    }

    setFormData((prevData) => ({
      ...prevData,
      classEnrolled: event.target.value,
      sectionAssigned: "",
    }));
  };

  const handleSectionChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      sectionAssigned: event.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      studentImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication token is missing.");
        return;
      }

      // Create a copy of formData without the image file
      const { studentImage, ...dataWithoutImage } = formData;

      // First update all student data except image
      const response = await axios.put(
        `http://localhost:3300/students/${studentId}`,
        dataWithoutImage,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Then handle image upload separately if a new image was selected
      if (studentImage instanceof File) {
        const imageFormData = new FormData();
        imageFormData.append("studentImage", studentImage);

        await axios.put(
          `http://localhost:3300/students/${studentId}/image`,
          imageFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast.success("Student updated successfully!");
      navigate(`/admin/single-student/${studentId}`);
    } catch (err) {
      console.error("Error updating student:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to update student. Please try again."
      );
    }
  };

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  return (
    <>
      {" "}
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Edit Student
            </h1>
          </header>

          <div className="mt-5">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Details */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold">Student Details</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="studentFirstName"
                      value={formData.studentFirstName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Middle and Last Name
                    </label>
                    <input
                      type="text"
                      name="studentMiddleLastName"
                      value={formData.studentMiddleLastName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="studentDateOfBirth"
                      value={formData.studentDateOfBirth}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Religion
                    </label>
                    <input
                      type="text"
                      name="studentReligion"
                      value={formData.studentReligion}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Caste
                    </label>
                    <input
                      type="text"
                      name="studentCaste"
                      value={formData.studentCaste}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sex
                    </label>
                    <select
                      name="studentSex"
                      value={formData.studentSex}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Blood Group
                    </label>
                    <input
                      type="text"
                      name="studentBloodGroup"
                      value={formData.studentBloodGroup}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Student Image
                    </label>
                    <input
                      type="file"
                      name="studentImage"
                      onChange={handleFileChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  {/* Branch Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Branch
                    </label>
                    <select
                      value={formData.branch}
                      onChange={handleBranchChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      required
                    >
                      <option value="">Select a branch</option>
                      {branches.map((branch) => (
                        <option key={branch._id} value={branch._id}>
                          {branch.branchName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Class Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Class Enrolled
                    </label>
                    <select
                      value={formData.classEnrolled}
                      onChange={handleClassChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      disabled={classes.length === 0}
                      required
                    >
                      <option value="">Select a class</option>
                      {classes.map((cls) => (
                        <option key={cls._id} value={cls._id}>
                          {cls.className}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Section Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Section Assigned
                    </label>
                    <select
                      value={formData.sectionAssigned}
                      onChange={handleSectionChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      disabled={sections.length === 0}
                    >
                      <option value="">Select a section</option>
                      {sections.map((section, index) => (
                        <option key={index} value={section._id}>
                          {section.sectionName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Parent Details */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold">Parent Details</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Father's Full Name
                    </label>
                    <input
                      type="text"
                      name="fatherFullName"
                      value={formData.fatherFullName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mother's Full Name
                    </label>
                    <input
                      type="text"
                      name="motherFullName"
                      value={formData.motherFullName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold">Address Details</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="addressStreet"
                      value={formData.addressStreet}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="addressCity"
                      value={formData.addressCity}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="addressState"
                      value={formData.addressState}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Guardian Details */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold">Guardian Details</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Guardian's Full Name
                    </label>
                    <input
                      type="text"
                      name="guardianFullName"
                      value={formData.guardianFullName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Guardian's Email
                    </label>
                    <input
                      type="email"
                      name="guardianEmail"
                      value={formData.guardianEmail}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Guardian's Phone
                    </label>
                    <input
                      type="text"
                      name="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Guardian's WhatsApp
                    </label>
                    <input
                      type="text"
                      name="guardianWhatsApp"
                      value={formData.guardianWhatsApp}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Previous School Details */}
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold">
                  Previous School Details
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Previous School Name
                    </label>
                    <input
                      type="text"
                      name="previousSchoolName"
                      value={formData.previousSchoolName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Previous School Address
                    </label>
                    <input
                      type="text"
                      name="previousSchoolAddress"
                      value={formData.previousSchoolAddress}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditStudent;
