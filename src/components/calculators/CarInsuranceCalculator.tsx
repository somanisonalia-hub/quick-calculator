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

interface CarInsuranceCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
  lang?: string;
}

export default function CarInsuranceCalculator({ inputs, output, additionalOutputs, lang = 'en' }: CarInsuranceCalculatorProps) {
  // Embedded translations following CALCULATOR_CREATION_AGENT.md approach
  const translations = {
    en: {
      lowRisk: "Low Risk",
      mediumRisk: "Medium Risk",
      highRisk: "High Risk",
      veryHighRisk: "Very High Risk",
      insuranceDetails: "Insurance Details",
      insuranceQuote: "Insurance Quote",
      ageFactor: "Age Factor",
      vehicleFactor: "Vehicle Factor",
      coverageFactor: "Coverage Factor",
      recordFactor: "Record Factor"
    },
    es: {
      lowRisk: "Riesgo Bajo",
      mediumRisk: "Riesgo Medio",
      highRisk: "Riesgo Alto",
      veryHighRisk: "Riesgo Muy Alto",
      insuranceDetails: "Detalles del Seguro",
      insuranceQuote: "Cotización de Seguro",
      ageFactor: "Factor de Edad",
      vehicleFactor: "Factor del Vehículo",
      coverageFactor: "Factor de Cobertura",
      recordFactor: "Factor de Registro"
    },
    pt: {
      lowRisk: "Baixo Risco",
      mediumRisk: "Risco Médio",
      highRisk: "Alto Risco",
      veryHighRisk: "Risco Muito Alto",
      insuranceDetails: "Detalhes do Seguro",
      insuranceQuote: "Cotação de Seguro",
      ageFactor: "Fator de Idade",
      vehicleFactor: "Fator do Veículo",
      coverageFactor: "Fator de Cobertura",
      recordFactor: "Fator de Registro"
    },
    fr: {
      lowRisk: "Risque Faible",
      mediumRisk: "Risque Moyen",
      highRisk: "Risque Élevé",
      veryHighRisk: "Risque Très Élevé",
      insuranceDetails: "Détails d'Assurance",
      insuranceQuote: "Devis d'Assurance",
      ageFactor: "Facteur d'Âge",
      vehicleFactor: "Facteur du Véhicule",
      coverageFactor: "Facteur de Couverture",
      recordFactor: "Facteur de Dossier"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, string | number>>({});

  // Calculate car insurance premium
  useEffect(() => {
    const calculateInsurance = () => {
      const age = values.age as number || 30;
      const vehicleValue = values.vehicleValue as number || 25000;
      const coverageType = values.coverageType as string || 'full';
      const deductible = values.deductible as number || 500;
      const annualMileage = values.annualMileage as number || 12000;
      const drivingRecord = values.drivingRecord as string || 'clean';

      // Base premium calculation
      let basePremium = 1200; // Base annual premium

      // Age factor (younger drivers pay more)
      let ageFactor = 1;
      if (age < 25) ageFactor = 2.5;
      else if (age < 30) ageFactor = 1.8;
      else if (age < 40) ageFactor = 1.2;
      else if (age < 60) ageFactor = 1.0;
      else ageFactor = 0.9; // Seniors get slight discount

      // Vehicle value factor
      const vehicleFactor = Math.max(0.8, Math.min(2.0, vehicleValue / 25000));

      // Coverage type factor
      let coverageFactor = 1;
      let coverageLevel = 'Standard';
      switch (coverageType) {
        case 'liability':
          coverageFactor = 0.6;
          coverageLevel = 'Liability Only';
          break;
        case 'full':
          coverageFactor = 1.0;
          coverageLevel = 'Full Coverage';
          break;
        case 'minimum':
          coverageFactor = 0.4;
          coverageLevel = 'Minimum Coverage';
          break;
      }

      // Deductible factor (higher deductible = lower premium)
      const deductibleFactor = Math.max(0.7, 1 - (deductible / 2000) * 0.3);

      // Mileage factor
      const mileageFactor = Math.max(0.8, Math.min(1.5, annualMileage / 12000));

      // Driving record factor
      let recordFactor = 1;
      let riskAssessment = t.lowRisk;
      switch (drivingRecord) {
        case 'clean':
          recordFactor = 1.0;
          riskAssessment = t.lowRisk;
          break;
        case 'minor':
          recordFactor = 1.3;
          riskAssessment = t.mediumRisk;
          break;
        case 'major':
          recordFactor = 1.8;
          riskAssessment = t.highRisk;
          break;
        case 'suspended':
          recordFactor = 2.5;
          riskAssessment = t.veryHighRisk;
          break;
      }

      // Calculate final premium
      const annualPremium = Math.round(basePremium * ageFactor * vehicleFactor * coverageFactor * deductibleFactor * mileageFactor * recordFactor);

      // Monthly payment (annual ÷ 12)
      const monthlyPayment = Math.round(annualPremium / 12);

      setResults({
        annualPremium: annualPremium.toLocaleString(),
        monthlyPayment: monthlyPayment.toLocaleString(),
        coverageLevel,
        riskAssessment,
        ageFactor: ageFactor.toFixed(2),
        vehicleFactor: vehicleFactor.toFixed(2),
        coverageFactor: coverageFactor.toFixed(2),
        recordFactor: recordFactor.toFixed(2)
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
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t.insuranceDetails}</h3>

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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t.insuranceQuote}</h3>

          {/* Main Output */}
          <div className="bg-blue-50 p-2 sm:p-3 rounded-md border-l-3 border-blue-500">
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className="text-lg sm:text-xl font-bold text-blue-600">
              {results.annualPremium ? formatCurrency(results.annualPremium) : output.default}
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

          {/* Premium Breakdown */}
          {results.annualPremium && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Premium Factors
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{t.ageFactor}</div>
                  <div className="text-gray-600">{results.ageFactor}x</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{t.vehicleFactor}</div>
                  <div className="text-gray-600">{results.vehicleFactor}x</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{t.coverageFactor}</div>
                  <div className="text-gray-600">{results.coverageFactor}x</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium text-gray-900">{t.recordFactor}</div>
                  <div className="text-gray-600">{results.recordFactor}x</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600 p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="font-medium">📝 Note:</span> This is an estimate. Actual rates vary by location, insurer, and other factors.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
