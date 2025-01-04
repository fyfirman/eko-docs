---
title: Quickstart
description: This guide will walk you through creating your first Eko workflow in a browser extension environment.
---

This guide teaches you how to create an eko workflow in a browser extension to accomplish complex tasks through browser automation.

## Initialize Project

Let's start by creating a new project and installing Eko:

```bash
# install cli (used to initialize browser extension projects)
npm install @eko-ai/eko-cli -g
# initialize project
eko-cli init browser-extension-demo

cd browser-extension-demo
# install dependencies
npm install
```

## Your First Workflow

Let's create a simple workflow to search for Sam Altman's information and export it to markdown.

<video controls>
  <source src="/docs/run_workflow.mov" />
</video>


Create ts files in the background directory:

```typescript
// src/background/first_workflow.ts
import { Eko } from "@eko-ai/eko";
import { EkoConfig } from "@eko-ai/eko/types";
import { tools, getLLMConfig } from "@eko-ai/eko/extension";

export async function main() {
  // Load LLM model configuration 
  // the current browser plugin project provides a page for configuring LLM parameters
  let config = await getLLMConfig();
  if (!config && !config.apiKey) {
    throw Error("Please configure apiKey");
  }

  // Initialize eko
  let eko = new Eko(config as EkoConfig);

  // Generate a workflow from natural language description
  const workflow = await eko.generateWorkflow(`
    Search Sam Altman's information and summarize it into markdown format for export
  `);

  // Execute the workflow
  await eko.executeWorkflow(workflow);
}
```

Import the main function from the newly created `first_workflow.ts` into the background `index.ts` file.

Project initialization is complete, let's run it!

## Run Project

### Build

Build the project into browser-loadable extension code:

```
$ npm run build:dev
```

### Load Extension

- Open Chrome browser extensions page `chrome://extensions/`
- Enable Developer Mode
- Load unpacked extension, select the dist directory of current project

<video controls>
  <source src="/docs/load_extension.mov" />
</video>

### Configure LLM Model ApiKey

Click on the current eko extension details, find Extension Options in the details page, then click to configure LLM model ApiKey

<video controls>
  <source src="/docs/config_llm.mov" />
</video>

### Run

Pin the current extension in the browser's top-right extensions menu, click the extension to open the popup, and click the RUN button to execute

![RUN](../assets/run_extension.png)

## Next Steps

Now that you have run the first workflow, you can:

- Understand the [Installation](/docs/getting-started/installation.md) of Eko in different environments
- Learn about Eko's [Configuration](/docs/getting-started/configuration.md) in different environments
- Learn more core concepts of eko: [Dive deep into Eko](/docs/getting-started/dive-deep.md)
