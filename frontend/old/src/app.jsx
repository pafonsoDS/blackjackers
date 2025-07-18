// Main App component for the frontend React project.
// Handles fetching, filtering, sorting, and displaying sports events.
import { useEffect, useState, useMemo, useCallback } from "react";
import { SortDropdown } from "./components/sort-dropdown";
import { EventCard } from "./components/event-card";
import { FilterForm } from "./components/filter-form";
import { sortFns } from "./utils/sorting";
import { getValidEvents } from "./utils/validation";
import "./app.css";

const App = () => {
  // State variables
  const [events, setEvents] = useState([]); // All events
  const [sortKey, setSortKey] = useState(""); // Current sort key
  const [bgColor, setBgColor] = useState("#ffffff"); // Card background color
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [query, setQuery] = useState(""); // Search query

  // Fetch events from the API and filter for valid events
  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEvents(getValidEvents(data));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // Fetch events on mount and when sortKey changes
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, sortKey]);

  // Compute the displayed events based on search query and sorting
  const displayed = useMemo(() => {
    const q = query.toLowerCase().trim();

    let list = q
      ? events.filter(
          (event) =>
            event.details.teamA.toLowerCase().includes(q) ||
            event.details.teamB.toLowerCase().includes(q),
        )
      : [...events];

    if (sortKey && sortFns[sortKey]) {
      list.sort(sortFns[sortKey]);
    }

    return list;
  }, [events, query, sortKey]);

  const handleFormSubmit = (inputRef) => {
    setQuery(inputRef.current.value);
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loading) {
    return <div className="text-center">Loading events…</div>;
  }

  if (error) {
    return (
      <div className="text-center text-danger">
        Failed to load events: {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🏟️ Betting Home Page</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <SortDropdown sortKey={sortKey} onChange={setSortKey} />
        <FilterForm onSubmit={handleFormSubmit} />
        <label>
          Background:{" "}
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
      </div>

      {displayed.map((evt) => (
        <EventCard key={evt.eventID} event={evt} bgColor={bgColor} />
      ))}
    </div>
  );
};

export default App;
