'use client';

import { useState } from 'react';

interface GoalBasedInvestmentCalculatorProps {
  lang?: string;
}

export default function GoalBasedInvestmentCalculator({ lang = 'en' }: GoalBasedInvestmentCalculatorProps) {
  const [inputs, setInputs] = useState({
    targetGoal: 1000000,
    years: 10,
    expectedReturn: 10,
    inflationRate: 5
  });

  const [results, setResults] = useState({
    inflationAdjustedGoal: 0,
    monthlySIP: 0,
    lumpsumNeeded: 0
  });

  const translations = {
    en: {
      title: 'Goal-Based Investment Calculator',
      targetGoal: 'Financial Goal Amount (₹)',
      years: 'Time Horizon (Years)',
      expectedReturn: 'Expected Annual Return (%)',
      inflationRate: 'Inflation Rate (%)',
      calculate: 'Calculate Required Investment',
      inflationAdjustedGoal: 'Inflation-Adjusted Goal',
      monthlySIP: 'Required Monthly SIP',
      lumpsumNeeded: 'Required Lumpsum',
      rupee: '₹',
      reset: "Reset"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateGoal = () => {
    const goal = inputs.targetGoal;
    const years = inputs.years;
    const returnRate = inputs.expectedReturn / 100;
    const inflationRate = inputs.inflationRate / 100;

    // Calculate inflation-adjusted goal
    const adjustedGoal = goal * Math.pow(1 + inflationRate, years);

    // Calculate required monthly SIP
    const monthlyRate = returnRate / 12;
    const months = years * 12;
    const monthlySIP = adjustedGoal / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate / (1 + monthlyRate));

    // Calculate required lumpsum
    const lumpsumNeeded = adjustedGoal / Math.pow(1 + returnRate, years);

    setResults({
      inflationAdjustedGoal: adjustedGoal,
      monthlySIP: monthlySIP,
      lumpsumNeeded: lumpsumNeeded
    });
  };

  const resetCalculator = () => {
    // Reset all input values to defaults
    const initial: Record<string, number> = {};
    inputs?.forEach(input => {
      initial[input.name] = input.default || 0;
    });
    setValues(initial);
    setResults({});
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              {t.targetGoal}
            </label>
            <input
              type="number"
              min="100000"
              step="100000"
              value={inputs.targetGoal}
              onChange={(e) => setInputs({...inputs, targetGoal: Number(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              {t.years}
            </label>
            <input
              type="number"
              min="1"
              step="0.5"
              value={inputs.years}
              onChange={(e) => setInputs({...inputs, years: Number(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              {t.expectedReturn}
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={inputs.expectedReturn}
              onChange={(e) => setInputs({...inputs, expectedReturn: Number(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              {t.inflationRate}
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={inputs.inflationRate}
              onChange={(e) => setInputs({...inputs, inflationRate: Number(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={calculateGoal}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {t.calculate}
          </button>
          <button
            onClick={resetCalculator}
            className="w-full bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
          >
            {t.reset}
          </button>
        </div>

        <div className="space-y-4">
          {results.inflationAdjustedGoal > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="text-center border-b border-blue-200 dark:border-blue-700 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.inflationAdjustedGoal}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t.rupee} {results.inflationAdjustedGoal.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                  </p>
                </div>
                <div className="text-center border-b border-blue-200 dark:border-blue-700 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.monthlySIP}</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {t.rupee} {results.monthlySIP.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.lumpsumNeeded}</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {t.rupee} {results.lumpsumNeeded.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
