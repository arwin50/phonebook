import { defineConfig } from "cypress";
const cucumber = require("cypress-cucumber-preprocessor").default;

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
    baseUrl: "http://localhost:3000",
  },
});
