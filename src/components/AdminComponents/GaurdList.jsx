import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../assets/loading.svg";
import Error from "../../assets/no-internet.png";
import NoData from "../../assets/no-data.png";

function GuardList() {
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const response = await fetch(
          "http://localhost:3300/employees/gaurd/all",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || "Failed to fetch guards data");
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }

        const data = await response.json();
        setGuards(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        toast.error(error.message || "Failed to fetch guards!");
      } finally {
        setLoading(false);
      }
    };

    fetchGuards();
  }, []);

  const filteredGuards = guards.filter((guard) => {
    if (!searchTerm) return true;

    const fullName = `${guard.firstName} ${guard.lastName}`.toLowerCase();
    const phone = guard.phone?.toLowerCase() || "";
    const status = guard.status?.toLowerCase() || "";

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm.toLowerCase()) ||
      status.includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <img src={Loading} alt="Loading..." className="h-16 w-16" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <img src={Error} alt="Error" className="h-20 w-20" />
        <p className="text-center text-lg font-bold text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-5 text-2xl font-bold">Guards</h1>

        {/* Search bar */}
        <div className="mb-4 mt-5 flex flex-wrap items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search guards by name, phone, status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border border-gray-300 p-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table or No Data */}
        {!loading && filteredGuards.length > 0 ? (
          <div className="mt-6 overflow-x-auto rounded-md border border-gray-300 shadow-sm">
            <table className="w-full table-auto border-collapse text-sm">
              <thead className="bg-gray-200 text-left text-gray-700">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Joining Date
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Phone</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuards.map((guard, index) => (
                  <tr
                    key={guard._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {guard.firstName} {guard.lastName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(guard.joiningDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {guard.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          guard.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {guard.status}
                      </span>
                    </td>
                    <td className="space-x-2 border border-gray-300 px-4 py-2">
                      <Link
                        to={`/guards/${guard._id}`}
                        className="inline-block rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                      >
                        View
                      </Link>
                      <Link
                        to={`/guards/edit/${guard._id}`}
                        className="inline-block rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <div className="mt-28 flex flex-col items-center justify-center">
              <img src={NoData} alt="No data" className="mb-4 h-44 w-44" />
              <p className="text-lg text-gray-500">No guards found.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default GuardList;
