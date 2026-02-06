'use client';

import React, { useState, useMemo } from 'react';
import CalculatorPageClient from '@/components/CalculatorPageClient';

interface ProteinIntakeCalculatorProps {
  lang: string;
}

interface ProteinData {
  weight: number;
  weightUnit: string;
  gender: string;
  age: number;
  activityLevel: string;
  fitnessGoal: string;
  trainingFrequency: number;
}

interface ProteinResults {
  dailyProteinIntake: number;
  proteinPerKg: number;
  proteinPerMeal: number;
  proteinPerMeal6: number;
  proteinPerPound: number;
  caloriesFromProtein: number;
}

// Base protein requirements per kg body weight
const BASE_PROTEIN_REQUIREMENTS = {
  sedentary: 0.8,
  lightly_active: 1.0,
  moderately_active: 1.2,
  very_active: 1.6,
  extremely_active: 2.0
};

// Fitness goal multipliers
const FITNESS_GOAL_MULTIPLIERS = {
  maintenance: 1.0,
  weight_loss: 1.1,
  muscle_gain: 1.6,
  athletic_performance: 1.8,
  bodybuilding: 2.2
};

// Age adjustments (minor effects)
const AGE_ADJUSTMENTS = {
  under_30: 1.0,
  thirty_to_fifty: 0.95,
  over_fifty: 1.1
};

// Gender adjustments (minor effects)
const GENDER_ADJUSTMENTS = {
  male: 1.0,
  female: 0.9
};

// Training frequency adjustments
const TRAINING_FREQUENCY_MULTIPLIERS = {
  0: 0.9,
  1: 1.0,
  2: 1.05,
  3: 1.1,
  4: 1.15,
  5: 1.2,
  6: 1.25,
  7: 1.3
};

