import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/commonComponents/Sidebar";

function ViewLecture() {
  const { lectureId } = useParams(); // Get the lectureId from the URL params
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get(
          `http://localhost:3300/lectures/${lectureId}`, // Fetch the specific lecture by ID
          { headers }
        );
        setLecture(response.data); // Set the fetched lecture data
      } catch (error) {
        setError("Error fetching lecture.");
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [lectureId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!lecture) return <div>No lecture found.</div>;

  return (
    <>
      {" "}
      <div className="flex h-screen">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="ie-na-header flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              {lecture.title || "No title"}
            </h1>
          </header>
          <div className="mb-5 mt-20 flex justify-center">
            {/* Video Player */}
            <div className="w-full max-w-3xl rounded-lg bg-white shadow-md">
              <video controls className="h-96 w-full">
                <source
                  src={`http://localhost:3300${lecture.videoUrl}`} // Use the video URL from the lecture data
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Lecture Details */}
          <div className="mt-10">
            <h4 className="text-lg font-medium leading-6 text-gray-900">
              Lecture Information
            </h4>
            <div className="mt-4 rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <strong className="text-gray-900">Topic Number:</strong>{" "}
                  <span className="text-gray-700">
                    {lecture.topicNumber || "N/A"}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-900">Topic Name:</strong>{" "}
                  <span className="text-gray-700">
                    {lecture.topicName || "N/A"}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-900">Teacher:</strong>{" "}
                  <span className="text-gray-700">
                    {lecture.teacher
                      ? `${lecture.teacher.firstName} ${lecture.teacher.lastName}`
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-900">Subject:</strong>{" "}
                  <span className="text-gray-700">
                    {lecture.subject || "N/A"}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-900">Class:</strong>{" "}
                  <span className="text-gray-700">
                    {lecture.classEnrolled?.className || "N/A"}
                  </span>
                </div>
                <div>
                  <strong className="text-gray-900">Uploaded on:</strong>{" "}
                  <span className="text-gray-700">
                    {lecture.createdAt
                      ? new Date(lecture.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewLecture;
