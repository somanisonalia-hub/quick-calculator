import React, { useState } from 'react';

interface MidpointCalculatorProps {
  lang: string;
}

interface Translations {
  title: string;
  point1Label: string;
  point2Label: string;
  x1Label: string;
  y1Label: string;
  z1Label: string;
  x2Label: string;
  y2Label: string;
  z2Label: string;
  enable3DMode: string;
  calculateButton: string;
  result: string;
  midpoint: string;
  distance: string;
  formula: string;
  midpointFormula: string;
  distanceFormula: string;
  errorInvalidInput: string;
  coordinates: string;
}

const translations: Record<string, Translations> = {
  en: {
    title: 'Midpoint Calculator',
    point1Label: 'Point 1',
    point2Label: 'Point 2',
    x1Label: 'x₁',
    y1Label: 'y₁',
    z1Label: 'z₁',
    x2Label: 'x₂',
    y2Label: 'y₂',
    z2Label: 'z₂',
    enable3DMode: 'Enable 3D Mode',
    calculateButton: 'Calculate',
    result: 'Result',
    midpoint: 'Midpoint',
    distance: 'Distance Between Points',
    formula: 'Formula',
    midpointFormula: 'Midpoint Formula',
    distanceFormula: 'Distance Formula',
    errorInvalidInput: 'Please enter valid numeric values for all coordinates',
    coordinates: 'Coordinates',
  },
  es: {
    title: 'Calculadora de Punto Medio',
    point1Label: 'Punto 1',
    point2Label: 'Punto 2',
    x1Label: 'x₁',
    y1Label: 'y₁',
    z1Label: 'z₁',
    x2Label: 'x₂',
    y2Label: 'y₂',
    z2Label: 'z₂',
    enable3DMode: 'Habilitar Modo 3D',
    calculateButton: 'Calcular',
    result: 'Resultado',
    midpoint: 'Punto Medio',
    distance: 'Distancia Entre Puntos',
    formula: 'Fórmula',
    midpointFormula: 'Fórmula del Punto Medio',
    distanceFormula: 'Fórmula de Distancia',
    errorInvalidInput: 'Por favor ingrese valores numéricos válidos para todas las coordenadas',
    coordinates: 'Coordenadas',
  },
  pt: {
    title: 'Calculadora de Ponto Médio',
    point1Label: 'Ponto 1',
    point2Label: 'Ponto 2',
    x1Label: 'x₁',
    y1Label: 'y₁',
    z1Label: 'z₁',
    x2Label: 'x₂',
    y2Label: 'y₂',
    z2Label: 'z₂',
    enable3DMode: 'Ativar Modo 3D',
    calculateButton: 'Calcular',
    result: 'Resultado',
    midpoint: 'Ponto Médio',
    distance: 'Distância Entre Pontos',
    formula: 'Fórmula',
    midpointFormula: 'Fórmula do Ponto Médio',
    distanceFormula: 'Fórmula de Distância',
    errorInvalidInput: 'Por favor digite valores numéricos válidos para todas as coordenadas',
    coordinates: 'Coordenadas',
  },
  fr: {
    title: 'Calculatrice de Point Milieu',
    point1Label: 'Point 1',
    point2Label: 'Point 2',
    x1Label: 'x₁',
    y1Label: 'y₁',
    z1Label: 'z₁',
    x2Label: 'x₂',
    y2Label: 'y₂',
    z2Label: 'z₂',
    enable3DMode: 'Activer le Mode 3D',
    calculateButton: 'Calculer',
    result: 'Résultat',
    midpoint: 'Point Milieu',
    distance: 'Distance Entre les Points',
    formula: 'Formule',
    midpointFormula: 'Formule du Point Milieu',
    distanceFormula: 'Formule de Distance',
    errorInvalidInput: 'Veuillez entrer des valeurs numériques valides pour toutes les coordonnées',
    coordinates: 'Coordonnées',
  },
};

interface Point {
  x: number;
  y: number;
  z?: number;
}

interface MidpointResult {
  midpoint: Point;
  distance: number;
}

