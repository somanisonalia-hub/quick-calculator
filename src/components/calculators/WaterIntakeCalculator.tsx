'use client';

import React, { useState, useMemo } from 'react';
import CalculatorPageClient from '@/components/CalculatorPageClient';

interface WaterIntakeCalculatorProps {
  lang: string;
}

interface WaterData {
  weight: number;
  weightUnit: string;
  activityLevel: string;
  climate: string;
  healthCondition: string;
  age: number;
  gender: string;
}

interface WaterResults {
  dailyWaterIntake: number;
  waterLiters: number;
  waterOunces: number;
  waterCups: number;
  hydrationSchedule: string;
}

// Activity level multipliers (base is 30-35ml/kg)
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.0,
  lightly_active: 1.2,
  moderately_active: 1.4,
  very_active: 1.6,
  extremely_active: 1.8
};

// Climate adjustment multipliers
const CLIMATE_MULTIPLIERS = {
  normal: 1.0,
  hot_dry: 1.3,
  cold_dry: 1.2,
  humid: 1.1
};

// Health condition multipliers
const HEALTH_MULTIPLIERS = {
  normal: 1.0,
  pregnancy: 1.3,
  breastfeeding: 1.5,
  illness: 1.2,
  elderly: 0.9
};

// Age adjustments (minor effects)
const AGE_MULTIPLIERS = {
  child: 0.8,
  teenager: 0.9,
  adult: 1.0,
  elderly: 0.9
};

// Gender base adjustments (minor effects)
const GENDER_BASE = {
  male: 35, // ml/kg
  female: 30 // ml/kg
};

