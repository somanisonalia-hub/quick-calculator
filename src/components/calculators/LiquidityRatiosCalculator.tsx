'use client';

import React, { useState, useEffect } from 'react';

interface LiquidityRatiosCalculatorProps {
  lang?: string;
}

export default function LiquidityRatiosCalculator({ lang = 'en' }: LiquidityRatiosCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Liquidity Ratios Calculator",
      description: "Calculate current ratio, quick ratio, and cash ratio to assess your company's ability to meet short-term obligations.",
      liquidityDetails: "Liquidity & Working Capital",
      currentAssets: "Current Assets",
      currentLiabilities: "Current Liabilities",
      inventory: "Inventory",
      cashEquivalents: "Cash & Cash Equivalents",
      calculate: "Calculate Ratios",
      reset: "Reset",
      liquidityRatios: "Liquidity Ratios Results",
      currentRatio: "Current Ratio",
      quickRatio: "Quick Ratio (Acid Test)",
      cashRatio: "Cash Ratio",
      workingCapital: "Working Capital",
      interpretation: "Ratio Interpretation",
      currency: "$",
      currentRatioExcellent: "Current Ratio > 2.0: Excellent liquidity",
      currentRatioGood: "Current Ratio 1.5-2.0: Good liquidity",
      currentRatioAdequate: "Current Ratio 1.0-1.5: Adequate liquidity",
      currentRatioPoor: "Current Ratio < 1.0: Potential liquidity issues",
      quickRatioStrong: "Quick Ratio > 1.0: Strong immediate liquidity",
      cashRatioExcellent: "Cash Ratio > 20%: Excellent cash position"
    },
    es: {
      title: "Calculadora de Ratios de Liquidez",
      description: "Calcula ratio corriente, ratio rápido y ratio de efectivo para evaluar la capacidad de tu empresa para cumplir obligaciones a corto plazo.",
      liquidityDetails: "Liquidez y Capital de Trabajo",
      currentAssets: "Activos Corrientes",
      currentLiabilities: "Pasivos Corrientes",
      inventory: "Inventario",
      cashEquivalents: "Efectivo y Equivalentes de Efectivo",
      calculate: "Calcular Ratios",
      reset: "Reiniciar",
      liquidityRatios: "Resultados de Ratios de Liquidez",
      currentRatio: "Ratio Corriente",
      quickRatio: "Ratio Rápido (Prueba Ácida)",
      cashRatio: "Ratio de Efectivo",
      workingCapital: "Capital de Trabajo",
      interpretation: "Interpretación del Ratio",
      currency: "$",
      currentRatioExcellent: "Ratio Corriente > 2.0: Liquidez excelente",
      currentRatioGood: "Ratio Corriente 1.5-2.0: Buena liquidez",
      currentRatioAdequate: "Ratio Corriente 1.0-1.5: Liquidez adecuada",
      currentRatioPoor: "Ratio Corriente < 1.0: Problemas potenciales de liquidez",
      quickRatioStrong: "Ratio Rápido > 1.0: Fuerte liquidez inmediata",
      cashRatioExcellent: "Ratio de Efectivo > 20%: Posición de efectivo excelente"
    },
    pt: {
      title: "Calculadora de Índices de Liquidez",
      description: "Calcule índice corrente, índice rápido e índice de caixa para avaliar capacidade de sua empresa de cumprir obrigações de curto prazo.",
      liquidityDetails: "Liquidez e Capital de Giro",
      currentAssets: "Ativos Circulantes",
      currentLiabilities: "Passivos Circulantes",
      inventory: "Estoque",
      cashEquivalents: "Caixa e Equivalentes de Caixa",
      calculate: "Calcular Índices",
      reset: "Reiniciar",
      liquidityRatios: "Resultados dos Índices de Liquidez",
      currentRatio: "Índice Corrente",
      quickRatio: "Índice Rápido (Teste Ácido)",
      cashRatio: "Índice de Caixa",
      workingCapital: "Capital de Giro",
      interpretation: "Interpretação do Índice",
      currency: "R$",
      currentRatioExcellent: "Índice Corrente > 2.0: Liquidez excelente",
      currentRatioGood: "Índice Corrente 1.5-2.0: Boa liquidez",
      currentRatioAdequate: "Índice Corrente 1.0-1.5: Liquidez adequada",
      currentRatioPoor: "Índice Corrente < 1.0: Problemas potenciais de liquidez",
      quickRatioStrong: "Índice Rápido > 1.0: Forte liquidez imediata",
      cashRatioExcellent: "Índice de Caixa > 20%: Excelente posição de caixa"
    },
    fr: {
      title: "Calculateur de Ratios de Liquidité",
      description: "Calculez ratio courant, ratio rapide et ratio de trésorerie pour évaluer capacité de votre entreprise à remplir obligations à court terme.",
      liquidityDetails: "Liquidité et Fonds de Roulement",
      currentAssets: "Actifs Courants",
      currentLiabilities: "Passifs Courants",
      inventory: "Stock",
      cashEquivalents: "Trésorerie et Équivalents de Trésorerie",
      calculate: "Calculer les Ratios",
      reset: "Réinitialiser",
      liquidityRatios: "Résultats des Ratios de Liquidité",
      currentRatio: "Ratio Courant",
      quickRatio: "Ratio Rapide (Test Acide)",
      cashRatio: "Ratio de Trésorerie",
      workingCapital: "Fonds de Roulement",
      interpretation: "Interprétation du Ratio",
      currency: "€",
      currentRatioExcellent: "Ratio Courant > 2.0: Liquidité excellente",
      currentRatioGood: "Ratio Courant 1.5-2.0: Bonne liquidité",
      currentRatioAdequate: "Ratio Courant 1.0-1.5: Liquidité adéquate",
      currentRatioPoor: "Ratio Courant < 1.0: Problèmes potentiels de liquidité",
      quickRatioStrong: "Ratio Rapide > 1.0: Forte liquidité immédiate",
      cashRatioExcellent: "Ratio de Trésorerie > 20%: Excellente position de trésorerie"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [currentAssets, setCurrentAssets] = useState(500000);
  const [currentLiabilities, setCurrentLiabilities] = useState(300000);
  const [inventory, setInventory] = useState(100000);
  const [cashEquivalents, setCashEquivalents] = useState(150000);
  const [results, setResults] = useState<any>({});

  // Calculate liquidity ratios
  useEffect(() => {
    if (currentLiabilities > 0) {
      const currentRatio = currentAssets / currentLiabilities;
      const quickRatio = (currentAssets - inventory) / currentLiabilities;
      const cashRatio = cashEquivalents / currentLiabilities;
      const workingCapital = currentAssets - currentLiabilities;

      setResults({
        currentRatio: currentRatio.toFixed(2),
        quickRatio: quickRatio.toFixed(2),
        cashRatio: (cashRatio * 100).toFixed(2) + '%',
        workingCapital: workingCapital.toFixed(0)
      });
    } else {
      setResults({});
    }
  }, [currentAssets, currentLiabilities, inventory, cashEquivalents]);

  const resetCalculator = () => {
    setCurrentAssets(500000);
    setCurrentLiabilities(300000);
    setInventory(100000);
    setCashEquivalents(150000);
    setResults({});
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getInterpretation = (ratioType: string, value: number) => {
    switch (ratioType) {
      case 'currentRatio':
        if (value >= 2.0) return "Excellent liquidity - Strong ability to meet obligations";
        if (value >= 1.5) return "Good liquidity - Adequate working capital";
        if (value >= 1.0) return "Adequate liquidity - Meets minimum requirements";
        return "Poor liquidity - Potential cash flow issues";
      case 'quickRatio':
        if (value >= 1.5) return "Strong liquidity - Good short-term coverage";
        if (value >= 1.0) return "Adequate liquidity - Reasonable coverage";
        if (value >= 0.5) return "Marginal liquidity - Monitor closely";
        return "Weak liquidity - Limited ability to meet obligations";
      case 'cashRatio':
        if (value >= 0.5) return "Strong cash position - Excellent coverage";
        if (value >= 0.2) return "Good cash position - Solid coverage";
        if (value >= 0.1) return "Adequate cash position - Acceptable";
        return "Weak cash position - Limited immediate coverage";
      default:
        return "Ratio calculated successfully";
    }
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.liquidityDetails}</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.currentAssets}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={currentAssets}
                    onChange={(e) => setCurrentAssets(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.currentLiabilities}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={currentLiabilities}
                    onChange={(e) => setCurrentLiabilities(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.inventory}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={inventory}
                    onChange={(e) => setInventory(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.cashEquivalents}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={cashEquivalents}
                    onChange={(e) => setCashEquivalents(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>{t.workingCapital}:</strong> {formatCurrency(currentAssets - currentLiabilities)}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                if (currentLiabilities > 0) {
                  const currentRatio = currentAssets / currentLiabilities;
                  const quickRatio = (currentAssets - inventory) / currentLiabilities;
                  const cashRatio = cashEquivalents / currentLiabilities;
                  const workingCapital = currentAssets - currentLiabilities;

                  setResults({
                    currentRatio: currentRatio.toFixed(2),
                    quickRatio: quickRatio.toFixed(2),
                    cashRatio: (cashRatio * 100).toFixed(2) + '%',
                    workingCapital: workingCapital.toFixed(0)
                  });
                }
              }}
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
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.liquidityRatios}</h3>

              {/* Current Ratio */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-700 font-medium mb-2">{t.currentRatio}</div>
                <div className="text-4xl font-bold text-blue-800">
                  {results.currentRatio}
                </div>
                <div className="text-xs text-blue-600 mt-2">
                  {getInterpretation('currentRatio', parseFloat(results.currentRatio))}
                </div>
              </div>

              {/* Other Ratios */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.quickRatio}</div>
                  <div className="text-2xl font-bold text-green-600">
                    {results.quickRatio}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('quickRatio', parseFloat(results.quickRatio))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.cashRatio}</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {results.cashRatio}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('cashRatio', parseFloat(results.cashRatio) / 100)}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.workingCapital}</div>
                  <div className={`text-2xl font-bold ${(parseFloat(results.workingCapital) >= 0) ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(parseFloat(results.workingCapital))}
                  </div>
                </div>
              </div>

              {/* Interpretation Guide */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-sm font-semibold text-yellow-900 mb-2">{t.interpretation}</h4>
                <div className="text-xs text-yellow-700 space-y-1">
                  <div>{t.currentRatioExcellent}</div>
                  <div>{t.currentRatioGood}</div>
                  <div>{t.currentRatioAdequate}</div>
                  <div>{t.currentRatioPoor}</div>
                  <div>{t.quickRatioStrong}</div>
                  <div>{t.cashRatioExcellent}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Calculate Liquidity Ratios</h3>
              <p className="text-gray-500">Enter current assets and liabilities above to see liquidity analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
