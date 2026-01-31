'use client';

import { useState, useEffect } from 'react';

interface InterestRateTableCalculatorProps {
  lang?: string;
}

interface TableRow {
  rate: number;
  monthlyPayment?: number;
  futureValue?: number;
  difference?: number;
}

export default function InterestRateTableCalculator({ lang = 'en' }: InterestRateTableCalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Interest Rate Table Calculator",
      description: "Generate comparison tables for different interest rates",
      principal: "Principal Amount",
      term: "Term (Years)",
      rates: "Interest Rates (%) - Comma separated",
      calculationType: "Calculation Type",
      loanComparison: "Loan Payment Comparison",
      investmentComparison: "Investment Return Comparison",
      generateTable: "Generate Table",
      reset: "Reset",
      comparisonTable: "Interest Rate Comparison Table",
      enterDetails: "Enter details above to generate comparison table",
      rate: "Rate",
      monthlyPayment: "Monthly Payment",
      futureValue: "Future Value",
      difference: "Difference",
      currency: "$",
      bestValue: "Best Value",
      rateRange: "Rate Range",
      paymentRange: "Payment/Return Range",
      bestRate: "Best Rate",
      rateImpact: "Rate Impact",
      loanPaymentFormula: "Loan Payment: P × (r × (1+r)^n) ÷ ((1+r)^n - 1)",
      futureValueFormula: "Future Value: P × (1+r)^n",
      lowerRates: "Lower rates",
      higherRates: "Higher rates",
      lowerPayments: "Lower payments",
      lowerReturns: "Lower returns",
      higherPayments: "Higher payments",
      higherReturns: "Higher returns",
      smallDifferences: "Small differences can have big financial impacts",
      alwaysCompare: "Always compare total costs or returns, not just rates"
    },
    es: {
      title: "Calculadora de Tabla de Tasas de Interés",
      description: "Genera tablas de comparación para diferentes tasas de interés",
      principal: "Monto Principal",
      term: "Plazo (Años)",
      rates: "Tasas de Interés (%) - Separadas por coma",
      calculationType: "Tipo de Cálculo",
      loanComparison: "Comparación Pago Préstamo",
      investmentComparison: "Comparación Retorno Inversión",
      generateTable: "Generar Tabla",
      reset: "Reiniciar",
      comparisonTable: "Tabla Comparación Tasas de Interés",
      enterDetails: "Ingresa detalles arriba para generar tabla de comparación",
      rate: "Tasa",
      monthlyPayment: "Pago Mensual",
      futureValue: "Valor Futuro",
      difference: "Diferencia",
      currency: "$",
      bestValue: "Mejor Valor",
      rateRange: "Rango Tasas",
      paymentRange: "Rango Pago/Retorno",
      bestRate: "Mejor Tasa",
      rateImpact: "Impacto Tasa",
      loanPaymentFormula: "Pago Préstamo: P × (r × (1+r)^n) ÷ ((1+r)^n - 1)",
      futureValueFormula: "Valor Futuro: P × (1+r)^n",
      lowerRates: "Tasas más bajas",
      higherRates: "Tasas más altas",
      lowerPayments: "Pagos más bajos",
      lowerReturns: "Retornos más bajos",
      higherPayments: "Pagos más altos",
      higherReturns: "Retornos más altos",
      smallDifferences: "Pequeñas diferencias pueden tener grandes impactos financieros",
      alwaysCompare: "Siempre compara costos o retornos totales, no solo tasas"
    },
    pt: {
      title: "Calculadora de Tabela de Taxas de Juros",
      description: "Gere tabelas de comparação para diferentes taxas de juros",
      principal: "Valor Principal",
      term: "Prazo (Anos)",
      rates: "Taxas de Juros (%) - Separadas por vírgula",
      calculationType: "Tipo de Cálculo",
      loanComparison: "Comparação Pagamento Empréstimo",
      investmentComparison: "Comparação Retorno Investimento",
      generateTable: "Gerar Tabela",
      reset: "Reiniciar",
      comparisonTable: "Tabela Comparação Taxas de Juros",
      enterDetails: "Digite detalhes acima para gerar tabela de comparação",
      rate: "Taxa",
      monthlyPayment: "Pagamento Mensal",
      futureValue: "Valor Futuro",
      difference: "Diferença",
      currency: "R$",
      bestValue: "Melhor Valor",
      rateRange: "Intervalo Taxas",
      paymentRange: "Intervalo Pagamento/Retorno",
      bestRate: "Melhor Taxa",
      rateImpact: "Impacto Taxa",
      loanPaymentFormula: "Pagamento Empréstimo: P × (r × (1+r)^n) ÷ ((1+r)^n - 1)",
      futureValueFormula: "Valor Futuro: P × (1+r)^n",
      lowerRates: "Taxas mais baixas",
      higherRates: "Taxas mais altas",
      lowerPayments: "Pagamentos mais baixos",
      lowerReturns: "Retornos mais baixos",
      higherPayments: "Pagamentos mais altos",
      higherReturns: "Retornos mais altos",
      smallDifferences: "Pequenas diferenças podem ter grandes impactos financeiros",
      alwaysCompare: "Sempre compare custos ou retornos totais, não apenas taxas"
    },
    fr: {
      title: "Calculateur de Tableau de Taux d'Intérêt",
      description: "Générez des tableaux de comparaison pour différents taux d'intérêt",
      principal: "Montant Principal",
      term: "Durée (Années)",
      rates: "Taux d'Intérêt (%) - Séparés par virgule",
      calculationType: "Type de Calcul",
      loanComparison: "Comparaison Paiement Prêt",
      investmentComparison: "Comparaison Retour Investissement",
      generateTable: "Générer Tableau",
      reset: "Réinitialiser",
      comparisonTable: "Tableau Comparaison Taux d'Intérêt",
      enterDetails: "Entrez détails ci-dessus pour générer tableau de comparaison",
      rate: "Taux",
      monthlyPayment: "Paiement Mensuel",
      futureValue: "Valeur Future",
      difference: "Différence",
      currency: "€",
      bestValue: "Meilleure Valeur",
      rateRange: "Plage Taux",
      paymentRange: "Plage Paiement/Retour",
      bestRate: "Meilleur Taux",
      rateImpact: "Impact Taux",
      loanPaymentFormula: "Paiement Prêt: P × (r × (1+r)^n) ÷ ((1+r)^n - 1)",
      futureValueFormula: "Valeur Future: P × (1+r)^n",
      lowerRates: "Taux inférieurs",
      higherRates: "Taux supérieurs",
      lowerPayments: "Paiements inférieurs",
      lowerReturns: "Rendements inférieurs",
      higherPayments: "Paiements supérieurs",
      higherReturns: "Rendements supérieurs",
      smallDifferences: "Petites différences peuvent avoir de grands impacts financiers",
      alwaysCompare: "Toujours comparer coûts ou rendements totaux, pas seulement taux"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [principal, setPrincipal] = useState(100000);
  const [term, setTerm] = useState(30);
  const [rates, setRates] = useState("3.0,3.5,4.0,4.5,5.0,5.5,6.0");
  const [calculationType, setCalculationType] = useState<'loan' | 'investment'>('loan');
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [summary, setSummary] = useState<any>({});

  const calculateMonthlyPayment = (principal: number, annualRate: number, years: number) => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;

    if (monthlyRate === 0) {
      return principal / numPayments;
    }

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const calculateFutureValue = (principal: number, annualRate: number, years: number) => {
    const rate = annualRate / 100;
    return principal * Math.pow(1 + rate, years);
  };

  const generateTable = () => {
    const rateList = rates.split(',').map(r => parseFloat(r.trim())).filter(r => !isNaN(r) && r >= 0);

    if (rateList.length === 0 || principal <= 0 || term <= 0) {
      setTableData([]);
      setSummary({});
      return;
    }

    const tableRows: TableRow[] = [];
    let minPayment = Infinity;
    let maxPayment = -Infinity;
    let bestRate = rateList[0];
    let bestValue = calculationType === 'loan' ? Infinity : -Infinity;

    rateList.forEach(rate => {
      let value: number;
      let difference: number;

      if (calculationType === 'loan') {
        value = calculateMonthlyPayment(principal, rate, term);
        difference = value - calculateMonthlyPayment(principal, rateList[0], term);

        if (value < bestValue) {
          bestValue = value;
          bestRate = rate;
        }
      } else {
        value = calculateFutureValue(principal, rate, term);
        difference = value - calculateFutureValue(principal, rateList[0], term);

        if (value > bestValue) {
          bestValue = value;
          bestRate = rate;
        }
      }

      minPayment = Math.min(minPayment, value);
      maxPayment = Math.max(maxPayment, value);

      tableRows.push({
        rate,
        monthlyPayment: calculationType === 'loan' ? value : undefined,
        futureValue: calculationType === 'investment' ? value : undefined,
        difference
      });
    });

    setTableData(tableRows);

    // Calculate summary
    const rateMin = Math.min(...rateList);
    const rateMax = Math.max(...rateList);
    const paymentRange = `${formatCurrency(minPayment)} - ${formatCurrency(maxPayment)}`;
    const rateRangeText = `${rateMin.toFixed(1)}% - ${rateMax.toFixed(1)}%`;

    let bestRateText = '';
    let rateImpactText = '';

    if (calculationType === 'loan') {
      const savings = calculateMonthlyPayment(principal, rateList[0], term) - bestValue;
      bestRateText = `${bestRate.toFixed(1)}% rate saves ${formatCurrency(savings)} monthly`;

      if (rateList.length >= 2) {
        const rateDiff = rateList[1] - rateList[0];
        const paymentDiff = calculateMonthlyPayment(principal, rateList[1], term) - calculateMonthlyPayment(principal, rateList[0], term);
        rateImpactText = `${rateDiff.toFixed(1)}% rate increase costs ${formatCurrency(paymentDiff)} more per month`;
      }
    } else {
      const extraReturn = bestValue - calculateFutureValue(principal, rateList[0], term);
      bestRateText = `${bestRate.toFixed(1)}% rate returns ${formatCurrency(extraReturn)} more`;

      if (rateList.length >= 2) {
        const rateDiff = rateList[1] - rateList[0];
        const valueDiff = calculateFutureValue(principal, rateList[1], term) - calculateFutureValue(principal, rateList[0], term);
        rateImpactText = `${rateDiff.toFixed(1)}% rate increase adds ${formatCurrency(valueDiff)} to final value`;
      }
    }

    setSummary({
      rateRange: rateRangeText,
      paymentRange,
      bestRate: bestRateText,
      rateImpact: rateImpactText
    });
  };

  const resetCalculator = () => {
    setPrincipal(100000);
    setTerm(30);
    setRates("3.0,3.5,4.0,4.5,5.0,5.5,6.0");
    setCalculationType('loan');
    setTableData([]);
    setSummary({});
  };

  // Auto-generate table when inputs change
  useEffect(() => {
    generateTable();
  }, [principal, term, rates, calculationType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.principal}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="1000"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.term}</label>
              <input
                type="number"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="1"
                min="1"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.rates}</label>
              <input
                type="text"
                value={rates}
                onChange={(e) => setRates(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 3.0, 3.5, 4.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.calculationType}</label>
              <select
                value={calculationType}
                onChange={(e) => setCalculationType(e.target.value as 'loan' | 'investment')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="loan">{t.loanComparison}</option>
                <option value="investment">{t.investmentComparison}</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateTable}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.generateTable}
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
            <h4 className="text-sm font-semibold text-green-900 mb-2">Calculation Formulas</h4>
            <div className="text-xs text-green-700 space-y-1">
              <div>{t.loanPaymentFormula}</div>
              <div>{t.futureValueFormula}</div>
              <div>Where: P = principal, r = monthly rate, n = number of payments</div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {tableData.length > 0 ? (
            <div className="space-y-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-600 mb-1">{t.rateRange}</div>
                  <div className="text-lg font-bold text-blue-800">{summary.rateRange}</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-600 mb-1">{t.paymentRange}</div>
                  <div className="text-lg font-bold text-green-800">{summary.paymentRange}</div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 col-span-2">
                  <div className="text-sm text-purple-600 mb-1">{t.bestRate}</div>
                  <div className="text-lg font-bold text-purple-800">{summary.bestRate}</div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 col-span-2">
                  <div className="text-sm text-orange-600 mb-1">{t.rateImpact}</div>
                  <div className="text-lg font-bold text-orange-800">{summary.rateImpact}</div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.rate}</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {calculationType === 'loan' ? t.monthlyPayment : t.futureValue}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t.difference}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tableData.map((row, index) => (
                      <tr key={index} className={index === 0 ? "bg-blue-50" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {row.rate.toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(row.monthlyPayment || row.futureValue || 0)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {row.difference !== undefined ? (
                            <span className={row.difference >= 0 ? "text-red-600" : "text-green-600"}>
                              {row.difference >= 0 ? "+" : ""}{formatCurrency(row.difference)}
                            </span>
                          ) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Educational Info */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">Understanding Rate Comparisons</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div>{t.lowerRates} = {calculationType === 'loan' ? t.lowerPayments : t.lowerReturns}</div>
                  <div>{t.higherRates} = {calculationType === 'loan' ? t.higherPayments : t.higherReturns}</div>
                  <div>{t.smallDifferences}</div>
                  <div>{t.alwaysCompare}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.enterDetails}</h3>
              <p className="text-gray-500">Enter your principal amount, term, and interest rates above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
