import React from "react";

const ConfirmBox = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
