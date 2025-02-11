import React, { useState } from "react";
import thumbnail from "../../assets/thumbnail.jpg";
import { Link } from "react-router-dom";

function AllLectures() {
  const [filters, setFilters] = useState({
    title: "",
    topicNumber: "",
    teacherName: "",
  });

  const lectures = [
    {
      id: 1,
      title: "Introduction to Algebra",
      topicNumber: "101",
      subject: "Mathematics",
      class: "10th Grade",
      teacherName: "Mr. Smith",
      description: "Basics of algebra including variables and equations.",
      uploadDate: "2025-02-01",
    },
    {
      id: 2,
      title: "World War II Overview",
      topicNumber: "202",
      subject: "History",
      class: "9th Grade",
      teacherName: "Mrs. Johnson",
      description:
        "A comprehensive overview of the causes and effects of WWII.",
      uploadDate: "2025-02-03",
    },
    // Add more lecture objects as needed
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredLectures = lectures.filter((lecture) => {
    return (
      lecture.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      lecture.topicNumber.includes(filters.topicNumber) &&
      lecture.teacherName
        .toLowerCase()
        .includes(filters.teacherName.toLowerCase())
    );
  });

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="ie-na-header flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
          All Lectures
        </h1>
      </header>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          type="text"
          name="title"
          placeholder="Filter by Title"
          value={filters.title}
          onChange={handleFilterChange}
          className="rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
        />
        <input
          type="text"
          name="topicNumber"
          placeholder="Filter by Topic Number"
          value={filters.topicNumber}
          onChange={handleFilterChange}
          className="rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
        />
        <input
          type="text"
          name="teacherName"
          placeholder="Filter by Teacher Name"
          value={filters.teacherName}
          onChange={handleFilterChange}
          className="rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLectures.map((lecture) => (
          <div
            key={lecture.id}
            className="group relative rounded-lg border bg-white shadow-md transition-transform duration-300 hover:z-20 hover:scale-110 hover:shadow-2xl"
          >
            <img
              src={thumbnail}
              alt={lecture.title}
              className="h-48 w-full rounded-t-lg object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-900">
                {lecture.title}
              </h2>
              <p className="text-gray-600">Topic: {lecture.topicNumber}</p>
              <p className="text-gray-600">Teacher: {lecture.teacherName}</p>
            </div>
            <div className="absolute inset-0 hidden flex-col justify-center rounded-lg border border-gray-300 bg-white p-6 shadow-lg group-hover:flex group-hover:translate-y-[-20%] group-hover:scale-105">
              <p className="mb-2 font-medium text-gray-900">
                Subject: {lecture.subject}
              </p>
              <p className="mb-2 font-medium text-gray-900">
                Class: {lecture.class}
              </p>
              <p className="mb-2 text-gray-700">{lecture.description}</p>
              <p className="mb-4 text-gray-500">
                Uploaded on: {lecture.uploadDate}
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/watch"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Watch
                </Link>
                <Link
                  to="/edit"
                  className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <Link className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllLectures;
