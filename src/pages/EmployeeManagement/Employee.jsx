import React, { useState, useEffect } from "react";
import admin from "../../assets/admin.png";
import officeboy from "../../assets/officeboy.png";
import sweeper from "../../assets/sweeper.png";
import gaurd from "../../assets/gaurd.png";
import AdminStaffForm from "../../components/AdminStaffForm";
import OfficeBoyForm from "../../components/OfficeBoyForm";
import GaurdForm from "../../components/GaurdForm";
import JanitorForm from "../../components/JanitorForm";
import AdminStaffList from "../../components/AdminStaffList";
import OfficeBoyList from "../../components/OfficeBoyList";
import GaurdList from "../../components/GaurdList";
import JanitorList from "../../components/JanitorList";

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

  // Toggle Admin Form
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

  // Toggle Admin List
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

  // Toggle Office Boy Form
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

  // Toggle Office Boy List
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

  // Toggle Guard Form
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

  // Toggle Guard List
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

  // Toggle Janitor Form
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

  // Fetch counts
  useEffect(() => {
    const fetchGuardCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/guards/count");
        const data = await response.json();
        setGuardCount(data.count);
      } catch (error) {
        console.error("Error fetching guard count:", error);
      }
    };

    fetchGuardCount();
  }, []);

  useEffect(() => {
    const fetchAdminStaffCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin-staff/count"
        );
        const data = await response.json();
        setAdminStaffCount(data.count);
      } catch (error) {
        console.error("Error fetching admin staff count:", error);
      }
    };

    fetchAdminStaffCount();
  }, []);

  useEffect(() => {
    const fetchOfficeBoyCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/officeBoy/count"
        );
        const data = await response.json();
        setOfficeBoyCount(data.count);
      } catch (error) {
        console.error("Error fetching office boy count:", error);
      }
    };

    fetchOfficeBoyCount();
  }, []);

  useEffect(() => {
    const fetchJanitorCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/janitors/count"
        );
        const data = await response.json();
        setJanitorCount(data.count);
      } catch (error) {
        console.error("Error fetching janitor count:", error);
      }
    };

    fetchJanitorCount();
  }, []);

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
          <p className="text-3xl font-bold text-blue-600">{adminStaffCount}</p>
        </div>

        <div className="h-auto w-px bg-gray-400"></div>

        <div className="flex w-1/3 flex-col items-center rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
          <img className="mt-3 h-12 w-12" src={officeboy} alt="" />
          <h2 className="mt-3 text-center text-2xl font-semibold text-gray-700">
            Office Boys
          </h2>
          <p className="text-3xl font-bold text-blue-600">{officeBoyCount}</p>
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
            showAdminForm ? "border-blue-500 text-blue-500" : "border-gray-200"
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
          onFormSubmit={() => {
            setShowAdminForm(false);
            fetchAdminStaffCount();
          }}
        />
      )}
      {showOfficeBoyForm && (
        <OfficeBoyForm
          onFormSubmit={() => {
            setShowOfficeBoyForm(false);
            fetchOfficeBoyCount();
          }}
        />
      )}
      {showGaurdForm && (
        <GaurdForm
          onFormSubmit={() => {
            setShowGaurdForm(false);
            fetchGuardCount();
          }}
        />
      )}
      {showJanitorForm && (
        <JanitorForm
          onFormSubmit={() => {
            setShowJanitorForm(false);
            fetchJanitorCount();
          }}
        />
      )}

      {/* Lists */}
      {showAdminList && <AdminStaffList />}
      {showOfficeBoyList && <OfficeBoyList />}
      {showGaurdList && <GaurdList />}
      {showJanitorList && <JanitorList />}
    </div>
  );
}
