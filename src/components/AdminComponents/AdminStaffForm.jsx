import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AdminStaffForm({
  setShowAdminForm,
  fetchAdminStaffCount,
  setShowAdminList,
}) {
  const [formData, setFormData] = useState({
    firstName: "Admin",
    lastName: "Staff",
    phoneNumber: "12312313",
    whatsappNumber: "1231233",
    qualification: "BSCS",
    rank: "asdasd",
    address: "asdasdad",
    salary: 12312323,
    joiningDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3300/employees/admin/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Admin staff added successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        whatsappNumber: "",
        qualification: "",
        rank: "",
        address: "",
        salary: 0,
        joiningDate: "",
      });
      setShowAdminForm(false);
      fetchAdminStaffCount();
      setShowAdminList(true);
    } catch (err) {
      console.error("Error adding admin staff:", err);
      toast.error("Failed to add admin staff. Try again.");
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">Add Admin</h3>
      <form
        className="space-y-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Phone:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-gray-700">WhatsApp:</label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Qualification:</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Rank:</label>
            <input
              type="text"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Salary:</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter salary"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Joining Date:</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-gray-700">Person Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Degree Image:</label>
            <input
              type="file"
              name="degreeImage"
              onChange={handleFileChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">ID Card:</label>
            <input
              type="file"
              name="idCardImage"
              onChange={handleFileChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 h-10 w-full rounded-lg bg-purple-500 text-white hover:bg-purple-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminStaffForm;
