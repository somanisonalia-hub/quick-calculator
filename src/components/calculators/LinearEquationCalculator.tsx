'use client';

import { useState } from 'react';

interface LinearEquationCalculatorProps {
  lang?: string;
}

export default function LinearEquationCalculator({ lang = 'en' }: LinearEquationCalculatorProps) {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState('');

  const translations = {
    en: {
      title: "Solve: ax + b = c",
      coefficientA: "Coefficient (a)",
      constantB: "Constant (b)",
      resultC: "Result (c)",
      calculate: "Solve for x",
      result: "Solution: x ="
    },
    es: {
      title: "Resolver: ax + b = c",
      coefficientA: "Coeficiente (a)",
      constantB: "Constante (b)",
      resultC: "Resultado (c)",
      calculate: "Resolver para x",
      result: "Solución: x ="
    },
    pt: {
      title: "Resolver: ax + b = c",
      coefficientA: "Coeficiente (a)",
      constantB: "Constante (b)",
      resultC: "Resultado (c)",
      calculate: "Resolver para x",
      result: "Solução: x ="
    },
    fr: {
      title: "Résoudre: ax + b = c",
      coefficientA: "Coefficient (a)",
      constantB: "Constante (b)",
      resultC: "Résultat (c)",
      calculate: "Résoudre pour x",
      result: "Solution: x ="
    },
    de: {
      title: "Lösen: ax + b = c",
      coefficientA: "Koeffizient (a)",
      constantB: "Konstante (b)",
      resultC: "Ergebnis (c)",
      calculate: "Lösen für x",
      result: "Lösung: x ="
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const solveEquation = () => {
    const coeffA = parseFloat(a);
    const constB = parseFloat(b);
    const resC = parseFloat(c);

    if (isNaN(coeffA) || isNaN(constB) || isNaN(resC)) return;
    if (coeffA === 0) {
      setResult("No solution (a cannot be 0)");
      return;
    }

    // ax + b = c
    // ax = c - b
    // x = (c - b) / a
    const x = (resC - constB) / coeffA;

    setResult(x.toFixed(4));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4 text-center text-gray-600 font-mono text-lg">
        {t.title}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.coefficientA}</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.constantB}</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.resultC}</label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={solveEquation}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t.calculate}
        </button>

        {result && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-center text-lg"><strong>{t.result}</strong> {result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
