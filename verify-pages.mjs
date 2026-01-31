#!/usr/bin/env node

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const calculatorsDir = path.join(__dirname, 'content', 'calculators');

// Get all slugs
const files = fs.readdirSync(calculatorsDir).filter(f => f.endsWith('.json'));
const slugs = [];
for (const file of files) {
  try {
    const content = JSON.parse(fs.readFileSync(path.join(calculatorsDir, file), 'utf-8'));
    const slug = content.en?.slug || file.replace('.json', '');
    slugs.push(slug);
  } catch (err) {
    // skip
  }
}

console.log(`Verifying ${slugs.length} calculator pages with actual content...\n`);

const results = { success: [], missingContent: [], errors: [] };
let tested = 0;

async function testPage(slug) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000/en/${slug}/`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        tested++;
        
        // Check for actual content
        const hasCalculator = data.toLowerCase().includes('calculator') || data.includes('Calculate');
        const hasContent = data.includes('<input') || data.includes('type=') || data.length > 10000;
        
        if (res.statusCode === 200 && hasCalculator && hasContent) {
          results.success.push(slug);
          console.log(`✅ ${slug} - loaded with content`);
        } else if (res.statusCode === 200 && !hasCalculator) {
          results.missingContent.push({ slug, reason: 'Missing "Calculator" word' });
          console.log(`⚠️  ${slug} - no "Calculator" text found`);
        } else if (res.statusCode === 200 && !hasContent) {
          results.missingContent.push({ slug, reason: 'Minimal content' });
          console.log(`⚠️  ${slug} - minimal content (possible loading screen)`);
        } else {
          results.errors.push({ slug, status: res.statusCode });
          console.log(`❌ ${slug} - HTTP ${res.statusCode}`);
        }
        resolve();
      });
    }).on('error', err => {
      tested++;
      results.errors.push({ slug, error: err.message });
      console.log(`❌ ${slug} - ${err.message}`);
      resolve();
    });
    req.setTimeout(10000, () => {
      req.destroy();
      tested++;
      results.errors.push({ slug, error: 'Timeout' });
      console.log(`⏱️  ${slug} - Timeout`);
      resolve();
    });
  });
}

async function run() {
  // Test in batches of 2
  for (let i = 0; i < slugs.length; i += 2) {
    const batch = slugs.slice(i, i + 2);
    await Promise.all(batch.map(testPage));
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ Fully Loaded: ${results.success.length}/${slugs.length}`);
  console.log(`⚠️  Partial/Missing Content: ${results.missingContent.length}/${slugs.length}`);
  console.log(`❌ Errors: ${results.errors.length}/${slugs.length}`);
  
  if (results.missingContent.length > 0) {
    console.log(`\nPages with missing/minimal content:`);
    results.missingContent.forEach(e => console.log(`  - ${e.slug}: ${e.reason}`));
  }
  
  if (results.errors.length > 0) {
    console.log(`\nPages with errors:`);
    results.errors.forEach(e => console.log(`  - ${e.slug}: ${e.error}`));
  }
  
  if (results.success.length === slugs.length) {
    console.log(`\n🎉 All pages loading with calculator content!`);
  }
}

run();
