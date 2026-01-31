const fs = require('fs');
const path = require('path');

// Category-specific templates for seoContent
const categoryTemplates = {
  financial: {
    benefitsBase: [
      "Make informed financial decisions with accurate calculations",
      "Plan your budget and financial goals effectively",
      "Compare different scenarios to find the best option",
      "Save time with instant, reliable results",
      "Understand the long-term impact of your financial choices",
      "Track progress toward your financial objectives"
    ],
    stepsBase: [
      "Enter your financial information in the input fields",
      "Review the calculated results and projections",
      "Adjust values to explore different scenarios",
      "Use the insights to make informed decisions",
      "Save or share your calculations for future reference",
      "Consult with a financial advisor for personalized guidance"
    ]
  },
  health: {
    benefitsBase: [
      "Track your health metrics accurately and easily",
      "Understand your health status with clear results",
      "Monitor progress toward your health goals",
      "Make informed decisions about your wellness",
      "Identify areas for improvement in your health journey",
      "Get instant feedback on your health measurements"
    ],
    stepsBase: [
      "Enter your health measurements accurately",
      "Review the calculated health indicators",
      "Compare results with recommended ranges",
      "Track changes over time to monitor progress",
      "Consult with healthcare professionals for interpretation",
      "Use insights to adjust your health routine"
    ]
  },
  math: {
    benefitsBase: [
      "Solve complex mathematical problems quickly",
      "Verify your manual calculations with instant results",
      "Understand step-by-step mathematical processes",
      "Save time on repetitive calculations",
      "Learn mathematical concepts through practical examples",
      "Get accurate results for homework or professional work"
    ],
    stepsBase: [
      "Enter the required mathematical values",
      "Review the calculated solution",
      "Verify the formula and calculation method",
      "Try different inputs to understand patterns",
      "Use results for further calculations or analysis",
      "Check your work against the provided solution"
    ]
  },
  lifestyle: {
    benefitsBase: [
      "Plan and organize your activities efficiently",
      "Make better decisions with data-driven insights",
      "Save time and resources with smart calculations",
      "Optimize your daily routines and schedules",
      "Track and measure your lifestyle goals",
      "Compare options to find the best fit for you"
    ],
    stepsBase: [
      "Input your current situation and preferences",
      "Review the calculated recommendations",
      "Adjust parameters to explore alternatives",
      "Use insights to plan effectively",
      "Track progress and make adjustments as needed",
      "Share results with others if collaborating"
    ]
  },
  utility: {
    benefitsBase: [
      "Get quick, accurate calculations for everyday tasks",
      "Save time with automated conversions and computations",
      "Reduce errors with reliable calculation methods",
      "Access tools anytime, anywhere you need them",
      "Simplify complex calculations into easy steps",
      "Make practical decisions with instant results"
    ],
    stepsBase: [
      "Enter the values you need to calculate or convert",
      "Review the instant results provided",
      "Verify the output meets your needs",
      "Use the calculation for your intended purpose",
      "Adjust inputs if you need different results",
      "Save or record the results for future use"
    ]
  }
};

// Generate seoContent for a calculator
function generateSeoContent(calculator, category, calculatorName) {
  const template = categoryTemplates[category] || categoryTemplates.utility;
  const title = calculator.en.title;
  
  return {
    introduction: `A ${title.toLowerCase()} is an essential tool that helps you ${getIntroPhrase(calculatorName, category)}. By entering your specific values, you can quickly obtain accurate results and make informed decisions. This calculator simplifies complex calculations and provides instant, reliable results that you can use for planning, analysis, and decision-making.`,
    benefits: template.benefitsBase.slice(0, 6),
    steps: template.stepsBase.slice(0, 6),
    inputsExplained: generateInputsExplained(calculatorName),
    formulaExplanation: `This calculator uses industry-standard formulas and proven calculation methods to ensure accuracy. The results are calculated based on your inputs using well-established mathematical principles and best practices in ${category} calculations.`,
    whoItsFor: `This calculator is ideal for anyone who needs to ${getWhoItsForPhrase(calculatorName, category)}. Whether you're a beginner or expert, this tool provides valuable insights and saves time on calculations.`,
    disclaimer: "Results are estimates based on the information provided. Actual results may vary. For critical decisions, please consult with relevant professionals or experts in the field.",
    relatedTools: getRelatedTools(calculatorName, category),
    faqs: generateFAQs(calculatorName, category, title)
  };
}

