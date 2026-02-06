'use client';

import { useState, useEffect } from 'react';

interface AmortizationScheduleCalculatorProps {
  lang?: string;
}

interface AmortizationRow {
  paymentNumber: number;
  paymentDate: Date;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface YearlySummary {
  year: number;
  payments: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

export default function AmortizationScheduleCalculator({ lang = 'en' }: AmortizationScheduleCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [startDate, setStartDate] = useState('');
  const [viewMode, setViewMode] = useState<'yearly' | 'monthly'>('yearly');
  const [showSteps, setShowSteps] = useState(false);

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayments: 0,
    totalInterest: 0,
    payoffDate: '',
    interestToPrincipalRatio: 0
  });

  const [schedule, setSchedule] = useState<AmortizationRow[]>([]);
  const [yearlySummary, setYearlySummary] = useState<YearlySummary[]>([]);

  const translations = {
    en: {
      title: "Amortization Schedule Calculator",
      description: "Generate detailed amortization schedules showing principal and interest breakdown",
      loanAmount: "Loan Amount",
      interestRate: "Annual Interest Rate (%)",
      loanTerm: "Loan Term (Years)",
      startDate: "Loan Start Date",
      viewMode: "View Mode",
      yearlySummary: "Year-by-Year Summary",
      monthlyDetails: "Month-by-Month Details",
      calculate: "Generate Schedule",
      reset: "Reset Values",
      monthlyPayment: "Monthly Payment",
      totalPayments: "Total Payments",
      totalInterest: "Total Interest Paid",
      payoffDate: "Payoff Date",
      interestToPrincipalRatio: "Interest to Principal Ratio",
      showSteps: "Show Step-by-Step",
      stepByStep: "Step-by-Step Calculation",
      formula: "Formula",
      examples: "Examples",
      explanation: "Explanation",
      step: "Step",
      calculation: "Calculation",
      result: "Result",
      payment: "Payment",
      principal: "Principal",
      interest: "Interest",
      balance: "Balance",
      date: "Date",
      number: "No.",
      year: "Year",
      payments: "Payments",
      principalPaid: "Principal Paid",
      interestPaid: "Interest Paid",
      endingBalance: "Ending Balance",
      export: "Export to CSV",
      print: "Print Schedule",
      paymentnumberdatepaymentprincipalinterestbalancen: "Payment Number,Date,Payment,Principal,Interest,Balance\n",
      extraPaymentsTip: "Extra payments reduce balance faster and save on interest",
      monthlyPaymentVar: "P = Monthly Payment",
      loanAmountVar: "L = Loan Amount",
      monthlyRateVar: "r = Monthly Rate",
      numberOfPaymentsVar: "n = Number of Payments",
      thirtyYearMortgageTip: "30-year mortgage: Most interest paid in early years, principal later",
      fifteenYearMortgageTip: "15-year mortgage: Faster equity build-up, less total interest",
      higherRateTip: "Higher interest rate = More money going to interest each month",
      morePaymentsMessage: "more payments (showing first 120 for performance)",
      yearlyCsvHeader: "Year,Payments,Principal Paid,Interest Paid,Ending Balance\n"
  },
    es: {
      title: "Calculadora de Tabla de Amortización",
      description: "Genera tablas de amortización detalladas mostrando desglose de principal e intereses",
      loanAmount: "Monto del Préstamo",
      interestRate: "Tasa de Interés Anual (%)",
      loanTerm: "Plazo del Préstamo (Años)",
      startDate: "Fecha de Inicio del Préstamo",
      viewMode: "Modo de Vista",
      yearlySummary: "Resumen Año por Año",
      monthlyDetails: "Detalles Mes por Mes",
      calculate: "Generar Tabla",
      reset: "Reiniciar Valores",
      monthlyPayment: "Pago Mensual",
      totalPayments: "Pagos Totales",
      totalInterest: "Intereses Totales Pagados",
      payoffDate: "Fecha de Liquidación",
      interestToPrincipalRatio: "Relación Intereses a Principal",
      showSteps: "Mostrar Paso a Paso",
      stepByStep: "Cálculo Paso a Paso",
      formula: "Fórmula",
      examples: "Ejemplos",
      explanation: "Explicación",
      step: "Paso",
      calculation: "Cálculo",
      result: "Resultado",
      payment: "Pago",
      principal: "Principal",
      interest: "Intereses",
      balance: "Saldo",
      date: "Fecha",
      number: "N°",
      year: "Año",
      payments: "Pagos",
      principalPaid: "Principal Pagado",
      interestPaid: "Intereses Pagados",
      endingBalance: "Saldo Final",
      export: "Exportar a CSV",
      print: "Imprimir Tabla",
      paymentnumberdatepaymentprincipalinterestbalancen: "Número de Pago,Fecha,Pago,Principal,Intereses,Saldo\n",
      extraPaymentsTip: "Los pagos extra reducen el saldo más rápido y ahorran en intereses",
      monthlyPaymentVar: "P = Pago Mensual",
      loanAmountVar: "L = Monto del Préstamo",
      monthlyRateVar: "r = Tasa Mensual",
      numberOfPaymentsVar: "n = Número de Pagos",
      thirtyYearMortgageTip: "Préstamo de 30 años: La mayor parte de los intereses se pagan en los primeros años, el principal después",
      fifteenYearMortgageTip: "Préstamo de 15 años: Construcción de capital más rápida, menos interés total",
      higherRateTip: "Tasa de interés más alta = Más dinero va a intereses cada mes",
      morePaymentsMessage: "más pagos (mostrando los primeros 120 por rendimiento)",
      yearlyCsvHeader: "Año,Pagos,Principal Pagado,Intereses Pagados,Saldo Final\n"
  },
    pt: {
      title: "Calculadora de Tabela de Amortização",
      description: "Gere tabelas de amortização detalhadas mostrando desglose de principal e juros",
      loanAmount: "Valor do Empréstimo",
      interestRate: "Taxa de Juros Anual (%)",
      loanTerm: "Prazo do Empréstimo (Anos)",
      startDate: "Data de Início do Empréstimo",
      viewMode: "Modo de Visualização",
      yearlySummary: "Resumo Ano a Ano",
      monthlyDetails: "Detalhes Mês a Mês",
      calculate: "Gerar Tabela",
      reset: "Reiniciar Valores",
      monthlyPayment: "Pagamento Mensal",
      totalPayments: "Pagamentos Totais",
      totalInterest: "Juros Totais Pagos",
      payoffDate: "Data de Liquidação",
      interestToPrincipalRatio: "Relação Juros a Principal",
      showSteps: "Mostrar Passo a Passo",
      stepByStep: "Cálculo Passo a Passo",
      formula: "Fórmula",
      examples: "Exemplos",
      explanation: "Explicação",
      step: "Passo",
      calculation: "Cálculo",
      result: "Resultado",
      payment: "Pagamento",
      principal: "Principal",
      interest: "Juros",
      balance: "Saldo",
      date: "Data",
      number: "N°",
      year: "Ano",
      payments: "Pagamentos",
      principalPaid: "Principal Pago",
      interestPaid: "Juros Pagos",
      endingBalance: "Saldo Final",
      export: "Exportar para CSV",
      print: "Imprimir Tabela",
      paymentnumberdatepaymentprincipalinterestbalancen: "Número do Pagamento,Data,Pagamento,Principal,Juros,Saldo\n",
      extraPaymentsTip: "Os pagamentos extras reduzem o saldo mais rápido e economizam em juros",
      monthlyPaymentVar: "P = Pagamento Mensal",
      loanAmountVar: "L = Valor do Empréstimo",
      monthlyRateVar: "r = Taxa Mensal",
      numberOfPaymentsVar: "n = Número de Pagamentos",
      thirtyYearMortgageTip: "Empréstimo de 30 anos: A maioria dos juros pagos nos primeiros anos, principal depois",
      fifteenYearMortgageTip: "Empréstimo de 15 anos: Construção de patrimônio mais rápida, menos juros totais",
      higherRateTip: "Taxa de juros mais alta = Mais dinheiro vai para juros a cada mês",
      morePaymentsMessage: "mais pagamentos (mostrando os primeiros 120 por desempenho)",
      yearlyCsvHeader: "Ano,Pagamentos,Principal Pago,Juros Pagos,Saldo Final\n"
  },
    fr: {
      title: "Calculateur de Tableau d'Amortissement",
      description: "Générez des tableaux d'amortissement détaillés montrant ventilation principal et intérêts",
      loanAmount: "Montant de l'Emprunt",
      interestRate: "Taux d'Intérêt Annuel (%)",
      loanTerm: "Durée d'Emprunt (Années)",
      startDate: "Date de Début d'Emprunt",
      viewMode: "Mode de Vue",
      yearlySummary: "Résumé Année par Année",
      monthlyDetails: "Détails Mois par Mois",
      calculate: "Générer Tableau",
      reset: "Réinitialiser Valeurs",
      monthlyPayment: "Paiement Mensuel",
      totalPayments: "Paiements Totaux",
      totalInterest: "Intérêts Totaux Payés",
      payoffDate: "Date de Remboursement",
      interestToPrincipalRatio: "Ratio Intérêts à Principal",
      showSteps: "Afficher Étape par Étape",
      stepByStep: "Calcul Étape par Étape",
      formula: "Formule",
      examples: "Exemples",
      explanation: "Explication",
      step: "Étape",
      calculation: "Calcul",
      result: "Résultat",
      payment: "Paiement",
      principal: "Principal",
      interest: "Intérêts",
      balance: "Solde",
      date: "Date",
      number: "N°",
      year: "Année",
      payments: "Paiements",
      principalPaid: "Principal Payé",
      interestPaid: "Intérêts Payés",
      endingBalance: "Solde Final",
      export: "Exporter vers CSV",
      print: "Imprimer Tableau",
      paymentnumberdatepaymentprincipalinterestbalancen: "Numéro de Paiement,Date,Paiement,Principal,Intérêts,Solde\n",
      extraPaymentsTip: "Les paiements supplémentaires réduisent le solde plus rapidement et économisent sur les intérêts",
      monthlyPaymentVar: "P = Paiement Mensuel",
      loanAmountVar: "L = Montant du Prêt",
      monthlyRateVar: "r = Taux Mensuel",
      numberOfPaymentsVar: "n = Nombre de Paiements",
      thirtyYearMortgageTip: "Prêt de 30 ans: La plupart des intérêts payés les premières années, principal ensuite",
      fifteenYearMortgageTip: "Prêt de 15 ans: Construction d'équité plus rapide, moins d'intérêts totaux",
      higherRateTip: "Taux d'intérêt plus élevé = Plus d'argent va aux intérêts chaque mois",
      morePaymentsMessage: "paiements supplémentaires (affichage des 120 premiers pour les performances)",
      yearlyCsvHeader: "Année,Paiements,Principal Payé,Intérêts Payés,Solde Final\n"
  }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateAmortizationSchedule = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    // Calculate monthly payment using standard loan formula
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                          (Math.pow(1 + monthlyRate, numPayments) - 1);

    let balance = loanAmount;
    const amortizationSchedule: AmortizationRow[] = [];
    const yearlySummaries: YearlySummary[] = [];

    let totalInterest = 0;
    let currentYear = startDate ? new Date(startDate).getFullYear() : new Date().getFullYear();
    let yearStartBalance = balance;
    let yearPrincipal = 0;
    let yearInterest = 0;
    let yearPayments = 0;

    // Set start date
    const startDateObj = startDate ? new Date(startDate) : new Date();
    let currentDate = new Date(startDateObj);

    for (let i = 1; i <= numPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      // Ensure balance doesn't go negative due to rounding
      if (balance < 0.01) balance = 0;

      totalInterest += interestPayment;

      // Track yearly data
      yearPrincipal += principalPayment;
      yearInterest += interestPayment;
      yearPayments += monthlyPayment;

      // Create amortization row
      amortizationSchedule.push({
        paymentNumber: i,
        paymentDate: new Date(currentDate),
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance
      });

      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);

      // Check if we need to create yearly summary
      const currentYearCheck = currentDate.getFullYear();
      if (currentYearCheck !== currentYear || i === numPayments) {
        if (yearPayments > 0) {
          yearlySummaries.push({
            year: currentYear,
            payments: yearPayments,
            principalPaid: yearPrincipal,
            interestPaid: yearInterest,
            endingBalance: balance
          });
        }

        // Reset yearly counters
        currentYear = currentYearCheck;
        yearStartBalance = balance;
        yearPrincipal = 0;
        yearInterest = 0;
        yearPayments = 0;
      }
    }

