---
title: Eko Overview
description: Eko is an agent development framework that enables programmatic control of browsers and operating systems through a combination of natural language and traditional programming interfaces.
---

## What is Eko?

Eko is an revolutionary agent development framework that enables programmatic control of browsers and operating systems through a combination of natural language and traditional programming interfaces. At its core, Eko provides:

1. A workflow system for orchestrating complex sequences of actions
2. A tool abstraction layer that unifies access to browser/OS capabilities
3. Integration with Large Language Models for task planning and execution
4. Programming interface for agent behavior inspection and control

The framework is particularly focused on bridging the gap between natural language task descriptions and concrete system actions through a structured approach.

[Video Placeholder]

## Why we build Eko Framework?

- **From an industry trend perspective:** The capabilities of large model Agents are becoming increasingly powerful, and Web/Mobile applications are transforming into Agent applications. As the saying goes, "Software eats the world, JavaScript eats the Software." With the enhanced computer use capabilities of large models, a new era of personal PC productivity is on the horizon. JavaScript, with its 14 million developers worldwide, is poised to continue shining brightly in the realm of personal productivity.

- **From a language framework perspective:** The existing Agent frameworks are primarily within the Python ecosystem, JavaScript lacks an ecosystem for Agent Workflow orchestration and scheduling, which will hinder developers in creating Agent applications.

- **From the perspective of language development perspective:** Programming languages are gradually evolving into a hybrid of natural and logical languages, making them increasingly easier to learn. Languages in the form of GenAIScript will become the entry-level and production-grade languages for the next generation of computer engineers.

- **From the user perspective:** Users will utilize a new generation of AI user interfaces. AI-generated GenUI will provide personalized UIs for users, and the creation of these personalized UIs relies on HTML and JavaScript.

## Why is it called Eko?

"Eko" is typically pronounced as "eh-koh," similar to the word "echo", which signifies replaying human language to turn it into action.

We believe that Agents are transitioning from being able to answer anything to being able to do anything, making action crucial.

### Eko Mission

Build Agent Workflows Easily with Natural Language.

[Mission Placeholder]


### Eko Vision

Empowering language to transform human words into action.

[Vision Placeholder]


## Design Philosophy

1. Provide developers with an easy-to-use Agent development framework by **blending natural and logical languages**.
2. Offer stable Agent tool usage capabilities through [**Two-Layer Execution Model**](/docs/architecture/Two-Layer-Execution-Model), ensuring lower costs and more stable inference.
3. Utilize an **Event-Driven Architecture**, allowing client Workflows to call each other in real-time and support scaling up.
4. Provide developers with simple and easy-to-debug Agent **workflow debugging tools**.

## Key Features

- **Natural Language Programming**: Convert natural language task descriptions into executable workflows, making agent development more intuitive
- **Two-Layer Execution Model**: Separate offline planning from online execution, making agent decisions more structured and explainable
- **Comprehensive Tooling**: Rich built-in tools for browser automation, computer control, file operations, and web interactions
- **Hybrid Drive System:** Combine LLM capabilities with developer control, enabling "human in the loop" and allowing interference at multiple levels of granularity.
- **Event-Driven Automation:** Trigger workflows based on browser or system events
- **Environment Flexibility**: Work across different environments ( [Browser Extensions](), [Web](), [Node.js](), [Next-Gen AI Browser Fellou]() ) with consistent APIs

## Documentation Roadmap

1. [Quick Start Guide](quickstart)

   - Basic Node.js usage
   - Creating your first workflow
   - Understanding workflow concepts

2. [Installation Guide](installation)

   - Package installation
   - Environment setup
   - TypeScript configuration

3. [Configuration Guide](configuration)

   - Environment configuration
   - AI model setup
   - Tool configuration

4. [Browser Extension Guide](browser-extension)
   - Extension-specific setup
   - Browser automation tools
   - Real-world examples

We recommend starting with the [Quick Start Guide](quickstart) to understand core concepts through a minimal example, even if you plan to use Eko in a browser extension. The concepts learned there will help you better understand the browser automation capabilities covered in the [Browser Extension Guide](browser-extension).

## Support and Community

- [GitHub Issues](https://github.com/FellouAI/eko/issues) for bug reports and feature requests
- [Documentation](https://eko.fellou.ai/docs) for detailed guides and API reference
- [Community Discord](https://discord.gg/eko) for discussions and help
