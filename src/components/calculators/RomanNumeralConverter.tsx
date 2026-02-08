'use client';

import React, { useState } from 'react';

interface RomanNumeralConverterProps {
  lang?: string;
}

const translations = {
  en: {
    title: 'Roman Numeral Converter',
    toRoman: 'Number to Roman',
    toNumber: 'Roman to Number',
    enterNumber: 'Enter a number (1-3999)',
    enterRoman: 'Enter Roman numerals',
    convert: 'Convert',
    result: 'Result',
    chart: 'Roman Numeral Chart',
    invalidNumber: 'Please enter a number between 1 and 3999',
    invalidRoman: 'Invalid Roman numeral',
    examples: 'Examples'
  },
  es: {
    title: 'Convertidor de Números Romanos',
    toRoman: 'Número a Romano',
    toNumber: 'Romano a Número',
    enterNumber: 'Ingresa un número (1-3999)',
    enterRoman: 'Ingresa números romanos',
    convert: 'Convertir',
    result: 'Resultado',
    chart: 'Tabla de Números Romanos',
    invalidNumber: 'Por favor ingresa un número entre 1 y 3999',
    invalidRoman: 'Número romano inválido',
    examples: 'Ejemplos'
  },
  pt: {
    title: 'Conversor de Números Romanos',
    toRoman: 'Número para Romano',
    toNumber: 'Romano para Número',
    enterNumber: 'Digite um número (1-3999)',
    enterRoman: 'Digite números romanos',
    convert: 'Converter',
    result: 'Resultado',
    chart: 'Tabela de Números Romanos',
    invalidNumber: 'Por favor digite um número entre 1 e 3999',
    invalidRoman: 'Número romano inválido',
    examples: 'Exemplos'
  },
  fr: {
    title: 'Convertisseur de Chiffres Romains',
    toRoman: 'Nombre vers Romain',
    toNumber: 'Romain vers Nombre',
    enterNumber: 'Entrez un nombre (1-3999)',
    enterRoman: 'Entrez des chiffres romains',
    convert: 'Convertir',
    result: 'Résultat',
    chart: 'Tableau des Chiffres Romains',
    invalidNumber: 'Veuillez entrer un nombre entre 1 et 3999',
    invalidRoman: 'Chiffre romain invalide',
    examples: 'Exemples'
  }
};

const romanNumerals = [
  { value: 1000, numeral: 'M' },
  { value: 900, numeral: 'CM' },
  { value: 500, numeral: 'D' },
  { value: 400, numeral: 'CD' },
  { value: 100, numeral: 'C' },
  { value: 90, numeral: 'XC' },
  { value: 50, numeral: 'L' },
  { value: 40, numeral: 'XL' },
  { value: 10, numeral: 'X' },
  { value: 9, numeral: 'IX' },
  { value: 5, numeral: 'V' },
  { value: 4, numeral: 'IV' },
  { value: 1, numeral: 'I' }
];

const romanValues: { [key: string]: number } = {
  I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
};

export default function RomanNumeralConverter({ lang = 'en' }: RomanNumeralConverterProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [mode, setMode] = useState<'toRoman' | 'toNumber'>('toRoman');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const resetCalculator = () => {
    // Reset to default values
    setMode(0);
    setInput(0);
    setResult('');
    // Additional state resets may be needed
  };

  const numberToRoman = (num: number): string => {
    if (num < 1 || num > 3999) return '';
    let result = '';
    let remaining = num;
    
    for (const { value, numeral } of romanNumerals) {
      while (remaining >= value) {
        result += numeral;
        remaining -= value;
      }
    }
    return result;
  };

  const romanToNumber = (roman: string): number => {
    const upperRoman = roman.toUpperCase();
    let result = 0;
    
    for (let i = 0; i < upperRoman.length; i++) {
      const current = romanValues[upperRoman[i]];
      const next = romanValues[upperRoman[i + 1]];
      
      if (current === undefined) return -1;
      
      if (next && current < next) {
        result -= current;
      } else {
        result += current;
      }
    }
    return result;
  };

  const handleConvert = () => {
    setError('');
    
    if (mode === 'toRoman') {
      const num = parseInt(input);
      if (isNaN(num) || num < 1 || num > 3999) {
        setError(t.invalidNumber);
        setResult('');
        return;
      }
      setResult(numberToRoman(num));
    } else {
      const num = romanToNumber(input);
      if (num === -1 || input.trim() === '') {
        setError(t.invalidRoman);
        setResult('');
        return;
      }
      // Validate by converting back
      if (numberToRoman(num) !== input.toUpperCase()) {
        setError(t.invalidRoman);
        setResult('');
        return;
      }
      setResult(num.toString());
    }
  };

  const examples = [
    { number: 1, roman: 'I' },
    { number: 5, roman: 'V' },
    { number: 10, roman: 'X' },
    { number: 50, roman: 'L' },
    { number: 100, roman: 'C' },
    { number: 500, roman: 'D' },
    { number: 1000, roman: 'M' },
    { number: 2024, roman: 'MMXXIV' },
    { number: 1999, roman: 'MCMXCIX' },
    { number: 3999, roman: 'MMMCMXCIX' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-5xl">🏛️</span>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{t.title}</h2>
      </div>

      {/* Mode Toggle */}
      <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 mb-6">
        <button
          onClick={() => { setMode('toRoman'); setInput(''); setResult(''); setError(''); }}
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${
            mode === 'toRoman' 
              ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          {t.toRoman}
        </button>
        <button
          onClick={() => { setMode('toNumber'); setInput(''); setResult(''); setError(''); }}
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${
            mode === 'toNumber' 
              ? 'bg-white dark:bg-gray-600 shadow text-blue-600 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          {t.toNumber}
        </button>
      </div>

      {/* Input */}
      <div className="space-y-4">
        <input
          type={mode === 'toRoman' ? 'number' : 'text'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'toRoman' ? t.enterNumber : t.enterRoman}
          min={mode === 'toRoman' ? 1 : undefined}
          max={mode === 'toRoman' ? 3999 : undefined}
          className="w-full px-4 py-4 text-2xl text-center rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white uppercase"
        />

        <button
          onClick={handleConvert}
          disabled={!input.trim()}
          className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {t.convert}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-center">
          {error}
        </div>
      )}
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleConvert}
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


      {/* Result */}
      {result && !error && (
        <div className="mt-6 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">{t.result}</p>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            {result}
          </p>
        </div>
      )}

      {/* Chart */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t.chart}</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {examples.map(({ number, roman }) => (
            <button
              key={number}
              onClick={() => {
                setInput(mode === 'toRoman' ? number.toString() : roman);
                setTimeout(handleConvert, 100);
              }}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-center"
            >
              <div className="text-lg font-bold text-gray-800 dark:text-white">{roman}</div>
              <div className="text-xs text-gray-500">{number}</div>
            </button>
          ))}
        </div>
  </div>
    </div>
  );
}
