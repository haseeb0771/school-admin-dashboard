import React, { useState, useEffect } from "react";
import thumbnail from "../../assets/thumbnail.jpg";

function UploadLecture() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    topicNumber: "",
    subject: "",
    className: "",
    teacherName: "",
    description: "",
  });

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(URL.createObjectURL(file));
      setUploadSuccess(false);
    }
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnailFile(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = () => {
    // Simulate upload success
    setUploadSuccess(true);
  };

  useEffect(() => {
    if (uploadSuccess) {
      setVideoFile(null);
      setThumbnailFile(null);
      setFormData({
        title: "",
        topicNumber: "",
        subject: "",
        className: "",
        teacherName: "",
        description: "",
      });

      // Hide flash message after 5 seconds
      const timer = setTimeout(() => {
        setUploadSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [uploadSuccess]);

  return (
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

      {videoFile && (
        <div className="mt-6 flex flex-col xl:flex-row xl:space-x-6">
          <div className="flex w-full flex-col space-y-4 xl:w-1/2">
            {thumbnailFile && (
              <img
                src={thumbnailFile}
                alt="Thumbnail Preview"
                className="h-48 w-full rounded-lg object-cover shadow-md"
              />
            )}
            <video
              src={videoFile}
              controls
              className="w-full rounded-lg shadow-md"
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
              type="text"
              name="topicNumber"
              placeholder="Topic Number"
              value={formData.topicNumber}
              onChange={handleInputChange}
              className="mb-4 w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="mb-4 w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="className"
              placeholder="Class"
              value={formData.className}
              onChange={handleInputChange}
              className="mb-4 w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="teacherName"
              placeholder="Lecture by (Teacher's Name)"
              value={formData.teacherName}
              onChange={handleInputChange}
              className="mb-4 w-full rounded-lg border p-3 shadow-sm focus:border-blue-500 focus:outline-none"
            />
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
        <h2 className="mb-4 text-2xl font-bold">Recently Uploaded Lectures</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white-600 transform rounded-lg border border-gray-300 p-4 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={thumbnail}
                alt={`Lecture Thumbnail ${index + 1}`}
                className="border-grey mb-3 h-32 w-full rounded-md border object-cover"
              />
              <h3 className="text-lg font-semibold">
                Lecture Title {index + 1}
              </h3>
              <p className="text-sm">Class: Class {(index % 5) + 1}</p>
              <p className="text-sm">Subject: Subject {(index % 3) + 1}</p>
              <p className="text-sm">Uploaded on: Jan {index + 1}, 2025</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UploadLecture;