    // Calculate payoff date
    const payoffDate = new Date(currentDate);
    payoffDate.setMonth(payoffDate.getMonth() - 1); // Last payment date

    const totalPayments = monthlyPayment * numPayments;
    const interestToPrincipalRatio = (totalInterest / loanAmount) * 100;

    setResults({
      monthlyPayment,
      totalPayments,
      totalInterest,
      payoffDate: payoffDate.toISOString().split('T')[0],
      interestToPrincipalRatio
    });

    setSchedule(amortizationSchedule);
    setYearlySummary(yearlySummaries);
  };

  useEffect(() => {
    calculateAmortizationSchedule();
  }, [loanAmount, interestRate, loanTerm, startDate]);

  const resetCalculator = () => {
    setLoanAmount(200000);
    setInterestRate(6.5);
    setLoanTerm(30);
    setStartDate('');
    setViewMode('yearly');
    setShowSteps(false);
  };

  const exportToCSV = () => {
    let csvContent = '';

    if (viewMode === 'yearly') {
      csvContent = t.yearlyCsvHeader;
      yearlySummary.forEach(row => {
        csvContent += `${row.year},${row.payments.toFixed(2)},${row.principalPaid.toFixed(2)},${row.interestPaid.toFixed(2)},${row.endingBalance.toFixed(2)}\n`;
      });
    } else {
      csvContent = t.paymentnumberdatepaymentprincipalinterestbalancen;
      schedule.forEach(row => {
        csvContent += `${row.paymentNumber},${row.paymentDate.toISOString().split('T')[0]},${row.payment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.balance.toFixed(2)}\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `amortization-schedule-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printSchedule = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanAmount}</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="1000"
                min="0"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.startDate}</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.viewMode}</label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as 'yearly' | 'monthly')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="yearly">{t.yearlySummary}</option>
                <option value="monthly">{t.monthlyDetails}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showSteps"
              checked={showSteps}
              onChange={(e) => setShowSteps(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showSteps" className="text-sm text-gray-700">{t.showSteps}</label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={calculateAmortizationSchedule}
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

          {/* Export Options */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={exportToCSV}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              {t.export}
            </button>
            <button
              onClick={printSchedule}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              {t.print}
            </button>
          </div>

          {/* Formula Display */}
          <div className="bg-green-50 p-4 rounded-lg mt-4">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.formula}</h4>
            <div className="text-sm font-mono text-green-700">
              P = L[r(1+r)^n] / [(1+r)^n - 1]<br/>
              {t.monthlyPaymentVar}<br/>
              {t.loanAmountVar}<br/>
              {t.monthlyRateVar}<br/>
              {t.numberOfPaymentsVar}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-sm text-blue-600 font-semibold">{t.monthlyPayment}</div>
              <div className="text-xl font-bold text-blue-800">${results.monthlyPayment.toFixed(2)}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-sm text-green-600 font-semibold">{t.totalPayments}</div>
              <div className="text-xl font-bold text-green-800">${results.totalPayments.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <div className="text-sm text-red-600 font-semibold">{t.totalInterest}</div>
              <div className="text-xl font-bold text-red-800">${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-sm text-purple-600 font-semibold">{t.interestToPrincipalRatio}</div>
              <div className="text-xl font-bold text-purple-800">{results.interestToPrincipalRatio.toFixed(1)}%</div>
            </div>
          </div>

          {/* Amortization Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {viewMode === 'yearly' ? t.yearlySummary : t.monthlyDetails}
              </h3>
            </div>

            <div className="overflow-x-auto max-h-96">
              {viewMode === 'yearly' ? (
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
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t.number}</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t.date}</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.payment}</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.principal}</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.interest}</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">{t.balance}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {schedule.slice(0, 120).map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{row.paymentNumber}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{row.paymentDate.toLocaleDateString()}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">${row.payment.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-green-600 text-right">${row.principal.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-red-600 text-right">${row.interest.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">${row.balance.toFixed(2)}</td>
                      </tr>
                    ))}
                    {schedule.length > 120 && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-4 py-2 text-center text-sm text-gray-500">
                          ... {schedule.length - 120} {t.morePaymentsMessage}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Examples */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.examples}</h4>
            <div className="text-xs text-indigo-700 space-y-1">
              <div>{t.thirtyYearMortgageTip}</div>
              <div>{t.fifteenYearMortgageTip}</div>
              <div>{t.higherRateTip}</div>
              <div>{t.extraPaymentsTip}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
