'use client';

import { useState, useEffect } from 'react';


interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: number;
  min?: number;
  max?: number;
  step?: number;
}

interface CalculatorOutput {
  label: string;
  default: string;
  format: string;
}

interface AdditionalOutput {
  label: string;
  field: string;
  format: string;
}

interface CreditCardCalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
  lang?: string;
}

export default function CreditCardCalculator({ inputs, output, additionalOutputs, lang = 'en' }: CreditCardCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      creditCardDetails: "Credit Card Details",
      payoffAnalysis: "Payoff Analysis",
      minimumPayment: "Minimum Payment",
      ofBalance: "of balance",
       paymentTooLow: "Payment too low",
       year: "year",
      month: "month",
      tip: "� � Tip:",
      debtimpactanalysis: "Debt Impact Analysis",
      infinite: "Infinite",
      entercreditcarddetails: "Enter credit card details",
      string: "string",
      interestasofbalance: "Interest as % of Balance:",
      monthlyinterestcost: "Monthly Interest Cost:",
      breakevenpayment: "Break-even Payment:",
      calculate: "🔄 Recalculate",
      reset: "Reset"
  },
    es: {
      creditCardDetails: "Detalles de Tarjeta de Crédito",
      payoffAnalysis: "Análisis de Pago",
      minimumPayment: "Pago Mínimo",
      ofBalance: "del saldo",
      paymentTooLow: "Pago demasiado bajo",
      year: "año",
      month: "mes",
      tip: "💡 Consejo:",
      debtimpactanalysis: "Análisis del Impacto de la Deuda",
      infinite: "Infinito",
      entercreditcarddetails: "Ingrese los detalles de la tarjeta de crédito",
      string: "cadena",
      interestasofbalance: "Interés como % del Saldo:",
      monthlyinterestcost: "Costo de Interés Mensual:",
      breakevenpayment: "Pago de Punto de Equilibrio:",
      calculate: "🔄 Recalcular",
      reset: "Restablecer"
  },
    pt: {
      creditCardDetails: "Detalhes do Cartão de Crédito",
      payoffAnalysis: "Análise de Pagamento",
      minimumPayment: "Pagamento Mínimo",
      ofBalance: "do saldo",
      paymentTooLow: "Pagamento muito baixo",
      year: "ano",
      month: "mês",
      tip: "💡 Dica:",
      debtimpactanalysis: "Análise do Impacto da Dívida",
      infinite: "Infinito",
      entercreditcarddetails: "Digite os detalhes do cartão de crédito",
      string: "string",
      interestasofbalance: "Juros como % do Saldo:",
      monthlyinterestcost: "Custo de Juros Mensal:",
      breakevenpayment: "Pagamento de Ponto de Equilíbrio:",
      calculate: "🔄 Recalcular",
      reset: "Redefinir"
  },
    fr: {
      creditCardDetails: "Détails de Carte de Crédit",
      payoffAnalysis: "Analyse de Remboursement",
      minimumPayment: "Paiement Minimum",
      ofBalance: "du solde",
      paymentTooLow: "Paiement trop bas",
      year: "année",
      month: "mois",
      tip: "💡 Conseil:",
      debtimpactanalysis: "Analyse de l'Impact de la Dette",
      infinite: "Infini",
      entercreditcarddetails: "Entrez les détails de la carte de crédit",
      string: "chaîne",
      interestasofbalance: "Intérêt en % du Solde:",
      monthlyinterestcost: "Coût d'Intérêt Mensuel:",
      breakevenpayment: "Paiement d'Équilibre:",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser"
  }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, string | number | boolean>>({});

  const calculatePayoff = () => {
    const balance = values.balance || 0;
    const interestRate = values.interestRate || 0;
    const monthlyPayment = values.monthlyPayment || 0;

      if (balance <= 0 || monthlyPayment <= 0) {
        setResults({});
        return;
      }

      // Monthly interest rate
      const monthlyRate = interestRate / 100 / 12;

      // Minimum payment check (should be at least 2-3% of balance)
      const minPaymentRequired = balance * 0.02;
      const isMinPayment = monthlyPayment >= minPaymentRequired;

      let remainingBalance = balance;
      let totalInterest = 0;
      let months = 0;
      const maxMonths = 600; // 50 years max

      // Calculate payoff using amortization
      while (remainingBalance > 0.01 && months < maxMonths) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = Math.min(monthlyPayment - interestPayment, remainingBalance);

        totalInterest += interestPayment;
        remainingBalance -= principalPayment;
        months++;

        // If payment is too low to cover interest, debt will grow
        if (monthlyPayment <= interestPayment && months > 1) {
          setResults({
            monthsToPayoff: 'Never (debt will grow)',
            totalInterest: 'Infinite',
            totalPaid: 'Infinite',
            payoffWarning: true,
            minPaymentNeeded: minPaymentRequired.toFixed(2)
          });
          return;
        }
      }

      if (months >= maxMonths) {
        setResults({
          monthsToPayoff: '50+ years',
          totalInterest: totalInterest.toFixed(2),
          totalPaid: (balance + totalInterest).toFixed(2),
          payoffWarning: true,
          minPaymentNeeded: minPaymentRequired.toFixed(2)
        });
      } else {
        setResults({
          monthsToPayoff: months,
          totalInterest: totalInterest.toFixed(2),
          totalPaid: (balance + totalInterest).toFixed(2),
          payoffWarning: !isMinPayment,
          minPaymentNeeded: minPaymentRequired.toFixed(2)
        });
      }
  };

  const resetCalculator = () => {
    const initial: Record<string, number> = {};
    inputs?.forEach(input => {
      initial[input.name] = input.default || 0;
    });
    setValues(initial);
    setResults({});
  };

  useEffect(() => {
    calculatePayoff();
  }, [values]);

  const handleInputChange = (name: string, value: number) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMonths = (months: number | string) => {
    if (typeof months === 'string') return months;
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years}${t.year}${years !== 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
    }
    return `${months}${t.month}${months !== 1 ? 's' : ''}`;
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {/* Inputs */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t.creditCardDetails}</h3>

          {inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {input.label}
              </label>
              <input
                type={input.type}
                value={values[input.name] || ''}
                onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value) || 0)}
                min={input.min}
                max={input.max}
                step={input.step}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              />
            </div>
          ))}

          {/* Minimum Payment Info */}
          {values.balance > 0 && (
            <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
              <div className="text-xs text-blue-800">
                <strong>{t.minimumPayment}:</strong> ${((values.balance * 0.02) + (values.balance * 0.03)).toFixed(2)} (2-3% {t.ofBalance})
              </div>
            </div>
          )}
        </div>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculatePayoff}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.calculate}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>



        {/* Results */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t.payoffAnalysis}</h3>

          {/* Main Output */}
          <div className={`p-2 sm:p-3 rounded-md border-l-3 ${results.payoffWarning ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'}`}>
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className={`text-lg sm:text-xl font-bold ${results.payoffWarning ? 'text-red-600' : 'text-green-600'}`}>
              {results.monthsToPayoff ? formatMonths(results.monthsToPayoff as number) : 'Enter credit card details'}
            </div>
            {results.payoffWarning && results.minPaymentNeeded && (
              <div className="text-xs text-red-600 mt-1">
                ⚠️ {t.paymentTooLow}: ${results.minPaymentNeeded}
              </div>
            )}
          </div>

          {/* Additional Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {additionalOutputs.map((additionalOutput) => (
              <div key={additionalOutput.field} className="bg-white border border-gray-200 p-2 rounded-md shadow-sm">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                  {additionalOutput.label.replace('Total ', '')}
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {results[additionalOutput.field] || '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Debt Analysis */}
          {results.totalInterest && typeof results.totalInterest === 'string' && results.totalInterest !== 'Infinite' && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
              <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>{t.debtimpactanalysis}</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>{t.interestasofbalance}</span>
                  <span className={`font-medium ${parseFloat(results.totalInterest as string) > (values.balance || 0) * 0.5 ? 'text-red-600' : 'text-green-600'}`}>
                    {values.balance > 0 ? ((parseFloat(results.totalInterest as string) / values.balance) * 100).toFixed(1) : '0'}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t.monthlyinterestcost}</span>
                  <span className="font-medium">
                    {formatCurrency((values.balance || 0) * (values.interestRate || 0) / 100 / 12)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t.breakevenpayment}</span>
                  <span className="font-medium">
                    {formatCurrency((values.balance || 0) * (values.interestRate || 0) / 100 / 12 + 1)}
                  </span>
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-600 p-2 bg-yellow-50 rounded border border-yellow-200">
                <span className="font-medium">💡 Tip:</span> Pay more than the minimum to avoid excessive interest charges.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}