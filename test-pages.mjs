import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const calculatorsDir = path.join(__dirname, 'content', 'calculators');
const files = fs.readdirSync(calculatorsDir).filter(f => f.endsWith('.json'));

const slugs = [];
for (const file of files) {
  try {
    const content = JSON.parse(fs.readFileSync(path.join(calculatorsDir, file), 'utf-8'));
    const slug = content.en?.slug || file.replace('.json', '');
    slugs.push(slug);
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
}

console.log(`Testing ${slugs.length} calculator pages...\n`);

let tested = 0;
let errors = [];
let success = 0;

function testPage(slug) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/en/${slug}/`,
      method: 'GET',
      timeout: 10000
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        tested++;
        if (res.statusCode === 200) {
          if (data.includes('Application error') || 
              data.includes('is not defined') ||
              data.includes('ReferenceError') ||
              data.includes('TypeError') ||
              data.includes('Unhandled Runtime Error')) {
            errors.push({ slug, status: res.statusCode, error: 'Runtime error in page' });
            console.log(`❌ [${tested}/${slugs.length}] ${slug} - Runtime error detected`);
          } else {
            success++;
            console.log(`✅ [${tested}/${slugs.length}] ${slug}`);
          }
        } else {
          errors.push({ slug, status: res.statusCode, error: `HTTP ${res.statusCode}` });
          console.log(`❌ [${tested}/${slugs.length}] ${slug} - HTTP ${res.statusCode}`);
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      tested++;
      errors.push({ slug, error: err.message });
      console.log(`❌ [${tested}/${slugs.length}] ${slug} - ${err.message}`);
      resolve();
    });

    req.on('timeout', () => {
      req.destroy();
      tested++;
      errors.push({ slug, error: 'Timeout' });
      console.log(`⏱️  [${tested}/${slugs.length}] ${slug} - Timeout`);
      resolve();
    });

    req.end();
  });
}

async function testAll() {
  const batchSize = 5;
  for (let i = 0; i < slugs.length; i += batchSize) {
    const batch = slugs.slice(i, i + batchSize);
    await Promise.all(batch.map(slug => testPage(slug)));
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n=== Test Results ===');
  console.log(`Total pages: ${slugs.length}`);
  console.log(`✅ Success: ${success}`);
  console.log(`❌ Errors: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('\nPages with errors:');
    errors.forEach(({ slug, status, error }) => {
      console.log(`  - ${slug}: ${error || `HTTP ${status}`}`);
    });
  }
}

testAll();
