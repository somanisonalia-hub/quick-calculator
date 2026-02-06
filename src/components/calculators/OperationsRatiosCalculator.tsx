'use client';

import React, { useState, useEffect } from 'react';

interface OperationsRatiosCalculatorProps {
  lang?: string;
}

export default function OperationsRatiosCalculator({ lang = 'en' }: OperationsRatiosCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Operations Ratios Calculator",
      description: "Calculate inventory turnover, receivables turnover, and asset turnover ratios to assess operational efficiency.",
      operationsDetails: "Operations & Efficiency Metrics",
      salesRevenue: "Sales Revenue",
      costOfGoodsSold: "Cost of Goods Sold (COGS)",
      averageInventory: "Average Inventory",
      accountsReceivable: "Accounts Receivable",
      averageAccountsReceivable: "Average Accounts Receivable",
      totalAssets: "Total Assets",
      calculate: "Calculate Ratios",
      reset: "Reset",
      operationsRatios: "Operations Ratios Results",
      inventoryTurnover: "Inventory Turnover Ratio",
      receivablesTurnover: "Receivables Turnover Ratio",
      assetTurnover: "Asset Turnover Ratio",
      daysSalesOutstanding: "Days Sales Outstanding (DSO)",
      interpretation: "Ratio Interpretation",
      currency: "$",
      inventoryTurnoverEfficient: "Inventory Turnover > 8: Efficient inventory management",
      receivablesTurnoverGood: "Receivables Turnover > 6: Good collection efficiency",
      assetTurnoverEffective: "Asset Turnover > 1.5: Effective asset utilization",
      dsoStrong: "DSO < 45 days: Strong cash conversion"
    },
    es: {
      title: "Calculadora de Ratios Operativos",
      description: "Calcula ratios de rotación de inventario, rotación de cuentas por cobrar y rotación de activos para evaluar eficiencia operativa.",
      operationsDetails: "Operaciones y Métricas de Eficiencia",
      salesRevenue: "Ingresos por Ventas",
      costOfGoodsSold: "Costo de Bienes Vendidos (COGS)",
      averageInventory: "Inventario Promedio",
      accountsReceivable: "Cuentas por Cobrar",
      averageAccountsReceivable: "Cuentas por Cobrar Promedio",
      totalAssets: "Activos Totales",
      calculate: "Calcular Ratios",
      reset: "Reiniciar",
      operationsRatios: "Resultados de Ratios Operativos",
      inventoryTurnover: "Ratio de Rotación de Inventario",
      receivablesTurnover: "Ratio de Rotación de Cuentas por Cobrar",
      assetTurnover: "Ratio de Rotación de Activos",
      daysSalesOutstanding: "Días de Ventas Pendientes (DSO)",
      interpretation: "Interpretación del Ratio",
      currency: "$",
      inventoryTurnoverEfficient: "Rotación Inventario > 8: Gestión eficiente de inventario",
      receivablesTurnoverGood: "Rotación Cuentas x Cobrar > 6: Buena eficiencia de cobro",
      assetTurnoverEffective: "Rotación Activos > 1.5: Utilización efectiva de activos",
      dsoStrong: "DSO < 45 días: Fuerte conversión de efectivo"
    },
    pt: {
      title: "Calculadora de Índices Operacionais",
      description: "Calcule índices de giro de estoque, giro de contas a receber e giro de ativos para avaliar eficiência operacional.",
      operationsDetails: "Operações e Métricas de Eficiência",
      salesRevenue: "Receita de Vendas",
      costOfGoodsSold: "Custo dos Produtos Vendidos (COGS)",
      averageInventory: "Estoque Médio",
      accountsReceivable: "Contas a Receber",
      averageAccountsReceivable: "Contas a Receber Médias",
      totalAssets: "Ativos Totais",
      calculate: "Calcular Índices",
      reset: "Reiniciar",
      operationsRatios: "Resultados dos Índices Operacionais",
      inventoryTurnover: "Índice de Giro de Estoque",
      receivablesTurnover: "Índice de Giro de Contas a Receber",
      assetTurnover: "Índice de Giro de Ativos",
      daysSalesOutstanding: "Dias de Vendas Pendentes (DSO)",
      interpretation: "Interpretação do Índice",
      currency: "R$",
      inventoryTurnoverEfficient: "Giro Estoque > 8: Gestão eficiente de estoque",
      receivablesTurnoverGood: "Giro Contas a Receber > 6: Boa eficiência de cobrança",
      assetTurnoverEffective: "Giro Ativos > 1.5: Utilização eficaz de ativos",
      dsoStrong: "DSO < 45 dias: Forte conversão de caixa"
    },
    fr: {
      title: "Calculateur de Ratios Opérationnels",
      description: "Calculez ratios de rotation des stocks, rotation des créances et rotation des actifs pour évaluer efficacité opérationnelle.",
      operationsDetails: "Opérations et Métriques d'Efficacité",
      salesRevenue: "Revenus des Ventes",
      costOfGoodsSold: "Coût des Biens Vendus (COGS)",
      averageInventory: "Stock Moyen",
      accountsReceivable: "Créances Clients",
      averageAccountsReceivable: "Créances Clients Moyennes",
      totalAssets: "Actifs Totaux",
      calculate: "Calculer les Ratios",
      reset: "Réinitialiser",
      operationsRatios: "Résultats des Ratios Opérationnels",
      inventoryTurnover: "Ratio de Rotation des Stocks",
      receivablesTurnover: "Ratio de Rotation des Créances",
      assetTurnover: "Ratio de Rotation des Actifs",
      daysSalesOutstanding: "Jours de Ventes en Suspens (DSO)",
      interpretation: "Interprétation du Ratio",
      currency: "€",
      inventoryTurnoverEfficient: "Rotation Stocks > 8: Gestion efficace des stocks",
      receivablesTurnoverGood: "Rotation Créances > 6: Bonne efficacité de recouvrement",
      assetTurnoverEffective: "Rotation Actifs > 1.5: Utilisation efficace des actifs",
      dsoStrong: "DSO < 45 jours: Forte conversion de trésorerie"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [salesRevenue, setSalesRevenue] = useState(1000000);
  const [costOfGoodsSold, setCostOfGoodsSold] = useState(600000);
  const [averageInventory, setAverageInventory] = useState(150000);
  const [accountsReceivable, setAccountsReceivable] = useState(200000);
  const [averageAccountsReceivable, setAverageAccountsReceivable] = useState(180000);
  const [totalAssets, setTotalAssets] = useState(800000);
  const [results, setResults] = useState<any>({});

  // Calculate operations ratios
  useEffect(() => {
    if (averageInventory > 0 && averageAccountsReceivable > 0 && totalAssets > 0) {
      const inventoryTurnover = costOfGoodsSold / averageInventory;
      const receivablesTurnover = salesRevenue / averageAccountsReceivable;
      const assetTurnover = salesRevenue / totalAssets;
      const daysSalesOutstanding = (averageAccountsReceivable / salesRevenue) * 365;

      setResults({
        inventoryTurnover: inventoryTurnover.toFixed(2),
        receivablesTurnover: receivablesTurnover.toFixed(2),
        assetTurnover: assetTurnover.toFixed(2),
        daysSalesOutstanding: daysSalesOutstanding.toFixed(0) + ' days'
      });
    } else {
      setResults({});
    }
  }, [salesRevenue, costOfGoodsSold, averageInventory, accountsReceivable, averageAccountsReceivable, totalAssets]);

  const resetCalculator = () => {
    setSalesRevenue(1000000);
    setCostOfGoodsSold(600000);
    setAverageInventory(150000);
    setAccountsReceivable(200000);
    setAverageAccountsReceivable(180000);
    setTotalAssets(800000);
    setResults({});
  };

  const getInterpretation = (ratioType: string, value: number) => {
    switch (ratioType) {
      case 'inventoryTurnover':
        if (value > 12) return "Excellent - Fast inventory turnover";
        if (value > 8) return "Good - Healthy inventory management";
        if (value > 4) return "Average - Moderate inventory turnover";
        return "Slow - Potential overstocking issues";
      case 'receivablesTurnover':
        if (value > 10) return "Excellent - Fast collection";
        if (value > 6) return "Good - Efficient receivables management";
        if (value > 3) return "Average - Acceptable collection";
        return "Slow - Potential cash flow issues";
      case 'assetTurnover':
        if (value > 2.5) return "Excellent - High asset utilization";
        if (value > 1.5) return "Good - Efficient asset use";
        if (value > 1.0) return "Average - Moderate efficiency";
        return "Low - Underutilized assets";
      default:
        return "Ratio calculated successfully";
    }
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.operationsDetails}</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.salesRevenue}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={salesRevenue}
                    onChange={(e) => setSalesRevenue(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.costOfGoodsSold}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={costOfGoodsSold}
                    onChange={(e) => setCostOfGoodsSold(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.averageInventory}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={averageInventory}
                    onChange={(e) => setAverageInventory(Number(e.target.value) || 1)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.averageAccountsReceivable}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={averageAccountsReceivable}
                    onChange={(e) => setAverageAccountsReceivable(Number(e.target.value) || 1)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.totalAssets}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={totalAssets}
                  onChange={(e) => setTotalAssets(Number(e.target.value) || 1)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="10000"
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                if (averageInventory > 0 && averageAccountsReceivable > 0 && totalAssets > 0) {
                  const inventoryTurnover = costOfGoodsSold / averageInventory;
                  const receivablesTurnover = salesRevenue / averageAccountsReceivable;
                  const assetTurnover = salesRevenue / totalAssets;
                  const daysSalesOutstanding = (averageAccountsReceivable / salesRevenue) * 365;

                  setResults({
                    inventoryTurnover: inventoryTurnover.toFixed(2),
                    receivablesTurnover: receivablesTurnover.toFixed(2),
                    assetTurnover: assetTurnover.toFixed(2),
                    daysSalesOutstanding: daysSalesOutstanding.toFixed(0) + ' days'
                  });
                }
              }}
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
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.operationsRatios}</h3>

              {/* Operations Ratios */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.inventoryTurnover}</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {results.inventoryTurnover}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('inventoryTurnover', parseFloat(results.inventoryTurnover))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.receivablesTurnover}</div>
                  <div className="text-2xl font-bold text-green-600">
                    {results.receivablesTurnover}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('receivablesTurnover', parseFloat(results.receivablesTurnover))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.assetTurnover}</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {results.assetTurnover}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('assetTurnover', parseFloat(results.assetTurnover))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.daysSalesOutstanding}</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {results.daysSalesOutstanding}
                  </div>
                </div>
              </div>

              {/* Interpretation Guide */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-sm font-semibold text-yellow-900 mb-2">{t.interpretation}</h4>
                <div className="text-xs text-yellow-700 space-y-1">
                  <div>{t.inventoryTurnoverEfficient}</div>
                  <div>{t.receivablesTurnoverGood}</div>
                  <div>{t.assetTurnoverEffective}</div>
                  <div>{t.dsoStrong}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Calculate Operations Ratios</h3>
              <p className="text-gray-500">Enter operational data above to see efficiency analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
