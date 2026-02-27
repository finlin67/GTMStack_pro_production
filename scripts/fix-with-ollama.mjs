#!/usr/bin/env node

import fs from 'fs/promises';
import ollama from 'ollama'; // npm install ollama

const model = 'gwendcoder7b'; // ← change to your model name

const systemPrompt = `
You are a senior TypeScript/Next.js engineer fixing build/compile errors.
Rules:
- ONLY fix errors — do NOT change logic, rename things unnecessarily, or add features.
- Keep ALL original comments and structure.
- For duplicate imports: use unique aliases (e.g. rename second import to Name2 or NameVariant).
- Update all usages of the old name.
- For config issues (next.config.js): ensure valid exports, async functions if needed.
- Output ONLY the complete fixed file — no explanations, no markdown, no fences.
- If you cannot fix it, output exactly: /* FIX FAILED - [short reason] */
`;

async function fixFile(inputPath, outputPath = null) {
  const code = await fs.readFile(inputPath, 'utf-8');
  const filename = inputPath.split('/').pop();

  const response = await ollama.chat({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: `Fix this file (${filename}) — it has build errors (duplicates, invalid config, etc.):\n\n${code}`
      }
    ],
    options: { temperature: 0.0 } // very deterministic
  });

  const fixed = response.message.content.trim();

  const outPath = outputPath || inputPath.replace(/\.ts$/, '.fixed.ts');
  await fs.writeFile(outPath, fixed);

  console.log(`Fixed version saved to: ${outPath}`);
  console.log('First few lines of fixed code:');
  console.log(fixed.slice(0, 300) + '...');
}

// Run it
const [_, __, inputFile] = process.argv;
if (!inputFile) {
  console.error('Usage: node fix-with-ollama.mjs path/to/broken-file.ts');
  process.exit(1);
}

fixFile(inputFile).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});