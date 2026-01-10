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

interface HealthInsuranceCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
}

export default function HealthInsuranceCalculator({ inputs, output, additionalOutputs }: HealthInsuranceCalculatorProps) {
  
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, string | number>>({});

  // Calculate health insurance premium
  useEffect(() => {
    const calculateInsurance = () => {
      const annualIncome = values.annualIncome as number || 50000;
      const householdSize = values.householdSize as number || 1;
      const planType = values.planType as string || 'silver';
      const location = values.location as string || 'urban';
      const age = values.age as number || 35;

      // Base premium calculation (simplified ACA marketplace rates)
      let baseMonthlyPremium = 300; // Base for individual

      // Household size adjustment
      const householdMultiplier = Math.sqrt(householdSize); // Family plans cost more but not linearly

      // Plan type multiplier (metal levels)
      let planMultiplier = 1;
      switch (planType) {
        case 'bronze':
          planMultiplier = 0.85;
          break;
        case 'silver':
          planMultiplier = 1.0;
          break;
        case 'gold':
          planMultiplier = 1.15;
          break;
        case 'platinum':
          planMultiplier = 1.35;
          break;
      }

      // Age factor (older = higher premiums)
      let ageFactor = 1;
      if (age < 25) ageFactor = 0.8;
      else if (age < 35) ageFactor = 1.0;
      else if (age < 45) ageFactor = 1.3;
      else if (age < 55) ageFactor = 1.8;
      else if (age < 65) ageFactor = 2.5;
      else ageFactor = 3.0; // 65+ (Medicare eligible, but showing marketplace rates)

      // Location factor
      let locationFactor = 1;
      switch (location) {
        case 'urban':
          locationFactor = 1.2; // Higher costs in cities
          break;
        case 'suburban':
          locationFactor = 1.0;
          break;
        case 'rural':
          locationFactor = 0.8; // Lower costs in rural areas
          break;
      }

      // Calculate gross premium
      const monthlyPremium = Math.round(baseMonthlyPremium * householdMultiplier * planMultiplier * ageFactor * locationFactor);
      const annualPremium = monthlyPremium * 12;

      // Calculate ACA subsidy (simplified - based on income % of FPL)
      const federalPovertyLine = 14060; // 2024 FPL for individual
      const householdPovertyLine = federalPovertyLine * householdSize;
      const incomeRatio = annualIncome / householdPovertyLine;

      let subsidy = 0;
      if (incomeRatio <= 1.5) {
        subsidy = annualPremium * 0.95; // 95% subsidy for low income
      } else if (incomeRatio <= 2.0) {
        subsidy = annualPremium * 0.87; // 87% subsidy
      } else if (incomeRatio <= 2.5) {
        subsidy = annualPremium * 0.73; // 73% subsidy
      } else if (incomeRatio <= 4.0) {
        subsidy = annualPremium * 0.60; // 60% subsidy
      } else if (incomeRatio <= 6.0) {
        subsidy = annualPremium * 0.50; // 50% subsidy
      }

      const netAnnualCost = annualPremium - subsidy;
      const netMonthlyCost = Math.round(netAnnualCost / 12);

      setResults({
        monthlyPremium: monthlyPremium,
        annualPremium: annualPremium,
        subsidy: subsidy,
        netAnnual: netAnnualCost,
        netMonthly: netMonthlyCost,
        subsidyPercentage: ((subsidy / annualPremium) * 100),
        planLevel: planType.charAt(0).toUpperCase() + planType.slice(1)
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
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Inputs */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Coverage Details</h3>

          {/* All inputs in a clean grid */}
          <div className="grid grid-cols-1 gap-3">
            {inputs.map((input) => (
              <div key={input.name} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {input.label}
                </label>

                {input.type === 'select' && input.options ? (
                  <select
                    value={values[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                  >
                    {input.options.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-900 mb-3">Insurance Estimate</h3>

          {/* Main Result - Prominent */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded border border-green-200">
            <div className="text-sm text-green-700 font-medium mb-0.5">{output.label}</div>
            <div className="text-xl font-bold text-green-800">
              {results.monthlyPremium ? formatCurrency(results.monthlyPremium) : output.default}
            </div>
          </div>

          {/* Key Metrics Grid - Compact */}
          <div className="grid grid-cols-2 gap-2">
            {additionalOutputs.slice(0, 4).map((additionalOutput) => (
              <div key={additionalOutput.field} className="bg-white p-2 rounded border border-gray-200">
                <div className="text-xs text-gray-500 font-medium leading-tight mb-0.5">
                  {additionalOutput.label.replace('Annual ', '').replace('Monthly ', '')}
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {results[additionalOutput.field] ? formatCurrency(results[additionalOutput.field]) : '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Cost Analysis - Minimal */}
          {results.annualPremium ? (
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2 text-xs">Cost Breakdown</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Gross Annual Premium:</span>
                  <span className="font-medium text-gray-900">{formatCurrency(results.annualPremium)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">ACA Subsidy:</span>
                  <span className="font-medium text-green-600">-{formatCurrency(results.subsidy)}</span>
                </div>
                <hr className="border-gray-300 my-1.5" />
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-gray-900">Net Annual Cost:</span>
                  <span className="font-bold text-blue-700">{formatCurrency(results.netAnnual)}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
