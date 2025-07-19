// EventCard component displays a single sports event with odds and a modal button.
import { useMemo, memo } from "react"; // Import memo
import { OverviewModal } from "./overview-modal";

// Define the component. Note that `bgColor` is no longer a prop.
const EventCardComponent = ({ event }) => {
  // Format the event date for display
  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(event.details.startDate)),
    [event.details.startDate],
  );

  return (
    <>
      {/* 
        The style now uses the CSS variable. The browser handles updating this, 
        not React. This is the key to the performance gain.
      */}
      <div className="card mb-3" style={{ backgroundColor: 'var(--card-background-color)' }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5>
              {event.details.teamA} vs {event.details.teamB}
            </h5>
            {/* Button to open the overview modal */}
            <OverviewModal />
          </div>
          {/* Display formatted date */}
          <p className="text-muted">{formattedDate}</p>
          <div className="d-flex justify-content-around mt-3">
            {/* Odds buttons */}
            <button className="btn btn-outline-primary">
              1 ({event.odds.teamAWin})
            </button>
            <button className="btn btn-outline-secondary">
              X ({event.odds.draw})
            </button>
            <button className="btn btn-outline-danger">
              2 ({event.odds.teamBWin})
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Wrap the component in memo before exporting. This prevents re-renders when
// parent state changes, since this component no longer depends on that state.
export const EventCard = memo(EventCardComponent);