'use client';

import React, { useState, useEffect } from 'react';

interface ProfitabilityRatiosCalculatorProps {
  lang?: string;
}

export default function ProfitabilityRatiosCalculator({ lang = 'en' }: ProfitabilityRatiosCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Profitability Ratios Calculator",
      description: "Calculate gross profit margin, operating profit margin, net profit margin, and return on assets to assess profitability.",
      profitabilityDetails: "Profitability & Income Metrics",
      salesRevenue: "Sales Revenue",
      costOfGoodsSold: "Cost of Goods Sold (COGS)",
      operatingExpenses: "Operating Expenses",
      netIncome: "Net Income",
      totalAssets: "Total Assets",
      shareholdersEquity: "Shareholders' Equity",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      profitabilityRatios: "Profitability Ratios Results",
      grossProfitMargin: "Gross Profit Margin",
      operatingProfitMargin: "Operating Profit Margin",
      netProfitMargin: "Net Profit Margin",
      returnOnAssets: "Return on Assets (ROA)",
      returnOnEquity: "Return on Equity (ROE)",
      interpretation: "Ratio Interpretation",
      currency: "$",
      grossMarginStrong: "Gross Margin > 30%: Strong profitability",
      netMarginGood: "Net Margin > 10%: Good bottom-line performance",
      roaEffective: "ROA > 6%: Effective asset utilization",
      roeExcellent: "ROE > 15%: Excellent shareholder returns"
    },
    es: {
      title: "Calculadora de Ratios de Rentabilidad",
      description: "Calcula margen de beneficio bruto, margen de beneficio operativo, margen de beneficio neto y retorno sobre activos para evaluar rentabilidad.",
      profitabilityDetails: "Rentabilidad y Métricas de Ingreso",
      salesRevenue: "Ingresos por Ventas",
      costOfGoodsSold: "Costo de Bienes Vendidos (COGS)",
      operatingExpenses: "Gastos Operativos",
      netIncome: "Ingreso Neto",
      totalAssets: "Activos Totales",
      shareholdersEquity: "Capital de Accionistas",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      profitabilityRatios: "Resultados de Ratios de Rentabilidad",
      grossProfitMargin: "Margen de Beneficio Bruto",
      operatingProfitMargin: "Margen de Beneficio Operativo",
      netProfitMargin: "Margen de Beneficio Neto",
      returnOnAssets: "Retorno sobre Activos (ROA)",
      returnOnEquity: "Retorno sobre Capital (ROE)",
      interpretation: "Interpretación del Ratio",
      currency: "$",
      grossMarginStrong: "Margen Bruto > 30%: Fuerte rentabilidad",
      netMarginGood: "Margen Neto > 10%: Buen desempeño de resultado final",
      roaEffective: "ROA > 6%: Utilización efectiva de activos",
      roeExcellent: "ROE > 15%: Excelentes retornos para accionistas"
    },
    pt: {
      title: "Calculadora de Índices de Rentabilidade",
      description: "Calcule margem de lucro bruto, margem de lucro operacional, margem de lucro líquido e retorno sobre ativos para avaliar rentabilidade.",
      profitabilityDetails: "Rentabilidade e Métricas de Receita",
      salesRevenue: "Receita de Vendas",
      costOfGoodsSold: "Custo dos Produtos Vendidos (COGS)",
      operatingExpenses: "Despesas Operacionais",
      netIncome: "Lucro Líquido",
      totalAssets: "Ativos Totais",
      shareholdersEquity: "Capital dos Acionistas",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      profitabilityRatios: "Resultados dos Índices de Rentabilidade",
      grossProfitMargin: "Margem de Lucro Bruto",
      operatingProfitMargin: "Margem de Lucro Operacional",
      netProfitMargin: "Margem de Lucro Líquido",
      returnOnAssets: "Retorno sobre Ativos (ROA)",
      returnOnEquity: "Retorno sobre Capital (ROE)",
      interpretation: "Interpretação do Índice",
      currency: "R$",
      grossMarginStrong: "Margem Bruta > 30%: Forte rentabilidade",
      netMarginGood: "Margem Líquida > 10%: Bom desempenho de resultado final",
      roaEffective: "ROA > 6%: Utilização eficaz de ativos",
      roeExcellent: "ROE > 15%: Excelentes retornos para acionistas"
    },
    fr: {
      title: "Calculateur de Ratios de Rentabilité",
      description: "Calculez marge bénéficiaire brute, marge bénéficiaire d'exploitation, marge nette et retour sur actifs pour évaluer rentabilité.",
      profitabilityDetails: "Rentabilité et Métriques de Revenus",
      salesRevenue: "Revenus des Ventes",
      costOfGoodsSold: "Coût des Biens Vendus (COGS)",
      operatingExpenses: "Charges d'Exploitation",
      netIncome: "Résultat Net",
      totalAssets: "Actifs Totaux",
      shareholdersEquity: "Capitaux Propres",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      profitabilityRatios: "Résultats des Ratios de Rentabilité",
      grossProfitMargin: "Marge Bénéficiaire Brute",
      operatingProfitMargin: "Marge Bénéficiaire d'Exploitation",
      netProfitMargin: "Marge Nette",
      returnOnAssets: "Retour sur Actifs (ROA)",
      returnOnEquity: "Retour sur Capitaux Propres (ROE)",
      interpretation: "Interprétation du Ratio",
      currency: "€",
      grossMarginStrong: "Marge Brute > 30%: Forte rentabilité",
      netMarginGood: "Marge Nette > 10%: Bonne performance de résultat final",
      roaEffective: "ROA > 6%: Utilisation efficace des actifs",
      roeExcellent: "ROE > 15%: Excellents rendements pour actionnaires"
    },
    de: {
      title: "Rentabilitätskennzahlen-Rechner",
      description: "Berechnen Sie Bruttogewinnmarge, Betriebsgewinnmarge, Nettogewinnmarge und Rendite auf Vermögenswerte zur Bewertung der Rentabilität.",
      profitabilityDetails: "Rentabilität & Einkommensmesswerte",
      salesRevenue: "Umsatz",
      costOfGoodsSold: "Kosten der verkauften Waren (COGS)",
      operatingExpenses: "Betriebsausgaben",
      netIncome: "Nettoeinkommen",
      totalAssets: "Gesamtvermögen",
      shareholdersEquity: "Eigenkapital",
      calculate: "Kennzahlen Berechnen",
      reset: "Zurücksetzen",
      profitabilityRatios: "Rentabilitätskennzahlen Ergebnisse",
      grossProfitMargin: "Bruttogewinnmarge",
      operatingProfitMargin: "Betriebsgewinnmarge",
      netProfitMargin: "Nettogewinnmarge",
      returnOnAssets: "Rendite auf Vermögenswerte (ROA)",
      returnOnEquity: "Rendite auf Eigenkapital (ROE)",
      interpretation: "Kennzahlinterpretation",
      currency: "€",
      grossMarginStrong: "Bruttogewinn > 30%: Hohe Rentabilität",
      netMarginGood: "Nettogewinn > 10%: Gute Endergebnis-Leistung",
      roaEffective: "ROA > 6%: Effektive Vermögensnutzung",
      roeExcellent: "ROE > 15%: Hervorragende Renditen für Aktionäre"
    },
    nl: {
      title: "Winstgevingsratio's Rekenmachine",
      description: "Bereken brutowinstratio, bedrijfswinstratio, nettowinstratio en rendement op activa om winstgeving te beoordelen.",
      profitabilityDetails: "Winstgeving & Inkomensmaatstaven",
      salesRevenue: "Verkoopopbrengsten",
      costOfGoodsSold: "Kosten van Verkochte Goederen (COGS)",
      operatingExpenses: "Bedrijfskosten",
      netIncome: "Nettowinst",
      totalAssets: "Totale Activa",
      shareholdersEquity: "Eigen Vermogen",
      calculate: "Ratio's Berekenen",
      reset: "Resetten",
      profitabilityRatios: "Winstgevingsratio's Resultaten",
      grossProfitMargin: "Brutowinstratio",
      operatingProfitMargin: "Bedrijfswinstratio",
      netProfitMargin: "Nettowinstratio",
      returnOnAssets: "Rendement op Activa (ROA)",
      returnOnEquity: "Rendement op Eigen Vermogen (ROE)",
      interpretation: "Ratio-interpretatie",
      currency: "€",
      grossMarginStrong: "Brutowinst > 30%: Hoge winstgeving",
      netMarginGood: "Nettowinst > 10%: Goede eindresultaatprestatie",
      roaEffective: "ROA > 6%: Effectief activagebruik",
      roeExcellent: "ROE > 15%: Uitstekende rendemienten voor aandeelhouders"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [salesRevenue, setSalesRevenue] = useState(1000000);
  const [costOfGoodsSold, setCostOfGoodsSold] = useState(600000);
  const [operatingExpenses, setOperatingExpenses] = useState(250000);
  const [netIncome, setNetIncome] = useState(100000);
  const [totalAssets, setTotalAssets] = useState(800000);
  const [shareholdersEquity, setShareholdersEquity] = useState(400000);
  const [results, setResults] = useState<any>({});

  // Calculate profitability ratios
  useEffect(() => {
    if (salesRevenue > 0 && totalAssets > 0 && shareholdersEquity > 0) {
      const grossProfit = salesRevenue - costOfGoodsSold;
      const grossProfitMargin = (grossProfit / salesRevenue) * 100;
      const operatingProfit = grossProfit - operatingExpenses;
      const operatingProfitMargin = (operatingProfit / salesRevenue) * 100;
      const netProfitMargin = (netIncome / salesRevenue) * 100;
      const returnOnAssets = (netIncome / totalAssets) * 100;
      const returnOnEquity = (netIncome / shareholdersEquity) * 100;

      setResults({
        grossProfitMargin: grossProfitMargin.toFixed(2) + '%',
        operatingProfitMargin: operatingProfitMargin.toFixed(2) + '%',
        netProfitMargin: netProfitMargin.toFixed(2) + '%',
        returnOnAssets: returnOnAssets.toFixed(2) + '%',
        returnOnEquity: returnOnEquity.toFixed(2) + '%'
      });
    } else {
      setResults({});
    }
  }, [salesRevenue, costOfGoodsSold, operatingExpenses, netIncome, totalAssets, shareholdersEquity]);

  const resetCalculator = () => {
    setSalesRevenue(1000000);
    setCostOfGoodsSold(600000);
    setOperatingExpenses(250000);
    setNetIncome(100000);
    setTotalAssets(800000);
    setShareholdersEquity(400000);
    setResults({});
  };

  const getInterpretation = (ratioType: string, value: number) => {
    switch (ratioType) {
      case 'grossProfitMargin':
        if (value > 50) return "Excellent - Strong pricing power";
        if (value > 30) return "Good - Healthy profit margins";
        if (value > 20) return "Average - Acceptable margins";
        return "Low - Cost management issues";
      case 'netProfitMargin':
        if (value > 15) return "Excellent - Highly profitable";
        if (value > 10) return "Good - Strong profitability";
        if (value > 5) return "Average - Moderate profitability";
        return "Low - Profitability concerns";
      case 'returnOnAssets':
        if (value > 10) return "Excellent - Efficient asset use";
        if (value > 6) return "Good - Effective operations";
        if (value > 3) return "Average - Acceptable returns";
        return "Low - Asset utilization issues";
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.profitabilityDetails}</h3>

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
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.operatingExpenses}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={operatingExpenses}
                    onChange={(e) => setOperatingExpenses(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.netIncome}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={netIncome}
                    onChange={(e) => setNetIncome(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.shareholdersEquity}</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                  <input
                    type="number"
                    value={shareholdersEquity}
                    onChange={(e) => setShareholdersEquity(Number(e.target.value) || 1)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="10000"
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                if (salesRevenue > 0 && totalAssets > 0 && shareholdersEquity > 0) {
                  const grossProfit = salesRevenue - costOfGoodsSold;
                  const grossProfitMargin = (grossProfit / salesRevenue) * 100;
                  const operatingProfit = grossProfit - operatingExpenses;
                  const operatingProfitMargin = (operatingProfit / salesRevenue) * 100;
                  const netProfitMargin = (netIncome / salesRevenue) * 100;
                  const returnOnAssets = (netIncome / totalAssets) * 100;
                  const returnOnEquity = (netIncome / shareholdersEquity) * 100;

                  setResults({
                    grossProfitMargin: grossProfitMargin.toFixed(2) + '%',
                    operatingProfitMargin: operatingProfitMargin.toFixed(2) + '%',
                    netProfitMargin: netProfitMargin.toFixed(2) + '%',
                    returnOnAssets: returnOnAssets.toFixed(2) + '%',
                    returnOnEquity: returnOnEquity.toFixed(2) + '%'
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.profitabilityRatios}</h3>

              {/* Profitability Ratios */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.grossProfitMargin}</div>
                  <div className="text-2xl font-bold text-green-600">
                    {results.grossProfitMargin}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('grossProfitMargin', parseFloat(results.grossProfitMargin))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.operatingProfitMargin}</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {results.operatingProfitMargin}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.netProfitMargin}</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {results.netProfitMargin}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('netProfitMargin', parseFloat(results.netProfitMargin))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.returnOnAssets}</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {results.returnOnAssets}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getInterpretation('returnOnAssets', parseFloat(results.returnOnAssets))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.returnOnEquity}</div>
                  <div className="text-2xl font-bold text-red-600">
                    {results.returnOnEquity}
                  </div>
                </div>
              </div>

              {/* Interpretation Guide */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-sm font-semibold text-yellow-900 mb-2">{t.interpretation}</h4>
                <div className="text-xs text-yellow-700 space-y-1">
                  <div>{t.grossMarginStrong}</div>
                  <div>{t.netMarginGood}</div>
                  <div>{t.roaEffective}</div>
                  <div>{t.roeExcellent}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Calculate Profitability Ratios</h3>
              <p className="text-gray-500">Enter financial data above to see profitability analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
