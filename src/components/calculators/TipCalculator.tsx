'use client';

import { useState } from 'react';

interface TipCalculatorProps {
  lang?: string;
}

export default function TipCalculator({ lang = 'en' }: TipCalculatorProps) {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [tipAmount, setTipAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const translations = {
    en: {
      title: "Tip Calculator",
      description: "Calculate tips and split bills easily",
      billAmount: "Bill Amount",
      tipPercentage: "Tip Percentage",
      calculateTip: "🔄 Recalculate",
      tipAmount: "Tip Amount",
      totalAmount: "Total Amount",
      currency: "$",
      calculate: "🔄 Recalculate",
      reset: "Reset"
    },
    es: {
      title: "Calculadora de Propinas",
      description: "Calcula propinas y divide cuentas fácilmente",
      billAmount: "Monto de la Cuenta",
      tipPercentage: "Porcentaje de Propina",
      calculateTip: "🔄 Recalcular",
      tipAmount: "Monto de Propina",
      totalAmount: "Monto Total",
      currency: "$",
      calculate: "🔄 Recalcular",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora de Gorjeta",
      description: "Calcule gorjetas e divida contas facilmente",
      billAmount: "Valor da Conta",
      tipPercentage: "Porcentagem da Gorjeta",
      calculateTip: "🔄 Recalcular",
      tipAmount: "Valor da Gorjeta",
      totalAmount: "Valor Total",
      currency: "R$",
      calculate: "🔄 Recalcular",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur de Pourboire",
      description: "Calculez les pourboires et divisez les factures facilement",
      billAmount: "Montant de la Facture",
      tipPercentage: "Pourcentage de Pourboire",
      calculateTip: "🔄 Recalculer",
      tipAmount: "Montant du Pourboire",
      totalAmount: "Montant Total",
      currency: "€",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser"
    },
    de: {
      title: "Trinkgeldrechner",
      description: "Berechnen Sie Trinkgelder und teilen Sie Rechnungen ganz einfach",
      billAmount: "Rechnungsbetrag",
      tipPercentage: "Trinkgeldprozentsatz",
      calculateTip: "Trinkgeld berechnen",
      tipAmount: "Trinkgeldbetrag",
      totalAmount: "Gesamtbetrag",
      currency: "€",
      calculate: "🔄 Neu berechnen",
      reset: "Zurücksetzen"
    },
    nl: {
      title: "Fooicalculator",
      description: "Bereken fooien en verdeel rekeningen eenvoudig",
      billAmount: "Rekeneningbedrag",
      tipPercentage: "Fooi Percentage",
      calculateTip: "Fooi berekenen",
      tipAmount: "Fooibedrag",
      totalAmount: "Totaal bedrag",
      currency: "€",
      calculate: "🔄 Herberekenen",
      reset: "Resetten"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    if (isNaN(bill)) return;

    const tip = (bill * tipPercentage) / 100;
    const total = bill + tip;

    setTipAmount(tip.toFixed(2));
    setTotalAmount(total.toFixed(2));
  };



  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.billAmount}</label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.tipPercentage}</label>
            <input
              type="number"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={calculateTip}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t.calculateTip}
          </button>
        </div>

        <div className="space-y-4">
          {tipAmount && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div><strong>{t.tipAmount}:</strong> {t.currency}{tipAmount}</div>
                <div><strong>{t.totalAmount}:</strong> {t.currency}{totalAmount}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
