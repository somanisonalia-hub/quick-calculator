'use client';

import { useState, useEffect } from 'react';

interface SurfaceAreaCalculatorProps {
  lang?: string;
}

export default function SurfaceAreaCalculator({ lang = 'en' }: SurfaceAreaCalculatorProps) {
  const [shape, setShape] = useState('cube');
  const [surfaceArea, setSurfaceArea] = useState(0);
  const [side, setSide] = useState(5);
  const [radius, setRadius] = useState(5);
  const [height, setHeight] = useState(10);

  const resetCalculator = () => {
    // Reset to default values
    setShape(0);
    setSurfaceArea(0);
    setSide(0);
    // Additional state resets may be needed
  };

  const translations = {
    en: { title: "Surface Area Calculator", description: "Calculate surface area of 3D shapes", calculate: "🔄 Recalculate", reset: "Reset" },
    es: { title: "Calculadora de Área Superficial", description: "Calcula área superficial de formas 3D", calculate: "🔄 Recalcular", reset: "Restablecer" },
    pt: { title: "Calculadora de Área Superficial", description: "Calcule área superficial de formas 3D", calculate: "🔄 Recalcular", reset: "Redefinir" },
    fr: { title: "Calculateur d'Aire de Surface", description: "Calculez aire de surface de formes 3D", calculate: "🔄 Recalculer", reset: "Réinitialiser" }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  useEffect(() => {
    let area = 0;
    switch (shape) {
      case 'cube':
        area = 6 * side * side;
        break;
      case 'sphere':
        area = 4 * Math.PI * radius * radius;
        break;
      case 'cylinder':
        area = 2 * Math.PI * radius * (radius + height);
        break;
    }
    setSurfaceArea(area);
  }, [shape, side, radius, height]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">{t.title}</h1>
      <p className="text-gray-600 mb-6">{t.description}</p>

      <div className="space-y-4">
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="cube">Cube</option>
          <option value="sphere">Sphere</option>
          <option value="cylinder">Cylinder</option>
        </select>

        {shape === 'cube' && (
          <input
            type="number"
            value={side}
            onChange={(e) => setSide(Number(e.target.value))}
            placeholder="Side length"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        )}

        {(shape === 'sphere' || shape === 'cylinder') && (
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            placeholder="Radius"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        )}

        {shape === 'cylinder' && (
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            placeholder="Height"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setSurfaceArea(surfaceArea)}
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

          <h3 className="text-lg font-semibold text-blue-900 mb-2">Surface Area</h3>
          <div className="text-3xl font-bold text-blue-600">
            {surfaceArea.toFixed(2)} sq units
          </div>
        </div>
      </div>
    </div>
  );
}
