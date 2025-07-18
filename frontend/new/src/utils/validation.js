// Utility function to filter and return only valid events.
// An event is valid if it has an ID, both team names, and a start date.
export const getValidEvents = (events) => {
  if (!Array.isArray(events)) {
    return [];
  }

  return events.filter((event) => {
    const hasId = event.eventID !== null && event.eventID !== undefined;
    const hasTeams = !!event.details?.teamA && !!event.details?.teamB;
    const hasStartDate = !!event.details?.startDate;

    return hasId && hasTeams && hasStartDate;
  });
};
