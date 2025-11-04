# OpenRouter TypeScript SDK

The OpenRouter TypeScript SDK is a type-safe toolkit for building AI applications with access to 300+ language models through a unified API.

## Why use the OpenRouter SDK?

Integrating AI models into applications involves handling different provider APIs, managing model-specific requirements, and avoiding common implementation mistakes. The OpenRouter SDK standardizes these integrations and protects you from footguns.

```typescript
import OpenRouter from '@openrouter/sdk';

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

const response = await client.chat.completions.create({
  model: "minimax/minimax-m2",
  messages: [
    { role: "user", content: "Explain quantum computing" }
  ]
});
```

The SDK provides three core benefits:

### Auto-generated from API specifications

The SDK is automatically generated from OpenRouter's OpenAPI specs and updated with every API change. New models, parameters, and features appear in your IDE autocomplete immediately. No manual updates. No version drift.

```typescript
// When new models launch, they're available instantly
const response = await client.chat.completions.create({
  model: "minimax/minimax-m2",
});
```

### Type-safe by default

Every parameter, response field, and configuration option is fully typed. Invalid configurations are caught at compile time, not in production.

```typescript
const response = await client.chat.completions.create({
  model: "minimax/minimax-m2",
  messages: [
    { role: "user", content: "Hello" }
    // ← Your IDE validates message structure
  ],
  temperature: 0.7, // ← Type-checked
  stream: true      // ← Response type changes based on this
});
```

**Actionable error messages:**

```typescript
// Instead of generic errors, get specific guidance:
// "Model 'openai/o1-preview' requires at least 2 messages.
//  You provided 1 message. Add a system or user message."
```

**Type-safe streaming:**

```typescript
const stream = await client.chat.completions.create({
  model: "minimax/minimax-m2",
  messages: [{ role: "user", content: "Write a story" }],
  stream: true
});

for await (const chunk of stream) {
  // Full type information for streaming responses
  const content = chunk.choices[0]?.delta?.content;
}
```

## Installation

```bash
npm install @openrouter/sdk
```

Get your API key from [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys).

## Quick start

```typescript
import OpenRouter from '@openrouter/sdk';

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

const response = await client.chat.completions.create({
  model: "minimax/minimax-m2",
  messages: [
    { role: "user", content: "Hello!" }
  ]
});

console.log(response.choices[0].message.content);
```
