import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../assets/loading.svg";
import ErrorImg from "../../assets/no-internet.png";
import NoData from "../../assets/no-data.png";

function AdminStaffList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          "http://localhost:3300/employees/admin/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch admin staff");
        }
        const data = await response.json();
        setAdmins(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        toast.error("Failed to fetch admin staff.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3300/employees/admin/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }

      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
      toast.success("Admin deleted successfully!");
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Failed to delete admin.");
    }
  };

  const filteredAdmins = admins.filter((admin) => {
    if (!searchTerm) return true;

    const fullName = `${admin.firstName} ${admin.lastName}`.toLowerCase();
    const phone = admin.phone?.toLowerCase() || "";
    const status = admin.status?.toLowerCase() || "";

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm.toLowerCase()) ||
      status.includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <img src={Loading} alt="Loading" className="h-16 w-16" />
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
        <h1 className="mb-5 text-2xl font-bold">Admin Staff</h1>

        {/* Search bar */}
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search admin by name, phone, status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border border-gray-300 p-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table or No Data */}
        {filteredAdmins.length > 0 ? (
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
                {filteredAdmins.map((admin, index) => (
                  <tr
                    key={admin._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {admin.firstName} {admin.lastName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(admin.joiningDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {admin.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          admin.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {admin.status}
                      </span>
                    </td>
                    <td className="space-x-2 border border-gray-300 px-4 py-2">
                      <Link
                        to={`/admin-staff/${admin._id}`}
                        className="inline-block rounded bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700"
                      >
                        View
                      </Link>
                      <Link
                        to={`/admin-staff/edit/${admin._id}`}
                        className="inline-block rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteAdmin(admin._id)}
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
            <p className="text-lg text-gray-500">No admin staff found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminStaffList;
