import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import Sidebar from "../../../components/commonComponents/Sidebar";

function UpTextbook() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    class: "",
    subject: "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {" "}
      <div className="flex h-screen">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            Upload Textbook
          </h1>

          <div className="flex gap-8">
            <div className="flex w-1/2 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 transition-colors duration-300 hover:border-blue-500">
              {!selectedFile ? (
                <label className="flex cursor-pointer flex-col items-center">
                  <UploadCloud className="h-12 w-12 text-gray-500" />
                  <span className="mt-2 text-gray-500">
                    Click to upload PDF
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <iframe
                  src={URL.createObjectURL(selectedFile)}
                  title="PDF Preview"
                  className="h-64 w-full rounded-lg border"
                ></iframe>
              )}
            </div>

            <div className="w-1/2 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                Textbook Details
              </h2>

              <div className="mb-4">
                <label className="mb-2 block text-gray-600">Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Class</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-gray-600">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="English">English</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>

              <button className="w-full rounded-lg bg-blue-500 py-2 text-white transition-colors duration-300 hover:bg-blue-600">
                Upload Textbook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpTextbook;
