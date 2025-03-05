import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditStudent() {
  const { studentId } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate(); // For navigation after updating
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
    classEnrolled: "", // Add classEnrolled to formData
    sectionAssigned: "", // Add sectionAssigned to formData
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
  const [classes, setClasses] = useState([]); // State to store available classes
  const [sections, setSections] = useState([]); // State to store sections for the selected class

  // Fetch student data by ID
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token is missing.");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/students/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data) {
          setFormData(response.data); // Set the fetched data to the form state
          fetchClasses(); // Fetch available classes
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  // Fetch available classes
  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/classes/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClasses(response.data); // Set the list of classes
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  // Handle class change
  const handleClassChange = (event) => {
    const selectedClass = classes.find((cls) => cls._id === event.target.value);

    if (selectedClass && selectedClass.sections.length > 0) {
      setSections(selectedClass.sections);
    } else {
      setSections([]); // Clear sections if no sections are available
    }

    setFormData((prevData) => ({
      ...prevData,
      classEnrolled: event.target.value, // Store class ID instead of className
      sectionAssigned: "", // Reset section when class changes
    }));
  };

  // Handle section change
  const handleSectionChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      sectionAssigned: event.target.value,
    }));
  };

  // Handle input changes for text, date, and select fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes (for student image)
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      studentImage: e.target.files[0], // Store the selected file
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing.");
        return;
      }

      // Create FormData for file upload
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.put(
        `http://localhost:5000/api/students/${studentId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        alert("Student updated successfully!");
        navigate(`/students/${studentId}`); // Redirect to the student's profile page
      }
    } catch (err) {
      console.error("Error updating student:", err);
      setError("Failed to update student. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
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
              {/* Class Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Class Enrolled
                </label>
                <select
                  value={formData.classEnrolled}
                  onChange={handleClassChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                  disabled={sections.length === 0} // Only disable when no sections are available
                >
                  <option value="">Select a section</option>
                  {sections.map((section, index) => (
                    <option key={index} value={section}>
                      {section}
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
  );
}

export default EditStudent;
