'use client';

import React, { useState, useMemo } from 'react';
import CalculatorPageClient from '@/components/CalculatorPageClient';

interface IncomeTaxCalculatorProps {
  lang: string;
}

interface TaxData {
  grossIncome: number;
  filingStatus: string;
  dependents: number;
  deductionType: string;
  itemizedDeductions: number;
  taxCredits: number;
  state: string;
  taxYear: string;
}

interface TaxResults {
  totalTaxLiability: number;
  federalTax: number;
  stateTax: number;
  taxableIncome: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  afterTaxIncome: number;
  federalTaxBreakdown: Array<{ bracket: string; income: number; rate: number; tax: number }>;
}

// Federal Tax Brackets 2024
const FEDERAL_TAX_BRACKETS_2024 = {
  single: [
    { min: 0, max: 11600, rate: 0.10, name: "10%" },
    { min: 11600, max: 47150, rate: 0.12, name: "12%" },
    { min: 47150, max: 100525, rate: 0.22, name: "22%" },
    { min: 100525, max: 191950, rate: 0.24, name: "24%" },
    { min: 191950, max: 243725, rate: 0.32, name: "32%" },
    { min: 243725, max: 609350, rate: 0.35, name: "35%" },
    { min: 609350, max: Infinity, rate: 0.37, name: "37%" }
  ],
  married_filing_jointly: [
    { min: 0, max: 23200, rate: 0.10, name: "10%" },
    { min: 23200, max: 94300, rate: 0.12, name: "12%" },
    { min: 94300, max: 201050, rate: 0.22, name: "22%" },
    { min: 201050, max: 383900, rate: 0.24, name: "24%" },
    { min: 383900, max: 487450, rate: 0.32, name: "32%" },
    { min: 487450, max: 731200, rate: 0.35, name: "35%" },
    { min: 731200, max: Infinity, rate: 0.37, name: "37%" }
  ],
  married_filing_separately: [
    { min: 0, max: 11600, rate: 0.10, name: "10%" },
    { min: 11600, max: 47150, rate: 0.12, name: "12%" },
    { min: 47150, max: 100525, rate: 0.22, name: "22%" },
    { min: 100525, max: 191950, rate: 0.24, name: "24%" },
    { min: 191950, max: 243725, rate: 0.32, name: "32%" },
    { min: 243725, max: 365600, rate: 0.35, name: "35%" },
    { min: 365600, max: Infinity, rate: 0.37, name: "37%" }
  ],
  head_of_household: [
    { min: 0, max: 16550, rate: 0.10, name: "10%" },
    { min: 16550, max: 63100, rate: 0.12, name: "12%" },
    { min: 63100, max: 100500, rate: 0.22, name: "22%" },
    { min: 100500, max: 191650, rate: 0.24, name: "24%" },
    { min: 191650, max: 243700, rate: 0.32, name: "32%" },
    { min: 243700, max: 609350, rate: 0.35, name: "35%" },
    { min: 609350, max: Infinity, rate: 0.37, name: "37%" }
  ]
};

// Standard Deductions 2024
const STANDARD_DEDUCTIONS_2024 = {
  single: 14600,
  married_filing_jointly: 29200,
  married_filing_separately: 14600,
  head_of_household: 21900
};

// Dependent Exemption 2024 (suspended through 2025, but keeping for future)
const DEPENDENT_EXEMPTION_2024 = 0; // Suspended through 2025

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

