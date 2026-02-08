'use client';

import { useState } from 'react';

interface EmergencyFundCalculatorProps {
  lang?: string;
}

export default function EmergencyFundCalculator({ lang = 'en' }: EmergencyFundCalculatorProps) {
    const resetCalculator = () => {
      setMonthlyExpenses(0);
      setCurrentSavings(0);
      setMonthsNeeded(3);
    };
  const translations = {
    en: {
      title: "Emergency Fund Calculator",
      monthlyExpenses: "Monthly Expenses ($)",
      currentSavings: "Current Emergency Savings ($)",
      monthsNeeded: "Months of Expenses Needed",
      calculate: "🔄 Recalculate",
      results: "Results",
      targetAmount: "Target Emergency Fund",
      stillNeed: "Still Need to Save",
      percentComplete: "Percent Complete",
      recommendation: "Recommendation",
      goodJob: "Great job! You have a fully funded emergency fund.",
      needMore: "Continue saving to reach your emergency fund goal.",
      reset: "Reset"
    },
    es: {
      title: "Calculadora de Fondo de Emergencia",
      monthlyExpenses: "Gastos Mensuales ($)",
      currentSavings: "Ahorros de Emergencia Actuales ($)",
      monthsNeeded: "Meses de Gastos Necesarios",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      targetAmount: "Fondo de Emergencia Objetivo",
      stillNeed: "Aún Necesitas Ahorrar",
      percentComplete: "Porcentaje Completado",
      recommendation: "Recomendación",
      goodJob: "¡Excelente trabajo! Tienes un fondo de emergencia completo.",
      needMore: "Continúa ahorrando para alcanzar tu objetivo de fondo de emergencia.",
      reset: "Restablecer"
    },
    fr: {
      title: "Calculateur de Fonds d'Urgence",
      monthlyExpenses: "Dépenses Mensuelles ($)",
      currentSavings: "Économies d'Urgence Actuelles ($)",
      monthsNeeded: "Mois de Dépenses Nécessaires",
      calculate: "🔄 Recalculer",
      results: "Résultats",
      targetAmount: "Fonds d'Urgence Cible",
      stillNeed: "Encore Besoin d'Économiser",
      percentComplete: "Pourcentage Complété",
      recommendation: "Recommandation",
      goodJob: "Excellent travail ! Vous avez un fonds d'urgence complet.",
      needMore: "Continuez à économiser pour atteindre votre objectif de fonds d'urgence.",
      reset: "Réinitialiser"
    },
    pt: {
      title: "Calculadora de Fundo de Emergência",
      monthlyExpenses: "Despesas Mensais ($)",
      currentSavings: "Poupança de Emergência Atual ($)",
      monthsNeeded: "Meses de Despesas Necessários",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      targetAmount: "Fundo de Emergência Alvo",
      stillNeed: "Ainda Precisa Economizar",
      percentComplete: "Porcentagem Completa",
      recommendation: "Recomendação",
      goodJob: "Ótimo trabalho! Você tem um fundo de emergência completo.",
      needMore: "Continue economizando para atingir seu objetivo de fundo de emergência.",
      reset: "Redefinir"
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(3000);
  const [currentSavings, setCurrentSavings] = useState<number>(5000);
  const [monthsNeeded, setMonthsNeeded] = useState<number>(6);
  const [calculated, setCalculated] = useState(false);

  const calculateEmergencyFund = () => {
    const targetAmount = monthlyExpenses * monthsNeeded;
    const stillNeed = Math.max(0, targetAmount - currentSavings);
    const percentComplete = Math.min(100, (currentSavings / targetAmount) * 100);

    return {
      targetAmount,
      stillNeed,
      percentComplete,
      isComplete: currentSavings >= targetAmount,
    };

  const resetCalculator = () => {
    // Reset calculator to initial values
    setMonthlyExpenses(0);
    setCurrentSavings(0);
    setMonthsNeeded(3);
  };
  };

  const results = calculateEmergencyFund();

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.monthlyExpenses}
            </label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.currentSavings}
            </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.monthsNeeded}
            </label>
            <input
              type="number"
              value={monthsNeeded}
              onChange={(e) => setMonthsNeeded(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {t.calculate}
        </button>
      </div>

      {calculated && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>

          <h3 className="text-2xl font-bold mb-6 text-gray-800">{t.results}</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.targetAmount}</div>
              <div className="text-3xl font-bold text-blue-600">
                ${results.targetAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.stillNeed}</div>
              <div className="text-3xl font-bold text-orange-600">
                ${results.stillNeed.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className={`${results.isComplete ? 'bg-green-50' : 'bg-yellow-50'} p-4 rounded-lg`}>
              <div className="text-sm text-gray-600 mb-1">{t.percentComplete}</div>
              <div className={`text-3xl font-bold ${results.isComplete ? 'text-green-600' : 'text-yellow-600'}`}>
                {results.percentComplete.toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className={`h-full ${results.isComplete ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-500`}
                style={{ width: `${Math.min(100, results.percentComplete)}%` }}
              ></div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-2">{t.recommendation}</h4>
            <p className={`${results.isComplete ? 'text-green-600' : 'text-orange-600'} font-medium`}>
              {results.isComplete ? `✓ ${t.goodJob}` : `⚠ ${t.needMore}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
