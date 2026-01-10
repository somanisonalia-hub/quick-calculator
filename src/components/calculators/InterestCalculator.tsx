'use client';

import { useState, useEffect } from 'react';

interface InterestCalculatorProps {
  lang?: string;
}

export default function InterestCalculator({ lang = 'en' }: InterestCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'simple' | 'compound'>('simple');
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(1);
  const [compoundingFrequency, setCompoundingFrequency] = useState(12); // Monthly by default
  const [results, setResults] = useState<any>({});

  const translations = {
    en: {
      title: "Interest Calculator",
      description: "Calculate simple and compound interest on investments and loans",
      calculationType: "Calculation Type",
      simple: "Simple Interest",
      compound: "Compound Interest",
      principal: "Principal Amount ($)",
      interestRate: "Interest Rate (%)",
      timePeriod: "Time Period (years)",
      compoundingFrequency: "Compounding Frequency",
      annually: "Annually",
      quarterly: "Quarterly",
      monthly: "Monthly",
      daily: "Daily",
      calculate: "Calculate Interest",
      results: "Results",
      interestEarned: "Interest Earned",
      futureValue: "Future Value",
      annualEquivalent: "Annual Equivalent Rate",
      calculationBreakdown: "Calculation Breakdown",
      simpleFormula: "Simple Interest = Principal × Rate × Time",
      compoundFormula: "Compound Interest = Principal × (1 + Rate/Compounding)⁽ᶜᵒᵐᵖᵒᵘⁿᵈⁱⁿᵍ×ᵀⁱᵐᵉ⁾ - Principal"
    },
    es: {
      title: "Calculadora de Intereses",
      description: "Calcula interés simple y compuesto en inversiones y préstamos",
      calculationType: "Tipo de Cálculo",
      simple: "Interés Simple",
      compound: "Interés Compuesto",
      principal: "Monto Principal ($)",
      interestRate: "Tasa de Interés (%)",
      timePeriod: "Período de Tiempo (años)",
      compoundingFrequency: "Frecuencia de Capitalización",
      annually: "Anualmente",
      quarterly: "Trimestralmente",
      monthly: "Mensualmente",
      daily: "Diariamente",
      calculate: "Calcular Interés",
      results: "Resultados",
      interestEarned: "Interés Ganado",
      futureValue: "Valor Futuro",
      annualEquivalent: "Tasa Equivalente Anual",
      calculationBreakdown: "Desglose de Cálculo",
      simpleFormula: "Interés Simple = Principal × Tasa × Tiempo",
      compoundFormula: "Interés Compuesto = Principal × (1 + Tasa/Capitalización)⁽ᶜᵃᵖⁱᵗᵃˡⁱᶻᵃᶜⁱᵒⁿ×ᵀⁱᵉᵐᵖᵒ⁾ - Principal"
    },
    pt: {
      title: "Calculadora de Juros",
      description: "Calcule juros simples e compostos em investimentos e empréstimos",
      calculationType: "Tipo de Cálculo",
      simple: "Juros Simples",
      compound: "Juros Compostos",
      principal: "Valor Principal (R$)",
      interestRate: "Taxa de Juros (%)",
      timePeriod: "Período de Tempo (anos)",
      compoundingFrequency: "Frequência de Capitalização",
      annually: "Anualmente",
      quarterly: "Trimestralmente",
      monthly: "Mensualmente",
      daily: "Diariamente",
      calculate: "Calcular Juros",
      results: "Resultados",
      interestEarned: "Juros Ganhos",
      futureValue: "Valor Futuro",
      annualEquivalent: "Taxa Equivalente Anual",
      calculationBreakdown: "Detalhamento do Cálculo",
      simpleFormula: "Juros Simples = Principal × Taxa × Tempo",
      compoundFormula: "Juros Compostos = Principal × (1 + Taxa/Capitalização)⁽ᶜᵃᵖⁱᵗᵃˡⁱᶻᵃᶜⁱᵒⁿ×ᵀⁱᵉᵐᵖᵒ⁾ - Principal"
    },
    fr: {
      title: "Calculateur d'Intérêts",
      description: "Calculez intérêts simples et composés sur investissements et prêts",
      calculationType: "Type de Calcul",
      simple: "Intérêts Simples",
      compound: "Intérêts Composés",
      principal: "Montant Principal (€)",
      interestRate: "Taux d'Intérêt (%)",
      timePeriod: "Période de Temps (années)",
      compoundingFrequency: "Fréquence de Capitalisation",
      annually: "Annuellement",
      quarterly: "Trimestriellement",
      monthly: "Mensuellement",
      daily: "Quotidiennement",
      calculate: "Calculer les Intérêts",
      results: "Résultats",
      interestEarned: "Intérêts Gagnés",
      futureValue: "Valeur Future",
      annualEquivalent: "Taux Équivalent Annuel",
      calculationBreakdown: "Décomposition du Calcul",
      simpleFormula: "Intérêts Simples = Principal × Taux × Temps",
      compoundFormula: "Intérêts Composés = Principal × (1 + Taux/Capitalisation)⁽ᶜᵃᵖⁱᵗᵃˡⁱᶻᵃᶜⁱᵒⁿ×ᵀⁱᵉᵐᵖᵒ⁾ - Principal"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateInterest = () => {
    const principalAmount = principal;
    const annualRate = rate / 100;
    const timeYears = time;

    let interestEarned = 0;
    let futureValue = principalAmount;
    let annualEquivalentRate = annualRate;

    if (calculationType === 'simple') {
      // Simple Interest: I = P * r * t
      interestEarned = principalAmount * annualRate * timeYears;
      futureValue = principalAmount + interestEarned;
    } else {
      // Compound Interest: A = P * (1 + r/n)^(n*t)
      const compoundingPeriods = compoundingFrequency * timeYears;
      const periodicRate = annualRate / compoundingFrequency;

      futureValue = principalAmount * Math.pow(1 + periodicRate, compoundingPeriods);
      interestEarned = futureValue - principalAmount;

      // Calculate effective annual rate
      annualEquivalentRate = Math.pow(1 + periodicRate, compoundingFrequency) - 1;
    }

    setResults({
      interestEarned,
      futureValue,
      annualEquivalentRate: annualEquivalentRate * 100,
      principal: principalAmount,
      calculationType,
      compoundingFrequency: calculationType === 'compound' ? compoundingFrequency : null
    });
  };

  useEffect(() => {
    calculateInterest();
  }, [principal, rate, time, calculationType, compoundingFrequency]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: lang === 'pt' ? 'BRL' : lang === 'es' ? 'USD' : lang === 'fr' ? 'EUR' : 'USD'
    }).format(amount);
  };

  const getCompoundingFrequencyLabel = (freq: number) => {
    switch (freq) {
      case 1: return t.annually;
      case 4: return t.quarterly;
      case 12: return t.monthly;
      case 365: return t.daily;
      default: return `${freq}x ${t.annually.toLowerCase()}`;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Calculation Settings</h2>

            <div className="space-y-4">
              {/* Calculation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.calculationType}
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="simple"
                      checked={calculationType === 'simple'}
                      onChange={(e) => setCalculationType(e.target.value as 'simple' | 'compound')}
                      className="mr-2"
                    />
                    {t.simple}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="compound"
                      checked={calculationType === 'compound'}
                      onChange={(e) => setCalculationType(e.target.value as 'simple' | 'compound')}
                      className="mr-2"
                    />
                    {t.compound}
                  </label>
                </div>
              </div>

              {/* Principal Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.principal}
                </label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="100"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.interestRate}
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="30"
                  step="0.1"
                />
              </div>

              {/* Time Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.timePeriod}
                </label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0.1"
                  max="50"
                  step="0.1"
                />
              </div>

              {/* Compounding Frequency (only for compound interest) */}
              {calculationType === 'compound' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.compoundingFrequency}
                  </label>
                  <select
                    value={compoundingFrequency}
                    onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>{t.annually}</option>
                    <option value={4}>{t.quarterly}</option>
                    <option value={12}>{t.monthly}</option>
                    <option value={365}>{t.daily}</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Auto-calculation note */}
        <div className="pt-2 text-xs text-blue-600 text-center font-medium">
          📊 Calculations update automatically as you change values
        </div>

        {/* Recalculate Button */}
        <div className="pt-3">
          <button
            onClick={() => {
              // Force recalculation (though auto-calc handles this)
              calculateInterest();
            }}
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
          >
            🔄 Recalculate
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {Object.keys(results).length > 0 && (
            <>
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t.results}</h2>

                <div className="space-y-4">
                  {/* Interest Earned */}
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-800">{t.interestEarned}</span>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(results.interestEarned)}
                    </span>
                  </div>

                  {/* Future Value */}
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-800">{t.futureValue}</span>
                    <span className="text-lg font-bold text-blue-600">
                      {formatCurrency(results.futureValue)}
                    </span>
                  </div>

                  {/* Annual Equivalent Rate (for compound interest) */}
                  {calculationType === 'compound' && (
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium text-purple-800">{t.annualEquivalent}</span>
                      <span className="text-lg font-bold text-purple-600">
                        {results.annualEquivalentRate.toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Calculation Breakdown */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.calculationBreakdown}</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal:</span>
                    <span className="font-medium">{formatCurrency(results.principal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate:</span>
                    <span className="font-medium">{rate}% per year</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{time} years</span>
                  </div>

                  {calculationType === 'compound' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Compounding:</span>
                      <span className="font-medium">{getCompoundingFrequencyLabel(compoundingFrequency)}</span>
                    </div>
                  )}

                  <hr className="border-gray-300" />

                  <div className="text-xs text-gray-600 mt-3">
                    <div className="font-medium mb-1">Formula:</div>
                    <div className="font-mono text-xs">
                      {calculationType === 'simple' ? t.simpleFormula : t.compoundFormula}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}