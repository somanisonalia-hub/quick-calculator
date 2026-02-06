'use client';

import { useState } from 'react';

interface DiscountCalculatorProps {
  lang?: string;
}

export default function DiscountCalculator({ lang = 'en' }: DiscountCalculatorProps) {
  const [originalPrice, setOriginalPrice] = useState<number>(100);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [quantity, setQuantity] = useState<number>(1);
  const [showBreakdown, setShowBreakdown] = useState(true);

  const translations = {
    en: {
      title: 'Discount Calculator',
      originalPrice: 'Original Price',
      discountPercent: 'Discount (%)',
      quantity: 'Quantity',
      calculate: 'Calculate',
      results: 'Results',
      discountAmount: 'Discount Amount',
      pricePerItem: 'Price Per Item (After Discount)',
      totalOriginal: 'Total Original Price',
      totalDiscount: 'Total Discount',
      totalAfterDiscount: 'Total After Discount',
      savings: 'You Save',
      breakdown: 'Breakdown',
      hideBreakdown: 'Hide Breakdown',
      showBreakdown: 'Show Breakdown',
      perItem: 'Per Item',
      subtotal: 'Subtotal',
      discountBreakdown: 'Discount Breakdown',
      finalTotal: 'Final Total',
      originalPriceQty: 'Original Price × Quantity',
      discountLabel: 'Discount',
    },
    es: {
      title: 'Calculadora de Descuentos',
      originalPrice: 'Precio Original',
      discountPercent: 'Descuento (%)',
      quantity: 'Cantidad',
      calculate: 'Calcular',
      results: 'Resultados',
      discountAmount: 'Cantidad de Descuento',
      pricePerItem: 'Precio por Artículo (Después del Descuento)',
      totalOriginal: 'Precio Total Original',
      totalDiscount: 'Descuento Total',
      totalAfterDiscount: 'Total Después del Descuento',
      savings: 'Ahorras',
      breakdown: 'Desglose',
      hideBreakdown: 'Ocultar Desglose',
      showBreakdown: 'Mostrar Desglose',
      perItem: 'Por Artículo',
      subtotal: 'Subtotal',
      discountBreakdown: 'Desglose de Descuento',
      finalTotal: 'Total Final',
      originalPriceQty: 'Precio Original × Cantidad',
      discountLabel: 'Descuento',
    },
    pt: {
      title: 'Calculadora de Desconto',
      originalPrice: 'Preço Original',
      discountPercent: 'Desconto (%)',
      quantity: 'Quantidade',
      calculate: 'Calcular',
      results: 'Resultados',
      discountAmount: 'Valor do Desconto',
      pricePerItem: 'Preço por Item (Após Desconto)',
      totalOriginal: 'Preço Total Original',
      totalDiscount: 'Desconto Total',
      totalAfterDiscount: 'Total Após Desconto',
      savings: 'Você Economiza',
      breakdown: 'Detalhamento',
      hideBreakdown: 'Ocultar Detalhamento',
      showBreakdown: 'Mostrar Detalhamento',
      perItem: 'Por Item',
      subtotal: 'Subtotal',
      discountBreakdown: 'Detalhamento do Desconto',
      finalTotal: 'Total Final',
      originalPriceQty: 'Preço Original × Quantidade',
      discountLabel: 'Desconto',
    },
    fr: {
      title: 'Calculatrice de Remise',
      originalPrice: 'Prix Original',
      discountPercent: 'Remise (%)',
      quantity: 'Quantité',
      calculate: 'Calculer',
      results: 'Résultats',
      discountAmount: 'Montant de la Remise',
      pricePerItem: 'Prix par Article (Après Remise)',
      totalOriginal: 'Prix Total Original',
      totalDiscount: 'Remise Totale',
      totalAfterDiscount: 'Total Après Remise',
      savings: 'Vous Économisez',
      breakdown: 'Détails',
      hideBreakdown: 'Masquer les Détails',
      showBreakdown: 'Afficher les Détails',
      perItem: 'Par Article',
      subtotal: 'Sous-total',
      discountBreakdown: 'Détails de la Remise',
      finalTotal: 'Total Final',
      originalPriceQty: 'Prix Original × Quantité',
      discountLabel: 'Remise',
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Calculations
  const discountAmount = originalPrice * (discountPercent / 100);
  const priceAfterDiscount = originalPrice - discountAmount;
  const totalOriginal = originalPrice * quantity;
  const totalDiscountAmount = discountAmount * quantity;
  const totalAfterDiscount = priceAfterDiscount * quantity;

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t.breakdown}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Original Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.originalPrice} ($)
            </label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="0.01"
            />
          </div>

          {/* Discount Percentage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.discountPercent}
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="100"
                step="0.1"
              />
              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg">
                <span className="text-sm font-medium text-gray-700">%</span>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.quantity}
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              step="1"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.results}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Per Item */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">{t.perItem}</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.originalPrice}:</span>
                <span className="font-medium text-gray-900">${originalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-green-600">
                <span className="text-sm">{t.discountAmount}:</span>
                <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-blue-200 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{t.pricePerItem}:</span>
                <span className="text-lg font-bold text-blue-600">${priceAfterDiscount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-1">{t.subtotal} (×{quantity})</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t.totalOriginal}:</span>
                <span className="font-medium text-gray-900">${totalOriginal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-green-600">
                <span className="text-sm">{t.totalDiscount}:</span>
                <span className="font-semibold">-${totalDiscountAmount.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-green-200 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{t.totalAfterDiscount}:</span>
                <span className="text-lg font-bold text-green-600">${totalAfterDiscount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Highlight */}
        <div className="mt-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.savings}</p>
              <p className="text-2xl font-bold text-orange-600">${totalDiscountAmount.toFixed(2)}</p>
            </div>
            <svg className="w-12 h-12 text-orange-400 opacity-50" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Breakdown Toggle */}
      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
      >
        {showBreakdown ? t.hideBreakdown : t.showBreakdown}
      </button>

      {/* Detailed Breakdown */}
      {showBreakdown && (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.discountBreakdown}</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-700">{t.originalPriceQty}:</span>
              <span className="font-medium">${originalPrice.toFixed(2)} × {quantity} = ${totalOriginal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 text-green-600">
              <span className="text-gray-700">{t.discountLabel} ({discountPercent}%):</span>
              <span className="font-medium">-${totalDiscountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 text-lg font-bold text-blue-600">
              <span>{t.finalTotal}:</span>
              <span>${totalAfterDiscount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