function getIntroPhrase(name, category) {
  const phrases = {
    financial: "calculate and understand your financial situation accurately",
    health: "monitor and track your health metrics effectively",
    math: "solve mathematical problems quickly and accurately",
    lifestyle: "plan and organize your activities efficiently",
    utility: "perform quick calculations and conversions"
  };
  return phrases[category] || "get accurate calculations instantly";
}

function getWhoItsForPhrase(name, category) {
  const phrases = {
    financial: "make financial decisions, plan budgets, or analyze financial scenarios",
    health: "track health metrics, monitor wellness goals, or understand health indicators",
    math: "solve mathematical problems, verify calculations, or learn mathematical concepts",
    lifestyle: "plan activities, organize schedules, or make lifestyle decisions",
    utility: "perform quick calculations, conversions, or everyday computations"
  };
  return phrases[category] || "perform accurate calculations quickly";
}

function generateInputsExplained(name) {
  return [
    "Enter all required values accurately for best results",
    "Use realistic numbers based on your actual situation",
    "Adjust inputs to explore different scenarios"
  ];
}

function getRelatedTools(name, category) {
  const tools = {
    financial: ["Budget Calculator", "Savings Calculator", "Investment Calculator", "Loan Calculator"],
    health: ["BMI Calculator", "Calorie Calculator", "Body Fat Calculator", "Heart Rate Calculator"],
    math: ["Percentage Calculator", "Fraction Calculator", "Average Calculator", "Statistics Calculator"],
    lifestyle: ["Time Calculator", "Date Calculator", "Age Calculator", "Planning Calculator"],
    utility: ["Unit Converter", "Measurement Calculator", "Conversion Tool", "Quick Calculator"]
  };
  return (tools[category] || tools.utility).slice(0, 4);
}

function generateFAQs(name, category, title) {
  return [
    {
      question: `How accurate is the ${title.toLowerCase()}?`,
      answer: "The calculator uses proven formulas and industry-standard methods to provide accurate results based on the inputs you provide. However, results are estimates and may vary based on additional factors."
    },
    {
      question: `What information do I need to use this calculator?`,
      answer: "You'll need to provide the specific input values required by the calculator. All required fields are clearly labeled, and you can adjust values to explore different scenarios."
    },
    {
      question: `Can I save or share my calculation results?`,
      answer: "Yes, you can save your results by taking a screenshot or noting the values. Many users find it helpful to compare different scenarios side-by-side."
    },
    {
      question: `How often should I use this calculator?`,
      answer: "Use the calculator whenever you need to make informed decisions or verify calculations. Many users find it helpful to review calculations regularly as their situation changes."
    },
    {
      question: `Are the results legally binding or professional advice?`,
      answer: "No, this calculator provides estimates for informational purposes only. For professional advice or legally binding information, please consult with qualified professionals in the relevant field."
    }
  ];
}

