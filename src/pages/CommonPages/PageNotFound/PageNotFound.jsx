import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../../../utils/auth";

function PageNotFound() {
  const navigate = useNavigate();
  const userRole = getUserRole();

  const handleGoBack = () => {
    switch (userRole) {
      case "ADMIN":
        navigate("/admin/dashboard");
        break;
      case "OWNER":
        navigate("/owner/dashboard");
        break;
      case "STUDENT":
        navigate("/student/dashboard");
        break;
      case "PARENT":
        navigate("/parent/dashboard");
        break;
      case "TEACHER":
        navigate("/teacher/dashboard");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-gray-500 p-10 text-center shadow-lg">
        <FaExclamationTriangle className="mx-auto mb-6 text-6xl text-gray-500" />
        <h1 className="mb-4 text-4xl font-semibold text-gray-800">
          Oops! Page Not Found
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={handleGoBack}
          className="rounded-md bg-gray-500 px-6 py-3 text-xl text-white transition-all hover:bg-gray-400"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
