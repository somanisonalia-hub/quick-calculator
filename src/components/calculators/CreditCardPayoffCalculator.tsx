'use client';

import { useState } from 'react';

interface CreditCardPayoffCalculatorProps {
  lang?: string;
}

export default function CreditCardPayoffCalculator({ lang = 'en' }: CreditCardPayoffCalculatorProps) {
  const translations = {
    en: {
      title: "Credit Card Payoff Calculator",
      balance: "Current Balance ($)",
      apr: "Annual Interest Rate (APR) (%)",
      monthlyPayment: "Monthly Payment ($)",
      calculate: "🔄 Recalculate",
      results: "Results",
      monthsToPayoff: "Months to Pay Off",
      totalInterest: "Total Interest Paid",
      totalPaid: "Total Amount Paid",
      payoffDate: "Estimated Payoff Date",
      tip: "Paying more than the minimum can save you significant interest!",
      reset: "Reset"
    },
    es: {
      title: "Calculadora de Pago de Tarjeta de Crédito",
      balance: "Saldo Actual ($)",
      apr: "Tasa de Interés Anual (APR) (%)",
      monthlyPayment: "Pago Mensual ($)",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      monthsToPayoff: "Meses para Pagar",
      totalInterest: "Interés Total Pagado",
      totalPaid: "Monto Total Pagado",
      payoffDate: "Fecha Estimada de Pago",
      tip: "¡Pagar más del mínimo puede ahorrarte mucho interés!",
      reset: "Restablecer"
    },
    fr: {
      title: "Calculateur de Remboursement de Carte de Crédit",
      balance: "Solde Actuel ($)",
      apr: "Taux d'Intérêt Annuel (APR) (%)",
      monthlyPayment: "Paiement Mensuel ($)",
      calculate: "🔄 Recalculer",
      results: "Résultats",
      monthsToPayoff: "Mois pour Rembourser",
      totalInterest: "Intérêts Totaux Payés",
      totalPaid: "Montant Total Payé",
      payoffDate: "Date de Remboursement Estimée",
      tip: "Payer plus que le minimum peut vous faire économiser beaucoup d'intérêts !",
      reset: "Réinitialiser"
    },
    pt: {
      title: "Calculadora de Pagamento de Cartão de Crédito",
      balance: "Saldo Atual ($)",
      apr: "Taxa de Juros Anual (APR) (%)",
      monthlyPayment: "Pagamento Mensal ($)",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      monthsToPayoff: "Meses para Pagar",
      totalInterest: "Juros Totais Pagos",
      totalPaid: "Valor Total Pago",
      payoffDate: "Data Estimada de Pagamento",
      tip: "Pagar mais do que o mínimo pode economizar muito em juros!",
      reset: "Redefinir"
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [balance, setBalance] = useState<number>(5000);
  const [apr, setApr] = useState<number>(18.99);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(150);
  const [calculated, setCalculated] = useState(false);

  const calculatePayoff = () => {

    const monthlyRate = apr / 100 / 12;
    let remainingBalance = balance;
    let months = 0;
    let totalPaid = 0;

    while (remainingBalance > 0 && months < 600) {
      const interestCharge = remainingBalance * monthlyRate;
      const principal = Math.min(monthlyPayment - interestCharge, remainingBalance);
      
      if (principal <= 0) {
        months = 999; // Payment too low
        break;
      }

      remainingBalance -= principal;
      totalPaid += monthlyPayment;
      months++;
    }

    const totalInterest = totalPaid - balance;
    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);

    return {
      months: months < 600 ? months : 0,
      totalInterest: Math.max(0, totalInterest),
      totalPaid,
      payoffDate: payoffDate.toLocaleDateString(lang),
      tooLow: months >= 600,
    };
  };

  const resetCalculator = () => {
    setBalance(5000);
    setApr(18.99);
    setMonthlyPayment(150);
    setCalculated(false);
  };

  const results = calculatePayoff();

  return (

    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.balance}
          </label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.apr}
          </label>
          <input
            type="number"
            step="0.01"
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.monthlyPayment}
          </label>
          <input
            type="number"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={() => setCalculated(true)}
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        {t.calculate}
      </button>

      {/* Results Section */}
      {calculated && !results.tooLow && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>
          <h3 className="text-2xl font-bold mb-6 text-gray-800">{t.results}</h3>
          <div className="grid lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.monthsToPayoff}</div>
              <div className="text-3xl font-bold text-blue-600">
                {results.months}
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.totalInterest}</div>
              <div className="text-3xl font-bold text-red-600">
                ${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.totalPaid}</div>
              <div className="text-2xl font-bold text-purple-600">
                ${results.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.payoffDate}</div>
              <div className="text-xl font-bold text-green-600">
                {results.payoffDate}
              </div>
            </div>
          </div>
          <div className="border-t pt-4 bg-yellow-50 p-4 rounded-lg">
            <p className="text-yellow-800">💡 {t.tip}</p>
          </div>
        </div>
      )}

      {/* Too Low Payment Section */}
      {calculated && results.tooLow && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-600 font-semibold">
            {lang === 'es' ? 'El pago mensual es demasiado bajo para cubrir los intereses.' :
              lang === 'fr' ? 'Le paiement mensuel est trop faible pour couvrir les intérêts.' :
              lang === 'pt' ? 'O pagamento mensal é muito baixo para cobrir os juros.' :
              'Monthly payment is too low to cover interest charges.'}
          </p>
        </div>
      )}
    </div>
  );
}
