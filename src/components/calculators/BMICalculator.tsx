'use client';

import { useState, useEffect } from 'react';

interface BMICalculatorProps {
  lang?: string;
}

export default function BMICalculator({ lang = 'en' }: BMICalculatorProps) {
  const [inputs, setInputs] = useState({
    unit: 'metric',
    height: 170,
    weight: 70,
    heightFeet: 5,
    heightInches: 9,
    weightLbs: 154
  });

  const [results, setResults] = useState({
    bmi: 0,
    category: '',
    healthyRange: '',
    bmiPrime: 0
  });

  const translations = {
    en: {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index (BMI) and health category",
      unitSystem: "Unit System",
      metric: "Metric (cm/kg)",
      imperial: "Imperial (ft/lbs)",
      height: "Height",
      weight: "Weight",
      calculate: "Calculate BMI",
      yourBMI: "Your BMI",
      category: "BMI Category",
      healthyRange: "Healthy BMI Range",
      bmiPrime: "BMI Prime",
      cm: "cm",
      kg: "kg",
      ft: "ft",
      lbs: "lbs",
      severelyUnderweight: "Severely Underweight",
      underweight: "Underweight",
      normal: "Normal Weight",
      overweight: "Overweight",
      obeseClass1: "Obese Class I",
      obeseClass2: "Obese Class II",
      obeseClass3: "Obese Class III",
      healthyRangeText: "18.5 - 24.9",
      underweightLabel: "Underweight:",
      lt185: "&lt; 18.5",
      normalLabel: "Normal:",
      overweightLabel: "Overweight:",
      obeseLabel: "Obese:",
      num0: "≥ 30",
      bmiCategories: "BMI Categories:"
    },
    es: {
      title: "Calculadora IMC",
      description: "Calcula tu Índice de Masa Corporal (IMC) y categoría de salud",
      unitSystem: "Sistema de Unidades",
      metric: "Métrico (cm/kg)",
      imperial: "Imperial (ft/lbs)",
      height: "Altura",
      weight: "Peso",
      calculate: "Calcular IMC",
      yourBMI: "Tu IMC",
      category: "Categoría IMC",
      healthyRange: "Rango IMC Saludable",
      bmiPrime: "IMC Prime",
      cm: "cm",
      kg: "kg",
      ft: "ft",
      lbs: "lbs",
      severelyUnderweight: "Severamente Bajo Peso",
      underweight: "Bajo Peso",
      normal: "Peso Normal",
      overweight: "Sobrepeso",
      obeseClass1: "Obeso Clase I",
      obeseClass2: "Obeso Clase II",
      obeseClass3: "Obeso Clase III",
      healthyRangeText: "18.5 - 24.9",
      underweightLabel: "Bajo peso:",
      lt185: "&lt; 18.5",
      normalLabel: "Normal:",
      overweightLabel: "Sobrepeso:",
      obeseLabel: "Obeso:",
      num0: "≥ 30",
      bmiCategories: "Categorías IMC:"
    },
    pt: {
      title: "Calculadora IMC",
      description: "Calcule seu Índice de Massa Corporal (IMC) e categoria de saúde",
      unitSystem: "Sistema de Unidades",
      metric: "Métrico (cm/kg)",
      imperial: "Imperial (ft/lbs)",
      height: "Altura",
      weight: "Peso",
      calculate: "Calcular IMC",
      yourBMI: "Seu IMC",
      category: "Categoria IMC",
      healthyRange: "Faixa IMC Saudável",
      bmiPrime: "IMC Prime",
      cm: "cm",
      kg: "kg",
      ft: "ft",
      lbs: "lbs",
      severelyUnderweight: "Severamente Abaixo do Peso",
      underweight: "Abaixo do Peso",
      normal: "Peso Normal",
      overweight: "Sobrepeso",
      obeseClass1: "Obeso Classe I",
      obeseClass2: "Obeso Classe II",
      obeseClass3: "Obeso Classe III",
      healthyRangeText: "18.5 - 24.9",
      underweightLabel: "Abaixo do peso:",
      lt185: "&lt; 18.5",
      normalLabel: "Normal:",
      overweightLabel: "Sobrepeso:",
      obeseLabel: "Obeso:",
      num0: "≥ 30",
      bmiCategories: "Categorias IMC:"
    },
    fr: {
      title: "Calculateur IMC",
      description: "Calculez votre Indice de Masse Corporelle (IMC) et catégorie de santé",
      unitSystem: "Système d'Unités",
      metric: "Métrique (cm/kg)",
      imperial: "Impérial (ft/lbs)",
      height: "Taille",
      weight: "Poids",
      calculate: "Calculer IMC",
      yourBMI: "Votre IMC",
      category: "Catégorie IMC",
      healthyRange: "Gamme IMC Saine",
      bmiPrime: "IMC Prime",
      cm: "cm",
      kg: "kg",
      ft: "ft",
      lbs: "lbs",
      severelyUnderweight: "Sévérement Sous-Poids",
      underweight: "Sous-Poids",
      normal: "Poids Normal",
      overweight: "Surpoids",
      obeseClass1: "Obèse Classe I",
      obeseClass2: "Obèse Classe II",
      obeseClass3: "Obèse Classe III",
      healthyRangeText: "18.5 - 24.9",
      underweightLabel: "Sous-poids:",
      lt185: "&lt; 18.5",
      normalLabel: "Normal:",
      overweightLabel: "Surpoids:",
      obeseLabel: "Obèse:",
      num0: "≥ 30",
      bmiCategories: "Catégories IMC:"
    },
    de: {
      title: "BMI-Rechner",
      description: "Berechnen Sie Ihren Body-Mass-Index (BMI) und Ihre Gesundheitskategorie",
      unitSystem: "Mässystem",
      metric: "Metrisch (cm/kg)",
      imperial: "Angloamerikanisch (ft/lbs)",
      height: "Größe",
      weight: "Gewicht",
      calculate: "BMI berechnen",
      yourBMI: "Ihr BMI",
      category: "BMI-Kategorie",
      healthyRange: "Gesundes BMI-Bereich",
      bmiPrime: "BMI Prime",
      cm: "cm",
      kg: "kg",
      ft: "ft",
      lbs: "lbs",
      severelyUnderweight: "Stark Untergewichtig",
      underweight: "Untergewichtig",
      normal: "Normalgewicht",
      overweight: "Übergewichtig",
      obeseClass1: "Adipositas Klasse I",
      obeseClass2: "Adipositas Klasse II",
      obeseClass3: "Adipositas Klasse III",
      healthyRangeText: "18,5 - 24,9",
      underweightLabel: "Untergewichtig:",
      lt185: "&lt; 18,5",
      normalLabel: "Normal:",
      overweightLabel: "Übergewichtig:",
      obeseLabel: "Adipositas:",
      num0: "≥ 30",
      bmiCategories: "BMI-Kategorien:"
    },
    nl: {
      title: "BMI-rekenmachine",
      description: "Bereken uw Body Mass Index (BMI) en gezondheidscategorie",
      unitSystem: "Meetstelsel",
      metric: "Metrisch (cm/kg)",
      imperial: "Imperiaal (ft/lbs)",
      height: "Lengte",
      weight: "Gewicht",
      calculate: "BMI berekenen",
      yourBMI: "Uw BMI",
      category: "BMI-categorie",
      healthyRange: "Gezond BMI-bereik",
      bmiPrime: "BMI Prime",
      cm: "cm",
      kg: "kg",
      ft: "ft",
      lbs: "lbs",
      severelyUnderweight: "Ernstig Ondergewicht",
      underweight: "Ondergewicht",
      normal: "Normaal Gewicht",
      overweight: "Overgewicht",
      obeseClass1: "Obese Klasse I",
      obeseClass2: "Obese Klasse II",
      obeseClass3: "Obese Klasse III",
      healthyRangeText: "18,5 - 24,9",
      underweightLabel: "Ondergewicht:",
      lt185: "&lt; 18,5",
      normalLabel: "Normaal:",
      overweightLabel: "Overgewicht:",
      obeseLabel: "Obese:",
      num0: "≥ 30",
      bmiCategories: "BMI-categorieën:"
    }
  };const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateBMI = () => {
    let heightInMeters = 0;
    let weightInKg = 0;

    if (inputs.unit === 'metric') {
      heightInMeters = inputs.height / 100;
      weightInKg = inputs.weight;
    } else {
      // Convert imperial to metric
      const totalInches = (inputs.heightFeet * 12) + inputs.heightInches;
      heightInMeters = totalInches * 0.0254; // inches to meters
      weightInKg = inputs.weightLbs * 0.453592; // pounds to kg
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    // Determine category
    let category = '';
    if (bmi < 16.5) category = t.severelyUnderweight;
    else if (bmi < 18.5) category = t.underweight;
    else if (bmi < 25) category = t.normal;
    else if (bmi < 30) category = t.overweight;
    else if (bmi < 35) category = t.obeseClass1;
    else if (bmi < 40) category = t.obeseClass2;
    else category = t.obeseClass3;

    // BMI Prime (ratio of actual BMI to upper limit of normal BMI)
    const bmiPrime = bmi / 25;

    return {
      bmi: Math.round(bmi * 10) / 10,
      category,
      healthyRange: t.healthyRangeText,
      bmiPrime: Math.round(bmiPrime * 100) / 100
    };
  };

  useEffect(() => {
    setResults(calculateBMI());
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUnitChange = (unit: string) => {
    setInputs(prev => ({
      ...prev,
      unit
    }));
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.unitSystem}
            </label>
            <select
              value={inputs.unit}
              onChange={(e) => handleUnitChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="metric">{t.metric}</option>
              <option value="imperial">{t.imperial}</option>
            </select>
          </div>

          {inputs.unit === 'metric' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.height} ({t.cm})
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
                  {t.weight} ({t.kg})
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
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.height} ({t.ft})
                  </label>
                  <input
                    type="number"
                    value={inputs.heightFeet}
                    onChange={(e) => handleInputChange('heightFeet', parseInt(e.target.value) || 0)}
                    min="3"
                    max="8"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.height} (in)
                  </label>
                  <input
                    type="number"
                    value={inputs.heightInches}
                    onChange={(e) => handleInputChange('heightInches', parseInt(e.target.value) || 0)}
                    min="0"
                    max="11"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.weight} ({t.lbs})
                </label>
                <input
                  type="number"
                  value={inputs.weightLbs}
                  onChange={(e) => handleInputChange('weightLbs', parseFloat(e.target.value) || 0)}
                  min="66"
                  max="661"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.yourBMI}</h3>
            <div className="text-3xl font-bold text-blue-600">
              {results.bmi}
            </div>
            <p className="text-sm text-blue-700 mt-1">
              {results.category}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-green-900">{t.category}</div>
              <div className="text-lg font-semibold text-green-700">
                {results.category}
              </div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-purple-900">{t.healthyRange}</div>
              <div className="text-lg font-semibold text-purple-700">
                {results.healthyRange}
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-orange-900">{t.bmiPrime}</div>
              <div className="text-lg font-semibold text-orange-700">
                {results.bmiPrime}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-600 mb-2">{t.bmiCategories}</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>{t.underweightLabel}</span>
                <span>{t.lt185}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.normalLabel}</span>
                <span>18.5 - 24.9</span>
              </div>
              <div className="flex justify-between">
                <span>{t.overweightLabel}</span>
                <span>25 - 29.9</span>
              </div>
              <div className="flex justify-between">
                <span>{t.obeseLabel}</span>
                <span>{t.num0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}