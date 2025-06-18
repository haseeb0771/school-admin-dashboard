import React, { useState } from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import {
  FiPlus,
  FiBell,
  FiSend,
  FiCalendar,
  FiUsers,
  FiBook,
  FiX,
} from "react-icons/fi";

function Announcement() {
  // Form states
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");
  const [announcementDate, setAnnouncementDate] = useState("");

  // Sample data
  const classes = ["8th", "9th", "10th", "11th", "12th"];
  const sections = ["A", "B", "C", "D"];

  // Sample announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Mid-Term Exams Schedule",
      message:
        "The mid-term exams will begin from November 15th. Please check the schedule on the notice board.",
      date: "2023-11-01",
      class: "all",
      section: "all",
      status: "published",
    },
    {
      id: 2,
      title: "Science Fair Project Submission",
      message:
        "10th grade students must submit their science fair projects by November 10th to their respective class teachers.",
      date: "2023-11-05",
      class: "10th",
      section: "all",
      status: "published",
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      message:
        "There will be a parent-teacher meeting for 8th-A students on November 8th at 2:00 PM in the school auditorium.",
      date: "2023-11-07",
      class: "8th",
      section: "A",
      status: "published",
    },
  ]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      id: announcements.length + 1,
      title,
      message,
      date: announcementDate || new Date().toISOString().split("T")[0],
      class: selectedClass,
      section: selectedSection,
      status: "published",
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setMessage("");
    setSelectedClass("all");
    setSelectedSection("all");
    setAnnouncementDate("");
    setIsCreating(false);
  };

  // Delete announcement
  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((ann) => ann.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 lg:px-12">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Announcements
            </h1>
            <p className="text-gray-500">
              Create and manage school announcements
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="mt-4 flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 md:mt-0"
          >
            <FiPlus className="mr-2" />
            New Announcement
          </button>
        </header>

        {/* Create Announcement Form */}
        {isCreating && (
          <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900">
                <FiBell className="mr-2 inline text-indigo-600" />
                Create New Announcement
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter announcement title"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Write your announcement here..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Class Selection */}
                <div>
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Class
                  </label>
                  <select
                    id="class"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="all">All Classes</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Section Selection */}
                <div>
                  <label
                    htmlFor="section"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Section
                  </label>
                  <select
                    id="section"
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="all">All Sections</option>
                    {selectedClass !== "all" &&
                      sections.map((sec) => (
                        <option key={sec} value={sec}>
                          {sec}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Date Selection */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiCalendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="date"
                      value={announcementDate}
                      onChange={(e) => setAnnouncementDate(e.target.value)}
                      className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <FiSend className="mr-2" />
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Announcements List */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            <FiBell className="mr-2 inline text-indigo-600" />
            Published Announcements
          </h3>

          {announcements.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-8 text-center">
              <p className="text-gray-500">No announcements found</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {announcement.title}
                    </h4>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      {new Date(announcement.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      <span className="mx-2">•</span>
                      <FiUsers className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                      {announcement.class === "all"
                        ? "All Classes"
                        : announcement.class}
                      {announcement.section !== "all" &&
                        `-${announcement.section}`}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteAnnouncement(announcement.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 text-gray-700">
                  <p>{announcement.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Announcement;
