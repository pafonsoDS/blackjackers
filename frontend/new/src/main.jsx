import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import { worker } from "./mocks/browser";
import "./index.css";

await worker.start();

createRoot(document.getElementById("root")).render(
    <App />
);
