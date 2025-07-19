// Handlers for the Mock Service Worker to intercept API requests.
import { http, HttpResponse } from "msw";
import events from "./data/events.js";
import eventsBigData from "./data/events-big-data.js";

// List of request handlers
export const handlers = [
  // Intercept GET requests to /api/events and return mock events data
  http.get("/api/events", () => {
    return HttpResponse.json(eventsBigData, { status: 200 });
  }),
];