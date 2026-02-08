'use client';

import React, { useState } from 'react';

interface PregnancyCalculatorProps {
  lang?: string;
}

export default function PregnancyCalculator({ lang = 'en' }: PregnancyCalculatorProps) {
  const translations = {
    en: {
      title: "Pregnancy Calculator",
      dateType: "Calculate By",
      lmp: "Last Menstrual Period (LMP)",
      conception: "Conception Date",
      lmpLabel: "First day of last period",
      conceptionLabel: "Conception date",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      results: "Pregnancy Timeline",
      dueDate: "Estimated Due Date",
      weeksPregnant: "Weeks Pregnant",
      daysPregnant: "Days Pregnant",
      daysRemaining: "Days Until Due Date",
      trimester: "Current Trimester",
      first: "First",
      second: "Second",
      third: "Third",
      tip: "Tip",
      tipText: "Standard pregnancy is 280 days (40 weeks) from LMP. Due dates are estimates - actual delivery typically occurs within 2 weeks before or after.",
      pregnancyProgress: "Pregnancy Progress",
      pregnancyProgressWeeks: "weeks",
      pregnancyProgressDays: "days",
      pregnancyProgressOf: "of"
    },
    es: {
      title: "Calculadora de Embarazo",
      dateType: "Calcular Por",
      lmp: "Último Período Menstrual (FUM)",
      conception: "Fecha de Concepción",
      lmpLabel: "Primer día del último período",
      conceptionLabel: "Fecha de concepción",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      results: "Cronología del Embarazo",
      dueDate: "Fecha Estimada de Parto",
      weeksPregnant: "Semanas de Embarazo",
      daysPregnant: "Días de Embarazo",
      daysRemaining: "Días Hasta Fecha de Parto",
      trimester: "Trimestre Actual",
      first: "Primero",
      second: "Segundo",
      third: "Tercero",
      tip: "Consejo",
      tipText: "El embarazo estándar es 280 días (40 semanas) desde FUM. Las fechas de parto son estimaciones.",
      pregnancyProgress: "Progreso del Embarazo",
      pregnancyProgressWeeks: "semanas",
      pregnancyProgressDays: "días",
      pregnancyProgressOf: "de"
    },
    pt: {
      title: "Calculadora de Gravidez",
      dateType: "Calcular Por",
      lmp: "Último Período Menstrual (DUM)",
      conception: "Data de Concepção",
      lmpLabel: "Primeiro dia do último período",
      conceptionLabel: "Data de concepção",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      results: "Cronologia da Gravidez",
      dueDate: "Data Estimada de Parto",
      weeksPregnant: "Semanas de Gravidez",
      daysPregnant: "Dias de Gravidez",
      daysRemaining: "Dias Até Data de Parto",
      trimester: "Trimestre Atual",
      first: "Primeiro",
      second: "Segundo",
      third: "Terceiro",
      tip: "Dica",
      tipText: "A gravidez padrão é 280 dias (40 semanas) a partir da DUM. As datas de parto são estimativas.",
      pregnancyProgress: "Progresso da Gravidez",
      pregnancyProgressWeeks: "semanas",
      pregnancyProgressDays: "dias",
      pregnancyProgressOf: "de"
    },
    fr: {
      title: "Calculatrice de Grossesse",
      dateType: "Calculer Par",
      lmp: "Dernier Jour des Règles (DDR)",
      conception: "Date de Conception",
      lmpLabel: "Premier jour du dernier jour des règles",
      conceptionLabel: "Date de conception",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      results: "Chronologie de la Grossesse",
      dueDate: "Date Estimée d'Accouchement",
      weeksPregnant: "Semaines de Grossesse",
      daysPregnant: "Jours de Grossesse",
      daysRemaining: "Jours Avant la Date d'Accouchement",
      trimester: "Trimestre Actuel",
      first: "Premier",
      second: "Deuxième",
      third: "Troisième",
      tip: "Astuce",
      tipText: "La grossesse standard est 280 jours (40 semaines) à partir de DDR. Les dates d'accouchement sont des estimations.",
      pregnancyProgress: "Progrès de la Grossesse",
      pregnancyProgressWeeks: "semaines",
      pregnancyProgressDays: "jours",
      pregnancyProgressOf: "de"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [dateType, setDateType] = useState<'lmp' | 'conception'>('lmp');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [results, setResults] = useState<{
    dueDate: string;
    weeksPregnant: number;
    daysPregnant: number;
    daysRemaining: number;
    trimester: string;
  } | null>(null);

  const calculatePregnancy = () => {
    if (!selectedDate) return;

    const inputDate = new Date(selectedDate);
    let startDate = new Date(inputDate);

    // If conception date, calculate LMP (typically 2 weeks before conception)
    if (dateType === 'conception') {
      startDate = new Date(inputDate);
      startDate.setDate(startDate.getDate() - 14);
    }

    // Due date is 280 days from LMP
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + 280);

    // Today's date
    const today = new Date();

    // Calculate days pregnant
    const daysPregnant = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weeksPregnant = Math.floor(daysPregnant / 7);

    // Calculate days remaining
    const daysRemaining = Math.ceil(
      (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Determine trimester
    let trimester = t.first;
    if (weeksPregnant > 13) trimester = t.second;
    if (weeksPregnant > 26) trimester = t.third;

    setResults({
      dueDate: dueDate.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : lang === 'pt' ? 'pt-BR' : 'fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      weeksPregnant,
      daysPregnant,
      daysRemaining: Math.max(daysRemaining, 0),
      trimester
    });
  };

  const resetCalculator = () => {
    setSelectedDate('');
    setResults(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 hidden">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <div className="bg-pink-50 border-l-4 border-pink-500 p-4 mb-6">
          <p className="text-sm text-pink-800">
            <strong>{t.tip}:</strong> {t.tipText}
          </p>
        </div>
      </div>

      {/* Date Type Selection */}
      <div className="mb-6 hidden">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t.dateType}
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              checked={dateType === 'lmp'}
              onChange={() => setDateType('lmp')}
              className="mr-2"
            />
            <span className="text-gray-700">{t.lmp}</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              checked={dateType === 'conception'}
              onChange={() => setDateType('conception')}
              className="mr-2"
            />
            <span className="text-gray-700">{t.conception}</span>
          </label>
        </div>
      </div>

      {/* Date Input */}
      <div className="mb-6 hidden">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {dateType === 'lmp' ? t.lmpLabel : t.conceptionLabel}
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculatePregnancy}
          className="flex-1 px-6 py-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition-colors"
        >
          {t.calculate}
        </button>
        <button
          onClick={resetCalculator}
          className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
        >
          {t.reset}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="mt-6 p-6 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg border border-pink-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t.results}</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">{t.dueDate}</p>
              <p className="text-2xl font-bold text-pink-600">{results.dueDate}</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">{t.trimester}</p>
              <p className="text-2xl font-bold text-pink-600">{results.trimester}</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">{t.weeksPregnant}</p>
              <p className="text-2xl font-bold text-blue-600">{results.weeksPregnant}</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">{t.daysRemaining}</p>
              <p className="text-2xl font-bold text-green-600">{results.daysRemaining}</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">{t.daysPregnant}</p>
              <p className="text-2xl font-bold text-purple-600">{results.daysPregnant}</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded-lg border-t border-pink-200">
            <p className="text-sm text-gray-700">
              <strong>{t.pregnancyProgress}:</strong> {results.weeksPregnant} {t.pregnancyProgressWeeks} + {results.daysPregnant % 7} {t.pregnancyProgressDays} {t.pregnancyProgressOf} 40 {t.pregnancyProgressWeeks}
            </p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-600 h-2 rounded-full"
                style={{ width: `${(results.weeksPregnant / 40) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
