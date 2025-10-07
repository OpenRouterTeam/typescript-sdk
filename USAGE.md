<!-- Start SDK Example Usage [usage] -->
```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.beta.responses.sendRequest({
    input: "Hello, how can I help you today?",
    instructions: "<value>",
    metadata: {
      "user_id": "user-123",
      "session_id": "session-abc",
    },
    tools: [
      {
        type: "function",
        function: {
          name: "<value>",
          description:
            "petal righteously sans athwart down front tuxedo overfeed",
          parameters: {
            "key": "<value>",
          },
          strict: false,
        },
      },
    ],
    toolChoice: "auto",
    parallelToolCalls: true,
    model: "Fortwo",
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
      effort: "medium",
      summary: "auto",
    },
    maxOutputTokens: 6181.51,
    temperature: 8715.21,
    topP: 3848.26,
    topK: 2241.14,
    promptCacheKey: "<value>",
    previousResponseId: "<id>",
    prompt: {
      id: "prompt-123",
      variables: {
        "user_name": {
          type: "input_text",
          text: "John",
        },
      },
    },
    include: [
      "file_search_call.results",
    ],
    background: false,
    safetyIdentifier: "<value>",
    store: false,
    serviceTier: "scale",
    truncation: "auto",
    stream: null,
    provider: null,
    plugins: [
      {
        id: "chain-of-thought",
      },
    ],
    user: "Ilene51",
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->