import { useMemo } from "react";
import { OverviewModal } from "./overview-modal";

export const EventCard = ({ event, bgColor }) => {
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
      <div className="card mb-3" style={{ backgroundColor: bgColor }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5>
              {event.details.teamA} vs {event.details.teamB}
            </h5>
            <OverviewModal />
          </div>
          <p className="text-muted">{formattedDate}</p>
          <div className="d-flex justify-content-around mt-3">
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
