---
title: Eko Overview
description: Eko is an agent development framework that enables programmatic control of browsers and operating systems through a combination of natural language and traditional programming interfaces.
---

![eko-logo](/docs/eko-dark.jpg)

## What is Eko?
Eko (pronounced like ‘echo’) is a production-ready JavaScript framework that enables developers to create reliable agents, from simple commands to complex workflows. It provides a unified interface for running agents in both computer and browser environments, with the following key features:
- **Hybrid Design Language**: Developers can design agents by both natural language and programming languages, enabling production-grade agent design.
- **Unified Digital World Interaction**: Eko offers a unified interface that is applicable across various digital environments, including computers and browsers, for seamless agent development.
- **Transparent and Intervenable Agents**: During agent execution, users can inspect its state in real-time and modify its behavior, ensuring better control and security.

# Framework Comparison

| Feature                              | Eko   | Langchain  | Browser-use  | Dify.ai  | Coze   | 
|--------------------------------------|-------|------------|--------------|----------|--------|
| **Supported Platform**               | **All platform**  | Server side  | Browser  | Web  | Web  |
| **One sentence to multi-step workflow** | ✅    | ❌          | ✅            | ❌        | ❌      |
| **Intervenability**                  | ✅    | ✅          | ❌            | ❌        | ❌      | 
| **Development Efficiency**           | **High**  | Low      | Middle        | Middle    | Low    |
| **Open-source**                      | ✅    | ✅          | ✅            | ✅        | ❌      | 
| **Access to private web resources** | ✅ **(Coming soon)** | ❌          | ❌            | ❌        | ❌      |

## Eko's Abilities
- **Browser Use**: Collect the latest NASDAQ data on Yahoo Finance, including price changes, market capitalization, trading volume of major stocks, analyze the data and generate visualization reports.
<video controls>
  <source src="/docs/web_use.mp4" />
</video>

- **Computer Use**: Clean up all files in current directory larger than 1MB.
<video controls>
  <source src="/docs/computer_use.mp4" />
</video>

Learn more: [Eko Demos](https://github.com/FellouAI/eko-demos).

## Supported environment
![ENVS](../assets/envs.png)

Learn more:
- [Browser Extension Environment](/docs/browseruse/browser-extension)
- [Web Environment](/docs/browseruse/browser-web)
- [Node.js Environment](/docs/computeruse/computer-node)
- [Next-Gen AI Browser Fellou Environment](/docs/computeruse/computer-fellou)

## Getting started
- [Quickstart](quickstart)
- [Installation](installation)
- [Configuration](configuration)
- [Diving deep into Eko](dive-deep)

## Support and Community
- [GitHub Issues](https://github.com/FellouAI/eko/issues) for bug reports and feature requests
- [Documentation](https://eko.fellou.ai/docs) for detailed guides and API reference
