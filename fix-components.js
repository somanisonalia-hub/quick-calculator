const fs = require('fs');
const path = require('path');

// Mapping of JSON files to their component names
const componentMapping = {
  'credit-card-payoff.json': 'CreditCardPayoffCalculator',
  'emergency-fund.json': 'EmergencyFundCalculator',
  'exam-score-predictor.json': 'ExamScorePredictorCalculator',
  'net-worth.json': 'NetWorthCalculator',
  'savings-goal.json': 'SavingsGoalCalculator',
  'sleep-calculator.json': 'SleepCalculator',
  'trip-planner.json': 'TripPlannerCalculator',
};

const contentDir = 'content/calculators';

Object.entries(componentMapping).forEach(([filename, component]) => {
  const filepath = path.join(contentDir, filename);
  try {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    ['en', 'es', 'pt', 'fr'].forEach(lang => {
      if (data[lang]) {
        data[lang].component = component;
      }
    });
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    console.log('✅', filename, '->', component);
  } catch (err) {
    console.error('❌', filename, err.message);
  }
});

console.log('\nDone! Run check-calculators.js again to verify.');
