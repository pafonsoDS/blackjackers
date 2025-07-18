import { useRef } from "react";

export const FilterForm = ({ onSubmit }) => {
  const inputRef = useRef();

  return (
    <form onSubmit={() => onSubmit(inputRef)} className="d-flex">
      <div className="row g-2 align-items-center">
        <div className="col">
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
