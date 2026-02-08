'use client';

import React, { useState } from 'react';

interface NumberBaseConverterProps {
  lang?: string;
}

const translations = {
  en: {
    title: 'Number Base Converter',
    subtitle: 'Convert between Binary, Decimal, Hexadecimal, and Octal',
    decimal: 'Decimal',
    binary: 'Binary',
    hexadecimal: 'Hexadecimal',
    octal: 'Octal',
    inputLabel: 'Enter a number',
    convert: 'Convert',
    results: 'Conversion Results',
    invalid: 'Invalid input for selected base',
    copyToClipboard: 'Copy',
    copied: 'Copied!',
    commonValues: 'Common Values',
    bitOperations: 'Bit Information',
    numberOfBits: 'Number of bits',
    isPowerOf2: 'Power of 2'
  },
  es: {
    title: 'Convertidor de Bases Numéricas',
    subtitle: 'Convierte entre Binario, Decimal, Hexadecimal y Octal',
    decimal: 'Decimal',
    binary: 'Binario',
    hexadecimal: 'Hexadecimal',
    octal: 'Octal',
    inputLabel: 'Ingresa un número',
    convert: 'Convertir',
    results: 'Resultados de Conversión',
    invalid: 'Entrada inválida para la base seleccionada',
    copyToClipboard: 'Copiar',
    copied: '¡Copiado!',
    commonValues: 'Valores Comunes',
    bitOperations: 'Información de Bits',
    numberOfBits: 'Número de bits',
    isPowerOf2: 'Potencia de 2'
  },
  pt: {
    title: 'Conversor de Bases Numéricas',
    subtitle: 'Converta entre Binário, Decimal, Hexadecimal e Octal',
    decimal: 'Decimal',
    binary: 'Binário',
    hexadecimal: 'Hexadecimal',
    octal: 'Octal',
    inputLabel: 'Digite um número',
    convert: 'Converter',
    results: 'Resultados da Conversão',
    invalid: 'Entrada inválida para a base selecionada',
    copyToClipboard: 'Copiar',
    copied: 'Copiado!',
    commonValues: 'Valores Comuns',
    bitOperations: 'Informações de Bits',
    numberOfBits: 'Número de bits',
    isPowerOf2: 'Potência de 2'
  },
  fr: {
    title: 'Convertisseur de Bases Numériques',
    subtitle: 'Convertissez entre Binaire, Décimal, Hexadécimal et Octal',
    decimal: 'Décimal',
    binary: 'Binaire',
    hexadecimal: 'Hexadécimal',
    octal: 'Octal',
    inputLabel: 'Entrez un nombre',
    convert: 'Convertir',
    results: 'Résultats de Conversion',
    invalid: 'Entrée invalide pour la base sélectionnée',
    copyToClipboard: 'Copier',
    copied: 'Copié!',
    commonValues: 'Valeurs Communes',
    bitOperations: 'Informations sur les Bits',
    numberOfBits: 'Nombre de bits',
    isPowerOf2: 'Puissance de 2'
  }
};

type Base = 'decimal' | 'binary' | 'hexadecimal' | 'octal';

const baseConfig = {
  decimal: { radix: 10, prefix: '', pattern: /^[0-9]+$/ },
  binary: { radix: 2, prefix: '0b', pattern: /^[01]+$/ },
  hexadecimal: { radix: 16, prefix: '0x', pattern: /^[0-9A-Fa-f]+$/ },
  octal: { radix: 8, prefix: '0o', pattern: /^[0-7]+$/ }
};

