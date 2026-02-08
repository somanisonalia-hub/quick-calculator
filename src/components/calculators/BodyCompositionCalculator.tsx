'use client';

import { useState } from 'react';

interface BodyCompositionCalculatorProps {
  lang?: string;
}

export default function BodyCompositionCalculator({ lang = 'en' }: BodyCompositionCalculatorProps) {
  const [inputs, setInputs] = useState({
    weight: 70,
    height: 170,
    age: 30,
    gender: 'male'
  });

  const resetCalculator = () => {
    // Reset to default values
    setInputs(0);
  };

  const translations = {
    en: {
      title: "Body Composition Calculator",
      description: "Estimate body fat percentage and lean body mass",
      weight: "Weight (kg)",
      height: "Height (cm)",
      age: "Age",
      gender: "Gender",
      male: "Male",
      female: "Female",
      calculate: "🔄 Recalculate",
      results: "Results",
      bodyFat: "Body Fat %",
      leanMass: "Lean Mass",
      fatMass: "Fat Mass",
      reset: "Reset"
    },
    es: {
      title: "Calculadora de Composición Corporal",
      description: "Estimar porcentaje de grasa corporal y masa corporal magra",
      weight: "Peso (kg)",
      height: "Altura (cm)",
      age: "Edad",
      gender: "Género",
      male: "Masculino",
      female: "Femenino",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      bodyFat: "Grasa Corporal %",
      leanMass: "Masa Magra",
      fatMass: "Masa Grasa",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora de Composição Corporal",
      description: "Estimar percentual de gordura corporal e massa magra",
      weight: "Peso (kg)",
      height: "Altura (cm)",
      age: "Idade",
      gender: "Gênero",
      male: "Masculino",
      female: "Feminino",
      calculate: "🔄 Recalcular",
      results: "Resultados",
      bodyFat: "Gordura Corporal %",
      leanMass: "Massa Magra",
      fatMass: "Massa Gorda",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur de Composition Corporelle",
      description: "Estimer le pourcentage de graisse corporelle et la masse maigre",
      weight: "Poids (kg)",
      height: "Taille (cm)",
      age: "Âge",
      gender: "Genre",
      male: "Homme",
      female: "Femme",
      calculate: "🔄 Recalculer",
      results: "Résultats",
      bodyFat: "Graisse Corporelle %",
      leanMass: "Masse Maigre",
      fatMass: "Masse Grasse",
      reset: "Réinitialiser"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">{t.weight}</label>
          <input
            type="number"
            value={inputs.weight}
            onChange={(e) => setInputs({ ...inputs, weight: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>

        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.height}</label>
          <input
            type="number"
            value={inputs.height}
            onChange={(e) => setInputs({ ...inputs, height: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.age}</label>
          <input
            type="number"
            value={inputs.age}
            onChange={(e) => setInputs({ ...inputs, age: Number(e.target.value) })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t.gender}</label>
          <select
            value={inputs.gender}
            onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="male">{t.male}</option>
            <option value="female">{t.female}</option>
          </select>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          {t.calculate}
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">{t.results}</h3>
        <p className="text-sm text-gray-600">Enter your information and click calculate to see results.</p>
      </div>
    </div>
  );
}