export default function IncomeTaxCalculator({ lang }: IncomeTaxCalculatorProps) {
  const [formData, setFormData] = useState<TaxData>({
    grossIncome: 75000,
    filingStatus: 'single',
    dependents: 0,
    deductionType: 'standard',
    itemizedDeductions: 0,
    taxCredits: 0,
    state: 'CA',
    taxYear: '2024'
  });

  const translations = {
    en: {
      title: "Income Tax Calculator",
      subtitle: "Calculate your federal and state income tax liability",
      grossIncome: "Gross Annual Income ($)",
      filingStatus: "Filing Status",
      dependents: "Number of Dependents",
      deductionType: "Deduction Type",
      itemizedDeductions: "Itemized Deductions ($)",
      taxCredits: "Tax Credits ($)",
      state: "State",
      taxYear: "Tax Year",
      calculate: "Calculate Tax Liability",
      results: "Tax Calculation Results",
      totalTaxLiability: "Total Tax Liability",
      federalTax: "Federal Income Tax",
      stateTax: "State Income Tax",
      taxableIncome: "Taxable Income",
      effectiveTaxRate: "Effective Tax Rate",
      marginalTaxRate: "Marginal Tax Rate",
      afterTaxIncome: "After-Tax Income",
      federalTaxBreakdown: "Federal Tax Breakdown by Bracket",
      bracket: "Bracket",
      incomeInBracket: "Income in Bracket",
      taxRate: "Tax Rate",
      taxAmount: "Tax Amount",
      deductionTypeOptions: {
        standard: "Standard Deduction",
        itemized: "Itemized Deductions"
      },
      filingStatusOptions: {
        single: "Single",
        married_filing_jointly: "Married Filing Jointly",
        married_filing_separately: "Married Filing Separately",
        head_of_household: "Head of Household"
      },
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
      percentage: "%",
      noteDisclaimer: "Note: This calculator provides estimates based on 2024 tax brackets and simplified state tax rates. Actual taxes may vary based on specific circumstances, additional income sources, exact state tax formulas, and IRS rules. Personal exemptions are suspended through 2025. Consult a tax professional for personalized tax advice."
    },
    es: {
      title: "Calculadora de Impuesto a la Renta",
      subtitle: "Calcula tu responsabilidad fiscal federal y estatal",
      grossIncome: "Ingreso Bruto Anual ($)",
      filingStatus: "Estado Civil",
      dependents: "Número de Dependientes",
      deductionType: "Tipo de Deducción",
      itemizedDeductions: "Deducciones Detalladas ($)",
      taxCredits: "Créditos Fiscales ($)",
      state: "Estado",
      taxYear: "Año Fiscal",
      calculate: "Calcular Responsabilidad Fiscal",
      results: "Resultados del Cálculo de Impuestos",
      totalTaxLiability: "Responsabilidad Fiscal Total",
      federalTax: "Impuesto Federal a la Renta",
      stateTax: "Impuesto Estatal a la Renta",
      taxableIncome: "Ingreso Gravable",
      effectiveTaxRate: "Tasa Efectiva de Impuestos",
      marginalTaxRate: "Tasa Marginal de Impuestos",
      afterTaxIncome: "Ingreso Después de Impuestos",
      federalTaxBreakdown: "Desglose de Impuesto Federal por Categoría",
      bracket: "Categoría",
      incomeInBracket: "Ingreso en Categoría",
      taxRate: "Tasa de Impuesto",
      taxAmount: "Monto de Impuesto",
      deductionTypeOptions: {
        standard: "Deducción Estándar",
        itemized: "Deducciones Detalladas"
      },
      filingStatusOptions: {
        single: "Soltero",
        married_filing_jointly: "Casados Declarando Conjuntamente",
        married_filing_separately: "Casados Declarando por Separado",
        head_of_household: "Cabeza de Hogar"
      },
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
      percentage: "%",
      noteDisclaimer: "Nota: Esta calculadora proporciona estimaciones basadas en los tramos impositivos de 2024 y tasas impositivas estatales simplificadas. Los impuestos reales pueden variar según circunstancias específicas, fuentes de ingresos adicionales, fórmulas exactas de impuestos estatales y reglas del IRS. Las exenciones personales están suspendidas hasta 2025. Consulte a un profesional de impuestos para asesoramiento personalizado."
    },
    pt: {
      title: "Calculadora de Imposto de Renda",
      subtitle: "Calcule sua responsabilidade fiscal federal e estadual",
      grossIncome: "Renda Bruta Anual (R$)",
      filingStatus: "Estado Civil",
      dependents: "Número de Dependentes",
      deductionType: "Tipo de Dedução",
      itemizedDeductions: "Deduções Detalhadas (R$)",
      taxCredits: "Créditos Fiscais (R$)",
      state: "Estado",
      taxYear: "Ano Fiscal",
      calculate: "Calcular Responsabilidade Fiscal",
      results: "Resultados do Cálculo de Impostos",
      totalTaxLiability: "Responsabilidade Fiscal Total",
      federalTax: "Imposto Federal de Renda",
      stateTax: "Imposto Estadual de Renda",
      taxableIncome: "Renda Tributável",
      effectiveTaxRate: "Taxa Efetiva de Impostos",
      marginalTaxRate: "Taxa Marginal de Impostos",
      afterTaxIncome: "Renda Após Impostos",
      federalTaxBreakdown: "Quebra de Imposto Federal por Categoria",
      bracket: "Categoria",
      incomeInBracket: "Renda na Categoria",
      taxRate: "Taxa de Imposto",
      taxAmount: "Valor do Imposto",
      deductionTypeOptions: {
        standard: "Dedução Padrão",
        itemized: "Deduções Detalhadas"
      },
      filingStatusOptions: {
        single: "Solteiro",
        married_filing_jointly: "Casados Declarando em Conjunto",
        married_filing_separately: "Casados Declarando Separadamente",
        head_of_household: "Chefe de Família"
      },
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
      percentage: "%",
      noteDisclaimer: "Nota: Esta calculadora fornece estimativas baseadas nas faixas de impostos de 2024 e taxas de impostos estaduais simplificadas. Os impostos reais podem variar com base em circunstâncias específicas, fontes de renda adicionais, fórmulas exatas de impostos estaduais e regras do IRS. As isenções pessoais estão suspensas até 2025. Consulte um profissional de impostos para aconselhamento personalizado."
    },
    fr: {
      title: "Calculateur d'Impôt sur le Revenu",
      subtitle: "Calculez votre responsabilité fiscale fédérale et étatique",
      grossIncome: "Revenu Brut Annuel (€)",
      filingStatus: "Statut Matrimonial",
      dependents: "Nombre de Personnes à Charge",
      deductionType: "Type de Déduction",
      itemizedDeductions: "Déductions Détaillées (€)",
      taxCredits: "Crédits Fiscaux (€)",
      state: "État",
      taxYear: "Année Fiscale",
      calculate: "Calculer Responsabilité Fiscale",
      results: "Résultats du Calcul d'Impôts",
      totalTaxLiability: "Responsabilité Fiscale Totale",
      federalTax: "Impôt Fédéral sur le Revenu",
      stateTax: "Impôt État sur le Revenu",
      taxableIncome: "Revenu Imposable",
      effectiveTaxRate: "Taux Effectif d'Impôts",
      marginalTaxRate: "Taux Marginal d'Impôts",
      afterTaxIncome: "Revenu Après Impôts",
      federalTaxBreakdown: "Ventilation d'Impôt Fédéral par Catégorie",
      bracket: "Catégorie",
      incomeInBracket: "Revenu dans Catégorie",
      taxRate: "Taux d'Impôt",
      taxAmount: "Montant d'Impôt",
      deductionTypeOptions: {
        standard: "Déduction Standard",
        itemized: "Déductions Détaillées"
      },
      filingStatusOptions: {
        single: "Célibataire",
        married_filing_jointly: "Mariés Déclarant Conjointement",
        married_filing_separately: "Mariés Déclarant Séparément",
        head_of_household: "Chef de Famille"
      },
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
      percentage: "%",
      noteDisclaimer: "Remarque: Cette calculatrice fournit des estimations basées sur les tranches d'imposition de 2024 et les taux d'imposition d'État simplifiés. Les impôts réels peuvent varier en fonction de circonstances spécifiques, de sources de revenus supplémentaires, de formules exactes d'imposition des États et de règles de l'IRS. Les exemptions personnelles sont suspendues jusqu'en 2025. Consultez un professionnel de la fiscalité pour des conseils personnalisés."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateTaxableIncome = (grossIncome: number, deductionType: string, itemizedDeductions: number, dependents: number, filingStatus: string): number => {
    let deductions = 0;

    if (deductionType === 'standard') {
      deductions = STANDARD_DEDUCTIONS_2024[filingStatus as keyof typeof STANDARD_DEDUCTIONS_2024] || STANDARD_DEDUCTIONS_2024.single;
    } else {
      deductions = itemizedDeductions;
    }

    const dependentDeduction = dependents * DEPENDENT_EXEMPTION_2024;

    return Math.max(0, grossIncome - deductions - dependentDeduction);
  };

  const calculateFederalTax = (taxableIncome: number, filingStatus: string): { totalTax: number; breakdown: Array<{ bracket: string; income: number; rate: number; tax: number }> } => {
    const brackets = FEDERAL_TAX_BRACKETS_2024[filingStatus as keyof typeof FEDERAL_TAX_BRACKETS_2024] || FEDERAL_TAX_BRACKETS_2024.single;

    let remainingIncome = taxableIncome;
    let totalTax = 0;
    const breakdown: Array<{ bracket: string; income: number; rate: number; tax: number }> = [];

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;

      const incomeInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      const taxInBracket = incomeInBracket * bracket.rate;

      breakdown.push({
        bracket: bracket.name,
        income: incomeInBracket,
        rate: bracket.rate,
        tax: taxInBracket
      });

      totalTax += taxInBracket;
      remainingIncome -= incomeInBracket;
    }

    return { totalTax, breakdown };
  };

  const calculateStateTax = (taxableIncome: number, state: string): number => {
    const rate = STATE_TAX_RATES[state] || 0;
    return taxableIncome * rate;
  };

  const getMarginalTaxRate = (taxableIncome: number, filingStatus: string): number => {
    const brackets = FEDERAL_TAX_BRACKETS_2024[filingStatus as keyof typeof FEDERAL_TAX_BRACKETS_2024] || FEDERAL_TAX_BRACKETS_2024.single;

    for (const bracket of brackets) {
      if (taxableIncome <= bracket.max || bracket.max === Infinity) {
        return bracket.rate;
      }
    }

    return 0.37; // Highest bracket
  };

  const results = useMemo((): TaxResults => {
    const taxableIncome = calculateTaxableIncome(
      formData.grossIncome,
      formData.deductionType,
      formData.itemizedDeductions,
      formData.dependents,
      formData.filingStatus
    );

    const { totalTax: federalTax, breakdown: federalTaxBreakdown } = calculateFederalTax(taxableIncome, formData.filingStatus);
    const stateTax = calculateStateTax(taxableIncome, formData.state);

    const totalTaxLiability = federalTax + stateTax - formData.taxCredits;
    const afterTaxIncome = formData.grossIncome - totalTaxLiability;
    const effectiveTaxRate = (totalTaxLiability / formData.grossIncome) * 100;
    const marginalTaxRate = getMarginalTaxRate(taxableIncome, formData.filingStatus) * 100;

    return {
      totalTaxLiability: Math.max(0, totalTaxLiability),
      federalTax,
      stateTax,
      taxableIncome,
      effectiveTaxRate,
      marginalTaxRate,
      afterTaxIncome,
      federalTaxBreakdown
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
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

            {/* Deduction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.deductionType}
              </label>
              <select
                value={formData.deductionType}
                onChange={(e) => handleInputChange('deductionType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.deductionTypeOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Itemized Deductions */}
            {formData.deductionType === 'itemized' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.itemizedDeductions}
                </label>
                <input
                  type="number"
                  value={formData.itemizedDeductions}
                  onChange={(e) => handleInputChange('itemizedDeductions', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  min="0"
                  max="100000"
                  step="100"
                />
              </div>
            )}

            {/* Tax Credits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.taxCredits}
              </label>
              <input
                type="number"
                value={formData.taxCredits}
                onChange={(e) => handleInputChange('taxCredits', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                min="0"
                max="50000"
                step="100"
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
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Main Results */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              {t.results}
            </h2>

            <div className="space-y-4">
              {/* Total Tax Liability */}
              <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {t.totalTaxLiability}
                </span>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(results.totalTaxLiability)}
                </span>
              </div>

              {/* Tax Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{t.federalTax}</span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    {formatCurrency(results.federalTax)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{t.stateTax}</span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    {formatCurrency(results.stateTax)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{t.afterTaxIncome}</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(results.afterTaxIncome)}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">{t.effectiveTaxRate}</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {formatPercentage(results.effectiveTaxRate)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{t.marginalTaxRate}</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {formatPercentage(results.marginalTaxRate)}
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

          {/* Federal Tax Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {t.federalTaxBreakdown}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">{t.bracket}</th>
                    <th className="text-right py-2 text-gray-600 dark:text-gray-400">{t.incomeInBracket}</th>
                    <th className="text-right py-2 text-gray-600 dark:text-gray-400">{t.taxRate}</th>
                    <th className="text-right py-2 text-gray-600 dark:text-gray-400">{t.taxAmount}</th>
                  </tr>
                </thead>
                <tbody>
                  {results.federalTaxBreakdown.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-2 text-gray-900 dark:text-white">{item.bracket}</td>
                      <td className="py-2 text-right text-gray-900 dark:text-white">
                        {formatCurrency(item.income)}
                      </td>
                      <td className="py-2 text-right text-gray-900 dark:text-white">
                        {formatPercentage(item.rate * 100)}
                      </td>
                      <td className="py-2 text-right text-red-600 dark:text-red-400">
                        {formatCurrency(item.tax)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          {t.noteDisclaimer}
        </p>
      </div>
    </div>
  );
}
