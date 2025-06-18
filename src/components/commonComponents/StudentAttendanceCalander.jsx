import React from "react";
import { FiCheck, FiX, FiClock } from "react-icons/fi";
import { format, isSameDay, parseISO } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const StudentAttendanceCalendar = ({ records }) => {
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const record = records.find((record) =>
      isSameDay(parseISO(record.date), date)
    );

    if (!record) return null;

    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        {record.status === "present" && (
          <FiCheck className="text-xs text-green-500" />
        )}
        {record.status === "absent" && <FiX className="text-xs text-red-500" />}
        {record.status === "late" && (
          <FiClock className="text-xs text-amber-500" />
        )}
      </div>
    );
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;

    const record = records.find((record) =>
      isSameDay(parseISO(record.date), date)
    );

    if (!record) return "";

    switch (record.status) {
      case "present":
        return "bg-green-50 hover:bg-green-100";
      case "absent":
        return "bg-red-50 hover:bg-red-100";
      case "late":
        return "bg-amber-50 hover:bg-amber-100";
      default:
        return "";
    }
  };

  // Custom format for weekdays
  const formatShortWeekday = (locale, date) => {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Attendance Calendar
      </h3>
      <div className="flex justify-center">
        <Calendar
          tileContent={tileContent}
          tileClassName={tileClassName}
          className="w-full max-w-md border-0"
          formatShortWeekday={formatShortWeekday}
          locale="en-US"
        />
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="mr-1 h-4 w-4 border border-green-100 bg-green-50"></div>
          <span className="text-xs text-gray-600">Present</span>
        </div>
        <div className="flex items-center">
          <div className="mr-1 h-4 w-4 border border-amber-100 bg-amber-50"></div>
          <span className="text-xs text-gray-600">Late</span>
        </div>
        <div className="flex items-center">
          <div className="mr-1 h-4 w-4 border border-red-100 bg-red-50"></div>
          <span className="text-xs text-gray-600">Absent</span>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceCalendar;
