'use client';

import { useState } from 'react';

interface FitnessMetricsCalculatorProps {
  lang?: string;
}

export default function FitnessMetricsCalculator({ lang = 'en' }: FitnessMetricsCalculatorProps) {
  const [inputs, setInputs] = useState({
    weight: 70,
    height: 170,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate'
  });

  const translations = {
    en: {
      title: "Fitness Metrics Calculator",
      description: "Calculate comprehensive fitness and health metrics",
      weight: "Weight (kg)",
      height: "Height (cm)",
      age: "Age",
      gender: "Gender",
      male: "Male",
      female: "Female",
      activityLevel: "Activity Level",
      sedentary: "Sedentary",
      light: "Light",
      moderate: "Moderate",
      active: "Active",
      veryActive: "Very Active",
      calculate: "Calculate",
      results: "Results"
    },
    es: {
      title: "Calculadora de Métricas de Fitness",
      description: "Calcular métricas completas de fitness y salud",
      weight: "Peso (kg)",
      height: "Altura (cm)",
      age: "Edad",
      gender: "Género",
      male: "Masculino",
      female: "Femenino",
      activityLevel: "Nivel de Actividad",
      sedentary: "Sedentario",
      light: "Ligero",
      moderate: "Moderado",
      active: "Activo",
      veryActive: "Muy Activo",
      calculate: "Calcular",
      results: "Resultados"
    },
    pt: {
      title: "Calculadora de Métricas de Fitness",
      description: "Calcular métricas abrangentes de fitness e saúde",
      weight: "Peso (kg)",
      height: "Altura (cm)",
      age: "Idade",
      gender: "Gênero",
      male: "Masculino",
      female: "Feminino",
      activityLevel: "Nível de Atividade",
      sedentary: "Sedentário",
      light: "Leve",
      moderate: "Moderado",
      active: "Ativo",
      veryActive: "Muito Ativo",
      calculate: "Calcular",
      results: "Resultados"
    },
    fr: {
      title: "Calculateur de Métriques de Fitness",
      description: "Calculer les métriques complètes de fitness et santé",
      weight: "Poids (kg)",
      height: "Taille (cm)",
      age: "Âge",
      gender: "Genre",
      male: "Homme",
      female: "Femme",
      activityLevel: "Niveau d'Activité",
      sedentary: "Sédentaire",
      light: "Léger",
      moderate: "Modéré",
      active: "Actif",
      veryActive: "Très Actif",
      calculate: "Calculer",
      results: "Résultats"
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
          <label className="block text-sm font-medium mb-1">{t.height}</label>
          <input
            type="number"
            value={inputs.height}
            onChange={(e) => setInputs({ ...inputs, height: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.age}</label>
          <input
            type="number"
            value={inputs.age}
            onChange={(e) => setInputs({ ...inputs, age: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.gender}</label>
          <select
            value={inputs.gender}
            onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="male">{t.male}</option>
            <option value="female">{t.female}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.activityLevel}</label>
          <select
            value={inputs.activityLevel}
            onChange={(e) => setInputs({ ...inputs, activityLevel: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="sedentary">{t.sedentary}</option>
            <option value="light">{t.light}</option>
            <option value="moderate">{t.moderate}</option>
            <option value="active">{t.active}</option>
            <option value="veryActive">{t.veryActive}</option>
          </select>
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
