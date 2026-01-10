'use client';

import { useState } from 'react';

interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: any;
  min?: number;
  max?: number;
  step?: number | string;
  options?: string[];
}

interface CalculatorOutput {
  label: string;
  field?: string;
  format: string;
}

interface CalculatorConfig {
  inputs: CalculatorInput[];
  formula: string;
  output: CalculatorOutput;
  additionalOutputs?: CalculatorOutput[];
}

interface DynamicCalculatorProps {
  config: CalculatorConfig;
  calculatorSlug: string;
}

export default function DynamicCalculator({ config, calculatorSlug }: DynamicCalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    const initialInputs: Record<string, any> = {};
    config.inputs.forEach(input => {
      initialInputs[input.name] = input.default;
    });
    return initialInputs;
  });

  const [result, setResult] = useState<any>(null);
  const [calculating, setCalculating] = useState(false);

  const handleInputChange = (name: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculate = () => {
    setCalculating(true);

    try {
      // This is a placeholder calculation - in a real implementation,
      // you'd have specific calculation logic for each calculator type
      let calculatedResult: any = {};

      switch (calculatorSlug) {
        case 'loan-calculator':
          const { loanAmount, interestRate, loanTerm } = inputs;
          const monthlyRate = interestRate / 100 / 12;
          const numPayments = loanTerm;
          const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
          calculatedResult = {
            monthlyPayment: monthlyPayment.toFixed(2),
            totalInterest: ((monthlyPayment * numPayments) - loanAmount).toFixed(2),
            totalPaid: (monthlyPayment * numPayments).toFixed(2)
          };
          break;

        case 'bmi-calculator':
          const { height, weight } = inputs;
          const bmi = weight / Math.pow(height / 100, 2);
          let category = 'Unknown';
          if (bmi < 18.5) category = 'Underweight';
          else if (bmi < 25) category = 'Normal Weight';
          else if (bmi < 30) category = 'Overweight';
          else category = 'Obese';
          calculatedResult = {
            bmi: bmi.toFixed(1),
            category,
            status: bmi >= 18.5 && bmi < 25 ? 'Healthy weight range' : 'Consider consulting a healthcare professional'
          };
          break;

        case 'tip-calculator':
          const { billAmount, tipPercentage, numberOfPeople } = inputs;
          const tipAmount = billAmount * (tipPercentage / 100);
          const totalBill = billAmount + tipAmount;
          calculatedResult = {
            tipAmount: tipAmount.toFixed(2),
            totalBill: totalBill.toFixed(2),
            perPerson: (totalBill / numberOfPeople).toFixed(2),
            tipPerPerson: (tipAmount / numberOfPeople).toFixed(2)
          };
          break;

        case 'percentage-calculator':
          const { calculationType, value1, value2 } = inputs;
          let percentageResult;
          if (calculationType === 'percentageOf') {
            percentageResult = (value1 / 100) * value2;
          } else if (calculationType === 'whatPercent') {
            percentageResult = (value1 / value2) * 100;
          } else if (calculationType === 'percentageChange') {
            percentageResult = ((value2 - value1) / value1) * 100;
          }
          calculatedResult = {
            result: percentageResult?.toFixed(2),
            calculation: `${value1} ${calculationType === 'percentageOf' ? `% of ${value2}` : calculationType === 'whatPercent' ? `is what % of ${value2}` : `change to ${value2}`}`,
            explanation: `Calculated using ${calculationType} formula`
          };
          break;

        default:
          // Generic calculation placeholder
          calculatedResult = { result: '42', note: 'This is a placeholder calculation' };
      }

      setResult(calculatedResult);
    } catch (error) {
      console.error('Calculation error:', error);
      setResult({ error: 'Calculation failed. Please check your inputs.' });
    } finally {
      setCalculating(false);
    }
  };

  const clear = () => {
    const resetInputs: Record<string, any> = {};
    config.inputs.forEach(input => {
      resetInputs[input.name] = input.default;
    });
    setInputs(resetInputs);
    setResult(null);
  };

  const renderInput = (input: CalculatorInput) => {
    const value = inputs[input.name];

    switch (input.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {input.options?.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value) || 0)}
            min={input.min}
            max={input.max}
            step={input.step}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Calculator</h2>

      {/* Input Fields */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {config.inputs.map(input => (
          <div key={input.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {input.label}
            </label>
            {renderInput(input)}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={calculate}
          disabled={calculating}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {calculating ? 'Calculating...' : 'Calculate'}
        </button>
        <button
          onClick={clear}
          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Clear
        </button>
      </div>

      {/* Main Result */}
      {result && !result.error && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold text-green-800 mb-2">{config.output.label}</h3>
          {typeof result === 'object' && result.result !== undefined ? (
            <p className="text-2xl font-bold text-green-900">{result.result}</p>
          ) : (
            <pre className="text-sm bg-green-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </div>
      )}

      {/* Additional Outputs */}
      {config.additionalOutputs && result && !result.error && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {config.additionalOutputs.map((output, index) => (
            <div key={index} className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-1">{output.label}</h4>
              <p className="text-lg font-bold text-blue-900">
                {result[output.field || 'result'] || 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Error Display */}
      {result?.error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <p className="text-red-800">{result.error}</p>
        </div>
      )}

      {/* Formula Display */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Formula Used</h4>
        <p className="text-sm text-gray-600">{config.formula}</p>
      </div>
    </div>
  );
}
