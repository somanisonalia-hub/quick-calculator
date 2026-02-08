'use client';

import { useState } from 'react';

interface WellnessTrackerCalculatorProps {
  lang?: string;
}

export default function WellnessTrackerCalculator({ lang = 'en' }: WellnessTrackerCalculatorProps) {
  const [inputs, setInputs] = useState({
    sleepHours: 7,
    waterIntake: 2,
    exercise: 30,
    stressLevel: 5
  });

  const resetCalculator = () => {
    // Reset to default values
    setInputs(0);
  };

  const translations = {
    en: {
      title: "Wellness Tracker Calculator",
      description: "Track and analyze your daily wellness metrics",
      sleepHours: "Sleep Hours",
      waterIntake: "Water Intake (liters)",
      exercise: "Exercise (minutes)",
      stressLevel: "Stress Level (1-10)",
      calculate: "Analyze",
      results: "Wellness Score",
      wellnessScore: "Overall Wellness Score",
      reset: "Reset"
    },
    es: {
      title: "Calculadora de Seguimiento de Bienestar",
      description: "Seguir y analizar tus métricas diarias de bienestar",
      sleepHours: "Horas de Sueño",
      waterIntake: "Consumo de Agua (litros)",
      exercise: "Ejercicio (minutos)",
      stressLevel: "Nivel de Estrés (1-10)",
      calculate: "Analizar",
      results: "Puntuación de Bienestar",
      wellnessScore: "Puntuación General de Bienestar",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora de Monitoramento de Bem-Estar",
      description: "Rastrear e analisar suas métricas diárias de bem-estar",
      sleepHours: "Horas de Sono",
      waterIntake: "Ingestão de Água (litros)",
      exercise: "Exercício (minutos)",
      stressLevel: "Nível de Estresse (1-10)",
      calculate: "Analisar",
      results: "Pontuação de Bem-Estar",
      wellnessScore: "Pontuação Geral de Bem-Estar",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur de Suivi du Bien-Être",
      description: "Suivre et analyser vos métriques quotidiennes de bien-être",
      sleepHours: "Heures de Sommeil",
      waterIntake: "Consommation d'Eau (litres)",
      exercise: "Exercice (minutes)",
      stressLevel: "Niveau de Stress (1-10)",
      calculate: "Analyser",
      results: "Score de Bien-Être",
      wellnessScore: "Score Global de Bien-Être",
      reset: "Réinitialiser"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t.sleepHours}</label>
          <input
            type="number"
            value={inputs.sleepHours}
            onChange={(e) => setInputs({ ...inputs, sleepHours: Number(e.target.value) })}
            min="0"
            max="24"
            step="0.5"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>

        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.waterIntake}</label>
          <input
            type="number"
            value={inputs.waterIntake}
            onChange={(e) => setInputs({ ...inputs, waterIntake: Number(e.target.value) })}
            min="0"
            step="0.1"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.exercise}</label>
          <input
            type="number"
            value={inputs.exercise}
            onChange={(e) => setInputs({ ...inputs, exercise: Number(e.target.value) })}
            min="0"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.stressLevel}</label>
          <input
            type="number"
            value={inputs.stressLevel}
            onChange={(e) => setInputs({ ...inputs, stressLevel: Number(e.target.value) })}
            min="1"
            max="10"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t.calculate}
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{t.results}</h3>
        <p className="text-sm text-gray-600">Enter your wellness data to see your overall score.</p>
      </div>
    </div>
  );
}
