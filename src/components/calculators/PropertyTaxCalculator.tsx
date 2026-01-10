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

interface PropertyTaxCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
}

export default function PropertyTaxCalculator({ inputs, output, additionalOutputs }: PropertyTaxCalculatorProps) {
  
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, any>>({});

  // Calculate property tax
  useEffect(() => {
    const calculatePropertyTax = () => {
      const propertyValue = values.propertyValue || 0;
      const assessmentRate = values.assessmentRate || 0;
      const taxRate = values.taxRate || 0;
      const exemptions = values.exemptions || 0;

      if (propertyValue > 0 && assessmentRate > 0 && taxRate > 0) {
        // Calculate assessed value
        const assessedValue = propertyValue * (assessmentRate / 100);

        // Calculate taxable value (after exemptions)
        const taxableValue = Math.max(0, assessedValue - exemptions);

        // Calculate annual property tax
        const annualTax = taxableValue * (taxRate / 100);

        // Calculate monthly payment (annual tax / 12)
        const monthlyPayment = annualTax / 12;

        setResults({
          assessedValue: `$${assessedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          taxableValue: `$${taxableValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          annualTax: `$${annualTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          monthlyPayment: `$${monthlyPayment.toFixed(2)}`,
          taxRatePercentage: `${taxRate}%`
        });
      } else {
        setResults({});
      }
    };

    calculatePropertyTax();
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
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{propertyDetails}</h3>

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
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{taxCalculation}</h3>

          {/* Main Output */}
          <div className="bg-blue-50 p-2 sm:p-3 rounded-md border-l-3 border-blue-500">
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className="text-lg sm:text-xl font-bold text-blue-600">
              {results.annualTax || output.default}
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

          {/* Tax Breakdown */}
          {results.annualTax && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                {propertyTaxBreakdown}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{propertyValue}</div>
                  <div className="text-gray-600">${(values.propertyValue || 0).toLocaleString()}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{assessmentRate}</div>
                  <div className="text-gray-600">{values.assessmentRate}%</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{taxExemptions}</div>
                  <div className="text-gray-600">${(values.exemptions || 0).toLocaleString()}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{taxRate}</div>
                  <div className="text-gray-600">{values.taxRate}%</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600 p-2 bg-blue-50 rounded border border-blue-200">
                <span className="font-medium">{note}:</span> {propertyTaxNote}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
