'use client';

import React, { useState } from 'react';

interface BiweeklyPayCalculatorProps {
  lang?: string;
}

export default function BiweeklyPayCalculator({ lang = 'en' }: BiweeklyPayCalculatorProps) {
  const translations = {
    en: {
      title: "Biweekly Pay Calculator",
      salaryType: "Salary Type",
      annual: "Annual Salary",
      hourly: "Hourly Rate",
      annualSalary: "Annual Salary ($)",
      hourlyRate: "Hourly Rate ($)",
      hoursPerWeek: "Hours Per Week",
      taxRate: "Tax Rate (%)",
      preDeductions: "Pre-tax Deductions ($)",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      results: "Results",
      grossBiweekly: "Gross Biweekly Pay",
      netBiweekly: "Net Biweekly Pay",
      grossAnnual: "Gross Annual Income",
      netAnnual: "Net Annual Income",
      taxAmount: "Taxes & Deductions",
      payPeriods: "Pay Periods Per Year",
      tip: "Tip",
      tipText: "Biweekly pay means you receive 26 paychecks per year (every 2 weeks). Two months each year will have 3 paychecks instead of 2.",
      format: "Enter amounts without $ or commas",
      calculateYourPay: "Calculate Your Pay",
      enterSalaryInfo: "Enter your salary information to see biweekly and annual calculations"
    },
    es: {
      title: "Calculadora de Pago Quincenal",
      salaryType: "Tipo de Salario",
      annual: "Salario Anual",
      hourly: "Tarifa por Hora",
      annualSalary: "Salario Anual ($)",
      hourlyRate: "Tarifa por Hora ($)",
      hoursPerWeek: "Horas por Semana",
      taxRate: "Tasa de Impuesto (%)",
      preDeductions: "Deducciones Previas a Impuestos ($)",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      results: "Resultados",
      grossBiweekly: "Pago Quincenal Bruto",
      netBiweekly: "Pago Quincenal Neto",
      grossAnnual: "Ingreso Anual Bruto",
      netAnnual: "Ingreso Anual Neto",
      taxAmount: "Impuestos y Deducciones",
      payPeriods: "Períodos de Pago por Año",
      tip: "Consejo",
      tipText: "El pago quincenal significa que recibe 26 cheques de pago por año. Dos meses cada año tendrán 3 cheques en lugar de 2.",
      format: "Ingrese montos sin $ ni comas",
      calculateYourPay: "Calcula Tu Pago",
      enterSalaryInfo: "Ingresa tu información de salario para ver cálculos quincenales y anuales"
    },
    pt: {
      title: "Calculadora de Pagamento Quinzenal",
      salaryType: "Tipo de Salário",
      annual: "Salário Anual",
      hourly: "Taxa Horária",
      annualSalary: "Salário Anual ($)",
      hourlyRate: "Taxa Horária ($)",
      hoursPerWeek: "Horas por Semana",
      taxRate: "Taxa de Imposto (%)",
      preDeductions: "Deduções Pré-Imposto ($)",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      results: "Resultados",
      grossBiweekly: "Pagamento Quinzenal Bruto",
      netBiweekly: "Pagamento Quinzenal Líquido",
      grossAnnual: "Renda Anual Bruta",
      netAnnual: "Renda Anual Líquida",
      taxAmount: "Impostos e Deduções",
      payPeriods: "Períodos de Pagamento por Ano",
      tip: "Dica",
      tipText: "Pagamento quinzenal significa que você recebe 26 contracheques por ano. Dois meses a cada ano terão 3 contracheques em vez de 2.",
      format: "Digite valores sem $ ou vírgulas",
      calculateYourPay: "Calcule Seu Pagamento",
      enterSalaryInfo: "Digite suas informações de salário para ver cálculos quincenais e anuais"
    },
    fr: {
      title: "Calculateur de Paiement Bihebdomadaire",
      salaryType: "Type de Salaire",
      annual: "Salaire Annuel",
      hourly: "Taux Horaire",
      annualSalary: "Salaire Annuel ($)",
      hourlyRate: "Taux Horaire ($)",
      hoursPerWeek: "Heures par Semaine",
      taxRate: "Taux d'Imposition (%)",
      preDeductions: "Déductions Avant Impôts ($)",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      results: "Résultats",
      grossBiweekly: "Salaire Brut Bihebdomadaire",
      netBiweekly: "Salaire Net Bihebdomadaire",
      grossAnnual: "Revenu Annuel Brut",
      netAnnual: "Revenu Annuel Net",
      taxAmount: "Impôts et Déductions",
      payPeriods: "Périodes de Paie par An",
      tip: "Astuce",
      tipText: "Le paiement bihebdomadaire signifie que vous recevez 26 chèques de paie par an. Deux mois par an auront 3 chèques au lieu de 2.",
      format: "Entrez les montants sans $ ou virgules",
      calculateYourPay: "Calculez Votre Paiement",
      enterSalaryInfo: "Entrez vos informations de salaire pour ver les calculs quincenaux et anuels"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;
  const PAY_PERIODS_PER_YEAR = 26;

  const [salaryType, setSalaryType] = useState<'annual' | 'hourly'>('annual');
  const [annualSalary, setAnnualSalary] = useState<number>(52000);
  const [hourlyRate, setHourlyRate] = useState<number>(25);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [taxRate, setTaxRate] = useState<number>(25);
  const [preDeductions, setPreDeductions] = useState<number>(0);
  const [results, setResults] = useState<{
    grossBiweekly: number;
    grossAnnual: number;
    taxAmount: number;
    netBiweekly: number;
    netAnnual: number;
  } | null>(null);

  const calculatePay = () => {
    let grossAnnual = 0;

    if (salaryType === 'annual') {
      grossAnnual = annualSalary;
    } else {
      // Hourly: hourly rate × hours per week × 52 weeks per year
      grossAnnual = hourlyRate * hoursPerWeek * 52;
    }

    const grossBiweekly = grossAnnual / PAY_PERIODS_PER_YEAR;
    const totalDeductions = (grossAnnual * (taxRate / 100)) + preDeductions;
    const netAnnual = grossAnnual - totalDeductions;
    const netBiweekly = netAnnual / PAY_PERIODS_PER_YEAR;

    setResults({
      grossBiweekly: Math.round(grossBiweekly * 100) / 100,
      grossAnnual: Math.round(grossAnnual * 100) / 100,
      taxAmount: Math.round(totalDeductions * 100) / 100,
      netBiweekly: Math.round(netBiweekly * 100) / 100,
      netAnnual: Math.round(netAnnual * 100) / 100
    });
  };

  const resetCalculator = () => {
    setSalaryType('annual');
    setAnnualSalary(52000);
    setHourlyRate(25);
    setHoursPerWeek(40);
    setTaxRate(25);
    setPreDeductions(0);
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>{t.tip}:</strong> {t.tipText}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          {/* Salary Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t.salaryType}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={salaryType === 'annual'}
                  onChange={() => setSalaryType('annual')}
                  className="mr-2"
                />
                <span className="text-gray-700">{t.annual}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={salaryType === 'hourly'}
                  onChange={() => setSalaryType('hourly')}
                  className="mr-2"
                />
                <span className="text-gray-700">{t.hourly}</span>
              </label>
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 gap-4">
            {salaryType === 'annual' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.annualSalary}
                </label>
                <input
                  type="number"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.hourlyRate}
                  </label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.hoursPerWeek}
                  </label>
                  <input
                    type="number"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.taxRate}
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.preDeductions}
              </label>
              <input
                type="number"
                value={preDeductions}
                onChange={(e) => setPreDeductions(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>
          </div>

          <p className="text-xs text-gray-500">{t.format}</p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={calculatePay}
              className="flex-1 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
              {t.calculate}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
            >
              {t.reset}
            </button>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">{t.tip}</h4>
            <p className="text-xs text-blue-700">{t.tipText}</p>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {results ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 mb-1">{t.grossBiweekly}</p>
                  <p className="text-2xl font-bold text-blue-800">
                    ${results.grossBiweekly.toFixed(2)}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 mb-1">{t.netBiweekly}</p>
                  <p className="text-2xl font-bold text-green-800">
                    ${results.netBiweekly.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">{t.grossAnnual}</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${results.grossAnnual.toLocaleString('en-US', {minimumFractionDigits: 2})}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">{t.netAnnual}</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${results.netAnnual.toLocaleString('en-US', {minimumFractionDigits: 2})}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-red-700 mb-1">{t.taxAmount}</p>
                <p className="text-2xl font-bold text-red-800">
                  ${results.taxAmount.toFixed(2)}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  <strong>{t.payPeriods}:</strong> {PAY_PERIODS_PER_YEAR}
                </p>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.calculateYourPay}</h3>
              <p className="text-gray-500">{t.enterSalaryInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
