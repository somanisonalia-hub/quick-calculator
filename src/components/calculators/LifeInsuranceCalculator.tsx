// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';


interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: number | string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
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

interface LifeInsuranceCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
}

export default function LifeInsuranceCalculator({ inputs, output, additionalOutputs }: LifeInsuranceCalculatorProps) {
  
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, string | number>>({});

  // Calculate life insurance premium
  useEffect(() => {
    const calculateInsurance = () => {
      const age = values.age as number || 35;
      const gender = values.gender as string || 'male';
      const coverageAmount = values.coverageAmount as number || 500000;
      const termLength = values.termLength as number || 20;
      const healthRating = values.healthRating as string || 'excellent';
      const smokingStatus = values.smokingStatus as string || 'non-smoker';

      // Base rate per $1000 of coverage (simplified)
      let baseRate = 0.50; // $0.50 per $1000 per month for 35-year-old non-smoker

      // Age factor
      let ageFactor = 1;
      if (age < 25) ageFactor = 0.6;
      else if (age < 35) ageFactor = 0.8;
      else if (age < 45) ageFactor = 1.2;
      else if (age < 55) ageFactor = 2.0;
      else if (age < 65) ageFactor = 3.5;
      else ageFactor = 5.0;

      // Gender factor (women typically pay less)
      const genderFactor = gender === 'female' ? 0.85 : 1.0;

      // Health rating factor
      let healthFactor = 1;
      let riskClass = 'Preferred Plus';
      switch (healthRating) {
        case 'excellent':
          healthFactor = 0.8;
          riskClass = 'Preferred Plus';
          break;
        case 'very-good':
          healthFactor = 1.0;
          riskClass = 'Preferred';
          break;
        case 'good':
          healthFactor = 1.3;
          riskClass = 'Standard Plus';
          break;
        case 'fair':
          healthFactor = 1.8;
          riskClass = 'Standard';
          break;
      }

      // Smoking factor
      const smokingFactor = smokingStatus === 'smoker' ? 2.5 : 1.0;

      // Term length factor (longer terms cost more)
      const termFactor = Math.max(0.8, Math.min(1.5, termLength / 20));

      // Calculate monthly premium
      const coverageInThousands = coverageAmount / 1000;
      const monthlyPremium = Math.round(baseRate * coverageInThousands * ageFactor * genderFactor * healthFactor * smokingFactor * termFactor);

      const annualPremium = monthlyPremium * 12;

      setResults({
        monthlyPremium: monthlyPremium.toLocaleString(),
        annualPremium: annualPremium.toLocaleString(),
        coverageAmount: coverageAmount.toLocaleString(),
        riskClass,
        ageFactor: ageFactor.toFixed(2),
        healthFactor: healthFactor.toFixed(2),
        smokingFactor: smokingFactor.toFixed(2)
      });
    };

    calculateInsurance();
  }, [values]);

  const handleInputChange = (name: string, value: string | number) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Inputs */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{personalInformation}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inputs.slice(0, 4).map((input) => (
              <div key={input.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {input.label}
                </label>

                {input.type === 'select' && input.options ? (
                  <select
                    value={values[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  >
                    {input.options.map((option) => (
                      <option key={option} value={option}>
                        {option.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={input.type}
                    value={values[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value) || 0)}
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inputs.slice(4).map((input) => (
              <div key={input.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {input.label}
                </label>

                {input.type === 'select' && input.options ? (
                  <select
                    value={values[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  >
                    {input.options.map((option) => (
                      <option key={option} value={option}>
                        {option.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={input.type}
                    value={values[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value) || 0)}
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{insuranceQuote}</h3>

          {/* Main Output */}
          <div className="bg-purple-50 p-2 sm:p-3 rounded-md border-l-3 border-purple-500">
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className="text-lg sm:text-xl font-bold text-purple-600">
              {results.monthlyPremium ? formatCurrency(results.monthlyPremium) : output.default}
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

          {/* Premium Analysis */}
          {results.monthlyPremium && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Premium Factors
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">Age Factor</div>
                  <div className="text-gray-600">{results.ageFactor}x</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">Health Factor</div>
                  <div className="text-gray-600">{results.healthFactor}x</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">Smoking Factor</div>
                  <div className="text-gray-600">{results.smokingFactor}x</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">Coverage Amount</div>
                  <div className="text-gray-600">{formatCurrency(results.coverageAmount)}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600 p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="font-medium">⚠️ Disclaimer:</span> This is an estimate. Actual rates vary by insurer, medical history, and other factors.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
