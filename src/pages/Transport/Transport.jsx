import React from "react";
import { Bus, Users, UserCheck } from "lucide-react";

function Transport() {
  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="flex w-full justify-between">
        <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">Transport Management</h1>
      </header>

      {/* CTA Sections */}
      <div className="mt-6 flex justify-between gap-4">
        {/* Total Buses */}
        <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
          <Bus className="mb-2 h-10 w-10 text-blue-500" />
          <h2 className="text-center text-lg font-semibold text-gray-700">
            Total Buses
          </h2>
          <p className="text-2xl font-bold text-blue-500">15</p>
        </div>

        {/* Staff Members */}
        <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
          <Users className="mb-2 h-10 w-10 text-green-500" />
          <h2 className="text-center text-lg font-semibold text-gray-700">
            Staff (Drivers & Conductors)
          </h2>
          <p className="text-2xl font-bold text-green-500">25</p>
        </div>

        {/* Students Using Transport */}
        <div className="flex w-1/3 flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
          <UserCheck className="mb-2 h-10 w-10 text-purple-500" />
          <h2 className="text-center text-lg font-semibold text-gray-700">
            Students Using Transport
          </h2>
          <p className="text-2xl font-bold text-purple-500">200</p>
        </div>
      </div>
    </div>
  );
}

export default Transport;
