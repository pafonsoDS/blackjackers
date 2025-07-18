
// Vite configuration file for the frontend React project.
// This sets up Vite to use the React plugin for fast refresh and JSX support.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Export the Vite config object
export default defineConfig({
  plugins: [react()], // Enables React plugin
});
