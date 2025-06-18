import React, { useState } from "react";
import {
  FiCalendar,
  FiAlertTriangle,
  FiCheck,
  FiX,
  FiPlus,
  FiClock,
} from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../../components/commonComponents/Sidebar";
import StudentAttendanceCalendar from "../../components/commonComponents/StudentAttendanceCalander";
import { format, isSameDay, parseISO } from "date-fns";
import LeavePasswordConfirmation from "../../components/commonComponents/LeavePasswordConfirmation";

function StudentAttendance() {
  // Sample data - replace with API calls in real app
  const [attendanceData, setAttendanceData] = useState({
    present: 22,
    absent: 3,
    late: 1,
    leavesTaken: 5,
    maxLeavesAllowed: 8,
    attendanceRecords: [
      { date: "2023-11-01", status: "present", remark: "" },
      { date: "2023-11-02", status: "present", remark: "" },
      { date: "2023-11-03", status: "absent", remark: "Sick leave" },
      { date: "2023-11-04", status: "late", remark: "Late arrival" },
      // ... more records
    ],
  });

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [leaveRequest, setLeaveRequest] = useState({
    reason: "",
    dates: [],
    password: "",
  });
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Check if leave limit exceeded
  const leavesExceeded =
    attendanceData.leavesTaken >= attendanceData.maxLeavesAllowed;

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange(dates);

    // Generate all dates in range when both start and end are selected
    if (start && end) {
      const days = [];
      let currentDate = new Date(start);

      while (currentDate <= end) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setLeaveRequest({ ...leaveRequest, dates: days });
    }
  };

  const handleSubmitLeave = (e) => {
    e.preventDefault();
    if (leaveRequest.dates.length === 0) {
      setError("Please select at least one date");
      return;
    }
    if (leaveRequest.reason.trim() === "") {
      setError("Please enter a reason");
      return;
    }
    setError("");
    setShowLeaveModal(false);
    setShowPasswordModal(true);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (leaveRequest.password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    // Here you would typically send the leave request to your backend
    console.log("Leave request submitted:", leaveRequest);

    // Update local state (in a real app, wait for API response)
    const newLeaves = leaveRequest.dates.length;
    setAttendanceData({
      ...attendanceData,
      leavesTaken: attendanceData.leavesTaken + newLeaves,
      attendanceRecords: [
        ...attendanceData.attendanceRecords,
        ...leaveRequest.dates.map((date) => ({
          date: date.toISOString().split("T")[0],
          status: "absent",
          remark: leaveRequest.reason,
        })),
      ],
    });

    setShowPasswordModal(false);
    setLeaveRequest({ reason: "", dates: [], password: "" });
    setDateRange([null, null]);
  };

  // Calculate attendance percentage
  const attendancePercentage = Math.round(
    (attendanceData.present /
      (attendanceData.present + attendanceData.absent)) *
      100
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-2xl font-bold text-gray-800">Parent Dashboard</h1>
          <p className="text-gray-600">Track your child's academic progress</p>
        </header>

        {/* Attendance Summary */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Present</p>
                <p className="text-3xl font-bold text-green-600">
                  {attendanceData.present}
                </p>
              </div>
              <div className="rounded-full bg-green-50 p-3 text-green-600">
                <FiCheck className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Absent</p>
                <p className="text-3xl font-bold text-red-600">
                  {attendanceData.absent}
                </p>
              </div>
              <div className="rounded-full bg-red-50 p-3 text-red-600">
                <FiX className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-amber-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Late Arrivals
                </p>
                <p className="text-3xl font-bold text-amber-600">
                  {attendanceData.late}
                </p>
              </div>
              <div className="rounded-full bg-amber-50 p-3 text-amber-600">
                <FiClock className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Attendance %
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {attendancePercentage}%
                </p>
              </div>
              <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                <FiCalendar className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Calendar */}
        <div className="mb-8">
          <StudentAttendanceCalendar
            records={attendanceData.attendanceRecords}
          />
        </div>

        {/* Leaves Information */}
        <div
          className={`mb-8 rounded-lg p-4 ${
            leavesExceeded
              ? "border border-red-200 bg-red-50"
              : "border border-blue-200 bg-blue-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FiAlertTriangle
                className={`mr-2 ${
                  leavesExceeded ? "text-red-500" : "text-blue-500"
                }`}
              />
              <p
                className={`font-medium ${
                  leavesExceeded ? "text-red-800" : "text-blue-800"
                }`}
              >
                {leavesExceeded
                  ? "Leave limit exceeded! No more leaves allowed this month."
                  : `Leaves Taken: ${attendanceData.leavesTaken}/${attendanceData.maxLeavesAllowed}`}
              </p>
            </div>
            <button
              onClick={() => !leavesExceeded && setShowLeaveModal(true)}
              disabled={leavesExceeded}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                leavesExceeded
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <FiPlus className="mr-1 inline" />
              Apply Leave
            </button>
          </div>
        </div>

        {/* Attendance Records Table */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {attendanceData.attendanceRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          record.status === "present"
                            ? "bg-green-100 text-green-800"
                            : record.status === "late"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {record.remark || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Apply Leave Modal */}
        {showLeaveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
              <div className="p-6">
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                  Apply for Leave
                </h2>

                <form onSubmit={handleSubmitLeave}>
                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Reason
                    </label>
                    <textarea
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      value={leaveRequest.reason}
                      onChange={(e) =>
                        setLeaveRequest({
                          ...leaveRequest,
                          reason: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Select Date Range
                    </label>
                    <DatePicker
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      onChange={handleDateChange}
                      inline
                      minDate={new Date()}
                      excludeDates={attendanceData.attendanceRecords
                        .filter((r) => r.status === "present")
                        .map((r) => new Date(r.date))}
                    />
                    {startDate && endDate && (
                      <p className="mt-2 text-sm text-gray-600">
                        Selected: {format(startDate, "MMM d, yyyy")} to{" "}
                        {format(endDate, "MMM d, yyyy")} (
                        {leaveRequest.dates.length} days)
                      </p>
                    )}
                  </div>

                  {error && (
                    <p className="mb-4 text-sm text-red-500">{error}</p>
                  )}

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowLeaveModal(false);
                        setError("");
                        setDateRange([null, null]);
                      }}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!startDate || !endDate}
                      className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
                        !startDate || !endDate
                          ? "cursor-not-allowed bg-gray-400"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Password Confirmation Modal */}
        {showPasswordModal && (
          <LeavePasswordConfirmation
            showPasswordModal={showPasswordModal}
            setShowPasswordModal={setShowPasswordModal}
            setLeaveRequest={setLeaveRequest}
            handleSubmitPassword={handleSubmitPassword}
            leaveRequest={leaveRequest}
            setError={setError}
            error={error}
          />
        )}
      </div>
    </div>
  );
}

export default StudentAttendance;
