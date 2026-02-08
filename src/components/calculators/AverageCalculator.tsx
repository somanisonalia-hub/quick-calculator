'use client';

import { useState, useEffect } from 'react';

interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: string;
  placeholder?: string;
}

interface CalculatorOutput {
  label: string;
  default: string;
  format: string;
}

interface AverageCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: any[];
  lang?: string;
}

export default function AverageCalculator({ inputs, output, additionalOutputs, lang = 'en' }: AverageCalculatorProps) {
  const translations = {
    en: {
      title: "Average Calculator",
      description: "Calculate the arithmetic mean of a list of numbers",
      inputLabel: "Enter numbers (one per line or comma-separated)",
      inputPlaceholder: "85, 92, 78, 95, 88\nor\n85\n92\n78\n95\n88",
      calculate: "🔄 Recalculate",
      result: "Average",
      count: "Count",
      clear: "Clear",
      error: "Please enter valid numbers",
      instructions: "Enter each number on a new line, or separate with commas",
      reset: "Reset"
    },
    es: {
      title: "Calculadora de Promedio",
      description: "Calcula la media aritmética de una lista de números",
      inputLabel: "Ingresa números (uno por línea o separados por comas)",
      inputPlaceholder: "85, 92, 78, 95, 88\no\n85\n92\n78\n95\n88",
      calculate: "🔄 Recalcular",
      result: "Promedio",
      count: "Conteo",
      clear: "Limpiar",
      error: "Por favor ingresa números válidos",
      instructions: "Ingresa cada número en una nueva línea, o sepáralos con comas",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora de Média",
      description: "Calcula a média aritmética de uma lista de números",
      inputLabel: "Digite números (um por linha ou separados por vírgulas)",
      inputPlaceholder: "85, 92, 78, 95, 88\nou\n85\n92\n78\n95\n88",
      calculate: "🔄 Recalcular",
      result: "Média",
      count: "Contagem",
      clear: "Limpar",
      error: "Por favor digite números válidos",
      instructions: "Digite cada número em uma nova linha, ou separe com vírgulas",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur de Moyenne",
      description: "Calculez la moyenne arithmétique d'une liste de nombres",
      inputLabel: "Saisissez des nombres (un par ligne ou séparés par des virgules)",
      inputPlaceholder: "85, 92, 78, 95, 88\nou\n85\n92\n78\n95\n88",
      calculate: "🔄 Recalculer",
      result: "Moyenne",
      count: "Nombre",
      clear: "Effacer",
      error: "Veuillez saisir des nombres valides",
      instructions: "Saisissez chaque nombre sur une nouvelle ligne, ou séparez-les par des virgules",
      reset: "Réinitialiser"
    },
    de: {
      title: "Durchschnittrechner",
      description: "Berechne das arithmetische Mittel einer Liste von Zahlen",
      inputLabel: "Zahlen eingeben (eine pro Zeile oder durch Kommas getrennt)",
      inputPlaceholder: "85, 92, 78, 95, 88\noder\n85\n92\n78\n95\n88",
      calculate: "Durchschnitt berechnen",
      result: "Durchschnitt",
      count: "Anzahl",
      clear: "Löschen",
      error: "Bitte geben Sie gültige Zahlen ein",
      instructions: "Geben Sie jede Zahl in einer neuen Zeile ein, oder trennen Sie sie mit Kommas",
      reset: "Zurücksetzen"
    },
    nl: {
      title: "Gemiddelde Calculator",
      description: "Bereken het rekenkundig gemiddelde van een lijst met getallen",
      inputLabel: "Voer getallen in (één per regel of door komma's gescheiden)",
      inputPlaceholder: "85, 92, 78, 95, 88\nof\n85\n92\n78\n95\n88",
      calculate: "Gemiddelde berekenen",
      result: "Gemiddelde",
      count: "Aantal",
      clear: "Wissen",
      error: "Voer alstublieft geldige getallen in",
      instructions: "Voer elk getal op een nieuwe regel in, of scheid deze met komma's",
      reset: "Resetten"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [inputText, setInputText] = useState('');
  const [average, setAverage] = useState<number | null>(null);
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const calculateAverage = () => {
    setError('');

    // Split by commas and newlines, filter out empty values
    const numbers = inputText
      .split(/[,\n]/)
      .map(num => num.trim())
      .filter(num => num !== '')
      .map(num => parseFloat(num))
      .filter(num => !isNaN(num));

    if (numbers.length === 0) {
      setError(t.error);
      setAverage(null);
      setCount(0);
      return;
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const avg = sum / numbers.length;

    setAverage(avg);
    setCount(numbers.length);
  };

  const resetCalculator = () => {
    setInputText('');
    setAverage(null);
    setCount(0);
    setError('');
  };

  // Auto-calculate when input changes
  useEffect(() => {
    if (inputText.trim()) {
      calculateAverage();
    } else {
      setAverage(null);
      setCount(0);
      setError('');
    }
  }, [inputText]);

  const clearAll = () => {
    setInputText('');
    setAverage(null);
    setCount(0);
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Title and Description */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.inputLabel}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            />
            <p className="text-sm text-gray-500 mt-1">{t.instructions}</p>
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          {/* Auto-calculation note */}
          <div className="pt-2 text-xs text-blue-600 text-center font-medium">
            📊 Calculations update automatically as you change values
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateAverage}
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
      </div>

      {/* Results Section */}
      {(average !== null || count > 0) && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Results</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm font-medium text-blue-800 mb-1">{t.result}</div>
              <div className="text-2xl font-bold text-blue-900">
                {average?.toFixed(2) || '0.00'}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-sm font-medium text-green-800 mb-1">{t.count}</div>
              <div className="text-2xl font-bold text-green-900">
                {count}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}