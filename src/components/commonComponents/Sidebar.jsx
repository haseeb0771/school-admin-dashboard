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

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "New Admission", href: "/new-admission", icon: UserPlusIcon },
  { name: "All Students", href: "/allstudents", icon: UsersIcon },
  { name: "Teachers", href: "/teachers", icon: UserIcon },
  { name: "Attendance", href: "/attendance", icon: ShieldCheckIcon },
  { name: "Lectures", href: "/lectures", icon: VideoCameraIcon },
  { name: "Notes", href: "/notes", icon: ClipboardDocumentIcon },
  { name: "PassedOut Students", href: "/passedstudent", icon: AcademicCapIcon },
  { name: "Transportation", href: "/transport", icon: Bus },
  { name: "Employee Management", href: "/employee", icon: UserIcon },
  { name: "Finance", href: "/finance", icon: CurrencyDollarIcon },
];

function Sidebar({ handleLogout }) {
  const [confirmData, setConfirmData] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

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
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between border-r border-gray-200 bg-white px-1 py-5 xl:py-12 xl:px-2">
        {/* Admin Info */}
        <div className="ie-logo px-3 py-0 text-center xl:text-left">
          <div className="text-xl font-medium text-gray-900 xl:px-3 xl:text-2xl">
            <span className="hidden items-center gap-2 xl:flex">
              <img className="h-12 w-12" src={User} alt="Admin" />
              <span className="mx-4"> Admin</span>
            </span>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="ie-menu mt-8 flex h-full flex-col">
          <div className="flex flex-col items-center gap-3 p-1 xl:items-stretch xl:px-3">
            {sidebarLinks.map((item) => (
              <NavLink to={item.href} key={item.name} className="group">
                {({ isActive }) => (
                  <span
                    className={`flex items-center gap-3 rounded-md  border-gray-50 px-3 py-2 shadow-sm transition-all hover:scale-110 hover:shadow-lg ${
                      isActive ? "bg-gray-200" : "group-hover:bg-gray-100"
                    }`}
                  >
                    <item.icon
                      className={`h-5 stroke-2 ${
                        isActive
                          ? "stroke-blue-700"
                          : "stroke-gray-500 group-hover:stroke-blue-700"
                      }`}
                    />
                    <span
                      className={`hidden text-base font-semibold xl:block ${
                        isActive
                          ? "text-blue-700"
                          : "text-gray-500 group-hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                    </span>
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="ie-logout mt-auto flex items-center justify-center">
          <div
            className="group flex h-12 w-52 cursor-pointer items-center gap-2 rounded-md px-3 py-2 transition-all hover:scale-105 hover:bg-gray-300"
            onClick={() =>
              openConfirmBox(
                "Logout",
                "Are you sure you want to logout?",
                handleLogout
              )
            }
          >
            <ArrowLeftOnRectangleIcon className="h-6 stroke-gray-700 stroke-[1.5] group-hover:stroke-red-700" />
            <span className="font-bold text-red-700 group-hover:text-red-700">
              Logout
            </span>
          </div>
        </div>
      </div>

      {/* ConfirmBox as an Overlay (Rendered Outside Sidebar) */}
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
