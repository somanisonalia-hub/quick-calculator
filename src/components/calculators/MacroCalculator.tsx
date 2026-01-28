'use client';

import React, { useState } from 'react';

export const MacroCalculator: React.FC<{ lang?: string }> = ({ lang = 'en' }) => {
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(170);
  const [height, setHeight] = useState(70);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [results, setResults] = useState<any>(null);

  const texts = {
    en: {
      title: 'Macro Calculator',
      age: 'Age',
      weight: 'Weight (lbs)',
      height: 'Height (inches)',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      activity: 'Activity Level',
      sedentary: 'Sedentary (1.2)',
      light: 'Lightly Active (1.375)',
      moderate: 'Moderately Active (1.55)',
      very: 'Very Active (1.725)',
      goal: 'Goal',
      lose: 'Lose Weight',
      maintain: 'Maintain',
      gain: 'Gain Muscle',
      calculate: 'Calculate Macros',
      tdee: 'Daily Calories',
      protein: 'Protein (g)',
      carbs: 'Carbs (g)',
      fat: 'Fat (g)',
      calories_from: 'Calories from',
    },
    es: {
      title: 'Calculadora de Macros',
      age: 'Edad',
      weight: 'Peso (lbs)',
      height: 'Altura (pulgadas)',
      gender: 'Género',
      male: 'Hombre',
      female: 'Mujer',
      activity: 'Nivel de Actividad',
      sedentary: 'Sedentario (1.2)',
      light: 'Ligeramente Activo (1.375)',
      moderate: 'Moderadamente Activo (1.55)',
      very: 'Muy Activo (1.725)',
      goal: 'Objetivo',
      lose: 'Perder Peso',
      maintain: 'Mantener',
      gain: 'Ganar Músculo',
      calculate: 'Calcular Macros',
      tdee: 'Calorías Diarias',
      protein: 'Proteína (g)',
      carbs: 'Carbohidratos (g)',
      fat: 'Grasa (g)',
      calories_from: 'Calorías de',
    },
    pt: {
      title: 'Calculadora de Macros',
      age: 'Idade',
      weight: 'Peso (lbs)',
      height: 'Altura (polegadas)',
      gender: 'Gênero',
      male: 'Masculino',
      female: 'Feminino',
      activity: 'Nível de Atividade',
      sedentary: 'Sedentário (1.2)',
      light: 'Ligeiramente Ativo (1.375)',
      moderate: 'Moderadamente Ativo (1.55)',
      very: 'Muito Ativo (1.725)',
      goal: 'Objetivo',
      lose: 'Perder Peso',
      maintain: 'Manter',
      gain: 'Ganhar Músculo',
      calculate: 'Calcular Macros',
      tdee: 'Calorias Diárias',
      protein: 'Proteína (g)',
      carbs: 'Carboidratos (g)',
      fat: 'Gordura (g)',
      calories_from: 'Calorias de',
    },
    fr: {
      title: 'Calculatrice de Macros',
      age: 'Âge',
      weight: 'Poids (lbs)',
      height: 'Taille (pouces)',
      gender: 'Sexe',
      male: 'Homme',
      female: 'Femme',
      activity: 'Niveau d\'Activité',
      sedentary: 'Sédentaire (1.2)',
      light: 'Peu Actif (1.375)',
      moderate: 'Modérément Actif (1.55)',
      very: 'Très Actif (1.725)',
      goal: 'Objectif',
      lose: 'Perdre du Poids',
      maintain: 'Maintenir',
      gain: 'Gagner du Muscle',
      calculate: 'Calculer les Macros',
      tdee: 'Calories Quotidiennes',
      protein: 'Protéine (g)',
      carbs: 'Glucides (g)',
      fat: 'Lipides (g)',
      calories_from: 'Calories de',
    },
  };

  const t = texts[lang as keyof typeof texts] || texts.en;

  const calculateMacros = () => {
    // Mifflin-St Jeor equation for BMR
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weight / 2.205 + 6.25 * height * 2.54 - 5 * age + 5;
    } else {
      bmr = 10 * weight / 2.205 + 6.25 * height * 2.54 - 5 * age - 161;
    }

    // Apply activity factor
    let tdee = bmr * activity;

    // Apply goal
    if (goal === 'lose') {
      tdee *= 0.85; // 15% deficit
    } else if (goal === 'gain') {
      tdee *= 1.1; // 10% surplus
    }

    // Calculate macros
    let proteinPercent = 0.3;
    let carbsPercent = 0.45;
    let fatPercent = 0.25;

    if (goal === 'lose') {
      proteinPercent = 0.35;
      carbsPercent = 0.4;
      fatPercent = 0.25;
    } else if (goal === 'gain') {
      proteinPercent = 0.3;
      carbsPercent = 0.5;
      fatPercent = 0.2;
    }

    const protein = (tdee * proteinPercent) / 4;
    const carbs = (tdee * carbsPercent) / 4;
    const fat = (tdee * fatPercent) / 9;

    setResults({
      tdee: Math.round(tdee),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      proteinCals: Math.round(protein * 4),
      carbsCals: Math.round(carbs * 4),
      fatCals: Math.round(fat * 9),
    });
  };

  return (
    <div id="calculator-section" className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{t.title}</h1>

      <div className="space-y-4">
        {/* Age */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.age}</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            min="15"
            max="100"
          />
        </div>

        {/* Gender */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.gender}</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender('male')}
                className="mr-2"
              />
              <span>{t.male}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender('female')}
                className="mr-2"
              />
              <span>{t.female}</span>
            </label>
          </div>
        </div>

        {/* Weight */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.weight}</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            min="50"
            max="500"
            step="5"
          />
        </div>

        {/* Height */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.height}</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            min="36"
            max="96"
            step="0.5"
          />
        </div>

        {/* Activity Level */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.activity}</label>
          <select
            value={activity}
            onChange={(e) => setActivity(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={1.2}>{t.sedentary}</option>
            <option value={1.375}>{t.light}</option>
            <option value={1.55}>{t.moderate}</option>
            <option value={1.725}>{t.very}</option>
          </select>
        </div>

        {/* Goal */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.goal}</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="lose"
                checked={goal === 'lose'}
                onChange={(e) => setGoal('lose')}
                className="mr-2"
              />
              <span>{t.lose}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="maintain"
                checked={goal === 'maintain'}
                onChange={(e) => setGoal('maintain')}
                className="mr-2"
              />
              <span>{t.maintain}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="gain"
                checked={goal === 'gain'}
                onChange={(e) => setGoal('gain')}
                className="mr-2"
              />
              <span>{t.gain}</span>
            </label>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateMacros}
          className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition text-lg"
        >
          {t.calculate}
        </button>

        {/* Results */}
        {results && (
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Your Macros</h3>
            
            <div className="mb-6">
              <p className="text-sm text-purple-700 font-medium">{t.tdee}</p>
              <p className="text-4xl font-bold text-purple-900">{results.tdee}</p>
              <p className="text-xs text-purple-600">kcal/day</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">{t.protein}</p>
                <p className="text-2xl font-bold text-purple-900">{results.protein}g</p>
                <p className="text-xs text-gray-500">{results.proteinCals} kcal</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">{t.carbs}</p>
                <p className="text-2xl font-bold text-pink-900">{results.carbs}g</p>
                <p className="text-xs text-gray-500">{results.carbsCals} kcal</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 font-medium">{t.fat}</p>
                <p className="text-2xl font-bold text-orange-900">{results.fat}g</p>
                <p className="text-xs text-gray-500">{results.fatCals} kcal</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacroCalculator;
