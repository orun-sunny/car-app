import React, { useState } from "react";
import { FaBars, FaBell, FaPlus, FaUserCircle } from "react-icons/fa";
import AddBooking from "./AddBooking";

const TopBar = ({ toggleSidebar, handleAddBooking, bookings }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  // const [bookings, setBookings] = useState([]); // Store added bookings

  // Function to handle new booking

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <header className="bg-gray-200 shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <h2 className="text-xl font-bold text-gray-800">Calendar</h2>
          </div>
          <div className="flex items-center justify-end md:flex-1 lg:w-0">
            <button
              onClick={openBookingModal}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FaPlus className="mr-2" />
              AddBooking
            </button>
            <button className="ml-6 p-2 text-gray-400 hover:text-gray-500">
              <FaBell className="h-6 w-6" />
            </button>
            <button className="ml-6 p-2 text-gray-400 hover:text-gray-500">
              <FaUserCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <AddBooking
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onAddBooking={handleAddBooking}
      />
    </header>
  );
};

export default TopBar;
