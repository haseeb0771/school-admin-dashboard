import {
  Badge,
  Button,
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
import { useEffect, useState } from "react";
import Sidebar from "../../../components/commonComponents/Sidebar";

import { Link } from "react-router-dom";
import { DateTime } from "luxon";

function PassedOut() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all students from the backend API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token is missing.");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch("http://localhost:3300/students", {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();

        // Filter students with status "PassedOut"
        const passedOutStudents = data.filter(
          (student) => student.studentStatus === "PassedOut"
        );

        setStudents(data); // Store all students (optional, if needed)
        setFilteredStudents(passedOutStudents); // Store filtered students
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    setFilteredStudents((prevStudents) =>
      prevStudents.filter((student) => student._id !== id)
    );
  };

  const isStudentSelected = (student) => {
    const isIdMatch = selectedIds.includes(student._id);
    const isNameMatch = selectedNames.includes(
      `${student.studentFirstName} ${student.studentMiddleLastName}`
    );

    return (
      (selectedIds.length === 0 && selectedNames.length === 0) ||
      isIdMatch ||
      isNameMatch
    );
  };

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      {" "}
      <div className="flex h-screen">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Passed Out Students
            </h1>
          </header>

          <div className="mt-5">
            <Card shadow={false}>
              {filteredStudents.length === 0 && (
                <p>No passed out students found.</p>
              )}

              {filteredStudents.length > 0 && (
                <>
                  {/* Filters */}
                  <div className="mb-4 flex flex-wrap gap-4">
                    <MultiSelectBox
                      onValueChange={(value) => setSelectedIds(value)}
                      placeholder="Select by ID..."
                      maxWidth="max-w-lg"
                    >
                      {filteredStudents.map((item) => (
                        <MultiSelectBoxItem
                          key={item._id}
                          value={item._id}
                          text={`${item._id} : ${item.studentFirstName} ${item.studentMiddleLastName}`}
                        />
                      ))}
                    </MultiSelectBox>

                    <MultiSelectBox
                      onValueChange={(value) => setSelectedNames(value)}
                      placeholder="Select by Name..."
                      maxWidth="max-w-lg"
                    >
                      {filteredStudents.map((item) => (
                        <MultiSelectBoxItem
                          key={item._id + "-name"}
                          value={`${item.studentFirstName} ${item.studentMiddleLastName}`}
                          text={`${item.studentFirstName} ${item.studentMiddleLastName}`}
                        />
                      ))}
                    </MultiSelectBox>
                  </div>

                  {/* Table */}
                  <Table marginTop="mt-6">
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell>Student ID</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Class / Section</TableHeaderCell>
                        <TableHeaderCell>Date of Admission</TableHeaderCell>
                        <TableHeaderCell>Guardian's Name</TableHeaderCell>
                        <TableHeaderCell>Guardian's Phone</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredStudents
                        .filter((item) => isStudentSelected(item))
                        .map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <Badge
                                text={item.studentId}
                                size="xs"
                                color="sky"
                              />
                            </TableCell>
                            <TableCell>
                              {item.studentFirstName +
                                " " +
                                item.studentMiddleLastName}
                            </TableCell>
                            <TableCell>
                              {item.classEnrolled.className +
                                " / " +
                                item.sectionAssigned}
                            </TableCell>
                            <TableCell>
                              {DateTime.fromISO(item.createdAt).toFormat(
                                "dd/MM/yyyy"
                              )}
                            </TableCell>
                            <TableCell>{item.guardianFullName}</TableCell>
                            <TableCell>{item.guardianPhone}</TableCell>
                            <TableCell>{item.studentStatus}</TableCell>
                            <TableCell>
                              <Link
                                to={`/students/${item._id}`}
                                className="rounded-md bg-gray-900 py-[3px] px-3 text-xs text-gray-50 transition-all hover:bg-gray-700"
                              >
                                View
                              </Link>
                              {/* <Link
                            to={`/students/edit/${item._id}`}
                            className="ml-3 rounded-full bg-orange-200 py-[3px] px-3 text-xs text-orange-900 transition-all hover:bg-orange-100"
                          >
                            Edit
                          </Link> */}
                              {/* <button
                            onClick={() => handleDelete(item._id)}
                            className="ml-3 rounded-full bg-red-200 py-[3px] px-3 text-xs text-red-900 transition-all hover:bg-red-100"
                          >
                            Delete
                          </button> */}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default PassedOut;
