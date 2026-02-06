'use client';

import { useState } from 'react';

interface MutualFundInflationCalculatorProps {
  lang?: string;
}

export default function MutualFundInflationCalculator({ lang = 'en' }: MutualFundInflationCalculatorProps) {
  const [inputs, setInputs] = useState({
    initialInvestment: 100000,
    nominalReturnPercent: 12,
    inflationRate: 6,
    years: 10
  });

  const [results, setResults] = useState({
    realReturn: 0,
    nominalValue: 0,
    realValue: 0,
    purchasingPowerLoss: 0
  });

  const translations = {
    en: {
      title: 'Mutual Fund Returns with Inflation Calculator',
      initialInvestment: 'Initial Investment (₹)',
      nominalReturn: 'Nominal Return (%)',
      inflationRate: 'Inflation Rate (%)',
      years: 'Investment Period (Years)',
      calculate: 'Calculate Real Returns',
      realReturn: 'Real Return (%)',
      nominalValue: 'Nominal Value',
      realValue: 'Real Value (Today\'s Rupees)',
      purchasingPowerLoss: 'Purchasing Power Loss',
      rupee: '₹'
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateInflationAdjusted = () => {
    const nominal = inputs.nominalReturnPercent / 100;
    const inflation = inputs.inflationRate / 100;
    
    // Real return formula: (1 + nominal) / (1 + inflation) - 1
    const realReturnPercent = ((1 + nominal) / (1 + inflation) - 1) * 100;
    
    // Calculate final values
    const nominalFinalValue = inputs.initialInvestment * Math.pow(1 + nominal, inputs.years);
    const realFinalValue = inputs.initialInvestment * Math.pow(1 + realReturnPercent / 100, inputs.years);
    const purchasingPowerLoss = nominalFinalValue - realFinalValue;

    setResults({
      realReturn: realReturnPercent,
      nominalValue: nominalFinalValue,
      realValue: realFinalValue,
      purchasingPowerLoss: purchasingPowerLoss
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            {t.initialInvestment}
          </label>
          <input
            type="number"
            min="1000"
            step="1000"
            value={inputs.initialInvestment}
            onChange={(e) => setInputs({...inputs, initialInvestment: Number(e.target.value)})}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            {t.nominalReturn}
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={inputs.nominalReturnPercent}
            onChange={(e) => setInputs({...inputs, nominalReturnPercent: Number(e.target.value)})}
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

        <button
          onClick={calculateInflationAdjusted}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {t.calculate}
        </button>

        {results.realValue > 0 && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900 p-6 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.realReturn}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {results.realReturn.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.nominalValue}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.rupee} {results.nominalValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                </p>
              </div>
            </div>
            <div className="border-t border-blue-200 dark:border-blue-700 pt-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.realValue}</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {t.rupee} {results.realValue.toLocaleString('en-IN', {maximumFractionDigits: 0})}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
