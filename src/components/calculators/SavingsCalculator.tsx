'use client';

import { useState, useEffect } from 'react';

interface SavingsCalculatorProps {
  lang?: string;
}

export default function SavingsCalculator({ lang = 'en' }: SavingsCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Savings Calculator",
      description: "Calculate how your savings grow with compound interest over time",
      savingsDetails: "Savings Details",
      savingsResults: "Savings Results",
      initialDeposit: "Initial Deposit",
      monthlyContribution: "Monthly Contribution",
      annualInterestRate: "Annual Interest Rate (%)",
      savingsPeriod: "Savings Period (Years)",
      compoundFrequency: "Compound Frequency",
      futureValue: "Future Value",
      totalContributions: "Total Contributions",
      totalInterest: "Total Interest Earned",
      calculate: "Calculate",
      reset: "Reset",
      annually: "Annually",
      semiAnnually: "Semi-Annually",
      quarterly: "Quarterly",
      monthly: "Monthly",
      currency: "$",
      savingstip: "💡 Savings Tip",
      initialdeposit: "Initial Deposit:",
      monthlycontributions: "Monthly Contributions:",
      interestearned: "Interest Earned:",
      growthbreakdown: "Growth Breakdown",
      growyoursavings: "Grow Your Savings",
  },
    es: {
      title: "Calculadora de Ahorros",
      description: "Calcula cómo crecen tus ahorros con interés compuesto a lo largo del tiempo",
      savingsDetails: "Detalles de Ahorros",
      savingsResults: "Resultados de Ahorros",
      initialDeposit: "Depósito Inicial",
      monthlyContribution: "Contribución Mensual",
      annualInterestRate: "Tasa de Interés Anual (%)",
      savingsPeriod: "Período de Ahorro (Años)",
      compoundFrequency: "Frecuencia de Capitalización",
      futureValue: "Valor Futuro",
      totalContributions: "Contribuciones Totales",
      totalInterest: "Intereses Totales Ganados",
      calculate: "Calcular",
      reset: "Reiniciar",
      annually: "Anual",
      semiAnnually: "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensual",
      currency: "$",
      savingstip: "💡 Consejo de Ahorro",
      initialdeposit: "Depósito Inicial:",
      monthlycontributions: "Contribuciones Mensuales:",
      interestearned: "Interés Ganado:",
      growthbreakdown: "Desglose de Crecimiento",
      growyoursavings: "Haz Crecer tus Ahorros",
  },
    pt: {
      title: "Calculadora de Poupança",
      description: "Calcule como suas economias crescem com juros compostos ao longo do tempo",
      savingsDetails: "Detalhes da Poupança",
      savingsResults: "Resultados da Poupança",
      initialDeposit: "Depósito Inicial",
      monthlyContribution: "Contribuição Mensal",
      annualInterestRate: "Taxa de Juros Anual (%)",
      savingsPeriod: "Período de Poupança (Anos)",
      compoundFrequency: "Frequência de Capitalização",
      futureValue: "Valor Futuro",
      totalContributions: "Contribuições Totais",
      totalInterest: "Juros Totais Ganhos",
      calculate: "Calcular",
      reset: "Reiniciar",
      annually: "Anual",
      semiAnnually: "Semi-Anual",
      quarterly: "Trimestral",
      monthly: "Mensal",
      currency: "R$",
      savingstip: "💡 Dica de Poupança",
      initialdeposit: "Depósito Inicial:",
      monthlycontributions: "Contribuições Mensais:",
      interestearned: "Juros Ganhos:",
      growthbreakdown: "Análise de Crescimento",
      growyoursavings: "Faça Crescer suas Economias",
  },
    fr: {
      title: "Calculateur d'Épargne",
      description: "Calculez comment vos économies croissent avec les intérêts composés au fil du temps",
      savingsDetails: "Détails d'Épargne",
      savingsResults: "Résultats d'Épargne",
      initialDeposit: "Dépôt Initial",
      monthlyContribution: "Contribution Mensuelle",
      annualInterestRate: "Taux d'Intérêt Annuel (%)",
      savingsPeriod: "Période d'Épargne (Années)",
      compoundFrequency: "Fréquence de Capitalisation",
      futureValue: "Valeur Future",
      totalContributions: "Contributions Totales",
      totalInterest: "Intérêts Totaux Gagnés",
      calculate: "Calculer",
      reset: "Réinitialiser",
      annually: "Annuel",
      semiAnnually: "Semi-Annuel",
      quarterly: "Trimestriel",
      monthly: "Mensuel",
      currency: "€",
      savingstip: "💡 Conseil d'Épargne",
      initialdeposit: "Dépôt Initial:",
      monthlycontributions: "Contributions Mensuelles:",
      interestearned: "Intérêts Gagnés:",
      growthbreakdown: "Répartition de la Croissance",
      growyoursavings: "Faites Croître vos Économies",
  }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [initialDeposit, setInitialDeposit] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [annualInterestRate, setAnnualInterestRate] = useState(5);
  const [savingsPeriod, setSavingsPeriod] = useState(10);
  const [compoundFrequency, setCompoundFrequency] = useState(12);
  const [results, setResults] = useState<any>({});

  // Calculate compound interest
  useEffect(() => {
    if ((initialDeposit >= 0 || monthlyContribution > 0) && annualInterestRate >= 0 && savingsPeriod > 0) {
      const monthlyRate = annualInterestRate / 100 / 12;
      const numMonths = savingsPeriod * 12;

      // Future value calculation with regular contributions
      let futureValue = initialDeposit;
      let totalContributions = initialDeposit;

      for (let month = 1; month <= numMonths; month++) {
        // Add monthly contribution at the beginning of each month
        if (month > 1) {
          futureValue += monthlyContribution;
          totalContributions += monthlyContribution;
        }

        // Apply monthly compound interest
        futureValue *= (1 + monthlyRate);
      }

      const totalInterest = futureValue - totalContributions;

      setResults({
        futureValue: futureValue.toFixed(2),
        totalContributions: totalContributions.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      });
    } else {
      setResults({});
    }
  }, [initialDeposit, monthlyContribution, annualInterestRate, savingsPeriod, compoundFrequency]);

  const resetCalculator = () => {
    setInitialDeposit(1000);
    setMonthlyContribution(200);
    setAnnualInterestRate(5);
    setSavingsPeriod(10);
    setCompoundFrequency(12);
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
    <div>
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.savingsDetails}</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.initialDeposit}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="100"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.monthlyContribution}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="50"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.annualInterestRate}</label>
                <input
                  type="number"
                  value={annualInterestRate}
                  onChange={(e) => setAnnualInterestRate(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.1"
                  min="0"
                  max="20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.savingsPeriod}</label>
                <input
                  type="number"
                  value={savingsPeriod}
                  onChange={(e) => setSavingsPeriod(Number(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.compoundFrequency}</label>
              <select
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>{t.annually}</option>
                <option value={2}>{t.semiAnnually}</option>
                <option value={4}>{t.quarterly}</option>
                <option value={12}>{t.monthly}</option>
              </select>
            </div>
          </div>

          {/* Auto-calculation note */}
          <div className="pt-2 text-xs text-blue-600 text-center font-medium">
            📊 Calculations update automatically as you change values
          </div>

          {/* Buttons */}
          <div className="pt-3 flex gap-4">
            <button
              onClick={() => {
                // Force recalculation (though auto-calc handles this)
                setResults((prev: any) => ({ ...prev }));
              }}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
            >
              🔄 Recalculate
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
            >
              {t.reset}
            </button>
          </div>

          {/* Savings Tip */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="text-sm font-semibold text-green-900 mb-2">💡 Savings Tip</h4>
            <p className="text-xs text-green-700">
              Start saving early! Even small regular contributions can grow significantly with compound interest over time.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.savingsResults}</h3>

              {/* Future Value Result */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-2">{t.futureValue}</div>
                <div className="text-4xl font-bold text-green-800">
                  {formatCurrency(parseFloat(results.futureValue))}
                </div>
                <div className="text-xs text-green-600 mt-2">
                  After {savingsPeriod} years of saving
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">{t.totalContributions}</div>
                  <div className="text-2xl font-bold text-blue-800">
                    {formatCurrency(parseFloat(results.totalContributions))}
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 font-medium mb-1">{t.totalInterest}</div>
                  <div className="text-2xl font-bold text-purple-800">
                    {formatCurrency(parseFloat(results.totalInterest))}
                  </div>
                </div>
              </div>

              {/* Growth Visualization */}
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.growthbreakdown}</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div><strong>{t.initialdeposit}</strong> {formatCurrency(initialDeposit)}</div>
                  <div><strong>{t.monthlycontributions}</strong> {formatCurrency(monthlyContribution)} × {savingsPeriod * 12} months</div>
                  <div><strong>{t.interestearned}</strong> {formatCurrency(parseFloat(results.totalInterest))} ({((parseFloat(results.totalInterest) / parseFloat(results.totalContributions)) * 100).toFixed(1)}% of total)</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.growyoursavings}</h3>
              <p className="text-gray-500">Enter your savings details above to see compound growth</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}