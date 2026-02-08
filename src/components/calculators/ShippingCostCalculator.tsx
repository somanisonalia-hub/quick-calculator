'use client';

import { useState } from 'react';

interface ShippingCostCalculatorProps {
  lang?: string;
}

export default function ShippingCostCalculator({ lang = 'en' }: ShippingCostCalculatorProps) {
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState('');
  const [method, setMethod] = useState('standard');
  const [result, setResult] = useState('');

  const translations = {
    en: {
      weight: "Package Weight (kg)",
      distance: "Distance (km)",
      method: "Shipping Method",
      standard: "Standard",
      express: "Express",
      overnight: "Overnight",
      calculate: "🔄 Recalculate",
      result: "Estimated Shipping Cost",
      reset: "Reset"
    },
    es: {
      weight: "Peso del Paquete (kg)",
      distance: "Distancia (km)",
      method: "Método de Envío",
      standard: "Estándar",
      express: "Exprés",
      overnight: "De la Noche a la Mañana",
      calculate: "🔄 Recalcular",
      result: "Costo de Envío Estimado",
      reset: "Restablecer"
    },
    pt: {
      weight: "Peso do Pacote (kg)",
      distance: "Distância (km)",
      method: "Método de Envio",
      standard: "Padrão",
      express: "Expresso",
      overnight: "Durante a Noite",
      calculate: "🔄 Recalcular",
      result: "Custo de Envio Estimado",
      reset: "Redefinir"
    },
    fr: {
      weight: "Poids du Colis (kg)",
      distance: "Distance (km)",
      method: "Méthode d'expédition",
      standard: "Standard",
      express: "Express",
      overnight: "Nuit",
      calculate: "🔄 Recalculer",
      result: "Frais d'expédition estimés",
      reset: "Réinitialiser"
    },
    de: {
      weight: "Paketgewicht (kg)",
      distance: "Entfernung (km)",
      method: "Versandmethode",
      standard: "Standard",
      express: "Express",
      overnight: "Über Nacht",
      calculate: "Versandkosten berechnen",
      result: "Geschätzte Versandkosten",
      reset: "Zurücksetzen"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateShipping = () => {
    const w = parseFloat(weight);
    const d = parseFloat(distance);

    if (isNaN(w) || isNaN(d)) return;

    // Simple estimation formula
    let baseRate = w * 0.5; // $0.50 per kg
    let distanceRate = d * 0.01; // $0.01 per km
    
    let multiplier = 1;
    if (method === 'express') multiplier = 1.5;
    if (method === 'overnight') multiplier = 2.5;

    const total = (baseRate + distanceRate) * multiplier;

    setResult(total.toFixed(2));
  };

  const resetCalculator = () => {
    // Reset all input values to defaults
    const initial: Record<string, number> = {};
    inputs?.forEach(input => {
      initial[input.name] = input.default || 0;
    });
    setValues(initial);
    setResults({});
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.weight}</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.distance}</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.method}</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="standard">{t.standard}</option>
            <option value="express">{t.express}</option>
            <option value="overnight">{t.overnight}</option>
          </select>
        </div>

        <button
          onClick={calculateShipping}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t.calculate}
        </button>

        <button
          onClick={resetCalculator}
          className="w-full bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
        >
          {t.reset}
        </button>
      </div>

      <div className="space-y-4">
        {result && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div><strong>{t.result}:</strong> ${result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
