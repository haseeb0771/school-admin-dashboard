import React, { useState } from "react";
import Sidebar from "../../components/commonComponents/Sidebar";
import OfficeBoyList from "../../components/AdminComponents/OfficeBoyList";
import JanitorList from "../../components/AdminComponents/JanitorList";
import GaurdList from "../../components/AdminComponents/GaurdList";
import AdminStaffList from "../../components/AdminComponents/AdminStaffList";
import {
  UserGroupIcon, // Admin staff
  ShieldCheckIcon, // Security guards
  SparklesIcon, // Janitorial staff
  ClipboardIcon, // Office assistants
} from "@heroicons/react/24/outline";

function StaffManagement() {
  // State to track active view
  const [activeView, setActiveView] = useState("admins");

  // View options data with icons
  const viewOptions = [
    {
      id: "admins",
      label: "Admin Staff",
      component: <AdminStaffList />,
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
    {
      id: "guards",
      label: "Security Guards",
      component: <GaurdList />,
      icon: <ShieldCheckIcon className="h-5 w-5" />,
    },
    {
      id: "janitors",
      label: "Janitorial Staff",
      component: <JanitorList />,
      icon: <SparklesIcon className="h-5 w-5" />,
    },
    {
      id: "officeboys",
      label: "Office Assistants",
      component: <OfficeBoyList />,
      icon: <ClipboardIcon className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="mb-8 flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Staff Management
            </h1>
          </header>

          {/* View Selection CTA Boxes with Icons */}
          <div className="mb-8 flex flex-wrap gap-4">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveView(option.id)}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeView === option.id
                    ? "border border-blue-600 bg-blue-50 text-blue-700 shadow-lg"
                    : "border border-gray-200 bg-white text-gray-700 shadow-md hover:bg-gray-50"
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>

          {/* Dynamic Component Rendering */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            {viewOptions.find((view) => view.id === activeView)?.component}
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffManagement;
