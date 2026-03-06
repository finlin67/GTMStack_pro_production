Okay, here's a document detailing the animation gallery's operation, focusing on the thumbnail mapping, registry process, and CSV integration, designed to facilitate replication for another site.

Animation Gallery Architecture Document

1. Overview

This document outlines the architecture for the animation gallery, specifically detailing how thumbnails are generated, managed, and linked to their corresponding animations. The gallery utilizes a combination of Next.js App Router, Puppeteer for automated screenshot generation, and a centralized registry maintained through a CSV file.

2. Thumbnail Generation Workflow

Component Import: The app/thumbnail-factory/page.tsx component imports all .tsx animation components from the src/components/animations folder.
Container Rendering: Each imported component is rendered within a styled div container, enforcing a fixed 600x400 pixel dimension. Crucially, each div is given a unique id and data-testid based on the component's filename (e.g., animation-AnimationComponent1.tsx). This is critical for the puppeteer script to identify and screenshot the correct component.
Puppeteer Execution: The scripts/generate-thumbnails.js script uses Puppeteer to:
Launch a headless Chrome browser.
Navigate to the app/thumbnail-factory/page.tsx route.
Wait for a specified duration (1 second) to allow Framer Motion animations to fully render before taking the screenshot.
Locates all divs with the matching IDs (using $$)
Take a screenshot of each component.
Save the screenshot to the public/images/gallery-thumbnails/ directory, naming the file according to the component’s filename (e.g., AnimationComponent1.png).
Background Refresh: The puppeteer script can be executed manually or scheduled via a task scheduler to ensure thumbnails are kept up-to-date.
3. The Animation Registry (CSV File)

This is the core of the system's organization. The page-registry.ts script generates a CSV file that maps the thumbnail filenames to the original component names, allowing for consistent retrieval.

gen:registry Script: The gen:registry script (using tsx scripts/gen-page-registry.ts) dynamically creates a CSV file (e.g., page-registry.csv).
CSV Structure: The CSV file contains two columns:
thumbnail_filename: The filename of the generated thumbnail image (e.g., AnimationComponent1.png).
component_name: The name of the original animation component (e.g., AnimationComponent1).
Purpose: This CSV acts as a lookup table. The puppeteer script uses this file to accurately save the screenshot to the correct filename.
4. Replication for Another Site

To replicate this process for another site:

Duplicate Code: Copy the app/thumbnail-factory/page.tsx and scripts/generate-thumbnails.js files into your project.
Adjust Paths: Update the filepaths in the scripts/generate-thumbnails.js script to reflect the new location of your animation components and the desired thumbnail directory.
Modify Registry: Run the gen:registry script to generate the appropriate page-registry.csv file for your new site's animation components. Update the scripts/gen-page-registry.ts file if the name of the animations has changed.
Run Puppeteer: Execute node scripts/generate-thumbnails.js.
5. Key Technologies & Tooling

Next.js App Router: Provides the foundation for the component rendering and routing.
Puppeteer: Automates the screenshot generation process.
CSV File: Provides a structured way to map thumbnails and components.
TypeScript: Ensures code quality and maintainability.
This document provides a detailed overview of the animation gallery’s architecture. By understanding this process, you can easily adapt it to your own projects and manage your animation gallery effectively. Remember that customization will be needed to match your specific needs.







Local Config




gemma3:4b
⏎
