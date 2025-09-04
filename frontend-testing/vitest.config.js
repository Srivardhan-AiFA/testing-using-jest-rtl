// filepath: d:\testing\frontend-testing\vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.js", "src/**/*.test.jsx"],
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});