import React from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function NotAuthorized() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = !!localStorage.getItem("authToken");

  const handleGoBack = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (userRole === "ADMIN") {
      navigate("/dashboard");
    } else {
      navigate("/");
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
          {isAuthenticated
            ? "You don't have permission to access this page."
            : "Please log in to access this page."}
        </p>
        <button
          onClick={handleGoBack}
          className="rounded-md bg-red-500 px-6 py-3 text-xl text-white transition-all hover:bg-red-400"
        >
          {isAuthenticated ? "Go Back" : "Go to Login"}
        </button>
      </div>
    </div>
  );
}

export default NotAuthorized;
