import React, { useState, useEffect } from "react";

function EditBranchModal({
  isOpen,
  onClose,
  onUpdateBranch,
  branchData,
  setIsEditModalOpen,
}) {
  const [formData, setFormData] = useState({
    branchName: "",
    branchCode: "",
    branchAddress: "",
    city: "",
    establishedYear: "",
    teachers: [],
    employees: [],
    classes: [],
  });

  const [newClass, setNewClass] = useState({ className: "", sections: [] });
  const [newSection, setNewSection] = useState({
    sectionName: "",
    subjects: [],
  });
  const [newSubject, setNewSubject] = useState("");

  // Initialize form with branch data when modal opens
  useEffect(() => {
    if (branchData) {
      setFormData({
        branchName: branchData.branchName || "",
        branchCode: branchData.branchCode || "",
        branchAddress: branchData.branchAddress || "",
        city: branchData.city || "",
        establishedYear: branchData.establishedYear || "",
        teachers: branchData.teachers || [],
        employees: branchData.employees || [],
        classes: branchData.classes || [],
      });
    }
  }, [branchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Class management functions
  const addClass = () => {
    if (newClass.className.trim() === "") return;
    setFormData((prev) => ({
      ...prev,
      classes: [
        ...prev.classes,
        { ...newClass, className: newClass.className.trim() },
      ],
    }));
    setNewClass({ className: "", sections: [] });
  };

  const removeClass = (index) => {
    setFormData((prev) => ({
      ...prev,
      classes: prev.classes.filter((_, i) => i !== index),
    }));
  };

  // Section management functions
  const addSection = (classIndex) => {
    if (newSection.sectionName.trim() === "") return;
    const updatedClasses = [...formData.classes];
    updatedClasses[classIndex].sections = [
      ...updatedClasses[classIndex].sections,
      { ...newSection, sectionName: newSection.sectionName.trim() },
    ];
    setFormData((prev) => ({ ...prev, classes: updatedClasses }));
    setNewSection({ sectionName: "", subjects: [] });
  };

  const removeSection = (classIndex, sectionIndex) => {
    const updatedClasses = [...formData.classes];
    updatedClasses[classIndex].sections = updatedClasses[
      classIndex
    ].sections.filter((_, i) => i !== sectionIndex);
    setFormData((prev) => ({ ...prev, classes: updatedClasses }));
  };

  // Subject management functions
  const addSubject = (classIndex, sectionIndex) => {
    if (newSubject.trim() === "") return;
    const updatedClasses = [...formData.classes];
    updatedClasses[classIndex].sections[sectionIndex].subjects = [
      ...updatedClasses[classIndex].sections[sectionIndex].subjects,
      newSubject.trim(),
    ];
    setFormData((prev) => ({ ...prev, classes: updatedClasses }));
    setNewSubject("");
  };

  const removeSubject = (classIndex, sectionIndex, subjectIndex) => {
    const updatedClasses = [...formData.classes];
    updatedClasses[classIndex].sections[sectionIndex].subjects = updatedClasses[
      classIndex
    ].sections[sectionIndex].subjects.filter((_, i) => i !== subjectIndex);
    setFormData((prev) => ({ ...prev, classes: updatedClasses }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateBranch({ ...formData, _id: branchData._id });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 py-8">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Edit Branch</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Branch Information */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Branch Name*
              </label>
              <input
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Branch Code*
              </label>
              <input
                type="text"
                name="branchCode"
                value={formData.branchCode}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                City*
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Established Year*
              </label>
              <input
                type="text"
                name="establishedYear"
                value={formData.establishedYear}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Branch Address*
            </label>
            <textarea
              name="branchAddress"
              value={formData.branchAddress}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              rows="3"
              required
            />
          </div>

          {/* Classes Management */}
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Class Structure
            </h3>

            {/* Add New Class */}
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Class Name (e.g., 10th Grade)"
                value={newClass.className}
                onChange={(e) =>
                  setNewClass({ ...newClass, className: e.target.value })
                }
                className="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={addClass}
                className="rounded bg-green-500 px-3 py-2 text-white hover:bg-green-600"
              >
                Add Class
              </button>
            </div>

            {/* Existing Classes */}
            {formData.classes.map((classItem, classIndex) => (
              <div key={classIndex} className="mb-4 rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium text-gray-800">
                    {classItem.className}
                  </h4>
                  <button
                    type="button"
                    onClick={() => removeClass(classIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                {/* Add New Section */}
                <div className="mb-3 ml-4 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Section Name (e.g., A)"
                    value={newSection.sectionName}
                    onChange={(e) =>
                      setNewSection({
                        ...newSection,
                        sectionName: e.target.value,
                      })
                    }
                    className="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => addSection(classIndex)}
                    className="rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                  >
                    Add Section
                  </button>
                </div>

                {/* Existing Sections */}
                {classItem.sections.map((section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="mb-3 ml-6 rounded border p-3"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h5 className="font-medium">
                        Section: {section.sectionName}
                      </h5>
                      <button
                        type="button"
                        onClick={() => removeSection(classIndex, sectionIndex)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Add New Subject */}
                    <div className="mb-2 ml-4 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Subject Name (e.g., Math)"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => addSubject(classIndex, sectionIndex)}
                        className="rounded bg-purple-500 px-3 py-2 text-white hover:bg-purple-600"
                      >
                        Add Subject
                      </button>
                    </div>

                    {/* Existing Subjects */}
                    {section.subjects.length > 0 && (
                      <div className="ml-4 flex flex-wrap gap-2">
                        {section.subjects.map((subject, subjectIndex) => (
                          <div
                            key={subjectIndex}
                            className="flex items-center rounded-full bg-gray-100 px-3 py-1"
                          >
                            <span>{subject}</span>
                            <button
                              type="button"
                              onClick={() =>
                                removeSubject(
                                  classIndex,
                                  sectionIndex,
                                  subjectIndex
                                )
                              }
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Payload Preview */}
          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              Payload Preview
            </h3>
            <pre className="overflow-x-auto rounded bg-white p-3 text-xs">
              {JSON.stringify({ ...formData, _id: branchData._id }, null, 2)}
            </pre>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none"
            >
              Update Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBranchModal;
