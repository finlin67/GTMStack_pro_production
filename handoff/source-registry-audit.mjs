import fs from "fs";

const CSV_PATH = "src/data/page-registry.csv";
const TEMPLATE_REG_PATH = "src/templates/registry.ts";
const CONTENT_REG_PATH = "src/content/registry.ts";

function mustExist(p, label) {
  if (!fs.existsSync(p)) {
    console.error(`❌ Missing file: ${label} (${p})`);
    process.exit(1);
  }
}

mustExist(CSV_PATH, "page-registry.csv");
mustExist(TEMPLATE_REG_PATH, "src/templates/registry.ts");
mustExist(CONTENT_REG_PATH, "src/content/registry.ts");

const csv = fs.readFileSync(CSV_PATH, "utf-8").trim().split("\n");
const header = csv[0].split(",");
const rows = csv.slice(1).filter(Boolean).map((l) => l.split(","));

const routeIdx = header.indexOf("route");
const templateIdx = header.indexOf("templateId");
const contentIdx = header.indexOf("contentKey");

if (routeIdx === -1 || templateIdx === -1 || contentIdx === -1) {
  console.error("❌ CSV header missing required columns: route, templateId, contentKey");
  process.exit(1);
}

const templateReg = fs.readFileSync(TEMPLATE_REG_PATH, "utf-8");
const contentReg = fs.readFileSync(CONTENT_REG_PATH, "utf-8");

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

let ok = true;
const seen = {};

for (const r of rows) {
  const route = r[routeIdx]?.trim();
  const templateId = r[templateIdx]?.trim();
  const contentKey = r[contentIdx]?.trim();

  if (!route || !templateId || !contentKey) {
    console.log(`⚠️  Incomplete row: ${r.join(",")}`);
    ok = false;
    continue;
  }

  seen[route] = (seen[route] || 0) + 1;

  // Check templateId is wired in TEMPLATE_BY_ID
  if (!templateReg.includes(`'${templateId}':`)) {
    console.log(`❌ templateId not wired in TEMPLATE_BY_ID: '${templateId}' (route: ${route})`);
    ok = false;
  }

  // Keys populated via dynamic spreads or runtime lookups — not literal strings in contentByKey.
  // industries:* → ...industryByKey spread
  // pillar:*     → getExpertiseByPillar() at runtime
  // case-studies:* → getCaseStudyBySlug() at runtime
  const dynamicPrefixes = ["industries:", "pillar:", "case-studies:"];
  const isDynamic = dynamicPrefixes.some((p) => contentKey.startsWith(p));

  if (!isDynamic && !contentReg.includes(`'${contentKey}':`)) {
    console.log(`❌ contentKey not wired in contentByKey: '${contentKey}' (route: ${route})`);
    ok = false;
  } else if (isDynamic) {
    console.log(`  ℹ️  '${contentKey}' is dynamically resolved — skipping literal check.`);
  }

  // Check contentKey prefix convention
  const prefix = expectedPrefix(route);
  if (prefix && !contentKey.startsWith(prefix)) {
    console.log(`⚠️  Prefix mismatch for route '${route}': contentKey '${contentKey}' should start with '${prefix}'`);
    ok = false;
  }
}

// Check for duplicate routes
for (const route in seen) {
  if (seen[route] > 1) {
    console.log(`❌ Duplicate route in CSV: ${route} (${seen[route]} entries)`);
    ok = false;
  }
}

if (!ok) {
  console.log("\n❌ Registry audit FAILED.");
  process.exit(1);
}

console.log(`✅ Registry audit passed. (${rows.length} routes checked)`);
