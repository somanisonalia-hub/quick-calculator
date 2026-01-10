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

interface RetirementCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
}

export default function RetirementCalculator({ inputs, output, additionalOutputs }: RetirementCalculatorProps) {
  
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, any>>({});

  // Calculate retirement savings
  useEffect(() => {
    const calculateRetirement = () => {
      const currentAge = values.currentAge || 0;
      const retirementAge = values.retirementAge || 0;
      const currentSavings = values.currentSavings || 0;
      const annualContribution = values.annualContribution || 0;
      const expectedReturn = values.expectedReturn || 0;
      const socialSecurity = values.socialSecurity || 0;

      if (retirementAge <= currentAge) {
        setResults({});
        return;
      }

      const yearsToRetirement = retirementAge - currentAge;
      const annualRate = expectedReturn / 100;

      // Future value of current savings
      const futureValueCurrent = currentSavings * Math.pow(1 + annualRate, yearsToRetirement);

      // Future value of annual contributions
      const futureValueContributions = annualContribution *
        (Math.pow(1 + annualRate, yearsToRetirement) - 1) / annualRate;

      const totalSavings = futureValueCurrent + futureValueContributions;

      // Estimate monthly income (4% safe withdrawal rate)
      const annualWithdrawal = totalSavings * 0.04;
      const monthlyWithdrawal = annualWithdrawal / 12;
      const totalMonthlyIncome = monthlyWithdrawal + socialSecurity;

      const totalContributions = currentSavings + (annualContribution * yearsToRetirement);
      const totalGrowth = totalSavings - totalContributions;

      setResults({
        totalSavings: `$${totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        monthlyIncome: `$${totalMonthlyIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        totalContributions: `$${totalContributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        totalGrowth: `$${totalGrowth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        yearsToRetirement: yearsToRetirement
      });
    };

    calculateRetirement();
  }, [values]);

  const handleInputChange = (name: string, value: number) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Inputs */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{retirementPlanning}</h3>

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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{retirementProjection}</h3>

          {/* Main Output */}
          <div className="bg-blue-50 p-2 sm:p-3 rounded-md border-l-3 border-blue-500">
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className="text-lg sm:text-xl font-bold text-blue-600">
              {results.totalSavings || output.default}
            </div>
            {results.yearsToRetirement && (
              <div className="text-xs text-gray-500 mt-1">
                {t('calculator.inYears', { years: results.yearsToRetirement })}
              </div>
            )}
          </div>

          {/* Additional Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {additionalOutputs.map((additionalOutput) => (
              <div key={additionalOutput.field} className="bg-white border border-gray-200 p-2 rounded-md shadow-sm">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  {additionalOutput.label.replace('Estimated ', '')}
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {results[additionalOutput.field] || '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Savings Breakdown */}
          {results.totalSavings && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {savingsBreakdown}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{currentSavings}</div>
                  <div className="text-gray-600">${(values.currentSavings || 0).toLocaleString()}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{futureContributions}</div>
                  <div className="text-gray-600">{results.totalContributions ? results.totalContributions.replace(results.totalSavings?.split(' ')[0] || '', '').replace('$', '') : '—'}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{investmentGrowth}</div>
                  <div className="text-green-600 font-medium">{results.totalGrowth}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{monthlyIncome}</div>
                  <div className="text-blue-600 font-medium">{results.monthlyIncome}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
