'use client';

import { useState } from 'react';

export default function AdditionCalculator() {
  const [numbers, setNumbers] = useState<string[]>(['', '', '']);
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const handleNumberChange = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
  };

  const addNumber = () => {
    if (numbers.length < 10) {
      setNumbers([...numbers, '']);
    }
  };

  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      const newNumbers = numbers.filter((_, i) => i !== index);
      setNumbers(newNumbers);
    }
  };

  const calculate = () => {
    const validNumbers = numbers
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (validNumbers.length === 0) {
      setResult(null);
      setSteps([]);
      return;
    }

    const calculationSteps: string[] = [];
    let runningTotal = 0;

    validNumbers.forEach((num, index) => {
      if (index === 0) {
        runningTotal = num;
        calculationSteps.push(`${num}`);
      } else {
        const previousTotal = runningTotal;
        runningTotal += num;
        calculationSteps.push(`${previousTotal} + ${num} = ${runningTotal}`);
      }
    });

    setResult(runningTotal);
    setSteps(calculationSteps);
  };

  const clear = () => {
    setNumbers(['', '', '']);
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Addition Calculator</h2>

      <div className="space-y-3 mb-6">
        {numbers.map((number, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="number"
              value={number}
              onChange={(e) => handleNumberChange(index, e.target.value)}
              placeholder={`Number ${index + 1}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {numbers.length > 2 && (
              <button
                onClick={() => removeNumber(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                ×
              </button>
            )}
          </div>
        ))}

        {numbers.length < 10 && (
          <button
            onClick={addNumber}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Another Number
          </button>
        )}
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={calculate}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Calculate
        </button>
        <button
          onClick={clear}
          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Clear
        </button>
      </div>

      {result !== null && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Result</h3>
          <p className="text-2xl font-bold text-green-900">{result}</p>
        </div>
      )}

      {steps.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Step-by-Step Calculation</h3>
          <div className="space-y-1">
            {steps.map((step, index) => (
              <p key={index} className="text-blue-700 font-mono text-sm">
                {step}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
