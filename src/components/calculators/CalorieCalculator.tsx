'use client';

import { useState, useEffect } from 'react';

interface CalorieCalculatorProps {
  lang?: string;
}

export default function CalorieCalculator({ lang = 'en' }: CalorieCalculatorProps) {
  const [inputs, setInputs] = useState({
    age: 30,
    gender: 'male',
    height: 170,
    weight: 70,
    activityLevel: 'sedentary',
    goal: 'maintain',
    rate: 'moderate'
  });

  const [results, setResults] = useState({
    bmr: 0,
    tdee: 0,
    dailyCalories: 0,
    weeklyChange: ''
  });

  const translations = {
    en: {
      title: "Calorie Calculator",
      age: "Age",
      gender: "Gender",
      height: "Height",
      weight: "Weight",
      activityLevel: "Activity Level",
      goal: "Goal",
      rate: "Rate",
      calculate: "Calculate Calories",
      bmr: "BMR",
      tdee: "TDEE",
      dailyCalories: "Daily Calories",
      weeklyChange: "Weekly Change",
      caloriesPerDay: "calories/day",
      male: "Male",
      female: "Female",
      sedentary: "Sedentary (little/no exercise)",
      light: "Lightly active (light exercise 1-3 days/week)",
      moderate: "Moderately active (moderate exercise 3-5 days/week)",
      active: "Very active (hard exercise 6-7 days/week)",
      veryActive: "Extremely active (very hard exercise, physical job)",
      maintain: "Maintain Weight",
      lose: "Lose Weight",
      gain: "Gain Weight",
      slow: "Slow (0.25 kg/week)",
      moderateRate: "Moderate (0.5 kg/week)",
      fast: "Fast (1 kg/week)",
      maintaincurrentweight: "Maintain current weight",
      maintenance: "Maintenance:",
      yourtdee: "Your TDEE",
      weightloss: "Weight Loss:",
      tdee500: "TDEE - 500",
      weightgain: "Weight Gain:",
      tdee500plus: "TDEE + 500",
  },
    es: {
      title: "Calculadora de Calorías",
      age: "Edad",
      gender: "Género",
      height: "Altura",
      weight: "Peso",
      activityLevel: "Nivel de Actividad",
      goal: "Meta",
      rate: "Velocidad",
      calculate: "Calcular Calorías",
      bmr: "BMR",
      tdee: "TDEE",
      dailyCalories: "Calorías Diarias",
      weeklyChange: "Cambio Semanal",
      caloriesPerDay: "calorías/día",
      male: "Masculino",
      female: "Femenino",
      sedentary: "Sedentario (poco o ningún ejercicio)",
      light: "Ligeramente activo (ejercicio ligero 1-3 días/semana)",
      moderate: "Moderadamente activo (ejercicio moderado 3-5 días/semana)",
      active: "Muy activo (ejercicio duro 6-7 días/semana)",
      veryActive: "Extremadamente activo (ejercicio muy duro, trabajo físico)",
      maintain: "Mantener Peso",
      lose: "Perder Peso",
      gain: "Ganar Peso",
      slow: "Lento (0.25 kg/semana)",
      moderateRate: "Moderado (0.5 kg/semana)",
      fast: "Rápido (1 kg/semana)",
      maintaincurrentweight: "Mantener peso actual",
      maintenance: "Mantenimiento:",
      yourtdee: "Tu TDEE",
      weightloss: "Pérdida de Peso:",
      tdee500: "TDEE - 500",
      weightgain: "Ganancia de Peso:",
      tdee500plus: "TDEE + 500",
  },
    pt: {
      title: "Calculadora de Calorias",
      age: "Idade",
      gender: "Gênero",
      height: "Altura",
      weight: "Peso",
      activityLevel: "Nível de Atividade",
      goal: "Meta",
      rate: "Velocidade",
      calculate: "Calcular Calorias",
      bmr: "BMR",
      tdee: "TDEE",
      dailyCalories: "Calorias Diárias",
      weeklyChange: "Mudança Semanal",
      caloriesPerDay: "calorias/dia",
      male: "Masculino",
      female: "Feminino",
      sedentary: "Sedentário (pouco ou nenhum exercício)",
      light: "Levemente ativo (exercício leve 1-3 dias/semana)",
      moderate: "Moderadamente ativo (exercício moderado 3-5 dias/semana)",
      active: "Muito ativo (exercício duro 6-7 dias/semana)",
      veryActive: "Extremamente ativo (exercício muito duro, trabalho físico)",
      maintain: "Manter Peso",
      lose: "Perder Peso",
      gain: "Ganhar Peso",
      slow: "Lento (0.25 kg/semana)",
      moderateRate: "Moderado (0.5 kg/semana)",
      fast: "Rápido (1 kg/semana)",
      maintaincurrentweight: "Manter peso atual",
      maintenance: "Manutenção:",
      yourtdee: "Seu TDEE",
      weightloss: "Perda de Peso:",
      tdee500: "TDEE - 500",
      weightgain: "Ganho de Peso:",
      tdee500plus: "TDEE + 500",
  },
    fr: {
      title: "Calculateur de Calories",
      age: "Âge",
      gender: "Genre",
      height: "Taille",
      weight: "Poids",
      activityLevel: "Niveau d'Activité",
      goal: "Objectif",
      rate: "Vitesse",
      calculate: "Calculer Calories",
      bmr: "BMR",
      tdee: "TDEE",
      dailyCalories: "Calories Quotidiennes",
      weeklyChange: "Changement Hebdomadaire",
      caloriesPerDay: "calories/jour",
      male: "Masculin",
      female: "Féminin",
      sedentary: "Sédentaire (peu ou pas d'exercice)",
      light: "Légèrement actif (exercice léger 1-3 jours/semaine)",
      moderate: "Modérément actif (exercice modéré 3-5 jours/semaine)",
      active: "Très actif (exercice dur 6-7 jours/semaine)",
      veryActive: "Extrêmement actif (exercice très dur, travail physique)",
      maintain: "Maintenir Poids",
      lose: "Perdre Poids",
      gain: "Gagner Poids",
      slow: "Lent (0.25 kg/semaine)",
      moderateRate: "Modéré (0.5 kg/semaine)",
      fast: "Rapide (1 kg/semaine)",
      maintaincurrentweight: "Maintenir le poids actuel",
      maintenance: "Maintenance:",
      yourtdee: "Votre TDEE",
      weightloss: "Perte de Poids:",
      tdee500: "TDEE - 500",
      weightgain: "Gain de Poids:",
      tdee500plus: "TDEE + 500",
  }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateBMR = (age: number, gender: string, height: number, weight: number) => {
    // Mifflin-St Jeor Equation
    if (gender === 'male') {
      return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
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

  const getCalorieAdjustment = (goal: string, rate: string) => {
    const baseCaloriesPerKg = 7700; // calories per kg of body weight

    let kgPerWeek = 0.5; // default moderate
    if (rate === 'slow') kgPerWeek = 0.25;
    else if (rate === 'fast') kgPerWeek = 1;

    const caloriesPerWeek = kgPerWeek * baseCaloriesPerKg;

    if (goal === 'lose') return -Math.round(caloriesPerWeek / 7);
    if (goal === 'gain') return Math.round(caloriesPerWeek / 7);
    return 0; // maintain
  };

  useEffect(() => {
    const { age, gender, height, weight, activityLevel, goal, rate } = inputs;

    const bmr = calculateBMR(age, gender, height, weight);
    const activityMultiplier = getActivityMultiplier(activityLevel);
    const tdee = Math.round(bmr * activityMultiplier);
    const calorieAdjustment = getCalorieAdjustment(goal, rate);
    const dailyCalories = tdee + calorieAdjustment;

    let weeklyChange = '';
    if (goal === 'maintain') {
      weeklyChange = 'Maintain current weight';
    } else {
      const kgPerWeek = rate === 'slow' ? 0.25 : rate === 'fast' ? 1 : 0.5;
      const direction = goal === 'lose' ? 'lose' : 'gain';
      weeklyChange = `${direction} ${kgPerWeek} kg per week`;
    }

    setResults({
      bmr: Math.round(bmr),
      tdee,
      dailyCalories: Math.max(1200, dailyCalories), // minimum 1200 calories
      weeklyChange
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
        <p className="text-gray-600">Calculate your daily calorie needs for your fitness goals</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.goal}
              </label>
              <select
                value={inputs.goal}
                onChange={(e) => handleInputChange('goal', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="maintain">{t.maintain}</option>
                <option value="lose">{t.lose}</option>
                <option value="gain">{t.gain}</option>
              </select>
            </div>

            {(inputs.goal === 'lose' || inputs.goal === 'gain') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.rate}
                </label>
                <select
                  value={inputs.rate}
                  onChange={(e) => handleInputChange('rate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="slow">{t.slow}</option>
                  <option value="moderate">{t.moderateRate}</option>
                  <option value="fast">{t.fast}</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.dailyCalories}</h3>
            <div className="text-3xl font-bold text-blue-600">
              {results.dailyCalories.toLocaleString()}
            </div>
            <p className="text-sm text-blue-700 mt-1">{t.caloriesPerDay}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-green-900">{t.bmr}</div>
              <div className="text-xl font-bold text-green-600">
                {results.bmr.toLocaleString()} {t.caloriesPerDay}
              </div>
              <p className="text-xs text-green-700">Calories at rest</p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-purple-900">{t.tdee}</div>
              <div className="text-xl font-bold text-purple-600">
                {results.tdee.toLocaleString()} {t.caloriesPerDay}
              </div>
              <p className="text-xs text-purple-700">Daily energy expenditure</p>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-orange-900">{t.weeklyChange}</div>
              <div className="text-lg font-semibold text-orange-700">
                {results.weeklyChange}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-2">Calorie Ranges:</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>{t.maintenance}</span>
                <span>{t.yourtdee}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.weightloss}</span>
                <span>{t.tdee500}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.weightgain}</span>
                <span>{t.tdee500plus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
