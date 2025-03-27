import React, { useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "react-toastify";
import { useEvents } from "../contexts/eventsContext";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";

function Calendar() {
  const {
    eventsData,
    isLoading,
    editEvent,
    handleCreateEvent,
    handleDeleteEvent,
    editingEvent,
    handleUpdateEvent,
    handleShowFormForNewEvent,
    showForm,
    toggleForm,
  } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const filtered = eventsData.filter((event) =>
        event.date.startsWith(selectedDate)
      );
      setFilteredEvents(filtered);
    }
  }, [eventsData, selectedDate]);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
  };

  return (
    <div className="flex gap-6 p-4">
      <div className="flex-1">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={eventsData}
          dateClick={handleDateClick}
        />
      </div>

      <div className="w-80 p-4 border rounded-lg shadow-lg bg-white">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-lg font-bold">
            {selectedDate || "Choose a day"}
          </h3>
          <button
            onClick={handleShowFormForNewEvent}
            className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            Add new event
          </button>
        </div>

        {filteredEvents.length > 0 ? (
          <ul className="max-h-200 overflow-auto">
            <EventList
              eventsData={filteredEvents}
              editEvent={editEvent}
              deleteEvent={handleDeleteEvent}
              isLoading={isLoading}
            />
          </ul>
        ) : (
          <p className="text-gray-500">No events on this day</p>
        )}
      </div>

      {showForm && (
        <EventForm
          onClose={toggleForm}
          createEvent={handleCreateEvent}
          editingEvent={editingEvent}
          updateEvent={handleUpdateEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}

export default Calendar;
