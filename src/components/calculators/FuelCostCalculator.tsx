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
      calculate: "Calculate Fuel Cost",
      result: "Total Fuel Cost"
    },
    es: {
      distance: "Distancia (km/millas)",
      fuelEfficiency: "Eficiencia de Combustible (km/L o mpg)",
      fuelPrice: "Precio por Unidad",
      calculate: "Calcular Costo de Combustible",
      result: "Costo Total de Combustible"
    },
    pt: {
      distance: "Distância (km/milhas)",
      fuelEfficiency: "Eficiência de Combustível (km/L ou mpg)",
      fuelPrice: "Preço por Unidade",
      calculate: "Calcular Custo de Combustível",
      result: "Custo Total de Combustível"
    },
    fr: {
      distance: "Distance (km/miles)",
      fuelEfficiency: "Efficacité énergétique (km/L ou mpg)",
      fuelPrice: "Prix par unité",
      calculate: "Calculer le coût du carburant",
      result: "Coût total du carburant"
    },
    de: {
      distance: "Entfernung (km/Meilen)",
      fuelEfficiency: "Kraftstoffeffizienz (km/L oder mpg)",
      fuelPrice: "Preis pro Einheit",
      calculate: "Kraftstoffkosten berechnen",
      result: "Gesamte Kraftstoffkosten"
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
