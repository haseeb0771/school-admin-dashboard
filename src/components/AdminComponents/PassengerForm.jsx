import React from "react";

function PassengerForm() {
  return (
    <div className="mt-6 rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">
        Add Passenger
      </h3>
      <form className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="passengerName" className="block text-gray-700">
              Passenger Name:
            </label>
            <input
              type="text"
              id="passengerName"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter passenger name"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="passengerClass" className="block text-gray-700">
              Class:
            </label>
            <input
              type="text"
              id="passengerClass"
              className="mt-2 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter passenger's class"
            />
          </div>
        </div>

        <div>
          <label htmlFor="passengerBus" className="block text-gray-700">
            Bus Number:
          </label>
          <input
            type="text"
            id="passengerBus"
            className="mt-2 w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter bus number"
          />
        </div>

        <button
          type="submit"
          className="mt-4 h-10 w-full rounded-lg bg-purple-500 text-white hover:bg-purple-400"
        >
          Save Passenger
        </button>
      </form>
    </div>
  );
}

export default PassengerForm;
