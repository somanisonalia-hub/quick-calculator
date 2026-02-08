'use client';

import { useState, useEffect } from 'react';

interface PeriodicInterestRateCalculatorProps {
  lang?: string;
}

export default function PeriodicInterestRateCalculator({ lang = 'en' }: PeriodicInterestRateCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Periodic Interest Rate Calculator",
      description: "Calculate periodic interest rates and convert between different time periods",
      inputRate: "Input Rate (%)",
      inputPeriod: "Input Rate Period",
      outputPeriod: "Output Rate Period",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      convertedRate: "Converted Interest Rate",
      inputSummary: "Input Rate Summary",
      outputSummary: "Output Rate Summary",
      conversionFactor: "Conversion Factor",
      periodComparison: "Period Comparison",
      enterRateDetails: "Enter rate and select periods above to calculate conversion",
      annual: "Annual",
      "semi-annual": "Semi-Annual",
      quarterly: "Quarterly",
      monthly: "Monthly",
      "semi-monthly": "Semi-Monthly",
      "bi-weekly": "Bi-Weekly",
      weekly: "Weekly",
      daily: "Daily",
      conversionFormulas: "Conversion Formulas",
      toPeriodic: "To Periodic: Rate ÷ Periods per Year",
      toAnnual: "To Annual: Rate × Periods per Year",
      example: "Example: 6% annual → 0.5% monthly",
      rateConvertedTo: "Rate converted to",
      period: "period",
      understandingTimePeriods: "Understanding Time Periods",
      annualDesc: "Annual: Rate applies once per year",
      monthlyDesc: "Monthly: Rate applies 12 times per year",
      quarterlyDesc: "Quarterly: Rate applies 4 times per year",
      alwaysSpecify: "Always specify: The time period for rate comparisons"
    },
    es: {
      title: "Calculadora de Tasa de Interés Periódica",
      description: "Calcula tasas de interés periódicas y convierte entre diferentes períodos de tiempo",
      inputRate: "Tasa de Entrada (%)",
      inputPeriod: "Período Tasa Entrada",
      outputPeriod: "Período Tasa Salida",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      convertedRate: "Tasa de Interés Convertida",
      inputSummary: "Resumen Tasa Entrada",
      outputSummary: "Resumen Tasa Salida",
      conversionFactor: "Factor Conversión",
      periodComparison: "Comparación Período",
      enterRateDetails: "Ingresa tasa y selecciona períodos arriba para calcular conversión",
      annual: "Anual",
      "semi-annual": "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensual",
      "semi-monthly": "Semi-Mensual",
      "bi-weekly": "Quincenal",
      weekly: "Semanal",
      daily: "Diaria",
      conversionFormulas: "Fórmulas de Conversión",
      toPeriodic: "A Periódica: Tasa ÷ Períodos por Año",
      toAnnual: "A Anual: Tasa × Períodos por Año",
      example: "Ejemplo: 6% anual → 0.5% mensual",
      rateConvertedTo: "Tasa convertida a",
      period: "período",
      understandingTimePeriods: "Entendiendo Períodos de Tiempo",
      annualDesc: "Anual: Tasa se aplica una vez al año",
      monthlyDesc: "Mensual: Tasa se aplica 12 veces al año",
      quarterlyDesc: "Trimestral: Tasa se aplica 4 veces al año",
      alwaysSpecify: "Siempre especifique: El período de tiempo para comparaciones de tasas"
    },
    pt: {
      title: "Calculadora de Taxa de Juros Periódica",
      description: "Calcule taxas de juros periódicas e converta entre diferentes períodos de tempo",
      inputRate: "Taxa de Entrada (%)",
      inputPeriod: "Período Taxa Entrada",
      outputPeriod: "Período Taxa Saída",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      convertedRate: "Taxa de Juros Convertida",
      inputSummary: "Resumo Taxa Entrada",
      outputSummary: "Resumo Taxa Saída",
      conversionFactor: "Fator Conversão",
      periodComparison: "Comparação Período",
      enterRateDetails: "Digite taxa e selecione períodos acima para calcular conversão",
      annual: "Anual",
      "semi-annual": "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensal",
      "semi-monthly": "Semi-Mensal",
      "bi-weekly": "Quinzenal",
      weekly: "Semanal",
      daily: "Diária",
      conversionFormulas: "Fórmulas de Conversão",
      toPeriodic: "Para Periódica: Taxa ÷ Períodos por Ano",
      toAnnual: "Para Anual: Taxa × Períodos por Ano",
      example: "Exemplo: 6% anual → 0.5% mensal",
      rateConvertedTo: "Taxa convertida para",
      period: "período",
      understandingTimePeriods: "Entendendo Períodos de Tempo",
      annualDesc: "Anual: Taxa se aplica uma vez por ano",
      monthlyDesc: "Mensal: Taxa se aplica 12 vezes por ano",
      quarterlyDesc: "Trimestral: Taxa se aplica 4 vezes por ano",
      alwaysSpecify: "Sempre especifique: O período de tempo para comparações de taxas"
    },
    fr: {
      title: "Calculateur de Taux d'Intérêt Périodique",
      description: "Calculez taux d'intérêt périodiques et convertissez entre différents périodes de temps",
      inputRate: "Taux d'Entrée (%)",
      inputPeriod: "Période Taux Entrée",
      outputPeriod: "Période Taux Sortie",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      convertedRate: "Taux d'Intérêt Converti",
      inputSummary: "Résumé Taux Entrée",
      outputSummary: "Résumé Taux Sortie",
      conversionFactor: "Facteur Conversion",
      periodComparison: "Comparaison Période",
      enterRateDetails: "Entrez taux et sélectionnez périodes ci-dessus pour calculer conversion",
      annual: "Annuel",
      "semi-annual": "Semi-Annuel",
      quarterly: "Trimestriel",
      monthly: "Mensuel",
      "semi-monthly": "Semi-Mensuel",
      "bi-weekly": "Bi-Hebdomadaire",
      weekly: "Hebdomadaire",
      daily: "Quotidien",
      conversionFormulas: "Formules de Conversion",
      toPeriodic: "Vers Périodique: Taux ÷ Périodes par An",
      toAnnual: "Vers Annuel: Taux × Périodes par An",
      example: "Exemple: 6% annuel → 0.5% mensuel",
      rateConvertedTo: "Taux converti en",
      period: "période",
      understandingTimePeriods: "Comprendre les Périodes de Temps",
      annualDesc: "Annuel: Taux s'applique une fois par an",
      monthlyDesc: "Mensuel: Taux s'applique 12 fois par an",
      quarterlyDesc: "Trimestriel: Taux s'applique 4 fois par an",
      alwaysSpecify: "Toujours spécifier: La période de temps pour les comparaisons de taux"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [inputRate, setInputRate] = useState(5);
  const [inputPeriod, setInputPeriod] = useState<'annual' | 'semi-annual' | 'quarterly' | 'monthly' | 'semi-monthly' | 'bi-weekly' | 'weekly' | 'daily'>('annual');
  const [outputPeriod, setOutputPeriod] = useState<'annual' | 'semi-annual' | 'quarterly' | 'monthly' | 'semi-monthly' | 'bi-weekly' | 'weekly' | 'daily'>('monthly');
  const [results, setResults] = useState<any>({});

  // Define periods per year for each frequency
  const periodsPerYear: Record<string, number> = {
    annual: 1,
    'semi-annual': 2,
    quarterly: 4,
    monthly: 12,
    'semi-monthly': 24,
    'bi-weekly': 26,
    weekly: 52,
    daily: 365
  };

  const calculateConversion = () => {
    if (inputRate < 0) {
      setResults({});
      return;
    }

    const inputPeriods = periodsPerYear[inputPeriod];
    const outputPeriods = periodsPerYear[outputPeriod];

    // Convert to annual rate first, then to target period
    const annualRate = inputRate * (inputPeriods / 1); // Convert input to annual
    const convertedRate = annualRate / outputPeriods; // Convert annual to output period

    const inputSummary = `${inputRate.toFixed(2)}% ${t[inputPeriod as keyof typeof t]} Rate`;
    const outputSummary = `${convertedRate.toFixed(2)}% ${t[outputPeriod as keyof typeof t]} Rate`;
    const conversionFactor = outputPeriods / inputPeriods;
    const periodComparison = inputPeriods > outputPeriods
      ? `${t[inputPeriod]} rate divided by ${outputPeriods/inputPeriods} = ${t[outputPeriod]} rate`
      : `${t[inputPeriod]} rate multiplied by ${inputPeriods/outputPeriods} = ${t[outputPeriod]} rate`;

    setResults({
      convertedRate: convertedRate.toFixed(2),
      inputSummary,
      outputSummary,
      conversionFactor: conversionFactor.toFixed(1),
      periodComparison
    });
  };

  const resetCalculator = () => {
    setInputRate(5);
    setInputPeriod('annual');
    setOutputPeriod('monthly');
    setResults({});
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateConversion();
  }, [inputRate, inputPeriod, outputPeriod]);

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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.inputRate}</label>
              <input
                type="number"
                value={inputRate}
                onChange={(e) => setInputRate(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.01"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.inputPeriod}</label>
              <select
                value={inputPeriod}
                onChange={(e) => setInputPeriod(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="annual">{t.annual}</option>
                <option value="semi-annual">{t["semi-annual"]}</option>
                <option value="quarterly">{t.quarterly}</option>
                <option value="monthly">{t.monthly}</option>
                <option value="semi-monthly">{t["semi-monthly"]}</option>
                <option value="bi-weekly">{t["bi-weekly"]}</option>
                <option value="weekly">{t.weekly}</option>
                <option value="daily">{t.daily}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.outputPeriod}</label>
              <select
                value={outputPeriod}
                onChange={(e) => setOutputPeriod(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="annual">{t.annual}</option>
                <option value="semi-annual">{t["semi-annual"]}</option>
                <option value="quarterly">{t.quarterly}</option>
                <option value="monthly">{t.monthly}</option>
                <option value="semi-monthly">{t["semi-monthly"]}</option>
                <option value="bi-weekly">{t["bi-weekly"]}</option>
                <option value="weekly">{t.weekly}</option>
                <option value="daily">{t.daily}</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateConversion}
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
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.conversionFormulas}</h4>
            <div className="text-xs text-green-700 space-y-1">
              <div>{t.toPeriodic}</div>
              <div>{t.toAnnual}</div>
              <div>{t.example}</div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              {/* Main Result */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-2">{t.convertedRate}</div>
                <div className="text-4xl font-bold text-green-800">
                  {results.convertedRate}%
                </div>
                <div className="text-xs text-green-600 mt-2">
                  {t.rateConvertedTo} {t[outputPeriod as keyof typeof t].toLowerCase()} {t.period}
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.inputSummary}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {results.inputSummary}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.outputSummary}</div>
                  <div className="text-lg font-bold text-blue-600">
                    {results.outputSummary}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.conversionFactor}</div>
                  <div className="text-lg font-bold text-purple-600">
                    ×{results.conversionFactor}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.periodComparison}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {results.periodComparison}
                  </div>
                </div>
              </div>

              {/* Educational Info */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.understandingTimePeriods}</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div>{t.annualDesc}</div>
                  <div>{t.monthlyDesc}</div>
                  <div>{t.quarterlyDesc}</div>
                  <div>{t.alwaysSpecify}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.enterRateDetails}</h3>
              <p className="text-gray-500">Enter your interest rate and select input/output periods above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
