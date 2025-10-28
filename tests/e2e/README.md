# E2E Tests

This directory contains end-to-end tests for the OpenRouter SDK.

## Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your OpenRouter API key:
   ```bash
   export OPENROUTER_API_KEY=your_api_key_here
   ```

   Or create a `.env` file in the project root:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

## Running Tests

Run all tests:
```bash
npm test
```

Run only e2e tests:
```bash
npm run test:e2e
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Test Coverage

The e2e test suite includes:

### Models Tests (`models.test.ts`)
- Fetching the list of available models
- Validating model properties
- Filtering models by category
- Getting the total count of models

### Chat Tests (`chat.test.ts`)
- **Non-streaming mode:**
  - Sending chat requests and receiving responses
  - Multi-turn conversations
  - Token limit enforcement

- **Streaming mode:**
  - Streaming chat responses
  - Progressive content delivery
  - Finish reason detection

### Beta Responses Tests (`responses.test.ts`)
- Testing the beta responses endpoint
- Note: This endpoint is in alpha/beta and may require updates

## Notes

- Tests make real API calls to OpenRouter, so you need a valid API key
- Tests may consume API credits
- Some tests use the `openai/gpt-3.5-turbo` model by default
- The beta responses endpoint has limited test coverage as it's still in development
