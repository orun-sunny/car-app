import { useForm, Controller } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

const AddBooking = ({ isOpen, onClose, onAddBooking }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      subject: "",
      selectedCar: "Toyota",
      bookingDate: "",
      startTime: "",
      endTime: "",
      selectedDays: [],
      endDate: "",
    },
  });

  const bookingDate = watch("bookingDate");

  const onSubmit = (data) => {
    if (typeof onAddBooking === "function") {
      onAddBooking(data);
    } else {
      console.error("onAddBooking is not a function");
    }
    onClose();
    reset();
  };

  if (!isOpen) return null;

  const isDateInPast = (date) =>
    new Date(date) < new Date().setHours(0, 0, 0, 0);

  const inputClass =
    "w-full p-2 bg-gray-50 rounded-full border border-gray-300 focus:ring focus:ring-indigo-200";

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg w-full max-w-2xl  p-6 relative">
        {" "}
        {/* Increased width here */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add Car Booking</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <h3 className="text-indigo-600 text-2xl font-bold mb-4">
              Basic Information
            </h3>

            {/* Subject and Select Car in Flex */}
            <div className="flex gap-6">
              {" "}
              {/* Flex layout with gap */}
              {/* Subject */}
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Subject</label>
                <Controller
                  name="subject"
                  control={control}
                  rules={{ required: "Subject is required" }}
                  render={({ field }) => (
                    <input {...field} type="text" className={inputClass} />
                  )}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>
              {/* Select Car */}
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Select Car</label>
                <Controller
                  name="selectedCar"
                  control={control}
                  rules={{ required: "Car selection is required" }}
                  render={({ field }) => (
                    <select {...field} className={inputClass}>
                      <option value="Toyota">Toyota</option>
                      <option value="Honda">Honda</option>
                      <option value="Ford">Ford</option>
                    </select>
                  )}
                />
                {errors.selectedCar && (
                  <p className="text-red-500 text-sm">
                    {errors.selectedCar.message}
                  </p>
                )}
              </div>
            </div>

            {/* Booking Date */}
            <div>
              <label className="block text-gray-700 mb-2">Booking Date</label>
              <Controller
                name="bookingDate"
                control={control}
                rules={{
                  required: "Booking date is required",
                  validate: (value) =>
                    !isDateInPast(value) || "Date cannot be in the past",
                }}
                render={({ field }) => (
                  <input {...field} type="date" className={inputClass} />
                )}
              />
              {errors.bookingDate && (
                <p className="text-red-500 text-sm">
                  {errors.bookingDate.message}
                </p>
              )}
            </div>

            {/* Start & End Time */}
            <div className="grid grid-cols-2 gap-4">
              {["startTime", "endTime"].map((timeField) => (
                <div key={timeField}>
                  <label className="block text-gray-700 mb-2">
                    {timeField === "startTime" ? "Start Time" : "End Time"}
                  </label>
                  <Controller
                    name={timeField}
                    control={control}
                    rules={{ required: `${timeField} is required` }}
                    render={({ field }) => (
                      <input {...field} type="time" className={inputClass} />
                    )}
                  />
                  {errors[timeField] && (
                    <p className="text-red-500 text-sm">
                      {errors[timeField].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Repeat Option */}
          <div className="mb-6">
            <h3 className="text-indigo-600 text-2xl  font-semibold mb-4">
              Repeat Option
            </h3>

            {/* Select Days */}
            <div>
              <label className="block text-gray-700 mb-2">Select Days</label>
              <div className="flex gap-4">
                {["Sa", "Su", "M", "T", "W", "T", "F"].map((day, index) => (
                  <label
                    key={`${day}-${index}`}
                    className="flex items-center gap-1"
                  >
                    <Controller
                      name="selectedDays"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            field.onChange(
                              e.target.checked
                                ? [...field.value, day]
                                : field.value.filter((d) => d !== day)
                            )
                          }
                          checked={field.value.includes(day)}
                          className="form-checkbox h-4 w-4 text-indigo-600"
                        />
                      )}
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* End Booking Date */}
            <div>
              <label className="block text-gray-700 mb-2">
                End Booking Date
              </label>
              <Controller
                name="endDate"
                control={control}
                rules={{
                  validate: (value) => {
                    if (!value) return true;
                    if (isDateInPast(value))
                      return "End date cannot be in the past";
                    if (new Date(value) <= new Date(bookingDate))
                      return "End date must be after start date";
                    return true;
                  },
                }}
                render={({ field }) => (
                  <input {...field} type="date" className={inputClass} />
                )}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
            >
              Advanced
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooking;
