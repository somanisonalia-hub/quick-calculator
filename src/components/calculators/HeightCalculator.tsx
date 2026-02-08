'use client';

import React, { useState } from 'react';

interface HeightCalculatorProps {
  lang?: string;
}

const translations = {
  en: {
    title: 'Height Calculator',
    subtitle: 'Predict child adult height based on parent heights',
    method: 'Calculation Method',
    midParent: 'Mid-Parent Method',
    khamis: 'Khamis-Roche Method',
    childGender: "Child's Gender",
    male: 'Male',
    female: 'Female',
    fatherHeight: "Father's Height",
    motherHeight: "Mother's Height",
    childAge: "Child's Current Age",
    childHeight: "Child's Current Height",
    childWeight: "Child's Current Weight",
    calculate: 'Calculate Predicted Height',
    predictedHeight: 'Predicted Adult Height',
    range: 'Expected Range',
    feet: 'ft',
    inches: 'in',
    cm: 'cm',
    kg: 'kg',
    lbs: 'lbs',
    years: 'years',
    disclaimer: 'These predictions are estimates based on statistical models. Actual height depends on many factors including nutrition, health, and genetics.',
    heightFactors: 'Factors Affecting Height',
    genetics: 'Genetics (60-80%)',
    nutrition: 'Nutrition',
    sleep: 'Sleep Quality',
    exercise: 'Physical Activity',
    health: 'Overall Health',
      reset: "Reset"
  },
  es: {
    title: 'Calculadora de Altura',
    subtitle: 'Predice la altura adulta del niño basándose en la altura de los padres',
    method: 'Método de Cálculo',
    midParent: 'Método del Punto Medio',
    khamis: 'Método Khamis-Roche',
    childGender: 'Género del Niño',
    male: 'Masculino',
    female: 'Femenino',
    fatherHeight: 'Altura del Padre',
    motherHeight: 'Altura de la Madre',
    childAge: 'Edad Actual del Niño',
    childHeight: 'Altura Actual del Niño',
    childWeight: 'Peso Actual del Niño',
    calculate: 'Calcular Altura Predicha',
    predictedHeight: 'Altura Adulta Predicha',
    range: 'Rango Esperado',
    feet: 'pies',
    inches: 'pulg',
    cm: 'cm',
    kg: 'kg',
    lbs: 'lbs',
    years: 'años',
    disclaimer: 'Estas predicciones son estimaciones basadas en modelos estadísticos. La altura real depende de muchos factores.',
    heightFactors: 'Factores que Afectan la Altura',
    genetics: 'Genética (60-80%)',
    nutrition: 'Nutrición',
    sleep: 'Calidad del Sueño',
    exercise: 'Actividad Física',
    health: 'Salud General',
      reset: "Restablecer"
  },
  pt: {
    title: 'Calculadora de Altura',
    subtitle: 'Preveja a altura adulta da criança com base na altura dos pais',
    method: 'Método de Cálculo',
    midParent: 'Método do Ponto Médio',
    khamis: 'Método Khamis-Roche',
    childGender: 'Gênero da Criança',
    male: 'Masculino',
    female: 'Feminino',
    fatherHeight: 'Altura do Pai',
    motherHeight: 'Altura da Mãe',
    childAge: 'Idade Atual da Criança',
    childHeight: 'Altura Atual da Criança',
    childWeight: 'Peso Atual da Criança',
    calculate: 'Calcular Altura Prevista',
    predictedHeight: 'Altura Adulta Prevista',
    range: 'Faixa Esperada',
    feet: 'pés',
    inches: 'pol',
    cm: 'cm',
    kg: 'kg',
    lbs: 'lbs',
    years: 'anos',
    disclaimer: 'Estas previsões são estimativas baseadas em modelos estatísticos. A altura real depende de muitos fatores.',
    heightFactors: 'Fatores que Afetam a Altura',
    genetics: 'Genética (60-80%)',
    nutrition: 'Nutrição',
    sleep: 'Qualidade do Sono',
    exercise: 'Atividade Física',
    health: 'Saúde Geral',
      reset: "Redefinir"
  },
  fr: {
    title: 'Calculateur de Taille',
    subtitle: "Prédisez la taille adulte de l'enfant en fonction de la taille des parents",
    method: 'Méthode de Calcul',
    midParent: 'Méthode du Point Médian',
    khamis: 'Méthode Khamis-Roche',
    childGender: "Genre de l'Enfant",
    male: 'Masculin',
    female: 'Féminin',
    fatherHeight: 'Taille du Père',
    motherHeight: 'Taille de la Mère',
    childAge: "Âge Actuel de l'Enfant",
    childHeight: "Taille Actuelle de l'Enfant",
    childWeight: "Poids Actuel de l'Enfant",
    calculate: 'Calculer la Taille Prédite',
    predictedHeight: 'Taille Adulte Prédite',
    range: 'Plage Attendue',
    feet: 'pi',
    inches: 'po',
    cm: 'cm',
    kg: 'kg',
    lbs: 'lbs',
    years: 'ans',
    disclaimer: 'Ces prédictions sont des estimations basées sur des modèles statistiques. La taille réelle dépend de nombreux facteurs.',
    heightFactors: 'Facteurs Affectant la Taille',
    genetics: 'Génétique (60-80%)',
    nutrition: 'Nutrition',
    sleep: 'Qualité du Sommeil',
    exercise: 'Activité Physique',
    health: 'Santé Générale',
      reset: "Réinitialiser"
  }
};

