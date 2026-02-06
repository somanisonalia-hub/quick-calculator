'use client';

import { useState, useEffect } from 'react';

interface LifeInsuranceCalculatorProps {
  lang?: string;
}

export default function LifeInsuranceCalculator({ lang = 'en' }: LifeInsuranceCalculatorProps) {
  const [age, setAge] = useState(35);
  const [gender, setGender] = useState('male');
  const [coverageAmount, setCoverageAmount] = useState(500000);
  const [termLength, setTermLength] = useState(20);
  const [healthRating, setHealthRating] = useState('excellent');
  const [smokingStatus, setSmokingStatus] = useState('non-smoker');
  const [showSteps, setShowSteps] = useState(false);

  const [results, setResults] = useState({
    monthlyPremium: 0,
    annualPremium: 0,
    riskClass: '',
    totalCost: 0
  });

  const translations = {
    en: {
      title: "Life Insurance Calculator",
      description: "Calculate life insurance premiums based on your personal information",
      age: "Age",
      gender: "Gender",
      male: "Male",
      female: "Female",
      coverageAmount: "Coverage Amount",
      termLength: "Term Length (Years)",
      healthRating: "Health Rating",
      excellent: "Excellent",
      veryGood: "Very Good",
      good: "Good",
      fair: "Fair",
      smokingStatus: "Smoking Status",
      nonSmoker: "Non-Smoker",
      smoker: "Smoker",
      calculate: "Calculate Premium",
      reset: "Reset",
      monthlyPremium: "Monthly Premium",
      annualPremium: "Annual Premium",
      riskClass: "Risk Class",
      totalCost: "Total Cost (Term)",
      showSteps: "Show Calculation Steps",
      stepByStep: "Step-by-Step Calculation",
      formula: "Formula",
      examples: "Examples",
      explanation: "Explanation",
      step: "Step",
      calculation: "Calculation",
      result: "Result",
      disclaimer: "This is an estimate. Actual rates vary by insurer, medical history, and other factors."
    },
    es: {
      title: "Calculadora de Seguro de Vida",
      description: "Calcula las primas de seguro de vida basadas en tu información personal",
      age: "Edad",
      gender: "Género",
      male: "Masculino",
      female: "Femenino",
      coverageAmount: "Monto de Cobertura",
      termLength: "Duración del Plazo (Años)",
      healthRating: "Calificación de Salud",
      excellent: "Excelente",
      veryGood: "Muy Bueno",
      good: "Bueno",
      fair: "Regular",
      smokingStatus: "Estado de Fumador",
      nonSmoker: "No Fumador",
      smoker: "Fumador",
      calculate: "Calcular Prima",
      reset: "Reiniciar",
      monthlyPremium: "Prima Mensual",
      annualPremium: "Prima Anual",
      riskClass: "Clase de Riesgo",
      totalCost: "Costo Total (Plazo)",
      showSteps: "Mostrar Pasos de Cálculo",
      stepByStep: "Cálculo Paso a Paso",
      formula: "Fórmula",
      examples: "Ejemplos",
      explanation: "Explicación",
      step: "Paso",
      calculation: "Cálculo",
      result: "Resultado",
      disclaimer: "Esta es una estimación. Las tarifas reales varían según la aseguradora, historial médico y otros factores."
    },
    pt: {
      title: "Calculadora de Seguro de Vida",
      description: "Calcule os prêmios de seguro de vida com base nas suas informações pessoais",
      age: "Idade",
      gender: "Gênero",
      male: "Masculino",
      female: "Feminino",
      coverageAmount: "Valor da Cobertura",
      termLength: "Duração do Prazo (Anos)",
      healthRating: "Classificação de Saúde",
      excellent: "Excelente",
      veryGood: "Muito Bom",
      good: "Bom",
      fair: "Regular",
      smokingStatus: "Status de Fumante",
      nonSmoker: "Não Fumante",
      smoker: "Fumante",
      calculate: "Calcular Prêmio",
      reset: "Reiniciar",
      monthlyPremium: "Prêmio Mensal",
      annualPremium: "Prêmio Anual",
      riskClass: "Classe de Risco",
      totalCost: "Custo Total (Prazo)",
      showSteps: "Mostrar Passos de Cálculo",
      stepByStep: "Cálculo Passo a Passo",
      formula: "Fórmula",
      examples: "Exemplos",
      explanation: "Explicação",
      step: "Passo",
      calculation: "Cálculo",
      result: "Resultado",
      disclaimer: "Esta é uma estimativa. As taxas reais variam de acordo com a seguradora, histórico médico e outros fatores."
    },
    fr: {
      title: "Calculateur d'Assurance Vie",
      description: "Calculez les primes d'assurance vie en fonction de vos informations personnelles",
      age: "Âge",
      gender: "Genre",
      male: "Masculin",
      female: "Féminin",
      coverageAmount: "Montant de Couverture",
      termLength: "Durée du Terme (Années)",
      healthRating: "Évaluation de Santé",
      excellent: "Excellent",
      veryGood: "Très Bien",
      good: "Bien",
      fair: "Moyen",
      smokingStatus: "Statut de Fumeur",
      nonSmoker: "Non-Fumeur",
      smoker: "Fumeur",
      calculate: "Calculer la Prime",
      reset: "Réinitialiser",
      monthlyPremium: "Prime Mensuelle",
      annualPremium: "Prime Annuelle",
      riskClass: "Classe de Risque",
      totalCost: "Coût Total (Terme)",
      showSteps: "Afficher les Étapes de Calcul",
      stepByStep: "Calcul Étape par Étape",
      formula: "Formule",
      examples: "Exemples",
      explanation: "Explication",
      step: "Étape",
      calculation: "Calcul",
      result: "Résultat",
      disclaimer: "Ceci est une estimation. Les tarifs réels varient selon l'assureur, les antécédents médicaux et d'autres facteurs."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculatePremium = () => {
    // Base rate per $1000 of coverage (simplified)
    let baseRate = 0.50; // $0.50 per $1000 per month for 35-year-old non-smoker

    // Age factor
    let ageFactor = 1;
    if (age < 25) ageFactor = 0.6;
    else if (age < 35) ageFactor = 0.8;
    else if (age < 45) ageFactor = 1.2;
    else if (age < 55) ageFactor = 2.0;
    else if (age < 65) ageFactor = 3.5;
    else ageFactor = 5.0;

    // Gender factor (women typically pay less)
    const genderFactor = gender === 'female' ? 0.85 : 1.0;

    // Health rating factor
    let healthFactor = 1;
    let riskClass = 'Preferred Plus';
    switch (healthRating) {
      case 'excellent':
        healthFactor = 0.8;
        riskClass = 'Preferred Plus';
        break;
      case 'very-good':
        healthFactor = 1.0;
        riskClass = 'Preferred';
        break;
      case 'good':
        healthFactor = 1.3;
        riskClass = 'Standard Plus';
        break;
      case 'fair':
        healthFactor = 1.8;
        riskClass = 'Standard';
        break;
    }

    // Smoking factor
    const smokingFactor = smokingStatus === 'smoker' ? 2.5 : 1.0;

    // Term length factor (longer terms cost more)
    const termFactor = Math.max(0.8, Math.min(1.5, termLength / 20));

    // Calculate monthly premium
    const coverageInThousands = coverageAmount / 1000;
    const monthlyPremium = Math.round(baseRate * coverageInThousands * ageFactor * genderFactor * healthFactor * smokingFactor * termFactor);

    const annualPremium = monthlyPremium * 12;
    const totalCost = annualPremium * termLength;

    setResults({
      monthlyPremium,
      annualPremium,
      riskClass,
      totalCost
    });
  };

  useEffect(() => {
    calculatePremium();
  }, [age, gender, coverageAmount, termLength, healthRating, smokingStatus]);

  const resetCalculator = () => {
    setAge(35);
    setGender('male');
    setCoverageAmount(500000);
    setTermLength(20);
    setHealthRating('excellent');
    setSmokingStatus('non-smoker');
    setShowSteps(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.age}</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min="18"
                max="80"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.gender}</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="male">{t.male}</option>
                <option value="female">{t.female}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.coverageAmount}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(Number(e.target.value))}
                  min="50000"
                  max="5000000"
                  step="50000"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.termLength}</label>
              <input
                type="number"
                value={termLength}
                onChange={(e) => setTermLength(Number(e.target.value))}
                min="5"
                max="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.healthRating}</label>
              <select
                value={healthRating}
                onChange={(e) => setHealthRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="excellent">{t.excellent}</option>
                <option value="very-good">{t.veryGood}</option>
                <option value="good">{t.good}</option>
                <option value="fair">{t.fair}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.smokingStatus}</label>
              <select
                value={smokingStatus}
                onChange={(e) => setSmokingStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="non-smoker">{t.nonSmoker}</option>
                <option value="smoker">{t.smoker}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={calculatePremium}
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

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showSteps"
              checked={showSteps}
              onChange={(e) => setShowSteps(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showSteps" className="text-sm text-gray-700">{t.showSteps}</label>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-sm text-blue-600 font-semibold">{t.monthlyPremium}</div>
              <div className="text-xl font-bold text-blue-800">${results.monthlyPremium.toFixed(2)}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-sm text-green-600 font-semibold">{t.annualPremium}</div>
              <div className="text-xl font-bold text-green-800">${results.annualPremium.toLocaleString()}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-sm text-purple-600 font-semibold">{t.riskClass}</div>
              <div className="text-lg font-bold text-purple-800">{results.riskClass}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-sm text-orange-600 font-semibold">{t.totalCost}</div>
              <div className="text-xl font-bold text-orange-800">${results.totalCost.toLocaleString()}</div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">{t.disclaimer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
