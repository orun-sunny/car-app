import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const Layout = ({ children, handleAddBooking, bookings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div className="flex bg-gray-100 ">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col  ">
        <TopBar
          toggleSidebar={toggleSidebar}
          handleAddBooking={handleAddBooking}
          bookings={bookings}
        />
        <main className="  bg-white border-2 lg:px-80">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
