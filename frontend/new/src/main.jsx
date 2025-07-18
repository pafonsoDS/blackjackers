
// Entry point for the React application.
// Sets up the mock service worker and renders the App component.
import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import { worker } from "./mocks/browser";
import "./index.css";

// Start the mock service worker for API mocking
await worker.start();

// Render the main App component into the root div
createRoot(document.getElementById("root")).render(
    <App />
);
