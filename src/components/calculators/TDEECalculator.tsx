'use client';

import React, { useState, useMemo } from 'react';
import CalculatorPageClient from '@/components/CalculatorPageClient';

interface TDEECalculatorProps {
  lang: string;
}

interface TDEEData {
  weight: number;
  weightUnit: string;
  height: number;
  heightUnit: string;
  gender: string;
  age: number;
  activityLevel: string;
  exerciseFrequency: string;
}

interface TDEResults {
  tdee: number;
  bmr: number;
  activityMultiplier: number;
  activityCategory: string;
  weightLossRate: number;
  weightGainRate: number;
}

// Activity level multipliers for TDEE calculation
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,        // Little/no exercise, desk job
  lightly_active: 1.375, // Light exercise 1-3 days/week
  moderately_active: 1.55, // Moderate exercise 3-5 days/week
  very_active: 1.725,    // Hard exercise 6-7 days/week
  extremely_active: 1.9  // Very hard exercise, physical job, or 2x training
};

// Exercise frequency adjustments (fine-tuning)
const EXERCISE_ADJUSTMENTS = {
  none: 0,
  light: 0.1,
  moderate: 0.2,
  heavy: 0.3,
  very_heavy: 0.4
};

export default function TDEECalculator({ lang }: TDEECalculatorProps) {
  const [formData, setFormData] = useState<TDEEData>({
    weight: 70,
    weightUnit: 'kg',
    height: 170,
    heightUnit: 'cm',
    gender: 'male',
    age: 30,
    activityLevel: 'moderately_active',
    exerciseFrequency: 'moderate'
  });

  const translations = {
    en: {
      title: "TDEE Calculator",
      subtitle: "Calculate your Total Daily Energy Expenditure (TDEE) to understand your daily calorie burn rate",
      weight: "Body Weight",
      height: "Height",
      gender: "Gender",
      age: "Age",
      activityLevel: "Activity Level",
      exerciseFrequency: "Exercise Frequency",
      calculate: "Calculate TDEE",
      results: "TDEE Results",
      tdee: "Total Daily Energy Expenditure (TDEE)",
      bmr: "Basal Metabolic Rate (BMR)",
      activityMultiplier: "Activity Multiplier",
      activityCategory: "Activity Category",
      weightLossRate: "Weight Loss Rate (500 cal deficit)",
      weightGainRate: "Weight Gain Rate (500 cal surplus)",
      activityLevelOptions: {
        sedentary: "Sedentary (little/no exercise, desk job)",
        lightly_active: "Lightly Active (light exercise 1-3 days/week)",
        moderately_active: "Moderately Active (moderate exercise 3-5 days/week)",
        very_active: "Very Active (hard exercise 6-7 days/week)",
        extremely_active: "Extremely Active (very hard exercise, physical job, or 2x training)"
      },
      exerciseFrequencyOptions: {
        none: "None (sedentary lifestyle)",
        light: "Light (1-2 hours/week)",
        moderate: "Moderate (3-4 hours/week)",
        heavy: "Heavy (5-6 hours/week)",
        very_heavy: "Very Heavy (7+ hours/week)"
      },
      genderOptions: {
        male: "Male",
        female: "Female"
      },
      weightUnitOptions: {
        kg: "Kilograms (kg)",
        lbs: "Pounds (lbs)"
      },
      heightUnitOptions: {
        cm: "Centimeters (cm)",
        inches: "Inches (in)"
      },
      calories: "calories",
      x: "x",
      lbsPerWeek: "lbs/week"
,
      noteDisclaimer: "Note: TDEE calculations provide estimates based on established formulas. Individual metabolic rates can vary significantly. For weight management or fitness goals, consult a healthcare or fitness professional."
    },
    es: {
      title: "Calculadora de TDEE",
      subtitle: "Calcula tu Gasto Energético Total Diario (TDEE) para entender tu tasa de quema calórica diaria",
      weight: "Peso Corporal",
      height: "Altura",
      gender: "Género",
      age: "Edad",
      activityLevel: "Nivel de Actividad",
      exerciseFrequency: "Frecuencia de Ejercicio",
      calculate: "Calcular TDEE",
      results: "Resultados de TDEE",
      tdee: "Gasto Energético Total Diario (TDEE)",
      bmr: "Tasa Metabólica Basal (BMR)",
      activityMultiplier: "Multiplicador de Actividad",
      activityCategory: "Categoría de Actividad",
      weightLossRate: "Tasa Pérdida Peso (500 cal déficit)",
      weightGainRate: "Tasa Ganancia Peso (500 cal superávit)",
      activityLevelOptions: {
        sedentary: "Sedentario (poco/sin ejercicio, trabajo escritorio)",
        lightly_active: "Ligeramente Activo (ejercicio ligero 1-3 días/semana)",
        moderately_active: "Moderadamente Activo (ejercicio moderado 3-5 días/semana)",
        very_active: "Muy Activo (ejercicio duro 6-7 días/semana)",
        extremely_active: "Extremadamente Activo (ejercicio muy duro, trabajo físico, o 2x entrenamiento)"
      },
      exerciseFrequencyOptions: {
        none: "Ninguno (estilo de vida sedentario)",
        light: "Ligero (1-2 horas/semana)",
        moderate: "Moderado (3-4 horas/semana)",
        heavy: "Pesado (5-6 horas/semana)",
        very_heavy: "Muy Pesado (7+ horas/semana)"
      },
      genderOptions: {
        male: "Masculino",
        female: "Femenino"
      },
      weightUnitOptions: {
        kg: "Kilogramos (kg)",
        lbs: "Libras (lbs)"
      },
      heightUnitOptions: {
        cm: "Centímetros (cm)",
        inches: "Pulgadas (in)"
      },
      calories: "calorías",
      x: "x",
      lbsPerWeek: "lbs/semana"
,
      noteDisclaimer: "Nota: Los cálculos de TDEE proporcionan estimaciones basadas en fórmulas establecidas. Las tasas metabólicas individuales pueden variar significativamente. Para el manejo del peso o metas de condición física, consulte a un profesional de la salud o acondicionamiento físico."
    },
    pt: {
      title: "Calculadora de TDEE",
      subtitle: "Calcule seu Gasto Energético Total Diário (TDEE) para entender sua taxa de queima calórica diária",
      weight: "Peso Corporal",
      height: "Altura",
      gender: "Gênero",
      age: "Idade",
      activityLevel: "Nível de Atividade",
      exerciseFrequency: "Frequência de Exercício",
      calculate: "Calcular TDEE",
      results: "Resultados de TDEE",
      tdee: "Gasto Energético Total Diário (TDEE)",
      bmr: "Taxa Metabólica Basal (BMR)",
      activityMultiplier: "Multiplicador de Atividade",
      activityCategory: "Categoria de Atividade",
      weightLossRate: "Taxa Perda Peso (500 cal déficit)",
      weightGainRate: "Taxa Ganho Peso (500 cal superávit)",
      activityLevelOptions: {
        sedentary: "Sedentário (pouco/sem exercício, trabalho escritório)",
        lightly_active: "Ligeramente Ativo (exercício leve 1-3 dias/semana)",
        moderately_active: "Moderadamente Ativo (exercício moderado 3-5 dias/semana)",
        very_active: "Muito Ativo (exercício duro 6-7 dias/semana)",
        extremely_active: "Extremamente Ativo (exercício muito duro, trabalho físico, ou 2x treinamento)"
      },
      exerciseFrequencyOptions: {
        none: "Nenhum (estilo de vida sedentário)",
        light: "Leve (1-2 horas/semana)",
        moderate: "Moderado (3-4 horas/semana)",
        heavy: "Pesado (5-6 horas/semana)",
        very_heavy: "Muito Pesado (7+ horas/semana)"
      },
      genderOptions: {
        male: "Masculino",
        female: "Feminino"
      },
      weightUnitOptions: {
        kg: "Quilogramas (kg)",
        lbs: "Libras (lbs)"
      },
      heightUnitOptions: {
        cm: "Centímetros (cm)",
        inches: "Polegadas (in)"
      },
      calories: "calorias",
      x: "x",
      lbsPerWeek: "lbs/semana"
,
      noteDisclaimer: "Nota: Os cálculos de TDEE fornecem estimativas baseadas em fórmulas estabelecidas. As taxas metabólicas individuais podem variar significativamente. Para gerenciamento de peso ou metas de condicionamento físico, consulte um profissional de saúde ou condicionamento físico."
    },
    fr: {
      title: "Calculateur de TDEE",
      subtitle: "Calculez votre Dépense Énergétique Totale Quotidienne (TDEE) pour comprendre votre taux de brûlage calorique quotidien",
      weight: "Poids Corporel",
      height: "Taille",
      gender: "Genre",
      age: "Âge",
      activityLevel: "Niveau d'Activité",
      exerciseFrequency: "Fréquence d'Exercice",
      calculate: "Calculer TDEE",
      results: "Résultats TDEE",
      tdee: "Dépense Énergétique Totale Quotidienne (TDEE)",
      bmr: "Taux Métabolique Basal (BMR)",
      activityMultiplier: "Multiplicateur d'Activité",
      activityCategory: "Catégorie d'Activité",
      weightLossRate: "Taux Perte Poids (500 cal déficit)",
      weightGainRate: "Taux Gain Poids (500 cal surplus)",
      activityLevelOptions: {
        sedentary: "Sédentaire (peu/pas d'exercice, travail bureau)",
        lightly_active: "Légèrement Actif (exercice léger 1-3 jours/semaine)",
        moderately_active: "Modérément Actif (exercice modéré 3-5 jours/semaine)",
        very_active: "Très Actif (exercice dur 6-7 jours/semaine)",
        extremely_active: "Extrêmement Actif (exercice très dur, travail physique, ou 2x entraînement)"
      },
      exerciseFrequencyOptions: {
        none: "Aucun (style de vie sédentaire)",
        light: "Léger (1-2 heures/semaine)",
        moderate: "Modéré (3-4 heures/semaine)",
        heavy: "Intense (5-6 heures/semaine)",
        very_heavy: "Très Intense (7+ heures/semaine)"
      },
      genderOptions: {
        male: "Masculin",
        female: "Féminin"
      },
      weightUnitOptions: {
        kg: "Kilogrammes (kg)",
        lbs: "Livres (lbs)"
      },
      heightUnitOptions: {
        cm: "Centimètres (cm)",
        inches: "Pouces (in)"
      },
      calories: "calories",
      x: "x",
      lbsPerWeek: "lbs/semaine"
,
      noteDisclaimer: "Remarque: Les calculs TDEE fournissent des estimations basées sur des formules établies. Les taux métaboliques individuels peuvent varier considérablement. Pour la gestion du poids ou les objectifs de condition physique, consultez un professionnel de la santé ou de la condition physique."    },
    de: {
      title: "TDEE-Rechner",
      subtitle: "Berechnen Sie Ihren Gesamttäglichen Energieverbrauch (TDEE) um Ihre tägliche Kalorienverbrauchsrate zu verstehen",
      weight: "Körpergewicht",
      height: "Größe",
      gender: "Geschlecht",
      age: "Alter",
      activityLevel: "Aktivitätsniveau",
      exerciseFrequency: "Trainingsfrequenz",
      calculate: "TDEE Berechnen",
      results: "TDEE Ergebnisse",
      tdee: "Gesamttäglicher Energieverbrauch (TDEE)",
      bmr: "Grundumsatz (BMR)",
      activityMultiplier: "Aktivitätsmultiplikator",
      activityCategory: "Aktivitätskategorie",
      weightLossRate: "Gewichtsverlustrate (500 cal Defizit)",
      weightGainRate: "Gewichtszunahmerates (500 cal Überschuss)",
      activityLevelOptions: {
        sedentary: "Sitzend (wenig/keine Bewegung, Schreibtischarbeit)",
        lightly_active: "Leicht aktiv (leichte Bewegung 1-3 Tage/Woche)",
        moderately_active: "Mäßig aktiv (moderate Bewegung 3-5 Tage/Woche)",
        very_active: "Sehr aktiv (intensive Bewegung 6-7 Tage/Woche)",
        extremely_active: "Extrem aktiv (sehr intensive Bewegung, körperliche Arbeit, oder 2x Training)"
      },
      exerciseFrequencyOptions: {
        none: "Keine (sitzendes Leben)",
        light: "Leicht (1-2 Stunden/Woche)",
        moderate: "Moderat (3-4 Stunden/Woche)",
        heavy: "Intensiv (5-6 Stunden/Woche)",
        very_heavy: "Sehr intensiv (7+ Stunden/Woche)"
      },
      genderOptions: {
        male: "Männlich",
        female: "Weiblich"
      },
      weightUnitOptions: {
        kg: "Kilogramm (kg)",
        lbs: "Pfund (lbs)"
      },
      heightUnitOptions: {
        cm: "Zentimeter (cm)",
        inches: "Zoll (in)"
      },
      calories: "Kalorien",
      x: "x",
      lbsPerWeek: "lbs/Woche",
      noteDisclaimer: "Hinweis: TDEE-Berechnungen liefern Schätzungen basierend auf etablierten Formeln. Individuelle Stoffwechselraten können erheblich variieren. Für Gewichtsmanagement oder Fitnessziele wenden Sie sich an einen Gesundheits- oder Fitnessprofi."
    },
    nl: {
      title: "TDEE Rekenmachine",
      subtitle: "Bereken uw totale dagelijks energieverbruik (TDEE) om uw dagelijks calorieverbrandingspercentage te begrijpen",
      weight: "Lichaamsgewicht",
      height: "Lengte",
      gender: "Geslacht",
      age: "Leeftijd",
      activityLevel: "Activiteitsniveau",
      exerciseFrequency: "Trainingsfrequentie",
      calculate: "TDEE Berekenen",
      results: "TDEE Resultaten",
      tdee: "Totaal Dagelijks Energieverbruik (TDEE)",
      bmr: "Basaal Metabolisch Tarief (BMR)",
      activityMultiplier: "Activiteitsmultiplier",
      activityCategory: "Activiteitscategorie",
      weightLossRate: "Gewichtsverlies Tarief (500 cal tekort)",
      weightGainRate: "Gewichtstoename Tarief (500 cal surplus)",
      activityLevelOptions: {
        sedentary: "Zittend (weinig/geen beweging, kantoorwerk)",
        lightly_active: "Licht Actief (lichte beweging 1-3 dagen/week)",
        moderately_active: "Matig Actief (matige beweging 3-5 dagen/week)",
        very_active: "Zeer Actief (intensieve beweging 6-7 dagen/week)",
        extremely_active: "Extreem Actief (zeer intensieve beweging, lichamelijk werk, of 2x training)"
      },
      exerciseFrequencyOptions: {
        none: "Geen (zittend leven)",
        light: "Licht (1-2 uur/week)",
        moderate: "Matig (3-4 uur/week)",
        heavy: "Zwaar (5-6 uur/week)",
        very_heavy: "Zeer Zwaar (7+ uur/week)"
      },
      genderOptions: {
        male: "Mannelijk",
        female: "Vrouwelijk"
      },
      weightUnitOptions: {
        kg: "Kilogram (kg)",
        lbs: "Pond (lbs)"
      },
      heightUnitOptions: {
        cm: "Centimeter (cm)",
        inches: "Inch (in)"
      },
      calories: "calorieën",
      x: "x",
      lbsPerWeek: "pond/week",
      noteDisclaimer: "Opmerking: TDEE-berekeningen geven schattingen op basis van gevestigde formules. Individuele stofwisselingstarief kunnen aanzienlijk variëren. Voor gewichtsbeheer of fitnessdoelen, raadpleeg een gezondheids- of fitnessdeskundige."    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateTDEE = (data: TDEEData): TDEResults => {
    // Convert units to metric for calculations
    let weightKg = data.weight;
    if (data.weightUnit === 'lbs') {
      weightKg = data.weight / 2.20462;
    }

    let heightCm = data.height;
    if (data.heightUnit === 'inches') {
      heightCm = data.height * 2.54;
    }

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr = 0;
    if (data.gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * data.age) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * data.age) - 161;
    }

    // Get base activity multiplier
    const baseMultiplier = ACTIVITY_MULTIPLIERS[data.activityLevel as keyof typeof ACTIVITY_MULTIPLIERS] || 1.55;

    // Apply exercise frequency adjustment
    const exerciseAdjustment = EXERCISE_ADJUSTMENTS[data.exerciseFrequency as keyof typeof EXERCISE_ADJUSTMENTS] || 0.2;
    const activityMultiplier = baseMultiplier + exerciseAdjustment;

    // Calculate TDEE
    const tdee = Math.round(bmr * activityMultiplier);

    // Determine activity category
    let activityCategory = "";
    if (lang === 'es') {
      const categories = {
        sedentary: "Sedentario",
        lightly_active: "Ligeramente Activo",
        moderately_active: "Moderadamente Activo",
        very_active: "Muy Activo",
        extremely_active: "Extremadamente Activo"
      };
      activityCategory = categories[data.activityLevel as keyof typeof categories] || "Moderado";
    } else if (lang === 'pt') {
      const categories = {
        sedentary: "Sedentário",
        lightly_active: "Ligeramente Ativo",
        moderately_active: "Moderadamente Ativo",
        very_active: "Muito Ativo",
        extremely_active: "Extremamente Ativo"
      };
      activityCategory = categories[data.activityLevel as keyof typeof categories] || "Moderado";
    } else if (lang === 'fr') {
      const categories = {
        sedentary: "Sédentaire",
        lightly_active: "Légèrement Actif",
        moderately_active: "Modérément Actif",
        very_active: "Très Actif",
        extremely_active: "Extrêmement Actif"
      };
      activityCategory = categories[data.activityLevel as keyof typeof categories] || "Modéré";
    } else {
      const categories = {
        sedentary: "Sedentary",
        lightly_active: "Lightly Active",
        moderately_active: "Moderately Active",
        very_active: "Very Active",
        extremely_active: "Extremely Active"
      };
      activityCategory = categories[data.activityLevel as keyof typeof categories] || "Moderate";
    }

    // Calculate weight change rates (500 calorie deficit/surplus = ~1 lb/week)
    const weightLossRate = 1.0; // 500 calories = ~1 lb/week
    const weightGainRate = 1.0;

    return {
      tdee,
      bmr: Math.round(bmr),
      activityMultiplier: Math.round(activityMultiplier * 100) / 100,
      activityCategory,
      weightLossRate,
      weightGainRate
    };
  };

  const results = useMemo((): TDEResults => {
    return calculateTDEE(formData);
  }, [formData]);

  const handleInputChange = (field: keyof TDEEData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatNumber = (num: number, decimals: number = 0): string => {
    return num.toFixed(decimals);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.title}
          </h2>

          <div className="space-y-6">
            {/* Weight and Height */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.weight}
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    min="30"
                    max="300"
                    step="0.1"
                  />
                  <select
                    value={formData.weightUnit}
                    onChange={(e) => handleInputChange('weightUnit', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {Object.entries(t.weightUnitOptions).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.height}
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    min="100"
                    max="250"
                    step="0.1"
                  />
                  <select
                    value={formData.heightUnit}
                    onChange={(e) => handleInputChange('heightUnit', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {Object.entries(t.heightUnitOptions).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Gender and Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.gender}
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {Object.entries(t.genderOptions).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.age}
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  min="15"
                  max="100"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.activityLevel}
              </label>
              <select
                value={formData.activityLevel}
                onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.activityLevelOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Exercise Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.exerciseFrequency}
              </label>
              <select
                value={formData.exerciseFrequency}
                onChange={(e) => handleInputChange('exerciseFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.exerciseFrequencyOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.results}
          </h2>

          <div className="space-y-4">
            {/* TDEE */}
            <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.tdee}
              </span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatNumber(results.tdee)} {t.calories}
              </span>
            </div>

            {/* BMR */}
            <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.bmr}
              </span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatNumber(results.bmr)} {t.calories}
              </span>
            </div>

            {/* Activity Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.activityMultiplier}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatNumber(results.activityMultiplier, 2)}{t.x}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.activityCategory}</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  {results.activityCategory}
                </span>
              </div>
            </div>

            {/* Weight Change Predictions */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Weight Change Predictions
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-red-600 dark:text-red-400">{t.weightLossRate}</span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {formatNumber(results.weightLossRate, 1)} {t.lbsPerWeek}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-600 dark:text-green-400">{t.weightGainRate}</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {formatNumber(results.weightGainRate, 1)} {t.lbsPerWeek}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            🏃‍♂️ Activity Levels Explained
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Sedentary: Desk job, little exercise</li>
            <li>• Lightly Active: 1-3 exercise days/week</li>
            <li>• Moderately Active: 3-5 exercise days/week</li>
            <li>• Very Active: 6-7 hard exercise days/week</li>
            <li>• Extremely Active: Physical job or 2x daily training</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            📊 BMR vs TDEE
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• BMR: Resting calorie burn (60-75% of TDEE)</li>
            <li>• TDEE: Total daily calorie expenditure</li>
            <li>• Activity multiplier shows lifestyle impact</li>
            <li>• Higher activity = higher TDEE</li>
            <li>• Use TDEE for weight management</li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          {t.noteDisclaimer}</p>
      </div>
    </div>
  );
}
