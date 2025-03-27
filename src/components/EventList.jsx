import { useState } from "react";
import EventCard from "./EventCard";
import Loader from "./common/Loader";

export default function EventList({
  eventsData,
  editEvent,
  deleteEvent,
  isLoading: externalLoading,
}) {
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const isLoading = externalLoading || isLocalLoading;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setIsLocalLoading(true);

    try {
      await deleteEvent(id);
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setIsLocalLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col py-4">
      <ul className="space-y-4">
        {eventsData.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            editEvent={editEvent}
            deleteEvent={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
