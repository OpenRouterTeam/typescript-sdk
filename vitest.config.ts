import { config } from "dotenv";
import { defineConfig } from "vitest/config";

// Load environment variables from .env file
config();

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    env: {
      OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY || "",
    },
    include: ["tests/**/*.test.ts"],
    hookTimeout: 30000,
    testTimeout: 30000,
  },
});
