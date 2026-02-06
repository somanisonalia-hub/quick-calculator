'use client';

import { useState, useEffect } from 'react';

interface SalesTaxCalculatorProps {
  lang?: string;
}

export default function SalesTaxCalculator({ lang = 'en' }: SalesTaxCalculatorProps) {
  const [preTaxPrice, setPreTaxPrice] = useState(100);
  const [taxRate, setTaxRate] = useState(8.5);
  const [additionalFees, setAdditionalFees] = useState(0);

  const [results, setResults] = useState({
    taxAmount: 0,
    totalPrice: 0,
    taxRateDecimal: 0,
    percentageOfTotal: 0
  });

  const translations = {
    en: {
      title: "Sales Tax Calculator",
      description: "Calculate sales tax amount and total price including tax",
      preTaxPrice: "Pre-tax Price ($)",
      taxRate: "Sales Tax Rate (%)",
      additionalFees: "Additional Fees ($)",
      calculate: "Calculate Tax",
      reset: "Reset",
      taxBreakdown: "Tax Breakdown",
      taxAmount: "Sales Tax Amount",
      totalPrice: "Total Price (Including Tax)",
      taxRateDecimal: "Tax Rate (Decimal)",
      percentageOfTotal: "Tax as % of Total",
      priceBreakdown: "Price Breakdown",
      subtotal: "Subtotal",
      tax: "Tax",
      fees: "Additional Fees",
      grandTotal: "Grand Total",
      commonTaxRates: "Common Tax Rates",
      examples: "Examples",
      tip: "Tip: Sales tax rates vary by location and product type. Check your local tax authority for current rates."
    },
    es: {
      title: "Calculadora de Impuesto sobre Ventas",
      description: "Calcula el monto del impuesto sobre ventas y el precio total incluyendo impuestos",
      preTaxPrice: "Precio Antes de Impuestos ($)",
      taxRate: "Tasa de Impuesto sobre Ventas (%)",
      additionalFees: "Cargos Adicionales ($)",
      calculate: "Calcular Impuesto",
      reset: "Reiniciar",
      taxBreakdown: "Desglose de Impuestos",
      taxAmount: "Monto del Impuesto sobre Ventas",
      totalPrice: "Precio Total (Incluyendo Impuestos)",
      taxRateDecimal: "Tasa de Impuesto (Decimal)",
      percentageOfTotal: "Impuesto como % del Total",
      priceBreakdown: "Desglose de Precio",
      subtotal: "Subtotal",
      tax: "Impuesto",
      fees: "Cargos Adicionales",
      grandTotal: "Total General",
      commonTaxRates: "Tasas de Impuestos Comunes",
      examples: "Ejemplos",
      tip: "Consejo: Las tasas de impuesto sobre ventas varían por ubicación y tipo de producto. Consulta a tu autoridad tributaria local para las tasas actuales."
    },
    pt: {
      title: "Calculadora de Imposto sobre Vendas",
      description: "Calcule o valor do imposto sobre vendas e o preço total incluindo impostos",
      preTaxPrice: "Preço Antes de Impostos ($)",
      taxRate: "Taxa de Imposto sobre Vendas (%)",
      additionalFees: "Taxas Adicionais ($)",
      calculate: "Calcular Imposto",
      reset: "Reiniciar",
      taxBreakdown: "Detalhamento de Impostos",
      taxAmount: "Valor do Imposto sobre Vendas",
      totalPrice: "Preço Total (Incluindo Impostos)",
      taxRateDecimal: "Taxa de Imposto (Decimal)",
      percentageOfTotal: "Imposto como % do Total",
      priceBreakdown: "Detalhamento de Preço",
      subtotal: "Subtotal",
      tax: "Imposto",
      fees: "Taxas Adicionais",
      grandTotal: "Total Geral",
      commonTaxRates: "Taxas de Impostos Comuns",
      examples: "Exemplos",
      tip: "Dica: As taxas de imposto sobre vendas variam por localização e tipo de produto. Verifique com a autoridade tributária local para as taxas atuais."
    },
    fr: {
      title: "Calculateur de Taxe de Vente",
      description: "Calculez le montant de la taxe de vente et le prix total incluant les taxes",
      preTaxPrice: "Prix Avant Taxes ($)",
      taxRate: "Taux de Taxe de Vente (%)",
      additionalFees: "Frais Supplémentaires ($)",
      calculate: "Calculer la Taxe",
      reset: "Réinitialiser",
      taxBreakdown: "Détail des Taxes",
      taxAmount: "Montant de la Taxe de Vente",
      totalPrice: "Prix Total (Taxes Incluses)",
      taxRateDecimal: "Taux de Taxe (Décimal)",
      percentageOfTotal: "Taxe en % du Total",
      priceBreakdown: "Détail du Prix",
      subtotal: "Sous-total",
      tax: "Taxe",
      fees: "Frais Supplémentaires",
      grandTotal: "Total Général",
      commonTaxRates: "Taux de Taxes Courants",
      examples: "Exemples",
      tip: "Conseil: Les taux de taxe de vente varient selon l'emplacement et le type de produit. Vérifiez auprès de votre autorité fiscale locale pour les taux actuels."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateTax = () => {
    const taxAmount = preTaxPrice * (taxRate / 100);
    const totalPrice = preTaxPrice + taxAmount + additionalFees;
    const taxRateDecimal = taxRate / 100;
    const percentageOfTotal = (taxAmount / totalPrice) * 100;

    setResults({
      taxAmount,
      totalPrice,
      taxRateDecimal,
      percentageOfTotal
    });
  };

  useEffect(() => {
    calculateTax();
  }, [preTaxPrice, taxRate, additionalFees]);

  const resetCalculator = () => {
    setPreTaxPrice(100);
    setTaxRate(8.5);
    setAdditionalFees(0);
  };

  const commonTaxRates = [
    { location: "California", rate: 8.25 },
    { location: "New York", rate: 8.875 },
    { location: "Texas", rate: 6.25 },
    { location: "Florida", rate: 6.0 },
    { location: "Illinois", rate: 6.25 },
    { location: "Canada (GST)", rate: 5.0 }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.preTaxPrice}</label>
            <input
              type="number"
              value={preTaxPrice}
              onChange={(e) => setPreTaxPrice(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.taxRate}</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="30"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.additionalFees}</label>
            <input
              type="number"
              value={additionalFees}
              onChange={(e) => setAdditionalFees(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
            <p className="text-xs text-gray-500 mt-1">Shipping, handling, or other fees</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateTax}
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

          {/* Tip */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">{t.tip}</p>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-3">{t.taxBreakdown}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-green-700">{t.taxAmount}:</span>
                <span className="font-bold text-green-900">${results.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">{t.totalPrice}:</span>
                <span className="font-bold text-green-900">${results.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-green-300 pt-2">
                <span className="text-sm text-green-700">{t.taxRateDecimal}:</span>
                <span className="font-bold text-green-900">{results.taxRateDecimal.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">{t.percentageOfTotal}:</span>
                <span className="font-bold text-green-900">{results.percentageOfTotal.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-3">{t.priceBreakdown}</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>{t.subtotal}:</span>
                <span>${preTaxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.tax} ({taxRate}%):</span>
                <span>${results.taxAmount.toFixed(2)}</span>
              </div>
              {additionalFees > 0 && (
                <div className="flex justify-between">
                  <span>{t.fees}:</span>
                  <span>${additionalFees.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-blue-300 pt-1 font-bold">
                <span>{t.grandTotal}:</span>
                <span>${results.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Common Tax Rates */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-900 mb-3">{t.commonTaxRates}</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {commonTaxRates.map((rate, index) => (
                <button
                  key={index}
                  onClick={() => setTaxRate(rate.rate)}
                  className="text-left p-2 bg-white rounded border hover:bg-purple-100 transition-colors"
                >
                  <div className="font-medium">{rate.location}</div>
                  <div className="text-purple-600">{rate.rate}%</div>
                </button>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-orange-900 mb-2">{t.examples}</h4>
            <div className="text-xs text-orange-700 space-y-1">
              <div>$50 item at 8.5% tax = $54.25 total</div>
              <div>$100 item at 10% tax = $110.00 total</div>
              <div>$25 item at 6% tax = $26.50 total</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
