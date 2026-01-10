'use client';

import { useState, useEffect } from 'react';

interface VolumeCalculatorProps {
  lang?: string;
}

export default function VolumeCalculator({ lang = 'en' }: VolumeCalculatorProps) {
  const [shape, setShape] = useState('cube');
  const [volume, setVolume] = useState(0);
  const [formula, setFormula] = useState('');
  const [surfaceArea, setSurfaceArea] = useState(0);

  // Input values
  const [side, setSide] = useState(5);
  const [length, setLength] = useState(6);
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(3);
  const [radius, setRadius] = useState(5);

  const translations = {
    en: {
      title: "Volume Calculator",
      description: "Calculate volume of 3D shapes",
      shape: "3D Shape",
      cube: "Cube",
      rectangularPrism: "Rectangular Prism",
      sphere: "Sphere",
      cylinder: "Cylinder",
      cone: "Cone",
      pyramid: "Pyramid",
      volume: "Volume",
      formula: "Formula",
      surfaceArea: "Surface Area"
    },
    es: {
      title: "Calculadora de Volumen",
      description: "Calcula volumen de formas 3D",
      shape: "Forma 3D",
      cube: "Cubo",
      rectangularPrism: "Prisma Rectangular",
      sphere: "Esfera",
      cylinder: "Cilindro",
      cone: "Cono",
      pyramid: "Pirámide",
      volume: "Volumen",
      formula: "Fórmula",
      surfaceArea: "Área Superficial"
    },
    pt: {
      title: "Calculadora de Volume",
      description: "Calcule volume de formas 3D",
      shape: "Forma 3D",
      cube: "Cubo",
      rectangularPrism: "Prisma Retangular",
      sphere: "Esfera",
      cylinder: "Cilindro",
      cone: "Cone",
      pyramid: "Pirâmide",
      volume: "Volume",
      formula: "Fórmula",
      surfaceArea: "Área Superficial"
    },
    fr: {
      title: "Calculateur de Volume",
      description: "Calculez volume de formes 3D",
      shape: "Forme 3D",
      cube: "Cube",
      rectangularPrism: "Prisme Rectangulaire",
      sphere: "Sphère",
      cylinder: "Cylindre",
      cone: "Cône",
      pyramid: "Pyramide",
      volume: "Volume",
      formula: "Formule",
      surfaceArea: "Aire de Surface"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateVolume = () => {
    let vol = 0;
    let sa = 0;
    let form = '';

    switch (shape) {
      case 'cube':
        vol = Math.pow(side, 3);
        sa = 6 * Math.pow(side, 2);
        form = `V = s³ = ${side}³ = ${vol}`;
        break;
      case 'rectangularPrism':
        vol = length * width * height;
        sa = 2 * (length * width + length * height + width * height);
        form = `V = l × w × h = ${length} × ${width} × ${height} = ${vol}`;
        break;
      case 'sphere':
        vol = (4/3) * Math.PI * Math.pow(radius, 3);
        sa = 4 * Math.PI * Math.pow(radius, 2);
        form = `V = (4/3)πr³ = (4/3)π(${radius})³ = ${vol.toFixed(2)}`;
        break;
      case 'cylinder':
        vol = Math.PI * Math.pow(radius, 2) * height;
        sa = 2 * Math.PI * radius * (radius + height);
        form = `V = πr²h = π(${radius})²(${height}) = ${vol.toFixed(2)}`;
        break;
      case 'cone':
        vol = (1/3) * Math.PI * Math.pow(radius, 2) * height;
        sa = Math.PI * radius * (radius + Math.sqrt(Math.pow(radius, 2) + Math.pow(height, 2)));
        form = `V = (1/3)πr²h = (1/3)π(${radius})²(${height}) = ${vol.toFixed(2)}`;
        break;
      case 'pyramid':
        vol = (1/3) * length * width * height;
        form = `V = (1/3)lwh = (1/3)(${length})(${width})(${height}) = ${vol}`;
        break;
    }

    setVolume(vol);
    setSurfaceArea(sa);
    setFormula(form);
  };

  useEffect(() => {
    calculateVolume();
  }, [shape, side, length, width, height, radius]);

  const renderInputs = () => {
    switch (shape) {
      case 'cube':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Side Length</label>
            <input
              type="number"
              value={side}
              onChange={(e) => setSide(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        );
      case 'rectangularPrism':
        return (
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Length</label>
              <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value) || 0)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Width</label>
              <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value) || 0)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Height</label>
              <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
          </div>
        );
      case 'sphere':
      case 'cylinder':
      case 'cone':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Radius</label>
              <input type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            {shape !== 'sphere' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            )}
          </div>
        );
      case 'pyramid':
        return (
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Base Length</label>
              <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value) || 0)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Base Width</label>
              <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value) || 0)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Height</label>
              <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)} className="w-full px-2 py-1 text-sm border border-gray-300 rounded" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.shape}</label>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="cube">{t.cube}</option>
              <option value="rectangularPrism">{t.rectangularPrism}</option>
              <option value="sphere">{t.sphere}</option>
              <option value="cylinder">{t.cylinder}</option>
              <option value="cone">{t.cone}</option>
              <option value="pyramid">{t.pyramid}</option>
            </select>
          </div>

          {renderInputs()}
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.volume}</h3>
            <div className="text-3xl font-bold text-blue-600">
              {volume.toFixed(2)} cubic units
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.formula}</h4>
            <div className="text-sm font-mono text-green-700">{formula}</div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">{t.surfaceArea}</h4>
            <div className="text-lg font-bold text-purple-600">
              {surfaceArea.toFixed(2)} sq units
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
