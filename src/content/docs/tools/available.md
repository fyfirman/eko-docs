---
title: Available Tools
description: This guide introduces the built-in tools provided by the framework in different environments.
---

eko provides various built-in tools for different environments including:
- Browser extension
- Web page 
- Node.js
- fellou browser

## Browser extension

Initialize the context:
```typescript
import { ClaudeProvider } from "@eko-ai/eko";
import { tools } from "@eko-ai/eko/extension";
import { ExecutionContext } from "@eko-ai/eko/types";

// Context provides LLM model inference and data storage capabilities
let context: ExecutionContext = {
    llmProvider: new ClaudeProvider('your apiKey'),
    variables: new Map<string, unknown>()
}
```

### WebSearch
`web_search`: Use web search to return search results

```typescript
let tool = new tools.WebSearch();
let result = await tool.execute(context, {
    query: 'Elon Musk',
    maxResults: 5
});
```

### ElementClick
`element_click`: Click the element through task prompts

```typescript
let tool = new tools.ElementClick();
let result = await tool.execute(context, {
    task_prompt: 'Click the search button',
});
```

### FindElementPosition
`find_element_position`: Locate Element Coordinates through Task Prompts

```typescript
let tool = new tools.FindElementPosition();
let result = await tool.execute(context, {
    task_prompt: 'Find the search input box'
});
```

### OpenUrl
`open_url`: Open the specified URL link in browser window

```typescript
let tool = new tools.OpenUrl();
let result = await tool.execute(context, {
    url: 'https://www.google.com',
    newWindow: true
});
```

### Screenshot
`screenshot`: Screenshot the current webpage window

```typescript
let tool = new tools.Screenshot();
let result = await tool.execute(context, {});
```

### TabManagement
`tab_management`: Browser tab management, view and operate tabs.

```typescript
let tool = new tools.TabManagement();

// open new tab
await tool.execute(context, {
    commond: 'new_tab https://www.google.com'
});
```

The commond to perform. The available commonds are:
* `tab_all`: View all tabs and return the tabId and title.
* `current_tab`: Get current tab information (tabId, url, title).
* `go_back`: Go back to the previous page in the current tab.
* `change_url [url]`: open URL in the current tab, eg: `change_url https://www.google.com`.
* `close_tab`: Close the current tab.
* `switch_tab [tabId]`: Switch to the specified tab using tabId, eg: `switch_tab 1000`.
* `new_tab [url]`: Open a new tab window and open the URL, eg: `new_tab https://www.google.com`

### ExtractContent
`extract_content`: Extract the text content of the current webpage

```typescript
let tool = new tools.ExtractContent();
let result = await tool.execute(context, {});
```

### ExportFile
`export_file`: Content exported as a file, support text format

```typescript
let tool = new tools.ExportFile();
let result = await tool.execute(context, {
    fileType: "csv", // text/csv/md/json...
    content: "Name, Price\niPhone, $1000\nnotebook, $1.02",
});
```

### FormAutofill
`form_autofill`: Automatically fill in form data on web pages

```typescript
let tool = new tools.FormAutofill();
let result = await tool.execute(context, {});
```

### BrowserUse
`browser_use`: Use structured commands to interact with the browser, manipulating page elements through screenshots and webpage element extraction.

```typescript
let tool = new tools.BrowserUse();
let result = await tool.execute(content, {
    action: 'screenshot_extract_element', // the action to perform
    index: null, // index of element, Operation elements must pass the corresponding index of the element
    text: null // Required by `action=input_text` and `action=select_dropdown_option`
})
```

The action to perform. The available actions are:
* `screenshot_extract_element`: Take a screenshot of the web page and extract operable elements.
  - Screenshots are used to understand page layouts, with labeled bounding boxes corresponding to element indexes. Each bounding box and its label share the same color, with labels typically positioned in the top-right corner of the box.
  - Screenshots help verify element positions and relationships. Labels may sometimes overlap, so extracted elements are used to verify the correct elements.
  - In addition to screenshots, simplified information about interactive elements is returned, with element indexes corresponding to those in the screenshots.
* `input_text`: Enter a string in the interactive element.
* `clear_text`: Clear the text in the input/textarea element.
* `click`: Click to element.
* `right_click`: Right-click on the element.
* `double_click`: Double-click on the element.
* `scroll_to`: Scroll to the specified element.
* `extract_content`: Extract the text content of the current webpage.
* `get_dropdown_options`: Get all options from a native dropdown element.
* `select_dropdown_option`: Select dropdown option for interactive element index by the text of the option you want to select.

## Web

pending completion...

## Node.js

pending completion...

## Fellou

### ComputerUse
`computer_use`: Use a mouse and keyboard to interact with a computer, and take screenshots.

```typescript
import { BrowserUse } from "@eko-ai/eko/fellou";

let tool = new BrowserUse();
let result = await tool.execute(content, {
    action: 'left_click', // the action to perform
    coordinate: [200, 400], // Coordinate position, eg: [x, y].
    text: null // Required only by `action=type` and `action=key`
})
```

The action to perform. The available actions are:
* `key`: Press a key or key-combination on the keyboard.
- This supports robotgo hotkey syntax.
- Multiple keys are combined using the "+" symbol.
- Examples: "a", "enter", "ctrl+s", "command+shift+a", "num0".
* `type`: Type a string of text on the keyboard.
* `cursor_position`: Get the current (x, y) pixel coordinate of the cursor on the screen.
* `mouse_move`: Move the cursor to a specified (x, y) pixel coordinate on the screen.
* `left_click`: Click the left mouse button.
* `left_click_drag`: Click and drag the cursor to a specified (x, y) pixel coordinate on the screen.
* `right_click`: Click the right mouse button.
* `double_click`: Double-click the left mouse button.
* `screenshot`: Take a screenshot of the screen.
* `scroll`: Scroll to the specified (x, y) pixel coordinates on the screen.


## Use Cases

### Baidu search Elon Musk
```typescript
import { tools, browser, utils } from "@eko-ai/eko/extension";

// open new tab
let openUrl = new tools.OpenUrl();
let result = await openUrl.execute(context, {
    url: 'https://www.baidu.com',
    newWindow: true
});
// find element
let find_element_position = new tools.FindElementPosition();
let rect = await find_element_position.execute(context, {
    task_prompt: 'Find the search input box'
})
if (rect) {
    // input -> text
    let tabId = await utils.getCurrentTabId();
    await browser.type(tabId, 'Elon Musk', [rect.left, rect.top]);
    await utils.sleep(500);
    // click the search button
    let element_click = new tools.ElementClick();
    await element_click.execute(context, {
        task_prompt: 'click the search button'
    });
}
```
