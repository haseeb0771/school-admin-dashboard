import React, { useState } from "react";
import Sidebar from "../../../components/commonComponents/Sidebar";

function BranchManagement() {
  const branches = [
    {
      id: 1,
      name: "Downtown Branch",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      address: "123 Main St, Downtown, New York",
      city: "New York",
      capacity: 150,
      hours: "9:00 AM - 6:00 PM",
      manager: "John Smith",
      phone: "(555) 123-4567",
      email: "downtown@example.com",
      facilities: ["WiFi", "Parking", "Conference Rooms", "Cafeteria"],
      description: "Our flagship location in the heart of downtown.",
    },
    {
      id: 2,
      name: "Westside Branch",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      address: "456 Oak Ave, Westside, Los Angeles",
      city: "Los Angeles",
      capacity: 200,
      hours: "8:00 AM - 7:00 PM",
      manager: "Sarah Johnson",
      phone: "(555) 234-5678",
      email: "westside@example.com",
      facilities: ["WiFi", "Parking", "Gym", "Library"],
      description: "Spacious location with premium facilities.",
    },
    {
      id: 3,
      name: "East End Branch",
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      address: "789 Pine Rd, East End, Chicago",
      city: "Chicago",
      capacity: 120,
      hours: "10:00 AM - 5:00 PM",
      manager: "Michael Chen",
      phone: "(555) 345-6789",
      email: "eastend@example.com",
      facilities: ["WiFi", "Bike Racks", "Outdoor Seating"],
      description: "Cozy location with outdoor spaces.",
    },
    {
      id: 4,
      name: "Northside Branch",
      image:
        "https://images.unsplash.com/photo-1527030280862-64139fba04ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      address: "321 Elm Blvd, Northside, Houston",
      city: "Houston",
      capacity: 180,
      hours: "8:30 AM - 6:30 PM",
      manager: "Emily Wilson",
      phone: "(555) 456-7890",
      email: "northside@example.com",
      facilities: ["WiFi", "Parking", "Childcare", "Event Space"],
      description: "Family-friendly location with childcare.",
    },
    {
      id: 5,
      name: "Southside Branch",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      address: "654 Maple Ln, Southside, Phoenix",
      city: "Phoenix",
      capacity: 90,
      hours: "9:00 AM - 5:00 PM",
      manager: "David Kim",
      phone: "(555) 567-8901",
      email: "southside@example.com",
      facilities: ["WiFi", "Coffee Bar", "Printing Services"],
      description: "Compact location with quick amenities.",
    },
  ];

  // State for modal
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("Find By City");
  const [branchIdSearch, setBranchIdSearch] = useState("");
  const userRole = localStorage.getItem("userRole");

  // Get unique cities for dropdown
  const cities = [
    "Find By City",
    ...new Set(branches.map((branch) => branch.city)),
  ];

  // Filter branches based on search criteria
  const filteredBranches = branches.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity =
      selectedCity === "Find By City" || branch.city === selectedCity;
    const matchesId =
      !branchIdSearch || branch.id.toString().includes(branchIdSearch);

    return matchesSearch && matchesCity && matchesId;
  });

  // Open modal with branch details
  const openModal = (branch) => {
    setSelectedBranch(branch);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBranch(null);
  };

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
          <header className="mb-8 flex w-full justify-between">
            <h1 className="text-3xl font-bold text-gray-900 xl:text-3xl">
              Branch Management
            </h1>
          </header>
          <div className="mt-6 mb-5 flex justify-between gap-4 border border-gray-100">
            <div className="flex w-full flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="blue"
                className="h-12 w-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                />
              </svg>

              <h2 className="text-center text-lg font-semibold text-gray-700">
                Branches
              </h2>
              <p className="text-2xl font-bold text-blue-500">5</p>
            </div>
          </div>

          {/* Stats card and filters section */}
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search by Branch ID */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by Branch ID"
                  value={branchIdSearch}
                  onChange={(e) => setBranchIdSearch(e.target.value)}
                  className="rounded border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <svg
                  className="absolute right-2 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* City filter dropdown */}
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="appearance-none rounded border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* General search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search branches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <svg
                  className="absolute right-2 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {userRole === "ADMIN" && (
                <button className="rounded bg-blue-600 py-2 px-4 font-medium text-white transition-colors duration-300 hover:bg-blue-700 sm:mr-auto">
                  Add New Branch +
                </button>
              )}
            </div>
          </div>

          {/* Branch cards grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredBranches.map((branch) => (
              <div
                key={branch.id}
                onClick={() => openModal(branch)}
                className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-1 mb-1 text-sm font-semibold text-gray-800">
                    {branch.name}
                  </h3>
                  <div className="mb-1 flex items-start text-xs text-gray-600">
                    <svg
                      className="mr-1 mt-0.5 h-3 w-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="line-clamp-1">{branch.address}</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <svg
                      className="mr-1 h-3 w-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p>Capacity: {branch.capacity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for branch details */}
      {isModalOpen && selectedBranch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative mx-4 w-full max-w-4xl rounded-lg bg-white shadow-xl">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src={selectedBranch.image}
                  alt={selectedBranch.name}
                  className="h-64 w-full object-cover md:h-full"
                />
              </div>
              <div className="p-6 md:w-1/2">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  {selectedBranch.name}
                </h2>

                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-700">
                    Details
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-start">
                      <svg
                        className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {selectedBranch.address}
                    </p>
                    <p className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Capacity: {selectedBranch.capacity} people
                    </p>
                    <p className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Hours: {selectedBranch.hours}
                    </p>
                    <p className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Manager: {selectedBranch.manager}
                    </p>
                    <p className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Phone: {selectedBranch.phone}
                    </p>
                    <p className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Email: {selectedBranch.email}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-700">
                    Facilities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBranch.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-700">
                    Description
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedBranch.description}
                  </p>
                </div>

                <div className="mt-6 flex space-x-3">
                  {userRole === "ADMIN" && (
                    <button className="flex-1 rounded bg-blue-600 py-2 px-4 font-medium text-white hover:bg-blue-700">
                      Edit Branch
                    </button>
                  )}
                  <button className="flex-1 rounded border border-gray-300 py-2 px-4 font-medium text-gray-700 hover:bg-gray-100">
                    View Statistics
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BranchManagement;
