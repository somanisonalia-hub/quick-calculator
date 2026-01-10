'use client';

import { useState, useEffect } from 'react';

interface EffectiveInterestRateCalculatorProps {
  lang?: string;
}

export default function EffectiveInterestRateCalculator({ lang = 'en' }: EffectiveInterestRateCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Effective Interest Rate Calculator",
      description: "Convert between different interest rate formats including nominal, effective, and periodic rates",
      conversionType: "Conversion Type",
      inputRate: "Input Rate (%)",
      compoundingPeriods: "Compounding Periods per Year",
      calculate: "Calculate",
      reset: "Reset",
      convertedRate: "Converted Interest Rate",
      inputRateType: "Input Rate Type",
      outputRateType: "Output Rate Type",
      difference: "Difference",
      annualImpact: "Annual Impact",
      enterRateDetails: "Enter rate details above to calculate conversion",
      nominalToEffective: "Nominal to Effective Rate",
      effectiveToNominal: "Effective to Nominal Rate",
      periodicToEffective: "Periodic to Effective Rate",
      effectiveToPeriodic: "Effective to Periodic Rate"
    },
    es: {
      title: "Calculadora de Tasa de Interés Efectiva",
      description: "Convierte entre diferentes formatos de tasa de interés incluyendo nominal, efectiva y periódica",
      conversionType: "Tipo de Conversión",
      inputRate: "Tasa de Entrada (%)",
      compoundingPeriods: "Períodos de Capitalización por Año",
      calculate: "Calcular",
      reset: "Reiniciar",
      convertedRate: "Tasa de Interés Convertida",
      inputRateType: "Tipo Tasa Entrada",
      outputRateType: "Tipo Tasa Salida",
      difference: "Diferencia",
      annualImpact: "Impacto Anual",
      enterRateDetails: "Ingresa detalles de tasa arriba para calcular conversión",
      nominalToEffective: "Nominal a Tasa Efectiva",
      effectiveToNominal: "Efectiva a Tasa Nominal",
      periodicToEffective: "Periódica a Tasa Efectiva",
      effectiveToPeriodic: "Efectiva a Tasa Periódica"
    },
    pt: {
      title: "Calculadora de Taxa de Juros Efetiva",
      description: "Converta entre diferentes formatos de taxa de juros incluindo nominal, efetiva e periódica",
      conversionType: "Tipo de Conversão",
      inputRate: "Taxa de Entrada (%)",
      compoundingPeriods: "Períodos de Capitalização por Ano",
      calculate: "Calcular",
      reset: "Reiniciar",
      convertedRate: "Taxa de Juros Convertida",
      inputRateType: "Tipo Taxa Entrada",
      outputRateType: "Tipo Taxa Saída",
      difference: "Diferença",
      annualImpact: "Impacto Anual",
      enterRateDetails: "Digite detalhes da taxa acima para calcular conversão",
      nominalToEffective: "Nominal para Taxa Efetiva",
      effectiveToNominal: "Efetiva para Taxa Nominal",
      periodicToEffective: "Periódica para Taxa Efetiva",
      effectiveToPeriodic: "Efetiva para Taxa Periódica"
    },
    fr: {
      title: "Calculateur de Taux d'Intérêt Effectif",
      description: "Convertissez entre différents formats de taux d'intérêt incluant nominal, effectif et périodique",
      conversionType: "Type de Conversion",
      inputRate: "Taux d'Entrée (%)",
      compoundingPeriods: "Périodes de Capitalisation par An",
      calculate: "Calculer",
      reset: "Réinitialiser",
      convertedRate: "Taux d'Intérêt Converti",
      inputRateType: "Type Taux Entrée",
      outputRateType: "Type Taux Sortie",
      difference: "Différence",
      annualImpact: "Impact Annuel",
      enterRateDetails: "Entrez détails de taux ci-dessus pour calculer conversion",
      nominalToEffective: "Nominal vers Taux Effectif",
      effectiveToNominal: "Effectif vers Taux Nominal",
      periodicToEffective: "Périodique vers Taux Effectif",
      effectiveToPeriodic: "Effectif vers Taux Périodique"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [conversionType, setConversionType] = useState<'nominal_to_effective' | 'effective_to_nominal' | 'periodic_to_effective' | 'effective_to_periodic'>('nominal_to_effective');
  const [inputRate, setInputRate] = useState(5);
  const [compoundingPeriods, setCompoundingPeriods] = useState(12);
  const [results, setResults] = useState<any>({});

  const calculateConversion = () => {
    if (inputRate < 0 || compoundingPeriods <= 0) {
      setResults({});
      return;
    }

    const r = inputRate / 100; // Convert percentage to decimal
    const n = compoundingPeriods;
    let convertedRate = 0;
    let inputType = '';
    let outputType = '';
    let difference = 0;
    let annualImpact = '';

    switch (conversionType) {
      case 'nominal_to_effective':
        // EAR = (1 + r/n)^n - 1
        convertedRate = Math.pow(1 + (r / n), n) - 1;
        inputType = `${inputRate.toFixed(2)}% Nominal Annual Rate`;
        outputType = `${(convertedRate * 100).toFixed(2)}% Effective Annual Rate`;
        difference = (convertedRate * 100) - inputRate;
        annualImpact = `${n === 12 ? 'Monthly' : 'Quarterly'} compounding adds ${(difference).toFixed(2)}% to the effective rate`;
        break;

      case 'effective_to_nominal':
        // r = n × ((1 + EAR)^(1/n) - 1)
        convertedRate = n * (Math.pow(1 + r, 1 / n) - 1);
        inputType = `${inputRate.toFixed(2)}% Effective Annual Rate`;
        outputType = `${(convertedRate * 100).toFixed(2)}% Nominal Annual Rate`;
        difference = (convertedRate * 100) - inputRate;
        annualImpact = `${n === 12 ? 'Monthly' : 'Quarterly'} compounding ${difference > 0 ? 'increases' : 'decreases'} nominal rate by ${Math.abs(difference).toFixed(2)}%`;
        break;

      case 'periodic_to_effective':
        // Periodic rate to effective annual rate: EAR = (1 + periodic_rate)^n - 1
        convertedRate = Math.pow(1 + r, n) - 1;
        inputType = `${inputRate.toFixed(2)}% Periodic Rate (${n === 12 ? 'Monthly' : n === 4 ? 'Quarterly' : 'per period'})`;
        outputType = `${(convertedRate * 100).toFixed(2)}% Effective Annual Rate`;
        difference = (convertedRate * 100) - inputRate;
        annualImpact = `Converts periodic rate to equivalent annual effective rate`;
        break;

      case 'effective_to_periodic':
        // Effective annual rate to periodic rate: periodic = (1 + EAR)^(1/n) - 1
        convertedRate = Math.pow(1 + r, 1 / n) - 1;
        inputType = `${inputRate.toFixed(2)}% Effective Annual Rate`;
        outputType = `${(convertedRate * 100).toFixed(2)}% Periodic Rate (${n === 12 ? 'Monthly' : n === 4 ? 'Quarterly' : 'per period'})`;
        difference = (convertedRate * 100) - inputRate;
        annualImpact = `Converts annual effective rate to equivalent periodic rate`;
        break;
    }

    setResults({
      convertedRate: (convertedRate * 100).toFixed(2),
      inputRateType: inputType,
      outputRateType: outputType,
      rateDifference: difference.toFixed(2),
      annualImpact
    });
  };

  const resetCalculator = () => {
    setConversionType('nominal_to_effective');
    setInputRate(5);
    setCompoundingPeriods(12);
    setResults({});
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateConversion();
  }, [conversionType, inputRate, compoundingPeriods]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.conversionType}</label>
              <select
                value={conversionType}
                onChange={(e) => setConversionType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="nominal_to_effective">{t.nominalToEffective}</option>
                <option value="effective_to_nominal">{t.effectiveToNominal}</option>
                <option value="periodic_to_effective">{t.periodicToEffective}</option>
                <option value="effective_to_periodic">{t.effectiveToPeriodic}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.inputRate}</label>
              <input
                type="number"
                value={inputRate}
                onChange={(e) => setInputRate(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.01"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.compoundingPeriods}</label>
              <input
                type="number"
                value={compoundingPeriods}
                onChange={(e) => setCompoundingPeriods(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="1"
                min="1"
                max="365"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateConversion}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.calculate}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t.reset}
            </button>
          </div>

          {/* Formula Display */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">Conversion Formulas</h4>
            <div className="text-xs text-purple-700 space-y-1">
              <div><strong>Nominal → Effective:</strong> EAR = (1 + r/n)^n - 1</div>
              <div><strong>Effective → Nominal:</strong> r = n × ((1 + EAR)^(1/n) - 1)</div>
              <div><strong>Periodic → Effective:</strong> EAR = (1 + p)^n - 1</div>
              <div><strong>Effective → Periodic:</strong> p = (1 + EAR)^(1/n) - 1</div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              {/* Main Result */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <div className="text-sm text-purple-700 font-medium mb-2">{t.convertedRate}</div>
                <div className="text-4xl font-bold text-purple-800">
                  {results.convertedRate}%
                </div>
                <div className="text-xs text-purple-600 mt-2">
                  Converted rate result
                </div>
              </div>

              {/* Detailed Results */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.inputRateType}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {results.inputRateType}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.outputRateType}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {results.outputRateType}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.difference}</div>
                  <div className={`text-lg font-bold ${parseFloat(results.rateDifference) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(results.rateDifference) >= 0 ? '+' : ''}{results.rateDifference}%
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.annualImpact}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {results.annualImpact}
                  </div>
                </div>
              </div>

              {/* Educational Info */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">Understanding Rate Conversions</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div><strong>Nominal Rate:</strong> Stated annual rate without compounding</div>
                  <div><strong>Effective Rate:</strong> True annual rate with compounding effects</div>
                  <div><strong>Periodic Rate:</strong> Rate applied per compounding period</div>
                  <div><strong>Always compare:</strong> Effective rates for accurate comparisons</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.enterRateDetails}</h3>
              <p className="text-gray-500">Select conversion type and enter your rate details above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
