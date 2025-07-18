import { useEffect, useState, useMemo, useCallback } from "react";
import { SortDropdown } from "./components/sort-dropdown";
import { EventCard } from "./components/event-card";
import { FilterForm } from "./components/filter-form";
import { sortFns } from "./utils/sorting";
import { getValidEvents } from "./utils/validation";
import "./app.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

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

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, sortKey]);

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
