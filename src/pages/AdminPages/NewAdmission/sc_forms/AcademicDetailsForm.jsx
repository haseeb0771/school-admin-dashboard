import { useEffect, useState } from "react";
import axios from "axios";

function AcademicDetailsForm({ newStudent, setNewStudent, setSections }) {
  const [classes, setClasses] = useState([]);
  const [sections, setLocalSections] = useState([]); // Local state for sections

  useEffect(() => {
    axios
      .get("http://localhost:3300/class/all")
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching classes:", err);
      });
  }, []);

  const handleClassChange = (event) => {
    const selectedClass = classes.find((cls) => cls._id === event.target.value);

    if (selectedClass && selectedClass.sections.length > 0) {
      setLocalSections(selectedClass.sections);
    } else {
      setLocalSections([]); // Clear sections if no sections are available
    }
    setNewStudent((prev) => ({
      ...prev,
      classEnrolled: event.target.value, // Store class ID instead of className
      sectionAssigned: "", // Reset section when class changes
    }));
  };

  const handleSectionChange = (event) => {
    setNewStudent((prev) => ({
      ...prev,
      sectionAssigned: event.target.value,
    }));
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <div className="grid grid-cols-6 gap-6">
        {/* Class Selection */}
        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-600">
            Class Enrolled
          </label>
          <select
            value={newStudent.classEnrolled}
            onChange={handleClassChange}
            className="mt-2 block w-full rounded border-gray-300 text-gray-900"
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className} {/* Display class name */}
              </option>
            ))}
          </select>
        </div>

        {/* Section Selection */}
        <div className="col-span-6 sm:col-span-3">
          <label className="block text-sm font-medium text-gray-600">
            Section Assigned
          </label>
          <select
            value={newStudent.sectionAssigned}
            onChange={handleSectionChange}
            className="mt-2 block w-full rounded border-gray-300 text-gray-900"
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
  );
}

export default AcademicDetailsForm;
