import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parse, format, isWithinInterval } from "date-fns";
import { enUS } from "date-fns/locale";
import CustomToolbar from "./CustomToolbar";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => new Date(),
  getDay: (date) => date.getDay(),
  locales,
});

<CustomToolbar />;

const CalendarBooking = ({ bookings }) => {
  const [events, setEvents] = useState([]); // Stores all events
  const [filteredHolidays, setFilteredHolidays] = useState([]); // Stores filtered events
  const [startBookingDate, setStartBookingDate] = useState(""); // Stores selected start date
  const [endBookingDate, setEndBookingDate] = useState(""); // Stores selected end date

  useEffect(() => {
    fetch("https://www.gov.uk/bank-holidays.json")
      .then((response) => response.json())
      .then((data) => {
        const holidayEvents = data["england-and-wales"].events.map((event) => ({
          title: event.title,
          start: new Date(event.date),
          end: new Date(event.date),
          isHoliday: true,
        }));
        console.log("Fetched Holidays:", holidayEvents.length);
        // Merge holiday events with the bookings passed as prop
        const allEvents = [...holidayEvents, ...bookings];
        setEvents(allEvents); // Update events state
        setFilteredHolidays(allEvents); // Initially show all events
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, [bookings]); // Re-fetch when bookings change

  const handleFilter = () => {
    if (!startBookingDate || !endBookingDate) {
      setFilteredHolidays(events); // If no filter, show all events
      return;
    }

    const startDate = new Date(startBookingDate);
    const endDate = new Date(endBookingDate);

    // Filter events based on date range
    const filtered = events.filter((event) =>
      isWithinInterval(event.start, { start: startDate, end: endDate })
    );

    console.log("Filtered holidays:", filtered);
    setFilteredHolidays(filtered); // Update filtered holidays
  };

  const eventHoliday = (event) => {
    const style = {
      backgroundColor: event.isHoliday ? "red" : "", // Apply red background for holidays
      color: "white", // White text for visibility
      borderRadius: "5px",
      opacity: 0.8,
      border: "none",
      padding: "2px",
    };
    return { style };
  };
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex flex-wrap gap-4">
        <div className="flex-grow">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Booking Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startBookingDate}
            onChange={(e) => setStartBookingDate(e.target.value)}
            className=" block w-full rounded-md  shadow-sm p-2 "
          />
        </div>
        <div className="flex-grow">
          <label
            htmlFor="endDate"
            className="blo text-sm font-medium text-gray-700 mb-1"
          >
            End Booking Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endBookingDate}
            onChange={(e) => setEndBookingDate(e.target.value)}
            className=" block w-full rounded-md  shadow-sm p-2 focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Filter
          </button>
        </div>
      </div>
      <Calendar
        localizer={localizer}
        events={filteredHolidays} // Pass filtered events to Calendar
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: CustomToolbar, // Use custom toolbar with icons
        }}
        style={{ height: 500 }}
        eventPropGetter={eventHoliday}
      />
    </div>
  );
};

export default CalendarBooking;
