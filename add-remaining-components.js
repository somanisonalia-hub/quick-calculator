const fs = require('fs');

// Map JSON files to their component names
const componentMap = {
  'fuel-cost.json': 'FuelCostCalculator',
  'geometry-area.json': 'GeometryAreaCalculator',
  'linear-equation.json': 'LinearEquationCalculator',
  'shipping-cost.json': 'ShippingCostCalculator',
  'study-hours-planner.json': 'StudyHoursPlannerCalculator'
};

Object.entries(componentMap).forEach(([filename, componentName]) => {
  const filePath = `./content/calculators/${filename}`;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Add component field to all language sections
    Object.keys(data).forEach(lang => {
      if (!data[lang].component) {
        // Insert component field after slug
        const { slug, ...rest } = data[lang];
        data[lang] = { ...data[lang], component: componentName };
        
        // Reorder to put component after slug
        const ordered = {};
        Object.keys(data[lang]).forEach(key => {
          ordered[key] = data[lang][key];
          if (key === 'slug') {
            ordered.component = componentName;
          }
        });
        
        // If component was already added above, remove duplicate
        if (ordered.component && data[lang].component) {
          delete data[lang].component;
        }
        
        data[lang] = ordered;
      }
    });
    
    // Write back with proper formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Updated ${filename} with component: ${componentName}`);
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
});

console.log('\n✅ All files updated!');
