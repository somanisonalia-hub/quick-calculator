'use client';

import React, { useState, useEffect } from 'react';

interface CarLoanCalculatorProps {
  lang?: string;
}

export default function CarLoanCalculator({ lang = 'en' }: CarLoanCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Car Loan Calculator",
      description: "Calculate your car loan payments and see the full amortization schedule",
      loanDetails: "Loan Details",
      paymentSummary: "Payment Summary",
      monthlyPayment: "Monthly Payment",
      totalPayments: "Total Payments",
      totalInterest: "Total Interest Paid",
      vehiclePrice: "Vehicle Price",
      downPayment: "Down Payment",
      loanTerm: "Loan Term (Years)",
      interestRate: "Interest Rate (%)",
      calculate: "Calculate",
      reset: "Reset",
      showAmortization: "Show Amortization Schedule",
      hideAmortization: "Hide Amortization Schedule",
      amortizationSchedule: "Amortization Schedule",
      yearlySummary: "Yearly Summary",
      monthlyDetails: "Monthly Details",
      paymentNumber: "Payment #",
      date: "Date",
      principal: "Principal",
      interest: "Interest",
      balance: "Balance",
      exportCSV: "Export to CSV",
      currency: "$"
    },
    es: {
      title: "Calculadora de Préstamo de Auto",
      description: "Calcula los pagos de tu préstamo de auto y ve el programa completo de amortización",
      loanDetails: "Detalles del Préstamo",
      paymentSummary: "Resumen de Pago",
      monthlyPayment: "Pago Mensual",
      totalPayments: "Pagos Totales",
      totalInterest: "Intereses Totales Pagados",
      vehiclePrice: "Precio del Vehículo",
      downPayment: "Pago Inicial",
      loanTerm: "Plazo del Préstamo (Años)",
      interestRate: "Tasa de Interés (%)",
      calculate: "Calcular",
      reset: "Reiniciar",
      showAmortization: "Mostrar Programa de Amortización",
      hideAmortization: "Ocultar Programa de Amortización",
      amortizationSchedule: "Programa de Amortización",
      yearlySummary: "Resumen Anual",
      monthlyDetails: "Detalles Mensuales",
      paymentNumber: "Pago #",
      date: "Fecha",
      principal: "Principal",
      interest: "Intereses",
      balance: "Saldo",
      exportCSV: "Exportar a CSV",
      currency: "$"
    },
    pt: {
      title: "Calculadora de Empréstimo de Carro",
      description: "Calcule os pagamentos do seu empréstimo de carro e veja o cronograma completo de amortização",
      loanDetails: "Detalhes do Empréstimo",
      paymentSummary: "Resumo de Pagamento",
      monthlyPayment: "Pagamento Mensal",
      totalPayments: "Pagamentos Totais",
      totalInterest: "Juros Totais Pagos",
      vehiclePrice: "Preço do Veículo",
      downPayment: "Entrada",
      loanTerm: "Prazo do Empréstimo (Anos)",
      interestRate: "Taxa de Juros (%)",
      calculate: "Calcular",
      reset: "Reiniciar",
      showAmortization: "Mostrar Cronograma de Amortização",
      hideAmortization: "Ocultar Cronograma de Amortização",
      amortizationSchedule: "Cronograma de Amortização",
      yearlySummary: "Resumo Anual",
      monthlyDetails: "Detalhes Mensais",
      paymentNumber: "Pagamento #",
      date: "Data",
      principal: "Principal",
      interest: "Juros",
      balance: "Saldo",
      exportCSV: "Exportar para CSV",
      currency: "R$"
    },
    fr: {
      title: "Calculateur de Prêt Auto",
      description: "Calculez vos paiements de prêt auto et consultez l'échéancier complet d'amortissement",
      loanDetails: "Détails du Prêt",
      paymentSummary: "Résumé de Paiement",
      monthlyPayment: "Paiement Mensuel",
      totalPayments: "Paiements Totaux",
      totalInterest: "Intérêts Totaux Payés",
      vehiclePrice: "Prix du Véhicule",
      downPayment: "Acompte",
      loanTerm: "Durée du Prêt (Années)",
      interestRate: "Taux d'Intérêt (%)",
      calculate: "Calculer",
      reset: "Réinitialiser",
      showAmortization: "Afficher l'Échéancier d'Amortissement",
      hideAmortization: "Masquer l'Échéancier d'Amortissement",
      amortizationSchedule: "Échéancier d'Amortissement",
      yearlySummary: "Résumé Annuel",
      monthlyDetails: "Détails Mensuels",
      paymentNumber: "Paiement #",
      date: "Date",
      principal: "Principal",
      interest: "Intérêts",
      balance: "Solde",
      exportCSV: "Exporter vers CSV",
      currency: "€"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [vehiclePrice, setVehiclePrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(5);
  const [interestRate, setInterestRate] = useState(6.5);
  const [results, setResults] = useState<any>({});
  const [showAmortization, setShowAmortization] = useState(false);
  const [amortizationView, setAmortizationView] = useState<'yearly' | 'monthly'>('yearly');
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);
  const [yearlySummary, setYearlySummary] = useState<any[]>([]);

  // Calculate car loan payment and amortization schedule
  useEffect(() => {
    if (vehiclePrice > 0 && downPayment >= 0 && loanTerm > 0 && interestRate >= 0) {
      const loanAmount = vehiclePrice - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const numPayments = loanTerm * 12;

      // Calculate monthly payment
      const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                           (Math.pow(1 + monthlyRate, numPayments) - 1);

      const totalPayments = monthlyPayment * numPayments;
      const totalInterest = totalPayments - loanAmount;

      setResults({
        loanAmount,
        monthlyPayment,
        totalPayments,
        totalInterest
      });

      // Generate amortization schedule
      const schedule = [];
      const yearlyData: { [year: number]: any } = {};
      let currentBalance = loanAmount;

      for (let i = 1; i <= numPayments; i++) {
        const interestPayment = currentBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        currentBalance -= principalPayment;

        const paymentDate = new Date();
        paymentDate.setMonth(paymentDate.getMonth() + i);

        const row = {
          paymentNumber: i,
          paymentDate,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: currentBalance > 0 ? currentBalance : 0
        };
        schedule.push(row);

        const year = paymentDate.getFullYear();
        if (!yearlyData[year]) {
          yearlyData[year] = {
            year,
            payments: 0,
            principalPaid: 0,
            interestPaid: 0,
            endingBalance: 0
          };
        }
        yearlyData[year].payments += monthlyPayment;
        yearlyData[year].principalPaid += principalPayment;
        yearlyData[year].interestPaid += interestPayment;
        yearlyData[year].endingBalance = currentBalance > 0 ? currentBalance : 0;
      }

      setAmortizationSchedule(schedule);
      setYearlySummary(Object.values(yearlyData));
    } else {
      setResults({});
      setAmortizationSchedule([]);
      setYearlySummary([]);
    }
  }, [vehiclePrice, downPayment, loanTerm, interestRate]);

  const resetCalculator = () => {
    setVehiclePrice(30000);
    setDownPayment(5000);
    setLoanTerm(5);
    setInterestRate(6.5);
    setResults({});
    setShowAmortization(false);
    setAmortizationSchedule([]);
    setYearlySummary([]);
  };

  const exportToCSV = () => {
    if (amortizationSchedule.length === 0) return;

    let csvContent = `${t.paymentNumber},${t.date},${t.principal},${t.interest},${t.balance}\n`;

    amortizationSchedule.forEach(row => {
      csvContent += `${row.paymentNumber},${row.paymentDate.toISOString().split('T')[0]},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `car-loan-amortization-${Date.now()}.csv`);
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.loanDetails}</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.vehiclePrice}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="1000"
                  min="1000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.downPayment}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="500"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanTerm}</label>
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="20"
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
                  max="25"
                />
              </div>
            </div>
          </div>

          {/* Auto-calculation note */}
          <div className="pt-2 text-xs text-blue-600 text-center font-medium">
            📊 Calculations update automatically as you change values
          </div>

          {/* Recalculate Button */}
          <div className="pt-3">
            <button
              onClick={() => {
                // Force recalculation (though auto-calc handles this)
                setResults((prev: any) => ({ ...prev }));
              }}
              className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
            >
              Recalculate
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.paymentSummary}</h3>

              {/* Main Result */}
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="text-sm text-gray-600 mb-1">{t.monthlyPayment}</div>
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(results.monthlyPayment)}
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t.totalPayments}</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.totalPayments)}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t.totalInterest}</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.totalInterest)}
                  </div>
                </div>
              </div>

              {/* Amortization Toggle */}
              <button
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                {showAmortization ? t.hideAmortization : t.showAmortization}
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Calculate Your Car Loan</h3>
              <p className="text-gray-500">Enter vehicle details above to see payment breakdown</p>
            </div>
          )}

          {/* Amortization Schedule */}
          {showAmortization && amortizationSchedule.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">{t.amortizationSchedule}</h4>
              <div className="flex justify-center space-x-2 mb-4">
                <button
                  onClick={() => setAmortizationView('yearly')}
                  className={`px-4 py-2 rounded-md text-sm ${amortizationView === 'yearly' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-300'}`}
                >
                  {t.yearlySummary}
                </button>
                <button
                  onClick={() => setAmortizationView('monthly')}
                  className={`px-4 py-2 rounded-md text-sm ${amortizationView === 'monthly' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-300'}`}
                >
                  {t.monthlyDetails}
                </button>
              </div>

              {/* Amortization Table */}
              <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 max-h-96">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.paymentNumber}
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.date}
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.principal}
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.interest}
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t.balance}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(amortizationView === 'yearly' ? yearlySummary : amortizationSchedule.slice(0, 120)).map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {amortizationView === 'yearly' ? row.year : row.paymentNumber}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {amortizationView === 'yearly' ? row.year : row.paymentDate.toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-green-600">
                          {formatCurrency(amortizationView === 'yearly' ? row.principalPaid : row.principal)}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-red-600">
                          {formatCurrency(amortizationView === 'yearly' ? row.interestPaid : row.interest)}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(amortizationView === 'yearly' ? row.endingBalance : row.balance)}
                        </td>
                      </tr>
                    ))}
                    {amortizationSchedule.length > 120 && amortizationView === 'monthly' && (
                      <tr className="bg-gray-50">
                        <td colSpan={5} className="px-4 py-2 text-center text-sm text-gray-500">
                          ... {amortizationSchedule.length - 120} more payments (showing first 120 for performance)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <button
                onClick={exportToCSV}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                {t.exportCSV}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}