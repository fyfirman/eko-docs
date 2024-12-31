---
title: Quick Start Guide
description: This guide will walk you through creating your first Eko workflow in a Node.js environment.
---

# Quick Start Guide

This guide will walk you through creating your first Eko workflow in a Node.js environment. While Eko also offers powerful browser automation capabilities (which we'll explore in the [Browser Extension Guide](browser-extension.md)), starting with Node.js provides the clearest introduction to core concepts.

## Setting Up Your Environment

Let's start by creating a new project and installing Eko:

```bash
mkdir eko-demo
cd eko-demo
npm init -y
npm install ekoai
```

You'll need an API key from Anthropic to use Claude, Eko's default language model. You can obtain one by visiting [Anthropic's API documentation](https://docs.anthropic.com/claude/reference/getting-started-with-the-api). Once you have your key, create a `.env` file in your project root:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

## Your First Workflow

Let's create a simple workflow that lists directory contents and saves them to a file:

```typescript
import { Eko } from "ekoai";
import dotenv from "dotenv";
import fs from "fs/promises";

dotenv.config();

async function main() {
  // Initialize Eko with LLM configuration
  const eko = new Eko({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  // Generate a workflow from natural language description
  const workflow = await eko.generateWorkflow(
    "List the contents of the current directory and save them to a file called contents.txt"
  );

  // Let's examine the generated workflow
  const workflowJson = JSON.stringify(workflow, null, 2);
  await fs.writeFile("workflow.json", workflowJson);
  console.log("Generated workflow saved to workflow.json");

  // Execute the workflow
  const result = await eko.executeWorkflow(workflow);
  console.log("Workflow completed:", result);
}

main().catch(console.error);
```

When you inspect `workflow.json`, you'll see how Eko has broken down your task:

```json
{
  "id": "directory-contents",
  "nodes": [
    {
      "id": "list-contents",
      "action": {
        "type": "script",
        "name": "getDirectoryContents",
        "tools": ["execute_command"]
      }
    },
    {
      "id": "save-file",
      "dependencies": ["list-contents"],
      "action": {
        "type": "script",
        "name": "saveToFile",
        "tools": ["file_operations"]
      }
    }
  ]
}
```

When executing this workflow, Eko first plans the entire task by breaking it into subtasks (like listing files and saving output), then executes each subtask by having the language model decide which tool operations to perform. You can learn more about this process in our [Two-Layer Execution Model](../core-concepts/execution-model.md) guide.

## Workflow Hooks

Eko provides a powerful hook system that lets you not only monitor but actively control workflow execution. Through hooks, you can inspect each step, modify inputs and outputs, retry failed operations, or even skip certain steps entirely. Here's a simple example that demonstrates basic monitoring:

```typescript
const result = await eko.executeWorkflow(workflow, {
  hooks: {
    // Called before each step begins
    beforeNodeExecution: async (node) => {
      console.log(`Starting step: ${node.name}`);
      console.log(
        "Tools available:",
        node.action.tools.map((t) => t.name)
      );
      return true; // Return false to skip this step
    },

    // Called after each step completes
    afterNodeExecution: async (node, output) => {
      console.log(`Completed ${node.name}`);
      console.log("Output:", output);
    },

    // Called when the LLM wants to use a tool
    beforeToolUse: async (node, toolName, input) => {
      console.log(`Using tool ${toolName} with input:`, input);
      return true; // Return false to prevent tool use
    },

    // Handle errors in specific steps
    onError: async (node, error) => {
      console.error(`Error in ${node.name}:`, error);
      return "retry"; // 'continue' to skip, 'abort' to stop
    },
  },
});
```

Running this code produces output like:

```
Starting step: list-contents
Tools available: ['execute_command']
Using tool execute_command with input: { command: 'ls' }
Completed list-contents
Output: ['file1.txt', 'file2.txt', ...]

Starting step: save-file
Tools available: ['file_operations']
Using tool file_operations with input: { path: 'contents.txt', content: '...' }
Completed save-file
Output: { success: true }
```

## Custom Tools

You can extend Eko's capabilities by adding custom tools. Here's an example that formats directory listings:

```typescript
import { Tool, InputSchema } from "ekoai/types";

class DirectoryFormatter implements Tool {
  name = "format_directory";
  description = "Format directory listing with size and date information";

  input_schema: InputSchema = {
    type: "object",
    properties: {
      entries: {
        type: "array",
        description: "Array of directory entries",
      },
      format: {
        type: "string",
        enum: ["simple", "detailed"],
        description: "Output format style",
      },
    },
    required: ["entries"],
  };

  async execute(context, params) {
    const { entries, format = "simple" } = params as any;

    if (format === "simple") {
      return entries.map((entry) => entry.name).join("\n");
    }

    return entries
      .map(
        (entry) => `${entry.name} - ${entry.size} bytes - ${entry.modifiedAt}`
      )
      .join("\n");
  }
}

// Register the tool
eko.registerTool(new DirectoryFormatter());

// Now generate a workflow that uses formatting
const workflow = await eko.generateWorkflow(
  "List the directory contents with detailed file information and save to contents.txt"
);
```

The generated workflow will now include an additional formatting step:

```json
{
  "id": "detailed-directory-contents",
  "nodes": [
    {
      "id": "list-contents",
      "action": {
        "type": "script",
        "name": "getDirectoryContents",
        "tools": ["execute_command"]
      }
    },
    {
      "id": "format-contents",
      "dependencies": ["list-contents"],
      "action": {
        "type": "script",
        "name": "formatOutput",
        "tools": ["format_directory"],
        "input": {
          "format": "detailed"
        }
      }
    },
    {
      "id": "save-file",
      "dependencies": ["format-contents"],
      "action": {
        "type": "script",
        "name": "saveToFile",
        "tools": ["file_operations"]
      }
    }
  ]
}
```

## Beyond File Operations

While this example demonstrates core concepts using simple file operations, Eko's capabilities extend far beyond this. In the [Browser Extension Guide](browser-extension.md), you'll discover how to use these same principles with Eko's rich set of browser automation tools to:

- Control web navigation
- Interact with page elements
- Extract web content
- Manage browser windows and tabs
- Automate complex sequences of browser actions

The workflow concepts you've learned here - breaking down tasks, tool selection, and dependency management - form the foundation for understanding these more advanced capabilities.

## Next Steps

Now that you understand the basics, you can:

- Learn about the [Two-Layer Execution Model](../core-concepts/execution-model.md) in depth
- Explore browser automation in the [Browser Extension Guide](browser-extension.md)
- Discover more about [available tools](../guides/tools/index.md)
- Study the [workflow DSL](../guides/workflow/index.md)
