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
import AllStudents from "./pages/CommonPages/AllStudents/AllStudents";
import Attendance from "./pages/AdminPages/Attendance/Attendance";
import SingleStudent from "./pages/CommonPages/AllStudents/SingleStudent";
import LecturesPage from "./pages/AdminPages/Lectures/LecturesPage";
import UploadLecture from "./pages/AdminPages/Lectures/UploadLecture";
import AllLectures from "./pages/AdminPages/Lectures/AllLectures";
import Notes from "./pages/AdminPages/Notes/Notes";
import UpTeacherNotes from "./pages/AdminPages/Notes/UpTeacherNotes";
import UpTextbook from "./pages/AdminPages/Notes/UpTextbook";
import UpPastpapers from "./pages/AdminPages/Notes/UpPastpapers";
import Transport from "./pages/AdminPages/Transport/Transport";
import Teachers from "./pages/CommonPages/Teachers/Teachers";
import AddTeacher from "./pages/CommonPages/Teachers/AddTeacher";
import SingleTeacher from "./pages/CommonPages/Teachers/SingleTeacher";
import ViewLecture from "./pages/AdminPages/Lectures/ViewLecture";
import Employee from "./pages/AdminPages/EmployeeManagement/Employee";
import Finance from "./pages/AdminPages/Finance/Finance";
import PassedOut from "./pages/AdminPages/PassedOutStudent/PassedOut";
import EditStudent from "./pages/CommonPages/AllStudents/EditStudent";
import UpdateTeacher from "./pages/CommonPages/Teachers/UpdateTeacher";

// Other role pages
import OwnerDashboard from "./pages/OwnerPages/OwnerDashboard";
import StudentDashboard from "./pages/StudentPages/StudentDashboard";
import ParentDashboard from "./pages/ParentPages/ParentDashboard";
import TeacherDashboard from "./pages/TeacherPages/TeacherDashboard";
import FinancialHandling from "./pages/OwnerPages/FinancialHandling";
import BranchManagement from "./pages/CommonPages/BranchManagement/BranchManagement";
import StaffManagement from "./pages/OwnerPages/StaffManagement";
import AcademicCalendar from "./pages/CommonPages/AcademicCalendar";
import EventNotice from "./pages/OwnerPages/EventNotice";
import AcademicReports from "./pages/StudentPages/AcademicReports";
// Teacher specific pages
import MyClasses from "./pages/TeacherPages/MyClasses";
import LessonPlans from "./pages/TeacherPages/LessonPlans";
import MarkAttendance from "./pages/TeacherPages/MarkAttendance";
import ExamAndMarks from "./pages/TeacherPages/ExamAndMarks";
import Announcement from "./pages/TeacherPages/Announcement";
import TimeTable from "./pages/TeacherPages/TimeTable";
import StudenProfile from "./pages/TeacherPages/StudenProfile";
import BehaviourReports from "./pages/TeacherPages/BehaviourReports";
import StudentAttendance from "./pages/ParentPages/StudentAttendance";
import StudentExamMarks from "./pages/ParentPages/StudentExamMarks";
import StudentPayments from "./pages/ParentPages/StudentPayments";
import StudentTimeTable from "./pages/ParentPages/StudentTimeTable";
import StudentAnnouncements from "./pages/ParentPages/StudentAnnouncements";
import StudentBehaviourReport from "./pages/ParentPages/StudentBehaviourReport";

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
          path="/admin/single-student/:studentId"
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
          path="/admin/edit-student/:studentId"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <EditStudent />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/branch"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <BranchManagement />
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
        <Route
          path="/owner/finance"
          element={
            <PrivateRoute allowedRoles={["OWNER"]}>
              <FinancialHandling />
            </PrivateRoute>
          }
        />
        <Route
          path="/owner/branch"
          element={
            <PrivateRoute allowedRoles={["OWNER"]}>
              <BranchManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/owner/teachers"
          element={
            <PrivateRoute allowedRoles={["OWNER"]}>
              <Teachers />
            </PrivateRoute>
          }
        />
        <Route
          path="/owner/staff-management"
          element={
            <PrivateRoute allowedRoles={["OWNER"]}>
              <StaffManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/owner/academic-calendar"
          element={
            <PrivateRoute allowedRoles={["OWNER"]}>
              <AcademicCalendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/owner/notify-events"
          element={
            <PrivateRoute allowedRoles={["OWNER"]}>
              <EventNotice />
            </PrivateRoute>
          }
        />

        {/* Student routes */}
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/academic-calendar"
          element={
            <PrivateRoute allowedRoles={["STUDENT"]}>
              <AcademicCalendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/reports"
          element={
            <PrivateRoute allowedRoles={["STUDENT"]}>
              <AcademicReports />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/my-subjects"
          element={
            <PrivateRoute allowedRoles={["STUDENT"]}>
              <AcademicReports />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/timetable"
          element={
            <PrivateRoute allowedRoles={["STUDENT"]}>
              <AcademicReports />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/announcements"
          element={
            <PrivateRoute allowedRoles={["STUDENT"]}>
              <StudentAnnouncements />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/payment-history"
          element={
            <PrivateRoute allowedRoles={["STUDENT"]}>
              <StudentPayments />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/behavior"
          element={
            <PrivateRoute allowedRoles={["STUDENT"]}>
              <StudentBehaviourReport />
            </PrivateRoute>
          }
        />

        {/* Parent routes */}
        <Route
          path="/parent/dashboard"
          element={
            <PrivateRoute allowedRoles={["PARENT"]}>
              <ParentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/attendance"
          element={
            <PrivateRoute allowedRoles={["PARENT"]}>
              <StudentAttendance />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/announcements"
          element={
            <PrivateRoute allowedRoles={["PARENT"]}>
              <StudentAnnouncements />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/exams"
          element={
            <PrivateRoute allowedRoles={["PARENT"]}>
              <StudentExamMarks />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/fees"
          element={
            <PrivateRoute allowedRoles={["PARENT"]}>
              <StudentPayments />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/timetable"
          element={
            <PrivateRoute allowedRoles={["PARENT"]}>
              <StudentTimeTable />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/meetings"
          element={
            <PrivateRoute allowedRoles={["PARENT"]}>
              <ParentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/behavior"
          element={
            <PrivateRoute allowedRoles={["PARENT"]}>
              <StudentBehaviourReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/calendar"
          element={
            <PrivateRoute allowedRoles={["PARENT"]}>
              <AcademicCalendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/settings"
          element={
            <PrivateRoute allowedRoles={["PARENT"]}>
              <ParentDashboard />
            </PrivateRoute>
          }
        />

        {/* Teacher routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <TeacherDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/classes"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <MyClasses />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/lessons"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <LessonPlans />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/assignments"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <LessonPlans />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/exams"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <ExamAndMarks />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/attendance"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <MarkAttendance />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/timetable"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <TimeTable />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/announcements"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <Announcement />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/messages"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <TeacherDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/students"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <StudenProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/behavior"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <BehaviourReports />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/settings"
          element={
            <PrivateRoute allowedRoles={["TEACHER"]}>
              <TeacherDashboard />
            </PrivateRoute>
          }
        />

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
