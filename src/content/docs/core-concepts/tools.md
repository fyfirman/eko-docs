---
title: Tool System Overview
description: Tools are the fundamental building blocks of automation in Eko. This guide provides an overview of Eko's tool system, including built-in tools, custom tool development, and tool lifecycle.
---

In Eko's architecture, tools are the fundamental building blocks that perform actual operations. While the framework's planning layer breaks down tasks and the execution layer orchestrates actions, tools are what ultimately interface with browsers, operating systems, and other resources to get things done.

## Understanding Tools

A tool in Eko is more than just a function - it's a self-describing unit of capability that includes:

```typescript
interface Tool {
  // Unique identifier for the tool
  name: string;

  // Detailed description of what the tool does and when to use it
  description: string;

  // JSON Schema defining expected parameters
  input_schema: InputSchema;

  // The actual implementation
  execute(context: ExecutionContext, params: unknown): Promise<unknown>;
}
```

Each tool provides:
1. Clear documentation of its purpose and constraints
2. Structured definition of its input parameters
3. Runtime implementation of its functionality
4. Integration with Eko's execution context

## Built-in Tool Categories

### Browser Control Tools
These tools manage browser windows, tabs, and navigation:

```typescript
class OpenUrl implements Tool {
  name = "open_url";
  description = "Opens the specified URL link in browser window";

  input_schema = {
    type: "object",
    properties: {
      url: {
        type: "string",
        description: "URL to open"
      },
      newWindow: {
        type: "boolean",
        description: "Whether to open in new window"
      }
    },
    required: ["url"]
  };
}
```

### Web Interaction Tools
These tools handle interactions with web page content:

```typescript
class ComputerWeb implements Tool {
  name = "computer_web";
  description = "Control mouse and keyboard for web interactions";

  // Support actions like click, type, move cursor
  input_schema = {
    type: "object",
    properties: {
      action: {
        type: "string",
        enum: ["click", "type", "mouse_move"]
      },
      coordinate: {
        type: "array",
        description: "x,y coordinates"
      }
    }
  };
}
```

### Content Extraction Tools
Tools for gathering and processing information:

```typescript
class ExtractContent implements Tool {
  name = "extract_content";
  description = "Extract text content from the current webpage";

  // Define what content to extract
  input_schema = {
    type: "object",
    properties: {
      selector: {
        type: "string",
        description: "CSS selector"
      }
    }
  };
}
```

## Tool Registration and Discovery

Tools must be registered with Eko's tool registry before they can be used:

```typescript
import { ToolRegistry } from 'ekoai/core';

const registry = new ToolRegistry();

// Register built-in tools
registry.registerTool(new OpenUrl());
registry.registerTool(new ComputerWeb());

// Register custom tools
registry.registerTool(new MyCustomTool());
```

The registry provides:
- Tool name validation and uniqueness checking
- Schema validation for tool definitions
- Runtime tool discovery and instantiation
- Tool capability queries

## Tool Lifecycle

When a tool is used in a workflow:

1. **Resolution**: The tool is looked up in the registry by name
2. **Validation**: Input parameters are validated against the schema
3. **Context Preparation**: Execution context is populated
4. **Execution**: The tool's execute method is called
5. **Result Processing**: Return value is captured and processed

All of this is managed by Eko's execution engine, so tool authors only need to focus on their tool's core functionality.

## Creating Custom Tools

To create your own tool, implement the Tool interface:

```typescript
class DataProcessingTool implements Tool {
  name = "process_data";
  description = "Process structured data using custom logic";

  input_schema = {
    type: "object",
    properties: {
      data: {
        type: "array",
        description: "Input data array"
      },
      operation: {
        type: "string",
        enum: ["filter", "map", "reduce"]
      }
    },
    required: ["data", "operation"]
  };

  async execute(context: ExecutionContext, params: unknown): Promise<unknown> {
    const { data, operation } = params as any;

    switch (operation) {
      case "filter":
        return data.filter(item => /* custom logic */);
      case "map":
        return data.map(item => /* custom logic */);
      case "reduce":
        return data.reduce((acc, item) => /* custom logic */);
    }
  }
}
```

## Tool Design Best Practices

1. **Clear Purpose**: Each tool should do one thing well
   ```typescript
   // Good: Focused tool
   class SaveFile implements Tool {
     name = "save_file";
     // Handles only file saving
   }

   // Avoid: Tool trying to do too much
   class FileManager implements Tool {
     name = "file_manager";
     // Tries to handle saving, loading, deleting, etc.
   }
   ```

2. **Robust Input Validation**: Use schemas to catch issues early
   ```typescript
   input_schema = {
     type: "object",
     properties: {
       filename: {
         type: "string",
         pattern: "^[a-zA-Z0-9_.-]+$"
       },
       content: {
         type: "string"
       }
     },
     required: ["filename", "content"]
   };
   ```

3. **Informative Descriptions**: Help the LLM understand when to use the tool
   ```typescript
   description = `Save content to a file in the specified format.
   Supports formats: text/plain, text/csv, application/json.
   Use this when you need to persist data to the filesystem.`;
   ```

4. **Graceful Error Handling**: Provide clear error messages
   ```typescript
   async execute(context: ExecutionContext, params: unknown): Promise<unknown> {
     try {
       // Tool implementation
     } catch (error) {
       throw new Error(`Failed to save file: ${error.message}`);
     }
   }
   ```

## Next Steps

- Learn about [Browser Tools](../guides/tools/browser-tools.md) in depth
- Explore [Computer Use Tools](../guides/tools/computer-tools.md)
- Study the [Hook System](hooks.md) for tool execution control
- See [Custom Tool Development](../guides/tools/custom-tools.md)
