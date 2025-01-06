---
title: Using browser use in Web
description: This guide demonstrates how to use Eko's browser automation capabilities in a Web environment, building on those fundamental concepts.
---

## Why Use Eko in Web?

In the modern internet era, users are faced with increasingly complex web operations and information management. Many users encounter the following issues when using websites:

- **Repetitive Tasks**: Performing similar actions on different web pages is time-consuming, labor-intensive, and prone to errors.
- **Steep Learning Curve**: New users often find it difficult to quickly get started on complex websites and may not know how to find the features they need.
- **Testing and Validation Challenges**: Developers struggle to efficiently simulate user operations during web automation testing.
- **Inefficiency**: Extracting information from web pages, entering data, and other tasks can waste a huge amount of time if done manually.

The emergence of Eko Browser Use is aimed at solving these problems. It provides automation capabilities based on natural language workflows, helping users easily manage tedious web tasks.

## Example: Login Automation Testing

```typescript
import { Eko, ClaudeProvider } from "@eko-ai/eko";
import { tools } from "@eko-ai/eko/web";

async function auto_test_case() {
  // Initialize LLM provider
  let llmProvider = new ClaudeProvider({
    // Please use your API endpoint for authentication and forwarding on the server side, do not expose API keys in the frontend
    baseURL: 'https://your-api-endpoint.com',
    // User Authentication Request Header
    defaultHeaders: {
      // 'Authorization': `Bearer ${getToken()}`
    }
  });

  // Initialize eko
  let eko = new Eko(llmProvider);

  eko.registerTool(new tools.BorwserUse());

  // Generate workflow from natural language description
  // Eko will automatically select and sequence the appropriate tools
  const workflow = await eko.generateWorkflow(`
    Product Management Test Cases, Output test report:
    1. Add New Product
    2. Edit Product Details
    3. Update Product Price
    4. Delete Product
  `);

  // Execute
  await eko.execute(workflow);
}
```

## Use Cases

### 1. Simplification of operations

Simplify productivity apps like Trello, Asana, Slack, Figma, Canva, and Webflow by streamlining tasks, integrating workflows, enhancing collaboration, personalizing interfaces, and using AI assistance for efficient user experiences.

### 2. Web Automation Testing

Developers can leverage Eko to create automated test cases, quickly checking whether page functions are normal, thus saving time and effort on manual testing.

### 3. Workflow Automation

Client-based automated workflows, such as allowing users to set notifications and reminders through natural language on the client side, triggering notification pop-ups based on time or events (e.g., meeting reminders, task deadlines), and automatically pushing important information to the user's email or other devices.

### 4. New User Onboarding

For new users, Eko can provide necessary guidance to help them master website operations more quickly and reduce churn.

## Next Steps

You now understand the browser use based on web, you can:

- Learn about [Web Extraction Technology](/docs/architecture/web-extraction) in Browser use
- Explore [Available Tools](/docs/tools/available#web) for web
- Learn more core concepts of eko: [Dive deep into Eko](/docs/getting-started/dive-deep)