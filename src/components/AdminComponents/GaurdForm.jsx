import React, { useState } from "react";
import { toast } from "react-toastify";

function GuardForm({ setShowGaurdForm, fetchGuardCount, setShowGaurdList }) {
  const [formData, setFormData] = useState({
    firstName: "Gaurd",
    lastName: "school",
    phone: "213123123",
    whatsapp: "123123123",
    address: "adasasdasd",
    salary: 123123,
    joiningDate: "2023-01-01",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
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
      const response = await fetch(
        "http://localhost:3300/employees/gaurd/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Guard Added Successfully");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          whatsapp: "",
          address: "",
          salary: 0,
          joiningDate: "",
        });
        fetchGuardCount();
        setShowGaurdForm(false);
        setShowGaurdList(true);
      }
    } catch (error) {
      console.error("Error adding guard:", error);
      setMessage("Error adding guard. Please try again.");
      toast.error("Error adding guard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">Add Guard</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-gray-700">WhatsApp:</label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter WhatsApp number"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter address"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Joining Date:</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter joiningDate"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-gray-700">Salary:</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter salary"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Person Image:</label>
            <input
              type="file"
              name="personImage"
              onChange={handleFileChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Gun License:</label>
            <input
              type="file"
              name="gunLicenseImage"
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
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default GuardForm;
