'use client';

import { useState, useMemo } from 'react';

interface SlopeCalculatorProps {
  lang?: string;
}

export default function SlopeCalculator({ lang = 'en' }: SlopeCalculatorProps) {
  const [x1, setX1] = useState<number>(0);
  const [y1, setY1] = useState<number>(0);
  const [x2, setX2] = useState<number>(4);
  const [y2, setY2] = useState<number>(4);

  const resetCalculator = () => {
    // Reset to default values
    setX1(0);
    setY1(0);
    setX2(0);
    // Additional state resets may be needed
  };

  const translations = {
    en: {
      title: "Slope Calculator",
      description: "Calculate slope, line equation, distance, and midpoint between two points",
      point1: "Point 1",
      point2: "Point 2",
      xCoord: "x-coordinate",
      yCoord: "y-coordinate",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      results: "Results",
      slope: "Slope (m)",
      lineEquation: "Line Equation",
      distance: "Distance",
      midpoint: "Midpoint",
      angle: "Angle of Inclination",
      undefined: "Undefined (vertical line)",
      horizontal: "0 (horizontal line)",
      verticalLine: "Vertical line",
      horizontalLine: "Horizontal line",
      degrees: "degrees",
      formula: "Formula",
      slopeFormula: "m = (y₂ - y₁) / (x₂ - x₁)",
      distanceFormula: "d = √[(x₂-x₁)² + (y₂-y₁)²]",
      midpointFormula: "M = ((x₁+x₂)/2, (y₁+y₂)/2)",
      visualization: "Visualization",
      point: "Point",
    },
    es: {
      title: "Calculadora de Pendiente",
      description: "Calcular pendiente, ecuación de la recta, distancia y punto medio entre dos puntos",
      point1: "Punto 1",
      point2: "Punto 2",
      xCoord: "coordenada x",
      yCoord: "coordenada y",
      results: "Resultados",
      slope: "Pendiente (m)",
      lineEquation: "Ecuación de la Recta",
      distance: "Distancia",
      midpoint: "Punto Medio",
      angle: "Ángulo de Inclinación",
      undefined: "Indefinido (línea vertical)",
      horizontal: "0 (línea horizontal)",
      verticalLine: "Línea vertical",
      horizontalLine: "Línea horizontal",
      degrees: "grados",
      formula: "Fórmula",
      slopeFormula: "m = (y₂ - y₁) / (x₂ - x₁)",
      distanceFormula: "d = √[(x₂-x₁)² + (y₂-y₁)²]",
      midpointFormula: "M = ((x₁+x₂)/2, (y₁+y₂)/2)",
      visualization: "Visualización",
      point: "Punto",
    },
    pt: {
      title: "Calculadora de Inclinação",
      description: "Calcular inclinação, equação da reta, distância e ponto médio entre dois pontos",
      point1: "Ponto 1",
      point2: "Ponto 2",
      xCoord: "coordenada x",
      yCoord: "coordenada y",
      calculate: "🔄 Recalcular",
      reset: "Redefinir",
      results: "Resultados",
      slope: "Inclinação (m)",
      lineEquation: "Equação da Reta",
      distance: "Distância",
      midpoint: "Ponto Médio",
      angle: "Ângulo de Inclinação",
      undefined: "Indefinido (linha vertical)",
      horizontal: "0 (linha horizontal)",
      verticalLine: "Linha vertical",
      horizontalLine: "Linha horizontal",
      degrees: "graus",
      formula: "Fórmula",
      slopeFormula: "m = (y₂ - y₁) / (x₂ - x₁)",
      distanceFormula: "d = √[(x₂-x₁)² + (y₂-y₁)²]",
      midpointFormula: "M = ((x₁+x₂)/2, (y₁+y₂)/2)",
      visualization: "Visualização",
      point: "Ponto",
    },
    fr: {
      title: "Calculateur de Pente",
      description: "Calculer la pente, l'équation de la ligne, la distance et le point médian entre deux points",
      point1: "Point 1",
      point2: "Point 2",
      xCoord: "coordonnée x",
      yCoord: "coordonnée y",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      results: "Résultats",
      slope: "Pente (m)",
      lineEquation: "Équation de la Ligne",
      distance: "Distance",
      midpoint: "Point Médian",
      angle: "Angle d'Inclinaison",
      undefined: "Indéfini (ligne verticale)",
      horizontal: "0 (ligne horizontale)",
      verticalLine: "Ligne verticale",
      horizontalLine: "Ligne horizontale",
      degrees: "degrés",
      formula: "Formule",
      slopeFormula: "m = (y₂ - y₁) / (x₂ - x₁)",
      distanceFormula: "d = √[(x₂-x₁)² + (y₂-y₁)²]",
      midpointFormula: "M = ((x₁+x₂)/2, (y₁+y₂)/2)",
      visualization: "Visualisation",
      point: "Point",
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Calculate all results using useMemo
  const results = useMemo(() => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    let slope = '';
    let lineEquation = '';
    let angle = '';
    let isVertical = false;
    let isHorizontal = false;

    // Check for vertical line
    if (dx === 0) {
      isVertical = true;
      isHorizontal = false;
      slope = t.undefined;
      lineEquation = `x = ${x1}`;
      angle = '90 ' + t.degrees;
    }
    // Check for horizontal line
    else if (dy === 0) {
      isVertical = false;
      isHorizontal = true;
      slope = t.horizontal;
      lineEquation = `y = ${y1}`;
      angle = '0 ' + t.degrees;
    }
    // Regular slope
    else {
      isVertical = false;
      isHorizontal = false;
      
      const m = dy / dx;
      slope = m.toFixed(4);
      
      // Calculate y-intercept: b = y - mx
      const b = y1 - m * x1;
      
      // Format line equation
      if (b >= 0) {
        lineEquation = `y = ${m.toFixed(4)}x + ${b.toFixed(4)}`;
      } else {
        lineEquation = `y = ${m.toFixed(4)}x - ${Math.abs(b).toFixed(4)}`;
      }
      
      // Calculate angle in degrees
      const angleRad = Math.atan(m);
      let angleDeg = angleRad * (180 / Math.PI);
      
      // Adjust angle to be between 0 and 180 degrees
      if (angleDeg < 0) {
        angleDeg += 180;
      }
      
      angle = angleDeg.toFixed(2) + ' ' + t.degrees;
    }

    // Calculate distance
    const dist = Math.sqrt(dx * dx + dy * dy);
    const distance = dist.toFixed(4);

    // Calculate midpoint
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const midpoint = `(${midX.toFixed(4)}, ${midY.toFixed(4)})`;
    
    return { slope, lineEquation, distance, midpoint, angle, isVertical, isHorizontal };
  }, [x1, y1, x2, y2, t]);

  // Simple visualization component
  const renderVisualization = () => {
    // Create a simple coordinate system
    const width = 400;
    const height = 400;
    const padding = 40;
    
    // Find the bounds for our points
    const minX = Math.min(x1, x2, 0);
    const maxX = Math.max(x1, x2, 0);
    const minY = Math.min(y1, y2, 0);
    const maxY = Math.max(y1, y2, 0);
    
    // Add some padding to the bounds
    const rangeX = maxX - minX || 10;
    const rangeY = maxY - minY || 10;
    const bufferX = rangeX * 0.2;
    const bufferY = rangeY * 0.2;
    
    const plotMinX = minX - bufferX;
    const plotMaxX = maxX + bufferX;
    const plotMinY = minY - bufferY;
    const plotMaxY = maxY + bufferY;
    
    // Scale functions
    const scaleX = (x: number) => {
      return padding + ((x - plotMinX) / (plotMaxX - plotMinX)) * (width - 2 * padding);
    };
    
    const scaleY = (y: number) => {
      return height - padding - ((y - plotMinY) / (plotMaxY - plotMinY)) * (height - 2 * padding);
    };
    
    // Get scaled coordinates
    const sx1 = scaleX(x1);
    const sy1 = scaleY(y1);
    const sx2 = scaleX(x2);
    const sy2 = scaleY(y2);
    
    // Origin
    const originX = scaleX(0);
    const originY = scaleY(0);

    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">{t.visualization}</h3>
        <div className="flex justify-center">
          <svg width={width} height={height} className="border border-gray-300 rounded bg-white">
            {/* Grid lines */}
            <line x1={padding} y1={originY} x2={width - padding} y2={originY} stroke="#ddd" strokeWidth="1" />
            <line x1={originX} y1={padding} x2={originX} y2={height - padding} stroke="#ddd" strokeWidth="1" />
            
            {/* Axes labels */}
            <text x={width - padding + 10} y={originY + 5} fontSize="12" fill="#666">x</text>
            <text x={originX - 5} y={padding - 10} fontSize="12" fill="#666">y</text>
            
            {/* Line between points */}
            <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} stroke="#3b82f6" strokeWidth="2" />
            
            {/* Point 1 */}
            <circle cx={sx1} cy={sy1} r="5" fill="#ef4444" />
            <text x={sx1 + 10} y={sy1 - 10} fontSize="12" fill="#ef4444" fontWeight="bold">
              {t.point} 1 ({x1}, {y1})
            </text>
            
            {/* Point 2 */}
            <circle cx={sx2} cy={sy2} r="5" fill="#10b981" />
            <text x={sx2 + 10} y={sy2 - 10} fontSize="12" fill="#10b981" fontWeight="bold">
              {t.point} 2 ({x2}, {y2})
            </text>
            
            {/* Midpoint */}
            <circle cx={(sx1 + sx2) / 2} cy={(sy1 + sy2) / 2} r="4" fill="#f59e0b" />
          </svg>
        </div>
  </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
        <p className="text-gray-600 mb-6">{t.description}</p>

        {/* Input Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Point 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">{t.point1}</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                x₁ ({t.xCoord})
              </label>
              <input
                type="number"
                value={x1}
                onChange={(e) => setX1(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                y₁ ({t.yCoord})
              </label>
              <input
                type="number"
                value={y1}
                onChange={(e) => setY1(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.1"
              />
            </div>
          </div>

          {/* Point 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">{t.point2}</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                x₂ ({t.xCoord})
              </label>
              <input
                type="number"
                value={x2}
                onChange={(e) => setX2(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                y₂ ({t.yCoord})
              </label>
              <input
                type="number"
                value={y2}
                onChange={(e) => setY2(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.1"
              />
            </div>
          </div>
        </div>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setX1(x1)}
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


        {/* Results Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.results}</h2>
          
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">{t.slope}</div>
              <div className="text-2xl font-bold text-blue-600">{results.slope}</div>
              {results.isVertical && (
                <div className="text-xs text-gray-500 mt-1">{t.verticalLine}</div>
              )}
              {results.isHorizontal && (
                <div className="text-xs text-gray-500 mt-1">{t.horizontalLine}</div>
              )}
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">{t.lineEquation}</div>
              <div className="text-xl font-bold text-blue-600 break-all">{results.lineEquation}</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">{t.distance}</div>
              <div className="text-2xl font-bold text-green-600">{results.distance}</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-1">{t.midpoint}</div>
              <div className="text-xl font-bold text-green-600">{results.midpoint}</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow md:col-span-2">
              <div className="text-sm text-gray-600 mb-1">{t.angle}</div>
              <div className="text-2xl font-bold text-purple-600">{results.angle}</div>
            </div>
          </div>
        </div>

        {/* Formulas Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.formula}</h3>
          <div className="space-y-2 text-sm">
            <div className="font-mono bg-white p-3 rounded border border-gray-200">
              <strong>{t.slope}:</strong> {t.slopeFormula}
            </div>
            <div className="font-mono bg-white p-3 rounded border border-gray-200">
              <strong>{t.distance}:</strong> {t.distanceFormula}
            </div>
            <div className="font-mono bg-white p-3 rounded border border-gray-200">
              <strong>{t.midpoint}:</strong> {t.midpointFormula}
            </div>
          </div>
        </div>

        {/* Visualization */}
        {renderVisualization()}
      </div>
    </div>
  );
}
