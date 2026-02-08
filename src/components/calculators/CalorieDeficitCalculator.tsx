'use client';

import React, { useState } from 'react';

interface CalorieDeficitCalculatorProps {
  lang?: string;
}

const translations = {
  en: {
    title: 'Calorie Deficit Calculator',
    currentWeightLabel: 'Current Weight (lbs)',
    currentWeightPlaceholder: 'Enter weight',
    goalWeightLabel: 'Goal Weight (lbs)',
    goalWeightPlaceholder: 'Enter goal',
    timeframeLabel: 'Timeline (weeks)',
    timeframePlaceholder: 'Enter weeks',
    activityLabel: 'Activity Level',
    sedentary: 'Sedentary (little exercise)',
    lightly: 'Lightly Active (1-3 days/week)',
    moderately: 'Moderately Active (3-5 days/week)',
    very: 'Very Active (6-7 days/week)',
    extremely: 'Extremely Active (twice per day)',
    calculate: 'Calculate Deficit',
    deficitNeeded: 'Daily Deficit Needed',
    caloriesPerDay: 'calories per day',
    weeklyDeficit: 'Weekly Deficit',
    totalWeight: 'Total Weight Loss',
    lbs: 'lbs',
    timelineMonths: 'months',
    breakdown: 'Deficit Breakdown',
    estimatedDailyIntake: 'Estimated Daily Intake',
    caloriesPerWeek: 'calories per week',
    results: 'Weight Loss Results',
    safe: 'Safe Rate: 1-2 lbs/week',
    warning: 'Very aggressive. Aim for 1-2 lbs/week for sustainable results.',
    realistic: 'This is a realistic and sustainable pace.',
    excellent: 'Excellent - very realistic timeline for healthy weight loss.',
    disclaimer: 'This is an estimate based on standard calorie calculations. Consult a healthcare professional for personalized advice.',
    errorWeightLoss: 'Goal weight must be less than current weight.',
    errorNegative: 'All values must be positive numbers.',
    enterValues: 'Enter your current weight, goal weight, and timeline to calculate',
      reset: "Reset"
  },
  es: {
    title: 'Calculadora de Déficit de Calorías',
    currentWeightLabel: 'Peso Actual (lbs)',
    currentWeightPlaceholder: 'Ingresa peso',
    goalWeightLabel: 'Peso Objetivo (lbs)',
    goalWeightPlaceholder: 'Ingresa objetivo',
    timeframeLabel: 'Timeline (semanas)',
    timeframePlaceholder: 'Ingresa semanas',
    activityLabel: 'Nivel de Actividad',
    sedentary: 'Sedentario (poco ejercicio)',
    lightly: 'Ligeramente Activo (1-3 días/semana)',
    moderately: 'Moderadamente Activo (3-5 días/semana)',
    very: 'Muy Activo (6-7 días/semana)',
    extremely: 'Extremadamente Activo (dos veces al día)',
    calculate: 'Calcular Déficit',
    deficitNeeded: 'Déficit Diario Necesario',
    caloriesPerDay: 'calorías por día',
    weeklyDeficit: 'Déficit Semanal',
    totalWeight: 'Pérdida de Peso Total',
    lbs: 'lbs',
    timelineMonths: 'meses',
    breakdown: 'Desglose del Déficit',
    estimatedDailyIntake: 'Ingesta Diaria Estimada',
    caloriesPerWeek: 'calorías por semana',
    results: 'Resultados de Pérdida de Peso',
    safe: 'Seguro: 1-2 lbs/semana',
    warning: 'Muy agresivo. Apunta a 1-2 lbs/semana para resultados sostenibles.',
    realistic: 'Este es un ritmo realista y sostenible.',
    excellent: 'Excelente - calendario muy realista para pérdida de peso saludable.',
    disclaimer: 'Esta es una estimación basada en cálculos de calorías estándar. Consulta a un profesional de la salud para consejos personalizados.',
    errorWeightLoss: 'El peso objetivo debe ser menor que el peso actual.',
    errorNegative: 'Todos los valores deben ser números positivos.',
    enterValues: 'Ingresa tu peso actual, peso objetivo y timeline para calcular',
      reset: "Restablecer"
  },
  pt: {
    title: 'Calculadora de Déficit de Calorias',
    currentWeightLabel: 'Peso Atual (lbs)',
    currentWeightPlaceholder: 'Digite peso',
    goalWeightLabel: 'Peso Objetivo (lbs)',
    goalWeightPlaceholder: 'Digite objetivo',
    timeframeLabel: 'Cronograma (semanas)',
    timeframePlaceholder: 'Digite semanas',
    activityLabel: 'Nível de Atividade',
    sedentary: 'Sedentário (pouco exercício)',
    lightly: 'Ligeiramente Ativo (1-3 dias/semana)',
    moderately: 'Moderadamente Ativo (3-5 dias/semana)',
    very: 'Muito Ativo (6-7 dias/semana)',
    extremely: 'Extremamente Ativo (duas vezes ao dia)',
    calculate: 'Calcular Déficit',
    deficitNeeded: 'Déficit Diário Necessário',
    caloriesPerDay: 'calorias por dia',
    weeklyDeficit: 'Déficit Semanal',
    totalWeight: 'Perda de Peso Total',
    lbs: 'lbs',
    timelineMonths: 'meses',
    breakdown: 'Divisão do Déficit',
    estimatedDailyIntake: 'Ingestão Diária Estimada',
    caloriesPerWeek: 'calorias por semana',
    results: 'Resultados de Perda de Peso',
    safe: 'Seguro: 1-2 lbs/semana',
    warning: 'Muito agressivo. Aponte para 1-2 lbs/semana para resultados sustentáveis.',
    realistic: 'Este é um ritmo realista e sustentável.',
    excellent: 'Excelente - cronograma muito realista para perda de peso saudável.',
    disclaimer: 'Esta é uma estimativa baseada em cálculos de calorias padrão. Consulte um profissional de saúde para orientação personalizada.',
    errorWeightLoss: 'O peso objetivo deve ser menor que o peso atual.',
    errorNegative: 'Todos os valores devem ser números positivos.',
    enterValues: 'Digite seu peso atual, peso objetivo e cronograma para calcular',
      reset: "Redefinir"
  },
  fr: {
    title: 'Calculatrice de Déficit Calorique',
    currentWeightLabel: 'Poids Actuel (lbs)',
    currentWeightPlaceholder: 'Entrez poids',
    goalWeightLabel: 'Poids Objectif (lbs)',
    goalWeightPlaceholder: 'Entrez objectif',
    timeframeLabel: 'Délai (semaines)',
    timeframePlaceholder: 'Entrez semaines',
    activityLabel: 'Niveau d\'Activité',
    sedentary: 'Sédentaire (peu d\'exercice)',
    lightly: 'Légèrement Actif (1-3 jours/semaine)',
    moderately: 'Modérément Actif (3-5 jours/semaine)',
    very: 'Très Actif (6-7 jours/semaine)',
    extremely: 'Extrêmement Actif (deux fois par jour)',
    calculate: 'Calculer le Déficit',
    deficitNeeded: 'Déficit Quotidien Nécessaire',
    caloriesPerDay: 'calories par jour',
    weeklyDeficit: 'Déficit Hebdomadaire',
    totalWeight: 'Perte de Poids Totale',
    lbs: 'lbs',
    timelineMonths: 'mois',
    breakdown: 'Ventilation du Déficit',
    estimatedDailyIntake: 'Apport Quotidien Estimé',
    caloriesPerWeek: 'calories par semaine',
    results: 'Résultats de Perte de Poids',
    safe: 'Sûr: 1-2 lbs/semaine',
    warning: 'Très agressif. Visez 1-2 lbs/semaine pour des résultats durables.',
    realistic: 'C\'est un rythme réaliste et durable.',
    excellent: 'Excellent - calendrier très réaliste pour une perte de poids saine.',
    disclaimer: 'Ceci est une estimation basée sur des calculs de calories standard. Consultez un professionnel de la santé pour des conseils personnalisés.',
    errorWeightLoss: 'Le poids objectif doit être inférieur au poids actuel.',
    errorNegative: 'Toutes les valeurs doivent être des nombres positifs.',
    enterValues: 'Entrez votre poids actuel, poids objectif et délai pour calculer',
    reset: 'Réinitialiser'
  }
};

