import React, { useState, useEffect } from "react";
import { Bus, Users, UserCheck } from "lucide-react";
import BusStaffForm from "../../../components/AdminComponents/BusStaffForm";
import PassengerForm from "../../../components/AdminComponents/PassengerForm";
import Sidebar from "../../../components/commonComponents/Sidebar";

import axios from "axios";

function Transport() {
  const [showBusForm, setShowBusForm] = useState(false);
  const [showStaffForm, setShowStaffForm] = useState(false);
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [busCount, setbusCount] = useState(0);
  const [busData, setBusData] = useState({
    busName: "",
    busNumber: "",
    route: "",
    capacity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchbusCount = async () => {
      try {
        const response = await axios.get("http://localhost:3300/buses/count");
        setbusCount(response.data.totalBuses); // Access the data directly
      } catch (error) {
        console.error("Error fetching bus count:", error);
        setError("Failed to fetch bus count. Please try again later.");
      }
    };

    fetchbusCount();
  }, []);

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
      const response = await axios.post("http://localhost:3300/buses", busData);
      alert("Bus added successfully!");
      setBusData({ busName: "", busNumber: "", route: "", capacity: "" });
      setShowBusForm(false); // Hide the form after submission
      fetchbusCount(); // Fetch the updated bus count
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add bus");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBusClick = () => {
    setShowBusForm(true);
    setShowStaffForm(false);
    setShowPassengerForm(false);
  };

  const handleAddStaffClick = () => {
    setShowBusForm(false);
    setShowStaffForm(true);
    setShowPassengerForm(false);
  };

  const handleAddPassengerClick = () => {
    setShowBusForm(false);
    setShowStaffForm(false);
    setShowPassengerForm(true);
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
              <p className="text-2xl font-bold text-blue-500">{busCount}</p>
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
              <p className="text-2xl font-bold text-green-500">25 --- 25</p>
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
              <h3 className="mb-4 text-xl font-semibold text-gray-800">
                Add Bus
              </h3>
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
          {showStaffForm && <BusStaffForm />}

          {/* Add Passenger Form */}
          {showPassengerForm && <PassengerForm />}
        </div>
      </div>
    </>
  );
}

export default Transport;
