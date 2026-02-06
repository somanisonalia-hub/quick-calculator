'use client';

import React, { useState, useEffect } from 'react';


interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: number | string;
  min?: number;
  max?: number;
  step?: number | string;
  options?: { value: string; label: string }[];
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

interface CompoundInterestCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
  lang?: string;
}

export default function CompoundInterestCalculator({ inputs, output, additionalOutputs, lang = 'en' }: CompoundInterestCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      investmentDetails: "Investment Details",
      investmentGrowth: "Investment Growth",
      powerOfCompounding: "Power of Compounding",
      compoundingMessage: "Your money grows exponentially over time"
    },
    es: {
      investmentDetails: "Detalles de Inversión",
      investmentGrowth: "Crecimiento de Inversión",
      powerOfCompounding: "Poder del Interés Compuesto",
      compoundingMessage: "Tu dinero crece exponencialmente con el tiempo"
    },
    pt: {
      investmentDetails: "Detalhes do Investimento",
      investmentGrowth: "Crescimento do Investimento",
      powerOfCompounding: "Poder da Capitalização",
      compoundingMessage: "Seu dinheiro cresce exponencialmente ao longo do tempo"
    },
    fr: {
      investmentDetails: "Détails d'Investissement",
      investmentGrowth: "Croissance d'Investissement",
      powerOfCompounding: "Puissance de la Capitalisation",
      compoundingMessage: "Votre argent croît de manière exponentielle au fil du temps"
    }
  ,
    de: {
      investmentDetails: "Investitionsdetails",
      investmentGrowth: "Investitionswachstum",
      powerOfCompounding: "Kraft des Zinseszinses",
      compoundingMessage: "Ihr Geld wächst exponentiell im Laufe der Zeit"
    },
    nl: {
      investmentDetails: "Investeringsdetails",
      investmentGrowth: "Investeringsgroei",
      powerOfCompounding: "Kracht van Samengestelde Rente",
      compoundingMessage: "Uw geld groeit exponentieel in de loop van de tijd"
    }
  };const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, number>>({});

  // Calculate compound interest
  useEffect(() => {
    const calculateCompoundInterest = () => {
      const principal = values.principal as number || 0;
      const rate = values.rate as number || 0;
      const time = values.time as number || 0;
      const compoundFrequency = values.compoundFrequency as number || 12;

      if (principal > 0 && rate > 0 && time > 0 && compoundFrequency > 0) {
        const r = rate / 100;
        const amount = principal * Math.pow(1 + (r / compoundFrequency), compoundFrequency * time);
        const interest = amount - principal;

        setResults({
          finalAmount: amount,
          totalInterest: interest,
          principal: principal
        });
      } else {
        setResults({});
      }
    };

    calculateCompoundInterest();
  }, [values]);

  const handleInputChange = (name: string, value: string) => {
    const numValue = name === 'compoundFrequency' ? value : (parseFloat(value) || 0);
    setValues(prev => ({
      ...prev,
      [name]: numValue
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.investmentDetails}</h3>
          {inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {input.label}
              </label>
              {input.type === 'select' && input.options ? (
                <select
                  value={values[input.name] || ''}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {input.options.map((option) => {
                    const value = typeof option === 'string' ? option : option.value;
                    const label = typeof option === 'string' ? option : option.label;
                    return (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  type="number"
                  value={values[input.name] || ''}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.investmentGrowth}</h3>

          {/* Main Output */}
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-1">{output.label}</div>
            <div className="text-3xl font-bold text-blue-600">
              {results.finalAmount ? formatCurrency(results.finalAmount) : output.default}
            </div>
          </div>

          {/* Additional Outputs */}
          {additionalOutputs && additionalOutputs.map((additionalOutput) => (
            <div key={additionalOutput.field} className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{additionalOutput.label}</div>
              <div className="text-lg font-semibold text-gray-900">
                {results[additionalOutput.field] && (typeof results[additionalOutput.field] === 'number' || typeof results[additionalOutput.field] === 'string')
                  ? (additionalOutput.format === 'currency'
                      ? formatCurrency(results[additionalOutput.field])
                      : results[additionalOutput.field].toLocaleString())
                  : '—'
                }
              </div>
            </div>
          ))}

          {/* Info Message */}
          {results.finalAmount && (
            <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
              <p className="text-sm text-yellow-800">
                💡 <strong>{t.powerOfCompounding}:</strong> {t.compoundingMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
