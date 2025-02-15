---
title: Hook System
description: Eko's hook system enables programmatic inspection and control of workflow execution, allowing developers to monitor, modify, and intervene in the automation process at multiple levels of granularity.
---

## Understanding Hooks in Eko

When building AI-powered automation, developers often need to monitor what's happening, modify behavior on the fly, or intervene when necessary. While hooks are a familiar concept in software development, in Eko they serve a unique purpose: they bridge the gap between AI-driven automation and human oversight.

Think of Eko's hooks as strategic checkpoints in your workflow's execution. Just as a train conductor might check tickets at specific stations, hooks let you inspect and influence your workflow at key moments. This is particularly important when working with AI systems, where you might need to:

- Monitor AI's decision-making process
- Validate or modify inputs before they're processed
- Adjust outputs before they're used
- Collect metrics about the automation's performance
- Intervene when necessary while letting automation handle the routine work

## Hook Types

Eko provides hooks at three different levels of granularity, each serving a distinct purpose:

### 1. Workflow Hooks

These operate at the highest level, giving you oversight of the entire automation process. Like bookends, they let you prepare for and wrap up the workflow execution:

```typescript
const callback = {
  hooks: {
    // Before workflow starts - perfect for setup and validation
    beforeWorkflow: async (workflow: Workflow) => {
      console.log("Starting workflow:", workflow.name);
    },

    // After workflow completes - ideal for cleanup and final processing
    afterWorkflow: async (
      workflow: Workflow,
      variables: Map<string, unknown>
    ) => {
      console.log("Workflow completed:", workflow.name);
      // Process final workflow variables
      console.log("Final variables:", Object.fromEntries(variables));
    },
  },
};
```

### 2. Subtask Hooks

These provide visibility into individual steps within your workflow. They're like checkpoints between major stages of your automation:

```typescript
const callback = {
  hooks: {
    // Before each subtask - monitor and potentially skip tasks
    beforeSubtask: async (subtask: WorkflowNode, context: ExecutionContext) => {
      console.log(`Starting subtask: ${subtask.name}`);
    },

    // After subtask completion - process intermediate results
    afterSubtask: async (
      subtask: WorkflowNode,
      context: ExecutionContext,
      result: any
    ) => {
      console.log(`Completed subtask: ${subtask.name}`);
      console.log("Result:", result);
    },
  },
};
```

### 3. Tools Hook

These provide the finest level of control, letting you monitor and modify individual tool operations. Think of them as quality control points in your automation assembly line:

```typescript
const callback = {
  hooks: {
    // Before tool execution - validate or modify inputs
    beforeToolUse: async (
      tool: Tool<any, any>,
      context: ExecutionContext,
      input: any
    ) => {
      console.log(`Using tool ${tool.name} with input:`, input);
      // Can modify tool input
      return input;
    },

    // After tool execution - process or transform results
    afterToolUse: async (
      tool: Tool<any, any>,
      context: ExecutionContext,
      result: any
    ) => {
      console.log(`Tool ${tool.name} completed with result:`, result);
      // Can modify tool result
      return result;
    },
  },
};
```

## Skip and abort

Support skipping the current node to execute the next node or terminating workflow execution in hooks.

Skip the current node and execute the next node by using `context.next()` in the callback:
```typescript
const callback = {
  hooks: {
    beforeSubtask: async (subtask: WorkflowNode, context: ExecutionContext) => {
      // example
      let condition = true;
      if (condition) {
        // Skip the current subtask node when the condition is met.
        context.next();
      }
    },
    beforeToolUse: async (
      tool: Tool<any, any>,
      context: ExecutionContext,
      input: any
    ) => {
      // example
      let condition = true;
      if (condition) {
        // Skip the current tool execution when the condition is met.
        context.next();
      }
      return input;
    },
  },
};
```

Abort the current workflow by using `context.abortAll()` in callback:
```typescript
const callback = {
  hooks: {
    beforeSubtask: async (subtask: WorkflowNode, context: ExecutionContext) => {
      // example
      let condition = true;
      if (condition) {
        // abort
        context.abortAll();
      }
    },
    afterToolUse: async (
      tool: Tool<any, any>,
      context: ExecutionContext,
      result: any
    ) => {
      // example
      let condition = true;
      if (condition) {
        // abort
        context.abortAll();
      }
      return result;
    },
  },
};
```

## Using Hooks

Hooks are provided to the workflow executor via the callback parameter:

