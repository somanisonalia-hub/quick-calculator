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

  const translations = {
    en: {
      title: "GCD & LCM Calculator",
      description: "Calculate Greatest Common Divisor and Least Common Multiple",
      number1: "First Number",
      number2: "Second Number",
      calculate: "Calculate",
      results: "Results",
      gcd: "GCD (Greatest Common Divisor)",
      lcm: "LCM (Least Common Multiple)"
    },
    es: {
      title: "Calculadora MCD y MCM",
      description: "Calcular Máximo Común Divisor y Mínimo Común Múltiplo",
      number1: "Primer Número",
      number2: "Segundo Número",
      calculate: "Calcular",
      results: "Resultados",
      gcd: "MCD (Máximo Común Divisor)",
      lcm: "MCM (Mínimo Común Múltiplo)"
    },
    pt: {
      title: "Calculadora MDC e MMC",
      description: "Calcular Máximo Divisor Comum e Mínimo Múltiplo Comum",
      number1: "Primeiro Número",
      number2: "Segundo Número",
      calculate: "Calcular",
      results: "Resultados",
      gcd: "MDC (Máximo Divisor Comum)",
      lcm: "MMC (Mínimo Múltiplo Comum)"
    },
    fr: {
      title: "Calculateur PGCD et PPCM",
      description: "Calculer le Plus Grand Commun Diviseur et le Plus Petit Commun Multiple",
      number1: "Premier Nombre",
      number2: "Deuxième Nombre",
      calculate: "Calculer",
      results: "Résultats",
      gcd: "PGCD (Plus Grand Commun Diviseur)",
      lcm: "PPCM (Plus Petit Commun Multiple)"
    },
    de: {
      title: "GCD & KGV Rechner",
      description: "Berechnen Sie den größten gemeinsamen Teiler und das kleinste gemeinsame Vielfache",
      number1: "Erste Zahl",
      number2: "Zweite Zahl",
      calculate: "Berechnen",
      results: "Ergebnisse",
      gcd: "GCD (Größter Gemeinsamer Teiler)",
      lcm: "KGV (Kleinstes Gemeinsames Vielfaches)"
    },
    nl: {
      title: "GGD & KGV Rekenmachine",
      description: "Bereken de grootste gemene deler en het kleinste gemene veelvoud",
      number1: "Eerste Getal",
      number2: "Tweede Getal",
      calculate: "Berekenen",
      results: "Resultaten",
      gcd: "GGD (Grootste Gemene Deler)",
      lcm: "KGV (Kleinste Gemene Veelvoud)"
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
