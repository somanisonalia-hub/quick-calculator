'use client';

import { useState, useEffect } from 'react';

interface Fraction {
  whole: number;
  numerator: number;
  denominator: number;
}

interface FractionCalculatorProps {
  lang?: string;
}

export default function FractionCalculator({ lang = 'en' }: FractionCalculatorProps) {
  const [operation, setOperation] = useState('add');
  const [fraction1, setFraction1] = useState<Fraction>({ whole: 0, numerator: 1, denominator: 2 });
  const [fraction2, setFraction2] = useState<Fraction>({ whole: 0, numerator: 1, denominator: 3 });
  const [outputFormat, setOutputFormat] = useState<'mixed' | 'improper'>('mixed');
  const [result, setResult] = useState('');
  const [steps, setSteps] = useState('');
  const [simplified, setSimplified] = useState('');
  const [decimal, setDecimal] = useState(0);

  const translations = {
    en: {
      title: "Fraction Calculator",
      description: "Perform fraction operations with step-by-step solutions and automatic simplification",
      operation: "Operation",
      add: "Add (+)",
      subtract: "Subtract (-)",
      multiply: "Multiply (×)",
      divide: "Divide (÷)",
      firstFraction: "First Fraction",
      secondFraction: "Second Fraction",
      whole: "Whole",
      numerator: "Numerator",
      denominator: "Denominator",
      outputFormat: "Output Format",
      mixed: "Mixed Number",
      improper: "Improper Fraction",
      result: "Result",
      stepByStep: "Step-by-Step Solution",
      simplified: "Simplified Result",
      decimal: "Decimal Equivalent",
      quickexamples: "Quick Examples",
      enterFractions: "Enter fractions to calculate",
      addExample: "Add: 1/2 + 1/3 = 5/6",
      subtractExample: "Subtract: 3/4 - 1/2 = 1/4",
      multiplyExample: "Multiply: 2/3 × 3/4 = 1/2",
      divideExample: "Divide: 1/2 ÷ 1/4 = 2",
      calculate: "🔄 Recalculate",
      reset: "Reset"
  },
    es: {
      title: "Calculadora de Fracciones",
      description: "Realiza operaciones con fracciones con soluciones paso a paso y simplificación automática",
      operation: "Operación",
      add: "Sumar (+)",
      subtract: "Restar (-)",
      multiply: "Multiplicar (×)",
      divide: "Dividir (÷)",
      firstFraction: "Primera Fracción",
      secondFraction: "Segunda Fracción",
      whole: "Entero",
      numerator: "Numerador",
      denominator: "Denominador",
      outputFormat: "Formato de Salida",
      mixed: "Número Mixto",
      improper: "Fracción Impropia",
      result: "Resultado",
      stepByStep: "Solución Paso a Paso",
      simplified: "Resultado Simplificado",
      decimal: "Equivalente Decimal",
      quickexamples: "Ejemplos Rápidos",
      enterFractions: "Ingresa fracciones para calcular",
      addExample: "Sumar: 1/2 + 1/3 = 5/6",
      subtractExample: "Restar: 3/4 - 1/2 = 1/4",
      multiplyExample: "Multiplicar: 2/3 × 3/4 = 1/2",
      divideExample: "Dividir: 1/2 ÷ 1/4 = 2",
      calculate: "🔄 Recalcular",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora de Frações",
      description: "Execute operações com frações com soluções passo a passo e simplificação automática",
      operation: "Operação",
      add: "Somar (+)",
      subtract: "Subtrair (-)",
      multiply: "Multiplicar (×)",
      divide: "Dividir (÷)",
      firstFraction: "Primeira Fração",
      secondFraction: "Segunda Fração",
      whole: "Inteiro",
      numerator: "Numerador",
      denominator: "Denominador",
      outputFormat: "Formato Saída",
      mixed: "Número Misto",
      improper: "Fração Imprópria",
      result: "Resultado",
      stepByStep: "Solução Passo a Passo",
      simplified: "Resultado Simplificado",
      decimal: "Equivalente Decimal",
      quickexamples: "Exemplos Rápidos",
      enterFractions: "Digite frações para calcular",
      addExample: "Somar: 1/2 + 1/3 = 5/6",
      subtractExample: "Subtrair: 3/4 - 1/2 = 1/4",
      multiplyExample: "Multiplicar: 2/3 × 3/4 = 1/2",
      divideExample: "Dividir: 1/2 ÷ 1/4 = 2",
      calculate: "🔄 Recalcular",
      reset: "Redefinir"
  },
    fr: {
      title: "Calculateur de Fractions",
      description: "Effectuez des opérations avec des fractions avec des solutions étape par étape et simplification automatique",
      operation: "Opération",
      add: "Addition (+)",
      subtract: "Soustraction (-)",
      multiply: "Multiplication (×)",
      divide: "Division (÷)",
      firstFraction: "Première Fraction",
      secondFraction: "Deuxième Fraction",
      whole: "Entier",
      numerator: "Numérateur",
      denominator: "Dénominateur",
      outputFormat: "Format Sortie",
      mixed: "Nombre Mixte",
      improper: "Fraction Impropore",
      result: "Résultat",
      stepByStep: "Solution Étape par Étape",
      simplified: "Résultat Simplifié",
      decimal: "Équivalent Décimal",
      quickexamples: "Exemples Rapides",
      enterFractions: "Entrez des fractions à calculer",
      addExample: "Addition: 1/2 + 1/3 = 5/6",
      subtractExample: "Soustraction: 3/4 - 1/2 = 1/4",
      multiplyExample: "Multiplication: 2/3 × 3/4 = 1/2",
      divideExample: "Division: 1/2 ÷ 1/4 = 2",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser"
  }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Helper functions for fraction operations
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

  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  const toImproperFraction = (fraction: Fraction): { numerator: number; denominator: number } => {
    return {
      numerator: fraction.whole * fraction.denominator + fraction.numerator,
      denominator: fraction.denominator
    };
  };

  const toMixedNumber = (numerator: number, denominator: number): Fraction => {
    const whole = Math.floor(Math.abs(numerator) / denominator);
    const remainingNumerator = Math.abs(numerator) % denominator;
    return {
      whole: numerator < 0 ? -whole : whole,
      numerator: remainingNumerator,
      denominator: denominator
    };
  };

  const simplifyFraction = (numerator: number, denominator: number): { numerator: number; denominator: number } => {
    const divisor = gcd(numerator, denominator);
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    };
  };

  const formatFraction = (fraction: Fraction, format: 'mixed' | 'improper' = 'mixed'): string => {
    if (fraction.denominator === 0) return 'Undefined (division by zero)';

    if (format === 'improper') {
      const improper = toImproperFraction(fraction);
      const simplified = simplifyFraction(improper.numerator, improper.denominator);
      return `<span class="fraction"><span class="numerator">${simplified.numerator}</span><span class="denominator">${simplified.denominator}</span></span>`;
    } else {
      // Mixed number format
      if (fraction.whole === 0 && fraction.numerator === 0) return '0';
      if (fraction.numerator === 0) return fraction.whole.toString();

      const simplified = simplifyFraction(fraction.numerator, fraction.denominator);
      if (simplified.numerator === 0) return fraction.whole.toString();

      if (fraction.whole === 0) {
        return `<span class="fraction"><span class="numerator">${simplified.numerator}</span><span class="denominator">${simplified.denominator}</span></span>`;
      } else {
        return `${fraction.whole}<span class="fraction"><span class="numerator">${simplified.numerator}</span><span class="denominator">${simplified.denominator}</span></span>`;
      }
    }
  };

  const calculateFractions = () => {
    if (fraction1.denominator === 0 || fraction2.denominator === 0) {
      setResult('Error: Division by zero');
      setSteps('Cannot divide by zero');
      setSimplified('Undefined');
      setDecimal(NaN);
      return;
    }

    const frac1 = toImproperFraction(fraction1);
    const frac2 = toImproperFraction(fraction2);

    let resultNumerator = 0;
    let resultDenominator = 0;
    let stepsText = '';

    switch (operation) {
      case 'add':
        resultDenominator = lcm(frac1.denominator, frac2.denominator);
        const frac1Multiplier = resultDenominator / frac1.denominator;
        const frac2Multiplier = resultDenominator / frac2.denominator;
        resultNumerator = frac1.numerator * frac1Multiplier + frac2.numerator * frac2Multiplier;

        stepsText = `Convert to improper fractions:\n${formatFraction(fraction1, 'improper')} + ${formatFraction(fraction2, 'improper')}\n\nFind common denominator (${resultDenominator}):\n${frac1.numerator * frac1Multiplier}/${resultDenominator} + ${frac2.numerator * frac2Multiplier}/${resultDenominator}\n\nAdd numerators:\n${resultNumerator}/${resultDenominator}`;
        break;

      case 'subtract':
        resultDenominator = lcm(frac1.denominator, frac2.denominator);
        const subFrac1Multiplier = resultDenominator / frac1.denominator;
        const subFrac2Multiplier = resultDenominator / frac2.denominator;
        resultNumerator = frac1.numerator * subFrac1Multiplier - frac2.numerator * subFrac2Multiplier;

        stepsText = `Convert to improper fractions:\n${formatFraction(fraction1, 'improper')} - ${formatFraction(fraction2, 'improper')}\n\nFind common denominator (${resultDenominator}):\n${frac1.numerator * subFrac1Multiplier}/${resultDenominator} - ${frac2.numerator * subFrac2Multiplier}/${resultDenominator}\n\nSubtract numerators:\n${resultNumerator}/${resultDenominator}`;
        break;

      case 'multiply':
        resultNumerator = frac1.numerator * frac2.numerator;
        resultDenominator = frac1.denominator * frac2.denominator;

        stepsText = `Multiply numerators: ${frac1.numerator} × ${frac2.numerator} = ${resultNumerator}\nMultiply denominators: ${frac1.denominator} × ${frac2.denominator} = ${resultDenominator}\n\nResult: ${resultNumerator}/${resultDenominator}`;
        break;

      case 'divide':
        // Division is multiplication by reciprocal
        resultNumerator = frac1.numerator * frac2.denominator;
        resultDenominator = frac1.denominator * frac2.numerator;

        stepsText = `Division by ${formatFraction(fraction2)} is multiplication by reciprocal ${frac2.denominator}/${frac2.numerator}\n\n${formatFraction(fraction1, 'improper')} × ${frac2.denominator}/${frac2.numerator}\n\nMultiply numerators: ${frac1.numerator} × ${frac2.denominator} = ${resultNumerator}\nMultiply denominators: ${frac1.denominator} × ${frac2.numerator} = ${resultDenominator}\n\nResult: ${resultNumerator}/${resultDenominator}`;
        break;

      default:
        return;
    }

    // Simplify the result
    const simplifiedResult = simplifyFraction(resultNumerator, resultDenominator);

    // Convert to mixed number if needed
    let resultFraction: Fraction;
    if (outputFormat === 'mixed') {
      resultFraction = toMixedNumber(simplifiedResult.numerator, simplifiedResult.denominator);
    } else {
      resultFraction = {
        whole: 0,
        numerator: simplifiedResult.numerator,
        denominator: simplifiedResult.denominator
      };
    }

    const resultText = formatFraction(resultFraction, outputFormat);
    const simplifiedText = formatFraction(toMixedNumber(simplifiedResult.numerator, simplifiedResult.denominator), 'mixed');
    const decimalValue = resultNumerator / resultDenominator;

    setResult(resultText);
    setSimplified(simplifiedText);
    setDecimal(decimalValue);

    // Add simplification step if needed
    if (simplifiedResult.numerator !== resultNumerator || simplifiedResult.denominator !== resultDenominator) {
      stepsText += `\n\nSimplify: ${resultNumerator}/${resultDenominator} ÷ ${gcd(resultNumerator, resultDenominator)} = ${simplifiedResult.numerator}/${simplifiedResult.denominator}`;
    }

    setSteps(stepsText);
  };

  useEffect(() => {
    calculateFractions();
  }, [operation, fraction1, fraction2, outputFormat]);

  const resetCalculator = () => {
    setFraction1({ whole: 0, numerator: 1, denominator: 2 });
    setFraction2({ whole: 0, numerator: 1, denominator: 3 });
    setOperation('add');
    setOutputFormat('mixed');
    setResult('');
    setSimplified('');
    setDecimal(0);
    setSteps('');
  };

  const updateFraction1 = (field: keyof Fraction, value: number) => {
    setFraction1(prev => ({ ...prev, [field]: value }));
  };

  const updateFraction2 = (field: keyof Fraction, value: number) => {
    setFraction2(prev => ({ ...prev, [field]: value }));
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
          {/* Operation Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.operation}
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="add">{t.add}</option>
              <option value="subtract">{t.subtract}</option>
              <option value="multiply">{t.multiply}</option>
              <option value="divide">{t.divide}</option>
            </select>
          </div>

          {/* Output Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.outputFormat}
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as 'mixed' | 'improper')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mixed">{t.mixed}</option>
              <option value="improper">{t.improper}</option>
            </select>
          </div>

          {/* Fraction Inputs - Unified Layout */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* First Fraction */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 text-center">{t.firstFraction}</h4>
                <div className="grid grid-cols-3 gap-1">
                  <div>
                    <input
                      type="number"
                      value={fraction1.whole}
                      onChange={(e) => updateFraction1('whole', Number(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full px-2 py-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={fraction1.numerator}
                      onChange={(e) => updateFraction1('numerator', Number(e.target.value) || 0)}
                      placeholder="1"
                      className="w-full px-2 py-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={fraction1.denominator}
                      onChange={(e) => updateFraction1('denominator', Number(e.target.value) || 1)}
                      placeholder="2"
                      className="w-full px-2 py-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      min="1"
                    />
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  <span dangerouslySetInnerHTML={{ __html: formatFraction(fraction1, 'mixed') }} />
                </div>
              </div>

              {/* Operation Symbol */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-3xl font-bold text-blue-600">
                  {operation === 'add' && '+'}
                  {operation === 'subtract' && '−'}
                  {operation === 'multiply' && '×'}
                  {operation === 'divide' && '÷'}
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {operation === 'add' && 'Addition'}
                  {operation === 'subtract' && 'Subtraction'}
                  {operation === 'multiply' && 'Multiplication'}
                  {operation === 'divide' && 'Division'}
                </div>
              </div>

              {/* Second Fraction */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 text-center">{t.secondFraction}</h4>
                <div className="grid grid-cols-3 gap-1">
                  <div>
                    <input
                      type="number"
                      value={fraction2.whole}
                      onChange={(e) => updateFraction2('whole', Number(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full px-2 py-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={fraction2.numerator}
                      onChange={(e) => updateFraction2('numerator', Number(e.target.value) || 0)}
                      placeholder="1"
                      className="w-full px-2 py-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      min="0"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={fraction2.denominator}
                      onChange={(e) => updateFraction2('denominator', Number(e.target.value) || 1)}
                      placeholder="2"
                      className="w-full px-2 py-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      min="1"
                    />
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  <span dangerouslySetInnerHTML={{ __html: formatFraction(fraction2, 'mixed') }} />
                </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={calculateFractions}
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
          </div>

          {/* Auto-calculation note */}
          <div className="pt-4 text-xs text-blue-600 text-center font-medium">
            📊 Calculations update automatically as you change values
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {/* Main Result */}
          <div className="bg-blue-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2 text-center">{t.result}</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 min-h-[48px] flex items-center justify-center">
                {result ? <span dangerouslySetInnerHTML={{ __html: result }} /> : t.enterFractions}
              </div>
            </div>
          </div>

          {/* Additional Results */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-green-900 mb-2 text-center">{t.simplified}</h4>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {simplified ? <span dangerouslySetInnerHTML={{ __html: simplified }} /> : '0'}
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-purple-900 mb-2 text-center">{t.decimal}</h4>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">
                  {isNaN(decimal) ? 'Undefined' : decimal.toFixed(4)}
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Solution */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2 text-center">{t.stepByStep}</h3>
            <div className="bg-white border border-gray-200 rounded p-3 max-h-48 overflow-y-auto">
              <div className="text-sm text-gray-700 whitespace-pre-line font-mono">
                {steps ? <span dangerouslySetInnerHTML={{ __html: steps }} /> : 'Steps will appear here after calculation'}
              </div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">{t.quickexamples}</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div>{t.addExample}</div>
              <div>{t.subtractExample}</div>
              <div>{t.multiplyExample}</div>
              <div>{t.divideExample}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
