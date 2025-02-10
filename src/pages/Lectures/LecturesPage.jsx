import React from "react";
import { Card, Title, ColGrid, Block, Text, Button } from "@tremor/react";
import thumbnail from "../../assets/thumbnail.jpg";
import { Link } from "react-router-dom";

function LecturesPage() {
  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="ie-na-header flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-4xl">
          Lectures
        </h1>
      </header>

      <div className="mt-10 flex flex-col gap-8 xl:flex-row">
        {/* Upload Lecture Section */}
        <div className="border-grey from-white-600 to-white-900 flex-1 rounded-2xl border bg-gradient-to-r py-10 px-6 text-center text-black shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">Upload Lecture</h2>
          <p className="mb-6 text-lg">
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
        <div className="border-grey from-white-600 to-white-900 flex-1 rounded-2xl border bg-gradient-to-r py-10 px-6 text-center text-black shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">All Lectures</h2>
          <p className="mb-6 text-lg">
            Browse through all the lectures and manage your content.
          </p>
          <button
            to="/alllectures"
            className="rounded-xl border border-gray-300 bg-white py-3 px-8 font-semibold text-blue-600 shadow-lg transition duration-300 hover:bg-gray-100"
          >
            View Lectures
          </button>
        </div>
      </div>

      {/* Recently Uploaded Lectures Section */}
      <div className="border-grey from-white-500 to-white-500 mt-12 rounded-2xl border bg-gradient-to-r py-8 px-6 text-black shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">Recently Uploaded Lectures</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-grey bg-white-600 rounded-lg border p-4 shadow-sm">
            <img
              src={thumbnail}
              alt="Lecture Thumbnail"
              className="border-grey mb-3 h-32 w-full rounded-md border object-cover "
            />

            <h3 className="text-lg font-semibold">Lecture Title</h3>
            <p className="text-sm">Class: Class </p>
            <p className="text-sm">Subject: Subject </p>
            <p className="text-sm">Uploaded on: Jan , 2025</p>
          </div>
          <div className="border-grey bg-white-600 rounded-lg border p-4 shadow-sm">
            <img
              src={thumbnail}
              alt="Lecture Thumbnail"
              className="border-grey mb-3 h-32 w-full rounded-md border object-cover "
            />

            <h3 className="text-lg font-semibold">Lecture Title</h3>
            <p className="text-sm">Class: Class </p>
            <p className="text-sm">Subject: Subject </p>
            <p className="text-sm">Uploaded on: Jan , 2025</p>
          </div>
          <div className="border-grey bg-white-600 rounded-lg border p-4 shadow-sm">
            <img
              src={thumbnail}
              alt="Lecture Thumbnail"
              className="border-grey mb-3 h-32 w-full rounded-md border object-cover "
            />

            <h3 className="text-lg font-semibold">Lecture Title</h3>
            <p className="text-sm">Class: Class </p>
            <p className="text-sm">Subject: Subject </p>
            <p className="text-sm">Uploaded on: Jan , 2025</p>
          </div>
          <div className="border-grey bg-white-600 rounded-lg border p-4 shadow-sm">
            <img
              src={thumbnail}
              alt="Lecture Thumbnail"
              className="border-grey mb-3 h-32 w-full rounded-md border object-cover "
            />

            <h3 className="text-lg font-semibold">Lecture Title</h3>
            <p className="text-sm">Class: Class </p>
            <p className="text-sm">Subject: Subject </p>
            <p className="text-sm">Uploaded on: Jan , 2025</p>
          </div>
          <div className="border-grey bg-white-600 rounded-lg border p-4 shadow-sm">
            <img
              src={thumbnail}
              alt="Lecture Thumbnail"
              className="border-grey mb-3 h-32 w-full rounded-md border object-cover "
            />

            <h3 className="text-lg font-semibold">Lecture Title</h3>
            <p className="text-sm">Class: Class </p>
            <p className="text-sm">Subject: Subject </p>
            <p className="text-sm">Uploaded on: Jan , 2025</p>
          </div>
          <div className="border-grey bg-white-600 rounded-lg border p-4 shadow-sm">
            <img
              src={thumbnail}
              alt="Lecture Thumbnail"
              className="border-grey mb-3 h-32 w-full rounded-md border object-cover "
            />

            <h3 className="text-lg font-semibold">Lecture Title</h3>
            <p className="text-sm">Class: Class </p>
            <p className="text-sm">Subject: Subject </p>
            <p className="text-sm">Uploaded on: Jan , 2025</p>
          </div>
          <div className="border-grey bg-white-600 rounded-lg border p-4 shadow-sm">
            <img
              src={thumbnail}
              alt="Lecture Thumbnail"
              className="border-grey mb-3 h-32 w-full rounded-md border object-cover "
            />

            <h3 className="text-lg font-semibold">Lecture Title</h3>
            <p className="text-sm">Class: Class </p>
            <p className="text-sm">Subject: Subject </p>
            <p className="text-sm">Uploaded on: Jan , 2025</p>
          </div>
          <div className="border-grey bg-white-600 rounded-lg border p-4 shadow-sm">
            <img
              src={thumbnail}
              alt="Lecture Thumbnail"
              className="border-grey mb-3 h-32 w-full rounded-md border object-cover "
            />

            <h3 className="text-lg font-semibold">Lecture Title</h3>
            <p className="text-sm">Class: Class </p>
            <p className="text-sm">Subject: Subject </p>
            <p className="text-sm">Uploaded on: Jan , 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturesPage;
