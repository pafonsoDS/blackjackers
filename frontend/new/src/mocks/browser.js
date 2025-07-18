// Sets up the Mock Service Worker for API request interception in the browser.
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Create and export the worker instance with all handlers
export const worker = setupWorker(...handlers);
