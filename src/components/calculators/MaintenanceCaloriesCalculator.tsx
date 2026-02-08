

'use client';

import React, { useState, useMemo } from 'react';
import CalculatorPageClient from '@/components/CalculatorPageClient';

interface MaintenanceCaloriesCalculatorProps {
  lang: string;
}

interface CalorieData {
  weight: number;
  weightUnit: string;
  height: number;
  heightUnit: string;
  gender: string;
  age: number;
  activityLevel: string;
  bmrMethod: string;
  bodyFat: number;
}

interface CalorieResults {
  maintenanceCalories: number;
  bmr: number;
  tdee: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
}

// Activity level multipliers for TDEE calculation
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,        // Little/no exercise
  lightly_active: 1.375, // Light exercise 1-3 days/week
  moderately_active: 1.55, // Moderate exercise 3-5 days/week
  very_active: 1.725,    // Hard exercise 6-7 days/week
  extremely_active: 1.9  // Very hard exercise, physical job, or 2x training
};

export default function MaintenanceCaloriesCalculator({ lang }: MaintenanceCaloriesCalculatorProps) {
    const [results, setResults] = useState<CalorieResults | null>(null);

    const handleCalculate = () => {
      setResults(calculateCalories(formData));
    };
  const [formData, setFormData] = useState<CalorieData>({
    weight: 70,
    weightUnit: 'kg',
    height: 170,
    heightUnit: 'cm',
    gender: 'male',
    age: 30,
    activityLevel: 'moderately_active',
    bmrMethod: 'mifflin',
    bodyFat: 15
  });

  const translations = {
    en: {
      title: "Maintenance Calories Calculator",
      subtitle: "Calculate your daily maintenance calories using BMR and TDEE formulas",
      weight: "Body Weight",
      height: "Height",
      gender: "Gender",
      age: "Age",
      activityLevel: "Activity Level",
      bmrMethod: "BMR Calculation Method",
      bodyFat: "Body Fat Percentage",
      calculate: "🔄 Recalculate",
      results: "Maintenance Calories Results",
      maintenanceCalories: "Maintenance Calories",
      bmr: "Basal Metabolic Rate (BMR)",
      tdee: "Total Daily Energy Expenditure (TDEE)",
      proteinGrams: "Protein",
      carbGrams: "Carbohydrates",
      fatGrams: "Fat",
      macronutrients: "Macronutrient Breakdown (40% carbs, 30% protein, 30% fat)",
      methodOptions: {
        harris: "Harris-Benedict (Classic)",
        mifflin: "Mifflin-St Jeor (Most Accurate)",
        katch: "Katch-McArdle (Requires Body Fat %)",
      },
      reset: "Reset",
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
      activityLevelOptions: {
        sedentary: "Sedentary (little/no exercise)",
        lightly_active: "Lightly Active (light exercise 1-3 days/week)",
        moderately_active: "Moderately Active (moderate exercise 3-5 days/week)",
        very_active: "Very Active (hard exercise 6-7 days/week)",
        extremely_active: "Extremely Active (very hard exercise, physical job, or 2x training)"
      },
      calories: "calories",
      grams: "grams"
,
      noteDisclaimer: "Note: These calculations provide estimates based on established formulas. Individual metabolic rates can vary significantly based on genetics, muscle mass, and other factors. Consult a healthcare professional for personalized nutrition advice."
    },
    es: {
      title: "Calculadora de Calorías de Mantenimiento",
      subtitle: "Calcula tus calorías diarias de mantenimiento usando fórmulas BMR y TDEE",
      weight: "Peso Corporal",
      height: "Altura",
      gender: "Género",
      age: "Edad",
      activityLevel: "Nivel de Actividad",
      bmrMethod: "Método de Cálculo BMR",
      bodyFat: "Porcentaje de Grasa Corporal",
      calculate: "🔄 Recalcular",
      results: "Resultados de Calorías de Mantenimiento",
      maintenanceCalories: "Calorías de Mantenimiento",
      bmr: "Tasa Metabólica Basal (BMR)",
      tdee: "Gasto Energético Total Diario (TDEE)",
      proteinGrams: "Proteína",
      carbGrams: "Carbohidratos",
      fatGrams: "Grasa",
      macronutrients: "Desglose de Macronutrientes (40% carbohidratos, 30% proteína, 30% grasa)",
      methodOptions: {
        harris: "Harris-Benedict (Clásico)",
        mifflin: "Mifflin-St Jeor (Más Preciso)",
        katch: "Katch-McArdle (Requiere % Grasa Corporal)",
      },
      reset: "Restablecer",
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
      activityLevelOptions: {
        sedentary: "Sedentario (poco/sin ejercicio)",
        lightly_active: "Ligeramente Activo (ejercicio ligero 1-3 días/semana)",
        moderately_active: "Moderadamente Activo (ejercicio moderado 3-5 días/semana)",
        very_active: "Muy Activo (ejercicio duro 6-7 días/semana)",
        extremely_active: "Extremadamente Activo (ejercicio muy duro, trabajo físico, o 2x entrenamiento)"
      },
      calories: "calorías",
      grams: "gramos"
,
      noteDisclaimer: "Nota: Estos cálculos proporcionan estimaciones basadas en fórmulas establecidas. Las tasas metabólicas individuales pueden variar significativamente según la genética, masa muscular y otros factores. Consulte a un profesional de la salud para asesoramiento nutricional personalizado."
    },
    pt: {
      title: "Calculadora de Calorias de Manutenção",
      subtitle: "Calcule suas calorias diárias de manutenção usando fórmulas BMR e TDEE",
      weight: "Peso Corporal",
      height: "Altura",
      gender: "Gênero",
      age: "Idade",
      activityLevel: "Nível de Atividade",
      bmrMethod: "Método de Cálculo BMR",
      bodyFat: "Porcentagem de Gordura Corporal",
      calculate: "🔄 Recalcular",
      results: "Resultados de Calorias de Manutenção",
      maintenanceCalories: "Calorias de Manutenção",
      bmr: "Taxa Metabólica Basal (BMR)",
      tdee: "Gasto Energético Total Diário (TDEE)",
      proteinGrams: "Proteína",
      carbGrams: "Carboidratos",
      fatGrams: "Gordura",
      macronutrients: "Quebra de Macronutrientes (40% carboidratos, 30% proteína, 30% gordura)",
      methodOptions: {
        harris: "Harris-Benedict (Clássico)",
        mifflin: "Mifflin-St Jeor (Mais Preciso)",
        katch: "Katch-McArdle (Requer % Gordura Corporal)",
      },
      reset: "Redefinir",
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
      activityLevelOptions: {
        sedentary: "Sedentário (pouco/sem exercício)",
        lightly_active: "Ligeramente Ativo (exercício leve 1-3 dias/semana)",
        moderately_active: "Moderadamente Ativo (exercício moderado 3-5 dias/semana)",
        very_active: "Muito Ativo (exercício duro 6-7 dias/semana)",
        extremely_active: "Extremamente Ativo (exercício muito duro, trabalho físico, ou 2x treinamento)"
      },
      calories: "calorias",
      grams: "gramas"
,
      noteDisclaimer: "Nota: Estes cálculos fornecem estimativas baseadas em fórmulas estabelecidas. As taxas metabólicas individuais podem variar significativamente com base na genética, massa muscular e outros fatores. Consulte um profissional de saúde para aconselhamento nutricional personalizado."
    },
    fr: {
      title: "Calculateur de Calories de Maintenance",
      subtitle: "Calculez vos calories quotidiennes de maintenance en utilisant formules BMR et TDEE",
      weight: "Poids Corporel",
      height: "Taille",
      gender: "Genre",
      age: "Âge",
      activityLevel: "Niveau d'Activité",
      bmrMethod: "Méthode de Calcul BMR",
      bodyFat: "Pourcentage de Graisse Corporelle",
      calculate: "🔄 Recalculer",
      results: "Résultats de Calories de Maintenance",
      maintenanceCalories: "Calories de Maintenance",
      bmr: "Taux Métabolique Basal (BMR)",
      tdee: "Dépense Énergétique Totale Quotidienne (TDEE)",
      proteinGrams: "Protéines",
      carbGrams: "Glucides",
      fatGrams: "Lipides",
      macronutrients: "Répartition Macronutriments (40% glucides, 30% protéines, 30% lipides)",
      methodOptions: {
        harris: "Harris-Benedict (Classique)",
        mifflin: "Mifflin-St Jeor (Plus Précis)",
        katch: "Katch-McArdle (Nécessite % Graisse Corporelle)"
      },
      reset: "Réinitialiser",
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
      activityLevelOptions: {
        sedentary: "Sédentaire (peu/pas d'exercice)",
        lightly_active: "Légèrement Actif (exercice léger 1-3 jours/semaine)",
        moderately_active: "Modérément Actif (exercice modéré 3-5 jours/semaine)",
        very_active: "Très Actif (exercice dur 6-7 jours/semaine)",
        extremely_active: "Extrêmement Actif (exercice très dur, travail physique, ou 2x entraînement)"
      },
      calories: "calories",
      grams: "grammes"
,
      noteDisclaimer: "Remarque: Ces calculs fournissent des estimations basées sur des formules établies. Les taux métaboliques individuels peuvent varier considérablement en fonction de la génétique, de la masse musculaire et d'autres facteurs. Consultez un professionnel de la santé pour des conseils nutritionnels personnalisés."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateCalories = (data: CalorieData): CalorieResults => {
    // Convert units to metric for calculations
    let weightKg = data.weight;
    if (data.weightUnit === 'lbs') {
      weightKg = data.weight / 2.20462;
    }

    let heightCm = data.height;
    if (data.heightUnit === 'inches') {
      heightCm = data.height * 2.54;
    }

    let bmr = 0;

    // Calculate BMR based on selected method
    if (data.bmrMethod === 'harris') {
      // Harris-Benedict equation
      if (data.gender === 'male') {
        bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * data.age);
      } else {
        bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * data.age);
      }
    } else if (data.bmrMethod === 'mifflin') {
      // Mifflin-St Jeor equation
      if (data.gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * data.age) + 5;
      } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * data.age) - 161;
      }
    } else if (data.bmrMethod === 'katch') {
      // Katch-McArdle formula (requires body fat percentage)
      const leanBodyMass = weightKg * (1 - data.bodyFat / 100);
      bmr = 370 + (21.6 * leanBodyMass);
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityMultiplier = ACTIVITY_MULTIPLIERS[data.activityLevel as keyof typeof ACTIVITY_MULTIPLIERS] || 1.55;
    const tdee = bmr * activityMultiplier;
    const maintenanceCalories = Math.round(tdee);

    // Calculate macronutrient breakdown (40% carbs, 30% protein, 30% fat)
    const proteinCalories = maintenanceCalories * 0.3;
    const carbCalories = maintenanceCalories * 0.4;
    const fatCalories = maintenanceCalories * 0.3;

    const proteinGrams = Math.round(proteinCalories / 4); // 4 calories per gram of protein
    const carbGrams = Math.round(carbCalories / 4);     // 4 calories per gram of carbs
    const fatGrams = Math.round(fatCalories / 9);       // 9 calories per gram of fat

    return {
      maintenanceCalories,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      proteinGrams,
      carbGrams,
      fatGrams
    };
  };

  const resetCalculator = () => {
    setFormData({
      weight: 70,
      weightUnit: 'kg',
      height: 170,
      heightUnit: 'cm',
      gender: 'male',
      age: 30,
      activityLevel: 'moderately_active',
      bmrMethod: 'mifflin',
      bodyFat: 15
    });
  };


  const handleInputChange = (field: keyof CalorieData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatNumber = (num: number): string => {
    return num.toString();
  };

  const showBodyFatInput = formData.bmrMethod === 'katch';

  return (
    <div>
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

            {/* BMR Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.bmrMethod}
              </label>
              <select
                value={formData.bmrMethod}
                onChange={(e) => handleInputChange('bmrMethod', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.methodOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Conditional Body Fat Input */}
            {showBodyFatInput && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.bodyFat}
                </label>
                <input
                  type="number"
                  value={formData.bodyFat}
                  onChange={(e) => handleInputChange('bodyFat', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  min="3"
                  max="50"
                  step="0.1"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6">
            <button
              onClick={handleCalculate}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.calculate}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.results}
          </h2>

          <div className="space-y-4">
            {/* Maintenance Calories */}
            <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.maintenanceCalories}
              </span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {results ? formatNumber(results.maintenanceCalories) : ''} {results ? t.calories : ''}
              </span>
            </div>

            {/* BMR and TDEE */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.bmr}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {results ? formatNumber(results.bmr) : ''} {results ? t.calories : ''}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.tdee}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {results ? formatNumber(results.tdee) : ''} {results ? t.calories : ''}
                </span>
              </div>
            </div>

            {/* Macronutrient Breakdown */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                {t.macronutrients}
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t.proteinGrams}</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {results ? formatNumber(results.proteinGrams) : ''} {results ? t.grams : ''}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t.carbGrams}</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {results ? formatNumber(results.carbGrams) : ''} {results ? t.grams : ''}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t.fatGrams}</span>
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {results ? formatNumber(results.fatGrams) : ''} {results ? t.grams : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            🧮 BMR vs TDEE
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• BMR: Calories burned at rest</li>
            <li>• TDEE: BMR + daily activity</li>
            <li>• Maintenance = TDEE calories</li>
            <li>• Weight loss: TDEE - 250-500 cal</li>
            <li>• Weight gain: TDEE + 250-500 cal</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            🥗 Macronutrient Ratios
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• Protein: 4 calories per gram</li>
            <li>• Carbohydrates: 4 calories per gram</li>
            <li>• Fat: 9 calories per gram</li>
            <li>• This is just one approach</li>
            <li>• Adjust based on your goals</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
