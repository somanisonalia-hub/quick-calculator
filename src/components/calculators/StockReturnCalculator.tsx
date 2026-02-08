// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';


interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: number;
  min?: number;
  max?: number;
  step?: number;
}

interface CalculatorOutput {
  label: string;
  default: string;
  format: string;
}

interface AdditionalOutput {
  label: string;
  field: string;
  format: string;
}

interface StockReturnCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
}

export default function StockReturnCalculator({ inputs, output, additionalOutputs }: StockReturnCalculatorProps) {
  
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, string | number>>({});

  const resetCalculator = () => {
    // Reset to default values
    setValues({});
    setResults('');
  };

  const calculateReturns = () => {
    const initialInvestment = values.initialInvestment || 0;
    const purchasePrice = values.purchasePrice || 0;
    const currentPrice = values.currentPrice || 0;
    const sharesOwned = values.sharesOwned || 0;
    const holdingPeriod = values.holdingPeriod || 0;

    if (sharesOwned > 0 && purchasePrice > 0) {
      // Calculate actual values based on shares
      const actualInitialInvestment = sharesOwned * purchasePrice;
      const currentValue = sharesOwned * currentPrice;
      const profitLoss = currentValue - actualInitialInvestment;
      const totalReturn = actualInitialInvestment > 0 ? (profitLoss / actualInitialInvestment) * 100 : 0;
      const annualizedReturn = holdingPeriod > 0
        ? (Math.pow(1 + (totalReturn / 100), 1 / holdingPeriod) - 1) * 100
        : 0;

      const priceChange = ((currentPrice - purchasePrice) / purchasePrice) * 100;

      setResults({
        totalReturn: `${totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(2)}%`,
        currentValue: `$${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        profitLoss: `${profitLoss >= 0 ? '+' : ''}$${Math.abs(profitLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        annualizedReturn: `${annualizedReturn >= 0 ? '+' : ''}${annualizedReturn.toFixed(2)}%`,
        priceChange: `${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%`,
        actualInvestment: actualInitialInvestment.toLocaleString()
      });
    } else if (initialInvestment > 0 && purchasePrice > 0) {
      // Calculate based on investment amount
      const calculatedShares = initialInvestment / purchasePrice;
      const currentValue = calculatedShares * currentPrice;
      const profitLoss = currentValue - initialInvestment;
      const totalReturn = (profitLoss / initialInvestment) * 100;
      const annualizedReturn = holdingPeriod > 0
        ? (Math.pow(1 + (totalReturn / 100), 1 / holdingPeriod) - 1) * 100
        : 0;

      setResults({
        totalReturn: `${totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(2)}%`,
        currentValue: `$${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        profitLoss: `${profitLoss >= 0 ? '+' : ''}$${Math.abs(profitLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        annualizedReturn: `${annualizedReturn >= 0 ? '+' : ''}${annualizedReturn.toFixed(2)}%`,
        sharesOwned: calculatedShares.toFixed(2),
        priceChange: `${(((currentPrice - purchasePrice) / purchasePrice) * 100).toFixed(2)}%`
      });
    } else {
      setResults({});
    }
  };

  // Calculate stock returns
  useEffect(() => {
    calculateReturns();
  }, [values]);

  const handleInputChange = (name: string, value: number) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCurrency = (amount: string | number) => {
    return `$${amount}`;
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Inputs */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Stock Investment</h3>

          {inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {input.label}
              </label>
              <input
                type={input.type}
                value={values[input.name] || ''}
                onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value) || 0)}
                min={input.min}
                max={input.max}
                step={input.step}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              />
            </div>
          ))}
        </div>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateReturns}
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
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Performance Analysis</h3>

          {/* Main Output */}
          <div className={`p-2 sm:p-3 rounded-md border-l-3 ${String(results.totalReturn || '').startsWith('+') ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className={`text-lg sm:text-xl font-bold ${String(results.totalReturn || '').startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {results.totalReturn || output.default}
            </div>
          </div>

          {/* Additional Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {additionalOutputs.map((additionalOutput) => (
              <div key={additionalOutput.field} className="bg-white border border-gray-200 p-2 rounded-md shadow-sm">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  {additionalOutput.label}
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {results[additionalOutput.field] || '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Investment Summary */}
          {results.currentValue && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Investment Summary
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">Initial Investment</div>
                  <div className="text-gray-600">${results.actualInvestment || values.initialInvestment.toLocaleString()}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">Shares Owned</div>
                  <div className="text-gray-600">{results.sharesOwned || values.sharesOwned.toLocaleString()}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">Price Change</div>
                  <div className={`font-medium ${String(results.priceChange || '').startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {results.priceChange}
                  </div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">Current Value</div>
                  <div className="text-blue-600 font-medium">{results.currentValue}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600 p-2 bg-blue-50 rounded border border-blue-200">
                <span className="font-medium">📈 Note:</span> Stock investments carry risk. Past performance doesn't guarantee future results.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
