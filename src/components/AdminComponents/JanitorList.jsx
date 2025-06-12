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
import { toast } from "react-toastify";

function JanitorList() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [janitors, setJanitors] = useState([]); // State to store fetched janitors
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch janitors data from the API
  useEffect(() => {
    const fetchJanitors = async () => {
      try {
        const response = await fetch(`http://localhost:3300//janitors/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch janitors data");
        }
        const data = await response.json();
        setJanitors(data); // Set fetched data to state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching janitors:", error);
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchJanitors();
  }, []);

  // Function to delete a janitor
  const deleteJanitor = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3300//janitors/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete janitor");
        toast.success("Admin staff added successfully!");
      }

      // Remove the deleted janitor from the state
      setJanitors((prevJanitors) =>
        prevJanitors.filter((janitor) => janitor._id !== id)
      );

      toast.success("Janitor deleted successfully!");
    } catch (error) {
      console.error("Error deleting janitor:", error);
      toast.error("Failed to delete janitor. Please try again.");
    }
  };

  // Filter function for multi-select
  const isJanitorSelected = (janitor) => {
    if (selectedIds.length === 0 && selectedNames.length === 0) return true;
    return (
      selectedIds.includes(janitor._id) ||
      selectedNames.includes(`${janitor.firstName} ${janitor.lastName}`)
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
        <h1 className="mb-5 text-2xl font-bold">Janitors</h1>

        <div className="mb-4 flex flex-wrap gap-4">
          <MultiSelectBox
            onValueChange={(value) => setSelectedIds(value)}
            placeholder="Select by ID..."
            maxWidth="max-w-lg"
          >
            {janitors.map((item) => (
              <MultiSelectBoxItem
                key={item._id}
                value={item._id}
                text={`${item.janitorId} : ${item.firstName} ${item.lastName}`}
              />
            ))}
          </MultiSelectBox>

          <MultiSelectBox
            onValueChange={(value) => setSelectedNames(value)}
            placeholder="Select by Name..."
            maxWidth="max-w-lg"
          >
            {janitors.map((item) => (
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
              {/* <TableHeaderCell>Janitor ID</TableHeaderCell> */}
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Joining Date</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {janitors.filter(isJanitorSelected).map((janitor) => (
              <TableRow key={janitor._id}>
                {/* <TableCell>
                  <Badge text={janitor.janitorId} size="xs" color="sky" />
                </TableCell> */}
                <TableCell>{`${janitor.firstName} ${janitor.lastName}`}</TableCell>
                <TableCell>
                  {new Date(janitor.joiningDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{janitor.phone}</TableCell>
                <TableCell>{janitor.status}</TableCell>
                <TableCell>
                  <Link
                    to={`/janitors/${janitor._id}`}
                    className="rounded-md bg-gray-900 py-[3px] px-3 text-xs text-gray-50 transition-all hover:bg-gray-700"
                  >
                    View
                  </Link>
                  <Link
                    to={`/janitors/edit/${janitor._id}`}
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

export default JanitorList;
