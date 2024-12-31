---
title: Installation
description: Eko is a JavaScript library that can be used in Node.js applications, web pages, and browser extensions. This guide covers installation and setup for different environments.
---

# Installation

Eko is a JavaScript library that can be used in Node.js applications, web pages, and browser extensions. This guide covers installation and setup for different environments.

## Node.js Environment

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Install via npm

```bash
npm install ekoai
```

### Install via yarn

```bash
yarn add ekoai
```

### TypeScript Configuration (Recommended)

Add the following tsconfig.json for optimal type checking and module resolution:

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "declaration": true,
    "sourceMap": true
  }
}
```

## Web Environment

For web pages, you can include Eko using a module bundler like webpack or use it directly in the browser.

### Using with Module Bundler

1. Install the package:

   ```bash
   npm install ekoai
   ```

2. Import in your code:
   ```javascript
   import { Eko } from "ekoai";
   ```

### Direct Browser Usage

Coming soon: CDN distribution for direct browser usage.

## Browser Extension Development

When building a browser extension that uses Eko, you'll need to:

1. Add Eko as a dependency in your extension project:

   ```bash
   npm install ekoai
   ```

2. Configure your bundler (e.g., webpack) to include Eko in your extension bundle.

### Example: Extension Project Structure

```
extension/
├── src/
│   ├── background/
│   │   └── index.ts        # Use Eko here
│   ├── content/
│   │   └── index.ts        # And/or here
│   └── popup/
│       └── index.ts
├── package.json
└── webpack.config.js       # Configure bundling
```

For a complete example of using Eko in a browser extension, check out our [example extension project](https://github.com/FellouAI/eko-chromium-extension).

## Verify Installation

Test your installation by creating a minimal example:

```typescript
import { Eko } from "ekoai";

async function test() {
  const eko = new Eko("claude-3.5");
  console.log("Eko initialized successfully");
}

test().catch(console.error);
```
