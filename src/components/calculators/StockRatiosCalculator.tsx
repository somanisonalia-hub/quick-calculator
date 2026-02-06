'use client';

import React, { useState, useEffect } from 'react';

interface StockRatiosCalculatorProps {
  lang?: string;
}

export default function StockRatiosCalculator({ lang = 'en' }: StockRatiosCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Stock Ratios Calculator",
      description: "Calculate price-to-earnings ratio, dividend yield, earnings per share, and other key stock valuation metrics.",
      stockDetails: "Stock & Valuation Metrics",
      marketPricePerShare: "Market Price per Share",
      earningsPerShare: "Earnings per Share (EPS)",
      dividendsPerShare: "Dividends per Share",
      bookValuePerShare: "Book Value per Share",
      calculate: "Calculate Ratios",
      reset: "Reset",
      stockRatios: "Stock Ratios Results",
      priceToEarningsRatio: "Price-to-Earnings (P/E) Ratio",
      dividendYield: "Dividend Yield",
      priceToBookRatio: "Price-to-Book (P/B) Ratio",
      earningsYield: "Earnings Yield",
      dividendPayoutRatio: "Dividend Payout Ratio",
      interpretation: "Ratio Interpretation",
      currency: "$",
      peLow: "P/E < 15: Potentially undervalued",
      peFair: "P/E 15-25: Fairly valued",
      peHigh: "P/E > 25: Premium valuation",
      dividendYieldHigh: "Dividend Yield > 4%: High income focus",
      pbUndervalued: "P/B < 1.5: Potentially undervalued"
    },
    es: {
      title: "Calculadora de Ratios de Acciones",
      description: "Calcula ratio precio-ganancias, rendimiento de dividendos, ganancias por acción y otras métricas clave de valoración de acciones.",
      stockDetails: "Métricas de Acciones y Valoración",
      marketPricePerShare: "Precio de Mercado por Acción",
      earningsPerShare: "Ganancias por Acción (EPS)",
      dividendsPerShare: "Dividendos por Acción",
      bookValuePerShare: "Valor en Libros por Acción",
      calculate: "Calcular Ratios",
      reset: "Reiniciar",
      stockRatios: "Resultados de Ratios de Acciones",
      priceToEarningsRatio: "Ratio Precio-Ganancias (P/E)",
      dividendYield: "Rendimiento de Dividendos",
      priceToBookRatio: "Ratio Precio-Libros (P/B)",
      earningsYield: "Rendimiento de Ganancias",
      dividendPayoutRatio: "Ratio de Pago de Dividendos",
      interpretation: "Interpretación del Ratio",
      currency: "$",
      peLow: "P/E < 15: Potencialmente infravalorada",
      peFair: "P/E 15-25: Valoración justa",
      peHigh: "P/E > 25: Valoración premium",
      dividendYieldHigh: "Rendimiento Dividendos > 4%: Enfoque alto ingreso",
      pbUndervalued: "P/B < 1.5: Potencialmente infravalorada"
    },
    pt: {
      title: "Calculadora de Índices de Ações",
      description: "Calcule índice preço-lucro, rendimento de dividendos, lucro por ação e outras métricas-chave de avaliação de ações.",
      stockDetails: "Métricas de Ações e Avaliação",
      marketPricePerShare: "Preço de Mercado por Ação",
      earningsPerShare: "Lucro por Ação (EPS)",
      dividendsPerShare: "Dividendos por Ação",
      bookValuePerShare: "Valor Contábil por Ação",
      calculate: "Calcular Índices",
      reset: "Reiniciar",
      stockRatios: "Resultados dos Índices de Ações",
      priceToEarningsRatio: "Índice Preço-Lucro (P/L)",
      dividendYield: "Rendimento de Dividendos",
      priceToBookRatio: "Índice Preço-Valor Contábil (P/B)",
      earningsYield: "Rendimento de Lucros",
      dividendPayoutRatio: "Índice de Pagamento de Dividendos",
      interpretation: "Interpretação do Índice",
      currency: "R$",
      peLow: "P/L < 15: Potencialmente subvalorizada",
      peFair: "P/L 15-25: Valorização justa",
      peHigh: "P/L > 25: Valorização premium",
      dividendYieldHigh: "Rendimento Dividendos > 4%: Foco alta renda",
      pbUndervalued: "P/VPA < 1.5: Potencialmente subvalorizada"
    },
    fr: {
      title: "Calculateur de Ratios Boursiers",
      description: "Calculez ratio cours-bénéfice, rendement des dividendes, bénéfice par action et autres métriques clés de valorisation boursière.",
      stockDetails: "Métriques Boursières et Valorisation",
      marketPricePerShare: "Prix de Marché par Action",
      earningsPerShare: "Bénéfice par Action (EPS)",
      dividendsPerShare: "Dividendes par Action",
      bookValuePerShare: "Valeur Comptable par Action",
      calculate: "Calculer les Ratios",
      reset: "Réinitialiser",
      stockRatios: "Résultats des Ratios Boursiers",
      priceToEarningsRatio: "Ratio Cours-Bénéfice (P/E)",
      dividendYield: "Rendement des Dividendes",
      priceToBookRatio: "Ratio Cours-Valeur Comptable (P/B)",
      earningsYield: "Rendement des Bénéfices",
      dividendPayoutRatio: "Ratio de Distribution des Dividendes",
      interpretation: "Interprétation du Ratio",
      currency: "€",
      peLow: "P/E < 15: Potentiellement sous-évalué",
      peFair: "P/E 15-25: Évaluation juste",
      peHigh: "P/E > 25: Évaluation premium",
      dividendYieldHigh: "Rendement Dividendes > 4%: Focus revenu élevé",
      pbUndervalued: "P/B < 1.5: Potentiellement sous-évalué"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [marketPricePerShare, setMarketPricePerShare] = useState(50);
  const [earningsPerShare, setEarningsPerShare] = useState(5);
  const [dividendsPerShare, setDividendsPerShare] = useState(1.5);
  const [bookValuePerShare, setBookValuePerShare] = useState(25);
  const [results, setResults] = useState<any>({});

  // Calculate stock ratios
  useEffect(() => {
    if (earningsPerShare > 0 && bookValuePerShare > 0) {
      const priceToEarningsRatio = marketPricePerShare / earningsPerShare;
      const dividendYield = (dividendsPerShare / marketPricePerShare) * 100;
      const priceToBookRatio = marketPricePerShare / bookValuePerShare;
      const earningsYield = (earningsPerShare / marketPricePerShare) * 100;
      const dividendPayoutRatio = (dividendsPerShare / earningsPerShare) * 100;

      setResults({
        priceToEarningsRatio: priceToEarningsRatio.toFixed(2),
        dividendYield: dividendYield.toFixed(2) + '%',
        priceToBookRatio: priceToBookRatio.toFixed(2),
        earningsYield: earningsYield.toFixed(2) + '%',
        dividendPayoutRatio: dividendPayoutRatio.toFixed(2) + '%'
      });
    } else {
      setResults({});
    }
  }, [marketPricePerShare, earningsPerShare, dividendsPerShare, bookValuePerShare]);

  const resetCalculator = () => {
    setMarketPricePerShare(50);
    setEarningsPerShare(5);
    setDividendsPerShare(1.5);
    setBookValuePerShare(25);
    setResults({});
  };

  const getInterpretation = (ratioType: string, value: number) => {
    switch (ratioType) {
      case 'priceToEarningsRatio':
        if (value < 15) return "Potentially undervalued - Low P/E";
        if (value < 25) return "Fairly valued - Reasonable P/E";
        if (value < 35) return "Premium valuation - High P/E";
        return "Expensive - Very high P/E ratio";
      case 'dividendYield':
        if (value > 4) return "High yield - Attractive for income investors";
        if (value > 2) return "Moderate yield - Decent income";
        if (value > 1) return "Low yield - Limited income focus";
        return "Very low yield - Growth focus";
      case 'priceToBookRatio':
        if (value < 1.5) return "Potentially undervalued - Below book value";
        if (value < 3) return "Fairly valued - Reasonable P/B";
        if (value < 5) return "Premium valuation - High P/B";
        return "Expensive - Very high P/B ratio";
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.stockDetails}</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.marketPricePerShare}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={marketPricePerShare}
                    onChange={(e) => setMarketPricePerShare(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    min="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.earningsPerShare}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={earningsPerShare}
                    onChange={(e) => setEarningsPerShare(Number(e.target.value) || 0.01)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    min="0.01"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.dividendsPerShare}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={dividendsPerShare}
                    onChange={(e) => setDividendsPerShare(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.bookValuePerShare}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={bookValuePerShare}
                    onChange={(e) => setBookValuePerShare(Number(e.target.value) || 0.01)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.01"
                    min="0.01"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                if (earningsPerShare > 0 && bookValuePerShare > 0) {
                  const priceToEarningsRatio = marketPricePerShare / earningsPerShare;
                  const dividendYield = (dividendsPerShare / marketPricePerShare) * 100;
                  const priceToBookRatio = marketPricePerShare / bookValuePerShare;
                  const earningsYield = (earningsPerShare / marketPricePerShare) * 100;
                  const dividendPayoutRatio = (dividendsPerShare / earningsPerShare) * 100;

                  setResults({
                    priceToEarningsRatio: priceToEarningsRatio.toFixed(2),
                    dividendYield: dividendYield.toFixed(2) + '%',
                    priceToBookRatio: priceToBookRatio.toFixed(2),
                    earningsYield: earningsYield.toFixed(2) + '%',
                    dividendPayoutRatio: dividendPayoutRatio.toFixed(2) + '%'
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.stockRatios}</h3>

              {/* Stock Ratios */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.priceToEarningsRatio}</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {results.priceToEarningsRatio}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('priceToEarningsRatio', parseFloat(results.priceToEarningsRatio))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.dividendYield}</div>
                  <div className="text-2xl font-bold text-green-600">
                    {results.dividendYield}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('dividendYield', parseFloat(results.dividendYield))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.priceToBookRatio}</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {results.priceToBookRatio}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('priceToBookRatio', parseFloat(results.priceToBookRatio))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.earningsYield}</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {results.earningsYield}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.dividendPayoutRatio}</div>
                  <div className="text-2xl font-bold text-red-600">
                    {results.dividendPayoutRatio}
                  </div>
                </div>
              </div>

              {/* Interpretation Guide */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-sm font-semibold text-yellow-900 mb-2">{t.interpretation}</h4>
                <div className="text-xs text-yellow-700 space-y-1">
                  <div>{t.peLow}</div>
                  <div>{t.peFair}</div>
                  <div>{t.peHigh}</div>
                  <div>{t.dividendYieldHigh}</div>
                  <div>{t.pbUndervalued}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Calculate Stock Ratios</h3>
              <p className="text-gray-500">Enter stock data above to see valuation analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
