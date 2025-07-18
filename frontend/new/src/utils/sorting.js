// Sorting functions for events by team names or date.
export const sortFns = {
  // Sort by team A name alphabetically
  teamA: (a, b) => a.details.teamA.localeCompare(b.details.teamA),
  // Sort by team B name alphabetically
  teamB: (a, b) => a.details.teamB.localeCompare(b.details.teamB),
  // Sort by event start date
  date: (a, b) => new Date(a.details.startDate) - new Date(b.details.startDate),
};
