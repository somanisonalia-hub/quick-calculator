// @ts-nocheck
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

interface InvestmentCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
  lang?: string;
}

const translations = {
  en: {
    investmentDetails: "Investment Details",
    investmentGrowth: "Investment Growth",
    performanceSummary: "Performance Summary",
    initialInvestment: "Initial Investment",
    monthlyDeposits: "Monthly Deposits",
    investmentPeriod: "Investment Period",
    expectedReturn: "Expected Return",
    years: "years",
    apr: "APR",
    annually: "annually",
      quarterly: "quarterly",
      string: "string",
  },
  es: {
    investmentDetails: "Detalles de Inversión",
    investmentGrowth: "Crecimiento de Inversión",
    performanceSummary: "Resumen de Rendimiento",
    initialInvestment: "Inversión Inicial",
    monthlyDeposits: "Depósitos Mensuales",
    investmentPeriod: "Período de Inversión",
    expectedReturn: "Retorno Esperado",
    years: "años",
    apr: "TAE",
    annually: "annually",
      quarterly: "quarterly",
      string: "string",
  },
  pt: {
    investmentDetails: "Detalhes do Investimento",
    investmentGrowth: "Crescimento do Investimento",
    performanceSummary: "Resumo de Performance",
    initialInvestment: "Investimento Inicial",
    monthlyDeposits: "Depósitos Mensais",
    investmentPeriod: "Período de Investimento",
    expectedReturn: "Retorno Esperado",
    years: "anos",
    apr: "APR",
    annually: "annually",
      quarterly: "quarterly",
      string: "string",
  },
  fr: {
    investmentDetails: "Détails d'Investissement",
    investmentGrowth: "Croissance d'Investissement",
    performanceSummary: "Résumé des Performances",
    initialInvestment: "Investissement Initial",
    monthlyDeposits: "Dépôts Mensuels",
    investmentPeriod: "Période d'Investissement",
    expectedReturn: "Rendement Attendu",
    years: "années",
    apr: "TAEG",
    annually: "annually",
      quarterly: "quarterly",
      string: "string",
  },
  de: {
    investmentDetails: "Anlagedetails",
    investmentGrowth: "Anlagewachstum",
    performanceSummary: "Leistungszusammenfassung",
    initialInvestment: "Anfängliche Investition",
    monthlyDeposits: "Monatliche Einzahlungen",
    investmentPeriod: "Anlageperiode",
    expectedReturn: "Erwartete Rendite",
    years: "Jahre",
    apr: "JPA",
    annually: "annually",
    quarterly: "quarterly",
    string: "string",
  },
  nl: {
    investmentDetails: "Investeringsdetails",
    investmentGrowth: "Investeringsgroei",
    performanceSummary: "Prestatiepamflet",
    initialInvestment: "Initiële Investering",
    monthlyDeposits: "Maandelijkse Stortingen",
    investmentPeriod: "Investeringsperiode",
    expectedReturn: "Verwachte Opbrengst",
    years: "jaren",
    apr: "JPR",
    annually: "annually",
    quarterly: "quarterly",
    string: "string",
  // Translated labels for the performance summary
  const initialInvestment = t.initialInvestment;
  const monthlyDeposits = t.monthlyDeposits;
  const investmentPeriod = t.investmentPeriod;
  const expectedReturn = t.expectedReturn;
  const apr = t.apr;
  
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, string>>({});

  // Calculate investment growth
  useEffect(() => {
    const calculateInvestment = () => {
      const initialInvestment = values.initialInvestment as number || 0;
      const monthlyContribution = values.monthlyContribution as number || 0;
      const investmentPeriod = values.investmentPeriod as number || 0;
      const annualReturn = values.annualReturn as number || 0;
      const compoundFrequency = values.compoundFrequency as string || 'monthly';

      if ((initialInvestment > 0 || monthlyContribution > 0) && investmentPeriod > 0) {
        // Convert annual return to periodic rate
        const annualRate = annualReturn / 100;
        let periodsPerYear = 1;
        let periodicRate = annualRate;

        switch (compoundFrequency) {
          case 'annually':
            periodsPerYear = 1;
            periodicRate = annualRate;
            break;
          case 'quarterly':
            periodsPerYear = 4;
            periodicRate = annualRate / 4;
            break;
          case 'monthly':
            periodsPerYear = 12;
            periodicRate = annualRate / 12;
            break;
          case 'daily':
            periodsPerYear = 365;
            periodicRate = annualRate / 365;
            break;
        }

        const totalPeriods = investmentPeriod * periodsPerYear;

        // Future value of initial investment
        const futureValuePrincipal = initialInvestment * Math.pow(1 + periodicRate, totalPeriods);

        // Future value of annuity (monthly contributions)
        const periodicContribution = compoundFrequency === 'monthly' ? monthlyContribution :
                                    compoundFrequency === 'quarterly' ? monthlyContribution * 3 :
                                    compoundFrequency === 'annually' ? monthlyContribution * 12 :
                                    monthlyContribution * 12 / 365 * 30;

        const futureValueAnnuity = periodicContribution *
          (Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate;

        const totalFutureValue = futureValuePrincipal + futureValueAnnuity;
        const totalContributions = initialInvestment + (periodicContribution * totalPeriods);
        const totalReturns = totalFutureValue - totalContributions;
        const returnPercentage = totalContributions > 0 ? (totalReturns / totalContributions) * 100 : 0;

        setResults({
          futureValue: `$${totalFutureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          totalContributions: `$${totalContributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          totalReturns: `$${totalReturns.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          returnPercentage: `${returnPercentage.toFixed(1)}%`,
          annualizedReturn: annualReturn > 0 ? `${annualReturn.toFixed(1)}%` : '0%'
        });
      } else {
        setResults({});
      }
    };

    calculateInvestment();
  }, [values]);

  const handleInputChange = (name: string, value: string | number) => {
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
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t.investmentDetails}</h3>

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
                    <option key={option.value || option} value={option.value || option}>
                      {option.label || (typeof option === 'string' ? option.charAt(0).toUpperCase() + option.slice(1) : option)}
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

        {/* Results */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t.investmentGrowth}</h3>

          {/* Main Output */}
          <div className="bg-blue-50 p-2 sm:p-3 rounded-md border-l-3 border-blue-500">
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className="text-lg sm:text-xl font-bold text-blue-600">
              {results.futureValue || output.default}
            </div>
          </div>

          {/* Additional Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {additionalOutputs.map((additionalOutput) => (
              <div key={additionalOutput.field} className="bg-white border border-gray-200 p-2 rounded-md shadow-sm">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  {additionalOutput.label.replace('Total ', '')}
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {results[additionalOutput.field] || '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Performance Metrics */}
          {results.futureValue && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
{t.performanceSummary}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{initialInvestment}</div>
                  <div className="text-gray-600">${(values.initialInvestment as number).toLocaleString()}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{monthlyDeposits}</div>
                  <div className="text-gray-600">${(values.monthlyContribution as number).toLocaleString()}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{investmentPeriod}</div>
                  <div className="text-gray-600">{values.investmentPeriod} {t.years}</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{expectedReturn}</div>
                  <div className="text-gray-600">{values.annualReturn}% {apr}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
