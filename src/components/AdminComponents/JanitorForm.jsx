import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function JanitorForm({
  setShowJanitorForm,
  fetchJanitorCount,
  setShowJanitorList,
}) {
  const [formData, setFormData] = useState({
    firstName: "Janitor",
    lastName: "school",
    phone: "123123123",
    whatsapp: "q12312",
    address: "123zcxz",
    salary: 123123123,
    joiningDate: "2023-01-01",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    setLoading(true);
    setMessage("");

    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      address: formData.address,
      salary: formData.salary,
      joiningDate: formData.joiningDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:3300/employees/janitor/add",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Janitor Added Successfully");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        whatsapp: "",
        address: "",
        salary: 0,
        joiningDate: "",
      });
      setShowJanitorForm(false);
      fetchJanitorCount();
      setShowJanitorList(true);
    } catch (error) {
      console.error("Error adding janitor:", error);
      setMessage("Failed to add janitor.");
      toast.error("Failed to add janitor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">Add Janitor</h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter first name"
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
              placeholder="Enter last name"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>
        <div className="mb-6 flex gap-4">
          <div className="w-1/4">
            <label className="block text-gray-700">WhatsApp:</label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter WhatsApp number"
              required
            />
          </div>
          <div className="w-1/4">
            <label className="block text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter address"
              required
            />
          </div>
          <div className="w-1/4">
            <label className="block text-gray-700">Salary:</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter salary"
              required
            />
          </div>
          <div className="w-1/4">
            <label className="block text-gray-700">Joining Date:</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter joiningDate"
              required
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Person Image:</label>
            <input
              type="file"
              name="personImage"
              onChange={handleFileChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="w-1/2">
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
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default JanitorForm;