export default function HeightCalculator({ lang = 'en' }: HeightCalculatorProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [unit, setUnit] = useState<'cm' | 'imperial'>('cm');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [fatherHeight, setFatherHeight] = useState({ cm: 175, feet: 5, inches: 9 });
  const [motherHeight, setMotherHeight] = useState({ cm: 162, feet: 5, inches: 4 });
  const [result, setResult] = useState<{ predicted: number; min: number; max: number } | null>(null);

  const cmToFeetInches = (cm: number) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  };

  const feetInchesToCm = (feet: number, inches: number) => {
    return (feet * 12 + inches) * 2.54;
  };

  const calculateHeight = () => {
    const fatherCm = unit === 'cm' ? fatherHeight.cm : feetInchesToCm(fatherHeight.feet, fatherHeight.inches);
    const motherCm = unit === 'cm' ? motherHeight.cm : feetInchesToCm(motherHeight.feet, motherHeight.inches);

    // Mid-Parent Method
    let predicted: number;
    if (gender === 'male') {
      predicted = (fatherCm + motherCm + 13) / 2;
    } else {
      predicted = (fatherCm + motherCm - 13) / 2;
    }

    // Standard deviation is about 5cm (2 inches)
    const margin = 10;
    
    setResult({
      predicted: Math.round(predicted * 10) / 10,
      min: Math.round((predicted - margin) * 10) / 10,
      max: Math.round((predicted + margin) * 10) / 10
    });
  };

  const resetCalculator = () => {
    // Reset all input values to defaults
    setFatherHeight({ cm: 175, feet: 5, inches: 9 });
    setMotherHeight({ cm: 162, feet: 5, inches: 4 });
    setResult(null);
  };

  const formatHeight = (cm: number) => {
    if (unit === 'cm') {
      return `${cm} ${t.cm}`;
    }
    const { feet, inches } = cmToFeetInches(cm);
    return `${feet}'${inches}"`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-5xl">📏</span>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* Unit Toggle */}
      <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 mb-6">
        <button
          onClick={() => setUnit('cm')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            unit === 'cm' ? 'bg-white dark:bg-gray-600 shadow' : ''
          }`}
        >
          Metric (cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            unit === 'imperial' ? 'bg-white dark:bg-gray-600 shadow' : ''
          }`}
        >
          Imperial (ft/in)
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.childGender}
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-3 rounded-lg font-medium border-2 transition-all ${
                  gender === 'male' 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                👦 {t.male}
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-3 rounded-lg font-medium border-2 transition-all ${
                  gender === 'female' 
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-600' 
                    : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                👧 {t.female}
              </button>
            </div>
          </div>

          {/* Father's Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.fatherHeight}
            </label>
            {unit === 'cm' ? (
              <input
                type="number"
                value={fatherHeight.cm}
                onChange={(e) => setFatherHeight({ ...fatherHeight, cm: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="175"
              />
            ) : (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={fatherHeight.feet}
                  onChange={(e) => setFatherHeight({ ...fatherHeight, feet: parseInt(e.target.value) || 0 })}
                  className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="5"
                />
                <input
                  type="number"
                  value={fatherHeight.inches}
                  onChange={(e) => setFatherHeight({ ...fatherHeight, inches: parseInt(e.target.value) || 0 })}
                  className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="9"
                />
              </div>
            )}
          </div>

          {/* Mother's Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.motherHeight}
            </label>
            {unit === 'cm' ? (
              <input
                type="number"
                value={motherHeight.cm}
                onChange={(e) => setMotherHeight({ ...motherHeight, cm: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="162"
              />
            ) : (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={motherHeight.feet}
                  onChange={(e) => setMotherHeight({ ...motherHeight, feet: parseInt(e.target.value) || 0 })}
                  className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="5"
                />
                <input
                  type="number"
                  value={motherHeight.inches}
                  onChange={(e) => setMotherHeight({ ...motherHeight, inches: parseInt(e.target.value) || 0 })}
                  className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="4"
                />
              </div>
            )}
          </div>

          <button
            onClick={calculateHeight}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-teal-600 transition-all"
          >
            {t.calculate}
          </button>

          <button
            onClick={resetCalculator}
            className="w-full bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
          >
            {t.reset}
          </button>
        </div>

        <div className="space-y-4">
          {result && (
            <>
              <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-xl p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">{t.predictedHeight}</p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {formatHeight(result.predicted)}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.range}</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {formatHeight(result.min)} - {formatHeight(result.max)}
                </p>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                ⚠️ {t.disclaimer}
              </p>
            </>
          )}

          {/* Height Factors */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">{t.heightFactors}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>🧬 {t.genetics}</li>
              <li>🥗 {t.nutrition}</li>
              <li>😴 {t.sleep}</li>
              <li>🏃 {t.exercise}</li>
              <li>❤️ {t.health}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
