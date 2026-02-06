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
      calculate: "Calculate",
      results: "Results",
      caloriesBurned: "Calories Burned"
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
      calculate: "Calcular",
      results: "Resultados",
      caloriesBurned: "Calorías Quemadas"
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
      calculate: "Calcular",
      results: "Resultados",
      caloriesBurned: "Calorias Queimadas"
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
      calculate: "Calculer",
      results: "Résultats",
      caloriesBurned: "Calories Brûlées"
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
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{t.results}</h3>
        <p className="text-sm text-gray-600">Enter your information and click calculate to see results.</p>
      </div>
    </div>
  );
}
