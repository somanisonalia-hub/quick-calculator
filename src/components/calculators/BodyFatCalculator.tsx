'use client';

import { useState, useEffect } from 'react';

interface BodyFatCalculatorProps {
  lang?: string;
}

export default function BodyFatCalculator({ lang = 'en' }: BodyFatCalculatorProps) {
  const [inputs, setInputs] = useState({
    method: 'navy',
    gender: 'male',
    age: 30,
    height: 170,
    weight: 70,
    waist: 80,
    neck: 38,
    hips: 95
  });

  const [results, setResults] = useState({
    bodyFatPercentage: 0,
    leanMass: 0,
    fatMass: 0,
    category: ''
  });

  const translations = {
    en: {
      title: "Body Fat Calculator",
      method: "Calculation Method",
      gender: "Gender",
      age: "Age",
      height: "Height",
      weight: "Weight",
      waist: "Waist Circumference",
      neck: "Neck Circumference",
      hips: "Hip Circumference",
      calculate: "Calculate Body Fat",
      bodyFat: "Body Fat Percentage",
      leanMass: "Lean Body Mass",
      fatMass: "Body Fat Mass",
      category: "Fitness Category",
      navy: "U.S. Navy Method",
      bmi: "BMI Method",
      skinfold: "Skinfold Method",
      male: "Male",
      female: "Female",
      essential: "Essential Fat",
      athletes: "Athletes",
      fitness: "Fitness",
      average: "Average",
      obese: "Obese"
    },
    es: {
      title: "Calculadora de Grasa Corporal",
      method: "Método de Cálculo",
      gender: "Género",
      age: "Edad",
      height: "Altura",
      weight: "Peso",
      waist: "Circunferencia de Cintura",
      neck: "Circunferencia de Cuello",
      hips: "Circunferencia de Cadera",
      calculate: "Calcular Grasa Corporal",
      bodyFat: "Porcentaje de Grasa Corporal",
      leanMass: "Masa Corporal Magra",
      fatMass: "Masa de Grasa Corporal",
      category: "Categoría de Fitness",
      navy: "Método Marina de EE.UU.",
      bmi: "Método BMI",
      skinfold: "Método Pliegue Cutáneo",
      male: "Masculino",
      female: "Femenino",
      essential: "Grasa Esencial",
      athletes: "Atletas",
      fitness: "Fitness",
      average: "Promedio",
      obese: "Obeso"
    },
    pt: {
      title: "Calculadora de Gordura Corporal",
      method: "Método de Cálculo",
      gender: "Gênero",
      age: "Idade",
      height: "Altura",
      weight: "Peso",
      waist: "Circunferência da Cintura",
      neck: "Circunferência do Pescoço",
      hips: "Circunferência do Quadril",
      calculate: "Calcular Gordura Corporal",
      bodyFat: "Porcentagem de Gordura Corporal",
      leanMass: "Massa Corporal Magra",
      fatMass: "Massa de Gordura Corporal",
      category: "Categoria de Fitness",
      navy: "Método Marinha dos EUA",
      bmi: "Método BMI",
      skinfold: "Método Dobra Cutânea",
      male: "Masculino",
      female: "Feminino",
      essential: "Gordura Essencial",
      athletes: "Atletas",
      fitness: "Fitness",
      average: "Média",
      obese: "Obeso"
    },
    fr: {
      title: "Calculateur de Graisse Corporelle",
      method: "Méthode de Calcul",
      gender: "Genre",
      age: "Âge",
      height: "Taille",
      weight: "Poids",
      waist: "Circonférence de Taille",
      neck: "Circonférence du Cou",
      hips: "Circonférence des Hanches",
      calculate: "Calculer Graisse Corporelle",
      bodyFat: "Pourcentage de Graisse Corporelle",
      leanMass: "Masse Corporelle Maigre",
      fatMass: "Masse de Graisse Corporelle",
      category: "Catégorie de Fitness",
      navy: "Méthode Marine américaine",
      bmi: "Méthode BMI",
      skinfold: "Méthode Pli Cutané",
      male: "Masculin",
      female: "Féminin",
      essential: "Graisse Essentielle",
      athletes: "Athlètes",
      fitness: "Fitness",
      average: "Moyenne",
      obese: "Obèse"
    }
  ,
    de: {
      title: "Körperfettrechner",
      method: "Berechnungsmethode",
      gender: "Geschlecht",
      age: "Alter",
      height: "Größe",
      weight: "Gewicht",
      waist: "Taillenumfang",
      neck: "Halsumfang",
      hips: "Hüftumfang",
      calculate: "Körperfett Berechnen",
      bodyFat: "Körperfettanteil",
      leanMass: "Fettfreie Körpermasse",
      fatMass: "Körperfettmasse",
      category: "Fitness-Kategorie",
      navy: "US-Marine-Methode",
      bmi: "BMI-Methode",
      skinfold: "Hautfalten-Methode",
      male: "Männlich",
      female: "Weiblich",
      essential: "Essentielles Fett",
      athletes: "Athleten",
      fitness: "Fitness",
      average: "Durchschnitt",
      obese: "Adipös"
    },
    nl: {
      title: "Lichaamsvetcalculator",
      method: "Berekeningswijze",
      gender: "Geslacht",
      age: "Leeftijd",
      height: "Lengte",
      weight: "Gewicht",
      waist: "Tailleomtrek",
      neck: "Nekomtrek",
      hips: "Heupomtrek",
      calculate: "Berekenen Lichaamsvet",
      bodyFat: "Lichaamsvetpercentage",
      leanMass: "Vetvrije Lichaamsmassa",
      fatMass: "Lichaamsvetmassa",
      category: "Fitnesscategorie",
      navy: "Amerikaanse Marine-Methode",
      bmi: "BMI-Methode",
      skinfold: "Huidplooi-Methode",
      male: "Mannelijk",
      female: "Vrouwelijk",
      essential: "Essentieel Vet",
      athletes: "Atleten",
      fitness: "Fitness",
      average: "Gemiddeld",
      obese: "Obesitas"
    }
  };const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateBodyFat = () => {
    const { method, gender, age, height, weight, waist, neck, hips } = inputs;
    let bodyFatPercentage = 0;

    if (method === 'navy') {
      // U.S. Navy Method
      if (gender === 'male') {
        const logWaistNeck = Math.log10(waist - neck);
        const logHeight = Math.log10(height);
        const density = 1.0324 - 0.19077 * logWaistNeck + 0.15456 * logHeight;
        bodyFatPercentage = (495 / density) - 450;
      } else {
        const logWaistHipsNeck = Math.log10(waist + hips - neck);
        const logHeight = Math.log10(height);
        const density = 1.29579 - 0.35004 * logWaistHipsNeck + 0.22100 * logHeight;
        bodyFatPercentage = (495 / density) - 450;
      }
    } else if (method === 'bmi') {
      // BMI-based estimation (rough approximation)
      const bmi = weight / ((height / 100) ** 2);
      if (gender === 'male') {
        bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 16.2;
      } else {
        bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 5.4;
      }
    } else if (method === 'skinfold') {
      // Simplified skinfold method (3-site for men, 3-site for women)
      if (gender === 'male') {
        // Simplified: using chest, abdomen, thigh estimates
        bodyFatPercentage = 0.29288 * (waist * 0.8) - 0.0005 * (waist * 0.8) ** 2 + 0.15845 * age - 5.76377;
      } else {
        // Simplified: using triceps, suprailiac, thigh estimates
        bodyFatPercentage = 0.29669 * (waist * 0.9) - 0.00043 * (waist * 0.9) ** 2 + 0.02963 * age + 1.4072;
      }
    }

    bodyFatPercentage = Math.max(2, Math.min(50, bodyFatPercentage)); // Clamp between 2-50%

    const fatMass = (bodyFatPercentage / 100) * weight;
    const leanMass = weight - fatMass;

    let category = '';
    if (gender === 'male') {
      if (bodyFatPercentage < 6) category = t.essential;
      else if (bodyFatPercentage < 14) category = t.athletes;
      else if (bodyFatPercentage < 18) category = t.fitness;
      else if (bodyFatPercentage < 25) category = t.average;
      else category = t.obese;
    } else {
      if (bodyFatPercentage < 14) category = t.essential;
      else if (bodyFatPercentage < 21) category = t.athletes;
      else if (bodyFatPercentage < 25) category = t.fitness;
      else if (bodyFatPercentage < 32) category = t.average;
      else category = t.obese;
    }

    return {
      bodyFatPercentage: Math.round(bodyFatPercentage * 10) / 10,
      leanMass: Math.round(leanMass * 10) / 10,
      fatMass: Math.round(fatMass * 10) / 10,
      category
    };
  };

  useEffect(() => {
    const results = calculateBodyFat();
    setResults(results);
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRequiredFields = () => {
    const { method } = inputs;
    const commonFields = ['method', 'gender', 'age', 'height', 'weight'];

    if (method === 'navy') {
      return [...commonFields, 'waist', 'neck', ...(inputs.gender === 'female' ? ['hips'] : [])];
    } else if (method === 'bmi') {
      return [...commonFields];
    } else if (method === 'skinfold') {
      return [...commonFields, 'waist'];
    }
    return commonFields;
  };

  const requiredFields = getRequiredFields();

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">Calculate your body fat percentage using scientifically validated methods</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.method}
            </label>
            <select
              value={inputs.method}
              onChange={(e) => handleInputChange('method', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="navy">{t.navy}</option>
              <option value="bmi">{t.bmi}</option>
              <option value="skinfold">{t.skinfold}</option>
            </select>
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

          {requiredFields.includes('waist') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.waist} (cm)
              </label>
              <input
                type="number"
                value={inputs.waist}
                onChange={(e) => handleInputChange('waist', parseFloat(e.target.value) || 0)}
                min="50"
                max="200"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {requiredFields.includes('neck') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.neck} (cm)
              </label>
              <input
                type="number"
                value={inputs.neck}
                onChange={(e) => handleInputChange('neck', parseFloat(e.target.value) || 0)}
                min="25"
                max="60"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {requiredFields.includes('hips') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.hips} (cm)
              </label>
              <input
                type="number"
                value={inputs.hips}
                onChange={(e) => handleInputChange('hips', parseFloat(e.target.value) || 0)}
                min="60"
                max="200"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.bodyFat}</h3>
            <div className="text-3xl font-bold text-blue-600">
              {results.bodyFatPercentage}%
            </div>
            <p className="text-sm text-blue-700 mt-1">
              {results.category}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-green-900">{t.leanMass}</div>
              <div className="text-xl font-bold text-green-600">
                {results.leanMass} kg
              </div>
            </div>

            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-red-900">{t.fatMass}</div>
              <div className="text-xl font-bold text-red-600">
                {results.fatMass} kg
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-gray-900">{t.category}</div>
            <div className="text-lg font-semibold text-gray-700">
              {results.category}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
