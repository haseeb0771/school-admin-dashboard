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
import { Link } from "react-router-dom";
import axios from "axios";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.get("http://localhost:5000/api/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudents(response.data); // Set students from API response
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

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

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
          All Students
        </h1>
        <div className="flex gap-4">
          <button className="hidden h-9 rounded border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 transition-all hover:border-gray-800 hover:bg-gray-800 hover:text-white sm:block">
            Export
          </button>
        </div>
      </header>

      <div className="mt-5">
        <Card shadow={false}>
          {loading && <p>Loading students...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && students.length === 0 && <p>No students found.</p>}

          {!loading && students.length > 0 && (
            <>
              {/* Filters */}
              <div className="mb-4 flex flex-wrap gap-4">
                <MultiSelectBox
                  onValueChange={(value) => setSelectedIds(value)}
                  placeholder="Select by ID..."
                  maxWidth="max-w-lg"
                >
                  {students.map((item) => (
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
                  {students.map((item) => (
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
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {students
                    .filter((item) => isStudentSelected(item))
                    .map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Badge text={item._id} size="xs" color="sky" />
                        </TableCell>
                        <TableCell>
                          {item.studentFirstName +
                            " " +
                            item.studentMiddleLastName}
                        </TableCell>
                        <TableCell>
                          {item.classEnrolled + " / " + item.sectionAssigned}
                        </TableCell>
                        <TableCell>{item.dateOfAdmission}</TableCell>
                        <TableCell>{item.guardianFullName}</TableCell>
                        <TableCell>{item.guardianPhone}</TableCell>
                        <TableCell>
                          <Link
                            to={`/students/${item._id}`}
                            className="rounded-full bg-green-200 py-[3px] px-3 text-xs text-green-900 transition-all hover:bg-green-100"
                          >
                            View
                          </Link>
                          <Link
                            to={`/students/edit/${item._id}`}
                            className="ml-3 rounded-full bg-orange-200 py-[3px] px-3 text-xs text-orange-900 transition-all hover:bg-orange-100"
                          >
                            Edit
                          </Link>
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
  );
};

export default AllStudents;
