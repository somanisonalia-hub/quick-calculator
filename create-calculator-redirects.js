#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get all calculator slugs
const contentDir = path.join(__dirname, 'content', 'calculators');
const calculatorFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
const calculatorSlugs = calculatorFiles.map(f => f.replace('.json', ''));

console.log(`Found ${calculatorSlugs.length} calculators`);

// Create redirect page for each calculator
calculatorSlugs.forEach(slug => {
  // Handle slugs that start with numbers
  let componentName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // If component name starts with a digit, prefix with an underscore
  if (/^\d/.test(componentName)) {
    componentName = '_' + componentName;
  }

  const pageContent = `import { redirect } from 'next/navigation';

export default function ${componentName}Redirect() {
  redirect('/en/${slug}');
}
`;

  const dirPath = path.join(__dirname, 'src', 'app', slug);
  const filePath = path.join(dirPath, 'page.tsx');

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Write the page file
  fs.writeFileSync(filePath, pageContent);
  console.log(`Created: ${slug}/page.tsx`);
});

console.log(`\n✅ Created ${calculatorSlugs.length} calculator redirect pages`);
