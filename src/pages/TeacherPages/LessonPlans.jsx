import React, { useState, useEffect } from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import ClassPeriodCard from "../../components/TeacherComponents/ClassPeriodCard";
import SuggestedTopicCard from "../../components/TeacherComponents/SuggestedTopicCard";
import {
  FiCheck,
  FiX,
  FiCalendar,
  FiClock,
  FiBook,
  FiSearch,
} from "react-icons/fi";
import { format, isToday, parseISO } from "date-fns";

function LessonPlans() {
  const [activeTab, setActiveTab] = useState("today");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data - in a real app, this would come from an API
  const [schedule, setSchedule] = useState([
    {
      id: 1,
      day: "2023-11-15",
      periods: [
        {
          id: 101,
          time: "08:00 - 09:00",
          class: "8th Grade",
          subject: "Mathematics",
          status: "upcoming", // upcoming, in-progress, completed
          topics: ["Algebra Basics", "Linear Equations", "Polynomials"],
          taught: false,
        },
        {
          id: 102,
          time: "10:00 - 11:00",
          class: "9th Grade",
          subject: "Biology",
          status: "upcoming",
          topics: ["Photosynthesis", "Cell Structure"],
          taught: false,
        },
      ],
    },
    {
      id: 2,
      day: "2023-11-16",
      periods: [
        {
          id: 201,
          time: "09:00 - 10:00",
          class: "10th Grade",
          subject: "History",
          status: "upcoming",
          topics: ["World War II", "Industrial Revolution"],
          taught: false,
        },
      ],
    },
  ]);

  // Mark a lesson as taught/not taught
  const toggleLessonStatus = (dayId, periodId) => {
    setSchedule(
      schedule.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            periods: day.periods.map((period) => {
              if (period.id === periodId) {
                return {
                  ...period,
                  taught: !period.taught,
                  status: !period.taught ? "completed" : "upcoming",
                };
              }
              return period;
            }),
          };
        }
        return day;
      })
    );
  };

  // Filter schedule based on active tab
  const filteredSchedule = schedule.filter((day) => {
    if (activeTab === "today") return isToday(parseISO(day.day));
    if (activeTab === "upcoming") return !isToday(parseISO(day.day));
    return true;
  });

  // Get today's date for display
  const today = format(new Date(), "EEEE, MMMM do");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                My Lesson Plans
              </h1>
              <p className="text-gray-500">Plan and track your daily classes</p>
            </div>

            <div className="mt-4 flex items-center space-x-2 md:mt-0">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search classes or subjects..."
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Date and Tabs */}
          <div className="mt-6">
            <div className="flex items-center text-lg font-medium text-indigo-600">
              <FiCalendar className="mr-2" />
              {today}
            </div>

            <div className="mt-4 border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("today")}
                  className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium ${
                    activeTab === "today"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Today's Classes
                </button>
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium ${
                    activeTab === "upcoming"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Upcoming Classes
                </button>
                <button
                  onClick={() => setActiveTab("all")}
                  className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium ${
                    activeTab === "all"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  All Classes
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {filteredSchedule.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-gray-500">
                No classes scheduled for this period
              </p>
            </div>
          ) : (
            filteredSchedule.map((day) => (
              <div key={day.id} className="mb-8">
                {activeTab === "all" && (
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    {format(parseISO(day.day), "EEEE, MMMM do")}
                  </h2>
                )}

                <div className="space-y-4">
                  {day.periods.map((period) => (
                    <div
                      key={period.id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex flex-col justify-between md:flex-row md:items-center">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center text-lg font-medium text-gray-900">
                            <FiClock className="mr-2 text-indigo-600" />
                            {period.time}
                          </div>
                          <div className="mt-1 flex items-center text-gray-600">
                            <FiBook className="mr-2" />
                            {period.class} • {period.subject}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              toggleLessonStatus(day.id, period.id)
                            }
                            className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                              period.taught
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {period.taught ? (
                              <>
                                <FiCheck className="mr-1" /> Taught
                              </>
                            ) : (
                              <>
                                <FiX className="mr-1" /> Not Taught
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Suggested Topics */}
                      <div className="mt-4">
                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                          Suggested Topics:
                        </h3>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {period.topics.map((topic, index) => (
                            <div
                              key={index}
                              className="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-800"
                            >
                              {topic}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Resources (would be dynamic in real app) */}
                      <div className="mt-4">
                        <h3 className="mb-2 text-sm font-medium text-gray-700">
                          Recommended Resources:
                        </h3>
                        <ul className="space-y-1 text-sm text-blue-600">
                          <li>
                            <a href="#" className="hover:underline">
                              Lesson Plan Template
                            </a>
                          </li>
                          <li>
                            <a href="#" className="hover:underline">
                              Worksheet: {period.topics[0]}
                            </a>
                          </li>
                          <li>
                            <a href="#" className="hover:underline">
                              Presentation Slides
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
}

export default LessonPlans;
