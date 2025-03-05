import React, { useState, useEffect } from "react";
import axios from "axios";
import thumbnail from "../../assets/thumbnail.jpg"; // Import default thumbnail
import { Link } from "react-router-dom";

function LecturesPage() {
  const [lectures, setLectures] = useState([]); // State to store lectures

  // Fetch lectures on component mount
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(
          "http://localhost:5000/api/lectures/", // Correct endpoint
          { headers }
        );
        setLectures(response.data); // Set fetched lectures
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    fetchLectures();
  }, []);

  // Get the 4 most recent lectures
  const recentLectures = lectures
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date (newest first)
    .slice(0, 4); // Get the first 4 lectures

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="ie-na-header flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
          Lectures
        </h1>
      </header>

      <div className="mt-10 flex flex-col gap-8 xl:flex-row">
        {/* Upload Lecture Section */}
        <div className="border-grey from-white-600 to-white-900 flex-1 transform rounded-2xl border bg-gradient-to-r py-10 px-6 text-center text-black shadow-xl transition-transform duration-300 hover:scale-105">
          <h2 className="mb-4 text-3xl font-bold">Upload Lecture</h2>
          <p className="mb-9 text-lg">
            Easily upload new lectures and share them with your students.
          </p>
          <Link
            to="/uploadlecture"
            className="rounded-xl border border-gray-300 bg-white py-3 px-8 font-semibold text-green-600 shadow-lg transition duration-300 hover:bg-gray-100"
          >
            Upload Now
          </Link>
        </div>

        {/* All Lectures Section */}
        <div className="border-grey from-white-600 to-white-900 flex-1 transform rounded-2xl border bg-gradient-to-r py-10 px-6 text-center text-black shadow-xl transition-transform duration-300 hover:scale-105">
          <h2 className="mb-4 text-3xl font-bold">All Lectures</h2>
          <p className="mb-9 text-lg">
            Browse through all the lectures and manage your content.
          </p>
          <Link
            to="/alllectures"
            className="rounded-xl border border-gray-300 bg-white py-3 px-8 font-semibold text-blue-600 shadow-lg transition duration-300 hover:bg-gray-100"
          >
            View Lectures
          </Link>
        </div>
      </div>

      {/* Recently Uploaded Lectures Section */}
      <div className="from-white-500 to-white-500 mt-12 rounded-2xl border border-gray-300 bg-gradient-to-r py-8 px-6 text-black shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">Recently Uploaded Lectures</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recentLectures.map((lecture) => (
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
              <h3 className="text-lg font-semibold">{lecture.title}</h3>
              <p className="text-sm">
                Class: {lecture.classEnrolled.className}
              </p>
              <p className="text-sm">Subject: {lecture.subject}</p>
              {lecture.teacher && (
                <p className="text-sm">
                  Teacher: {lecture.teacher.firstName}{" "}
                  {lecture.teacher.lastName}
                </p>
              )}
              <p className="text-sm">
                Uploaded on: {new Date(lecture.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LecturesPage;
