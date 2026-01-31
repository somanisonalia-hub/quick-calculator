'use client';

import { useState, useEffect } from 'react';

interface PythagoreanTheoremCalculatorProps {
  lang?: string;
}

export default function PythagoreanTheoremCalculator({ lang = 'en' }: PythagoreanTheoremCalculatorProps) {
  const [calculateSide, setCalculateSide] = useState<'a' | 'b' | 'c'>('c');
  const [sideA, setSideA] = useState(3);
  const [sideB, setSideB] = useState(4);
  const [sideC, setSideC] = useState(0);
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState('');
  const [steps, setSteps] = useState('');
  const [triangleType, setTriangleType] = useState('');

  const translations = {
    en: {
      title: "Pythagorean Theorem Calculator",
      description: "Calculate missing sides of right triangles using a² + b² = c²",
      calculate: "Calculate",
      sideA: "Side a",
      sideB: "Side b",
      sideC: "Side c (hypotenuse)",
      calculatedSide: "Calculated Side",
      formulaUsed: "Formula Used",
      stepByStep: "Step-by-Step Solution",
      triangleType: "Triangle Type",
      enterValues: "Enter values above",
      units: "units",
      formulaPythagorean: "a² + b² = c²",
      step1: "Step 1: Identify known sides",
      step2: "Step 2: Apply Pythagorean theorem",
      step3: "Step 3: Solve for unknown side",
      visualExplanation: "Visual Explanation",
      rightTriangle: "Right triangle with sides a, b, c",
      rightAngle: "Right angle (90°)",
      validRightTriangle: "Valid right triangle",
      notRightTriangle: "Not a right triangle",
      pythagoreanTheorem: "Pythagorean Theorem",
      theoremExplanation: "In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides",
      stepsAppear: "Steps will appear here"
    },
    es: {
      title: "Calculadora del Teorema de Pitágoras",
      description: "Calcula lados faltantes de triángulos rectángulos usando a² + b² = c²",
      calculate: "Calcular",
      sideA: "Lado a",
      sideB: "Lado b",
      sideC: "Lado c (hipotenusa)",
      calculatedSide: "Lado Calculado",
      formulaUsed: "Fórmula Usada",
      stepByStep: "Solución Paso a Paso",
      triangleType: "Tipo de Triángulo",
      enterValues: "Ingresa valores arriba",
      units: "unidades",
      formulaPythagorean: "a² + b² = c²",
      step1: "Paso 1: Identificar lados conocidos",
      step2: "Paso 2: Aplicar teorema de Pitágoras",
      step3: "Paso 3: Resolver lado desconocido",
      visualExplanation: "Explicación Visual",
      rightTriangle: "Triángulo rectángulo con lados a, b, c",
      rightAngle: "Ángulo recto (90°)",
      validRightTriangle: "Triángulo rectángulo válido",
      notRightTriangle: "No es triángulo rectángulo",
      pythagoreanTheorem: "Teorema de Pitágoras",
      theoremExplanation: "En un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de cuadrados de los otros dos lados",
      stepsAppear: "Los pasos aparecerán aquí"
    },
    pt: {
      title: "Calculadora do Teorema de Pitágoras",
      description: "Calcule lados faltantes de triângulos retângulos usando a² + b² = c²",
      calculate: "Calcular",
      sideA: "Lado a",
      sideB: "Lado b",
      sideC: "Lado c (hipotenusa)",
      calculatedSide: "Lado Calculado",
      formulaUsed: "Fórmula Usada",
      stepByStep: "Solução Passo a Passo",
      triangleType: "Tipo de Triângulo",
      enterValues: "Digite valores acima",
      units: "unidades",
      formulaPythagorean: "a² + b² = c²",
      step1: "Passo 1: Identificar lados conhecidos",
      step2: "Passo 2: Aplicar teorema de Pitágoras",
      step3: "Passo 3: Resolver lado desconhecido",
      visualExplanation: "Explicação Visual",
      rightTriangle: "Triângulo retângulo com lados a, b, c",
      rightAngle: "Ângulo reto (90°)",
      validRightTriangle: "Triângulo retângulo válido",
      notRightTriangle: "Não é triângulo retângulo",
      pythagoreanTheorem: "Teorema de Pitágoras",
      theoremExplanation: "Em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos outros dois lados",
      stepsAppear: "Os passos aparecerão aqui"
    },
    fr: {
      title: "Calculateur du Théorème de Pythagore",
      description: "Calculez côtés manquants de triangles rectangles utilisant a² + b² = c²",
      calculate: "Calculer",
      sideA: "Côté a",
      sideB: "Côté b",
      sideC: "Côté c (hypoténuse)",
      calculatedSide: "Côté Calculé",
      formulaUsed: "Formule Utilisée",
      stepByStep: "Solution Étape par Étape",
      triangleType: "Type de Triangle",
      enterValues: "Entrez valeurs ci-dessus",
      units: "unités",
      formulaPythagorean: "a² + b² = c²",
      step1: "Étape 1: Identifier côtés connus",
      step2: "Étape 2: Appliquer théorème de Pythagore",
      step3: "Étape 3: Résoudre côté inconnu",
      visualExplanation: "Explication Visuelle",
      rightTriangle: "Triangle rectangle avec côtés a, b, c",
      rightAngle: "Angle droit (90°)",
      validRightTriangle: "Triangle rectangle valide",
      notRightTriangle: "Pas un triangle rectangle",
      pythagoreanTheorem: "Théorème de Pythagore",
      theoremExplanation: "Dans un triangle rectangle, le carré de l'hypoténuse égale la somme des carrés des deux autres côtés",
      stepsAppear: "Les étapes apparaîtront ici"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculatePythagorean = () => {
    let calculatedResult = 0;
    let formulaText = t.formulaPythagorean;
    let stepsText = '';
    let triangleTypeText = '';

    switch (calculateSide) {
      case 'c':
        // Calculate hypotenuse: c = √(a² + b²)
        calculatedResult = Math.sqrt(sideA * sideA + sideB * sideB);
        stepsText = `${t.step1}: a = ${sideA}, b = ${sideB}\n${t.step2}: c² = a² + b²\n${t.step3}: c² = ${sideA}² + ${sideB}² = ${sideA * sideA} + ${sideB * sideB} = ${(sideA * sideA + sideB * sideB).toFixed(0)}\nc = √${(sideA * sideA + sideB * sideB).toFixed(0)} = ${calculatedResult.toFixed(4)}`;
        break;

      case 'a':
        // Calculate side a: a = √(c² - b²)
        if (sideC <= sideB) {
          calculatedResult = NaN;
          stepsText = 'Error: Hypotenuse must be longer than other sides';
        } else {
          calculatedResult = Math.sqrt(sideC * sideC - sideB * sideB);
          stepsText = `${t.step1}: b = ${sideB}, c = ${sideC}\n${t.step2}: a² = c² - b²\n${t.step3}: a² = ${sideC}² - ${sideB}² = ${sideC * sideC} - ${sideB * sideB} = ${(sideC * sideC - sideB * sideB).toFixed(0)}\na = √${(sideC * sideC - sideB * sideB).toFixed(0)} = ${calculatedResult.toFixed(4)}`;
        }
        break;

      case 'b':
        // Calculate side b: b = √(c² - a²)
        if (sideC <= sideA) {
          calculatedResult = NaN;
          stepsText = 'Error: Hypotenuse must be longer than other sides';
        } else {
          calculatedResult = Math.sqrt(sideC * sideC - sideA * sideA);
          stepsText = `${t.step1}: a = ${sideA}, c = ${sideC}\n${t.step2}: b² = c² - a²\n${t.step3}: b² = ${sideC}² - ${sideA}² = ${sideC * sideC} - ${sideA * sideA} = ${(sideC * sideC - sideA * sideA).toFixed(0)}\nb = √${(sideC * sideC - sideA * sideA).toFixed(0)} = ${calculatedResult.toFixed(4)}`;
        }
        break;
    }

    // Check if it's a valid right triangle when all sides are provided
    if (calculateSide === 'c' && sideA > 0 && sideB > 0 && calculatedResult > 0) {
      const expectedC = calculatedResult;
      const checkSum = sideA * sideA + sideB * sideB;
      const actualCSquared = expectedC * expectedC;
      if (Math.abs(checkSum - actualCSquared) < 0.0001) {
        triangleTypeText = t.validRightTriangle;
      } else {
        triangleTypeText = t.notRightTriangle;
      }
    } else if (calculateSide !== 'c' && sideA > 0 && sideB > 0 && sideC > 0) {
      const checkSum = sideA * sideA + sideB * sideB;
      const cSquared = sideC * sideC;
      if (Math.abs(checkSum - cSquared) < 0.0001) {
        triangleTypeText = t.validRightTriangle;
      } else {
        triangleTypeText = t.notRightTriangle;
      }
    }

    setResult(calculatedResult);
    setFormula(formulaText);
    setSteps(stepsText);
    setTriangleType(triangleTypeText);
  };

  useEffect(() => {
    calculatePythagorean();
  }, [calculateSide, sideA, sideB, sideC, lang]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.calculate} Side
            </label>
            <select
              value={calculateSide}
              onChange={(e) => setCalculateSide(e.target.value as 'a' | 'b' | 'c')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="a">{t.sideA}</option>
              <option value="b">{t.sideB}</option>
              <option value="c">{t.sideC}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.sideA}</label>
              <input
                type="number"
                value={sideA}
                onChange={(e) => setSideA(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
                disabled={calculateSide === 'a'}
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
                disabled={calculateSide === 'b'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.sideC}</label>
              <input
                type="number"
                value={sideC}
                onChange={(e) => setSideC(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
                disabled={calculateSide === 'c'}
              />
            </div>
          </div>

          {/* Visual Right Triangle */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">{t.visualExplanation}</h3>
            <div className="flex justify-center">
              <div className="relative">
                <svg width="200" height="150" viewBox="0 0 200 150" className="border border-gray-300 rounded">
                  <polygon points="50,120 50,30 150,120" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2"/>
                  <line x1="50" y1="120" x2="150" y2="120" stroke="#EF4444" strokeWidth="2"/>
                  <line x1="50" y1="30" x2="50" y2="120" stroke="#10B981" strokeWidth="2"/>
                  <line x1="50" y1="30" x2="150" y2="120" stroke="#8B5CF6" strokeWidth="2"/>
                  <text x="100" y="135" fontSize="12" fill="#EF4444">a = {sideA}</text>
                  <text x="25" y="75" fontSize="12" fill="#10B981">b = {sideB}</text>
                  <text x="100" y="65" fontSize="12" fill="#8B5CF6">c = {calculateSide === 'c' ? result.toFixed(1) : sideC}</text>
                  <text x="45" y="110" fontSize="14" fill="#DC2626">90°</text>
                </svg>
                <div className="text-center mt-2 text-sm text-gray-600">
                  <div className="font-semibold">{t.rightTriangle}</div>
                  <div className="mt-1">{t.rightAngle}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Theorem Explanation */}
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.pythagoreanTheorem}</h4>
            <p className="text-sm text-green-700">{t.theoremExplanation}</p>
            <div className="mt-2 text-lg font-mono text-green-800">{t.formulaPythagorean}</div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.calculatedSide}</h3>
            <div className="text-3xl font-bold text-blue-600 min-h-[48px] flex items-center">
              {isNaN(result) ? 'Invalid input' : result.toFixed(4)} {isNaN(result) ? '' : t.units}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.formulaUsed}</h4>
            <div className="text-lg font-mono text-green-700">{formula}</div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">{t.stepByStep}</h4>
            <div className="text-sm text-purple-700 whitespace-pre-line font-mono">
              {steps || t.stepsAppear}
            </div>
          </div>

          {triangleType && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-orange-900 mb-2">{t.triangleType}</h4>
              <div className="text-lg font-bold text-orange-600">{triangleType}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
