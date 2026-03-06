import fs from 'fs/promises';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
// Ensure your GEMINI_API_KEY environment variable is set
const ai = new GoogleGenAI({}); 

const inputDir = './briefs';
const outputDir = './content';

const SYSTEM_INSTRUCTION = `You are an expert technical copywriter and content engineer for a senior digital marketing consulting agency. Your task is to ingest strategic project briefs and output a strictly formatted TypeScript object containing landing page content.

Content Guidelines:
* Tone: Authoritative, strategic, and professional. Reflect deep expertise (enterprise-level consulting).
* Mapping: 
  * brand: Extract from the "Website-Ready Positioning" section.
  * hero: Synthesize from the "Executive Summary".
  * metricsSection: Create 3 realistic, conservative, yet impactful B2B SaaS/Enterprise metrics based on the "Representative Projects" and industry standards.
  * capabilitiesSection: Map directly from "Core Expertise & Capabilities" and "Website-Ready Positioning" bullets.
  * philosophySection: Extract from "Frameworks" and "Differentiated Thinking".
  * growthSection: Synthesize a narrative from the "Representative Projects & Use Cases".
  * ctaSection & footer: Standardize for a high-end consulting agency engagement.

TypeScript Template:
export const [TOPIC]_CONTENT = {
  brand: { tagline: "", description: "" },
  hero: { headline: "", subheadline: "", description: "", primaryCTA: {}, secondaryCTA: {}, image: {} },
  metricsSection: { headline: "", stats: [{}, {}, {}] },
  capabilitiesSection: { headline: "", items: [{}, {}, {}, {}, {}] },
  philosophySection: { headline: "", principles: [{}, {}, {}, {}] },
  growthSection: { headline: "", narrative: "", metrics: [{}, {}, {}] },
  ctaSection: { title: "", subtitle: "", button: {} },
  footer: { description: "", sections: [{}, {}], copyright: "© 2026 Michael Findling. All rights reserved." }
}

Formatting: Output ONLY valid TypeScript code. Do not include markdown wrappers. Keep the text concise and UI-friendly.`;

async function processBriefs() {
  try {
    // Ensure directories exist
    await fs.mkdir(outputDir, { recursive: true });
    
    // Read all markdown briefs
    const files = await fs.readdir(inputDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    console.log(`Found ${mdFiles.length} briefs to process...`);

    for (const file of mdFiles) {
      console.log(`Hydrating: ${file}`);
      
      const briefContent = await fs.readFile(path.join(inputDir, file), 'utf-8');
      
      // Clean up the filename to use as the TypeScript variable name
      // e.g., "account-based-marketing.md" -> "ACCOUNT_BASED_MARKETING"
      const baseName = path.basename(file, '.md');
      const topicName = baseName.toUpperCase().replace(/[^A-Z0-9]/g, '_');
      
      const dynamicInstruction = SYSTEM_INSTRUCTION.replace('[TOPIC]', topicName);

      // Call the Gemini API using the recommended model for standard generation
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: briefContent,
        config: {
          systemInstruction: dynamicInstruction,
          temperature: 0.1, // Keep it low for strict adherence to the schema
        }
      });

      let tsCode = response.text;
      
      // Strip markdown code blocks just in case the model wraps the output
      tsCode = tsCode.replace(/^
http://googleusercontent.com/immersive_entry_chip/0

Once this finishes, you can drop that entire `content/` folder right into your headless setup. 

Would you like help mapping out a Next.js component structure to automatically render these new TypeScript objects?