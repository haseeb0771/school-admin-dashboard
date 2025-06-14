import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function GuardList() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const deleteGuard = async (id) => {
    try {
      const response = await fetch(
        `http:/localhost:3300/employees/guard/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete guard");
      }

      setGuards((prevGuards) => prevGuards.filter((guard) => guard._id !== id));
      toast.success("Guard deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete guard");
    }
  };

  const isGuardSelected = (guard) => {
    if (selectedIds.length === 0 && selectedNames.length === 0) return true;
    return (
      selectedIds.includes(guard._id) ||
      selectedNames.includes(`${guard.firstName} ${guard.lastName}`)
    );
  };

  if (loading) {
    return <div className="mt-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="mt-5 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-5">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-5 text-2xl font-bold">Guards</h1>

        {/* Filter controls */}
        <div className="mb-4 flex flex-wrap gap-4">
          <select
            onChange={(e) =>
              setSelectedIds(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            multiple
          >
            <option value="" disabled selected>
              Select by ID...
            </option>
            {guards.map((item) => (
              <option key={item._id} value={item._id}>
                {item.guardId} : {item.firstName} {item.lastName}
              </option>
            ))}
          </select>

          <select
            onChange={(e) =>
              setSelectedNames(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            multiple
          >
            <option value="" disabled selected>
              Select by Name...
            </option>
            {guards.map((item) => (
              <option
                key={item._id + "-name"}
                value={`${item.firstName} ${item.lastName}`}
              >
                {item.firstName} {item.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
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
              {guards.filter(isGuardSelected).map((guard, index) => (
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
      </div>
    </div>
  );
}

export default GuardList;
