import React from "react";
import { FiUser, FiCheck, FiX } from "react-icons/fi";

const StudentAttendanceCard = ({ student, isPresent, onToggle }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center">
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <FiUser />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{student.name}</h4>
          <p className="text-sm text-gray-600">Roll No: {student.rollNumber}</p>
        </div>
      </div>

      <button
        onClick={onToggle}
        className={`flex items-center rounded-full px-4 py-2 text-sm font-medium ${
          isPresent ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {isPresent ? (
          <>
            <FiCheck className="mr-1" /> Present
          </>
        ) : (
          <>
            <FiX className="mr-1" /> Absent
          </>
        )}
      </button>
    </div>
  );
};

export default StudentAttendanceCard;
