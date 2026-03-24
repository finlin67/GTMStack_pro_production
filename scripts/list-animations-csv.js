// scripts/list-animations-csv.js
// Usage: node scripts/list-animations-csv.js

const fs = require("fs");
const path = require("path");

const dataPath = path.resolve(__dirname, "C:\GitProd\GTMStack_Animations\gtmstack_animations\dist\animations.index.json");
let animations = [];

try {
  const raw = fs.readFileSync(dataPath, "utf-8");
  animations = JSON.parse(raw);
} catch (e) {
  console.error("Could not read or parse animations.index.json:", e);
  process.exit(1);
}

console.log("heroVisualId,Animation Title");
if (Array.isArray(animations)) {
  animations.forEach((a) => {
    // Escape quotes and commas for CSV safety
    const id = (a.id || "").replace(/"/g, '""');
    const title = (a.title || "").replace(/"/g, '""');
    console.log(`"${id}","${title}"`);
  });
} else {
  console.error("animations.index.json is not an array.");
}