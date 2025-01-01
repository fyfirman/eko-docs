---
title: Custom Tool
description: This guide introduces how to customize tools in eko.
---

When built-in tools cannot meet actual requirements, custom tools can be created to accomplish specific tasks.

## WebSearch tool example
```typescript
export class WebSearch implements Tool<WebSearchParam, WebSearchResult[]> {
  name: string;
  description: string;
  input_schema: InputSchema;

  constructor() {
    this.name = 'web_search';
    this.description = 'Use web search to return search results';
    this.input_schema = {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'search for keywords',
        },
        maxResults: {
          type: 'integer',
          description: 'Maximum search results, default 5',
        },
      },
      required: ['query'],
    };
  }

  async execute(context: ExecutionContext, params: WebSearchParam): Promise<WebSearchResult[]> {
    let query = params.query;
    let maxResults = params.maxResults;
    let result: WebSearchResult[];
    // TODO result = Specific search logic...
    return result;
  }
}
```

## Type Definition
```typescript
interface Tool<T, R> {
  name: string; // tool name
  description: string; // A functional description explaining the tool's purpose and usage scenarios
  input_schema: InputSchema; // A functional description explaining the tool's purpose and usage scenarios
  execute: (context: ExecutionContext, params: T) => Promise<R>; // Execute function
  destroy?: (context: ExecutionContext) => void; // destroy
}

interface InputSchema {
  type: 'object';
  properties?: Properties;
  required?: Array<string>;
}

interface Properties {
  [key: string]: Property;
}

interface Property {
  type: 'string' | 'integer' | 'boolean' | 'array' | 'object';
  description?: string;
  items?: InputSchema;
  enum?: Array<string | number>;
  properties?: Properties;
}
```

## In eko using
```typescript
import { Eko } from "@eko-ai/eko";

let eko = new Eko(config);
// Register the tool
eko.registerTool(new WebSearch());
// workflow
const workflow = await eko.generateWorkflow(
  "Search for information about Musk"
);
// execute workflow
await eko.execute(workflow);
```
