import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const args = process.argv.slice(2);
const getArg = (k) => {
  const i = args.indexOf(`--${k}`);
  return i !== -1 ? args[i + 1] : null;
};

const ROUTE = getArg("route");
const TEMPLATE_ID = getArg("templateId");
const CONTENT_KEY = getArg("contentKey");
const TEMPLATE_FILE = getArg("templateFile");
const CONTENT_FILE = getArg("contentFile");
const CONTENT_EXPORT = getArg("contentExport") || null;
const PAGE_TITLE = getArg("pageTitle") || "";
const THEME = getArg("theme") || "";
const HERO = getArg("heroVisualId") || "";

if (!ROUTE || !TEMPLATE_ID || !CONTENT_KEY || !TEMPLATE_FILE || !CONTENT_FILE) {
  console.error("❌ Missing required arguments.");
  console.error("Required: --route --templateId --contentKey --templateFile --contentFile");
  process.exit(1);
}

const CSV_PATH = "src/data/page-registry.csv";
const TEMPLATE_REG_PATH = "src/templates/registry.ts";
const CONTENT_REG_PATH = "src/content/registry.ts";

function mustExist(p, label) {
  if (!fs.existsSync(p)) {
    console.error(`❌ Missing ${label}: ${p}`);
    process.exit(1);
  }
}

mustExist(CSV_PATH, "CSV");
mustExist(TEMPLATE_REG_PATH, "Template registry");
mustExist(CONTENT_REG_PATH, "Content registry");
mustExist(TEMPLATE_FILE, "TEMPLATE_FILE");
mustExist(CONTENT_FILE, "CONTENT_FILE");

function expectedPrefix(route) {
  if (route.startsWith("/industries")) return "industries:";
  if (route.startsWith("/case-studies")) return "case-studies:";
  if (route.startsWith("/expertise/") && route.split("/").length === 3) {
    const slug = route.split("/")[2];
    const pillars = [
      "content-engagement",
      "demand-growth",
      "strategy-insights",
      "systems-operations",
    ];
    return pillars.includes(slug) ? "pillar:" : "expertise:";
  }
  if (route.startsWith("/expertise")) return "expertise:";
  return "";
}

const prefix = expectedPrefix(ROUTE);
if (prefix && !CONTENT_KEY.startsWith(prefix)) {
  console.error(`❌ contentKey prefix mismatch. Expected prefix: '${prefix}', got: '${CONTENT_KEY}'`);
  process.exit(1);
}

/* ---------------- TEMPLATE REGISTRY PATCH ---------------- */

function patchTemplateRegistry() {
  const original = fs.readFileSync(TEMPLATE_REG_PATH, "utf-8");

  // Already wired — idempotent
  if (original.includes(`'${TEMPLATE_ID}':`)) {
    console.log(`  ℹ️  templateId '${TEMPLATE_ID}' already in registry.`);
    return original;
  }

  const tsx = fs.readFileSync(TEMPLATE_FILE, "utf-8");

  const match =
    tsx.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/) ||
    tsx.match(/export\s+default\s+([A-Za-z0-9_]+)/);

  const componentName =
    match?.[1] ||
    path
      .basename(TEMPLATE_FILE)
      .replace(/\.(ts|tsx)$/, "")
      .replace(/[^a-zA-Z0-9]/g, "");

  const importPath =
    "@/" + TEMPLATE_FILE.replace(/\\/g, "/").replace(/\.(ts|tsx)$/, "");

  let updated = original;

  // Add import if missing
  if (!updated.includes(`from '${importPath}'`)) {
    const lines = updated.split("\n");
    const lastImport = lines.reduce(
      (acc, l, i) => (l.startsWith("import ") ? i : acc),
      0
    );
    lines.splice(lastImport + 1, 0, `import ${componentName} from '${importPath}'`);
    updated = lines.join("\n");
  }

  // Add to TemplateComponent union if missing
  if (!updated.includes(`| typeof ${componentName}`)) {
    // Find the closing of the TemplateComponent type and insert before it
    updated = updated.replace(
      /(export type TemplateComponent =[\s\S]*?)(\n\n)/,
      (_, block, end) => block + `\n  | typeof ${componentName}` + end
    );
  }

  // Add to TEMPLATE_BY_ID map — find closing brace of the map
  const lines = updated.split("\n");
  const mapStart = lines.findIndex((l) => l.includes("TEMPLATE_BY_ID"));
  if (mapStart === -1) {
    throw new Error("❌ Cannot find TEMPLATE_BY_ID anchor in template registry.");
  }
  const closeIdx = lines.findIndex(
    (l, i) => i > mapStart && l.trim() === "}"
  );
  if (closeIdx === -1) {
    throw new Error("❌ Cannot find closing brace of TEMPLATE_BY_ID.");
  }
  lines.splice(closeIdx, 0, `  '${TEMPLATE_ID}': ${componentName},`);
  updated = lines.join("\n");

  return updated;
}

