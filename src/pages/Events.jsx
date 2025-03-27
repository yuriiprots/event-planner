import { useState, useCallback, useMemo } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import { useEvents } from "../contexts/eventsContext";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";

export default function Events() {
  const {
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
  } = useEvents();

  const [filters, setFilters] = useState({
    importance: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = useCallback((value) => {
    setFilters((prev) => ({
      ...prev,
      importance: value,
    }));
    setCurrentPage(1);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return eventsData.filter((event) => {
      if (filters.importance && event.importance !== filters.importance) {
        return false;
      }
      if (
        searchQuery &&
        !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [eventsData, filters, searchQuery]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  return (
    <div className="flex flex-col py-4 h-full">
      <div className="flex justify-between items-center pb-5">
        <h1 className="text-2xl font-semibold text-gray-800">List of events</h1>
        <button
          onClick={handleShowFormForNewEvent}
          className="mt-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Add new event
        </button>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <p className="block text-sm font-medium text-gray-700 pb-1">Search</p>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title or description"
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <Filter value={filters.importance} onChange={handleFilterChange} />
      </div>

      <EventList
        eventsData={paginatedData}
        editEvent={editEvent}
        deleteEvent={handleDeleteEvent}
        isLoading={isLoading}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {showForm && (
        <EventForm
          onClose={toggleForm}
          createEvent={handleCreateEvent}
          editingEvent={editingEvent}
          updateEvent={handleUpdateEvent}
          selectedDate={null}
        />
      )}
    </div>
  );
}
