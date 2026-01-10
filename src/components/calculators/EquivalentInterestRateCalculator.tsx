'use client';

import { useState, useEffect } from 'react';

interface EquivalentInterestRateCalculatorProps {
  lang?: string;
}

export default function EquivalentInterestRateCalculator({ lang = 'en' }: EquivalentInterestRateCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Equivalent Interest Rate Calculator",
      description: "Calculate equivalent interest rates across different compounding frequencies",
      knownRate: "Known Interest Rate (%)",
      knownFrequency: "Known Rate Compounding Frequency",
      targetFrequency: "Target Compounding Frequency",
      calculate: "Calculate",
      reset: "Reset",
      equivalentRate: "Equivalent Interest Rate",
      knownRateDetails: "Known Rate Details",
      equivalentRateDetails: "Equivalent Rate Details",
      rateDifference: "Rate Difference",
      economicEquivalence: "Economic Equivalence",
      enterRateDetails: "Enter rate and frequencies above to calculate equivalence",
      annual: "Annual",
      "semi-annual": "Semi-Annual",
      quarterly: "Quarterly",
      monthly: "Monthly",
      "semi-monthly": "Semi-Monthly",
      "bi-weekly": "Bi-Weekly",
      weekly: "Weekly",
      daily: "Daily"
    },
    es: {
      title: "Calculadora de Tasa de Interés Equivalente",
      description: "Calcula tasas de interés equivalentes entre diferentes frecuencias de capitalización",
      knownRate: "Tasa de Interés Conocida (%)",
      knownFrequency: "Frecuencia Capitalización Tasa Conocida",
      targetFrequency: "Frecuencia Capitalización Objetivo",
      calculate: "Calcular",
      reset: "Reiniciar",
      equivalentRate: "Tasa de Interés Equivalente",
      knownRateDetails: "Detalles Tasa Conocida",
      equivalentRateDetails: "Detalles Tasa Equivalente",
      rateDifference: "Diferencia Tasa",
      economicEquivalence: "Equivalencia Económica",
      enterRateDetails: "Ingresa tasa y frecuencias arriba para calcular equivalencia",
      annual: "Anual",
      "semi-annual": "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensual",
      "semi-monthly": "Semi-Mensual",
      "bi-weekly": "Quincenal",
      weekly: "Semanal",
      daily: "Diaria"
    },
    pt: {
      title: "Calculadora de Taxa de Juros Equivalente",
      description: "Calcule taxas de juros equivalentes entre diferentes frequências de capitalização",
      knownRate: "Taxa de Juros Conhecida (%)",
      knownFrequency: "Frequência Capitalização Taxa Conhecida",
      targetFrequency: "Frequência Capitalização Alvo",
      calculate: "Calcular",
      reset: "Reiniciar",
      equivalentRate: "Taxa de Juros Equivalente",
      knownRateDetails: "Detalhes Taxa Conhecida",
      equivalentRateDetails: "Detalhes Taxa Equivalente",
      rateDifference: "Diferença Taxa",
      economicEquivalence: "Equivalência Econômica",
      enterRateDetails: "Digite taxa e frequências acima para calcular equivalência",
      annual: "Anual",
      "semi-annual": "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensal",
      "semi-monthly": "Semi-Mensal",
      "bi-weekly": "Quinzenal",
      weekly: "Semanal",
      daily: "Diária"
    },
    fr: {
      title: "Calculateur de Taux d'Intérêt Équivalent",
      description: "Calculez taux d'intérêt équivalents entre différentes fréquences de capitalisation",
      knownRate: "Taux d'Intérêt Connu (%)",
      knownFrequency: "Fréquence Capitalisation Taux Connu",
      targetFrequency: "Fréquence Capitalisation Cible",
      calculate: "Calculer",
      reset: "Réinitialiser",
      equivalentRate: "Taux d'Intérêt Équivalent",
      knownRateDetails: "Détails Taux Connu",
      equivalentRateDetails: "Détails Taux Équivalent",
      rateDifference: "Différence Taux",
      economicEquivalence: "Équivalence Économique",
      enterRateDetails: "Entrez taux et fréquences ci-dessus pour calculer équivalence",
      annual: "Annuel",
      "semi-annual": "Semi-Annuel",
      quarterly: "Trimestriel",
      monthly: "Mensuel",
      "semi-monthly": "Semi-Mensuel",
      "bi-weekly": "Bi-Hebdomadaire",
      weekly: "Hebdomadaire",
      daily: "Quotidien"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [knownRate, setKnownRate] = useState(5);
  const [knownFrequency, setKnownFrequency] = useState(12);
  const [targetFrequency, setTargetFrequency] = useState(4);
  const [results, setResults] = useState<any>({});

  const calculateEquivalentRate = () => {
    if (knownRate < 0 || knownFrequency <= 0 || targetFrequency <= 0) {
      setResults({});
      return;
    }

    const r = knownRate / 100; // Convert to decimal
    const n = knownFrequency; // Known periods per year
    const m = targetFrequency; // Target periods per year

    // First, calculate the effective annual rate from the known rate
    const effectiveAnnualRate = Math.pow(1 + (r / n), n) - 1;

    // Then, find the equivalent periodic rate for the target frequency
    const equivalentPeriodicRate = (Math.pow(1 + effectiveAnnualRate, 1 / m) - 1);

    const equivalentRatePercentage = equivalentPeriodicRate * 100;
    const rateDifference = equivalentRatePercentage - knownRate;

    // Calculate the actual annual return to show equivalence
    const annualReturn = effectiveAnnualRate * 100;

    const knownFreqName = n === 12 ? t.monthly : n === 4 ? t.quarterly : n === 2 ? t["semi-annual"] : n === 1 ? t.annual : `${n} times per year`;
    const targetFreqName = m === 12 ? t.monthly : m === 4 ? t.quarterly : m === 2 ? t["semi-annual"] : m === 1 ? t.annual : `${m} times per year`;

    setResults({
      equivalentRate: equivalentRatePercentage.toFixed(2),
      knownRateDetails: `${knownRate.toFixed(2)}% compounded ${knownFreqName.toLowerCase()}`,
      equivalentRateDetails: `${equivalentRatePercentage.toFixed(2)}% compounded ${targetFreqName.toLowerCase()}`,
      rateDifference: rateDifference.toFixed(2),
      economicEquivalence: `Both rates produce the same annual return of ${annualReturn.toFixed(2)}%`
    });
  };

  const resetCalculator = () => {
    setKnownRate(5);
    setKnownFrequency(12);
    setTargetFrequency(4);
    setResults({});
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateEquivalentRate();
  }, [knownRate, knownFrequency, targetFrequency]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.knownRate}</label>
              <input
                type="number"
                value={knownRate}
                onChange={(e) => setKnownRate(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.01"
                min="0"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.knownFrequency}</label>
              <select
                value={knownFrequency}
                onChange={(e) => setKnownFrequency(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>{t.annual}</option>
                <option value={2}>{t["semi-annual"]}</option>
                <option value={4}>{t.quarterly}</option>
                <option value={12}>{t.monthly}</option>
                <option value={24}>{t["semi-monthly"]}</option>
                <option value={26}>{t["bi-weekly"]}</option>
                <option value={52}>{t.weekly}</option>
                <option value={365}>{t.daily}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.targetFrequency}</label>
              <select
                value={targetFrequency}
                onChange={(e) => setTargetFrequency(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>{t.annual}</option>
                <option value={2}>{t["semi-annual"]}</option>
                <option value={4}>{t.quarterly}</option>
                <option value={12}>{t.monthly}</option>
                <option value={24}>{t["semi-monthly"]}</option>
                <option value={26}>{t["bi-weekly"]}</option>
                <option value={52}>{t.weekly}</option>
                <option value={365}>{t.daily}</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateEquivalentRate}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.calculate}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t.reset}
            </button>
          </div>

          {/* Formula Display */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">Equivalent Rate Formula</h4>
            <div className="text-xs text-purple-700 font-mono">
              Equivalent Rate = ((1 + r/n)^(n/m) - 1) × m
            </div>
            <div className="text-xs text-purple-600 mt-1">
              Where: r = known rate, n = known periods, m = target periods
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              {/* Main Result */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-700 font-medium mb-2">{t.equivalentRate}</div>
                <div className="text-4xl font-bold text-purple-800">
                  {results.equivalentRate}%
                </div>
                <div className="text-xs text-purple-600 mt-2">
                  Equivalent rate in target compounding frequency
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.knownRateDetails}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {results.knownRateDetails}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.equivalentRateDetails}</div>
                  <div className="text-lg font-bold text-blue-600">
                    {results.equivalentRateDetails}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.rateDifference}</div>
                  <div className={`text-lg font-bold ${parseFloat(results.rateDifference) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(results.rateDifference) >= 0 ? '+' : ''}{results.rateDifference}%
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.economicEquivalence}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {results.economicEquivalence}
                  </div>
                </div>
              </div>

              {/* Educational Info */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">Understanding Rate Equivalence</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div><strong>Same economic return:</strong> Different rates, same final amount</div>
                  <div><strong>Compounding effect:</strong> More frequent = lower equivalent rates</div>
                  <div><strong>Effective comparison:</strong> Use equivalent rates for accuracy</div>
                  <div><strong>Annual equivalence:</strong> Both rates produce same annual yield</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.enterRateDetails}</h3>
              <p className="text-gray-500">Enter your known rate and select both compounding frequencies above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
