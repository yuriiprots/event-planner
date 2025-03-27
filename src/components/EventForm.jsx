import { useMemo, useState } from "react";
import FormInput from "../components/common/FormInput";
import { getCurrentDateTime, formatDate } from "../utils/formatDate";

export default function EventForm({
  onClose,
  createEvent,
  editingEvent,
  updateEvent,
  selectedDate = null,
}) {
  const initialData = useMemo(
    () =>
      editingEvent || {
        title: "",
        date: selectedDate ? formatDate(selectedDate) : getCurrentDateTime(),
        description: "",
        importance: "normal",
      },
    [editingEvent, selectedDate]
  );

  const [formData, setFormData] = useState(initialData);
  const [mouseDownInside, setMouseDownInside] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMouseDown = (e) => {
    e.target.closest("form")
      ? setMouseDownInside(true)
      : setMouseDownInside(false);
  };

  const handleMouseUp = (e) => {
    if (!mouseDownInside && e.target.id === "wrapper") onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingEvent ? updateEvent(formData) : createEvent(formData);
    onClose();
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <form
        className="flex w-96 flex-col rounded-lg bg-white px-6 py-0 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center py-5">
          <h1 className="text-center text-lg font-bold">
            {editingEvent ? "Edit Event" : "New Event"}
          </h1>
          <button
            className="text-bold self-end text-3xl text-gray-500 hover:text-gray-700"
            type="button"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <FormInput
          type="text"
          label="Event Title:"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <div className="flex flex-col">
          <label className="font-bold">Description:</label>
          <textarea
            className="my-2 rounded border border-gray-300 p-2 w-full h-32"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <FormInput
          type="datetime-local"
          label="Date and Time:"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <div className="flex flex-col">
          <label className="font-bold">Importance:</label>
          <select
            className="my-2 rounded border border-gray-300 p-2"
            name="importance"
            value={formData.importance}
            onChange={handleChange}
            required
          >
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <button
          className="mt-2 mb-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
