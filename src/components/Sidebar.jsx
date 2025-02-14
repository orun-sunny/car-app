import {
  FaTimes,
  FaCalendarAlt,
  FaPlus,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`w-64 bg-gray-200 h-screen p-4 fixed top-0 left-0 z-50 shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Car Booking</h2>
          <button
            className="lg:hidden text-gray-600 hover:text-gray-800"
            onClick={toggleSidebar}
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <FaCalendarAlt /> <span>Calendar</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <FaPlus /> <span>Add Booking</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                <FaClipboardList /> <span>Workflows</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
export default Sidebar;