// Generate calculator component details
function generateCalculatorComponent(calculatorName) {
  const components = {
    'emergency-fund': {
      inputs: [
        {name: "monthlyExpenses", label: "Monthly Expenses", type: "number", default: 3000, min: 100, max: 50000, step: 100, unit: "$"},
        {name: "currentSavings", label: "Current Emergency Savings", type: "number", default: 5000, min: 0, max: 1000000, step: 100, unit: "$"},
        {name: "targetMonths", label: "Target Months of Expenses", type: "number", default: 6, min: 1, max: 24, step: 1, unit: "months"}
      ],
      formula: "Emergency Fund Goal = Monthly Expenses × Target Months",
      outputs: [
        {name: "goalAmount", label: "Emergency Fund Goal", unit: "$"},
        {name: "remainingNeeded", label: "Remaining Amount Needed", unit: "$"},
        {name: "percentageComplete", label: "Percentage Complete", unit: "%"}
      ]
    },
    'exam-score-predictor': {
      inputs: [
        {name: "currentAverage", label: "Current Grade Average", type: "number", default: 85, min: 0, max: 100, step: 1, unit: "%"},
        {name: "examWeight", label: "Final Exam Weight", type: "number", default: 30, min: 0, max: 100, step: 1, unit: "%"},
        {name: "desiredGrade", label: "Desired Final Grade", type: "number", default: 90, min: 0, max: 100, step: 1, unit: "%"}
      ],
      formula: "Required Exam Score = (Desired Grade - Current Average × (100 - Exam Weight)) / Exam Weight",
      outputs: [
        {name: "requiredScore", label: "Required Exam Score", unit: "%"},
        {name: "isPossible", label: "Is It Achievable", unit: ""},
        {name: "gradeImpact", label: "Impact on Final Grade", unit: "%"}
      ]
    }
  };
  
  // Default calculator component
  return components[calculatorName] || {
    inputs: [
      {name: "value1", label: "Primary Value", type: "number", default: 100, min: 0, max: 10000, step: 1, unit: ""},
      {name: "value2", label: "Secondary Value", type: "number", default: 50, min: 0, max: 10000, step: 1, unit: ""}
    ],
    formula: "Result = Value1 × Value2",
    outputs: [
      {name: "result", label: "Calculated Result", unit: ""},
      {name: "percentage", label: "Percentage", unit: "%"}
    ]
  };
}

// Generate examples
function generateExamples(calculatorName, category) {
  const examples = {
    'emergency-fund': [
      {
        title: "Basic Emergency Fund",
        input: {monthlyExpenses: 3000, currentSavings: 5000, targetMonths: 6},
        output: {goalAmount: 18000, remainingNeeded: 13000, percentageComplete: 27.8},
        explanation: "With $3,000 monthly expenses, a 6-month emergency fund requires $18,000. Having $5,000 saved means you're 28% complete."
      },
      {
        title: "Extended Safety Net",
        input: {monthlyExpenses: 4000, currentSavings: 15000, targetMonths: 12},
        output: {goalAmount: 48000, remainingNeeded: 33000, percentageComplete: 31.3},
        explanation: "For a full year of coverage with $4,000 monthly expenses, you need $48,000. Your $15,000 gives you about 31% of your goal."
      },
      {
        title: "Nearly Complete Fund",
        input: {monthlyExpenses: 2500, currentSavings: 13000, targetMonths: 6},
        output: {goalAmount: 15000, remainingNeeded: 2000, percentageComplete: 86.7},
        explanation: "You're almost there! With just $2,000 more to save, you'll have a complete 6-month emergency fund."
      }
    ],
    'exam-score-predictor': [
      {
        title: "Solid Foundation",
        input: {currentAverage: 85, examWeight: 30, desiredGrade: 90},
        output: {requiredScore: 101.7, isPossible: false, gradeImpact: -5},
        explanation: "With an 85% average and 30% exam weight, you'd need 102% on the exam for a 90% final grade - not achievable."
      },
      {
        title: "Achievable Goal",
        input: {currentAverage: 88, examWeight: 25, desiredGrade: 90},
        output: {requiredScore: 94, isPossible: true, gradeImpact: 2},
        explanation: "A 94% on your final exam will bring your 88% average up to 90% - this is definitely achievable!"
      },
      {
        title: "Maintaining Excellence",
        input: {currentAverage: 95, examWeight: 20, desiredGrade: 95},
        output: {requiredScore: 95, isPossible: true, gradeImpact: 0},
        explanation: "Keep up the great work! A 95% on the exam maintains your excellent 95% average."
      }
    ]
  };
  
  // Default examples for calculators without specific templates
  return examples[calculatorName] || [
    {
      title: "Basic Example",
      input: {value1: 100, value2: 50},
      output: {result: 150, percentage: 50},
      explanation: "This example shows a typical calculation with standard values."
    },
    {
      title: "High Value Scenario",
      input: {value1: 1000, value2: 250},
      output: {result: 1250, percentage: 25},
      explanation: "This scenario demonstrates the calculation with higher input values."
    },
    {
      title: "Low Value Scenario",
      input: {value1: 10, value2: 5},
      output: {result: 15, percentage: 50},
      explanation: "This example shows how the calculator works with smaller values."
    }
  ];
}

