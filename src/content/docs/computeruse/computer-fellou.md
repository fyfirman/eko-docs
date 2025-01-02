---
title: Using computer use in Fellou browser
description: This guide demonstrates how to use the built-in computer use function in the Fellou browser.
---

The Fellou browser natively supports Computer use capability, but this feature is only available for websites authorized by users. Operations from unauthorized websites are not permitted.

## Invoke programmatically
```typescript
import { Eko } from "@eko-ai/eko";
import { fellou } from "@eko-ai/eko/fellou";

async function example() {
    await fellou.computer.screenshot();
    await fellou.computer.mouse_move([200, 400]);
    await fellou.computer.left_click();
    await fellou.computer.type("Elon Musk");
}
```

## Execute via Eko workflow
```typescript
import { Eko } from "@eko-ai/eko";
import { ExportFile } from "@eko-ai/eko/web";
import { ComputerUse } from "@eko-ai/eko/fellou";

async function example() {
    let eko = new Eko(config);

    eko.registerTool(new ComputerUse());
    eko.registerTool(new ExportFile());

    const workflow = await eko.generateWorkflow(`
        Open Google search for information about Musk and export it as an md file.
    `);
    await eko.executeWorkflow(workflow);
}
```