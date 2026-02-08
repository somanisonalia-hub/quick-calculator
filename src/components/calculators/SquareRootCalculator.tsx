import React, { useState } from 'react';

interface SquareRootCalculatorProps {
  lang: string;
}

interface Translations {
  title: string;
  numberLabel: string;
  numberPlaceholder: string;
  rootTypeLabel: string;
  squareRoot: string;
  cubeRoot: string;
  nthRoot: string;
  nValueLabel: string;
  nValuePlaceholder: string;
  calculateButton: string;
  result: string;
  decimalForm: string;
  simplifiedForm: string;
  errorInvalidNumber: string;
  errorNegativeNumber: string;
  errorInvalidN: string;
}

const translations: Record<string, Translations> = {
  en: {
    title: 'Square Root Calculator',
    numberLabel: 'Enter Number',
    numberPlaceholder: 'Enter a positive number',
    rootTypeLabel: 'Root Type',
    squareRoot: 'Square Root (√)',
    cubeRoot: 'Cube Root (∛)',
    nthRoot: 'Nth Root',
    nValueLabel: 'Value of n',
    nValuePlaceholder: 'Enter n (e.g., 4 for 4th root)',
    calculateButton: 'Calculate',
    result: 'Result',
    decimalForm: 'Decimal Form',
    simplifiedForm: 'Simplified Radical Form',
    errorInvalidNumber: 'Please enter a valid positive number',
    errorNegativeNumber: 'Cannot calculate even roots of negative numbers',
    errorInvalidN: 'Please enter a valid value for n (integer ≥ 2)',
  },
  es: {
    title: 'Calculadora de Raíz Cuadrada',
    numberLabel: 'Ingrese el Número',
    numberPlaceholder: 'Ingrese un número positivo',
    rootTypeLabel: 'Tipo de Raíz',
    squareRoot: 'Raíz Cuadrada (√)',
    cubeRoot: 'Raíz Cúbica (∛)',
    nthRoot: 'Raíz Enésima',
    nValueLabel: 'Valor de n',
    nValuePlaceholder: 'Ingrese n (ej., 4 para raíz 4)',
    calculateButton: 'Calcular',
    result: 'Resultado',
    decimalForm: 'Forma Decimal',
    simplifiedForm: 'Forma Radical Simplificada',
    errorInvalidNumber: 'Por favor ingrese un número positivo válido',
    errorNegativeNumber: 'No se pueden calcular raíces pares de números negativos',
    errorInvalidN: 'Por favor ingrese un valor válido para n (entero ≥ 2)',
  },
  pt: {
    title: 'Calculadora de Raiz Quadrada',
    numberLabel: 'Digite o Número',
    numberPlaceholder: 'Digite um número positivo',
    rootTypeLabel: 'Tipo de Raiz',
    squareRoot: 'Raiz Quadrada (√)',
    cubeRoot: 'Raiz Cúbica (∛)',
    nthRoot: 'Raiz Enésima',
    nValueLabel: 'Valor de n',
    nValuePlaceholder: 'Digite n (ex., 4 para raiz 4)',
    calculateButton: 'Calcular',
    result: 'Resultado',
    decimalForm: 'Forma Decimal',
    simplifiedForm: 'Forma Radical Simplificada',
    errorInvalidNumber: 'Por favor digite um número positivo válido',
    errorNegativeNumber: 'Não é possível calcular raízes pares de números negativos',
    errorInvalidN: 'Por favor digite um valor válido para n (inteiro ≥ 2)',
  },
  fr: {
    title: 'Calculatrice de Racine Carrée',
    numberLabel: 'Entrez le Nombre',
    numberPlaceholder: 'Entrez un nombre positif',
    rootTypeLabel: 'Type de Racine',
    squareRoot: 'Racine Carrée (√)',
    cubeRoot: 'Racine Cubique (∛)',
    nthRoot: 'Racine Nième',
    nValueLabel: 'Valeur de n',
    nValuePlaceholder: 'Entrez n (ex., 4 pour racine 4)',
    calculateButton: 'Calculer',
    result: 'Résultat',
    decimalForm: 'Forme Décimale',
    simplifiedForm: 'Forme Radicale Simplifiée',
    errorInvalidNumber: 'Veuillez entrer un nombre positif valide',
    errorNegativeNumber: 'Impossible de calculer les racines paires de nombres négatifs',
    errorInvalidN: 'Veuillez entrer une valeur valide pour n (entier ≥ 2)',
  },
};

