'use client';

import { useState, useEffect } from 'react';

interface TriangleAreaCalculatorProps {
  lang?: string;
}

export default function TriangleAreaCalculator({ lang = 'en' }: TriangleAreaCalculatorProps) {
  const [method, setMethod] = useState<'baseHeight' | 'heronsFormula' | 'twoSidesAngle'>('baseHeight');
  const [base, setBase] = useState(10);
  const [height, setHeight] = useState(8);
  const [sideA, setSideA] = useState(5);
  const [sideB, setSideB] = useState(5);
  const [sideC, setSideC] = useState(6);
  const [angle, setAngle] = useState(60);
  const [area, setArea] = useState(0);
  const [perimeter, setPerimeter] = useState(0);
  const [semiperimeter, setSemiperimeter] = useState(0);
  const [formula, setFormula] = useState('');

  const translations = {
    en: {
      title: "Triangle Area Calculator",
      description: "Calculate the area of triangles using multiple methods",
      method: "Calculation Method",
      baseHeight: "Base & Height",
      heronsFormula: "Heron's Formula (3 Sides)",
      twoSidesAngle: "Two Sides & Angle",
      base: "Base",
      height: "Height",
      sideA: "Side A",
      sideB: "Side B",
      sideC: "Side C",
      angle: "Angle (degrees)",
      triangleArea: "Triangle Area",
      perimeter: "Perimeter",
      semiperimeter: "Semiperimeter",
      formulaUsed: "Formula Used",
      enterValues: "Enter values above",
      units: "square units",
      perimeterUnits: "units",
      formulaBaseHeight: "A = (base × height) ÷ 2",
      formulaHeron: "A = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)÷2",
      formulaAngle: "A = (sideA × sideB × sin(angle)) ÷ 2",
      step1: "Step 1: Identify the given values",
      step2: "Step 2: Apply the appropriate formula",
      step3: "Step 3: Calculate the result",
      visualExplanation: "Visual Explanation",
      triangleBaseHeight: "Triangle with base and height",
      triangleThreeSides: "Triangle with three sides",
      triangleTwoSidesAngle: "Triangle with two sides and included angle",
      calculate: "🔄 Recalculate",
      reset: "Reset"
    },
    es: {
      title: "Calculadora del Área del Triángulo",
      description: "Calcula el área de triángulos usando múltiples métodos",
      method: "Método de Cálculo",
      baseHeight: "Base y Altura",
      heronsFormula: "Fórmula de Herón (3 Lados)",
      twoSidesAngle: "Dos Lados y Ángulo",
      base: "Base",
      height: "Altura",
      sideA: "Lado A",
      sideB: "Lado B",
      sideC: "Lado C",
      angle: "Ángulo (grados)",
      triangleArea: "Área del Triángulo",
      perimeter: "Perímetro",
      semiperimeter: "Semiperímetro",
      formulaUsed: "Fórmula Usada",
      enterValues: "Ingresa valores arriba",
      units: "unidades cuadradas",
      perimeterUnits: "unidades",
      formulaBaseHeight: "A = (base × altura) ÷ 2",
      formulaHeron: "A = √[s(s-a)(s-b)(s-c)] donde s = (a+b+c)÷2",
      formulaAngle: "A = (ladoA × ladoB × sen(ángulo)) ÷ 2",
      step1: "Paso 1: Identificar los valores dados",
      step2: "Paso 2: Aplicar la fórmula apropiada",
      step3: "Paso 3: Calcular el resultado",
      visualExplanation: "Explicación Visual",
      triangleBaseHeight: "Triángulo con base y altura",
      triangleThreeSides: "Triángulo con tres lados",
      triangleTwoSidesAngle: "Triángulo con dos lados y ángulo incluido",
      calculate: "🔄 Recalcular",
      reset: "Restablecer"
    },
    pt: {
      title: "Calculadora da Área do Triângulo",
      description: "Calcule a área de triângulos usando múltiplos métodos",
      method: "Método de Cálculo",
      baseHeight: "Base e Altura",
      heronsFormula: "Fórmula de Heron (3 Lados)",
      twoSidesAngle: "Dois Lados e Ângulo",
      base: "Base",
      height: "Altura",
      sideA: "Lado A",
      sideB: "Lado B",
      sideC: "Lado C",
      angle: "Ângulo (graus)",
      triangleArea: "Área do Triângulo",
      perimeter: "Perímetro",
      semiperimeter: "Semiperímetro",
      formulaUsed: "Fórmula Usada",
      enterValues: "Digite valores acima",
      units: "unidades quadradas",
      perimeterUnits: "unidades",
      formulaBaseHeight: "A = (base × altura) ÷ 2",
      formulaHeron: "A = √[s(s-a)(s-b)(s-c)] onde s = (a+b+c)÷2",
      formulaAngle: "A = (ladoA × ladoB × sen(ângulo)) ÷ 2",
      step1: "Passo 1: Identificar os valores dados",
      step2: "Passo 2: Aplicar a fórmula apropriada",
      step3: "Passo 3: Calcular o resultado",
      visualExplanation: "Explicação Visual",
      triangleBaseHeight: "Triângulo com base e altura",
      triangleThreeSides: "Triângulo com três lados",
      triangleTwoSidesAngle: "Triângulo com dois lados e ângulo incluído",
      calculate: "🔄 Recalcular",
      reset: "Redefinir"
    },
    fr: {
      title: "Calculateur d'Aire de Triangle",
      description: "Calculez l'aire de triangles utilisant multiples méthodes",
      method: "Méthode de Calcul",
      baseHeight: "Base et Hauteur",
      heronsFormula: "Formule de Heron (3 Côtés)",
      twoSidesAngle: "Deux Côtés et Angle",
      base: "Base",
      height: "Hauteur",
      sideA: "Côté A",
      sideB: "Côté B",
      sideC: "Côté C",
      angle: "Angle (degrés)",
      triangleArea: "Aire du Triangle",
      perimeter: "Périmètre",
      semiperimeter: "Demi-périmètre",
      formulaUsed: "Formule Utilisée",
      enterValues: "Entrez valeurs ci-dessus",
      units: "unités carrées",
      perimeterUnits: "unités",
      formulaBaseHeight: "A = (base × hauteur) ÷ 2",
      formulaHeron: "A = √[s(s-a)(s-b)(s-c)] où s = (a+b+c)÷2",
      formulaAngle: "A = (côtéA × côtéB × sin(angle)) ÷ 2",
      step1: "Étape 1: Identifier les valeurs données",
      step2: "Étape 2: Appliquer la formule appropriée",
      step3: "Étape 3: Calculer le résultat",
      visualExplanation: "Explication Visuelle",
      triangleBaseHeight: "Triangle avec base et hauteur",
      triangleThreeSides: "Triangle avec trois côtés",
      triangleTwoSidesAngle: "Triangle avec deux côtés et angle inclus",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateTriangleArea = () => {
    let calculatedArea = 0;
    let calculatedPerimeter = 0;
    let calculatedSemiperimeter = 0;
    let formulaText = '';

    switch (method) {
      case 'baseHeight':
        calculatedArea = (base * height) / 2;
        formulaText = t.formulaBaseHeight;
        break;

      case 'heronsFormula':
        calculatedPerimeter = sideA + sideB + sideC;
        calculatedSemiperimeter = calculatedPerimeter / 2;
        const heronCalculation = calculatedSemiperimeter *
          (calculatedSemiperimeter - sideA) *
          (calculatedSemiperimeter - sideB) *
          (calculatedSemiperimeter - sideC);
        calculatedArea = Math.sqrt(heronCalculation);
        formulaText = t.formulaHeron;
        break;

      case 'twoSidesAngle':
        const angleInRadians = (angle * Math.PI) / 180;
        calculatedArea = (sideA * sideB * Math.sin(angleInRadians)) / 2;
        formulaText = t.formulaAngle;
        break;

      default:
        return;
    }

    setArea(calculatedArea);
    setPerimeter(calculatedPerimeter);
    setSemiperimeter(calculatedSemiperimeter);
    setFormula(formulaText);
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
    calculateTriangleArea();
  }, [method, base, height, sideA, sideB, sideC, angle, lang]);

  const renderInputs = () => {
    switch (method) {
      case 'baseHeight':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.base}</label>
              <input
                type="number"
                value={base}
                onChange={(e) => setBase(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.height}</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
          </>
        );

      case 'heronsFormula':
        return (
          <>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">{t.sideA}</label>
                <input
                  type="number"
                  value={sideA}
                  onChange={(e) => setSideA(Number(e.target.value) || 0)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">{t.sideB}</label>
                <input
                  type="number"
                  value={sideB}
                  onChange={(e) => setSideB(Number(e.target.value) || 0)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">{t.sideC}</label>
                <input
                  type="number"
                  value={sideC}
                  onChange={(e) => setSideC(Number(e.target.value) || 0)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </>
        );

      case 'twoSidesAngle':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.sideA}</label>
                <input
                  type="number"
                  value={sideA}
                  onChange={(e) => setSideA(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.sideB}</label>
                <input
                  type="number"
                  value={sideB}
                  onChange={(e) => setSideB(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.angle}</label>
              <input
                type="number"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="180"
                step="0.1"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

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
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.method}</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as 'baseHeight' | 'heronsFormula' | 'twoSidesAngle')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="baseHeight">{t.baseHeight}</option>
              <option value="heronsFormula">{t.heronsFormula}</option>
              <option value="twoSidesAngle">{t.twoSidesAngle}</option>
            </select>
          </div>

          {renderInputs()}

          {/* Visual Triangle */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">{t.visualExplanation}</h3>
            <div className="flex justify-center">
              <div className="relative">
                <svg width="200" height="150" viewBox="0 0 200 150" className="border border-gray-300 rounded">
                  {method === 'baseHeight' && (
                    <>
                      <polygon points="50,120 150,120 100,30" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
                      <line x1="50" y1="120" x2="150" y2="120" stroke="#EF4444" strokeWidth="2"/>
                      <text x="100" y="135" fontSize="12" fill="#EF4444">base = {base}</text>
                      <line x1="100" y1="30" x2="100" y2="120" stroke="#10B981" strokeWidth="2"/>
                      <text x="105" y="75" fontSize="12" fill="#10B981">height = {height}</text>
                    </>
                  )}
                  {method === 'heronsFormula' && (
                    <>
                      <polygon points="75,100 125,40 175,100" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
                      <text x="75" y="115" fontSize="10" fill="#EF4444">a = {sideA}</text>
                      <text x="125" y="25" fontSize="10" fill="#10B981">b = {sideB}</text>
                      <text x="180" y="115" fontSize="10" fill="#8B5CF6">c = {sideC}</text>
                    </>
                  )}
                  {method === 'twoSidesAngle' && (
                    <>
                      <polygon points="50,120 150,120 100,30" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
                      <text x="45" y="135" fontSize="10" fill="#EF4444">side A = {sideA}</text>
                      <text x="155" y="135" fontSize="10" fill="#10B981">side B = {sideB}</text>
                      <text x="100" y="55" fontSize="10" fill="#8B5CF6">∠ = {angle}°</text>
                    </>
                  )}
                </svg>
                <div className="text-center mt-2 text-sm text-gray-600">
                  {method === 'baseHeight' && t.triangleBaseHeight}
                  {method === 'heronsFormula' && t.triangleThreeSides}
                  {method === 'twoSidesAngle' && t.triangleTwoSidesAngle}
                </div>
              </div>
            </div>
          </div>

          {/* Formula Display */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.formulaUsed}</h4>
            <div className="text-sm font-mono text-green-700">{formula}
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateTriangleArea}
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
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.triangleArea}</h3>
            <div className="text-3xl font-bold text-blue-600 min-h-[48px] flex items-center">
              {area.toFixed(4)} {t.units}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">{t.perimeter}</h4>
              <div className="text-lg font-bold text-purple-600">
                {method === 'heronsFormula' ? perimeter.toFixed(2) : 'N/A'} {method === 'heronsFormula' ? t.perimeterUnits : ''}
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-orange-900 mb-1">{t.semiperimeter}</h4>
              <div className="text-lg font-bold text-orange-600">
                {method === 'heronsFormula' ? semiperimeter.toFixed(2) : 'N/A'} {method === 'heronsFormula' ? t.perimeterUnits : ''}
              </div>
            </div>
          </div>

          {/* Step-by-step solution */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Step-by-Step Solution</h4>
            <div className="space-y-2 text-sm">
              <div><strong>{t.step1}:</strong> {
                method === 'baseHeight' ? `Base = ${base}, Height = ${height}` :
                method === 'heronsFormula' ? `Sides = ${sideA}, ${sideB}, ${sideC}` :
                `Sides = ${sideA}, ${sideB}, Angle = ${angle}°`
              }</div>
              <div><strong>{t.step2}:</strong> {formula}</div>
              <div><strong>{t.step3}:</strong> {area.toFixed(4)} {t.units}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
