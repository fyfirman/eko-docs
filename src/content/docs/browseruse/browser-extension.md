---
title: Using Eko in Browser Extensions
description: This guide demonstrates how to use Eko's browser automation capabilities in a Chrome extension environment, building on those fundamental concepts.
---

Before diving into browser extension specifics, we recommend completing the [Quickstart](/docs/getting-started/quickstart) first. The core concepts of workflows and tools introduced there are essential for understanding how Eko operates in a browser extension environment.

This guide demonstrates how to use Eko's browser automation capabilities in a browser extension environment.

## What is browser use
Browser Use is a automation tool that operates web pages through screenshot and [element extraction techniques](/docs/architecture/web-extraction). It can perform various automated operations on web pages and interact with elements without real mouse operations. Browser Use enables you to complete daily tasks efficiently and accurately.

## Why use it in browser extension?

The browser extension solution provides an ideal execution environment for automated operations, retaining the browser's native powerful features while delivering efficient and stable automation capabilities. This approach is particularly suitable for scenarios requiring complex web interactions and multi-page coordinated operations.

1. Seamless operation across tabs and windows
2. Direct DOM manipulation advantages
3. Native screenshot capabilities

## Use Cases

Browser extension have various practical applications in automation:

1. **Automated Operations**: Automatically log into websites and perform complex cross-page tasks.

2. **Data Collection and Crawling**: Automatically scrape web data, analyze and extract key information.

3. **Automated Testing**: Used to simulate user actions to verify website functionality.

4. **Reducing Repetitive Work**: Automate routine tedious tasks such as data entry and information verification to improve work efficiency.

## Example

Open youtube, Search for Elon Musk, click on the first video, extract and summarize the content, and export as md.

```typescript
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
  let workflow = await eko.generateWorkflow(`
    Open youtube, Search for Elon Musk, click on the first video, extract and summarize the content, and export as md.
  `);

  // Execute
  await eko.execute(workflow);
}
```

Workflow execution process:

<video controls>
  <source src="/docs/run_browser_use.mov" />
</video>

## Next Steps

You now understand the browser use based on extended plugins, you can:

- Learn about [web extraction techniques](/docs/architecture/web-extraction) in Browser use
- Explore [Available Tools](/docs/tools/available#browser-extension) for Browser extension
- Learn more core concepts of eko: [Dive deep into Eko](/docs/getting-started/dive-deep)
