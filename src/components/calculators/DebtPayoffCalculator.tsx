'use client';

import React, { useState } from 'react';

interface Debt {
  id: string;
  balance: number;
  rate: number;
}

export const DebtPayoffCalculator: React.FC<{ lang?: string }> = ({ lang = 'en' }) => {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', balance: 5000, rate: 15 },
  ]);
  const [monthlyPayment, setMonthlyPayment] = useState(500);
  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>('avalanche');
  const [results, setResults] = useState<any>(null);

  const texts = {
    en: {
      title: 'Debt Payoff Calculator',
      addDebt: 'Add Debt',
      removeDebt: 'Remove',
      balance: 'Balance',
      rate: 'Interest Rate (%)',
      monthly: 'Monthly Payment',
      strategy: 'Payoff Strategy',
      avalanche: 'Avalanche (High Interest First)',
      snowball: 'Snowball (Smallest Balance First)',
      calculate: 'Calculate',
      payoffDate: 'Estimated Payoff Date',
      totalInterest: 'Total Interest Paid',
      months: 'months',
      strategy_result: 'Strategy Used',
      noPlan: 'Unable to calculate - payment may be too low',
    },
    es: {
      title: 'Calculadora de Pago de Deuda',
      addDebt: 'Agregar Deuda',
      removeDebt: 'Eliminar',
      balance: 'Saldo',
      rate: 'Tasa de Interés (%)',
      monthly: 'Pago Mensual',
      strategy: 'Estrategia de Pago',
      avalanche: 'Avalancha (Mayor Interés Primero)',
      snowball: 'Bola de Nieve (Saldo Más Pequeño Primero)',
      calculate: 'Calcular',
      payoffDate: 'Fecha Estimada de Pago',
      totalInterest: 'Interés Total Pagado',
      months: 'meses',
      strategy_result: 'Estrategia Utilizada',
      noPlan: 'No se puede calcular - el pago puede ser demasiado bajo',
    },
    pt: {
      title: 'Calculadora de Pagamento de Dívida',
      addDebt: 'Adicionar Dívida',
      removeDebt: 'Remover',
      balance: 'Saldo',
      rate: 'Taxa de Juros (%)',
      monthly: 'Pagamento Mensal',
      strategy: 'Estratégia de Pagamento',
      avalanche: 'Avalanche (Maior Juros Primeiro)',
      snowball: 'Bola de Neve (Menor Saldo Primeiro)',
      calculate: 'Calcular',
      payoffDate: 'Data Estimada de Pagamento',
      totalInterest: 'Juros Totais Pagos',
      months: 'meses',
      strategy_result: 'Estratégia Utilizada',
      noPlan: 'Não é possível calcular - o pagamento pode ser muito baixo',
    },
    fr: {
      title: 'Calculatrice de Remboursement de Dettes',
      addDebt: 'Ajouter une Dette',
      removeDebt: 'Supprimer',
      balance: 'Solde',
      rate: 'Taux d\'Intérêt (%)',
      monthly: 'Paiement Mensuel',
      strategy: 'Stratégie de Remboursement',
      avalanche: 'Avalanche (Intérêts Plus Élevés D\'Abord)',
      snowball: 'Boule de Neige (Plus Petit Solde D\'Abord)',
      calculate: 'Calculer',
      payoffDate: 'Date Estimée de Remboursement',
      totalInterest: 'Intérêt Total Payé',
      months: 'mois',
      strategy_result: 'Stratégie Utilisée',
      noPlan: 'Impossible de calculer - le paiement peut être trop faible',
    },
  };

  const t = texts[lang as keyof typeof texts] || texts.en;

  const calculatePayoff = () => {
    let totalDebts = debts.map(d => ({ ...d }));
    let totalInterest = 0;
    let months = 0;
    const maxMonths = 600;

    // Sort debts based on strategy
    if (strategy === 'avalanche') {
      totalDebts.sort((a, b) => b.rate - a.rate);
    } else {
      totalDebts.sort((a, b) => a.balance - b.balance);
    }

    while (totalDebts.some(d => d.balance > 0.01) && months < maxMonths) {
      months++;
      let remainingPayment = monthlyPayment;

      // Calculate interest for all debts and apply to remaining payment
      for (let i = 0; i < totalDebts.length; i++) {
        if (totalDebts[i].balance <= 0.01) continue;

        const monthlyRate = totalDebts[i].rate / 100 / 12;
        const interest = totalDebts[i].balance * monthlyRate;
        totalInterest += interest;
        totalDebts[i].balance += interest;

        const payment = Math.min(remainingPayment, totalDebts[i].balance);
        totalDebts[i].balance -= payment;
        remainingPayment -= payment;

        if (remainingPayment <= 0.01) break;
      }
    }

    if (months >= maxMonths) {
      setResults(null);
      return;
    }

    const payoffDate = new Date();
    payoffDate.setMonth(payoffDate.getMonth() + months);

    setResults({
      months,
      payoffDate: payoffDate.toLocaleDateString(lang === 'es' ? 'es-ES' : lang === 'pt' ? 'pt-BR' : lang === 'fr' ? 'fr-FR' : 'en-US'),
      totalInterest: totalInterest.toFixed(2),
      strategy: strategy === 'avalanche' ? t.avalanche : t.snowball,
    });
  };

  const addDebt = () => {
    setDebts([...debts, { id: Date.now().toString(), balance: 1000, rate: 10 }]);
  };

  const removeDebt = (id: string) => {
    if (debts.length > 1) {
      setDebts(debts.filter(d => d.id !== id));
    }
  };

  const updateDebt = (id: string, field: 'balance' | 'rate', value: number) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  return (
    <div id="calculator-section" className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{t.title}</h1>

      <div className="space-y-6">
        {/* Debts Section */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Debts</h2>
          {debts.map((debt, idx) => (
            <div key={debt.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{t.balance}</label>
                  <input
                    type="number"
                    value={debt.balance}
                    onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{t.rate}</label>
                  <input
                    type="number"
                    value={debt.rate}
                    onChange={(e) => updateDebt(debt.id, 'rate', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.1"
                  />
                </div>
                {debts.length > 1 && (
                  <div className="flex items-end">
                    <button
                      onClick={() => removeDebt(debt.id)}
                      className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      {t.removeDebt}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            onClick={addDebt}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            + {t.addDebt}
          </button>
        </div>

        {/* Monthly Payment */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-600 mb-2">{t.monthly}</label>
          <input
            type="number"
            value={monthlyPayment}
            onChange={(e) => setMonthlyPayment(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            step="50"
          />
        </div>

        {/* Strategy */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-600 mb-3">{t.strategy}</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="avalanche"
                checked={strategy === 'avalanche'}
                onChange={(e) => setStrategy('avalanche')}
                className="mr-2"
              />
              <span>{t.avalanche}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="snowball"
                checked={strategy === 'snowball'}
                onChange={(e) => setStrategy('snowball')}
                className="mr-2"
              />
              <span>{t.snowball}</span>
            </label>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculatePayoff}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-lg"
        >
          {t.calculate}
        </button>

        {/* Results */}
        {results && (
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-700">{t.payoffDate}</p>
                <p className="text-2xl font-bold text-green-900">{results.payoffDate}</p>
              </div>
              <div>
                <p className="text-sm text-green-700">{t.totalInterest}</p>
                <p className="text-2xl font-bold text-green-900">${results.totalInterest}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-green-700">{t.months}</p>
                <p className="text-2xl font-bold text-green-900">{results.months} {t.months}</p>
              </div>
            </div>
          </div>
        )}

        {results === null && monthlyPayment > 0 && debts.some(d => d.balance > 0) && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <p className="text-red-800">{t.noPlan}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtPayoffCalculator;
