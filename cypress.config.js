const { defineConfig } = require("cypress");

// Populate process.env with values from .env file
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    includeShadowDom: true, // Important for interacting with Descope components
    baseUrl: 'http://localhost:3000',
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    descope_project_id: process.env.REACT_APP_DESCOPE_PROJECT_ID,
    descope_management_key: process.env.REACT_APP_DESCOPE_MANAGEMENT_KEY,
    // Management API host for the tests (not the app's custom domain); defaults to production
    descope_base_url: process.env.DESCOPE_API_URL
  },
});