import React, { useState } from "react";
import Sidebar from "../../../components/commonComponents/Sidebar";

import { FilePlus } from "lucide-react";

function UpPastpapers() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    subject: "",
    class: "",
    year: "",
    language: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {" "}
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 xl:text-4xl">
            Upload Past Papers
          </h1>

          <div className="flex gap-8">
            {/* File Upload Section */}
            <label className="flex h-64 w-1/2 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:border-blue-500">
              {!selectedFile ? (
                <div className="flex flex-col items-center">
                  <FilePlus className="h-12 w-12 text-gray-500" />
                  <p className="mt-2 text-gray-500">Click to upload PDF</p>
                </div>
              ) : (
                <iframe
                  src={selectedFile}
                  className="h-full w-full rounded-lg"
                  title="PDF Preview"
                ></iframe>
              )}
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Form Section */}
            <form
              className="w-1/2 space-y-4 rounded-lg bg-white p-6 shadow-md"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-gray-700">Subject</label>
                <select
                  name="subject"
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700">Class</label>
                <select
                  name="class"
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Class</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700">Year</label>
                <select
                  name="year"
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700">Language</label>
                <select
                  name="language"
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Urdu">Urdu</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
              >
                Upload Past Paper
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpPastpapers;
