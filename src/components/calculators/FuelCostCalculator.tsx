'use client';

import { useState } from 'react';

interface FuelCostCalculatorProps {
  lang?: string;
}

export default function FuelCostCalculator({ lang = 'en' }: FuelCostCalculatorProps) {
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [result, setResult] = useState('');

  const translations = {
    en: {
      distance: "Distance (km/miles)",
      fuelEfficiency: "Fuel Efficiency (km/L or mpg)",
      fuelPrice: "Fuel Price per Unit",
      calculate: "🔄 Recalculate",
      result: "Total Fuel Cost",
      reset: "Reset"
    },
    es: {
      distance: "Distancia (km/millas)",
      fuelEfficiency: "Eficiencia de Combustible (km/L o mpg)",
      fuelPrice: "Precio por Unidad",
      calculate: "🔄 Recalcular",
      result: "Costo Total de Combustible",
      reset: "Restablecer"
    },
    pt: {
      distance: "Distância (km/milhas)",
      fuelEfficiency: "Eficiência de Combustível (km/L ou mpg)",
      fuelPrice: "Preço por Unidade",
      calculate: "🔄 Recalcular",
      result: "Custo Total de Combustível",
      reset: "Redefinir"
    },
    fr: {
      distance: "Distance (km/miles)",
      fuelEfficiency: "Efficacité énergétique (km/L ou mpg)",
      fuelPrice: "Prix par unité",
      calculate: "🔄 Recalculer",
      result: "Coût total du carburant",
      reset: "Réinitialiser"
    },
    de: {
      distance: "Entfernung (km/Meilen)",
      fuelEfficiency: "Kraftstoffeffizienz (km/L oder mpg)",
      fuelPrice: "Preis pro Einheit",
      calculate: "Kraftstoffkosten berechnen",
      result: "Gesamte Kraftstoffkosten",
      reset: "Zurücksetzen"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateFuelCost = () => {
    const dist = parseFloat(distance);
    const efficiency = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);

    if (isNaN(dist) || isNaN(efficiency) || isNaN(price) || efficiency === 0) return;

    const fuelNeeded = dist / efficiency;
    const totalCost = fuelNeeded * price;

    setResult(totalCost.toFixed(2));
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.distance}</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.fuelEfficiency}</label>
          <input
            type="number"
            value={fuelEfficiency}
            onChange={(e) => setFuelEfficiency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.fuelPrice}</label>
          <input
            type="number"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={calculateFuelCost}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {t.calculate}
        </button>

        {result && (
          <div className="bg-green-50 p-4 rounded-lg">
            <div><strong>{t.result}:</strong> ${result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
