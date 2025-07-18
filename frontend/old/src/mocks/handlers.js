import { http, HttpResponse } from "msw";
import events from "./data/events";
import eventsBigData from "./data/events-big-data";

export const handlers = [
  http.get("/api/events", () => {
    return HttpResponse.json(events, { status: 200 });
  }),
];
