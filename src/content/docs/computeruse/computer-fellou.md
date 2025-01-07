---
title: Using computer use in Fellou browser
description: This guide demonstrates how to use the built-in computer use function in the [Fellou](https://fellou.ai) browser.
---

Fellou is a next-generation AI browser designed to boost productivity, and the `computer use` capability is one of its core features.

> **NOTICE**: Computer use in [Fellou](https://fellou.ai) browser is **in Beta**, click [here](https://0ki826721va.typeform.com/to/wQjB1dsS?utm_source=xxxxx&typeform-source=[Fellou](https://fellou.ai).ai) to apply to be an early adopter.

### Why use the `computer use` capability in Fellou?  

In daily tasks, we often need to perform complex actions on local devices, such as organizing files, processing media, or interacting with local APIs. Traditional browsers, limited by their sandbox environment, can’t access these local resources. With the `computer use` capability, [Fellou](https://fellou.ai) bridges the gap between the browser and the operating system, bringing AI-powered automation directly to your local environment.

In short, `computer use` makes [Fellou](https://fellou.ai) a true personal AI assistant, helping you tackle tasks that were previously complicated, tedious, or even impossible.

---

### How does `computer use` work in Fellou?  

`Computer use` is built on the eko framework and enhanced by [Fellou](https://fellou.ai)’s unique capabilities, working in the following ways:  

1. **JavaScript + Natural Language**: Write workflows in JavaScript or use natural language to generate code, making it accessible to everyone.  
2. **Dual Environment Support**: In [Fellou](https://fellou.ai), eko supports both `browser use` and `computer use` capabilities in browser plugins and web environments. This contrasts with other browsers like Chrome, where eko can only enable `browser use` in browser plugins, and web environments lack access to `browser use`. This flexibility gives [Fellou](https://fellou.ai) a significant advantage, allowing seamless automation directly within the web environment.  
3. **Built-in RPA with Accessibility (a11y)**: [Fellou](https://fellou.ai) leverages a11y features to provide native robotic process automation (RPA) capabilities. This allows users to automate complex tasks across web pages effortlessly, enhancing efficiency.  
4. **Secure Web-to-Local Interaction**: With user authorization, the `computer use` capability enables web pages to securely access and interact with the user’s computer. This opens the door to advanced workflows while ensuring full control and safety for the user.

 <div style="position:absolute;;margin-top:-290px;margin-left:760px">
    <img src="https://fellou.s3.us-west-1.amazonaws.com/images/images/home/user-approve-img-da-new-1.svg" alt="User grant computer use access" />
</div>

---

### What can `computer use` do?  

Here are some practical use cases for `computer use` in Fellou:  

1. **File Management**: Batch rename files, organize downloads, or clean up duplicates.  
2. **Automated Development Tasks**: Run local build tools, deployment scripts, or even debug projects directly through [Fellou](https://fellou.ai).  
3. **Media Processing**: Convert image formats, compress videos, or transcribe audio files in bulk.  
4. **Cross-Platform Workflows**: Combine web automation with local operations, such as extracting data from a webpage and saving it locally or uploading it to the cloud.  
5. **Application Control**: Open and control local applications (e.g., open Excel, run a photo editor, or launch terminal commands), creating smooth integrations between [Fellou](https://fellou.ai) and native apps.  
6. **Take Screenshots**: Capture screenshots of your screen or specific windows, automate annotations, or integrate with workflows like sharing or saving them to cloud storage.  
7. **Deep Integration**: Connect [Fellou](https://fellou.ai) with local AI models, databases, or IoT devices for more advanced scenarios.  

With `computer use`, [Fellou](https://fellou.ai) creates a seamless productivity platform that integrates the cloud and your local system, freeing you from repetitive tasks so you can focus on meaningful, creative work.  

---

## Example: Simple Real-Time Web Data Integration

#### **Scenario**:  
A user wants to combine real-time weather data with their local calendar events to automatically suggest appropriate attire for the day.  

#### **Step-by-Step Workflow**:

1. **Fetch Real-Time Web Data (Weather)**:  
   - Use `browser use` in Fellou to access a weather website like Weather.com or a weather API.  
   - Scrape or pull the current temperature and weather conditions (e.g., sunny, rainy, etc.) for the user’s location.  

2. **Retrieve Local Calendar Events**:  
   - Use `computer use` to access the user’s calendar (e.g., Google Calendar or a local calendar app).  
   - Retrieve events scheduled for the day, focusing on outdoor activities or meetings that might require specific clothing.  

3. **Decision-Making for Attire Suggestion**:  
   - Based on the weather data (e.g., "sunny and 75°F") and calendar events (e.g., "outdoor meeting at 3 PM"), use simple conditional logic to suggest clothing (e.g., "Wear a light jacket" or "No jacket needed, it's warm").  

4. **Display the Suggestion**:  
   - Show the clothing recommendation directly in the Fellou browser interface.  
   - Alternatively, use a notification to alert the user about the attire suggestion for the day.

---

### Implemention with Eko

Coming Soon.

## Next Steps

- Explore [Available Tools](/docs/tools/available#fellou-browser) for Fellou
- Learn about [Custom Tools](/docs/tools/custom)
- Understand [Hook System](/docs/tools/hook) for workflow control