const SquareRootCalculator: React.FC<SquareRootCalculatorProps> = ({ lang = 'en' }) => {
  const t = translations[lang] || translations.en;
  
  const [number, setNumber] = useState<string>('');
  const [rootType, setRootType] = useState<'square' | 'cube' | 'nth'>('square');
  const [nValue, setNValue] = useState<string>('2');
  const [decimalResult, setDecimalResult] = useState<string>('');
  const [simplifiedResult, setSimplifiedResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const calculateRoot = () => {
    setError('');
    setDecimalResult('');
    setSimplifiedResult('');

    const num = parseFloat(number);
    
    if (isNaN(num)) {
      setError(t.errorInvalidNumber);
      return;
    }

    let n = 2;
    if (rootType === 'square') {
      n = 2;
    } else if (rootType === 'cube') {
      n = 3;
    } else {
      const parsedN = parseInt(nValue);
      if (isNaN(parsedN) || parsedN < 2) {
        setError(t.errorInvalidN);
        return;
      }
      n = parsedN;
    }

    // Check for negative numbers with even roots
    if (num < 0 && n % 2 === 0) {
      setError(t.errorNegativeNumber);
      return;
    }

    // Calculate the root
    let result: number;
    if (num < 0) {
      // Odd root of negative number
      result = -Math.pow(Math.abs(num), 1 / n);
    } else {
      result = Math.pow(num, 1 / n);
    }

    // Set decimal result (up to 10 decimal places)
    setDecimalResult(result.toFixed(10).replace(/\.?0+$/, ''));

    // Calculate simplified radical form
    const simplified = simplifyRadical(num, n);
    setSimplifiedResult(simplified);
  };

  const resetCalculator = () => {
    // Reset all input values to defaults
    const initial: Record<string, number> = {};
    inputs?.forEach(input => {
      initial[input.name] = input.default || 0;
    });
    setValues(initial);
    setResults({});
  };

  const simplifyRadical = (radicand: number, rootDegree: number): string => {
    const absRadicand = Math.abs(radicand);
    const isNegative = radicand < 0;
    
    // Check if it's a perfect root
    const root = Math.pow(absRadicand, 1 / rootDegree);
    if (Math.abs(root - Math.round(root)) < 0.0000001) {
      const exactRoot = Math.round(root);
      return isNegative ? `-${exactRoot}` : `${exactRoot}`;
    }

    // For square roots, try to simplify
    if (rootDegree === 2) {
      let coefficient = 1;
      let remainingRadicand = absRadicand;

      // Find perfect square factors
      for (let i = Math.floor(Math.sqrt(absRadicand)); i > 1; i--) {
        const square = i * i;
        if (absRadicand % square === 0) {
          coefficient = i;
          remainingRadicand = absRadicand / square;
          break;
        }
      }

      if (coefficient > 1) {
        const sign = isNegative ? '-' : '';
        return remainingRadicand === 1 
          ? `${sign}${coefficient}`
          : `${sign}${coefficient}√${remainingRadicand}`;
      }
    }

    // For cube roots, try to simplify
    if (rootDegree === 3) {
      let coefficient = 1;
      let remainingRadicand = absRadicand;

      // Find perfect cube factors
      for (let i = Math.floor(Math.pow(absRadicand, 1/3)); i > 1; i--) {
        const cube = i * i * i;
        if (absRadicand % cube === 0) {
          coefficient = i;
          remainingRadicand = absRadicand / cube;
          break;
        }
      }

      if (coefficient > 1) {
        const sign = isNegative ? '-' : '';
        return remainingRadicand === 1 
          ? `${sign}${coefficient}`
          : `${sign}${coefficient}∛${remainingRadicand}`;
      }
    }

    // Return in radical notation if not simplified
    const sign = isNegative ? '-' : '';
    if (rootDegree === 2) {
      return `${sign}√${absRadicand}`;
    } else if (rootDegree === 3) {
      return `${sign}∛${absRadicand}`;
    } else {
      return `${sign}${rootDegree}√${absRadicand}`;
    }
  };

  return (
    <div className="calculator-container max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        {t.title}
      </h2>

      <div className="space-y-4">
        {/* Number Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.numberLabel}
          </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder={t.numberPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Root Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.rootTypeLabel}
          </label>
          <select
            value={rootType}
            onChange={(e) => setRootType(e.target.value as 'square' | 'cube' | 'nth')}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="square">{t.squareRoot}</option>
            <option value="cube">{t.cubeRoot}</option>
            <option value="nth">{t.nthRoot}</option>
          </select>
        </div>

        {/* N Value Input (only shown for nth root) */}
        {rootType === 'nth' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.nValueLabel}
            </label>
            <input
              type="number"
              value={nValue}
              onChange={(e) => setNValue(e.target.value)}
              placeholder={t.nValuePlaceholder}
              min="2"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        )}

        {/* Calculate Button */}
        <button
          onClick={calculateRoot}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {t.calculateButton}
        </button>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>



        {/* Results */}
        {decimalResult && !error && (
          <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {t.result}
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{t.decimalForm}:</span>
                <span className="font-mono text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {decimalResult}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">{t.simplifiedForm}:</span>
                <span className="font-mono text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {simplifiedResult}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SquareRootCalculator;
