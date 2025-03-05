import React, { useState, useEffect } from "react";
import axios from "axios";
import thumbnail from "../../assets/thumbnail.jpg";
import { Link } from "react-router-dom";

function AllLectures() {
  const [filters, setFilters] = useState({
    title: "",
    topicNumber: "",
    teacherName: "",
  });

  const [lectures, setLectures] = useState([]); // State to store fetched lectures

  // Fetch all lectures from the backend API
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(
          "http://localhost:5000/api/lectures/", // Replace with your API endpoint
          { headers }
        );
        const sortedLectures = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLectures(response.data); // Set fetched lectures to state
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    fetchLectures();
  }, []);

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Filter lectures based on filter inputs
  const filteredLectures = lectures;

  const handleDeleteLecture = async (lectureId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this lecture?"
    );
    if (!isConfirmed) return; // Stop if the user cancels

    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const headers = { Authorization: `Bearer ${token}` };

      console.log("Deleting Lecture ID:", lectureId); // Debugging log

      // Call the delete API
      await axios.delete(`http://localhost:5000/api/lectures/${lectureId}`, {
        headers,
      });

      console.log("Lecture deleted successfully!");

      // Remove the deleted lecture from the state
      setLectures((prevLectures) =>
        prevLectures.filter((lecture) => lecture._id !== lectureId)
      );
    } catch (error) {
      console.error(
        "Error deleting lecture:",
        error.response?.data || error.message
      );
    }
  };
  // Debugging: Log lectures and filtered lectures
  console.log("Lectures:", lectures);
  console.log("Filtered Lectures:", filteredLectures);

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="ie-na-header flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
          All Lectures
        </h1>
      </header>

      {/* Filter inputs */}
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

      {/* Display filtered lectures */}
      <div className="from-white-500 to-white-500 mt-12 rounded-2xl border border-gray-300 bg-gradient-to-r py-8 px-6 text-black shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">All Lectures</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredLectures.length === 0 ? (
            <div className="text-center text-gray-600">No lectures found.</div>
          ) : (
            filteredLectures.map((lecture) => (
              <div
                key={lecture._id}
                className="bg-white-600 transform rounded-lg border border-gray-300 p-4 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                {/* Render default thumbnail if thumbnailUrl is not provided */}
                <img
                  src={
                    lecture.thumbnailUrl
                      ? `http://localhost:5000${lecture.thumbnailUrl}`
                      : thumbnail
                  }
                  alt={`Thumbnail for ${lecture.title || "N/A"}`}
                  className="border-grey mb-3 h-40 w-full rounded-md border object-cover"
                />
                <h3 className="text-lg font-semibold">
                  {lecture.title || "N/A"}
                </h3>
                <p className="text-sm">
                  Class: {lecture.classEnrolled?.className || "N/A"}
                </p>
                <p className="text-sm">Subject: {lecture.subject || "N/A"}</p>
                {lecture.teacher && (
                  <p className="text-sm">
                    Teacher: {lecture.teacher.firstName || "N/A"}{" "}
                    {lecture.teacher.lastName || ""}
                  </p>
                )}
                <p className="text-sm">
                  Uploaded on:{" "}
                  {lecture.createdAt
                    ? new Date(lecture.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
                {/* Edit and Delete buttons */}
                <div className="mt-4 flex space-x-2">
                  <Link className="hover flex-1 rounded-md bg-blue-600 px-2 py-1 text-center text-sm text-white hover:scale-105 hover:bg-blue-800">
                    Watch
                  </Link>
                  <button className="hover flex-1 rounded-md bg-yellow-600 px-2 py-1 text-sm text-white hover:scale-105 hover:bg-yellow-800">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLecture(lecture._id)}
                    className="hover flex-1 rounded-md bg-red-600 px-2 py-1 text-sm text-white hover:scale-105 hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllLectures;
