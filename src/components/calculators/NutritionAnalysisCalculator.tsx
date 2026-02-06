'use client';

import { useState } from 'react';

interface NutritionAnalysisCalculatorProps {
  lang?: string;
}

export default function NutritionAnalysisCalculator({ lang = 'en' }: NutritionAnalysisCalculatorProps) {
  const [inputs, setInputs] = useState({
    calories: 2000,
    protein: 50,
    carbs: 250,
    fat: 70
  });

  const translations = {
    en: {
      title: "Nutrition Analysis Calculator",
      description: "Analyze macronutrient breakdown and caloric distribution",
      calories: "Total Calories",
      protein: "Protein (g)",
      carbs: "Carbohydrates (g)",
      fat: "Fat (g)",
      calculate: "Analyze",
      results: "Analysis Results",
      macroBreakdown: "Macro Breakdown"
    },
    es: {
      title: "Calculadora de Análisis Nutricional",
      description: "Analizar desglose de macronutrientes y distribución calórica",
      calories: "Calorías Totales",
      protein: "Proteína (g)",
      carbs: "Carbohidratos (g)",
      fat: "Grasa (g)",
      calculate: "Analizar",
      results: "Resultados del Análisis",
      macroBreakdown: "Desglose de Macros"
    },
    pt: {
      title: "Calculadora de Análise Nutricional",
      description: "Analisar distribuição de macronutrientes e distribuição calórica",
      calories: "Calorias Totais",
      protein: "Proteína (g)",
      carbs: "Carboidratos (g)",
      fat: "Gordura (g)",
      calculate: "Analisar",
      results: "Resultados da Análise",
      macroBreakdown: "Distribuição de Macros"
    },
    fr: {
      title: "Calculateur d'Analyse Nutritionnelle",
      description: "Analyser la répartition des macronutriments et la distribution calorique",
      calories: "Calories Totales",
      protein: "Protéines (g)",
      carbs: "Glucides (g)",
      fat: "Lipides (g)",
      calculate: "Analyser",
      results: "Résultats de l'Analyse",
      macroBreakdown: "Répartition des Macros"
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
          <label className="block text-sm font-medium mb-1">{t.calories}</label>
          <input
            type="number"
            value={inputs.calories}
            onChange={(e) => setInputs({ ...inputs, calories: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.protein}</label>
          <input
            type="number"
            value={inputs.protein}
            onChange={(e) => setInputs({ ...inputs, protein: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.carbs}</label>
          <input
            type="number"
            value={inputs.carbs}
            onChange={(e) => setInputs({ ...inputs, carbs: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.fat}</label>
          <input
            type="number"
            value={inputs.fat}
            onChange={(e) => setInputs({ ...inputs, fat: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t.calculate}
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{t.results}</h3>
        <p className="text-sm text-gray-600">Enter your nutrition data to analyze macro distribution.</p>
      </div>
    </div>
  );
}
