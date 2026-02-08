'use client';

import { useState } from 'react';

interface GeometryAreaCalculatorProps {
  lang?: string;
}

export default function GeometryAreaCalculator({ lang = 'en' }: GeometryAreaCalculatorProps) {
  const [shape, setShape] = useState('circle');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState('');

  const translations = {
    en: {
      shape: "Select Shape",
      circle: "Circle",
      rectangle: "Rectangle",
      triangle: "Triangle",
      square: "Square",
      radius: "Radius",
      length: "Length",
      width: "Width",
      base: "Base",
      height: "Height",
      side: "Side",
      calculate: "🔄 Recalculate",
      result: "Area",
      reset: "Reset"
    },
    es: {
      shape: "Seleccionar Forma",
      circle: "Círculo",
      rectangle: "Rectángulo",
      triangle: "Triángulo",
      square: "Cuadrado",
      radius: "Radio",
      length: "Longitud",
      width: "Ancho",
      base: "Base",
      height: "Altura",
      side: "Lado",
      calculate: "🔄 Recalcular",
      result: "Área",
      reset: "Restablecer"
    },
    pt: {
      shape: "Selecionar Forma",
      circle: "Círculo",
      rectangle: "Retângulo",
      triangle: "Triângulo",
      square: "Quadrado",
      radius: "Raio",
      length: "Comprimento",
      width: "Largura",
      base: "Base",
      height: "Altura",
      side: "Lado",
      calculate: "🔄 Recalcular",
      result: "Área",
      reset: "Redefinir"
    },
    fr: {
      shape: "Sélectionner la forme",
      circle: "Cercle",
      rectangle: "Rectangle",
      triangle: "Triangle",
      square: "Carré",
      radius: "Rayon",
      length: "Longueur",
      width: "Largeur",
      base: "Base",
      height: "Hauteur",
      side: "Côté",
      calculate: "🔄 Recalculer",
      result: "Aire",
      reset: "Réinitialiser"
    },
    de: {
      shape: "Form auswählen",
      circle: "Kreis",
      rectangle: "Rechteck",
      triangle: "Dreieck",
      square: "Quadrat",
      radius: "Radius",
      length: "Länge",
      width: "Breite",
      base: "Basis",
      height: "Höhe",
      side: "Seite",
      calculate: "Fläche berechnen",
      result: "Fläche",
      reset: "Zurücksetzen"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateArea = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (isNaN(v1)) return;

    let area = 0;
    switch (shape) {
      case 'circle':
        area = Math.PI * v1 * v1;
        break;
      case 'rectangle':
        if (isNaN(v2)) return;
        area = v1 * v2;
        break;
      case 'triangle':
        if (isNaN(v2)) return;
        area = (v1 * v2) / 2;
        break;
      case 'square':
        area = v1 * v1;
        break;
    }

    setResult(area.toFixed(2));
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.shape}</label>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="circle">{t.circle}</option>
              <option value="rectangle">{t.rectangle}</option>
              <option value="triangle">{t.triangle}</option>
              <option value="square">{t.square}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {shape === 'circle' ? t.radius : shape === 'square' ? t.side : shape === 'rectangle' ? t.length : t.base}
            </label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {(shape === 'rectangle' || shape === 'triangle') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {shape === 'rectangle' ? t.width : t.height}
              </label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            onClick={calculateArea}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="bg-green-50 p-4 rounded-lg">
              <div><strong>{t.result}:</strong> {result} sq units</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
