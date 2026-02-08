'use client';

import { useState, useEffect } from 'react';

interface PaycheckCalculatorProps {
  lang?: string;
}

export default function PaycheckCalculator({ lang = 'en' }: PaycheckCalculatorProps) {
  const [payType, setPayType] = useState<'salary' | 'hourly'>('salary');
  const [grossAnnual, setGrossAnnual] = useState(50000);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [payFrequency, setPayFrequency] = useState<'weekly' | 'biweekly' | 'semimonthly' | 'monthly'>('biweekly');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'headOfHousehold'>('single');
  const [dependents, setDependents] = useState(0);
  const [additionalDeductions, setAdditionalDeductions] = useState(0);

  const [results, setResults] = useState({
    grossPay: 0,
    federalTax: 0,
    socialSecurity: 0,
    medicare: 0,
    stateTax: 0,
    totalDeductions: 0,
    netPay: 0,
    takeHomePercentage: 0
  });

  const translations = {
    en: {
      title: "Paycheck Calculator",
      description: "Calculate your take-home pay after taxes and deductions",
      payType: "Pay Type",
      salary: "Annual Salary",
      hourly: "Hourly Wage",
      grossAnnual: "Gross Annual Salary ($)",
      hourlyRate: "Hourly Rate ($)",
      hoursPerWeek: "Hours per Week",
      payFrequency: "Pay Frequency",
      weekly: "Weekly",
      biweekly: "Biweekly",
      semimonthly: "Semimonthly",
      monthly: "Monthly",
      filingStatus: "Filing Status",
      single: "Single",
      married: "Married Filing Jointly",
      headOfHousehold: "Head of Household",
      dependents: "Number of Dependents",
      additionalDeductions: "Additional Deductions ($)",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      paycheckBreakdown: "Paycheck Breakdown",
      grossPay: "Gross Pay",
      deductions: "Deductions",
      federalTax: "Federal Income Tax",
      socialSecurity: "Social Security (6.2%)",
      medicare: "Medicare (1.45%)",
      stateTax: "State Tax (approx.)",
      totalDeductions: "Total Deductions",
      netPay: "Net Pay (Take Home)",
      takeHomePercentage: "Take Home Percentage",
      payPeriod: "Pay Period Amount"
    },
    es: {
      title: "Calculadora de Nómina",
      description: "Calcula tu salario neto después de impuestos y deducciones",
      payType: "Tipo de Pago",
      salary: "Salario Anual",
      hourly: "Salario por Hora",
      grossAnnual: "Salario Bruto Anual ($)",
      hourlyRate: "Tarifa por Hora ($)",
      hoursPerWeek: "Horas por Semana",
      payFrequency: "Frecuencia de Pago",
      weekly: "Semanal",
      biweekly: "Quincenal",
      semimonthly: "Semi-Mensual",
      monthly: "Mensual",
      filingStatus: "Estado Civil",
      single: "Soltero",
      married: "Casado Presentando Conjuntamente",
      headOfHousehold: "Cabeza de Familia",
      dependents: "Número de Dependientes",
      additionalDeductions: "Deducciones Adicionales ($)",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      paycheckBreakdown: "Desglose de Nómina",
      grossPay: "Pago Bruto",
      deductions: "Deducciones",
      federalTax: "Impuesto Federal sobre la Renta",
      socialSecurity: "Seguridad Social (6.2%)",
      medicare: "Medicare (1.45%)",
      stateTax: "Impuesto Estatal (aprox.)",
      totalDeductions: "Deducciones Totales",
      netPay: "Pago Neto",
      takeHomePercentage: "Porcentaje de Pago Neto",
      payPeriod: "Monto del Período de Pago"
    },
    pt: {
      title: "Calculadora de Contra-Cheque",
      description: "Calcule seu salário líquido após impostos e deduções",
      payType: "Tipo de Pagamento",
      salary: "Salário Anual",
      hourly: "Salário por Hora",
      grossAnnual: "Salário Bruto Anual ($)",
      hourlyRate: "Taxa por Hora ($)",
      hoursPerWeek: "Horas por Semana",
      payFrequency: "Frequência de Pagamento",
      weekly: "Semanal",
      biweekly: "Quinzenal",
      semimonthly: "Semi-Mensal",
      monthly: "Mensal",
      filingStatus: "Estado Civil",
      single: "Solteiro",
      married: "Casado Registrando em Conjunto",
      headOfHousehold: "Chefe de Família",
      dependents: "Número de Dependentes",
      additionalDeductions: "Deduções Adicionais ($)",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      paycheckBreakdown: "Detalhamento do Contra-Cheque",
      grossPay: "Pagamento Bruto",
      deductions: "Dedução",
      federalTax: "Imposto Federal de Renda",
      socialSecurity: "Seguridade Social (6.2%)",
      medicare: "Medicare (1.45%)",
      stateTax: "Imposto Estadual (aprox.)",
      totalDeductions: "Dedução Total",
      netPay: "Pagamento Líquido",
      takeHomePercentage: "Porcentagem Líquida",
      payPeriod: "Valor do Período de Pagamento"
    },
    fr: {
      title: "Calculateur de Paie",
      description: "Calculez votre salaire net après impôts et déductions",
      payType: "Type de Paiement",
      salary: "Salaire Annuel",
      hourly: "Salaire Horaire",
      grossAnnual: "Salaire Brut Annuel ($)",
      hourlyRate: "Taux Horaire ($)",
      hoursPerWeek: "Heures par Semaine",
      payFrequency: "Fréquence de Paiement",
      weekly: "Hebdomadaire",
      biweekly: "Bihebdomadaire",
      semimonthly: "Semi-Mensuel",
      monthly: "Mensuel",
      filingStatus: "Situation Familiale",
      single: "Célibataire",
      married: "Marié(e) Déclarant Ensemble",
      headOfHousehold: "Chef de Famille",
      dependents: "Nombre de Personnes à Charge",
      additionalDeductions: "Déductions Supplémentaires ($)",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      paycheckBreakdown: "Détail de la Paie",
      grossPay: "Salaire Brut",
      deductions: "Déductions",
      federalTax: "Impôt Fédéral sur le Revenu",
      socialSecurity: "Sécurité Sociale (6.2%)",
      medicare: "Medicare (1.45%)",
      stateTax: "Impôt d'État (approx.)",
      totalDeductions: "Déductions Totales",
      netPay: "Salaire Net",
      takeHomePercentage: "Pourcentage Net",
      payPeriod: "Montant de la Période de Paiement"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Calculate gross annual income
  const calculateGrossAnnual = () => {
    if (payType === 'salary') {
      return grossAnnual;
    } else {
      return hourlyRate * hoursPerWeek * 52;
    }
  };

  // Simple tax calculations (approximations)
  const calculateTaxes = (annualGross: number) => {
    const payPeriods = {
      weekly: 52,
      biweekly: 26,
      semimonthly: 24,
      monthly: 12
    };

    const periodsPerYear = payPeriods[payFrequency];
    const grossPayPeriod = annualGross / periodsPerYear;

    // Simplified federal tax brackets (2024 approximation)
    let federalTax = 0;
    if (annualGross <= 11000) {
      federalTax = annualGross * 0.10;
    } else if (annualGross <= 44725) {
      federalTax = 1100 + (annualGross - 11000) * 0.12;
    } else if (annualGross <= 95375) {
      federalTax = 1100 + 4045 + (annualGross - 44725) * 0.22;
    } else {
      federalTax = annualGross * 0.24; // Simplified
    }

    const socialSecurity = Math.min(annualGross * 0.062, 160200 * 0.062);
    const medicare = annualGross * 0.0145;
    const stateTax = annualGross * 0.05; // Approximate 5% state tax

    return {
      grossPayPeriod,
      federalTax: federalTax / periodsPerYear,
      socialSecurity: socialSecurity / periodsPerYear,
      medicare: medicare / periodsPerYear,
      stateTax: stateTax / periodsPerYear
    };
  };

  const calculatePaycheck = () => {
    const annualGross = calculateGrossAnnual();
    const taxes = calculateTaxes(annualGross);
    const additionalDeductionPerPeriod = additionalDeductions;

    const totalDeductions = taxes.federalTax + taxes.socialSecurity + taxes.medicare + taxes.stateTax + additionalDeductionPerPeriod;
    const netPay = taxes.grossPayPeriod - totalDeductions;
    const takeHomePercentage = (netPay / taxes.grossPayPeriod) * 100;

    setResults({
      grossPay: taxes.grossPayPeriod,
      federalTax: taxes.federalTax,
      socialSecurity: taxes.socialSecurity,
      medicare: taxes.medicare,
      stateTax: taxes.stateTax,
      totalDeductions,
      netPay,
      takeHomePercentage
    });
  };

  useEffect(() => {
    calculatePaycheck();
  }, [payType, grossAnnual, hourlyRate, hoursPerWeek, payFrequency, filingStatus, dependents, additionalDeductions]);

  const resetCalculator = () => {
    setPayType('salary');
    setGrossAnnual(50000);
    setHourlyRate(25);
    setHoursPerWeek(40);
    setPayFrequency('biweekly');
    setFilingStatus('single');
    setDependents(0);
    setAdditionalDeductions(0);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.payType}</label>
            <select
              value={payType}
              onChange={(e) => setPayType(e.target.value as 'salary' | 'hourly')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="salary">{t.salary}</option>
              <option value="hourly">{t.hourly}</option>
            </select>
          </div>

          {payType === 'salary' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.grossAnnual}</label>
              <input
                type="number"
                value={grossAnnual}
                onChange={(e) => setGrossAnnual(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="1000"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.hourlyRate}</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.hoursPerWeek}</label>
                  <input
                    type="number"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="168"
                    step="1"
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Annual equivalent: ${(hourlyRate * hoursPerWeek * 52).toLocaleString()}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.payFrequency}</label>
            <select
              value={payFrequency}
              onChange={(e) => setPayFrequency(e.target.value as 'weekly' | 'biweekly' | 'semimonthly' | 'monthly')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="weekly">{t.weekly}</option>
              <option value="biweekly">{t.biweekly}</option>
              <option value="semimonthly">{t.semimonthly}</option>
              <option value="monthly">{t.monthly}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.filingStatus}</label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as 'single' | 'married' | 'headOfHousehold')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="single">{t.single}</option>
                <option value="married">{t.married}</option>
                <option value="headOfHousehold">{t.headOfHousehold}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.dependents}</label>
              <input
                type="number"
                value={dependents}
                onChange={(e) => setDependents(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.additionalDeductions}</label>
            <input
              type="number"
              value={additionalDeductions}
              onChange={(e) => setAdditionalDeductions(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="10"
            />
            <p className="text-xs text-gray-500 mt-1">Per pay period (health insurance, retirement, etc.)</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculatePaycheck}
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
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.paycheckBreakdown}</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="text-sm font-medium text-blue-800">{t.grossPay}</span>
                <span className="text-lg font-bold text-blue-900">${results.grossPay.toFixed(2)}</span>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-red-600">
                  <span>{t.federalTax}</span>
                  <span>-${results.federalTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>{t.socialSecurity}</span>
                  <span>-${results.socialSecurity.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>{t.medicare}</span>
                  <span>-${results.medicare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>{t.stateTax}</span>
                  <span>-${results.stateTax.toFixed(2)}</span>
                </div>
                {additionalDeductions > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Additional Deductions</span>
                    <span>-${additionalDeductions.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center py-2 border-t-2 border-red-300 pt-2">
                <span className="text-sm font-medium text-red-800">{t.totalDeductions}</span>
                <span className="text-lg font-bold text-red-900">-${results.totalDeductions.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center py-3 bg-green-100 rounded px-3 mt-3">
                <span className="text-lg font-bold text-green-800">{t.netPay}</span>
                <span className="text-xl font-bold text-green-900">${results.netPay.toFixed(2)}</span>
              </div>

              <div className="text-center text-sm text-gray-600 mt-2">
                {results.takeHomePercentage.toFixed(1)}% of gross pay
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Tax Information</h4>
            <div className="text-xs text-gray-700 space-y-1">
              <div>• Federal taxes are estimated based on 2024 brackets</div>
              <div>• Social Security: 6.2% (capped at $168,600)</div>
              <div>• Medicare: 1.45% (no cap)</div>
              <div>• State tax: 5% average (varies by state)</div>
              <div>• Consult a tax professional for exact calculations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
