'use client';

import React, { useState } from 'react';

export const SocialSecurityCalculator: React.FC<{ lang?: string }> = ({ lang = 'en' }) => {
  const [birthYear, setBirthYear] = useState(1960);
  const [averageEarnings, setAverageEarnings] = useState(60000);
  const [claimingAge, setClaimingAge] = useState(67);
  const [results, setResults] = useState<any>(null);

  const texts = {
    en: {
      title: 'Social Security Calculator',
      birthYear: 'Birth Year',
      averageEarnings: 'Average Annual Earnings ($)',
      claimingAge: 'Claiming Age',
      calculate: 'Calculate Benefits',
      estimatedBenefit: 'Estimated Monthly Benefit',
      birthMonthAge: 'At Birth Month Age',
      fullRetirementAge: 'Full Retirement Age',
      claimingAt62: 'Claiming at 62',
      reduction: 'Reduction',
      claimingAt70: 'Claiming at 70',
      increase: 'Increase',
      note: 'Note: Estimates based on current law. Contact SSA for official statement.',
    },
    es: {
      title: 'Calculadora de Seguro Social',
      birthYear: 'Año de Nacimiento',
      averageEarnings: 'Ganancias Anuales Promedio ($)',
      claimingAge: 'Edad de Reclamación',
      calculate: 'Calcular Beneficios',
      estimatedBenefit: 'Beneficio Mensual Estimado',
      birthMonthAge: 'A la Edad del Mes de Nacimiento',
      fullRetirementAge: 'Edad Plena de Jubilación',
      claimingAt62: 'Reclamación a los 62',
      reduction: 'Reducción',
      claimingAt70: 'Reclamación a los 70',
      increase: 'Aumento',
      note: 'Nota: Estimaciones basadas en la ley actual.',
    },
    pt: {
      title: 'Calculadora de Seguro Social',
      birthYear: 'Ano de Nascimento',
      averageEarnings: 'Ganhos Anuais Médios ($)',
      claimingAge: 'Idade de Reclamação',
      calculate: 'Calcular Benefícios',
      estimatedBenefit: 'Benefício Mensal Estimado',
      birthMonthAge: 'Na Idade do Mês de Nascimento',
      fullRetirementAge: 'Idade Plena de Aposentadoria',
      claimingAt62: 'Reclamação aos 62',
      reduction: 'Redução',
      claimingAt70: 'Reclamação aos 70',
      increase: 'Aumento',
      note: 'Nota: Estimativas com base na lei atual.',
    },
    fr: {
      title: 'Calculatrice de Sécurité Sociale',
      birthYear: 'Année de Naissance',
      averageEarnings: 'Revenus Annuels Moyens ($)',
      claimingAge: 'Âge de Réclamation',
      calculate: 'Calculer les Prestations',
      estimatedBenefit: 'Prestation Mensuelle Estimée',
      birthMonthAge: 'À l\'Âge du Mois de Naissance',
      fullRetirementAge: 'Âge de Retraite à Taux Plein',
      claimingAt62: 'Réclamation à 62 ans',
      reduction: 'Réduction',
      claimingAt70: 'Réclamation à 70 ans',
      increase: 'Augmentation',
      note: 'Remarque: Estimations basées sur la loi actuelle.',
    },
  };

  const t = texts[lang as keyof typeof texts] || texts.en;

  const getFullRetirementAge = (year: number) => {
    if (year <= 1954) return 66;
    if (year === 1955) return 66.167;
    if (year === 1956) return 66.333;
    if (year === 1957) return 66.5;
    if (year === 1958) return 66.667;
    if (year === 1959) return 66.833;
    return 67;
  };

  const calculate = () => {
    const fra = getFullRetirementAge(birthYear);
    const monthlyBenefit = (averageEarnings / 12) * 0.32;

    let benefit = monthlyBenefit;
    if (claimingAge < fra) {
      const monthsEarly = (fra - claimingAge) * 12;
      const reduction = Math.min(monthsEarly * 0.555, monthsEarly * 0.416 - 36 * 0.416) / 100;
      benefit = monthlyBenefit * (1 - reduction);
    } else if (claimingAge > fra) {
      const monthsLate = (claimingAge - fra) * 12;
      const increase = monthsLate * 0.667 / 100;
      benefit = monthlyBenefit * (1 + increase);
    }

    const at62 = monthlyBenefit * 0.7;
    const at70 = monthlyBenefit * 1.24;

    setResults({
      estimatedBenefit: Math.round(benefit),
      fullRetirementAge: fra,
      at62: Math.round(at62),
      at70: Math.round(at70),
      claimingAt: claimingAge,
    });
  };

  return (
    <div id="calculator-section" className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{t.title}</h1>

      <div className="space-y-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.birthYear}</label>
          <input
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            min="1943"
            max={new Date().getFullYear() - 62}
          />
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.averageEarnings}</label>
          <input
            type="number"
            value={averageEarnings}
            onChange={(e) => setAverageEarnings(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            min="0"
            step="5000"
          />
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.claimingAge}</label>
          <input
            type="number"
            value={claimingAge}
            onChange={(e) => setClaimingAge(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            min="62"
            max="70"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition text-lg"
        >
          {t.calculate}
        </button>

        {results && (
          <div className="bg-gradient-to-br from-red-100 to-orange-100 border-2 border-red-300 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-red-900 mb-4">Results</h3>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">{t.estimatedBenefit} ({t.claimingAt} {results.claimingAt})</p>
                <p className="text-3xl font-bold text-red-900">${results.estimatedBenefit.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">/month</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 font-medium">{t.claimingAt62}</p>
                  <p className="text-xl font-bold text-orange-900">${results.at62.toLocaleString()}</p>
                  <p className="text-xs text-red-600">-30%</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 font-medium">{t.claimingAt70}</p>
                  <p className="text-xl font-bold text-green-900">${results.at70.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+24%</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                <p className="text-xs text-gray-600">{t.note}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialSecurityCalculator;
