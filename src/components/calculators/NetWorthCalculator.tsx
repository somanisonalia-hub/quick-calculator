'use client';

import { useState } from 'react';

interface NetWorthCalculatorProps {
  lang?: string;
}

export default function NetWorthCalculator({ lang = 'en' }: NetWorthCalculatorProps) {
  const translations = {
    en: {
      title: "Net Worth Calculator",
      assets: "Assets",
      cash: "Cash & Bank Accounts ($)",
      investments: "Investments ($)",
      realEstate: "Real Estate Value ($)",
      vehicles: "Vehicles ($)",
      otherAssets: "Other Assets ($)",
      liabilities: "Liabilities",
      mortgage: "Mortgage Balance ($)",
      loans: "Loans ($)",
      creditCards: "Credit Card Debt ($)",
      otherDebts: "Other Debts ($)",
      calculate: "Calculate Net Worth",
      results: "Results",
      totalAssets: "Total Assets",
      totalLiabilities: "Total Liabilities",
      netWorth: "Net Worth",
      status: "Financial Status",
      positive: "Positive net worth - Good job!",
      negative: "Negative net worth - Focus on reducing debt",
    },
    es: {
      title: "Calculadora de Patrimonio Neto",
      assets: "Activos",
      cash: "Efectivo y Cuentas Bancarias ($)",
      investments: "Inversiones ($)",
      realEstate: "Valor de Bienes Raíces ($)",
      vehicles: "Vehículos ($)",
      otherAssets: "Otros Activos ($)",
      liabilities: "Pasivos",
      mortgage: "Saldo de Hipoteca ($)",
      loans: "Préstamos ($)",
      creditCards: "Deuda de Tarjetas de Crédito ($)",
      otherDebts: "Otras Deudas ($)",
      calculate: "Calcular Patrimonio Neto",
      results: "Resultados",
      totalAssets: "Activos Totales",
      totalLiabilities: "Pasivos Totales",
      netWorth: "Patrimonio Neto",
      status: "Estado Financiero",
      positive: "Patrimonio neto positivo - ¡Buen trabajo!",
      negative: "Patrimonio neto negativo - Enfócate en reducir deudas",
    },
    fr: {
      title: "Calculateur de Valeur Nette",
      assets: "Actifs",
      cash: "Espèces et Comptes Bancaires ($)",
      investments: "Investissements ($)",
      realEstate: "Valeur Immobilière ($)",
      vehicles: "Véhicules ($)",
      otherAssets: "Autres Actifs ($)",
      liabilities: "Passifs",
      mortgage: "Solde Hypothécaire ($)",
      loans: "Prêts ($)",
      creditCards: "Dette de Carte de Crédit ($)",
      otherDebts: "Autres Dettes ($)",
      calculate: "Calculer la Valeur Nette",
      results: "Résultats",
      totalAssets: "Actifs Totaux",
      totalLiabilities: "Passifs Totaux",
      netWorth: "Valeur Nette",
      status: "Statut Financier",
      positive: "Valeur nette positive - Bon travail !",
      negative: "Valeur nette négative - Concentrez-vous sur la réduction de la dette",
    },
    pt: {
      title: "Calculadora de Patrimônio Líquido",
      assets: "Ativos",
      cash: "Dinheiro e Contas Bancárias ($)",
      investments: "Investimentos ($)",
      realEstate: "Valor Imobiliário ($)",
      vehicles: "Veículos ($)",
      otherAssets: "Outros Ativos ($)",
      liabilities: "Passivos",
      mortgage: "Saldo da Hipoteca ($)",
      loans: "Empréstimos ($)",
      creditCards: "Dívida de Cartão de Crédito ($)",
      otherDebts: "Outras Dívidas ($)",
      calculate: "Calcular Patrimônio Líquido",
      results: "Resultados",
      totalAssets: "Ativos Totais",
      totalLiabilities: "Passivos Totais",
      netWorth: "Patrimônio Líquido",
      status: "Status Financeiro",
      positive: "Patrimônio líquido positivo - Bom trabalho!",
      negative: "Patrimônio líquido negativo - Foque em reduzir dívidas",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [cash, setCash] = useState<number>(25000);
  const [investments, setInvestments] = useState<number>(75000);
  const [realEstate, setRealEstate] = useState<number>(350000);
  const [vehicles, setVehicles] = useState<number>(20000);
  const [otherAssets, setOtherAssets] = useState<number>(10000);
  
  const [mortgage, setMortgage] = useState<number>(250000);
  const [loans, setLoans] = useState<number>(15000);
  const [creditCards, setCreditCards] = useState<number>(5000);
  const [otherDebts, setOtherDebts] = useState<number>(3000);
  
  const [calculated, setCalculated] = useState(false);

  const calculateNetWorth = () => {
    const totalAssets = cash + investments + realEstate + vehicles + otherAssets;
    const totalLiabilities = mortgage + loans + creditCards + otherDebts;
    const netWorth = totalAssets - totalLiabilities;

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      isPositive: netWorth > 0,
    };
  };

  const results = calculateNetWorth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold mb-4 text-green-600">{t.assets}</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.cash}</label>
            <input
              type="number"
              value={cash}
              onChange={(e) => setCash(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.investments}</label>
            <input
              type="number"
              value={investments}
              onChange={(e) => setInvestments(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.realEstate}</label>
            <input
              type="number"
              value={realEstate}
              onChange={(e) => setRealEstate(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.vehicles}</label>
            <input
              type="number"
              value={vehicles}
              onChange={(e) => setVehicles(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.otherAssets}</label>
            <input
              type="number"
              value={otherAssets}
              onChange={(e) => setOtherAssets(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4 text-red-600">{t.liabilities}</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.mortgage}</label>
            <input
              type="number"
              value={mortgage}
              onChange={(e) => setMortgage(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.loans}</label>
            <input
              type="number"
              value={loans}
              onChange={(e) => setLoans(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.creditCards}</label>
            <input
              type="number"
              value={creditCards}
              onChange={(e) => setCreditCards(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.otherDebts}</label>
            <input
              type="number"
              value={otherDebts}
              onChange={(e) => setOtherDebts(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {t.calculate}
        </button>
      </div>

      {calculated && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">{t.results}</h3>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.totalAssets}</div>
              <div className="text-2xl font-bold text-green-600">
                ${results.totalAssets.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.totalLiabilities}</div>
              <div className="text-2xl font-bold text-red-600">
                ${results.totalLiabilities.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>

            <div className={`${results.isPositive ? 'bg-blue-50' : 'bg-orange-50'} p-4 rounded-lg`}>
              <div className="text-sm text-gray-600 mb-1">{t.netWorth}</div>
              <div className={`text-3xl font-bold ${results.isPositive ? 'text-blue-600' : 'text-orange-600'}`}>
                ${results.netWorth.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-2">{t.status}</h4>
            <p className={`${results.isPositive ? 'text-green-600' : 'text-orange-600'} font-medium`}>
              {results.isPositive ? `✓ ${t.positive}` : `⚠ ${t.negative}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
