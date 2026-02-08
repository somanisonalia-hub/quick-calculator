'use client';

import { useState } from 'react';

interface XIRRVsAbsoluteReturnCalculatorProps {
  lang?: string;
}

export default function XIRRVsAbsoluteReturnCalculator({ lang = 'en' }: XIRRVsAbsoluteReturnCalculatorProps) {
  const [inputs, setInputs] = useState({
    totalInvested: 100000,
    finalValue: 150000,
    years: 5
  });

  const [results, setResults] = useState({
    absoluteReturn: 0,
    cagr: 0,
    totalProfit: 0
  });

  const translations = {
    en: {
      title: 'XIRR vs Absolute Return Calculator',
      totalInvested: 'Total Amount Invested (₹)',
      finalValue: 'Final Portfolio Value (₹)',
      years: 'Investment Period (Years)',
      calculate: 'Calculate Returns',
      absoluteReturn: 'Absolute Return (%)',
      cagr: 'CAGR/XIRR (%)',
      totalProfit: 'Total Profit',
      rupee: '₹',
      reset: "Reset"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateReturns = () => {
    const totalProfit = inputs.finalValue - inputs.totalInvested;
    const absoluteReturnPercent = (totalProfit / inputs.totalInvested) * 100;
    const cagr = (Math.pow(inputs.finalValue / inputs.totalInvested, 1 / inputs.years) - 1) * 100;

    setResults({
      totalProfit: totalProfit,
      absoluteReturn: absoluteReturnPercent,
      cagr: cagr
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
              {t.totalInvested}
            </label>
            <input
              type="number"
              min="1000"
              step="1000"
              value={inputs.totalInvested}
              onChange={(e) => setInputs({...inputs, totalInvested: Number(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              {t.finalValue}
            </label>
            <input
              type="number"
              min="1000"
              step="1000"
              value={inputs.finalValue}
              onChange={(e) => setInputs({...inputs, finalValue: Number(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              {t.years}
            </label>
            <input
              type="number"
              min="0.1"
              step="0.5"
              value={inputs.years}
              onChange={(e) => setInputs({...inputs, years: Number(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={calculateReturns}
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
          {results.totalProfit !== 0 && (
            <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="text-center border-b border-blue-200 dark:border-blue-700 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.totalProfit}</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {t.rupee} {results.totalProfit.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                  </p>
                </div>
                <div className="text-center border-b border-blue-200 dark:border-blue-700 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.absoluteReturn}</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {results.absoluteReturn.toFixed(2)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.cagr}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {results.cagr.toFixed(2)}%
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
