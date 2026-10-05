import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  server: {
    proxy: {
      "/api": "http://127.0.0.1:3000",
    },
  },
});
