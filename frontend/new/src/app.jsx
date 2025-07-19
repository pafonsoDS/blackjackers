// Main App component for the frontend React project.
// Handles fetching, filtering,sorting, and displaying sports events.
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
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
  
  // Create a ref for the main container to apply CSS variables
  const containerRef = useRef(null);

  // When bgColor state changes, update the CSS variable.
  // This ensures the color is correct on initial load.
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--card-background-color', bgColor);
    }
  }, [bgColor]);


  // Fetch events from the API and filter for valid events
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setEvents(getValidEvents(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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
  
  // This function updates the CSS variable directly, bypassing React renders
  const handleColorChange = (e) => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--card-background-color', e.target.value);
    }
  };
  
  // This function updates the React state, solidifying the color choice
  const handleColorCommit = (e) => {
    setBgColor(e.target.value);
  };

  const handleFormSubmit = (inputRef) => {
    setQuery(inputRef.current.value);
  };

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
    // Add the ref and the initial CSS variable to our main container
    <div 
      ref={containerRef} 
      className="container py-4" 
      style={{'--card-background-color': bgColor}}
    >
      <h1 className="text-center mb-4">🏟️ Betting Home Page</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <SortDropdown sortKey={sortKey} onChange={setSortKey} />
        <FilterForm onSubmit={handleFormSubmit} />
        <label>
          Background:{" "}
          <input
            type="color"
            defaultValue={bgColor}
            // `onChange` gives live preview without re-rendering React
            onChange={handleColorChange}
            // `onBlur` or `onMouseUp` could also work to commit the state
            onInput={handleColorCommit}
          />
        </label>
      </div>

      {displayed.map((evt) => (
        // IMPORTANT: We no longer pass the bgColor prop
        <EventCard key={evt.eventID} event={evt} />
      ))}
    </div>
  );
};

export default App;