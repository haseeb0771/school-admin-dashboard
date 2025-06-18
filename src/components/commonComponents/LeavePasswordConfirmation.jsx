import React from "react";
import { FiLock } from "react-icons/fi";

function LeavePasswordConfirmation({
  showPasswordModal,
  setShowPasswordModal,
  setLeaveRequest,
  handleSubmitPassword,
  leaveRequest,
  error,
  setError,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Confirm Leave Application
          </h2>
          <p className="mb-4 text-gray-600">
            Please enter your password to confirm the leave request.
          </p>

          <form onSubmit={handleSubmitPassword}>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={leaveRequest.password}
                  onChange={(e) =>
                    setLeaveRequest({
                      ...leaveRequest,
                      password: e.target.value,
                    })
                  }
                  required
                />
                <FiLock className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordModal(false);
                  setError("");
                }}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Submit Leave
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LeavePasswordConfirmation;
