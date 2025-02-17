import { useState } from "react";
import "./App.css";
import CalendarBooking from "./components/CalendarBooking";

import Layout from "./components/Layout";
import AddBooking from "./components/AddBooking";

function App() {
  const [bookings, setBookings] = useState([]);

  const handleAddBooking = (newBooking) => {
    console.log("New Booking Added:", newBooking);

    const startDate = new Date(newBooking.bookingDate);
    const endDate = new Date(newBooking.endDate);

    const event = {
      title: newBooking.subject,
      start: startDate,
      end: endDate,
    };

    setBookings((prevBookings) => [...prevBookings, event]); // Add event to bookings state
  };
  // Function to add a new booking
  // const handleAddBooking = (newBooking) => {
  //   setBookings([...bookings, newBooking]);
  // };

  return (
    <>
      <Layout handleAddBooking={handleAddBooking} bookings={bookings}>
        <div className="text-center text-gray-600 text-lg">
          Calendar will be displayed here
          <AddBooking onAddBooking={handleAddBooking} />
          <CalendarBooking bookings={bookings} />
        </div>
      </Layout>
    </>
  );
}

export default App;
