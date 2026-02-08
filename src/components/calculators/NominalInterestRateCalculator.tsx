'use client';

import { useState, useEffect } from 'react';

interface NominalInterestRateCalculatorProps {
  lang?: string;
}

export default function NominalInterestRateCalculator({ lang = 'en' }: NominalInterestRateCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Nominal Interest Rate Calculator",
      description: "Calculate nominal interest rates and convert between nominal and effective rates",
      effectiveRate: "Effective Annual Rate (%)",
      compoundingFrequency: "Compounding Frequency",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      nominalRate: "Nominal Interest Rate",
      effectiveRateDisplay: "Effective Rate (Input)",
      difference: "Difference",
      compoundingExplanation: "Compounding Explanation",
      rateComparison: "Rate Comparison",
      enterEffectiveRate: "Enter effective rate and compounding frequency above",
      annually: "Annually",
      semiAnnually: "Semi-Annually",
      quarterly: "Quarterly",
      monthly: "Monthly",
      semiMonthly: "Semi-Monthly",
      biWeekly: "Bi-Weekly",
      weekly: "Weekly",
      daily: "Daily",
      understandingNominalVsEffective: "Understanding Nominal vs Effective Rates",
      nominalRateDesc: "Nominal Rate: Stated rate, what you see advertised",
      effectiveRateDesc: "Effective Rate: True rate including compounding effects",
      moreCompounding: "More compounding = Lower nominal rate needed",
      alwaysCompare: "Always compare effective rates for accuracy"
    },
    es: {
      title: "Calculadora de Tasa de Interés Nominal",
      description: "Calcula tasas de interés nominales y convierte entre nominales y efectivas",
      effectiveRate: "Tasa Anual Efectiva (%)",
      compoundingFrequency: "Frecuencia de Capitalización",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      nominalRate: "Tasa de Interés Nominal",
      effectiveRateDisplay: "Tasa Efectiva (Entrada)",
      difference: "Diferencia",
      compoundingExplanation: "Explicación Capitalización",
      rateComparison: "Comparación Tasas",
      enterEffectiveRate: "Ingresa tasa efectiva y frecuencia de capitalización arriba",
      annually: "Anual",
      semiAnnually: "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensual",
      semiMonthly: "Semi-Mensual",
      biWeekly: "Quincenal",
      weekly: "Semanal",
      daily: "Diaria",
      understandingNominalVsEffective: "Entendiendo Tasas Nominales vs Efectivas",
      nominalRateDesc: "Tasa Nominal: Tasa declarada, lo que se anuncia",
      effectiveRateDesc: "Tasa Efectiva: Tasa real incluyendo efectos de capitalización",
      moreCompounding: "Más capitalización = Se necesita tasa nominal más baja",
      alwaysCompare: "Siempre compare tasas efectivas para precisión"
    },
    pt: {
      title: "Calculadora de Taxa de Juros Nominal",
      description: "Calcule taxas de juros nominais e converta entre nominais e efetivas",
      effectiveRate: "Taxa Anual Efetiva (%)",
      compoundingFrequency: "Frequência de Capitalização",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      nominalRate: "Taxa de Juros Nominal",
      effectiveRateDisplay: "Taxa Efetiva (Entrada)",
      difference: "Diferença",
      compoundingExplanation: "Explicação Capitalização",
      rateComparison: "Comparação Taxas",
      enterEffectiveRate: "Digite taxa efetiva e frequência de capitalização acima",
      annually: "Anual",
      semiAnnually: "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensal",
      semiMonthly: "Semi-Mensal",
      biWeekly: "Quinzenal",
      weekly: "Semanal",
      daily: "Diária",
      understandingNominalVsEffective: "Entendendo Taxas Nominais vs Efetivas",
      nominalRateDesc: "Taxa Nominal: Taxa declarada, o que é anunciado",
      effectiveRateDesc: "Taxa Efetiva: Taxa real incluindo efeitos de capitalização",
      moreCompounding: "Mais capitalização = Taxa nominal mais baixa necessária",
      alwaysCompare: "Sempre compare taxas efetivas para precisão"
    },
    fr: {
      title: "Calculateur de Taux d'Intérêt Nominal",
      description: "Calculez taux d'intérêt nominaux et convertissez entre nominaux et effectifs",
      effectiveRate: "Taux Annuel Effectif (%)",
      compoundingFrequency: "Fréquence de Capitalisation",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      nominalRate: "Taux d'Intérêt Nominal",
      effectiveRateDisplay: "Taux Effectif (Entrée)",
      difference: "Différence",
      compoundingExplanation: "Explication Capitalisation",
      rateComparison: "Comparaison Taux",
      enterEffectiveRate: "Entrez taux effectif et fréquence de capitalisation ci-dessus",
      annually: "Annuel",
      semiAnnually: "Semi-Annuel",
      quarterly: "Trimestriel",
      monthly: "Mensuel",
      semiMonthly: "Semi-Mensuel",
      biWeekly: "Bi-Hebdomadaire",
      weekly: "Hebdomadaire",
      daily: "Quotidien",
      understandingNominalVsEffective: "Comprendre les Taux Nominaux vs Effectifs",
      nominalRateDesc: "Taux Nominal: Taux déclaré, ce qui est annoncé",
      effectiveRateDesc: "Taux Effectif: Taux réel incluant les effets de capitalisation",
      moreCompounding: "Plus de capitalisation = Taux nominal plus bas nécessaire",
      alwaysCompare: "Toujours comparer les taux effectifs pour la précision"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [effectiveRate, setEffectiveRate] = useState(5.12);
  const [compoundingFrequency, setCompoundingFrequency] = useState(12);
  const [results, setResults] = useState<any>({});

  const calculateNominalRate = () => {
    if (effectiveRate < 0 || compoundingFrequency <= 0) {
      setResults({});
      return;
    }

    const ear = effectiveRate / 100; // Convert percentage to decimal
    const n = compoundingFrequency;

    // Nominal Rate = n × ((1 + EAR)^(1/n) - 1)
    const nominalRate = n * (Math.pow(1 + ear, 1 / n) - 1);
    const nominalRatePercentage = nominalRate * 100;

    // Calculate difference
    const difference = nominalRatePercentage - effectiveRate;

    // Create explanation
    const frequencyName = n === 12 ? t.monthly : n === 4 ? t.quarterly : n === 2 ? t.semiAnnually : n === 1 ? t.annually : `${n} times per year`;
    const explanation = `${frequencyName} compounding requires ${(nominalRatePercentage).toFixed(2)}% nominal rate to achieve ${effectiveRate.toFixed(2)}% effective rate`;

    // Rate comparison
    const percentageDiff = ((nominalRatePercentage - effectiveRate) / effectiveRate) * 100;
    const comparison = `Nominal: ${nominalRatePercentage.toFixed(2)}% vs Effective: ${effectiveRate.toFixed(2)}% (${Math.abs(percentageDiff).toFixed(1)}% ${percentageDiff >= 0 ? 'lower' : 'higher'})`;

    setResults({
      nominalRate: nominalRatePercentage.toFixed(2),
      effectiveRateDisplay: effectiveRate.toFixed(2),
      rateDifference: difference.toFixed(2),
      compoundingExplanation: explanation,
      rateComparison: comparison
    });
  };

  const resetCalculator = () => {
    setEffectiveRate(5.12);
    setCompoundingFrequency(12);
    setResults({});
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateNominalRate();
  }, [effectiveRate, compoundingFrequency]);

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.effectiveRate}</label>
              <input
                type="number"
                value={effectiveRate}
                onChange={(e) => setEffectiveRate(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.01"
                min="0"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.compoundingFrequency}</label>
              <select
                value={compoundingFrequency}
                onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>{t.annually}</option>
                <option value={2}>{t.semiAnnually}</option>
                <option value={4}>{t.quarterly}</option>
                <option value={12}>{t.monthly}</option>
                <option value={24}>{t.semiMonthly}</option>
                <option value={26}>{t.biWeekly}</option>
                <option value={52}>{t.weekly}</option>
                <option value={365}>{t.daily}</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateNominalRate}
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
            <h4 className="text-sm font-semibold text-purple-900 mb-2">Nominal Rate Formula</h4>
            <div className="text-xs text-purple-700 font-mono">
              Nominal Rate = n × ((1 + EAR)^(1/n) - 1)
            </div>
            <div className="text-xs text-purple-600 mt-1">
              Where: EAR = effective annual rate, n = compounding periods
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              {/* Main Result */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-700 font-medium mb-2">{t.nominalRate}</div>
                <div className="text-4xl font-bold text-purple-800">
                  {results.nominalRate}%
                </div>
                <div className="text-xs text-purple-600 mt-2">
                  Stated annual rate without compounding
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.effectiveRateDisplay}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {results.effectiveRateDisplay}%
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.difference}</div>
                  <div className={`text-lg font-bold ${parseFloat(results.rateDifference) >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {parseFloat(results.rateDifference) >= 0 ? '+' : ''}{results.rateDifference}%
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 col-span-2">
                  <div className="text-sm text-gray-600 mb-1">{t.compoundingExplanation}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {results.compoundingExplanation}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 col-span-2">
                  <div className="text-sm text-gray-600 mb-1">{t.rateComparison}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {results.rateComparison}
                  </div>
                </div>
              </div>

              {/* Educational Info */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.understandingNominalVsEffective}</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div>{t.nominalRateDesc}</div>
                  <div>{t.effectiveRateDesc}</div>
                  <div>{t.moreCompounding}</div>
                  <div>{t.alwaysCompare}</div>
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
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.enterEffectiveRate}</h3>
              <p className="text-gray-500">Enter your effective annual rate and select compounding frequency above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
