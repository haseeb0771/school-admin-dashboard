import React, { useState } from "react";
import { toast } from "react-toastify";

function GuardForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    whatsapp: "",
    address: "",
    salary: "",
    joiningDate: "",
    personImage: null,
    gunLicenseImage: null,
    idCardImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes (for text fields)
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // Submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("phone", formData.phone);
    data.append("whatsapp", formData.whatsapp);
    data.append("address", formData.address);
    data.append("salary", formData.salary);
    data.append("joiningDate", formData.joiningDate);
    data.append("personImage", formData.personImage);
    data.append("gunLicenseImage", formData.gunLicenseImage);
    data.append("idCardImage", formData.idCardImage);

    try {
      const response = await fetch(`http://localhost:3300//guards/add`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Gaurd Added Successfully");
        setMessage("");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          whatsapp: "",
          address: "",
          salary: "",
          joiningDate: "",
          personImage: null,
          gunLicenseImage: null,
          idCardImage: null,
        });
        onFormSubmit();
      } else {
        setMessage(result.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Error adding guard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">Add Guard</h3>
      {message && <p className="mb-4 text-red-500">{message}</p>}
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
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">Gun License:</label>
            <input
              type="file"
              name="gunLicenseImage"
              onChange={handleFileChange}
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block text-gray-700">ID Card:</label>
            <input
              type="file"
              name="idCardImage"
              onChange={handleFileChange}
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

export default GuardForm;
