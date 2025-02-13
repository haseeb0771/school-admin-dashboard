import UtilCombobox from "./util/UtilCombobox";

const allSections = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "D" },
  { id: 5, name: "E" },
  { id: 6, name: "F" },
  { id: 7, name: "G" },
  { id: 8, name: "H" },
];

const allClasses = [
  { id: 1, name: "PG" },
  { id: 2, name: "Nursery" },
  { id: 3, name: "Prep" },
  { id: 4, name: "1" },
  { id: 5, name: "2" },
  { id: 6, name: "3" },
  { id: 7, name: "4" },
  { id: 8, name: "5" },
  { id: 9, name: "6" },
  { id: 10, name: "7" },
  { id: 11, name: "8" },
  { id: 12, name: "9" },
  { id: 13, name: "10" },
];

function AcademicDetailsForm({ newStudent, setNewStudent }) {
  const inputChangeHandler = (event) => {
    setNewStudent((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-2">
            <label
              htmlFor="dateOfAdmission"
              className="block text-sm font-medium text-gray-600"
            >
              Date of admission
            </label>
            <input
              type="date"
              name="dateOfAdmission"
              id="dateOfAdmission"
              value={newStudent.dateOfAdmission}
              onChange={inputChangeHandler}
              className="mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label
              htmlFor="classEnrolled"
              className="block text-sm font-medium text-gray-600"
            >
              Class Enrolled
            </label>
            <select
              name="classEnrolled"
              id="classEnrolled"
              value={newStudent.classEnrolled}
              onChange={inputChangeHandler}
              className="mt-2 block w-full rounded border-gray-300 bg-white text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
            >
              <option value="">Select a class</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
            </select>
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label
              htmlFor="sectionAssigned"
              className="block text-sm font-medium text-gray-600"
            >
              Section assigned
            </label>
            <input
              type="text"
              name="sectionAssigned"
              id="sectionAssigned"
              value={newStudent.sectionAssigned}
              onChange={inputChangeHandler}
              className="bg-gray mt-2 block w-full rounded border-gray-300 text-gray-900 transition ease-in focus:border-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AcademicDetailsForm;
