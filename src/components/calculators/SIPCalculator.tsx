'use client';

import { useState, useEffect } from 'react';

interface SIPCalculatorProps {
  lang?: string;
}

export default function SIPCalculator({ lang = 'en' }: SIPCalculatorProps) {
  const [inputs, setInputs] = useState({
    monthlyAmount: 5000,
    years: 10,
    annualReturn: 12
  });

  const [results, setResults] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    finalAmount: 0
  });

  const translations = {
    en: {
      title: 'SIP Calculator',
      monthlyAmount: 'Monthly SIP Amount (₹)',
      years: 'Investment Period (Years)',
      annualReturn: 'Expected Annual Return (%)',
      calculate: 'Calculate SIP Returns',
      totalInvestment: 'Total Investment',
      totalReturns: 'Expected Returns',
      finalAmount: 'Final Amount',
      rupee: '₹',
      reset: "Reset"
    },
    es: {
      title: 'Calculadora SIP',
      monthlyAmount: 'Monto SIP Mensual (₹)',
      years: 'Período de Inversión (Años)',
      annualReturn: 'Retorno Anual Esperado (%)',
      calculate: 'Calcular Retornos SIP',
      totalInvestment: 'Inversión Total',
      totalReturns: 'Retornos Esperados',
      finalAmount: 'Cantidad Final',
      rupee: '₹',
      reset: "Restablecer"
    },
    pt: {
      title: 'Calculadora SIP',
      monthlyAmount: 'Valor SIP Mensal (₹)',
      years: 'Período de Investimento (Anos)',
      annualReturn: 'Retorno Anual Esperado (%)',
      calculate: 'Calcular Retornos SIP',
      totalInvestment: 'Investimento Total',
      totalReturns: 'Retornos Esperados',
      finalAmount: 'Valor Final',
      rupee: '₹',
      reset: "Redefinir"
    },
    fr: {
      title: 'Calculateur PIA',
      monthlyAmount: 'Montant PIA Mensuel (₹)',
      years: 'Période d\'Investissement (Années)',
      annualReturn: 'Rendement Annuel Attendu (%)',
      calculate: 'Calculer les Rendements PIA',
      totalInvestment: 'Investissement Total',
      totalReturns: 'Rendements Attendus',
      finalAmount: 'Montant Final',
      rupee: '₹',
      reset: "Réinitialiser"
    },
    de: {
      title: 'SIP-Rechner',
      monthlyAmount: 'Monatlicher SIP-Betrag (₹)',
      years: 'Anlagezeitraum (Jahre)',
      annualReturn: 'Erwartete jährliche Rendite (%)',
      calculate: 'SIP-Renditen Berechnen',
      totalInvestment: 'Gesamtinvestition',
      totalReturns: 'Erwartete Rendite',
      finalAmount: 'Endbetrag',
      rupee: '₹',
      reset: "Zurücksetzen"
    },
    nl: {
      title: 'SIP-Rekenmachine',
      monthlyAmount: 'Maandelijks SIP-bedrag (₹)',
      years: 'Investeringsperiode (Jaren)',
      annualReturn: 'Verwachte Jaarlijkse Opbrengst (%)',
      calculate: 'SIP-opbrengsten Berekenen',
      totalInvestment: 'Totale Investering',
      totalReturns: 'Verwachte Opbrengsten',
      finalAmount: 'Eindbedrag',
      rupee: '₹',
      reset: "Resetten"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateSIP = () => {
    const monthlyInvestment = inputs.monthlyAmount;
    const months = inputs.years * 12;
    const monthlyRate = inputs.annualReturn / 100 / 12;

    const totalInvested = monthlyInvestment * months;
    const futureValue = monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    
    const totalGain = futureValue - totalInvested;

    setResults({
      totalInvestment: totalInvested,
      totalReturns: totalGain,
      finalAmount: futureValue
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

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateSIP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.monthlyAmount, inputs.years, inputs.annualReturn]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 sm:p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Auto-calculation indicator for mobile */}
        <div className="sm:hidden text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-blue-50 dark:bg-blue-900 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Auto-calculates as you type
          </div>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            {t.monthlyAmount}
          </label>
          <input
            type="number"
            min="100"
            step="100"
            value={inputs.monthlyAmount}
            onChange={(e) => setInputs({...inputs, monthlyAmount: Number(e.target.value)})}
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
          onClick={calculateSIP}
          className="hidden sm:block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {t.calculate}
        </button>

        {results.finalAmount > 0 && (
          <div className="mt-6 sm:mt-8 bg-blue-50 dark:bg-blue-900 p-4 sm:p-6 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.totalInvestment}</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {t.rupee} {results.totalInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.totalReturns}</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
                  {t.rupee} {results.totalReturns.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.finalAmount}</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {t.rupee} {results.finalAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                </p>
              </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
