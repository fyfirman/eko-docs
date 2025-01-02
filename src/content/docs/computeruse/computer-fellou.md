---
title: Using computer use in Fellou browser
description: This guide demonstrates how to use the built-in computer use function in the [Fellou](https://fellou.ai) browser.
---

Fellou is a next-generation AI browser designed to boost productivity, and the `computer use` capability is one of its core features.

> **NOTICE**: Computeruse in [Fellou](https://fellou.ai) browser is **in Beta**, click [here](https://0ki826721va.typeform.com/to/wQjB1dsS?utm_source=xxxxx&typeform-source=[Fellou](https://fellou.ai).ai) to apply to be an early adopter.

### Why use the `computer use` capability in [Fellou](https://fellou.ai)?  

In daily tasks, we often need to perform complex actions on local devices, such as organizing files, processing media, or interacting with local APIs. Traditional browsers, limited by their sandbox environment, can’t access these local resources. With the `computer use` capability, [Fellou](https://fellou.ai) bridges the gap between the browser and the operating system, bringing AI-powered automation directly to your local environment.

Traditionally, developers need to build separate clients or applications to enable local system interactions. This adds complexity and increases development time. With [Fellou](https://fellou.ai), that’s no longer necessary. Developers can leverage `computer use` directly in the browser, allowing users to access the latest capabilities simply by installing [Fellou](https://fellou.ai)—no additional setup required.  

This streamlined approach makes it easier for developers to create powerful workflows, while users benefit from immediate, seamless access to advanced productivity tools. 

In short, `computer use` makes [Fellou](https://fellou.ai) a true personal AI assistant, helping you tackle tasks that were previously complicated, tedious, or even impossible.

---

### How does `computer use` work in [Fellou](https://fellou.ai)?  

`Computer use` is built on the eko framework and enhanced by [Fellou](https://fellou.ai)’s unique capabilities, working in the following ways:  

1. **JavaScript + Natural Language**: Write workflows in JavaScript or use natural language to generate code, making it accessible to everyone.  
2. **Dual Environment Support**: In [Fellou](https://fellou.ai), eko supports both `browseruse` and `computeruse` capabilities in browser plugins and web environments. This contrasts with other browsers like Chrome, where eko can only enable `browseruse` in browser plugins, and web environments lack access to `browseruse`. This flexibility gives [Fellou](https://fellou.ai) a significant advantage, allowing seamless automation directly within the web environment.  
3. **Built-in RPA with Accessibility (a11y)**: [Fellou](https://fellou.ai) leverages a11y features to provide native robotic process automation (RPA) capabilities. This allows users to automate complex tasks across web pages effortlessly, enhancing efficiency.  
4. **Secure Web-to-Local Interaction**: With user authorization, the `computer use` capability enables web pages to securely access and interact with the user’s computer. This opens the door to advanced workflows while ensuring full control and safety for the user.  

At its core, eko provides a unified abstraction and execution environment, enabling [Fellou](https://fellou.ai) to seamlessly perform tasks both within the browser and on local systems. Combined with [Fellou](https://fellou.ai)’s built-in RPA and secure access features, this makes it a comprehensive solution for automating and enhancing productivity.  

---

### What can `computer use` do?  

Here are some practical use cases for `computer use` in Fellou:  

1. **File Management**: Batch rename files, organize downloads, or clean up duplicates.  
2. **Automated Development Tasks**: Run local build tools, deployment scripts, or even debug projects directly through [Fellou](https://fellou.ai).  
3. **Media Processing**: Convert image formats, compress videos, or transcribe audio files in bulk.  
4. **Cross-Platform Workflows**: Combine web automation with local operations, such as extracting data from a webpage and saving it locally or uploading it to the cloud.  
5. **Application Control**: Open and control local applications (e.g., open Excel, run a photo editor, or launch terminal commands), creating smooth integrations between [Fellou](https://fellou.ai) and native apps.  
6. **Take Screenshots**: Capture screenshots of your screen or specific windows, automate annotations, or integrate with workflows like sharing or saving them to cloud storage.  
7. **Deep Integration**: Connect [Fellou](https://fellou.ai) with local AI models, databases, or IoT devices for more advanced scenarios.  

With `computer use`, [Fellou](https://fellou.ai) creates a seamless productivity platform that integrates the cloud and your local system, freeing you from repetitive tasks so you can focus on meaningful, creative work.  

---

## Example: Real-Time Web Data Integration

- **Scenario:** A user wants to combine web and local data for reporting.
- **How it works**:
    1. Use browseruse to scrape real-time data from a website (e.g., stock prices or weather data).
    2. Use computeruse to fetch complementary local data (e.g., budgets or past records).
    3. Merge the data and generate a report in a preferred format.

### Execute via Eko

```typescript
import { Eko } from "@eko-ai/eko";
import { ExportFile } from "@eko-ai/eko/web";
import { ComputerUse } from "@eko-ai/eko/[Fellou](https://fellou.ai)";

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

## Fellou Computer Use API Refrerence

```typescript
import { Eko } from "@eko-ai/eko";
import { Fellou } from "@eko-ai/eko/Fellou";

async function example() {
    await Fellou.computer.screenshot();
    await Fellou.computer.mouse_move([200, 400]);
    await Fellou.computer.left_click();
    await Fellou.computer.type("Elon Musk");
}
```