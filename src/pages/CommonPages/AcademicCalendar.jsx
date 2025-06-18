import React, { useState } from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiFilter,
  FiDownload,
} from "react-icons/fi";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";

function AcademicCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState("all");

  // Sample events data - replace with your actual data
  const events = [
    {
      id: 1,
      title: "Semester Begins",
      date: new Date(2023, 8, 5),
      type: "academic",
    },
    {
      id: 2,
      title: "Add/Drop Deadline",
      date: new Date(2023, 8, 12),
      type: "academic",
    },
    {
      id: 3,
      title: "Midterm Exams",
      date: new Date(2023, 9, 15),
      type: "exam",
    },
    {
      id: 4,
      title: "Thanksgiving Break",
      date: new Date(2023, 10, 22),
      type: "holiday",
    },
    { id: 5, title: "Final Exams", date: new Date(2023, 11, 10), type: "exam" },
    {
      id: 6,
      title: "Semester Ends",
      date: new Date(2023, 11, 15),
      type: "academic",
    },
  ];

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const filteredEvents = events.filter(
    (event) => activeFilter === "all" || event.type === activeFilter
  );

  const getEventsForDay = (day) => {
    return filteredEvents.filter((event) => isSameDay(event.date, day));
  };

  const eventTypeColors = {
    academic: "bg-blue-100 text-blue-800",
    exam: "bg-red-100 text-red-800",
    holiday: "bg-green-100 text-green-800",
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Academic Calendar
            </h1>
            <p className="text-gray-500">View important dates and events</p>
          </div>

          <div className="mt-4 flex items-center space-x-3 md:mt-0">
            <button className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">
              <FiDownload size={16} />
              <span>Export</span>
            </button>
          </div>
        </header>

        {/* Calendar Controls */}
        <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={prevMonth}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <FiChevronLeft size={20} />
              </button>

              <h2 className="text-xl font-semibold">
                {format(currentMonth, "MMMM yyyy")}
              </h2>

              <button
                onClick={nextMonth}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <FiChevronRight size={20} />
              </button>

              <button
                onClick={() => setCurrentMonth(new Date())}
                className="rounded-lg bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
              >
                Today
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center text-gray-500">
                <FiFilter size={16} className="mr-1" />
                <span className="text-sm">Filter:</span>
              </div>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Events</option>
                <option value="academic">Academic Dates</option>
                <option value="exam">Exams</option>
                <option value="holiday">Holidays</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mb-6 rounded-xl bg-white p-4 shadow-sm">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="py-2 text-center font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: new Date(monthStart).getDay() }).map(
              (_, index) => (
                <div
                  key={`empty-start-${index}`}
                  className="h-24 rounded bg-gray-50"
                ></div>
              )
            )}

            {monthDays.map((day) => {
              const dayEvents = getEventsForDay(day);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);

              return (
                <div
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`h-24 cursor-pointer rounded border p-1 transition-colors
                    ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }
                    ${!isCurrentMonth ? "bg-gray-50 text-gray-400" : ""}
                  `}
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full p-1 text-right
                    ${
                      isSameDay(day, new Date())
                        ? "bg-indigo-600 text-white"
                        : ""
                    }
                    ${
                      isSelected && !isSameDay(day, new Date())
                        ? "text-indigo-600"
                        : ""
                    }
                  `}
                  >
                    {format(day, "d")}
                  </div>

                  <div className="h-16 space-y-1 overflow-y-auto">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`truncate rounded px-2 py-1 text-xs ${
                          eventTypeColors[event.type]
                        }`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {Array.from({ length: 6 - new Date(monthEnd).getDay() }).map(
              (_, index) => (
                <div
                  key={`empty-end-${index}`}
                  className="h-24 rounded bg-gray-50"
                ></div>
              )
            )}
          </div>
        </div>

        {/* Selected Day Events */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center">
            <FiCalendar className="mr-2 text-indigo-600" size={20} />
            <h2 className="text-xl font-semibold">
              {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </h2>
          </div>

          {getEventsForDay(selectedDate).length > 0 ? (
            <div className="space-y-3">
              {getEventsForDay(selectedDate).map((event) => (
                <div
                  key={event.id}
                  className="flex items-start rounded-lg border border-gray-200 p-3"
                >
                  <div
                    className={`mt-1 mr-3 h-3 w-3 flex-shrink-0 rounded-full 
                    ${event.type === "academic" ? "bg-blue-500" : ""}
                    ${event.type === "exam" ? "bg-red-500" : ""}
                    ${event.type === "holiday" ? "bg-green-500" : ""}
                  `}
                  ></div>
                  <div className="flex-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm capitalize text-gray-500">
                      {event.type}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(event.date, "h:mm a")}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No events scheduled for this day
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AcademicCalendar;