const MidpointCalculator: React.FC<MidpointCalculatorProps> = ({ lang = 'en' }) => {
  const t = translations[lang] || translations.en;
  
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [z1, setZ1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [z2, setZ2] = useState<string>('');
  const [is3D, setIs3D] = useState<boolean>(false);
  const [result, setResult] = useState<MidpointResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateMidpoint = (): void => {
    setError('');
    setResult(null);

    // Parse input values
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);

    // Validate 2D inputs
    if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val)) {
      setError(t.errorInvalidInput);
      return;
    }

    let midpoint: Point;
    let distance: number;

    if (is3D) {
      const z1Val = parseFloat(z1);
      const z2Val = parseFloat(z2);

      // Validate 3D inputs
      if (isNaN(z1Val) || isNaN(z2Val)) {
        setError(t.errorInvalidInput);
        return;
      }

      // Calculate 3D midpoint
      midpoint = {
        x: (x1Val + x2Val) / 2,
        y: (y1Val + y2Val) / 2,
        z: (z1Val + z2Val) / 2,
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

      // Calculate 3D distance
      distance = Math.sqrt(
        Math.pow(x2Val - x1Val, 2) +
        Math.pow(y2Val - y1Val, 2) +
        Math.pow(z2Val - z1Val, 2)
      );
    } else {
      // Calculate 2D midpoint
      midpoint = {
        x: (x1Val + x2Val) / 2,
        y: (y1Val + y2Val) / 2,
      };

      // Calculate 2D distance
      distance = Math.sqrt(
        Math.pow(x2Val - x1Val, 2) +
        Math.pow(y2Val - y1Val, 2)
      );
    }

    setResult({ midpoint, distance });
  };

  const formatCoordinate = (value: number): string => {
    return value.toFixed(2);
  };

  const formatMidpoint = (point: Point): string => {
    if (is3D && point.z !== undefined) {
      return `(${formatCoordinate(point.x)}, ${formatCoordinate(point.y)}, ${formatCoordinate(point.z)})`;
    }
    return `(${formatCoordinate(point.x)}, ${formatCoordinate(point.y)})`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.title}</h2>

        {/* 3D Mode Toggle */}
        <div className="mb-6 hidden">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={is3D}
              onChange={(e) => setIs3D(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">{t.enable3DMode}</span>
          </label>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Point 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              {t.point1Label}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {t.x1Label}
                </label>
                <input
                  type="number"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  placeholder="0"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {t.y1Label}
                </label>
                <input
                  type="number"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  placeholder="0"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {is3D && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {t.z1Label}
                  </label>
                  <input
                    type="number"
                    value={z1}
                    onChange={(e) => setZ1(e.target.value)}
                    placeholder="0"
                    step="any"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
  </div>

          {/* Point 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              {t.point2Label}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {t.x2Label}
                </label>
                <input
                  type="number"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                  placeholder="0"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {t.y2Label}
                </label>
                <input
                  type="number"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  placeholder="0"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {is3D && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {t.z2Label}
                  </label>
                  <input
                    type="number"
                    value={z2}
                    onChange={(e) => setZ2(e.target.value)}
                    placeholder="0"
                    step="any"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateMidpoint}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {t.calculateButton}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="mt-6 space-y-6">
          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>

            <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
              {t.result}
            </h3>

            {/* Midpoint */}
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-600 mb-2">
                {t.midpoint}
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {formatMidpoint(result.midpoint)}
              </p>
            </div>

            {/* Distance */}
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-600 mb-2">
                {t.distance}
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatCoordinate(result.distance)} units
              </p>
            </div>

            {/* Formulas */}
            <div className="bg-gray-50 p-4 rounded-md space-y-4">
              <h4 className="font-semibold text-gray-700">{t.formula}</h4>
              
              {/* Midpoint Formula */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {t.midpointFormula}:
                </p>
                <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm overflow-x-auto">
                  {is3D ? (
                    <div>
                      M = ((<span className="text-blue-600">x₁ + x₂</span>)/2, (<span className="text-blue-600">y₁ + y₂</span>)/2, (<span className="text-blue-600">z₁ + z₂</span>)/2)
                      <div className="mt-2 text-gray-600">
                        M = (({x1} + {x2})/2, ({y1} + {y2})/2, ({z1} + {z2})/2)
                      </div>
                      <div className="mt-2 text-green-600 font-semibold">
                        M = {formatMidpoint(result.midpoint)}
                      </div>
                    </div>
                  ) : (
                    <div>
                      M = ((<span className="text-blue-600">x₁ + x₂</span>)/2, (<span className="text-blue-600">y₁ + y₂</span>)/2)
                      <div className="mt-2 text-gray-600">
                        M = (({x1} + {x2})/2, ({y1} + {y2})/2)
                      </div>
                      <div className="mt-2 text-green-600 font-semibold">
                        M = {formatMidpoint(result.midpoint)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Distance Formula */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {t.distanceFormula}:
                </p>
                <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm overflow-x-auto">
                  {is3D ? (
                    <div>
                      d = √[(<span className="text-blue-600">x₂ - x₁</span>)² + (<span className="text-blue-600">y₂ - y₁</span>)² + (<span className="text-blue-600">z₂ - z₁</span>)²]
                      <div className="mt-2 text-gray-600">
                        d = √[({x2} - {x1})² + ({y2} - {y1})² + ({z2} - {z1})²]
                      </div>
                      <div className="mt-2 text-green-600 font-semibold">
                        d = {formatCoordinate(result.distance)} units
                      </div>
                    </div>
                  ) : (
                    <div>
                      d = √[(<span className="text-blue-600">x₂ - x₁</span>)² + (<span className="text-blue-600">y₂ - y₁</span>)²]
                      <div className="mt-2 text-gray-600">
                        d = √[({x2} - {x1})² + ({y2} - {y1})²]
                      </div>
                      <div className="mt-2 text-green-600 font-semibold">
                        d = {formatCoordinate(result.distance)} units
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MidpointCalculator;
