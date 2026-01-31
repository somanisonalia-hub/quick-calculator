'use client';

import { useState, useEffect } from 'react';

interface EqualPrincipalAmortizationCalculatorProps {
  lang?: string;
}

interface AmortizationRow {
  paymentNumber: number;
  paymentDate: Date;
  principalPayment: number;
  interestPayment: number;
  totalPayment: number;
  remainingBalance: number;
}

export default function EqualPrincipalAmortizationCalculator({ lang = 'en' }: EqualPrincipalAmortizationCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Equal Principal Amortization Calculator",
      description: "Calculate loan payments with equal principal amortization - an alternative method",
      loanAmount: "Loan Amount",
      interestRate: "Annual Interest Rate (%)",
      loanTerm: "Loan Term (Years)",
      showSchedule: "Show Amortization Schedule",
      calculate: "Calculate",
      reset: "Reset",
      firstMonthPayment: "First Month Payment",
      lastMonthPayment: "Last Month Payment",
      totalInterest: "Total Interest Paid",
      averagePayment: "Average Monthly Payment",
      paymentRange: "Payment Range",
      vsStandard: "vs Standard Amortization",
      paymentSummary: "Payment Summary",
      amortizationSchedule: "Amortization Schedule",
      paymentNumber: "Payment #",
      date: "Date",
      principal: "Principal",
      interest: "Interest",
      total: "Total Payment",
      balance: "Remaining Balance",
      exportCSV: "Export to CSV",
      noResults: "Calculate to see results",
      equalPrincipalMethod: "Equal Principal Method",
      standardAmortization: "Standard Amortization",
      difference: "Difference",
      equalPrincipalDesc: "Equal Principal: $666.67 principal + decreasing interest",
      standardDesc: "Standard: Increasing principal + decreasing interest",
      benefit: "Benefit: Pay more principal early, potentially lower total interest",
      consideration: "Consideration: Higher initial payments may affect cash flow"
    },
    es: {
      title: "Calculadora de Amortización de Principal Igual",
      description: "Calcula pagos de préstamo con amortización de principal igual - un método alternativo",
      loanAmount: "Monto del Préstamo",
      interestRate: "Tasa de Interés Anual (%)",
      loanTerm: "Plazo del Préstamo (Años)",
      showSchedule: "Mostrar Programa de Amortización",
      calculate: "Calcular",
      reset: "Reiniciar",
      firstMonthPayment: "Pago Primer Mes",
      lastMonthPayment: "Pago Último Mes",
      totalInterest: "Intereses Totales Pagados",
      averagePayment: "Pago Mensual Promedio",
      paymentRange: "Rango de Pagos",
      vsStandard: "vs Amortización Estándar",
      paymentSummary: "Resumen de Pago",
      amortizationSchedule: "Programa de Amortización",
      paymentNumber: "Pago #",
      date: "Fecha",
      principal: "Principal",
      interest: "Intereses",
      total: "Pago Total",
      balance: "Saldo Restante",
      exportCSV: "Exportar a CSV",
      noResults: "Calcula para ver resultados",
      equalPrincipalMethod: "Método de Principal Igual",
      standardAmortization: "Amortización Estándar",
      difference: "Diferencia",
      equalPrincipalDesc: "Principal Igual: $666.67 principal + intereses decrecientes",
      standardDesc: "Estándar: Principal creciente + intereses decrecientes",
      benefit: "Beneficio: Paga más principal temprano, potencialmente menos interés total",
      consideration: "Consideración: Pagos iniciales más altos pueden afectar flujo de efectivo"
    },
    pt: {
      title: "Calculadora de Amortização de Principal Igual",
      description: "Calcule pagamentos de empréstimo com amortização de principal igual - um método alternativo",
      loanAmount: "Valor do Empréstimo",
      interestRate: "Taxa de Juros Anual (%)",
      loanTerm: "Prazo do Empréstimo (Anos)",
      showSchedule: "Mostrar Programa de Amortização",
      calculate: "Calcular",
      reset: "Reiniciar",
      firstMonthPayment: "Pagamento Primeiro Mês",
      lastMonthPayment: "Pagamento Último Mês",
      totalInterest: "Juros Totais Pagos",
      averagePayment: "Pagamento Mensal Médio",
      paymentRange: "Intervalo de Pagamentos",
      vsStandard: "vs Amortização Padrão",
      paymentSummary: "Resumo de Pagamento",
      amortizationSchedule: "Programa de Amortização",
      paymentNumber: "Pagamento #",
      date: "Data",
      principal: "Principal",
      interest: "Juros",
      total: "Pagamento Total",
      balance: "Saldo Restante",
      exportCSV: "Exportar para CSV",
      noResults: "Calcule para ver resultados",
      equalPrincipalMethod: "Método de Principal Igual",
      standardAmortization: "Amortização Padrão",
      difference: "Diferença",
      equalPrincipalDesc: "Principal Igual: $666.67 principal + juros decrescentes",
      standardDesc: "Padrão: Principal crescente + juros decrescentes",
      benefit: "Benefício: Paga mais principal cedo, potencialmente menos juros totais",
      consideration: "Consideração: Pagamentos iniciais mais altos podem afetar fluxo de caixa"
    },
    fr: {
      title: "Calculateur d'Amortissement de Principal Égal",
      description: "Calculez paiements d'emprunt avec amortissement de principal égal - une méthode alternative",
      loanAmount: "Montant d'Emprunt",
      interestRate: "Taux d'Intérêt Annuel (%)",
      loanTerm: "Durée d'Emprunt (Années)",
      showSchedule: "Afficher Programme d'Amortissement",
      calculate: "Calculer",
      reset: "Réinitialiser",
      firstMonthPayment: "Paiement Premier Mois",
      lastMonthPayment: "Paiement Dernier Mois",
      totalInterest: "Intérêts Totaux Payés",
      averagePayment: "Paiement Mensuel Moyen",
      paymentRange: "Plage de Paiements",
      vsStandard: "vs Amortissement Standard",
      paymentSummary: "Résumé de Paiement",
      amortizationSchedule: "Programme d'Amortissement",
      paymentNumber: "Paiement #",
      date: "Date",
      principal: "Principal",
      interest: "Intérêts",
      total: "Paiement Total",
      balance: "Solde Restant",
      exportCSV: "Exporter vers CSV",
      noResults: "Calculez pour voir résultats",
      equalPrincipalMethod: "Méthode de Principal Égal",
      standardAmortization: "Amortissement Standard",
      difference: "Différence",
      equalPrincipalDesc: "Principal Égal: $666.67 principal + intérêts décroissants",
      standardDesc: "Standard: Principal croissant + intérêts décroissants",
      benefit: "Avantage: Payez plus de principal tôt, potentiellement moins d'intérêts totaux",
      consideration: "Considération: Paiements initiaux plus élevés peuvent affecter flux de trésorerie"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [showSchedule, setShowSchedule] = useState(false);
  const [results, setResults] = useState<any>({});
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);

  const calculateEqualPrincipal = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;

    // Constant principal payment
    const principalPayment = principal / totalPayments;

    // Generate amortization schedule
    const schedule: AmortizationRow[] = [];
    let remainingBalance = principal;
    let totalInterestPaid = 0;

    for (let i = 1; i <= totalPayments; i++) {
      // Interest for this month
      const interestPayment = remainingBalance * monthlyRate;

      // Total payment for this month
      const totalPayment = principalPayment + interestPayment;

      // Update balance
      remainingBalance -= principalPayment;

      // Ensure balance doesn't go negative due to rounding
      if (remainingBalance < 0.01) {
        remainingBalance = 0;
      }

      totalInterestPaid += interestPayment;

      // Payment date (assuming first payment next month)
      const paymentDate = new Date();
      paymentDate.setMonth(paymentDate.getMonth() + i);

      schedule.push({
        paymentNumber: i,
        paymentDate,
        principalPayment,
        interestPayment,
        totalPayment,
        remainingBalance
      });
    }

    // Calculate summary statistics
    const firstMonthPayment = schedule[0]?.totalPayment || 0;
    const lastMonthPayment = schedule[schedule.length - 1]?.totalPayment || 0;
    const averagePayment = schedule.reduce((sum, row) => sum + row.totalPayment, 0) / schedule.length;

    // Compare with standard amortization
    const standardMonthlyPayment = calculateStandardAmortization(principal, monthlyRate, totalPayments);

    setResults({
      firstMonthPayment,
      lastMonthPayment,
      totalInterest: totalInterestPaid,
      averagePayment,
      paymentRange: `$${firstMonthPayment.toFixed(0)} - $${lastMonthPayment.toFixed(0)}`,
      standardComparison: `Standard: $${standardMonthlyPayment.toFixed(0)} constant vs Equal Principal: $${averagePayment.toFixed(0)} average (${((1 - averagePayment / standardMonthlyPayment) * 100).toFixed(1)}% savings)`
    });

    setAmortizationSchedule(schedule);
  };

  const calculateStandardAmortization = (principal: number, monthlyRate: number, totalPayments: number) => {
    if (monthlyRate === 0) {
      return principal / totalPayments;
    }

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
           (Math.pow(1 + monthlyRate, totalPayments) - 1);
  };

  const resetCalculator = () => {
    setLoanAmount(200000);
    setInterestRate(6.5);
    setLoanTerm(30);
    setShowSchedule(false);
    setResults({});
    setAmortizationSchedule([]);
  };

  const exportToCSV = () => {
    if (amortizationSchedule.length === 0) return;

    let csvContent = `${t.paymentNumber},${t.date},${t.principal},${t.interest},${t.total},${t.balance}\n`;

    amortizationSchedule.forEach(row => {
      csvContent += `${row.paymentNumber},${row.paymentDate.toISOString().split('T')[0]},${row.principalPayment.toFixed(2)},${row.interestPayment.toFixed(2)},${row.totalPayment.toFixed(2)},${row.remainingBalance.toFixed(2)}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `equal-principal-amortization-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanAmount}</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="1000"
                min="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.interestRate}</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.125"
                min="0"
                max="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanTerm}</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="1"
                min="1"
                max="50"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="showSchedule"
                checked={showSchedule}
                onChange={(e) => setShowSchedule(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showSchedule" className="ml-2 block text-sm text-gray-700">
                {t.showSchedule}
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateEqualPrincipal}
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

          {/* Key Statistics */}
          {Object.keys(results).length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">{t.paymentSummary}</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-blue-700 font-medium">{t.firstMonthPayment}</div>
                  <div className="text-blue-600">{formatCurrency(results.firstMonthPayment)}</div>
                </div>
                <div>
                  <div className="text-blue-700 font-medium">{t.lastMonthPayment}</div>
                  <div className="text-blue-600">{formatCurrency(results.lastMonthPayment)}</div>
                </div>
                <div>
                  <div className="text-blue-700 font-medium">{t.totalInterest}</div>
                  <div className="text-blue-600">{formatCurrency(results.totalInterest)}</div>
                </div>
                <div>
                  <div className="text-blue-700 font-medium">{t.averagePayment}</div>
                  <div className="text-blue-600">{formatCurrency(results.averagePayment)}</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="text-xs text-blue-700 mb-1">{t.paymentRange}</div>
                <div className="text-sm font-medium text-blue-900">{results.paymentRange}</div>
              </div>
              <div className="mt-2">
                <div className="text-xs text-blue-700 mb-1">{t.vsStandard}</div>
                <div className="text-sm font-medium text-blue-900">{results.standardComparison}</div>
              </div>
            </div>
          )}

          {/* Method Explanation */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">How Equal Principal Works</h4>
            <div className="text-xs text-green-700 space-y-1">
              <div>• Principal payment remains constant each month</div>
              <div>• Interest decreases as loan balance reduces</div>
              <div>• Total payment decreases over loan term</div>
              <div>• Front-loaded principal repayment</div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {showSchedule && amortizationSchedule.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">{t.amortizationSchedule}</h3>
                <button
                  onClick={exportToCSV}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  {t.exportCSV}
                </button>
              </div>

              <div className="overflow-x-auto max-h-96">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t.paymentNumber}</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t.date}</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.principal}</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.interest}</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.total}</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.balance}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {amortizationSchedule.slice(0, 120).map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{row.paymentNumber}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{row.paymentDate.toLocaleDateString()}</td>
                        <td className="px-4 py-2 text-sm text-green-600 text-right">${row.principalPayment.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-red-600 text-right">${row.interestPayment.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-blue-600 text-right font-medium">${row.totalPayment.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">${row.remainingBalance.toFixed(2)}</td>
                      </tr>
                    ))}
                    {amortizationSchedule.length > 120 && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-4 py-2 text-center text-sm text-gray-500">
                          ... {amortizationSchedule.length - 120} more payments (showing first 120 for performance)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.noResults}</h3>
              <p className="text-gray-500">Enter loan details and click calculate</p>
            </div>
          )}

          {/* Comparison Chart */}
          {Object.keys(results).length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Comparison</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{t.equalPrincipalMethod}</span>
                  <span className="text-sm text-blue-600 font-medium">{formatCurrency(results.averagePayment)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{t.standardAmortization}</span>
                  <span className="text-sm text-gray-600">
                    {formatCurrency(results.standardComparison.split('$')[1]?.split(' ')[0] ? parseFloat(results.standardComparison.split('$')[1].split(' ')[0]) : 0)}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{t.difference}</span>
                    <span className={`text-sm font-medium ${
                      results.averagePayment < (results.standardComparison.split('$')[1]?.split(' ')[0] ? parseFloat(results.standardComparison.split('$')[1].split(' ')[0]) : 0)
                        ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {results.averagePayment < (results.standardComparison.split('$')[1]?.split(' ')[0] ? parseFloat(results.standardComparison.split('$')[1].split(' ')[0]) : 0)
                        ? 'Savings' : 'Extra Cost'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Educational Content */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-indigo-900 mb-2">Understanding Equal Principal</h4>
            <div className="text-xs text-indigo-700 space-y-1">
              <div>{t.equalPrincipalDesc}</div>
              <div>{t.standardDesc}</div>
              <div>{t.benefit}</div>
              <div>{t.consideration}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
