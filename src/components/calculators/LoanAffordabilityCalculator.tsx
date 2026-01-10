'use client';

import { useState, useEffect } from 'react';

interface LoanAffordabilityCalculatorProps {
  lang?: string;
}

export default function LoanAffordabilityCalculator({ lang = 'en' }: LoanAffordabilityCalculatorProps) {
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [monthlyDebt, setMonthlyDebt] = useState(800);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTerm, setLoanTerm] = useState(5);
  const [downPayment, setDownPayment] = useState(0);
  const [showSteps, setShowSteps] = useState(false);

  const [results, setResults] = useState({
    loanAmount: 0,
    monthlyPayment: 0,
    dtiRatio: 0,
    maxDtiAmount: 0,
    totalCost: 0,
    totalInterest: 0
  });

  const [steps, setSteps] = useState<string[]>([]);

  const translations = {
    en: {
      title: "Loan Affordability Calculator",
      description: "Calculate how much loan you can afford based on income and debt",
      monthlyIncome: "Monthly Gross Income",
      monthlyDebt: "Monthly Debt Payments",
      interestRate: "Interest Rate (%)",
      loanTerm: "Loan Term (Years)",
      downPayment: "Down Payment Available",
      calculate: "Calculate Affordability",
      reset: "Reset Values",
      loanAmount: "Maximum Affordable Loan Amount",
      monthlyPayment: "Monthly Payment",
      dtiRatio: "Debt-to-Income Ratio",
      maxDtiAmount: "Max Recommended DTI (36%)",
      totalCost: "Total Loan Cost",
      totalInterest: "Total Interest Paid",
      showSteps: "Show Step-by-Step",
      stepByStep: "Step-by-Step Calculation",
      formula: "Formula",
      examples: "Examples",
      explanation: "Explanation",
      step: "Step",
      calculation: "Calculation",
      result: "Result",
      affordableRange: "Affordable Range",
      conservative: "Conservative (DTI ≤ 30%)",
      moderate: "Moderate (DTI ≤ 36%)",
      aggressive: "Aggressive (DTI ≤ 43%)",
      dtiGuidelines: "DTI Guidelines",
      excellentCredit: "Excellent Credit (740+)",
      goodCredit: "Good Credit (670-739)",
      fairCredit: "Fair Credit (580-669)",
      poorCredit: "Poor Credit (Below 580)"
    },
    es: {
      title: "Calculadora de Capacidad de Préstamo",
      description: "Calcula cuánto préstamo puedes permitirte basado en ingresos y deudas",
      monthlyIncome: "Ingresos Brutos Mensuales",
      monthlyDebt: "Pagos Mensuales de Deudas",
      interestRate: "Tasa de Interés (%)",
      loanTerm: "Plazo del Préstamo (Años)",
      downPayment: "Pago Inicial Disponible",
      calculate: "Calcular Capacidad",
      reset: "Reiniciar Valores",
      loanAmount: "Monto Máximo de Préstamo Asequible",
      monthlyPayment: "Pago Mensual",
      dtiRatio: "Relación Deuda-Ingreso",
      maxDtiAmount: "Máximo Recomendado DTI (36%)",
      totalCost: "Costo Total del Préstamo",
      totalInterest: "Total de Intereses Pagados",
      showSteps: "Mostrar Paso a Paso",
      stepByStep: "Cálculo Paso a Paso",
      formula: "Fórmula",
      examples: "Ejemplos",
      explanation: "Explicación",
      step: "Paso",
      calculation: "Cálculo",
      result: "Resultado",
      affordableRange: "Rango Asequible",
      conservative: "Conservador (DTI ≤ 30%)",
      moderate: "Moderado (DTI ≤ 36%)",
      aggressive: "Agresivo (DTI ≤ 43%)",
      dtiGuidelines: "Pautas DTI",
      excellentCredit: "Crédito Excelente (740+)",
      goodCredit: "Buen Crédito (670-739)",
      fairCredit: "Crédito Aceptable (580-669)",
      poorCredit: "Crédito Deficiente (Menor a 580)"
    },
    pt: {
      title: "Calculadora de Capacidade de Empréstimo",
      description: "Calcule quanto empréstimo você pode permitir baseado na renda e dívidas",
      monthlyIncome: "Renda Bruta Mensal",
      monthlyDebt: "Pagamentos Mensais de Dívidas",
      interestRate: "Taxa de Juros (%)",
      loanTerm: "Prazo do Empréstimo (Anos)",
      downPayment: "Entrada Disponível",
      calculate: "Calcular Capacidade",
      reset: "Reiniciar Valores",
      loanAmount: "Valor Máximo de Empréstimo Acessível",
      monthlyPayment: "Pagamento Mensal",
      dtiRatio: "Relação Dívida-Renda",
      maxDtiAmount: "Máximo Recomendado DTI (36%)",
      totalCost: "Custo Total do Empréstimo",
      totalInterest: "Total de Juros Pagos",
      showSteps: "Mostrar Passo a Passo",
      stepByStep: "Cálculo Passo a Passo",
      formula: "Fórmula",
      examples: "Exemplos",
      explanation: "Explicação",
      step: "Passo",
      calculation: "Cálculo",
      result: "Resultado",
      affordableRange: "Faixa Acessível",
      conservative: "Conservador (DTI ≤ 30%)",
      moderate: "Moderado (DTI ≤ 36%)",
      aggressive: "Agresivo (DTI ≤ 43%)",
      dtiGuidelines: "Diretrizes DTI",
      excellentCredit: "Crédito Excelente (740+)",
      goodCredit: "Bom Crédito (670-739)",
      fairCredit: "Crédito Aceitável (580-669)",
      poorCredit: "Crédito Ruim (Abaixo de 580)"
    },
    fr: {
      title: "Calculateur de Capacité d'Emprunt",
      description: "Calculez combien de prêt vous pouvez vous permettre basé sur les revenus et dettes",
      monthlyIncome: "Revenus Bruts Mensuels",
      monthlyDebt: "Paiements Mensuels de Dettes",
      interestRate: "Taux d'Intérêt (%)",
      loanTerm: "Durée d'Emprunt (Années)",
      downPayment: "Acompte Disponible",
      calculate: "Calculer Capacité",
      reset: "Réinitialiser Valeurs",
      loanAmount: "Montant Maximum d'Emprunt Abordable",
      monthlyPayment: "Paiement Mensuel",
      dtiRatio: "Ratio Dette-Revenus",
      maxDtiAmount: "Maximum Recommandé DTI (36%)",
      totalCost: "Coût Total d'Emprunt",
      totalInterest: "Total d'Intérêts Payés",
      showSteps: "Afficher Étape par Étape",
      stepByStep: "Calcul Étape par Étape",
      formula: "Formule",
      examples: "Exemples",
      explanation: "Explication",
      step: "Étape",
      calculation: "Calcul",
      result: "Résultat",
      affordableRange: "Fourchette Abordable",
      conservative: "Conservateur (DTI ≤ 30%)",
      moderate: "Modéré (DTI ≤ 36%)",
      aggressive: "Agressif (DTI ≤ 43%)",
      dtiGuidelines: "Directives DTI",
      excellentCredit: "Crédit Excellent (740+)",
      goodCredit: "Bon Crédit (670-739)",
      fairCredit: "Crédit Acceptable (580-669)",
      poorCredit: "Crédit Médiocre (Moins de 580)"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateLoanAffordability = () => {
    // Calculate maximum affordable monthly payment using DTI ratio (36% max)
    const maxDtiRatio = 0.36;
    const maxMonthlyPayment = (monthlyIncome * maxDtiRatio) - monthlyDebt;

    if (maxMonthlyPayment <= 0) {
      setResults({
        loanAmount: 0,
        monthlyPayment: 0,
        dtiRatio: (monthlyDebt / monthlyIncome) * 100,
        maxDtiAmount: maxMonthlyPayment,
        totalCost: 0,
        totalInterest: 0
      });
      return;
    }

    // Calculate loan amount that would produce this monthly payment
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    let loanAmount = 0;
    if (monthlyRate === 0) {
      loanAmount = maxMonthlyPayment * numPayments;
    } else {
      loanAmount = maxMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate;
    }

    // Adjust for down payment
    loanAmount += downPayment;

    // Calculate actual monthly payment for this loan amount
    const actualMonthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);

    // Calculate total cost and interest
    const totalCost = actualMonthlyPayment * numPayments;
    const totalInterest = totalCost - loanAmount;

    // Calculate actual DTI ratio
    const dtiRatio = ((monthlyDebt + actualMonthlyPayment) / monthlyIncome) * 100;

    setResults({
      loanAmount: Math.max(0, loanAmount),
      monthlyPayment: actualMonthlyPayment,
      dtiRatio,
      maxDtiAmount: maxMonthlyPayment,
      totalCost,
      totalInterest
    });

    // Generate steps if requested
    if (showSteps) {
      const stepsArray = [
        `${t.monthlyIncome}: $${monthlyIncome.toLocaleString()}`,
        `${t.monthlyDebt}: $${monthlyDebt.toLocaleString()}`,
        `Maximum DTI Ratio: 36%`,
        `Maximum Monthly Income for Debt: $${(monthlyIncome * maxDtiRatio).toFixed(2)}`,
        `Available for New Loan Payment: $${maxMonthlyPayment.toFixed(2)}`,
        `Loan Amount Calculation: $${loanAmount.toFixed(2)}`,
        `Monthly Payment: $${actualMonthlyPayment.toFixed(2)}`,
        `Total Cost: $${totalCost.toFixed(2)}`,
        `Total Interest: $${totalInterest.toFixed(2)}`,
        `Final DTI Ratio: ${dtiRatio.toFixed(1)}%`
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
    calculateLoanAffordability();
  }, [monthlyIncome, monthlyDebt, interestRate, loanTerm, downPayment, showSteps]);

  const resetCalculator = () => {
    setMonthlyIncome(5000);
    setMonthlyDebt(800);
    setInterestRate(10);
    setLoanTerm(5);
    setDownPayment(0);
    setShowSteps(false);
  };

  const getDtiColor = (dti: number) => {
    if (dti <= 30) return 'text-green-600';
    if (dti <= 36) return 'text-yellow-600';
    if (dti <= 43) return 'text-orange-600';
    return 'text-red-600';
  };

  const getDtiStatus = (dti: number) => {
    if (dti <= 30) return t.conservative;
    if (dti <= 36) return t.moderate;
    if (dti <= 43) return t.aggressive;
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.monthlyDebt}</label>
              <input
                type="number"
                value={monthlyDebt}
                onChange={(e) => setMonthlyDebt(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="50"
                min="0"
              />
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
                  max="50"
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
                  max="30"
                />
              </div>
            </div>

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
              onClick={calculateLoanAffordability}
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
              Max Payment = (Income × 36%) - Existing Debt<br/>
              Loan Amount = PMT × (1 - (1+r)^-n) / r
            </div>
            <div className="text-xs text-green-600 mt-2">
              • DTI = Debt-to-Income Ratio<br/>
              • Most lenders allow max 36% DTI<br/>
              • Lower DTI = Better approval chances
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">{t.loanAmount}</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                ${results.loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-gray-600">
                {t.monthlyPayment}: ${results.monthlyPayment.toFixed(2)}
              </div>
            </div>
          </div>

          {/* DTI Ratio Display */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-orange-900 mb-2">{t.dtiRatio}</h4>
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${getDtiColor(results.dtiRatio)}`}>
                {results.dtiRatio.toFixed(1)}%
              </div>
              <div className={`text-sm ${getDtiColor(results.dtiRatio)}`}>
                {getDtiStatus(results.dtiRatio)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">{t.totalCost}</h4>
              <div className="text-lg font-bold text-purple-600">
                ${results.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="bg-red-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-red-900 mb-1">{t.totalInterest}</h4>
              <div className="text-lg font-bold text-red-600">
                ${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          {/* DTI Guidelines */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">{t.dtiGuidelines}</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-green-700">{t.excellentCredit}</span>
                <span className="font-semibold">≤ 30%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">{t.goodCredit}</span>
                <span className="font-semibold">≤ 36%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-700">{t.fairCredit}</span>
                <span className="font-semibold">≤ 43%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-700">{t.poorCredit}</span>
                <span className="font-semibold">&gt; 43%</span>
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
              <div>$5,000 income + $800 debt = $18,000 max loan</div>
              <div>$8,000 income + $1,200 debt = $30,000 max loan</div>
              <div>$12,000 income + $2,500 debt = $43,000 max loan</div>
              <div>Higher down payment = Higher loan amount</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
