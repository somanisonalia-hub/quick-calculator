'use client';

import { useState, useEffect } from 'react';

interface EARCalculatorProps {
  lang?: string;
}

export default function EARCalculator({ lang = 'en' }: EARCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Effective Annual Rate Calculator",
      description: "Calculate Effective Annual Rate (EAR) showing the true annual interest rate with compounding",
      nominalRate: "Nominal Interest Rate (%)",
      compoundingFrequency: "Compounding Frequency",
      calculateEAR: "🔄 Recalculate",
      reset: "Reset",
      ear: "Effective Annual Rate (EAR)",
      nominalRateDisplay: "Nominal Rate",
      difference: "Difference",
      compoundingEffect: "Compounding Effect",
      frequencyComparison: "Frequency Comparison",
      enterNominalRate: "Enter nominal rate and compounding frequency above",
      annually: "Annually",
      semiAnnually: "Semi-Annually",
      quarterly: "Quarterly",
      monthly: "Monthly",
      semiMonthly: "Semi-Monthly",
      biWeekly: "Bi-Weekly",
      weekly: "Weekly",
      daily: "Daily",
      understandingEAR: "Understanding EAR",
      earShowsCost: "EAR shows the true annual cost of borrowing or return on investment",
      moreFrequentCompounding: "More frequent compounding = Higher effective rates",
      nominalRateDesc: "Nominal rate is the stated rate without compounding",
      useEAR: "Use EAR to compare different compounding frequencies"
    },
    es: {
      title: "Calculadora de Tasa Anual Efectiva",
      description: "Calcula Tasa Anual Efectiva (TAE) mostrando la tasa de interés anual real con capitalización",
      nominalRate: "Tasa de Interés Nominal (%)",
      compoundingFrequency: "Frecuencia de Capitalización",
      calculateEAR: "🔄 Recalcular",
      reset: "Reiniciar",
      ear: "Tasa Anual Efectiva (TAE)",
      nominalRateDisplay: "Tasa Nominal",
      difference: "Diferencia",
      compoundingEffect: "Efecto Capitalización",
      frequencyComparison: "Comparación Frecuencia",
      enterNominalRate: "Ingresa tasa nominal y frecuencia de capitalización arriba",
      annually: "Anual",
      semiAnnually: "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensual",
      semiMonthly: "Semi-Mensual",
      biWeekly: "Quincenal",
      weekly: "Semanal",
      daily: "Diaria",
      understandingEAR: "Entendiendo la TAE",
      earShowsCost: "TAE muestra el costo anual real del préstamo o retorno de inversión",
      moreFrequentCompounding: "Capitalización más frecuente = Tasas efectivas más altas",
      nominalRateDesc: "Tasa nominal es la tasa declarada sin capitalización",
      useEAR: "Use TAE para comparar diferentes frecuencias de capitalización"
    },
    pt: {
      title: "Calculadora de Taxa Efetiva Anual",
      description: "Calcule Taxa Efetiva Anual (TEA) mostrando a taxa de juros anual real com capitalização",
      nominalRate: "Taxa de Juros Nominal (%)",
      compoundingFrequency: "Frequência de Capitalização",
      calculateEAR: "🔄 Recalcular",
      reset: "Reiniciar",
      ear: "Taxa Efetiva Anual (TEA)",
      nominalRateDisplay: "Taxa Nominal",
      difference: "Diferença",
      compoundingEffect: "Efeito Capitalização",
      frequencyComparison: "Comparação Frequência",
      enterNominalRate: "Digite taxa nominal e frequência de capitalização acima",
      annually: "Anual",
      semiAnnually: "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensal",
      semiMonthly: "Semi-Mensal",
      biWeekly: "Quinzenal",
      weekly: "Semanal",
      daily: "Diária",
      understandingEAR: "Entendendo a TEA",
      earShowsCost: "TEA mostra o custo anual real do empréstimo ou retorno do investimento",
      moreFrequentCompounding: "Capitalização mais frequente = Taxas efetivas mais altas",
      nominalRateDesc: "Taxa nominal é a taxa declarada sem capitalização",
      useEAR: "Use TEA para comparar diferentes frequências de capitalização"
    },
    fr: {
      title: "Calculateur de Taux Effectif Annuel",
      description: "Calculez Taux Effectif Annuel (TEA) montrant taux d'intérêt annuel réel avec capitalisation",
      nominalRate: "Taux d'Intérêt Nominal (%)",
      compoundingFrequency: "Fréquence de Capitalisation",
      calculateEAR: "🔄 Recalculer",
      reset: "Réinitialiser",
      ear: "Taux Effectif Annuel (TEA)",
      nominalRateDisplay: "Taux Nominal",
      difference: "Différence",
      compoundingEffect: "Effet Capitalisation",
      frequencyComparison: "Comparaison Fréquence",
      enterNominalRate: "Entrez taux nominal et fréquence de capitalisation ci-dessus",
      annually: "Annuel",
      semiAnnually: "Semi-Annuel",
      quarterly: "Trimestriel",
      monthly: "Mensuel",
      semiMonthly: "Semi-Mensuel",
      biWeekly: "Bi-Hebdomadaire",
      weekly: "Hebdomadaire",
      daily: "Quotidien",
      understandingEAR: "Comprendre le TEA",
      earShowsCost: "Le TEA montre le coût annuel réel de l'emprunt ou le retour sur investissement",
      moreFrequentCompounding: "Capitalisation plus fréquente = Taux effectifs plus élevés",
      nominalRateDesc: "Le taux nominal est le taux déclaré sans capitalisation",
      useEAR: "Utilisez le TEA pour comparer différentes fréquences de capitalisation"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [nominalRate, setNominalRate] = useState(5);
  const [compoundingFrequency, setCompoundingFrequency] = useState(12);
  const [results, setResults] = useState<any>({});

  const calculateEAR = () => {
    if (nominalRate < 0 || compoundingFrequency <= 0) {
      setResults({});
      return;
    }

    const r = nominalRate / 100; // Convert percentage to decimal
    const n = compoundingFrequency;

    // EAR = (1 + r/n)^n - 1
    const ear = Math.pow(1 + (r / n), n) - 1;
    const earPercentage = ear * 100;

    // Calculate difference from nominal rate
    const difference = earPercentage - nominalRate;

    // Create comparison with annual compounding
    const annualEAR = nominalRate; // Annual compounding = nominal rate
    const increase = ((earPercentage - annualEAR) / annualEAR) * 100;

    // Generate effect description
    const effectDescription = `${t[t.compoundingFrequency === '12' ? 'monthly' : 'quarterly']} compounding adds ${(difference).toFixed(2)}% to the effective rate`;

    // Frequency comparison
    const frequencyComp = `${t.annually}: ${nominalRate.toFixed(2)}% vs ${t[t.compoundingFrequency === '12' ? 'monthly' : 'quarterly']}: ${earPercentage.toFixed(2)}% (${increase.toFixed(1)}% increase)`;

    setResults({
      ear: earPercentage.toFixed(2),
      nominalRateDisplay: nominalRate.toFixed(2),
      difference: difference.toFixed(2),
      compoundingEffect: effectDescription,
      frequencyComparison: frequencyComp
    });
  };

  const resetCalculator = () => {
    setNominalRate(5);
    setCompoundingFrequency(12);
    setResults({});
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateEAR();
  }, [nominalRate, compoundingFrequency]);

  const getFrequencyLabel = (value: number) => {
    const labels: Record<number, string> = {
      1: t.annually,
      2: t.semiAnnually,
      4: t.quarterly,
      12: t.monthly,
      24: t.semiMonthly,
      26: t.biWeekly,
      52: t.weekly,
      365: t.daily
    };
    return labels[value] || value.toString();
  };

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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.nominalRate}</label>
              <input
                type="number"
                value={nominalRate}
                onChange={(e) => setNominalRate(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.125"
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
              onClick={calculateEAR}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.calculateEAR}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t.reset}
            </button>
          </div>

          {/* Formula Display */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">EAR Formula</h4>
            <div className="text-xs text-green-700 font-mono">
              EAR = (1 + r/n)^n - 1
            </div>
            <div className="text-xs text-green-600 mt-1">
              Where: r = nominal rate, n = compounding frequency
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              {/* Main EAR Result */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-2">{t.ear}</div>
                <div className="text-4xl font-bold text-green-800">
                  {results.ear}%
                </div>
                <div className="text-xs text-green-600 mt-2">
                  True annual rate with compounding
                </div>
              </div>

              {/* Comparison Results */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.nominalRateDisplay}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {results.nominalRateDisplay}%
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.difference}</div>
                  <div className="text-lg font-bold text-blue-600">
                    +{results.difference}%
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 col-span-2">
                  <div className="text-sm text-gray-600 mb-1">{t.compoundingEffect}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {results.compoundingEffect}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 col-span-2">
                  <div className="text-sm text-gray-600 mb-1">{t.frequencyComparison}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {results.frequencyComparison}
                  </div>
                </div>
              </div>

              {/* Educational Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">{t.understandingEAR}</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>{t.earShowsCost}</div>
                  <div>{t.moreFrequentCompounding}</div>
                  <div>{t.nominalRateDesc}</div>
                  <div>{t.useEAR}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.enterNominalRate}</h3>
              <p className="text-gray-500">Enter your nominal interest rate and select compounding frequency above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
