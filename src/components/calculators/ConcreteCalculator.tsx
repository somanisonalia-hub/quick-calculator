'use client';

import { useState, useEffect } from 'react';

interface ConcreteCalculatorProps {
  lang?: string;
}

export default function ConcreteCalculator({ lang = 'en' }: ConcreteCalculatorProps) {
  const [structureType, setStructureType] = useState('slab');
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(0.5);
  const [diameter, setDiameter] = useState(1);
  const [concreteStrength, setConcreteStrength] = useState(3000);
  const [wasteFactor, setWasteFactor] = useState(5);

  const [results, setResults] = useState({
    volumeCubicFeet: 0,
    volumeCubicYards: 0,
    bags80lb: 0,
    bags60lb: 0,
    bags40lb: 0,
    readyMixCost: 0,
    totalCost: 0
  });

  const translations = {
    en: {
      title: "Concrete Calculator",
      description: "Calculate concrete volume and material requirements for construction projects",
      structureType: "Structure Type",
      slab: "Slab",
      footing: "Footing",
      column: "Column",
      wall: "Wall",
      steps: "Steps",
      tube: "Tube/Post",
      length: "Length (ft)",
      width: "Width (ft)",
      height: "Height/Thickness (ft)",
      diameter: "Diameter (ft)",
      concreteStrength: "Concrete Strength (PSI)",
      wasteFactor: "Waste Factor (%)",
      volumeCubicFeet: "Volume (Cubic Feet)",
      volumeCubicYards: "Volume (Cubic Yards)",
      bags80lb: "80 lb Bags Needed",
      bags60lb: "60 lb Bags Needed",
      bags40lb: "40 lb Bags Needed",
      readyMixEstimate: "Ready-Mix Estimate ($)",
      totalEstimate: "Total Estimate ($)",
      calculate: "Calculate Concrete",
      reset: "Reset",
      instructions: "Enter dimensions and select concrete type to calculate volume and material requirements."
    },
    es: {
      title: "Calculadora de Concreto",
      description: "Calcula volumen de concreto y requerimientos de materiales para proyectos de construcción",
      structureType: "Tipo de Estructura",
      slab: "Losa",
      footing: "Zapata",
      column: "Columna",
      wall: "Muro",
      steps: "Escaleras",
      tube: "Tubo/Poste",
      length: "Longitud (pies)",
      width: "Ancho (pies)",
      height: "Altura/Espesor (pies)",
      diameter: "Diámetro (pies)",
      concreteStrength: "Resistencia del Concreto (PSI)",
      wasteFactor: "Factor de Desperdicio (%)",
      volumeCubicFeet: "Volumen (Pies Cúbicos)",
      volumeCubicYards: "Volumen (Yardas Cúbicas)",
      bags80lb: "Bolsas de 80 lb Necesarias",
      bags60lb: "Bolsas de 60 lb Necesarias",
      bags40lb: "Bolsas de 40 lb Necesarias",
      readyMixEstimate: "Estimado Ready-Mix ($)",
      totalEstimate: "Estimado Total ($)",
      calculate: "Calcular Concreto",
      reset: "Reiniciar",
      instructions: "Ingresa dimensiones y selecciona tipo de concreto para calcular volumen y requerimientos de materiales."
    },
    pt: {
      title: "Calculadora de Concreto",
      description: "Calcule volume de concreto e requisitos de materiais para projetos de construção",
      structureType: "Tipo de Estrutura",
      slab: "Laje",
      footing: "Sapata",
      column: "Coluna",
      wall: "Parede",
      steps: "Degraus",
      tube: "Tubo/Poste",
      length: "Comprimento (pés)",
      width: "Largura (pés)",
      height: "Altura/Espessura (pés)",
      diameter: "Diâmetro (pés)",
      concreteStrength: "Resistência do Concreto (PSI)",
      wasteFactor: "Fator de Desperdício (%)",
      volumeCubicFeet: "Volume (Pés Cúbicos)",
      volumeCubicYards: "Volume (Jardas Cúbicas)",
      bags80lb: "Sacos de 80 lb Necessários",
      bags60lb: "Sacos de 60 lb Necessários",
      bags40lb: "Sacos de 40 lb Necessários",
      readyMixEstimate: "Estimativa Ready-Mix ($)",
      totalEstimate: "Estimativa Total ($)",
      calculate: "Calcular Concreto",
      reset: "Reiniciar",
      instructions: "Digite dimensões e selecione tipo de concreto para calcular volume e requisitos de materiais."
    },
    fr: {
      title: "Calculateur de Béton",
      description: "Calculez volume de béton et exigences de matériaux pour projets de construction",
      structureType: "Type de Structure",
      slab: "Dalle",
      footing: "Semelle",
      column: "Colonne",
      wall: "Mur",
      steps: "Marches",
      tube: "Tube/Poteau",
      length: "Longueur (pieds)",
      width: "Largeur (pieds)",
      height: "Hauteur/Épaisseur (pieds)",
      diameter: "Diamètre (pieds)",
      concreteStrength: "Résistance du Béton (PSI)",
      wasteFactor: "Facteur de Gaspillage (%)",
      volumeCubicFeet: "Volume (Pieds Cubiques)",
      volumeCubicYards: "Volume (Yardas Cubiques)",
      bags80lb: "Sacs de 80 lb Nécessaires",
      bags60lb: "Sacs de 60 lb Nécessaires",
      bags40lb: "Sacs de 40 lb Nécessaires",
      readyMixEstimate: "Estimation Ready-Mix ($)",
      totalEstimate: "Estimation Totale ($)",
      calculate: "Calculer Béton",
      reset: "Réinitialiser",
      instructions: "Entrez dimensions et sélectionnez type de béton pour calculer volume et exigences de matériaux."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateConcrete = () => {
    let volumeCubicFeet = 0;

    // Calculate volume based on structure type
    switch (structureType) {
      case 'slab':
        volumeCubicFeet = length * width * height;
        break;
      case 'footing':
        volumeCubicFeet = length * width * height;
        break;
      case 'column':
        volumeCubicFeet = (length * width * height) || (Math.PI * Math.pow(diameter/2, 2) * height);
        break;
      case 'wall':
        volumeCubicFeet = length * height * width; // width is thickness for walls
        break;
      case 'steps':
        // Simplified step calculation
        volumeCubicFeet = length * width * height * 1.2; // Rough estimate
        break;
      case 'tube':
        volumeCubicFeet = Math.PI * Math.pow(diameter/2, 2) * height;
        break;
      default:
        volumeCubicFeet = length * width * height;
    }

    // Apply waste factor
    const wasteMultiplier = 1 + (wasteFactor / 100);
    volumeCubicFeet *= wasteMultiplier;

    const volumeCubicYards = volumeCubicFeet / 27;

    // Calculate bags needed (assuming 0.6 cubic feet per 80lb bag)
    const cubicFeetPer80lbBag = 0.6;
    const cubicFeetPer60lbBag = 0.45;
    const cubicFeetPer40lbBag = 0.3;

    const bags80lb = Math.ceil(volumeCubicFeet / cubicFeetPer80lbBag);
    const bags60lb = Math.ceil(volumeCubicFeet / cubicFeetPer60lbBag);
    const bags40lb = Math.ceil(volumeCubicFeet / cubicFeetPer40lbBag);

    // Cost estimates (rough averages)
    const costPerCubicYard = 120; // Average ready-mix cost
    const readyMixCost = volumeCubicYards * costPerCubicYard;
    const bagCost80lb = bags80lb * 5; // $5 per bag
    const bagCost60lb = bags60lb * 4; // $4 per bag
    const bagCost40lb = bags40lb * 3; // $3 per bag

    setResults({
      volumeCubicFeet,
      volumeCubicYards,
      bags80lb,
      bags60lb,
      bags40lb,
      readyMixCost,
      totalCost: readyMixCost // Could add bag costs if needed
    });
  };

  useEffect(() => {
    calculateConcrete();
  }, [structureType, length, width, height, diameter, concreteStrength, wasteFactor]);

  const resetCalculator = () => {
    setStructureType('slab');
    setLength(20);
    setWidth(10);
    setHeight(0.5);
    setDiameter(1);
    setConcreteStrength(3000);
    setWasteFactor(5);
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
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.structureType}</label>
            <select
              value={structureType}
              onChange={(e) => setStructureType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="slab">{t.slab}</option>
              <option value="footing">{t.footing}</option>
              <option value="column">{t.column}</option>
              <option value="wall">{t.wall}</option>
              <option value="steps">{t.steps}</option>
              <option value="tube">{t.tube}</option>
            </select>
          </div>

          {/* Conditional inputs based on structure type */}
          {(structureType !== 'tube') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.length}</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
          )}

          {(structureType === 'slab' || structureType === 'footing' || structureType === 'steps') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.width}</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
          )}

          {(structureType === 'column' || structureType === 'tube') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.diameter}</label>
              <input
                type="number"
                value={diameter}
                onChange={(e) => setDiameter(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
          )}

          {(structureType === 'wall') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.width} (Thickness)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                step="0.1"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.height}</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0.1"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.concreteStrength}</label>
            <select
              value={concreteStrength}
              onChange={(e) => setConcreteStrength(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2000">2,000 PSI</option>
              <option value="2500">2,500 PSI</option>
              <option value="3000">3,000 PSI</option>
              <option value="3500">3,500 PSI</option>
              <option value="4000">4,000 PSI</option>
              <option value="5000">5,000 PSI</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.wasteFactor}</label>
            <input
              type="number"
              value={wasteFactor}
              onChange={(e) => setWasteFactor(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="50"
              step="1"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculateConcrete}
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

          <div className="text-sm text-gray-600 mt-4">
            {t.instructions}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Volume Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">{t.volumeCubicFeet}:</span>
                <span className="font-bold text-blue-900">{results.volumeCubicFeet.toFixed(2)} ft³</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">{t.volumeCubicYards}:</span>
                <span className="font-bold text-blue-900">{results.volumeCubicYards.toFixed(2)} yd³</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Material Requirements</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-green-700">{t.bags80lb}:</span>
                <span className="font-bold text-green-900">{results.bags80lb}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">{t.bags60lb}:</span>
                <span className="font-bold text-green-900">{results.bags60lb}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">{t.bags40lb}:</span>
                <span className="font-bold text-green-900">{results.bags40lb}</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">Cost Estimate</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-orange-700">{t.readyMixEstimate}:</span>
                <span className="font-bold text-orange-900">${results.readyMixCost.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Structure visualization */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Structure Preview</h4>
            <div className="text-center">
              {structureType === 'slab' && <div className="text-2xl">⬜</div>}
              {structureType === 'footing' && <div className="text-2xl">▭</div>}
              {structureType === 'column' && <div className="text-2xl">▮</div>}
              {structureType === 'wall' && <div className="text-2xl">▯</div>}
              {structureType === 'tube' && <div className="text-2xl">○</div>}
              {structureType === 'steps' && <div className="text-2xl">⋮</div>}
              <div className="text-xs text-gray-600 mt-1 capitalize">{structureType}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}