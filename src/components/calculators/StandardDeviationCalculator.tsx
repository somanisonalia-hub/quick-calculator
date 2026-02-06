// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';

interface StandardDeviationCalculatorProps {
  lang?: string;
}

export default function StandardDeviationCalculator({ lang = 'en' }: StandardDeviationCalculatorProps) {
  const [dataInput, setDataInput] = useState('2, 4, 6, 8, 10');
  const [data, setData] = useState<number[]>([2, 4, 6, 8, 10]);
  const [calculationType, setCalculationType] = useState<'population' | 'sample'>('sample');
  const [showSteps, setShowSteps] = useState(false);

  const [results, setResults] = useState({
    mean: 0,
    variance: 0,
    stdDev: 0,
    count: 0,
    range: 0,
    min: 0,
    max: 0
  });

  const [steps, setSteps] = useState<string[]>([]);

  const translations = {
    en: {
      title: "Standard Deviation Calculator",
      description: "Calculate population and sample standard deviation for statistical analysis",
      dataInput: "Data Input",
      enterData: "Enter numbers separated by commas or spaces",
      calculationType: "Calculation Type",
      population: "Population Standard Deviation",
      sample: "Sample Standard Deviation",
      showSteps: "Show Step-by-Step Calculations",
      calculate: "Calculate Statistics",
      reset: "Reset",
      results: "Statistical Results",
      mean: "Mean (Average)",
      variance: "Variance",
      standardDeviation: "Standard Deviation",
      dataPoints: "Data Points",
      range: "Range",
      minimum: "Minimum",
      maximum: "Maximum",
      formula: "Formula Used",
      populationFormula: "σ = √[Σ(xi - μ)² / N]",
      sampleFormula: "s = √[Σ(xi - x̄)² / (n-1)]",
      stepByStep: "Step-by-Step Calculation",
      explanation: "Explanation",
      dataSummary: "Data Summary",
      calculations: "Calculations",
      squaredDifferences: "Squared Differences",
      varianceCalc: "Variance Calculation",
      stdDevCalc: "Standard Deviation"
    },
    es: {
      title: "Calculadora de Desviación Estándar",
      description: "Calcula desviación estándar poblacional y muestral para análisis estadístico",
      dataInput: "Entrada de Datos",
      enterData: "Ingresa números separados por comas o espacios",
      calculationType: "Tipo de Cálculo",
      population: "Desviación Estándar Poblacional",
      sample: "Desviación Estándar Muestral",
      showSteps: "Mostrar Cálculos Paso a Paso",
      calculate: "Calcular Estadísticas",
      reset: "Reiniciar",
      results: "Resultados Estadísticos",
      mean: "Media (Promedio)",
      variance: "Varianza",
      standardDeviation: "Desviación Estándar",
      dataPoints: "Puntos de Datos",
      range: "Rango",
      minimum: "Mínimo",
      maximum: "Máximo",
      formula: "Fórmula Utilizada",
      populationFormula: "σ = √[Σ(xi - μ)² / N]",
      sampleFormula: "s = √[Σ(xi - x̄)² / (n-1)]",
      stepByStep: "Cálculo Paso a Paso",
      explanation: "Explicación",
      dataSummary: "Resumen de Datos",
      calculations: "Cálculos",
      squaredDifferences: "Diferencias Cuadradas",
      varianceCalc: "Cálculo de Varianza",
      stdDevCalc: "Desviación Estándar"
    },
    pt: {
      title: "Calculadora de Desvio Padrão",
      description: "Calcule desvio padrão populacional e amostral para análise estatística",
      dataInput: "Entrada de Dados",
      enterData: "Digite números separados por vírgulas ou espaços",
      calculationType: "Tipo de Cálculo",
      population: "Desvio Padrão Populacional",
      sample: "Desvio Padrão Amostral",
      showSteps: "Mostrar Cálculos Passo a Passo",
      calculate: "Calcular Estatísticas",
      reset: "Reiniciar",
      results: "Resultados Estatísticos",
      mean: "Média",
      variance: "Variância",
      standardDeviation: "Desvio Padrão",
      dataPoints: "Pontos de Dados",
      range: "Amplitude",
      minimum: "Mínimo",
      maximum: "Máximo",
      formula: "Fórmula Utilizada",
      populationFormula: "σ = √[Σ(xi - μ)² / N]",
      sampleFormula: "s = √[Σ(xi - x̄)² / (n-1)]",
      stepByStep: "Cálculo Passo a Passo",
      explanation: "Explicação",
      dataSummary: "Resumo de Dados",
      calculations: "Cálculos",
      squaredDifferences: "Diferenças Quadradas",
      varianceCalc: "Cálculo de Variância",
      stdDevCalc: "Desvio Padrão"
    },    de: {
      title: "Standardabweichungsrechner",
      description: "Berechnen Sie Populationsstandardabweichung und Stichprobenstandardabweichung für statistische Analysen",
      dataInput: "Dateneingabe",
      enterData: "Geben Sie durch Kommas oder Leerzeichen getrennte Zahlen ein",
      calculationType: "Berechnungstyp",
      population: "Populationsstandardabweichung",
      sample: "Stichprobenstandardabweichung",
      showSteps: "Schrittweise Berechnungen Anzeigen",
      calculate: "Statistiken Berechnen",
      reset: "Zurücksetzen",
      results: "Statistische Ergebnisse",
      mean: "Mittelwert (Durchschnitt)",
      variance: "Varianz",
      standardDeviation: "Standardabweichung",
      dataPoints: "Datenpunkte",
      range: "Bereich",
      minimum: "Minimum",
      maximum: "Maximum",
      formula: "Verwendete Formel",
      populationFormula: "σ = √[Σ(xi - μ)² / N]",
      sampleFormula: "s = √[Σ(xi - x̄)² / (n-1)]",
      stepByStep: "Schrittweise Berechnung",
      explanation: "Erklärung",
      dataSummary: "Datenzusammenfassung",
      calculations: "Berechnungen",
      squaredDifferences: "Quadrierte Differenzen",
      varianceCalc: "Varianzberechnung",
      stdDevCalc: "Standardabweichung"
    },
    nl: {
      title: "Standaarddeviatie Rekenmachine",
      description: "Bereken populatie- en steekproefstandaarddeviatie voor statistische analyse",
      dataInput: "Gegevensinvoer",
      enterData: "Voer getallen in gescheiden door komma's of spaties",
      calculationType: "Berekeningstype",
      population: "Populationsstandarddeviatie",
      sample: "Steekproefstandaarddeviatie",
      showSteps: "Stap-voor-stapberekeningen Weergeven",
      calculate: "Statistieken Berekenen",
      reset: "Opnieuw Instellen",
      results: "Statistische Resultaten",
      mean: "Gemiddelde",
      variance: "Variantie",
      standardDeviation: "Standaarddeviatie",
      dataPoints: "Gegevenspunten",
      range: "Bereik",
      minimum: "Minimum",
      maximum: "Maximum",
      formula: "Gebruikte Formule",
      populationFormula: "σ = √[Σ(xi - μ)² / N]",
      sampleFormula: "s = √[Σ(xi - x̄)² / (n-1)]",
      stepByStep: "Stap-voor-stapberekening",
      explanation: "Uitleg",
      dataSummary: "Gegevenssamenvatting",
      calculations: "Berekeningen",
      squaredDifferences: "Gekwadrateerde Verschillen",
      varianceCalc: "Variabieberekening",
      stdDevCalc: "Standaarddeviatie"
    },    fr: {
      title: "Calculateur d'Écart Type",
      description: "Calculez écart type populationnel et échantillon pour analyse statistique",
      dataInput: "Saisie de Données",
      enterData: "Entrez des nombres séparés par des virgules ou des espaces",
      calculationType: "Type de Calcul",
      population: "Écart Type Populationnel",
      sample: "Écart Type d'Échantillon",
      showSteps: "Afficher les Calculs Étape par Étape",
      calculate: "Calculer les Statistiques",
      reset: "Réinitialiser",
      results: "Résultats Statistiques",
      mean: "Moyenne",
      variance: "Variance",
      standardDeviation: "Écart Type",
      dataPoints: "Points de Données",
      range: "Étendue",
      minimum: "Minimum",
      maximum: "Maximum",
      formula: "Formule Utilisée",
      populationFormula: "σ = √[Σ(xi - μ)² / N]",
      sampleFormula: "s = √[Σ(xi - x̄)² / (n-1)]",
      stepByStep: "Calcul Étape par Étape",
      explanation: "Explication",
      dataSummary: "Résumé des Données",
      calculations: "Calculs",
      squaredDifferences: "Différences Carrées",
      varianceCalc: "Calcul de Variance",
      stdDevCalc: "Écart Type"
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

    const count = numbers.length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / count;
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const range = max - min;

    // Calculate variance and standard deviation
    const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
    const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);

    let variance: number;
    let stdDev: number;

    if (calculationType === 'population') {
      variance = sumSquaredDiffs / count;
      stdDev = Math.sqrt(variance);
    } else {
      // Sample standard deviation
      variance = sumSquaredDiffs / (count - 1);
      stdDev = Math.sqrt(variance);
    }

    setResults({
      mean,
      variance,
      stdDev,
      count,
      range,
      min,
      max
    });

    // Generate steps if requested
    if (showSteps) {
      const stepsArray = [
        `Data set: [${numbers.join(', ')}]`,
        `Sample size (n): ${count}`,
        `Sum of values: ${numbers.join(' + ')} = ${sum.toFixed(2)}`,
        `Mean (x̄): ${sum.toFixed(2)} ÷ ${count} = ${mean.toFixed(4)}`,
        `Squared differences from mean:`,
        ...squaredDiffs.map((diff, i) => `  (${numbers[i]} - ${mean.toFixed(4)})² = ${diff.toFixed(4)}`),
        `Sum of squared differences: ${squaredDiffs.map(d => d.toFixed(4)).join(' + ')} = ${sumSquaredDiffs.toFixed(4)}`
      ];

      if (calculationType === 'population') {
        stepsArray.push(
          `Population variance: ${sumSquaredDiffs.toFixed(4)} ÷ ${count} = ${variance.toFixed(4)}`,
          `Population standard deviation: √${variance.toFixed(4)} = ${stdDev.toFixed(4)}`
        );
      } else {
        stepsArray.push(
          `Sample variance: ${sumSquaredDiffs.toFixed(4)} ÷ (${count} - 1) = ${sumSquaredDiffs.toFixed(4)} ÷ ${count - 1} = ${variance.toFixed(4)}`,
          `Sample standard deviation: √${variance.toFixed(4)} = ${stdDev.toFixed(4)}`
        );
      }

      setSteps(stepsArray);
    }
  };

  useEffect(() => {
    const parsedData = parseData(dataInput);
    setData(parsedData);
    if (parsedData.length > 0) {
      calculateStatistics(parsedData);
    }
  }, [dataInput, calculationType, showSteps]);

  const handleCalculate = () => {
    const parsedData = parseData(dataInput);
    setData(parsedData);
    if (parsedData.length > 0) {
      calculateStatistics(parsedData);
    }
  };

  const resetCalculator = () => {
    setDataInput('2, 4, 6, 8, 10');
    setCalculationType('sample');
    setShowSteps(false);
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.calculationType}</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'population' | 'sample')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sample">{t.sample}</option>
              <option value="population">{t.population}</option>
            </select>
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
              onClick={resetCalculator}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t.reset}
            </button>
          </div>

          {/* Formula Display */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.formula}</h4>
            <div className="text-sm font-mono text-green-700 mb-2">
              {calculationType === 'population' ? t.populationFormula : t.sampleFormula}
            </div>
            <div className="text-xs text-green-600">
              {calculationType === 'population'
                ? 'Use for complete data sets (entire population)'
                : 'Use for sample data (subset of population)'}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {data.length > 0 ? (
            <>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">{t.results}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">{t.mean}</div>
                    <div className="text-lg font-bold text-blue-600">{results.mean.toFixed(4)}</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">{t.variance}</div>
                    <div className="text-lg font-bold text-blue-600">{results.variance.toFixed(4)}</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">{t.standardDeviation}</div>
                    <div className="text-xl font-bold text-blue-900">{results.stdDev.toFixed(4)}</div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm text-gray-600">{t.range}</div>
                    <div className="text-lg font-bold text-blue-600">{results.range.toFixed(2)}</div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-gray-600">
                  <div>{t.dataPoints}: {results.count}</div>
                  <div>{t.minimum}: {results.min}</div>
                  <div>{t.maximum}: {results.max}</div>
                </div>
              </div>

              {/* Step-by-Step Calculation */}
              {showSteps && steps.length > 0 && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-orange-900 mb-3">{t.stepByStep}</h4>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="space-y-1 text-xs font-mono">
                      {steps.map((step, index) => (
                        <div key={index} className="text-orange-700">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Data Visualization */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-purple-900 mb-2">Data Distribution</h4>
                <div className="flex items-end justify-center space-x-1 h-32">
                  {data.map((value, index) => {
                    const heightPercent = ((value - results.min) / (results.max - results.min || 1)) * 100;
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="bg-purple-500 rounded-t w-6"
                          style={{ height: `${Math.max(4, heightPercent)}%` }}
                        ></div>
                        <div className="text-xs text-purple-700 mt-1 transform -rotate-45 origin-top">
                          {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center text-xs text-purple-600 mt-2">
                  Mean: {results.mean.toFixed(2)} | SD: {results.stdDev.toFixed(2)}
                </div>
              </div>

              {/* Examples */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">Examples</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div>Low variation: [5,5,5,5,5] → SD = 0</div>
                  <div>High variation: [1,10,1,10,1] → SD ≈ 4.47</div>
                  <div>Sample vs Population: Sample SD is larger</div>
                  <div>Normal distribution: Most data near mean</div>
                </div>
              </div>
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
