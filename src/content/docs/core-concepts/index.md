---
title: Core Concepts
description: Eko's architecture is built around several key concepts that work together to enable natural language-driven automation. Understanding these concepts is essential for effectively using and extending the framework.
---

Eko's architecture is built around several key concepts that work together to enable natural language-driven automation. Understanding these concepts is essential for effectively using and extending the framework.

## Two-Layer Execution Model

At the heart of Eko is a unique two-layer execution model that separates task planning from execution:

- **Planning Layer**: Converts natural language into structured workflows using LLMs
- **Execution Layer**: Dynamically executes workflows while adapting to runtime conditions

This separation enables both predictable automation and adaptive behavior. Learn more in [Two-Layer Execution Model](execution-model.md).

## Environment-Aware Architecture

Eko is designed to work seamlessly across different JavaScript environments while maintaining consistent behavior:

- **Node.js Environment**: Full access to system resources and file operations
- **Browser Extension**: Rich browser automation and web interaction capabilities
- **Web Environment**: Safe, sandboxed operation for web applications

The framework automatically adapts its capabilities based on the runtime environment. See [Environment-Aware Architecture](architecture.md) for details.

## Tool System

Tools are the building blocks of automation in Eko. The framework provides:

- **Built-in Tools**: Ready-to-use tools for common operations
- **Custom Tools**: API for creating new tools
- **Tool Registry**: Central management of available tools
- **Dynamic Tool Selection**: LLM-powered tool choice during execution

The tool system makes it easy to extend Eko's capabilities while maintaining consistent interfaces. Read more in [Tool System Overview](tools.md).

## Hook System

Hooks provide deep visibility and control over workflow execution:

- **Execution Hooks**: Monitor and control workflow steps
- **Tool Usage Hooks**: Intercept and modify tool operations
- **Error Handling**: Custom error recovery strategies
- **State Management**: Access to execution context

Hooks enable fine-grained control without modifying workflow definitions. Learn more in [Hook System](hooks.md).

## DAG-Based Workflows

Workflows in Eko are represented as Directed Acyclic Graphs (DAGs):

- **Nodes**: Individual operations or subtasks
- **Dependencies**: Relationships between operations
- **Validation**: Automatic cycle detection and schema validation
- **Serialization**: JSON-based workflow storage and sharing

This structure enables clear task organization and efficient execution. See [Workflow Structure](workflow-structure.md).

## Next Steps

- Dive deep into the [Two-Layer Execution Model](execution-model.md)
- Learn about [Environment-Aware Architecture](architecture.md)
- Explore the [Tool System](tools.md)
- Master the [Hook System](hooks.md)
