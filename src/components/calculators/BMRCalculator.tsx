'use client';

import { useState, useEffect } from 'react';

interface BMRCalculatorProps {
  lang?: string;
}

export default function BMRCalculator({ lang = 'en' }: BMRCalculatorProps) {
  const [inputs, setInputs] = useState({
    age: 30,
    gender: 'male',
    height: 170,
    weight: 70,
    formula: 'mifflin',
    activityLevel: 'sedentary'
  });

  const [results, setResults] = useState({
    bmr: 0,
    maintenanceCalories: 0,
    weightLossCalories: 0,
    weightGainCalories: 0
  });

  const translations = {
    en: {
      title: "BMR Calculator",
      age: "Age",
      gender: "Gender",
      height: "Height",
      weight: "Weight",
      formula: "Formula",
      activityLevel: "Activity Level",
      calculate: "🔄 Recalculate",
      yourBMR: "Your BMR",
      maintenance: "Daily Calories (Maintenance)",
      weightLoss: "Daily Calories (Weight Loss)",
      weightGain: "Daily Calories (Weight Gain)",
      caloriesPerDay: "calories/day",
      male: "Male",
      female: "Female",
      mifflin: "Mifflin-St Jeor",
      harris: "Harris-Benedict",
      sedentary: "Sedentary (little/no exercise)",
      light: "Lightly active (light exercise 1-3 days/week)",
      moderate: "Moderately active (moderate exercise 3-5 days/week)",
      active: "Very active (hard exercise 6-7 days/week)",
      veryActive: "Extremely active (very hard exercise, physical job)",
      reset: "Reset"
    },
    es: {
      title: "Calculadora BMR",
      age: "Edad",
      gender: "Género",
      height: "Altura",
      weight: "Peso",
      formula: "Fórmula",
      activityLevel: "Nivel de Actividad",
      calculate: "🔄 Recalcular",
      yourBMR: "Tu BMR",
      maintenance: "Calorías Diarias (Mantenimiento)",
      weightLoss: "Calorías Diarias (Pérdida de Peso)",
      weightGain: "Calorías Diarias (Ganancia de Peso)",
      caloriesPerDay: "calorías/día",
      male: "Masculino",
      female: "Femenino",
      mifflin: "Mifflin-St Jeor",
      harris: "Harris-Benedict",
      sedentary: "Sedentario (poco o ningún ejercicio)",
      light: "Ligeramente activo (ejercicio ligero 1-3 días/semana)",
      moderate: "Moderadamente activo (ejercicio moderado 3-5 días/semana)",
      active: "Muy activo (ejercicio duro 6-7 días/semana)",
      veryActive: "Extremadamente activo (ejercicio muy duro, trabajo físico)",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora BMR",
      age: "Idade",
      gender: "Gênero",
      height: "Altura",
      weight: "Peso",
      formula: "Fórmula",
      activityLevel: "Nível de Atividade",
      calculate: "🔄 Recalcular",
      yourBMR: "Seu BMR",
      maintenance: "Calorias Diárias (Manutenção)",
      weightLoss: "Calorias Diárias (Perda de Peso)",
      weightGain: "Calorias Diárias (Ganho de Peso)",
      caloriesPerDay: "calorias/dia",
      male: "Masculino",
      female: "Feminino",
      mifflin: "Mifflin-St Jeor",
      harris: "Harris-Benedict",
      sedentary: "Sedentário (pouco ou nenhum exercício)",
      light: "Levemente ativo (exercício leve 1-3 dias/semana)",
      moderate: "Moderadamente ativo (exercício moderado 3-5 dias/semana)",
      active: "Muito ativo (exercício duro 6-7 dias/semana)",
      veryActive: "Extremamente ativo (exercício muito duro, trabalho físico)",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur BMR",
      age: "Âge",
      gender: "Genre",
      height: "Taille",
      weight: "Poids",
      formula: "Formule",
      activityLevel: "Niveau d'Activité",
      calculate: "🔄 Recalculer",
      yourBMR: "Votre BMR",
      maintenance: "Calories Quotidiennes (Maintenance)",
      weightLoss: "Calories Quotidiennes (Perte de Poids)",
      weightGain: "Calories Quotidiennes (Gain de Poids)",
      caloriesPerDay: "calories/jour",
      male: "Masculin",
      female: "Féminin",
      mifflin: "Mifflin-St Jeor",
      harris: "Harris-Benedict",
      sedentary: "Sédentaire (peu ou pas d'exercice)",
      light: "Légèrement actif (exercice léger 1-3 jours/semaine)",
      moderate: "Modérément actif (exercice modéré 3-5 jours/semaine)",
      active: "Très actif (exercice dur 6-7 jours/semaine)",
      veryActive: "Extrêmement actif (exercice très dur, travail physique)",
      reset: "Réinitialiser"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateBMR = () => {
    const { age, gender, height, weight, formula } = inputs;
    let bmr = 0;

    if (formula === 'mifflin') {
      // Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
    } else if (formula === 'harris') {
      // Harris-Benedict Equation
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
    }

    return Math.round(bmr);
  };

  const resetCalculator = () => {
    setInputs({
      age: 30,
      gender: 'male',
      height: 170,
      weight: 70,
      formula: 'mifflin',
      activityLevel: 'sedentary'
    });
    setResults({
      bmr: 0,
      maintenanceCalories: 0,
      weightLossCalories: 0,
      weightGainCalories: 0
    });
  };

  const getActivityMultiplier = (activityLevel: string) => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    return multipliers[activityLevel as keyof typeof multipliers] || 1.2;
  };

  useEffect(() => {
    const bmr = calculateBMR();
    const activityMultiplier = getActivityMultiplier(inputs.activityLevel);

    const maintenanceCalories = Math.round(bmr * activityMultiplier);
    const weightLossCalories = Math.round(maintenanceCalories * 0.8); // 20% deficit
    const weightGainCalories = Math.round(maintenanceCalories * 1.2); // 20% surplus

    setResults({
      bmr,
      maintenanceCalories,
      weightLossCalories,
      weightGainCalories
    });
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">Calculate your Basal Metabolic Rate (BMR) and daily calorie needs</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.age}
            </label>
            <input
              type="number"
              value={inputs.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
              min="10"
              max="120"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.gender}
            </label>
            <select
              value={inputs.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">{t.male}</option>
              <option value="female">{t.female}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.height} (cm)
            </label>
            <input
              type="number"
              value={inputs.height}
              onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
              min="100"
              max="250"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.weight} (kg)
            </label>
            <input
              type="number"
              value={inputs.weight}
              onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
              min="30"
              max="300"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.formula}
            </label>
            <select
              value={inputs.formula}
              onChange={(e) => handleInputChange('formula', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mifflin">{t.mifflin}</option>
              <option value="harris">{t.harris}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.activityLevel}
            </label>
            <select
              value={inputs.activityLevel}
              onChange={(e) => handleInputChange('activityLevel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sedentary">{t.sedentary}</option>
              <option value="light">{t.light}</option>
              <option value="moderate">{t.moderate}</option>
              <option value="active">{t.active}</option>
              <option value="very_active">{t.veryActive}</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={calculateBMR}
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

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.yourBMR}</h3>
            <div className="text-3xl font-bold text-blue-600">
              {results.bmr.toLocaleString()} <span className="text-lg text-blue-500">{t.caloriesPerDay}</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Calories your body burns at rest
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-green-900">{t.maintenance}</div>
              <div className="text-xl font-bold text-green-600">
                {results.maintenanceCalories.toLocaleString()} {t.caloriesPerDay}
              </div>
            </div>

            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-red-900">{t.weightLoss}</div>
              <div className="text-xl font-bold text-red-600">
                {results.weightLossCalories.toLocaleString()} {t.caloriesPerDay}
              </div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-purple-900">{t.weightGain}</div>
              <div className="text-xl font-bold text-purple-600">
                {results.weightGainCalories.toLocaleString()} {t.caloriesPerDay}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
