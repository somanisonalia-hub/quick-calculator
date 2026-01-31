const fs = require('fs');
const path = require('path');

const files = [
  'age-calculator.json',
  'bmi-calculator.json',
  'bmr-calculator.json',
  'body-fat-calculator.json',
  'calorie-calculator.json',
  'compound-interest-calculator.json',
  'credit-card-calculator.json',
  'date-calculator.json',
  'fraction-calculator.json',
  'gpa-calculator.json',
  'income-tax-calculator.json',
  'investment-calculator.json',
  'loan-calculator.json',
  'mortgage-calculator.json',
  'percentage-calculator.json',
  'retirement-calculator.json',
  'retirement-plan.json',
  'retirement-savings.json',
  'sales-tax-calculator.json',
  'scientific-calculator.json',
  'simple-interest-calculator.json',
  'square-footage-calculator.json',
  'tdee-calculator.json',
  'tip-calculator.json'
];

const contentDir = path.join(__dirname, 'content', 'calculators');

files.forEach(fileName => {
  const filePath = path.join(contentDir, fileName);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Get the English slug
    const enSlug = data.en?.slug;
    if (!enSlug) {
      console.log(`⚠️  ${fileName}: No English slug found, skipping`);
      return;
    }
    
    let changed = false;
    
    // Update Spanish slug
    if (data.es && data.es.slug !== enSlug) {
      console.log(`🔧 ${fileName}: Changing ES slug from "${data.es.slug}" to "${enSlug}"`);
      data.es.slug = enSlug;
      changed = true;
    }
    
    // Update French slug
    if (data.fr && data.fr.slug !== enSlug) {
      console.log(`🔧 ${fileName}: Changing FR slug from "${data.fr.slug}" to "${enSlug}"`);
      data.fr.slug = enSlug;
      changed = true;
    }
    
    // Update Portuguese slug
    if (data.pt && data.pt.slug !== enSlug) {
      console.log(`🔧 ${fileName}: Changing PT slug from "${data.pt.slug}" to "${enSlug}"`);
      data.pt.slug = enSlug;
      changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`✅ ${fileName}: Saved with corrected slugs\n`);
    } else {
      console.log(`✓  ${fileName}: Already has English slugs across all languages\n`);
    }
    
  } catch (error) {
    console.error(`❌ ${fileName}: Error - ${error.message}`);
  }
});

console.log('\n✅ All done! All slugs are now English-only across all languages.');
