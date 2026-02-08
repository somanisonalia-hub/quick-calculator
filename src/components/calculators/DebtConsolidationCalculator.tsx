'use client';

import { useState, useEffect } from 'react';

interface DebtConsolidationCalculatorProps {
  lang?: string;
}

export default function DebtConsolidationCalculator({ lang = 'en' }: DebtConsolidationCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Debt Consolidation Calculator",
      description: "Calculate potential savings from consolidating multiple debts into one loan",
      currentDebts: "Current Debts",
      addDebt: "Add Debt",
      debtName: "Debt Name",
      balance: "Balance",
      interestRate: "Interest Rate (%)",
      minimumPayment: "Minimum Payment",
      consolidationLoan: "Consolidation Loan",
      loanAmount: "Loan Amount",
      loanInterestRate: "Loan Interest Rate (%)",
      loanTerm: "Loan Term (Years)",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      debtConsolidation: "Debt Consolidation",
      beforeVsAfter: "Before vs After Comparison",
      totalMonthlyPayment: "Total Monthly Payment",
      totalInterestPaid: "Total Interest Paid",
      payoffTime: "Payoff Time",
      interestSavings: "Interest Savings",
      currency: "$",
      years: "years",
      lowermonthlypaymentwithlongerterm: "Lower monthly payment with longer term",
      singlepaymentinsteadofmultiplepayments: "Single payment instead of multiple payments",
      simplifieddebtmanagement: "Simplified debt management",
      consideryourcreditscoreimpact: "Consider your credit score impact",
  },
    es: {
      title: "Calculadora de Consolidación de Deudas",
      description: "Calcula ahorros potenciales al consolidar múltiples deudas en un solo préstamo",
      currentDebts: "Deudas Actuales",
      addDebt: "Agregar Deuda",
      debtName: "Nombre de Deuda",
      balance: "Saldo",
      interestRate: "Tasa de Interés (%)",
      minimumPayment: "Pago Mínimo",
      consolidationLoan: "Préstamo de Consolidación",
      loanAmount: "Monto del Préstamo",
      loanInterestRate: "Tasa de Interés del Préstamo (%)",
      loanTerm: "Plazo del Préstamo (Años)",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      debtConsolidation: "Consolidación de Deudas",
      beforeVsAfter: "Comparación Antes vs Después",
      totalMonthlyPayment: "Pago Mensual Total",
      totalInterestPaid: "Intereses Totales Pagados",
      payoffTime: "Tiempo de Pago",
      interestSavings: "Ahorro de Intereses",
      currency: "$",
      years: "años",
      lowermonthlypaymentwithlongerterm: "Pago mensual más bajo con plazo más largo",
      singlepaymentinsteadofmultiplepayments: "Un solo pago en lugar de múltiples pagos",
      simplifieddebtmanagement: "Gestión simplificada de deudas",
      consideryourcreditscoreimpact: "Considera el impacto en tu puntaje crediticio",
  },
    pt: {
      title: "Calculadora de Consolidação de Dívidas",
      description: "Calcule economias potenciais ao consolidar múltiplas dívidas em um único empréstimo",
      currentDebts: "Dívidas Atuais",
      addDebt: "Adicionar Dívida",
      debtName: "Nome da Dívida",
      balance: "Saldo",
      interestRate: "Taxa de Juros (%)",
      minimumPayment: "Pagamento Mínimo",
      consolidationLoan: "Empréstimo de Consolidação",
      loanAmount: "Valor do Empréstimo",
      loanInterestRate: "Taxa de Juros do Empréstimo (%)",
      loanTerm: "Prazo do Empréstimo (Anos)",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      debtConsolidation: "Consolidação de Dívidas",
      beforeVsAfter: "Comparação Antes vs Depois",
      totalMonthlyPayment: "Pagamento Mensal Total",
      totalInterestPaid: "Juros Totais Pagos",
      payoffTime: "Tempo de Pagamento",
      interestSavings: "Economia de Juros",
      currency: "R$",
      years: "anos",
      lowermonthlypaymentwithlongerterm: "Pagamento mensal mais baixo com prazo mais longo",
      singlepaymentinsteadofmultiplepayments: "Pagamento único em vez de múltiplos pagamentos",
      simplifieddebtmanagement: "Gestão simplificada de dívidas",
      consideryourcreditscoreimpact: "Considere o impacto no seu score de crédito",
  },
    fr: {
      title: "Calculateur de Consolidation de Dettes",
      description: "Calculez les économies potentielles en consolidant plusieurs dettes en un seul prêt",
      currentDebts: "Dettes Actuelles",
      addDebt: "Ajouter Dette",
      debtName: "Nom de Dette",
      balance: "Solde",
      interestRate: "Taux d'Intérêt (%)",
      minimumPayment: "Paiement Minimum",
      consolidationLoan: "Prêt de Consolidation",
      loanAmount: "Montant du Prêt",
      loanInterestRate: "Taux d'Intérêt du Prêt (%)",
      loanTerm: "Durée du Prêt (Années)",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      debtConsolidation: "Consolidation de Dettes",
      beforeVsAfter: "Comparaison Avant vs Après",
      totalMonthlyPayment: "Paiement Mensuel Total",
      totalInterestPaid: "Intérêts Totaux Payés",
      payoffTime: "Temps de Remboursement",
      interestSavings: "Économies d'Intérêts",
      currency: "€",
      years: "ans",
      lowermonthlypaymentwithlongerterm: "Paiement mensuel plus bas avec terme plus long",
      singlepaymentinsteadofmultiplepayments: "Paiement unique au lieu de paiements multiples",
      simplifieddebtmanagement: "Gestion simplifiée des dettes",
      consideryourcreditscoreimpact: "Considérez l'impact sur votre score de crédit",
  }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [debts, setDebts] = useState([
    { id: 1, name: 'Credit Card 1', balance: 5000, interestRate: 18, minimumPayment: 125 },
    { id: 2, name: 'Credit Card 2', balance: 3000, interestRate: 22, minimumPayment: 90 }
  ]);

  const [loanAmount, setLoanAmount] = useState(8000);
  const [loanInterestRate, setLoanInterestRate] = useState(12);
  const [loanTerm, setLoanTerm] = useState(5);
  const [results, setResults] = useState<any>({});

  const addDebt = () => {
    const newDebt = {
      id: debts.length + 1,
      name: `Debt ${debts.length + 1}`,
      balance: 0,
      interestRate: 15,
      minimumPayment: 0
    };
    setDebts([...debts, newDebt]);
  };

  const updateDebt = (id: number, field: string, value: any) => {
    setDebts(debts.map(debt =>
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const removeDebt = (id: number) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const calculateConsolidation = () => {
    if (loanAmount <= 0 || loanInterestRate < 0 || loanTerm <= 0) {
      setResults({});
      return;
    }

    // Calculate current debt totals
    const totalCurrentBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const totalCurrentPayment = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);

    // Calculate consolidation loan
    const monthlyRate = loanInterestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    const consolidationPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                                (Math.pow(1 + monthlyRate, numPayments) - 1);

    const totalConsolidationCost = consolidationPayment * numPayments;
    const totalConsolidationInterest = totalConsolidationCost - loanAmount;

    // Calculate interest savings
    const interestSavings = totalConsolidationInterest - (totalCurrentBalance * 0.1); // Rough estimate

    setResults({
      totalCurrentBalance,
      totalCurrentPayment,
      consolidationPayment,
      totalConsolidationCost,
      totalConsolidationInterest,
      interestSavings: Math.max(0, interestSavings),
      payoffTime: `${loanTerm}${t.years}`
    });
  };

  const resetCalculator = () => {
    setDebts([
      { id: 1, name: 'Credit Card 1', balance: 5000, interestRate: 18, minimumPayment: 125 },
      { id: 2, name: 'Credit Card 2', balance: 3000, interestRate: 22, minimumPayment: 90 }
    ]);
    setLoanAmount(8000);
    setLoanInterestRate(12);
    setLoanTerm(5);
    setResults({});
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateConsolidation();
  }, [debts, loanAmount, loanInterestRate, loanTerm]);

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
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Current Debts */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{t.currentDebts}</h3>
              <button
                onClick={addDebt}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                {t.addDebt}
              </button>
            </div>

            <div className="space-y-3">
              {debts.map((debt) => (
                <div key={debt.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <input
                      type="text"
                      value={debt.name}
                      onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                      className="font-medium text-gray-900 bg-transparent border-none p-0 focus:outline-none focus:ring-0"
                    />
                    <button
                      onClick={() => removeDebt(debt.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">{t.balance}</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1 text-gray-500 text-sm">{t.currency}</span>
                        <input
                          type="number"
                          value={debt.balance}
                          onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))}
                          className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">{t.interestRate}</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={debt.interestRate}
                          onChange={(e) => updateDebt(debt.id, 'interestRate', Number(e.target.value))}
                          className="w-full pr-6 pl-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          step="0.1"
                        />
                        <span className="absolute right-2 top-1 text-gray-500 text-sm">%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">{t.minimumPayment}</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1 text-gray-500 text-sm">{t.currency}</span>
                        <input
                          type="number"
                          value={debt.minimumPayment}
                          onChange={(e) => updateDebt(debt.id, 'minimumPayment', Number(e.target.value))}
                          className="w-full pl-6 pr-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consolidation Loan */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.consolidationLoan}</h3>
            <div className="space-y-3">
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
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanInterestRate}</label>
                  <input
                    type="number"
                    value={loanInterestRate}
                    onChange={(e) => setLoanInterestRate(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="0.1"
                    min="0"
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
                    max="30"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={calculateConsolidation}
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
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              {/* Comparison Header */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {t.beforeVsAfter}
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-600 mb-1">Current Total Balance</div>
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(results.totalCurrentBalance)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Consolidation Loan</div>
                      <div className="text-lg font-bold text-blue-600">{formatCurrency(loanAmount)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                    <div>
                      <div className="text-gray-600 mb-1">Current Monthly Payment</div>
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(results.totalCurrentPayment)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">New Monthly Payment</div>
                      <div className="text-lg font-bold text-blue-600">{formatCurrency(results.consolidationPayment)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-3">Potential Savings</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-green-700 font-medium">{t.interestSavings}</div>
                    <div className="text-green-600 font-bold">{formatCurrency(results.interestSavings)}</div>
                  </div>
                  <div>
                    <div className="text-green-700 font-medium">{t.payoffTime}</div>
                    <div className="text-green-600 font-bold">{results.payoffTime}</div>
                  </div>
                </div>
              </div>

              {/* Educational Content */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">Debt Consolidation Benefits</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div>{t.lowermonthlypaymentwithlongerterm}</div>
                  <div>{t.singlepaymentinsteadofmultiplepayments}</div>
                  <div>• Potentially lower total interest cost</div>
                  <div>{t.simplifieddebtmanagement}</div>
                  <div>{t.consideryourcreditscoreimpact}</div>
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
              <h3 className="text-lg font-medium text-gray-900 mb-1">Calculate Debt Consolidation</h3>
              <p className="text-gray-500">Enter your current debts and consolidation loan details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}