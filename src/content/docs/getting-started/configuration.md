---
title: Configuration
description: This guide covers how to configure Eko in different environments.
---

This guide covers how to configure Eko in different environments.

## LLM Configuration

The most essential configuration is setting up your LLM (Large Language Model) access:

```typescript
import { Eko } from "@eko-ai/eko";

// Simple configuration with just API key
const eko = new Eko({
  apiKey: "your_anthropic_api_key",
});

// Full configuration
const eko = new Eko({
  apiKey: "your_anthropic_api_key",
  modelName: "claude-3-5-sonnet-20241022", // Default model
  maxTokens: 4096, // Maximum tokens per request
});
```

### Available Models

Eko currently supports Claude models:

- `claude-3-5-sonnet-20241022` (default) - Balanced performance and capability
- `claude-3-opus-20240229` - Most capable, best for complex tasks
- `claude-3-5-haiku-20241022` - Fast, efficient for simple tasks

Choose based on your needs:

```typescript
// For complex workflows
const eko = new Eko({
  modelName: "claude-3-opus-20240229",
});

// For quick tasks
const eko = new Eko({
  modelName: "claude-3-5-haiku-20241022",
});
```

## Environment-Specific Configuration

### Browser Extension Environment

Store configuration in extension storage:

```typescript
// Save configuration
await chrome.storage.sync.set({
  llmConfig: {
    llm: "claude",
    apiKey: "your_api_key",
    modelName: "claude-3-5-sonnet-20241022",
  },
});

// Use configuration
import { getLLMConfig } from "@eko-ai/eko/extension";

const config = await getLLMConfig();
const eko = new Eko(config);
```

### Node.js Environment

Using environment variables is recommended:

```typescript
// .env file
ANTHROPIC_API_KEY = your_api_key_here;

// Your code
import dotenv from "dotenv";
import { Eko } from "@eko-ai/eko";

dotenv.config();

const eko = new Eko({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

## Workflow Configuration

### Generation Options

Control how workflows are generated from natural language:

```typescript
const workflow = await eko.generateWorkflow("Your task description", {
  temperature: 0.7, // Control randomness (0.0-1.0)
  maxTokens: 1000, // Max tokens for generation
  validate: true, // Validate workflow structure
});
```

### Execution Options

Configure how workflows are executed:

```typescript
const result = await eko.execute(workflow, {
  timeout: 30000, // Maximum execution time (ms)
  hooks: {
    // Execution hooks
    beforeNodeExecution: async (node) => {
      console.log(`Executing: ${node.name}`);
      return true;
    },
  },
});
```
