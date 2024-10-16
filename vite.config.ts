import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Load environment variables from .env file
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/auth": {
        target: "https://dummyjson.com",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
});
