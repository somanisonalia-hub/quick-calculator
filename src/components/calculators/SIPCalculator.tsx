'use client';

import { useState } from 'react';

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
      rupee: '₹'
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
      rupee: '₹'
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
      rupee: '₹'
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
      rupee: '₹'
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
      rupee: '₹'
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
      rupee: '₹'
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

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <div className="space-y-6">
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {t.calculate}
        </button>

        {results.finalAmount > 0 && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{t.totalInvestment}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.rupee} {results.totalInvestment.toLocaleString('en-IN', {maximumFractionDigits: 0})}
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
