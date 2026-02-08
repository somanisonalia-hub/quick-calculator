'use client';

import { useState } from 'react';

interface EnergyExpenditureCalculatorProps {
  lang?: string;
}

export default function EnergyExpenditureCalculator({ lang = 'en' }: EnergyExpenditureCalculatorProps) {
  const [inputs, setInputs] = useState({
    weight: 70,
    activityType: 'walking',
    duration: 30
  });

  const resetCalculator = () => {
    // Reset to default values
    setInputs(0);
  };

  const translations = {
    en: {
      title: "Energy Expenditure Calculator",
      description: "Calculate calories burned during physical activities",
      weight: "Weight (kg)",
      activityType: "Activity Type",
      duration: "Duration (minutes)",
      walking: "Walking",
      running: "Running",
      cycling: "Cycling",
      swimming: "Swimming",
      calculate: "🔄 Recalculate",
      results: "Results",
      caloriesBurned: "Calories Burned",
      reset: "Reset"
    },
    es: {
      title: "Calculadora de Gasto Energético",
      description: "Calcular calorías quemadas durante actividades físicas",
      weight: "Peso (kg)",
      activityType: "Tipo de Actividad",
      duration: "Duración (minutos)",
      walking: "Caminar",
      running: "Correr",
      cycling: "Ciclismo",
      swimming: "Natación",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      caloriesBurned: "Calorías Quemadas",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora de Gasto Energético",
      description: "Calcular calorias queimadas durante atividades físicas",
      weight: "Peso (kg)",
      activityType: "Tipo de Atividade",
      duration: "Duração (minutos)",
      walking: "Caminhada",
      running: "Corrida",
      cycling: "Ciclismo",
      swimming: "Natação",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      caloriesBurned: "Calorias Queimadas",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur de Dépense Énergétique",
      description: "Calculer les calories brûlées pendant les activités physiques",
      weight: "Poids (kg)",
      activityType: "Type d'Activité",
      duration: "Durée (minutes)",
      walking: "Marche",
      running: "Course",
      cycling: "Cyclisme",
      swimming: "Natation",
      calculate: "🔄 Recalculer",
      results: "Résultats",
      caloriesBurned: "Calories Brûlées",
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

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t.weight}</label>
            <input
              type="number"
              value={inputs.weight}
              onChange={(e) => setInputs({ ...inputs, weight: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t.activityType}</label>
            <select
              value={inputs.activityType}
              onChange={(e) => setInputs({ ...inputs, activityType: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="walking">{t.walking}</option>
              <option value="running">{t.running}</option>
              <option value="cycling">{t.cycling}</option>
              <option value="swimming">{t.swimming}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t.duration}</label>
            <input
              type="number"
              value={inputs.duration}
              onChange={(e) => setInputs({ ...inputs, duration: Number(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
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
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">{t.results}</h3>
            <p className="text-sm text-gray-600">Enter your information and click calculate to see results.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
