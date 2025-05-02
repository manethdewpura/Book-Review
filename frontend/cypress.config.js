import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {

//     },
//   },
// });


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "http://localhost:3020",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
});