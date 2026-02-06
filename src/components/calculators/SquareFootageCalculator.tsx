'use client';

import { useState, useEffect } from 'react';

interface SquareFootageCalculatorProps {
  lang?: string;
}

export default function SquareFootageCalculator({ lang = 'en' }: SquareFootageCalculatorProps) {
  const [shape, setShape] = useState<'rectangle' | 'circle' | 'triangle' | 'square' | 'irregular'>('rectangle');
  const [unit, setUnit] = useState<'feet' | 'meters'>('feet');

  // Rectangle/Square dimensions
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(8);

  // Circle dimensions
  const [radius, setRadius] = useState(5);
  const [diameter, setDiameter] = useState(10);

  // Triangle dimensions
  const [base, setBase] = useState(10);
  const [height, setHeight] = useState(6);

  // Irregular shape (approximation)
  const [side1, setSide1] = useState(8);
  const [side2, setSide2] = useState(6);
  const [side3, setSide3] = useState(5);

  const [results, setResults] = useState({
    areaSqFt: 0,
    areaSqM: 0,
    areaSqIn: 0,
    areaSqYd: 0,
    perimeter: 0
  });

  const translations = {
    en: {
      title: "Square Footage Calculator",
      description: "Calculate area in square feet and square meters for various shapes",
      shape: "Shape",
      rectangle: "Rectangle",
      circle: "Circle",
      triangle: "Triangle",
      square: "Square",
      irregular: "Irregular (Approximation)",
      unit: "Unit System",
      feet: "Feet",
      meters: "Meters",
      dimensions: "Dimensions",
      length: "Length",
      width: "Width",
      radius: "Radius",
      diameter: "Diameter",
      base: "Base",
      height: "Height",
      side1: "Side 1",
      side2: "Side 2",
      side3: "Side 3",
      calculate: "Calculate Area",
      reset: "Reset",
      results: "Area Results",
      squareFeet: "Square Feet",
      squareMeters: "Square Meters",
      squareInches: "Square Inches",
      squareYards: "Square Yards",
      perimeter: "Perimeter",
      formula: "Formula Used",
      commonConversions: "Common Conversions",
      areaExamples: "Area Examples"
    },
    es: {
      title: "Calculadora de Metros Cuadrados",
      description: "Calcula área en pies cuadrados y metros cuadrados para varias formas",
      shape: "Forma",
      rectangle: "Rectángulo",
      circle: "Círculo",
      triangle: "Triángulo",
      square: "Cuadrado",
      irregular: "Irregular (Aproximación)",
      unit: "Sistema de Unidades",
      feet: "Pies",
      meters: "Metros",
      dimensions: "Dimensiones",
      length: "Longitud",
      width: "Anchura",
      radius: "Radio",
      diameter: "Diámetro",
      base: "Base",
      height: "Altura",
      side1: "Lado 1",
      side2: "Lado 2",
      side3: "Lado 3",
      calculate: "Calcular Área",
      reset: "Reiniciar",
      results: "Resultados de Área",
      squareFeet: "Pies Cuadrados",
      squareMeters: "Metros Cuadrados",
      squareInches: "Pulgadas Cuadradas",
      squareYards: "Yardas Cuadradas",
      perimeter: "Perímetro",
      formula: "Fórmula Utilizada",
      commonConversions: "Conversiones Comunes",
      areaExamples: "Ejemplos de Área"
    },
    pt: {
      title: "Calculadora de Área",
      description: "Calcule área em pés quadrados e metros quadrados para várias formas",
      shape: "Forma",
      rectangle: "Retângulo",
      circle: "Círculo",
      triangle: "Triângulo",
      square: "Quadrado",
      irregular: "Irregular (Aproximação)",
      unit: "Sistema de Unidades",
      feet: "Pés",
      meters: "Metros",
      dimensions: "Dimensões",
      length: "Comprimento",
      width: "Largura",
      radius: "Raio",
      diameter: "Diâmetro",
      base: "Base",
      height: "Altura",
      side1: "Lado 1",
      side2: "Lado 2",
      side3: "Lado 3",
      calculate: "Calcular Área",
      reset: "Reiniciar",
      results: "Resultados de Área",
      squareFeet: "Pés Quadrados",
      squareMeters: "Metros Quadrados",
      squareInches: "Polegadas Quadradas",
      squareYards: "Jardas Quadradas",
      perimeter: "Perímetro",
      formula: "Fórmula Utilizada",
      commonConversions: "Conversões Comuns",
      areaExamples: "Exemplos de Área"
    },
    fr: {
      title: "Calculateur de Superficie",
      description: "Calculez l'aire en pieds carrés et mètres carrés pour diverses formes",
      shape: "Forme",
      rectangle: "Rectangle",
      circle: "Cercle",
      triangle: "Triangle",
      square: "Carré",
      irregular: "Irrégulier (Approximation)",
      unit: "Système d'Unités",
      feet: "Pieds",
      meters: "Mètres",
      dimensions: "Dimensions",
      length: "Longueur",
      width: "Largeur",
      radius: "Rayon",
      diameter: "Diamètre",
      base: "Base",
      height: "Hauteur",
      side1: "Côté 1",
      side2: "Côté 2",
      side3: "Côté 3",
      calculate: "Calculer Aire",
      reset: "Réinitialiser",
      results: "Résultats d'Aire",
      squareFeet: "Pieds Carrés",
      squareMeters: "Mètres Carrés",
      squareInches: "Pouces Carrés",
      squareYards: "Yardas Carrées",
      perimeter: "Périmètre",
      formula: "Formule Utilisée",
      commonConversions: "Conversions Courantes",
      areaExamples: "Exemples d'Aire"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateArea = () => {
    let areaSqFt = 0;
    let perimeter = 0;

    switch (shape) {
      case 'rectangle':
        areaSqFt = length * width;
        perimeter = 2 * (length + width);
        break;
      case 'square':
        areaSqFt = length * length;
        perimeter = 4 * length;
        break;
      case 'circle':
        areaSqFt = Math.PI * radius * radius;
        perimeter = 2 * Math.PI * radius;
        break;
      case 'triangle':
        areaSqFt = (base * height) / 2;
        // Approximate perimeter for triangle
        perimeter = base + height + Math.sqrt(base * base + height * height);
        break;
      case 'irregular':
        // Approximate irregular shape as average of three sides
        areaSqFt = (side1 + side2 + side3) / 3 * Math.sqrt(3) / 2; // Rough approximation
        perimeter = side1 + side2 + side3;
        break;
    }

    // Convert to other units
    const areaSqM = areaSqFt * 0.092903;
    const areaSqIn = areaSqFt * 144;
    const areaSqYd = areaSqFt / 9;

    setResults({
      areaSqFt,
      areaSqM,
      areaSqIn,
      areaSqYd,
      perimeter
    });
  };

  useEffect(() => {
    calculateArea();
  }, [shape, unit, length, width, radius, diameter, base, height, side1, side2, side3]);

  const resetCalculator = () => {
    setShape('rectangle');
    setUnit('feet');
    setLength(10);
    setWidth(8);
    setRadius(5);
    setDiameter(10);
    setBase(10);
    setHeight(6);
    setSide1(8);
    setSide2(6);
    setSide3(5);
  };

  const renderDimensions = () => {
    switch (shape) {
      case 'rectangle':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.length} ({unit === 'feet' ? 'ft' : 'm'})</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.width} ({unit === 'feet' ? 'ft' : 'm'})</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        );

      case 'square':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.length} ({unit === 'feet' ? 'ft' : 'm'})</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0.1"
              step="0.1"
            />
          </div>
        );

      case 'circle':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.radius} ({unit === 'feet' ? 'ft' : 'm'})</label>
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0.1"
              step="0.1"
            />
            <p className="text-xs text-gray-500 mt-1">Diameter: {(radius * 2).toFixed(2)} {unit === 'feet' ? 'ft' : 'm'}</p>
          </div>
        );

      case 'triangle':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.base} ({unit === 'feet' ? 'ft' : 'm'})</label>
              <input
                type="number"
                value={base}
                onChange={(e) => setBase(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.height} ({unit === 'feet' ? 'ft' : 'm'})</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        );

      case 'irregular':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.side1} ({unit === 'feet' ? 'ft' : 'm'})</label>
              <input
                type="number"
                value={side1}
                onChange={(e) => setSide1(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.side2} ({unit === 'feet' ? 'ft' : 'm'})</label>
              <input
                type="number"
                value={side2}
                onChange={(e) => setSide2(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.side3} ({unit === 'feet' ? 'ft' : 'm'})</label>
              <input
                type="number"
                value={side3}
                onChange={(e) => setSide3(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getFormula = () => {
    switch (shape) {
      case 'rectangle':
        return 'Area = Length × Width';
      case 'square':
        return 'Area = Side × Side';
      case 'circle':
        return 'Area = π × r²';
      case 'triangle':
        return 'Area = (Base × Height) ÷ 2';
      case 'irregular':
        return 'Area ≈ Average sides × √3 ÷ 2 (Approximation)';
      default:
        return '';
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
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.shape}</label>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value as 'rectangle' | 'circle' | 'triangle' | 'square' | 'irregular')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rectangle">{t.rectangle}</option>
              <option value="square">{t.square}</option>
              <option value="circle">{t.circle}</option>
              <option value="triangle">{t.triangle}</option>
              <option value="irregular">{t.irregular}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.unit}</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'feet' | 'meters')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="feet">{t.feet}</option>
              <option value="meters">{t.meters}</option>
            </select>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.dimensions}</h3>
            {renderDimensions()}
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateArea}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.calculate}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t.reset}
            </button>
          </div>

          {/* Formula Display */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.formula}</h4>
            <div className="text-sm font-mono text-green-700">
              {getFormula()}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">{t.results}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border">
                <div className="text-sm text-gray-600">{t.squareFeet}</div>
                <div className="text-lg font-bold text-blue-600">{results.areaSqFt.toFixed(2)}</div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="text-sm text-gray-600">{t.squareMeters}</div>
                <div className="text-lg font-bold text-blue-600">{results.areaSqM.toFixed(2)}</div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="text-sm text-gray-600">{t.squareInches}</div>
                <div className="text-lg font-bold text-blue-600">{results.areaSqIn.toFixed(0)}</div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="text-sm text-gray-600">{t.squareYards}</div>
                <div className="text-lg font-bold text-blue-600">{results.areaSqYd.toFixed(2)}</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-300">
              <div className="text-sm text-gray-600">{t.perimeter}</div>
              <div className="text-lg font-bold text-blue-600">{results.perimeter.toFixed(2)} {unit === 'feet' ? 'ft' : 'm'}</div>
            </div>
          </div>

          {/* Shape Visualization */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">Shape Preview</h4>
            <div className="flex justify-center">
              <div className="relative">
                {shape === 'rectangle' && (
                  <svg width="150" height="100" viewBox="0 0 150 100" className="border border-gray-300">
                    <rect x="25" y="25" width="100" height="50" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="75" y="90" fontSize="10" fill="#6B7280" textAnchor="middle">
                      {length}' × {width}'
                    </text>
                  </svg>
                )}
                {shape === 'square' && (
                  <svg width="120" height="120" viewBox="0 0 120 120" className="border border-gray-300">
                    <rect x="20" y="20" width="80" height="80" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="60" y="110" fontSize="10" fill="#6B7280" textAnchor="middle">
                      {length}' × {length}'
                    </text>
                  </svg>
                )}
                {shape === 'circle' && (
                  <svg width="120" height="120" viewBox="0 0 120 120" className="border border-gray-300">
                    <circle cx="60" cy="60" r="40" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="60" y="110" fontSize="10" fill="#6B7280" textAnchor="middle">
                      r = {radius}'
                    </text>
                  </svg>
                )}
                {shape === 'triangle' && (
                  <svg width="150" height="100" viewBox="0 0 150 100" className="border border-gray-300">
                    <polygon points="25,75 125,75 75,25" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="75" y="90" fontSize="10" fill="#6B7280" textAnchor="middle">
                      b = {base}', h = {height}'
                    </text>
                  </svg>
                )}
                {shape === 'irregular' && (
                  <svg width="150" height="100" viewBox="0 0 150 100" className="border border-gray-300">
                    <polygon points="30,70 120,30 100,80 40,50" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="75" y="95" fontSize="10" fill="#6B7280" textAnchor="middle">
                      Irregular shape
                    </text>
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Common Conversions */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-orange-900 mb-2">{t.commonConversions}</h4>
            <div className="text-xs text-orange-700 space-y-1">
              <div>1 square foot = 0.093 square meters</div>
              <div>1 square meter = 10.76 square feet</div>
              <div>1 square yard = 9 square feet</div>
              <div>1 acre = 43,560 square feet</div>
            </div>
          </div>

          {/* Area Examples */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.areaExamples}</h4>
            <div className="text-xs text-indigo-700 space-y-1">
              <div>Living room: 12' × 15' = 180 sq ft</div>
              <div>Bedroom: 10' × 12' = 120 sq ft</div>
              <div>Kitchen: 8' × 10' = 80 sq ft</div>
              <div>Bathroom: 5' × 8' = 40 sq ft</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
