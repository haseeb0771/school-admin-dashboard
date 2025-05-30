import React, { useState } from "react";
import { FileText, Upload, BookOpen, FileArchive } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/commonComponents/Sidebar";

function Notes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Math Lecture 1",
      subject: "Mathematics",
      class: "10A",
      type: "Notes by Teacher",
    },
    {
      id: 2,
      title: "Physics Textbook",
      subject: "Physics",
      class: "11B",
      type: "Textbook",
    },

    {
      id: 3,
      title: "Chemistry Past Paper",
      subject: "Chemistry",
      class: "12C",
      type: "Past Papers",
    },
  ]);

  const handleUpload = (type) => {
    console.log(`Redirecting to upload ${type}`);
    // Add navigation logic here
  };

  return (
    <>
      {" "}
      <div className="flex h-screen">
        <div className="w-64">
          <Sidebar />
        </div>

        <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Notes
            </h1>
          </header>

          {/* CTA Sections */}
          <div className="mt-6 flex justify-between gap-4">
            <div className="hover flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:scale-105 hover:shadow-lg">
              <FileText className="mb-2 h-8 w-8 text-blue-500" />
              <h2 className="text-center text-lg font-semibold text-gray-700">
                Notes by Teachers
              </h2>
              <Link
                to="/teachernotes"
                className="mt-4 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600"
              >
                Upload
              </Link>
            </div>

            <div className="hover flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:scale-105 hover:shadow-lg">
              <BookOpen className="mb-2 h-8 w-8 text-green-500" />
              <h2 className="text-center text-lg font-semibold text-gray-700">
                PDF Textbooks
              </h2>
              <Link
                to="/textbooks"
                className="mt-4 rounded bg-green-500 py-2 px-4 text-white hover:bg-green-600"
              >
                Upload
              </Link>
            </div>

            <div className="hover flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:scale-105 hover:shadow-lg">
              <FileArchive className="mb-2 h-8 w-8 text-red-500" />
              <h2 className="text-center text-lg font-semibold text-gray-700">
                Past Papers
              </h2>
              <Link
                to="/pastpapers"
                className="mt-4 rounded bg-red-500 py-2 px-4 text-white hover:bg-red-600"
              >
                Upload
              </Link>
            </div>
          </div>

          {/* Recently Uploaded Notes */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-700">
              Recently Uploaded Notes
            </h2>
            {notes.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-lg border border-gray-200 p-4 shadow-sm"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {note.title}
                      </h3>
                      {note.type === "Notes by Teacher" && (
                        <FileText className="h-8 w-8 text-blue-500" />
                      )}
                      {note.type === "Textbook" && (
                        <BookOpen className="h-8 w-8 text-green-500" />
                      )}
                      {note.type === "Past Papers" && (
                        <FileArchive className="h-8 w-8 text-red-500" />
                      )}
                    </div>
                    <p className="text-gray-600">
                      <strong>Subject:</strong> {note.subject}
                    </p>
                    <p className="text-gray-600">
                      <strong>Class:</strong> {note.class}
                    </p>
                    <p className="text-gray-600">
                      <strong>Type:</strong> {note.type}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No notes uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
