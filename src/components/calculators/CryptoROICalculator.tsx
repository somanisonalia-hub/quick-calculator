'use client';

import { useState, useEffect } from 'react';

interface CryptoROICalculatorProps {
  lang?: string;
}

export default function CryptoROICalculator({ lang = 'en' }: CryptoROICalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Crypto ROI Calculator",
      description: "Calculate return on investment for cryptocurrency investments",
      initialInvestment: "Initial Investment",
      currentValue: "Current Value",
      roiAnalysis: "ROI Analysis",
      returnOnInvestment: "Return on Investment (ROI)",
      profitLoss: "Profit/Loss",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      percentage: "%",
      currency: "$",
      understandingCryptoROI: "Understanding Crypto ROI",
      roiFormula: "ROI Formula: Measures investment performance as a percentage",
      positiveROI: "Positive ROI: Investment gained value",
      negativeROI: "Negative ROI: Investment lost value",
      volatility: "Volatility: Crypto investments can be highly volatile"
    },
    es: {
      title: "Calculadora de ROI de Cripto",
      description: "Calcula retorno de inversión para inversiones en criptomonedas",
      initialInvestment: "Inversión Inicial",
      currentValue: "Valor Actual",
      roiAnalysis: "Análisis de ROI",
      returnOnInvestment: "Retorno de Inversión (ROI)",
      profitLoss: "Ganancia/Pérdida",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      percentage: "%",
      currency: "$",
      understandingCryptoROI: "Entendiendo el ROI de Cripto",
      roiFormula: "Fórmula ROI: Mide el rendimiento de inversión como porcentaje",
      positiveROI: "ROI Positivo: La inversión ganó valor",
      negativeROI: "ROI Negativo: La inversión perdió valor",
      volatility: "Volatilidad: Inversiones cripto pueden ser altamente volátiles"
    },
    pt: {
      title: "Calculadora de ROI de Cripto",
      description: "Calcule retorno de investimento para investimentos em criptomoedas",
      initialInvestment: "Investimento Inicial",
      currentValue: "Valor Atual",
      roiAnalysis: "Análise de ROI",
      returnOnInvestment: "Retorno de Investimento (ROI)",
      profitLoss: "Lucro/Prejuízo",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      percentage: "%",
      currency: "R$",
      understandingCryptoROI: "Entendendo o ROI de Cripto",
      roiFormula: "Fórmula ROI: Mede o desempenho do investimento como porcentagem",
      positiveROI: "ROI Positivo: O investimento ganhou valor",
      negativeROI: "ROI Negativo: O investimento perdeu valor",
      volatility: "Volatilidade: Investimentos em cripto podem ser altamente voláteis"
    },
    fr: {
      title: "Calculateur de ROI Crypto",
      description: "Calculez le retour sur investissement pour les investissements en cryptomonnaie",
      initialInvestment: "Investissement Initial",
      currentValue: "Valeur Actuelle",
      roiAnalysis: "Analyse ROI",
      returnOnInvestment: "Retour sur Investissement (ROI)",
      profitLoss: "Profit/Perte",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      percentage: "%",
      currency: "€",
      understandingCryptoROI: "Comprendre le ROI Crypto",
      roiFormula: "Formule ROI: Mesure la performance de l'investissement en pourcentage",
      positiveROI: "ROI Positif: L'investissement a gagné de la valeur",
      negativeROI: "ROI Négatif: L'investissement a perdu de la valeur",
      volatility: "Volatilité: Les investissements crypto peuvent être très volatils"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [currentValue, setCurrentValue] = useState(15000);
  const [results, setResults] = useState<any>({});

  // Auto-calculate when inputs change
  useEffect(() => {
    if (initialInvestment <= 0 || currentValue < 0) {
      setResults({});
      return;
    }

    // Calculate profit/loss
    const profitLoss = currentValue - initialInvestment;

    // Calculate ROI percentage
    const roiPercentage = (profitLoss / initialInvestment) * 100;

    setResults({
      profitLoss,
      roiPercentage: roiPercentage.toFixed(2) + '%',
      currentValue
    });
  }, [initialInvestment, currentValue]);

  const calculateROI = () => {
    // This is now called only by the manual button
    if (initialInvestment <= 0 || currentValue < 0) {
      setResults({});
      return;
    }

    const profitLoss = currentValue - initialInvestment;
    const roiPercentage = (profitLoss / initialInvestment) * 100;

    setResults({
      profitLoss,
      roiPercentage: roiPercentage.toFixed(2) + '%',
      currentValue
    });
  };

  const resetCalculator = () => {
    setInitialInvestment(10000);
    setCurrentValue(15000);
    setResults({});
  };

  const getROIColor = (roi: string) => {
    const value = parseFloat(roi.replace('%', ''));
    if (value > 0) return 'border-green-500 bg-green-50';
    if (value < 0) return 'border-red-500 bg-red-50';
    return 'border-gray-500 bg-gray-50';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.initialInvestment}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  step="100"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.currentValue}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  step="100"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateROI}
              className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-orange-900 mb-2">ROI Formula</h4>
            <div className="text-xs text-orange-700 font-mono">
              ROI = (Current Value - Initial Investment) ÷ Initial Investment × 100
            </div>
            <div className="text-xs text-orange-600 mt-1">
              Positive ROI indicates profit, negative indicates loss
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              {/* Main ROI Result */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
                <div className="text-sm text-orange-700 font-medium mb-2">{t.returnOnInvestment}</div>
                <div className="text-4xl font-bold text-orange-800">
                  {results.roiPercentage}
                </div>
                <div className="text-xs text-orange-600 mt-2">
                  {results.roiPercentage.includes('+') ? 'Gain' : results.roiPercentage.includes('-') ? 'Loss' : 'Break even'}
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.profitLoss}</div>
                  <div className={`text-lg font-bold ${results.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.profitLoss)}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.currentValue}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatCurrency(results.currentValue)}
                  </div>
                </div>
              </div>

              {/* Educational Info */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.understandingCryptoROI}</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div>{t.roiFormula}</div>
                  <div>{t.positiveROI}</div>
                  <div>{t.negativeROI}</div>
                  <div>{t.volatility}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Calculate Your Crypto ROI</h3>
              <p className="text-gray-500">Enter your initial investment and current value above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}