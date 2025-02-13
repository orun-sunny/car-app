import {
  FaCalendarAlt,
  FaPlus,
  FaBell,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`w-64 bg-gray-100 h-screen p-4 fixed top-0 left-0 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Car Booking</h2>
        <button className="md:hidden" onClick={toggleSidebar}>
          <FaTimes className="text-gray-600 text-xl" />
        </button>
      </div>
      <nav>
        <ul>
          <li className="mb-2 p-2 rounded-lg hover:bg-gray-200 flex items-center gap-2">
            <FaCalendarAlt /> Calendar
          </li>
          <li className="mb-2 p-2 rounded-lg hover:bg-gray-200 flex items-center gap-2">
            Add Booking
          </li>
          <li className="mb-2 p-2 rounded-lg hover:bg-gray-200 flex items-center gap-2">
            Workflows
          </li>
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
