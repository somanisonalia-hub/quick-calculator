'use client';

import { useState } from 'react';

interface GcdLcmCalculatorProps {
  lang?: string;
}

export default function GcdLcmCalculator({ lang = 'en' }: GcdLcmCalculatorProps) {
  const [inputs, setInputs] = useState({
    number1: 12,
    number2: 18
  });

  const resetCalculator = () => {
    // Reset to default values
    setInputs(0);
  };

  const translations = {
    en: {
      title: "GCD & LCM Calculator",
      description: "Calculate Greatest Common Divisor and Least Common Multiple",
      number1: "First Number",
      number2: "Second Number",
      calculate: "🔄 Recalculate",
      results: "Results",
      gcd: "GCD (Greatest Common Divisor)",
      lcm: "LCM (Least Common Multiple)",
      reset: "Reset"
    },
    es: {
      title: "Calculadora MCD y MCM",
      description: "Calcular Máximo Común Divisor y Mínimo Común Múltiplo",
      number1: "Primer Número",
      number2: "Segundo Número",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      gcd: "MCD (Máximo Común Divisor)",
      lcm: "MCM (Mínimo Común Múltiplo)",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora MDC e MMC",
      description: "Calcular Máximo Divisor Comum e Mínimo Múltiplo Comum",
      number1: "Primeiro Número",
      number2: "Segundo Número",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      gcd: "MDC (Máximo Divisor Comum)",
      lcm: "MMC (Mínimo Múltiplo Comum)",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur PGCD et PPCM",
      description: "Calculer le Plus Grand Commun Diviseur et le Plus Petit Commun Multiple",
      number1: "Premier Nombre",
      number2: "Deuxième Nombre",
      calculate: "🔄 Recalculer",
      results: "Résultats",
      gcd: "PGCD (Plus Grand Commun Diviseur)",
      lcm: "PPCM (Plus Petit Commun Multiple)",
      reset: "Réinitialiser"
    },
    de: {
      title: "GCD & KGV Rechner",
      description: "Berechnen Sie den größten gemeinsamen Teiler und das kleinste gemeinsame Vielfache",
      number1: "Erste Zahl",
      number2: "Zweite Zahl",
      calculate: "🔄 Neu berechnen",
      results: "Ergebnisse",
      gcd: "GCD (Größter Gemeinsamer Teiler)",
      lcm: "KGV (Kleinstes Gemeinsames Vielfaches)",
      reset: "Zurücksetzen"
    },
    nl: {
      title: "GGD & KGV Rekenmachine",
      description: "Bereken de grootste gemene deler en het kleinste gemene veelvoud",
      number1: "Eerste Getal",
      number2: "Tweede Getal",
      calculate: "🔄 Herberekenen",
      results: "Resultaten",
      gcd: "GGD (Grootste Gemene Deler)",
      lcm: "KGV (Kleinste Gemene Veelvoud)",
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
          <label className="block text-sm font-medium mb-1">{t.number1}</label>
          <input
            type="number"
            value={inputs.number1}
            onChange={(e) => setInputs({ ...inputs, number1: Number(e.target.value) })}
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
          <label className="block text-sm font-medium mb-1">{t.number2}</label>
          <input
            type="number"
            value={inputs.number2}
            onChange={(e) => setInputs({ ...inputs, number2: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t.calculate}
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{t.results}</h3>
        <p className="text-sm text-gray-600">Enter two numbers and click calculate to see results.</p>
      </div>
    </div>
  );
}
