'use client';

import { useState, useEffect } from 'react';

interface LoanCalculatorProps {
  lang?: string;
}

export default function LoanCalculator({ lang = 'en' }: LoanCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Loan Calculator",
      description: "Calculate monthly loan payments and total interest",
      loanDetails: "Loan Details",
      paymentSummary: "Payment Summary",
      loanAmount: "Loan Amount",
      interestRate: "Interest Rate (%)",
      loanTerm: "Loan Term (Years)",
      monthlyPayment: "Monthly Payment",
      totalPayments: "Total Payments",
      totalInterest: "Total Interest Paid",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      currency: "$",
      loanpaymentformula: "Loan Payment Formula",
      calculateloanpayments: "🔄 Recalculate",
      loanpaymentformulaequation: "M = P[r(1+r)^n] / [(1+r)^n - 1]",
      enterloandetailsinstruction: "Enter loan details above to see monthly payment breakdown"
    },
    es: {
      title: "Calculadora de Préstamos",
      description: "Calcula pagos mensuales de préstamos e intereses totales",
      loanDetails: "Detalles del Préstamo",
      paymentSummary: "Resumen de Pago",
      loanAmount: "Monto del Préstamo",
      interestRate: "Tasa de Interés (%)",
      loanTerm: "Plazo del Préstamo (Años)",
      monthlyPayment: "Pago Mensual",
      totalPayments: "Pagos Totales",
      totalInterest: "Intereses Totales Pagados",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      currency: "$",
      loanpaymentformula: "Fórmula de Pago de Préstamo",
      calculateloanpayments: "🔄 Recalcular",
      loanpaymentformulaequation: "M = P[r(1+r)^n] / [(1+r)^n - 1]",
      enterloandetailsinstruction: "Ingrese los detalles del préstamo arriba para ver el desglose mensual de pagos",
  },
    pt: {
      title: "Calculadora de Empréstimo",
      description: "Calcule pagamentos mensais de empréstimo e juros totais",
      loanDetails: "Detalhes do Empréstimo",
      paymentSummary: "Resumo de Pagamento",
      loanAmount: "Valor do Empréstimo",
      interestRate: "Taxa de Juros (%)",
      loanTerm: "Prazo do Empréstimo (Anos)",
      monthlyPayment: "Pagamento Mensal",
      totalPayments: "Pagamentos Totais",
      totalInterest: "Juros Totais Pagos",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      currency: "R$",
      loanpaymentformula: "Fórmula de Pagamento de Empréstimo",
      calculateloanpayments: "🔄 Recalcular",
      loanpaymentformulaequation: "M = P[r(1+r)^n] / [(1+r)^n - 1]",
      enterloandetailsinstruction: "Digite os detalhes do empréstimo acima para ver a análise mensal de pagamentos",
  },
    fr: {
      title: "Calculateur de Prêt",
      description: "Calculez les paiements mensuels de prêt et les intérêts totaux",
      loanDetails: "Détails du Prêt",
      paymentSummary: "Résumé de Paiement",
      loanAmount: "Montant du Prêt",
      interestRate: "Taux d'Intérêt (%)",
      loanTerm: "Durée du Prêt (Années)",
      monthlyPayment: "Paiement Mensuel",
      totalPayments: "Paiements Totaux",
      totalInterest: "Intérêts Totaux Payés",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      currency: "€",
      loanpaymentformula: "Formule de Paiement de Prêt",
      calculateloanpayments: "🔄 Recalculer",
      loanpaymentformulaequation: "M = P[r(1+r)^n] / [(1+r)^n - 1]",
      enterloandetailsinstruction: "Entrez les détails du prêt ci-dessus pour voir la répartition mensuelle des paiements",
    },
    de: {
      title: "Darlehensrechner",
      description: "Berechnen Sie monatliche Darlehenszahlungen und Gesamtzinsen",
      loanDetails: "Darlehensdetails",
      paymentSummary: "Zahlungsübersicht",
      loanAmount: "Darlehensbetrag",
      interestRate: "Zinssatz (%)",
      loanTerm: "Darlehenslaufzeit (Jahre)",
      monthlyPayment: "Monatliche Zahlung",
      totalPayments: "Gesamtzahlungen",
      totalInterest: "Gezahlte Gesamtzinsen",
      calculate: "🔄 Neu berechnen",
      reset: "Zurücksetzen",
      currency: "€",
      loanpaymentformula: "Darlehensformel",
      calculateloanpayments: "Darlehen berechnen",
      loanpaymentformulaequation: "M = P[r(1+r)^n] / [(1+r)^n - 1]",
      enterloandetailsinstruction: "Geben Sie oben die Darlehensdetails ein, um eine monatliche Zahlungsaufschlüsselung zu sehen",
    },
    nl: {
      title: "Lenenrekenmachine",
      description: "Bereken maandelijkse leningbetalingen en totale rente",
      loanDetails: "Lening Details",
      paymentSummary: "Betalingsoverzicht",
      loanAmount: "Leneningbedrag",
      interestRate: "Rente (%)",
      loanTerm: "Looptijd Lening (Jaren)",
      monthlyPayment: "Maandelijkse Betaling",
      totalPayments: "Totale Betalingen",
      totalInterest: "Totale Betaalde Rente",
      calculate: "🔄 Herberekenen",
      reset: "Herstellen",
      currency: "€",
      loanpaymentformula: "Lening Formule",
      calculateloanpayments: "Leningen berekenen",
      loanpaymentformulaequation: "M = P[r(1+r)^n] / [(1+r)^n - 1]",
      enterloandetailsinstruction: "Voer hierboven de leninggegevens in om een maandelijkse betalingsopsplitsing te zien",
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(15);
  const [results, setResults] = useState<any>({});

  // Calculate loan payments
  useEffect(() => {
    if (loanAmount > 0 && interestRate >= 0 && loanTerm > 0) {
      const monthlyRate = interestRate / 100 / 12;
      const numPayments = loanTerm * 12;

      const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                           (Math.pow(1 + monthlyRate, numPayments) - 1);

      const totalPayments = monthlyPayment * numPayments;
      const totalInterest = totalPayments - loanAmount;

      setResults({
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayments: totalPayments.toFixed(2),
        totalInterest: totalInterest.toFixed(2)
      });
    } else {
      setResults({});
    }
  }, [loanAmount, interestRate, loanTerm]);

  const resetCalculator = () => {
    setLoanAmount(100000);
    setInterestRate(5.5);
    setLoanTerm(15);
    setResults({});
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
    <div>
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.loanDetails}</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanAmount}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="1000"
                  min="1000"
                />
              </div>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanTerm}</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="50"
              />
            </div>
          </div>

          {/* Auto-calculation note */}
          <div className="pt-2 text-xs text-blue-600 text-center font-medium">
            📊 Calculations update automatically as you change values
          </div>

          {/* Buttons */}
          <div className="pt-3 flex gap-4">
            <button
              onClick={() => {
                // Force recalculation (though auto-calc handles this)
                setResults((prev: any) => ({ ...prev }));
              }}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
            >
              🔄 Recalculate
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
            >
              {t.reset}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.paymentSummary}</h3>

              {/* Main Result */}
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <div className="text-base text-gray-600 mb-2">{t.monthlyPayment}</div>
                <div className="text-5xl font-bold text-blue-600">
                  {formatCurrency(parseFloat(results.monthlyPayment))}
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t.totalPayments}</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(parseFloat(results.totalPayments))}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">{t.totalInterest}</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatCurrency(parseFloat(results.totalInterest))}
                  </div>
                </div>
              </div>

              {/* Loan Formula */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-sm font-semibold text-yellow-900 mb-2">{t.loanpaymentformula}</h4>
                <div className="text-xs text-yellow-700 font-mono">
{t.loanpaymentformulaequation}
                </div>
                <div className="text-xs text-yellow-600 mt-1">
                  Where: M = Monthly payment, P = Principal, r = Monthly rate, n = Number of payments
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.calculateloanpayments}</h3>
              <p className="text-gray-500">{t.enterloandetailsinstruction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}