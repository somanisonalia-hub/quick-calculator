'use client';

import { useState, useEffect } from 'react';

interface BasicAPRCalculatorProps {
  lang?: string;
}

export default function BasicAPRCalculator({ lang = 'en' }: BasicAPRCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Basic APR Calculator",
      description: "Calculate basic APR for loans and credit cards with simple calculations",
      loanAmount: "Loan Amount",
      totalInterest: "Total Interest / Finance Charges",
      loanYears: "Loan Term (Years)",
      calculateAPR: "🔄 Recalculate",
      reset: "Reset",
      apr: "Annual Percentage Rate (APR)",
      interestRate: "Interest Rate",
      totalAmount: "Total Amount",
      costAnalysis: "Cost Analysis",
      enterLoanDetails: "Enter loan details above to calculate basic APR",
      currency: "$",
      understandingBasicAPR: "Understanding Basic APR",
      aprShowsCost: "APR shows the true annual borrowing cost",
      simpleCalculation: "Simple calculation for straightforward scenarios",
      includesAllCosts: "Includes all costs as a percentage of loan amount",
      higherAPR: "Higher APR means more expensive borrowing"
    },
    es: {
      title: "Calculadora Básica de TAE",
      description: "Calcula TAE básica para préstamos y tarjetas de crédito con cálculos simples",
      loanAmount: "Monto del Préstamo",
      totalInterest: "Total de Intereses / Cargos Financieros",
      loanYears: "Plazo del Préstamo (Años)",
      calculateAPR: "🔄 Recalcular",
      reset: "Reiniciar",
      apr: "Tasa Anual Equivalente (TAE)",
      interestRate: "Tasa de Interés",
      totalAmount: "Monto Total",
      costAnalysis: "Análisis de Costo",
      enterLoanDetails: "Ingresa detalles del préstamo arriba para calcular TAE básica",
      currency: "$",
      understandingBasicAPR: "Entendiendo la TAE Básica",
      aprShowsCost: "TAE muestra el costo anual real del préstamo",
      simpleCalculation: "Cálculo simple para escenarios sencillos",
      includesAllCosts: "Incluye todos los costos como porcentaje del monto del préstamo",
      higherAPR: "Mayor TAE significa préstamo más costoso"
    },
    pt: {
      title: "Calculadora Básica de CET",
      description: "Calcule CET básico para empréstimos e cartões de crédito com cálculos simples",
      loanAmount: "Valor do Empréstimo",
      totalInterest: "Total de Juros / Encargos Financeiros",
      loanYears: "Prazo do Empréstimo (Anos)",
      calculateAPR: "🔄 Recalcular",
      reset: "Reiniciar",
      apr: "Custo Efetivo Total (CET)",
      interestRate: "Taxa de Juros",
      totalAmount: "Valor Total",
      costAnalysis: "Análise de Custo",
      enterLoanDetails: "Digite detalhes do empréstimo acima para calcular CET básico",
      currency: "R$",
      understandingBasicAPR: "Entendendo o CET Básico",
      aprShowsCost: "CET mostra o custo anual real do empréstimo",
      simpleCalculation: "Cálculo simples para cenários diretos",
      includesAllCosts: "Inclui todos os custos como porcentagem do valor do empréstimo",
      higherAPR: "Maior CET significa empréstimo mais caro"
    },
    fr: {
      title: "Calculateur de TAEG Basique",
      description: "Calculez TAEG basique pour prêts et cartes de crédit avec calculs simples",
      loanAmount: "Montant du Prêt",
      totalInterest: "Total Intérêts / Frais Financiers",
      loanYears: "Durée du Prêt (Années)",
      calculateAPR: "🔄 Recalculer",
      reset: "Réinitialiser",
      apr: "Taux Annuel Effectif Global (TAEG)",
      interestRate: "Taux d'Intérêt",
      totalAmount: "Montant Total",
      costAnalysis: "Analyse Coût",
      enterLoanDetails: "Entrez détails du prêt ci-dessus pour calculer TAEG basique",
      currency: "€",
      understandingBasicAPR: "Comprendre le TAEG Basique",
      aprShowsCost: "Le TAEG montre le coût annuel réel de l'emprunt",
      simpleCalculation: "Calcul simple pour scénarios simples",
      includesAllCosts: "Inclut tous les coûts en pourcentage du montant du prêt",
      higherAPR: "Un TAEG plus élevé signifie un emprunt plus coûteux"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [loanAmount, setLoanAmount] = useState<number | string>('10000');
  const [totalInterest, setTotalInterest] = useState<number | string>('1200');
  const [loanYears, setLoanYears] = useState<number | string>('1');
  const [results, setResults] = useState<any>({});

  const calculateBasicAPR = () => {
    const loanAmt = Number(loanAmount) || 0;
    const interest = Number(totalInterest) || 0;
    const years = Number(loanYears) || 0;

    if (loanAmt <= 0 || interest < 0 || years <= 0) {
      setResults({});
      return;
    }

    // Basic APR = (Total Interest / Loan Amount) / Years × 100
    const apr = (interest / loanAmt) / years * 100;
    const interestRate = apr; // Same as APR for basic calculation
    const totalAmount = loanAmt + interest;
    const costAnalysis = `${t.currency}${interest.toLocaleString()} finance charges on ${t.currency}${loanAmt.toLocaleString()} loan = ${apr.toFixed(2)}% APR`;

    setResults({
      apr: apr.toFixed(2),
      interestRate: interestRate.toFixed(2),
      totalAmount: totalAmount.toFixed(0),
      costAnalysis
    });
  };

  const resetCalculator = () => {
    setLoanAmount('10000');
    setTotalInterest('1200');
    setLoanYears('1');
    setResults({});
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateBasicAPR();
  }, [loanAmount, totalInterest, loanYears]);

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
      <div className="mb-6 hidden">
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
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="100"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.totalInterest}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={totalInterest}
                  onChange={(e) => setTotalInterest(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="10"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanYears}</label>
              <input
                type="number"
                value={loanYears}
                onChange={(e) => setLoanYears(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.0833"
                min="0.0833"
                max="30"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateBasicAPR}
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
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">Basic APR Formula</h4>
            <div className="text-xs text-green-700 font-mono">
              APR = (Total Interest ÷ Loan Amount) ÷ Years × 100
            </div>
            <div className="text-xs text-green-600 mt-1">
              Simple calculation for basic borrowing scenarios
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              {/* Main APR Result */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-2">{t.apr}</div>
                <div className="text-4xl font-bold text-green-800">
                  {results.apr}%
                </div>
                <div className="text-xs text-green-600 mt-2">
                  Basic annualized borrowing cost
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.interestRate}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {results.interestRate}%
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.totalAmount}</div>
                  <div className="text-lg font-bold text-gray-900">
                    {formatCurrency(results.totalAmount)}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200 col-span-2">
                  <div className="text-sm text-gray-600 mb-1">{t.costAnalysis}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {results.costAnalysis}
                  </div>
                </div>
              </div>

              {/* Educational Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">{t.understandingBasicAPR}</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>{t.aprShowsCost}</div>
                  <div>{t.simpleCalculation}</div>
                  <div>{t.includesAllCosts}</div>
                  <div>{t.higherAPR}</div>
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
              <p className="text-gray-500">Enter your loan amount, interest, and term above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
