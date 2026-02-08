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

interface AdvancedLoanCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
  lang?: string;
}

export default function AdvancedLoanCalculator({ inputs, output, additionalOutputs, lang = 'en' }: AdvancedLoanCalculatorProps) {
  // Embedded translations following CALCULATOR_CREATION_AGENT.md approach
  const translations = {
    en: {
      loanDetails: "Loan Details",
      monthlyPayment: "Monthly Payment",
      totalInterest: "Total Interest",
      totalPayments: "Total Payments",
      calculate: "🔄 Recalculate",
      result: "Result",
      error: "Error",
      yearlySummary: "Year-by-Year Summary",
      monthlyDetails: "Month-by-Month Details",
      monthlyPaymentBreakdown: "Monthly Payment Breakdown",
      principalInterest: "Principal & Interest:",
      propertyTax: "Property Tax:",
      homeInsurance: "Home Insurance:",
      extraPayment: "Extra Payment:",
      totalMonthly: "Total Monthly:",
      hideAmortizationSchedule: "Hide Amortization Schedule",
      showAmortizationSchedule: "Show Amortization Schedule",
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
      exportCsv: "Export CSV",
      paymentAnalysis: "Payment Analysis",
      amortizationSchedule: "Amortization Schedule",
      csvYearlyHeader: "Year,Payments,Principal Paid,Interest Paid,Ending Balance\n",
      csvMonthlyHeader: "Payment Number,Date,Payment,Principal,Interest,Balance\n",
      reset: "Reset"
    },
    es: {
      loanDetails: "Detalles del Préstamo",
      monthlyPayment: "Pago Mensual",
      totalInterest: "Interés Total",
      totalPayments: "Pagos Totales",
      calculate: "🔄 Recalcular",
      result: "Resultado",
      error: "Error",
      yearlySummary: "Resumen Año por Año",
      monthlyDetails: "Detalles Mes por Mes",
      monthlyPaymentBreakdown: "Desglose del Pago Mensual",
      principalInterest: "Principal e Intereses:",
      propertyTax: "Impuesto a la Propiedad:",
      homeInsurance: "Seguro del Hogar:",
      extraPayment: "Pago Extra:",
      totalMonthly: "Total Mensual:",
      hideAmortizationSchedule: "Ocultar Tabla de Amortización",
      showAmortizationSchedule: "Mostrar Tabla de Amortización",
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
      exportCsv: "Exportar CSV",
      paymentAnalysis: "Análisis de Pagos",
      amortizationSchedule: "Tabla de Amortización",
      csvYearlyHeader: "Año,Pagos,Principal Pagado,Intereses Pagados,Saldo Final\n",
      csvMonthlyHeader: "Número de Pago,Fecha,Pago,Principal,Intereses,Saldo\n",
      reset: "Restablecer"
    },
    pt: {
      loanDetails: "Detalhes do Empréstimo",
      monthlyPayment: "Pagamento Mensal",
      totalInterest: "Juros Totais",
      totalPayments: "Pagamentos Totais",
      calculate: "🔄 Recalcular",
      result: "Resultado",
      error: "Erro",
      yearlySummary: "Resumo Ano a Ano",
      monthlyDetails: "Detalhes Mês a Mês",
      monthlyPaymentBreakdown: "Detalhamento do Pagamento Mensal",
      principalInterest: "Principal e Juros:",
      propertyTax: "Imposto Predial:",
      homeInsurance: "Seguro Residencial:",
      extraPayment: "Pagamento Extra:",
      totalMonthly: "Total Mensal:",
      hideAmortizationSchedule: "Ocultar Tabela de Amortização",
      showAmortizationSchedule: "Mostrar Tabela de Amortização",
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
      exportCsv: "Exportar CSV",
      paymentAnalysis: "Análise de Pagamentos",
      amortizationSchedule: "Tabela de Amortização",
      csvYearlyHeader: "Ano,Pagamentos,Principal Pago,Juros Pagos,Saldo Final\n",
      csvMonthlyHeader: "Número do Pagamento,Data,Pagamento,Principal,Juros,Saldo\n",
      reset: "Redefinir"
    },
    fr: {
      loanDetails: "Détails du Prêt",
      monthlyPayment: "Paiement Mensuel",
      totalInterest: "Intérêt Total",
      totalPayments: "Paiements Totaux",
      calculate: "🔄 Recalculer",
      result: "Résultat",
      error: "Erreur",
      yearlySummary: "Résumé Année par Année",
      monthlyDetails: "Détails Mois par Mois",
      monthlyPaymentBreakdown: "Répartition du Paiement Mensuel",
      principalInterest: "Principal et Intérêts:",
      propertyTax: "Taxe Foncière:",
      homeInsurance: "Assurance Habitation:",
      extraPayment: "Paiement Supplémentaire:",
      totalMonthly: "Total Mensuel:",
      hideAmortizationSchedule: "Masquer le Tableau d'Amortissement",
      showAmortizationSchedule: "Afficher le Tableau d'Amortissement",
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
      exportCsv: "Exporter CSV",
      paymentAnalysis: "Analyse de Paiement",
      amortizationSchedule: "Tableau d'Amortissement",
      csvYearlyHeader: "Année,Paiements,Principal Payé,Intérêts Payés,Solde Final\n",
      csvMonthlyHeader: "Numéro de Paiement,Date,Paiement,Principal,Intérêts,Solde\n",
      reset: "Réinitialiser"
    }
  ,
    de: {
      loanDetails: "Kreditdetails",
      monthlyPayment: "Monatliche Rate",
      totalInterest: "Gesamtzinsen",
      totalPayments: "Gesamtzahlungen",
      calculate: "🔄 Neu berechnen",
      result: "Ergebnis",
      error: "Fehler",
      yearlySummary: "Jährliche Zusammenfassung",
      monthlyDetails: "Monatliche Details",
      monthlyPaymentBreakdown: "Aufschlüsselung der Monatlichen Zahlung",
      principalInterest: "Kapital & Zinsen:",
      propertyTax: "Grundsteuer:",
      homeInsurance: "Gebäudeversicherung:",
      extraPayment: "Zusätzliche Zahlung:",
      totalMonthly: "Gesamt Monatlich:",
      hideAmortizationSchedule: "Tilgungsplan Ausblenden",
      showAmortizationSchedule: "Tilgungsplan Anzeigen",
      year: "Jahr",
      payments: "Zahlungen",
      principalPaid: "Gezahltes Kapital",
      interestPaid: "Gezahlte Zinsen",
      endingBalance: "Endsaldo",
      payment: "Zahlung",
      date: "Datum",
      principal: "Kapital",
      interest: "Zinsen",
      balance: "Saldo",
      exportCsv: "CSV Exportieren",
      paymentAnalysis: "Zahlungsanalyse",
      amortizationSchedule: "Tilgungsplan",
      csvYearlyHeader: "Jahr,Zahlungen,Gezahltes Kapital,Gezahlte Zinsen,Endsaldo\n",
      csvMonthlyHeader: "Zahlungsnummer,Datum,Zahlung,Kapital,Zinsen,Saldo\n",
      reset: "Zurücksetzen"
    },
    nl: {
      loanDetails: "Leningsdetails",
      monthlyPayment: "Maandelijkse Betaling",
      totalInterest: "Totale Rente",
      totalPayments: "Totale Betalingen",
      calculate: "🔄 Herberekenen",
      result: "Resultaat",
      error: "Fout",
      yearlySummary: "Jaarlijks Overzicht",
      monthlyDetails: "Maandelijkse Details",
      monthlyPaymentBreakdown: "Uitsplitsing Maandelijkse Betaling",
      principalInterest: "Hoofdsom & Rente:",
      propertyTax: "Onroerende Voorheffing:",
      homeInsurance: "Woonverzekering:",
      extraPayment: "Extra Betaling:",
      totalMonthly: "Totaal Maandelijks:",
      hideAmortizationSchedule: "Aflossingsschema Verbergen",
      showAmortizationSchedule: "Aflossingsschema Tonen",
      year: "Jaar",
      payments: "Betalingen",
      principalPaid: "Betaalde Hoofdsom",
      interestPaid: "Betaalde Rente",
      endingBalance: "Eindsaldo",
      payment: "Betaling",
      date: "Datum",
      principal: "Hoofdsom",
      interest: "Rente",
      balance: "Saldo",
      exportCsv: "Exporteren als CSV",
      paymentAnalysis: "Betalingsanalyse",
      amortizationSchedule: "Aflossingsschema",
      csvYearlyHeader: "Jaar,Betalingen,Betaalde Hoofdsom,Betaalde Rente,Eindsaldo\n",
      csvMonthlyHeader: "Betalingsnummer,Datum,Betaling,Hoofdsom,Rente,Saldo\n",
      reset: "Resetten"
    }
  };const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, string | number>>({});
  const [showAmortization, setShowAmortization] = useState(false);
  const [amortizationView, setAmortizationView] = useState<'yearly' | 'monthly'>('yearly');
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);
  const [yearlySummary, setYearlySummary] = useState<any[]>([]);

  const calculateAdvancedLoan = () => {
    const loanAmount = values.loanAmount || 0;
    const interestRate = values.interestRate || 0;
    const loanTerm = values.loanTerm || 0;
    const downPayment = values.downPayment || 0;
    const extraPayment = values.extraPayment || 0;
    const propertyTax = values.propertyTax || 0;
    const homeInsurance = values.homeInsurance || 0;

    if (loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
      const principal = loanAmount - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const totalMonths = loanTerm * 12;

      // Calculate principal & interest payment
      const principalInterest = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                              (Math.pow(1 + monthlyRate, totalMonths) - 1);

      // Calculate other monthly costs
      const monthlyPropertyTax = propertyTax / 12;
      const monthlyInsurance = homeInsurance / 12;

      // Total monthly payment (without extra payment)
      const totalMonthlyPayment = principalInterest + monthlyPropertyTax + monthlyInsurance;

      // Calculate payoff with extra payments
      let remainingBalance = principal;
      let totalInterest = 0;
      let monthsWithExtra = 0;
      let monthsWithoutExtra = totalMonths;

      // Calculate normal payoff time
      const monthlyPaymentNormal = principalInterest;
      while (remainingBalance > 0.01 && monthsWithoutExtra < 600) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = Math.min(monthlyPaymentNormal, remainingBalance);
        remainingBalance -= principalPayment;
        totalInterest += interestPayment;
        monthsWithoutExtra++;
      }

      // Reset for extra payment calculation
      remainingBalance = principal;
      totalInterest = 0;
      monthsWithExtra = 0;

      // Calculate payoff with extra payments
      const monthlyPaymentWithExtra = principalInterest + extraPayment;
      while (remainingBalance > 0.01 && monthsWithExtra < 600) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = Math.min(monthlyPaymentWithExtra - interestPayment, remainingBalance);
        remainingBalance -= principalPayment;
        totalInterest += interestPayment;
        monthsWithExtra++;
      }

      const monthsSaved = monthsWithoutExtra - monthsWithExtra;

      setResults({
        totalMonthlyPayment: totalMonthlyPayment.toFixed(2),
        principalInterest: principalInterest.toFixed(2),
        monthsSaved: monthsSaved,
        totalInterest: totalInterest.toFixed(2),
        monthlyPropertyTax: monthlyPropertyTax.toFixed(2),
        monthlyInsurance: monthlyInsurance.toFixed(2),
        totalYearsSaved: (monthsSaved / 12).toFixed(1),
        effectiveMonthlyPayment: (totalMonthlyPayment + extraPayment).toFixed(2)
      });

      // Generate amortization schedule
      generateAmortizationSchedule(principal, monthlyRate, totalMonths, principalInterest, extraPayment);
    } else {
      setResults({});
      setAmortizationSchedule([]);
      setYearlySummary([]);
    }
  };

  const resetCalculator = () => {
    const initial: Record<string, number> = {};
    inputs?.forEach(input => {
      initial[input.name] = input.default || 0;
    });
    setValues(initial);
    setResults({});
  };

  const generateAmortizationSchedule = (loanAmount: number, monthlyRate: number, totalPayments: number, monthlyPI: number, extraPayment: number) => {
      const schedule = [];
      const yearlyData: Record<number, any> = {};

      let balance = loanAmount;
      let totalInterestPaid = 0;
      const effectiveMonthlyPayment = monthlyPI + extraPayment;

      for (let paymentNumber = 1; paymentNumber <= totalPayments; paymentNumber++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = Math.min(effectiveMonthlyPayment - interestPayment, balance);
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
          payment: effectiveMonthlyPayment,
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
        yearlyData[year].payments += effectiveMonthlyPayment;
        yearlyData[year].principalPaid += principalPayment;
        yearlyData[year].interestPaid += interestPayment;

        // Break if loan is paid off early
        if (balance <= 0) break;
      }

      setAmortizationSchedule(schedule);
      setYearlySummary(Object.values(yearlyData));
    };

  useEffect(() => {
    calculateAdvancedLoan();
  }, [values]);

  const handleInputChange = (name: string, value: number) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCurrency = (amount: string | number) => {
    return `$${amount}`;
  };

  const exportAmortizationToCSV = () => {
    let csvContent = '';

    if (amortizationView === 'yearly') {
      csvContent = t.csvYearlyHeader;
      yearlySummary.forEach(row => {
        csvContent += `${row.year},${row.payments.toFixed(2)},${row.principalPaid.toFixed(2)},${row.interestPaid.toFixed(2)},${row.endingBalance.toFixed(2)}\n`;
      });
    } else {
      csvContent = t.csvMonthlyHeader;
      amortizationSchedule.forEach(row => {
        csvContent += `${row.paymentNumber},${row.paymentDate.toISOString().split('T')[0]},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `advanced-loan-amortization-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Inputs */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t.loanDetails}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inputs.slice(0, 4).map((input) => (
              <div key={input.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  value={values[input.name] || ''}
                  onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value) || 0)}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inputs.slice(4).map((input) => (
              <div key={input.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  value={values[input.name] || ''}
                  onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value) || 0)}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateAdvancedLoan}
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



        {/* Results */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t.paymentAnalysis}</h3>

          {/* Main Output */}
          <div className="bg-blue-50 p-2 sm:p-3 rounded-md border-l-3 border-blue-500">
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className="text-lg sm:text-xl font-bold text-blue-600">
              {results.totalMonthlyPayment ? formatCurrency(results.totalMonthlyPayment) : output.default}
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

          {/* Payment Breakdown */}
          {results.totalMonthlyPayment && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
{t.monthlyPaymentBreakdown}
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>{t.principalInterest}</span>
                  <span className="font-medium">{formatCurrency(results.principalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.propertyTax}</span>
                  <span className="font-medium">{formatCurrency(results.monthlyPropertyTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.homeInsurance}</span>
                  <span className="font-medium">{formatCurrency(results.monthlyInsurance)}</span>
                </div>
                {values.extraPayment > 0 && (
                  <div className="flex justify-between">
                    <span>{t.extraPayment}</span>
                    <span className="font-medium text-green-600">+{formatCurrency(values.extraPayment)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>{t.totalMonthly}</span>
                    <span className="text-blue-600">{formatCurrency(results.effectiveMonthlyPayment || results.totalMonthlyPayment)}</span>
                  </div>
                </div>
              </div>
              {Number(results.monthsSaved) > 0 && (
                <div className="mt-3 p-2 bg-green-100 rounded border border-green-300">
                  <div className="font-medium text-green-800">✓ Extra payments save you {results.monthsSaved} months!</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Amortization Schedule Toggle */}
      {results.totalMonthlyPayment && amortizationSchedule.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
          >
            {showAmortization ? t.hideAmortizationSchedule : t.showAmortizationSchedule}
          </button>
        </div>
      )}

      {/* Amortization Schedule Display */}
      {showAmortization && amortizationSchedule.length > 0 && (
        <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{t.amortizationSchedule}</h3>
            <div className="flex gap-2">
              <select
                value={amortizationView}
                onChange={(e) => setAmortizationView(e.target.value as 'yearly' | 'monthly')}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="yearly">{t.yearlySummary}</option>
                <option value="monthly">{t.monthlyDetails}</option>
              </select>
              <button
                onClick={exportAmortizationToCSV}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
{t.exportCsv}
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
                  {yearlySummary.map((row, index) => (
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
                  {amortizationSchedule.slice(0, 120).map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-900">{row.paymentNumber}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{row.paymentDate.toLocaleDateString()}</td>
                      <td className="px-4 py-2 text-sm text-green-600 text-right">${row.principal.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm text-red-600 text-right">${row.interest.toFixed(2)}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-right">${row.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                  {amortizationSchedule.length > 120 && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="px-4 py-2 text-center text-sm text-gray-500">
                        ... {amortizationSchedule.length - 120} more payments (showing first 120 for performance)
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
