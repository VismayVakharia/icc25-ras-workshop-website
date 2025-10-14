import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import load from "vite-plugin-html-inject";

export default defineConfig({
  plugins: [tailwindcss(), load()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        cfp: "cfp.html",
        speakers: "speakers.html",
        schedule: "schedule.html",
        organizers: "organizers.html",
      },
    },
  },
});
