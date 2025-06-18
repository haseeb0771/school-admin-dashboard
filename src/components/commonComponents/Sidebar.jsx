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
  BuildingOfficeIcon,
  MegaphoneIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  CalendarIcon,
  ClipboardListIcon,
  ChatAlt2Icon,
  CogIcon,
  UserCircleIcon,
  FolderOpenIcon,
  BellIcon,
  ClipboardCheckIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { Bus } from "lucide-react";
import User from "../../assets/user.png";
import { NavLink } from "react-router-dom";
import ConfirmBox from "./ConfirmBox";
import { createPortal } from "react-dom";
import { logout } from "../../utils/auth";

const roleBasedLinks = {
  admin: [
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
    {
      name: "Branch Management",
      href: "/admin/branch",
      icon: BuildingOfficeIcon,
    },
  ],

  owner: [
    { name: "Dashboard", href: "/owner/dashboard", icon: HomeIcon },
    {
      name: "Finance",
      href: "/owner/finance",
      icon: CurrencyDollarIcon,
    },
    {
      name: "Branch Management",
      href: "/owner/branch",
      icon: BuildingOfficeIcon,
    },
    {
      name: "Teachers",
      href: "/owner/teachers",
      icon: UsersIcon,
    },
    {
      name: "Staff Management	",
      href: "/owner/staff-management",
      icon: UsersIcon,
    },
    {
      name: "Academic Calendar",
      href: "/owner/academic-calendar",
      icon: CalendarDaysIcon,
    },
    {
      name: "Events / Notices	",
      href: "/owner/notify-events",
      icon: MegaphoneIcon,
    },
  ],

  teacher: [
    { name: "Dashboard", href: "/teacher/dashboard", icon: HomeIcon },
    { name: "My Classes", href: "/teacher/classes", icon: UsersIcon },
    { name: "Lesson Plans", href: "/teacher/lessons", icon: BookOpenIcon },
    {
      name: "Attendance",
      href: "/teacher/attendance",
      icon: UsersIcon,
    },
    {
      name: "Assignments",
      href: "/teacher/assignments",
      icon: BookOpenIcon,
    },
    { name: "Exams & Marks", href: "/teacher/exams", icon: AcademicCapIcon },
    { name: "Timetable", href: "/teacher/timetable", icon: CalendarIcon },
    { name: "Announcements", href: "/teacher/announcements", icon: BellIcon },
    { name: "Messages", href: "/teacher/messages", icon: BellIcon },
    {
      name: "Student Profiles",
      href: "/teacher/students",
      icon: UserCircleIcon,
    },
    {
      name: "Behavior Reports",
      href: "/teacher/behavior",
      icon: FolderOpenIcon,
    },
    { name: "Settings", href: "/teacher/settings", icon: CogIcon },
  ],

  student: [
    { name: "Dashboard", href: "/student/dashboard", icon: HomeIcon },
    {
      name: "Acadmic Reports",
      href: "/student/reports",
      icon: CurrencyDollarIcon,
    },
    {
      name: "Academic Calendar",
      href: "/student/academic-calendar",
      icon: CalendarDaysIcon,
    },
    {
      name: "My Subjects",
      href: "/student/my-subjects",
      icon: BookOpenIcon,
    },
    {
      name: "Timetable",
      href: "/student/timetable",
      icon: CalendarIcon,
    },
    {
      name: "Announcements",
      href: "/student/announcements",
      icon: BellIcon,
    },
    {
      name: "Payment History",
      href: "/student/payment-history",
      icon: CurrencyDollarIcon,
    },
     {
      name: "Behavior Reports",
      href: "/student/behavior",
      icon: CurrencyDollarIcon,
    },
  ],
  parent: [
    { name: "Dashboard", href: "/parent/dashboard", icon: HomeIcon },
    {
      name: "Attendance",
      href: "/parent/attendance",
      icon: CalendarDaysIcon,
    },
    { name: "Exams & Results", href: "/parent/exams", icon: AcademicCapIcon },
    { name: "Fee & Payments", href: "/parent/fees", icon: CurrencyDollarIcon },
    { name: "Timetable", href: "/parent/timetable", icon: CalendarIcon },
    { name: "Announcements", href: "/parent/announcements", icon: BellIcon },
    { name: "Meetings", href: "/parent/meetings", icon: CalendarIcon },

    {
      name: "Behavior Reports",
      href: "/parent/behavior",
      icon: FolderOpenIcon,
    },
    {
      name: "School Calendar",
      href: "/parent/calendar",
      icon: CalendarDaysIcon,
    },
    { name: "Settings", href: "/parent/settings", icon: CogIcon },
  ],
};

function Sidebar({ handleLogout }) {
  const [confirmData, setConfirmData] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [collapsed, setCollapsed] = useState(false);
  const userRole = localStorage.getItem("userRole").toLowerCase();
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const sidebarLinks = roleBasedLinks[userRole] || roleBasedLinks.admin;
  const roleInfo = {
    admin: {
      title: `${userData.name}`,
      subtitle: "Administrator",
    },
    owner: {
      title: `${userData.name}`,
      subtitle: "System Owner",
    },
    parent: {
      title: `${userData.fatherFullName}`,
    },
    teacher: {
      title: `${userData.firstName}`,
    },
    student: {
      title: `${userData.studentFirstName}`,
    },
  };

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

        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <img
                className="h-10 w-10 rounded-full"
                src={User}
                alt={userRole}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {roleInfo[userRole]?.title || "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {roleInfo[userRole]?.subtitle || ""}
                </p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <img
                className="h-10 w-10 rounded-full"
                src={User}
                alt={userRole}
              />
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

        {/* Logout Button - remains the same */}
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

      {/* ConfirmBox Portal - remains the same */}
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
