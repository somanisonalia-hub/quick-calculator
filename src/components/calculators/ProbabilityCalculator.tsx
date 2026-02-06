'use client';

import { useState } from 'react';

interface ProbabilityCalculatorProps {
  lang?: string;
}

export default function ProbabilityCalculator({ lang = 'en' }: ProbabilityCalculatorProps) {
  const [inputs, setInputs] = useState({
    favorableOutcomes: 1,
    totalOutcomes: 6
  });

  const translations = {
    en: {
      title: "Probability Calculator",
      description: "Calculate probability of events",
      favorableOutcomes: "Favorable Outcomes",
      totalOutcomes: "Total Possible Outcomes",
      calculate: "Calculate",
      results: "Results",
      probability: "Probability",
      percentage: "Percentage",
      odds: "Odds"
    },
    es: {
      title: "Calculadora de Probabilidad",
      description: "Calcular probabilidad de eventos",
      favorableOutcomes: "Resultados Favorables",
      totalOutcomes: "Total de Resultados Posibles",
      calculate: "Calcular",
      results: "Resultados",
      probability: "Probabilidad",
      percentage: "Porcentaje",
      odds: "Probabilidades"
    },
    pt: {
      title: "Calculadora de Probabilidade",
      description: "Calcular probabilidade de eventos",
      favorableOutcomes: "Resultados Favoráveis",
      totalOutcomes: "Total de Resultados Possíveis",
      calculate: "Calcular",
      results: "Resultados",
      probability: "Probabilidade",
      percentage: "Porcentagem",
      odds: "Chances"
    },
    fr: {
      title: "Calculateur de Probabilité",
      description: "Calculer la probabilité des événements",
      favorableOutcomes: "Résultats Favorables",
      totalOutcomes: "Total des Résultats Possibles",
      calculate: "Calculer",
      results: "Résultats",
      probability: "Probabilité",
      percentage: "Pourcentage",
      odds: "Cotes"
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
          <label className="block text-sm font-medium mb-1">{t.favorableOutcomes}</label>
          <input
            type="number"
            value={inputs.favorableOutcomes}
            onChange={(e) => setInputs({ ...inputs, favorableOutcomes: Number(e.target.value) })}
            min="0"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.totalOutcomes}</label>
          <input
            type="number"
            value={inputs.totalOutcomes}
            onChange={(e) => setInputs({ ...inputs, totalOutcomes: Number(e.target.value) })}
            min="1"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t.calculate}
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{t.results}</h3>
        <p className="text-sm text-gray-600">Enter favorable and total outcomes to calculate probability.</p>
      </div>
    </div>
  );
}
