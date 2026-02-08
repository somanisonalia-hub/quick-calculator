'use client';

import React, { useState, useMemo } from 'react';
import CalculatorPageClient from '@/components/CalculatorPageClient';

interface LeanBodyMassCalculatorProps {
  lang: string;
}

interface BodyCompositionData {
  weight: number;
  weightUnit: string;
  height: number;
  heightUnit: string;
  gender: string;
  age: number;
  method: string;
  waist: number;
  waistUnit: string;
  hip: number;
  hipUnit: string;
}

interface BodyCompositionResults {
  leanBodyMass: number;
  bodyFatPercentage: number;
  fatMass: number;
  bodyFatCategory: string;
  bmi: number;
}

// Body fat percentage categories - labels will be translated dynamically
const BODY_FAT_CATEGORIES = {
  male: {
    essential: { min: 0, max: 5, labelKey: 'essentialfat' },
    athletic: { min: 6, max: 13, labelKey: 'athletic' },
    fit: { min: 14, max: 17, labelKey: 'fit' },
    average: { min: 18, max: 24, labelKey: 'average' },
    obese: { min: 25, max: 100, labelKey: 'obese' }
  },
  female: {
    essential: { min: 0, max: 10, labelKey: 'essentialfat' },
    athletic: { min: 11, max: 20, labelKey: 'athletic' },
    fit: { min: 21, max: 24, labelKey: 'fit' },
    average: { min: 25, max: 31, labelKey: 'average' },
    obese: { min: 32, max: 100, labelKey: 'obese' }
  }
};

