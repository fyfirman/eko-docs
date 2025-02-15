import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  base: "/",
  integrations: [
    starlight({
      title: "Eko Docs",
      social: {
        github: "https://github.com/FellouAI/eko",
      },
      sidebar: [
        {
          label: "First Steps",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Overview", slug: "getting-started/eko" },
            { label: "Quickstart", slug: "getting-started/quickstart" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Configuration", slug: "getting-started/configuration" },
            { label: "Dive deep into Eko", slug: "getting-started/dive-deep" },
            {
              label: "Build from source",
              slug: "getting-started/build-from-source",
            },
          ],
        },
        {
          label: "Browser use",
          items: [
            {
              label: "Browser Extension",
              slug: "browseruse/browser-extension",
            },
            { label: "Web", slug: "browseruse/browser-web" },
          ],
        },
        {
          label: "Computer use",
          items: [
            { label: "Node.js", slug: "computeruse/computer-node" }, // headless browser, MCP, Computer use
            { label: "Fellou", slug: "computeruse/computer-fellou" },
          ],
        },
        {
          label: "Tools",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Overview", slug: "tools/overview" },
            { label: "Available tools", slug: "tools/available" },
            { label: "Custom tools", slug: "tools/custom" },
            { label: "Tools hook", slug: "tools/hook" },
          ],
        },
        {
          label: "Architecture",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Overview", slug: "architecture" },
            {
              label: "Hierarchical Planning",
              slug: "architecture/execution-model",
            },
            {
              label: "Environment-Aware Architecture",
              slug: "architecture/env-architecture",
            },
            { label: "Workflow", slug: "architecture/workflow" },
            { label: "Hook system", slug: "architecture/hook-system" },
            {
              label: "Web Information Extraction",
              slug: "architecture/web-extraction",
            },
          ],
        },
        {
          label: "Reference",
          items: [{ label: "Overview", slug: "reference/overview" }],
        },
        {
          label: "Release",
          items: [
            { label: "Roadmap", slug: "release/overview" },
            { label: "Release Notes", slug: "release/versions" },
          ],
        },
      ],
    }),
  ],
});
