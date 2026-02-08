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

  const resetCalculator = () => {
    // Reset to default values
    setInputs(0);
  };

  const translations = {
    en: {
      title: "Exponent Calculator",
      description: "Calculate powers and exponential expressions",
      base: "Base",
      exponent: "Exponent",
      calculate: "🔄 Recalculate",
      result: "Result",
      formula: "Formula",
      reset: "Reset"
    },
    es: {
      title: "Calculadora de Exponentes",
      description: "Calcular potencias y expresiones exponenciales",
      base: "Base",
      exponent: "Exponente",
      calculate: "🔄 Recalcular",
      result: "Resultado",
      formula: "Fórmula",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora de Expoentes",
      description: "Calcular potências e expressões exponenciais",
      base: "Base",
      exponent: "Expoente",
      calculate: "🔄 Recalcular",
      result: "Resultado",
      formula: "Fórmula",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur d'Exposants",
      description: "Calculer les puissances et expressions exponentielles",
      base: "Base",
      exponent: "Exposant",
      calculate: "🔄 Recalculer",
      result: "Résultat",
      formula: "Formule",
      reset: "Réinitialiser"
    },
    de: {
      title: "Exponentenrechner",
      description: "Berechnen Sie Potenzen und exponentielle Ausdrücke",
      base: "Basis",
      exponent: "Exponent",
      calculate: "🔄 Neu berechnen",
      result: "Ergebnis",
      formula: "Formel",
      reset: "Zurücksetzen"
    },
    nl: {
      title: "Machtscalculator",
      description: "Bereken machten en exponentiële uitdrukkingen",
      base: "Basis",
      exponent: "Exponent",
      calculate: "🔄 Herberekenen",
      result: "Resultaat",
      formula: "Formule",
      reset: "Resetten"
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
