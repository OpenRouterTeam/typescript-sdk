# OpenRouter SDK Next.js Demo

This is a demonstration application that shows how to create a chat interface
using the [OpenRouter SDK](https://github.com/openrouterteam/typescript-sdk). The
app implements OAuth 2.0 authentication flow and provides a complete chat
experience with multiple AI models.

> **⚠️ Security Notice**: This demo application stores API keys in localStorage
> for demonstration purposes only. **Do not use this approach in production
> applications**.

## Features

- **OAuth 2.0 Integration**: Secure authentication flow with OpenRouter
- **Multi-Model Chat**: Access to various AI models (GPT-4, Claude, Gemini, etc.)
- **Real-time Streaming**: Live response streaming for better user experience
- **Modern UI**: Clean interface built with Tailwind CSS and shadcn/ui components
- **TypeScript**: Full type safety with the OpenRouter SDK

## Prerequisites

- Node.js 18 or later
- An [OpenRouter account](https://openrouter.ai)
- OpenRouter application configured with OAuth callback

## Installation

1. Clone the repository and navigate to the example directory:
```bash
git clone <repository-url>
cd typescript-sdk/examples/nextjs-example
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### OAuth Setup

The application is pre-configured to use `http://localhost:3000/` as the OAuth
callback URL. If you need to change this:

1. Update the `OAUTH_CALLBACK_URL` in `src/lib/config.ts`
2. Configure your OpenRouter application with the matching callback URL

### Environment Variables

No environment variables are required for this demo, as it uses client-side
OAuth flow.

## Usage

1. **Connect Your Account**: Click "Connect OpenRouter Account" to authenticate
   via OAuth
2. **Start Chatting**: Once connected, navigate to the chat interface
3. **Select Models**: Choose from available AI models using the dropdown menu
4. **Send Messages**: Type your message and press Enter to send

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page with OAuth flow
│   ├── chat/page.tsx         # Chat interface
│   └── oauth/callback/       # OAuth callback handler
├── components/ui/            # Reusable UI components
├── lib/
│   ├── config.ts            # OAuth and app configuration
│   └── hooks/               # Custom React hooks
└── ...
```

## Key Implementation Details

### OAuth Flow

- Uses OpenRouter's OAuth 2.0 implementation
- Handles authorization codes and token exchange
- Stores credentials in localStorage (demo only)

### Chat Integration

- Implements streaming responses using the OpenRouter SDK
- Supports multiple AI models through a single interface
- Real-time message updates with proper state management

### SDK Usage

```typescript
import { OpenRouterCore } from "@openrouter/sdk/core";
import { chatSend } from "@openrouter/sdk/funcs/chatSend";

const openRouter = new OpenRouterCore({ apiKey });
const result = await chatSend(openRouter, {
  model: "openai/gpt-4o",
  messages: conversationHistory,
  stream: true
});
```

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

