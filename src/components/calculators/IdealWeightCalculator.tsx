'use client';

import { useState, useEffect } from 'react';

interface IdealWeightCalculatorProps {
  lang?: string;
}

export default function IdealWeightCalculator({ lang = 'en' }: IdealWeightCalculatorProps) {
  const [inputs, setInputs] = useState({
    gender: 'male',
    height: 170,
    method: 'healthy_bmi',
    bodyFrame: 'medium'
  });

  const [results, setResults] = useState({
    idealWeightRange: '',
    minWeight: 0,
    maxWeight: 0,
    bmiCategory: ''
  });

  const translations = {
    en: {
      title: "Ideal Weight Calculator",
      gender: "Gender",
      height: "Height",
      method: "Calculation Method",
      bodyFrame: "Body Frame Size",
      calculate: "Calculate Ideal Weight",
      idealRange: "Ideal Weight Range",
      minWeight: "Minimum Healthy Weight",
      maxWeight: "Maximum Healthy Weight",
      bmiCategory: "BMI Category",
      kg: "kg",
      male: "Male",
      female: "Female",
      healthy_bmi: "Healthy BMI (18.5-24.9)",
      devine: "Devine Formula",
      hamwi: "Hamwi Method",
      miller: "Miller Formula",
      robinson: "Robinson Formula",
      small: "Small Frame",
      medium: "Medium Frame",
      large: "Large Frame",
      normal: "Normal Weight"
    },
    es: {
      title: "Calculadora de Peso Ideal",
      gender: "Género",
      height: "Altura",
      method: "Método de Cálculo",
      bodyFrame: "Tamaño de Complexión Corporal",
      calculate: "Calcular Peso Ideal",
      idealRange: "Rango de Peso Ideal",
      minWeight: "Peso Saludable Mínimo",
      maxWeight: "Peso Saludable Máximo",
      bmiCategory: "Categoría IMC",
      kg: "kg",
      male: "Masculino",
      female: "Femenino",
      healthy_bmi: "IMC Saludable (18.5-24.9)",
      devine: "Fórmula Devine",
      hamwi: "Método Hamwi",
      miller: "Fórmula Miller",
      robinson: "Fórmula Robinson",
      small: "Complexión Pequeña",
      medium: "Complexión Mediana",
      large: "Complexión Grande",
      normal: "Peso Normal"
    },
    pt: {
      title: "Calculadora de Peso Ideal",
      gender: "Gênero",
      height: "Altura",
      method: "Método de Cálculo",
      bodyFrame: "Tamanho de Estrutura Corporal",
      calculate: "Calcular Peso Ideal",
      idealRange: "Faixa de Peso Ideal",
      minWeight: "Peso Saudável Mínimo",
      maxWeight: "Peso Saudável Máximo",
      bmiCategory: "Categoria IMC",
      kg: "kg",
      male: "Masculino",
      female: "Feminino",
      healthy_bmi: "IMC Saudável (18.5-24.9)",
      devine: "Fórmula Devine",
      hamwi: "Método Hamwi",
      miller: "Fórmula Miller",
      robinson: "Fórmula Robinson",
      small: "Estrutura Pequena",
      medium: "Estrutura Média",
      large: "Estrutura Grande",
      normal: "Peso Normal"
    },
    fr: {
      title: "Calculateur de Poids Idéal",
      gender: "Genre",
      height: "Taille",
      method: "Méthode de Calcul",
      bodyFrame: "Taille Structure Corporelle",
      calculate: "Calculer Poids Idéal",
      idealRange: "Gamme Poids Idéal",
      minWeight: "Poids Sain Minimum",
      maxWeight: "Poids Sain Maximum",
      bmiCategory: "Catégorie IMC",
      kg: "kg",
      male: "Masculin",
      female: "Féminin",
      healthy_bmi: "IMC Sain (18.5-24.9)",
      devine: "Formule Devine",
      hamwi: "Méthode Hamwi",
      miller: "Formule Miller",
      robinson: "Formule Robinson",
      small: "Structure Petite",
      medium: "Structure Moyenne",
      large: "Structure Grande",
      normal: "Poids Normal"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateIdealWeight = () => {
    const { gender, height, method, bodyFrame } = inputs;
    let minWeight = 0;
    let maxWeight = 0;
    let idealWeightRange = '';
    let bmiCategory = t.normal;

    const heightInMeters = height / 100;
    const heightInInches = height / 2.54;

    if (method === 'healthy_bmi') {
      // Healthy BMI range: 18.5 - 24.9
      minWeight = 18.5 * (heightInMeters * heightInMeters);
      maxWeight = 24.9 * (heightInMeters * heightInMeters);
      idealWeightRange = `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)} kg`;
    } else if (method === 'devine') {
      // Devine formula
      let baseWeight = 0;
      if (gender === 'male') {
        baseWeight = 50 + 2.3 * (heightInInches - 60);
      } else {
        baseWeight = 45.5 + 2.3 * (heightInInches - 60);
      }

      // Adjust for body frame
      let frameAdjustment = 1;
      if (bodyFrame === 'small') frameAdjustment = 0.95;
      else if (bodyFrame === 'large') frameAdjustment = 1.05;

      const idealWeight = baseWeight * frameAdjustment;
      minWeight = idealWeight * 0.95;
      maxWeight = idealWeight * 1.05;
      idealWeightRange = `${idealWeight.toFixed(1)} kg (${bodyFrame} frame)`;
    } else if (method === 'hamwi') {
      // Hamwi method
      let baseWeight = 0;
      if (gender === 'male') {
        baseWeight = 48 + 2.7 * (heightInInches - 60);
      } else {
        baseWeight = 45.5 + 2.2 * (heightInInches - 60);
      }

      // Adjust for body frame
      let frameAdjustment = 1;
      if (bodyFrame === 'small') frameAdjustment = 0.9;
      else if (bodyFrame === 'large') frameAdjustment = 1.1;

      const idealWeight = baseWeight * frameAdjustment;
      minWeight = idealWeight * 0.95;
      maxWeight = idealWeight * 1.05;
      idealWeightRange = `${idealWeight.toFixed(1)} kg (${bodyFrame} frame)`;
    } else if (method === 'miller') {
      // Miller formula
      let baseWeight = 0;
      if (gender === 'male') {
        baseWeight = 56.2 + 1.41 * (heightInInches - 60);
      } else {
        baseWeight = 53.1 + 1.36 * (heightInInches - 60);
      }

      minWeight = baseWeight * 0.95;
      maxWeight = baseWeight * 1.05;
      idealWeightRange = `${baseWeight.toFixed(1)} kg`;
    } else if (method === 'robinson') {
      // Robinson formula
      let baseWeight = 0;
      if (gender === 'male') {
        baseWeight = 52 + 1.9 * (heightInInches - 60);
      } else {
        baseWeight = 49 + 1.7 * (heightInInches - 60);
      }

      minWeight = baseWeight * 0.95;
      maxWeight = baseWeight * 1.05;
      idealWeightRange = `${baseWeight.toFixed(1)} kg`;
    }

    return {
      idealWeightRange,
      minWeight: Math.round(minWeight * 10) / 10,
      maxWeight: Math.round(maxWeight * 10) / 10,
      bmiCategory
    };
  };

  useEffect(() => {
    const results = calculateIdealWeight();
    setResults(results);
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">Calculate your ideal weight range for optimal health</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
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
              {t.method}
            </label>
            <select
              value={inputs.method}
              onChange={(e) => handleInputChange('method', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="healthy_bmi">{t.healthy_bmi}</option>
              <option value="devine">{t.devine}</option>
              <option value="hamwi">{t.hamwi}</option>
              <option value="miller">{t.miller}</option>
              <option value="robinson">{t.robinson}</option>
            </select>
          </div>

          {(inputs.method === 'devine' || inputs.method === 'hamwi') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.bodyFrame}
              </label>
              <select
                value={inputs.bodyFrame}
                onChange={(e) => handleInputChange('bodyFrame', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="small">{t.small}</option>
                <option value="medium">{t.medium}</option>
                <option value="large">{t.large}</option>
              </select>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.idealRange}</h3>
            <div className="text-xl font-bold text-blue-600">
              {results.idealWeightRange}
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Based on {inputs.method.replace('_', ' ')} method
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-green-900">{t.minWeight}</div>
              <div className="text-xl font-bold text-green-600">
                {results.minWeight} {t.kg}
              </div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-purple-900">{t.maxWeight}</div>
              <div className="text-xl font-bold text-purple-600">
                {results.maxWeight} {t.kg}
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-orange-900">{t.bmiCategory}</div>
              <div className="text-lg font-semibold text-orange-700">
                {results.bmiCategory}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-2">Weight Categories:</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Underweight:</span>
                <span>&lt; 18.5 BMI</span>
              </div>
              <div className="flex justify-between">
                <span>Normal:</span>
                <span>18.5 - 24.9 BMI</span>
              </div>
              <div className="flex justify-between">
                <span>Overweight:</span>
                <span>25 - 29.9 BMI</span>
              </div>
              <div className="flex justify-between">
                <span>Obese:</span>
                <span>≥ 30 BMI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
