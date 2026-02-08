'use client';

import { useState, useEffect } from 'react';

interface ExpenseCalculatorProps {
  lang?: string;
}

export default function ExpenseCalculator({ lang = 'en' }: ExpenseCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Expense Calculator",
      description: "Track and manage your monthly expenses",
      monthlyIncomeExpenses: "Monthly Income & Expenses",
      income: "Income",
      expenses: "Expenses",
      monthlyIncome: "Monthly Income",
      rent: "Rent/Mortgage",
      utilities: "Utilities",
      groceries: "Groceries",
      transportation: "Transportation",
      entertainment: "Entertainment",
      healthcare: "Healthcare",
      other: "Other Expenses",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      totalIncome: "Total Income",
      totalExpenses: "Total Expenses",
      netIncome: "Net Income",
      expenseBreakdown: "Expense Breakdown",
      savingsPotential: "Savings Potential",
      budgetStatus: "Budget Status",
      currency: "$",
      positiveCashFlow: "Positive cash flow! You have",
      leftAfterExpenses: "left after expenses.",
      negativeCashFlow: "Negative cash flow! You're overspending by",
      overspending: "."
    },
    es: {
      title: "Calculadora de Gastos",
      description: "Rastrea y gestiona tus gastos mensuales",
      monthlyIncomeExpenses: "Ingresos y Gastos Mensuales",
      income: "Ingresos",
      expenses: "Gastos",
      monthlyIncome: "Ingreso Mensual",
      rent: "Renta/Hipoteca",
      utilities: "Servicios Públicos",
      groceries: "Comestibles",
      transportation: "Transporte",
      entertainment: "Entretenimiento",
      healthcare: "Salud",
      other: "Otros Gastos",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      totalIncome: "Ingreso Total",
      totalExpenses: "Gastos Totales",
      netIncome: "Ingreso Neto",
      expenseBreakdown: "Desglose de Gastos",
      savingsPotential: "Potencial de Ahorro",
      budgetStatus: "Estado del Presupuesto",
      currency: "$",
      positiveCashFlow: "¡Flujo de efectivo positivo! Tienes",
      leftAfterExpenses: "después de gastos.",
      negativeCashFlow: "¡Flujo de efectivo negativo! Estás gastando de más",
      overspending: "."
    },
    pt: {
      title: "Calculadora de Despesas",
      description: "Acompanhe e gerencie suas despesas mensais",
      monthlyIncomeExpenses: "Renda e Despesas Mensais",
      income: "Renda",
      expenses: "Despesas",
      monthlyIncome: "Renda Mensal",
      rent: "Aluguel/Hipoteca",
      utilities: "Utilidades",
      groceries: "Mercado",
      transportation: "Transporte",
      entertainment: "Entretenimento",
      healthcare: "Saúde",
      other: "Outras Despesas",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      totalIncome: "Renda Total",
      totalExpenses: "Despesas Totais",
      netIncome: "Renda Líquida",
      expenseBreakdown: "Detalhamento de Despesas",
      savingsPotential: "Potencial de Poupança",
      budgetStatus: "Status do Orçamento",
      currency: "R$",
      positiveCashFlow: "Fluxo de caixa positivo! Você tem",
      leftAfterExpenses: "restante após despesas.",
      negativeCashFlow: "Fluxo de caixa negativo! Você está gastando a mais",
      overspending: "."
    },
    fr: {
      title: "Calculateur de Dépenses",
      description: "Suivez et gérez vos dépenses mensuelles",
      monthlyIncomeExpenses: "Revenus et Dépenses Mensuels",
      income: "Revenus",
      expenses: "Dépenses",
      monthlyIncome: "Revenus Mensuels",
      rent: "Loyer/Hypothèque",
      utilities: "Services Publics",
      groceries: "Courses",
      transportation: "Transport",
      entertainment: "Divertissement",
      healthcare: "Santé",
      other: "Autres Dépenses",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      totalIncome: "Revenus Totaux",
      totalExpenses: "Dépenses Totales",
      netIncome: "Revenus Nets",
      expenseBreakdown: "Décomposition des Dépenses",
      savingsPotential: "Potentiel d'Épargne",
      budgetStatus: "Statut du Budget",
      currency: "€",
      positiveCashFlow: "Flux de trésorerie positif! Vous avez",
      leftAfterExpenses: "restant après dépenses.",
      negativeCashFlow: "Flux de trésorerie négatif! Vous dépensez trop de",
      overspending: "."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [rent, setRent] = useState(1500);
  const [utilities, setUtilities] = useState(200);
  const [groceries, setGroceries] = useState(400);
  const [transportation, setTransportation] = useState(300);
  const [entertainment, setEntertainment] = useState(200);
  const [healthcare, setHealthcare] = useState(150);
  const [other, setOther] = useState(100);
  const [results, setResults] = useState<any>({});

  // Calculate expenses
  useEffect(() => {
    const totalIncome = monthlyIncome;
    const totalExpenses = rent + utilities + groceries + transportation + entertainment + healthcare + other;
    const netIncome = totalIncome - totalExpenses;

    setResults({
      totalIncome,
      totalExpenses,
      netIncome,
      expenseBreakdown: {
        rent,
        utilities,
        groceries,
        transportation,
        entertainment,
        healthcare,
        other
      }
    });
  }, [monthlyIncome, rent, utilities, groceries, transportation, entertainment, healthcare, other]);

  const resetCalculator = () => {
    setMonthlyIncome(5000);
    setRent(1500);
    setUtilities(200);
    setGroceries(400);
    setTransportation(300);
    setEntertainment(200);
    setHealthcare(150);
    setOther(100);
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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t.monthlyIncomeExpenses}</h3>

          {/* Income */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-green-700 mb-2">{t.income}</h4>
            <div>
              <label className="block text-xs text-gray-600 mb-1">{t.monthlyIncome}</label>
              <div className="relative">
                <span className="absolute left-2 top-1 text-gray-500 text-sm">{t.currency}</span>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                  className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
                  min="0"
                  step="100"
                />
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-red-700 mb-2">{t.expenses}</h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">{t.rent}</label>
                <div className="relative">
                  <span className="absolute left-2 top-1 text-gray-500 text-sm">{t.currency}</span>
                  <input
                    type="number"
                    value={rent}
                    onChange={(e) => setRent(Number(e.target.value) || 0)}
                    className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    min="0"
                    step="50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">{t.utilities}</label>
                <div className="relative">
                  <span className="absolute left-2 top-1 text-gray-500 text-sm">{t.currency}</span>
                  <input
                    type="number"
                    value={utilities}
                    onChange={(e) => setUtilities(Number(e.target.value) || 0)}
                    className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    min="0"
                    step="10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">{t.groceries}</label>
                <div className="relative">
                  <span className="absolute left-2 top-1 text-gray-500 text-sm">{t.currency}</span>
                  <input
                    type="number"
                    value={groceries}
                    onChange={(e) => setGroceries(Number(e.target.value) || 0)}
                    className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    min="0"
                    step="25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">{t.transportation}</label>
                <div className="relative">
                  <span className="absolute left-2 top-1 text-gray-500 text-sm">{t.currency}</span>
                  <input
                    type="number"
                    value={transportation}
                    onChange={(e) => setTransportation(Number(e.target.value) || 0)}
                    className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    min="0"
                    step="25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">{t.entertainment}</label>
                <div className="relative">
                  <span className="absolute left-2 top-1 text-gray-500 text-sm">{t.currency}</span>
                  <input
                    type="number"
                    value={entertainment}
                    onChange={(e) => setEntertainment(Number(e.target.value) || 0)}
                    className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    min="0"
                    step="25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">{t.healthcare}</label>
                <div className="relative">
                  <span className="absolute left-2 top-1 text-gray-500 text-sm">{t.currency}</span>
                  <input
                    type="number"
                    value={healthcare}
                    onChange={(e) => setHealthcare(Number(e.target.value) || 0)}
                    className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    min="0"
                    step="25"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-xs text-gray-600 mb-1">{t.other}</label>
                <div className="relative">
                  <span className="absolute left-2 top-1 text-gray-500 text-sm">{t.currency}</span>
                  <input
                    type="number"
                    value={other}
                    onChange={(e) => setOther(Number(e.target.value) || 0)}
                    className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                    min="0"
                    step="25"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                const totalIncome = monthlyIncome;
                const totalExpenses = rent + utilities + groceries + transportation + entertainment + healthcare + other;
                const netIncome = totalIncome - totalExpenses;

                setResults({
                  totalIncome,
                  totalExpenses,
                  netIncome,
                  expenseBreakdown: {
                    rent,
                    utilities,
                    groceries,
                    transportation,
                    entertainment,
                    healthcare,
                    other
                  }
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
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="text-xs text-green-700 font-medium mb-1">{t.totalIncome}</div>
                  <div className="text-lg font-bold text-green-800">{formatCurrency(results.totalIncome)}</div>
                </div>

                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="text-xs text-red-700 font-medium mb-1">{t.totalExpenses}</div>
                  <div className="text-lg font-bold text-red-800">{formatCurrency(results.totalExpenses)}</div>
                </div>

                <div className={`p-3 rounded-lg border ${
                  results.netIncome >= 0
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-orange-50 border-orange-200'
                }`}>
                  <div className={`text-xs font-medium mb-1 ${
                    results.netIncome >= 0 ? 'text-blue-700' : 'text-orange-700'
                  }`}>
                    {t.netIncome}
                  </div>
                  <div className={`text-lg font-bold ${
                    results.netIncome >= 0 ? 'text-blue-800' : 'text-orange-800'
                  }`}>
                    {formatCurrency(results.netIncome)}
                  </div>
                </div>
              </div>

              {/* Expense Breakdown */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {t.expenseBreakdown}
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-600 mb-1">{t.rent}</div>
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(results.expenseBreakdown.rent)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">{t.utilities}</div>
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(results.expenseBreakdown.utilities)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-600 mb-1">{t.groceries}</div>
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(results.expenseBreakdown.groceries)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">{t.transportation}</div>
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(results.expenseBreakdown.transportation)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-600 mb-1">{t.entertainment}</div>
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(results.expenseBreakdown.entertainment)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">{t.healthcare}</div>
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(results.expenseBreakdown.healthcare)}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-600 mb-1">{t.other}</div>
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(results.expenseBreakdown.other)}</div>
                  </div>
                </div>
              </div>

              {/* Budget Analysis */}
              <div className={`p-4 rounded-lg border ${
                results.netIncome >= 0
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <h4 className="font-bold mb-2 text-sm flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    results.netIncome >= 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  {t.budgetStatus}
                </h4>

                <div className="text-sm">
                  {results.netIncome >= 0 ? (
                    <div className="text-green-700">
                      {t.positiveCashFlow} {formatCurrency(results.netIncome)} {t.leftAfterExpenses}
                      Consider saving or investing this surplus.
                    </div>
                  ) : (
                    <div className="text-red-700">
                      {t.negativeCashFlow} {formatCurrency(Math.abs(results.netIncome))}{t.overspending}
                      Consider reducing expenses or increasing income.
                    </div>
                  )}
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
              <h3 className="text-lg font-medium text-gray-900 mb-1">Track Your Expenses</h3>
              <p className="text-gray-500">Enter your income and expenses above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}