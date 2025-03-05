import React, { useState, useEffect } from "react";
import {
  Card,
  Badge,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  MultiSelectBox,
  MultiSelectBoxItem,
} from "@tremor/react";
import { Link } from "react-router-dom";

const AdminStaffList = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [adminStaff, setAdminStaff] = useState([]); // State to store fetched admin staff
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch admin staff data from the API
  useEffect(() => {
    const fetchAdminStaff = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin-staff/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch admin staff data");
        }
        const data = await response.json();
        setAdminStaff(data); // Set fetched data to state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching admin staff:", error);
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchAdminStaff();
  }, []);

  // Function to delete an admin staff member
  const deleteAdminStaff = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin-staff/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete admin staff");
      }

      // Remove the deleted staff member from the state
      setAdminStaff((prevStaff) =>
        prevStaff.filter((staff) => staff._id !== id)
      );

      alert("Admin staff deleted successfully!");
    } catch (error) {
      console.error("Error deleting admin staff:", error);
      alert("Failed to delete admin staff. Please try again.");
    }
  };

  // Filter function for multi-select
  const isTeacherSelected = (staff) => {
    if (selectedIds.length === 0 && selectedNames.length === 0) return true;
    return (
      selectedIds.includes(staff._id) ||
      selectedNames.includes(`${staff.firstName} ${staff.lastName}`)
    );
  };

  // Loading state
  if (loading) {
    return <div className="mt-5 text-center">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="mt-5 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-5">
      <Card shadow={false}>
        <div className="mb-4 flex flex-wrap gap-4">
          <MultiSelectBox
            onValueChange={(value) => setSelectedIds(value)}
            placeholder="Select by ID..."
            maxWidth="max-w-lg"
          >
            {adminStaff.map((item) => (
              <MultiSelectBoxItem
                key={item._id}
                value={item._id}
                text={`${item.staffId} : ${item.firstName} ${item.lastName}`}
              />
            ))}
          </MultiSelectBox>

          <MultiSelectBox
            onValueChange={(value) => setSelectedNames(value)}
            placeholder="Select by Name..."
            maxWidth="max-w-lg"
          >
            {adminStaff.map((item) => (
              <MultiSelectBoxItem
                key={item._id + "-name"}
                value={`${item.firstName} ${item.lastName}`}
                text={`${item.firstName} ${item.lastName}`}
              />
            ))}
          </MultiSelectBox>
        </div>

        <Table marginTop="mt-6">
          <TableHead>
            <TableRow>
              {/* <TableHeaderCell>ID</TableHeaderCell> */}
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Rank</TableHeaderCell>
              <TableHeaderCell>Joining Date</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminStaff.filter(isTeacherSelected).map((staff) => (
              <TableRow key={staff._id}>
                {/* <TableCell>
                  <Badge text={staff.staffId} size="xs" color="sky" />
                </TableCell> */}
                <TableCell>{`${staff.firstName} ${staff.lastName}`}</TableCell>
                <TableCell>{staff.rank}</TableCell>
                <TableCell>
                  {new Date(staff.joiningDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{staff.phoneNumber}</TableCell>
                <TableCell>{staff.status}</TableCell>
                <TableCell>
                  <Link
                    to={`/staffs/${staff._id}`}
                    className="rounded-full bg-green-200 py-[3px] px-3 text-xs text-green-900 hover:bg-green-100"
                  >
                    View
                  </Link>
                  <Link
                    to={`/staffs/edit/${staff._id}`}
                    className="ml-3 rounded-full bg-orange-200 py-[3px] px-3 text-xs text-orange-900 hover:bg-orange-100"
                  >
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminStaffList;
