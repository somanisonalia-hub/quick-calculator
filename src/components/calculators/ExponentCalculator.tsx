'use client';

import { useState } from 'react';

interface ExponentCalculatorProps {
  lang?: string;
}

export default function ExponentCalculator({ lang = 'en' }: ExponentCalculatorProps) {
  const [inputs, setInputs] = useState({
    base: 2,
    exponent: 3
  });

  const translations = {
    en: {
      title: "Exponent Calculator",
      description: "Calculate powers and exponential expressions",
      base: "Base",
      exponent: "Exponent",
      calculate: "Calculate",
      result: "Result",
      formula: "Formula"
    },
    es: {
      title: "Calculadora de Exponentes",
      description: "Calcular potencias y expresiones exponenciales",
      base: "Base",
      exponent: "Exponente",
      calculate: "Calcular",
      result: "Resultado",
      formula: "Fórmula"
    },
    pt: {
      title: "Calculadora de Expoentes",
      description: "Calcular potências e expressões exponenciais",
      base: "Base",
      exponent: "Expoente",
      calculate: "Calcular",
      result: "Resultado",
      formula: "Fórmula"
    },
    fr: {
      title: "Calculateur d'Exposants",
      description: "Calculer les puissances et expressions exponentielles",
      base: "Base",
      exponent: "Exposant",
      calculate: "Calculer",
      result: "Résultat",
      formula: "Formule"
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
          <label className="block text-sm font-medium mb-1">{t.base}</label>
          <input
            type="number"
            value={inputs.base}
            onChange={(e) => setInputs({ ...inputs, base: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.exponent}</label>
          <input
            type="number"
            value={inputs.exponent}
            onChange={(e) => setInputs({ ...inputs, exponent: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t.calculate}
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{t.result}</h3>
        <p className="text-sm text-gray-600">Enter values and click calculate to see the result.</p>
      </div>
    </div>
  );
}
