const sortOptions = [
  { value: "", label: "Default" },
  { value: "teamA", label: "Team A" },
  { value: "teamB", label: "Team B" },
  { value: "date", label: "Date" },
];

export const SortDropdown = ({ sortKey, onChange }) => (
  <div className="dropdown">
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
    >
      Sort by {sortOptions.find((o) => o.value === sortKey)?.label || "Default"}
    </button>
    <ul className="dropdown-menu">
      {sortOptions.map(({ value, label }) => (
        <li key={value}>
          <button
            className="dropdown-item"
            type="button"
            onChange={() => onChange(value)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  </div>
);
