import React, { useState } from "react";
import { Bus, Users, UserCheck } from "lucide-react";
import axios from "axios";

function Transport() {
  const [showBusForm, setShowBusForm] = useState(false);
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [role, setRole] = useState(""); // State to track selected role
  const [busData, setBusData] = useState({
    busName: "",
    busNumber: "",
    route: "",
    capacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setBusData({ ...busData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/buses",
        busData
      );
      alert("Bus added successfully!");
      setBusData({ busName: "", busNumber: "", route: "", capacity: "" }); // Clear form
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add bus");
    } finally {
      setLoading(false);
    }
  };
  const handleAddBusClick = () => {
    setShowBusForm(!showBusForm); // Toggle form visibility
  };

  const handleAddStaffClick = () => {
    setShowStaffForm(!showStaffForm); // Toggle form visibility
  };

  const handleAddPassengerClick = () => {
    setShowPassengerForm(!showPassengerForm); // Toggle form visibility
  };

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
          Transport Management
        </h1>
      </header>

      {/* CTA Sections */}
      <div className="mt-6 flex justify-between gap-4">
        {/* Total Buses */}
        <div className="flex w-1/3 flex-col items-center rounded-lg border border-blue-500 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
          <Bus className="mb-2 h-10 w-10 text-blue-500" />
          <h2 className="text-center text-lg font-semibold text-gray-700">
            Total Buses
          </h2>
          <p className="text-2xl font-bold text-blue-500">15</p>
          <button
            onClick={handleAddBusClick}
            className="hover h-9 w-full rounded-lg bg-blue-500 text-white hover:scale-105 hover:bg-blue-400 "
          >
            Add Bus
          </button>
        </div>

        {/* Staff Members */}
        <div className="flex w-1/3 flex-col items-center rounded-lg border border-green-500 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
          <Users className="mb-2 h-10 w-10 text-green-500" />
          <h2 className="text-center text-lg font-semibold text-gray-700">
            Staff (Drivers & Conductors)
          </h2>
          <p className="text-2xl font-bold text-green-500">25</p>
          <button
            onClick={handleAddStaffClick}
            className="hover h-9 w-full rounded-lg bg-green-500 text-white hover:scale-105 hover:bg-green-400 "
          >
            Add Staff
          </button>
        </div>

        {/* Students Using Transport */}
        <div className="flex w-1/3 flex-col items-center rounded-lg border border-purple-500 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
          <UserCheck className="mb-2 h-10 w-10 text-purple-500" />
          <h2 className="text-center text-lg font-semibold text-gray-700">
            Students Using Transport
          </h2>
          <p className="text-2xl font-bold text-purple-500">200</p>
          <button
            onClick={handleAddPassengerClick}
            className="hover h-9 w-full rounded-lg bg-purple-500 text-white hover:scale-105 hover:bg-purple-400 "
          >
            Add Passenger
          </button>
        </div>
      </div>

      {/* Add Bus Form */}
      {showBusForm && (
        <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Add Bus</h3>
          {error && <p className="font-extrabold text-red-500">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="busName" className="block text-gray-700">
                  Bus Name:
                </label>
                <input
                  type="text"
                  id="busName"
                  value={busData.busName}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Bus Number:
                </label>
                <input
                  type="text"
                  id="busNumber"
                  value={busData.busNumber}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="route" className="block text-gray-700">
                  Bus Route:
                </label>
                <input
                  type="text"
                  id="route"
                  value={busData.route}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter route"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="capacity" className="block text-gray-700">
                  Bus Capacity:
                </label>
                <input
                  type="number"
                  id="capacity"
                  value={busData.capacity}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus capacity"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 h-10 w-full rounded-lg bg-blue-500 text-white hover:bg-blue-400"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Bus"}
            </button>
          </form>
        </div>
      )}

      {/* Add Staff Form */}
      {showStaffForm && (
        <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Add Staff
          </h3>
          {error && <p className="font-extrabold text-red-500">{error}</p>}
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
                <label
                  htmlFor="staffBloodGroup"
                  className="block text-gray-700"
                >
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
                <label
                  htmlFor="staffBloodGroup"
                  className="block text-gray-700"
                >
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
                <label
                  htmlFor="staffIdCardUpload"
                  className="block text-gray-700"
                >
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
      )}

      {/* Add Passenger Form */}
      {showPassengerForm && (
        <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Add Passenger
          </h3>
          {error && <p className="font-extrabold text-red-500">{error}</p>}
          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="passengerName" className="block text-gray-700">
                  Passenger Name:
                </label>
                <input
                  type="text"
                  id="passengerName"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter passenger name"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="passengerClass" className="block text-gray-700">
                  Class:
                </label>
                <input
                  type="text"
                  id="passengerClass"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter passenger's class"
                />
              </div>
            </div>

            <div>
              <label htmlFor="passengerBus" className="block text-gray-700">
                Bus Number:
              </label>
              <input
                type="text"
                id="passengerBus"
                className="mt-2 w-full rounded-md border border-gray-300 p-2"
                placeholder="Enter bus number"
              />
            </div>

            <button
              type="submit"
              className="mt-4 h-10 w-full rounded-lg bg-purple-500 text-white hover:bg-purple-400"
            >
              Save Passenger
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Transport;