export default function CalorieDeficitCalculator({ lang = 'en' }: CalorieDeficitCalculatorProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [activity, setActivity] = useState('moderately');

  // Activity factors for calculation
  const activityFactors: Record<string, number> = {
    sedentary: 1.2,
    lightly: 1.375,
    moderately: 1.55,
    very: 1.725,
    extremely: 1.9
  };

  // Calculation logic moved into a function
  const calculateDeficit = () => {
    const current = parseFloat(currentWeight);
    const goal = parseFloat(goalWeight);
    const weeks = parseFloat(timeframe);

    if (!current || !goal || !weeks) return null;
    if (current <= 0 || goal <= 0 || weeks <= 0) {
      return { error: t.errorNegative };
    }
    if (goal >= current) {
      return { error: t.errorWeightLoss };
    }

    const totalWeightLoss = current - goal;
    const caloriesNeeded = totalWeightLoss * 3500; // 3500 calories = 1 lb
    const dailyDeficit = Math.round(caloriesNeeded / (weeks * 7));
    const weeklyDeficit = dailyDeficit * 7;

    // Estimate TDEE at current weight (simplified: ~15-17 calories per lb)
    const estimatedTDEE = Math.round(current * 16);
    const dailyIntake = estimatedTDEE - dailyDeficit;

    // Assess if it's realistic
    let assessment = '';
    if (dailyDeficit > 1000) {
      assessment = t.warning;
    } else if (dailyDeficit > 500) {
      assessment = t.realistic;
    } else {
      assessment = t.excellent;
    }

    return {
      totalWeightLoss,
      weeklyRate: (totalWeightLoss / weeks),
      dailyDeficit,
      weeklyDeficit,
      estimatedTDEE,
      dailyIntake,
      months: (weeks / 4.33).toFixed(1),
      assessment
    };
  };

  // Reset handler must be outside calculateDeficit
  const resetCalculator = () => {
    setCurrentWeight('');
    setGoalWeight('');
    setTimeframe('');
    setActivity('moderately');
  };

  const result = calculateDeficit();

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-5xl">💪</span>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{t.title}</h2>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.currentWeightLabel}
              </label>
              <input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                placeholder={t.currentWeightPlaceholder}
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.goalWeightLabel}
              </label>
              <input
                type="number"
                value={goalWeight}
                onChange={(e) => setGoalWeight(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                placeholder={t.goalWeightPlaceholder}
                step="0.1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.timeframeLabel}
              </label>
              <input
                type="number"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                placeholder={t.timeframePlaceholder}
                step="1"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.activityLabel}
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="sedentary">{t.sedentary}</option>
                <option value="lightly">{t.lightly}</option>
                <option value="moderately">{t.moderately}</option>
                <option value="very">{t.very}</option>
                <option value="extremely">{t.extremely}</option>
              </select>
            
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateDeficit}
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
          </div>
        </div>

        {/* Results Section */}
        {result && !result.error && 'dailyDeficit' in result && (
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{t.breakdown}</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-orange-50 dark:bg-gray-600 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.deficitNeeded}</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{Math.abs(result.dailyDeficit || 0)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.caloriesPerDay}</p>
              </div>

              <div className="text-center p-4 bg-orange-50 dark:bg-gray-600 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.weeklyDeficit}</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{Math.abs(result.weeklyDeficit || 0)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.caloriesPerWeek}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-orange-50 dark:bg-gray-600 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.estimatedDailyIntake}</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{Math.max(result.dailyIntake || 0, 1200)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.caloriesPerDay}</p>
              </div>

              <div className="text-center p-4 bg-orange-50 dark:bg-gray-600 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.totalWeight}</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{(result.totalWeightLoss || 0).toFixed(1)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.lbs}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Analysis */}
        {result && !result.error && 'weeklyRate' in result && (
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md border-l-4 border-orange-500">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{t.results}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {t.safe}
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold text-orange-600 dark:text-orange-400">
              {result.assessment || ''}
            </p>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p>📊 {t.totalWeight}: <span className="font-bold">{(result.totalWeightLoss || 0).toFixed(1)} {t.lbs}</span></p>
              <p>⏱️ {t.timelineMonths}: <span className="font-bold">~{result.months || 0} {t.timelineMonths}</span></p>
              <p>📈 {t.weeklyDeficit}: <span className="font-bold">{(result.weeklyRate || 0).toFixed(2)} {t.lbs}/week</span></p>
            </div>
          </div>
        )}

        {result?.error && (
          <div className="bg-red-50 dark:bg-red-900 rounded-xl p-4 border border-red-200 dark:border-red-700">
            <p className="text-red-700 dark:text-red-300 font-semibold">{result.error}</p>
          </div>
        )}
      </div>

      {!result && (currentWeight || goalWeight || timeframe) && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
          {t.enterValues}
        </p>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
        {t.disclaimer}
      </p>
    </div>
  );
}
