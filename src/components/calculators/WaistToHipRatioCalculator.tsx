'use client';

import React, { useState, useMemo } from 'react';
import CalculatorPageClient from '@/components/CalculatorPageClient';

interface WaistToHipRatioCalculatorProps {
  lang: string;
}

interface WHRData {
  waist: number;
  hip: number;
  measurementUnit: string;
  gender: string;
}

interface WHRResults {
  waistToHipRatio: number;
  healthRisk: string;
  bodyShape: string;
  riskLevel: string;
}

// WHO Health Risk Categories for Waist-to-Hip Ratio
const HEALTH_RISK_CATEGORIES = {
  female: {
    low: { max: 0.79, label: 'Low Risk' },
    moderate: { min: 0.80, max: 0.84, label: 'Moderate Risk' },
    high: { min: 0.85, label: 'High Risk' }
  },
  male: {
    low: { max: 0.89, label: 'Low Risk' },
    moderate: { min: 0.90, max: 0.99, label: 'Moderate Risk' },
    high: { min: 1.00, label: 'High Risk' }
  }
};

export default function WaistToHipRatioCalculator({ lang }: WaistToHipRatioCalculatorProps) {
  const [formData, setFormData] = useState<WHRData>({
    waist: 80,
    hip: 95,
    measurementUnit: 'cm',
    gender: 'male'
  });

  const translations = {
    en: {
      title: "Waist-to-Hip Ratio Calculator",
      subtitle: "Calculate your waist-to-hip ratio and assess health risks associated with body fat distribution",
      waist: "Waist Circumference",
      hip: "Hip Circumference",
      measurementUnit: "Measurement Unit",
      gender: "Gender",
      calculate: "🔄 Recalculate",
      results: "Waist-to-Hip Ratio Results",
      waistToHipRatio: "Waist-to-Hip Ratio",
      healthRisk: "Health Risk Category",
      bodyShape: "Body Shape",
      riskLevel: "Risk Level",
      genderOptions: {
        male: "Male",
        female: "Female",
      reset: "Reset"
      },
      measurementUnitOptions: {
        cm: "Centimeters (cm)",
        inches: "Inches (in)"
      },
      bodyShapeOptions: {
        apple: "Apple Shape (Abdominal Fat)",
        pear: "Pear Shape (Hip Fat)",
        hourglass: "Hourglass (Balanced)",
        rectangle: "Rectangle (Neutral)"
      },
      riskLevelOptions: {
        low: "Low",
        moderate: "Moderate",
        high: "High"
      },
      waistMeasurement: "Waist: Measure at narrowest point",
      hipsMeasurement: "Hips: Measure at widest point",
      womenRisk: "Women: Low <0.80, Moderate 0.80-0.84, High ≥0.85",
      menRisk: "Men: Low <0.90, Moderate 0.90-0.99, High ≥1.00",
      noteWHR: "Note: WHR is a valuable health indicator that measures body fat distribution. Values in the high-risk range are associated with increased risk of cardiovascular disease and other health conditions."
    },
    es: {
      title: "Calculadora de Relación Cintura-Cadera",
      subtitle: "Calcula tu relación cintura-cadera y evalúa riesgos de salud asociados con distribución de grasa corporal",
      waist: "Circunferencia de Cintura",
      hip: "Circunferencia de Cadera",
      measurementUnit: "Unidad de Medición",
      gender: "Género",
      calculate: "🔄 Recalcular",
      results: "Resultados de Relación Cintura-Cadera",
      waistToHipRatio: "Relación Cintura-Cadera",
      healthRisk: "Categoría de Riesgo de Salud",
      bodyShape: "Forma Corporal",
      riskLevel: "Nivel de Riesgo",
      genderOptions: {
        male: "Masculino",
        female: "Femenino",
      reset: "Restablecer"
      },
      measurementUnitOptions: {
        cm: "Centímetros (cm)",
        inches: "Pulgadas (in)"
      },
      bodyShapeOptions: {
        apple: "Forma Manzana (Grasa Abdominal)",
        pear: "Forma Pera (Grasa de Cadera)",
        hourglass: "Reloj de Arena (Balanceada)",
        rectangle: "Rectángulo (Neutral)"
      },
      riskLevelOptions: {
        low: "Bajo",
        moderate: "Moderado",
        high: "Alto"
      },
      waistMeasurement: "Cintura: Medir en el punto más estrecho",
      hipsMeasurement: "Caderas: Medir en el punto más ancho",
      womenRisk: "Mujeres: Bajo <0.80, Moderado 0.80-0.84, Alto ≥0.85",
      menRisk: "Hombres: Bajo <0.90, Moderado 0.90-0.99, Alto ≥1.00",
      noteWHR: "Nota: La RCC es un valioso indicador de salud que mide la distribución de grasa corporal. Los valores en el rango de alto riesgo están asociados con un mayor riesgo de enfermedad cardiovascular y otras condiciones de salud."
    },
    pt: {
      title: "Calculadora de Relação Cintura-Quadril",
      subtitle: "Calcule sua relação cintura-quadril e avalie riscos de saúde associados com distribuição de gordura corporal",
      waist: "Circunferência da Cintura",
      hip: "Circunferência do Quadril",
      measurementUnit: "Unidade de Medição",
      gender: "Gênero",
      calculate: "🔄 Recalcular",
      results: "Resultados de Relação Cintura-Quadril",
      waistToHipRatio: "Relação Cintura-Quadril",
      healthRisk: "Categoria de Risco de Saúde",
      bodyShape: "Forma Corporal",
      riskLevel: "Nível de Risco",
      genderOptions: {
        male: "Masculino",
        female: "Feminino",
      reset: "Redefinir"
      },
      measurementUnitOptions: {
        cm: "Centímetros (cm)",
        inches: "Polegadas (in)"
      },
      bodyShapeOptions: {
        apple: "Forma Maçã (Gordura Abdominal)",
        pear: "Forma Pera (Gordura de Quadril)",
        hourglass: "Ampulheta (Balanceada)",
        rectangle: "Retângulo (Neutro)"
      },
      riskLevelOptions: {
        low: "Baixo",
        moderate: "Moderado",
        high: "Alto"
      },
      waistMeasurement: "Cintura: Medir no ponto mais estreito",
      hipsMeasurement: "Quadris: Medir no ponto mais largo",
      womenRisk: "Mulheres: Baixo <0.80, Moderado 0.80-0.84, Alto ≥0.85",
      menRisk: "Homens: Baixo <0.90, Moderado 0.90-0.99, Alto ≥1.00",
      noteWHR: "Nota: A RCQ é um valioso indicador de saúde que mede a distribuição de gordura corporal. Valores na faixa de alto risco estão associados com maior risco de doença cardiovascular e outras condições de saúde."
    },
    fr: {
      title: "Calculateur de Rapport Taille-Hanches",
      subtitle: "Calculez votre rapport taille-hanches et évaluez les risques de santé associés avec distribution de graisse corporelle",
      waist: "Circonférence de Taille",
      hip: "Circonférence de Hanches",
      measurementUnit: "Unité de Mesure",
      gender: "Genre",
      calculate: "🔄 Recalculer",
      results: "Résultats de Rapport Taille-Hanches",
      waistToHipRatio: "Rapport Taille-Hanches",
      healthRisk: "Catégorie de Risque de Santé",
      bodyShape: "Forme Corporelle",
      riskLevel: "Niveau de Risque",
      genderOptions: {
        male: "Masculin",
        female: "Féminin",
      reset: "Réinitialiser"
      },
      measurementUnitOptions: {
        cm: "Centimètres (cm)",
        inches: "Pouces (in)"
      },
      bodyShapeOptions: {
        apple: "Forme Pomme (Graisse Abdominale)",
        pear: "Forme Poire (Graisse Hanches)",
        hourglass: "Sablier (Équilibré)",
        rectangle: "Rectangle (Neutre)"
      },
      riskLevelOptions: {
        low: "Faible",
        moderate: "Modéré",
        high: "Élevé"
      },
      waistMeasurement: "Taille: Mesurer au point le plus étroit",
      hipsMeasurement: "Hanches: Mesurer au point le plus large",
      womenRisk: "Femmes: Faible <0.80, Modéré 0.80-0.84, Élevé ≥0.85",
      menRisk: "Hommes: Faible <0.90, Modéré 0.90-0.99, Élevé ≥1.00",
      noteWHR: "Remarque: Le RTH est un indicateur de santé précieux qui mesure la distribution de la graisse corporelle. Les valeurs dans la plage à haut risque sont associées à un risque accru de maladie cardiovasculaire et d'autres problèmes de santé."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateWHR = (data: WHRData): WHRResults => {
    // Convert to consistent units if needed (keeping in original units for display)
    let waistValue = data.waist;
    let hipValue = data.hip;

    // Calculate WHR
    const whr = waistValue / hipValue;

    // Determine health risk category based on WHO guidelines
    const categories = HEALTH_RISK_CATEGORIES[data.gender as keyof typeof HEALTH_RISK_CATEGORIES];
    let healthRisk = "";
    let riskLevel = "";

    if (whr <= categories.low.max) {
      healthRisk = categories.low.label;
      riskLevel = "Low";
    } else if (data.gender === 'female' && whr >= categories.moderate.min && whr <= categories.moderate.max) {
      healthRisk = categories.moderate.label;
      riskLevel = "Moderate";
    } else if (data.gender === 'male' && whr >= categories.moderate.min && whr <= categories.moderate.max) {
      healthRisk = categories.moderate.label;
      riskLevel = "Moderate";
    } else {
      healthRisk = categories.high.label;
      riskLevel = "High";
    }

    // Determine body shape
    let bodyShape = "";
    if (data.gender === 'female') {
      if (whr >= 0.85) {
        bodyShape = "Apple Shape";
      } else if (whr >= 0.80 && whr < 0.85) {
        bodyShape = "Hourglass";
      } else {
        bodyShape = "Pear Shape";
      }
    } else {
      if (whr >= 1.0) {
        bodyShape = "Apple Shape";
      } else if (whr >= 0.90 && whr < 1.0) {
        bodyShape = "Rectangle";
      } else {
        bodyShape = "Pear Shape";
      }
    }

    // Translate results
    if (lang === 'es') {
      healthRisk = healthRisk === 'Low Risk' ? 'Riesgo Bajo' :
                   healthRisk === 'Moderate Risk' ? 'Riesgo Moderado' : 'Riesgo Alto';
      riskLevel = riskLevel === 'Low' ? 'Bajo' :
                  riskLevel === 'Moderate' ? 'Moderado' : 'Alto';
      bodyShape = bodyShape === 'Apple Shape' ? 'Forma Manzana' :
                  bodyShape === 'Pear Shape' ? 'Forma Pera' :
                  bodyShape === 'Hourglass' ? 'Reloj de Arena' : 'Rectángulo';
    } else if (lang === 'pt') {
      healthRisk = healthRisk === 'Low Risk' ? 'Risco Baixo' :
                   healthRisk === 'Moderate Risk' ? 'Risco Moderado' : 'Risco Alto';
      riskLevel = riskLevel === 'Low' ? 'Baixo' :
                  riskLevel === 'Moderate' ? 'Moderado' : 'Alto';
      bodyShape = bodyShape === 'Apple Shape' ? 'Forma Maçã' :
                  bodyShape === 'Pear Shape' ? 'Forma Pera' :
                  bodyShape === 'Hourglass' ? 'Ampulheta' : 'Retângulo';
    } else if (lang === 'fr') {
      healthRisk = healthRisk === 'Low Risk' ? 'Risque Faible' :
                   healthRisk === 'Moderate Risk' ? 'Risque Modéré' : 'Risque Élevé';
      riskLevel = riskLevel === 'Low' ? 'Faible' :
                  riskLevel === 'Moderate' ? 'Modéré' : 'Élevé';
      bodyShape = bodyShape === 'Apple Shape' ? 'Forme Pomme' :
                  bodyShape === 'Pear Shape' ? 'Forme Poire' :
                  bodyShape === 'Hourglass' ? 'Sablier' : 'Rectangle';
    }

    return {
      waistToHipRatio: Math.round(whr * 100) / 100,
      healthRisk,
      bodyShape,
      riskLevel
    };
  };

  const resetCalculator = () => {
    setFormData({
      waist: 80,
      hip: 95,
      measurementUnit: 'cm',
      gender: 'male'
    });
  };

  const results = useMemo((): WHRResults => {
    return calculateWHR(formData);
  }, [formData]);

  const handleInputChange = (field: keyof WHRData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatNumber = (num: number, decimals: number = 2): string => {
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
            {/* Waist and Hip Measurements */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.waist}
                </label>
                <input
                  type="number"
                  value={formData.waist}
                  onChange={(e) => handleInputChange('waist', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  min="50"
                  max="200"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.hip}
                </label>
                <input
                  type="number"
                  value={formData.hip}
                  onChange={(e) => handleInputChange('hip', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  min="60"
                  max="200"
                  step="0.1"
                />
              </div>
            </div>

            {/* Measurement Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.measurementUnit}
              </label>
              <select
                value={formData.measurementUnit}
                onChange={(e) => handleInputChange('measurementUnit', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {Object.entries(t.measurementUnitOptions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Gender */}
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
            
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateWHR}
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

        {/* Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {t.results}
          </h2>

          <div className="space-y-4">
            {/* Waist-to-Hip Ratio */}
            <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.waistToHipRatio}
              </span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatNumber(results.waistToHipRatio)}
              </span>
            </div>

            {/* Health Risk */}
            <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.healthRisk}
              </span>
              <span className={`text-lg font-bold ${
                results.riskLevel === 'Low' || results.riskLevel === 'Bajo' || results.riskLevel === 'Baixo' || results.riskLevel === 'Faible'
                  ? 'text-green-600 dark:text-green-400'
                  : results.riskLevel === 'Moderate' || results.riskLevel === 'Moderado' || results.riskLevel === 'Modéré'
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {results.healthRisk}
              </span>
            </div>

            {/* Body Shape */}
            <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {t.bodyShape}
              </span>
              <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {results.bodyShape}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📏 How to Measure
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• {t.waistMeasurement}</li>
            <li>• {t.hipsMeasurement}</li>
            <li>• Use flexible tape measure</li>
            <li>• Measure on bare skin</li>
            <li>• Stand straight and relaxed</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            🎯 Health Risk Ranges
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• {t.womenRisk}</li>
            <li>• {t.menRisk}</li>
            <li>• Apple shape = Higher risk</li>
            <li>• Pear shape = Lower risk</li>
            <li>• Based on WHO guidelines</li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          {t.noteWHR}</p>
      </div>
    </div>
  );
}
