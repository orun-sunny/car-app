import { FaBars, FaBell, FaCommentDots, FaPlus, FaUser, FaUserCircle } from "react-icons/fa";

const TopBar = ({ toggleSidebar }) => {
  return (
    <header className="w-full bg-white p-4 flex justify-between items-center shadow-md sticky top-0 md:ml-64">
      <div className="flex items-center gap-4">
        <button className="md:hidden" onClick={toggleSidebar}>
          <FaBars className="text-gray-600 text-xl" />
        </button>
        <h2 className="text-lg font-bold">Calendar</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FaPlus /> Add Booking
        </button>
        <FaBell className="text-gray-600 text-xl" />
        <FaUser className="text-gray-600 text-xl" />
      </div>
    </header>
  );
};

export default TopBar;
