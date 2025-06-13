import React from "react";
import Sidebar from "../../components/commonComponents/Sidebar";

function ParentDashboard() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Hello {userData.fatherFullName}!
            </h1>
          </header>
        </div>
      </div>
    </>
  );
}

export default ParentDashboard;
