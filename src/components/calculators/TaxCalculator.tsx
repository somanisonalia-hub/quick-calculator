// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';


interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: string | number;
  options?: any[];
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

interface TaxCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
  lang?: string;
}

const translations = {
  en: {
    single: "single",
      calculate: "🔄 Recalculate",
      reset: "Reset"
  },
  es: {
    single: "single",
      calculate: "🔄 Recalcular",
      reset: "Restablecer"
  },
  pt: {
    single: "single",
      calculate: "🔄 Recalcular",
      reset: "Redefinir"
  },
  fr: {
    single: "single",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser"
  },
};


export default function TaxCalculator({ inputs, output, additionalOutputs, lang = 'en' }: TaxCalculatorProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [values, setValues] = useState<Record<string, string | number>>(() => {
    const initial: Record<string, string | number> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, any>>({});

  const calculateTaxes = () => {
    const annualIncome = values.annualIncome as number || 0;
    const filingStatus = values.filingStatus as string || 'single';
    const dependents = values.dependents as number || 0;

    if (annualIncome <= 0) {
      setResults({});
      return;
    }

    // Simplified tax brackets for 2024 (single filer)
    const getTaxBrackets = (status: string) => {
      const brackets = {
        'single': [
          { min: 0, max: 11000, rate: 0.10 },
          { min: 11000, max: 44725, rate: 0.12 },
          { min: 44725, max: 95375, rate: 0.22 },
          { min: 95375, max: 182100, rate: 0.24 },
          { min: 182100, max: 231250, rate: 0.32 },
          { min: 231250, max: 578125, rate: 0.35 },
          { min: 578125, max: Infinity, rate: 0.37 }
        ],
        'married-joint': [
          { min: 0, max: 22000, rate: 0.10 },
          { min: 22000, max: 89450, rate: 0.12 },
          { min: 89450, max: 190750, rate: 0.22 },
          { min: 190750, max: 364200, rate: 0.24 },
          { min: 364200, max: 462500, rate: 0.32 },
          { min: 462500, max: 693750, rate: 0.35 },
          { min: 693750, max: Infinity, rate: 0.37 }
        ],
        'married-separate': [
          { min: 0, max: 11000, rate: 0.10 },
          { min: 11000, max: 44725, rate: 0.12 },
          { min: 44725, max: 95375, rate: 0.22 },
          { min: 95375, max: 182100, rate: 0.24 },
          { min: 182100, max: 231250, rate: 0.32 },
          { min: 231250, max: 346875, rate: 0.35 },
          { min: 346875, max: Infinity, rate: 0.37 }
        ],
        'head-household': [
          { min: 0, max: 15700, rate: 0.10 },
          { min: 15700, max: 59850, rate: 0.12 },
          { min: 59850, max: 96850, rate: 0.22 },
          { min: 96850, max: 182100, rate: 0.24 },
          { min: 182100, max: 231250, rate: 0.32 },
          { min: 231250, max: 578100, rate: 0.35 },
          { min: 578100, max: Infinity, rate: 0.37 }
        ]
      };
      return brackets[status as keyof typeof brackets] || brackets.single;
    };

    const brackets = getTaxBrackets(filingStatus);
    let federalTax = 0;
    let taxableIncome = annualIncome;

    // Calculate federal tax using progressive brackets
    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableInBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
        federalTax += taxableInBracket * bracket.rate;
      }
    }

    // Simplified state tax (average 5%)
    const stateTax = annualIncome * 0.05;

    // FICA taxes (Social Security + Medicare)
    const socialSecurity = Math.min(annualIncome, 160200) * 0.062; // 2024 limit
    const medicare = annualIncome * 0.0145;
    const additionalMedicare = annualIncome > 200000 ? (annualIncome - 200000) * 0.009 : 0;
    const ficaTax = socialSecurity + medicare + additionalMedicare;

    const totalTax = federalTax + stateTax + ficaTax;
    const takeHomePay = annualIncome - totalTax;
    const effectiveRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0;

    setResults({
      federalTax: `${federalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      stateTax: `${stateTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      ficaTax: `${ficaTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      totalTax: `${totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      takeHomePay: `${takeHomePay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      effectiveRate: `${effectiveRate.toFixed(1)}%`
    });
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

  // Calculate taxes (simplified 2024 US federal tax brackets)
  useEffect(() => {
    calculateTaxes();
  }, [values]);

  const handleInputChange = (name: string, value: string | number) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Inputs */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Tax Information</h3>

          {inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {input.label}
              </label>

              {input.type === 'select' && input.options ? (
                <select
                  value={values[input.name] || ''}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {input.options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              )}
            </div>
          ))}
        </div>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateTaxes}
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
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Tax Calculation</h3>

          {/* Main Output */}
          <div className="bg-blue-50 p-2 sm:p-3 rounded-md border-l-3 border-blue-500">
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className="text-lg sm:text-xl font-bold text-blue-600">
              {results.totalTax || output.default}
            </div>
          </div>

          {/* Additional Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {additionalOutputs.map((additionalOutput) => (
              <div key={additionalOutput.field} className="bg-white border border-gray-200 p-2 rounded-md shadow-sm">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  {additionalOutput.label.replace('Annual ', '')}
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {results[additionalOutput.field] || '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Tax Breakdown */}
          {results.federalTax && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Tax Breakdown
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">Federal Tax</div>
                  <div className="text-gray-600">{results.federalTax}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">State Tax</div>
                  <div className="text-gray-600">{results.stateTax}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">FICA Tax</div>
                  <div className="text-gray-600">{results.ficaTax}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">Take-Home Pay</div>
                  <div className="text-green-600 font-medium">{results.takeHomePay}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600 p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="font-medium">Note:</span> These calculations are simplified estimates for educational purposes only.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
