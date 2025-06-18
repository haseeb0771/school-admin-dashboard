import React from "react";

const SuggestedTopicCard = ({ topic, onSelect }) => {
  return (
    <div
      className="cursor-pointer rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-800 transition-colors hover:bg-blue-100"
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <span>{topic}</span>
        <div className="flex space-x-2">
          <button
            className="text-xs font-medium text-blue-600 hover:text-blue-800"
            onClick={(e) => {
              e.stopPropagation();
              // Handle "Prepare" action
            }}
          >
            Prepare
          </button>
          <button
            className="text-xs font-medium text-blue-600 hover:text-blue-800"
            onClick={(e) => {
              e.stopPropagation();
              // Handle "Resources" action
            }}
          >
            Resources
          </button>
        </div>
      </div>

      {/* Progress indicator (could be based on curriculum progress) */}
      <div className="mt-1 h-1.5 w-full rounded-full bg-blue-200">
        <div
          className="h-1.5 rounded-full bg-blue-600"
          style={{ width: `${Math.random() * 100}%` }} // Replace with actual progress data
        />
      </div>
    </div>
  );
};

export default SuggestedTopicCard;
