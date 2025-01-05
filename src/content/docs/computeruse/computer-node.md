---
title: Using computer use in Node.js
description: This guide demonstrates how to use the computer vision feature with a headless browser in a Node.js environment.
---

## Why Use Computer Use in Node.js?

Unlike browser-based computer use which focuses on GUI automation, Node.js computer use primarily deals with command-line interface (CLI) operations and file system management. This makes it particularly suitable for:

- DevOps automation and system administration
- Bulk file processing and organization
- Server maintenance and monitoring
- Build process automation
- Automated testing and deployment

## How Node.js Computer Use Works

In the Node.js environment, Eko provides a set of tools designed specifically for server-side and CLI automation:

1. **Command Execution**: Safely run shell commands with confirmation
2. **File System Operations**: Read and write files with built-in safeguards
3. **Process Management**: Control system processes and background tasks

The execution model ensures safety through:

- Explicit confirmation for destructive operations
- Sandboxed execution environments
- Clear audit trails of all operations

## Key Tools for Node.js

### CommandExecute Tool

Executes shell commands with safety controls:

```typescript
const tool = new CommandExecute();
await tool.execute(context, {
  command: "ls -la",
  // Will prompt for confirmation before executing
});
```

### FileRead Tool

Safely read file contents:

```typescript
const tool = new FileRead();
const content = await tool.execute(context, {
  path: "/path/to/file.txt",
  encoding: "utf8",
});
```

### FileWrite Tool

Write content to files with confirmation:

```typescript
const tool = new FileWrite();
await tool.execute(context, {
  path: "/path/to/output.txt",
  content: "Hello World",
  append: false,
});
```

See the [Available Tools](/docs/tools/available#nodejs) section for complete documentation of all Node.js tools.

## Example: File Cleanup Workflow

Let's examine how Eko can automate a file cleanup task:

```typescript
import { config } from "dotenv";
import { Eko, WorkflowParser } from "@eko-ai/eko";
import { CommandExecute, FileRead, FileWrite } from "@eko-ai/eko/nodejs";

// Initialize environment variables
config();

async function main() {
  // Initialize Eko
  const eko = new Eko(process.env.ANTHROPIC_API_KEY);

  try {
    // Create and execute a simple workflow
    const workflow = await eko.generateWorkflow(`
      Clean up all files in the current directory larger than 1MB
    `);

    const workflowJson = WorkflowParser.serialize(workflow);
    console.log("Generated workflow:");
    console.log(workflowJson);

    console.log("Executing workflow...");
    await eko.execute(workflow);
    console.log("Done!");
  } catch (error) {
    console.error("Error:", error);
  }
}

main().catch(console.error);
```

This workflow will:

1. Use `CommandExecute` to list files and their sizes
2. Filter files larger than 1MB
3. Request confirmation before deletion
4. Execute the cleanup operation
5. Generate a report of actions taken

[Video: Demo of the file cleanup workflow in action]

## Typical Use Cases

### 1. DevOps Automation

```typescript
const workflow = await eko.generateWorkflow(`
  Deploy the application:
  1. Run unit tests
  2. Build the project
  3. Deploy to staging
  4. Run integration tests
  5. If successful, deploy to production
`);
```

### 2. File Management

```typescript
const workflow = await eko.generateWorkflow(`
  Organize photos:
  1. Find all image files
  2. Group by date taken
  3. Move to year/month folders
  4. Generate thumbnail previews
`);
```

### 3. System Maintenance

```typescript
const workflow = await eko.generateWorkflow(`
  Daily system maintenance:
  1. Check disk usage
  2. Remove temp files
  3. Backup databases
  4. Update system packages
`);
```

## Next Steps

- Explore [Available Tools](/docs/tools/available#nodejs) for Node.js
- Learn about [Custom Tool Development](/docs/tools/custom)
- Understand [Hook System](/docs/tools/hook) for workflow control
