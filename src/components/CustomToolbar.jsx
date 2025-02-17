import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { format } from "date-fns";
import { useState } from "react";

const CustomToolbar = ({ label, onNavigate, onView, date }) => {
  const [activeView, setActiveView] = useState("month"); 

  const handleViewChange = (view) => {
    setActiveView(view); 
    onView(view); 
  };
  const formattedLabel = format(date, "MMM, yyyy");

  return (
    <div className="flex items-center justify-between p-3  rounded-md">
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold">{formattedLabel}</span>

        <button
          onClick={() => onNavigate("PREV")}
          className="bg-gray-100 p-2 rounded cursor-pointer"
        >
          <MdArrowBackIosNew size={25} />
        </button>
        <button
          onClick={() => onNavigate("NEXT")}
          className="bg-gray-100 p-2 rounded cursor-pointer"
        >
          <MdArrowForwardIos size={25} />
        </button>

        <button
          onClick={() => onView("month")}
          className="bg-gray-100 text-indigo-600 px-3 py-2 rounded"
        >
          Today
        </button>
      </div>

      <div className="flex items-center gap-4">
        {["day", "week", "month"].map((view) => (
          <button
            key={view}
            onClick={() => handleViewChange(view)}
            className={`px-3 py-2 rounded ${
              activeView === view
                ? "bg-indigo-600 text-white" // Active button style
                : "text-gray-700 hover:text-indigo-600"
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}{" "}
            {/* Capitalize first letter */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomToolbar;
