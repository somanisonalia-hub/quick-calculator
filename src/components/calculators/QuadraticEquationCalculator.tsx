'use client';

import { useState, useEffect } from 'react';

interface QuadraticEquationCalculatorProps {
  lang?: string;
}

export default function QuadraticEquationCalculator({ lang = 'en' }: QuadraticEquationCalculatorProps) {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(6);
  const [roots, setRoots] = useState('');
  const [discriminant, setDiscriminant] = useState(0);
  const [rootType, setRootType] = useState('');

  const resetCalculator = () => {
    // Reset to default values
    setA(0);
    setB(0);
    setC(0);
    // Additional state resets may be needed
  };

  const translations = {
    en: {
      title: "Quadratic Equation Calculator",
      description: "Solve ax² + bx + c = 0",
      coefficientA: "Coefficient a",
      coefficientB: "Coefficient b",
      coefficientC: "Coefficient c",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      roots: "Roots",
      discriminant: "Discriminant",
      rootType: "Root Type",
      realRoots: "Two real roots",
      complexRoots: "Two complex roots",
      repeatedRoot: "One repeated real root"
    },
    es: {
      title: "Calculadora de Ecuaciones Cuadráticas",
      description: "Resuelve ax² + bx + c = 0",
      coefficientA: "Coeficiente a",
      coefficientB: "Coeficiente b",
      coefficientC: "Coeficiente c",
      calculate: "🔄 Recalcular",
      reset: "Restablecer",
      roots: "Raíces",
      discriminant: "Discriminante",
      rootType: "Tipo de Raíz",
      realRoots: "Dos raíces reales",
      complexRoots: "Dos raíces complejas",
      repeatedRoot: "Una raíz real repetida"
    },
    pt: {
      title: "Calculadora de Equações Quadráticas",
      description: "Resolve ax² + bx + c = 0",
      coefficientA: "Coeficiente a",
      coefficientB: "Coeficiente b",
      coefficientC: "Coeficiente c",
      calculate: "🔄 Recalcular",
      reset: "Redefinir",
      roots: "Raízes",
      discriminant: "Discriminante",
      rootType: "Tipo de Raíz",
      realRoots: "Duas raízes reais",
      complexRoots: "Duas raízes complexas",
      repeatedRoot: "Uma raiz real repetida"
    },
    fr: {
      title: "Calculateur d'Équations Quadratiques",
      description: "Résout ax² + bx + c = 0",
      coefficientA: "Coefficient a",
      coefficientB: "Coefficient b",
      coefficientC: "Coefficient c",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      roots: "Racines",
      discriminant: "Discriminant",
      rootType: "Type de Racine",
      realRoots: "Deux racines réelles",
      complexRoots: "Deux racines complexes",
      repeatedRoot: "Une racine réelle répétée"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  useEffect(() => {
    const disc = b * b - 4 * a * c;
    setDiscriminant(disc);

    if (disc > 0) {
      setRootType(t.realRoots);
      const root1 = (-b + Math.sqrt(disc)) / (2 * a);
      const root2 = (-b - Math.sqrt(disc)) / (2 * a);
      setRoots(`x = ${root1.toFixed(4)}, x = ${root2.toFixed(4)}`);
    } else if (disc === 0) {
      setRootType(t.repeatedRoot);
      const root = -b / (2 * a);
      setRoots(`x = ${root.toFixed(4)} (repeated)`);
    } else {
      setRootType(t.complexRoots);
      const realPart = (-b / (2 * a)).toFixed(4);
      const imagPart = (Math.sqrt(-disc) / (2 * a)).toFixed(4);
      setRoots(`x = ${realPart} ± ${imagPart}i`);
    }
  }, [a, b, c, lang]);

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">{t.coefficientA}</label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(Number(e.target.value) || 0)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">{t.coefficientB}</label>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(Number(e.target.value) || 0)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">{t.coefficientC}</label>
              <input
                type="number"
                value={c}
                onChange={(e) => setC(Number(e.target.value) || 0)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              />
            </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setA(a)}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.calculate}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>
          </div>

          <div className="text-center text-lg font-mono bg-gray-100 p-3 rounded">
            {a}x² + {b}x + {c} = 0
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.roots}</h3>
            <div className="text-xl font-mono text-blue-600">{roots}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-green-900 mb-1">{t.discriminant}</h4>
              <div className="text-lg font-bold text-green-600">{discriminant}</div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">{t.rootType}</h4>
              <div className="text-sm font-bold text-purple-600">{rootType}</div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-orange-900 mb-2">Quadratic Formula</h4>
            <div className="text-sm font-mono text-orange-700">
              x = [-b ± √(b² - 4ac)] / (2a)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
