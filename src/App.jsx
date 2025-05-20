import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import "@tremor/react/dist/esm/tremor.css";
import Sidebar from "./components/commonComponents/Sidebar";
import Dashboard from "./pages/AdminPages/Dashboard/Dashboard";
import NewAdmission from "./pages/NewAdmission/NewAdmission";
import BulkAdmit from "./pages/NewAdmission/BulkAdmit/BulkAdmit";
import AllStudents from "./pages/AdminPages/AllStudents/AllStudents";
import Attendance from "./pages/AdminPages/Attendance/Attendance";
import SingleStudent from "./pages/AdminPages/AllStudents/SingleStudent";
import LecturesPage from "./pages/AdminPages/Lectures/LecturesPage";
import UploadLecture from "./pages/AdminPages/Lectures/UploadLecture";
import AllLectures from "./pages/AdminPages/Lectures/AllLectures";
import Notes from "./pages/AdminPages/Notes/Notes";
import UpTeacherNotes from "./pages/AdminPages/Notes/UpTeacherNotes";
import UpTextbook from "./pages/AdminPages/Notes/UpTextbook";
import UpPastpapers from "./pages/AdminPages/Notes/UpPastpapers";
import Transport from "./pages/AdminPages/Transport/Transport";
import AdminLogin from "./pages/AdminPages/AdminLogin/AdminLogin";
import Teachers from "./pages/AdminPages/Teachers/Teachers";
import AddTeacher from "./pages/AdminPages/Teachers/AddTeacher";
import SingleTeacher from "./pages/AdminPages/Teachers/SingleTeacher";
import ViewLecture from "./pages/AdminPages/Lectures/ViewLecture";
import Employee from "./pages/AdminPages/EmployeeManagement/Employee";
import Finance from "./pages/AdminPages/Finance/Finance";
import PassedOut from "./pages/CommonPages/PassedOutStudent/PassedOut";
import EditStudent from "./pages/AdminPages/AllStudents/EditStudent";
import UpdateTeacher from "./pages/AdminPages/Teachers/UpdateTeacher";

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
              <Route
                exact
                path="/students/edit/:studentId"
                element={<EditStudent />}
              />

              {/* ATTENDANCE */}
              <Route exact path="/attendance" element={<Attendance />} />

              {/* LECTURES */}
              <Route exact path="/lectures" element={<LecturesPage />} />
              <Route exact path="/uploadlecture" element={<UploadLecture />} />
              <Route exact path="/alllectures" element={<AllLectures />} />
              <Route
                path="/watch-lecture/:lectureId"
                element={<ViewLecture />}
              />

              {/* NOTES */}
              <Route exact path="/notes" element={<Notes />} />
              <Route exact path="/teachernotes" element={<UpTeacherNotes />} />
              <Route exact path="/textbooks" element={<UpTextbook />} />
              <Route exact path="/pastpapers" element={<UpPastpapers />} />

              {/* TRANSPORT */}
              <Route exact path="/transport" element={<Transport />} />

              {/* Teacher */}
              <Route exact path="/teachers" element={<Teachers />} />
              <Route exact path="/teachers/add" element={<AddTeacher />} />
              <Route
                exact
                path="/teachers/edit/:id"
                element={<UpdateTeacher />}
              />
              <Route
                exact
                path="/teachers/:teacherId"
                element={<SingleTeacher />}
              />

              {/* Employee Management */}
              <Route exact path="/employee" element={<Employee />} />

              {/* Finance Management */}
              <Route exact path="/finance" element={<Finance />} />

              {/* Passed Out Students */}
              <Route exact path="/passedstudent" element={<PassedOut />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
