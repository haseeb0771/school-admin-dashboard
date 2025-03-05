import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";

function UpTeacherNotes() {
  const [classes, setClasses] = useState([]);
  const [subjects, setLocalSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    topicName: "",
    topicNum: "",
    classEnrolled: "",
    subjects: "",
    teacher: "",
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingTeachers, setLoadingTeachers] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const classesResponse = await axios.get(
          "http://localhost:5000/api/classes/all"
        );
        setClasses(classesResponse.data);

        const teachersResponse = await axios.get(
          "http://localhost:5000/api/teachers/",
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
    setLocalSubjects(selectedClass ? selectedClass.subjects : []);
    setFormData((prev) => ({
      ...prev,
      classEnrolled: event.target.value,
      subjects: "",
    }));
  };

  const handleSubjectChange = (event) => {
    setFormData((prev) => ({ ...prev, subjects: event.target.value }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please upload a PDF file.");
      return;
    }

    setUploading(true);
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("notesFile", selectedFile);
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await axios.post(
        "http://localhost:5000/api/notes/upload",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setFormData({
        topicName: "",
        topicNum: "",
        classEnrolled: "",
        subjects: "",
        teacher: "",
      });
      setSelectedFile(null);
    } catch (err) {
      console.error("Error uploading notes:", err);
      setError("Error uploading notes, please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Upload Teacher Notes
      </h1>

      <div className="flex flex-col gap-6 xl:flex-row">
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

      <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Note Details
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <input
            type="text"
            name="topicName"
            placeholder="Topic Name"
            className="w-full rounded border p-2"
            value={formData.topicName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="topicNum"
            placeholder="Topic Number"
            className="w-full rounded border p-2"
            value={formData.topicNum}
            onChange={handleInputChange}
          />

          <select
            name="classEnrolled"
            value={formData.classEnrolled}
            onChange={handleClassChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.className}
              </option>
            ))}
          </select>

          <select
            value={formData.subjects}
            onChange={handleSubjectChange}
            className="w-full rounded-lg border p-3"
            disabled={!subjects.length}
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
            className="w-full rounded-lg border p-3"
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstName} {teacher.lastName}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="col-span-full mt-4 bg-blue-500 text-white hover:bg-blue-600"
            style={{ height: "50px", borderRadius: "25px" }}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Note"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default UpTeacherNotes;
