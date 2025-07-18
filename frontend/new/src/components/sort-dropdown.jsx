// SortDropdown component for selecting how to sort the event list.
const sortOptions = [
  { value: "", label: "Default" },
  { value: "teamA", label: "Team A" },
  { value: "teamB", label: "Team B" },
  { value: "date", label: "Date" },
];

export const SortDropdown = ({ sortKey, onChange }) => (
  <div className="dropdown">
    {/* Dropdown button shows current sort option */}
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
    >
      Sort by {sortOptions.find((o) => o.value === sortKey)?.label || "Default"}
    </button>
    <ul className="dropdown-menu">
      {/* List all sort options */}
      {sortOptions.map(({ value, label }) => (
        <li key={value}>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => onChange(value)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
