'use client';

import { useState, useEffect } from 'react';

interface DecimalToFractionCalculatorProps {
  lang?: string;
}

export default function DecimalToFractionCalculator({ lang = 'en' }: DecimalToFractionCalculatorProps) {
  const [decimal, setDecimal] = useState<string>('0.75');
  const [numerator, setNumerator] = useState<number>(0);
  const [denominator, setDenominator] = useState<number>(1);
  const [mixedNumber, setMixedNumber] = useState<string>('');
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const translations = {
    en: {
      title: "Decimal to Fraction Calculator",
      description: "Convert decimal numbers to simplified fractions",
      decimalLabel: "Decimal Number",
      simplifiedFraction: "Simplified Fraction",
      mixedNumber: "Mixed Number",
      calculationSteps: "Calculation Steps",
      invalidInput: "Please enter a valid decimal number",
      enterDecimal: "Enter a decimal number",
    },
    es: {
      title: "Calculadora de Decimal a Fracción",
      description: "Convertir números decimales a fracciones simplificadas",
      decimalLabel: "Número Decimal",
      simplifiedFraction: "Fracción Simplificada",
      mixedNumber: "Número Mixto",
      calculationSteps: "Pasos de Cálculo",
      invalidInput: "Por favor ingresa un número decimal válido",
      enterDecimal: "Ingresa un número decimal",
    },
    pt: {
      title: "Calculadora de Decimal para Fração",
      description: "Converter números decimais para frações simplificadas",
      decimalLabel: "Número Decimal",
      simplifiedFraction: "Fração Simplificada",
      mixedNumber: "Número Misto",
      calculationSteps: "Passos de Cálculo",
      invalidInput: "Por favor digite um número decimal válido",
      enterDecimal: "Digite um número decimal",
    },
    fr: {
      title: "Calculateur de Décimal en Fraction",
      description: "Convertir nombres décimaux en fractions simplifiées",
      decimalLabel: "Nombre Décimal",
      simplifiedFraction: "Fraction Simplifiée",
      mixedNumber: "Nombre Mixte",
      calculationSteps: "Étapes de Calcul",
      invalidInput: "Veuillez entrer un nombre décimal valide",
      enterDecimal: "Entrez un nombre décimal",
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  useEffect(() => {
    convertDecimalToFraction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decimal, lang]);

  // Calculate Greatest Common Divisor (GCD) using Euclidean algorithm
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Check if decimal is a known repeating decimal
  const checkRepeatingDecimal = (dec: number): { numerator: number; denominator: number } | null => {
    const decStr = dec.toString();
    
    // Common repeating decimals
    const repeatingDecimals: { [key: string]: { numerator: number; denominator: number } } = {
      '0.3333333333333333': { numerator: 1, denominator: 3 },
      '0.6666666666666666': { numerator: 2, denominator: 3 },
      '0.16666666666666666': { numerator: 1, denominator: 6 },
      '0.8333333333333334': { numerator: 5, denominator: 6 },
      '0.14285714285714285': { numerator: 1, denominator: 7 },
      '0.2857142857142857': { numerator: 2, denominator: 7 },
      '0.42857142857142855': { numerator: 3, denominator: 7 },
      '0.5714285714285714': { numerator: 4, denominator: 7 },
      '0.7142857142857143': { numerator: 5, denominator: 7 },
      '0.8571428571428571': { numerator: 6, denominator: 7 },
      '0.1111111111111111': { numerator: 1, denominator: 9 },
      '0.2222222222222222': { numerator: 2, denominator: 9 },
      '0.4444444444444444': { numerator: 4, denominator: 9 },
      '0.5555555555555556': { numerator: 5, denominator: 9 },
      '0.7777777777777778': { numerator: 7, denominator: 9 },
      '0.8888888888888888': { numerator: 8, denominator: 9 },
    };

    return repeatingDecimals[decStr] || null;
  };

  const convertDecimalToFraction = () => {
    setError('');
    setSteps([]);

    const decValue = parseFloat(decimal);

    if (isNaN(decValue)) {
      setError(t.invalidInput);
      setNumerator(0);
      setDenominator(1);
      setMixedNumber('');
      return;
    }

    const calculationSteps: string[] = [];
    const isNegative = decValue < 0;
    const absValue = Math.abs(decValue);

    // Check for repeating decimal first
    const repeating = checkRepeatingDecimal(absValue);
    if (repeating) {
      let num = repeating.numerator;
      let den = repeating.denominator;

      if (isNegative) num = -num;

      calculationSteps.push(`Recognized repeating decimal pattern`);
      calculationSteps.push(`${decimal} = ${num}/${den}`);

      setNumerator(num);
      setDenominator(den);
      setSteps(calculationSteps);
      calculateMixedNumber(num, den);
      return;
    }

    // Handle whole numbers
    if (Number.isInteger(decValue)) {
      setNumerator(decValue);
      setDenominator(1);
      calculationSteps.push(`${decimal} is a whole number`);
      calculationSteps.push(`Result: ${decValue}/1`);
      setSteps(calculationSteps);
      setMixedNumber('');
      return;
    }

    // Convert decimal to fraction
    const decimalStr = absValue.toString();
    const decimalPlaces = decimalStr.split('.')[1]?.length || 0;

    if (decimalPlaces === 0) {
      setNumerator(isNegative ? -Math.round(absValue) : Math.round(absValue));
      setDenominator(1);
      setMixedNumber('');
      return;
    }

    // Calculate numerator and denominator
    let num = Math.round(absValue * Math.pow(10, decimalPlaces));
    let den = Math.pow(10, decimalPlaces);

    calculationSteps.push(`Step 1: Count decimal places: ${decimalPlaces}`);
    calculationSteps.push(`Step 2: Write as fraction: ${num}/${den}`);

    // Simplify using GCD
    const divisor = gcd(num, den);
    num = num / divisor;
    den = den / divisor;

    if (divisor > 1) {
      calculationSteps.push(`Step 3: Find GCD(${Math.round(absValue * Math.pow(10, decimalPlaces))}, ${Math.pow(10, decimalPlaces)}) = ${divisor}`);
      calculationSteps.push(`Step 4: Simplify by dividing both by ${divisor}`);
      calculationSteps.push(`Result: ${num}/${den}`);
    } else {
      calculationSteps.push(`Step 3: Fraction is already in simplest form`);
      calculationSteps.push(`Result: ${num}/${den}`);
    }

    if (isNegative) num = -num;

    setNumerator(num);
    setDenominator(den);
    setSteps(calculationSteps);
    calculateMixedNumber(num, den);
  };

  const calculateMixedNumber = (num: number, den: number) => {
    const absNum = Math.abs(num);
    const isNegative = num < 0;

    if (absNum < den) {
      setMixedNumber('');
      return;
    }

    const wholePart = Math.floor(absNum / den);
    const remainder = absNum % den;

    if (remainder === 0) {
      setMixedNumber(isNegative ? `-${wholePart}` : `${wholePart}`);
    } else {
      setMixedNumber(isNegative ? `-${wholePart} ${remainder}/${den}` : `${wholePart} ${remainder}/${den}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600 mb-6">{t.description}</p>

        {/* Input Section */}
        <div className="mb-6 hidden">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.decimalLabel}
          </label>
          <input
            type="text"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.75"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {!error && numerator !== 0 && (
          <div className="space-y-6">
            {/* Simplified Fraction */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.simplifiedFraction}</h3>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">
                    {numerator}
                  </div>
                  <div className="border-t-4 border-gray-800 my-2 w-24 mx-auto"></div>
                  <div className="text-4xl font-bold text-blue-600">
                    {denominator}
                  </div>
                </div>
              </div>
            </div>

            {/* Mixed Number */}
            {mixedNumber && (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.mixedNumber}</h3>
                <div className="text-3xl font-bold text-green-600 text-center">
                  {mixedNumber}
                </div>
              </div>
            )}

            {/* Calculation Steps */}
            {steps.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.calculationSteps}</h3>
                <ul className="space-y-2">
                  {steps.map((step, index) => (
                    <li key={index} className="text-gray-700">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Default Message */}
        {!error && numerator === 0 && denominator === 1 && (
          <div className="text-center py-8 text-gray-500">
            {t.enterDecimal}
          </div>
        )}
      </div>
    </div>
  );
}
