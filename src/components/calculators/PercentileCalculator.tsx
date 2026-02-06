'use client';

import { useState } from 'react';

interface PercentileCalculatorProps {
  lang?: string;
}

export default function PercentileCalculator({ lang = 'en' }: PercentileCalculatorProps) {
  const [inputs, setInputs] = useState({
    values: '10, 20, 30, 40, 50, 60, 70, 80, 90, 100',
    percentile: 75
  });

  const translations = {
    en: {
      title: "Percentile Calculator",
      description: "Calculate percentiles from a data set",
      values: "Values (comma-separated)",
      percentile: "Percentile (%)",
      calculate: "Calculate",
      result: "Result",
      percentileValue: "Percentile Value"
    },
    es: {
      title: "Calculadora de Percentiles",
      description: "Calcular percentiles de un conjunto de datos",
      values: "Valores (separados por comas)",
      percentile: "Percentil (%)",
      calculate: "Calcular",
      result: "Resultado",
      percentileValue: "Valor del Percentil"
    },
    pt: {
      title: "Calculadora de Percentis",
      description: "Calcular percentis de um conjunto de dados",
      values: "Valores (separados por vírgulas)",
      percentile: "Percentil (%)",
      calculate: "Calcular",
      result: "Resultado",
      percentileValue: "Valor do Percentil"
    },
    fr: {
      title: "Calculateur de Percentiles",
      description: "Calculer les percentiles d'un ensemble de données",
      values: "Valeurs (séparées par des virgules)",
      percentile: "Percentile (%)",
      calculate: "Calculer",
      result: "Résultat",
      percentileValue: "Valeur du Percentile"
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
          <label className="block text-sm font-medium mb-1">{t.values}</label>
          <textarea
            value={inputs.values}
            onChange={(e) => setInputs({ ...inputs, values: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.percentile}</label>
          <input
            type="number"
            value={inputs.percentile}
            onChange={(e) => setInputs({ ...inputs, percentile: Number(e.target.value) })}
            min="0"
            max="100"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t.calculate}
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{t.result}</h3>
        <p className="text-sm text-gray-600">Enter your data values and percentile to calculate.</p>
      </div>
    </div>
  );
}
