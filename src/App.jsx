import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/CommonPages/LoginPage/LoginPage";
import NotAuthorized from "./pages/CommonPages/NotAuthorized/NotAuthorized";
import PageNotFound from "./pages/CommonPages/PageNotFound/PageNotFound";
import Toaster from "./components/commonComponents/Toaster";

// Admin Pages
import AdminDashboard from "./pages/AdminPages/AdminDashboard/AdminDashboard";
import NewAdmission from "./pages/AdminPages/NewAdmission/NewAdmission";
import BulkAdmit from "./pages/AdminPages/NewAdmission/BulkAdmit/BulkAdmit";
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
import Teachers from "./pages/AdminPages/Teachers/Teachers";
import AddTeacher from "./pages/AdminPages/Teachers/AddTeacher";
import SingleTeacher from "./pages/AdminPages/Teachers/SingleTeacher";
import ViewLecture from "./pages/AdminPages/Lectures/ViewLecture";
import Employee from "./pages/AdminPages/EmployeeManagement/Employee";
import Finance from "./pages/AdminPages/Finance/Finance";
import PassedOut from "./pages/AdminPages/PassedOutStudent/PassedOut";
import EditStudent from "./pages/AdminPages/AllStudents/EditStudent";
import UpdateTeacher from "./pages/AdminPages/Teachers/UpdateTeacher";

// Other role pages
import OwnerDashboard from "./pages/OwnerPages/OwnerDashboard";
import StudentDashboard from "./pages/StudentPages/StudentDashboard";
import ParentDashboard from "./pages/ParentPages/ParentDashboard";
import TeacherDashboard from "./pages/TeacherPages/TeacherDashboard";

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return isAuthenticated ? <Navigate to="/" /> : children;
};

const PrivateRoute = ({ children, allowedRoles, redirectPath = null }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole") || ""; // Default to empty string if null

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (redirectPath && redirectPath[userRole]) {
    return <Navigate to={redirectPath[userRole]} />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <NotAuthorized />;
  }

  return children;
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedToken = localStorage.getItem("authToken");

    // Only redirect if user lands on root `/`
    if (window.location.pathname === "/" && storedRole && storedToken) {
      const redirectPaths = {
        ADMIN: "/admin/dashboard",
        OWNER: "/owner/dashboard",
        STUDENT: "/student/dashboard",
        PARENT: "/parent/dashboard",
        TEACHER: "/teacher/dashboard",
      };

      if (redirectPaths[storedRole]) {
        navigate(redirectPaths[storedRole]);
      }
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Home/Default route with automatic redirection */}

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/new-admission"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <NewAdmission />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/bulk-admit"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <BulkAdmit />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/all-students"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AllStudents />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/attendance"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <Attendance />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/single-student/:id"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <SingleStudent />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/lectures"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <LecturesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/upload-lecture"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <UploadLecture />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/all-lectures"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AllLectures />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/view-lecture/:id"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <ViewLecture />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/notes"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <Notes />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/up-teacher-notes"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <UpTeacherNotes />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/up-textbook"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <UpTextbook />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/up-pastpapers"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <UpPastpapers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/transport"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <Transport />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/teachers"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <Teachers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-teacher"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <AddTeacher />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/single-teacher/:id"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <SingleTeacher />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/update-teacher/:id"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <UpdateTeacher />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/employee"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <Employee />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/finance"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <Finance />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/passed-out"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <PassedOut />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-student/:id"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <EditStudent />
            </PrivateRoute>
          }
        />

        {/* Owner routes */}
        <Route
          path="/owner/dashboard"
          element={
            <PrivateRoute allowedRoles={["OWNER"]}>
              <OwnerDashboard />
            </PrivateRoute>
          }
        />
        {/* Add more owner routes as needed */}

        {/* Student routes */}
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        {/* Add more student routes as needed */}

        {/* Parent routes */}
        <Route
          path="/parent/dashboard"
          element={
            <PrivateRoute allowedRoles={["PARENT"]}>
              <ParentDashboard />
            </PrivateRoute>
          }
        />
        {/* Add more parent routes as needed */}

        {/* Teacher routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <TeacherDashboard />
            </PrivateRoute>
          }
        />
        {/* Add more teacher routes as needed */}

        {/* Error routes */}
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
