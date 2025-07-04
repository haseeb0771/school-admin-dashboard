import React, { useState, useEffect } from "react";
import admin from "../../../assets/admin.png";
import officeboy from "../../../assets/officeboy.png";
import sweeper from "../../../assets/sweeper.png";
import gaurd from "../../../assets/gaurd.png";
import AdminStaffForm from "../../../components/AdminComponents/AdminStaffForm";
import OfficeBoyForm from "../../../components/AdminComponents/OfficeBoyForm";
import GaurdForm from "../../../components/AdminComponents/GaurdForm";
import JanitorForm from "../../../components/AdminComponents/JanitorForm";
import AdminStaffList from "../../../components/AdminComponents/AdminStaffList";
import OfficeBoyList from "../../../components/AdminComponents/OfficeBoyList";
import GaurdList from "../../../components/AdminComponents/GaurdList";
import JanitorList from "../../../components/AdminComponents/JanitorList";
import Sidebar from "../../../components/commonComponents/Sidebar";

export default function Employee() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showAdminList, setShowAdminList] = useState(false);

  const [showOfficeBoyForm, setShowOfficeBoyForm] = useState(false);
  const [showOfficeBoyList, setShowOfficeBoyList] = useState(false);

  const [showGaurdForm, setShowGaurdForm] = useState(false);
  const [showGaurdList, setShowGaurdList] = useState(false);

  const [showJanitorForm, setShowJanitorForm] = useState(false);
  const [showJanitorList, setShowJanitorList] = useState(false);

  const [guardCount, setGuardCount] = useState(0);
  const [adminStaffCount, setAdminStaffCount] = useState(0);
  const [officeBoyCount, setOfficeBoyCount] = useState(0);
  const [janitorCount, setJanitorCount] = useState(0);

  const handleAddAdminFormClick = () => {
    setShowAdminForm((prev) => !prev);
    setShowAdminList(false);
    setShowOfficeBoyForm(false);
    setShowOfficeBoyList(false);
    setShowGaurdForm(false);
    setShowGaurdList(false);
    setShowJanitorForm(false);
    setShowJanitorList(false);
  };

  const handleAdminListClick = () => {
    setShowAdminList((prev) => !prev);
    setShowAdminForm(false);
    setShowOfficeBoyForm(false);
    setShowOfficeBoyList(false);
    setShowGaurdForm(false);
    setShowGaurdList(false);
    setShowJanitorForm(false);
    setShowJanitorList(false);
  };

  const handleAddOfficeBoyFormClick = () => {
    setShowOfficeBoyForm((prev) => !prev);
    setShowAdminForm(false);
    setShowAdminList(false);
    setShowOfficeBoyList(false);
    setShowGaurdForm(false);
    setShowGaurdList(false);
    setShowJanitorForm(false);
    setShowJanitorList(false);
  };

  const handleOfficeBoyListClick = () => {
    setShowOfficeBoyList((prev) => !prev);
    setShowAdminForm(false);
    setShowAdminList(false);
    setShowOfficeBoyForm(false);
    setShowGaurdForm(false);
    setShowGaurdList(false);
    setShowJanitorForm(false);
    setShowJanitorList(false);
  };

  const handleAddGaurdFormClick = () => {
    setShowGaurdForm((prev) => !prev);
    setShowAdminForm(false);
    setShowAdminList(false);
    setShowOfficeBoyForm(false);
    setShowOfficeBoyList(false);
    setShowGaurdList(false);
    setShowJanitorForm(false);
    setShowJanitorList(false);
  };

  const handleGaurdListClick = () => {
    setShowGaurdList((prev) => !prev);
    setShowAdminForm(false);
    setShowAdminList(false);
    setShowOfficeBoyForm(false);
    setShowOfficeBoyList(false);
    setShowGaurdForm(false);
    setShowJanitorForm(false);
    setShowJanitorList(false);
  };

  const handleAddJanitorFormClick = () => {
    setShowJanitorForm((prev) => !prev);
    setShowAdminForm(false);
    setShowAdminList(false);
    setShowOfficeBoyForm(false);
    setShowOfficeBoyList(false);
    setShowGaurdForm(false);
    setShowGaurdList(false);
    setShowJanitorList(false);
  };

  // Toggle Janitor List
  const handleJanitorListClick = () => {
    setShowJanitorList((prev) => !prev);
    setShowAdminForm(false);
    setShowAdminList(false);
    setShowOfficeBoyForm(false);
    setShowOfficeBoyList(false);
    setShowGaurdForm(false);
    setShowGaurdList(false);
    setShowJanitorForm(false);
  };

  const fetchGuardCount = async () => {
    try {
      const response = await fetch(
        "http://localhost:3300/employees/gaurd/count"
      );
      const data = await response.json();
      setGuardCount(data.count);
    } catch (error) {
      console.error("Error fetching guard count:", error);
    }
  };
  const fetchOfficeBoyCount = async () => {
    try {
      const response = await fetch(
        "http://localhost:3300/employees/office-boy/count"
      );
      const data = await response.json();
      setOfficeBoyCount(data.count);
    } catch (error) {
      console.error("Error fetching office boy count:", error);
    }
  };
  const fetchAdminStaffCount = async () => {
    try {
      const response = await fetch(
        "http://localhost:3300/employees/admin/count"
      );
      const data = await response.json();
      setAdminStaffCount(data.count);
    } catch (error) {
      console.error("Error fetching admin staff count:", error);
    }
  };
  const fetchJanitorCount = async () => {
    try {
      const response = await fetch(
        "http://localhost:3300/employees/janitor/count"
      );
      const data = await response.json();
      setJanitorCount(data.count);
    } catch (error) {
      console.error("Error fetching janitor count:", error);
    }
  };

  useEffect(() => {
    fetchJanitorCount();
    fetchGuardCount();
    fetchOfficeBoyCount();
    fetchAdminStaffCount();
  }, []);

  return (
    <>
      {" "}
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
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
              <p className="text-3xl font-bold text-blue-600">
                {adminStaffCount}
              </p>
            </div>

            <div className="h-auto w-px bg-gray-400"></div>

            <div className="flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
              <img className="mt-3 h-12 w-12" src={officeboy} alt="" />
              <h2 className="mt-3 text-center text-2xl font-semibold text-gray-700">
                Office Boys
              </h2>
              <p className="text-3xl font-bold text-blue-600">
                {officeBoyCount}
              </p>
            </div>

            <div className="h-auto w-px bg-gray-400"></div>

            <div className="flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
              <img className="mt-3 h-12 w-12" src={gaurd} alt="" />
              <h2 className="mt-3 text-center text-2xl font-semibold text-gray-700">
                Guards
              </h2>
              <p className="text-3xl font-bold text-blue-600">{guardCount}</p>
            </div>

            <div className="h-auto w-px bg-gray-400"></div>

            <div className="flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
              <img className="mt-3 h-12 w-12" src={sweeper} alt="" />
              <h2 className="mt-3 text-center text-2xl font-semibold text-gray-700">
                Janitors
              </h2>
              <p className="text-3xl font-bold text-blue-600">{janitorCount}</p>
            </div>
          </div>

          {/* Add Button */}
          <div className="mt-2 flex justify-between gap-4">
            <button
              onClick={handleAddAdminFormClick}
              className={`hover flex w-1/3 flex-col items-center rounded-lg border ${
                showAdminForm
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-200"
              } bg-white p-4 shadow-lg transition-shadow hover:scale-105 hover:shadow-xl`}
            >
              <h2
                className={`text-center text-sm font-semibold text-gray-700 ${
                  showAdminForm ? "text-blue-500" : "text-gray-700"
                }`}
              >
                Add New{" "}
                <span className="text-2xl font-bold">
                  {showAdminForm ? "↑" : "↓"}
                </span>
              </h2>
            </button>
            <button
              onClick={handleAdminListClick}
              className={`hover flex w-1/3 flex-col items-center rounded-lg border ${
                showAdminList ? "border-blue-500" : "border-gray-200"
              } bg-white p-4 shadow-lg transition-shadow hover:scale-105 hover:shadow-xl`}
            >
              <h2
                className={`text-center text-sm font-semibold text-gray-700 ${
                  showAdminList ? "text-blue-500" : "text-gray-700"
                }`}
              >
                View All{" "}
                <span className="text-2xl font-bold">
                  {showAdminList ? "↑" : "↓"}
                </span>
              </h2>
            </button>

            <div className="h-auto w-px bg-gray-400"></div>

            <button
              onClick={handleAddOfficeBoyFormClick}
              className={`hover flex w-1/3 flex-col items-center rounded-lg border ${
                showOfficeBoyForm ? "border-blue-500" : "border-gray-200"
              } bg-white p-4 shadow-lg transition-shadow hover:scale-105 hover:shadow-xl`}
            >
              <h2
                className={`text-center text-sm font-semibold text-gray-700 ${
                  showOfficeBoyForm ? "text-blue-500" : "text-gray-700"
                }`}
              >
                Add New{" "}
                <span className="text-2xl font-bold">
                  {showOfficeBoyForm ? "↑" : "↓"}
                </span>
              </h2>
            </button>
            <button
              onClick={handleOfficeBoyListClick}
              className={`hover flex w-1/3 flex-col items-center rounded-lg border ${
                showOfficeBoyList ? "border-blue-500" : "border-gray-200"
              } bg-white p-4 shadow-lg transition-shadow hover:scale-105 hover:shadow-xl`}
            >
              <h2
                className={`text-center text-sm font-semibold text-gray-700 ${
                  showOfficeBoyList ? "text-blue-500" : "text-gray-700"
                }`}
              >
                View All{" "}
                <span className="text-2xl font-bold">
                  {showOfficeBoyList ? "↑" : "↓"}
                </span>
              </h2>
            </button>

            <div className="h-auto w-px bg-gray-400"></div>

            <button
              onClick={handleAddGaurdFormClick}
              className={`hover rounded-s-lg flex w-1/3 flex-col items-center border ${
                showGaurdForm ? "border-blue-500" : "border-gray-200"
              } bg-white p-4 shadow-lg transition-shadow hover:scale-105 hover:shadow-xl`}
            >
              <h2
                className={`text-center text-sm font-semibold text-gray-700 ${
                  showGaurdForm ? "text-blue-500" : "text-gray-700"
                }`}
              >
                Add New{" "}
                <span className="text-2xl font-bold">
                  {showGaurdForm ? "↑" : "↓"}
                </span>
              </h2>
            </button>
            <button
              onClick={handleGaurdListClick}
              className={`hover flex w-1/3 flex-col items-center rounded-lg border ${
                showGaurdList ? "border-blue-500" : "border-gray-200"
              } bg-white p-4 shadow-lg transition-shadow hover:scale-105 hover:shadow-xl`}
            >
              <h2
                className={`text-center text-sm font-semibold text-gray-700 ${
                  showGaurdList ? "text-blue-500" : "text-gray-700"
                }`}
              >
                View All{" "}
                <span className="text-2xl font-bold">
                  {showGaurdList ? "↑" : "↓"}
                </span>
              </h2>
            </button>

            <div className="h-auto w-px bg-gray-400"></div>

            <button
              onClick={handleAddJanitorFormClick}
              className={`hover rounded-e-lg flex w-1/3 flex-col items-center border ${
                showJanitorForm ? "border-blue-500" : "border-gray-200"
              } bg-white p-4 shadow-lg transition-shadow hover:scale-105 hover:shadow-xl`}
            >
              <h2
                className={`text-center text-sm font-semibold text-gray-700 ${
                  showJanitorForm ? "text-blue-500" : "text-gray-700"
                }`}
              >
                Add New{" "}
                <span className="text-2xl font-bold">
                  {showJanitorForm ? "↑" : "↓"}
                </span>
              </h2>
            </button>
            <button
              onClick={handleJanitorListClick}
              className={`hover flex w-1/3 flex-col items-center rounded-lg border ${
                showJanitorList ? "border-blue-500" : "border-gray-200"
              } bg-white p-4 shadow-lg transition-shadow hover:scale-105 hover:shadow-xl`}
            >
              <h2
                className={`text-center text-sm font-semibold text-gray-700 ${
                  showJanitorList ? "text-blue-500" : "text-gray-700"
                }`}
              >
                View All{" "}
                <span className="text-2xl font-bold">
                  {showJanitorList ? "↑" : "↓"}
                </span>
              </h2>
            </button>
          </div>

          {/* Forms */}
          {showAdminForm && (
            <AdminStaffForm
              setShowAdminForm={setShowAdminForm}
              fetchAdminStaffCount={fetchAdminStaffCount}
              setShowAdminList={setShowAdminList}
            />
          )}
          {showOfficeBoyForm && (
            <OfficeBoyForm
              setShowOfficeBoyForm={setShowOfficeBoyForm}
              fetchOfficeBoyCount={fetchOfficeBoyCount}
              setShowOfficeBoyList={setShowOfficeBoyList}
            />
          )}
          {showGaurdForm && (
            <GaurdForm
              setShowGaurdForm={setShowGaurdForm}
              fetchGuardCount={fetchGuardCount}
              setShowGaurdList={setShowGaurdList}
            />
          )}
          {showJanitorForm && (
            <JanitorForm
              setShowJanitorForm={setShowJanitorForm}
              fetchJanitorCount={fetchJanitorCount}
              setShowJanitorList={setShowJanitorList}
            />
          )}

          {/* Lists */}
          {showAdminList && <AdminStaffList />}
          {showOfficeBoyList && <OfficeBoyList />}
          {showGaurdList && <GaurdList />}
          {showJanitorList && <JanitorList />}
        </div>
      </div>
    </>
  );
}
