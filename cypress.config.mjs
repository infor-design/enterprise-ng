import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200/ids-enterprise-ng-demo",
    supportFile: false,
    specPattern: ["cypress/integration/**/*.spec.ts"],
  },
  viewportWidth: 1024,
  viewportHeight: 800,
  projectId: "b4167k",
  video: false,
});
