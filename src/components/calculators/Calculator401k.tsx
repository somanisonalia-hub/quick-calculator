'use client';

import React, { useState } from 'react';

export const Calculator401k: React.FC<{ lang?: string }> = ({ lang = 'en' }) => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [salary, setSalary] = useState(60000);
  const [contribution, setContribution] = useState(10);
  const [employerMatch, setEmployerMatch] = useState(5);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [results, setResults] = useState<any>(null);

  const texts = {
    en: {
      title: '401k Calculator',
      currentAge: 'Current Age',
      retirementAge: 'Retirement Age',
      salary: 'Annual Salary',
      contribution: 'Your Contribution (%)',
      employerMatch: 'Employer Match (%)',
      annualReturn: 'Expected Annual Return (%)',
      calculate: 'Calculate',
      projectedBalance: 'Projected 401k Balance',
      totalContributions: 'Your Total Contributions',
      employerContributions: 'Employer Contributions',
      investmentGrowth: 'Investment Growth',
      years: 'years',
    },
    es: {
      title: 'Calculadora 401k',
      currentAge: 'Edad Actual',
      retirementAge: 'Edad de Jubilación',
      salary: 'Salario Anual',
      contribution: 'Tu Contribución (%)',
      employerMatch: 'Coincidencia del Empleador (%)',
      annualReturn: 'Rendimiento Anual Esperado (%)',
      calculate: 'Calcular',
      projectedBalance: 'Saldo 401k Proyectado',
      totalContributions: 'Tus Contribuciones Totales',
      employerContributions: 'Contribuciones del Empleador',
      investmentGrowth: 'Crecimiento de Inversión',
      years: 'años',
    },
    pt: {
      title: 'Calculadora 401k',
      currentAge: 'Idade Atual',
      retirementAge: 'Idade de Aposentadoria',
      salary: 'Salário Anual',
      contribution: 'Sua Contribuição (%)',
      employerMatch: 'Correspondência do Empregador (%)',
      annualReturn: 'Retorno Anual Esperado (%)',
      calculate: 'Calcular',
      projectedBalance: 'Saldo 401k Projetado',
      totalContributions: 'Suas Contribuições Totais',
      employerContributions: 'Contribuições do Empregador',
      investmentGrowth: 'Crescimento de Investimento',
      years: 'anos',
    },
    fr: {
      title: 'Calculatrice 401k',
      currentAge: 'Âge Actuel',
      retirementAge: 'Âge de Retraite',
      salary: 'Salaire Annuel',
      contribution: 'Votre Cotisation (%)',
      employerMatch: 'Correspondance de l\'Employeur (%)',
      annualReturn: 'Rendement Annuel Attendu (%)',
      calculate: 'Calculer',
      projectedBalance: 'Solde 401k Projeté',
      totalContributions: 'Vos Cotisations Totales',
      employerContributions: 'Cotisations de l\'Employeur',
      investmentGrowth: 'Croissance des Investissements',
      years: 'ans',
    },
  };

  const t = texts[lang as keyof typeof texts] || texts.en;

  const calculate = () => {
    const yearsToRetirement = retirementAge - currentAge;
    let balance = 0;
    let employerTotal = 0;
    let yourTotal = 0;

    for (let year = 0; year < yearsToRetirement; year++) {
      const yourContribution = salary * (contribution / 100);
      const match = Math.min(salary * (employerMatch / 100), yourContribution);
      
      yourTotal += yourContribution;
      employerTotal += match;
      
      balance = (balance + yourContribution + match) * (1 + annualReturn / 100);
    }

    const growth = balance - yourTotal - employerTotal;

    setResults({
      balance: Math.round(balance),
      yourTotal: Math.round(yourTotal),
      employerTotal: Math.round(employerTotal),
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
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{t.title}</h1>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.currentAge}</label>
          <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" min="18" max="100" />
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.retirementAge}</label>
          <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" min="currentAge" max="100" />
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.salary}</label>
          <input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" min="0" step="1000" />
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.contribution}</label>
          <input type="number" value={contribution} onChange={(e) => setContribution(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" min="0" max="100" step="0.5" />
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.employerMatch}</label>
          <input type="number" value={employerMatch} onChange={(e) => setEmployerMatch(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" min="0" max="100" step="0.5" />
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.annualReturn}</label>
          <input type="number" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" min="0" max="15" step="0.1" />
        </div>

        <button onClick={calculate} className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition text-lg">{t.calculate}</button>

        {results && (
          <div className="bg-gradient-to-br from-green-100 to-blue-100 border-2 border-green-300 rounded-lg p-6">
          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>

            <h3 className="text-2xl font-bold text-green-900 mb-4">Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">{t.projectedBalance}</p>
                <p className="text-2xl font-bold text-green-900">${results.balance.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">{t.years}</p>
                <p className="text-2xl font-bold text-green-900">{results.years}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">{t.totalContributions}</p>
                <p className="text-xl font-bold text-green-900">${results.yourTotal.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">{t.employerContributions}</p>
                <p className="text-xl font-bold text-green-900">${results.employerTotal.toLocaleString()}</p>
              </div>
              <div className="col-span-2 bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">{t.investmentGrowth}</p>
                <p className="text-xl font-bold text-green-900">${results.growth.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator401k;
