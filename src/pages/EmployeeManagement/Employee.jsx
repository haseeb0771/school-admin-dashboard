import React, { useState } from "react";
import admin from "../../assets/admin.png";
import officeboy from "../../assets/officeboy.png";
import sweeper from "../../assets/sweeper.png";
import gaurd from "../../assets/gaurd.png";

export default function Employee() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showOfficeBoyForm, setShowOfficeBoyForm] = useState(false);
  const [showGaurdForm, setShowGaurdForm] = useState(false);
  const [showSweeperForm, setShowSweeperForm] = useState(false);

  const handleAddAdminClick = () => {
    setShowAdminForm(!showAdminForm); // Toggle form visibility
  };

  const handleAddOfficeBoyClick = () => {
    setShowOfficeBoyForm(!showOfficeBoyForm); // Toggle form visibility
  };

  const handleAddGaurdClick = () => {
    setShowGaurdForm(!showGaurdForm); // Toggle form visibility
  };

  const handleAddSweeperClick = () => {
    setShowSweeperForm(!showSweeperForm); // Toggle form visibility
  };
  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
          Employee Management
        </h1>
      </header>

      {/* Employee Count */}
      <div className="mt-6 flex justify-between gap-4">
        <div className="flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
          <img className="mt-3 h-12 w-12" src={admin} alt="" />
          <h2 className="mt-3 text-center text-2xl font-semibold text-gray-700">
            Admin Staff
          </h2>
          <p className="text-3xl font-bold text-blue-600 ">5</p>
        </div>

        <div className="flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
          <img className="mt-3 h-12 w-12" src={officeboy} alt="" />
          <h2 className="mt-3 text-center text-2xl font-semibold text-gray-700">
            Office Boys
          </h2>
          <p className="text-3xl font-bold text-blue-600 ">7</p>
        </div>

        <div className="flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
          <img className="mt-3 h-12 w-12" src={gaurd} alt="" />
          <h2 className="mt-3 text-center text-2xl font-semibold text-gray-700">
            Guards
          </h2>
          <p className="text-3xl font-bold text-blue-600">13</p>
        </div>

        <div className="flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
          <img className="mt-3 h-12 w-12" src={sweeper} alt="" />
          <h2 className="mt-3 text-center text-2xl font-semibold text-gray-700">
            Sweepers
          </h2>
          <p className="text-3xl font-bold text-blue-600">3</p>
        </div>
      </div>

      {/* Add Button */}
      <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={handleAddAdminClick}
          className=" flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4  shadow-lg transition-shadow hover:shadow-xl"
        >
          <h2 className="text-1xl mt-3 text-center font-semibold text-gray-700">
            Add Admin
          </h2>
        </button>

        <button
          onClick={handleAddOfficeBoyClick}
          className="flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl"
        >
          <h2 className="text-1xl mt-3 text-center font-semibold text-gray-700">
            Add Office Boys
          </h2>
        </button>

        <button
          onClick={handleAddGaurdClick}
          className="flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl"
        >
          <h2 className="text-1xl mt-3 text-center font-semibold text-gray-700">
            Add Gaurds
          </h2>
        </button>

        <button
          onClick={handleAddSweeperClick}
          className="flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl"
        >
          <h2 className="text-1xl mt-3 text-center font-semibold text-gray-700">
            Add Sweepers
          </h2>
        </button>
      </div>

      {showAdminForm && (
        <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Add Admin
          </h3>
          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/3">
                <label htmlFor="busName" className="block text-gray-700">
                  First-Name :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Last-Name :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Phone :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/3">
                <label htmlFor="busName" className="block text-gray-700">
                  WhatsApp :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Qualificaion :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Rank :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-screen">
                <label htmlFor="busName" className="block text-gray-700">
                  Address :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/3">
                <label htmlFor="busName" className="block text-gray-700">
                  Person-Image :
                </label>
                <input
                  type="file"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Degree-Image :
                </label>
                <input
                  type="file"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  I'd Card :
                </label>
                <input
                  type="file"
                  className="mt-2 w-full  rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 h-10 w-full rounded-lg bg-blue-500 text-white hover:bg-blue-400"
            ></button>
          </form>
        </div>
      )}

      {/* Add Staff Form */}
      {showOfficeBoyForm && (
        <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Add Office Boy
          </h3>

          <form className="space-y-4">
            {/* Staff Name & Role */}
            <div className="flex gap-4">
              <div className="w-1/3">
                <label htmlFor="busName" className="block text-gray-700">
                  First-Name :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Last-Name :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Phone :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/3">
                <label htmlFor="busName" className="block text-gray-700">
                  WhatsApp :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Address :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/3">
                <label htmlFor="busName" className="block text-gray-700">
                  Person-Image :
                </label>
                <input
                  type="file"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  I'd Card :
                </label>
                <input
                  type="file"
                  className="mt-2 w-full  rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
            </div>

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
      {showGaurdForm && (
        <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Add Gaurd
          </h3>

          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/3">
                <label htmlFor="busName" className="block text-gray-700">
                  First-Name :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Last-Name :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Phone :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/3">
                <label htmlFor="busName" className="block text-gray-700">
                  WhatsApp :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Address :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="busName" className="block text-gray-700">
                  Person-Image :
                </label>
                <input
                  type="file"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="busNumber" className="block text-gray-700">
                  I'd Card :
                </label>
                <input
                  type="file"
                  className="mt-2 w-full  rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
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

      {showSweeperForm && (
        <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Add Sweeper
          </h3>

          <form className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/3">
                <label htmlFor="busName" className="block text-gray-700">
                  First-Name :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Last-Name :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
              <div className="w-1/3">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Phone :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/3">
                <label htmlFor="busName" className="block text-gray-700">
                  WhatsApp :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="busNumber" className="block text-gray-700">
                  Address :
                </label>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="busName" className="block text-gray-700">
                  Person-Image :
                </label>
                <input
                  type="file"
                  className="mt-2 w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus name"
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="busNumber" className="block text-gray-700">
                  I'd Card :
                </label>
                <input
                  type="file"
                  className="mt-2 w-full  rounded-md border border-gray-300 p-2"
                  placeholder="Enter bus number"
                  required
                />
              </div>
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
