import React from "react";
import { FiBook, FiClock } from "react-icons/fi";

const ClassSelector = ({ cls, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border p-4 transition-all ${
        isSelected
          ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
          : "border-gray-200 hover:border-indigo-300"
      }`}
    >
      <h3 className="font-medium text-gray-900">{cls.name}</h3>
      <div className="mt-2 flex items-center text-sm text-gray-600">
        <FiBook className="mr-1" />
        {cls.subject}
      </div>
      <div className="mt-1 flex items-center text-sm text-gray-600">
        <FiClock className="mr-1" />
        {cls.time}
      </div>
    </div>
  );
};

export default ClassSelector;