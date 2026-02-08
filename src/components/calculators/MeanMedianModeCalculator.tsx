'use client';

import { useState, useEffect } from 'react';

interface MeanMedianModeCalculatorProps {
  lang?: string;
}

export default function MeanMedianModeCalculator({ lang = 'en' }: MeanMedianModeCalculatorProps) {
  const [dataInput, setDataInput] = useState('2, 4, 6, 8, 10');
  const [data, setData] = useState<number[]>([2, 4, 6, 8, 10]);
  const [showSteps, setShowSteps] = useState(false);

  const [results, setResults] = useState({
    mean: 0,
    median: 0,
    mode: [] as number[],
    range: 0,
    count: 0,
    sum: 0
  });

  const [steps, setSteps] = useState({
    meanSteps: [] as string[],
    medianSteps: [] as string[],
    modeSteps: [] as string[]
  });

  const translations = {
    en: {
      title: "Mean Median Mode Calculator",
      description: "Calculate the three measures of central tendency for statistical data analysis",
      dataInput: "Data Input",
      enterData: "Enter numbers separated by commas or spaces",
      showSteps: "Show Step-by-Step Calculations",
      calculate: "🔄 Recalculate",
      clear: "Clear Data",
      results: "Statistical Results",
      mean: "Mean (Average)",
      median: "Median",
      mode: "Mode",
      range: "Range",
      count: "Count",
      sum: "Sum",
      noMode: "No mode (all values unique)",
      multipleModes: "Multiple modes",
      stepByStep: "Step-by-Step Calculations",
      meanCalculation: "Mean Calculation",
      medianCalculation: "Median Calculation",
      modeCalculation: "Mode Calculation",
      step: "Step",
      explanation: "Explanation",
      sortedData: "Sorted Data",
      calculation: "Calculation",
      result: "Result",
      dataValidation: "Please enter valid numbers separated by commas or spaces.",
      reset: "Reset"
    },
    es: {
      title: "Calculadora de Media Mediana Moda",
      description: "Calcula las tres medidas de tendencia central para análisis estadístico de datos",
      dataInput: "Entrada de Datos",
      enterData: "Ingresa números separados por comas o espacios",
      showSteps: "Mostrar Cálculos Paso a Paso",
      calculate: "🔄 Recalcular",
      clear: "Limpiar Datos",
      results: "Resultados Estadísticos",
      mean: "Media (Promedio)",
      median: "Mediana",
      mode: "Moda",
      range: "Rango",
      count: "Conteo",
      sum: "Suma",
      noMode: "Sin moda (todos los valores únicos)",
      multipleModes: "Múltiples modas",
      stepByStep: "Cálculos Paso a Paso",
      meanCalculation: "Cálculo de la Media",
      medianCalculation: "Cálculo de la Mediana",
      modeCalculation: "Cálculo de la Moda",
      step: "Paso",
      explanation: "Explicación",
      sortedData: "Datos Ordenados",
      calculation: "Cálculo",
      result: "Resultado",
      dataValidation: "Por favor ingresa números válidos separados por comas o espacios.",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora de Média Mediana Moda",
      description: "Calcule as três medidas de tendência central para análise estatística de dados",
      dataInput: "Entrada de Dados",
      enterData: "Digite números separados por vírgulas ou espaços",
      showSteps: "Mostrar Cálculos Passo a Passo",
      calculate: "🔄 Recalcular",
      clear: "Limpar Dados",
      results: "Resultados Estatísticos",
      mean: "Média",
      median: "Mediana",
      mode: "Moda",
      range: "Amplitude",
      count: "Contagem",
      sum: "Soma",
      noMode: "Sem moda (todos os valores únicos)",
      multipleModes: "Múltiplas modas",
      stepByStep: "Cálculos Passo a Passo",
      meanCalculation: "Cálculo da Média",
      medianCalculation: "Cálculo da Mediana",
      modeCalculation: "Cálculo da Moda",
      step: "Passo",
      explanation: "Explicação",
      sortedData: "Dados Ordenados",
      calculation: "Cálculo",
      result: "Resultado",
      dataValidation: "Por favor digite números válidos separados por vírgulas ou espaços.",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur Moyenne Médiane Mode",
      description: "Calculez les trois mesures de tendance centrale pour l'analyse statistique des données",
      dataInput: "Saisie de Données",
      enterData: "Entrez des nombres séparés par des virgules ou des espaces",
      showSteps: "Afficher les Calculs Étape par Étape",
      calculate: "🔄 Recalculer",
      clear: "Effacer les Données",
      results: "Résultats Statistiques",
      mean: "Moyenne",
      median: "Médiane",
      mode: "Mode",
      range: "Étendue",
      count: "Nombre",
      sum: "Somme",
      noMode: "Aucun mode (toutes les valeurs uniques)",
      multipleModes: "Modes multiples",
      stepByStep: "Calculs Étape par Étape",
      meanCalculation: "Calcul de la Moyenne",
      medianCalculation: "Calcul de la Médiane",
      modeCalculation: "Calcul du Mode",
      step: "Étape",
      explanation: "Explication",
      sortedData: "Données Triées",
      calculation: "Calcul",
      result: "Résultat",
      dataValidation: "Veuillez saisir des nombres valides séparés par des virgules ou des espaces.",
      reset: "Réinitialiser"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Parse input data
  const parseData = (input: string): number[] => {
    return input
      .split(/[,\s]+/)
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(s => parseFloat(s))
      .filter(n => !isNaN(n));
  };

  // Calculate statistics
  const calculateStatistics = (numbers: number[]) => {
    if (numbers.length === 0) return;

    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / numbers.length;
    const range = sorted[sorted.length - 1] - sorted[0];

    // Calculate median
    let median: number;
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    // Calculate mode
    const frequency: { [key: number]: number } = {};
  
    numbers.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });

    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency)
      .filter(key => frequency[Number(key)] === maxFreq)
      .map(Number)
      .filter(num => maxFreq > 1); // Only if frequency > 1

    // Generate steps if requested
    let meanSteps: string[] = [];
    let medianSteps: string[] = [];
    let modeSteps: string[] = [];

    if (showSteps) {
      meanSteps = [
        `Sum of all numbers: ${numbers.join(' + ')} = ${sum}`,
        `Count of numbers: ${numbers.length}`,
        `Mean = ${sum} ÷ ${numbers.length} = ${mean.toFixed(3)}`
      ];

      medianSteps = [
        `Sorted data: ${sorted.join(', ')}`,
        `Count: ${sorted.length} ${sorted.length % 2 === 0 ? '(even)' : '(odd)'}`
      ];
      if (sorted.length % 2 === 0) {
        medianSteps.push(`Median = (${sorted[mid - 1]} + ${sorted[mid]}) ÷ 2 = ${median}`);
      } else {
        medianSteps.push(`Median = ${sorted[mid]} (middle value)`);
      }

      modeSteps = [
        `Frequency count: ${Object.entries(frequency).map(([num, freq]) => `${num}:${freq}`).join(', ')}`,
        `Highest frequency: ${maxFreq}`,
        modes.length === 0 ? 'No number appears more than once' : `Mode(s): ${modes.join(', ')}`
      ];
    }

    setResults({
      mean,
      median,
      mode: modes,
      range,
      count: numbers.length,
      sum
    });

    setSteps({
      meanSteps,
      medianSteps,
      modeSteps
    });
  };

  useEffect(() => {
    const parsedData = parseData(dataInput);
    setData(parsedData);
    if (parsedData.length > 0) {
      calculateStatistics(parsedData);
    }
  }, [dataInput, showSteps]);

  const handleCalculate = () => {
    const parsedData = parseData(dataInput);
    setData(parsedData);
    if (parsedData.length > 0) {
      calculateStatistics(parsedData);
    }
  };

  const clearData = () => {
    setDataInput('');
    setData([]);
    setResults({
      mean: 0,
      median: 0,
      mode: [],
      range: 0,
      count: 0,
      sum: 0
    });
  };

  const resetCalculator = () => {
    setDataInput('2, 4, 6, 8, 10');
    setData([2, 4, 6, 8, 10]);
    setShowSteps(false);
    const parsedData = [2, 4, 6, 8, 10];
    calculateStatistics(parsedData);
  };

  const formatMode = (modes: number[]): string => {
    if (modes.length === 0) return t.noMode;
    if (modes.length === 1) return modes[0].toString();
    return `${t.multipleModes}: ${modes.join(', ')}`;
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
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.dataInput}</label>
            <textarea
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              placeholder={t.enterData}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1">{t.dataValidation}</p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showSteps"
              checked={showSteps}
              onChange={(e) => setShowSteps(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showSteps" className="text-sm text-gray-700">{t.showSteps}</label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.calculate}
            </button>
            <button
              onClick={clearData}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t.clear}
            </button>
          </div>

          {/* Data Preview */}
          {data.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Data Preview ({data.length} values)</h4>
              <div className="text-xs text-gray-700 break-all">
                {data.join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {data.length > 0 ? (
            <>
              <div className="bg-blue-50 p-4 rounded-lg">
          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>

                <h3 className="text-lg font-semibold text-blue-900 mb-3">{t.results}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">{t.mean}</div>
                    <div className="text-lg font-bold text-blue-600">{results.mean.toFixed(3)}</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">{t.median}</div>
                    <div className="text-lg font-bold text-blue-600">{results.median.toFixed(3)}</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">{t.mode}</div>
                    <div className="text-sm font-bold text-blue-600">{formatMode(results.mode)}</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">{t.range}</div>
                    <div className="text-lg font-bold text-blue-600">{results.range.toFixed(3)}</div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div className="text-xs text-gray-500">{t.count}: {results.count}</div>
                  <div className="text-xs text-gray-500">{t.sum}: {results.sum.toFixed(3)}</div>
                </div>
              </div>

              {/* Step-by-Step Calculations */}
              {showSteps && (
                <div className="space-y-3">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-green-900 mb-2">{t.meanCalculation}</h4>
                    <div className="text-xs space-y-1">
                      {steps.meanSteps.map((step, i) => (
                        <div key={i}>{step}</div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-orange-900 mb-2">{t.medianCalculation}</h4>
                    <div className="text-xs space-y-1">
                      {steps.medianSteps.map((step, i) => (
                        <div key={i}>{step}</div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-purple-900 mb-2">{t.modeCalculation}</h4>
                    <div className="text-xs space-y-1">
                      {steps.modeSteps.map((step, i) => (
                        <div key={i}>{step}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="text-gray-400 text-4xl mb-4">📊</div>
              <p className="text-gray-600">Enter data above to see statistical calculations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
