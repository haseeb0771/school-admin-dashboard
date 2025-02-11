import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div className="flex">
      <aside className="max-w-[64px] xl:w-full xl:max-w-[280px]">
        <Sidebar />
      </aside>
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          {/* NEW ADMISSION */}
          <Route path="/newadmission">
            <Route exact index element={<NewAdmission />} />
            <Route exact path="bulkadmit" element={<BulkAdmit />} />
          </Route>

          {/* ALL STUDENTS */}
          <Route exact path="/allstudents" element={<AllStudents />} />
          <Route
            exact
            path="/allstudents/:studentid"
            element={<SingleStudent />}
          />
          <Route exact path="/update" element={<StudentUpdate />} />

          {/* ATTENDANCE */}
          <Route exact path="/attendance" element={<Attendance />} />

          {/* LECTURES */}
          <Route exact path="/lectures" element={<LecturesPage />} />
          <Route exact path="/uploadlecture" element={<UploadLecture />} />
          <Route exact path="/alllectures" element={<AllLectures />} />

          {/* Notes */}
          <Route exact path="/notes" element={<Notes />} />
          <Route exact path="/teachernotes" element={<UpTeacherNotes />} />
          <Route exact path="/textbooks" element={<UpTextbook />} />
          <Route exact path="/pastpapers" element={<UpPastpapers />} />

          {/* Transport */}
          <Route exact path="/transport" element={<Transport />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
