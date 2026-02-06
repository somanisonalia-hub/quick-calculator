'use client';

import { useState } from 'react';

interface FactorialCalculatorProps {
  lang?: string;
}

export default function FactorialCalculator({ lang = 'en' }: FactorialCalculatorProps) {
  const [inputs, setInputs] = useState({
    number: 5
  });

  const translations = {
    en: {
      title: "Factorial Calculator",
      description: "Calculate factorial (n!) of any positive integer",
      number: "Number",
      calculate: "Calculate",
      result: "Result",
      factorial: "Factorial"
    },
    es: {
      title: "Calculadora de Factoriales",
      description: "Calcular factorial (n!) de cualquier entero positivo",
      number: "Número",
      calculate: "Calcular",
      result: "Resultado",
      factorial: "Factorial"
    },
    pt: {
      title: "Calculadora de Fatorial",
      description: "Calcular fatorial (n!) de qualquer inteiro positivo",
      number: "Número",
      calculate: "Calcular",
      result: "Resultado",
      factorial: "Fatorial"
    },
    fr: {
      title: "Calculateur de Factorielle",
      description: "Calculer la factorielle (n!) de tout entier positif",
      number: "Nombre",
      calculate: "Calculer",
      result: "Résultat",
      factorial: "Factorielle"
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
          <label className="block text-sm font-medium mb-1">{t.number}</label>
          <input
            type="number"
            value={inputs.number}
            onChange={(e) => setInputs({ ...inputs, number: Number(e.target.value) })}
            min="0"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t.calculate}
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{t.result}</h3>
        <p className="text-sm text-gray-600">Enter a number and click calculate to see the factorial.</p>
      </div>
    </div>
  );
}
