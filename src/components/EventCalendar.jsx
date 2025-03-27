import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";


export default function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, "events"));
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        start: doc.data().date,
      }));
      console.log("Отримані події:", eventsData);
      setEvents(eventsData);
    };
    fetchEvents();
  }, []);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    const filtered = events.filter((event) =>
      event.start.startsWith(arg.dateStr)
    );
    setFilteredEvents(filtered);
  };

  return (
    <div className="flex gap-6 p-4">
      <div className="flex-1">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
        />
      </div>

      <div className="w-80 p-4 border rounded-lg shadow-lg bg-white">
        <h3 className="text-lg font-bold mb-2">
          Події на {selectedDate || "виберіть день"}
        </h3>
        {filteredEvents.length > 0 ? (
          <ul className="max-h-80 overflow-auto">
            {filteredEvents.map((event) => (
              <li key={event.id} className="p-2 border-b">
                {event.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Немає подій на цей день</p>
        )}
      </div>
    </div>
  );
}
