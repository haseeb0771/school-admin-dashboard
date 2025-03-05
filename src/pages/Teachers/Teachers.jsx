import React, { useState, useEffect } from "react";
import axios from "axios";
import Female from "../../assets/female.png";
import MaleFemale from "../../assets/male-female.png";
import Male from "../../assets/male.png";
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

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [teacherStats, setTeacherStats] = useState({
    totalTeachers: 0,
    maleTeachers: 0,
    femaleTeachers: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Sort students by 'createdAt' in descending order
        const sortedTeachers = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    const fetchTeacherStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/teachers/stats/count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTeacherStats(response.data);
      } catch (error) {
        console.error("Error fetching teacher stats:", error);
      }
    };

    if (token) {
      fetchTeachers();
      fetchTeacherStats();
    } else {
      console.error("No token found. Please log in.");
    }
  }, [token]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  const isTeacherSelected = (teacher) => {
    const isIdMatch = selectedIds.includes(teacher._id);
    const isNameMatch = selectedNames.includes(
      `${teacher.firstName} ${teacher.lastName}`
    );

    return selectedIds.length === 0 && selectedNames.length === 0
      ? true
      : isIdMatch || isNameMatch;
  };

  // ✅ Delete Teacher API
  const handleDelete = async (teacherId) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/teachers/${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove deleted teacher from UI
      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher._id !== teacherId)
      );

      alert("Teacher deleted successfully!");
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert("Failed to delete teacher.");
    }
  };

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
          Teachers
        </h1>
      </header>

      <div className="mt-6 flex justify-between gap-4">
        <div className="hover flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md hover:shadow-lg">
          <img src={MaleFemale} alt="Total Teachers" className="h-12 w-12" />
          <h2 className="text-lg font-semibold text-gray-700">
            Total Teachers
          </h2>
          <p className="text-2xl font-bold text-blue-500">
            {teacherStats.totalTeachers}
          </p>
        </div>

        <div className="hover flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md hover:shadow-lg">
          <img src={Male} alt="Male Teachers" className="h-12 w-12" />
          <h2 className="text-lg font-semibold text-gray-700">Male Teachers</h2>
          <p className="text-2xl font-bold text-green-500">
            {teacherStats.maleTeachers}
          </p>
        </div>

        <div className="hover flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md hover:shadow-lg">
          <img src={Female} alt="Female Teachers" className="h-12 w-12" />
          <h2 className="text-lg font-semibold text-gray-700">
            Female Teachers
          </h2>
          <p className="text-2xl font-bold text-pink-500">
            {teacherStats.femaleTeachers}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Card shadow={false}>
          <div className="mb-4 flex flex-wrap gap-4">
            <MultiSelectBox
              onValueChange={(value) => setSelectedIds(value)}
              placeholder="Select by ID..."
              maxWidth="max-w-lg"
            >
              {teachers.map((item) => (
                <MultiSelectBoxItem
                  key={item._id}
                  value={item._id}
                  text={`${item.teacherId} : ${item.firstName} ${item.lastName}`}
                />
              ))}
            </MultiSelectBox>

            <MultiSelectBox
              onValueChange={(value) => setSelectedNames(value)}
              placeholder="Select by Name..."
              maxWidth="max-w-lg"
            >
              {teachers.map((item) => (
                <MultiSelectBoxItem
                  key={item._id + "-name"}
                  value={`${item.firstName} ${item.lastName}`}
                  text={`${item.firstName} ${item.lastName}`}
                />
              ))}
            </MultiSelectBox>

            <Link
              to="/teachers/add"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700"
            >
              + Add New Teacher
            </Link>
          </div>

          <Table marginTop="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Teacher ID</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Subject</TableHeaderCell>
                <TableHeaderCell>Joining Date</TableHeaderCell>
                <TableHeaderCell>Phone</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.filter(isTeacherSelected).map((teacher) => (
                <TableRow key={teacher._id}>
                  <TableCell>
                    <Badge text={teacher.teacherId} size="xs" color="sky" />
                  </TableCell>
                  <TableCell>{`${teacher.firstName} ${teacher.lastName}`}</TableCell>
                  <TableCell>{teacher.subjectSpecialization}</TableCell>
                  <TableCell>
                    {new Date(teacher.joiningDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{teacher.phoneNumber}</TableCell>
                  <TableCell>
                    <Link
                      to={`/teachers/${teacher._id}`}
                      className="rounded-full bg-green-200 py-[3px] px-3 text-xs text-green-900 hover:bg-green-100"
                    >
                      View
                    </Link>
                    <Link
                      to={`/teachers/edit/${teacher._id}`}
                      className="ml-3 rounded-full bg-orange-200 py-[3px] px-3 text-xs text-orange-900 hover:bg-orange-100"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(teacher._id)}
                      className="ml-3 rounded-full bg-red-200 py-[3px] px-3 text-xs text-red-900 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

export default Teachers;
