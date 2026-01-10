'use client';

import { useState, useEffect } from 'react';


interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: number;
  min?: number;
  max?: number;
  step?: number;
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

interface MortgageCalculatorProps {
  lang?: string;
}

export default function MortgageCalculator({ lang = 'en' }: MortgageCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      loanDetails: "Loan Details",
      monthlyPayment: "Monthly Payment",
      paymentBreakdown: "Payment Breakdown",
      totalMonthly: "Total Monthly",
      amortizationSchedule: "Amortization Schedule",
      year: "Year",
      payments: "Payments",
      principalPaid: "Principal Paid",
      interestPaid: "Interest Paid",
      endingBalance: "Ending Balance",
      payment: "Payment",
      date: "Date",
      principal: "Principal",
      interest: "Interest",
       balance: "Balance",
       paymentnumberdatepaymentprincipalinterestbalancen: "Payment Number,Date,Payment,Principal,Interest,Balance\n",
      hideamortizationschedule: "Hide Amortization Schedule",
      showamortizationschedule: "Show Amortization Schedule",
      yearbyyear: "Year-by-Year",
      monthbymonth: "Month-by-Month",
      exportcsv: "Export CSV",
  },
    es: {
      loanDetails: "Detalles del Préstamo",
      monthlyPayment: "Pago Mensual",
      paymentBreakdown: "Desglose de Pago",
      totalMonthly: "Total Mensual",
      amortizationSchedule: "Programa de Amortización",
      year: "Año",
      payments: "Pagos",
      principalPaid: "Principal Pagado",
      interestPaid: "Intereses Pagados",
      endingBalance: "Saldo Final",
      payment: "Pago",
      date: "Fecha",
      principal: "Principal",
      interest: "Intereses",
      balance: "Saldo",
      yearbyyear: "Año por Año",
      monthbymonth: "Mes por Mes",
      exportcsv: "Exportar CSV",
      paymentnumberdatepaymentprincipalinterestbalancen: "Número de Pago,Fecha,Pago,Principal,Intereses,Saldo\n",
      hideamortizationschedule: "Ocultar Plan de Amortización",
      showamortizationschedule: "Mostrar Plan de Amortización",
  },
    pt: {
      loanDetails: "Detalhes do Empréstimo",
      monthlyPayment: "Pagamento Mensal",
      paymentBreakdown: "Detalhamento do Pagamento",
      totalMonthly: "Total Mensal",
      amortizationSchedule: "Programa de Amortização",
      year: "Ano",
      payments: "Pagamentos",
      principalPaid: "Principal Pago",
      interestPaid: "Juros Pagos",
      endingBalance: "Saldo Final",
      payment: "Pagamento",
      date: "Data",
      principal: "Principal",
      interest: "Juros",
      balance: "Saldo",
      yearbyyear: "Ano a Ano",
      monthbymonth: "Mês a Mês",
      exportcsv: "Exportar CSV",
      paymentnumberdatepaymentprincipalinterestbalancen: "Número do Pagamento,Data,Pagamento,Principal,Juros,Saldo\n",
      hideamortizationschedule: "Ocultar Plano de Amortização",
      showamortizationschedule: "Mostrar Plano de Amortização",
  },
    fr: {
      loanDetails: "Détails du Prêt",
      monthlyPayment: "Paiement Mensuel",
      paymentBreakdown: "Répartition des Paiements",
      totalMonthly: "Total Mensuel",
      amortizationSchedule: "Programme d'Amortissement",
      year: "Année",
      payments: "Paiements",
      principalPaid: "Principal Payé",
      interestPaid: "Intérêts Payés",
      endingBalance: "Solde Final",
      payment: "Paiement",
      date: "Date",
      principal: "Principal",
      interest: "Intérêts",
      balance: "Solde",
      yearbyyear: "Année par Année",
      monthbymonth: "Mois par Mois",
      exportcsv: "Exporter CSV",
      paymentnumberdatepaymentprincipalinterestbalancen: "Numéro de Paiement,Date,Paiement,Principal,Intérêts,Solde\n",
      hideamortizationschedule: "Masquer le Plan d'Amortissement",
      showamortizationschedule: "Afficher le Plan d'Amortissement",
  }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Define calculator configuration internally
  const inputs: CalculatorInput[] = [
    { name: 'loanAmount', label: 'Loan Amount ($)', type: 'number', default: 300000, min: 0, step: 1000 },
    { name: 'interestRate', label: 'Interest Rate (%)', type: 'number', default: 6.5, min: 0, max: 30, step: 0.1 },
    { name: 'loanTerm', label: 'Loan Term (years)', type: 'number', default: 30, min: 1, max: 50, step: 1 },
    { name: 'propertyTax', label: 'Annual Property Tax ($)', type: 'number', default: 0, min: 0, step: 100 },
    { name: 'homeInsurance', label: 'Annual Home Insurance ($)', type: 'number', default: 0, min: 0, step: 50 },
  ];

  const output: CalculatorOutput = {
    label: t.monthlyPayment,
    default: 'Enter loan details above',
    format: 'currency'
  };

  const additionalOutputs: AdditionalOutput[] = [
    { field: 'totalInterest', label: 'Total Interest Paid', format: 'currency' },
    { field: 'totalAmount', label: 'Total Amount Paid', format: 'currency' },
    { field: 'principalInterest', label: 'Principal & Interest', format: 'currency' },
    { field: 'taxesInsurance', label: 'Taxes & Insurance', format: 'currency' },
  ];

  // Initialize values directly with defaults
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, number>>({});
  const [showAmortization, setShowAmortization] = useState(false);
  const [amortizationView, setAmortizationView] = useState<'yearly' | 'monthly'>('yearly');
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);
  const [yearlySummary, setYearlySummary] = useState<any[]>([]);

  // Auto-calculate mortgage payments when inputs change
  useEffect(() => {
    const calculateMortgage = () => {
      const loanAmount = values.loanAmount || 300000;
      const loanTerm = values.loanTerm || 30;
      const interestRate = values.interestRate || 6.5;
      const propertyTax = values.propertyTax || 0;
      const homeInsurance = values.homeInsurance || 0;

      // Convert annual interest rate to monthly
      const monthlyRate = interestRate / 100 / 12;

      // Total number of payments
      const totalPayments = loanTerm * 12;

      let monthlyPrincipalInterest = 0;

      if (monthlyRate > 0) {
        // Standard mortgage formula
        monthlyPrincipalInterest = loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
          (Math.pow(1 + monthlyRate, totalPayments) - 1);
      } else {
        // If interest rate is 0, just divide by number of months
        monthlyPrincipalInterest = loanAmount / totalPayments;
      }

      // Monthly taxes and insurance (annual amounts divided by 12)
      const monthlyTaxesInsurance = (propertyTax + homeInsurance) / 12;

      // Total monthly payment
      const totalMonthly = monthlyPrincipalInterest + monthlyTaxesInsurance;

      // Calculate total interest paid
      const totalPaid = totalMonthly * totalPayments;
      const totalInterest = totalPaid - loanAmount;

      setResults({
        monthlyPayment: totalMonthly,
        principalInterest: monthlyPrincipalInterest,
        taxesInsurance: monthlyTaxesInsurance,
        totalInterest: totalInterest,
        totalAmount: totalPaid
      });

      // Generate amortization schedule if loan amount > 0
      if (loanAmount > 0 && monthlyPrincipalInterest > 0) {
        generateAmortizationSchedule(loanAmount, monthlyRate, totalPayments, monthlyPrincipalInterest);
      } else {
        setAmortizationSchedule([]);
        setYearlySummary([]);
      }
    };

    calculateMortgage();
  }, [values]);

  const generateAmortizationSchedule = (loanAmount: number, monthlyRate: number, totalPayments: number, monthlyPI: number) => {
    const schedule = [];
    const yearlyData: Record<number, any> = {};

    let balance = loanAmount;
    let totalInterestPaid = 0;

    for (let paymentNumber = 1; paymentNumber <= totalPayments; paymentNumber++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      balance -= principalPayment;

      // Ensure balance doesn't go negative due to rounding
      if (balance < 0.01) balance = 0;

      totalInterestPaid += interestPayment;

      // Calculate payment date (assuming first payment is next month)
      const paymentDate = new Date();
      paymentDate.setMonth(paymentDate.getMonth() + paymentNumber);

      schedule.push({
        paymentNumber,
        paymentDate,
        payment: monthlyPI,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance,
        totalInterestPaid
      });

      // Group by year for yearly summary
      const year = paymentDate.getFullYear();
      if (!yearlyData[year]) {
        yearlyData[year] = {
          year,
          payments: 0,
          principalPaid: 0,
          interestPaid: 0,
          endingBalance: balance
        };
      }
      yearlyData[year].payments += monthlyPI;
      yearlyData[year].principalPaid += principalPayment;
      yearlyData[year].interestPaid += interestPayment;
    }

    setAmortizationSchedule(schedule);
    setYearlySummary(Object.values(yearlyData));
  };

  const handleInputChange = (name: string, value: string) => {
    const numValue = parseFloat(value) || 0;
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

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const exportAmortizationToCSV = () => {
    let csvContent = '';

    if (amortizationView === 'yearly') {
      csvContent = 'Year,Payments,Principal Paid,Interest Paid,Ending Balance\n';
      yearlySummary.forEach(row => {
        csvContent += `${row.year},${row.payments.toFixed(2)},${row.principalPaid.toFixed(2)},${row.interestPaid.toFixed(2)},${row.endingBalance.toFixed(2)}\n`;
      });
    } else {
      csvContent = 'Payment Number,Date,Payment,Principal,Interest,Balance\n';
      amortizationSchedule.forEach(row => {
        csvContent += `${row.paymentNumber},${row.paymentDate.toISOString().split('T')[0]},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `mortgage-amortization-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Inputs */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-900 mb-2">{t.loanDetails}</h3>
          {inputs.map((input) => (
            <div key={input.name}>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {input.label}
              </label>
              <input
                type="number"
                value={values[input.name] || input.default}
                onChange={(e) => handleInputChange(input.name, e.target.value)}
                min={input.min}
                max={input.max}
                step={input.step}
                className="w-full px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          ))}

          {/* Auto-calculation note */}
          <div className="pt-2 text-xs text-blue-600 text-center font-medium">
            📊 Calculations update automatically as you change values
          </div>

          {/* Recalculate Button */}
          <div className="pt-3">
            <button
              onClick={() => {
                // Force recalculation
                setResults((prev: any) => ({ ...prev }));
              }}
              className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
            >
              🔄 Recalculate
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-900 mb-2">{t.monthlyPayment}</h3>

          {/* Main Result - Compact but Prominent */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded border border-blue-200">
            <div className="text-sm text-blue-700 font-medium mb-2">{output.label}</div>
            <div className="text-4xl font-bold text-blue-800">
              {results.monthlyPayment ? formatCurrency(results.monthlyPayment) : output.default}
            </div>
          </div>

          {/* Key Metrics Grid - Ultra Compact */}
          <div className="grid grid-cols-2 gap-3">
            {additionalOutputs && additionalOutputs.slice(0, 4).map((additionalOutput) => (
              <div key={additionalOutput.field} className="bg-white p-4 rounded border border-gray-200">
                <div className="text-sm text-gray-500 font-medium leading-tight mb-1">{additionalOutput.label}</div>
                <div className="text-xl font-bold text-gray-900">
                  {results[additionalOutput.field]
                    ? (additionalOutput.format === 'currency'
                        ? formatCurrency(results[additionalOutput.field])
                        : formatNumber(results[additionalOutput.field]))
                    : '—'
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Payment Breakdown - Minimal */}
          {results.monthlyPayment ? (
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2 text-xs">{t.paymentBreakdown}</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">{additionalOutputs?.find(o => o.field === 'principalInterest')?.label || 'Principal & Interest'}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(results.principalInterest || 0)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">{additionalOutputs?.find(o => o.field === 'taxesInsurance')?.label || 'Taxes & Insurance'}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(results.taxesInsurance || 0)}</span>
                </div>
                <hr className="border-gray-300 my-1.5" />
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-gray-900">{t.totalMonthly}</span>
                  <span className="font-bold text-blue-700">{formatCurrency(results.monthlyPayment)}</span>
                </div>
              </div>
            </div>
          ) : null}

        </div>
      </div>

      {/* Amortization Schedule Section - Moved to bottom for better space utilization */}
        {results.monthlyPayment && amortizationSchedule.length > 0 && (
          <div className="mt-8">
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {showAmortization ? t.hideamortizationschedule : t.showamortizationschedule}
              </button>

              {showAmortization && (
                <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{t.amortizationSchedule}</h3>
                    <div className="flex gap-2">
                      <select
                        value={amortizationView}
                        onChange={(e) => setAmortizationView(e.target.value as 'yearly' | 'monthly')}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="yearly">{t.yearbyyear}</option>
                        <option value="monthly">{t.monthbymonth}</option>
                      </select>
                      <button
                        onClick={exportAmortizationToCSV}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        {t.exportcsv}
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto max-h-96">
                    {amortizationView === 'yearly' ? (
                      <table className="w-full">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t.year}</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.payments}</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.principalPaid}</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.interestPaid}</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.endingBalance}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {yearlySummary.map((row: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-2 text-sm text-gray-900">{row.year}</td>
                              <td className="px-4 py-2 text-sm text-gray-900 text-right">${row.payments.toFixed(2)}</td>
                              <td className="px-4 py-2 text-sm text-green-600 text-right">${row.principalPaid.toFixed(2)}</td>
                              <td className="px-4 py-2 text-sm text-red-600 text-right">${row.interestPaid.toFixed(2)}</td>
                              <td className="px-4 py-2 text-sm text-gray-900 text-right">${row.endingBalance.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <table className="w-full">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t.payment}</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t.date}</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.principal}</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.interest}</th>
                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.balance}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {amortizationSchedule.map((payment: any, index: number) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-2 text-sm text-gray-900">{payment.paymentNumber}</td>
                              <td className="px-4 py-2 text-sm text-gray-900">{payment.paymentDate.toLocaleDateString()}</td>
                              <td className="px-4 py-2 text-sm text-green-600 text-right">${payment.principal.toFixed(2)}</td>
                              <td className="px-4 py-2 text-sm text-red-600 text-right">${payment.interest.toFixed(2)}</td>
                              <td className="px-4 py-2 text-sm text-gray-900 text-right">${payment.balance.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
}
