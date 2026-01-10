const fs = require('fs');

function fixDuplicatesInI18n() {
  const content = fs.readFileSync('src/lib/i18n.ts', 'utf8');
  const lines = content.split('\n');
  const seen = new Set();
  const result = [];
  let removedCount = 0;

  for (const line of lines) {
    // Check if this is a property definition line (key: "value",)
    const match = line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*):\s*".*?",?$/);
    if (match) {
      const key = match[1];
      if (seen.has(key)) {
        console.log('Removing duplicate:', key);
        removedCount++;
        continue;
      }
      seen.add(key);
    }
    result.push(line);
  }

  fs.writeFileSync('src/lib/i18n.ts', result.join('\n'));
  console.log(`✅ Fixed ${removedCount} duplicates in i18n.ts`);
}

fixDuplicatesInI18n();

