import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';

// Load environment variables from .env file if it exists
// This will not override existing environment variables
config({
  path: new URL('.env', import.meta.url),
});

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    env: {
      OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    },
    typecheck: {
      enabled: true,
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: [
            'tests/unit/**/*.test.ts', 
            'tests/funcs/**/*.test.ts', 
            'tests/sdk/**/*.test.ts'
          ],
          testTimeout: 10000,
          hookTimeout: 10000,
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['tests/e2e/**/*.test.ts'],
          testTimeout: 30000,
          hookTimeout: 30000,
        },
      },
    ],
  },
});
