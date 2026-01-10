'use client';

import { useState } from 'react';

interface AgeCalculatorProps {
  lang?: string;
}

export default function AgeCalculator({ lang = 'en' }: AgeCalculatorProps) {
  // Embedded translations following CALCULATOR_CREATION_AGENT.md approach
  const translations = {
    en: {
      title: "AgeCalculator",
      description: "Calculate values for AgeCalculator",
      calculate: "Calculate",
      result: "Result",
      error: "Error",
      reset: "Reset",
      days: "days",
      pageTitle: "Age Calculator",
      pageDescription: "Calculate your exact age in years, months, and days",
      birthDate: "Birth Date",
      calculateAge: "Calculate Age",
      yourAge: "Your Age",
      birthDateFutureError: "Birth date cannot be in the future",
  },
    es: {
      title: "AgeCalculator (ES)",
      description: "Calcular valores para AgeCalculator",
      calculate: "Calcular",
      result: "Resultado",
      error: "Error",
      reset: "Reiniciar",
      days: "días",
      pageTitle: "Calculadora de Edad",
      pageDescription: "Calcula tu edad exacta en años, meses y días",
      birthDate: "Fecha de Nacimiento",
      calculateAge: "Calcular Edad",
      yourAge: "Tu Edad",
      birthDateFutureError: "La fecha de nacimiento no puede ser en el futuro",
  },
    pt: {
      title: "AgeCalculator (PT)",
      description: "Calcular valores para AgeCalculator",
      calculate: "Calcular",
      result: "Resultado",
      error: "Erro",
      reset: "Reiniciar",
      days: "dias",
      pageTitle: "Calculadora de Idade",
      pageDescription: "Calcule sua idade exata em anos, meses e dias",
      birthDate: "Data de Nascimento",
      calculateAge: "Calcular Idade",
      yourAge: "Sua Idade",
      birthDateFutureError: "A data de nascimento não pode ser no futuro",
  },
    fr: {
      title: "AgeCalculator (FR)",
      description: "Calculer les valeurs pour AgeCalculator",
      calculate: "Calculer",
      result: "Résultat",
      error: "Erreur",
      reset: "Réinitialiser",
      days: "jours",
      pageTitle: "Calculateur d'Âge",
      pageDescription: "Calculez votre âge exact en années, mois et jours",
      birthDate: "Date de Naissance",
      calculateAge: "Calculer l'Âge",
      yourAge: "Votre Âge",
      birthDateFutureError: "La date de naissance ne peut pas être dans le futur",
  }
};

  const t = translations[lang as keyof typeof translations] || translations.en;
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState('');

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    // Validate birth date is not in future
    if (birth > today) {
      setAge(t.error + ': ' + t.birthDateFutureError);
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge(`${years} years, ${months} months, ${days} ${t.days}`);
  };

  const resetCalculator = () => {
    setBirthDate('');
    setAge('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.pageTitle}</h1>
        <p className="text-gray-600">{t.pageDescription}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
{t.birthDate}
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={calculateAge}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t.calculateAge}
          </button>
          <button
            onClick={resetCalculator}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {t.reset}
          </button>
        </div>

        {age && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">{t.yourAge}</h3>
            <div className="text-2xl font-bold text-green-600">{age}</div>
          </div>
        )}
      </div>
    </div>
  );
}
