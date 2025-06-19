import { useEffect, useState } from "react";
import axios from "axios";

function AcademicDetailsForm({ newStudent, setNewStudent }) {
  const [branches, setBranches] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3300/branches")
      .then((res) => {
        setBranches(res.data);
      })
      .catch((err) => {
        console.error("Error fetching branches:", err);
      });
  }, []);

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    const selectedBranch = branches.find((b) => b._id === branchId);

    setNewStudent((prev) => ({
      ...prev,
      branch: branchId,
      classEnrolled: "",
      sectionAssigned: "",
    }));

    // Populate classes based on selected branch
    if (selectedBranch) {
      setClasses(selectedBranch.classes);
      setSections([]); // Clear sections
    } else {
      setClasses([]);
      setSections([]);
    }
  };

  const handleClassChange = (event) => {
    const classId = event.target.value;
    const selectedClass = classes.find((cls) => cls._id === classId);

    setNewStudent((prev) => ({
      ...prev,
      classEnrolled: classId,
      sectionAssigned: "",
    }));

    if (selectedClass) {
      setSections(selectedClass.sections);
    } else {
      setSections([]);
    }
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
        {/* Branch Selection */}
        <div className="col-span-6 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600">
            Branch
          </label>
          <select
            value={newStudent.branch || ""}
            onChange={handleBranchChange}
            className="mt-2 block w-full rounded border-gray-300 text-gray-900"
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
        <div className="col-span-6 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600">
            Class Enrolled
          </label>
          <select
            value={newStudent.classEnrolled || ""}
            onChange={handleClassChange}
            className="mt-2 block w-full rounded border-gray-300 text-gray-900"
            disabled={classes.length === 0}
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
        <div className="col-span-6 sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600">
            Section Assigned
          </label>
          <select
            value={newStudent.sectionAssigned || ""}
            onChange={handleSectionChange}
            className="mt-2 block w-full rounded border-gray-300 text-gray-900"
            disabled={sections.length === 0}
          >
            <option value="">Select a section</option>
            {sections.map((section, idx) => (
              <option key={idx} value={section._id}>
                {section.sectionName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default AcademicDetailsForm;
