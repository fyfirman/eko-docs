---
title: Getting Started with Eko
description: Eko is an agent development framework that enables programmatic control of browsers and operating systems through a combination of natural language and traditional programming interfaces.
---

## What is Eko?

Eko is an agent development framework that enables programmatic control of browsers and operating systems through a combination of natural language and traditional programming interfaces. At its core, Eko provides:

1. A workflow system for orchestrating complex sequences of actions
2. A tool abstraction layer that unifies access to browser/OS capabilities
3. Integration with Large Language Models for task planning and execution
4. Programming interface for agent behavior inspection and control

The framework is particularly focused on bridging the gap between natural language task descriptions and concrete system actions through a structured approach.

## Key Features

- **Natural Language Programming**: Convert natural language task descriptions into executable workflows, making agent development more intuitive
- **Two-Layer Execution Model**: Separate offline planning from online execution, making agent decisions more structured and explainable
- **Comprehensive Tooling**: Rich built-in tools for browser automation, computer control, file operations, and web interactions
- **Hybrid Drive System**: Combine LLM capabilities with developer control, allowing interference at multiple levels of granularity
- **Environment Flexibility**: Work across different environments (Node.js, browser extensions) with consistent APIs

## Documentation Roadmap

1. [Quick Start Guide](quickstart.md)

   - Basic Node.js usage
   - Creating your first workflow
   - Understanding workflow concepts

2. [Installation Guide](installation.md)

   - Package installation
   - Environment setup
   - TypeScript configuration

3. [Configuration Guide](configuration.md)

   - Environment configuration
   - AI model setup
   - Tool configuration

4. [Browser Extension Guide](browser-extension.md)
   - Extension-specific setup
   - Browser automation tools
   - Real-world examples

We recommend starting with the [Quick Start Guide](quickstart.md) to understand core concepts through a minimal example, even if you plan to use Eko in a browser extension. The concepts learned there will help you better understand the browser automation capabilities covered in the [Browser Extension Guide](browser-extension.md).

## Support and Community

- [GitHub Issues](https://github.com/FellouAI/eko/issues) for bug reports and feature requests
- [Documentation](https://eko.fellou.ai/docs) for detailed guides and API reference
- [Community Discord](https://discord.gg/eko) for discussions and help
