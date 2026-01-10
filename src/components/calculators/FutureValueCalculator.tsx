'use client';

import { useState, useEffect } from 'react';

interface FutureValueCalculatorProps {
  lang?: string;
}

export default function FutureValueCalculator({ lang = 'en' }: FutureValueCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Future Value Calculator",
      description: "Calculate the future value of your investments with compound interest",
      investmentDetails: "Investment Details",
      presentValue: "Present Value",
      interestRate: "Annual Interest Rate (%)",
      timePeriod: "Time Period (Years)",
      compoundingFrequency: "Compounding Frequency",
      calculate: "Calculate",
      reset: "Reset",
      futureValue: "Future Value",
      totalInterest: "Total Interest Earned",
      investmentGrowth: "Investment Growth",
      annually: "Annually",
      semiAnnually: "Semi-Annually",
      quarterly: "Quarterly",
      monthly: "Monthly",
      currency: "$"
    },
    es: {
      title: "Calculadora de Valor Futuro",
      description: "Calcula el valor futuro de tus inversiones con interés compuesto",
      investmentDetails: "Detalles de Inversión",
      presentValue: "Valor Presente",
      interestRate: "Tasa de Interés Anual (%)",
      timePeriod: "Período de Tiempo (Años)",
      compoundingFrequency: "Frecuencia de Capitalización",
      calculate: "Calcular",
      reset: "Reiniciar",
      futureValue: "Valor Futuro",
      totalInterest: "Interés Total Ganado",
      investmentGrowth: "Crecimiento de Inversión",
      annually: "Anual",
      semiAnnually: "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensual",
      currency: "$"
    },
    pt: {
      title: "Calculadora de Valor Futuro",
      description: "Calcule o valor futuro de seus investimentos com juros compostos",
      investmentDetails: "Detalhes do Investimento",
      presentValue: "Valor Presente",
      interestRate: "Taxa de Juros Anual (%)",
      timePeriod: "Período de Tempo (Anos)",
      compoundingFrequency: "Frequência de Capitalização",
      calculate: "Calcular",
      reset: "Reiniciar",
      futureValue: "Valor Futuro",
      totalInterest: "Juros Totais Ganhos",
      investmentGrowth: "Crescimento do Investimento",
      annually: "Anual",
      semiAnnually: "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensal",
      currency: "R$"
    },
    fr: {
      title: "Calculateur de Valeur Future",
      description: "Calculez la valeur future de vos investissements avec intérêts composés",
      investmentDetails: "Détails d'Investissement",
      presentValue: "Valeur Présente",
      interestRate: "Taux d'Intérêt Annuel (%)",
      timePeriod: "Période de Temps (Années)",
      compoundingFrequency: "Fréquence de Capitalisation",
      calculate: "Calculer",
      reset: "Réinitialiser",
      futureValue: "Valeur Future",
      totalInterest: "Intérêts Totaux Gagnés",
      investmentGrowth: "Croissance d'Investissement",
      annually: "Annuel",
      semiAnnually: "Semi-Annuel",
      quarterly: "Trimestriel",
      monthly: "Mensuel",
      currency: "€"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [presentValue, setPresentValue] = useState(10000);
  const [interestRate, setInterestRate] = useState(7);
  const [timePeriod, setTimePeriod] = useState(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState(12);
  const [results, setResults] = useState<any>({});

  // Calculate future value
  useEffect(() => {
    if (presentValue > 0 && interestRate > 0 && timePeriod > 0) {
      const rate = interestRate / 100 / compoundingFrequency;
      const periods = timePeriod * compoundingFrequency;

      const futureValue = presentValue * Math.pow(1 + rate, periods);
      const totalInterest = futureValue - presentValue;

      setResults({
        futureValue: futureValue.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      });
    } else {
      setResults({});
    }
  }, [presentValue, interestRate, timePeriod, compoundingFrequency]);

  const resetCalculator = () => {
    setPresentValue(10000);
    setInterestRate(7);
    setTimePeriod(10);
    setCompoundingFrequency(12);
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

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t.investmentDetails}</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.presentValue}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={presentValue}
                  onChange={(e) => setPresentValue(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="1000"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.interestRate}</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.1"
                min="0"
                max="50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.timePeriod}</label>
                <input
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
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
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                if (presentValue > 0 && interestRate > 0 && timePeriod > 0) {
                  const rate = interestRate / 100 / compoundingFrequency;
                  const periods = timePeriod * compoundingFrequency;
                  const futureValue = presentValue * Math.pow(1 + rate, periods);
                  const totalInterest = futureValue - presentValue;

                  setResults({
                    futureValue: futureValue.toFixed(2),
                    totalInterest: totalInterest.toFixed(2)
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

          {/* Formula Display */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Future Value Formula</h4>
            <div className="text-xs text-blue-700 font-mono">
              FV = PV × (1 + r/n)^(n×t)
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Where: FV = Future Value, PV = Present Value, r = Annual Rate, n = Compounding Frequency, t = Time
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              {/* Future Value Result */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-2">{t.futureValue}</div>
                <div className="text-4xl font-bold text-green-800">
                  {formatCurrency(parseFloat(results.futureValue))}
                </div>
                <div className="text-xs text-green-600 mt-2">
                  Investment value after {timePeriod} years
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.totalInterest}</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatCurrency(parseFloat(results.totalInterest))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.presentValue}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatCurrency(presentValue)}
                  </div>
                </div>
              </div>

              {/* Growth Visualization */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.investmentGrowth}</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div><strong>Initial Investment:</strong> {formatCurrency(presentValue)}</div>
                  <div><strong>Interest Earned:</strong> {formatCurrency(parseFloat(results.totalInterest))}</div>
                  <div><strong>Final Amount:</strong> {formatCurrency(parseFloat(results.futureValue))}</div>
                  <div><strong>Growth Rate:</strong> {((parseFloat(results.totalInterest) / presentValue) * 100).toFixed(1)}% total return</div>
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
              <h3 className="text-lg font-medium text-gray-900 mb-1">Calculate Future Value</h3>
              <p className="text-gray-500">Enter your investment details above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}