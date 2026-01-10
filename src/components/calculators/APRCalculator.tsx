'use client';

import { useState, useEffect } from 'react';

interface APRCalculatorProps {
  lang?: string;
}

export default function APRCalculator({ lang = 'en' }: APRCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "APR Calculator",
      description: "Calculate Annual Percentage Rate (APR) for loans and credit",
      loanAmount: "Loan Amount",
      financeCharges: "Finance Charges",
      loanTerm: "Loan Term (Years)",
      calculateAPR: "Calculate APR",
      reset: "Reset",
      apr: "Annual Percentage Rate (APR)",
      monthlyPayment: "Monthly Payment",
      totalCost: "Total Cost",
      financeChargeRatio: "Finance Charge Ratio",
      costComparison: "Cost Comparison",
      enterLoanDetails: "Enter loan details above to calculate APR",
      currency: "$"
    },
    es: {
      title: "Calculadora de TAE",
      description: "Calcula Tasa Anual Equivalente (TAE) para préstamos y crédito",
      loanAmount: "Monto del Préstamo",
      financeCharges: "Cargos Financieros",
      loanTerm: "Plazo del Préstamo (Años)",
      calculateAPR: "Calcular TAE",
      reset: "Reiniciar",
      apr: "Tasa Anual Equivalente (TAE)",
      monthlyPayment: "Pago Mensual",
      totalCost: "Costo Total",
      financeChargeRatio: "Ratio de Cargos Financieros",
      costComparison: "Comparación de Costo",
      enterLoanDetails: "Ingresa detalles del préstamo arriba para calcular TAE",
      currency: "$"
    },
    pt: {
      title: "Calculadora de CET",
      description: "Calcule Custo Efetivo Total (CET) para empréstimos e crédito",
      loanAmount: "Valor do Empréstimo",
      financeCharges: "Encargos Financeiros",
      loanTerm: "Prazo do Empréstimo (Anos)",
      calculateAPR: "Calcular CET",
      reset: "Reiniciar",
      apr: "Custo Efetivo Total (CET)",
      monthlyPayment: "Pagamento Mensal",
      totalCost: "Custo Total",
      financeChargeRatio: "Taxa de Encargos Financeiros",
      costComparison: "Comparação de Custo",
      enterLoanDetails: "Digite detalhes do empréstimo acima para calcular CET",
      currency: "R$"
    },
    fr: {
      title: "Calculateur de TAEG",
      description: "Calculez Taux Annuel Effectif Global (TAEG) pour prêts et crédit",
      loanAmount: "Montant du Prêt",
      financeCharges: "Frais Financiers",
      loanTerm: "Durée du Prêt (Années)",
      calculateAPR: "Calculer TAEG",
      reset: "Réinitialiser",
      apr: "Taux Annuel Effectif Global (TAEG)",
      monthlyPayment: "Paiement Mensuel",
      totalCost: "Coût Total",
      financeChargeRatio: "Ratio Frais Financiers",
      costComparison: "Comparaison Coût",
      enterLoanDetails: "Entrez détails du prêt ci-dessus pour calculer TAEG",
      currency: "€"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [loanAmount, setLoanAmount] = useState(10000);
  const [financeCharges, setFinanceCharges] = useState(1000);
  const [loanTerm, setLoanTerm] = useState(1);
  const [results, setResults] = useState<any>({});

  const calculateAPR = () => {
    if (loanAmount <= 0 || financeCharges < 0 || loanTerm <= 0) {
      setResults({});
      return;
    }

    // APR = (Finance Charges / Loan Amount) / Loan Term × 100
    const apr = (financeCharges / loanAmount) / loanTerm * 100;

    // Calculate monthly payment (simple average)
    const monthlyPayment = (loanAmount + financeCharges) / (loanTerm * 12);

    // Total cost
    const totalCost = loanAmount + financeCharges;

    // Finance charge ratio
    const financeChargeRatio = (financeCharges / loanAmount) * 100;

    // Cost comparison text
    const costComparison = `${t.currency}${financeCharges.toLocaleString()} finance charges on ${t.currency}${loanAmount.toLocaleString()} amount = ${apr.toFixed(2)}% APR`;

    setResults({
      apr: apr.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalCost: totalCost.toFixed(0),
      financeChargeRatio: financeChargeRatio.toFixed(2),
      costComparison
    });
  };

  const resetCalculator = () => {
    setLoanAmount(10000);
    setFinanceCharges(1000);
    setLoanTerm(1);
    setResults({});
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateAPR();
  }, [loanAmount, financeCharges, loanTerm]);

  const formatCurrency = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount);
  };

  return (
    <div className="space-y-6">
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
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="100"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.financeCharges}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={financeCharges}
                  onChange={(e) => setFinanceCharges(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="10"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanTerm}</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.0833"
                min="0.0833"
                max="50"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateAPR}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.calculateAPR}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t.reset}
            </button>
          </div>

          {/* Formula Display */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">APR Formula</h4>
            <div className="text-xs text-blue-700 font-mono">
              APR = (Finance Charges ÷ Loan Amount) ÷ Term × 100
            </div>
            <div className="text-xs text-blue-600 mt-1">
              This calculates the annualized cost of borrowing including all fees.
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              {/* Main APR Result */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-700 font-medium mb-2">{t.apr}</div>
                <div className="text-4xl font-bold text-blue-800">
                  {results.apr}%
                </div>
                <div className="text-xs text-blue-600 mt-2">
                  Annualized cost of borrowing
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.monthlyPayment}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatCurrency(results.monthlyPayment)}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.totalCost}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatCurrency(results.totalCost)}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.financeChargeRatio}</div>
                  <div className="text-lg font-bold text-green-600">
                    {results.financeChargeRatio}%
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.costComparison}</div>
                  <div className="text-xs font-medium text-gray-900">
                    {results.costComparison}
                  </div>
                </div>
              </div>

              {/* Educational Info */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-green-900 mb-2">Understanding APR</h4>
                <div className="text-xs text-green-700 space-y-1">
                  <div><strong>APR</strong> shows the true annualized cost of borrowing</div>
                  <div><strong>Higher APR</strong> means more expensive borrowing</div>
                  <div><strong>Includes fees</strong> unlike simple interest rates</div>
                  <div><strong>Standardized</strong> way to compare loan offers</div>
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
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.enterLoanDetails}</h3>
              <p className="text-gray-500">Enter your loan amount, finance charges, and term above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
