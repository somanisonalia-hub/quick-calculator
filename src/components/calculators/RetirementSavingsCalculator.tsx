'use client';

import { useState } from 'react';

interface RetirementSavingsCalculatorProps {
  lang?: string;
}

export default function RetirementSavingsCalculator({ lang = 'en' }: RetirementSavingsCalculatorProps) {
  const translations = {
    en: {
      title: "Retirement Savings Calculator",
      currentAge: "Current Age",
      retirementAge: "Retirement Age",
      currentSavings: "Current Savings ($)",
      monthlyContribution: "Monthly Contribution ($)",
      annualReturn: "Expected Annual Return (%)",
      calculate: "Calculate Retirement Savings",
      results: "Results",
      totalSavings: "Total Savings at Retirement",
      totalContributions: "Total Contributions",
      totalEarnings: "Investment Earnings",
      yearsToRetirement: "Years to Retirement",
      monthlyIncome: "Estimated Monthly Income",
    },
    es: {
      title: "Calculadora de Ahorro para Jubilación",
      currentAge: "Edad Actual",
      retirementAge: "Edad de Jubilación",
      currentSavings: "Ahorros Actuales ($)",
      monthlyContribution: "Contribución Mensual ($)",
      annualReturn: "Rendimiento Anual Esperado (%)",
      calculate: "Calcular Ahorro para Jubilación",
      results: "Resultados",
      totalSavings: "Ahorro Total al Jubilarse",
      totalContributions: "Contribuciones Totales",
      totalEarnings: "Ganancias de Inversión",
      yearsToRetirement: "Años hasta la Jubilación",
      monthlyIncome: "Ingreso Mensual Estimado",
    },
    fr: {
      title: "Calculateur d'Épargne Retraite",
      currentAge: "Âge Actuel",
      retirementAge: "Âge de la Retraite",
      currentSavings: "Épargne Actuelle ($)",
      monthlyContribution: "Cotisation Mensuelle ($)",
      annualReturn: "Rendement Annuel Prévu (%)",
      calculate: "Calculer l'Épargne Retraite",
      results: "Résultats",
      totalSavings: "Épargne Totale à la Retraite",
      totalContributions: "Cotisations Totales",
      totalEarnings: "Gains d'Investissement",
      yearsToRetirement: "Années jusqu'à la Retraite",
      monthlyIncome: "Revenu Mensuel Estimé",
    },
    pt: {
      title: "Calculadora de Poupança para Aposentadoria",
      currentAge: "Idade Atual",
      retirementAge: "Idade de Aposentadoria",
      currentSavings: "Poupança Atual ($)",
      monthlyContribution: "Contribuição Mensal ($)",
      annualReturn: "Retorno Anual Esperado (%)",
      calculate: "Calcular Poupança para Aposentadoria",
      results: "Resultados",
      totalSavings: "Poupança Total na Aposentadoria",
      totalContributions: "Contribuições Totais",
      totalEarnings: "Ganhos de Investimento",
      yearsToRetirement: "Anos até a Aposentadoria",
      monthlyIncome: "Renda Mensal Estimada",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [calculated, setCalculated] = useState(false);

  const calculateRetirement = () => {
    const years = retirementAge - currentAge;
    const months = years * 12;
    const monthlyRate = annualReturn / 100 / 12;

    // Future value of current savings
    const futureValueCurrent = currentSavings * Math.pow(1 + monthlyRate, months);

    // Future value of monthly contributions
    const futureValueContributions = monthlyContribution * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const totalSavings = futureValueCurrent + futureValueContributions;
    const totalContributions = currentSavings + (monthlyContribution * months);
    const totalEarnings = totalSavings - totalContributions;
    const monthlyIncome = totalSavings * 0.04 / 12; // 4% rule

    return {
      totalSavings,
      totalContributions,
      totalEarnings,
      years,
      monthlyIncome,
    };
  };

  const results = calculateRetirement();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.currentAge}
            </label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.retirementAge}
            </label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
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

          <div className="md:col-span-2">
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
              <div className="text-sm text-gray-600 mb-1">{t.totalSavings}</div>
              <div className="text-3xl font-bold text-blue-600">
                ${results.totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.monthlyIncome}</div>
              <div className="text-3xl font-bold text-green-600">
                ${results.monthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
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
            <p className="text-gray-700">
              <span className="font-semibold">{t.yearsToRetirement}:</span> {results.years} {lang === 'es' ? 'años' : lang === 'fr' ? 'ans' : lang === 'pt' ? 'anos' : 'years'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
