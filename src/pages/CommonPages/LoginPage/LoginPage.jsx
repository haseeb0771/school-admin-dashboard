import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../../../assets/loading.svg";
import School from "../../../assets/school.png";

function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setUsernameOrEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3300/user/login", {
        usernameOrEmail,
        password,
      });

      const { role, user } = response.data;

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userData", JSON.stringify(user));

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", usernameOrEmail);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // 💡 Role-based name selection
      let displayName = "User";
      if (role === "ADMIN" || role === "OWNER") {
        displayName = user.name;
      } else if (role === "PARENT") {
        displayName = user.fatherFullName;
      } else if (role === "TEACHER") {
        displayName = user.firstName;
      } else if (role === "STUDENT") {
        displayName = user.studentFirstName;
      }

      toast.success(`Welcome back, ${displayName || "User"}!`);

      setTimeout(() => {
        if (role === "ADMIN") navigate("/admin/dashboard");
        else if (role === "OWNER") navigate("/owner/dashboard");
        else if (role === "STUDENT") navigate("/student/dashboard");
        else if (role === "PARENT") navigate("/parent/dashboard");
        else if (role === "TEACHER") navigate("/teacher/dashboard");
      }, 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.log(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="grid h-full w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="mb-6 flex items-center justify-center">
            <img src={School} alt="No Data" className="h-52 w-52" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 lg:text-5xl lg:leading-[57px]">
            Educational World
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-500">
            We are here to help you shine in your career and achieve your goals.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg border border-gray-200 p-5 shadow-lg"
        >
          <h3 className="mb-8 text-center text-2xl font-bold text-slate-900 lg:text-3xl">
            Sign in
          </h3>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Email
              </label>
              <input
                name="usernameOrEmail"
                type="text"
                required
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-slate-100 px-4 py-3 text-sm text-slate-800 outline-0 focus:border-blue-600 focus:bg-transparent"
                placeholder="Enter Username or Email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-200 bg-slate-100 px-4 py-3 text-sm text-slate-800 outline-0 focus:border-blue-600 focus:bg-transparent"
                placeholder="Enter Password"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-slate-500"
                >
                  Remember me
                </label>
              </div>
            </div>
          </div>

          <div className="mt-12 mb-10">
            {loading ? (
              <div className="flex justify-center">
                <img src={Loading} alt="Loading..." className="h-10 w-10" />
              </div>
            ) : (
              <button
                type="submit"
                className="h-12 w-full cursor-pointer rounded bg-blue-600 py-2.5 px-4 text-sm font-semibold text-white shadow-xl hover:bg-blue-700 focus:outline-none"
              >
                Log in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
