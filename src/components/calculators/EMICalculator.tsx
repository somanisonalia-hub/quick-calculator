'use client';

import React, { useState, useEffect } from 'react';

interface EMICalculatorProps {
  lang?: string;
}

export default function EMICalculator({ lang = 'en' }: EMICalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "EMI Calculator",
      description: "Calculate Equated Monthly Installment for loans",
      loanDetails: "Loan Details",
      emiBreakdown: "EMI Breakdown",
      monthlyEMI: "Monthly EMI",
      principalAmount: "Principal Amount",
      totalInterest: "Total Interest",
      totalAmountPaid: "Total Amount Paid",
      emiFormula: "EMI Formula",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      loanAmount: "Loan Amount",
      interestRate: "Interest Rate (%)",
      loanTerm: "Loan Term (Years)",
      currency: "$",
      calculateyouremi: "🔄 Recalculate",
      enterloandetailsinstruction: "Enter loan details above to see EMI breakdown"
    },
    es: {
      title: "Calculadora de EMI",
      description: "Calcula la Cuota Mensual Equivalente para préstamos",
      loanDetails: "Detalles del Préstamo",
      emiBreakdown: "Desglose de EMI",
      monthlyEMI: "EMI Mensual",
      principalAmount: "Monto Principal",
      totalInterest: "Intereses Totales",
      totalAmountPaid: "Monto Total Pagado",
      emiFormula: "Fórmula EMI",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      loanAmount: "Monto del Préstamo",
      interestRate: "Tasa de Interés (%)",
      loanTerm: "Plazo del Préstamo (Años)",
      currency: "$",
      calculateyouremi: "Calcule su EMI",
      enterloandetailsinstruction: "Ingrese los detalles del préstamo arriba para ver el desglose de EMI"
    },
    pt: {
      title: "Calculadora de EMI",
      description: "Calcule a Parcela Mensal Equivalente para empréstimos",
      loanDetails: "Detalhes do Empréstimo",
      emiBreakdown: "Detalhamento EMI",
      monthlyEMI: "EMI Mensal",
      principalAmount: "Valor Principal",
      totalInterest: "Juros Totais",
      totalAmountPaid: "Valor Total Pago",
      emiFormula: "Fórmula EMI",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      loanAmount: "Valor do Empréstimo",
      interestRate: "Taxa de Juros (%)",
      loanTerm: "Prazo do Empréstimo (Anos)",
      currency: "R$",
      calculateyouremi: "Calcule sua EMI",
      enterloandetailsinstruction: "Digite os detalhes do empréstimo acima para ver a análise de EMI"
    },
    fr: {
      title: "Calculateur EMI",
      description: "Calculez la Mensualité Équivalente pour les prêts",
      loanDetails: "Détails du Prêt",
      emiBreakdown: "Décomposition EMI",
      monthlyEMI: "EMI Mensuel",
      principalAmount: "Montant Principal",
      totalInterest: "Intérêts Totaux",
      totalAmountPaid: "Montant Total Payé",
      emiFormula: "Formule EMI",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      loanAmount: "Montant du Prêt",
      interestRate: "Taux d'Intérêt (%)",
      loanTerm: "Durée du Prêt (Années)",
      currency: "€",
      calculateyouremi: "Calculez votre EMI",
      enterloandetailsinstruction: "Entrez les détails du prêt ci-dessus pour voir la répartition EMI"
    },
    de: {
      title: "EMI-Rechner",
      description: "Berechnen Sie die äquivalente monatliche Rate für Darlehen",
      loanDetails: "Kreditdetails",
      emiBreakdown: "EMI-Aufschlüsselung",
      monthlyEMI: "Monatliche EMI",
      principalAmount: "Kapitalbetrag",
      totalInterest: "Gesamtzinsen",
      totalAmountPaid: "Gesamtbetrag bezahlt",
      emiFormula: "EMI-Formel",
      calculate: "🔄 Neu berechnen",
      reset: "Zurücksetzen",
      loanAmount: "Darlehensbetrag",
      interestRate: "Zinssatz (%)",
      loanTerm: "Kreditlaufzeit (Jahre)",
      currency: "€",
      calculateyouremi: "🔄 Neu berechnen",
      enterloandetailsinstruction: "Geben Sie die obigen Kreditdetails ein, um die EMI-Aufschlüsselung zu sehen"
    },
    nl: {
      title: "EMI-Rekenmachine",
      description: "Bereken de equivalente maandelijkse betaling voor leningen",
      loanDetails: "Leningdetails",
      emiBreakdown: "EMI-uitsplitsing",
      monthlyEMI: "Maandelijkse EMI",
      principalAmount: "Hoofdbedrag",
      totalInterest: "Totale Rente",
      totalAmountPaid: "Totaal betaald bedrag",
      emiFormula: "EMI-formule",
      calculate: "🔄 Herberekenen",
      reset: "Opnieuw instellen",
      loanAmount: "Leningbedrag",
      interestRate: "Rentepercentage (%)",
      loanTerm: "Leningen looptijd (jaren)",
      currency: "€",
      calculateyouremi: "Bereken uw EMI",
      enterloandetailsinstruction: "Voer hierboven de leningdetails in om de EMI-uitsplitsing te zien"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    if (loanAmount > 0 && interestRate > 0 && loanTerm > 0) {
      const principal = loanAmount;
      const rate = (interestRate || 0) / 100 / 12; // Monthly interest rate
      const term = (loanTerm || 0) * 12; // Total months

      const emi = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      const totalAmount = emi * term;
      const totalInterest = totalAmount - principal;

      setResults({
        emi: emi.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        principal: principal.toFixed(2)
      });
    } else {
      setResults(null);
    }
  }, [loanAmount, interestRate, loanTerm]);

  const resetCalculator = () => {
    setLoanAmount(500000);
    setInterestRate(8.5);
    setLoanTerm(20);
    setResults(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t.loanDetails}</h2>

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
                  min="1000"
                  step="1000"
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
                min="0"
                max="30"
                step="0.1"
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
          {results ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t.emiBreakdown}</h2>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg space-y-4">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.monthlyEMI}:</span>
                    <span className="text-2xl font-bold text-purple-600">{t.currency}{results.emi}</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.principalAmount}:</span>
                    <span className="text-lg font-semibold text-gray-900">{t.currency}{results.principal}</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.totalInterest}:</span>
                    <span className="text-lg font-semibold text-red-600">{t.currency}{results.totalInterest}</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{t.totalAmountPaid}:</span>
                    <span className="text-lg font-semibold text-green-600">{t.currency}{results.totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                <p className="text-xs text-yellow-800">
                  💡 <strong>{t.emiFormula}</strong>: EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.calculateyouremi}</h3>
              <p className="text-gray-500">{t.enterloandetailsinstruction}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}