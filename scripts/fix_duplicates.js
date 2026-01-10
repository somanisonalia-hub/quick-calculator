const fs = require('fs');

// Function to remove duplicate keys, keeping the first occurrence
function removeDuplicates(content) {
  const lines = content.split('\n');
  const seen = new Set();
  const result = [];
  
  for (const line of lines) {
    const match = line.match(/^\s*"([^"]+)":/);
    if (match) {
      const key = match[1];
      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
      // Skip duplicate keys
    } else {
      result.push(line);
    }
  }
  
  return result.join('\n');
}

// Process all language files
const files = [
  'public/locales/en/common.json',
  'public/locales/es/common.json', 
  'public/locales/pt/common.json',
  'public/locales/fr/common.json'
];

files.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleaned = removeDuplicates(content);
    
    // Validate JSON before writing
    JSON.parse(cleaned);
    
    fs.writeFileSync(filePath, cleaned);
    console.log(`✅ Fixed duplicates in ${filePath}`);
  } catch (e) {
    console.log(`❌ Error processing ${filePath}: ${e.message}`);
  }
});

console.log('\n🎉 All duplicate keys removed! First occurrence kept.');
