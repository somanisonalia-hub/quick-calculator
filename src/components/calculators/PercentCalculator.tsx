'use client';

import { useState, useEffect } from 'react';

interface PercentCalculatorProps {
  lang?: string;
}

export default function PercentCalculator({ lang = 'en' }: PercentCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'percentOf' | 'percentageChange' | 'whatPercent'>('percentOf');
  const [value1, setValue1] = useState(100);
  const [value2, setValue2] = useState(20);
  const [result, setResult] = useState(0);
  const [explanation, setExplanation] = useState('');

  const translations = {
    en: {
      title: "Percent Calculator",
      description: "Calculate percentages, percentage change, and percent of numbers",
      calculationType: "Calculation Type",
      percentOf: "What is X% of Y?",
      percentageChange: "Percentage Change (Increase/Decrease)",
      whatPercent: "What percent is X of Y?",
      value1: "Value 1",
      value2: "Value 2 (or percentage)",
      calculate: "🔄 Recalculate",
      result: "Result",
      explanation: "Explanation",
      formula: "Formula",
      example: "Example",
      visualrepresentation: "Visual Representation",
      percentof: "percentOf",
      percentagechange: "percentageChange",
      cannotcalculatepercentagechangefromzero: "Cannot calculate percentage change from zero",
      whatpercent: "whatPercent",
      cannotcalculatepercentageofzero: "Cannot calculate percentage of zero",
      increase: "Increase",
      decrease: "Decrease",
      resultpercentage100number: "Result = (Percentage ÷ 100) × Number",
      reset: "Reset"
  },
    es: {
      title: "Calculadora de Porcentajes",
      description: "Calcula porcentajes, cambio porcentual y porcentaje de números",
      calculationType: "Tipo de Cálculo",
      percentOf: "¿Qué es X% de Y?",
      percentageChange: "Cambio Porcentual (Aumento/Disminución)",
      whatPercent: "¿Qué porcentaje es X de Y?",
      value1: "Valor 1",
      value2: "Valor 2 (o porcentaje)",
      calculate: "🔄 Recalcular",
      result: "Resultado",
      explanation: "Explicación",
      formula: "Fórmula",
      example: "Ejemplo",
      visualrepresentation: "Representación Visual",
      percentof: "porcentajeDe",
      percentagechange: "cambioPorcentual",
      cannotcalculatepercentagechangefromzero: "No se puede calcular cambio porcentual desde cero",
      whatpercent: "quePorcentaje",
      cannotcalculatepercentageofzero: "No se puede calcular porcentaje de cero",
      increase: "Aumento",
      decrease: "Disminución",
      resultpercentage100number: "Resultado = (Porcentaje ÷ 100) × Número",
      reset: "Restablecer"
  },
    pt: {
      title: "Calculadora de Porcentagem",
      description: "Calcule porcentagens, mudança porcentual e porcentagem de números",
      calculationType: "Tipo de Cálculo",
      percentOf: "Qual é X% de Y?",
      percentageChange: "Mudança Porcentual (Aumento/Diminuição)",
      whatPercent: "Que porcentagem é X de Y?",
      value1: "Valor 1",
      value2: "Valor 2 (ou porcentagem)",
      calculate: "🔄 Recalcular",
      result: "Resultado",
      explanation: "Explicação",
      formula: "Fórmula",
      example: "Exemplo",
      visualrepresentation: "Representação Visual",
      percentof: "qualÉX%DeY",
      percentagechange: "mudançaPorcentual",
      cannotcalculatepercentagechangefromzero: "Não é possível calcular mudança porcentual a partir de zero",
      whatpercent: "qualÉOPorcentagem",
      cannotcalculatepercentageofzero: "Não é possível calcular porcentagem de zero",
      increase: "Aumento",
      decrease: "Diminuição",
      resultpercentage100number: "Resultado = (Porcentagem ÷ 100) × Número",
      reset: "Redefinir"
  },
    fr: {
      title: "Calculateur de Pourcentage",
      description: "Calculez pourcentages, changement de pourcentage et pourcentage de nombres",
      calculationType: "Type de Calcul",
      percentOf: "Quel est X% de Y?",
      percentageChange: "Changement de Pourcentage (Augmentation/Diminution)",
      whatPercent: "Quel pourcentage est X de Y?",
      value1: "Valeur 1",
      value2: "Valeur 2 (ou pourcentage)",
      calculate: "🔄 Recalculer",
      result: "Résultat",
      explanation: "Explication",
      formula: "Formule",
      example: "Exemple",
      visualrepresentation: "Représentation Visuelle",
      percentof: "quelEstX%DeY",
      percentagechange: "changementPourcent",
      cannotcalculatepercentagechangefromzero: "Impossible de calculer le changement de pourcentage à partir de zéro",
      whatpercent: "quelEstLePourcentage",
      cannotcalculatepercentageofzero: "Impossible de calculer le pourcentage de zéro",
      increase: "Augmentation",
      decrease: "Diminution",
      resultpercentage100number: "Résultat = (Pourcentage ÷ 100) × Nombre",
      reset: "Réinitialiser"
  }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculate = () => {
    let calcResult = 0;
    let calcExplanation = '';

    switch (calculationType) {
      case 'percentOf':
        // What is value2% of value1?
        calcResult = (value2 / 100) * value1;
        calcExplanation = `${value2}% of ${value1} = (${value2} ÷ 100) × ${value1} = ${calcResult.toFixed(2)}`;
        break;

      case 'percentageChange':
        // Percentage change from value1 to value2
        if (value1 === 0) {
          calcResult = 0;
          calcExplanation = 'Cannot calculate percentage change from zero';
        } else {
          calcResult = ((value2 - value1) / Math.abs(value1)) * 100;
          const changeType = calcResult >= 0 ? 'increase' : 'decrease';
          calcExplanation = `Change: ${value2} - ${value1} = ${value2 - value1}\nPercentage: (${value2 - value1} ÷ ${Math.abs(value1)}) × 100 = ${calcResult.toFixed(2)}% ${changeType}`;
        }
        break;

      case 'whatPercent':
        // What percent is value1 of value2?
        if (value2 === 0) {
          calcResult = 0;
          calcExplanation = 'Cannot calculate percentage of zero';
        } else {
          calcResult = (value1 / value2) * 100;
          calcExplanation = `${value1} is what percent of ${value2}?\n(${value1} ÷ ${value2}) × 100 = ${calcResult.toFixed(2)}%`;
        }
        break;
    }

    setResult(calcResult);
    setExplanation(calcExplanation);
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

  useEffect(() => {
    calculate();
  }, [calculationType, value1, value2]);

  const getPlaceholders = () => {
    switch (calculationType) {
      case 'percentOf':
        return { placeholder1: '100', placeholder2: '20', label1: t.value1, label2: 'Percentage (%)' };
      case 'percentageChange':
        return { placeholder1: '100', placeholder2: '120', label1: 'Original Value', label2: 'New Value' };
      case 'whatPercent':
        return { placeholder1: '25', placeholder2: '100', label1: 'Part', label2: 'Whole' };
      default:
        return { placeholder1: '100', placeholder2: '20', label1: t.value1, label2: t.value2 };
    }
  };

  const placeholders = getPlaceholders();

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
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.calculationType}</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'percentOf' | 'percentageChange' | 'whatPercent')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="percentOf">{t.percentOf}</option>
              <option value="percentageChange">{t.percentageChange}</option>
              <option value="whatPercent">{t.whatPercent}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{placeholders.label1}</label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(Number(e.target.value) || 0)}
                placeholder={placeholders.placeholder1}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="any"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{placeholders.label2}</label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(Number(e.target.value) || 0)}
                placeholder={placeholders.placeholder2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="any"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t.calculate}
          </button>

          {/* Quick Examples */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">{t.example}</h4>
            <div className="text-xs text-gray-700 space-y-1">
              {calculationType === 'percentOf' && (
                <>
                  <div>20% of 100 = 20</div>
                  <div>15% of 200 = 30</div>
                  <div>25% of 80 = 20</div>
                </>
              )}
              {calculationType === 'percentageChange' && (
                <>
                  <div>100 to 120 = +20% increase</div>
                  <div>50 to 40 = -20% decrease</div>
                  <div>200 to 250 = +25% increase</div>
                </>
              )}
              {calculationType === 'whatPercent' && (
                <>
                  <div>25 is what % of 100? = 25%</div>
                  <div>15 is what % of 60? = 25%</div>
                  <div>75 is what % of 300? = 25%</div>
                </>
              )}
            
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>

</div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.result}</h3>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {isNaN(result) ? 'Error' : result.toFixed(2)}
              {calculationType === 'percentageChange' || calculationType === 'whatPercent' ? '%' : ''}
            </div>
            {calculationType === 'percentageChange' && !isNaN(result) && (
              <div className="text-sm text-blue-700">
                {result >= 0 ? 'Increase' : 'Decrease'}
              </div>
            )}
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.explanation}</h4>
            <div className="text-sm text-green-700 whitespace-pre-line font-mono">
              {explanation}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">{t.formula}</h4>
            <div className="text-sm text-purple-700">
              {calculationType === 'percentOf' && 'Result = (Percentage ÷ 100) × Number'}
              {calculationType === 'percentageChange' && 'Change % = ((New - Old) ÷ |Old|) × 100'}
              {calculationType === 'whatPercent' && 'Percentage = (Part ÷ Whole) × 100'}
            </div>
          </div>

          {/* Visual Representation */}
          {calculationType === 'percentOf' && value2 > 0 && value2 <= 100 && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-orange-900 mb-2">{t.visualrepresentation}</h4>
              <div className="w-full bg-gray-200 rounded-full h-6 mb-2">
                <div
                  className="bg-orange-500 h-6 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(value2, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-orange-700 text-center">
                {value2}% of {value1} = {result.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
