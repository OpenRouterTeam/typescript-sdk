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
    toolChoice: "auto",
    parallelToolCalls: false,
    model: "anthropic/claude-4.5-sonnet-20250929",
    models: [
      "<value 1>",
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
      maxTokens: 6415.05,
      enabled: true,
    },
    maxOutputTokens: 5270.85,
    temperature: 0.7,
    topP: 0.9,
    topK: 5913.88,
    promptCacheKey: "<value>",
    previousResponseId: "<id>",
    prompt: {
      id: "prompt-abc123",
      variables: {
        "name": {
          type: "input_text",
          text: "John",
        },
      },
    },
    include: [
      "message.input_image.image_url",
    ],
    background: false,
    safetyIdentifier: "<value>",
    store: false,
    serviceTier: "scale",
    truncation: "disabled",
    stream: false,
    provider: {
      allowFallbacks: false,
      requireParameters: true,
      dataCollection: "deny",
      zdr: true,
      order: [
        "Moonshot AI",
      ],
      only: [
        "<value>",
      ],
      ignore: [
        "<value>",
      ],
      quantizations: [
        "bf16",
      ],
      sort: "price",
      maxPrice: {
        prompt: "<value>",
        completion: 4351.98,
        image: "https://loremflickr.com/916/1698?lock=7420998995259402",
        audio: "<value>",
        request: "<value>",
      },
      experimental: {},
    },
    plugins: [
      {
        id: "file-parser",
        maxFiles: 3555.38,
        pdf: {
          engine: "pdf-text",
        },
      },
    ],
    user: "Parker.OKeefe",
  });

  console.log(result);
}

run();

```
<!-- End SDK Example Usage [usage] -->