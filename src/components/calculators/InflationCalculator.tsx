'use client';

import { useState, useEffect } from 'react';

interface InflationCalculatorProps {
  lang?: string;
}

export default function InflationCalculator({ lang = 'en' }: InflationCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'historical' | 'future'>('historical');
  const [originalAmount, setOriginalAmount] = useState(1000);
  const [originalYear, setOriginalYear] = useState(2000);
  const [targetYear, setTargetYear] = useState(new Date().getFullYear());
  const [inflationRate, setInflationRate] = useState(3.0);
  const [years, setYears] = useState(10);

  const [results, setResults] = useState({
    adjustedAmount: 0,
    totalChange: 0,
    totalChangePercent: 0,
    annualInflationRate: 0,
    purchasingPower: 0
  });

  const translations = {
    en: {
      title: "Inflation Calculator",
      description: "Calculate the impact of inflation on purchasing power over time",
      calculationType: "Calculation Type",
      historical: "Historical Value (Past to Present)",
      future: "Future Value (Present to Future)",
      originalAmount: "Original Amount ($)",
      originalYear: "Original Year",
      targetYear: "Target Year",
      inflationRate: "Annual Inflation Rate (%)",
      years: "Years",
      calculate: "Calculate Inflation Impact",
      reset: "Reset",
      adjustedAmount: "Adjusted Amount",
      totalChange: "Total Change",
      totalChangePercent: "Total Change (%)",
      annualInflationRate: "Annual Inflation Rate",
      purchasingPower: "Purchasing Power",
      currentYear: new Date().getFullYear(),
      dollars: "$",
      yearsUnit: "years",
      percent: "%",
      historicalExplanation: "This shows what $X from YEAR would be worth in today's dollars",
      futureExplanation: "This shows what you need today to have $X in purchasing power in the future",
      inflationImpact: "Inflation Impact Analysis",
      calculation: "Calculation:",
      value: "Value",
      original: "Original:",
      adjusted: "Adjusted:",
      rate: "Rate:",
      perYear: "per year",
      today: "today",
      inYears: "in"
    },
    es: {
      title: "Calculadora de Inflación",
      description: "Calcula el impacto de la inflación en el poder adquisitivo con el tiempo",
      calculationType: "Tipo de Cálculo",
      historical: "Valor Histórico (Pasado a Presente)",
      future: "Valor Futuro (Presente a Futuro)",
      originalAmount: "Monto Original ($)",
      originalYear: "Año Original",
      targetYear: "Año Objetivo",
      inflationRate: "Tasa Anual de Inflación (%)",
      years: "Años",
      calculate: "Calcular Impacto de Inflación",
      reset: "Reiniciar",
      adjustedAmount: "Monto Ajustado",
      totalChange: "Cambio Total",
      totalChangePercent: "Cambio Total (%)",
      annualInflationRate: "Tasa Anual de Inflación",
      purchasingPower: "Poder Adquisitivo",
      currentYear: new Date().getFullYear(),
      dollars: "$",
      yearsUnit: "años",
      percent: "%",
      historicalExplanation: "Esto muestra qué valdría $X del AÑO en dólares actuales",
      futureExplanation: "Esto muestra qué necesitas hoy para tener $X en poder adquisitivo en el futuro",
      inflationImpact: "Análisis de Impacto de Inflación",
      calculation: "Cálculo:",
      value: "Valor",
      original: "Original:",
      adjusted: "Ajustado:",
      rate: "Tasa:",
      perYear: "por año",
      today: "hoy",
      inYears: "en"
    },
    pt: {
      title: "Calculadora de Inflação",
      description: "Calcule o impacto da inflação no poder de compra ao longo do tempo",
      calculationType: "Tipo de Cálculo",
      historical: "Valor Histórico (Passado para Presente)",
      future: "Valor Futuro (Presente para Futuro)",
      originalAmount: "Valor Original ($)",
      originalYear: "Ano Original",
      targetYear: "Ano Alvo",
      inflationRate: "Taxa Anual de Inflação (%)",
      years: "Anos",
      calculate: "Calcular Impacto da Inflação",
      reset: "Reiniciar",
      adjustedAmount: "Valor Ajustado",
      totalChange: "Mudança Total",
      totalChangePercent: "Mudança Total (%)",
      annualInflationRate: "Taxa Anual de Inflação",
      purchasingPower: "Poder de Compra",
      currentYear: new Date().getFullYear(),
      dollars: "$",
      yearsUnit: "anos",
      percent: "%",
      historicalExplanation: "Isso mostra o que $X do ANO valeria em dólares atuais",
      futureExplanation: "Isso mostra o que você precisa hoje para ter $X em poder de compra no futuro",
      inflationImpact: "Análise de Impacto da Inflação",
      calculation: "Cálculo:",
      value: "Valor",
      original: "Original:",
      adjusted: "Ajustado:",
      rate: "Taxa:",
      perYear: "por ano",
      today: "hoje",
      inYears: "em"
    },
    fr: {
      title: "Calculateur d'Inflation",
      description: "Calculez l'impact de l'inflation sur le pouvoir d'achat au fil du temps",
      calculationType: "Type de Calcul",
      historical: "Valeur Historique (Passé à Présent)",
      future: "Valeur Future (Présent à Futur)",
      originalAmount: "Montant Original ($)",
      originalYear: "Année Originale",
      targetYear: "Année Cible",
      inflationRate: "Taux d'Inflation Annuel (%)",
      years: "Années",
      calculate: "Calculer l'Impact de l'Inflation",
      reset: "Réinitialiser",
      adjustedAmount: "Montant Ajusté",
      totalChange: "Changement Total",
      totalChangePercent: "Changement Total (%)",
      annualInflationRate: "Taux d'Inflation Annuel",
      purchasingPower: "Pouvoir d'Achat",
      currentYear: new Date().getFullYear(),
      dollars: "$",
      yearsUnit: "années",
      percent: "%",
      historicalExplanation: "Cela montre ce que vaudrait $X de l'ANNÉE en dollars actuels",
      futureExplanation: "Cela montre ce dont vous avez besoin aujourd'hui pour avoir $X de pouvoir d'achat à l'avenir",
      inflationImpact: "Analyse de l'Impact de l'Inflation",
      calculation: "Calcul:",

      value: "Valeur",
      original: "Original:",
      adjusted: "Ajusté:",
      rate: "Taux:",
      perYear: "par an",
      today: "aujourd'hui",
      inYears: "dans"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateInflation = () => {
    let adjustedAmount = originalAmount;
    let totalChange = 0;
    let totalChangePercent = 0;
    let annualRate = inflationRate;
    let purchasingPower = originalAmount;

    if (calculationType === 'historical') {
      // Historical calculation: what past amount is worth today
      const yearDiff = t.currentYear - originalYear;
      if (yearDiff > 0) {
        adjustedAmount = originalAmount * Math.pow(1 + inflationRate / 100, yearDiff);
        totalChange = adjustedAmount - originalAmount;
        totalChangePercent = (totalChange / originalAmount) * 100;
        annualRate = inflationRate;
        purchasingPower = originalAmount; // Original purchasing power
      }
    } else {
      // Future calculation: what you need today for future purchasing power
      adjustedAmount = originalAmount / Math.pow(1 + inflationRate / 100, years);
      totalChange = adjustedAmount - originalAmount;
      totalChangePercent = (totalChange / originalAmount) * 100;
      annualRate = inflationRate;
      purchasingPower = originalAmount; // Future purchasing power needed
    }

    setResults({
      adjustedAmount,
      totalChange,
      totalChangePercent,
      annualInflationRate: annualRate,
      purchasingPower
    });
  };

  useEffect(() => {
    calculateInflation();
  }, [calculationType, originalAmount, originalYear, targetYear, inflationRate, years]);

  const resetCalculator = () => {
    setCalculationType('historical');
    setOriginalAmount(1000);
    setOriginalYear(2000);
    setTargetYear(new Date().getFullYear());
    setInflationRate(3.0);
    setYears(10);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.calculationType}</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'historical' | 'future')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="historical">{t.historical}</option>
              <option value="future">{t.future}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.originalAmount}</label>
            <input
              type="number"
              value={originalAmount}
              onChange={(e) => setOriginalAmount(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="100"
            />
          </div>

          {calculationType === 'historical' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.originalYear}</label>
                <input
                  type="number"
                  value={originalYear}
                  onChange={(e) => setOriginalYear(Number(e.target.value) || 2000)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1900"
                  max={t.currentYear}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.inflationRate}</label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="20"
                  step="0.1"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.years}</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.inflationRate}</label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="20"
                  step="0.1"
                />
              </div>
            </>
          )}

          <div className="flex gap-4">
            <button
              onClick={calculateInflation}
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

          <div className="text-sm text-gray-600 mt-4">
            {calculationType === 'historical' ? t.historicalExplanation : t.futureExplanation}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.adjustedAmount}</h3>
            <div className="text-3xl font-bold text-blue-600 min-h-[48px] flex items-center">
              {t.dollars}{results.adjustedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-green-900 mb-1">{t.totalChange}</h4>
              <div className="text-lg font-bold text-green-600">
                {results.totalChange >= 0 ? '+' : ''}{t.dollars}{results.totalChange.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-orange-900 mb-1">{t.totalChangePercent}</h4>
              <div className="text-lg font-bold text-orange-600">
                {results.totalChangePercent >= 0 ? '+' : ''}{results.totalChangePercent.toFixed(1)}{t.percent}
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">{t.annualInflationRate}</h4>
            <div className="text-xl font-bold text-purple-600">
              {results.annualInflationRate.toFixed(1)}{t.percent}
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.purchasingPower}</h4>
            <div className="text-xl font-bold text-indigo-600">
              {t.dollars}{results.purchasingPower.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>

          {/* Calculation Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">{t.inflationImpact}</h4>
            <div className="text-xs text-gray-700 space-y-1">
              <div><strong>{t.calculation}</strong> {calculationType === 'historical' ? t.historical : t.future} {t.value}</div>
              <div><strong>{t.original}</strong> {t.dollars}{originalAmount.toLocaleString()} {calculationType === 'historical' ? `(${originalYear})` : `(${t.today})`}</div>
              <div><strong>{t.adjusted}</strong> {t.dollars}{results.adjustedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {calculationType === 'historical' ? `(${t.currentYear})` : `(${t.inYears} ${years} ${t.yearsUnit})`}</div>
              <div><strong>{t.rate}</strong> {inflationRate}{t.percent} {t.perYear}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
