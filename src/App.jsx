import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import "@tremor/react/dist/esm/tremor.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewAdmission from "./pages/NewAdmission/NewAdmission";
import BulkAdmit from "./pages/NewAdmission/BulkAdmit/BulkAdmit";
import AllStudents from "./pages/AllStudents/AllStudents";
import Attendance from "./pages/Attendance/Attendance";
import SingleStudent from "./pages/AllStudents/SingleStudent";
import StudentUpdate from "./pages/AllStudents/StudentUpdate/StudentUpdate";
import LecturesPage from "./pages/Lectures/LecturesPage";
import UploadLecture from "./pages/Lectures/UploadLecture";
import AllLectures from "./pages/Lectures/AllLectures";
import Notes from "./pages/Notes/Notes";
import UpTeacherNotes from "./pages/Notes/UpTeacherNotes";
import UpTextbook from "./pages/Notes/UpTextbook";
import UpPastpapers from "./pages/Notes/UpPastpapers";
import Transport from "./pages/Transport/Transport";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token && location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }, [token, location]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    window.location.href = "/login"; // Redirect to login page
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex">
      {/* Render Sidebar only if not on Login Page */}
      {!isLoginPage && (
        <aside className="max-w-[64px] xl:w-full xl:max-w-[280px]">
          <Sidebar handleLogout={handleLogout} />
        </aside>
      )}

      <div className="flex-1 overflow-auto">
        <Routes>
          {/* LOGIN PAGE */}
          <Route
            path="/login"
            element={token ? <Navigate to="/dashboard" /> : <AdminLogin />}
          />

          {/* PROTECTED ROUTES */}
          {token && (
            <>
              <Route exact path="/dashboard" element={<Dashboard />} />

              {/* NEW ADMISSION */}
              <Route path="/new-admission">
                <Route exact index element={<NewAdmission />} />
                <Route exact path="bulkadmit" element={<BulkAdmit />} />
              </Route>

              {/* ALL STUDENTS */}
              <Route exact path="/allstudents" element={<AllStudents />} />
              <Route path="/students/:studentId" element={<SingleStudent />} />
              <Route exact path="/update" element={<StudentUpdate />} />

              {/* ATTENDANCE */}
              <Route exact path="/attendance" element={<Attendance />} />

              {/* LECTURES */}
              <Route exact path="/lectures" element={<LecturesPage />} />
              <Route exact path="/uploadlecture" element={<UploadLecture />} />
              <Route exact path="/alllectures" element={<AllLectures />} />

              {/* NOTES */}
              <Route exact path="/notes" element={<Notes />} />
              <Route exact path="/teachernotes" element={<UpTeacherNotes />} />
              <Route exact path="/textbooks" element={<UpTextbook />} />
              <Route exact path="/pastpapers" element={<UpPastpapers />} />

              {/* TRANSPORT */}
              <Route exact path="/transport" element={<Transport />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
