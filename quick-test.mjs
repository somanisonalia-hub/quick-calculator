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

console.log(`Testing ${slugs.length} calculator pages...\n`);

const results = { success: [], errors: [] };
let tested = 0;

async function testPage(slug) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3000/en/${slug}/`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        tested++;
        const hasError = res.statusCode !== 200 || 
          data.includes('is not defined') || 
          data.includes('ReferenceError') ||
          data.includes('TypeError');
        
        if (hasError) {
          results.errors.push({ slug, status: res.statusCode });
          console.log(`❌ ${slug} (HTTP ${res.statusCode})`);
        } else {
          results.success.push(slug);
          console.log(`✅ ${slug}`);
        }
        resolve();
      });
    }).on('error', err => {
      tested++;
      results.errors.push({ slug, error: err.message });
      console.log(`❌ ${slug} (Connection error)`);
      resolve();
    });
    req.setTimeout(10000, () => {
      req.destroy();
      tested++;
      results.errors.push({ slug, error: 'Timeout' });
      console.log(`⏱️  ${slug} (Timeout)`);
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
  console.log(`✅ Passed: ${results.success.length}/${slugs.length}`);
  console.log(`❌ Failed: ${results.errors.length}/${slugs.length}`);
  
  if (results.errors.length > 0) {
    console.log(`\nFailed pages:`);
    results.errors.forEach(e => console.log(`  - ${e.slug}: HTTP ${e.status || 'err'}`));
  } else {
    console.log(`\n🎉 All pages working!`);
  }
}

run();
