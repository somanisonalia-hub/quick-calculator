'use client';

import { useState, useEffect } from 'react';

interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

interface CalculatorOutput {
  label: string;
  default: string;
  format: string;
}

interface AdditionalOutput {
  label: string;
  field: string;
  format: string;
}

interface GenericCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
  lang?: string;
}

export default function GenericCalculator({ inputs, output, additionalOutputs, lang = 'en' }: GenericCalculatorProps) {
  // Embedded translations
  const translations = {
    en: {
      calculate: "🔄 Calculate",
      reset: "Reset",
      results: "Results",
      formula: "Formula",
      inputs: "Calculator Inputs"
    },
    es: {
      calculate: "🔄 Calcular",
      reset: "Restablecer",
      results: "Resultados",
      formula: "Fórmula",
      inputs: "Entradas de Calculadora"
    },
    pt: {
      calculate: "🔄 Calcular",
      reset: "Redefinir",
      results: "Resultados",
      formula: "Fórmula",
      inputs: "Entradas da Calculadora"
    },
    fr: {
      calculate: "🔄 Calculer",
      reset: "Réinitialiser",
      results: "Résultats",
      formula: "Formule",
      inputs: "Entrées de Calculateur"
    },
    de: {
      calculate: "🔄 Berechnen",
      reset: "Zurücksetzen",
      results: "Ergebnisse",
      formula: "Formel",
      inputs: "Rechner-Eingaben"
    },
    nl: {
      calculate: "🔄 Berekenen",
      reset: "Opnieuw instellen",
      results: "Resultaten",
      formula: "Formule",
      inputs: "Rekenmachine Invoer"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, any>>({});

  // Calculate based on formula: Result = Value1 × Value2
  const calculate = () => {
    const value1 = values.value1 || 0;
    const value2 = values.value2 || 0;

    const result = value1 * value2;
    const percentage = value1 > 0 ? (value2 / value1) * 100 : 0;

    setResults({
      result: result.toFixed(2),
      percentage: percentage.toFixed(1)
    });
  };

  const resetCalculator = () => {
    const initial: Record<string, number> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    setValues(initial);
    setResults({});
  };

  const handleInputChange = (name: string, value: number) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Inputs */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">{t.inputs}</h3>

          {inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {input.label}
                {input.unit && <span className="text-gray-500 ml-1">({input.unit})</span>}
              </label>
              <input
                type="number"
                value={values[input.name] || ''}
                onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value) || 0)}
                min={input.min}
                max={input.max}
                step={input.step}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={calculate}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.calculate}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">{t.results}</h3>

          {/* Main Result */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {results.result || output.default}
            </div>
          </div>

          {/* Additional Outputs */}
          {additionalOutputs.map((additionalOutput) => (
            <div key={additionalOutput.field} className="bg-white border border-gray-200 p-3 rounded-md shadow-sm">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                {additionalOutput.label}
              </div>
              <div className="text-lg font-bold text-gray-900">
                {results[additionalOutput.field] ? `${results[additionalOutput.field]}${additionalOutput.format === '%' ? '%' : ''}` : '—'}
              </div>
            </div>
          ))}

          {/* Formula Display */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{t.formula}</div>
            <div className="text-sm font-mono text-gray-800 bg-white p-2 rounded border">
              Result = Value1 × Value2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}