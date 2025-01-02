---
title: Hook System
description: Eko's hook system lets you monitor, modify, and control workflow execution at multiple levels. While the two-layer execution model and tool system provide the basic structure, hooks give you the power to fine-tune how workflows actually run.
---

Eko's hook system lets you monitor, modify, and control workflow execution at multiple levels. While the two-layer execution model and tool system provide the basic structure, hooks give you the power to fine-tune how workflows actually run.

## Understanding Hooks

When Eko executes a workflow, it moves through a series of well-defined points where hooks can intercept and influence the execution. These points include workflow start/end, subtask transitions, tool selection, and error handling.

```typescript
const result = await eko.executeWorkflow(workflow, {
  hooks: {
    // Before any execution begins
    beforeWorkflow: async (workflow) => {
      console.log("Starting workflow:", workflow.name);
      return workflow; // Can modify workflow before execution
    },

    // Before each subtask executes
    beforeSubtask: async (subtask, context) => {
      console.log(`Starting subtask: ${subtask.name}`);
      return true; // Return false to skip this subtask
    },

    // Before a tool is used
    beforeToolUse: async (toolName, input) => {
      console.log(`Using tool ${toolName} with:`, input);
      return input; // Can modify tool input
    }
  }
});
```

## Hook Categories

### Workflow Level Hooks
Control the overall workflow execution:

```typescript
{
  beforeWorkflow: async (workflow) => {
    // Prepare resources, validate conditions
    await loadRequiredResources();
    return workflow;
  },

  afterWorkflow: async (result) => {
    // Clean up, save results
    await saveResults(result);
  }
}
```

### Subtask Hooks
Monitor and control individual subtasks:

```typescript
{
  beforeSubtask: async (subtask, context) => {
    if (subtask.name === "critical_operation") {
      // Additional validation for critical steps
      const canProceed = await validateConditions(context);
      return canProceed;
    }
    return true;
  },

  afterSubtask: async (subtask, result) => {
    // Process subtask results
    await logSubtaskResult(subtask.name, result);
  }
}
```

### Tool Usage Hooks
Fine-grained control over tool execution:

```typescript
{
  beforeToolUse: async (toolName, input) => {
    if (toolName === "export_file") {
      // Add timestamp to filenames
      input.filename = addTimestamp(input.filename);
    }
    return input;
  },

  afterToolUse: async (toolName, result) => {
    // Process tool results
    await recordToolUsage(toolName, result);
    return result;
  }
}
```

### Error Handling Hooks
Customize error recovery strategies:

```typescript
{
  onError: async (error, context) => {
    if (error.type === "tool_failed") {
      // Try alternative tool
      return "retry";
    } else if (error.type === "invalid_input") {
      // Skip failed step
      return "continue";
    }
    // Stop execution
    return "abort";
  }
}
```

## Using Hooks Effectively

Let's look at a complete example that shows how hooks can work together to implement sophisticated control flows:

```typescript
const workflow = await eko.generateWorkflow(
  "Search for conference papers and summarize them"
);

const results = [];
await eko.executeWorkflow(workflow, {
  hooks: {
    beforeWorkflow: async (workflow) => {
      // Initialize resources
      await setupSearchAPI();
      return workflow;
    },

    beforeSubtask: async (subtask, context) => {
      // Rate limiting for API calls
      if (subtask.name === "fetch_paper") {
        await rateLimiter.wait();
      }
      return true;
    },

    beforeToolUse: async (toolName, input) => {
      // Tool-specific preprocessing
      if (toolName === "web_search") {
        input.query = enhanceSearchQuery(input.query);
      }
      return input;
    },

    afterToolUse: async (toolName, result) => {
      // Collect results
      if (toolName === "extract_content") {
        results.push(result);
      }
      return result;
    },

    onError: async (error, context) => {
      if (error.code === "RATE_LIMIT_EXCEEDED") {
        await sleep(5000);
        return "retry";
      }
      return "continue";
    },

    afterWorkflow: async (result) => {
      // Process collected results
      await saveResults(results);
    }
  }
});
```

## Advanced Hook Patterns

### State Management
Use hooks to maintain state across workflow execution:

```typescript
const state = new Map();

const hooks = {
  beforeSubtask: async (subtask, context) => {
    // Share state between subtasks
    context.state = state;
    return true;
  },

  afterToolUse: async (toolName, result) => {
    // Update shared state
    state.set(toolName, result);
    return result;
  }
};
```

### Dynamic Tool Configuration
Adjust tool behavior based on execution context:

```typescript
const hooks = {
  beforeToolUse: async (toolName, input, context) => {
    if (toolName === "web_search") {
      // Adapt search parameters based on previous results
      const previousResults = context.state.get("previous_searches");
      input.query = refineQuery(input.query, previousResults);
    }
    return input;
  }
};
```

### Progressive Enhancement
Add capabilities without modifying the base workflow:

```typescript
const hooks = {
  beforeSubtask: async (subtask, context) => {
    // Add metrics collection
    const start = performance.now();
    context.metrics = context.metrics || new Map();

    return {
      ...context,
      afterSubtask: () => {
        const duration = performance.now() - start;
        context.metrics.set(subtask.name, duration);
      }
    };
  }
};
```

## Best Practices

1. Keep hooks focused and composable
2. Handle errors gracefully in hooks
3. Use typings for better development experience
4. Document hook behaviors and side effects
5. Test hooks independently of workflows

## Next Steps

- Learn about [Error Handling](../guides/error-handling.md) in depth
- Study [Workflow Patterns](workflow-structure.md)
- Explore [Environment-Aware Architecture](architecture.md)
