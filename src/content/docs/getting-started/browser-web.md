---
title: Using Browser Use in Web
description: This guide demonstrates how to use Eko's browser automation capabilities in a Web environment, building on those fundamental concepts.
---

This guide demonstrates how to leverage Eko's browser automation capabilities in a web environment, building upon these fundamental concepts.

## Example

```typescript
import { Eko } from "@eko-ai/eko";

async function test_case() {
  const eko = new Eko({
    llm: 'claude', // supports claude and openai
    apiKey: 'xxx' // your apiKey
  });

  eko.registerTool(new BorwserUse());
  eko.registerTool(new ExportFile());

  // Generate workflow from natural language description
  // Eko will automatically select and sequence the appropriate tools
  const workflow = await eko.generateWorkflow(`
    Product Management Test Cases, Output test report:
    1. Add New Product
    2. Edit Product Details
    3. Update Product Price
    4. Delete Product
  `);

  // Execute
  await eko.execute(workflow);
}
```