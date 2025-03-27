import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { useAuth } from "../authContext/index";
import {
  fetchEventsFromFirestore,
  addEventToFirestore,
  updateEventInFirestore,
  deleteEventInFirestore,
} from "../../firebase/firestoreOperations";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const { currentUser } = useAuth();
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const loadUserEvents = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    try {
      const events = await fetchEventsFromFirestore(currentUser.uid);
      setEventsData(events);
    } catch (error) {
      toast.error(`Failed to load events: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) loadUserEvents();
  }, [currentUser, loadUserEvents]);

  const handleCreateEvent = async (eventToCreate) => {
    if (!currentUser) return;
    try {
      const addedEvent = await addEventToFirestore({
        ...eventToCreate,
        userId: currentUser.uid,
      });
      setEventsData((prev) => [addedEvent, ...prev]);
      toast.success("Event added successfully!");
    } catch (error) {
      toast.error(`Failed to add event: ${error}`);
    }
  };

  const handleUpdateEvent = async (eventToEdit) => {
    if (!currentUser) return;
    try {
      const updatedEvent = await updateEventInFirestore({
        ...eventToEdit,
        userId: currentUser.uid,
      });
      setEventsData((prev) =>
        prev.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      );
      toast.success("Event updated successfully!");
    } catch (error) {
      toast.error(`Failed to update event: ${error}`);
    }
  };

  const editEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = async (eventToDeleteId) => {
    try {
      await deleteEventInFirestore(currentUser.uid, eventToDeleteId);
      setEventsData((prev) =>
        prev.filter((event) => event.id !== eventToDeleteId)
      );
      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error(`Failed to delete event: ${error}`);
    }
  };

  const handleShowFormForNewEvent = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <EventsContext.Provider
      value={{
        eventsData,
        isLoading,
        handleCreateEvent,
        handleUpdateEvent,
        editEvent,
        handleDeleteEvent,
        handleShowFormForNewEvent,
        toggleForm,
        showForm,
        editingEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}
