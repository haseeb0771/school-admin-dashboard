import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../assets/loading.svg";
import ErrorImg from "../../assets/no-internet.png";
import NoData from "../../assets/no-data.png";

function OfficeBoyList() {
  const [officeBoys, setOfficeBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOfficeBoys = async () => {
      try {
        const response = await fetch(
          "http://localhost:3300/employees/office-boy/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch office boys data");
        }
        const data = await response.json();
        setOfficeBoys(data);
      } catch (error) {
        console.error("Error fetching office boys:", error);
        setError(error.message);
        toast.error("Failed to fetch office boys.");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficeBoys();
  }, []);

  const deleteOfficeBoy = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3300/employees/office-boy/delete/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete office boy");

      setOfficeBoys((prev) => prev.filter((b) => b._id !== id));
      toast.success("Office boy deleted successfully!");
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Failed to delete office boy.");
    }
  };

  const filteredOfficeBoys = officeBoys.filter((boy) => {
    const fullName = `${boy.firstName} ${boy.lastName}`;
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boy.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boy.status?.toLowerCase().includes(searchTerm.toLowerCase())
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
        <img src={ErrorImg} alt="Error" className="h-20 w-20" />
        <p className="text-center text-lg font-bold text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-5 text-2xl font-bold">Office Boys</h1>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, phone, or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {filteredOfficeBoys.length > 0 ? (
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
                {filteredOfficeBoys.map((boy, index) => (
                  <tr
                    key={boy._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {boy.firstName} {boy.lastName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(boy.joiningDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {boy.phoneNumber}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          boy.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {boy.status}
                      </span>
                    </td>
                    <td className="space-x-2 border border-gray-300 px-4 py-2">
                      <Link
                        to={`/office-boys/${boy._id}`}
                        className="inline-block rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                      >
                        View
                      </Link>
                      <Link
                        to={`/office-boys/edit/${boy._id}`}
                        className="inline-block rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteOfficeBoy(boy._id)}
                        className="inline-block rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-28 flex flex-col items-center justify-center">
            <img src={NoData} alt="No Data" className="mb-4 h-44 w-44" />
            <p className="text-lg text-gray-500">No office boys found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OfficeBoyList;
