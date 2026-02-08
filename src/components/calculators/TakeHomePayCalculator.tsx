'use client';

import React, { useState, useMemo } from 'react';
import CalculatorPageClient from '@/components/CalculatorPageClient';

interface TakeHomePayCalculatorProps {
  lang: string;
}

interface PaycheckData {
  grossPay: number;
  payFrequency: string;
  filingStatus: string;
  dependents: number;
  state: string;
  healthInsurance: number;
  retirement401k: number;
  otherDeductions: number;
}

interface PaycheckResults {
  netTakeHome: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  totalDeductions: number;
  takeHomePercentage: number;
  annualizedIncome: number;
}

// Pay periods per year
const PAY_PERIODS = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12
};

// Simplified IRS withholding tables (2024) - percentage method approximation
// In a real application, you'd use the exact IRS withholding tables
const FEDERAL_WITHHOLDING_RATES = {
  single: [
    { bracket: 0, rate: 0, constant: 0 },
    { bracket: 146, rate: 0.10, constant: 0 },
    { bracket: 559, rate: 0.12, constant: 14.60 },
    { bracket: 1362, rate: 0.22, constant: 59.58 },
    { bracket: 3046, rate: 0.24, constant: 193.59 },
    { bracket: 6930, rate: 0.32, constant: 469.82 },
    { bracket: 16449, rate: 0.35, constant: 1091.82 },
    { bracket: 34913, rate: 0.37, constant: 2677.67 }
  ],
  married_filing_jointly: [
    { bracket: 0, rate: 0, constant: 0 },
    { bracket: 292, rate: 0.10, constant: 0 },
    { bracket: 1118, rate: 0.12, constant: 29.20 },
    { bracket: 2724, rate: 0.22, constant: 119.16 },
    { bracket: 6092, rate: 0.24, constant: 387.18 },
    { bracket: 13860, rate: 0.32, constant: 939.64 },
    { bracket: 32898, rate: 0.35, constant: 2183.64 },
    { bracket: 69826, rate: 0.37, constant: 5355.34 }
  ],
  married_filing_separately: [
    { bracket: 0, rate: 0, constant: 0 },
    { bracket: 146, rate: 0.10, constant: 0 },
    { bracket: 559, rate: 0.12, constant: 14.60 },
    { bracket: 1362, rate: 0.22, constant: 59.58 },
    { bracket: 3046, rate: 0.24, constant: 193.59 },
    { bracket: 6930, rate: 0.32, constant: 469.82 },
    { bracket: 16449, rate: 0.35, constant: 1091.82 },
    { bracket: 34913, rate: 0.37, constant: 2677.67 }
  ],
  head_of_household: [
    { bracket: 0, rate: 0, constant: 0 },
    { bracket: 207, rate: 0.10, constant: 0 },
    { bracket: 791, rate: 0.12, constant: 20.70 },
    { bracket: 1929, rate: 0.22, constant: 84.38 },
    { bracket: 4318, rate: 0.24, constant: 274.02 },
    { bracket: 9817, rate: 0.32, constant: 665.15 },
    { bracket: 23259, rate: 0.35, constant: 1545.13 },
    { bracket: 49401, rate: 0.37, constant: 3790.96 }
  ]
};

// Standard deduction per pay period (2024)
const STANDARD_DEDUCTION_PER_PAY_PERIOD = {
  weekly: 284,
  biweekly: 568,
  semimonthly: 616,
  monthly: 1232
};

// Dependent exemption per pay period (2024)
const DEPENDENT_EXEMPTION_PER_PAY_PERIOD = {
  weekly: 80,
  biweekly: 160,
  semimonthly: 173,
  monthly: 346
};

// FICA tax rates
const FICA_RATES = {
  socialSecurity: 0.062, // 6.2%
  medicare: 0.0145, // 1.45%
  socialSecurityLimit: 168600
};

