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

interface InterestOnlyMortgageCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
}

export default function InterestOnlyMortgageCalculator({ inputs, output, additionalOutputs }: InterestOnlyMortgageCalculatorProps) {
  
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

  const calculateInterestOnlyMortgage = () => {
    const loanAmount = values.loanAmount || 0;
    const interestRate = values.interestRate || 0;
    const interestOnlyPeriod = values.interestOnlyPeriod || 0;
    const amortizationPeriod = values.amortizationPeriod || 0;
    const propertyTax = values.propertyTax || 0;
    const homeInsurance = values.homeInsurance || 0;

    if (loanAmount > 0 && interestRate > 0) {
      const monthlyRate = interestRate / 100 / 12;

      // Interest-only payment (first period)
      const interestOnlyPayment = loanAmount * monthlyRate;

      // Full payment after interest-only period
      const remainingMonths = (amortizationPeriod - interestOnlyPeriod) * 12;
      const fullPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) /
                         (Math.pow(1 + monthlyRate, remainingMonths) - 1);

      // Monthly costs
      const monthlyPropertyTax = propertyTax / 12;
      const monthlyInsurance = homeInsurance / 12;

      // Current total monthly payment (interest-only period)
      const currentTotalPayment = interestOnlyPayment + monthlyPropertyTax + monthlyInsurance;

      // Future total monthly payment
      const futureTotalPayment = fullPayment + monthlyPropertyTax + monthlyInsurance;

      const paymentIncrease = futureTotalPayment - currentTotalPayment;
      const increasePercentage = (paymentIncrease / currentTotalPayment) * 100;

      setResults({
        currentMonthlyPayment: currentTotalPayment.toFixed(2),
        interestOnlyPayment: interestOnlyPayment.toFixed(2),
        fullPayment: futureTotalPayment.toFixed(2),
        paymentIncrease: paymentIncrease.toFixed(2),
        increasePercentage: increasePercentage.toFixed(1),
        interestOnlyMonths: interestOnlyPeriod * 12,
        monthlyPropertyTax: monthlyPropertyTax.toFixed(2),
        monthlyInsurance: monthlyInsurance.toFixed(2)
      });
    } else {
      setResults({});
    }
  };

  // Calculate interest-only mortgage
  useEffect(() => {
    calculateInterestOnlyMortgage();
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
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Mortgage Terms</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inputs.slice(0, 3).map((input) => (
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inputs.slice(3).map((input) => (
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateInterestOnlyMortgage}
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
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Payment Schedule</h3>

          {/* Main Output */}
          <div className="bg-purple-50 p-2 sm:p-3 rounded-md border-l-3 border-purple-500">
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className="text-lg sm:text-xl font-bold text-purple-600">
              {results.currentMonthlyPayment ? formatCurrency(results.currentMonthlyPayment) : output.default}
            </div>
            {results.interestOnlyMonths && (
              <div className="text-xs text-gray-500 mt-1">
                For first {results.interestOnlyMonths} months
              </div>
            )}
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

          {/* Payment Timeline */}
          {results.currentMonthlyPayment && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Payment Timeline
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <div className="font-medium text-gray-900">Months 1-{results.interestOnlyMonths}</div>
                    <div className="text-sm text-gray-600">Interest-Only Period</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-purple-600">{formatCurrency(results.currentMonthlyPayment)}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <div className="font-medium text-gray-900">Month {results.interestOnlyMonths}+</div>
                    <div className="text-sm text-gray-600">Full Amortization</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-pink-600">{formatCurrency(results.fullPayment)}</div>
                    <div className="text-xs text-red-600">+{formatCurrency(results.paymentIncrease)} ({results.increasePercentage}%)</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600 p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="font-medium">⚠️ Note:</span> Interest-only mortgages carry higher risk. Payment shock occurs when principal payments begin.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
