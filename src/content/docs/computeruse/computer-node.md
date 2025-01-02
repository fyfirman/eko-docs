---
title: Using computer use in Node.js
description: This guide demonstrates how to use the computer vision feature with a headless browser in a Node.js environment.
---

Using Eko ComputerUse capabilities in Node environment to perform automation operations.


## Execute via Eko workflow
```typescript
import { Eko } from "@eko-ai/eko";
import { ComputerUse } from "@eko-ai/eko/nodejs";

async function example() {
    let eko = new Eko(config);

    eko.registerTool(new ComputerUse());

    const workflow = await eko.generateWorkflow(`
        Open Google search for information about Musk and export it as an md file.
    `);
    await eko.executeWorkflow(workflow);
}
```