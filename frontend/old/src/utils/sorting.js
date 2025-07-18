export const sortFns = {
  teamA: (a, b) => a.details.teamA - b.details.teamA,
  teamB: (a, b) => a.details.teamB - b.details.teamB,
  date: (a, b) => new Date(a.details.startDate) - new Date(b.details.startDate),
};
