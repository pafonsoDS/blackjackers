export const sortFns = {
  teamA: (a, b) => a.details.teamA.localeCompare(b.details.teamA),
  teamB: (a, b) => a.details.teamB.localeCompare(b.details.teamB),
  date: (a, b) => new Date(a.details.startDate) - new Date(b.details.startDate),
};
