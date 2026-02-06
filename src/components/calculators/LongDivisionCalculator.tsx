'use client';

import { useState } from 'react';

interface LongDivisionCalculatorProps {
  lang?: string;
}

export default function LongDivisionCalculator({ lang = 'en' }: LongDivisionCalculatorProps) {
  const [inputs, setInputs] = useState({
    dividend: 125,
    divisor: 5
  });

  const translations = {
    en: {
      title: "Long Division Calculator",
      description: "Perform long division with step-by-step solutions",
      dividend: "Dividend",
      divisor: "Divisor",
      calculate: "Calculate",
      results: "Results",
      quotient: "Quotient",
      remainder: "Remainder"
    },
    es: {
      title: "Calculadora de División Larga",
      description: "Realizar división larga con soluciones paso a paso",
      dividend: "Dividendo",
      divisor: "Divisor",
      calculate: "Calcular",
      results: "Resultados",
      quotient: "Cociente",
      remainder: "Resto"
    },
    pt: {
      title: "Calculadora de Divisão Longa",
      description: "Realizar divisão longa com soluções passo a passo",
      dividend: "Dividendo",
      divisor: "Divisor",
      calculate: "Calcular",
      results: "Resultados",
      quotient: "Quociente",
      remainder: "Resto"
    },
    fr: {
      title: "Calculateur de Division Longue",
      description: "Effectuer une division longue avec solutions étape par étape",
      dividend: "Dividende",
      divisor: "Diviseur",
      calculate: "Calculer",
      results: "Résultats",
      quotient: "Quotient",
      remainder: "Reste"
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
          <label className="block text-sm font-medium mb-1">{t.dividend}</label>
          <input
            type="number"
            value={inputs.dividend}
            onChange={(e) => setInputs({ ...inputs, dividend: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.divisor}</label>
          <input
            type="number"
            value={inputs.divisor}
            onChange={(e) => setInputs({ ...inputs, divisor: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t.calculate}
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{t.results}</h3>
        <p className="text-sm text-gray-600">Enter dividend and divisor to see the division result.</p>
      </div>
    </div>
  );
}
