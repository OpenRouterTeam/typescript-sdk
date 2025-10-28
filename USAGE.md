<!-- Start SDK Example Usage [usage] -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.beta.responses.send({
    input: [
      {
        type: "message",
        role: "user",
        content: "Hello, how are you?",
      },
    ],
    instructions: "<value>",
    metadata: {
      "user_id": "123",
      "session_id": "abc-def-ghi",
    },
    tools: [
      {
        type: "function",
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        strict: true,
        parameters: {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
            },
          },
        },
      },
    ],
    toolChoice: {
      type: "function",
      name: "<value>",
    },
    parallelToolCalls: true,
    model: "anthropic/claude-4.5-sonnet-20250929",
    models: [
      "<value 1>",
      "<value 2>",
    ],
    text: {
      format: {
        type: "text",
      },
      verbosity: "medium",
    },
    reasoning: {
      effort: "minimal",
      summary: "auto",
      maxTokens: 5632.72,
      enabled: true,
    },
    maxOutputTokens: 5913.88,
    temperature: 0.7,
    topP: 0.9,
    topK: 1770.66,
    promptCacheKey: "<value>",
    previousResponseId: "<id>",
    prompt: {
      id: "<id>",
      variables: {
        "key": {
          type: "input_text",
          text: "Hello, how can I help you?",
        },
      },
    },
    include: [
      "file_search_call.results",
    ],
    background: false,
    safetyIdentifier: "<value>",
    store: false,
    serviceTier: "auto",
    truncation: "auto",
    provider: {
      allowFallbacks: false,
      requireParameters: false,
      dataCollection: "deny",
      zdr: true,
      order: [
        "OpenAI",
      ],
      only: null,
      ignore: [
        "OpenAI",
      ],
      quantizations: [
        "fp16",
      ],
      sort: "price",
      maxPrice: {
        prompt: "1000",
        completion: 1000,
        image: 1000,
        audio: 1000,
        request: 1000,
      },
      experimental: {},
    },
    plugins: [
      {
        id: "file-parser",
        maxFiles: 6167.86,
        pdf: {
          engine: "native",
        },
      },
    ],
    user: "Minnie.Ratke",
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->