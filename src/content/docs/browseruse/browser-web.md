---
title: Using browser use in Web
description: This guide demonstrates how to use Eko's browser automation capabilities in a Web environment, building on those fundamental concepts.
---

## Why Use Eko Browser Use?

In the modern internet era, users are faced with increasingly complex web operations and information management. Many users encounter the following issues when using websites:

- **Repetitive Tasks**: Performing similar actions on different web pages is time-consuming, labor-intensive, and prone to errors.
- **Steep Learning Curve**: New users often find it difficult to quickly get started on complex websites and may not know how to find the features they need.
- **Testing and Validation Challenges**: Developers struggle to efficiently simulate user operations during web automation testing.
- **Inefficiency**: Extracting information from web pages, entering data, and other tasks can waste a huge amount of time if done manually.

The emergence of Eko Browser Use is aimed at solving these problems. It provides automation capabilities based on natural language workflows, helping users easily manage tedious web tasks.

## How Does Eko Browser Use Work?

Eko operates on the principle of simple, understandable natural language commands, allowing you to leverage its powerful features without complex programming knowledge. Users only need to describe the operations they wish to perform in natural language, and Eko will automatically interpret and execute the corresponding actions on the current web page, freeing you from tedious operations and allowing you to focus on more important matters.

### Key Features

1. **User Operation Automation**: Through configurable command instructions, it helps users simulate clicks, input, drag and drop, and other actions to automate tasks.

2. **Web Automation Testing**: Provides developers with a new tool for automated testing, enabling them to easily create test processes to ensure the stability and usability of web functions.

3. **Workflow Automation**: Users can customize their workflows through Eko, saving time while reducing the occurrence of human errors.

4. **New User Guidance**: For new users, Eko offers intuitive guidance to help them quickly understand and operate the website.

## Benefits of Eko Browser Use

- **Increased Efficiency**: Automation reduces repetitive operations, saving time and allowing users to focus on core tasks.
- **Reduced Learning Costs**: New users can easily get started without mastering complex operations; simple commands are sufficient.
- **Enhanced Accuracy**: Automated operations reduce human errors and improve the accuracy of data processing.
- **User-Friendly Experience**: Provides users with a seamless experience, making operations simple and smooth.

## Use Cases

### 1. User Operation Automation

Whether purchasing items on an e-commerce site or posting updates on social media, Eko can help you automatically complete complex steps in one go.

### 2. Web Automation Testing

Developers can leverage Eko to create automated test cases, quickly checking whether page functions are normal, thus saving time and effort on manual testing.

### 3. Workflow Automation

In everyday office work, Eko can automate repetitive operational processes, such as regularly extracting data from websites and organizing reports.

### 4. New User Guidance

For new users, Eko can provide necessary guidance to help them master website operations more quickly and reduce churn.

## Conclusion

Eko Browser Use is a powerful automation tool that provides users, developers, and enterprises with a more efficient and convenient web operation experience. Whether performing repetitive tasks or guiding new users, Eko simplifies operational steps through its natural language command feature, making web usage easier for you. We believe Eko Browser Use will transform the way you interact with websites, delivering a brand new online experience.

## Example

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
  const workflow = await eko.generate(`
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
