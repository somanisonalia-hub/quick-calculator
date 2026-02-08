'use client';

import { useState, useEffect } from 'react';

interface CircleAreaCalculatorProps {
  lang?: string;
}

export default function CircleAreaCalculator({ lang = 'en' }: CircleAreaCalculatorProps) {
  const [inputMethod, setInputMethod] = useState<'radius' | 'diameter'>('radius');
  const [value, setValue] = useState(5);
  const [area, setArea] = useState(0);
  const [radius, setRadius] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [circumference, setCircumference] = useState(0);
  const [formula, setFormula] = useState('');

  const translations = {
    en: {
      title: "Circle Area Calculator",
      description: "Calculate the area of a circle using radius or diameter",
      inputMethod: "Input Method",
      radius: "Radius",
      diameter: "Diameter",
      value: "Value",
      circleArea: "Circle Area",
      radiusValue: "Radius",
      diameterValue: "Diameter",
      circumference: "Circumference",
      formulaUsed: "Formula Used",
      enterValue: "Enter radius or diameter above",
      units: "square units",
      circumferenceUnits: "units",
      formulaRadius: "A = π × r²",
      formulaDiameter: "A = (π × d²) ÷ 4",
      step1: "Step 1: Identify the given value",
      step2: "Step 2: Apply the appropriate formula",
      step3: "Step 3: Calculate the result",
      visualExplanation: "Visual Explanation",
      circleWithRadius: "Circle with radius r",
      circleWithDiameter: "Circle with diameter d",
      calculate: "🔄 Recalculate",
      reset: "Reset"
    },
    es: {
      title: "Calculadora del Área del Círculo",
      description: "Calcula el área de un círculo usando radio o diámetro",
      inputMethod: "Método de Entrada",
      radius: "Radio",
      diameter: "Diámetro",
      value: "Valor",
      circleArea: "Área del Círculo",
      radiusValue: "Radio",
      diameterValue: "Diámetro",
      circumference: "Circunferencia",
      formulaUsed: "Fórmula Usada",
      enterValue: "Ingresa radio o diámetro arriba",
      units: "unidades cuadradas",
      circumferenceUnits: "unidades",
      formulaRadius: "A = π × r²",
      formulaDiameter: "A = (π × d²) ÷ 4",
      step1: "Paso 1: Identificar el valor dado",
      step2: "Paso 2: Aplicar la fórmula apropiada",
      step3: "Paso 3: Calcular el resultado",
      visualExplanation: "Explicación Visual",
      circleWithRadius: "Círculo con radio r",
      circleWithDiameter: "Círculo con diámetro d",
      calculate: "🔄 Recalcular",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora da Área do Círculo",
      description: "Calcule a área de um círculo usando raio ou diâmetro",
      inputMethod: "Método de Entrada",
      radius: "Raio",
      diameter: "Diâmetro",
      value: "Valor",
      circleArea: "Área do Círculo",
      radiusValue: "Raio",
      diameterValue: "Diâmetro",
      circumference: "Circunferência",
      formulaUsed: "Fórmula Usada",
      enterValue: "Digite raio ou diâmetro acima",
      units: "unidades quadradas",
      circumferenceUnits: "unidades",
      formulaRadius: "A = π × r²",
      formulaDiameter: "A = (π × d²) ÷ 4",
      step1: "Passo 1: Identificar o valor dado",
      step2: "Passo 2: Aplicar a fórmula apropriada",
      step3: "Passo 3: Calcular o resultado",
      visualExplanation: "Explicação Visual",
      circleWithRadius: "Círculo com raio r",
      circleWithDiameter: "Círculo com diâmetro d",
      calculate: "🔄 Recalcular",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur d'Aire de Cercle",
      description: "Calculez l'aire d'un cercle en utilisant rayon ou diamètre",
      inputMethod: "Méthode d'Entrée",
      radius: "Rayon",
      diameter: "Diamètre",
      value: "Valeur",
      circleArea: "Aire du Cercle",
      radiusValue: "Rayon",
      diameterValue: "Diamètre",
      circumference: "Circonférence",
      formulaUsed: "Formule Utilisée",
      enterValue: "Entrez rayon ou diamètre ci-dessus",
      units: "unités carrées",
      circumferenceUnits: "unités",
      formulaRadius: "A = π × r²",
      formulaDiameter: "A = (π × d²) ÷ 4",
      step1: "Étape 1: Identifier la valeur donnée",
      step2: "Étape 2: Appliquer la formule appropriée",
      step3: "Étape 3: Calculer le résultat",
      visualExplanation: "Explication Visuelle",
      circleWithRadius: "Cercle avec rayon r",
      circleWithDiameter: "Cercle avec diamètre d",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateCircle = () => {
    let r: number, d: number, a: number, c: number, f: string;

    if (inputMethod === 'radius') {
      r = value;
      d = r * 2;
      a = Math.PI * r * r;
      f = t.formulaRadius;
    } else {
      d = value;
      r = d / 2;
      a = (Math.PI * d * d) / 4;
      f = t.formulaDiameter;
    }

    c = 2 * Math.PI * r;

    setArea(a);
    setRadius(r);
    setDiameter(d);
    setCircumference(c);
    setFormula(f);
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

  useEffect(() => {
    calculateCircle();
  }, [inputMethod, value, lang]);

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.inputMethod}
            </label>
            <select
              value={inputMethod}
              onChange={(e) => setInputMethod(e.target.value as 'radius' | 'diameter')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="radius">{t.radius}</option>
              <option value="diameter">{t.diameter}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {inputMethod === 'radius' ? t.radius : t.diameter} ({t.value})
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              step="0.01"
            />
          </div>

          {/* Visual Circle */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">{t.visualExplanation}</h3>
            <div className="flex justify-center">
              <div className="relative">
                <svg width="200" height="200" viewBox="0 0 200 200" className="border border-gray-300 rounded-full">
                  <circle cx="100" cy="100" r="80" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
                  {inputMethod === 'radius' && (
                    <>
                      <line x1="100" y1="100" x2="180" y2="100" stroke="#EF4444" strokeWidth="2"/>
                      <text x="140" y="95" fontSize="12" fill="#EF4444">r = {radius.toFixed(2)}</text>
                    </>
                  )}
                  {inputMethod === 'diameter' && (
                    <>
                      <line x1="20" y1="100" x2="180" y2="100" stroke="#EF4444" strokeWidth="2"/>
                      <text x="100" y="95" fontSize="12" fill="#EF4444">d = {diameter.toFixed(2)}</text>
                    </>
                  )}
                </svg>
                <div className="text-center mt-2 text-sm text-gray-600">
                  {inputMethod === 'radius' ? t.circleWithRadius : t.circleWithDiameter}
                </div>
              </div>
            </div>
          </div>

          {/* Formula Display */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.formulaUsed}</h4>
            <div className="text-lg font-mono text-green-700">{formula}</div>
            <div className="text-sm text-green-600 mt-2">
              π ≈ 3.14159
            
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateCircle}
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
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.circleArea}</h3>
            <div className="text-3xl font-bold text-blue-600 min-h-[48px] flex items-center">
              {area.toFixed(4)} {t.units}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">{t.radiusValue}</h4>
              <div className="text-lg font-bold text-purple-600">
                {radius.toFixed(2)} {t.circumferenceUnits}
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-orange-900 mb-1">{t.diameterValue}</h4>
              <div className="text-lg font-bold text-orange-600">
                {diameter.toFixed(2)} {t.circumferenceUnits}
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.circumference}</h4>
            <div className="text-xl font-bold text-green-600">
              {circumference.toFixed(4)} {t.circumferenceUnits}
            </div>
          </div>

          {/* Step-by-step solution */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Step-by-Step Solution</h4>
            <div className="space-y-2 text-sm">
              <div><strong>{t.step1}:</strong> {inputMethod === 'radius' ? t.radius.toLowerCase() : t.diameter.toLowerCase()} = {value}</div>
              <div><strong>{t.step2}:</strong> {formula}</div>
              <div><strong>{t.step3}:</strong> {area.toFixed(4)} {t.units}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
