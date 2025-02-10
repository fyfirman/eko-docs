---
title: Installation
description: Eko is a JavaScript library that can be used in browser extension, web pages, and node.js. This guide covers installation and setup for different environments.
---

Eko is a JavaScript library that can be used in [Browser Extension](/docs/first-steps/installation#browser-extension), [Node.js Enviroment](http://localhost:4321/docs/first-steps/installation#nodejs-environment), and [Web Enviroment](http://localhost:4321/docs/first-steps/installation#web-environment). This guide covers installation and setup for different environments.

## Browser Extension

When building a browser extension that uses Eko, you'll need to:

```bash
# install cli (used to initialize browser extension projects)
pnpm install @eko-ai/eko-cli -g
# initialize project
eko-cli init browser-extension-demo

cd browser-extension-demo
# install dependencies
pnpm install
```

### Extension Project Structure

```
extension/
├── src/
│   ├── background/
│   │   └── index.ts        # Use Eko here
│   ├── content/
│   │   └── index.ts
│   └── popup/
│       └── index.ts
├── package.json
└── webpack.config.js
```

For a complete example of using Eko in a browser extension, check out our [example extension project](https://github.com/FellouAI/eko-browser-extension).

### Usage Example
```typescript
// src/background/first_workflow.ts
import { Eko } from "@eko-ai/eko";
import { EkoConfig } from "@eko-ai/eko/types";
import { getLLMConfig } from "@eko-ai/eko/extension";

export async function main() {
  // Load LLM model configuration 
  // the current browser plugin project provides a page for configuring LLM parameters
  let config = await getLLMConfig();

  // Initialize eko
  let eko = new Eko(config as EkoConfig);

  // Generate workflow from natural language description
  let workflow = await eko.generate(`
    Search for Elon Musk, summarize search results and export as md
  `);

  // Execute
  await eko.execute(workflow);
}
```

## Node.js Environment

### Install

```bash
pnpm install @eko-ai/eko
```

### Usage Example
```typescript
import { Eko } from "@eko-ai/eko";
import { loadTools } from "@eko-ai/eko/nodejs";

Eko.tools = loadTools();

async function main() {
  // Initialize eko
  let eko = new Eko({
    llm: 'claude',
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  // Generate workflow from natural language description
  let workflow = await eko.generate(`
    Clean up all files in the current directory larger than 1MB
  `);

  // Execute
  await eko.execute(workflow);
}

await main();
```

## Web Environment

For web pages, you can include Eko using a module bundler like webpack or use it directly in the browser.

### Install
```bash
pnpm install @eko-ai/eko
```

### Usage Example
```typescript
import { Eko, ClaudeProvider } from "@eko-ai/eko";
import { loadTools } from "@eko-ai/eko/web";

Eko.tools = loadTools();

async function main() {
  // Initialize LLM provider
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

  // Generate workflow from natural language description
  // Eko will automatically select and sequence the appropriate tools
  const workflow = await eko.generate(`
    Open youtube, Search for Elon Musk, click on the first video, extract and summarize the content, and export as md.
  `);

  // Execute
  await eko.execute(workflow);
}

await main();
```
