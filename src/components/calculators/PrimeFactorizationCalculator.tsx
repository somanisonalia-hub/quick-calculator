import React, { useState } from 'react';

interface PrimeFactorizationCalculatorProps {
  lang: string;
}

interface Translations {
  title: string;
  numberLabel: string;
  numberPlaceholder: string;
  calculateButton: string;
  result: string;
  primeFactors: string;
  exponentialForm: string;
  factorTree: string;
  isPrime: string;
  isComposite: string;
  errorInvalidNumber: string;
  errorTooSmall: string;
  errorTooLarge: string;
  primeMessage: string;
  compositeMessage: string;
}

const translations: Record<string, Translations> = {
  en: {
    title: 'Prime Factorization Calculator',
    numberLabel: 'Enter Number',
    numberPlaceholder: 'Enter a positive integer greater than 1',
    calculateButton: 'Calculate',
    result: 'Result',
    primeFactors: 'Prime Factors',
    exponentialForm: 'Exponential Form',
    factorTree: 'Factor Tree',
    isPrime: 'Prime Number',
    isComposite: 'Composite Number',
    errorInvalidNumber: 'Please enter a valid positive integer',
    errorTooSmall: 'Please enter a number greater than 1',
    errorTooLarge: 'Number too large. Please enter a number less than 10^15',
    primeMessage: 'is a prime number. Its only factors are 1 and itself.',
    compositeMessage: 'is a composite number with the following prime factorization:',
  },
  es: {
    title: 'Calculadora de Factorización Prima',
    numberLabel: 'Ingrese el Número',
    numberPlaceholder: 'Ingrese un entero positivo mayor que 1',
    calculateButton: 'Calcular',
    result: 'Resultado',
    primeFactors: 'Factores Primos',
    exponentialForm: 'Forma Exponencial',
    factorTree: 'Árbol de Factores',
    isPrime: 'Número Primo',
    isComposite: 'Número Compuesto',
    errorInvalidNumber: 'Por favor ingrese un entero positivo válido',
    errorTooSmall: 'Por favor ingrese un número mayor que 1',
    errorTooLarge: 'Número demasiado grande. Por favor ingrese un número menor que 10^15',
    primeMessage: 'es un número primo. Sus únicos factores son 1 y él mismo.',
    compositeMessage: 'es un número compuesto con la siguiente factorización prima:',
  },
  pt: {
    title: 'Calculadora de Fatoração Prima',
    numberLabel: 'Digite o Número',
    numberPlaceholder: 'Digite um número inteiro positivo maior que 1',
    calculateButton: 'Calcular',
    result: 'Resultado',
    primeFactors: 'Fatores Primos',
    exponentialForm: 'Forma Exponencial',
    factorTree: 'Árvore de Fatores',
    isPrime: 'Número Primo',
    isComposite: 'Número Composto',
    errorInvalidNumber: 'Por favor digite um número inteiro positivo válido',
    errorTooSmall: 'Por favor digite um número maior que 1',
    errorTooLarge: 'Número muito grande. Por favor digite um número menor que 10^15',
    primeMessage: 'é um número primo. Seus únicos fatores são 1 e ele mesmo.',
    compositeMessage: 'é um número composto com a seguinte fatoração prima:',
  },
  fr: {
    title: 'Calculatrice de Factorisation Première',
    numberLabel: 'Entrez le Nombre',
    numberPlaceholder: 'Entrez un entier positif supérieur à 1',
    calculateButton: 'Calculer',
    result: 'Résultat',
    primeFactors: 'Facteurs Premiers',
    exponentialForm: 'Forme Exponentielle',
    factorTree: 'Arbre de Facteurs',
    isPrime: 'Nombre Premier',
    isComposite: 'Nombre Composé',
    errorInvalidNumber: 'Veuillez entrer un entier positif valide',
    errorTooSmall: 'Veuillez entrer un nombre supérieur à 1',
    errorTooLarge: 'Nombre trop grand. Veuillez entrer un nombre inférieur à 10^15',
    primeMessage: 'est un nombre premier. Ses seuls facteurs sont 1 et lui-même.',
    compositeMessage: 'est un nombre composé avec la factorisation première suivante :',
  },
};

