'use client';

import { useState } from 'react';

interface SavingsGoalCalculatorProps {
  lang?: string;
}

export default function SavingsGoalCalculator({ lang = 'en' }: SavingsGoalCalculatorProps) {
  const translations = {
    en: {
      title: "Savings Goal Calculator",
      goalAmount: "Savings Goal ($)",
      currentSavings: "Current Savings ($)",
      monthlyContribution: "Monthly Contribution ($)",
      annualReturn: "Expected Annual Return (%)",
      calculate: "Calculate Timeline",
      results: "Results",
      monthsToGoal: "Months to Reach Goal",
      yearsToGoal: "Years to Reach Goal",
      totalContributions: "Total Contributions Needed",
      totalEarnings: "Total Investment Earnings",
      onTrack: "You're on track to reach your goal!",
    },
    es: {
      title: "Calculadora de Meta de Ahorro",
      goalAmount: "Meta de Ahorro ($)",
      currentSavings: "Ahorros Actuales ($)",
      monthlyContribution: "Contribución Mensual ($)",
      annualReturn: "Rendimiento Anual Esperado (%)",
      calculate: "Calcular Cronología",
      results: "Resultados",
      monthsToGoal: "Meses para Alcanzar la Meta",
      yearsToGoal: "Años para Alcanzar la Meta",
      totalContributions: "Contribuciones Totales Necesarias",
      totalEarnings: "Ganancias Totales de Inversión",
      onTrack: "¡Estás en camino de alcanzar tu meta!",
    },
    fr: {
      title: "Calculateur d'Objectif d'Épargne",
      goalAmount: "Objectif d'Épargne ($)",
      currentSavings: "Épargne Actuelle ($)",
      monthlyContribution: "Cotisation Mensuelle ($)",
      annualReturn: "Rendement Annuel Prévu (%)",
      calculate: "Calculer le Calendrier",
      results: "Résultats",
      monthsToGoal: "Mois pour Atteindre l'Objectif",
      yearsToGoal: "Années pour Atteindre l'Objectif",
      totalContributions: "Cotisations Totales Nécessaires",
      totalEarnings: "Gains Totaux d'Investissement",
      onTrack: "Vous êtes sur la bonne voie pour atteindre votre objectif !",
    },
    pt: {
      title: "Calculadora de Meta de Poupança",
      goalAmount: "Meta de Poupança ($)",
      currentSavings: "Poupança Atual ($)",
      monthlyContribution: "Contribuição Mensal ($)",
      annualReturn: "Retorno Anual Esperado (%)",
      calculate: "Calcular Cronograma",
      results: "Resultados",
      monthsToGoal: "Meses para Atingir a Meta",
      yearsToGoal: "Anos para Atingir a Meta",
      totalContributions: "Contribuições Totais Necessárias",
      totalEarnings: "Ganhos Totais de Investimento",
      onTrack: "Você está no caminho certo para atingir sua meta!",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [goalAmount, setGoalAmount] = useState<number>(100000);
  const [currentSavings, setCurrentSavings] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [annualReturn, setAnnualReturn] = useState<number>(6);
  const [calculated, setCalculated] = useState(false);

  const calculateGoal = () => {
    const monthlyRate = annualReturn / 100 / 12;
    let balance = currentSavings;
    let months = 0;
    const maxMonths = 1200; // 100 years max

    while (balance < goalAmount && months < maxMonths) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      months++;
    }

    const totalContributions = monthlyContribution * months;
    const totalEarnings = goalAmount - currentSavings - totalContributions;

    return {
      months,
      years: (months / 12).toFixed(1),
      totalContributions,
      totalEarnings: Math.max(0, totalEarnings),
    };
  };

  const results = calculateGoal();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.goalAmount}
            </label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.monthlyContribution}
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.annualReturn}
            </label>
            <input
              type="number"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
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
          <h3 className="text-2xl font-bold mb-6 text-gray-800">{t.results}</h3>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.yearsToGoal}</div>
              <div className="text-3xl font-bold text-blue-600">
                {results.years}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.monthsToGoal}</div>
              <div className="text-3xl font-bold text-green-600">
                {results.months}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.totalContributions}</div>
              <div className="text-2xl font-bold text-purple-600">
                ${results.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.totalEarnings}</div>
              <div className="text-2xl font-bold text-orange-600">
                ${results.totalEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-green-600 font-semibold">✓ {t.onTrack}</p>
          </div>
        </div>
      )}
    </div>
  );
}
