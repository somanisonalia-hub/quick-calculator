'use client';

import { useState, useEffect } from 'react';

interface RatioCalculatorProps {
  lang?: string;
}

export default function RatioCalculator({ lang = 'en' }: RatioCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'simplify' | 'equivalent' | 'missing' | 'proportion'>('simplify');
  const [ratioInput, setRatioInput] = useState('4:6:8');
  const [ratio, setRatio] = useState<number[]>([4, 6, 8]);

  const [results, setResults] = useState({
    simplified: [] as number[],
    equivalent: [] as number[][],
    gcd: 0,
    sum: 0
  });

  const translations = {
    en: {
      title: "Ratio Calculator",
      description: "Calculate ratios, proportions, and equivalent ratios instantly",
      calculationType: "Calculation Type",
      simplify: "Simplify Ratio",
      equivalent: "Find Equivalent Ratios",
      missing: "Find Missing Value",
      proportion: "Solve Proportion",
      ratioInput: "Ratio Input",
      enterRatio: "Enter ratio separated by colons (e.g., 2:3:4)",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      results: "Results",
      simplifiedRatio: "Simplified Ratio",
      equivalentRatios: "Equivalent Ratios",
      greatestCommonDivisor: "Greatest Common Divisor",
      ratioSum: "Sum of Parts",
      explanation: "Explanation",
      steps: "Step-by-Step",
      examples: "Examples"
    },
    es: {
      title: "Calculadora de Proporciones",
      description: "Calcula proporciones y ratios equivalentes al instante",
      calculationType: "Tipo de Cálculo",
      simplify: "Simplificar Proporción",
      equivalent: "Encontrar Proporciones Equivalentes",
      missing: "Encontrar Valor Faltante",
      proportion: "Resolver Proporción",
      ratioInput: "Entrada de Proporción",
      enterRatio: "Ingresa proporción separada por dos puntos (ej., 2:3:4)",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      results: "Resultados",
      simplifiedRatio: "Proporción Simplificada",
      equivalentRatios: "Proporciones Equivalentes",
      greatestCommonDivisor: "Máximo Común Divisor",
      ratioSum: "Suma de Partes",
      explanation: "Explicación",
      steps: "Paso a Paso",
      examples: "Ejemplos"
    },
    pt: {
      title: "Calculadora de Proporção",
      description: "Calcule proporções e ratios equivalentes instantaneamente",
      calculationType: "Tipo de Cálculo",
      simplify: "Simplificar Proporção",
      equivalent: "Encontrar Proporções Equivalentes",
      missing: "Encontrar Valor Faltante",
      proportion: "Resolver Proporção",
      ratioInput: "Entrada de Proporção",
      enterRatio: "Digite proporção separada por dois pontos (ex., 2:3:4)",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      results: "Resultados",
      simplifiedRatio: "Proporção Simplificada",
      equivalentRatios: "Proporções Equivalentes",
      greatestCommonDivisor: "Máximo Divisor Comum",
      ratioSum: "Soma das Partes",
      explanation: "Explicação",
      steps: "Passo a Passo",
      examples: "Exemplos"
    },
    fr: {
      title: "Calculateur de Rapport",
      description: "Calculez rapports et proportions équivalentes instantanément",
      calculationType: "Type de Calcul",
      simplify: "Simplifier Rapport",
      equivalent: "Trouver Rapports Équivalents",
      missing: "Trouver Valeur Manquante",
      proportion: "Résoudre Proportion",
      ratioInput: "Entrée de Rapport",
      enterRatio: "Entrez rapport séparé par deux points (ex., 2:3:4)",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      results: "Résultats",
      simplifiedRatio: "Rapport Simplifié",
      equivalentRatios: "Rapports Équivalents",
      greatestCommonDivisor: "Plus Grand Diviseur Commun",
      ratioSum: "Somme des Parties",
      explanation: "Explication",
      steps: "Étape par Étape",
      examples: "Exemples"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Calculate GCD (Greatest Common Divisor)
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  // Calculate GCD for array
  const gcdArray = (arr: number[]): number => {
    return arr.reduce((acc, num) => gcd(acc, num));
  };

  // Simplify ratio
  const simplifyRatio = (arr: number[]): number[] => {
    const divisor = gcdArray(arr);
    return arr.map(num => num / divisor);
  };

  // Generate equivalent ratios
  const generateEquivalentRatios = (arr: number[], count: number = 4): number[][] => {
    const result: number[][] = [];
    for (let i = 2; i <= count + 1; i++) {
      result.push(arr.map(num => num * i));
    }
    return result;
  };

  const calculateRatio = () => {
    const parsedRatio = ratioInput
      .split(/[,:]/)
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(s => parseFloat(s))
      .filter(n => !isNaN(n) && n > 0);

    if (parsedRatio.length < 2) return;

    setRatio(parsedRatio);

    const simplified = simplifyRatio(parsedRatio);
    const equivalent = generateEquivalentRatios(simplified);
    const divisor = gcdArray(parsedRatio);
    const sum = parsedRatio.reduce((a, b) => a + b, 0);

    setResults({
      simplified,
      equivalent,
      gcd: divisor,
      sum
    });
  };

  useEffect(() => {
    calculateRatio();
  }, [ratioInput]);

  const resetCalculator = () => {
    setCalculationType('simplify');
    setRatioInput('4:6:8');
    setRatio([4, 6, 8]);
  };

  const formatRatio = (arr: number[]): string => {
    return arr.join(':');
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.calculationType}</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'simplify' | 'equivalent' | 'missing' | 'proportion')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="simplify">{t.simplify}</option>
              <option value="equivalent">{t.equivalent}</option>
              <option value="missing">{t.missing}</option>
              <option value="proportion">{t.proportion}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.ratioInput}</label>
            <input
              type="text"
              value={ratioInput}
              onChange={(e) => setRatioInput(e.target.value)}
              placeholder={t.enterRatio}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Use colons (:) or commas (,) to separate values</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateRatio}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.calculate}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t.reset}
            </button>
          </div>

          {/* Input Preview */}
          {ratio.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Input Preview</h4>
              <div className="text-sm text-gray-700">
                Original: {formatRatio(ratio)}
              </div>
              <div className="text-sm text-gray-700">
                Values: {ratio.join(', ')}
              </div>
            </div>
          )}

          {/* Formula */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">Formula</h4>
            <div className="text-sm font-mono text-green-700">
              {calculationType === 'simplify' && 'Simplified Ratio = Original ÷ GCD'}
              {calculationType === 'equivalent' && 'Equivalent Ratios = Original × Multiplier'}
              {calculationType === 'missing' && 'Missing Value = (Known Ratio × Total) ÷ Sum of Known Ratios'}
              {calculationType === 'proportion' && 'a/b = c/d → Cross multiplication'}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {ratio.length >= 2 && (
            <>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">{t.results}</h3>

                {/* Simplified Ratio */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">{t.simplifiedRatio}</h4>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatRatio(results.simplified)}
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">{t.greatestCommonDivisor}</div>
                    <div className="text-lg font-bold text-blue-600">{results.gcd}</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">{t.ratioSum}</div>
                    <div className="text-lg font-bold text-blue-600">{results.sum}</div>
                  </div>
                </div>
              </div>

              {/* Equivalent Ratios */}
              {calculationType === 'equivalent' && results.equivalent.length > 0 && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-purple-900 mb-2">{t.equivalentRatios}</h4>
                  <div className="space-y-1">
                    {results.equivalent.slice(0, 6).map((eq, index) => (
                      <div key={index} className="text-sm text-purple-700">
                        ×{index + 2}: {formatRatio(eq)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step-by-Step Explanation */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-orange-900 mb-3">{t.steps}</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>1.</strong> Parse input ratio: {formatRatio(ratio)}</div>
                  <div><strong>2.</strong> Find GCD of all numbers: {results.gcd}</div>
                  <div><strong>3.</strong> Divide each number by GCD: {formatRatio(results.simplified)}</div>
                  <div><strong>4.</strong> Sum of parts: {results.sum}</div>
                  {calculationType === 'equivalent' && (
                    <div><strong>5.</strong> Generate equivalent ratios by multiplication</div>
                  )}
                </div>
              </div>

              {/* Examples */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.examples}</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div>4:6:8 → 2:3:4 (divide by 2)</div>
                  <div>9:12:15 → 3:4:5 (divide by 3)</div>
                  <div>6:8:10 → 3:4:5 (divide by 2)</div>
                  <div>Equivalent: 2:3:4 → 4:6:8, 6:9:12, etc.</div>
                </div>
              </div>

              {/* Visual Ratio Representation */}
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-red-900 mb-2">Visual Ratio</h4>
                <div className="flex items-center justify-center space-x-2">
                  {results.simplified.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="bg-red-400 rounded"
                        style={{
                          width: `${Math.max(20, value * 10)}px`,
                          height: '20px'
                        }}
                      ></div>
                      <div className="text-xs mt-1 text-red-700">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-xs text-red-600 mt-2">
                  Ratio: {formatRatio(results.simplified)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