/* ---------------- CONTENT REGISTRY PATCH (OBJECT MAP STYLE) ---------------- */

function patchContentRegistry() {
  const original = fs.readFileSync(CONTENT_REG_PATH, "utf-8");

  // Already wired — idempotent
  if (original.includes(`'${CONTENT_KEY}':`)) {
    console.log(`  ℹ️  contentKey '${CONTENT_KEY}' already in registry.`);
    return original;
  }

  const contentText = fs.readFileSync(CONTENT_FILE, "utf-8");

  let exportName = CONTENT_EXPORT;
  if (!exportName) {
    const m = contentText.match(/export\s+const\s+([A-Za-z0-9_]+)/);
    if (m) exportName = m[1];
  }

  if (!exportName) {
    throw new Error(
      "❌ Cannot infer content export name. Provide --contentExport."
    );
  }

  const importPath =
    "@/" + CONTENT_FILE.replace(/\\/g, "/").replace(/\.(ts|tsx)$/, "");
  const importLine = `import { ${exportName} } from '${importPath}'`;

  let updated = original;

  // Add import if missing
  if (!updated.includes(`from '${importPath}'`)) {
    const lines = updated.split("\n");
    const lastImport = lines.reduce(
      (acc, l, i) => (l.startsWith("import ") ? i : acc),
      0
    );
    lines.splice(lastImport + 1, 0, importLine);
    updated = lines.join("\n");
  }

  // Insert into contentByKey object — find the closing brace of the object
  // Anchor: the line containing `...industryByKey,` or the closing `}` of contentByKey
  const lines = updated.split("\n");
  const mapStart = lines.findIndex((l) => l.includes("const contentByKey"));
  if (mapStart === -1) {
    throw new Error("❌ Cannot find contentByKey anchor in content registry.");
  }
  // Find the closing brace of the contentByKey object
  let depth = 0;
  let closeIdx = -1;
  for (let i = mapStart; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === "{") depth++;
      if (ch === "}") {
        depth--;
        if (depth === 0) { closeIdx = i; break; }
      }
    }
    if (closeIdx !== -1) break;
  }
  if (closeIdx === -1) {
    throw new Error("❌ Cannot find closing brace of contentByKey.");
  }
  lines.splice(closeIdx, 0, `  '${CONTENT_KEY}': ${exportName},`);
  updated = lines.join("\n");

  return updated;
}

/* ---------------- CSV UPSERT ---------------- */

function upsertCsv() {
  const text = fs.readFileSync(CSV_PATH, "utf-8").trim();
  const lines = text.split("\n");
  const header = lines[0];
  const rows = lines.slice(1).filter(Boolean).map((l) => l.split(","));

  let found = false;

  const updatedRows = rows.map((r) => {
    if (r[0] === ROUTE) {
      found = true;
      return [ROUTE, CONTENT_FILE, PAGE_TITLE, TEMPLATE_ID, CONTENT_KEY, THEME, HERO];
    }
    return r;
  });

  if (!found) {
    updatedRows.push([ROUTE, CONTENT_FILE, PAGE_TITLE, TEMPLATE_ID, CONTENT_KEY, THEME, HERO]);
  }

  return header + "\n" + updatedRows.map((r) => r.join(",")).join("\n") + "\n";
}

/* ---------------- TRANSACTION ---------------- */

try {
  console.log(`\n🔧 Upserting page: ${ROUTE}`);
  console.log(`   templateId:  ${TEMPLATE_ID}`);
  console.log(`   contentKey:  ${CONTENT_KEY}`);

  const newTemplate = patchTemplateRegistry();
  const newContent = patchContentRegistry();
  const newCsv = upsertCsv();

  fs.writeFileSync(TEMPLATE_REG_PATH, newTemplate, "utf-8");
  fs.writeFileSync(CONTENT_REG_PATH, newContent, "utf-8");
  fs.writeFileSync(CSV_PATH, newCsv, "utf-8");

  console.log("\n▶  Running gen:registry...");
  execSync("npm run gen:registry", { stdio: "inherit" });

  console.log("\n▶  Running build...");
  execSync("npm run build", { stdio: "inherit" });

  console.log("\n🚀 Page installed successfully.");
} catch (err) {
  console.error("\n❌ FAIL-CLOSED:", err.message);
  process.exit(1);
}
