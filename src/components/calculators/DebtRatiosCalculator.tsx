'use client';

import React, { useState, useEffect } from 'react';

interface DebtRatiosCalculatorProps {
  lang?: string;
}

export default function DebtRatiosCalculator({ lang = 'en' }: DebtRatiosCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Debt Ratios Calculator",
      description: "Calculate key debt ratios including debt-to-equity, debt ratio, and debt-to-asset ratio to assess financial leverage and risk.",
      debtDetails: "Debt & Financial Information",
      totalDebt: "Total Debt",
      totalEquity: "Total Equity",
      totalAssets: "Total Assets",
      shortTermDebt: "Short-term Debt",
      longTermDebt: "Long-term Debt",
      currentLiabilities: "Current Liabilities",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      debtRatios: "Debt Ratios Results",
      debtToEquityRatio: "Debt-to-Equity Ratio",
      debtRatio: "Debt Ratio (Total Debt to Total Assets)",
      longTermDebtRatio: "Long-term Debt Ratio",
      debtToAssetRatio: "Debt-to-Asset Ratio",
      interpretation: "Ratio Interpretation",
      currency: "$",
      debtToEquityConservative: "Debt-to-Equity < 0.5: Conservative financing",
      debtToEquityModerate: "Debt-to-Equity 0.5-1.0: Moderate leverage",
      debtToEquityHigh: "Debt-to-Equity 1.0-2.0: High leverage",
      debtRatioLow: "Debt Ratio < 30%: Low risk position",
      debtRatioModerate: "Debt Ratio 30-50%: Moderate risk",
      debtRatioHigh: "Debt Ratio > 50%: High risk position"
    },
    es: {
      title: "Calculadora de Ratios de Deuda",
      description: "Calcula ratios clave de deuda incluyendo deuda-capital, ratio de deuda y ratio deuda-activos para evaluar el apalancamiento financiero y riesgo.",
      debtDetails: "Información de Deuda y Finanzas",
      totalDebt: "Deuda Total",
      totalEquity: "Capital Total",
      totalAssets: "Activos Totales",
      shortTermDebt: "Deuda a Corto Plazo",
      longTermDebt: "Deuda a Largo Plazo",
      currentLiabilities: "Pasivos Corrientes",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      debtRatios: "Resultados de Ratios de Deuda",
      debtToEquityRatio: "Ratio Deuda-Capital",
      debtRatio: "Ratio de Deuda (Deuda Total a Activos Totales)",
      longTermDebtRatio: "Ratio de Deuda a Largo Plazo",
      debtToAssetRatio: "Ratio Deuda-Activos",
      interpretation: "Interpretación del Ratio",
      currency: "$",
      debtToEquityConservative: "Deuda-Capital < 0.5: Financiamiento conservador",
      debtToEquityModerate: "Deuda-Capital 0.5-1.0: Apalancamiento moderado",
      debtToEquityHigh: "Deuda-Capital 1.0-2.0: Alto apalancamiento",
      debtRatioLow: "Ratio de Deuda < 30%: Posición de bajo riesgo",
      debtRatioModerate: "Ratio de Deuda 30-50%: Riesgo moderado",
      debtRatioHigh: "Ratio de Deuda > 50%: Posición de alto riesgo"
    },
    pt: {
      title: "Calculadora de Índices de Dívida",
      description: "Calcule índices-chave de dívida incluindo dívida-capital, índice de dívida e índice dívida-ativos para avaliar alavancagem financeira e risco.",
      debtDetails: "Informações de Dívida e Finanças",
      totalDebt: "Dívida Total",
      totalEquity: "Capital Total",
      totalAssets: "Ativos Totais",
      shortTermDebt: "Dívida de Curto Prazo",
      longTermDebt: "Dívida de Longo Prazo",
      currentLiabilities: "Passivos Correntes",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      debtRatios: "Resultados dos Índices de Dívida",
      debtToEquityRatio: "Índice Dívida-Capital",
      debtRatio: "Índice de Dívida (Dívida Total para Ativos Totais)",
      longTermDebtRatio: "Índice de Dívida de Longo Prazo",
      debtToAssetRatio: "Índice Dívida-Ativos",
      interpretation: "Interpretação do Índice",
      currency: "R$",
      debtToEquityConservative: "Dívida-Capital < 0.5: Financiamento conservador",
      debtToEquityModerate: "Dívida-Capital 0.5-1.0: Alavancagem moderada",
      debtToEquityHigh: "Dívida-Capital 1.0-2.0: Alta alavancagem",
      debtRatioLow: "Índice de Dívida < 30%: Posição de baixo risco",
      debtRatioModerate: "Índice de Dívida 30-50%: Risco moderado",
      debtRatioHigh: "Índice de Dívida > 50%: Posição de alto risco"
    },
    fr: {
      title: "Calculateur de Ratios d'Endettement",
      description: "Calculez les ratios d'endettement clés incluant dette-fonds propres, ratio d'endettement et ratio dette-actifs pour évaluer l'effet de levier financier et le risque.",
      debtDetails: "Informations sur la Dette et Finances",
      totalDebt: "Dette Totale",
      totalEquity: "Fonds Propres Totaux",
      totalAssets: "Actifs Totaux",
      shortTermDebt: "Dette à Court Terme",
      longTermDebt: "Dette à Long Terme",
      currentLiabilities: "Passifs Courants",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      debtRatios: "Résultats des Ratios d'Endettement",
      debtToEquityRatio: "Ratio Dette-Fonds Propres",
      debtRatio: "Ratio d'Endettement (Dette Totale aux Actifs Totaux)",
      longTermDebtRatio: "Ratio d'Endettement à Long Terme",
      debtToAssetRatio: "Ratio Dette-Actifs",
      interpretation: "Interprétation du Ratio",
      currency: "€",
      debtToEquityConservative: "Dette-Capitaux < 0.5: Financement conservateur",
      debtToEquityModerate: "Dette-Capitaux 0.5-1.0: Levier modéré",
      debtToEquityHigh: "Dette-Capitaux 1.0-2.0: Levier élevé",
      debtRatioLow: "Ratio d'Endettement < 30%: Position à faible risque",
      debtRatioModerate: "Ratio d'Endettement 30-50%: Risque modéré",
      debtRatioHigh: "Ratio d'Endettement > 50%: Position à risque élevé",
      calculateDebtRatios: "Calculate Debt Ratios",
      enterFinancialInfo: "Enter financial information above to see debt ratio analysis"
    },
    de: {
      title: "Schuldenquoten-Rechner",
      description: "Berechnen Sie wichtige Schuldenquoten einschließlich Verschuldungsgrad, Schuldenquote und Schulden-zu-Vermögen-Verhältnis, um finanzielle Hebelwirkung und Risiko zu bewerten.",
      debtDetails: "Schulden- und Finanzinformationen",
      totalDebt: "Gesamtschulden",
      totalEquity: "Gesamtkapital",
      totalAssets: "Gesamtvermögen",
      shortTermDebt: "Kurzfristige Schulden",
      longTermDebt: "Langfristige Schulden",
      currentLiabilities: "Kurzfristige Verbindlichkeiten",
      calculate: "🔄 Neu berechnen",
      reset: "Zurücksetzen",
      debtRatios: "Ergebnisse der Schuldenquoten",
      debtToEquityRatio: "Verschuldungsgrad",
      debtRatio: "Schuldenquote (Gesamtschulden zu Gesamtvermögen)",
      longTermDebtRatio: "Langfristige Schuldenquote",
      debtToAssetRatio: "Schulden-zu-Vermögen-Verhältnis",
      interpretation: "Verhältnis-Interpretation",
      currency: "€",
      debtToEquityConservative: "Verschuldungsgrad < 0,5: Konservative Finanzierung",
      debtToEquityModerate: "Verschuldungsgrad 0,5-1,0: Mäßige Hebelwirkung",
      debtToEquityHigh: "Verschuldungsgrad 1,0-2,0: Hohe Hebelwirkung",
      debtRatioLow: "Schuldenquote < 30%: Niedrige Risikoposition",
      debtRatioModerate: "Schuldenquote 30-50%: Moderates Risiko",
      debtRatioHigh: "Schuldenquote > 50%: Hohe Risikoposition",
      calculateDebtRatios: "Schuldenquoten berechnen",
      enterFinancialInfo: "Geben Sie oben finanzielle Informationen ein, um die Schuldenquotenanalyse zu sehen"
    },
    nl: {
      title: "Schuldratio's Calculator",
      description: "Bereken belangrijke schuldratio's inclusief schuld-naar-eigen-vermogen, schuldratio en schuld-naar-activa-ratio om financiële hefboomwerking en risico te beoordelen.",
      debtDetails: "Schuld- en financiële informatie",
      totalDebt: "Totale schuld",
      totalEquity: "Totaal eigen vermogen",
      totalAssets: "Totale activa",
      shortTermDebt: "Schulden op korte termijn",
      longTermDebt: "Schulden op lange termijn",
      currentLiabilities: "Kortlopende verplichtingen",
      calculate: "🔄 Opnieuw berekenen",
      reset: "Herstellen",
      debtRatios: "Resultaten schuldratio's",
      debtToEquityRatio: "Schuld-naar-eigen-vermogen-ratio",
      debtRatio: "Schuldratio (totale schuld naar totale activa)",
      longTermDebtRatio: "Schuldratio op lange termijn",
      debtToAssetRatio: "Schuld-naar-activa-ratio",
      interpretation: "Ratio-interpretatie",
      currency: "€",
      debtToEquityConservative: "Schuld-naar-eigen-vermogen < 0,5: Conservatieve financiering",
      debtToEquityModerate: "Schuld-naar-eigen-vermogen 0,5-1,0: Gematigde hefboomwerking",
      debtToEquityHigh: "Schuld-naar-eigen-vermogen 1,0-2,0: Hoge hefboomwerking",
      debtRatioLow: "Schuldratio < 30%: Lage risicopositie",
      debtRatioModerate: "Schuldratio 30-50%: Matig risico",
      debtRatioHigh: "Schuldratio > 50%: Hoge risicopositie",
      calculateDebtRatios: "Schuldratio's berekenen",
      enterFinancialInfo: "Voer hierboven financiële informatie in om de schuldratio-analyse te zien"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [totalDebt, setTotalDebt] = useState(500000);
  const [totalEquity, setTotalEquity] = useState(750000);
  const [totalAssets, setTotalAssets] = useState(1250000);
  const [shortTermDebt, setShortTermDebt] = useState(100000);
  const [longTermDebt, setLongTermDebt] = useState(400000);
  const [results, setResults] = useState<any>({});

  // Calculate debt ratios
  useEffect(() => {
    if (totalAssets > 0 && totalEquity >= 0) {
      const debtToEquity = totalEquity > 0 ? totalDebt / totalEquity : 0;
      const debtRatio = totalDebt / totalAssets;
      const longTermDebtRatio = totalAssets > 0 ? longTermDebt / totalAssets : 0;
      const debtToAssetRatio = totalDebt / totalAssets;

      setResults({
        debtToEquity: debtToEquity.toFixed(2),
        debtRatio: (debtRatio * 100).toFixed(2) + '%',
        longTermDebtRatio: (longTermDebtRatio * 100).toFixed(2) + '%',
        debtToAssetRatio: (debtToAssetRatio * 100).toFixed(2) + '%'
      });
    } else {
      setResults({});
    }
  }, [totalDebt, totalEquity, totalAssets, shortTermDebt, longTermDebt]);

  const resetCalculator = () => {
    setTotalDebt(500000);
    setTotalEquity(750000);
    setTotalAssets(1250000);
    setShortTermDebt(100000);
    setLongTermDebt(400000);
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
      case 'debtToEquity':
        if (value < 0.5) return "Conservative leverage - Low risk";
        if (value < 1.0) return "Moderate leverage - Balanced risk";
        if (value < 2.0) return "High leverage - Higher risk";
        return "Very high leverage - Significant risk";
      case 'debtRatio':
        if (value < 0.3) return "Low debt burden - Strong financial position";
        if (value < 0.5) return "Moderate debt burden - Acceptable position";
        if (value < 0.7) return "High debt burden - Monitor closely";
        return "Very high debt burden - Financial stress";
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.debtDetails}</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.totalAssets}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={totalAssets}
                    onChange={(e) => setTotalAssets(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.totalEquity}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={totalEquity}
                    onChange={(e) => setTotalEquity(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.shortTermDebt}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={shortTermDebt}
                    onChange={(e) => setShortTermDebt(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.longTermDebt}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={longTermDebt}
                    onChange={(e) => setLongTermDebt(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>{t.totalDebt}:</strong> {formatCurrency(shortTermDebt + longTermDebt)}
                <br />
                <strong>{t.currentLiabilities}:</strong> {formatCurrency(shortTermDebt)}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                const debtToEquity = totalEquity > 0 ? totalDebt / totalEquity : 0;
                const debtRatio = totalDebt / totalAssets;
                const longTermDebtRatio = longTermDebt / totalAssets;
                const debtToAssetRatio = totalDebt / totalAssets;

                setResults({
                  debtToEquity: debtToEquity.toFixed(2),
                  debtRatio: (debtRatio * 100).toFixed(2) + '%',
                  longTermDebtRatio: (longTermDebtRatio * 100).toFixed(2) + '%',
                  debtToAssetRatio: (debtToAssetRatio * 100).toFixed(2) + '%'
                });
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.debtRatios}</h3>

              {/* Debt-to-Equity Ratio */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-2">{t.debtToEquityRatio}</div>
                <div className="text-4xl font-bold text-green-800">
                  {results.debtToEquity}
                </div>
                <div className="text-xs text-green-600 mt-2">
                  {getInterpretation('debtToEquity', parseFloat(results.debtToEquity))}
                </div>
              </div>

              {/* Other Ratios */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.debtRatio}</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {results.debtRatio}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('debtRatio', parseFloat(results.debtRatio) / 100)}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.longTermDebtRatio}</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {results.longTermDebtRatio}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.debtToAssetRatio}</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {results.debtToAssetRatio}
                  </div>
                </div>
              </div>

              {/* Interpretation Guide */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-sm font-semibold text-yellow-900 mb-2">{t.interpretation}</h4>
                <div className="text-xs text-yellow-700 space-y-1">
                  <div>{t.debtToEquityConservative}</div>
                  <div>{t.debtToEquityModerate}</div>
                  <div>{t.debtToEquityHigh}</div>
                  <div>{t.debtRatioLow}</div>
                  <div>{t.debtRatioModerate}</div>
                  <div>{t.debtRatioHigh}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.calculateDebtRatios}</h3>
              <p className="text-gray-500">{t.enterFinancialInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
