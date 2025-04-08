import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    headers: {
      "Content-Security-Policy":
        "default-src 'self' https://intex2.blob.core.windows.net;" +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; " +
        "frame-ancestors 'none'; " +
        "font-src 'self' https://fonts.gstatic.com data:; " +
        "connect-src 'self' https://localhost:5000 https://accounts.google.com https://oauth2.googleapis.com; " +
        "object-src 'none'; " +
        "base-uri 'self'; " +
        "form-action 'self'; " +
        "frame-src 'self' https://accounts.google.com https://oauth2.googleapis.com;",
    },
  },
});
