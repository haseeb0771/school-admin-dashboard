import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

function UpTeacherNotes() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    topicName: "",
    topicNum: "",
    className: "",
    subject: "",
    teacherName: "",
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Upload Teacher Notes
      </h1>

      <div className="flex flex-col gap-6 xl:flex-row">
        {/* PDF Upload Section */}
        <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 text-center hover:border-blue-500 hover:bg-blue-50 xl:w-1/2">
          <PlusCircle className="h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-600">Click to upload PDF notes</p>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* PDF Preview */}
        {selectedFile && (
          <div className="w-full rounded-lg bg-white p-4 shadow-md xl:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700">Preview:</h2>
            <embed
              src={URL.createObjectURL(selectedFile)}
              type="application/pdf"
              className="mt-2 h-64 w-full rounded border border-gray-300"
            />
          </div>
        )}
      </div>

      {/* Form Section */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Note Details
        </h2>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="topicName"
            placeholder="Topic Name"
            className="w-full rounded border border-gray-300 p-2"
            value={formData.topicName}
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="topicNum"
            placeholder="Topic Number"
            className="w-full rounded border border-gray-300 p-2"
            value={formData.topicNum}
            onChange={handleInputChange}
          />

          <select
            name="className"
            className="w-full rounded border border-gray-300 p-2"
            value={formData.className}
            onChange={handleInputChange}
          >
            <option value="">Select Class</option>
            <option value="10A">10A</option>
            <option value="9B">9B</option>
            <option value="8C">8C</option>
          </select>

          <select
            name="subject"
            className="w-full rounded border border-gray-300 p-2"
            value={formData.subject}
            onChange={handleInputChange}
          >
            <option value="">Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>

          <input
            type="text"
            name="teacherName"
            placeholder="Teacher Name"
            className="w-full rounded border border-gray-300 p-2"
            value={formData.teacherName}
            onChange={handleInputChange}
          />

          <button
            style={{ height: "50px", borderRadius: "25px" }}
            className="col-span-full mt-4 bg-blue-500 text-white hover:bg-blue-600"
          >
            Upload Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpTeacherNotes;