export default function LeanBodyMassCalculator({ lang }: LeanBodyMassCalculatorProps) {
  const [formData, setFormData] = useState<BodyCompositionData>({
    weight: 70,
    weightUnit: 'kg',
    height: 170,
    heightUnit: 'cm',
    gender: 'male',
    age: 30,
    method: 'navy',
    waist: 80,
    waistUnit: 'cm',
    hip: 95,
    hipUnit: 'cm'
  });

  const translations = {
    en: {
      title: "Lean Body Mass Calculator",
      subtitle: "Calculate your lean body mass, body fat percentage, and body composition using multiple scientific methods",
      weight: "Body Weight",
      height: "Height",
      gender: "Gender",
      age: "Age",
      method: "Calculation Method",
      waist: "Waist Circumference",
      hip: "Hip Circumference",
      calculate: "🔄 Recalculate",
      results: "Body Composition Results",
      leanBodyMass: "Lean Body Mass",
      bodyFatPercentage: "Body Fat Percentage",
      fatMass: "Fat Mass",
      bodyFatCategory: "Body Fat Category",
      bmi: "BMI",
      methodOptions: {
        bmi: "BMI Method (Basic)",
        navy: "Navy Method (Most Accurate)",
        boer: "Boer Formula (Lean Mass Focus)",
      reset: "Reset"
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
      measurementUnitOptions: {
        cm: "Centimeters (cm)",
        inches: "Inches (in)"
      },
      kg: "kg",
      percent: "%",
      measurewaistatnarrowestpoint: "Measure waist at narrowest point",
      measurehipsatwidestpoint: "Measure hips at widest point",
      takemeasurementsinmorningbeforeeating: "Take measurements in morning before eating",
      useflexibletapemeasure: "Use flexible tape measure",
      standstraightwithrelaxedmuscles: "Stand straight with relaxed muscles",
      men1020bodyfatathletic: "Men: 10-20% body fat (athletic)",
      women1828bodyfatathletic: "Women: 18-28% body fat (athletic)",
      essentialfat25men1013women: "Essential fat: 2-5% (men), 10-13% (women)",
      focusonsustainablechanges: "Focus on sustainable changes",
      combinedietexerciseandrecovery: "Combine diet, exercise, and recovery",
      measurementtips: "📏 Measurement Tips",
      healthyranges: "🎯 Healthy Ranges",
      note: "Note:",
      disclaimertext1: "These calculations provide estimates based on established formulas.",
      disclaimertext2: "For highest accuracy, consult professional body composition testing methods like DEXA scans or hydrostatic weighing.",
      disclaimertext3: "Individual results may vary based on body composition, measurement accuracy, and specific population characteristics.",
      navymethodmeasurements: "Navy Method Measurements"
    },
    es: {
      title: "Calculadora de Masa Corporal Magra",
      subtitle: "Calcula tu masa corporal magra, porcentaje de grasa corporal y composición corporal usando múltiples métodos científicos",
      weight: "Peso Corporal",
      height: "Altura",
      gender: "Género",
      age: "Edad",
      method: "Método de Cálculo",
      waist: "Circunferencia de Cintura",
      hip: "Circunferencia de Cadera",
      calculate: "🔄 Recalcular",
      results: "Resultados de Composición Corporal",
      leanBodyMass: "Masa Corporal Magra",
      bodyFatPercentage: "Porcentaje de Grasa Corporal",
      fatMass: "Masa de Grasa",
      bodyFatCategory: "Categoría de Grasa Corporal",
      bmi: "IMC",
      methodOptions: {
        bmi: "Método IMC (Básico)",
        navy: "Método Navy (Más Preciso)",
        boer: "Fórmula Boer (Enfoque Masa Magra)",
      reset: "Restablecer"
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
      measurementUnitOptions: {
        cm: "Centímetros (cm)",
        inches: "Pulgadas (in)"
      },
      kg: "kg",
      percent: "%",
      measurewaistatnarrowestpoint: "Mide la cintura en el punto más estrecho",
      measurehipsatwidestpoint: "Mide las caderas en el punto más ancho",
      takemeasurementsinmorningbeforeeating: "Toma las medidas por la mañana antes de comer",
      useflexibletapemeasure: "Usa una cinta métrica flexible",
      standstraightwithrelaxedmuscles: "Ponte de pie derecho con músculos relajados",
      men1020bodyfatathletic: "Hombres: 10-20% grasa corporal (atlético)",
      women1828bodyfatathletic: "Mujeres: 18-28% grasa corporal (atlético)",
      essentialfat25men1013women: "Grasa esencial: 2-5% (hombres), 10-13% (mujeres)",
      focusonsustainablechanges: "Enfócate en cambios sostenibles",
      combinedietexerciseandrecovery: "Combina dieta, ejercicio y recuperación",
      measurementtips: "📏 Consejos de Medición",
      healthyranges: "🎯 Rangos Saludables",
      note: "Nota:",
      disclaimertext1: "Estos cálculos proporcionan estimaciones basadas en fórmulas establecidas.",
      disclaimertext2: "Para mayor precisión, consulta métodos profesionales de composición corporal como escáneres DEXA o pesaje hidrostático.",
      disclaimertext3: "Los resultados individuales pueden variar según la composición corporal, la precisión de las mediciones y las características específicas de la población.",
      navymethodmeasurements: "Mediciones del Método Navy"
    },
    pt: {
      title: "Calculadora de Massa Corporal Magra",
      subtitle: "Calcule sua massa corporal magra, porcentagem de gordura corporal e composição corporal usando múltiplos métodos científicos",
      weight: "Peso Corporal",
      height: "Altura",
      gender: "Gênero",
      age: "Idade",
      method: "Método de Cálculo",
      waist: "Circunferência da Cintura",
      hip: "Circunferência do Quadril",
      calculate: "🔄 Recalcular",
      results: "Resultados de Composição Corporal",
      leanBodyMass: "Massa Corporal Magra",
      bodyFatPercentage: "Porcentagem de Gordura Corporal",
      fatMass: "Massa de Gordura",
      bodyFatCategory: "Categoria de Gordura Corporal",
      bmi: "IMC",
      methodOptions: {
        bmi: "Método IMC (Básico)",
        navy: "Método Navy (Mais Preciso)",
        boer: "Fórmula Boer (Foco Massa Magra)",
      reset: "Redefinir"
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
      measurementUnitOptions: {
        cm: "Centímetros (cm)",
        inches: "Polegadas (in)"
      },
      kg: "kg",
      percent: "%",
      measurewaistatnarrowestpoint: "Meça a cintura no ponto mais estreito",
      measurehipsatwidestpoint: "Meça os quadris no ponto mais largo",
      takemeasurementsinmorningbeforeeating: "Tire as medidas pela manhã antes de comer",
      useflexibletapemeasure: "Use fita métrica flexível",
      standstraightwithrelaxedmuscles: "Fique em pé reto com músculos relaxados",
      men1020bodyfatathletic: "Homens: 10-20% gordura corporal (atlético)",
      women1828bodyfatathletic: "Mulheres: 18-28% gordura corporal (atlético)",
      essentialfat25men1013women: "Gordura essencial: 2-5% (homens), 10-13% (mulheres)",
      focusonsustainablechanges: "Concentre-se em mudanças sustentáveis",
      combinedietexerciseandrecovery: "Combine dieta, exercício e recuperação",
      measurementtips: "📏 Dicas de Medição",
      healthyranges: "🎯 Faixas Saudáveis",
      note: "Nota:",
      disclaimertext1: "Estes cálculos fornecem estimativas baseadas em fórmulas estabelecidas.",
      disclaimertext2: "Para maior precisão, consulte métodos profissionais de composição corporal como exames DEXA ou pesagem hidrostática.",
      disclaimertext3: "Os resultados individuais podem variar com base na composição corporal, precisão das medições e características específicas da população.",
      navymethodmeasurements: "Medidas do Método Navy"
    },
    fr: {
      title: "Calculateur de Masse Corporelle Maigre",
      subtitle: "Calculez votre masse corporelle maigre, pourcentage de graisse corporelle et composition corporelle en utilisant multiples méthodes scientifiques",
      weight: "Poids Corporel",
      height: "Taille",
      gender: "Genre",
      age: "Âge",
      method: "Méthode de Calcul",
      waist: "Tour de Taille",
      hip: "Tour de Hanches",
      calculate: "🔄 Recalculer",
      results: "Résultats de Composition Corporelle",
      leanBodyMass: "Masse Corporelle Maigre",
      bodyFatPercentage: "Pourcentage de Graisse Corporelle",
      fatMass: "Masse de Graisse",
      bodyFatCategory: "Catégorie de Graisse Corporelle",
      bmi: "IMC",
      methodOptions: {
        bmi: "Méthode IMC (Basique)",
        navy: "Méthode Navy (Plus Précise)",
        boer: "Formule Boer (Focus Masse Maigre)",
      reset: "Réinitialiser"
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
      measurementUnitOptions: {
        cm: "Centimètres (cm)",
        inches: "Pouces (in)"
      },
      kg: "kg",
      percent: "%",
      measurewaistatnarrowestpoint: "Mesurez la taille au point le plus étroit",
      measurehipsatwidestpoint: "Mesurez les hanches au point le plus large",
      takemeasurementsinmorningbeforeeating: "Prenez les mesures le matin avant de manger",
      useflexibletapemeasure: "Utilisez un mètre ruban flexible",
      standstraightwithrelaxedmuscles: "Tenez-vous droit avec les muscles détendus",
      men1020bodyfatathletic: "Hommes: 10-20% masse grasse (athlétique)",
      women1828bodyfatathletic: "Femmes: 18-28% masse grasse (athlétique)",
      essentialfat25men1013women: "Graisse essentielle: 2-5% (hommes), 10-13% (femmes)",
      focusonsustainablechanges: "Concentrez-vous sur des changements durables",
      combinedietexerciseandrecovery: "Combinez alimentation, exercice et récupération",
      measurementtips: "📏 Conseils de Mesure",
      healthyranges: "🎯 Fourchettes Saines",
      note: "Note:",
      disclaimertext1: "Ces calculs fournissent des estimations basées sur des formules établies.",
      disclaimertext2: "Pour une précision maximale, consultez des méthodes professionnelles d'analyse de la composition corporelle comme les scanners DEXA ou la pesée hydrostatique.",
      disclaimertext3: "Les résultats individuels peuvent varier en fonction de la composition corporelle, de la précision des mesures et des caractéristiques spécifiques de la population.",
      navymethodmeasurements: "Mesures de la Méthode Navy"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateBodyComposition = (data: BodyCompositionData): BodyCompositionResults => {
    // Convert units to metric for calculations
    let weightKg = data.weight;
    if (data.weightUnit === 'lbs') {
      weightKg = data.weight / 2.20462;
    }

    let heightCm = data.height;
    if (data.heightUnit === 'inches') {
      heightCm = data.height * 2.54;
    }

    let waistCm = data.waist;
    if (data.waistUnit === 'inches') {
      waistCm = data.waist * 2.54;
    }

    let hipCm = data.hip;
    if (data.hipUnit === 'inches') {
      hipCm = data.hip * 2.54;
    }

    // Calculate BMI
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    let bodyFatPercentage = 0;
    let leanBodyMass = 0;

    // Calculate body fat percentage based on method
    if (data.method === 'bmi') {
      // BMI-based estimation (Deurenberg et al.)
      if (data.gender === 'male') {
        bodyFatPercentage = (1.20 * bmi) + (0.23 * data.age) - 16.2;
      } else {
        bodyFatPercentage = (1.20 * bmi) + (0.23 * data.age) - 5.4;
      }
    } else if (data.method === 'navy') {
      // Navy method (DoD body fat formula)
      const heightIn = heightCm / 2.54;
      const waistIn = waistCm / 2.54;

      if (data.gender === 'male') {
        const density = 1.0324 - 0.19077 * Math.log10(waistIn - 0) + 0.15456 * Math.log10(heightIn);
        bodyFatPercentage = ((4.95 / density) - 4.5) * 100;
      } else {
        const density = 1.29579 - 0.35004 * Math.log10(waistIn + hipCm / 2.54) + 0.22100 * Math.log10(heightIn);
        bodyFatPercentage = ((4.95 / density) - 4.5) * 100;
      }
    } else if (data.method === 'boer') {
      // Boer formula (direct lean mass estimation)
      if (data.gender === 'male') {
        leanBodyMass = 0.407 * weightKg + 0.267 * heightCm - 19.2;
      } else {
        leanBodyMass = 0.252 * weightKg + 0.473 * heightCm - 48.3;
      }
      bodyFatPercentage = ((weightKg - leanBodyMass) / weightKg) * 100;
    }

    // Ensure body fat percentage is within reasonable bounds
    bodyFatPercentage = Math.max(3, Math.min(50, bodyFatPercentage));

    // Calculate lean body mass if not already calculated
    if (leanBodyMass === 0) {
      leanBodyMass = weightKg * (1 - bodyFatPercentage / 100);
    }

    const fatMass = weightKg - leanBodyMass;

    // Determine body fat category
    const categories = BODY_FAT_CATEGORIES[data.gender as keyof typeof BODY_FAT_CATEGORIES];
    let category = 'unknown';
    for (const [key, range] of Object.entries(categories)) {
      if (bodyFatPercentage >= range.min && bodyFatPercentage <= range.max) {
        category = range.labelKey;
        break;
      }
    }

    // Translate category using translation object
    category = (t as any)[category] || category;

    return {
      leanBodyMass: Math.round(leanBodyMass * 10) / 10,
      bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
      bodyFatCategory: category,
      bmi: Math.round(bmi * 10) / 10
    };

  const resetCalculator = () => {
    // Reset all input values to defaults
    const initial: Record<string, number> = {};
    inputs?.forEach(input => {
      initial[input.name] = input.default || 0;
    });
    setValues(initial);
    setResults({});
  };
  };

  const results = useMemo((): BodyCompositionResults => {
    return calculateBodyComposition(formData);
  }, [formData]);

  const handleInputChange = (field: keyof BodyCompositionData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatNumber = (num: number, decimals: number = 1): string => {
    return num.toFixed(decimals);
  };

  const showNavyInputs = formData.method === 'navy';

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

            {/* Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.method}
              </label>
              <select
                value={formData.method}
                onChange={(e) => handleInputChange('method', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.methodOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Conditional Navy Method Inputs */}
            {showNavyInputs && (
              <div className="space-y-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium text-blue-900 dark:text-blue-100">
                  {t.navymethodmeasurements}
                </h3>

                {/* Waist */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.waist}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={formData.waist}
                      onChange={(e) => handleInputChange('waist', parseFloat(e.target.value) || 0)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      min="50"
                      max="200"
                      step="0.1"
                    />
                    <select
                      value={formData.waistUnit}
                      onChange={(e) => handleInputChange('waistUnit', e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {Object.entries(t.measurementUnitOptions).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Hip */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.hip}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={formData.hip}
                      onChange={(e) => handleInputChange('hip', parseFloat(e.target.value) || 0)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      min="60"
                      max="200"
                      step="0.1"
                    />
                    <select
                      value={formData.hipUnit}
                      onChange={(e) => handleInputChange('hipUnit', e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {Object.entries(t.measurementUnitOptions).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateBodyComposition}
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



        {/* Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.results}
          </h2>

          <div className="space-y-4">
            {/* Lean Body Mass */}
            <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.leanBodyMass}
              </span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatNumber(results.leanBodyMass)} {t.kg}
              </span>
            </div>

            {/* Body Fat Percentage */}
            <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.bodyFatPercentage}
              </span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatNumber(results.bodyFatPercentage)} {t.percent}
              </span>
            </div>

            {/* Other Results */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.fatMass}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatNumber(results.fatMass)} {t.kg}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t.bodyFatCategory}</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  {results.bodyFatCategory}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{t.bmi}</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatNumber(results.bmi)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            {t.measurementtips}
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• {t.measurewaistatnarrowestpoint}</li>
            <li>• {t.measurehipsatwidestpoint}</li>
            <li>• {t.takemeasurementsinmorningbeforeeating}</li>
            <li>• {t.useflexibletapemeasure}</li>
            <li>• {t.standstraightwithrelaxedmuscles}</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            {t.healthyranges}
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• {t.men1020bodyfatathletic}</li>
            <li>• {t.women1828bodyfatathletic}</li>
            <li>• {t.essentialfat25men1013women}</li>
            <li>• {t.focusonsustainablechanges}</li>
            <li>• {t.combinedietexerciseandrecovery}</li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>{t.note}</strong> {t.disclaimertext1}
          {t.disclaimertext2}
          {t.disclaimertext3}
        </p>
      </div>
    </div>
  );
}
