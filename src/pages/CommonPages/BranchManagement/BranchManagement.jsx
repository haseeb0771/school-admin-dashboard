import { useState, useEffect } from "react";
import Sidebar from "../../../components/commonComponents/Sidebar";
import { Link } from "react-router-dom";

function BranchManagement() {
  const [branches, setBranches] = useState([]);
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("http://localhost:3300/branches");
        const data = await response.json();
        setBranches(data);
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="mb-8 flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Branch Management
            </h1>
          </header>
          <div className="mt-6 mb-5 flex justify-between gap-4 border border-gray-100">
            <div className="flex w-full flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="blue"
                className="h-12 w-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                />
              </svg>

              <h2 className="text-center text-lg font-semibold text-gray-700">
                Branches
              </h2>
              <p className="text-2xl font-bold text-blue-500">
                {branches.length}
              </p>
            </div>
          </div>

          {/* Stats card and filters section */}
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search by Branch ID */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Branch Code"
                  className="rounded border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <svg
                  className="absolute right-2 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* City filter dropdown */}
              <div className="relative">
                <select className="appearance-none rounded border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option></option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* General search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search branches..."
                  className="rounded border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <svg
                  className="absolute right-2 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {userRole === "ADMIN" && (
                <button className="rounded bg-blue-600 py-2 px-4 font-medium text-white transition-colors duration-300 hover:bg-blue-700 sm:mr-auto">
                  Add New Branch +
                </button>
              )}
            </div>
          </div>

          {/* Branch cards grid */}
          {/* Branch cards grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {branches.map((branch) => (
              <div
                key={branch._id}
                className="overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex h-32 items-center justify-center overflow-hidden bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="blue"
                    className="h-12 w-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                    />
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-1 mb-1 text-sm font-semibold text-gray-800">
                    {branch.branchName}
                  </h3>
                  <div className="mb-1 flex items-start text-xs text-gray-600">
                    <svg
                      className="mr-1 mt-0.5 h-3 w-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="line-clamp-1">{branch.branchAddress}</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>
                      Branch Code:<strong> {branch.branchCode}</strong>
                    </p>
                  </div>
                  {userRole === "ADMIN" && (
                    <div className="mt-4 flex justify-center">
                      <Link
                        to={`/admin/branch/details/${branch._id}`}
                        className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                    </div>
                  )}
                  {userRole === "OWNER" && (
                    <div className="mt-4 flex justify-center">
                      <Link
                        to={`/owner/branch/details/${branch._id}`}
                        className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BranchManagement;
