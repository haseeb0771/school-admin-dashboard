import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleGoBack = () => {
    if (userRole === "ADMIN") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md rounded-lg border border-amber-500 p-10 text-center shadow-lg">
        <FaExclamationTriangle className="mx-auto mb-6 text-6xl text-amber-500" />
        <h1 className="mb-4 text-4xl font-semibold text-amber-800">
          Oops! Page Not Found
        </h1>
        <p className="mb-6 text-lg text-amber-600">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        {/* Go Back Button */}
        <button
          onClick={handleGoBack}
          className="rounded-md bg-amber-500 px-6 py-3 text-xl text-white transition-all hover:bg-amber-400"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
