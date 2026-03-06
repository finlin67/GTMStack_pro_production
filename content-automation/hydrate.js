import 'dotenv/config'; // <-- This automatically loads your .env file!
import fs from 'fs/promises';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

// ==========================================
// ⚙️ SCRIPT SETTINGS
// ==========================================
// Set to 'false' to SKIP files that already exist (saves time & API calls).
// Set to 'true' to OVERWRITE existing files (if you updated your markdown briefs).
const FORCE_OVERWRITE = false; 
// ==========================================

// 1. Explicitly check for the API key (which is now secretly loaded from your .env file!)
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ ERROR: GEMINI_API_KEY is missing! Make sure you created a .env file.");
  process.exit(1);
}

// 2. Initialize the AI
const ai = new GoogleGenAI({ apiKey: apiKey }); 

const TEMPLATES = {
  expertise: {
    inputDir: './briefs/expertise',
    outputDir: './content/expertise',
    instruction: `You are an expert technical copywriter. Ingest the strategic project brief and output a strictly formatted TypeScript object for an EXPERTISE landing page.
    Tone: Authoritative, strategic, professional.
    Output ONLY valid TypeScript code matching this exact template (replace [TOPIC] with the capitalized subject):
    export const [TOPIC]_CONTENT = {
      brand: { tagline: "", description: "" },
      hero: { headline: "", subheadline: "", description: "", primaryCTA: { text: "", link: "" }, secondaryCTA: { text: "", link: "" }, image: { src: "", alt: "" } },
      metricsSection: { headline: "", stats: [{ label: "", value: "" }, { label: "", value: "" }, { label: "", value: "" }] },
      capabilitiesSection: { headline: "", items: [{ title: "", description: "" }] },
      philosophySection: { headline: "", principles: [{ title: "", description: "" }] },
      growthSection: { headline: "", narrative: "", metrics: [{ label: "", value: "" }] },
      ctaSection: { title: "", subtitle: "", button: { text: "", link: "" } },
      footer: { description: "", sections: [{ title: "", links: [""] }], copyright: "© 2026 GTMStack.pro. All rights reserved." }
    }`
  },
  
  industry: {
    inputDir: './briefs/industries',
    outputDir: './content/industries',
    instruction: `You are an expert technical copywriter. Ingest the strategic project brief and output a strictly formatted TypeScript object for an INDUSTRY landing page.
    Tone: Authoritative, vertical-specific, highlighting unique industry constraints.
    Output ONLY valid TypeScript code matching this exact template (replace [INDUSTRY_NAME_SCREAMING] with the capitalized industry):
    export const [INDUSTRY_NAME_SCREAMING]_CONTENT = {
      brand: { tagline: "", description: "" },
      hero: { headline: "", subheadline: "", description: "", primaryCTA: { label: "", href: "" }, secondaryCTA: { label: "", href: "" }, image: { src: "", alt: "" } },
      metricsSection: { headline: "", stats: [{ value: "", label: "", description: "" }, { value: "", label: "", description: "" }, { value: "", label: "", description: "" }] },
      capabilitiesSection: { headline: "", items: [{ icon: "target", title: "", description: "" }] },
      philosophySection: { headline: "", principles: [{ title: "", description: "" }] },
      growthSection: { headline: "", narrative: "", metrics: [{ label: "", value: "", description: "" }] },
      ctaSection: { title: "", subtitle: "", button: { label: "", href: "" } },
      footer: { description: "", sections: [{ title: "", links: [{ label: "", href: "" }] }], copyright: "© 2026 GTMStack.pro. All rights reserved." }
    }`
  },
  
  caseStudy: {
    inputDir: './briefs/case-studies',
    outputDir: './content/case-studies',
    instruction: `You are an expert technical copywriter. Ingest the strategic project brief and output a strictly formatted TypeScript object for a CASE STUDY.
    Tone: Objective, results-oriented, analytical.
    Output ONLY valid TypeScript code matching this exact template (replace [TOPIC] with the capitalized client/project name):
    export const CASE_STUDY_[TOPIC] = {
      slug: 'generate-url-safe-slug-here',
      title: '',
      client: '',
      description: '',
      challenge: '',
      solution: '',
      results: ['', '', ''],
      tags: ['', ''],
      industry: '',
      expertise: ['', ''],
      metrics: [
        { label: '', value: '', change: '' },
        { label: '', value: '', change: '' },
        { label: '', value: '', change: '' }
      ],
      featured: true,
      year: '2024'
    }`
  }
};

// Helper function to check if a file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function processBriefs() {
  for (const [category, config] of Object.entries(TEMPLATES)) {
    console.log(`\n--- Processing Category: ${category.toUpperCase()} ---`);
    
    try {
      // Check if input directory exists
      const files = await fs.readdir(config.inputDir).catch(() => []);
      const validFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.txt'));

      if (validFiles.length === 0) {
        console.log(`No briefs found in ${config.inputDir}. Skipping...`);
        continue;
      }

      console.log(`Found ${validFiles.length} briefs in ${category}...`);

      for (const file of validFiles) {
        const baseName = path.basename(file, path.extname(file));
        const outputPath = path.join(config.outputDir, `${baseName}.ts`);
        
        // 🚀 THE SKIP/OVERWRITE LOGIC
        const alreadyExists = await fileExists(outputPath);
        if (alreadyExists && !FORCE_OVERWRITE) {
          console.log(`⏭️  Skipping: ${file} (Already exists)`);
          continue; // Skip the rest of the loop and move to the next file
        }

        console.log(`⏳ Hydrating: ${file}...`);
        
        const briefContent = await fs.readFile(path.join(config.inputDir, file), 'utf-8');
        const topicName = baseName.toUpperCase().replace(/[^A-Z0-9]/g, '_');
        
        // Call the AI
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: briefContent,
          config: {
            systemInstruction: config.instruction.replace(/\[TOPIC\]/g, topicName).replace(/\[INDUSTRY_NAME_SCREAMING\]/g, topicName),
            temperature: 0.1, 
          }
        });

        // Clean formatting
        const startBlock = new RegExp('^\\x60\\x60\\x60(?:typescript|ts)?\\n', 'i');
        const endBlock = new RegExp('\\n\\x60\\x60\\x60$', 'i');
        let tsCode = response.text.replace(startBlock, '').replace(endBlock, '');

        // Save file
        await fs.mkdir(config.outputDir, { recursive: true });
        await fs.writeFile(outputPath, tsCode.trim());
        
        console.log(`✅ Saved: ${outputPath}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`Error processing category ${category}:`, error);
    }
  }
  console.log('\n🎉 All processing complete!');
}

processBriefs();