'use client';

import { useState, useEffect } from 'react';

interface SimpleInterestCalculatorProps {
  lang?: string;
}

export default function SimpleInterestCalculator({ lang = 'en' }: SimpleInterestCalculatorProps) {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(1);
  const [timeUnit, setTimeUnit] = useState<'years' | 'months' | 'days'>('years');
  const [calculationType, setCalculationType] = useState<'interest' | 'total' | 'breakdown'>('breakdown');

  const [results, setResults] = useState({
    interest: 0,
    totalAmount: 0,
    timeInYears: 0,
    monthlyPayment: 0,
    dailyInterest: 0
  });

  const translations = {
    en: {
      title: "Simple Interest Calculator",
      description: "Calculate simple interest on loans, savings, and investments",
      principal: "Principal Amount ($)",
      interestRate: "Annual Interest Rate (%)",
      timePeriod: "Time Period",
      timeUnit: "Time Unit",
      years: "Years",
      months: "Months",
      days: "Days",
      calculationType: "Calculation Type",
      interestOnly: "Interest Only",
      totalAmount: "Total Amount",
      fullBreakdown: "Full Breakdown",
      calculate: "Calculate Interest",
      reset: "Reset",
      results: "Interest Calculation Results",
      interestAmount: "Interest Amount",
      totalAmountResult: "Total Amount",
      monthlyPayment: "Monthly Payment",
      dailyInterest: "Daily Interest",
      formula: "Formula",
      simpleInterestFormula: "Simple Interest = P × R × T",
      explanation: "Where P = Principal, R = Rate (decimal), T = Time (years)",
      examples: "Examples",
      stepByStep: "Step-by-Step Calculation",
      principalExplanation: "Principal is the initial amount of money",
      rateExplanation: "Annual interest rate as a percentage",
      timeExplanation: "Time period the money is invested or borrowed"
    },
    es: {
      title: "Calculadora de Interés Simple",
      description: "Calcula interés simple en préstamos, ahorros e inversiones",
      principal: "Monto Principal ($)",
      interestRate: "Tasa de Interés Anual (%)",
      timePeriod: "Período de Tiempo",
      timeUnit: "Unidad de Tiempo",
      years: "Años",
      months: "Meses",
      days: "Días",
      calculationType: "Tipo de Cálculo",
      interestOnly: "Solo Interés",
      totalAmount: "Monto Total",
      fullBreakdown: "Desglose Completo",
      calculate: "Calcular Interés",
      reset: "Reiniciar",
      results: "Resultados del Cálculo de Interés",
      interestAmount: "Monto del Interés",
      totalAmountResult: "Monto Total",
      monthlyPayment: "Pago Mensual",
      dailyInterest: "Interés Diario",
      formula: "Fórmula",
      simpleInterestFormula: "Interés Simple = P × R × T",
      explanation: "Donde P = Principal, R = Tasa (decimal), T = Tiempo (años)",
      examples: "Ejemplos",
      stepByStep: "Cálculo Paso a Paso",
      principalExplanation: "El principal es el monto inicial de dinero",
      rateExplanation: "Tasa de interés anual como porcentaje",
      timeExplanation: "Período de tiempo que el dinero está invertido o prestado"
    },
    pt: {
      title: "Calculadora de Juros Simples",
      description: "Calcule juros simples em empréstimos, poupança e investimentos",
      principal: "Valor Principal ($)",
      interestRate: "Taxa de Juros Anual (%)",
      timePeriod: "Período de Tempo",
      timeUnit: "Unidade de Tempo",
      years: "Anos",
      months: "Meses",
      days: "Dias",
      calculationType: "Tipo de Cálculo",
      interestOnly: "Apenas Juros",
      totalAmount: "Valor Total",
      fullBreakdown: "Detalhamento Completo",
      calculate: "Calcular Juros",
      reset: "Reiniciar",
      results: "Resultados do Cálculo de Juros",
      interestAmount: "Valor dos Juros",
      totalAmountResult: "Valor Total",
      monthlyPayment: "Pagamento Mensal",
      dailyInterest: "Juros Diários",
      formula: "Fórmula",
      simpleInterestFormula: "Juros Simples = P × R × T",
      explanation: "Onde P = Principal, R = Taxa (decimal), T = Tempo (anos)",
      examples: "Exemplos",
      stepByStep: "Cálculo Passo a Passo",
      principalExplanation: "O principal é o valor inicial do dinheiro",
      rateExplanation: "Taxa de juros anual como porcentagem",
      timeExplanation: "Período de tempo que o dinheiro está investido ou emprestado"
    },
    fr: {
      title: "Calculateur d'Intérêts Simples",
      description: "Calculez intérêts simples sur prêts, épargne et investissements",
      principal: "Montant Principal ($)",
      interestRate: "Taux d'Intérêt Annuel (%)",
      timePeriod: "Période de Temps",
      timeUnit: "Unité de Temps",
      years: "Années",
      months: "Mois",
      days: "Jours",
      calculationType: "Type de Calcul",
      interestOnly: "Intérêts Uniquement",
      totalAmount: "Montant Total",
      fullBreakdown: "Détail Complet",
      calculate: "Calculer Intérêts",
      reset: "Réinitialiser",
      results: "Résultats du Calcul d'Intérêts",
      interestAmount: "Montant des Intérêts",
      totalAmountResult: "Montant Total",
      monthlyPayment: "Paiement Mensuel",
      dailyInterest: "Intérêts Quotidiens",
      formula: "Formule",
      simpleInterestFormula: "Intérêts Simples = P × R × T",
      explanation: "Où P = Principal, R = Taux (décimal), T = Temps (années)",
      examples: "Exemples",
      stepByStep: "Calcul Étape par Étape",
      principalExplanation: "Le principal est le montant initial d'argent",
      rateExplanation: "Taux d'intérêt annuel en pourcentage",
      timeExplanation: "Période de temps pendant laquelle l'argent est investi ou emprunté"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateInterest = () => {
    // Convert time to years
    let timeInYears = time;
    switch (timeUnit) {
      case 'months':
        timeInYears = time / 12;
        break;
      case 'days':
        timeInYears = time / 365;
        break;
    }

    // Calculate simple interest
    const rateDecimal = rate / 100;
    const interest = principal * rateDecimal * timeInYears;
    const totalAmount = principal + interest;
    const monthlyPayment = timeUnit === 'months' ? totalAmount / time : 0;
    const dailyInterest = interest / (timeInYears * 365);

    setResults({
      interest,
      totalAmount,
      timeInYears,
      monthlyPayment,
      dailyInterest
    });
  };

  useEffect(() => {
    calculateInterest();
  }, [principal, rate, time, timeUnit, calculationType]);

  const resetCalculator = () => {
    setPrincipal(1000);
    setRate(5);
    setTime(1);
    setTimeUnit('years');
    setCalculationType('breakdown');
  };

  const getSteps = () => {
    const rateDecimal = rate / 100;
    let timeInYears = time;
    switch (timeUnit) {
      case 'months':
        timeInYears = time / 12;
        break;
      case 'days':
        timeInYears = time / 365;
        break;
    }

    return [
      `Principal amount: $${principal.toLocaleString()}`,
      `Annual interest rate: ${rate}% (${rateDecimal} as decimal)`,
      `Time period: ${time} ${timeUnit} (${timeInYears.toFixed(3)} years)`,
      `Simple Interest = $${principal.toLocaleString()} × ${rateDecimal} × ${timeInYears.toFixed(3)}`,
      `Simple Interest = $${results.interest.toFixed(2)}`,
      `Total Amount = $${principal.toLocaleString()} + $${results.interest.toFixed(2)} = $${results.totalAmount.toFixed(2)}`
    ];
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.principal}</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.interestRate}</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="50"
              step="0.1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.timePeriod}</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.timeUnit}</label>
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value as 'years' | 'months' | 'days')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="years">{t.years}</option>
                <option value="months">{t.months}</option>
                <option value="days">{t.days}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.calculationType}</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'interest' | 'total' | 'breakdown')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="interest">{t.interestOnly}</option>
              <option value="total">{t.totalAmount}</option>
              <option value="breakdown">{t.fullBreakdown}</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateInterest}
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

          {/* Formula Display */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.formula}</h4>
            <div className="text-sm font-mono text-green-700">
              {t.simpleInterestFormula}
            </div>
            <div className="text-xs text-green-600 mt-2">
              {t.explanation}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {(calculationType === 'interest' || calculationType === 'breakdown') && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.interestAmount}</h3>
              <div className="text-3xl font-bold text-blue-600">
                ${results.interest.toFixed(2)}
              </div>
            </div>
          )}

          {(calculationType === 'total' || calculationType === 'breakdown') && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">{t.totalAmountResult}</h3>
              <div className="text-3xl font-bold text-green-600">
                ${results.totalAmount.toFixed(2)}
              </div>
            </div>
          )}

          {calculationType === 'breakdown' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-purple-900 mb-1">{t.monthlyPayment}</h4>
                <div className="text-lg font-bold text-purple-600">
                  {results.monthlyPayment > 0 ? `$${results.monthlyPayment.toFixed(2)}` : 'N/A'}
                </div>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-orange-900 mb-1">{t.dailyInterest}</h4>
                <div className="text-lg font-bold text-orange-600">
                  ${results.dailyInterest.toFixed(2)}
                </div>
              </div>
            </div>
          )}

          {/* Step-by-Step Calculation */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">{t.stepByStep}</h4>
            <div className="space-y-2 text-sm">
              {getSteps().map((step, index) => (
                <div key={index} className="flex items-start">
                  <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.examples}</h4>
            <div className="text-xs text-indigo-700 space-y-1">
              <div>$1,000 at 5% for 2 years = $100 interest</div>
              <div>$5,000 at 4% for 1 year = $200 interest</div>
              <div>$10,000 at 6% for 6 months = $300 interest</div>
            </div>
          </div>

          {/* Key Explanations */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-red-900 mb-2">Key Concepts</h4>
            <div className="text-xs text-red-700 space-y-2">
              <div><strong>{t.principal}:</strong> {t.principalExplanation}</div>
              <div><strong>{t.interestRate}:</strong> {t.rateExplanation}</div>
              <div><strong>{t.timePeriod}:</strong> {t.timeExplanation}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
