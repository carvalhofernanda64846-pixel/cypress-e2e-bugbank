const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  retries: 2,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 90000,
  requestTimeout: 15000,
  responseTimeout: 30000,
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
