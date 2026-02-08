'use client';

import { useState } from 'react';

interface StudyHoursPlannerCalculatorProps {
  lang?: string;
}

export default function StudyHoursPlannerCalculator({ lang = 'en' }: StudyHoursPlannerCalculatorProps) {
  const [totalTopics, setTotalTopics] = useState('');
  const [daysUntilExam, setDaysUntilExam] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [result, setResult] = useState({ topicsPerDay: '', totalHours: '' });

  const resetCalculator = () => {
    // Reset to default values
    setTotalTopics('');
    setDaysUntilExam('');
    setHoursPerDay('');
    setResult({ topicsPerDay: '', totalHours: '' });
  };

  const translations = {
    en: {
      totalTopics: "Total Topics/Chapters",
      daysUntilExam: "Days Until Exam",
      hoursPerDay: "Available Hours Per Day",
      calculate: "Create Study Plan",
      topicsPerDay: "Topics Per Day",
      totalHours: "Total Study Hours",
      reset: "Reset"
    },
    es: {
      totalTopics: "Total de Temas/Capítulos",
      daysUntilExam: "Días Hasta el Examen",
      hoursPerDay: "Horas Disponibles Por Día",
      calculate: "Crear Plan de Estudio",
      topicsPerDay: "Temas Por Día",
      totalHours: "Total de Horas de Estudio",
      reset: "Restablecer"
    },
    pt: {
      totalTopics: "Total de Tópicos/Capítulos",
      daysUntilExam: "Dias Até o Exame",
      hoursPerDay: "Horas Disponíveis Por Dia",
      calculate: "Criar Plano de Estudo",
      topicsPerDay: "Tópicos Por Dia",
      totalHours: "Total de Horas de Estudo",
      reset: "Redefinir"
    },
    fr: {
      totalTopics: "Total des Sujets/Chapitres",
      daysUntilExam: "Jours Jusqu'à l'Examen",
      hoursPerDay: "Heures Disponibles Par Jour",
      calculate: "Créer un Plan d'Étude",
      topicsPerDay: "Sujets Par Jour",
      totalHours: "Total d'Heures d'Étude",
      reset: "Réinitialiser"
    },
    de: {
      totalTopics: "Anzahl der Themen/Kapitel",
      daysUntilExam: "Tage bis zur Prüfung",
      hoursPerDay: "Verfügbare Stunden Pro Tag",
      calculate: "Lernplan Erstellen",
      topicsPerDay: "Themen Pro Tag",
      totalHours: "Gesamte Lernstunden",
      reset: "Zurücksetzen"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const createPlan = () => {
    const topics = parseFloat(totalTopics);
    const days = parseFloat(daysUntilExam);
    const hours = parseFloat(hoursPerDay);

    if (isNaN(topics) || isNaN(days) || isNaN(hours) || days === 0) return;

    const topicsPerDay = topics / days;
    const totalStudyHours = days * hours;

    setResult({
      topicsPerDay: topicsPerDay.toFixed(2),
      totalHours: totalStudyHours.toFixed(1)
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.totalTopics}</label>
          <input
            type="number"
            value={totalTopics}
            onChange={(e) => setTotalTopics(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.daysUntilExam}</label>
          <input
            type="number"
            value={daysUntilExam}
            onChange={(e) => setDaysUntilExam(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.hoursPerDay}</label>
          <input
            type="number"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={createPlan}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t.calculate}
        </button>
        <button
          onClick={resetCalculator}
          className="w-full bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
        >
          {t.reset}
        </button>
      </div>

      <div className="space-y-4">
        {result.topicsPerDay && (
          <div className="bg-green-50 p-4 rounded-lg space-y-2">
            <div><strong>{t.topicsPerDay}:</strong> {result.topicsPerDay}</div>
            <div><strong>{t.totalHours}:</strong> {result.totalHours}</div>
          </div>
        )}
      </div>
    </div>
  );
}
