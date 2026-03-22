const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  retries: 1,
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 60000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
