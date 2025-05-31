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
import { toast } from "react-toastify";

function GuardList() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [guards, setGuards] = useState([]); // State to store fetched guards
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch guards data from the API
  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const response = await fetch(`http://localhost:3300//guards/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch guards data");
        }
        const data = await response.json();
        setGuards(data); // Set fetched data to state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching guards:", error);
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchGuards();
  }, []);

  // Function to delete a guard
  const deleteGuard = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3300//guards/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete guard");
      }

      // Remove the deleted guard from the state
      setGuards((prevGuards) => prevGuards.filter((guard) => guard._id !== id));

      toast.success("Guard deleted successfully!");
    } catch (error) {
      console.error("Error deleting guard:", error);
      toast.error("Failed to delete guard. Please try again.");
    }
  };

  // Filter function for multi-select
  const isGuardSelected = (guard) => {
    if (selectedIds.length === 0 && selectedNames.length === 0) return true;
    return (
      selectedIds.includes(guard._id) ||
      selectedNames.includes(`${guard.firstName} ${guard.lastName}`)
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
        <h1 className="mb-5 text-2xl font-bold">Gaurds</h1>
        <div className="mb-4 flex flex-wrap gap-4">
          <MultiSelectBox
            onValueChange={(value) => setSelectedIds(value)}
            placeholder="Select by ID..."
            maxWidth="max-w-lg"
          >
            {guards.map((item) => (
              <MultiSelectBoxItem
                key={item._id}
                value={item._id}
                text={`${item.guardId} : ${item.firstName} ${item.lastName}`}
              />
            ))}
          </MultiSelectBox>

          <MultiSelectBox
            onValueChange={(value) => setSelectedNames(value)}
            placeholder="Select by Name..."
            maxWidth="max-w-lg"
          >
            {guards.map((item) => (
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
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Joining Date</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guards.filter(isGuardSelected).map((guard) => (
              <TableRow key={guard._id}>
                <TableCell>{`${guard.firstName} ${guard.lastName}`}</TableCell>
                <TableCell>
                  {new Date(guard.joiningDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{guard.phone}</TableCell>
                <TableCell>{guard.status}</TableCell>
                <TableCell>
                  <Link
                    to={`/guards/${guard._id}`}
                    className="rounded-md bg-gray-900 py-[3px] px-3 text-xs text-gray-50 transition-all hover:bg-gray-700"
                  >
                    View
                  </Link>
                  <Link
                    to={`/guards/edit/${guard._id}`}
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

export default GuardList;
