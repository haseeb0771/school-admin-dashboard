import React from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../../../utils/auth";

function NotAuthorized() {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const authenticated = isAuthenticated();

  const handleGoBack = () => {
    if (!authenticated) {
      navigate("/login");
      return;
    }

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
        navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-red-500 p-10 text-center shadow-lg">
        <FaLock className="mx-auto mb-6 text-6xl text-red-500" />
        <h1 className="mb-4 text-4xl font-semibold text-red-800">
          Access Denied
        </h1>
        <p className="mb-6 text-lg text-red-600">
          {authenticated
            ? "You don't have permission to access this page."
            : "Please log in to access this page."}
        </p>
        <button
          onClick={handleGoBack}
          className="rounded-md bg-red-500 px-6 py-3 text-xl text-white transition-all hover:bg-red-400"
        >
          {authenticated ? "Go Back" : "Go to Login"}
        </button>
      </div>
    </div>
  );
}

export default NotAuthorized;
