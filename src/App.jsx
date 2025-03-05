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
import LecturesPage from "./pages/Lectures/LecturesPage";
import UploadLecture from "./pages/Lectures/UploadLecture";
import AllLectures from "./pages/Lectures/AllLectures";
import Notes from "./pages/Notes/Notes";
import UpTeacherNotes from "./pages/Notes/UpTeacherNotes";
import UpTextbook from "./pages/Notes/UpTextbook";
import UpPastpapers from "./pages/Notes/UpPastpapers";
import Transport from "./pages/Transport/Transport";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Teachers from "./pages/Teachers/Teachers";
import AddTeacher from "./pages/Teachers/AddTeacher";
import SingleTeacher from "./pages/Teachers/SingleTeacher";
import ViewLecture from "./pages/Lectures/ViewLecture";
import Employee from "./pages/EmployeeManagement/Employee";
import Finance from "./pages/Finance/Finance";
import PassedOut from "./pages/PassedOutStudent/PassedOut";
import EditStudent from "./pages/AllStudents/EditStudent";
import DragDrop from "./pages/DragDrop/DragDrop";
import UpdateTeacher from "./pages/Teachers/UpdateTeacher";

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

              <Route exact path="/dragdrop" element={<DragDrop />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
