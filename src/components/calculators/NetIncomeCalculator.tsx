'use client';

import React, { useState, useMemo } from 'react';
import CalculatorPageClient from '@/components/CalculatorPageClient';

interface NetIncomeCalculatorProps {
  lang: string;
}

interface TaxData {
  grossIncome: number;
  filingStatus: string;
  dependents: number;
  state: string;
  taxYear: string;
}

interface TaxResults {
  netIncome: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  effectiveTaxRate: number;
  taxableIncome: number;
}

// US Federal Tax Brackets 2024
const FEDERAL_TAX_BRACKETS_2024 = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ],
  married_filing_jointly: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 }
  ],
  married_filing_separately: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 365600, rate: 0.35 },
    { min: 365600, max: Infinity, rate: 0.37 }
  ],
  head_of_household: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191650, rate: 0.24 },
    { min: 191650, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ]
};

// Standard Deductions 2024
const STANDARD_DEDUCTIONS_2024 = {
  single: 14600,
  married_filing_jointly: 29200,
  married_filing_separately: 14600,
  head_of_household: 21900
};

// Dependent Exemption 2024
const DEPENDENT_EXEMPTION_2024 = 4700;

// FICA Tax Rates and Limits 2024
const FICA_RATES_2024 = {
  socialSecurity: 0.062, // 6.2%
  medicare: 0.0145, // 1.45%
  socialSecurityLimit: 168600
};

// State Tax Rates (simplified flat rates for major calculations)
const STATE_TAX_RATES: { [key: string]: number } = {
  CA: 0.133, // California (progressive, approx average)
  TX: 0, // No state income tax
  FL: 0, // No state income tax
  NY: 0.065, // New York (simplified)
  PA: 0.0307, // Pennsylvania
  IL: 0.0495, // Illinois
  OH: 0.0399, // Ohio (simplified)
  GA: 0.0575, // Georgia
  NC: 0.0525, // North Carolina
  MI: 0.0425, // Michigan
  NJ: 0.0553, // New Jersey
  VA: 0.0575, // Virginia
  WA: 0, // No state income tax
  AZ: 0.0259, // Arizona
  MA: 0.05, // Massachusetts
  TN: 0, // No state income tax
  IN: 0.0323, // Indiana
  MO: 0.049, // Missouri
  MD: 0.0475, // Maryland
  WI: 0.053, // Wisconsin
  CO: 0.0455, // Colorado
  MN: 0.0535, // Minnesota
  SC: 0.07, // South Carolina
  AL: 0.05, // Alabama
  LA: 0.0425, // Louisiana
  KY: 0.045, // Kentucky
  OR: 0.099, // Oregon
  OK: 0.0475, // Oklahoma
  CT: 0.055, // Connecticut
  UT: 0.0486, // Utah
  IA: 0.048, // Iowa
  NV: 0, // No state income tax
  AR: 0.055, // Arkansas
  MS: 0.05, // Mississippi
  KS: 0.045, // Kansas
  NM: 0.047, // New Mexico
  NE: 0.055, // Nebraska
  WV: 0.06, // West Virginia
  ID: 0.058, // Idaho
  HI: 0.0825, // Hawaii
  NH: 0, // No state income tax
  ME: 0.0715, // Maine
  RI: 0.0599, // Rhode Island
  MT: 0.069, // Montana
  DE: 0.066, // Delaware
  SD: 0, // No state income tax
  AK: 0, // No state income tax
  ND: 0.029, // North Dakota
  VT: 0.066, // Vermont
  WY: 0, // No state income tax
  DC: 0.085, // District of Columbia
};