interface FactorTreeNode {
  value: number;
  isPrime: boolean;
  children?: FactorTreeNode[];
}

const PrimeFactorizationCalculator: React.FC<PrimeFactorizationCalculatorProps> = ({ lang = 'en' }) => {
  const t = translations[lang] || translations.en;
  
  const [number, setNumber] = useState<string>('');
  const [primeFactors, setPrimeFactors] = useState<number[]>([]);
  const [exponentialForm, setExponentialForm] = useState<string>('');
  const [isPrime, setIsPrime] = useState<boolean>(false);
  const [factorTree, setFactorTree] = useState<FactorTreeNode | null>(null);
  const [error, setError] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);

  // Check if a number is prime
  const isPrimeNumber = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  };

  // Find prime factors using trial division
  const findPrimeFactors = (n: number): number[] => {
    const factors: number[] = [];
    let num = n;

    // Handle factor 2
    while (num % 2 === 0) {
      factors.push(2);
      num = num / 2;
    }

    // Handle odd factors from 3 onwards
    for (let i = 3; i * i <= num; i += 2) {
      while (num % i === 0) {
        factors.push(i);
        num = num / i;
      }
    }

    // If num > 1, then it's a prime factor
    if (num > 1) {
      factors.push(num);
    }

    return factors;
  };

  // Generate exponential form (e.g., 2³ × 3² × 5)
  const generateExponentialForm = (factors: number[]): string => {
    if (factors.length === 0) return '';

    const factorCount: Record<number, number> = {};
    factors.forEach(factor => {
      factorCount[factor] = (factorCount[factor] || 0) + 1;
    });

    const exponents = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
    
    const getExponent = (exp: number): string => {
      if (exp === 1) return '';
      return exp.toString().split('').map(d => exponents[parseInt(d)]).join('');
    };

    return Object.entries(factorCount)
      .map(([factor, count]) => `${factor}${getExponent(count)}`)
      .join(' × ');
  };

  // Build factor tree
  const buildFactorTree = (n: number): FactorTreeNode => {
    if (isPrimeNumber(n)) {
      return { value: n, isPrime: true };
    }

    // Find the smallest prime factor
    let smallestFactor = 2;
    if (n % 2 !== 0) {
      for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) {
          smallestFactor = i;
          break;
        }
      }
      if (smallestFactor === 2) smallestFactor = n; // n is prime
    }

    if (smallestFactor === n) {
      return { value: n, isPrime: true };
    }

    const otherFactor = n / smallestFactor;
    return {
      value: n,
      isPrime: false,
      children: [
        buildFactorTree(smallestFactor),
        buildFactorTree(otherFactor)
      ]
    };
  };

  const calculate = () => {
    setError('');
    setShowResult(false);
    setPrimeFactors([]);
    setExponentialForm('');
    setFactorTree(null);

    const num = parseInt(number);
    
    if (isNaN(num) || num !== parseFloat(number)) {
      setError(t.errorInvalidNumber);
      return;
    }

    if (num <= 1) {
      setError(t.errorTooSmall);
      return;
    }

    if (num > 1e15) {
      setError(t.errorTooLarge);
      return;
    }

    const prime = isPrimeNumber(num);
    setIsPrime(prime);

    if (prime) {
      setPrimeFactors([num]);
      setExponentialForm(num.toString());
    } else {
      const factors = findPrimeFactors(num);
      setPrimeFactors(factors);
      setExponentialForm(generateExponentialForm(factors));
    }

    setFactorTree(buildFactorTree(num));
    setShowResult(true);
  };

  // Render factor tree recursively
  const renderFactorTree = (node: FactorTreeNode | null, depth: number = 0): React.ReactNode => {
    if (!node) return null;

    return (
      <div className="factor-tree-node" style={{ marginLeft: `${depth * 20}px` }}>
        <div className={`node-value ${node.isPrime ? 'prime-node' : 'composite-node'}`}>
          {node.value}
          {node.isPrime && <span className="prime-badge">P</span>}
        </div>
        {node.children && node.children.length > 0 && (
          <div className="node-children">
            {node.children.map((child, index) => (
              <div key={index} className="child-branch">
                {renderFactorTree(child, depth + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <div className="input-section">
          <div className="form-group">
            <label htmlFor="number-input" className="form-label">
              {t.numberLabel}
            </label>
            <input
              id="number-input"
              type="number"
              className="form-input"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder={t.numberPlaceholder}
              min="2"
            />
          </div>

          <button
            onClick={calculate}
            className="calculate-button"
          >
            {t.calculateButton}
          </button>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        {showResult && (
          <div className="result-section">
            <h3 className="result-title">{t.result}</h3>
            
            <div className="result-card">
              <div className="result-item">
                <strong>{isPrime ? t.isPrime : t.isComposite}:</strong>
                <p className="result-description">
                  {number} {isPrime ? t.primeMessage : t.compositeMessage}
                </p>
              </div>

              {!isPrime && (
                <>
                  <div className="result-item">
                    <strong>{t.primeFactors}:</strong>
                    <div className="prime-factors-list">
                      {primeFactors.join(', ')}
                    </div>
                  </div>

                  <div className="result-item">
                    <strong>{t.exponentialForm}:</strong>
                    <div className="exponential-form">
                      {exponentialForm}
                    </div>
                  </div>
                </>
              )}

              <div className="result-item">
                <strong>{t.factorTree}:</strong>
                <div className="factor-tree-container">
                  {renderFactorTree(factorTree)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .calculator-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .calculator-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 24px;
        }

        .input-section {
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        .form-input:focus {
          outline: none;
          border-color: #4f46e5;
        }

        .calculate-button {
          width: 100%;
          padding: 14px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .calculate-button:hover {
          background: #4338ca;
        }

        .error-message {
          margin-top: 12px;
          padding: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #dc2626;
        }

        .result-section {
          margin-top: 24px;
        }

        .result-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #111827;
        }

        .result-card {
          background: #f9fafb;
          border-radius: 8px;
          padding: 20px;
        }

        .result-item {
          margin-bottom: 20px;
        }

        .result-item:last-child {
          margin-bottom: 0;
        }

        .result-item strong {
          display: block;
          font-size: 16px;
          margin-bottom: 8px;
          color: #374151;
        }

        .result-description {
          color: #6b7280;
          line-height: 1.6;
        }

        .prime-factors-list {
          padding: 12px;
          background: white;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-size: 18px;
          color: #1f2937;
        }

        .exponential-form {
          padding: 12px;
          background: white;
          border-radius: 6px;
          font-size: 24px;
          font-weight: 600;
          color: #4f46e5;
          text-align: center;
        }

        .factor-tree-container {
          padding: 20px;
          background: white;
          border-radius: 6px;
          overflow-x: auto;
        }

        .factor-tree-node {
          position: relative;
          padding: 8px 0;
        }

        .node-value {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          margin-bottom: 8px;
        }

        .prime-node {
          background: #dcfce7;
          color: #166534;
          border: 2px solid #86efac;
        }

        .composite-node {
          background: #e0e7ff;
          color: #3730a3;
          border: 2px solid #a5b4fc;
        }

        .prime-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: #166534;
          color: white;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
        }

        .node-children {
          border-left: 2px solid #d1d5db;
          padding-left: 12px;
        }

        .child-branch {
          position: relative;
        }

        .child-branch::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 20px;
          width: 12px;
          height: 2px;
          background: #d1d5db;
        }

        @media (max-width: 640px) {
          .calculator-container {
            padding: 12px;
          }

          .calculator-card {
            padding: 16px;
          }

          .exponential-form {
            font-size: 18px;
          }

          .node-value {
            font-size: 14px;
            padding: 6px 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default PrimeFactorizationCalculator;
