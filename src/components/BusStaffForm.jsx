import React from "react";
import { useState } from "react";

function BusStaff() {
  const [role, setRole] = useState(""); // State to track selected role

  return (
    <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">Add Staff</h3>
      <form className="space-y-4">
        {/* Staff Name & Role */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="staffName" className="block text-gray-700">
              Staff Full-Name:
            </label>
            <input
              type="text"
              id="staffName"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="staffRole" className="block text-gray-700">
              Staff Role:
            </label>
            <select
              id="staffRole"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              onChange={(e) => setRole(e.target.value)} // Update state on selection
            >
              <option value="">Select Role</option>
              <option value="driver">Driver</option>
              <option value="conductor">Conductor</option>
            </select>
          </div>
        </div>

        {/* Staff Phone & ID Card */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="staffPhone" className="block text-gray-700">
              Staff Phone:
            </label>
            <input
              type="text"
              id="staffPhone"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="staffIdCard" className="block text-gray-700">
              Staff ID Card:
            </label>
            <input
              type="text"
              id="staffIdCard"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>

        {/* Staff Religion & Blood Group */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="staffReligion" className="block text-gray-700">
              Staff Religion:
            </label>
            <input
              type="text"
              id="staffReligion"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="staffBloodGroup" className="block text-gray-700">
              Staff Blood Group:
            </label>
            <input
              type="text"
              id="staffBloodGroup"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>

        {/* Staff Gender */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="staffGender" className="block text-gray-700">
              Staff Gender:
            </label>
            <select
              id="staffGender"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="w-1/2">
            <label htmlFor="staffBloodGroup" className="block text-gray-700">
              Staff Sallary:
            </label>
            <input
              type="text"
              id="staffBloodGroup"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>

        {/* Staff Image & ID Card Upload */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="staffImage" className="block text-gray-700">
              Staff Image:
            </label>
            <input
              type="file"
              id="staffImage"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="staffIdCardUpload" className="block text-gray-700">
              Upload Staff ID Card:
            </label>
            <input
              type="file"
              id="staffIdCardUpload"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="staffBloodGroup" className="block text-gray-700">
            Staff Address:
          </label>
          <input
            type="text"
            id="staffBloodGroup"
            className="mt-2 w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        {/* 🚗 Driver License Upload - Shown only if Role is "Driver" */}
        {role === "driver" && (
          <div>
            <label htmlFor="staffLicense" className="block text-gray-700">
              Driver's License:
            </label>
            <input
              type="file"
              id="staffLicense"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-9 h-10 w-full rounded-lg bg-green-500 text-white hover:bg-green-400"
        >
          Save Staff
        </button>
      </form>
    </div>
  );
}

export default BusStaff;
