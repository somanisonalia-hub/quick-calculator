// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';

interface LoanPaymentTableGeneratorProps {
  lang?: string;
}

interface TableRow {
  label: string;
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  paymentDifference?: number;
}

export default function LoanPaymentTableGenerator({ lang = 'en' }: LoanPaymentTableGeneratorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Loan Payment Table Generator",
      description: "Generate comparison tables for loan payments across different scenarios",
      tableType: "Table Type",
      compareInterestRates: "Compare Interest Rates",
      compareLoanTerms: "Compare Loan Terms",
      compareLoanAmounts: "Compare Loan Amounts",
      baseLoanAmount: "Base Loan Amount",
      baseInterestRate: "Base Interest Rate (%)",
      baseLoanTerm: "Base Loan Term (Years)",
      comparisonValues: "Comparison Values (comma-separated)",
      generateTable: "Generate Table",
      reset: "Reset",
      monthlyPayment: "Monthly Payment",
      totalPayments: "Total Payments",
      totalInterest: "Total Interest",
      difference: "Difference",
      label: "Label",
      exportCSV: "Export to CSV",
      printTable: "Print Table",
      tableGenerated: "Comparison table generated successfully!",
      enterValidValues: "Please enter valid comparison values",
      noData: "No data to display",
      summary: "Summary",
      paymentComparisonTable: "Payment Comparison Table",
      generateComparisonTable: "Generate a comparison table to see results",
      examples: "Examples"
    },
    es: {
      title: "Generador de Tabla de Pagos de Préstamo",
      description: "Genera tablas de comparación para pagos de préstamo en diferentes escenarios",
      tableType: "Tipo de Tabla",
      compareInterestRates: "Comparar Tasas de Interés",
      compareLoanTerms: "Comparar Plazos de Préstamo",
      compareLoanAmounts: "Comparar Montos de Préstamo",
      baseLoanAmount: "Monto Base del Préstamo",
      baseInterestRate: "Tasa Base de Interés (%)",
      baseLoanTerm: "Plazo Base del Préstamo (Años)",
      comparisonValues: "Valores de Comparación (separados por coma)",
      generateTable: "Generar Tabla",
      reset: "Reiniciar",
      monthlyPayment: "Pago Mensual",
      totalPayments: "Pagos Totales",
      totalInterest: "Intereses Totales",
      difference: "Diferencia",
      label: "Etiqueta",
      exportCSV: "Exportar a CSV",
      printTable: "Imprimir Tabla",
      tableGenerated: "¡Tabla de comparación generada exitosamente!",
      enterValidValues: "Por favor ingresa valores válidos de comparación",
      noData: "No hay datos para mostrar"
    },
    pt: {
      title: "Gerador de Tabela de Pagamentos de Empréstimo",
      description: "Gere tabelas de comparação para pagamentos de empréstimo em diferentes cenários",
      tableType: "Tipo de Tabela",
      compareInterestRates: "Comparar Taxas de Juros",
      compareLoanTerms: "Comparar Prazos de Empréstimo",
      compareLoanAmounts: "Comparar Valores de Empréstimo",
      baseLoanAmount: "Valor Base do Empréstimo",
      baseInterestRate: "Taxa Base de Juros (%)",
      baseLoanTerm: "Prazo Base do Empréstimo (Anos)",
      comparisonValues: "Valores de Comparação (separados por vírgula)",
      generateTable: "Gerar Tabela",
      reset: "Reiniciar",
      monthlyPayment: "Pagamento Mensal",
      totalPayments: "Pagamentos Totais",
      totalInterest: "Juros Totais",
      difference: "Diferença",
      label: "Etiqueta",
      exportCSV: "Exportar para CSV",
      printTable: "Imprimir Tabela",
      tableGenerated: "Tabela de comparação gerada com sucesso!",
      enterValidValues: "Por favor digite valores válidos de comparação",
      noData: "Nenhum dado para exibir"
    },
    fr: {
      title: "Générateur de Tableau de Paiements d'Emprunt",
      description: "Générez des tableaux de comparaison pour paiements d'emprunt dans différents scénarios",
      tableType: "Type de Tableau",
      compareInterestRates: "Comparer Taux d'Intérêt",
      compareLoanTerms: "Comparer Durées d'Emprunt",
      compareLoanAmounts: "Comparer Montants d'Emprunt",
      baseLoanAmount: "Montant de Base d'Emprunt",
      baseInterestRate: "Taux de Base d'Intérêt (%)",
      baseLoanTerm: "Durée de Base d'Emprunt (Années)",
      comparisonValues: "Valeurs de Comparaison (séparées par virgule)",
      generateTable: "Générer Tableau",
      reset: "Réinitialiser",
      monthlyPayment: "Paiement Mensuel",
      totalPayments: "Paiements Totaux",
      totalInterest: "Intérêts Totaux",
      difference: "Différence",
      label: "Étiquette",
      exportCSV: "Exporter vers CSV",
      printTable: "Imprimer Tableau",
      tableGenerated: "Tableau de comparaison généré avec succès!",
      enterValidValues: "Veuillez entrer des valeurs de comparaison valides",
      noData: "Aucune donnée à afficher"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [tableType, setTableType] = useState<'interest_rate' | 'loan_term' | 'loan_amount'>('interest_rate');
  const [baseLoanAmount, setBaseLoanAmount] = useState(200000);
  const [baseInterestRate, setBaseInterestRate] = useState(6.5);
  const [baseLoanTerm, setBaseLoanTerm] = useState(30);
  const [comparisonValues, setComparisonValues] = useState('6.0,6.5,7.0,7.5,8.0');
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [summary, setSummary] = useState({
    tableSummary: '',
    bestRate: '',
    paymentRange: '',
    interestRange: ''
  });

  const calculateMonthlyPayment = (principal: number, annualRate: number, years: number) => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;

    if (monthlyRate === 0) {
      return principal / numPayments;
    }

    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const generateComparisonTable = () => {
    const values = comparisonValues.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));

    if (values.length === 0) {
      alert(t.enterValidValues);
      return;
    }

    const tableRows: TableRow[] = [];
    let minPayment = Infinity;
    let maxPayment = 0;
    let minInterest = Infinity;
    let maxInterest = 0;
    let bestRate = '';

    values.forEach((value, index) => {
      let loanAmount = baseLoanAmount;
      let interestRate = baseInterestRate;
      let loanTerm = baseLoanTerm;
      let label = '';

      switch (tableType) {
        case 'interest_rate':
          interestRate = value;
          label = `${value}% Interest`;
          break;
        case 'loan_term':
          loanTerm = value;
          label = `${value} Years`;
          break;
        case 'loan_amount':
          loanAmount = value;
          label = `$${value.toLocaleString()}`;
          break;
      }

      const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
      const totalPayments = monthlyPayment * loanTerm * 12;
      const totalInterest = totalPayments - loanAmount;

      // Track ranges
      minPayment = Math.min(minPayment, monthlyPayment);
      maxPayment = Math.max(maxPayment, monthlyPayment);
      minInterest = Math.min(minInterest, totalInterest);
      maxInterest = Math.max(maxInterest, totalInterest);

      // Find best rate (lowest payment)
      if (monthlyPayment === minPayment) {
        bestRate = label;
      }

      tableRows.push({
        label,
        monthlyPayment,
        totalPayments,
        totalInterest
      });
    });

    // Calculate differences from base
    const basePayment = calculateMonthlyPayment(baseLoanAmount, baseInterestRate, baseLoanTerm);
    tableRows.forEach(row => {
      row.paymentDifference = row.monthlyPayment - basePayment;
    });

    setTableData(tableRows);

    // Generate summary
    const paymentRange = `$${minPayment.toFixed(0)} - $${maxPayment.toFixed(0)}`;
    const interestRange = `$${minInterest.toLocaleString()} - $${maxInterest.toLocaleString()}`;

    setSummary({
      tableSummary: `${values.length}-way comparison showing $${(maxPayment - minPayment).toFixed(0)} monthly payment difference`,
      bestRate: `${bestRate} offers best value`,
      paymentRange,
      interestRange
    });
  };

  const resetTable = () => {
    setTableType('interest_rate');
    setBaseLoanAmount(200000);
    setBaseInterestRate(6.5);
    setBaseLoanTerm(30);
    setComparisonValues('6.0,6.5,7.0,7.5,8.0');
    setTableData([]);
    setSummary({
      tableSummary: '',
      bestRate: '',
      paymentRange: '',
      interestRange: ''
    });
  };

  const exportToCSV = () => {
    if (tableData.length === 0) return;

    let csvContent = `${t.label},${t.monthlyPayment},${t.totalPayments},${t.totalInterest},${t.difference}\n`;

    tableData.forEach(row => {
      csvContent += `"${row.label}",${row.monthlyPayment.toFixed(2)},${row.totalPayments.toFixed(2)},${row.totalInterest.toFixed(2)},${row.paymentDifference?.toFixed(2) || ''}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `loan-comparison-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const printTable = () => {
    window.print();
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.tableType}</label>
              <select
                value={tableType}
                onChange={(e) => setTableType(e.target.value as 'interest_rate' | 'loan_term' | 'loan_amount')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="interest_rate">{t.compareInterestRates}</option>
                <option value="loan_term">{t.compareLoanTerms}</option>
                <option value="loan_amount">{t.compareLoanAmounts}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.baseLoanAmount}</label>
              <input
                type="number"
                value={baseLoanAmount}
                onChange={(e) => setBaseLoanAmount(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="1000"
                min="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.baseInterestRate}</label>
              <input
                type="number"
                value={baseInterestRate}
                onChange={(e) => setBaseInterestRate(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.125"
                min="0"
                max="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.baseLoanTerm}</label>
              <input
                type="number"
                value={baseLoanTerm}
                onChange={(e) => setBaseLoanTerm(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="1"
                min="1"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.comparisonValues}</label>
              <textarea
                value={comparisonValues}
                onChange={(e) => setComparisonValues(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="6.0,6.5,7.0,7.5,8.0"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateComparisonTable}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.generateTable}
            </button>
            <button
              onClick={resetTable}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t.reset}
            </button>
          </div>

          {/* Export Options */}
          {tableData.length > 0 && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={exportToCSV}
                className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
              >
                {t.exportCSV}
              </button>
              <button
                onClick={printTable}
                className="flex-1 bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700"
              >
                {t.printTable}
              </button>
            </div>
          )}

          {/* Summary */}
          {summary.tableSummary && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">{t.summary}</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <div>{summary.tableSummary}</div>
                <div>{summary.bestRate}</div>
                <div>Payment Range: {summary.paymentRange}</div>
                <div>Interest Range: {summary.interestRange}</div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {tableData.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{t.paymentComparisonTable}</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.label}</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t.monthlyPayment}</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t.totalPayments}</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t.totalInterest}</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t.difference}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tableData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.label}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">${row.monthlyPayment.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">${row.totalPayments.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                        <td className="px-4 py-3 text-sm text-red-600 text-right">${row.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                        <td className={`px-4 py-3 text-sm text-right font-medium ${
                          row.paymentDifference && row.paymentDifference > 0 ? 'text-red-600' :
                          row.paymentDifference && row.paymentDifference < 0 ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {row.paymentDifference ? (
                            row.paymentDifference > 0 ? `+$${row.paymentDifference.toFixed(2)}` :
                            row.paymentDifference < 0 ? `-$${Math.abs(row.paymentDifference).toFixed(2)}` :
                            '$0.00'
                          ) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.noData}</h3>
              <p className="text-gray-500">{t.generateComparisonTable}</p>
            </div>
          )}

          {/* Examples */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.examples}</h4>
            <div className="text-xs text-indigo-700 space-y-1">
              <div>{t.interestRateComparison}</div>
              <div>{t.loanTermComparison}</div>
              <div>{t.loanAmountComparison}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
