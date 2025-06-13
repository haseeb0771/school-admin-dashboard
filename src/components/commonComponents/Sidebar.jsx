import React, { useState } from "react";
import {
  HomeIcon,
  UsersIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  ArrowLeftOnRectangleIcon,
  VideoCameraIcon,
  ClipboardDocumentIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Bus } from "lucide-react";
import User from "../../assets/user.png";
import { NavLink } from "react-router-dom";
import ConfirmBox from "./ConfirmBox";
import { createPortal } from "react-dom";
import { logout } from "../../utils/auth";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
  { name: "New Admission", href: "/admin/new-admission", icon: UserPlusIcon },
  { name: "All Students", href: "/admin/all-students", icon: UsersIcon },
  { name: "Teachers", href: "/admin/teachers", icon: UserIcon },
  { name: "Attendance", href: "/admin/attendance", icon: ShieldCheckIcon },
  { name: "Lectures", href: "/admin/lectures", icon: VideoCameraIcon },
  { name: "Notes", href: "/admin/notes", icon: ClipboardDocumentIcon },
  {
    name: "PassedOut Students",
    href: "/admin/passed-out",
    icon: AcademicCapIcon,
  },
  { name: "Transportation", href: "/admin/transport", icon: Bus },
  { name: "Employee Management", href: "/admin/employee", icon: UserIcon },
  { name: "Finance", href: "/admin/finance", icon: CurrencyDollarIcon },
];

function Sidebar({ handleLogout }) {
  const [confirmData, setConfirmData] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [collapsed, setCollapsed] = useState(false);

  const openConfirmBox = (title, message, action) => {
    setConfirmData({
      isOpen: true,
      title,
      message,
      onConfirm: action,
    });
  };

  const closeConfirmBox = () => {
    setConfirmData({ ...confirmData, isOpen: false });
  };

  return (
    <>
      <div
        className={`relative flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-5 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md hover:bg-gray-100"
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          )}
        </button>

        {/* Logo/User Section */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <img className="h-10 w-10 rounded-full" src={User} alt="Admin" />
              <div>
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <img className="h-10 w-10 rounded-full" src={User} alt="Admin" />
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto pt-4">
          <ul className="space-y-1 px-2">
            {sidebarLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center rounded-md p-3 text-sm font-medium shadow-sm transition-colors hover:scale-105 hover:text-blue-600 ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-700"
                    } ${collapsed ? "justify-center" : ""}`
                  }
                >
                  <item.icon
                    className={`h-5 w-5 flex-shrink-0 ${
                      collapsed ? "" : "mr-3"
                    }`}
                  />
                  {!collapsed && item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={() =>
              openConfirmBox("Logout", "Are you sure you want to logout?", () =>
                logout()
              )
            }
            className={`group flex w-full items-center rounded-md p-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 flex-shrink-0 text-red-500" />
            {!collapsed && <span className="ml-3 text-red-500">Logout</span>}
          </button>
        </div>
      </div>

      {/* ConfirmBox Portal */}
      {createPortal(
        <ConfirmBox
          isOpen={confirmData.isOpen}
          title={confirmData.title}
          message={confirmData.message}
          onConfirm={() => {
            confirmData.onConfirm();
            closeConfirmBox();
          }}
          onCancel={closeConfirmBox}
        />,
        document.body
      )}
    </>
  );
}

export default Sidebar;