```typescript
import { Eko } from "@eko-ai/eko";
import { WorkflowCallback } from "@eko-ai/eko/types";

const eko = new Eko(config);

const callback: WorkflowCallback = {
  hooks: {
    beforeWorkflow: async (workflow) => {
      // Setup resources
      await setupResources();
    },

    beforeSubtask: async (subtask, context) => {
      // Log subtask start
      logSubtaskStart(subtask);
    },

    beforeToolUse: async (tool, context, input) => {
      // Modify or validate tool input
      return validateToolInput(tool, input);
    },

    afterToolUse: async (tool, context, result) => {
      // Process tool results
      return processToolResult(tool, result);
    },

    afterSubtask: async (subtask, context, result) => {
      // Log subtask completion
      logSubtaskComplete(subtask, result);
    },

    afterWorkflow: async (workflow, variables) => {
      // Clean up and logging
      await cleanup();
      logWorkflowComplete(workflow, variables);
    },
  },
};

const workflow = await eko.generate("task description");
await eko.execute(workflow, callback);
```

## Common Hook Patterns

### 1. Performance Monitoring

```typescript
const performanceCallback: WorkflowCallback = {
  hooks: {
    beforeSubtask: async (subtask, context) => {
      context.variables.set(`${subtask.id}_start`, Date.now());
    },

    afterSubtask: async (subtask, context, result) => {
      const startTime = context.variables.get(`${subtask.id}_start`) as number;
      const duration = Date.now() - startTime;
      console.log(`Subtask ${subtask.name} took ${duration}ms`);
    },
  },
};
```

### 2. Tool Input Validation

```typescript
const validationCallback: WorkflowCallback = {
  hooks: {
    beforeToolUse: async (tool, context, input) => {
      if (tool.name === "file_write") {
        // Validate file paths
        if (!isValidPath(input.path)) {
          throw new Error(`Invalid file path: ${input.path}`);
        }
      }
      return input;
    },
  },
};
```

### 3. Result Processing

```typescript
const processingCallback: WorkflowCallback = {
  hooks: {
    afterToolUse: async (tool, context, result) => {
      if (tool.name === "web_search") {
        // Format search results
        return formatSearchResults(result);
      }
      return result;
    },
  },
};
```

### 4. Error Handling

```typescript
const errorCallback: WorkflowCallback = {
  hooks: {
    beforeToolUse: async (tool, context, input) => {
      try {
        return input;
      } catch (error) {
        console.error(`Error in tool ${tool.name}:`, error);
        return null;
      }
    },
  },
};
```

## Best Practices

1. **Keep Hooks Focused**

   - Each hook should have a single responsibility
   - Avoid complex logic in hooks
   - Use separate hooks for different concerns

2. **Handle Errors**

   - Always include error handling in hooks
   - Propagate errors appropriately
   - Log errors for debugging

3. **Performance**

   - Keep hook operations lightweight
   - Avoid blocking operations in hooks
   - Use async/await properly

4. **State Management**
   - Use context.variables for sharing state
   - Clean up temporary state after use
   - Document state dependencies

## Type Safety

The hook system is fully typed with TypeScript:

```typescript
interface WorkflowCallback {
  hooks: {
    beforeWorkflow?: (workflow: Workflow) => Promise<void>;
    beforeSubtask?: (subtask: WorkflowNode, context: ExecutionContext) => Promise<void>;
    beforeToolUse?: (tool: Tool<any, any>, context: ExecutionContext, input: any) => Promise<any>;
    afterToolUse?: (tool: Tool<any, any>, context: ExecutionContext, result: any) => Promise<any>;
    afterSubtask?: (subtask: WorkflowNode, context: ExecutionContext, result: any) => Promise<void>;
    afterWorkflow?: (workflow: Workflow, variables: Map<string, unknown>) => Promise<void>;
  }
}
```

## Beyond Monitoring: Creative Uses of Hooks

While hooks are commonly used for monitoring and debugging, their potential goes much further. Here are some innovative ways to use Eko's hook system:

1. **Adaptive Behavior**

   - Modify tool parameters based on previous results
   - Skip redundant operations
   - Implement fallback strategies

2. **Human-in-the-Loop Workflows**

   - Pause for human approval on critical operations
   - Allow manual override of AI decisions
   - Collect human feedback for improvement

3. **Learning and Optimization**
   - Gather performance metrics
   - Identify bottlenecks
   - Improve workflow efficiency over time

## Next Steps

- Learn about [Tool Overview](/tools/overview)
- Explore [Workflow](/architecture/workflow)
- Understand [Environment Architecture](/architecture/env-architecture)
