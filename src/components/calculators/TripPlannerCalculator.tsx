'use client';

import { useState } from 'react';

interface TripPlannerCalculatorProps {
  lang?: string;
}

export default function TripPlannerCalculator({ lang = 'en' }: TripPlannerCalculatorProps) {
  const translations = {
    en: {
      title: "Trip Planner Calculator",
      distance: "Distance (miles)",
      averageSpeed: "Average Speed (mph)",
      fuelEfficiency: "Fuel Efficiency (mpg)",
      fuelPrice: "Fuel Price ($/gallon)",
      calculate: "Calculate Trip",
      results: "Results",
      travelTime: "Travel Time",
      fuelNeeded: "Fuel Needed",
      fuelCost: "Fuel Cost",
      hours: "hours",
      minutes: "minutes",
      gallons: "gallons",
    },
    es: {
      title: "Calculadora de Planificación de Viaje",
      distance: "Distancia (millas)",
      averageSpeed: "Velocidad Promedio (mph)",
      fuelEfficiency: "Eficiencia de Combustible (mpg)",
      fuelPrice: "Precio del Combustible ($/galón)",
      calculate: "Calcular Viaje",
      results: "Resultados",
      travelTime: "Tiempo de Viaje",
      fuelNeeded: "Combustible Necesario",
      fuelCost: "Costo de Combustible",
      hours: "horas",
      minutes: "minutos",
      gallons: "galones",
    },
    fr: {
      title: "Calculateur de Planification de Voyage",
      distance: "Distance (miles)",
      averageSpeed: "Vitesse Moyenne (mph)",
      fuelEfficiency: "Efficacité Énergétique (mpg)",
      fuelPrice: "Prix du Carburant ($/gallon)",
      calculate: "Calculer le Voyage",
      results: "Résultats",
      travelTime: "Temps de Voyage",
      fuelNeeded: "Carburant Nécessaire",
      fuelCost: "Coût du Carburant",
      hours: "heures",
      minutes: "minutes",
      gallons: "gallons",
    },
    pt: {
      title: "Calculadora de Planejamento de Viagem",
      distance: "Distância (milhas)",
      averageSpeed: "Velocidade Média (mph)",
      fuelEfficiency: "Eficiência de Combustível (mpg)",
      fuelPrice: "Preço do Combustível ($/galão)",
      calculate: "Calcular Viagem",
      results: "Resultados",
      travelTime: "Tempo de Viagem",
      fuelNeeded: "Combustível Necessário",
      fuelCost: "Custo de Combustível",
      hours: "horas",
      minutes: "minutos",
      gallons: "galões",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [distance, setDistance] = useState<number>(250);
  const [averageSpeed, setAverageSpeed] = useState<number>(65);
  const [fuelEfficiency, setFuelEfficiency] = useState<number>(28);
  const [fuelPrice, setFuelPrice] = useState<number>(3.5);
  const [calculated, setCalculated] = useState(false);

  const calculateTrip = () => {
    const timeHours = distance / averageSpeed;
    const hours = Math.floor(timeHours);
    const minutes = Math.round((timeHours - hours) * 60);
    const fuelNeeded = distance / fuelEfficiency;
    const fuelCost = fuelNeeded * fuelPrice;

    return {
      hours,
      minutes,
      fuelNeeded,
      fuelCost,
    };
  };

  const results = calculateTrip();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.distance}
            </label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.averageSpeed}
            </label>
            <input
              type="number"
              value={averageSpeed}
              onChange={(e) => setAverageSpeed(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.fuelEfficiency}
            </label>
            <input
              type="number"
              step="0.1"
              value={fuelEfficiency}
              onChange={(e) => setFuelEfficiency(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.fuelPrice}
            </label>
            <input
              type="number"
              step="0.01"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {t.calculate}
        </button>
      </div>

      {calculated && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">{t.results}</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.travelTime}</div>
              <div className="text-2xl font-bold text-blue-600">
                {results.hours}h {results.minutes}m
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.fuelNeeded}</div>
              <div className="text-2xl font-bold text-green-600">
                {results.fuelNeeded.toFixed(1)} {t.gallons}
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t.fuelCost}</div>
              <div className="text-2xl font-bold text-purple-600">
                ${results.fuelCost.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
