const fs = require('fs');
const expText = fs.readFileSync('content/expertise.ts','utf8');
const caseText = fs.readFileSync('content/case-studies.ts','utf8');
const indText = fs.readFileSync('content/industries.ts','utf8');

const expSlugs = [...expText.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(function(m){return m[1]});
const caseSlugs = [...caseText.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(function(m){return m[1]});
const indSlugs = [...indText.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(function(m){return m[1]});

console.log('=== 1. EXPERTISE with NO case study referencing them (dead-end) ===');
expSlugs.forEach(function(s){ if (!caseText.includes(s)) console.log('  ' + s); });

console.log('\n=== 2. EXPERTISE NOT in any industry featuredExpertise (no industry cross-link) ===');
expSlugs.forEach(function(s){ if (!indText.includes(s)) console.log('  ' + s); });

console.log('\n=== 3. INDUSTRY slugs in case-studies NOT in industries.ts registry ===');
var caseIndRefs = [...caseText.matchAll(/industry:\s*['"]([^'"]+)['"]/g)].map(function(m){return m[1]});
caseIndRefs.forEach(function(s){ if (!indSlugs.includes(s)) console.log('  BROKEN: '+s); });

console.log('\n=== 4. EXPERTISE slugs in case-studies NOT in expertise.ts registry ===');
var expArrays = [...caseText.matchAll(/expertise:\s*\[([^\]]+)\]/gs)];
var caseExpRefs = [];
expArrays.forEach(function(m){
  var refs = [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map(function(n){return n[1]});
  refs.forEach(function(r){ caseExpRefs.push(r); });
});
var uniqueCaseExpRefs = caseExpRefs.filter(function(v,i,a){return a.indexOf(v)===i;});
uniqueCaseExpRefs.forEach(function(s){ if (!expSlugs.includes(s)) console.log('  BROKEN: '+s); });

console.log('\n=== 5. INDUSTRY featuredExpertise slugs NOT in expertise.ts ===');
var indExpArrays = [...indText.matchAll(/featuredExpertise:\s*\[([^\]]+)\]/gs)];
var allIndExpRefs = [];
indExpArrays.forEach(function(m){
  var refs = [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map(function(n){return n[1]});
  refs.forEach(function(r){ allIndExpRefs.push(r); });
});
var uniqueIndExpRefs = allIndExpRefs.filter(function(v,i,a){return a.indexOf(v)===i;});
uniqueIndExpRefs.forEach(function(s){ if (!expSlugs.includes(s)) console.log('  BROKEN: '+s); });

console.log('\n=== 6. INDUSTRY featuredCaseStudies slugs NOT in case-studies.ts ===');
var indCaseArrays = [...indText.matchAll(/featuredCaseStudies:\s*\[([^\]]+)\]/gs)];
var allIndCaseRefs = [];
indCaseArrays.forEach(function(m){
  var refs = [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map(function(n){return n[1]});
  refs.forEach(function(r){ allIndCaseRefs.push(r); });
});
var uniqueIndCaseRefs = allIndCaseRefs.filter(function(v,i,a){return a.indexOf(v)===i;});
uniqueIndCaseRefs.forEach(function(s){ if (!caseSlugs.includes(s)) console.log('  BROKEN: '+s); });

console.log('\n=== 7. INDUSTRIES with NO featuredCaseStudies (dead-end industry pages) ===');
indSlugs.forEach(function(s){
  if (!indText.match(new RegExp(s + "[\\s\\S]{1,200}featuredCaseStudies"))) {
    console.log('  ' + s);
  }
});

console.log('\n=== 8. CASE STUDY industry coverage: only 1 study per industry (no siblings) ===');
var indCounts = {};
caseIndRefs.forEach(function(i){ indCounts[i] = (indCounts[i]||0)+1; });
Object.keys(indCounts).forEach(function(ind){ if(indCounts[ind]===1) console.log('  SOLO industry='+ind); });

console.log('\nDone.');
