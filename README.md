![hero illustration](./assets/banner.png)

# OpenRouter SDK

The [OpenRouter SDK](https://openrouter.ai/docs/sdks/typescript) is a TypeScript toolkit designed to help you build AI-powered features and solutions in any JS or TS based runtime. Giving you easy access to 400+ models across providers in an easy and type-safe way.

To learn more about how to use the OpenRouter SDK, check out our [API Reference](https://openrouter.ai/docs/sdks/typescript/reference) and [Documentation](https://openrouter.ai/docs/sdks/typescript).

<!-- No Summary [summary] -->

<!-- No Table of Contents [toc] -->

<!-- Start SDK Installation [installation] -->
## SDK Installation

The SDK can be installed with either [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [bun](https://bun.sh/) or [yarn](https://classic.yarnpkg.com/en/) package managers.

### NPM

```bash
npm add @openrouter/sdk
```

### PNPM

```bash
pnpm add @openrouter/sdk
```

### Bun

```bash
bun add @openrouter/sdk
```

### Yarn

```bash
yarn add @openrouter/sdk
```

> [!NOTE]
> This package is published as an ES Module (ESM) only. For applications using
> CommonJS, use `await import("@openrouter/sdk")` to import and use this package.
<!-- End SDK Installation [installation] -->

## Migrating `callModel` to `@openrouter/agent`

> [!IMPORTANT]
> `callModel` and its associated types have moved to the [`@openrouter/agent`](https://www.npmjs.com/package/@openrouter/agent) package. If you are using `callModel`, tool definitions, or related types from `@openrouter/sdk`, you should migrate to `@openrouter/agent`.
>
> To assist with the migration, run:
>
> ```bash
> npx skills add OpenRouterTeam/skills --skill openrouter-agent-migration
> ```

<!-- Start Requirements [requirements] -->
## Requirements

For supported JavaScript runtimes, please consult [RUNTIMES.md](RUNTIMES.md).
<!-- End Requirements [requirements] -->

<!-- No SDK Example Usage [usage] -->
## SDK Usage

```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter();

const result = await openRouter.chat.send({
  messages: [
    {
      role: "user",
      content: "Hello, how are you?",
    },
  ],
  model: "openai/gpt-5",
  provider: {
    zdr: true,
    sort: "price",
  },
  stream: true
});

for await (const chunk of result) {
  console.log(chunk.choices[0].delta.content)
}

```

<!-- No Authentication [security] -->

<!-- No Available Resources and Operations [operations] -->

<!-- No Standalone functions [standalone-funcs] -->

<!-- No React hooks with TanStack Query [react-query] -->

<!-- No Server-sent event streaming [eventstream] -->

<!-- No Retries [retries] -->

<!-- No Error Handling [errors] -->

<!-- No Server Selection [server] -->

<!-- No Custom HTTP Client [http-client] -->

<!-- Start Pagination [pagination] -->
## Pagination

Some of the endpoints in this SDK support pagination. To use pagination, you
make your SDK calls as usual, but the returned response object will also be an
async iterable that can be consumed using the [`for await...of`][for-await-of]
syntax.

[for-await-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

Here's an example of one such pagination call:

```typescript
import { OpenRouter } from "@openrouter/sdk";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.byok.list();

  for await (const page of result) {
    console.log(page);
  }
}

run();

```
<!-- End Pagination [pagination] -->

<!-- Start File uploads [file-upload] -->
## File uploads

Certain SDK methods accept files as part of a multi-part request. It is possible and typically recommended to upload files as a stream rather than reading the entire contents into memory. This avoids excessive memory consumption and potentially crashing with out-of-memory errors when working with very large files. The following example demonstrates how to attach a file stream to a request.

> [!TIP]
>
> Depending on your JavaScript runtime, there are convenient utilities that return a handle to a file without reading the entire contents into memory:
>
> - **Node.js v20+:** Since v20, Node.js comes with a native `openAsBlob` function in [`node:fs`](https://nodejs.org/docs/latest-v20.x/api/fs.html#fsopenasblobpath-options).
> - **Bun:** The native [`Bun.file`](https://bun.sh/docs/api/file-io#reading-files-bun-file) function produces a file handle that can be used for streaming file uploads.
> - **Browsers:** All supported browsers return an instance to a [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) when reading the value from an `<input type="file">` element.
> - **Node.js v18:** A file stream can be created using the `fileFrom` helper from [`fetch-blob/from.js`](https://www.npmjs.com/package/fetch-blob).

```typescript
import { OpenRouter } from "@openrouter/sdk";
import { openAsBlob } from "node:fs";

const openRouter = new OpenRouter({
  httpReferer: "<value>",
  appTitle: "<value>",
  appCategories: "<value>",
  apiKey: process.env["OPENROUTER_API_KEY"] ?? "",
});

async function run() {
  const result = await openRouter.stt.createTranscriptionMultipart({
    requestBody: {
      file: await openAsBlob("example.file"),
      language: "en",
      model: "openai/whisper-large-v3",
    },
  });

  console.log(result);
}

run();

```
<!-- End File uploads [file-upload] -->

<!-- Start Debugging [debug] -->
## Debugging

You can setup your SDK to emit debug logs for SDK requests and responses.

You can pass a logger that matches `console`'s interface as an SDK option.

> [!WARNING]
> Beware that debug logging will reveal secrets, like API tokens in headers, in log messages printed to a console or files. It's recommended to use this feature only during local development and not in production.

```typescript
import { OpenRouter } from "@openrouter/sdk";

const sdk = new OpenRouter({ debugLogger: console });
```

You can also enable a default debug logger by setting an environment variable `OPENROUTER_DEBUG` to true.
<!-- End Debugging [debug] -->

<!-- Placeholder for Future Speakeasy SDK Sections -->

# Development

## Running Tests

To run the test suite, you'll need to set up your environment with an OpenRouter API key.

### Local Development

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your OpenRouter API key:

   ```bash
   OPENROUTER_API_KEY=your_api_key_here
   ```

3. Run the tests:

   ```bash
   npx vitest
   ```