'use client';

import { useState, useEffect } from 'react';

interface Measurement {
  feet: number;
  inches: number;
}

interface FeetInchesCalculatorProps {
  lang?: string;
}

export default function FeetInchesCalculator({ lang = 'en' }: FeetInchesCalculatorProps) {
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [measurements, setMeasurements] = useState<Measurement[]>([
    { feet: 5, inches: 6 },
    { feet: 3, inches: 8 }
  ]);
  const [result, setResult] = useState<Measurement>({ feet: 0, inches: 0 });
  const [decimalResult, setDecimalResult] = useState(0);

  const translations = {
    en: {
      title: "Feet & Inches Calculator",
      description: "Add, subtract, multiply, and divide feet and inches measurements",
      operation: "Operation",
      add: "Add (+)",
      subtract: "Subtract (-)",
      multiply: "Multiply (×)",
      divide: "Divide (÷)",
      measurement: "Measurement",
      feet: "Feet",
      inches: "Inches",
      result: "Result",
      decimalEquivalent: "Decimal Equivalent",
      addMeasurement: "Add Measurement",
      removeMeasurement: "Remove",
      feetSymbol: "'",
      inchesSymbol: '"',
      totalFeet: "Total Feet",
      calculate: "Calculate",
      clear: "Clear All"
    },
    es: {
      title: "Calculadora de Pies y Pulgadas",
      description: "Suma, resta, multiplica y divide medidas de pies y pulgadas",
      operation: "Operación",
      add: "Sumar (+)",
      subtract: "Restar (-)",
      multiply: "Multiplicar (×)",
      divide: "Dividir (÷)",
      measurement: "Medida",
      feet: "Pies",
      inches: "Pulgadas",
      result: "Resultado",
      decimalEquivalent: "Equivalente Decimal",
      addMeasurement: "Agregar Medida",
      removeMeasurement: "Eliminar",
      feetSymbol: "'",
      inchesSymbol: '"',
      totalFeet: "Pies Totales",
      calculate: "Calcular",
      clear: "Limpiar Todo"
    },
    pt: {
      title: "Calculadora de Pés e Polegadas",
      description: "Some, subtraia, multiplique e divida medidas de pés e polegadas",
      operation: "Operação",
      add: "Somar (+)",
      subtract: "Subtrair (-)",
      multiply: "Multiplicar (×)",
      divide: "Dividir (÷)",
      measurement: "Medida",
      feet: "Pés",
      inches: "Polegadas",
      result: "Resultado",
      decimalEquivalent: "Equivalente Decimal",
      addMeasurement: "Adicionar Medida",
      removeMeasurement: "Remover",
      feetSymbol: "'",
      inchesSymbol: '"',
      totalFeet: "Pés Totais",
      calculate: "Calcular",
      clear: "Limpar Tudo"
    },
    fr: {
      title: "Calculateur Pieds et Pouces",
      description: "Additionnez, soustrayez, multipliez et divisez les mesures en pieds et pouces",
      operation: "Opération",
      add: "Additionner (+)",
      subtract: "Soustraire (-)",
      multiply: "Multiplier (×)",
      divide: "Diviser (÷)",
      measurement: "Mesure",
      feet: "Pieds",
      inches: "Pouces",
      result: "Résultat",
      decimalEquivalent: "Équivalent Décimal",
      addMeasurement: "Ajouter Mesure",
      removeMeasurement: "Supprimer",
      feetSymbol: "'",
      inchesSymbol: '"',
      totalFeet: "Pieds Totaux",
      calculate: "Calculer",
      clear: "Tout Effacer"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Convert feet and inches to total inches
  const toTotalInches = (measurement: Measurement): number => {
    return measurement.feet * 12 + measurement.inches;
  };

  // Convert total inches back to feet and inches
  const fromTotalInches = (totalInches: number): Measurement => {
    const feet = Math.floor(Math.abs(totalInches) / 12);
    const inches = Math.abs(totalInches) % 12;
    return {
      feet: totalInches < 0 ? -feet : feet,
      inches: totalInches < 0 ? -inches : inches
    };
  };

  const calculate = () => {
    if (measurements.length === 0) return;

    let totalInches = toTotalInches(measurements[0]);

    for (let i = 1; i < measurements.length; i++) {
      const currentInches = toTotalInches(measurements[i]);

      switch (operation) {
        case 'add':
          totalInches += currentInches;
          break;
        case 'subtract':
          totalInches -= currentInches;
          break;
        case 'multiply':
          totalInches *= currentInches / 12; // Convert to feet for multiplication
          break;
        case 'divide':
          if (currentInches !== 0) {
            totalInches = (totalInches / currentInches) * 12; // Convert result back to inches
          }
          break;
      }
    }

    const resultMeasurement = fromTotalInches(totalInches);
    setResult(resultMeasurement);
    setDecimalResult(totalInches / 12); // Convert to decimal feet
  };

  useEffect(() => {
    calculate();
  }, [measurements, operation]);

  const updateMeasurement = (index: number, field: 'feet' | 'inches', value: number) => {
    const newMeasurements = [...measurements];
    newMeasurements[index] = {
      ...newMeasurements[index],
      [field]: value
    };
    setMeasurements(newMeasurements);
  };

  const addMeasurement = () => {
    setMeasurements([...measurements, { feet: 0, inches: 0 }]);
  };

  const removeMeasurement = (index: number) => {
    if (measurements.length > 1) {
      setMeasurements(measurements.filter((_, i) => i !== index));
    }
  };

  const clearAll = () => {
    setMeasurements([{ feet: 0, inches: 0 }]);
    setResult({ feet: 0, inches: 0 });
    setDecimalResult(0);
  };

  const formatMeasurement = (measurement: Measurement): string => {
    const feet = Math.abs(measurement.feet);
    const inches = Math.abs(measurement.inches);
    const sign = (measurement.feet < 0 || measurement.inches < 0) ? '-' : '';
    return `${sign}${feet}${t.feetSymbol} ${inches.toFixed(1)}${t.inchesSymbol}`;
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
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.operation}</label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as 'add' | 'subtract' | 'multiply' | 'divide')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="add">{t.add}</option>
              <option value="subtract">{t.subtract}</option>
              <option value="multiply">{t.multiply}</option>
              <option value="divide">{t.divide}</option>
            </select>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">{t.measurement}s</h3>

            {measurements.map((measurement, index) => (
              <div key={index} className="flex items-end gap-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">
                    {t.measurement} {index + 1}
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={measurement.feet}
                        onChange={(e) => updateMeasurement(index, 'feet', Number(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder={t.feet}
                      />
                      <div className="text-xs text-center text-gray-500 mt-1">{t.feetSymbol}</div>
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={measurement.inches}
                        onChange={(e) => updateMeasurement(index, 'inches', Number(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder={t.inches}
                        min="0"
                        max="11.9"
                        step="0.1"
                      />
                      <div className="text-xs text-center text-gray-500 mt-1">{t.inchesSymbol}</div>
                    </div>
                  </div>
                </div>

                {measurements.length > 1 && (
                  <button
                    onClick={() => removeMeasurement(index)}
                    className="px-2 py-1 text-xs text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50"
                  >
                    {t.removeMeasurement}
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addMeasurement}
              className="w-full py-2 px-4 border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              + {t.addMeasurement}
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculate}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.calculate}
            </button>
            <button
              onClick={clearAll}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t.clear}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.result}</h3>
            <div className="text-3xl font-bold text-blue-600 min-h-[48px] flex items-center">
              {formatMeasurement(result)}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.decimalEquivalent}</h4>
            <div className="text-xl font-bold text-green-600">
              {decimalResult.toFixed(3)} {t.feet}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">{t.totalFeet}</h4>
            <div className="text-xl font-bold text-purple-600">
              {Math.abs(decimalResult).toFixed(3)} {t.feet}
            </div>
          </div>

          {/* Operation Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Operation Summary</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div>Operation: <span className="font-semibold capitalize">{operation}</span></div>
              <div>Measurements: <span className="font-semibold">{measurements.length}</span></div>
              <div className="mt-2 text-xs">
                {measurements.map((m, i) => (
                  <span key={i}>
                    {i > 0 && ` ${operation === 'add' ? '+' : operation === 'subtract' ? '-' : operation === 'multiply' ? '×' : '÷'} `}
                    {formatMeasurement(m)}
                  </span>
                ))}
                {' = ' + formatMeasurement(result)}
              </div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-orange-900 mb-2">Quick Examples</h4>
            <div className="text-xs text-orange-700 space-y-1">
              <div>Add: 5'6" + 3'8" = 9'2"</div>
              <div>Subtract: 10'4" - 6'9" = 3'7"</div>
              <div>Multiply: 4'0" × 3 = 12'0"</div>
              <div>Divide: 8'0" ÷ 2 = 4'0"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
