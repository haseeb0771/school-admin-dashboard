import React, { useState, useEffect } from "react";
import {
  Card,
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

function OfficeBoyList() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [officeBoys, setOfficeBoys] = useState([]); // State to store fetched office boys
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch office boys data from the API
  useEffect(() => {
    const fetchOfficeBoys = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/officeBoy/all");
        if (!response.ok) {
          throw new Error("Failed to fetch office boys data");
        }
        const data = await response.json();
        setOfficeBoys(data); // Set fetched data to state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching office boys:", error);
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchOfficeBoys();
  }, []);

  // Function to delete an office boy
  const deleteOfficeBoy = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/officeBoy/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete office boy");
      }

      // Remove the deleted office boy from the state
      setOfficeBoys((prevOfficeBoys) =>
        prevOfficeBoys.filter((officeBoy) => officeBoy._id !== id)
      );

      alert("Office boy deleted successfully!");
    } catch (error) {
      console.error("Error deleting office boy:", error);
      alert("Failed to delete office boy. Please try again.");
    }
  };

  // Filter function for multi-select
  const isOfficeBoySelected = (officeBoy) => {
    if (selectedIds.length === 0 && selectedNames.length === 0) return true;
    return (
      selectedIds.includes(officeBoy._id) ||
      selectedNames.includes(`${officeBoy.firstName} ${officeBoy.lastName}`)
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
        <h1 className="mb-5 text-2xl font-bold">Office Boy</h1>
        <div className="mb-4 flex flex-wrap gap-4">
          <MultiSelectBox
            onValueChange={(value) => setSelectedIds(value)}
            placeholder="Select by ID..."
            maxWidth="max-w-lg"
          >
            {officeBoys.map((item) => (
              <MultiSelectBoxItem
                key={item._id}
                value={item._id}
                text={`${item.officeBoyId} : ${item.firstName} ${item.lastName}`}
              />
            ))}
          </MultiSelectBox>

          <MultiSelectBox
            onValueChange={(value) => setSelectedNames(value)}
            placeholder="Select by Name..."
            maxWidth="max-w-lg"
          >
            {officeBoys.map((item) => (
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
              {/* <TableHeaderCell>Office Boy ID</TableHeaderCell> */}
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Joining Date</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {officeBoys.filter(isOfficeBoySelected).map((officeBoy) => (
              <TableRow key={officeBoy._id}>
                {/* <TableCell>
                  <Badge text={officeBoy.officeBoyId} size="xs" color="sky" />
                </TableCell> */}
                <TableCell>{`${officeBoy.firstName} ${officeBoy.lastName}`}</TableCell>
                <TableCell>
                  {new Date(officeBoy.joiningDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{officeBoy.phoneNumber}</TableCell>
                <TableCell>{officeBoy.status}</TableCell>
                <TableCell>
                  <Link
                    to={`/office-boys/${officeBoy._id}`}
                    className="rounded-md bg-gray-900 py-[3px] px-3 text-xs text-gray-50 transition-all hover:bg-gray-700"
                  >
                    View
                  </Link>
                  <Link
                    to={`/office-boys/edit/${officeBoy._id}`}
                    className="ml-3 rounded-md bg-gray-900 py-[3px] px-3 text-xs text-gray-50 transition-all hover:bg-gray-700"
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
}

export default OfficeBoyList;
