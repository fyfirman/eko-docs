---
title: Hook
description: This guide introduces tools hook handling and how to modify input and output parameters.
---

When Eko executes workflows, hooks can intercept and process Tool inputs and outputs and affect the execution.

## Tool Usage Hooks
Fine-grained control over tool execution:

```typescript
{
  beforeToolUse: async (tool, context, input) => {
    if (tool.name === "export_file") {
      // Add timestamp to filenames
      input.filename = addTimestamp(input.filename);
    }
    return input;
  },

  afterToolUse: async (tool, context, result) => {
    // Process tool results
    await recordToolUsage(tool.name, result);
    return result;
  }
}
```

## In workflow

```typescript
const result = await eko.executeWorkflow(workflow, {
  hooks: {
    // Before a tool is used
    beforeToolUse: async (tool, context, input) => {
      console.log(`Using tool ${tool.name} with:`, input);
      return input; // Can modify tool input
    },

    afterToolUse: async (tool, context, result) => {
      console.log(`Tool ${tool.name} result`, result);
      return result;
    }
  }
});
```
