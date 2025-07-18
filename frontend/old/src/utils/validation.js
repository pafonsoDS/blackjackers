export const getValidEvents = (events) => {
  if (!Array.isArray(events)) {
    return [];
  }

  return events.filter((event) => {
    const hasId = !!event.eventId;
    const hasTeams = !!event.details.teamA && !!event.details.teamB;
    const hasStartDate = !!event.details.startDate;

    return hasId && hasTeams && hasStartDate;
  });
};
