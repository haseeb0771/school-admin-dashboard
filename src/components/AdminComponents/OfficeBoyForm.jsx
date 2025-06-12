import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function OfficeBoyForm({ onSuccess, onFormSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    whatsappNumber: "",
    address: "",
    salary: "",
    joiningDate: "",
    personImage: null,
    idCardImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        `http://localhost:3300//officeBoy/add`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        toast.success("Office Boy Added Successfully");
        onSuccess(); // Close form after success
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          whatsappNumber: "",
          address: "",
          salary: "",
          joiningDate: "",
          personImage: null,
          idCardImage: null,
        });
      }
      onFormSubmit();
    } catch (err) {
      setError("Failed to add office boy. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">
        Add Office Boy
      </h3>
      {error && <p className="text-red-500">{error}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-gray-700">First-Name :</label>
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
            <label className="block text-gray-700">Last-Name :</label>
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
            <label className="block text-gray-700">phoneNumber :</label>
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
            <label className="block text-gray-700">whatsappNumber :</label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Address :</label>
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
              type="text"
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
              placeholder="Enter joiningDate"
              required
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-gray-700">Person-Image :</label>
            <input
              type="file"
              name="personImage"
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">I'd Card :</label>
            <input
              type="file"
              name="idCardImage"
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              required
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

export default OfficeBoyForm;
