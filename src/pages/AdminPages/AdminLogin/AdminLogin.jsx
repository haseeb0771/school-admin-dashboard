import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token); // Save token in localStorage
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.response.data.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="h-3/4 w-1/3 rounded-lg bg-white p-8 shadow-lg"
      >
        <div className="mt-20 text-center">
          <h2 className="mb-4 mt-5 text-2xl font-bold">
            Login To Your Account
          </h2>
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="flex flex-col items-center justify-center gap-4">
          <input
            type="username"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 mt-14 w-96 rounded border p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-96 rounded border p-2"
            required
          />
          <button
            type="submit"
            className="w-60 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
