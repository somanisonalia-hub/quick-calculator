'use client';

import React, { useState } from 'react';

export const RothIRACalculator: React.FC<{ lang?: string }> = ({ lang = 'en' }) => {
  const [age, setAge] = useState(25);
  const [annualContribution, setAnnualContribution] = useState(7000);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [retirementAge, setRetirementAge] = useState(65);
  const [results, setResults] = useState<any>(null);

  const texts = {
    en: { title: 'Roth IRA Calculator', age: 'Current Age', annualContribution: 'Annual Contribution ($)', annualReturn: 'Expected Annual Return (%)', retirementAge: 'Retirement Age', calculate: 'Calculate', projectedBalance: 'Projected Tax-Free Balance', totalContributions: 'Total Contributions', investmentGrowth: 'Investment Growth (Tax-Free)', years: 'Years' },
    es: { title: 'Calculadora Roth IRA', age: 'Edad Actual', annualContribution: 'Contribución Anual ($)', annualReturn: 'Rendimiento Anual Esperado (%)', retirementAge: 'Edad de Jubilación', calculate: 'Calcular', projectedBalance: 'Saldo Proyectado Libre de Impuestos', totalContributions: 'Contribuciones Totales', investmentGrowth: 'Crecimiento de Inversión (Libre de Impuestos)', years: 'Años' },
    pt: { title: 'Calculadora Roth IRA', age: 'Idade Atual', annualContribution: 'Contribuição Anual ($)', annualReturn: 'Retorno Anual Esperado (%)', retirementAge: 'Idade de Aposentadoria', calculate: 'Calcular', projectedBalance: 'Saldo Projetado Livre de Impostos', totalContributions: 'Contribuições Totais', investmentGrowth: 'Crescimento de Investimento (Livre de Impostos)', years: 'Anos' },
    fr: { title: 'Calculatrice Roth IRA', age: 'Âge Actuel', annualContribution: 'Cotisation Annuelle ($)', annualReturn: 'Rendement Annuel Attendu (%)', retirementAge: 'Âge de Retraite', calculate: 'Calculer', projectedBalance: 'Solde Projeté Libre d\'Impôts', totalContributions: 'Cotisations Totales', investmentGrowth: 'Croissance des Investissements (Libre d\'Impôts)', years: 'Ans' },
  };

  const t = texts[lang as keyof typeof texts] || texts.en;

  const calculate = () => {
    const yearsToRetirement = retirementAge - age;
    let balance = 0;
    let totalContrib = 0;

    for (let year = 0; year < yearsToRetirement; year++) {
      balance = (balance + annualContribution) * (1 + annualReturn / 100);
      totalContrib += annualContribution;
    }

    const growth = balance - totalContrib;

    setResults({
      balance: Math.round(balance),
      totalContrib: Math.round(totalContrib),
      growth: Math.round(growth),
      years: yearsToRetirement,
    });
  };

  const resetCalculator = () => {
    // Reset all input values to defaults
    const initial: Record<string, number> = {};
    inputs?.forEach(input => {
      initial[input.name] = input.default || 0;
    });
    setValues(initial);
    setResults({});
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.age}</label>
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" min="18" />
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.annualContribution}</label>
          <input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" min="0" step="500" />
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.annualReturn}</label>
          <input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" min="0" max="15" step="0.1" />
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.retirementAge}</label>
          <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" min="age" />
        </div>
        <button onClick={calculate} className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition text-lg">{t.calculate}</button>
        {results && (
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 border-2 border-indigo-300 rounded-lg p-6">
          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>

            <h3 className="text-2xl font-bold text-indigo-900 mb-4">Results</h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4"><p className="text-sm text-gray-600 font-medium">{t.projectedBalance}</p><p className="text-2xl font-bold text-indigo-900">${results.balance.toLocaleString()}</p></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-4"><p className="text-sm text-gray-600 font-medium">{t.totalContributions}</p><p className="text-xl font-bold text-indigo-900">${results.totalContrib.toLocaleString()}</p></div>
                <div className="bg-white rounded-lg p-4"><p className="text-sm text-gray-600 font-medium">{t.investmentGrowth}</p><p className="text-xl font-bold text-green-900">${results.growth.toLocaleString()}</p></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RothIRACalculator;