export default function ProteinIntakeCalculator({ lang }: ProteinIntakeCalculatorProps) {
  const [formData, setFormData] = useState<ProteinData>({
    weight: 70,
    weightUnit: 'kg',
    gender: 'male',
    age: 30,
    activityLevel: 'moderately_active',
    fitnessGoal: 'maintenance',
    trainingFrequency: 3
  });

  const translations = {
    en: {
      title: "Protein Intake Calculator",
      subtitle: "Calculate your daily protein requirements based on weight, activity level, and fitness goals",
      weight: "Body Weight",
      weightUnit: "Weight Unit",
      gender: "Gender",
      age: "Age",
      activityLevel: "Activity Level",
      fitnessGoal: "Fitness Goal",
      trainingFrequency: "Training Days per Week",
      calculate: "Calculate Protein Intake",
      results: "Protein Intake Recommendations",
      dailyProteinIntake: "Daily Protein Intake",
      proteinPerKg: "Protein per kg Body Weight",
      proteinPerMeal: "Protein per Meal (4 meals)",
      proteinPerMeal6: "Protein per Meal (6 meals)",
      proteinPerPound: "Protein per lb Body Weight",
      caloriesFromProtein: "Calories from Protein",
      activityLevelOptions: {
        sedentary: "Sedentary (little/no exercise)",
        lightly_active: "Lightly Active (light exercise 1-3 days/week)",
        moderately_active: "Moderately Active (moderate exercise 3-5 days/week)",
        very_active: "Very Active (hard exercise 6-7 days/week)",
        extremely_active: "Extremely Active (very hard exercise, physical job, or 2x training)"
      },
      fitnessGoalOptions: {
        maintenance: "Maintenance (maintain current weight/muscle)",
        weight_loss: "Weight Loss (fat loss while preserving muscle)",
        muscle_gain: "Muscle Gain (building muscle mass)",
        athletic_performance: "Athletic Performance (endurance/strength sports)",
        bodybuilding: "Bodybuilding (maximum muscle growth)"
      },
      genderOptions: {
        male: "Male",
        female: "Female"
      },
      weightUnitOptions: {
        kg: "Kilograms (kg)",
        lbs: "Pounds (lbs)"
      },
      grams: "grams",
      gPerKg: "g/kg",
      gPerLb: "g/lb",
      calories: "calories",
      noteDisclaimer: "Note: These recommendations are general guidelines. Consult with a healthcare professional or registered dietitian for personalized advice."
    },
    es: {
      title: "Calculadora de Ingesta de Proteína",
      subtitle: "Calcula tus requerimientos diarios de proteína basados en peso, nivel de actividad y objetivos de fitness",
      weight: "Peso Corporal",
      weightUnit: "Unidad de Peso",
      gender: "Género",
      age: "Edad",
      activityLevel: "Nivel de Actividad",
      fitnessGoal: "Objetivo de Fitness",
      trainingFrequency: "Días de Entrenamiento por Semana",
      calculate: "Calcular Ingesta de Proteína",
      results: "Recomendaciones de Ingesta de Proteína",
      dailyProteinIntake: "Ingesta Diaria de Proteína",
      proteinPerKg: "Proteína por kg Peso Corporal",
      proteinPerMeal: "Proteína por Comida (4 comidas)",
      proteinPerMeal6: "Proteína por Comida (6 comidas)",
      proteinPerPound: "Proteína por lb Peso Corporal",
      caloriesFromProtein: "Calorías de Proteína",
      activityLevelOptions: {
        sedentary: "Sedentario (poco/sin ejercicio)",
        lightly_active: "Ligeramente Activo (ejercicio ligero 1-3 días/semana)",
        moderately_active: "Moderadamente Activo (ejercicio moderado 3-5 días/semana)",
        very_active: "Muy Activo (ejercicio duro 6-7 días/semana)",
        extremely_active: "Extremadamente Activo (ejercicio muy duro, trabajo físico, o 2x entrenamiento)"
      },
      fitnessGoalOptions: {
        maintenance: "Mantenimiento (mantener peso/músculo actual)",
        weight_loss: "Pérdida de Peso (pérdida grasa preservando músculo)",
        muscle_gain: "Ganancia Muscular (construyendo masa muscular)",
        athletic_performance: "Rendimiento Atlético (deportes resistencia/fuerza)",
        bodybuilding: "Culturismo (crecimiento muscular máximo)"
      },
      genderOptions: {
        male: "Masculino",
        female: "Femenino"
      },
      weightUnitOptions: {
        kg: "Kilogramos (kg)",
        lbs: "Libras (lbs)"
      },
      grams: "gramos",
      gPerKg: "g/kg",
      gPerLb: "g/lb",
      calories: "calorías",
      noteDisclaimer: "Nota: Estas recomendaciones son pautas generales. Consulte con un profesional de salud o dietista registrado para asesoramiento personalizado."
    },
    pt: {
      title: "Calculadora de Ingestão de Proteína",
      subtitle: "Calcule seus requerimentos diários de proteína baseados em peso, nível de atividade e objetivos de fitness",
      weight: "Peso Corporal",
      weightUnit: "Unidade de Peso",
      gender: "Gênero",
      age: "Idade",
      activityLevel: "Nível de Atividade",
      fitnessGoal: "Objetivo de Fitness",
      trainingFrequency: "Dias de Treinamento por Semana",
      calculate: "Calcular Ingestão de Proteína",
      results: "Recomendações de Ingestão de Proteína",
      dailyProteinIntake: "Ingestão Diária de Proteína",
      proteinPerKg: "Proteína por kg Peso Corporal",
      proteinPerMeal: "Proteína por Refeição (4 refeições)",
      proteinPerMeal6: "Proteína por Refeição (6 refeições)",
      proteinPerPound: "Proteína por lb Peso Corporal",
      caloriesFromProtein: "Calorias da Proteína",
      activityLevelOptions: {
        sedentary: "Sedentário (pouco/sem exercício)",
        lightly_active: "Ligeramente Ativo (exercício leve 1-3 dias/semana)",
        moderately_active: "Moderadamente Ativo (exercício moderado 3-5 dias/semana)",
        very_active: "Muito Ativo (exercício duro 6-7 dias/semana)",
        extremely_active: "Extremamente Ativo (exercício muito duro, trabalho físico, ou 2x treinamento)"
      },
      fitnessGoalOptions: {
        maintenance: "Manutenção (manter peso/músculo atual)",
        weight_loss: "Perda de Peso (perda gordura preservando músculo)",
        muscle_gain: "Ganho Muscular (construindo massa muscular)",
        athletic_performance: "Performance Atlética (esportes resistência/força)",
        bodybuilding: "Fisiculturismo (crescimento muscular máximo)"
      },
      genderOptions: {
        male: "Masculino",
        female: "Feminino"
      },
      weightUnitOptions: {
        kg: "Quilogramas (kg)",
        lbs: "Libras (lbs)"
      },
      grams: "gramas",
      gPerKg: "g/kg",
      gPerLb: "g/lb",
      calories: "calorias",
      noteDisclaimer: "Nota: Estas recomendações são baseadas em diretrizes gerais de nutrição esportiva."
    },
    fr: {
      title: "Calculateur d'Apport en Protéines",
      subtitle: "Calculez vos besoins quotidiens en protéines basés sur poids, niveau d'activité et objectifs fitness",
      weight: "Poids Corporel",
      weightUnit: "Unité de Poids",
      gender: "Genre",
      age: "Âge",
      activityLevel: "Niveau d'Activité",
      fitnessGoal: "Objectif Fitness",
      trainingFrequency: "Jours d'Entraînement par Semaine",
      calculate: "Calculer Apport en Protéines",
      results: "Recommandations d'Apport en Protéines",
      dailyProteinIntake: "Apport Quotidien en Protéines",
      proteinPerKg: "Protéines par kg Poids Corporel",
      proteinPerMeal: "Protéines par Repas (4 repas)",
      proteinPerMeal6: "Protéines par Repas (6 repas)",
      proteinPerPound: "Protéines par lb Poids Corporel",
      caloriesFromProtein: "Calories des Protéines",
      activityLevelOptions: {
        sedentary: "Sédentaire (peu/pas d'exercice)",
        lightly_active: "Légèrement Actif (exercice léger 1-3 jours/semaine)",
        moderately_active: "Modérément Actif (exercice modéré 3-5 jours/semaine)",
        very_active: "Très Actif (exercice dur 6-7 jours/semaine)",
        extremely_active: "Extrêmement Actif (exercice très dur, travail physique, ou 2x entraînement)"
      },
      fitnessGoalOptions: {
        maintenance: "Maintenance (maintenir poids/muscle actuel)",
        weight_loss: "Perte de Poids (perte graisse préservant muscle)",
        muscle_gain: "Gain Musculaire (construction masse musculaire)",
        athletic_performance: "Performance Athlétique (sports endurance/force)",
        bodybuilding: "Musculation (croissance musculaire maximum)"
      },
      genderOptions: {
        male: "Masculin",
        female: "Féminin"
      },
      weightUnitOptions: {
        kg: "Kilogrammes (kg)",
        lbs: "Livres (lbs)"
      },
      grams: "grammes",
      gPerKg: "g/kg",
      gPerLb: "g/lb",
      calories: "calories",
      noteDisclaimer: "Remarque: Ces recommandations sont basées sur les directives générales de nutrition sportive."
    },
    de: {
      title: "Proteinzufuhr-Rechner",
      subtitle: "Berechnen Sie Ihren täglichen Proteinbedarf basierend auf Gewicht, Aktivitätsniveau und Fitnessziele".,
      weight: "Körpergewicht",
      weightUnit: "Gewichtseinheit",
      gender: "Geschlecht",
      age: "Alter",
      activityLevel: "Aktivitätsniveau",
      fitnessGoal: "Fitnessziel",
      trainingFrequency: "Trainingstage pro Woche",
      calculate: "Proteinzufuhr Berechnen",
      results: "Proteinzufuhr-Empfehlungen",
      dailyProteinIntake: "Tägliche Proteinzufuhr",
      proteinPerKg: "Protein pro kg Körpergewicht",
      proteinPerMeal: "Protein pro Mahlzeit (4 Mahlzeiten)",
      proteinPerMeal6: "Protein pro Mahlzeit (6 Mahlzeiten)",
      proteinPerPound: "Protein pro Pfund Körpergewicht",
      caloriesFromProtein: "Kalorien aus Protein",
      activityLevelOptions: {
        sedentary: "Sitzend (wenig/kein Training)",
        lightly_active: "Leicht Aktiv (leichtes Training 1-3 Tage/Woche)",
        moderately_active: "Mäßig Aktiv (mäßiges Training 3-5 Tage/Woche)",
        very_active: "Sehr Aktiv (intensives Training 6-7 Tage/Woche)",
        extremely_active: "Extrem Aktiv (sehr intensives Training, körperliche Arbeit, oder 2x Training)"
      },
      fitnessGoalOptions: {
        maintenance: "Wartung (aktuelles Gewicht/Muskel erhalten)",
        weight_loss: "Gewichtsverlust (Fettabbau mit Muskelerhalt)",
        muscle_gain: "Muskelaufbau (Muskelmasseaufbau)",
        athletic_performance: "Sportliche Leistung (Ausdauer-/Kraftsportarten)",
        bodybuilding: "Körperbau (maximales Muskelwachstum)"
      },
      genderOptions: {
        male: "Mädlich",
        female: "Weiblich"
      },
      weightUnitOptions: {
        kg: "Kilogramm (kg)",
        lbs: "Pfund (lbs)"
      },
      grams: "Gramm",
      gPerKg: "g/kg",
      gPerLb: "g/Pfund",
      calories: "Kalorien",
      noteDisclaimer: "Hinweis: Diese Empfehlungen basieren auf allgemeinen Richtlinien für Sporterhöhung."
    },
    nl: {
      title: "Eiwitinname Rekenmachine",
      subtitle: "Bereken uw dagelijkse eiwitbehoefte op basis van gewicht, activiteitsniveau en fitnessdoelen",
      weight: "Lichaamsgewicht",
      weightUnit: "Gewichtseenheid",
      gender: "Geslacht",
      age: "Leeftijd",
      activityLevel: "Activiteitsniveau",
      fitnessGoal: "Fitnessdoel",
      trainingFrequency: "Trainingstage per Week",
      calculate: "Eiwitinname Berekenen",
      results: "Aanbevelingen voor Eiwitinname",
      dailyProteinIntake: "Dagelijkse Eiwitinname",
      proteinPerKg: "Eiwit per kg Lichaamsgewicht",
      proteinPerMeal: "Eiwit per Maaltijd (4 Maaltijden)",
      proteinPerMeal6: "Eiwit per Maaltijd (6 Maaltijden)",
      proteinPerPound: "Eiwit per Pond Lichaamsgewicht",
      caloriesFromProtein: "Calorieën van Eiwit",
      activityLevelOptions: {
        sedentary: "Zittend (weinig/geen training)",
        lightly_active: "Licht Actief (licht training 1-3 dagen/week)",
        moderately_active: "Matig Actief (matig training 3-5 dagen/week)",
        very_active: "Zeer Actief (intensief training 6-7 dagen/week)",
        extremely_active: "Extreem Actief (zeer intensief training, lichamelijk werk, of 2x training)"
      },
      fitnessGoalOptions: {
        maintenance: "Onderhoud (huidigegewicht/spier behouden)",
        weight_loss: "Gewichtsverlies (vetafname met spierretentie)",
        muscle_gain: "Spierbouw (spiermassakopbouw)",
        athletic_performance: "Sportprestatie (uithoudingsvermogen/krachtsportarten)",
        bodybuilding: "Bodybuilding (maximale spiergroei)"
      },
      genderOptions: {
        male: "Mannelijk",
        female: "Vrouwelijk"
      },
      weightUnitOptions: {
        kg: "Kilogram (kg)",
        lbs: "Pond (lbs)"
      },
      grams: "Gram",
      gPerKg: "g/kg",
      gPerLb: "g/pond",
      calories: "calorieën",
      noteDisclaimer: "Opmerking: Deze aanbevelingen zijn gebaseerd op algemene richtlijnen voor sportvoeding."
    },
    de: {
      title: "Proteinzufuhr-Rechner",
      subtitle: "Berechnen Sie Ihren täglichen Proteinbedarf basierend auf Gewicht, Aktivitätsniveau und Fitnessziele",
      weight: "Körpergewicht",
      weightUnit: "Gewichtseinheit",
      gender: "Geschlecht",
      age: "Alter",
      activityLevel: "Aktivitätsniveau",
      fitnessGoal: "Fitnessziel",
      trainingFrequency: "Trainingstage pro Woche",
      calculate: "Proteinzufuhr Berechnen",
      results: "Proteinzufuhr-Empfehlungen",
      dailyProteinIntake: "Tägliche Proteinzufuhr",
      proteinPerKg: "Protein pro kg Körpergewicht",
      proteinPerMeal: "Protein pro Mahlzeit (4 Mahlzeiten)",
      proteinPerMeal6: "Protein pro Mahlzeit (6 Mahlzeiten)",
      proteinPerPound: "Protein pro Pfund Körpergewicht",
      caloriesFromProtein: "Kalorien aus Protein",
      activityLevelOptions: {
        sedentary: "Sitzend (wenig/kein Training)",
        lightly_active: "Leicht Aktiv (leichtes Training 1-3 Tage/Woche)",
        moderately_active: "Mäßig Aktiv (mäßiges Training 3-5 Tage/Woche)",
        very_active: "Sehr Aktiv (intensives Training 6-7 Tage/Woche)",
        extremely_active: "Extrem Aktiv (sehr intensives Training, körperliche Arbeit, oder 2x Training)"
      },
      fitnessGoalOptions: {
        maintenance: "Wartung (aktuelles Gewicht/Muskel erhalten)",
        weight_loss: "Gewichtsverlust (Fettabbau mit Muskelerhalt)",
        muscle_gain: "Muskelaufbau (Muskelmasseaufbau)",
        athletic_performance: "Sportliche Leistung (Ausdauer-/Kraftsportarten)",
        bodybuilding: "Körperbau (maximales Muskelwachstum)"
      },
      genderOptions: {
        male: "Männlich",
        female: "Weiblich"
      },
      weightUnitOptions: {
        kg: "Kilogramm (kg)",
        lbs: "Pfund (lbs)"
      },
      grams: "Gramm",
      gPerKg: "g/kg",
      gPerLb: "g/Pfund",
      calories: "Kalorien",
      noteDisclaimer: "Hinweis: Diese Empfehlungen basieren auf allgemeinen Richtlinien für Sporternährung."
    },
    nl: {
      title: "Eiwitinname Rekenmachine",
      subtitle: "Bereken uw dagelijkse eiwitbehoefte op basis van gewicht, activiteitsniveau en fitnessdoelen",
      weight: "Lichaamsgewicht",
      weightUnit: "Gewichtseenheid",
      gender: "Geslacht",
      age: "Leeftijd",
      activityLevel: "Activiteitsniveau",
      fitnessGoal: "Fitnessdoel",
      trainingFrequency: "Trainingstage per Week",
      calculate: "Eiwitinname Berekenen",
      results: "Aanbevelingen voor Eiwitinname",
      dailyProteinIntake: "Dagelijkse Eiwitinname",
      proteinPerKg: "Eiwit per kg Lichaamsgewicht",
      proteinPerMeal: "Eiwit per Maaltijd (4 Maaltijden)",
      proteinPerMeal6: "Eiwit per Maaltijd (6 Maaltijden)",
      proteinPerPound: "Eiwit per Pond Lichaamsgewicht",
      caloriesFromProtein: "Caloriën van Eiwit",
      activityLevelOptions: {
        sedentary: "Zittend (weinig/geen training)",
        lightly_active: "Licht Actief (licht training 1-3 dagen/week)",
        moderately_active: "Matig Actief (matig training 3-5 dagen/week)",
        very_active: "Zeer Actief (intensief training 6-7 dagen/week)",
        extremely_active: "Extreem Actief (zeer intensief training, lichamelijk werk, of 2x training)"
      },
      fitnessGoalOptions: {
        maintenance: "Onderhoud (huidige gewicht/spier behouden)",
        weight_loss: "Gewichtsverlies (vetafname met spierretentie)",
        muscle_gain: "Spierbouw (spiermassakopbouw)",
        athletic_performance: "Sportprestatie (uithoudingsvolley)",
        bodybuilding: "Bodybuildeng (maximale spierg groei)"
      },
      genderOptions: {
        male: "Mannelijk",
        female: "Vrouwelijk"
      },
      weightUnitOptions: {
        kg: "Kilogram (kg)",
        lbs: "Pond (lbs)"
      },
      grams: "Gram",
      gPerKg: "g/kg",
      gPerLb: "g/pond",
      calories: "calorieën",
      noteDisclaimer: "Opmerking: Deze aanbevelingen zijn gebaseerd op algemene richtlijnen voor sportvoeding."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateProteinRequirements = (data: ProteinData): ProteinResults => {
    // Convert weight to kg if needed
    let weightKg = data.weight;
    if (data.weightUnit === 'lbs') {
      weightKg = data.weight / 2.20462; // Convert lbs to kg
    }

    // Get base protein requirement from activity level
    const baseProteinPerKg = BASE_PROTEIN_REQUIREMENTS[data.activityLevel as keyof typeof BASE_PROTEIN_REQUIREMENTS] || 1.2;

    // Apply fitness goal multiplier
    const goalMultiplier = FITNESS_GOAL_MULTIPLIERS[data.fitnessGoal as keyof typeof FITNESS_GOAL_MULTIPLIERS] || 1.0;

    // Apply age adjustment
    let ageMultiplier = 1.0;
    if (data.age < 30) ageMultiplier = AGE_ADJUSTMENTS.under_30;
    else if (data.age <= 50) ageMultiplier = AGE_ADJUSTMENTS.thirty_to_fifty;
    else ageMultiplier = AGE_ADJUSTMENTS.over_fifty;

    // Apply gender adjustment
    const genderMultiplier = GENDER_ADJUSTMENTS[data.gender as keyof typeof GENDER_ADJUSTMENTS] || 1.0;

    // Apply training frequency multiplier
    const trainingMultiplier = TRAINING_FREQUENCY_MULTIPLIERS[data.trainingFrequency as keyof typeof TRAINING_FREQUENCY_MULTIPLIERS] || 1.0;

    // Calculate final protein per kg
    const proteinPerKg = baseProteinPerKg * goalMultiplier * ageMultiplier * genderMultiplier * trainingMultiplier;

    // Calculate total daily protein
    const dailyProteinIntake = Math.round(weightKg * proteinPerKg);

    // Calculate other metrics
    const proteinPerMeal = Math.round(dailyProteinIntake / 4);
    const proteinPerMeal6 = Math.round(dailyProteinIntake / 6);
    const proteinPerPound = Math.round((dailyProteinIntake / (weightKg * 2.20462)) * 100) / 100; // Convert to per pound
    const caloriesFromProtein = dailyProteinIntake * 4; // 4 calories per gram of protein

    return {
      dailyProteinIntake,
      proteinPerKg: Math.round(proteinPerKg * 10) / 10,
      proteinPerMeal,
      proteinPerMeal6,
      proteinPerPound,
      caloriesFromProtein
    };
  };

  const results = useMemo((): ProteinResults => {
    return calculateProteinRequirements(formData);
  }, [formData]);

  const handleInputChange = (field: keyof ProteinData, value: string | number) => {
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
            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.weight}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  min="30"
                  max="500"
                  step="0.1"
                />
                <select
                  value={formData.weightUnit}
                  onChange={(e) => handleInputChange('weightUnit', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {Object.entries(t.weightUnitOptions).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
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

            {/* Fitness Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.fitnessGoal}
              </label>
              <select
                value={formData.fitnessGoal}
                onChange={(e) => handleInputChange('fitnessGoal', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.fitnessGoalOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Training Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.trainingFrequency}
              </label>
              <input
                type="number"
                value={formData.trainingFrequency}
                onChange={(e) => handleInputChange('trainingFrequency', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                min="0"
                max="7"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.results}
          </h2>

          <div className="space-y-4">
            {/* Daily Protein Intake */}
            <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.dailyProteinIntake}
              </span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatNumber(results.dailyProteinIntake)} {t.grams}
              </span>
            </div>

            {/* Protein Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.proteinPerKg}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatNumber(results.proteinPerKg, 1)} {t.gPerKg}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.proteinPerMeal}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatNumber(results.proteinPerMeal)} {t.grams}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.proteinPerMeal6}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatNumber(results.proteinPerMeal6)} {t.grams}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.proteinPerPound}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatNumber(results.proteinPerPound, 1)} {t.gPerLb}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{t.caloriesFromProtein}</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {formatNumber(results.caloriesFromProtein)} {t.calories}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Protein Distribution Tips
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Aim for 20-40g protein per meal</li>
            <li>• Space protein intake every 3-4 hours</li>
            <li>• Include protein in every meal</li>
            <li>• Focus on complete protein sources</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            🍗 Protein Sources
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• Chicken breast: ~31g per 100g</li>
            <li>• Greek yogurt: ~10g per 100g</li>
            <li>• Eggs: ~6g per large egg</li>
            <li>• Lentils: ~9g per 100g cooked</li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          {t.noteDisclaimer}
          Individual needs may vary based on body composition, training intensity, metabolism, and health conditions.
          Consult a healthcare provider or registered dietitian for personalized nutrition advice.
        </p>
      </div>
    </div>
  );
}