export default function WaterIntakeCalculator({ lang }: WaterIntakeCalculatorProps) {
  const [formData, setFormData] = useState<WaterData>({
    weight: 70,
    weightUnit: 'kg',
    activityLevel: 'moderately_active',
    climate: 'normal',
    healthCondition: 'normal',
    age: 30,
    gender: 'male'
  });

  const translations = {
    en: {
      title: "Water Intake Calculator",
      subtitle: "Calculate your daily water requirements based on weight, activity level, and environmental factors",
      weight: "Body Weight",
      weightUnit: "Weight Unit",
      activityLevel: "Activity Level",
      climate: "Climate Conditions",
      healthCondition: "Health Conditions",
      age: "Age",
      gender: "Gender",
      calculate: "Calculate Water Intake",
      results: "Daily Water Intake Recommendations",
      dailyWaterIntake: "Daily Water Intake",
      waterLiters: "Daily Water (Liters)",
      waterOunces: "Daily Water (Ounces)",
      waterCups: "Daily Water (Cups)",
      hydrationSchedule: "Hydration Schedule",
      activityLevelOptions: {
        sedentary: "Sedentary (little/no exercise)",
        lightly_active: "Lightly Active (light exercise 1-3 days/week)",
        moderately_active: "Moderately Active (moderate exercise 3-5 days/week)",
        very_active: "Very Active (hard exercise 6-7 days/week)",
        extremely_active: "Extremely Active (very hard exercise, physical job, or 2x training)"
      },
      climateOptions: {
        normal: "Normal (moderate temperature and humidity)",
        hot_dry: "Hot & Dry (desert, summer heat)",
        cold_dry: "Cold & Dry (winter, dry air)",
        humid: "Humid (tropical, high humidity)"
      },
      healthConditionOptions: {
        normal: "Normal (healthy adult)",
        pregnancy: "Pregnancy (additional needs for fetal health)",
        breastfeeding: "Breastfeeding (increased hydration needs)",
        illness: "Illness/Recovery (fever, diarrhea, etc.)",
        elderly: "Elderly (65+ years, reduced thirst sensation)"
      },
      genderOptions: {
        male: "Male",
        female: "Female"
      },
      weightUnitOptions: {
        kg: "Kilograms (kg)",
        lbs: "Pounds (lbs)"
      },
      ml: "ml",
      liters: "L",
      ounces: "oz",
      cups: "copos",
      noteDisclaimer: "Nota: Estas recomendações são diretrizes gerais baseadas em pesquisa de saúde estabelecida."
    },
    es: {
      title: "Calculadora de Ingesta de Agua",
      subtitle: "Calcula tus requerimientos diarios de agua basados en peso, nivel de actividad y factores ambientales",
      weight: "Peso Corporal",
      weightUnit: "Unidad de Peso",
      activityLevel: "Nivel de Actividad",
      climate: "Condiciones Climáticas",
      healthCondition: "Condiciones de Salud",
      age: "Edad",
      gender: "Género",
      calculate: "Calcular Ingesta de Agua",
      results: "Recomendaciones de Ingesta Diaria de Agua",
      dailyWaterIntake: "Ingesta Diaria de Agua",
      waterLiters: "Agua Diaria (Litros)",
      waterOunces: "Agua Diaria (Onzas)",
      waterCups: "Agua Diaria (Tazas)",
      hydrationSchedule: "Horario de Hidratación",
      activityLevelOptions: {
        sedentary: "Sedentario (poco/sin ejercicio)",
        lightly_active: "Ligeramente Activo (ejercicio ligero 1-3 días/semana)",
        moderately_active: "Moderadamente Activo (ejercicio moderado 3-5 días/semana)",
        very_active: "Muy Activo (ejercicio duro 6-7 días/semana)",
        extremely_active: "Extremadamente Activo (ejercicio muy duro, trabajo físico, o 2x entrenamiento)"
      },
      climateOptions: {
        normal: "Normal (temperatura y humedad moderadas)",
        hot_dry: "Caliente y Seco (desierto, calor de verano)",
        cold_dry: "Frío y Seco (invierno, aire seco)",
        humid: "Húmedo (trópico, alta humedad)"
      },
      healthConditionOptions: {
        normal: "Normal (adulto saludable)",
        pregnancy: "Embarazo (necesidades adicionales para salud fetal)",
        breastfeeding: "Lactancia (necesidades aumentadas de hidratación)",
        illness: "Enfermedad/Recuperación (fiebre, diarrea, etc.)",
        elderly: "Adulto Mayor (65+ años, sensación de sed reducida)"
      },
      genderOptions: {
        male: "Masculino",
        female: "Femenino"
      },
      weightUnitOptions: {
        kg: "Kilogramos (kg)",
        lbs: "Libras (lbs)"
      },
      ml: "ml",
      liters: "L",
      ounces: "oz",
      cups: "tazas",
      noteDisclaimer: "Nota: Estas recomendaciones son pautas generales basadas en investigación de salud establecida."
    },
    pt: {
      title: "Calculadora de Ingestão de Água",
      subtitle: "Calcule seus requerimentos diários de água baseados em peso, nível de atividade e fatores ambientais",
      weight: "Peso Corporal",
      weightUnit: "Unidade de Peso",
      activityLevel: "Nível de Atividade",
      climate: "Condições Climáticas",
      healthCondition: "Condições de Saúde",
      age: "Idade",
      gender: "Gênero",
      calculate: "Calcular Ingestão de Água",
      results: "Recomendações de Ingestão Diária de Água",
      dailyWaterIntake: "Ingestão Diária de Água",
      waterLiters: "Água Diária (Litros)",
      waterOunces: "Água Diária (Onças)",
      waterCups: "Água Diária (Xícaras)",
      hydrationSchedule: "Horário de Hidratação",
      activityLevelOptions: {
        sedentary: "Sedentário (pouco/sem exercício)",
        lightly_active: "Ligeramente Ativo (exercício leve 1-3 dias/semana)",
        moderately_active: "Moderadamente Ativo (exercício moderado 3-5 dias/semana)",
        very_active: "Muito Ativo (exercício duro 6-7 dias/semana)",
        extremely_active: "Extremamente Ativo (exercício muito duro, trabalho físico, ou 2x treinamento)"
      },
      climateOptions: {
        normal: "Normal (temperatura e umidade moderadas)",
        hot_dry: "Quente e Seco (deserto, calor de verão)",
        cold_dry: "Frio e Seco (inverno, ar seco)",
        humid: "Úmido (trópico, alta umidade)"
      },
      healthConditionOptions: {
        normal: "Normal (adulto saudável)",
        pregnancy: "Gravidez (necessidades adicionais para saúde fetal)",
        breastfeeding: "Amamentação (necessidades aumentadas de hidratação)",
        illness: "Doença/Recuperação (febre, diarreia, etc.)",
        elderly: "Idoso (65+ anos, sensação de sede reduzida)"
      },
      genderOptions: {
        male: "Masculino",
        female: "Feminino"
      },
      weightUnitOptions: {
        kg: "Quilogramas (kg)",
        lbs: "Libras (lbs)"
      },
      ml: "ml",
      liters: "L",
      ounces: "onças",
      cups: "xícaras",
      noteDisclaimer: "Nota: Estas recomendações são diretrizes gerais baseadas em pesquisa de saúde estabelecida."
    },
    fr: {
      title: "Calculateur d'Apport en Eau",
      subtitle: "Calculez vos besoins quotidiens en eau basés sur poids, niveau d'activité et facteurs environnementaux",
      weight: "Poids Corporel",
      weightUnit: "Unité de Poids",
      activityLevel: "Niveau d'Activité",
      climate: "Conditions Climatiques",
      healthCondition: "Conditions de Santé",
      age: "Âge",
      gender: "Genre",
      calculate: "Calculer Apport en Eau",
      results: "Recommandations d'Apport Quotidien en Eau",
      dailyWaterIntake: "Apport Quotidien en Eau",
      waterLiters: "Eau Quotidienne (Litres)",
      waterOunces: "Eau Quotidienne (Onces)",
      waterCups: "Eau Quotidienne (Tasses)",
      hydrationSchedule: "Horaire d'Hydratation",
      activityLevelOptions: {
        sedentary: "Sédentaire (peu/pas d'exercice)",
        lightly_active: "Légèrement Actif (exercice léger 1-3 jours/semaine)",
        moderately_active: "Modérément Actif (exercice modéré 3-5 jours/semaine)",
        very_active: "Très Actif (exercice dur 6-7 jours/semaine)",
        extremely_active: "Extrêmement Actif (exercice très dur, travail physique, ou 2x entraînement)"
      },
      climateOptions: {
        normal: "Normal (température et humidité modérées)",
        hot_dry: "Chaud et Sec (désert, chaleur estivale)",
        cold_dry: "Froid et Sec (hiver, air sec)",
        humid: "Humide (tropical, haute humidité)"
      },
      healthConditionOptions: {
        normal: "Normal (adulte en bonne santé)",
        pregnancy: "Grossesse (besoins supplémentaires pour santé fœtale)",
        breastfeeding: "Allaitement (besoins accrus en hydratation)",
        illness: "Maladie/Récupération (fièvre, diarrhée, etc.)",
        elderly: "Âgé (65+ ans, sensation de soif réduite)"
      },
      genderOptions: {
        male: "Masculin",
        female: "Féminin"
      },
      weightUnitOptions: {
        kg: "Kilogrammes (kg)",
        lbs: "Livres (lbs)"
      },
      ml: "ml",
      liters: "L",
      ounces: "onces",
      cups: "tasses",
      noteDisclaimer: "Remarque: Ces recommandations sont des lignes directrices générales basées sur la recherche en santé établie."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateWaterIntake = (data: WaterData): WaterResults => {
    // Convert weight to kg if needed
    let weightKg = data.weight;
    if (data.weightUnit === 'lbs') {
      weightKg = data.weight / 2.20462; // Convert lbs to kg
    }

    // Get base water intake per kg based on gender
    const basePerKg = GENDER_BASE[data.gender as keyof typeof GENDER_BASE] || 30;

    // Apply age adjustment
    let ageMultiplier = 1.0;
    if (data.age < 18) ageMultiplier = AGE_MULTIPLIERS.teenager;
    else if (data.age < 13) ageMultiplier = AGE_MULTIPLIERS.child;
    else if (data.age >= 65) ageMultiplier = AGE_MULTIPLIERS.elderly;
    else ageMultiplier = AGE_MULTIPLIERS.adult;

    // Calculate base water intake
    let baseWater = weightKg * basePerKg * ageMultiplier;

    // Apply activity multiplier
    baseWater *= ACTIVITY_MULTIPLIERS[data.activityLevel as keyof typeof ACTIVITY_MULTIPLIERS] || 1.0;

    // Apply climate multiplier
    baseWater *= CLIMATE_MULTIPLIERS[data.climate as keyof typeof CLIMATE_MULTIPLIERS] || 1.0;

    // Apply health condition multiplier
    baseWater *= HEALTH_MULTIPLIERS[data.healthCondition as keyof typeof HEALTH_MULTIPLIERS] || 1.0;

    // Convert to different units
    const waterLiters = baseWater / 1000;
    const waterOunces = baseWater * 0.033814;
    const waterCups = baseWater / 236.588; // 1 cup = 236.588 ml

    // Generate hydration schedule recommendation
    let hydrationSchedule = "";
    if (data.activityLevel === 'extremely_active' || data.activityLevel === 'very_active') {
      hydrationSchedule = "Drink before, during, and after exercise. Sip throughout the day.";
    } else if (data.healthCondition === 'pregnancy' || data.healthCondition === 'breastfeeding') {
      hydrationSchedule = "Small sips throughout the day. Increase during hot weather.";
    } else if (data.climate === 'hot_dry') {
      hydrationSchedule = "Drink 8-10 glasses throughout the day. More in direct sun.";
    } else {
      hydrationSchedule = "Drink 8 glasses throughout the day. Sip rather than gulp.";
    }

    // Translate hydration schedule
    if (lang === 'es') {
      if (data.activityLevel === 'extremely_active' || data.activityLevel === 'very_active') {
        hydrationSchedule = "Bebe antes, durante y después del ejercicio. Sorbe a lo largo del día.";
      } else if (data.healthCondition === 'pregnancy' || data.healthCondition === 'breastfeeding') {
        hydrationSchedule = "Sorbitos pequeños a lo largo del día. Aumenta en clima caliente.";
      } else if (data.climate === 'hot_dry') {
        hydrationSchedule = "Bebe 8-10 vasos a lo largo del día. Más al sol directo.";
      } else {
        hydrationSchedule = "Bebe 8 vasos a lo largo del día. Sorbe en lugar de tragar.";
      }
    } else if (lang === 'pt') {
      if (data.activityLevel === 'extremely_active' || data.activityLevel === 'very_active') {
        hydrationSchedule = "Beba antes, durante e após exercício. Sorva ao longo do dia.";
      } else if (data.healthCondition === 'pregnancy' || data.healthCondition === 'breastfeeding') {
        hydrationSchedule = "Pequenos goles ao longo do dia. Aumente em clima quente.";
      } else if (data.climate === 'hot_dry') {
        hydrationSchedule = "Beba 8-10 copos ao longo do dia. Mais ao sol direto.";
      } else {
        hydrationSchedule = "Beba 8 copos ao longo do dia. Sorva em vez de engolir.";
      }
    } else if (lang === 'fr') {
      if (data.activityLevel === 'extremely_active' || data.activityLevel === 'very_active') {
        hydrationSchedule = "Buvez avant, pendant et après l'exercice. Sirotez tout au long de la journée.";
      } else if (data.healthCondition === 'pregnancy' || data.healthCondition === 'breastfeeding') {
        hydrationSchedule = "Petites gorgées tout au long de la journée. Augmentez par temps chaud.";
      } else if (data.climate === 'hot_dry') {
        hydrationSchedule = "Buvez 8-10 verres tout au long de la journée. Plus au soleil direct.";
      } else {
        hydrationSchedule = "Buvez 8 verres tout au long de la journée. Sirotez plutôt qu'avalez.";
      }
    }

    return {
      dailyWaterIntake: Math.round(baseWater),
      waterLiters: Math.round(waterLiters * 10) / 10,
      waterOunces: Math.round(waterOunces),
      waterCups: Math.round(waterCups * 10) / 10,
      hydrationSchedule
    };
  };

  const results = useMemo((): WaterResults => {
    return calculateWaterIntake(formData);
  }, [formData]);

  const handleInputChange = (field: keyof WaterData, value: string | number) => {
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
                  max="300"
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
                  min="1"
                  max="120"
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

            {/* Climate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.climate}
              </label>
              <select
                value={formData.climate}
                onChange={(e) => handleInputChange('climate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.climateOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Health Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.healthCondition}
              </label>
              <select
                value={formData.healthCondition}
                onChange={(e) => handleInputChange('healthCondition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.healthConditionOptions).map(([value, label]) => (
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
            {/* Daily Water Intake */}
            <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.dailyWaterIntake}
              </span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatNumber(results.dailyWaterIntake)} {t.ml}
              </span>
            </div>

            {/* Water in Different Units */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.waterLiters}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatNumber(results.waterLiters, 1)} {t.liters}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.waterOunces}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatNumber(results.waterOunces)} {t.ounces}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.waterCups}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatNumber(results.waterCups, 1)} {t.cups}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{t.hydrationSchedule}</span>
                <span className="font-medium text-green-600 dark:text-green-400 text-sm text-right max-w-xs">
                  {results.hydrationSchedule}
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
            💧 Hydration Tips
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Monitor urine color (pale yellow is ideal)</li>
            <li>• Drink before you feel thirsty</li>
            <li>• Sip throughout the day rather than gulping</li>
            <li>• Increase intake during hot weather or exercise</li>
            <li>• Include water-rich foods in your diet</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            🚰 Water-Rich Foods
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• Cucumber: ~96% water</li>
            <li>• Watermelon: ~92% water</li>
            <li>• Lettuce: ~95% water</li>
            <li>• Celery: ~95% water</li>
            <li>• Tomatoes: ~94% water</li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          {t.noteDisclaimer}
          Individual needs may vary based on sweat rate, medications, caffeine/alcohol intake, and specific health conditions.
          Consult a healthcare provider for specific medical conditions or extreme circumstances.
        </p>
      </div>
    </div>
  );
}