export default function TakeHomePayCalculator({ lang }: TakeHomePayCalculatorProps) {
  const [formData, setFormData] = useState<PaycheckData>({
    grossPay: 2000,
    payFrequency: 'biweekly',
    filingStatus: 'single',
    dependents: 0,
    state: 'CA',
    healthInsurance: 0,
    retirement401k: 0,
    otherDeductions: 0
  });

  const translations = {
    en: {
      title: "Take-Home Pay Calculator",
      subtitle: "Calculate your net paycheck after all taxes and deductions",
      grossPay: "Gross Paycheck Amount ($)",
      payFrequency: "Pay Frequency",
      filingStatus: "Federal Filing Status",
      dependents: "Number of Dependents",
      state: "State",
      healthInsurance: "Health Insurance Premium ($)",
      retirement401k: "401(k) Retirement Contribution ($)",
      otherDeductions: "Other Deductions ($)",
      calculate: "🔄 Recalculate",
      results: "Paycheck Breakdown",
      netTakeHome: "Net Take-Home Pay",
      federalTax: "Federal Income Tax",
      stateTax: "State Income Tax",
      ficaTax: "FICA Taxes (Social Security + Medicare)",
      totalDeductions: "Total Deductions",
      takeHomePercentage: "Take-Home Percentage",
      annualizedIncome: "Annualized Gross Income",
      payFrequencyOptions: {
        weekly: "Weekly",
        biweekly: "Biweekly (every 2 weeks)",
        semimonthly: "Semimonthly (twice a month)",
        monthly: "Monthly",
      reset: "Reset"
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
      currency: "$",
      percentage: "%"
,
      noteDisclaimer: "Note: This calculator provides estimates based on 2024 federal withholding tables and standard deduction. State taxes, local taxes, additional deductions, and other payroll factors are not included. Actual take-home pay may vary."
    },
    es: {
      title: "Calculadora de Salario Neto",
      subtitle: "Calcula tu nómina neta después de todos los impuestos y deducciones",
      grossPay: "Monto Bruto de Nómina ($)",
      payFrequency: "Frecuencia de Pago",
      filingStatus: "Estado Civil Federal",
      dependents: "Número de Dependientes",
      state: "Estado",
      healthInsurance: "Prima de Seguro Médico ($)",
      retirement401k: "Contribución Jubilación 401(k) ($)",
      otherDeductions: "Otras Deducciones ($)",
      calculate: "🔄 Recalcular",
      results: "Desglose de Nómina",
      netTakeHome: "Salario Neto",
      federalTax: "Impuesto Federal a la Renta",
      stateTax: "Impuesto Estatal a la Renta",
      ficaTax: "Impuestos FICA (Seguro Social + Medicare)",
      totalDeductions: "Total Deducciones",
      takeHomePercentage: "Porcentaje Neto",
      annualizedIncome: "Ingreso Bruto Anualizado",
      payFrequencyOptions: {
        weekly: "Semanal",
        biweekly: "Quincenal (cada 2 semanas)",
        semimonthly: "Semimensual (dos veces al mes)",
        monthly: "Mensual",
      reset: "Restablecer"
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
      currency: "$",
      percentage: "%"
,
      noteDisclaimer: "Nota: Esta calculadora proporciona estimaciones basadas en las tablas de retención federal de 2024 y la deducción estándar. No se incluyen impuestos estatales, impuestos locales, deducciones adicionales y otros factores de nómina. El pago neto real puede variar."
    },
    pt: {
      title: "Calculadora de Salário Líquido",
      subtitle: "Calcule seu contracheque líquido após todos os impostos e deduções",
      grossPay: "Valor Bruto do Contracheque (R$)",
      payFrequency: "Frequência de Pagamento",
      filingStatus: "Estado Civil Federal",
      dependents: "Número de Dependentes",
      state: "Estado",
      healthInsurance: "Prêmio Plano de Saúde (R$)",
      retirement401k: "Contribuição Aposentadoria 401(k) (R$)",
      otherDeductions: "Outras Deduções (R$)",
      calculate: "🔄 Recalcular",
      results: "Quebra de Contracheque",
      netTakeHome: "Salário Líquido",
      federalTax: "Imposto Federal de Renda",
      stateTax: "Imposto Estadual de Renda",
      ficaTax: "Impostos FICA (Previdência Social + Medicare)",
      totalDeductions: "Total Deduções",
      takeHomePercentage: "Percentual Líquido",
      annualizedIncome: "Renda Bruta Anualizada",
      payFrequencyOptions: {
        weekly: "Semanal",
        biweekly: "Quinzenal (cada 2 semanas)",
        semimonthly: "Semimensal (duas vezes ao mês)",
        monthly: "Mensal",
      reset: "Redefinir"
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
      currency: "R$",
      percentage: "%"
,
      noteDisclaimer: "Nota: Esta calculadora fornece estimativas baseadas nas tabelas de retenção federal de 2024 e dedução padrão. Impostos estaduais, impostos locais, deduções adicionais e outros fatores de folha de pagamento não estão incluídos. O pagamento líquido real pode variar."
    },
    fr: {
      title: "Calculateur de Salaire Net",
      subtitle: "Calculez votre paie nette après tous les impôts et déductions",
      grossPay: "Valeur Brute de Paie (€)",
      payFrequency: "Fréquence de Paiement",
      filingStatus: "Statut Matrimonial Fédéral",
      dependents: "Nombre de Personnes à Charge",
      state: "État",
      healthInsurance: "Prime Assurance Santé (€)",
      retirement401k: "Contribution Retraite 401(k) (€)",
      otherDeductions: "Autres Déductions (€)",
      calculate: "🔄 Recalculer",
      results: "Ventilation de Paie",
      netTakeHome: "Salaire Net",
      federalTax: "Impôt Fédéral sur le Revenu",
      stateTax: "Impôt État sur le Revenu",
      ficaTax: "Impôts FICA (Sécurité Sociale + Medicare)",
      totalDeductions: "Total Déductions",
      takeHomePercentage: "Pourcentage Net",
      annualizedIncome: "Revenu Brut Annualisé",
      payFrequencyOptions: {
        weekly: "Hebdomadaire",
        biweekly: "Bihebdomadaire (toutes les 2 semaines)",
        semimonthly: "Semi-mensuelle (deux fois par mois)",
        monthly: "Mensuelle",
      reset: "Réinitialiser"
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
      currency: "€",
      percentage: "%"
,
      noteDisclaimer: "Remarque: Cette calculatrice fournit des estimations basées sur les tables de retenue fédérales de 2024 et la déduction standard. Les impôts d'État, les impôts locaux, les déductions supplémentaires et d'autres facteurs de paie ne sont pas inclus. Le salaire net réel peut varier."
    },
    de: {
      title: "Nettogehaltsrechner",
      subtitle: "Berechnen Sie Ihren Nettoverdienst nach allen Steuern und Abzügen",
      grossPay: "Bruttoverdienstbetrag ($)",
      payFrequency: "Zahlungshäufigkeit",
      filingStatus: "Bundesanmeldestatus",
      dependents: "Anzahl der Unterhaltsberechtigten",
      state: "Bundesstaat",
      healthInsurance: "Krankenversicherungsprämie ($)",
      retirement401k: "401(k) Rentenbeitrag ($)",
      otherDeductions: "Sonstige Abzüge ($)",
      calculate: "Nettogehalt Berechnen",
      results: "Gehaltsaufschlüsselung",
      netTakeHome: "Netto-Auszahlung",
      federalTax: "Bundeseinkommensteuer",
      stateTax: "Staatseinkommensteuer",
      ficaTax: "FICA-Steuern (Sozialversicherung + Medicare)",
      totalDeductions: "Gesamtabzüge",
      takeHomePercentage: "Nettoprozentsatz",
      annualizedIncome: "Annualisiertes Bruttoeinkommen",
      payFrequencyOptions: {
        weekly: "Wöchentlich",
        biweekly: "Zweiwöchentlich (alle 2 Wochen)",
        semimonthly: "Halbmonatlich (zweimal im Monat)",
        monthly: "Monatlich",
      reset: "Zurücksetzen"
      },
      filingStatusOptions: {
        single: "Ledig",
        married_filing_jointly: "Verheiratet, gemeinsame Veranlagung",
        married_filing_separately: "Verheiratet, getrennte Veranlagung",
        head_of_household: "Haushaltsvorstand"
      },
      stateOptions: {
        CA: "Kalifornien",
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
      currency: "$",
      percentage: "%",
      noteDisclaimer: "Hinweis: Dieser Rechner liefert Schätzungen basierend auf den Bundeseinbehaltungstabellen von 2024 und dem Standardabzug. Staatssteuern, lokale Steuern, zusätzliche Abzüge und andere Lohnfaktoren sind nicht enthalten. Der tatsächliche Nettoverdienst kann variieren."
    },
    nl: {
      title: "Nettosalaris Rekenmachine",
      subtitle: "Bereken uw netto loon na alle belastingen en aftrekposten",
      grossPay: "Bruto Loonbedrag ($)",
      payFrequency: "Betalingsfrequentie",
      filingStatus: "Federale Aangifte Status",
      dependents: "Aantal Afhankelijken",
      state: "Staat",
      healthInsurance: "Ziektekostenverzekeringspremie ($)",
      retirement401k: "401(k) Pensioenbijdrage ($)",
      otherDeductions: "Andere Aftrekposten ($)",
      calculate: "Nettosalaris Berekenen",
      results: "Loonuitsplitsing",
      netTakeHome: "Netto Uitbetaling",
      federalTax: "Federale Inkomstenbelasting",
      stateTax: "Staatsinkomstenbelasting",
      ficaTax: "FICA-belastingen (Social Security + Medicare)",
      totalDeductions: "Totale Aftrekposten",
      takeHomePercentage: "Netto Percentage",
      annualizedIncome: "Geannualiseerd Bruto-inkomen",
      payFrequencyOptions: {
        weekly: "Wekelijks",
        biweekly: "Tweewekelijks (elke 2 weken)",
        semimonthly: "Halfmaandelijks (twee keer per maand)",
        monthly: "Maandelijks",
      reset: "Resetten"
      },
      filingStatusOptions: {
        single: "Alleenstaand",
        married_filing_jointly: "Getrouwd, Gezamenlijke Aangifte",
        married_filing_separately: "Getrouwd, Afzonderlijke Aangifte",
        head_of_household: "Hoofd van Huishouden"
      },
      stateOptions: {
        CA: "Californië",
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
      currency: "$",
      percentage: "%",
      noteDisclaimer: "Opmerking: Deze rekenmachine biedt schattingen op basis van de federale inhoudingstabellen van 2024 en standaardaftrek. Staatsbelastingen, lokale belastingen, aanvullende aftrekposten en andere loonlijstfactoren zijn niet inbegrepen. Het werkelijke nettoloon kan variëren."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateFederalWithholding = (grossPay: number, payFrequency: string, filingStatus: string, dependents: number): number => {
    // Annualize the gross pay
    const periodsPerYear = PAY_PERIODS[payFrequency as keyof typeof PAY_PERIODS];
    const annualizedIncome = grossPay * periodsPerYear;

    // Calculate taxable income for this pay period
    const standardDeduction = STANDARD_DEDUCTION_PER_PAY_PERIOD[payFrequency as keyof typeof STANDARD_DEDUCTION_PER_PAY_PERIOD];
    const dependentDeduction = dependents * DEPENDENT_EXEMPTION_PER_PAY_PERIOD[payFrequency as keyof typeof DEPENDENT_EXEMPTION_PER_PAY_PERIOD];
    const taxableIncome = Math.max(0, grossPay - standardDeduction - dependentDeduction);

    // Annualize the taxable income for withholding calculation
    const annualizedTaxableIncome = taxableIncome * periodsPerYear;

    // Find the appropriate tax bracket
    const brackets = FEDERAL_WITHHOLDING_RATES[filingStatus as keyof typeof FEDERAL_WITHHOLDING_RATES] || FEDERAL_WITHHOLDING_RATES.single;

    let tax = 0;
    let previousBracket = 0;

    for (const bracket of brackets) {
      if (annualizedTaxableIncome > bracket.bracket) {
        const bracketIncome = bracket.bracket - previousBracket;
        tax += bracketIncome * bracket.rate;
        previousBracket = bracket.bracket;
      } else {
        const bracketIncome = annualizedTaxableIncome - previousBracket;
        tax += bracketIncome * bracket.rate;
        break;
      }
    }

    // Add the constant from the bracket
    for (const bracket of brackets) {
      if (annualizedTaxableIncome > bracket.bracket) {
        tax += bracket.constant;
        break;
      }
    }

    // Convert back to per-pay-period amount
    return tax / periodsPerYear;
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

  const calculateStateTax = (grossPay: number, payFrequency: string, state: string): number => {
    // Annualize gross pay
    const periodsPerYear = PAY_PERIODS[payFrequency as keyof typeof PAY_PERIODS];
    const annualizedIncome = grossPay * periodsPerYear;

    // Get state tax rate (simplified flat rate)
    const STATE_TAX_RATES: { [key: string]: number } = {
      CA: 0.133, TX: 0, FL: 0, NY: 0.065, PA: 0.0307, IL: 0.0495, OH: 0.0399,
      GA: 0.0575, NC: 0.0525, MI: 0.0425, NJ: 0.0553, VA: 0.0575, WA: 0,
      AZ: 0.0259, MA: 0.05, TN: 0, IN: 0.0323, MO: 0.049, MD: 0.0475,
      WI: 0.053, CO: 0.0455, MN: 0.0535, SC: 0.07, AL: 0.05, LA: 0.0425,
      KY: 0.045, OR: 0.099, OK: 0.0475, CT: 0.055, UT: 0.0486, IA: 0.048,
      NV: 0, AR: 0.055, MS: 0.05, KS: 0.045, NM: 0.047, NE: 0.055,
      WV: 0.06, ID: 0.058, HI: 0.0825, NH: 0, ME: 0.0715, RI: 0.0599,
      MT: 0.069, DE: 0.066, SD: 0, AK: 0, ND: 0.029, VT: 0.066,
      WY: 0, DC: 0.085
    };

    const rate = STATE_TAX_RATES[state] || 0;

    // Apply progressive tax calculation (simplified)
    let stateTax = 0;
    if (rate > 0) {
      // For simplicity, apply flat rate to annualized income then divide by pay periods
      stateTax = (annualizedIncome * rate) / periodsPerYear;
    }

    return stateTax;
  };

  const calculateFicaTax = (grossPay: number, payFrequency: string): number => {
    const periodsPerYear = PAY_PERIODS[payFrequency as keyof typeof PAY_PERIODS];
    const annualizedIncome = grossPay * periodsPerYear;

    const socialSecurityTax = Math.min(annualizedIncome, FICA_RATES.socialSecurityLimit) * FICA_RATES.socialSecurity;
    const medicareTax = annualizedIncome * FICA_RATES.medicare;

    return (socialSecurityTax + medicareTax) / periodsPerYear;
  };

  const results = useMemo((): PaycheckResults => {
    // Pre-tax deductions
    const preTaxDeductions = formData.healthInsurance + formData.retirement401k;

    // Calculate taxes on (gross pay - pre-tax deductions)
    const taxableGross = formData.grossPay - preTaxDeductions;

    const federalTax = calculateFederalWithholding(taxableGross, formData.payFrequency, formData.filingStatus, formData.dependents);
    const stateTax = calculateStateTax(taxableGross, formData.payFrequency, formData.state);
    const ficaTax = calculateFicaTax(formData.grossPay, formData.payFrequency);

    // Total deductions = pre-tax deductions + taxes + other deductions
    const totalDeductions = preTaxDeductions + federalTax + stateTax + ficaTax + formData.otherDeductions;

    const netTakeHome = formData.grossPay - totalDeductions;
    const takeHomePercentage = (netTakeHome / formData.grossPay) * 100;

    // Annualized income
    const periodsPerYear = PAY_PERIODS[formData.payFrequency as keyof typeof PAY_PERIODS];
    const annualizedIncome = formData.grossPay * periodsPerYear;

    return {
      netTakeHome,
      federalTax,
      stateTax,
      ficaTax,
      totalDeductions,
      takeHomePercentage,
      annualizedIncome
    };
  }, [formData]);

  const handleInputChange = (field: keyof PaycheckData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : lang === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: lang === 'pt' ? 'BRL' : lang === 'fr' ? 'EUR' : 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (rate: number): string => {
    return `${rate.toFixed(1)}%`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
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
            {/* Gross Pay */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.grossPay}
              </label>
              <input
                type="number"
                value={formData.grossPay}
                onChange={(e) => handleInputChange('grossPay', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                min="0"
                max="100000"
                step="10"
              />
            </div>

            {/* Pay Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.payFrequency}
              </label>
              <select
                value={formData.payFrequency}
                onChange={(e) => handleInputChange('payFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.payFrequencyOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
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

            {/* Health Insurance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.healthInsurance}
              </label>
              <input
                type="number"
                value={formData.healthInsurance}
                onChange={(e) => handleInputChange('healthInsurance', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                min="0"
                max="1000"
                step="5"
              />
            </div>

            {/* Retirement 401k */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.retirement401k}
              </label>
              <input
                type="number"
                value={formData.retirement401k}
                onChange={(e) => handleInputChange('retirement401k', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                min="0"
                max="50000"
                step="10"
              />
            </div>

            {/* Other Deductions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.otherDeductions}
              </label>
              <input
                type="number"
                value={formData.otherDeductions}
                onChange={(e) => handleInputChange('otherDeductions', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                min="0"
                max="10000"
                step="5"
              />
            
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateFederalWithholding}
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

</div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.results}
          </h2>

          <div className="space-y-4">
            {/* Net Take-Home Pay */}
            <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.netTakeHome}
              </span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(results.netTakeHome)}
              </span>
            </div>

            {/* Take-Home Percentage */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">{t.takeHomePercentage}</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {formatPercentage(results.takeHomePercentage)}
              </span>
            </div>

            {/* Tax Breakdown */}
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
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
                <span className="text-gray-600 dark:text-gray-400">{t.totalDeductions}</span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  -{formatCurrency(results.totalDeductions)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.annualizedIncome}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(results.annualizedIncome)}
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
