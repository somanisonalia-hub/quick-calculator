'use client';

import { useState } from 'react';

interface LumpsumInvestmentCalculatorProps {
  lang?: string;
}

export default function LumpsumInvestmentCalculator({ lang = 'en' }: LumpsumInvestmentCalculatorProps) {
  const [inputs, setInputs] = useState({
    lumpsumAmount: 100000,
    years: 10,
    annualReturn: 10
  });

  const [results, setResults] = useState({
    initialInvestment: 0,
    totalReturns: 0,
    finalAmount: 0
  });

  const translations = {
    en: {
      title: 'Lumpsum Investment Calculator',
      lumpsumAmount: 'Lumpsum Investment Amount (₹)',
      years: 'Investment Period (Years)',
      annualReturn: 'Expected Annual Return (%)',
      calculate: 'Calculate Returns',
      initialInvestment: 'Initial Investment',
      totalReturns: 'Expected Returns',
      finalAmount: 'Final Maturity Value',
      rupee: '₹'
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateLumpsum = () => {
    const principal = inputs.lumpsumAmount;
    const rate = inputs.annualReturn / 100;
    const time = inputs.years;

    const futureValue = principal * Math.pow(1 + rate, time);
    const totalGain = futureValue - principal;

    setResults({
      initialInvestment: principal,
      totalReturns: totalGain,
      finalAmount: futureValue
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            {t.lumpsumAmount}
          </label>
          <input
            type="number"
            min="1000"
            step="1000"
            value={inputs.lumpsumAmount}
            onChange={(e) => setInputs({...inputs, lumpsumAmount: Number(e.target.value)})}
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
            {t.annualReturn}
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={inputs.annualReturn}
            onChange={(e) => setInputs({...inputs, annualReturn: Number(e.target.value)})}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={calculateLumpsum}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {t.calculate}
        </button>

        {results.finalAmount > 0 && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.initialInvestment}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.rupee} {results.initialInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.totalReturns}</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {t.rupee} {results.totalReturns.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.finalAmount}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {t.rupee} {results.finalAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
