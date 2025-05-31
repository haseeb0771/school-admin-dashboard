import React, { useState, useEffect } from "react";
import axios from "axios";
import thumbnail from "../../../assets/thumbnail.jpg"; // Import default thumbnail
import Sidebar from "../../../components/commonComponents/Sidebar";

function UploadLecture() {
  const [classes, setClasses] = useState([]);
  const [subjects, setLocalSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    topicNumber: "",
    topicName: "",
    subject: "",
    classEnrolled: "",
    teacher: "",
    description: "",
  });
  const [loadingClasses, setLoadingClasses] = useState(true); // Loading state for classes
  const [loadingTeachers, setLoadingTeachers] = useState(true); // Loading state for teachers
  const [loadingSubjects, setLoadingSubjects] = useState(false); // Loading state for subjects

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const classesResponse = await axios
          .get("http://localhost:3300/class/all")
          .then((res) => {
            setClasses(res.data);
          });

        const teachersResponse = await axios.get(
          "http://localhost:3300/teachers/",
          { headers }
        );
        setTeachers(teachersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingClasses(false);
        setLoadingTeachers(false);
      }
    };

    fetchData();
  }, []);

  const handleClassChange = (event) => {
    const selectedClass = classes.find((cls) => cls._id === event.target.value);

    if (selectedClass && selectedClass.subjects.length > 0) {
      setLocalSubjects(selectedClass.subjects);
    } else {
      setLocalSubjects([]); // Clear sections if no sections are available
    }
    setFormData((prev) => ({
      ...prev,
      classEnrolled: event.target.value, // Store class ID instead of className
      subjectAssigned: "", // Reset section when class changes
    }));
  };

  const handleSubjectChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      subjectAssigned: event.target.value,
    }));
  };

  // Handle video file change
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setUploadSuccess(false);
    }
  };

  // Handle thumbnail file change
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleUpload = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const formDataToSend = new FormData();
      formDataToSend.append("videoFile", videoFile);
      formDataToSend.append("thumbnailFile", thumbnailFile);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("topicNumber", formData.topicNumber);
      formDataToSend.append("topicName", formData.topicName);
      formDataToSend.append("subjects", formData.subjects);
      formDataToSend.append("classEnrolled", formData.classEnrolled);
      if (formData.teacher) {
        formDataToSend.append("teacher", formData.teacher); // Only append if teacher is selected
      }
      formDataToSend.append("description", formData.description);

      const response = await axios.post(
        "http://localhost:3300/lectures/upload",
        formDataToSend,
        { headers }
      );

      if (response.status === 201) {
        setUploadSuccess(true); // Show success message
        fetchLectures(); // Refresh the list of lectures

        // Reset all fields and states
        setFormData({
          title: "",
          topicNumber: "",
          topicName: "",
          subjects: "",
          classEnrolled: "",
          teacher: "",
          description: "",
        });
        setVideoFile(null); // Clear video file
        setThumbnailFile(null); // Clear thumbnail file

        // Hide success message after 5 seconds
        setTimeout(() => {
          setUploadSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error uploading lecture:", error);
    }
  };

  // Fetch lectures
  const [lectures, setLectures] = useState([]);
  const fetchLectures = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        "http://localhost:3300/lectures/", // Correct endpoint
        { headers }
      );
      setLectures(response.data);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  // Fetch lectures on component mount
  useEffect(() => {
    fetchLectures();
  }, []);

  // Fetch lectures on component mount
  useEffect(() => {
    fetchLectures();
  }, []);

  // Sort and slice the lectures to get only the 4 most recent ones
  const recentLectures = lectures
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date (newest first)
    .slice(0, 4); // Get the first 4 lectures

  return (
    <>
      {" "}
      <div className="flex h-screen">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          {uploadSuccess && (
            <div className="mb-4 w-full rounded-lg bg-green-500 p-4 text-center text-white shadow-lg">
              Video uploaded successfully!
            </div>
          )}

          <header className="ie-na-header flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Upload Lectures
            </h1>
          </header>

          {/* Show upload button if no video file is selected */}
          {!videoFile && (
            <div className="mt-6 flex w-full items-center justify-center">
              <label
                htmlFor="video-upload"
                className="flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-4 border-dashed border-gray-300 bg-white text-gray-500 transition-transform duration-300 hover:scale-105 hover:bg-gray-100"
              >
                <span className="text-6xl font-bold">+</span>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoChange}
                />
              </label>
            </div>
          )}

          {/* Show form and preview if video file is selected */}
          {videoFile && (
            <div className="mt-6 flex flex-col xl:flex-row xl:space-x-6">
              <div className="flex w-full flex-col space-y-4 xl:w-1/2">
                {thumbnailFile && (
                  <img
                    src={URL.createObjectURL(thumbnailFile)}
                    alt="Thumbnail Preview"
                    className="h-48 w-full rounded-lg object-cover shadow-md"
                  />
                )}
                <video
                  src={URL.createObjectURL(videoFile)}
                  controls
                  className="max-h-96 w-full rounded-lg shadow-md"
                />
              </div>

              <div className="mt-6 w-full xl:mt-0 xl:w-1/2">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mb-4 w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="number"
                  name="topicNumber"
                  placeholder="Topic Number"
                  value={formData.topicNumber}
                  onChange={handleInputChange}
                  className="mb-4 w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  name="topicName"
                  placeholder="Topic Name"
                  value={formData.topicName}
                  onChange={handleInputChange}
                  className="mb-4 w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
                />

                <select
                  name="classEnrolled"
                  value={formData.classEnrolled}
                  onChange={handleClassChange}
                  disabled={loadingClasses} // Disable while loading
                  className="mb-4 w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.className}
                    </option>
                  ))}
                </select>

                <select
                  value={formData.subjectAssigne}
                  onChange={handleSubjectChange}
                  className="mb-4 w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
                  disabled={subjects.length === 0} // Disable while loading or no class selected
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>

                <select
                  name="teacher"
                  value={formData.teacher}
                  onChange={handleInputChange}
                  className="mb-4 w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.firstName} {teacher.lastName}
                    </option>
                  ))}
                </select>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mb-4 w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
                ></textarea>

                <div className="mb-4">
                  <label className="mb-2 block text-gray-700">
                    Upload Thumbnail
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="mt-4 flex w-full justify-center">
                  <button
                    onClick={handleUpload}
                    className="rounded-lg bg-blue-600 py-3 px-8 text-white shadow-md transition duration-300 hover:bg-blue-700"
                  >
                    Upload Video
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Recently Uploaded Lectures Section */}
          <div className="from-white-500 to-white-500 mt-12 rounded-2xl border border-gray-300 bg-gradient-to-r py-8 px-6 text-black shadow-xl">
            <h2 className="mb-4 text-2xl font-bold">
              Recently Uploaded Lectures
            </h2>
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
                        ? `http://localhost:3300${lecture.thumbnailUrl}`
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
                    Uploaded on:{" "}
                    {new Date(lecture.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadLecture;
