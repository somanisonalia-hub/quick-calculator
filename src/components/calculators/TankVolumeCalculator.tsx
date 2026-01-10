'use client';

import { useState, useEffect } from 'react';

interface TankVolumeCalculatorProps {
  lang?: string;
}

export default function TankVolumeCalculator({ lang = 'en' }: TankVolumeCalculatorProps) {
  const [tankShape, setTankShape] = useState<'rectangular' | 'cylindrical' | 'irregular'>('rectangular');
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');

  // Dimensions
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(6);
  const [diameter, setDiameter] = useState(8);

  // Irregular tank (approximation)
  const [topLength, setTopLength] = useState(8);
  const [bottomLength, setBottomLength] = useState(6);
  const [topWidth, setTopWidth] = useState(4);
  const [bottomWidth, setBottomWidth] = useState(3);

  const [results, setResults] = useState({
    cubicFeet: 0,
    cubicMeters: 0,
    gallons: 0,
    liters: 0,
    cubicInches: 0,
    cubicCentimeters: 0
  });

  const translations = {
    en: {
      title: "Tank Volume Calculator",
      description: "Calculate volume and capacity for rectangular, cylindrical, and irregular shaped tanks",
      tankShape: "Tank Shape",
      rectangular: "Rectangular",
      cylindrical: "Cylindrical",
      irregular: "Irregular (Frustum)",
      unitSystem: "Unit System",
      imperial: "Imperial (feet, gallons)",
      metric: "Metric (meters, liters)",
      dimensions: "Dimensions",
      length: "Length",
      width: "Width",
      height: "Height",
      diameter: "Diameter",
      topLength: "Top Length",
      bottomLength: "Bottom Length",
      topWidth: "Top Width",
      bottomWidth: "Bottom Width",
      volumeResults: "Volume Results",
      cubicFeet: "Cubic Feet",
      cubicMeters: "Cubic Meters",
      gallons: "Gallons (US)",
      liters: "Liters",
      cubicInches: "Cubic Inches",
      cubicCentimeters: "Cubic Centimeters",
      calculate: "Calculate Volume",
      reset: "Reset",
      tankVisualization: "Tank Visualization",
      volumeFormula: "Volume Formula",
      unitConversions: "Unit Conversions"
    },
    es: {
      title: "Calculadora de Volumen de Tanque",
      description: "Calcula volumen y capacidad para tanques rectangulares, cilíndricos e irregulares",
      tankShape: "Forma del Tanque",
      rectangular: "Rectangular",
      cylindrical: "Cilíndrico",
      irregular: "Irregular (Tronco)",
      unitSystem: "Sistema de Unidades",
      imperial: "Imperial (pies, galones)",
      metric: "Métrico (metros, litros)",
      dimensions: "Dimensiones",
      length: "Longitud",
      width: "Anchura",
      height: "Altura",
      diameter: "Diámetro",
      topLength: "Longitud Superior",
      bottomLength: "Longitud Inferior",
      topWidth: "Anchura Superior",
      bottomWidth: "Anchura Inferior",
      volumeResults: "Resultados de Volumen",
      cubicFeet: "Pies Cúbicos",
      cubicMeters: "Metros Cúbicos",
      gallons: "Galones (US)",
      liters: "Litros",
      cubicInches: "Pulgadas Cúbicas",
      cubicCentimeters: "Centímetros Cúbicos",
      calculate: "Calcular Volumen",
      reset: "Reiniciar",
      tankVisualization: "Visualización del Tanque",
      volumeFormula: "Fórmula de Volumen",
      unitConversions: "Conversiones de Unidades"
    },
    pt: {
      title: "Calculadora de Volume de Tanque",
      description: "Calcule volume e capacidade para tanques retangulares, cilíndricos e irregulares",
      tankShape: "Forma do Tanque",
      rectangular: "Retangular",
      cylindrical: "Cilíndrico",
      irregular: "Irregular (Tronco)",
      unitSystem: "Sistema de Unidades",
      imperial: "Imperial (pés, galões)",
      metric: "Métrico (metros, litros)",
      dimensions: "Dimensões",
      length: "Comprimento",
      width: "Largura",
      height: "Altura",
      diameter: "Diâmetro",
      topLength: "Comprimento Superior",
      bottomLength: "Comprimento Inferior",
      topWidth: "Largura Superior",
      bottomWidth: "Largura Inferior",
      volumeResults: "Resultados de Volume",
      cubicFeet: "Pés Cúbicos",
      cubicMeters: "Metros Cúbicos",
      gallons: "Galões (US)",
      liters: "Litros",
      cubicInches: "Polegadas Cúbicas",
      cubicCentimeters: "Centímetros Cúbicos",
      calculate: "Calcular Volume",
      reset: "Reiniciar",
      tankVisualization: "Visualização do Tanque",
      volumeFormula: "Fórmula de Volume",
      unitConversions: "Conversões de Unidades"
    },
    fr: {
      title: "Calculateur de Volume de Réservoir",
      description: "Calculez volume et capacité pour réservoirs rectangulaires, cylindriques et irréguliers",
      tankShape: "Forme du Réservoir",
      rectangular: "Rectangulaire",
      cylindrical: "Cylindrique",
      irregular: "Irrégulier (Tronqué)",
      unitSystem: "Système d'Unités",
      imperial: "Impérial (pieds, gallons)",
      metric: "Métrique (mètres, litres)",
      dimensions: "Dimensions",
      length: "Longueur",
      width: "Largeur",
      height: "Hauteur",
      diameter: "Diamètre",
      topLength: "Longueur Supérieure",
      bottomLength: "Longueur Inférieure",
      topWidth: "Largeur Supérieure",
      bottomWidth: "Largeur Inférieure",
      volumeResults: "Résultats de Volume",
      cubicFeet: "Pieds Cubiques",
      cubicMeters: "Mètres Cubiques",
      gallons: "Gallons (US)",
      liters: "Litres",
      cubicInches: "Pouces Cubiques",
      cubicCentimeters: "Centimètres Cubiques",
      calculate: "Calculer Volume",
      reset: "Réinitialiser",
      tankVisualization: "Visualisation du Réservoir",
      volumeFormula: "Formule de Volume",
      unitConversions: "Conversions d'Unités"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateVolume = () => {
    let cubicFeet = 0;

    switch (tankShape) {
      case 'rectangular':
        cubicFeet = length * width * height;
        break;
      case 'cylindrical':
        const radius = diameter / 2;
        cubicFeet = Math.PI * radius * radius * height;
        break;
      case 'irregular':
        // Frustum approximation: average of top and bottom areas times height
        const avgLength = (topLength + bottomLength) / 2;
        const avgWidth = (topWidth + bottomWidth) / 2;
        cubicFeet = avgLength * avgWidth * height;
        break;
    }

    // Convert to other units
    const cubicMeters = cubicFeet * 0.0283168;
    const gallons = cubicFeet * 7.48052;
    const liters = cubicMeters * 1000;
    const cubicInches = cubicFeet * 1728;
    const cubicCentimeters = cubicMeters * 1000000;

    setResults({
      cubicFeet,
      cubicMeters,
      gallons,
      liters,
      cubicInches,
      cubicCentimeters
    });
  };

  useEffect(() => {
    calculateVolume();
  }, [tankShape, unitSystem, length, width, height, diameter, topLength, bottomLength, topWidth, bottomWidth]);

  const resetCalculator = () => {
    setTankShape('rectangular');
    setUnitSystem('imperial');
    setLength(10);
    setWidth(5);
    setHeight(6);
    setDiameter(8);
    setTopLength(8);
    setBottomLength(6);
    setTopWidth(4);
    setBottomWidth(3);
  };

  const renderDimensions = () => {
    switch (tankShape) {
      case 'rectangular':
        return (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.length} (ft)</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.width} (ft)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.height} (ft)</label>
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

      case 'cylindrical':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.diameter} (ft)</label>
              <input
                type="number"
                value={diameter}
                onChange={(e) => setDiameter(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.height} (ft)</label>
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.topLength} (ft)</label>
                <input
                  type="number"
                  value={topLength}
                  onChange={(e) => setTopLength(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0.1"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.topWidth} (ft)</label>
                <input
                  type="number"
                  value={topWidth}
                  onChange={(e) => setTopWidth(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0.1"
                  step="0.1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.bottomLength} (ft)</label>
                <input
                  type="number"
                  value={bottomLength}
                  onChange={(e) => setBottomLength(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0.1"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.bottomWidth} (ft)</label>
                <input
                  type="number"
                  value={bottomWidth}
                  onChange={(e) => setBottomWidth(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0.1"
                  step="0.1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.height} (ft)</label>
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

      default:
        return null;
    }
  };

  const getFormula = () => {
    switch (tankShape) {
      case 'rectangular':
        return 'V = Length × Width × Height';
      case 'cylindrical':
        return 'V = π × r² × h (where r = diameter/2)';
      case 'irregular':
        return 'V = [(L₁×W₁) + (L₂×W₂)]/2 × h (Frustum approximation)';
      default:
        return '';
    }
  };

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
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.tankShape}</label>
            <select
              value={tankShape}
              onChange={(e) => setTankShape(e.target.value as 'rectangular' | 'cylindrical' | 'irregular')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rectangular">{t.rectangular}</option>
              <option value="cylindrical">{t.cylindrical}</option>
              <option value="irregular">{t.irregular}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.unitSystem}</label>
            <select
              value={unitSystem}
              onChange={(e) => setUnitSystem(e.target.value as 'imperial' | 'metric')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="imperial">{t.imperial}</option>
              <option value="metric">{t.metric}</option>
            </select>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.dimensions}</h3>
            {renderDimensions()}
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateVolume}
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
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.volumeFormula}</h4>
            <div className="text-sm font-mono text-green-700">
              {getFormula()}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">{t.volumeResults}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">{t.cubicFeet}:</span>
                <span className="font-bold text-blue-900">{results.cubicFeet.toFixed(2)} ft³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">{t.gallons}:</span>
                <span className="font-bold text-blue-900">{results.gallons.toFixed(0)} gal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">{t.cubicInches}:</span>
                <span className="font-bold text-blue-900">{results.cubicInches.toFixed(0)} in³</span>
              </div>
              <div className="flex justify-between border-t border-blue-300 pt-2">
                <span className="text-sm text-blue-700">{t.cubicMeters}:</span>
                <span className="font-bold text-blue-900">{results.cubicMeters.toFixed(3)} m³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">{t.liters}:</span>
                <span className="font-bold text-blue-900">{results.liters.toFixed(0)} L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">{t.cubicCentimeters}:</span>
                <span className="font-bold text-blue-900">{results.cubicCentimeters.toFixed(0)} cm³</span>
              </div>
            </div>
          </div>

          {/* Tank Visualization */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">{t.tankVisualization}</h4>
            <div className="flex justify-center">
              <div className="relative">
                {tankShape === 'rectangular' && (
                  <svg width="150" height="100" viewBox="0 0 150 100" className="border border-gray-300">
                    <rect x="20" y="20" width="110" height="60" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="75" y="90" fontSize="10" fill="#6B7280" textAnchor="middle">
                      {length}' × {width}' × {height}'
                    </text>
                  </svg>
                )}
                {tankShape === 'cylindrical' && (
                  <svg width="150" height="100" viewBox="0 0 150 100" className="border border-gray-300">
                    <ellipse cx="75" cy="25" rx="50" ry="15" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                    <rect x="25" y="25" width="100" height="50" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                    <ellipse cx="75" cy="75" rx="50" ry="15" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="75" y="95" fontSize="10" fill="#6B7280" textAnchor="middle">
                      Ø{diameter}' × {height}'
                    </text>
                  </svg>
                )}
                {tankShape === 'irregular' && (
                  <svg width="150" height="100" viewBox="0 0 150 100" className="border border-gray-300">
                    <polygon points="30,30 120,20 110,80 40,90" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="75" y="95" fontSize="8" fill="#6B7280" textAnchor="middle">
                      Frustum shape
                    </text>
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Unit Conversions Info */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-orange-900 mb-2">{t.unitConversions}</h4>
            <div className="text-xs text-orange-700 space-y-1">
              <div>1 cubic foot = 7.48 US gallons</div>
              <div>1 cubic foot = 28.32 liters</div>
              <div>1 cubic foot = 1,728 cubic inches</div>
              <div>1 cubic meter = 1,000 liters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
