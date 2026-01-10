'use client';

import { useState, useEffect } from 'react';

interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: number;
  min?: number;
  step?: number;
}

interface CalculatorOutput {
  label: string;
  default: string;
  format: string;
}

interface AdditionalOutput {
  label: string;
  field: string;
  format: string;
}

interface BudgetCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
  lang?: string;
}

export default function BudgetCalculator({ inputs, output, additionalOutputs, lang = 'en' }: BudgetCalculatorProps) {
  // Embedded translations following CALCULATOR_CREATION_AGENT.md approach
  const translations = {
    en: {
      monthlyBudget: "Monthly Budget",
      budgetAnalysis: "Budget Analysis",
      monthlyExpenses: "Monthly Expenses",
      budgetSurplus: "Budget Surplus",
      balancedBudget: "Balanced Budget",
      budgetDeficit: "Budget Deficit",
      budgetStatus: "Budget Status",
      expenseBreakdown: "Expense Breakdown",
      totalExpenses: "Total Expenses",
      surplus: "surplus",
      balanced: "balanced",
      deficit: "deficit",
      string: "string",
      unknown: "Unknown",
  },
    es: {
      monthlyBudget: "Presupuesto Mensual",
      budgetAnalysis: "Análisis Presupuestario",
      monthlyExpenses: "Gastos Mensuales",
      budgetSurplus: "Superávit Presupuestario",
      balancedBudget: "Presupuesto Equilibrado",
      budgetDeficit: "Déficit Presupuestario",
      budgetStatus: "Estado del Presupuesto",
      expenseBreakdown: "Desglose de Gastos",
      totalExpenses: "Gastos Totales",
      surplus: "surplus",
      balanced: "balanced",
      deficit: "deficit",
      string: "string",
      unknown: "Unknown"
    },
    pt: {
      monthlyBudget: "Orçamento Mensal",
      budgetAnalysis: "Análise Orçamentária",
      monthlyExpenses: "Despesas Mensais",
      budgetSurplus: "Superávit Orçamentário",
      balancedBudget: "Orçamento Equilibrado",
      budgetDeficit: "Déficit Orçamentário",
      budgetStatus: "Status do Orçamento",
      expenseBreakdown: "Detalhamento de Despesas",
      totalExpenses: "Despesas Totais",
        surplus: "surplus",
      balanced: "balanced",
      deficit: "deficit",
      string: "string",
      unknown: "Unknown"
    },
    fr: {
      monthlyBudget: "Budget Mensuel",
      budgetAnalysis: "Analyse Budgétaire",
      monthlyExpenses: "Dépenses Mensuelles",
      budgetSurplus: "Excédent Budgétaire",
      balancedBudget: "Budget Équilibré",
      budgetDeficit: "Déficit Budgétaire",
      budgetStatus: "Statut du Budget",
      expenseBreakdown: "Détail des Dépenses",
      totalExpenses: "Dépenses Totales",
      surplus: "surplus",
      balanced: "balanced",
      deficit: "deficit",
      string: "string",
      unknown: "Unknown"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, any>>({});

  // Calculate budget
  useEffect(() => {
    const calculateBudget = () => {
      const income = values.monthlyIncome || 0;

      // Calculate total expenses
      const expenses = {
        housing: values.housing || 0,
        utilities: values.utilities || 0,
        groceries: values.groceries || 0,
        transportation: values.transportation || 0,
        insurance: values.insurance || 0,
        debtPayments: values.debtPayments || 0,
        entertainment: values.entertainment || 0,
        miscellaneous: values.miscellaneous || 0
      };

      const totalExpenses = Object.values(expenses).reduce((sum, amount) => sum + amount, 0);
      const balance = income - totalExpenses;
      const savingsGoal = values.savingsGoal || 0;
      const savingsPotential = balance - savingsGoal;

      // Calculate percentages
      const expensePercentages = Object.entries(expenses).map(([category, amount]) => ({
        category,
        amount,
        percentage: income > 0 ? ((amount / income) * 100).toFixed(1) : '0'
      }));

      setResults({
        balance: balance >= 0 ? `$${balance.toFixed(2)}` : `-$${Math.abs(balance).toFixed(2)}`,
        totalExpenses: `$${totalExpenses.toFixed(2)}`,
        savingsPotential: savingsPotential >= 0 ? `$${savingsPotential.toFixed(2)}` : `-$${Math.abs(savingsPotential).toFixed(2)}`,
        expenseBreakdown: expensePercentages,
        budgetStatus: balance >= savingsGoal ? 'surplus' : balance >= 0 ? 'balanced' : 'deficit'
      });
    };

    calculateBudget();
  }, [values]);

  const handleInputChange = (name: string, value: number) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'surplus': return 'text-green-600 bg-green-50 border-green-200';
      case 'balanced': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'deficit': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'surplus': return t.budgetSurplus;
      case 'balanced': return t.balancedBudget;
      case 'deficit': return t.budgetDeficit;
      default: return t.budgetStatus;
    }
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Inputs */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">{t.monthlyBudget}</h3>

          {/* Income */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {inputs[0]?.label}
            </label>
            <input
              type="number"
              value={values.monthlyIncome || ''}
              onChange={(e) => handleInputChange('monthlyIncome', parseFloat(e.target.value) || 0)}
              min={inputs[0]?.min}
              step={inputs[0]?.step}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm font-medium bg-green-50"
            />
          </div>

          {/* Expenses */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">{t.monthlyExpenses}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inputs.slice(1, -1).map((input) => (
                <div key={input.name} className="space-y-2">
                  <label className="block text-xs font-medium text-gray-600">
                    {input.label}
                  </label>
                  <input
                    type="number"
                    value={values[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value) || 0)}
                    min={input.min}
                    step={input.step}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">{t.budgetAnalysis}</h3>

          {/* Main Balance */}
          <div className={`p-3 sm:p-4 rounded-lg border-l-4 ${results.budgetStatus === 'surplus' ? 'bg-green-50 border-green-500' : results.budgetStatus === 'deficit' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'}`}>
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className={`text-xl sm:text-2xl font-bold ${results.budgetStatus === 'surplus' ? 'text-green-600' : results.budgetStatus === 'deficit' ? 'text-red-600' : 'text-yellow-600'}`}>
              {results.balance || output.default}
            </div>
            <div className={`text-xs font-medium mt-1 ${getStatusColor(results.budgetStatus)} px-2 py-1 rounded inline-block`}>
              {getStatusText(results.budgetStatus)}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {additionalOutputs.map((additionalOutput) => (
              <div key={additionalOutput.field} className="bg-white border border-gray-200 p-2 rounded-md shadow-sm">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  {additionalOutput.label.replace('Monthly ', '')}
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {typeof results[additionalOutput.field] === 'string' || typeof results[additionalOutput.field] === 'number'
                    ? results[additionalOutput.field]
                    : '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Expense Breakdown */}
          {results.expenseBreakdown && (
            <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
{t.expenseBreakdown}
              </h4>
              <div className="space-y-2">
                {results.expenseBreakdown.map((expense: any, index: number) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="capitalize text-gray-700">
                      {typeof expense.category === 'string' ? expense.category.replace(/([A-Z])/g, ' $1') : 'Unknown'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">${typeof expense.amount === 'number' ? expense.amount.toFixed(2) : '0.00'}</span>
                      <span className="text-gray-500">({typeof expense.percentage === 'string' ? expense.percentage : '0'}%)</span>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span>{t.totalExpenses}</span>
                    <span>{results.totalExpenses}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
