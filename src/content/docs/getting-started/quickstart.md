# Quick Start Guide

This guide demonstrates using Eko in different environments through practical examples.

## Basic Node.js Example

Let's create a simple workflow that lists directory contents and saves them to a file. This example will demonstrate core Eko concepts including workflow generation, inspection, and execution.

### 1. Environment Setup

First, create a new project and install Eko:

```bash
mkdir eko-demo
cd eko-demo
npm init -y
npm install ekoai
```

Set up your API key by creating a `.env` file:

```bash
ANTHROPIC_API_KEY=your_api_key_here
```

### 2. Create a Basic Workflow

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
  // Eko will automatically convert this into a sequence of tool calls
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

When you run this code, Eko will:

1. Parse the natural language description
2. Generate a workflow using appropriate tools (execute_command for 'ls' and file operations)
3. Save the workflow structure for inspection
4. Execute the workflow to perform the actual task

### 3. Understanding the Generated Workflow

When you inspect `workflow.json`, you'll see a DAG (Directed Acyclic Graph) structure:

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

This structure shows:

- Individual steps (nodes) in the workflow
- Dependencies between steps
- Tools selected for each action
- Input/output relationships

### 4. Adding a Custom Tool

Let's add a custom tool that formats directory listings:

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

// Register the custom tool
eko.registerTool(new DirectoryFormatter());
```

This custom tool:

- Takes directory entries as input
- Offers different formatting options
- Returns formatted text output

### 5. Using Execution Hooks

Hooks let you monitor and control workflow execution:

```typescript
const result = await eko.executeWorkflow(workflow, {
  hooks: {
    // Called before each node executes
    beforeNodeExecution: async (node) => {
      console.log(`Starting step: ${node.name}`);
      return true; // Return false to skip this node
    },

    // Called after each node completes
    afterNodeExecution: async (node, result) => {
      console.log(`Completed ${node.name}:`);
      console.log("Output:", result);
    },

    // Called if a node encounters an error
    onError: async (node, error) => {
      console.error(`Error in ${node.name}:`, error);
      return "retry"; // 'continue' to skip, 'abort' to stop
    },
  },
});
```

Hooks are useful for:

- Monitoring progress
- Debugging workflows
- Implementing retry logic
- Collecting execution metrics

## Browser Extension Example

[Content moved to separate browser extension guide...]

## Next Steps

- Learn more about [available tools](../guides/tools/index.md)
- Understand [workflow DSL](../guides/workflow/index.md)
- Explore [hook system](../guides/hooks.md)
- Study complete [examples](../examples/index.md)
