'use client';

import { useState, useEffect } from 'react';

interface RentVsBuyCalculatorProps {
  lang?: string;
}

export default function RentVsBuyCalculator({ lang = 'en' }: RentVsBuyCalculatorProps) {
  const [homePrice, setHomePrice] = useState(300000);
  const [monthlyRent, setMonthlyRent] = useState(1500);
  const [downPayment, setDownPayment] = useState(60000);
  const [mortgageRate, setMortgageRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [yearsToConsider, setYearsToConsider] = useState(7);
  const [homeAppreciation, setHomeAppreciation] = useState(3);

  const [results, setResults] = useState({
    monthlyMortgage: 0,
    totalMonthlyCost: 0,
    totalRentCost: 0,
    homeValue: 0,
    equity: 0,
    costDifference: 0,
    betterOption: 'neutral' as 'rent' | 'buy' | 'neutral'
  });

  const translations = {
    en: {
      title: "Rent vs Buy Calculator",
      description: "Compare the financial impact of renting vs buying a home",
      homePrice: "Home Price ($)",
      monthlyRent: "Monthly Rent ($)",
      downPayment: "Down Payment ($)",
      mortgageRate: "Mortgage Interest Rate (%)",
      loanTerm: "Loan Term (years)",
      yearsToConsider: "Years to Consider",
      homeAppreciation: "Annual Home Appreciation (%)",
      results: "Rent vs Buy Comparison",
      monthlyMortgage: "Monthly Mortgage Payment",
      totalMonthlyCost: "Total Monthly Cost (30 years)",
      totalRentCost: "Total Rent Cost",
      homeValue: "Home Value After",
      equity: "Your Equity",
      costDifference: "Cost Difference",
      betterOption: "Better Option",
      reset: "Reset"
    },
    es: {
      title: "Calculadora Alquilar vs Comprar",
      description: "Compara el impacto financiero de alquilar vs comprar una casa",
      homePrice: "Precio de la Casa ($)",
      monthlyRent: "Alquiler Mensual ($)",
      downPayment: "Pago Inicial ($)",
      mortgageRate: "Tasa de Hipoteca (%)",
      loanTerm: "Plazo del Préstamo (años)",
      yearsToConsider: "Años a Considerar",
      homeAppreciation: "Apreciación Anual de la Casa (%)",
      results: "Comparación Alquilar vs Comprar",
      monthlyMortgage: "Pago Hipotecario Mensual",
      totalMonthlyCost: "Costo Mensual Total (30 años)",
      totalRentCost: "Costo Total del Alquiler",
      homeValue: "Valor de la Casa Después",
      equity: "Tu Patrimonio",
      costDifference: "Diferencia de Costo",
      betterOption: "Mejor Opción",
      reset: "Reiniciar"
    },
    pt: {
      title: "Calculadora Alquilar vs Comprar",
      description: "Compare o impacto financeiro de alugar vs comprar uma casa",
      homePrice: "Preço da Casa ($)",
      monthlyRent: "Aluguel Mensal ($)",
      downPayment: "Entrada ($)",
      mortgageRate: "Taxa de Hipoteca (%)",
      loanTerm: "Prazo do Empréstimo (anos)",
      yearsToConsider: "Anos a Considerar",
      homeAppreciation: "Apreciação Anual da Casa (%)",
      results: "Comparação Alquilar vs Comprar",
      monthlyMortgage: "Pagamento da Hipoteca Mensal",
      totalMonthlyCost: "Custo Mensal Total (30 anos)",
      totalRentCost: "Custo Total do Aluguel",
      homeValue: "Valor da Casa Depois",
      equity: "Seu Patrimônio",
      costDifference: "Diferença de Custo",
      betterOption: "Melhor Opção",
      reset: "Reiniciar"
    },
    fr: {
      title: "Calculateur Location vs Achat",
      description: "Comparez l'impact financier de la location vs l'achat d'une maison",
      homePrice: "Prix de la Maison ($)",
      monthlyRent: "Loyer Mensuel ($)",
      downPayment: "Mise de Fonds ($)",
      mortgageRate: "Taux d'Hypothèque (%)",
      loanTerm: "Durée du Prêt (années)",
      yearsToConsider: "Années à Envisager",
      homeAppreciation: "Appréciation Annuelle de la Maison (%)",
      results: "Comparaison Location vs Achat",
      monthlyMortgage: "Paiement Hypothécaire Mensuel",
      totalMonthlyCost: "Coût Mensuel Total (30 ans)",
      totalRentCost: "Coût Total du Loyer",
      homeValue: "Valeur de la Maison Après",
      equity: "Votre Patrimoine",
      costDifference: "Différence de Coût",
      betterOption: "Meilleure Option",
      reset: "Réinitialiser"
    },
    de: {
      title: "Miete vs Kauf Rechner",
      description: "Vergleichen Sie die finanzielle Auswirkung von Miete vs Kauf eines Hauses",
      homePrice: "Hauspreis ($)",
      monthlyRent: "Monatliche Miete ($)",
      downPayment: "Anzahlung ($)",
      mortgageRate: "Hypothekenzinssatz (%)",
      loanTerm: "Darlehenslaufzeit (Jahre)",
      yearsToConsider: "Jahre zum Berücksichtigen",
      homeAppreciation: "Jährliche Hauswertsteigerung (%)",
      results: "Miete vs Kauf Vergleich",
      monthlyMortgage: "Monatliche Hypothekarzahlung",
      totalMonthlyCost: "Gesamtmonatskosten (30 Jahre)",
      totalRentCost: "Gesamtmietkosten",
      homeValue: "Hauswert Danach",
      equity: "Ihr Eigenkapital",
      costDifference: "Kostendifferenz",
      betterOption: "Bessere Option",
      reset: "Zurücksetzen"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateComparison = () => {
    // Calculate mortgage payment
    const monthlyRate = mortgageRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const loanAmount = homePrice - downPayment;

    let monthlyMortgage = 0;
    if (monthlyRate === 0) {
      monthlyMortgage = loanAmount / numberOfPayments;
    } else {
      monthlyMortgage =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    // Calculate costs over the period
    const rentMonths = yearsToConsider * 12;
    const buyMonths = yearsToConsider * 12;

    // Total rent cost
    const totalRentCost = monthlyRent * rentMonths;

    // Total mortgage and property tax, maintenance (estimate 1.5% of home price annually)
    const annualMaintenance = homePrice * 0.015;
    const monthlyMaintenance = annualMaintenance / 12;
    const propertyTaxPerMonth = (homePrice * 0.011) / 12; // ~1.1% average property tax
    const totalMonthlyCost = (monthlyMortgage + monthlyMaintenance + propertyTaxPerMonth) * buyMonths;

    // Home appreciation
    const homeValue = homePrice * Math.pow(1 + homeAppreciation / 100, yearsToConsider);

    // Calculate equity (remaining balance approximation)
    let remainingBalance = loanAmount;
    for (let i = 0; i < buyMonths; i++) {
      remainingBalance = remainingBalance * (1 + monthlyRate) - monthlyMortgage;
    }
    remainingBalance = Math.max(0, remainingBalance);
    const equity = homeValue - remainingBalance;

    // Determine better option
    let betterOption: 'rent' | 'buy' | 'neutral' = 'neutral';
    if (totalRentCost < totalMonthlyCost - equity) {
      betterOption = 'rent';
    } else if (equity > 0 && (totalMonthlyCost - equity) < totalRentCost) {
      betterOption = 'buy';
    }

    setResults({
      monthlyMortgage,
      totalMonthlyCost,
      totalRentCost,
      homeValue,
      equity: Math.max(0, equity),
      costDifference: Math.abs(totalRentCost - (totalMonthlyCost - equity)),
      betterOption
    });
  };

  const resetCalculator = () => {
    setHomePrice(300000);
    setMonthlyRent(1500);
    setDownPayment(60000);
    setMortgageRate(6.5);
    setLoanTerm(30);
    setYearsToConsider(7);
    setHomeAppreciation(3);
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateComparison();
  }, [homePrice, monthlyRent, downPayment, mortgageRate, loanTerm, yearsToConsider, homeAppreciation]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getBetterOptionColor = () => {
    if (results.betterOption === 'buy') return 'text-green-600';
    if (results.betterOption === 'rent') return 'text-blue-600';
    return 'text-gray-600';
  };

  const getBetterOptionText = () => {
    if (results.betterOption === 'buy') return lang === 'en' ? 'Buying is Better' : lang === 'es' ? 'Comprar es Mejor' : lang === 'pt' ? 'Comprar é Melhor' : lang === 'fr' ? 'L\'Achat Est Meilleur' : 'Kauf ist Besser';
    if (results.betterOption === 'rent') return lang === 'en' ? 'Renting is Better' : lang === 'es' ? 'Alquilar es Mejor' : lang === 'pt' ? 'Alugar é Melhor' : lang === 'fr' ? 'La Location Est Meilleure' : 'Miete ist Besser';
    return lang === 'en' ? 'Very Close' : lang === 'es' ? 'Muy Cerca' : lang === 'pt' ? 'Muito Próximo' : lang === 'fr' ? 'Très Proche' : 'Sehr Nah';
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.homePrice}
            </label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(parseFloat(e.target.value) || 0)}
              min="50000"
              step="10000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.monthlyRent}
            </label>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(parseFloat(e.target.value) || 0)}
              min="100"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.downPayment}
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
              min="0"
              step="5000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.mortgageRate}
            </label>
            <input
              type="number"
              value={mortgageRate}
              onChange={(e) => setMortgageRate(parseFloat(e.target.value) || 0)}
              min="0"
              max="15"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.yearsToConsider}
            </label>
            <input
              type="number"
              value={yearsToConsider}
              onChange={(e) => setYearsToConsider(parseFloat(e.target.value) || 1)}
              min="1"
              max="50"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.homeAppreciation}
            </label>
            <input
              type="number"
              value={homeAppreciation}
              onChange={(e) => setHomeAppreciation(parseFloat(e.target.value) || 0)}
              min="0"
              max="10"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Auto-calculation note */}
        <div className="pt-2 text-xs text-blue-600 text-center font-medium">
          📊 Calculations update automatically
        </div>

        {/* Buttons */}
        <div className="pt-3 flex gap-4">
          <button
            onClick={resetCalculator}
            className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
          >
            {t.reset}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">{t.results}</h2>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center mb-4">
          <p className="text-sm text-gray-600 mb-2">{t.betterOption}</p>
          <p className={`text-3xl font-bold ${getBetterOptionColor()}`}>
            {getBetterOptionText()}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {lang === 'en' ? 'Save' : lang === 'es' ? 'Ahorrar' : lang === 'pt' ? 'Economizar' : lang === 'fr' ? 'Économiser' : 'Sparen'} {formatCurrency(results.costDifference)} {lang === 'en' ? 'over' : lang === 'es' ? 'durante' : lang === 'pt' ? 'por' : lang === 'fr' ? 'sur' : 'über'} {yearsToConsider} {lang === 'en' ? 'years' : lang === 'es' ? 'años' : lang === 'pt' ? 'anos' : lang === 'fr' ? 'ans' : 'Jahre'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.monthlyMortgage}</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {formatCurrency(results.monthlyMortgage)}
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.totalRentCost}</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {formatCurrency(results.totalRentCost)}
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.homeValue}</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {formatCurrency(results.homeValue)}
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.equity}</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {formatCurrency(results.equity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
