'use client';

import { useState } from 'react';

interface Transaction {
  id: string;
  date: string;
  amount: number;
}

interface MutualFundXIRRCalculatorProps {
  lang?: string;
}

export default function MutualFundXIRRCalculator({ lang = 'en' }: MutualFundXIRRCalculatorProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '2024-01-01', amount: 50000 },
    { id: '2', date: '2024-06-01', amount: 50000 },
    { id: '3', date: '2025-01-01', amount: -150000 }
  ]);

  const [currentValue, setCurrentValue] = useState(0);
  const [results, setResults] = useState({
    xirr: 0,
    absoluteReturn: 0,
    totalInvested: 0,
    totalGain: 0,
    annualizedReturn: 0
  });
  const [calculated, setCalculated] = useState(false);

  // Move resetCalculator up so it's defined before JSX usage
  const resetCalculator = () => {
    setTransactions([
      { id: '1', date: '2024-01-01', amount: 50000 },
      { id: '2', date: '2024-06-01', amount: 50000 },
      { id: '3', date: '2025-01-01', amount: -150000 }
    ]);
    setCurrentValue(0);
    setResults({
      xirr: 0,
      absoluteReturn: 0,
      totalInvested: 0,
      totalGain: 0,
      annualizedReturn: 0
    });
    setCalculated(false);
  };

  const translations = {
    en: {
      title: 'Mutual Fund XIRR Calculator',
      date: 'Transaction Date',
      amount: 'Amount (₹) - Negative for redemption/final value',
      currentValue: 'Current Portfolio Value (₹)',
      calculate: 'Calculate XIRR',
      xirr: 'XIRR Return (%)',
      absoluteReturn: 'Absolute Return (%)',
      annualizedReturn: 'Annualized Return (%)',
      totalInvested: 'Total Invested',
      totalGain: 'Total Gain/Loss',
      addTransaction: 'Add Transaction',
      deleteTransaction: 'Delete',
      rupee: '₹',
      highPerformance: 'Excellent Performance',
      goodPerformance: 'Good Performance',
      averagePerformance: 'Average Performance',
      poorPerformance: 'Below Average',
      subtitle: 'Calculate accurate time-weighted returns (XIRR) accounting for timing of your investments',
      action: 'Action',
      overall: 'Overall profit ratio',
      reset: "Reset"
    },
    es: {
      title: 'Calculadora XIRR de Fondos Mutuos',
      date: 'Fecha de Transacción',
      amount: 'Cantidad (₹) - Negativo para redención/valor final',
      currentValue: 'Valor Actual de la Cartera (₹)',
      calculate: 'Calcular XIRR',
      xirr: 'Rendimiento XIRR (%)',
      absoluteReturn: 'Rendimiento Absoluto (%)',
      annualizedReturn: 'Rendimiento Anualizado (%)',
      totalInvested: 'Total Invertido',
      totalGain: 'Ganancia/Pérdida Total',
      addTransaction: 'Agregar Transacción',
      deleteTransaction: 'Eliminar',
      rupee: '₹',
      highPerformance: 'Desempeño Excelente',
      goodPerformance: 'Buen Desempeño',
      averagePerformance: 'Desempeño Promedio',
      poorPerformance: 'Por Debajo del Promedio',
      subtitle: 'Calcule rendimientos precisos ponderados en el tiempo (XIRR) considerando el momento de sus inversiones',
      action: 'Acción',
      overall: 'Proporción de ganancia total',
      reset: "Restablecer"
    },
    pt: {
      title: 'Calculadora XIRR de Fundos Mútuos',
      date: 'Data da Transação',
      amount: 'Valor (₹) - Negativo para resgate/valor final',
      currentValue: 'Valor Atual da Carteira (₹)',
      calculate: 'Calcular XIRR',
      xirr: 'Retorno XIRR (%)',
      absoluteReturn: 'Retorno Absoluto (%)',
      annualizedReturn: 'Retorno Anualizado (%)',
      totalInvested: 'Total Investido',
      totalGain: 'Ganho/Perda Total',
      addTransaction: 'Adicionar Transação',
      deleteTransaction: 'Excluir',
      rupee: '₹',
      highPerformance: 'Desempenho Excelente',
      goodPerformance: 'Bom Desempenho',
      averagePerformance: 'Desempenho Médio',
      poorPerformance: 'Abaixo da Média',
      subtitle: 'Calcule retornos precisos ponderados pelo tempo (XIRR) levando em conta o tempo de seus investimentos',
      action: 'Ação',
      overall: 'Proporção de lucro geral',
      reset: "Redefinir"
    },
    fr: {
      title: 'Calculatrice XIRR de Fonds Communs de Placement',
      date: 'Date de la Transaction',
      amount: 'Montant (₹) - Négatif pour rachat/valeur finale',
      currentValue: 'Valeur Actuelle du Portefeuille (₹)',
      calculate: 'Calculer XIRR',
      xirr: 'Rendement XIRR (%)',
      absoluteReturn: 'Rendement Absolu (%)',
      annualizedReturn: 'Rendement Annualisé (%)',
      totalInvested: 'Total Investi',
      totalGain: 'Gain/Perte Total',
      addTransaction: 'Ajouter une Transaction',
      deleteTransaction: 'Supprimer',
      rupee: '₹',
      highPerformance: 'Excellent Rendement',
      goodPerformance: 'Bon Rendement',
      averagePerformance: 'Rendement Moyen',
      poorPerformance: 'Sous la Moyenne',
      subtitle: 'Calculez les rendements précis pondérés dans le temps (XIRR) en tenant compte du moment de vos investissements',
      action: 'Action',
      overall: 'Ratio de profit global',
      reset: "Réinitialiser"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Newton-Raphson method to calculate XIRR
  const calculateProperXIRR = (): number => {
    // Create cash flow array with all transactions
    const cashFlows = [...transactions].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    if (currentValue > 0) {
      // Add final value as negative cash flow (redemption)
      const lastDate = new Date(cashFlows[cashFlows.length - 1].date);
      const today = new Date();
      if (today > lastDate) {
        cashFlows.push({ 
          id: 'final', 
          date: today.toISOString().split('T')[0], 
          amount: -currentValue 
        });
      }
    }

    const firstDate = new Date(cashFlows[0].date);

    // NPV calculation function
    const npv = (rate: number): number => {
      return cashFlows.reduce((sum, cf) => {
        const days = Math.floor((new Date(cf.date).getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
        const years = days / 365.25;
        return sum + cf.amount / Math.pow(1 + rate, years);
      }, 0);
    };

  const resetCalculator = () => {
    // Reset transactions and current value to defaults
    setTransactions([
      { id: '1', date: '2024-01-01', amount: 50000 },
      { id: '2', date: '2024-06-01', amount: 50000 },
      { id: '3', date: '2025-01-01', amount: -150000 }
    ]);
    setCurrentValue(0);
    setResults({
      xirr: 0,
      absoluteReturn: 0,
      totalInvested: 0,
      totalGain: 0,
      annualizedReturn: 0
    });
    setCalculated(false);
  };

    // Derivative of NPV
    const npvDerivative = (rate: number): number => {
      return cashFlows.reduce((sum, cf) => {
        const days = Math.floor((new Date(cf.date).getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
        const years = days / 365.25;
        return sum - (years * cf.amount) / Math.pow(1 + rate, years + 1);
      }, 0);
    };

    // Newton-Raphson iteration
    let guess = 0.1; // Start with 10%
    for (let i = 0; i < 100; i++) {
      const npvVal = npv(guess);
      const derivative = npvDerivative(guess);

      if (Math.abs(derivative) < 1e-10) break;
      
      const newGuess = guess - npvVal / derivative;
      
      if (Math.abs(newGuess - guess) < 1e-10) {
        guess = newGuess;
        break;
      }
      
      guess = newGuess;
    }

    return guess;
  };

  const calculateXIRR = () => {
    const totalInvestedAmount = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalRedeemed = transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const finalValue = currentValue > 0 ? currentValue : totalRedeemed;
    const totalGain = finalValue - totalInvestedAmount;
    const absoluteReturnPercent = (totalGain / totalInvestedAmount) * 100;

    // Calculate XIRR using Newton-Raphson
    const xirrDecimal = calculateProperXIRR();
    const xirrPercent = xirrDecimal * 100;

    // Calculate annualized return
    const firstDate = new Date(transactions[0].date);
    const lastDate = new Date(
      currentValue > 0 ? new Date().toISOString().split('T')[0] : 
      transactions[transactions.length - 1].date
    );
    const years = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    const annualizedReturn = (Math.pow(Math.abs(finalValue / totalInvestedAmount), 1 / years) - 1) * 100;

    setResults({
      xirr: xirrPercent,
      absoluteReturn: absoluteReturnPercent,
      annualizedReturn: isFinite(annualizedReturn) ? annualizedReturn : 0,
      totalInvested: totalInvestedAmount,
      totalGain: totalGain
    });
    setCalculated(true);
  };

  const addTransaction = () => {
    const newId = Math.max(...transactions.map(t => parseInt(t.id) || 0), 0) + 1;
    setTransactions([
      ...transactions,
      { id: newId.toString(), date: new Date().toISOString().split('T')[0], amount: 0 }
    ]);
  };

  const deleteTransaction = (id: string) => {
    if (transactions.length > 1) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const getPerformanceColor = (xirr: number): string => {
    if (xirr >= 20) return 'text-green-600 dark:text-green-400';
    if (xirr >= 12) return 'text-blue-600 dark:text-blue-400';
    if (xirr >= 0) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPerformanceLabel = (xirr: number): string => {
    if (xirr >= 20) return t.highPerformance;
    if (xirr >= 12) return t.goodPerformance;
    if (xirr >= 0) return t.averagePerformance;
    return t.poorPerformance;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">{t.date}</th>
                <th className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{t.amount}</th>
                <th className="px-4 py-2 text-center text-gray-700 dark:text-gray-300">{t.action}</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-3">
                    <input
                      type="date"
                      value={transaction.date}
                      onChange={(e) => {
                        const updated = transactions.map(t => 
                          t.id === transaction.id ? {...t, date: e.target.value} : t
                        );
                        setTransactions(updated);
                      }}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={transaction.amount}
                      onChange={(e) => {
                        const updated = transactions.map(t => 
                          t.id === transaction.id ? {...t, amount: Number(e.target.value)} : t
                        );
                        setTransactions(updated);
                      }}
                      className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-right"
                      placeholder="0"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                    >
                      {t.deleteTransaction}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Current Value Input */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            {t.currentValue}
          </label>
          <input
            type="number"
            min="0"
            step="1000"
            value={currentValue}
            onChange={(e) => setCurrentValue(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            placeholder="Leave 0 if portfolio is fully redeemed"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">If portfolio is still open, enter current value. For closed portfolio, enter 0.</p>
        </div>

        {/* Action Buttons */}
        <div className="grid lg:grid-cols-2 gap-4">
          <button
            onClick={addTransaction}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            + {t.addTransaction}
          </button>
          <button
            onClick={calculateXIRR}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {t.calculate}
          </button>
        </div>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>



        {/* Results */}
        {calculated && (
          <div className="mt-8 space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
              {/* XIRR */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 font-medium">{t.xirr}</p>
                <p className={`text-4xl font-bold ${getPerformanceColor(results.xirr)}`}>
                  {results.xirr.toFixed(2)}%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{getPerformanceLabel(results.xirr)}</p>
              </div>

              {/* Absolute Return */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 font-medium">{t.absoluteReturn}</p>
                <p className={`text-4xl font-bold ${results.absoluteReturn >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {results.absoluteReturn.toFixed(2)}%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Overall profit ratio</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Total Invested */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1 font-medium">{t.totalInvested}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t.rupee} {results.totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>

              {/* Total Gain */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1 font-medium">{t.totalGain}</p>
                <p className={`text-2xl font-bold ${results.totalGain >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {t.rupee} {results.totalGain.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>

              {/* Annualized Return */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1 font-medium">{t.annualizedReturn}</p>
                <p className={`text-2xl font-bold ${results.annualizedReturn >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                  {results.annualizedReturn.toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                <strong>XIRR</strong> accounts for the timing of your investments. If you invested during market peaks vs troughs, XIRR shows your true return. 
                <strong className="block mt-2"> Absolute Return</strong> is the total profit regardless of timing. Both metrics matter for portfolio analysis.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
