---
title: Using Eko in Browser Extensions
description: This guide demonstrates how to use Eko's browser automation capabilities in a Chrome extension environment, building on those fundamental concepts.
---

Before diving into browser extension specifics, we recommend completing the [Quick Start Guide](quickstart.md) first. The core concepts of workflows and tools introduced there are essential for understanding how Eko operates in a browser extension environment.

This guide demonstrates how to use Eko's browser automation capabilities in a Chrome extension environment, building on those fundamental concepts.

## How Browser Automation Works

When used in a browser extension, Eko provides three main categories of tools that work together to enable browser automation:

### Browser Control Tools

These tools interact with the browser itself through Chrome's extension APIs:

- Opening/closing tabs
- Managing windows
- Navigating to URLs
- Handling browser events

For example, `OpenUrl` is a built-in tool that not only navigates to a URL but also ensures the page is fully loaded and ready for interaction:

```typescript
const workflow = await eko.generateWorkflow(
  "Open GitHub and navigate to the Chromium repository"
);
```

The LLM might translate this into steps using `OpenUrl` and other tools:

```json
{
  "nodes": [
    {
      "id": "open-github",
      "action": {
        "type": "script",
        "name": "openPage",
        "tools": ["open_url"],
        "input": {
          "url": "https://github.com"
        }
      }
    }
  ]
}
```

### Web Page Interaction Tools

These tools interact with web page content through the content script interface:

- Finding elements on the page
- Clicking and typing
- Scrolling and navigation
- Extracting content

The `ComputerWeb` tool provides mouse and keyboard control capabilities. For example, clicking a button:

```typescript
// When generating a workflow that needs to click something:
const workflow = await eko.generateWorkflow(
  "Click the search box and type 'Chromium'"
);
```

This gets translated into precise coordinates and actions:

```json
{
  "nodes": [
    {
      "id": "click-search",
      "action": {
        "type": "script",
        "name": "clickElement",
        "tools": ["computer_web"],
        "input": {
          "action": "mouse_move",
          "coordinate": [100, 200] // Coordinates determined by computer vision
        }
      }
    },
    {
      "id": "type-search",
      "dependencies": ["click-search"],
      "action": {
        "type": "script",
        "name": "typeText",
        "tools": ["computer_web"],
        "input": {
          "action": "type",
          "text": "Chromium"
        }
      }
    }
  ]
}
```

### Content Extraction Tools

These tools help gather and process information from web pages:

- Extracting structured data
- Taking screenshots
- Saving files
- Processing results

## Example: Deep Web Search

Let's look at a complete example that combines these capabilities. We'll create a workflow that:

1. Searches for developers on GitHub
2. Visits each profile
3. Extracts and saves their information

```typescript
import { Eko } from "ekoai";
import { getLLMConfig } from "ekoai/extension";

async function searchDevelopers() {
  // Get configuration from extension storage
  const config = await getLLMConfig();
  const eko = new Eko(config);

  // Generate workflow from natural language description
  // Eko will automatically select and sequence the appropriate tools
  const workflow = await eko.generateWorkflow(`
    1. Open GitHub
    2. Search for "Chromium Developer"
    3. For each profile in search results:
       - Extract their name, bio, and contributions
       - Take a screenshot of their profile
    4. Save all collected data to a CSV file
  `);

  // Execute with progress monitoring
  await eko.executeWorkflow(workflow, {
    hooks: {
      // Monitor execution progress
      beforeNodeExecution: async (node) => {
        console.log(`Executing: ${node.name}`);
        return true;
      },
    },
  });
}
```

Let's examine the workflow Eko generates for this task:

```json
{
  "id": "github-search",
  "nodes": [
    {
      "id": "open-github",
      "action": {
        "type": "script",
        "name": "openGitHub",
        "tools": ["open_url"],
        "input": {
          "url": "https://github.com"
        }
      }
    },
    {
      "id": "perform-search",
      "dependencies": ["open-github"],
      "action": {
        "type": "script",
        "name": "searchDevelopers",
        "tools": ["computer_web"],
        "input": {
          "steps": [
            {
              "action": "mouse_move",
              "coordinate": [
                /* search box coordinates */
              ]
            },
            {
              "action": "left_click"
            },
            {
              "action": "type",
              "text": "Chromium Developer"
            }
          ]
        }
      }
    },
    {
      "id": "extract-profiles",
      "dependencies": ["perform-search"],
      "action": {
        "type": "script",
        "name": "extractProfiles",
        "tools": ["extract_content"],
        "input": {
          "selectors": {
            "name": ".profile-name",
            "bio": ".profile-bio",
            "contributions": ".contributions"
          }
        }
      }
    },
    {
      "id": "take-screenshots",
      "dependencies": ["extract-profiles"],
      "action": {
        "type": "script",
        "name": "captureProfiles",
        "tools": ["screenshot"]
      }
    },
    {
      "id": "save-results",
      "dependencies": ["extract-profiles", "take-screenshots"],
      "action": {
        "type": "script",
        "name": "exportData",
        "tools": ["export_file"],
        "input": {
          "format": "csv",
          "filename": "developers.csv"
        }
      }
    }
  ]
}
```

This workflow demonstrates how Eko:

1. Breaks down a complex task into discrete steps
2. Selects appropriate tools for each action
3. Manages dependencies between steps
4. Handles both browser control and data processing

The execution is coordinated across multiple contexts:

- Background script: Manages workflow execution
- Content script: Handles page interactions
- Browser APIs: Controls tabs and windows

## Next Steps

- Learn about [computer control capabilities](../guides/tools/computer-tools.md)
- Explore the [example extension project](https://github.com/FellouAI/eko-chromium-extension)
- Study [workflow patterns](../guides/workflow/patterns.md)
