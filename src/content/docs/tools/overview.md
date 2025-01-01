---
title: Overview
description: This guide introduces the built-in tools in eko and how to customize tools.
---

While Eko provides powerful workflow capabilities, the actual execution work is carried out by one or more tools under each action. work together to accomplish complex operational tasks. Each tool plays a vital role, and the Eko framework comes with different built-in tools for various environments.

### definition
```typescript
interface Tool<T, R> {
  name: string;
  description: string;
  input_schema: InputSchema;
  execute: (context: ExecutionContext, params: T) => Promise<R>;
  destroy?: (context: ExecutionContext) => void;
}
```

• name: A unique identifier for the tool (e.g. `open_url`)

• description: A functional description explaining the tool's purpose and usage scenarios 

• input_schema: A JSON-structured definition of the parameter T


### In eko using
```typescript
import { Eko } from "@eko-ai/eko";

let eko = new Eko(config);

// register tool
eko.registerTool(new ComputerUse());
```
