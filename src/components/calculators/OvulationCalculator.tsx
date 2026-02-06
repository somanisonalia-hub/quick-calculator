'use client';

import React, { useState } from 'react';

interface OvulationCalculatorProps {
  lang?: string;
}

export default function OvulationCalculator({ lang = 'en' }: OvulationCalculatorProps) {
  const translations = {
    en: {
      title: "Ovulation Calculator",
      lastPeriodLabel: "First day of last menstrual period",
      cycleLengthLabel: "Average cycle length (days)",
      calculate: "Calculate Ovulation",
      reset: "Reset",
      results: "Fertility Timeline",
      ovulationDate: "Ovulation Date",
      fertileWindow: "Fertile Window",
      mostFertileDays: "Most Fertile Days",
      nextPeriod: "Estimated Next Period",
      cycleDay: "Your Cycle Day",
      tip: "Tip",
      tipText: "Most women ovulate about 14 days before their next period. The fertile window is 5-6 days when conception is most likely.",
      daysBefore: "days before ovulation",
      onDay: "On day of ovulation"
    },
    es: {
      title: "Calculadora de Ovulación",
      lastPeriodLabel: "Primer día del último período menstrual",
      cycleLengthLabel: "Duración promedio del ciclo (días)",
      calculate: "Calcular Ovulación",
      reset: "Reiniciar",
      results: "Cronología de Fertilidad",
      ovulationDate: "Fecha de Ovulación",
      fertileWindow: "Ventana Fértil",
      mostFertileDays: "Días Más Fértiles",
      nextPeriod: "Próximo Período Estimado",
      cycleDay: "Día de tu Ciclo",
      tip: "Consejo",
      tipText: "La mayoría de las mujeres ovulan alrededor de 14 días antes de su próximo período.",
      daysBefore: "días antes de la ovulación",
      onDay: "En el día de la ovulación"
    },
    pt: {
      title: "Calculadora de Ovulação",
      lastPeriodLabel: "Primeiro dia do último período menstrual",
      cycleLengthLabel: "Duração média do ciclo (dias)",
      calculate: "Calcular Ovulação",
      reset: "Reiniciar",
      results: "Cronologia de Fertilidade",
      ovulationDate: "Data de Ovulação",
      fertileWindow: "Janela Fértil",
      mostFertileDays: "Dias Mais Férteis",
      nextPeriod: "Próximo Período Estimado",
      cycleDay: "Seu Dia do Ciclo",
      tip: "Dica",
      tipText: "A maioria das mulheres ovula cerca de 14 dias antes do próximo período.",
      daysBefore: "dias antes da ovulação",
      onDay: "No dia da ovulação"
    },
    fr: {
      title: "Calculatrice d'Ovulation",
      lastPeriodLabel: "Premier jour du dernier jour des règles",
      cycleLengthLabel: "Durée moyenne du cycle (jours)",
      calculate: "Calculer l'Ovulation",
      reset: "Réinitialiser",
      results: "Chronologie de la Fertilité",
      ovulationDate: "Date d'Ovulation",
      fertileWindow: "Période Fertile",
      mostFertileDays: "Jours les Plus Fertiles",
      nextPeriod: "Prochain Jour des Règles Estimé",
      cycleDay: "Votre Jour du Cycle",
      tip: "Astuce",
      tipText: "La plupart des femmes ovulent environ 14 jours avant leurs prochaines règles.",
      daysBefore: "jours avant l'ovulation",
      onDay: "Le jour de l'ovulation"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [results, setResults] = useState<{
    ovulationDate: string;
    fertileStart: string;
    fertileEnd: string;
    nextPeriod: string;
    cycleDay: number;
  } | null>(null);

  const calculateOvulation = () => {
    if (!lastPeriodDate) return;

    const lmpDate = new Date(lastPeriodDate);
    
    // Ovulation occurs approximately on day 14 of a 28-day cycle
    // Formula: LMP + (cycle length - 14)
    const ovulationDate = new Date(lmpDate);
    ovulationDate.setDate(ovulationDate.getDate() + (cycleLength - 14));

    // Fertile window: 5 days before ovulation to day of ovulation
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);

    // Next period
    const nextPeriod = new Date(lmpDate);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    // Current cycle day
    const today = new Date();
    const daysSinceLMP = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
    const cycleDay = (daysSinceLMP % cycleLength) + 1;

    setResults({
      ovulationDate: ovulationDate.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : lang === 'pt' ? 'pt-BR' : 'fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      fertileStart: fertileStart.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : lang === 'pt' ? 'pt-BR' : 'fr-FR', {
        month: 'short',
        day: 'numeric'
      }),
      fertileEnd: fertileEnd.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : lang === 'pt' ? 'pt-BR' : 'fr-FR', {
        month: 'short',
        day: 'numeric'
      }),
      nextPeriod: nextPeriod.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : lang === 'pt' ? 'pt-BR' : 'fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      cycleDay: Math.max(cycleDay, 1)
    });
  };

  const resetCalculator = () => {
    setLastPeriodDate('');
    setCycleLength(28);
    setResults(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6 hidden">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
          <p className="text-sm text-purple-800">
            <strong>{t.tip}:</strong> {t.tipText}
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.lastPeriodLabel}
          </label>
          <input
            type="date"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.cycleLengthLabel}
          </label>
          <input
            type="number"
            min="21"
            max="35"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateOvulation}
          className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
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
        <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t.results}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-white rounded-lg shadow-sm border-2 border-red-200">
              <p className="text-sm text-gray-600 mb-1">{t.ovulationDate}</p>
              <p className="text-xl font-bold text-red-600">{results.ovulationDate}</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-1">{t.fertileWindow}</p>
              <p className="text-lg font-bold text-green-600">
                {results.fertileStart} - {results.fertileEnd}
              </p>
              <p className="text-xs text-gray-600 mt-1">5 {t.daysBefore}</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">{t.mostFertileDays}</p>
              <p className="text-sm text-purple-600 font-semibold">
                {results.fertileStart} - {results.fertileEnd}
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">{t.nextPeriod}</p>
              <p className="text-lg font-bold text-blue-600">{results.nextPeriod}</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">{t.cycleDay}</p>
            <p className="text-2xl font-bold text-purple-600 mb-2">Day {results.cycleDay} of {cycleLength}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${(results.cycleDay / cycleLength) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
