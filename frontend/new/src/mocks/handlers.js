import { http, HttpResponse } from "msw";
import events from "./data/events.js";
import eventsBigData from "./data/events-big-data.js";

export const handlers = [
  http.get("/api/events", () => {
    return HttpResponse.json(events, { status: 200 });
  }),
];