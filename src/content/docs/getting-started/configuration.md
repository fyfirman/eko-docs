---
title: Configuration
description: This guide covers how to configure Eko in different environments.
---

This guide covers how to configure Eko in different environments.

## Browser Extension

Here's how to initialize the demo project which includes configuring the model page:

Click on the current eko extension details, find Extension Options in the details page, then click to configure LLM model API Key.

<video controls>
  <source src="/docs/config_llm.mov" />
</video>

Load Configuration:
```typescript
import { Eko } from "@eko-ai/eko";
import { EkoConfig } from "@eko-ai/eko/types";
import { getLLMConfig } from "@eko-ai/eko/extension";

let config = await getLLMConfig();
let eko = new Eko(config as EkoConfig);
```

Or you can use baseURL to config LLM model:

```typescript
import { Eko, ClaudeProvider } from "@eko-ai/eko";

let llmProvider = new ClaudeProvider({
  // Please use your API endpoint for authentication and forwarding on the server side, do not expose API keys in the frontend
  baseURL: 'https://your-api-endpoint.com',
  // User Authentication Request Header
  defaultHeaders: {
    // 'Authorization': `Bearer ${getToken()}`
  }
});

// Initialize eko
let eko = new Eko(llmProvider);
```

## Node.js Environment

In the Node.js environment, it is recommended to configure the API Key in `.env`, example:
```
ANTHROPIC_API_KEY=your api key
OPENAI_API_KEY=your api key
```

Load Configuration:
```typescript
import { Eko } from "@eko-ai/eko";

let eko = new Eko({
  llm: 'claude',
  apiKey: process.env.ANTHROPIC_API_KEY
});
```

## Web Environment

In a web environment, be careful not to expose the API Key in the frontend. Please **proxy and forward** requests through server-side interfaces, and authenticate users through the interfaces.

```typescript
import { Eko, ClaudeProvider } from "@eko-ai/eko";

let llmProvider = new ClaudeProvider({
  // Please use your API endpoint for authentication and forwarding on the server side, do not expose API keys in the frontend
  baseURL: 'https://your-api-endpoint.com',
  // User Authentication Request Header
  defaultHeaders: {
    // 'Authorization': `Bearer ${getToken()}`
  }
});

// Initialize eko
let eko = new Eko(llmProvider);
```

## Supported LLMs

The most essential configuration is setting up your LLM (Large Language Model) access, which is availbale on both **Chromium Extension, Web and Node.js environment**.

> **NOTICE:** It is NOT recommended to configure the apiKey directly in the web environment, except for debugging purposes only.

### Claude
```typescript
import { Eko, ClaudeProvider } from "@eko-ai/eko";

let llmProvider = new ClaudeProvider({
  apiKey: 'your_anthropic_api_key',
  modelName: "claude-3-5-sonnet-20241022",
  maxTokens: 8192
});

// Initialize eko
let eko = new Eko(llmProvider);
```

### OpenAI
```typescript
import { Eko, OpenaiProvider } from "@eko-ai/eko";

let llmProvider = new OpenaiProvider({
  apiKey: 'your_openai_api_key',
  modelName: "gpt-4o",
  maxTokens: 8192
});

// Initialize eko
let eko = new Eko(llmProvider);
```
