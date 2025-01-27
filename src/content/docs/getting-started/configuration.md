---
title: Configuration
description: This guide covers how to configure Eko in different environments.
---

This guide covers how to configure Eko in different environments.

## Browser Extension

Here's how to initialize the demo project which includes configuring the model page:

Click on the current Eko extension details, find `Extension Options` in the details page, then click to configure LLM model API Key.

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

- **OpenAI**: GPT-4o/GPT-4o-mini/GPT-4, _etc_.
- **Claude**: Claude 3.5 Sonnet/Claude Opus, _etc_.

The most essential configuration is setting up your Large Language Models (LLMs) access, which is availbale on both **Chromium Extension, Web** and **Node.js environment**.

> **NOTICE:** It is NOT recommended to configure the API Key directly in the **Web and Chromium Extension environment**, except for debugging purposes only.

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


#### Params

``` typescript
interface ClientOptions {
  /**
   * Defaults to process.env['ANTHROPIC_API_KEY'].
   */
  apiKey?: string | null | undefined;

  /**
   * Defaults to process.env['ANTHROPIC_AUTH_TOKEN'].
   */
  authToken?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['ANTHROPIC_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;

  /**
   * By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   * Only set this option to `true` if you understand the risks and have appropriate mitigations in place.
   */
  dangerouslyAllowBrowser?: boolean;
}
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

#### Params

``` typescript
interface ClientOptions {
  /**
   * Defaults to process.env['OPENAI_API_KEY'].
   */
  apiKey?: string | undefined;

  /**
   * Defaults to process.env['OPENAI_ORG_ID'].
   */
  organization?: string | null | undefined;

  /**
   * Defaults to process.env['OPENAI_PROJECT_ID'].
   */
  project?: string | null | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['OPENAI_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number;

  /**
   * An HTTP agent used to manage HTTP(S) connections.
   *
   * If not provided, an agent will be constructed by default in the Node.js environment,
   * otherwise no agent is used.
   */
  httpAgent?: Agent;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: Core.Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `undefined` or `null` in request options.
   */
  defaultHeaders?: Core.Headers;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Core.DefaultQuery;

  /**
   * By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   * Only set this option to `true` if you understand the risks and have appropriate mitigations in place.
   */
  dangerouslyAllowBrowser?: boolean;
}
```
