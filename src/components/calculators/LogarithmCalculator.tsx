'use client';

import { useState } from 'react';

interface LogarithmCalculatorProps {
  lang?: string;
}

export default function LogarithmCalculator({ lang = 'en' }: LogarithmCalculatorProps) {
  const [inputs, setInputs] = useState({
    value: 100,
    base: 10
  });

  const resetCalculator = () => {
    // Reset to default values
    setInputs({ value: 100, base: 10 });
  };

  const translations = {
    en: {
      title: "Logarithm Calculator",
      description: "Calculate logarithms with any base",
      value: "Value",
      base: "Base",
      calculate: "🔄 Recalculate",
      result: "Result",
      naturalLog: "Natural Log (ln)",
      commonLog: "Common Log (log₁₀)",
      reset: "Reset"
    },
    es: {
      title: "Calculadora de Logaritmos",
      description: "Calcular logaritmos con cualquier base",
      value: "Valor",
      base: "Base",
      calculate: "🔄 Recalcular",
      result: "Resultado",
      naturalLog: "Logaritmo Natural (ln)",
      commonLog: "Logaritmo Común (log₁₀)",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora de Logaritmos",
      description: "Calcular logaritmos com qualquer base",
      value: "Valor",
      base: "Base",
      calculate: "🔄 Recalcular",
      result: "Resultado",
      naturalLog: "Logaritmo Natural (ln)",
      commonLog: "Logaritmo Comum (log₁₀)",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur de Logarithmes",
      description: "Calculer les logarithmes avec n'importe quelle base",
      value: "Valeur",
      base: "Base",
      calculate: "🔄 Recalculer",
      result: "Résultat",
      naturalLog: "Logarithme Naturel (ln)",
      commonLog: "Logarithme Commun (log₁₀)",
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
            <label className="block text-sm font-medium mb-1">{t.value}</label>
            <input
              type="number"
              value={inputs.value}
              onChange={(e) => setInputs({ ...inputs, value: Number(e.target.value) })}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t.base}</label>
            <input
              type="number"
              value={inputs.base}
              onChange={(e) => setInputs({ ...inputs, base: Number(e.target.value) })}
              min="0"
              step="0.01"
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
            <h3 className="font-semibold mb-2">{t.result}</h3>
            <p className="text-sm text-gray-600">Enter value and base to calculate the logarithm.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