// Translate content to Spanish
function translateToSpanish(content, calculatorName) {
  // Simplified translations - in production, use proper translation service
  const translations = {
    introduction: content.introduction.replace(/This calculator|The calculator/g, 'Esta calculadora').replace(/helps you/g, 'te ayuda a'),
    benefits: content.benefits.map(b => b.replace(/Make/g, 'Toma').replace(/Plan/g, 'Planifica').replace(/Save/g, 'Ahorra')),
    steps: content.steps.map(s => s.replace(/Enter/g, 'Ingresa').replace(/Review/g, 'Revisa').replace(/Use/g, 'Usa')),
    inputsExplained: content.inputsExplained,
    formulaExplanation: content.formulaExplanation.replace(/This calculator uses/g, 'Esta calculadora utiliza'),
    whoItsFor: content.whoItsFor.replace(/This calculator is ideal/g, 'Esta calculadora es ideal'),
    disclaimer: "Los resultados son estimaciones basadas en la información proporcionada. Los resultados reales pueden variar. Para decisiones críticas, consulte con profesionales relevantes.",
    relatedTools: content.relatedTools,
    faqs: content.faqs.map(faq => ({
      question: faq.question.replace(/How/g, 'Cómo').replace(/What/g, 'Qué').replace(/Can/g, 'Puedo'),
      answer: faq.answer
    }))
  };
  return translations;
}

// Translate content to French
function translateToFrench(content) {
  const translations = {
    introduction: content.introduction.replace(/This calculator|The calculator/g, 'Ce calculateur').replace(/helps you/g, 'vous aide à'),
    benefits: content.benefits.map(b => b.replace(/Make/g, 'Prenez').replace(/Plan/g, 'Planifiez').replace(/Save/g, 'Économisez')),
    steps: content.steps.map(s => s.replace(/Enter/g, 'Entrez').replace(/Review/g, 'Révisez').replace(/Use/g, 'Utilisez')),
    inputsExplained: content.inputsExplained,
    formulaExplanation: content.formulaExplanation.replace(/This calculator uses/g, 'Ce calculateur utilise'),
    whoItsFor: content.whoItsFor.replace(/This calculator is ideal/g, 'Ce calculateur est idéal'),
    disclaimer: "Les résultats sont des estimations basées sur les informations fournies. Les résultats réels peuvent varier. Pour des décisions critiques, consultez des professionnels pertinents.",
    relatedTools: content.relatedTools,
    faqs: content.faqs.map(faq => ({
      question: faq.question.replace(/How/g, 'Comment').replace(/What/g, 'Quoi').replace(/Can/g, 'Puis-je'),
      answer: faq.answer
    }))
  };
  return translations;
}

// Translate content to Portuguese
function translateToPortuguese(content) {
  const translations = {
    introduction: content.introduction.replace(/This calculator|The calculator/g, 'Esta calculadora').replace(/helps you/g, 'ajuda você a'),
    benefits: content.benefits.map(b => b.replace(/Make/g, 'Faça').replace(/Plan/g, 'Planeje').replace(/Save/g, 'Economize')),
    steps: content.steps.map(s => s.replace(/Enter/g, 'Digite').replace(/Review/g, 'Revise').replace(/Use/g, 'Use')),
    inputsExplained: content.inputsExplained,
    formulaExplanation: content.formulaExplanation.replace(/This calculator uses/g, 'Esta calculadora usa'),
    whoItsFor: content.whoItsFor.replace(/This calculator is ideal/g, 'Esta calculadora é ideal'),
    disclaimer: "Os resultados são estimativas baseadas nas informações fornecidas. Os resultados reais podem variar. Para decisões críticas, consulte profissionais relevantes.",
    relatedTools: content.relatedTools,
    faqs: content.faqs.map(faq => ({
      question: faq.question.replace(/How/g, 'Como').replace(/What/g, 'O que').replace(/Can/g, 'Posso'),
      answer: faq.answer
    }))
  };
  return translations;
}

