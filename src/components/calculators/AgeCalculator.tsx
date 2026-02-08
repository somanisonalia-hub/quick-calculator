'use client';

import { useState, useEffect } from 'react';

interface AgeCalculatorProps {
  lang?: string;
}

export default function AgeCalculator({ lang = 'en' }: AgeCalculatorProps) {
  // Embedded translations following CALCULATOR_CREATION_AGENT.md approach
  const translations = {
    en: {
      title: "AgeCalculator",
      description: "Calculate values for AgeCalculator",
      calculate: "🔄 Recalculate",
      result: "Result",
      error: "Error",
      reset: "Reset",
      days: "days",
      pageTitle: "Age Calculator",
      pageDescription: "Calculate your exact age in years, months, and days",
      birthDate: "Birth Date",
      calculateAge: "🔄 Recalculate",
      yourAge: "Your Age",
      birthDateFutureError: "Birth date cannot be in the future",
      useTodayDate: "Use Today's Date",
      customDate: "Custom Date",
      month: "Month",
      day: "Day",
      year: "Year",
  },
    es: {
      title: "AgeCalculator (ES)",
      description: "Calcular valores para AgeCalculator",
      calculate: "🔄 Recalcular",
      result: "Resultado",
      error: "Error",
      reset: "Reiniciar",
      days: "días",
      pageTitle: "Calculadora de Edad",
      pageDescription: "Calcula tu edad exacta en años, meses y días",
      birthDate: "Fecha de Nacimiento",
      calculateAge: "🔄 Recalcular",
      yourAge: "Tu Edad",
      birthDateFutureError: "La fecha de nacimiento no puede ser en el futuro",
      useTodayDate: "Usar Fecha de Hoy",
      customDate: "Fecha Personalizada",
      month: "Mes",
      day: "Día",
      year: "Año",
  },
    pt: {
      title: "AgeCalculator (PT)",
      description: "Calcular valores para AgeCalculator",
      calculate: "🔄 Recalcular",
      result: "Resultado",
      error: "Erro",
      reset: "Reiniciar",
      days: "dias",
      pageTitle: "Calculadora de Idade",
      pageDescription: "Calcule sua idade exata em anos, meses e dias",
      birthDate: "Data de Nascimento",
      calculateAge: "🔄 Recalcular",
      yourAge: "Sua Idade",
      birthDateFutureError: "A data de nascimento não pode ser no futuro",
      useTodayDate: "Usar Data de Hoje",
      customDate: "Data Personalizada",
      month: "Mês",
      day: "Dia",
      year: "Ano",
  },
    fr: {
      title: "AgeCalculator (FR)",
      description: "Calculer les valeurs pour AgeCalculator",
      calculate: "🔄 Recalculer",
      result: "Résultat",
      error: "Erreur",
      reset: "Réinitialiser",
      days: "jours",
      pageTitle: "Calculateur d'Âge",
      pageDescription: "Calculez votre âge exact en années, mois et jours",
      birthDate: "Date de Naissance",
      calculateAge: "🔄 Recalculer",
      yourAge: "Votre Âge",
      birthDateFutureError: "La date de naissance ne peut pas être dans le futur",
      useTodayDate: "Utiliser la Date du Jour",
      customDate: "Date Personnalisée",
      month: "Mois",
      day: "Jour",
      year: "Année",
  }
};

  const t = translations[lang as keyof typeof translations] || translations.en;
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState('');
  const [useToday, setUseToday] = useState(true);
  
  // Initialize with today's date
  const today = new Date();
  const [customMonth, setCustomMonth] = useState(today.getMonth() + 1);
  const [customDay, setCustomDay] = useState(today.getDate());
  const [customYear, setCustomYear] = useState(today.getFullYear());

  // Update custom date fields when toggling back to manual entry
  useEffect(() => {
    if (!useToday) {
      const now = new Date();
      setCustomMonth(now.getMonth() + 1);
      setCustomDay(now.getDate());
      setCustomYear(now.getFullYear());
    }
  }, [useToday]);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const compareDate = useToday 
      ? new Date() 
      : new Date(customYear, customMonth - 1, customDay);

    // Validate birth date is not in future
    if (birth > compareDate) {
      setAge(t.error + ': ' + t.birthDateFutureError);
      return;
    }

    let years = compareDate.getFullYear() - birth.getFullYear();
    let months = compareDate.getMonth() - birth.getMonth();
    let days = compareDate.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(compareDate.getFullYear(), compareDate.getMonth(), 0).getDate();
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
    setUseToday(true);
    const now = new Date();
    setCustomMonth(now.getMonth() + 1);
    setCustomDay(now.getDate());
    setCustomYear(now.getFullYear());
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 hidden">
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

        <div className="border-t pt-4">
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              id="useToday"
              checked={useToday}
              onChange={(e) => setUseToday(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="useToday" className="ml-2 text-sm font-medium text-gray-700">
              {t.useTodayDate}
            </label>
          </div>

          {!useToday && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t.customDate}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t.month}</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={customMonth}
                    onChange={(e) => setCustomMonth(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t.day}</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={customDay}
                    onChange={(e) => setCustomDay(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t.year}</label>
                  <input
                    type="number"
                    min="1900"
                    max="2100"
                    value={customYear}
                    onChange={(e) => setCustomYear(parseInt(e.target.value) || new Date().getFullYear())}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}
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
