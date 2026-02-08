'use client';

import { useState, useEffect } from 'react';

interface StudentLoanCalculatorProps {
  lang?: string;
}

export default function StudentLoanCalculator({ lang = 'en' }: StudentLoanCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(10);
  const [gracePeriod, setGracePeriod] = useState(6);
  const [monthsToPayment, setMonthsToPayment] = useState(false);

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    effectiveInterest: 0,
    paymentAfterGrace: 0
  });

  const translations = {
    en: {
      title: "Student Loan Calculator",
      description: "Calculate monthly payments and total cost for student loans",
      loanAmount: "Loan Amount ($)",
      interestRate: "Annual Interest Rate (%)",
      loanTerm: "Loan Term (years)",
      gracePeriod: "Grace Period (months)",
      results: "Student Loan Payment Results",
      monthlyPayment: "Monthly Payment",
      totalPayment: "Total Amount Paid",
      totalInterest: "Total Interest Paid",
      effectiveInterest: "Effective Interest",
      paymentAfterGrace: "Payment After Grace Period",
      reset: "Reset",
      calculate: "🔄 Recalculate"
    },
    es: {
      title: "Calculadora de Préstamo para Estudiantes",
      description: "Calcula pagos mensuales y costo total para préstamos de estudiantes",
      loanAmount: "Monto del Préstamo ($)",
      interestRate: "Tasa de Interés Anual (%)",
      loanTerm: "Plazo del Préstamo (años)",
      gracePeriod: "Período de Gracia (meses)",
      results: "Resultados del Pago del Préstamo para Estudiantes",
      monthlyPayment: "Pago Mensual",
      totalPayment: "Monto Total Pagado",
      totalInterest: "Interés Total Pagado",
      effectiveInterest: "Interés Efectivo",
      paymentAfterGrace: "Pago Después del Período de Gracia",
      reset: "Reiniciar",
      calculate: "🔄 Recalcular"
    },
    pt: {
      title: "Calculadora de Empréstimo para Estudantes",
      description: "Calcule pagamentos mensais e custo total para empréstimos de estudantes",
      loanAmount: "Valor do Empréstimo ($)",
      interestRate: "Taxa de Juros Anual (%)",
      loanTerm: "Período do Empréstimo (anos)",
      gracePeriod: "Período de Carência (meses)",
      results: "Resultados de Pagamento do Empréstimo para Estudantes",
      monthlyPayment: "Pagamento Mensal",
      totalPayment: "Valor Total Pago",
      totalInterest: "Juros Totais Pagos",
      effectiveInterest: "Juros Efetivos",
      paymentAfterGrace: "Pagamento Após Período de Carência",
      reset: "Reiniciar",
      calculate: "🔄 Recalcular"
    },
    fr: {
      title: "Calculateur de Prêt Étudiant",
      description: "Calculez les paiements mensuels et le coût total des prêts étudiants",
      loanAmount: "Montant du Prêt ($)",
      interestRate: "Taux d'Intérêt Annuel (%)",
      loanTerm: "Durée du Prêt (années)",
      gracePeriod: "Période de Grâce (mois)",
      results: "Résultats du Prêt Étudiant",
      monthlyPayment: "Paiement Mensuel",
      totalPayment: "Montant Total Payé",
      totalInterest: "Intérêts Totaux Payés",
      effectiveInterest: "Intérêts Effectifs",
      paymentAfterGrace: "Paiement Après Période de Grâce",
      reset: "Réinitialiser",
      calculate: "🔄 Recalculer"
    },
    de: {
      title: "Studentenkredit-Rechner",
      description: "Berechnen Sie monatliche Zahlungen und Gesamtkosten für Studentendarlehen",
      loanAmount: "Darlehensbetrag ($)",
      interestRate: "Jährlicher Zinssatz (%)",
      loanTerm: "Darlehenslaufzeit (Jahre)",
      gracePeriod: "Karenzzeit (Monate)",
      results: "Studentendarlehen-Zahlungsergebnisse",
      monthlyPayment: "Monatliche Zahlung",
      totalPayment: "Gesamtbetrag Bezahlt",
      totalInterest: "Gezahlte Gesamtzinsen",
      effectiveInterest: "Effektive Zinsen",
      paymentAfterGrace: "Zahlung Nach Karenzzeit",
      reset: "Zurücksetzen",
      calculate: "🔄 Neu berechnen"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyRate === 0) {
      const monthlyPayment = loanAmount / numberOfPayments;
      setResults({
        monthlyPayment,
        totalPayment: loanAmount,
        totalInterest: 0,
        effectiveInterest: 0,
        paymentAfterGrace: monthlyPayment
      });
      return;
    }

    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    const effectiveInterest = (totalInterest / loanAmount) * 100;
    const interestDuringGrace = loanAmount * monthlyRate * gracePeriod;
    const paymentAfterGrace = ((loanAmount + interestDuringGrace) * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments - gracePeriod)) /
      (Math.pow(1 + monthlyRate, numberOfPayments - gracePeriod) - 1);

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      effectiveInterest,
      paymentAfterGrace
    });
  };

  const resetCalculator = () => {
    setLoanAmount(50000);
    setInterestRate(5.5);
    setLoanTerm(10);
    setGracePeriod(6);
    setResults({ monthlyPayment: 0, totalPayment: 0, totalInterest: 0, effectiveInterest: 0, paymentAfterGrace: 0 });
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, gracePeriod]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.loanAmount}
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
              min="1000"
              step="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.interestRate}
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
              min="0"
              max="15"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.loanTerm}
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseFloat(e.target.value) || 1)}
              min="1"
              max="30"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.gracePeriod}
            </label>
            <input
              type="number"
              value={gracePeriod}
              onChange={(e) => setGracePeriod(parseFloat(e.target.value) || 0)}
              min="0"
              max="60"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Auto-calculation note */}
        <div className="pt-2 text-xs text-blue-600 text-center font-medium">
          📊 Calculations update automatically
        </div>

        {/* Buttons */}
        <div className="pt-3 flex gap-4">
          <button
            onClick={resetCalculator}
            className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
          >
            {t.reset}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={calculateLoan}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.calculate}
            </button>
          </div>

        <h2 className="text-xl font-bold text-gray-900">{t.results}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.monthlyPayment}</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {formatCurrency(results.monthlyPayment)}
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.totalPayment}</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {formatCurrency(results.totalPayment)}
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.totalInterest}</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {formatCurrency(results.totalInterest)}
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.effectiveInterest}</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {results.effectiveInterest.toFixed(2)}%
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.paymentAfterGrace}</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {formatCurrency(results.paymentAfterGrace)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