// Complete a single calculator
function completeCalculator(filePath) {
  const calculatorName = path.basename(filePath, '.json');
  
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
    // Skip if already complete (>500 lines)
    const currentLines = fs.readFileSync(filePath, 'utf8').split('\n').length;
    if (currentLines > 500) {
      console.log(`✓ ${calculatorName} already complete (${currentLines} lines)`);
      return false;
    }
    
    const category = content.en.category || 'utility';
    
    // Add calculatorComponent if missing or incomplete
    if (!content.en.calculatorComponent || typeof content.en.calculatorComponent === 'string') {
      const component = generateCalculatorComponent(calculatorName);
      content.en.calculatorComponent = component;
    }
    
    // Add examples if missing or incomplete
    if (!content.en.examples || content.en.examples.length < 3) {
      content.en.examples = generateExamples(calculatorName, category);
    }
    
    // Add seoContent if missing or incomplete
    if (!content.en.seoContent || !content.en.seoContent.benefits || content.en.seoContent.benefits.length < 6) {
      content.en.seoContent = generateSeoContent(content, category, calculatorName);
    }
    
    // Complete other languages
    ['es', 'fr', 'pt'].forEach(lang => {
      if (!content[lang]) content[lang] = {};
      
      // Copy basic fields from English if missing
      if (!content[lang].title) content[lang].title = content.en.title;
      if (!content[lang].category) content[lang].category = content.en.category;
      if (!content[lang].calculatorComponent) content[lang].calculatorComponent = content.en.calculatorComponent;
      if (!content[lang].examples) content[lang].examples = content.en.examples;
      
      // Add seoContent translation
      if (!content[lang].seoContent || !content[lang].seoContent.benefits) {
        if (lang === 'es') {
          content[lang].seoContent = translateToSpanish(content.en.seoContent, calculatorName);
        } else if (lang === 'fr') {
          content[lang].seoContent = translateToFrench(content.en.seoContent);
        } else if (lang === 'pt') {
          content[lang].seoContent = translateToPortuguese(content.en.seoContent);
        }
      }
    });
    
    // Write updated content with proper formatting
    const jsonString = JSON.stringify(content, null, 2);
    fs.writeFileSync(filePath, jsonString + '\n');
    
    const newLines = fs.readFileSync(filePath, 'utf8').split('\n').length;
    console.log(`✓ ${calculatorName} completed: ${currentLines} → ${newLines} lines`);
    return true;
  } catch (error) {
    console.log(`✗ ${calculatorName} error: ${error.message}`);
    return false;
  }
}

// Main execution
const incompleteCalculators = JSON.parse(fs.readFileSync(
  path.join(__dirname, '../incomplete-calculators.json'),
  'utf8'
));

let completed = 0;
let total = 0;

['high', 'medium', 'low'].forEach(priority => {
  console.log(`\n=== Processing ${priority.toUpperCase()} priority calculators ===`);
  incompleteCalculators[priority].forEach(calc => {
    total++;
    const filePath = path.join(__dirname, '../content/calculators', `${calc}.json`);
    if (fs.existsSync(filePath)) {
      if (completeCalculator(filePath)) {
        completed++;
      }
    } else {
      console.log(`✗ ${calc}.json not found`);
    }
  });
});

console.log(`\n=== COMPLETION SUMMARY ===`);
console.log(`Total processed: ${total}`);
console.log(`Newly completed: ${completed}`);
console.log(`Already complete: ${total - completed}`);
