import React, { useState } from "react";
import axios from "axios";

function DragDrop() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  // Handle file input change
  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // Remove a file
  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Upload files to the backend
  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file); // Append each file to FormData
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        alert("Images uploaded successfully!");
        setFiles([]); // Clear the files after upload
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload images.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div
        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-400 p-6 text-center"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-gray-600">Drag and drop images here</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="mt-2 inline-block cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Browse Files
        </label>
      </div>

      {/* Image Previews */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {files.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              className="h-32 w-full rounded-lg object-cover"
            />
            <button
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={uploading}
          className="rounded-lg bg-green-500 px-6 py-2 text-white disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </div>
    </div>
  );
}

export default DragDrop;
