import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parse, format } from "date-fns";
const CalendarBooking = () => {
  const [events, setEvents] = useState([]);
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => new Date(),
    getDay: (date) => date.getDay(),
    locales: {},
  });

  useEffect(() => {
    fetch("https://www.gov.uk/bank-holidays.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        const eventList = data["england-and-wales"].events.map((event) => ({
          title: event.title,
          start: new Date(event.date),
          end: new Date(event.date),
        }));
        console.log("Formatted Events:", eventList);
        setEvents(eventList);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className=" flex flex-col w-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};
export default CalendarBooking;
