'use client';

import { useState, useEffect } from 'react';

interface CircleCircumferenceCalculatorProps {
  lang?: string;
}

export default function CircleCircumferenceCalculator({ lang = 'en' }: CircleCircumferenceCalculatorProps) {
  const [inputMethod, setInputMethod] = useState<'radius' | 'diameter'>('radius');
  const [value, setValue] = useState(5);
  const [circumference, setCircumference] = useState(0);
  const [radius, setRadius] = useState(0);
  const [diameter, setDiameter] = useState(0);
  const [area, setArea] = useState(0);
  const [formula, setFormula] = useState('');

  const translations = {
    en: {
      title: "Circle Circumference Calculator",
      description: "Calculate the circumference (perimeter) of a circle using radius or diameter",
      inputMethod: "Input Method",
      radius: "Radius",
      diameter: "Diameter",
      value: "Value",
      circleCircumference: "Circle Circumference",
      radiusValue: "Radius",
      diameterValue: "Diameter",
      area: "Area",
      formulaUsed: "Formula Used",
      enterValue: "Enter radius or diameter above",
      units: "units",
      areaUnits: "square units",
      formulaRadius: "C = 2 × π × r",
      formulaDiameter: "C = π × d",
      step1: "Step 1: Identify the given value",
      step2: "Step 2: Apply the appropriate formula",
      step3: "Step 3: Calculate the result",
      visualExplanation: "Visual Explanation",
      circleWithCircumference: "Circle showing circumference path",
      circumferenceDefinition: "Circumference is the distance around the circle"
    },
    es: {
      title: "Calculadora de Circunferencia del Círculo",
      description: "Calcula la circunferencia (perímetro) de un círculo usando radio o diámetro",
      inputMethod: "Método de Entrada",
      radius: "Radio",
      diameter: "Diámetro",
      value: "Valor",
      circleCircumference: "Circunferencia del Círculo",
      radiusValue: "Radio",
      diameterValue: "Diámetro",
      area: "Área",
      formulaUsed: "Fórmula Usada",
      enterValue: "Ingresa radio o diámetro arriba",
      units: "unidades",
      areaUnits: "unidades cuadradas",
      formulaRadius: "C = 2 × π × r",
      formulaDiameter: "C = π × d",
      step1: "Paso 1: Identificar el valor dado",
      step2: "Paso 2: Aplicar la fórmula apropiada",
      step3: "Paso 3: Calcular el resultado",
      visualExplanation: "Explicación Visual",
      circleWithCircumference: "Círculo mostrando trayectoria de circunferencia",
      circumferenceDefinition: "La circunferencia es la distancia alrededor del círculo"
    },
    pt: {
      title: "Calculadora da Circunferência do Círculo",
      description: "Calcule a circunferência (perímetro) de um círculo usando raio ou diâmetro",
      inputMethod: "Método de Entrada",
      radius: "Raio",
      diameter: "Diâmetro",
      value: "Valor",
      circleCircumference: "Circunferência do Círculo",
      radiusValue: "Raio",
      diameterValue: "Diâmetro",
      area: "Área",
      formulaUsed: "Fórmula Usada",
      enterValue: "Digite raio ou diâmetro acima",
      units: "unidades",
      areaUnits: "unidades quadradas",
      formulaRadius: "C = 2 × π × r",
      formulaDiameter: "C = π × d",
      step1: "Passo 1: Identificar o valor dado",
      step2: "Passo 2: Aplicar a fórmula apropriada",
      step3: "Passo 3: Calcular o resultado",
      visualExplanation: "Explicação Visual",
      circleWithCircumference: "Círculo mostrando trajetória de circunferência",
      circumferenceDefinition: "A circunferência é a distância ao redor do círculo"
    },
    fr: {
      title: "Calculateur de Circonférence de Cercle",
      description: "Calculez la circonférence (périmètre) d'un cercle en utilisant rayon ou diamètre",
      inputMethod: "Méthode d'Entrée",
      radius: "Rayon",
      diameter: "Diamètre",
      value: "Valeur",
      circleCircumference: "Circonférence du Cercle",
      radiusValue: "Rayon",
      diameterValue: "Diamètre",
      area: "Aire",
      formulaUsed: "Formule Utilisée",
      enterValue: "Entrez rayon ou diamètre ci-dessus",
      units: "unités",
      areaUnits: "unités carrées",
      formulaRadius: "C = 2 × π × r",
      formulaDiameter: "C = π × d",
      step1: "Étape 1: Identifier la valeur donnée",
      step2: "Étape 2: Appliquer la formule appropriée",
      step3: "Étape 3: Calculer le résultat",
      visualExplanation: "Explication Visuelle",
      circleWithCircumference: "Cercle montrant trajet de circonférence",
      circumferenceDefinition: "La circonférence est la distance autour du cercle"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateCircumference = () => {
    let r: number, d: number, c: number, a: number, f: string;

    if (inputMethod === 'radius') {
      r = value;
      d = r * 2;
      c = 2 * Math.PI * r;
      f = t.formulaRadius;
    } else {
      d = value;
      r = d / 2;
      c = Math.PI * d;
      f = t.formulaDiameter;
    }

    a = Math.PI * r * r;

    setCircumference(c);
    setRadius(r);
    setDiameter(d);
    setArea(a);
    setFormula(f);
  };

  useEffect(() => {
    calculateCircumference();
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
                  <circle cx="100" cy="100" r="80" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="3" strokeDasharray="5,5"/>
                  <circle cx="100" cy="100" r="75" fill="none" stroke="#EF4444" strokeWidth="2"/>
                  {inputMethod === 'radius' && (
                    <line x1="100" y1="100" x2="175" y2="100" stroke="#EF4444" strokeWidth="2"/>
                  )}
                  {inputMethod === 'diameter' && (
                    <line x1="25" y1="100" x2="175" y2="100" stroke="#EF4444" strokeWidth="2"/>
                  )}
                </svg>
                <div className="text-center mt-2 text-sm text-gray-600">
                  <div className="font-semibold">{t.circleWithCircumference}</div>
                  <div className="mt-1">{t.circumferenceDefinition}</div>
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
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.circleCircumference}</h3>
            <div className="text-3xl font-bold text-blue-600 min-h-[48px] flex items-center">
              {circumference.toFixed(4)} {t.units}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">{t.radiusValue}</h4>
              <div className="text-lg font-bold text-purple-600">
                {radius.toFixed(2)} {t.units}
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-orange-900 mb-1">{t.diameterValue}</h4>
              <div className="text-lg font-bold text-orange-600">
                {diameter.toFixed(2)} {t.units}
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.area}</h4>
            <div className="text-xl font-bold text-green-600">
              {area.toFixed(4)} {t.areaUnits}
            </div>
          </div>

          {/* Step-by-step solution */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Step-by-Step Solution</h4>
            <div className="space-y-2 text-sm">
              <div><strong>{t.step1}:</strong> {inputMethod === 'radius' ? t.radius.toLowerCase() : t.diameter.toLowerCase()} = {value}</div>
              <div><strong>{t.step2}:</strong> {formula}</div>
              <div><strong>{t.step3}:</strong> {circumference.toFixed(4)} {t.units}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
