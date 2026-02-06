'use client';

import { useState, useEffect, useCallback } from 'react';

interface ScientificCalculatorProps {
  lang?: string;
}

export default function ScientificCalculator({ lang = 'en' }: ScientificCalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [history, setHistory] = useState<string[]>([]);

  const translations = {
    en: {
      title: "Scientific Calculator",
      memory: "Memory",
      angleMode: "Angle Mode",
      history: "History",
      clear: "Clear",
      degrees: "Degrees",
      radians: "Radians",
      memoryRecall: "MR",
      memoryClear: "MC",
      memoryStore: "MS",
      memoryAdd: "M+",
      memorySubtract: "M-"
    },
    es: {
      title: "Calculadora Científica",
      memory: "Memoria",
      angleMode: "Modo Ángulo",
      history: "Historial",
      clear: "Limpiar",
      degrees: "Grados",
      radians: "Radianes",
      memoryRecall: "MR",
      memoryClear: "MC",
      memoryStore: "MS",
      memoryAdd: "M+",
      memorySubtract: "M-"
    },
    pt: {
      title: "Calculadora Científica",
      memory: "Memória",
      angleMode: "Modo Ângulo",
      history: "Histórico",
      clear: "Limpar",
      degrees: "Graus",
      radians: "Radianos",
      memoryRecall: "MR",
      memoryClear: "MC",
      memoryStore: "MS",
      memoryAdd: "M+",
      memorySubtract: "M-"
    },
    fr: {
      title: "Calculatrice Scientifique",
      memory: "Mémoire",
      angleMode: "Mode Angle",
      history: "Historique",
      clear: "Effacer",
      degrees: "Degrés",
      radians: "Radians",
      memoryRecall: "MR",
      memoryClear: "MC",
      memoryStore: "MS",
      memoryAdd: "M+",
      memorySubtract: "M-"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const performOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result = 0;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = currentValue / inputValue;
          break;
        case '^':
          result = Math.pow(currentValue, inputValue);
          break;
        default:
          return;
      }

      setDisplay(String(result));
      setPreviousValue(result);
      addToHistory(`${currentValue} ${operation} ${inputValue} = ${result}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const performCalculation = useCallback(() => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      let result = 0;

      switch (operation) {
        case '+':
          result = previousValue + inputValue;
          break;
        case '-':
          result = previousValue - inputValue;
          break;
        case '×':
          result = previousValue * inputValue;
          break;
        case '÷':
          result = previousValue / inputValue;
          break;
        case '^':
          result = Math.pow(previousValue, inputValue);
          break;
        default:
          return;
      }

      setDisplay(String(result));
      addToHistory(`${previousValue} ${operation} ${inputValue} = ${result}`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  }, [display, previousValue, operation]);

  const performScientificFunction = useCallback((func: string) => {
    const inputValue = parseFloat(display);
    let result = 0;

    const angleInRadians = angleMode === 'deg' ? (inputValue * Math.PI) / 180 : inputValue;

    switch (func) {
      case 'sin':
        result = Math.sin(angleInRadians);
        break;
      case 'cos':
        result = Math.cos(angleInRadians);
        break;
      case 'tan':
        result = Math.tan(angleInRadians);
        break;
      case 'asin':
        result = angleMode === 'deg' ? (Math.asin(inputValue) * 180) / Math.PI : Math.asin(inputValue);
        break;
      case 'acos':
        result = angleMode === 'deg' ? (Math.acos(inputValue) * 180) / Math.PI : Math.acos(inputValue);
        break;
      case 'atan':
        result = angleMode === 'deg' ? (Math.atan(inputValue) * 180) / Math.PI : Math.atan(inputValue);
        break;
      case 'log':
        result = Math.log10(inputValue);
        break;
      case 'ln':
        result = Math.log(inputValue);
        break;
      case 'exp':
        result = Math.exp(inputValue);
        break;
      case 'sqrt':
        result = Math.sqrt(inputValue);
        break;
      case 'square':
        result = inputValue * inputValue;
        break;
      case 'cube':
        result = inputValue * inputValue * inputValue;
        break;
      case 'factorial':
        result = factorial(inputValue);
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case '1/x':
        result = 1 / inputValue;
        break;
      case 'percent':
        result = inputValue / 100;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    addToHistory(`${func}(${inputValue}) = ${result}`);
    setWaitingForOperand(true);
  }, [display, angleMode]);

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const addToHistory = (calculation: string) => {
    setHistory(prev => [calculation, ...prev.slice(0, 9)]); // Keep last 10 calculations
  };

  const memoryOperations = {
    recall: () => setDisplay(String(memory)),
    clear: () => setMemory(0),
    store: () => setMemory(parseFloat(display)),
    add: () => setMemory(memory + parseFloat(display)),
    subtract: () => setMemory(memory - parseFloat(display))
  };

  const toggleAngleMode = () => {
    setAngleMode(prev => prev === 'deg' ? 'rad' : 'deg');
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;

      if (key >= '0' && key <= '9') {
        inputDigit(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('×');
      } else if (key === '/') {
        performOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        performCalculation();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inputDigit, inputDecimal, performOperation, performCalculation, clear]);

  const Button = ({ children, onClick, className = '', ...props }: any) => (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">Advanced calculator with trigonometric functions, logarithms, and scientific operations</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calculator Display and Keypad */}
        <div className="lg:col-span-2 space-y-4">
          {/* Display */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="text-right text-3xl font-mono font-bold text-gray-900 min-h-[48px] flex items-center justify-end">
              {display}
            </div>
          </div>

          {/* Memory and Mode Controls */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button onClick={() => memoryOperations.recall()}>{t.memoryRecall}</Button>
            <Button onClick={() => memoryOperations.clear()}>{t.memoryClear}</Button>
            <Button onClick={() => memoryOperations.store()}>{t.memoryStore}</Button>
            <Button onClick={() => memoryOperations.add()}>{t.memoryAdd}</Button>
            <Button onClick={() => memoryOperations.subtract()}>{t.memorySubtract}</Button>
            <Button onClick={toggleAngleMode} className="ml-4">
              {angleMode === 'deg' ? t.degrees : t.radians}
            </Button>
            <Button onClick={clear} className="bg-red-100 hover:bg-red-200 text-red-700">
              {t.clear}
            </Button>
          </div>

          {/* Scientific Functions */}
          <div className="grid grid-cols-6 gap-2 mb-4">
            <Button onClick={() => performScientificFunction('sin')} className="bg-blue-100 hover:bg-blue-200 text-blue-700">sin</Button>
            <Button onClick={() => performScientificFunction('cos')} className="bg-blue-100 hover:bg-blue-200 text-blue-700">cos</Button>
            <Button onClick={() => performScientificFunction('tan')} className="bg-blue-100 hover:bg-blue-200 text-blue-700">tan</Button>
            <Button onClick={() => performScientificFunction('log')} className="bg-green-100 hover:bg-green-200 text-green-700">log</Button>
            <Button onClick={() => performScientificFunction('ln')} className="bg-green-100 hover:bg-green-200 text-green-700">ln</Button>
            <Button onClick={() => performScientificFunction('exp')} className="bg-green-100 hover:bg-green-200 text-green-700">eˣ</Button>
            <Button onClick={() => performScientificFunction('sqrt')} className="bg-purple-100 hover:bg-purple-200 text-purple-700">√</Button>
            <Button onClick={() => performScientificFunction('square')} className="bg-purple-100 hover:bg-purple-200 text-purple-700">x²</Button>
            <Button onClick={() => performScientificFunction('cube')} className="bg-purple-100 hover:bg-purple-200 text-purple-700">x³</Button>
            <Button onClick={() => performScientificFunction('factorial')} className="bg-purple-100 hover:bg-purple-200 text-purple-700">n!</Button>
            <Button onClick={() => performScientificFunction('1/x')} className="bg-orange-100 hover:bg-orange-200 text-orange-700">1/x</Button>
            <Button onClick={() => performScientificFunction('percent')} className="bg-orange-100 hover:bg-orange-200 text-orange-700">%</Button>
          </div>

          {/* Basic Operations */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <Button onClick={() => performOperation('^')} className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700">xʸ</Button>
            <Button onClick={() => performScientificFunction('pi')} className="bg-pink-100 hover:bg-pink-200 text-pink-700">π</Button>
            <Button onClick={() => performScientificFunction('e')} className="bg-pink-100 hover:bg-pink-200 text-pink-700">e</Button>
            <Button onClick={() => performOperation('÷')} className="bg-red-100 hover:bg-red-200 text-red-700">÷</Button>
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-4 gap-2">
            <Button onClick={() => inputDigit('7')}>7</Button>
            <Button onClick={() => inputDigit('8')}>8</Button>
            <Button onClick={() => inputDigit('9')}>9</Button>
            <Button onClick={() => performOperation('×')} className="bg-red-100 hover:bg-red-200 text-red-700">×</Button>

            <Button onClick={() => inputDigit('4')}>4</Button>
            <Button onClick={() => inputDigit('5')}>5</Button>
            <Button onClick={() => inputDigit('6')}>6</Button>
            <Button onClick={() => performOperation('-')} className="bg-red-100 hover:bg-red-200 text-red-700">-</Button>

            <Button onClick={() => inputDigit('1')}>1</Button>
            <Button onClick={() => inputDigit('2')}>2</Button>
            <Button onClick={() => inputDigit('3')}>3</Button>
            <Button onClick={() => performOperation('+')} className="bg-red-100 hover:bg-red-200 text-red-700">+</Button>

            <Button onClick={() => inputDigit('0')} className="col-span-2">0</Button>
            <Button onClick={inputDecimal}>.</Button>
            <Button onClick={performCalculation} className="bg-blue-100 hover:bg-blue-200 text-blue-700">=</Button>
          </div>

          {/* Inverse Trigonometric Functions */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Button onClick={() => performScientificFunction('asin')} className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs">sin⁻¹</Button>
            <Button onClick={() => performScientificFunction('acos')} className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs">cos⁻¹</Button>
            <Button onClick={() => performScientificFunction('atan')} className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs">tan⁻¹</Button>
          </div>
        </div>

        {/* Information Panel */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.memory}</h3>
            <div className="text-2xl font-bold text-blue-600">
              {memory}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">{t.angleMode}</h3>
            <div className="text-lg font-bold text-green-600">
              {angleMode === 'deg' ? t.degrees : t.radians}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">{t.history}</h3>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {history.slice(0, 5).map((calc, index) => (
                <div key={index} className="text-xs text-purple-700 font-mono bg-purple-100 p-2 rounded">
                  {calc}
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-sm text-purple-500 italic">No calculations yet</div>
              )}
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Keyboard Shortcuts</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div><kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">0-9</kbd> Numbers</div>
              <div><kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">+-*/</kbd> Operations</div>
              <div><kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> Calculate</div>
              <div><kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Esc</kbd> Clear</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
