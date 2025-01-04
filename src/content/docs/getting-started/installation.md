---
title: Installation
description: Eko is a JavaScript library that can be used in browser extensions, web pages, and node.js. This guide covers installation and setup for different environments.
---

Eko is a JavaScript library that can be used in [**Browser Extension (Chromium-Based browser only)**](/docs/getting-started/installation#browser-extension-development), [**Node.js Enviroment**](http://localhost:4321/docs/getting-started/installation#nodejs-environment), and [**Web Enviroment**](http://localhost:4321/docs/getting-started/installation#web-environment). This guide covers installation and setup for different environments.

## Browser Extension Development

When building a browser extension that uses Eko, you'll need to:

```bash
# install cli (used to initialize browser extension projects)
npm install @eko-ai/eko-cli -g
# initialize project
eko-cli init browser-extension-demo

cd browser-extension-demo
# install dependencies
npm install
```

### Extension Project Structure

```
extension/
├── src/
│   ├── background/
│   │   └── index.ts        # Use Eko here
│   ├── content/
│   │   └── index.ts
│   └── popup/
│       └── index.ts
├── package.json
└── webpack.config.js       # Configure bundling
```

For a complete example of using Eko in a browser extension, check out our [example extension project](https://github.com/FellouAI/eko-browser-extension).

## Node.js Environment

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Install via npm

```bash
npm install @eko-ai/eko
```

### Install via yarn

```bash
yarn add @eko-ai/eko
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
   npm install @eko-ai/eko
   ```

2. Import in your code:
   ```javascript
   import { Eko } from "@eko-ai/eko";
   ```

### Direct Browser Usage

Coming soon: CDN distribution for direct browser usage.


## Verify Installation

Test your installation by creating a minimal example:

```typescript
import { Eko } from "@eko-ai/eko";

async function test() {
  // default claude model
  const eko = new Eko("apiKey");
  console.log("Eko initialized successfully");
}

test().catch(console.error);
```