export default function NetIncomeCalculator({ lang }: NetIncomeCalculatorProps) {
  const [formData, setFormData] = useState<TaxData>({
    grossIncome: 75000,
    filingStatus: 'single',
    dependents: 0,
    state: 'CA',
    taxYear: '2024'
  });

  const translations = {
    en: {
      title: "Net Income Calculator",
      subtitle: "Calculate your take-home pay after all taxes and deductions",
      grossIncome: "Gross Annual Income ($)",
      filingStatus: "Filing Status",
      dependents: "Number of Dependents",
      state: "State",
      taxYear: "Tax Year",
      calculate: "🔄 Recalculate",
      results: "Tax Calculation Results",
      netIncome: "Net Annual Income",
      federalTax: "Federal Income Tax",
      stateTax: "State Income Tax",
      ficaTax: "FICA Taxes (Social Security + Medicare)",
      effectiveTaxRate: "Effective Tax Rate",
      taxableIncome: "Taxable Income",
      filingStatusOptions: {
        single: "Single",
        married_filing_jointly: "Married Filing Jointly",
        married_filing_separately: "Married Filing Separately",
        head_of_household: "Head of Household"
      },
      reset: "Reset",
      stateOptions: {
        CA: "California",
        TX: "Texas",
        FL: "Florida",
        NY: "New York",
        PA: "Pennsylvania",
        IL: "Illinois",
        OH: "Ohio",
        GA: "Georgia",
        NC: "North Carolina",
        MI: "Michigan",
        NJ: "New Jersey",
        VA: "Virginia",
        WA: "Washington",
        AZ: "Arizona",
        MA: "Massachusetts",
        TN: "Tennessee",
        IN: "Indiana",
        MO: "Missouri",
        MD: "Maryland",
        WI: "Wisconsin",
        CO: "Colorado",
        MN: "Minnesota",
        SC: "South Carolina",
        AL: "Alabama",
        LA: "Louisiana",
        KY: "Kentucky",
        OR: "Oregon",
        OK: "Oklahoma",
        CT: "Connecticut",
        UT: "Utah",
        IA: "Iowa",
        NV: "Nevada",
        AR: "Arkansas",
        MS: "Mississippi",
        KS: "Kansas",
        NM: "New Mexico",
        NE: "Nebraska",
        WV: "West Virginia",
        ID: "Idaho",
        HI: "Hawaii",
        NH: "New Hampshire",
        ME: "Maine",
        RI: "Rhode Island",
        MT: "Montana",
        DE: "Delaware",
        SD: "South Dakota",
        AK: "Alaska",
        ND: "North Dakota",
        VT: "Vermont",
        WY: "Wyoming",
        DC: "District of Columbia"
      },
      taxYearOptions: {
        "2024": "2024",
        "2023": "2023",
        "2022": "2022"
      },
      currency: "$",
      percentage: "%"
,
      noteDisclaimer: "Note: This calculator provides estimates based on 2024 tax brackets and standard deduction. State taxes, additional deductions, credits, and other factors are not included. Consult a tax professional for accurate calculations."
    },
    es: {
      title: "Calculadora de Ingreso Neto",
      subtitle: "Calcula tu salario después de todos los impuestos y deducciones",
      grossIncome: "Ingreso Bruto Anual ($)",
      filingStatus: "Estado Civil",
      dependents: "Número de Dependientes",
      state: "Estado",
      taxYear: "Año Fiscal",
      calculate: "🔄 Recalcular",
      results: "Resultados del Cálculo de Impuestos",
      netIncome: "Ingreso Neto Anual",
      federalTax: "Impuesto Federal a la Renta",
      stateTax: "Impuesto Estatal a la Renta",
      ficaTax: "Impuestos FICA (Seguro Social + Medicare)",
      effectiveTaxRate: "Tasa Efectiva de Impuestos",
      taxableIncome: "Ingreso Gravable",
      filingStatusOptions: {
        single: "Soltero",
        married_filing_jointly: "Casados Declarando Conjuntamente",
        married_filing_separately: "Casados Declarando por Separado",
        head_of_household: "Cabeza de Hogar"
      },
      reset: "Restablecer",
      stateOptions: {
        CA: "California",
        TX: "Texas",
        FL: "Florida",
        NY: "Nueva York",
        PA: "Pensilvania",
        IL: "Illinois",
        OH: "Ohio",
        GA: "Georgia",
        NC: "Carolina del Norte",
        MI: "Michigan",
        NJ: "Nueva Jersey",
        VA: "Virginia",
        WA: "Washington",
        AZ: "Arizona",
        MA: "Massachusetts",
        TN: "Tennessee",
        IN: "Indiana",
        MO: "Missouri",
        MD: "Maryland",
        WI: "Wisconsin",
        CO: "Colorado",
        MN: "Minnesota",
        SC: "Carolina del Sur",
        AL: "Alabama",
        LA: "Louisiana",
        KY: "Kentucky",
        OR: "Oregon",
        OK: "Oklahoma",
        CT: "Connecticut",
        UT: "Utah",
        IA: "Iowa",
        NV: "Nevada",
        AR: "Arkansas",
        MS: "Mississippi",
        KS: "Kansas",
        NM: "Nuevo México",
        NE: "Nebraska",
        WV: "Virginia Occidental",
        ID: "Idaho",
        HI: "Hawaii",
        NH: "Nuevo Hampshire",
        ME: "Maine",
        RI: "Rhode Island",
        MT: "Montana",
        DE: "Delaware",
        SD: "Dakota del Sur",
        AK: "Alaska",
        ND: "Dakota del Norte",
        VT: "Vermont",
        WY: "Wyoming",
        DC: "Distrito de Columbia"
      },
      taxYearOptions: {
        "2024": "2024",
        "2023": "2023",
        "2022": "2022"
      },
      currency: "$",
      percentage: "%"
,
      noteDisclaimer: "Nota: Esta calculadora proporciona estimaciones basadas en los tramos impositivos de 2024 y la deducción estándar. No se incluyen impuestos estatales, deducciones adicionales, créditos y otros factores. Consulte a un profesional de impuestos para cálculos precisos."
    },
    pt: {
      title: "Calculadora de Renda Líquida",
      subtitle: "Calcule seu salário após todos os impostos e deduções",
      grossIncome: "Renda Bruta Anual (R$)",
      filingStatus: "Estado Civil",
      dependents: "Número de Dependentes",
      state: "Estado",
      taxYear: "Ano Fiscal",
      calculate: "🔄 Recalcular",
      results: "Resultados do Cálculo de Impostos",
      netIncome: "Renda Líquida Anual",
      federalTax: "Imposto Federal de Renda",
      stateTax: "Imposto Estadual de Renda",
      ficaTax: "Impostos FICA (Previdência Social + Medicare)",
      effectiveTaxRate: "Taxa Efetiva de Impostos",
      taxableIncome: "Renda Tributável",
      filingStatusOptions: {
        single: "Solteiro",
        married_filing_jointly: "Casados Declarando em Conjunto",
        married_filing_separately: "Casados Declarando Separadamente",
        head_of_household: "Chefe de Família"
      },
      reset: "Redefinir",
      stateOptions: {
        CA: "Califórnia",
        TX: "Texas",
        FL: "Flórida",
        NY: "Nova York",
        PA: "Pensilvânia",
        IL: "Illinois",
        OH: "Ohio",
        GA: "Georgia",
        NC: "Carolina do Norte",
        MI: "Michigan",
        NJ: "Nova Jersey",
        VA: "Virgínia",
        WA: "Washington",
        AZ: "Arizona",
        MA: "Massachusetts",
        TN: "Tennessee",
        IN: "Indiana",
        MO: "Missouri",
        MD: "Maryland",
        WI: "Wisconsin",
        CO: "Colorado",
        MN: "Minnesota",
        SC: "Carolina do Sul",
        AL: "Alabama",
        LA: "Louisiana",
        KY: "Kentucky",
        OR: "Oregon",
        OK: "Oklahoma",
        CT: "Connecticut",
        UT: "Utah",
        IA: "Iowa",
        NV: "Nevada",
        AR: "Arkansas",
        MS: "Mississippi",
        KS: "Kansas",
        NM: "Novo México",
        NE: "Nebraska",
        WV: "Virgínia Ocidental",
        ID: "Idaho",
        HI: "Havaí",
        NH: "Nova Hampshire",
        ME: "Maine",
        RI: "Rhode Island",
        MT: "Montana",
        DE: "Delaware",
        SD: "Dakota do Sul",
        AK: "Alasca",
        ND: "Dakota do Norte",
        VT: "Vermont",
        WY: "Wyoming",
        DC: "Distrito de Colúmbia"
      },
      taxYearOptions: {
        "2024": "2024",
        "2023": "2023",
        "2022": "2022"
      },
      currency: "R$",
      percentage: "%"
,
      noteDisclaimer: "Nota: Esta calculadora fornece estimativas baseadas nas faixas de impostos de 2024 e dedução padrão. Impostos estaduais, deduções adicionais, créditos e outros fatores não estão incluídos. Consulte um profissional de impostos para cálculos precisos."
    },
    fr: {
      title: "Calculateur de Revenu Net",
      subtitle: "Calculez votre salaire après tous les impôts et déductions",
      grossIncome: "Revenu Brut Annuel (€)",
      filingStatus: "Statut Matrimonial",
      dependents: "Nombre de Personnes à Charge",
      state: "État",
      taxYear: "Année Fiscale",
      calculate: "🔄 Recalculer",
      results: "Résultats du Calcul d'Impôts",
      netIncome: "Revenu Net Annuel",
      federalTax: "Impôt Fédéral sur le Revenu",
      stateTax: "Impôt État sur le Revenu",
      ficaTax: "Impôts FICA (Sécurité Sociale + Medicare)",
      effectiveTaxRate: "Taux Effectif d'Impôts",
      taxableIncome: "Revenu Imposable",
      filingStatusOptions: {
        single: "Célibataire",
        married_filing_jointly: "Mariés Déclarant Conjointement",
        married_filing_separately: "Mariés Déclarant Séparément",
        head_of_household: "Chef de Famille"
      },
      reset: "Réinitialiser",
      stateOptions: {
        CA: "Californie",
        TX: "Texas",
        FL: "Floride",
        NY: "New York",
        PA: "Pennsylvanie",
        IL: "Illinois",
        OH: "Ohio",
        GA: "Georgia",
        NC: "Caroline du Nord",
        MI: "Michigan",
        NJ: "New Jersey",
        VA: "Virginie",
        WA: "Washington",
        AZ: "Arizona",
        MA: "Massachusetts",
        TN: "Tennessee",
        IN: "Indiana",
        MO: "Missouri",
        MD: "Maryland",
        WI: "Wisconsin",
        CO: "Colorado",
        MN: "Minnesota",
        SC: "Caroline du Sud",
        AL: "Alabama",
        LA: "Louisiane",
        KY: "Kentucky",
        OR: "Oregon",
        OK: "Oklahoma",
        CT: "Connecticut",
        UT: "Utah",
        IA: "Iowa",
        NV: "Nevada",
        AR: "Arkansas",
        MS: "Mississippi",
        KS: "Kansas",
        NM: "Nouveau Mexique",
        NE: "Nebraska",
        WV: "Virginie Occidentale",
        ID: "Idaho",
        HI: "Hawaii",
        NH: "New Hampshire",
        ME: "Maine",
        RI: "Rhode Island",
        MT: "Montana",
        DE: "Delaware",
        SD: "Dakota du Sud",
        AK: "Alaska",
        ND: "Dakota du Nord",
        VT: "Vermont",
        WY: "Wyoming",
        DC: "District de Columbia"
      },
      taxYearOptions: {
        "2024": "2024",
        "2023": "2023",
        "2022": "2022"
      },
      currency: "€",
      percentage: "%"
,
      noteDisclaimer: "Remarque: Cette calculatrice fournit des estimations basées sur les tranches d'imposition de 2024 et la déduction standard. Les impôts d'État, les déductions supplémentaires, les crédits et d'autres facteurs ne sont pas inclus. Consultez un professionnel de la fiscalité pour des calculs précis."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateFederalTax = (taxableIncome: number, filingStatus: string): number => {
    const brackets = FEDERAL_TAX_BRACKETS_2024[filingStatus as keyof typeof FEDERAL_TAX_BRACKETS_2024] || FEDERAL_TAX_BRACKETS_2024.single;
    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;

      const bracketIncome = Math.min(remainingIncome, bracket.max - bracket.min);
      tax += bracketIncome * bracket.rate;
      remainingIncome -= bracketIncome;
    }

    return tax;
  };

  const resetCalculator = () => {
    // Reset form data to defaults
    setFormData({
      grossIncome: 75000,
      filingStatus: 'single',
      dependents: 0,
      state: 'CA',
      taxYear: '2024'
    });
  };

  const calculateStateTax = (taxableIncome: number, state: string): number => {
    const rate = STATE_TAX_RATES[state] || 0;
    return taxableIncome * rate;
  };

  const calculateFicaTax = (grossIncome: number): number => {
    const socialSecurityTax = Math.min(grossIncome, FICA_RATES_2024.socialSecurityLimit) * FICA_RATES_2024.socialSecurity;
    const medicareTax = grossIncome * FICA_RATES_2024.medicare;
    return socialSecurityTax + medicareTax;
  };

  const calculateTaxableIncome = (grossIncome: number, filingStatus: string, dependents: number): number => {
    const standardDeduction = STANDARD_DEDUCTIONS_2024[filingStatus as keyof typeof STANDARD_DEDUCTIONS_2024] || STANDARD_DEDUCTIONS_2024.single;
    const dependentDeduction = dependents * DEPENDENT_EXEMPTION_2024;
    return Math.max(0, grossIncome - standardDeduction - dependentDeduction);
  };

  const results = useMemo((): TaxResults => {
    const taxableIncome = calculateTaxableIncome(formData.grossIncome, formData.filingStatus, formData.dependents);
    const federalTax = calculateFederalTax(taxableIncome, formData.filingStatus);
    const stateTax = calculateStateTax(taxableIncome, formData.state);
    const ficaTax = calculateFicaTax(formData.grossIncome);
    const totalTax = federalTax + stateTax + ficaTax;
    const netIncome = formData.grossIncome - totalTax;
    const effectiveTaxRate = (totalTax / formData.grossIncome) * 100;

    return {
      netIncome,
      federalTax,
      stateTax,
      ficaTax,
      effectiveTaxRate,
      taxableIncome
    };
  }, [formData]);

  const handleInputChange = (field: keyof TaxData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : lang === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: lang === 'pt' ? 'BRL' : lang === 'fr' ? 'EUR' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (rate: number): string => {
    return `${rate.toFixed(1)}%`;
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.title}
          </h2>

          <div className="space-y-6">
            {/* Gross Income */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.grossIncome}
              </label>
              <input
                type="number"
                value={formData.grossIncome}
                onChange={(e) => handleInputChange('grossIncome', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                min="0"
                max="10000000"
                step="1000"
              />
            </div>

            {/* Filing Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.filingStatus}
              </label>
              <select
                value={formData.filingStatus}
                onChange={(e) => handleInputChange('filingStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.filingStatusOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Dependents */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.dependents}
              </label>
              <input
                type="number"
                value={formData.dependents}
                onChange={(e) => handleInputChange('dependents', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                min="0"
                max="10"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.state}
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.stateOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Tax Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.taxYear}
              </label>
              <select
                value={formData.taxYear}
                onChange={(e) => handleInputChange('taxYear', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.taxYearOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>
          </div>

        </div>

        {/* Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.results}
          </h2>

          <div className="space-y-4">
            {/* Net Income */}
            <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.netIncome}
              </span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(results.netIncome)}
              </span>
            </div>

            {/* Tax Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.federalTax}</span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  -{formatCurrency(results.federalTax)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.stateTax}</span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  -{formatCurrency(results.stateTax)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.ficaTax}</span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  -{formatCurrency(results.ficaTax)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{t.effectiveTaxRate}</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {formatPercentage(results.effectiveTaxRate)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.taxableIncome}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(results.taxableIncome)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          {t.noteDisclaimer}</p>
      </div>
    </div>
  );
}