export default function NumberBaseConverter({ lang = 'en' }: NumberBaseConverterProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [inputBase, setInputBase] = useState<Base>('decimal');
  const [input, setInput] = useState('255');
  const [results, setResults] = useState<Record<Base, string>>({
    decimal: '255',
    binary: '11111111',
    hexadecimal: 'FF',
    octal: '377'
  });
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<Base | null>(null);

  const resetCalculator = () => {
    // Reset to default values
    setInputBase(0);
    setInput(0);
    setResults('');
    // Additional state resets may be needed
  };

  const convert = () => {
    setError('');
    const cleanInput = input.trim().toUpperCase();
    
    if (!cleanInput) {
      setError(t.invalid);
      return;
    }

    const config = baseConfig[inputBase];
    if (!config.pattern.test(cleanInput)) {
      setError(t.invalid);
      return;
    }

    try {
      const decimalValue = parseInt(cleanInput, config.radix);
      
      if (isNaN(decimalValue) || decimalValue < 0) {
        setError(t.invalid);
        return;
      }

      setResults({
        decimal: decimalValue.toString(10),
        binary: decimalValue.toString(2),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
        octal: decimalValue.toString(8)
      });
    } catch {
      setError(t.invalid);
    }
  };

  const copyToClipboard = async (base: Base) => {
    await navigator.clipboard.writeText(results[base]);
    setCopied(base);
    setTimeout(() => setCopied(null), 2000);
  };

  const commonValues = [
    { dec: 0, name: 'Zero' },
    { dec: 1, name: 'One' },
    { dec: 8, name: 'Byte/8' },
    { dec: 16, name: '16' },
    { dec: 32, name: '32' },
    { dec: 64, name: '64' },
    { dec: 128, name: '128' },
    { dec: 255, name: '255 (Max Byte)' },
    { dec: 256, name: '256' },
    { dec: 1024, name: '1K' },
    { dec: 65535, name: '65535 (Max 16-bit)' }
  ];

  const decimalValue = parseInt(results.decimal) || 0;
  const numberOfBits = decimalValue > 0 ? Math.floor(Math.log2(decimalValue)) + 1 : 1;
  const isPowerOf2 = decimalValue > 0 && (decimalValue & (decimalValue - 1)) === 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-5xl">🔢</span>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* Input Base Selection */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {(['decimal', 'binary', 'hexadecimal', 'octal'] as Base[]).map((base) => (
          <button
            key={base}
            onClick={() => setInputBase(base)}
            className={`py-3 rounded-lg font-medium text-sm transition-all ${
              inputBase === base 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t[base]}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.inputLabel} ({t[inputBase]})
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-4 text-2xl text-center font-mono rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white uppercase"
          placeholder={inputBase === 'binary' ? '10101010' : inputBase === 'hexadecimal' ? 'FF' : '255'}
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-center">
          {error}
        </div>
      )}

      <button
        onClick={convert}
        className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all mb-6"
      >
        {t.convert}
      </button>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={convert}
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


      {/* Results */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 dark:text-white">{t.results}</h3>
        
        {(['decimal', 'binary', 'hexadecimal', 'octal'] as Base[]).map((base) => (
          <div 
            key={base}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex-1">
              <span className="text-sm text-gray-500 dark:text-gray-400 block">{t[base]}</span>
              <span className="font-mono text-lg text-gray-800 dark:text-white break-all">
                <span className="text-gray-400">{baseConfig[base].prefix}</span>
                {results[base]}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(base)}
              className="ml-4 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-all"
            >
              {copied === base ? t.copied : t.copyToClipboard}
            </button>
          </div>
        ))}
      </div>

      {/* Bit Information */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{t.bitOperations}</h3>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">{t.numberOfBits}: </span>
            <span className="font-semibold text-gray-800 dark:text-white">{numberOfBits}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">{t.isPowerOf2}: </span>
            <span className="font-semibold text-gray-800 dark:text-white">{isPowerOf2 ? '✅' : '❌'}</span>
          </div>
  </div>
      </div>

      {/* Common Values */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">{t.commonValues}</h3>
        <div className="flex flex-wrap gap-2">
          {commonValues.map(({ dec, name }) => (
            <button
              key={dec}
              onClick={() => {
                setInputBase('decimal');
                setInput(dec.toString());
                setTimeout(convert, 100);
              }}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
