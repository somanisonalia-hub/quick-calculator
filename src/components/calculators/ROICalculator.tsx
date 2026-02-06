'use client';

import { useState, useEffect } from 'react';

interface ROICalculatorProps {
  lang?: string;
}

export default function ROICalculator({ lang = 'en' }: ROICalculatorProps) {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(12500);
  const [timeFrame, setTimeFrame] = useState(1);

  const [results, setResults] = useState({
    netProfit: 0,
    roiPercentage: 0,
    annualROI: 0,
    totalReturn: 0
  });

  const translations = {
    en: {
      title: "ROI Calculator",
      description: "Calculate your Return on Investment and analyze investment performance",
      initialInvestment: "Initial Investment ($)",
      finalValue: "Final Value ($)",
      timeFrame: "Time Frame (Years)",
      results: "ROI Calculation Results",
      netProfit: "Net Profit",
      roiPercentage: "ROI Percentage",
      annualROI: "Annual ROI",
      totalReturn: "Total Return",
      calculate: "Calculate ROI",
      reset: "Reset",
      formula: "ROI Formula: ((Final Value - Initial Investment) / Initial Investment) × 100"
    },
    es: {
      title: "Calculadora de ROI",
      description: "Calcula tu Rendimiento sobre la Inversión y analiza el desempeño de la inversión",
      initialInvestment: "Inversión Inicial ($)",
      finalValue: "Valor Final ($)",
      timeFrame: "Período de Tiempo (Años)",
      results: "Resultados del Cálculo de ROI",
      netProfit: "Ganancia Neta",
      roiPercentage: "Porcentaje de ROI",
      annualROI: "ROI Anual",
      totalReturn: "Rendimiento Total",
      calculate: "Calcular ROI",
      reset: "Reiniciar",
      formula: "Fórmula ROI: ((Valor Final - Inversión Inicial) / Inversión Inicial) × 100"
    },
    pt: {
      title: "Calculadora de ROI",
      description: "Calcule seu Retorno sobre o Investimento e analise o desempenho do investimento",
      initialInvestment: "Investimento Inicial ($)",
      finalValue: "Valor Final ($)",
      timeFrame: "Período de Tempo (Anos)",
      results: "Resultados do Cálculo de ROI",
      netProfit: "Lucro Líquido",
      roiPercentage: "Porcentagem de ROI",
      annualROI: "ROI Anual",
      totalReturn: "Retorno Total",
      calculate: "Calcular ROI",
      reset: "Reiniciar",
      formula: "Fórmula ROI: ((Valor Final - Investimento Inicial) / Investimento Inicial) × 100"
    },
    fr: {
      title: "Calculateur de ROI",
      description: "Calculez votre Retour sur Investissement et analysez le rendement des investissements",
      initialInvestment: "Investissement Initial ($)",
      finalValue: "Valeur Finale ($)",
      timeFrame: "Période (Années)",
      results: "Résultats du Calcul du ROI",
      netProfit: "Bénéfice Net",
      roiPercentage: "Pourcentage de ROI",
      annualROI: "ROI Annuel",
      totalReturn: "Rendement Total",
      calculate: "Calculer le ROI",
      reset: "Réinitialiser",
      formula: "Formule ROI: ((Valeur Finale - Investissement Initial) / Investissement Initial) × 100"
    },
    de: {
      title: "ROI-Rechner",
      description: "Berechnen Sie Ihre Kapitalrendite und analysieren Sie die Investitionsleistung",
      initialInvestment: "Anfangsinvestition ($)",
      finalValue: "Endwert ($)",
      timeFrame: "Zeitrahmen (Jahre)",
      results: "ROI-Berechnungsergebnisse",
      netProfit: "Nettogewinn",
      roiPercentage: "ROI-Prozentsatz",
      annualROI: "Jährlicher ROI",
      totalReturn: "Gesamtrendite",
      calculate: "ROI berechnen",
      reset: "Zurücksetzen",
      formula: "ROI-Formel: ((Endwert - Anfangsinvestition) / Anfangsinvestition) × 100"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateROI = () => {
    const netProfit = finalValue - initialInvestment;
    const roi = (netProfit / initialInvestment) * 100;
    const annualROI = timeFrame > 0 ? roi / timeFrame : 0;
    const totalReturn = (finalValue / initialInvestment - 1) * 100;

    setResults({
      netProfit,
      roiPercentage: roi,
      annualROI,
      totalReturn
    });
  };

  const resetCalculator = () => {
    setInitialInvestment(10000);
    setFinalValue(12500);
    setTimeFrame(1);
    setResults({ netProfit: 0, roiPercentage: 0, annualROI: 0, totalReturn: 0 });
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateROI();
  }, [initialInvestment, finalValue, timeFrame]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return value.toFixed(2) + '%';
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.initialInvestment}
            </label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(parseFloat(e.target.value) || 0)}
              min="0"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.finalValue}
            </label>
            <input
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(parseFloat(e.target.value) || 0)}
              min="0"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.timeFrame}
            </label>
            <input
              type="number"
              value={timeFrame}
              onChange={(e) => setTimeFrame(parseFloat(e.target.value) || 1)}
              min="0.1"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Auto-calculation note */}
        <div className="pt-2 text-xs text-blue-600 text-center font-medium">
          📊 {lang === 'en' ? 'Calculations update automatically as you change values' : lang === 'es' ? 'Los cálculos se actualizan automáticamente al cambiar valores' : lang === 'pt' ? 'Os cálculos são atualizados automaticamente ao alterar valores' : lang === 'fr' ? 'Les calculs se mettent à jour automatiquement au fur et à mesure que vous modifiez les valeurs' : 'Berechnungen werden automatisch aktualisiert, wenn Sie Werte ändern'}
        </div>

        {/* Buttons */}
        <div className="pt-3 flex gap-4">
          <button
            onClick={resetCalculator}
            className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
          >
            {t.reset}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">{t.results}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.netProfit}</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {formatCurrency(results.netProfit)}
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.roiPercentage}</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {formatPercent(results.roiPercentage)}
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.annualROI}</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {formatPercent(results.annualROI)}
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.totalReturn}</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {formatPercent(results.totalReturn)}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-2">{t.formula}</p>
          <p className="text-xs text-gray-600">
            {lang === 'en' ? 'Net Profit = Final Value - Initial Investment' : lang === 'es' ? 'Ganancia Neta = Valor Final - Inversión Inicial' : lang === 'pt' ? 'Lucro Líquido = Valor Final - Investimento Inicial' : lang === 'fr' ? 'Bénéfice Net = Valeur Finale - Investissement Initial' : 'Nettogewinn = Endwert - Anfangsinvestition'}
          </p>
        </div>
      </div>
    </div>
  );
}
