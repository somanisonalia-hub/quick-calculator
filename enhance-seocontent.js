const fs = require('fs');
const path = require('path');

const dir = './content/calculators';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let enhanced = 0;

const defaultBenefits = [
  "Get accurate calculations instantly and save time",
  "Make informed decisions based on reliable results",
  "Understand complex calculations with clear explanations",
  "Compare different scenarios easily",
  "Access professional-grade calculations for free",
  "Get results you can trust for important decisions"
];

const defaultSteps = [
  "Enter your values in the input fields provided",
  "Review the automatic calculations and results",
  "Adjust inputs to explore different scenarios",
  "Use the results for your planning and decision-making",
  "Save or share your calculations as needed",
  "Consult professionals for personalized advice"
];

const defaultFAQs = [
  {
    question: "How accurate is this calculator?",
    answer: "This calculator uses industry-standard formulas and proven calculation methods to provide accurate results based on your inputs. However, results are estimates and actual outcomes may vary based on individual circumstances."
  },
  {
    question: "What information do I need?",
    answer: "You'll need to provide the specific input values required by the calculator. All required fields are clearly labeled in the calculator interface."
  },
  {
    question: "Can I save my results?",
    answer: "Yes, you can save your results by taking a screenshot, printing the page, or noting down the values for future reference."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, all calculations are performed locally in your browser. We don't store or transmit your personal calculation data."
  },
  {
    question: "How often should I use this calculator?",
    answer: "Use the calculator whenever you need to make calculations or verify results. Many users find it helpful to recalculate when their situation changes."
  }
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const seo = content.en?.seoContent;
    
    let needsUpdate = false;
    
    if (!seo || !seo.benefits || seo.benefits.length < 6) {
      if (!content.en.seoContent) content.en.seoContent = {};
      content.en.seoContent.benefits = defaultBenefits;
      needsUpdate = true;
    }
    
    if (!seo || !seo.steps || seo.steps.length < 6) {
      if (!content.en.seoContent) content.en.seoContent = {};
      content.en.seoContent.steps = defaultSteps;
      needsUpdate = true;
    }
    
    if (!seo || !seo.faqs || seo.faqs.length < 5) {
      if (!content.en.seoContent) content.en.seoContent = {};
      content.en.seoContent.faqs = defaultFAQs;
      needsUpdate = true;
    }
    
    if (!seo || !seo.introduction) {
      if (!content.en.seoContent) content.en.seoContent = {};
      const title = content.en.title || 'calculator';
      content.en.seoContent.introduction = `This ${title.toLowerCase()} helps you make accurate calculations quickly and easily. Get instant, reliable results to support your decision-making process.`;
      needsUpdate = true;
    }
    
    // Copy to other languages
    if (needsUpdate) {
      ['es', 'fr', 'pt'].forEach(lang => {
        if (content[lang]) {
          if (!content[lang].seoContent) content[lang].seoContent = {};
          if (!content[lang].seoContent.benefits) content[lang].seoContent.benefits = content.en.seoContent.benefits;
          if (!content[lang].seoContent.steps) content[lang].seoContent.steps = content.en.seoContent.steps;
          if (!content[lang].seoContent.faqs) content[lang].seoContent.faqs = content.en.seoContent.faqs;
          if (!content[lang].seoContent.introduction) content[lang].seoContent.introduction = content.en.seoContent.introduction;
        }
      });
      
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
      console.log(`✓ ${file}`);
      enhanced++;
    }
  } catch (error) {
    console.log(`✗ ${file} - ${error.message}`);
  }
});

console.log(`\n✅ Enhanced seoContent in ${enhanced} calculators`);
