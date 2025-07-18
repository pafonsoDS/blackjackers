// FilterForm component for searching events by team name.
import { useRef } from "react";

export const FilterForm = ({ onSubmit }) => {
  const inputRef = useRef(); // Reference to the input field

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputRef);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <div className="row g-2 align-items-center">
        <div className="col">
          {/* Input for team name search */}
          <input
            type="text"
            className="form-control"
            placeholder="Search Team"
            ref={inputRef}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">
            Filter Results
          </button>
        </div>
      </div>
    </form>
  );
};
