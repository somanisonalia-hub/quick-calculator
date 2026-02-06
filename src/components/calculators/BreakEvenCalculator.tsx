'use client';

import { useState, useEffect } from 'react';

interface BreakEvenCalculatorProps {
  lang?: string;
}

export default function BreakEvenCalculator({ lang = 'en' }: BreakEvenCalculatorProps) {
  const [fixedCosts, setFixedCosts] = useState(50000);
  const [unitPrice, setUnitPrice] = useState(100);
  const [variableCost, setVariableCost] = useState(30);

  const [results, setResults] = useState({
    breakEvenPoint: 0,
    breakEvenRevenue: 0,
    contributionMargin: 0,
    contributionRatio: 0
  });

  const translations = {
    en: {
      title: "Break-Even Calculator",
      description: "Calculate the break-even point for your business and understand profitability",
      fixedCosts: "Fixed Costs ($)",
      unitPrice: "Selling Price per Unit ($)",
      variableCost: "Variable Cost per Unit ($)",
      results: "Break-Even Analysis Results",
      breakEvenPoint: "Break-Even Point (Units)",
      breakEvenRevenue: "Break-Even Revenue ($)",
      contributionMargin: "Contribution Margin ($)",
      contributionRatio: "Contribution Ratio (%)",
      calculate: "Calculate Break-Even",
      reset: "Reset",
      formula: "Break-Even Point = Fixed Costs / (Price - Variable Cost)"
    },
    es: {
      title: "Calculadora de Punto de Equilibrio",
      description: "Calcula el punto de equilibrio para tu negocio y entiende la rentabilidad",
      fixedCosts: "Costos Fijos ($)",
      unitPrice: "Precio de Venta por Unidad ($)",
      variableCost: "Costo Variable por Unidad ($)",
      results: "Resultados del Análisis de Punto de Equilibrio",
      breakEvenPoint: "Punto de Equilibrio (Unidades)",
      breakEvenRevenue: "Ingresos en Punto de Equilibrio ($)",
      contributionMargin: "Margen de Contribución ($)",
      contributionRatio: "Ratio de Contribución (%)",
      calculate: "Calcular Punto de Equilibrio",
      reset: "Reiniciar",
      formula: "Punto de Equilibrio = Costos Fijos / (Precio - Costo Variable)"
    },
    pt: {
      title: "Calculadora de Ponto de Equilíbrio",
      description: "Calcule o ponto de equilíbrio para seu negócio e entenda a rentabilidade",
      fixedCosts: "Custos Fixos ($)",
      unitPrice: "Preço de Venda por Unidade ($)",
      variableCost: "Custo Variável por Unidade ($)",
      results: "Resultados da Análise do Ponto de Equilíbrio",
      breakEvenPoint: "Ponto de Equilíbrio (Unidades)",
      breakEvenRevenue: "Receita no Ponto de Equilíbrio ($)",
      contributionMargin: "Margem de Contribução ($)",
      contributionRatio: "Razão de Contribução (%)",
      calculate: "Calcular Ponto de Equilíbrio",
      reset: "Reiniciar",
      formula: "Ponto de Equilíbrio = Custos Fixos / (Preço - Custo Variável)"
    },
    fr: {
      title: "Calculateur de Seuil de Rentabilité",
      description: "Calculez le seuil de rentabilité pour votre entreprise et comprenez la rentabilité",
      fixedCosts: "Coûts Fixes ($)",
      unitPrice: "Prix de Vente par Unité ($)",
      variableCost: "Coût Variable par Unité ($)",
      results: "Résultats de l'Analyse du Seuil de Rentabilité",
      breakEvenPoint: "Seuil de Rentabilité (Unités)",
      breakEvenRevenue: "Chiffre d'Affaires au Seuil ($)",
      contributionMargin: "Marge de Contribution ($)",
      contributionRatio: "Ratio de Contribution (%)",
      calculate: "Calculer le Seuil de Rentabilité",
      reset: "Réinitialiser",
      formula: "Seuil de Rentabilité = Coûts Fixes / (Prix - Coût Variable)"
    },
    de: {
      title: "Break-Even-Rechner",
      description: "Berechnen Sie den Break-Even-Punkt für Ihr Unternehmen und verstehen Sie die Rentabilität",
      fixedCosts: "Fixkosten ($)",
      unitPrice: "Verkaufspreis pro Einheit ($)",
      variableCost: "Variable Kosten pro Einheit ($)",
      results: "Break-Even-Analyseergebnisse",
      breakEvenPoint: "Break-Even-Punkt (Einheiten)",
      breakEvenRevenue: "Break-Even-Umsatz ($)",
      contributionMargin: "Deckungsbeitrag ($)",
      contributionRatio: "Deckungsquote (%)",
      calculate: "Break-Even berechnen",
      reset: "Zurücksetzen",
      formula: "Break-Even-Punkt = Fixkosten / (Preis - Variable Kosten)"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateBreakEven = () => {
    const contributionMargin = unitPrice - variableCost;
    
    if (contributionMargin <= 0) {
      setResults({
        breakEvenPoint: 0,
        breakEvenRevenue: 0,
        contributionMargin: 0,
        contributionRatio: 0
      });
      return;
    }

    const breakEvenPoint = fixedCosts / contributionMargin;
    const breakEvenRevenue = breakEvenPoint * unitPrice;
    const contributionRatio = (contributionMargin / unitPrice) * 100;

    setResults({
      breakEvenPoint,
      breakEvenRevenue,
      contributionMargin,
      contributionRatio
    });
  };

  const resetCalculator = () => {
    setFixedCosts(50000);
    setUnitPrice(100);
    setVariableCost(30);
    setResults({ breakEvenPoint: 0, breakEvenRevenue: 0, contributionMargin: 0, contributionRatio: 0 });
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateBreakEven();
  }, [fixedCosts, unitPrice, variableCost]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatUnits = (value: number) => {
    return Math.ceil(value).toLocaleString();
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
              {t.fixedCosts}
            </label>
            <input
              type="number"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
              min="0"
              step="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.unitPrice}
            </label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
              min="0"
              step="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.variableCost}
            </label>
            <input
              type="number"
              value={variableCost}
              onChange={(e) => setVariableCost(parseFloat(e.target.value) || 0)}
              min="0"
              step="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Auto-calculation note */}
        <div className="pt-2 text-xs text-blue-600 text-center font-medium">
          📊 {lang === 'en' ? 'Calculations update automatically as you change values' : lang === 'es' ? 'Los cálculos se actualizan automáticamente al cambiar valores' : lang === 'pt' ? 'Os cálculos são atualizados automaticamente ao alterar valores' : lang === 'fr' ? 'Les calculs se mettent à jour automatiquement au fur et à mesure que vous modifiez les valeurs' : 'Berechnungen werden automatisch aktualisiert, wenn Sie Werte ändern'}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.breakEvenPoint}</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {formatUnits(results.breakEvenPoint)}
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.breakEvenRevenue}</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {formatCurrency(results.breakEvenRevenue)}
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.contributionMargin}</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {formatCurrency(results.contributionMargin)}
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.contributionRatio}</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {results.contributionRatio.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm font-semibold text-gray-900 mb-2">{t.formula}</p>
          <p className="text-xs text-gray-600">
            {lang === 'en' ? 'Contribution Margin = Selling Price - Variable Cost per Unit' : lang === 'es' ? 'Margen de Contribución = Precio de Venta - Costo Variable por Unidad' : lang === 'pt' ? 'Margem de Contribução = Preço de Venda - Custo Variável por Unidade' : lang === 'fr' ? 'Marge de Contribution = Prix de Vente - Coût Variable par Unité' : 'Deckungsbeitrag = Verkaufspreis - Variable Kosten pro Einheit'}
          </p>
        </div>
      </div>
    </div>
  );
}
