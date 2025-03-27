import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatEventDate } from "../utils/formatDate";

const EventCard = ({ event, editEvent, deleteEvent }) => {
  const importanceClass = {
    normal: "bg-white text-gray-600",
    important: "bg-yellow-100 text-yellow-600",
    critical: "bg-red-100 text-red-600",
  };

  return (
    <div
      className={`${
        importanceClass[event.importance] || importanceClass.normal
      } border border-gray-300 rounded-lg shadow-md p-4 transition duration-200 hover:shadow-lg`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-black">{event.title}</h2>
        <div className="flex gap-2">
          <button
            className="text-yellow-500 hover:text-yellow-600"
            onClick={() => editEvent(event)}
          >
            <FaEdit size={20} />
          </button>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => deleteEvent(event.id)}
          >
            <FaTrash size={20} />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        Date: {formatEventDate(event.date)}
      </p>
      <p className="text-sm text-gray-600">Description: {event.description}</p>
      <p className="text-sm text-gray-600">
        <span
          className={`${
            importanceClass[event.importance] || importanceClass.normal
          }`}
        >
          {event.importance}
        </span>
      </p>
    </div>
  );
};

export default EventCard;
