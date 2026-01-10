'use client';

import { useState, useEffect } from 'react';

interface CarAffordabilityCalculatorProps {
  lang?: string;
}

export default function CarAffordabilityCalculator({ lang = 'en' }: CarAffordabilityCalculatorProps) {
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [currentCarPayment, setCurrentCarPayment] = useState(400);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeInValue, setTradeInValue] = useState(3000);
  const [interestRate, setInterestRate] = useState(6);
  const [loanTerm, setLoanTerm] = useState(5);
  const [showSteps, setShowSteps] = useState(false);

  const [results, setResults] = useState({
    carPrice: 0,
    monthlyPayment: 0,
    loanAmount: 0,
    transportationRatio: 0,
    totalCost: 0,
    totalInterest: 0
  });

  const [steps, setSteps] = useState<string[]>([]);

  const translations = {
    en: {
      title: "Car Affordability Calculator",
      description: "Calculate how much car you can afford based on income and transportation costs",
      monthlyIncome: "Monthly Gross Income",
      currentCarPayment: "Current Monthly Car Payment",
      downPayment: "Down Payment Available",
      tradeInValue: "Trade-in Value",
      interestRate: "Interest Rate (%)",
      loanTerm: "Loan Term (Years)",
      calculate: "Calculate Affordability",
      reset: "Reset Values",
      carPrice: "Maximum Affordable Car Price",
      monthlyPayment: "Monthly Car Payment",
      loanAmount: "Loan Amount",
      transportationRatio: "Transportation Cost Ratio",
      totalCost: "Total Cost of Ownership",
      totalInterest: "Total Interest Paid",
      showSteps: "Show Step-by-Step",
      stepByStep: "Step-by-Step Calculation",
      formula: "Formula",
      examples: "Examples",
      explanation: "Explanation",
      step: "Step",
      calculation: "Calculation",
      result: "Result",
      affordableRange: "Transportation Cost Guidelines",
      conservative: "Conservative (10% of income)",
      moderate: "Moderate (12.5% of income)",
      aggressive: "Aggressive (15% of income)",
      transportationGuidelines: "Transportation Guidelines",
      recommended: "Recommended for most buyers",
      maximum: "Maximum for car buyers"
    },
    es: {
      title: "Calculadora de Capacidad para Auto",
      description: "Calcula cuánto auto puedes permitirte basado en ingresos y costos de transporte",
      monthlyIncome: "Ingresos Brutos Mensuales",
      currentCarPayment: "Pago Mensual Actual de Auto",
      downPayment: "Pago Inicial Disponible",
      tradeInValue: "Valor de Intercambio",
      interestRate: "Tasa de Interés (%)",
      loanTerm: "Plazo del Préstamo (Años)",
      calculate: "Calcular Capacidad",
      reset: "Reiniciar Valores",
      carPrice: "Precio Máximo de Auto Asequible",
      monthlyPayment: "Pago Mensual de Auto",
      loanAmount: "Monto del Préstamo",
      transportationRatio: "Relación de Costos de Transporte",
      totalCost: "Costo Total de Propiedad",
      totalInterest: "Total de Intereses Pagados",
      showSteps: "Mostrar Paso a Paso",
      stepByStep: "Cálculo Paso a Paso",
      formula: "Fórmula",
      examples: "Ejemplos",
      explanation: "Explicación",
      step: "Paso",
      calculation: "Cálculo",
      result: "Resultado",
      affordableRange: "Pautas de Costos de Transporte",
      conservative: "Conservador (10% de ingresos)",
      moderate: "Moderado (12.5% de ingresos)",
      aggressive: "Agresivo (15% de ingresos)",
      transportationGuidelines: "Pautas de Transporte",
      recommended: "Recomendado para la mayoría de compradores",
      maximum: "Máximo para compradores de auto"
    },
    pt: {
      title: "Calculadora de Capacidade para Carro",
      description: "Calcule quanto carro você pode permitir baseado na renda e custos de transporte",
      monthlyIncome: "Renda Bruta Mensal",
      currentCarPayment: "Pagamento Mensal Atual de Carro",
      downPayment: "Entrada Disponível",
      tradeInValue: "Valor de Troca",
      interestRate: "Taxa de Juros (%)",
      loanTerm: "Prazo do Empréstimo (Anos)",
      calculate: "Calcular Capacidade",
      reset: "Reiniciar Valores",
      carPrice: "Preço Máximo de Carro Acessível",
      monthlyPayment: "Pagamento Mensal de Carro",
      loanAmount: "Valor do Empréstimo",
      transportationRatio: "Relação de Custos de Transporte",
      totalCost: "Custo Total de Propriedade",
      totalInterest: "Total de Juros Pagos",
      showSteps: "Mostrar Passo a Passo",
      stepByStep: "Cálculo Passo a Passo",
      formula: "Fórmula",
      examples: "Exemplos",
      explanation: "Explicação",
      step: "Passo",
      calculation: "Cálculo",
      result: "Resultado",
      affordableRange: "Diretrizes de Custos de Transporte",
      conservative: "Conservador (10% da renda)",
      moderate: "Moderado (12.5% da renda)",
      aggressive: "Agressivo (15% da renda)",
      transportationGuidelines: "Diretrizes de Transporte",
      recommended: "Recomendado para a maioria dos compradores",
      maximum: "Máximo para compradores de carro"
    },
    fr: {
      title: "Calculateur de Capacité d'Achat Auto",
      description: "Calculez combien de voiture vous pouvez vous permettre basé sur les revenus et coûts de transport",
      monthlyIncome: "Revenus Bruts Mensuels",
      currentCarPayment: "Paiement Mensuel Actuel de Voiture",
      downPayment: "Acompte Disponible",
      tradeInValue: "Valeur de Reprise",
      interestRate: "Taux d'Intérêt (%)",
      loanTerm: "Durée d'Emprunt (Années)",
      calculate: "Calculer Capacité",
      reset: "Réinitialiser Valeurs",
      carPrice: "Prix Maximum de Voiture Abordable",
      monthlyPayment: "Paiement Mensuel de Voiture",
      loanAmount: "Montant d'Emprunt",
      transportationRatio: "Ratio des Coûts de Transport",
      totalCost: "Coût Total de Propriété",
      totalInterest: "Total d'Intérêts Payés",
      showSteps: "Afficher Étape par Étape",
      stepByStep: "Calcul Étape par Étape",
      formula: "Formule",
      examples: "Exemples",
      explanation: "Explication",
      step: "Étape",
      calculation: "Calcul",
      result: "Résultat",
      affordableRange: "Directives des Coûts de Transport",
      conservative: "Conservateur (10% des revenus)",
      moderate: "Modéré (12.5% des revenus)",
      aggressive: "Agressif (15% des revenus)",
      transportationGuidelines: "Directives de Transport",
      recommended: "Recommandé pour la plupart des acheteurs",
      maximum: "Maximum pour acheteurs de voiture"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateCarAffordability = () => {
    // Calculate transportation budget using 10-15% of income guideline
    const maxTransportationRatio = 0.125; // 12.5% conservative approach
    const maxTransportationBudget = monthlyIncome * maxTransportationRatio;

    // Subtract current car payment to get available budget for new car
    const availableBudget = Math.max(0, maxTransportationBudget - currentCarPayment);

    if (availableBudget <= 0) {
      setResults({
        carPrice: downPayment + tradeInValue,
        monthlyPayment: 0,
        loanAmount: 0,
        transportationRatio: (currentCarPayment / monthlyIncome) * 100,
        totalCost: downPayment + tradeInValue,
        totalInterest: 0
      });
      return;
    }

    // Calculate maximum loan amount that would produce the available monthly payment
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    let maxLoanAmount = 0;
    if (monthlyRate === 0) {
      maxLoanAmount = availableBudget * numPayments;
    } else {
      maxLoanAmount = availableBudget * (1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate;
    }

    // Calculate total car price
    const carPrice = downPayment + tradeInValue + maxLoanAmount;

    // Calculate actual monthly payment for this loan amount
    const actualMonthlyPayment = calculateMonthlyPayment(maxLoanAmount, interestRate, loanTerm);

    // Calculate total cost and interest
    const totalCost = (actualMonthlyPayment * numPayments) + downPayment + tradeInValue;
    const totalInterest = (actualMonthlyPayment * numPayments) - maxLoanAmount;

    // Calculate transportation ratio
    const transportationRatio = ((currentCarPayment + actualMonthlyPayment) / monthlyIncome) * 100;

    setResults({
      carPrice: Math.max(0, carPrice),
      monthlyPayment: actualMonthlyPayment,
      loanAmount: Math.max(0, maxLoanAmount),
      transportationRatio,
      totalCost,
      totalInterest
    });

    // Generate steps if requested
    if (showSteps) {
      const stepsArray = [
        `${t.monthlyIncome}: $${monthlyIncome.toLocaleString()}`,
        `${t.currentCarPayment}: $${currentCarPayment.toLocaleString()}`,
        `Max Transportation Budget (12.5% of income): $${maxTransportationBudget.toFixed(2)}`,
        `Available Budget (after current payment): $${availableBudget.toFixed(2)}`,
        `Loan Amount Calculation: $${maxLoanAmount.toFixed(2)}`,
        `${t.downPayment}: $${downPayment.toLocaleString()}`,
        `${t.tradeInValue}: $${tradeInValue.toLocaleString()}`,
        `Total Car Price: $${carPrice.toFixed(2)}`,
        `Monthly Payment: $${actualMonthlyPayment.toFixed(2)}`,
        `Total Cost: $${totalCost.toFixed(2)}`,
        `Total Interest: $${totalInterest.toFixed(2)}`,
        `Transportation Ratio: ${transportationRatio.toFixed(1)}%`
      ];
      setSteps(stepsArray);
    }
  };

  const calculateMonthlyPayment = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;

    if (monthlyRate === 0) {
      return principal / numPayments;
    }

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  useEffect(() => {
    calculateCarAffordability();
  }, [monthlyIncome, currentCarPayment, downPayment, tradeInValue, interestRate, loanTerm, showSteps]);

  const resetCalculator = () => {
    setMonthlyIncome(5000);
    setCurrentCarPayment(400);
    setDownPayment(5000);
    setTradeInValue(3000);
    setInterestRate(6);
    setLoanTerm(5);
    setShowSteps(false);
  };

  const getTransportationColor = (ratio: number) => {
    if (ratio <= 10) return 'text-green-600';
    if (ratio <= 12.5) return 'text-blue-600';
    if (ratio <= 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTransportationStatus = (ratio: number) => {
    if (ratio <= 10) return t.conservative;
    if (ratio <= 12.5) return t.moderate;
    if (ratio <= 15) return t.aggressive;
    return 'High Risk';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.monthlyIncome}</label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="100"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.currentCarPayment}</label>
              <input
                type="number"
                value={currentCarPayment}
                onChange={(e) => setCurrentCarPayment(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="50"
                min="0"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.downPayment}</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.tradeInValue}</label>
                <input
                  type="number"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="500"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.interestRate}</label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.25"
                  min="0"
                  max="20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanTerm}</label>
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="1"
                  min="1"
                  max="8"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showSteps"
              checked={showSteps}
              onChange={(e) => setShowSteps(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showSteps" className="text-sm text-gray-700">{t.showSteps}</label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateCarAffordability}
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
              Max Payment = Income × 12.5%<br/>
              Available = Max Payment - Current Payment<br/>
              Car Price = Down Payment + Trade-in + Loan Amount
            </div>
            <div className="text-xs text-green-600 mt-2">
              • Transportation costs should be 10-15% of income<br/>
              • Includes car payment, insurance, gas, maintenance<br/>
              • Conservative approach uses 12.5% guideline
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">{t.carPrice}</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                ${results.carPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-gray-600">
                {t.monthlyPayment}: ${results.monthlyPayment.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Transportation Ratio Display */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-orange-900 mb-2">{t.transportationRatio}</h4>
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${getTransportationColor(results.transportationRatio)}`}>
                {results.transportationRatio.toFixed(1)}%
              </div>
              <div className={`text-sm ${getTransportationColor(results.transportationRatio)}`}>
                {getTransportationStatus(results.transportationRatio)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">{t.loanAmount}</h4>
              <div className="text-lg font-bold text-purple-600">
                ${results.loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="bg-red-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-red-900 mb-1">{t.totalCost}</h4>
              <div className="text-lg font-bold text-red-600">
                ${results.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          {/* Transportation Guidelines */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">{t.transportationGuidelines}</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-green-700">{t.conservative}</span>
                <span className="font-semibold">≤ 10%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">{t.moderate} ({t.recommended})</span>
                <span className="font-semibold">≤ 12.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-700">{t.aggressive} ({t.maximum})</span>
                <span className="font-semibold">≤ 15%</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Calculation */}
          {showSteps && steps.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">{t.stepByStep}</h4>
              <div className="space-y-2 text-sm">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Examples */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.examples}</h4>
            <div className="text-xs text-indigo-700 space-y-1">
              <div>$5,000 income + $400 current payment = $32,000 max car</div>
              <div>$8,000 income + $600 current payment = $45,000 max car</div>
              <div>$3,000 down payment + $15,000 trade-in = $18,000 equity</div>
              <div>Higher down payment = Higher affordable car price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
