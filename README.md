# Eko docs

## What is Eko?
Eko is an agent development framework designed to help developers build reliable agents by supporting natural language and programming languages. It provides a unified interface for executing agents in the digital world, including both computer and browser environments, with the following key features:
- **Hybrid design language**: Developers can write agents by both natural language and programming languages, enabling production-grade agent design.
- **Unified digital World interaction**: Eko offers a unified syntax that is applicable across various digital environments, including computers and browsers, for seamless agent development.
- **Transparent and intervenable agents**: During agent execution, users can inspect its state in real-time and modify its behavior, ensuring greater control and security.

The framework is particularly focused on bridging the gap between natural language task descriptions and concrete system actions through a structured approach.

Learn more: [Eko Docs](https://eko.fellou.ai/docs).

## 🚀 Project Structure

Inside of your Eko docs project, you'll see the following folders and files:

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/
│   │   └── config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## 🧞 Commands
Before running any commands, make sure you have Node.js installed. You can download and install Node.js from the official website, or use a package manager like Homebrew on macOS. Then please open a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `git clone git@github.com:FellouAI/eko-docs.git`             | Clone document project                            |
| `cd eko-docs`             | Go into dictionary                            |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
