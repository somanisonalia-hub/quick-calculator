'use client';

import { useState, useEffect } from 'react';

interface HomeAffordabilityCalculatorProps {
  lang?: string;
}

export default function HomeAffordabilityCalculator({ lang = 'en' }: HomeAffordabilityCalculatorProps) {
  const [monthlyIncome, setMonthlyIncome] = useState(6000);
  const [monthlyDebt, setMonthlyDebt] = useState(500);
  const [downPayment, setDownPayment] = useState(60000);
  const [creditScore, setCreditScore] = useState(720);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [showSteps, setShowSteps] = useState(false);

  const [results, setResults] = useState({
    homePrice: 0,
    monthlyPayment: 0,
    loanAmount: 0,
    housingRatio: 0,
    monthlyPropertyTax: 0,
    monthlyInsurance: 0,
    totalMonthlyCost: 0
  });

  const [steps, setSteps] = useState<string[]>([]);

  const translations = {
    en: {
      title: "Home Affordability Calculator",
      description: "Calculate how much house you can afford based on income and FHA guidelines",
      monthlyIncome: "Monthly Gross Income",
      monthlyDebt: "Monthly Debt Payments",
      downPayment: "Down Payment Available",
      creditScore: "Credit Score",
      interestRate: "Interest Rate (%)",
      loanTerm: "Loan Term (Years)",
      propertyTaxRate: "Property Tax Rate (%)",
      homeInsurance: "Annual Home Insurance",
      calculate: "🔄 Recalculate",
      reset: "Reset Values",
      homePrice: "Maximum Affordable Home Price",
      monthlyPayment: "Monthly Principal & Interest",
      loanAmount: "Loan Amount",
      housingRatio: "Housing Cost Ratio",
      monthlyPropertyTax: "Monthly Property Tax",
      monthlyInsurance: "Monthly Insurance",
      totalMonthlyCost: "Total Monthly Cost (PITI)",
      showSteps: "Show Step-by-Step",
      stepByStep: "Step-by-Step Calculation",
      formula: "Formula",
      examples: "Examples",
      explanation: "Explanation",
      step: "Step",
      calculation: "Calculation",
      result: "Result",
      fhaGuidelines: "FHA Housing Guidelines",
      conventionalGuidelines: "Conventional Guidelines",
      housingBudget: "28% of income for housing (FHA)",
      fhaInsured: "FHA insured loans",
      conventional: "Conventional loans"
    },
    es: {
      title: "Calculadora de Capacidad para Casa",
      description: "Calcula cuánta casa puedes permitirte basado en ingresos y pautas FHA",
      monthlyIncome: "Ingresos Brutos Mensuales",
      monthlyDebt: "Pagos Mensuales de Deudas",
      downPayment: "Pago Inicial Disponible",
      creditScore: "Puntaje de Crédito",
      interestRate: "Tasa de Interés (%)",
      loanTerm: "Plazo del Préstamo (Años)",
      propertyTaxRate: "Tasa de Impuesto a la Propiedad (%)",
      homeInsurance: "Seguro Anual de Casa",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar Valores",
      homePrice: "Precio Máximo de Casa Asequible",
      monthlyPayment: "Pago Mensual Principal e Intereses",
      loanAmount: "Monto del Préstamo",
      housingRatio: "Relación de Costos de Vivienda",
      monthlyPropertyTax: "Impuesto Mensual a la Propiedad",
      monthlyInsurance: "Seguro Mensual",
      totalMonthlyCost: "Costo Mensual Total (PITI)",
      showSteps: "Mostrar Paso a Paso",
      stepByStep: "Cálculo Paso a Paso",
      formula: "Fórmula",
      examples: "Ejemplos",
      explanation: "Explicación",
      step: "Paso",
      calculation: "Cálculo",
      result: "Resultado",
      fhaGuidelines: "Pautas de Vivienda FHA",
      conventionalGuidelines: "Pautas Convencionales",
      housingBudget: "28% de ingresos para vivienda (FHA)",
      fhaInsured: "Préstamos asegurados FHA",
      conventional: "Préstamos convencionales"
    },
    pt: {
      title: "Calculadora de Capacidade para Casa",
      description: "Calcule quanto casa você pode permitir baseado na renda e diretrizes FHA",
      monthlyIncome: "Renda Bruta Mensal",
      monthlyDebt: "Pagamentos Mensais de Dívidas",
      downPayment: "Entrada Disponível",
      creditScore: "Score de Crédito",
      interestRate: "Taxa de Juros (%)",
      loanTerm: "Prazo do Empréstimo (Anos)",
      propertyTaxRate: "Taxa de Imposto Predial (%)",
      homeInsurance: "Seguro Residencial Anual",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar Valores",
      homePrice: "Preço Máximo de Casa Acessível",
      monthlyPayment: "Pagamento Mensal Principal e Juros",
      loanAmount: "Valor do Empréstimo",
      housingRatio: "Relação de Custos de Moradia",
      monthlyPropertyTax: "Imposto Predial Mensal",
      monthlyInsurance: "Seguro Mensal",
      totalMonthlyCost: "Custo Mensal Total (PITI)",
      showSteps: "Mostrar Passo a Passo",
      stepByStep: "Cálculo Passo a Passo",
      formula: "Fórmula",
      examples: "Exemplos",
      explanation: "Explicação",
      step: "Passo",
      calculation: "Cálculo",
      result: "Resultado",
      fhaGuidelines: "Diretrizes de Moradia FHA",
      conventionalGuidelines: "Diretrizes Convencionais",
      housingBudget: "28% da renda para moradia (FHA)",
      fhaInsured: "Empréstimos segurados FHA",
      conventional: "Empréstimos convencionais"
    },
    fr: {
      title: "Calculateur de Capacité d'Achat Immobilier",
      description: "Calculez combien de maison vous pouvez vous permettre basé sur les revenus et directives FHA",
      monthlyIncome: "Revenus Bruts Mensuels",
      monthlyDebt: "Paiements Mensuels de Dettes",
      downPayment: "Acompte Disponible",
      creditScore: "Score de Crédit",
      interestRate: "Taux d'Intérêt (%)",
      loanTerm: "Durée d'Emprunt (Années)",
      propertyTaxRate: "Taux d'Impôt Foncier (%)",
      homeInsurance: "Assurance Habitation Annuelle",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser Valeurs",
      homePrice: "Prix Maximum de Maison Abordable",
      monthlyPayment: "Paiement Mensuel Principal et Intérêts",
      loanAmount: "Montant d'Emprunt",
      housingRatio: "Ratio des Coûts d'Habitation",
      monthlyPropertyTax: "Impôt Foncier Mensuel",
      monthlyInsurance: "Assurance Mensuelle",
      totalMonthlyCost: "Coût Mensuel Total (PITI)",
      showSteps: "Afficher Étape par Étape",
      stepByStep: "Calcul Étape par Étape",
      formula: "Formule",
      examples: "Exemples",
      explanation: "Explication",
      step: "Étape",
      calculation: "Calcul",
      result: "Résultat",
      fhaGuidelines: "Directives d'Habitation FHA",
      conventionalGuidelines: "Directives Conventionnelles",
      housingBudget: "28% des revenus pour l'habitation (FHA)",
      fhaInsured: "Emprunts assurés FHA",
      conventional: "Emprunts conventionnels"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateHomeAffordability = () => {
    // FHA guideline: Housing costs should not exceed 28% of gross monthly income
    const maxHousingRatio = 0.28;
    const maxHousingBudget = monthlyIncome * maxHousingRatio;

    // Subtract existing debt to get available housing budget
    const availableHousingBudget = Math.max(0, maxHousingBudget - monthlyDebt);

    if (availableHousingBudget <= 0) {
      setResults({
        homePrice: downPayment,
        monthlyPayment: 0,
        loanAmount: 0,
        housingRatio: (monthlyDebt / monthlyIncome) * 100,
        monthlyPropertyTax: 0,
        monthlyInsurance: homeInsurance / 12,
        totalMonthlyCost: monthlyDebt + (homeInsurance / 12)
      });
      return;
    }

    // Calculate estimated annual property tax and insurance
    const estimatedAnnualTax = 0; // Will be calculated based on home price
    const annualInsurance = homeInsurance;
    const annualPITI = (availableHousingBudget * 12) - estimatedAnnualTax - annualInsurance;

    // Estimate home price that would produce this PITI
    // We need to solve for home price where: PITI = P&I + Taxes + Insurance
    // This is iterative since taxes depend on home price

    let estimatedHomePrice = availableHousingBudget * 12 * 8; // Rough starting estimate
    let iterations = 0;
    const maxIterations = 20;

    while (iterations < maxIterations) {
      const loanAmount = Math.max(0, estimatedHomePrice - downPayment);
      const monthlyPI = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);

      // Calculate taxes and insurance based on estimated home price
      const annualTax = (estimatedHomePrice * propertyTaxRate) / 100;
      const monthlyTax = annualTax / 12;
      const monthlyInsurance = annualInsurance / 12;

      const totalMonthlyPITI = monthlyPI + monthlyTax + monthlyInsurance;

      // Check if we're within budget
      if (Math.abs(totalMonthlyPITI - availableHousingBudget) < 1) {
        break; // Close enough
      }

      // Adjust estimate
      if (totalMonthlyPITI > availableHousingBudget) {
        estimatedHomePrice *= 0.95; // Reduce estimate
      } else {
        estimatedHomePrice *= 1.05; // Increase estimate
      }

      iterations++;
    }

    const finalLoanAmount = Math.max(0, estimatedHomePrice - downPayment);
    const finalMonthlyPI = calculateMonthlyPayment(finalLoanAmount, interestRate, loanTerm);
    const finalAnnualTax = (estimatedHomePrice * propertyTaxRate) / 100;
    const finalMonthlyTax = finalAnnualTax / 12;
    const finalMonthlyInsurance = annualInsurance / 12;
    const finalTotalMonthly = finalMonthlyPI + finalMonthlyTax + finalMonthlyInsurance;
    const housingRatio = (finalTotalMonthly / monthlyIncome) * 100;

    setResults({
      homePrice: Math.max(0, estimatedHomePrice),
      monthlyPayment: finalMonthlyPI,
      loanAmount: finalLoanAmount,
      housingRatio,
      monthlyPropertyTax: finalMonthlyTax,
      monthlyInsurance: finalMonthlyInsurance,
      totalMonthlyCost: finalTotalMonthly
    });

    // Generate steps if requested
    if (showSteps) {
      const stepsArray = [
        `${t.monthlyIncome}: $${monthlyIncome.toLocaleString()}`,
        `${t.monthlyDebt}: $${monthlyDebt.toLocaleString()}`,
        `FHA Housing Budget (28% of income): $${maxHousingBudget.toFixed(2)}`,
        `Available Housing Budget: $${availableHousingBudget.toFixed(2)}`,
        `Property Tax Rate: ${propertyTaxRate}%`,
        `Annual Insurance: $${homeInsurance.toLocaleString()}`,
        `Estimated Home Price: $${estimatedHomePrice.toFixed(2)}`,
        `Loan Amount: $${finalLoanAmount.toFixed(2)}`,
        `Monthly P&I: $${finalMonthlyPI.toFixed(2)}`,
        `Monthly Taxes: $${finalMonthlyTax.toFixed(2)}`,
        `Monthly Insurance: $${finalMonthlyInsurance.toFixed(2)}`,
        `Total Monthly PITI: $${finalTotalMonthly.toFixed(2)}`,
        `Housing Ratio: ${housingRatio.toFixed(1)}%`
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
    calculateHomeAffordability();
  }, [monthlyIncome, monthlyDebt, downPayment, creditScore, interestRate, loanTerm, propertyTaxRate, homeInsurance, showSteps]);

  const resetCalculator = () => {
    setMonthlyIncome(6000);
    setMonthlyDebt(500);
    setDownPayment(60000);
    setCreditScore(720);
    setInterestRate(6.5);
    setLoanTerm(30);
    setPropertyTaxRate(1.2);
    setHomeInsurance(1200);
    setShowSteps(false);
  };

  const getHousingColor = (ratio: number) => {
    if (ratio <= 28) return 'text-green-600';
    if (ratio <= 33) return 'text-yellow-600';
    if (ratio <= 36) return 'text-orange-600';
    return 'text-red-600';
  };

  const getHousingStatus = (ratio: number) => {
    if (ratio <= 28) return 'FHA Approved';
    if (ratio <= 33) return 'Conventional OK';
    if (ratio <= 36) return 'High Risk';
    return 'Not Recommended';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 hidden">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.downPayment}</label>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="1000"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.creditScore}</label>
                <input
                  type="number"
                  value={creditScore}
                  onChange={(e) => setCreditScore(Number(e.target.value) || 720)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="10"
                  min="300"
                  max="850"
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
                  step="0.125"
                  min="0"
                  max="15"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.loanTerm}</label>
                <input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value) || 30)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="5"
                  min="10"
                  max="30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.propertyTaxRate}</label>
                <input
                  type="number"
                  value={propertyTaxRate}
                  onChange={(e) => setPropertyTaxRate(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.1"
                  min="0"
                  max="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.homeInsurance}</label>
                <input
                  type="number"
                  value={homeInsurance}
                  onChange={(e) => setHomeInsurance(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="100"
                  min="0"
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
              onClick={calculateHomeAffordability}
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
              Housing Budget = Income × 28%<br/>
              Available = Housing Budget - Existing Debt<br/>
              PITI = Principal + Interest + Taxes + Insurance
            </div>
            <div className="text-xs text-green-600 mt-2">
              • FHA guideline: Housing costs ≤ 28% of income<br/>
              • PITI includes all housing expenses<br/>
              • Taxes and insurance vary by location
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">{t.homePrice}</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                ${results.homePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-gray-600">
                {t.totalMonthlyCost}: ${results.totalMonthlyCost.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Housing Ratio Display */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-orange-900 mb-2">{t.housingRatio}</h4>
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${getHousingColor(results.housingRatio)}`}>
                {results.housingRatio.toFixed(1)}%
              </div>
              <div className={`text-sm ${getHousingColor(results.housingRatio)}`}>
                {getHousingStatus(results.housingRatio)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">{t.monthlyPayment}</h4>
              <div className="text-lg font-bold text-purple-600">
                ${results.monthlyPayment.toFixed(2)}
              </div>
            </div>

            <div className="bg-indigo-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-indigo-900 mb-1">{t.loanAmount}</h4>
              <div className="text-lg font-bold text-indigo-600">
                ${results.loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-red-900 mb-1">{t.monthlyPropertyTax}</h4>
              <div className="text-lg font-bold text-red-600">
                ${results.monthlyPropertyTax.toFixed(2)}
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-yellow-900 mb-1">{t.monthlyInsurance}</h4>
              <div className="text-lg font-bold text-yellow-600">
                ${results.monthlyInsurance.toFixed(2)}
              </div>
            </div>
          </div>

          {/* FHA Guidelines */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">{t.fhaGuidelines}</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-green-700">{t.housingBudget}</span>
                <span className="font-semibold">≤ 28%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Conventional loans</span>
                <span className="font-semibold">≤ 33%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-700">Maximum recommended</span>
                <span className="font-semibold">≤ 36%</span>
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
              <div>$6,000 income + $500 debt = $375,000 max home</div>
              <div>$15,000 income + $800 debt = $1,100,000 max home</div>
              <div>Higher down payment = Higher affordable home price</div>
              <div>Include taxes and insurance in total housing cost</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
