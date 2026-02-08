'use client';

import { useState, useEffect } from 'react';

interface CaloriesBurnedCalculatorProps {
  lang?: string;
}

export default function CaloriesBurnedCalculator({ lang = 'en' }: CaloriesBurnedCalculatorProps) {
  const [weight, setWeight] = useState(70);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [activity, setActivity] = useState('walking');
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState<'light' | 'moderate' | 'vigorous'>('moderate');

  const [results, setResults] = useState({
    caloriesBurned: 0,
    metabolicRate: 0,
    hourlyBurn: 0,
    dailyBurn: 0
  });

  const activityMETs = {
    walking: { light: 2.8, moderate: 3.5, vigorous: 5.0 },
    running: { light: 6.0, moderate: 9.8, vigorous: 12.3 },
    cycling: { light: 3.5, moderate: 7.5, vigorous: 12.5 },
    swimming: { light: 3.5, moderate: 8.0, vigorous: 11.0 },
    dancing: { light: 4.5, moderate: 7.0, vigorous: 11.0 },
    basketball: { light: 6.0, moderate: 8.0, vigorous: 10.0 },
    soccer: { light: 7.0, moderate: 10.0, vigorous: 12.0 },
    yoga: { light: 2.5, moderate: 4.0, vigorous: 6.0 },
    hiit: { light: 8.0, moderate: 11.0, vigorous: 13.0 },
    gardening: { light: 3.5, moderate: 4.5, vigorous: 6.0 }
  };

  const translations = {
    en: {
      title: "Calories Burned Calculator",
      description: "Calculate how many calories you burn during physical activities",
      weight: "Weight",
      kg: "kg",
      lbs: "lbs",
      activity: "Activity Type",
      duration: "Duration (minutes)",
      intensity: "Intensity",
      light: "Light",
      moderate: "Moderate",
      vigorous: "Vigorous",
      results: "Calories Burned Results",
      caloriesBurned: "Total Calories Burned",
      metabolicRate: "Caloric Burn Rate",
      hourlyBurn: "Hourly Burn Rate",
      dailyBurn: "Daily Burn (8 hrs)",
      reset: "Reset",
      calculate: "🔄 Recalculate"
    },
    es: {
      title: "Calculadora de Calorías Quemadas",
      description: "Calcula cuántas calorías quemas durante actividades físicas",
      weight: "Peso",
      kg: "kg",
      lbs: "lbs",
      activity: "Tipo de Actividad",
      duration: "Duración (minutos)",
      intensity: "Intensidad",
      light: "Ligera",
      moderate: "Moderada",
      vigorous: "Vigorosa",
      results: "Resultados de Calorías Quemadas",
      caloriesBurned: "Total de Calorías Quemadas",
      metabolicRate: "Tasa de Quema Calórica",
      hourlyBurn: "Tasa de Quema por Hora",
      dailyBurn: "Quema Diaria (8 hrs)",
      reset: "Reiniciar",
      calculate: "🔄 Recalcular"
    },
    pt: {
      title: "Calculadora de Calorias Queimadas",
      description: "Calcule quantas calorias você queima durante atividades físicas",
      weight: "Peso",
      kg: "kg",
      lbs: "lbs",
      activity: "Tipo de Atividade",
      duration: "Duração (minutos)",
      intensity: "Intensidade",
      light: "Leve",
      moderate: "Moderada",
      vigorous: "Vigorosa",
      results: "Resultados de Calorias Queimadas",
      caloriesBurned: "Total de Calorias Queimadas",
      metabolicRate: "Taxa de Quema de Calorias",
      hourlyBurn: "Taxa de Quema por Hora",
      dailyBurn: "Quema Diária (8 hrs)",
      reset: "Reiniciar",
      calculate: "🔄 Recalcular"
    },
    fr: {
      title: "Calculateur de Calories Brûlées",
      description: "Calculez combien de calories vous brûlez lors d'activités physiques",
      weight: "Poids",
      kg: "kg",
      lbs: "lbs",
      activity: "Type d'Activité",
      duration: "Durée (minutes)",
      intensity: "Intensité",
      light: "Léger",
      moderate: "Modéré",
      vigorous: "Vigoureux",
      results: "Résultats des Calories Brûlées",
      caloriesBurned: "Total de Calories Brûlées",
      metabolicRate: "Taux de Brûlure Calorique",
      hourlyBurn: "Taux de Brûlure par Heure",
      dailyBurn: "Brûlure Quotidienne (8 hrs)",
      reset: "Réinitialiser",
      calculate: "🔄 Recalculer"
    },
    de: {
      title: "Kalorienverbrauch-Rechner",
      description: "Berechnen Sie, wie viele Kalorien Sie bei körperlicher Aktivität verbrennen",
      weight: "Gewicht",
      kg: "kg",
      lbs: "lbs",
      activity: "Aktivitätstyp",
      duration: "Dauer (Minuten)",
      intensity: "Intensität",
      light: "Leicht",
      moderate: "Moderat",
      vigorous: "Intensiv",
      results: "Kalorienverbrauch-Ergebnisse",
      caloriesBurned: "Gesamtkalorien verbrannt",
      metabolicRate: "Kalorienverbrauchsrate",
      hourlyBurn: "Stündliche Verbrauchsrate",
      dailyBurn: "Täglicher Verbrauch (8 Std)",
      reset: "Zurücksetzen",
      calculate: "🔄 Neu berechnen"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateCalories = () => {
    // Convert weight to kg if in lbs
    const weightKg = weightUnit === 'lbs' ? weight / 2.205 : weight;
    
    // Get MET value for the selected activity and intensity
    const met = (activityMETs[activity as keyof typeof activityMETs] || activityMETs['walking'])[intensity];
    
    // Calories burned = MET × weight (kg) × duration (hours)
    const durationHours = duration / 60;
    const caloriesBurned = met * weightKg * durationHours;
    const hourlyBurn = met * weightKg;
    const dailyBurn = hourlyBurn * 8;
    const metabolicRate = met * weightKg / 60; // per minute

    setResults({
      caloriesBurned,
      metabolicRate,
      hourlyBurn,
      dailyBurn
    });
  };

  const resetCalculator = () => {
    setWeight(70);
    setWeightUnit('kg');
    setActivity('walking');
    setDuration(30);
    setIntensity('moderate');
    setResults({ caloriesBurned: 0, metabolicRate: 0, hourlyBurn: 0, dailyBurn: 0 });
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    calculateCalories();
  }, [weight, weightUnit, activity, duration, intensity]);

  const formatCalories = (value: number) => {
    return Math.round(value).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.weight} ({weightUnit})
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                min="20"
                max="300"
                step="1"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lbs')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="kg">{t.kg}</option>
                <option value="lbs">{t.lbs}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.activity}
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(activityMETs).map(act => (
                <option key={act} value={act}>
                  {act.charAt(0).toUpperCase() + act.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.duration}
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseFloat(e.target.value) || 0)}
              min="1"
              max="480"
              step="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.intensity}
            </label>
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value as 'light' | 'moderate' | 'vigorous')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">{t.light}</option>
              <option value="moderate">{t.moderate}</option>
              <option value="vigorous">{t.vigorous}</option>
            </select>
          </div>
        </div>

        {/* Auto-calculation note */}
        <div className="pt-2 text-xs text-blue-600 text-center font-medium">
          📊 Calculations update automatically
        </div>

        {/* Buttons */}
        <div className="pt-3 flex gap-4">
          <button
            onClick={resetCalculator}
            className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200 shadow-sm"
          >
            {t.reset}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={calculateCalories}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.calculate}
            </button>
          </div>

        <h2 className="text-xl font-bold text-gray-900">{t.results}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.caloriesBurned}</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {formatCalories(results.caloriesBurned)}
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.metabolicRate}</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {results.metabolicRate.toFixed(2)}/min
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.hourlyBurn}</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {formatCalories(results.hourlyBurn)}/hr
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{t.dailyBurn}</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {formatCalories(results.dailyBurn)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
