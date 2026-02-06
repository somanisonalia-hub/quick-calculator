'use client';

import { useState, useEffect } from 'react';

interface PercentageCalculatorProps {
  lang?: string;
}

export default function PercentageCalculator({ lang = 'en' }: PercentageCalculatorProps) {
  const [calculationType, setCalculationType] = useState('percentageOf');
  const [value1, setValue1] = useState(100);
  const [value2, setValue2] = useState(20);
  const [percentage, setPercentage] = useState(15);
  const [result, setResult] = useState('');
  const [steps, setSteps] = useState('');
  const [answer, setAnswer] = useState(0);
  const [percentageValue, setPercentageValue] = useState('');

  const translations = {
    en: {
      title: "Percentage Calculator",
      calculationType: "Calculation Type",
      percentageOf: "What is X% of Y?",
      whatPercent: "What % is X of Y?",
      percentageChange: "Percentage change from X to Y",
      increaseBy: "Increase X by Y%",
      decreaseBy: "Decrease X by Y%",
      value1: "Value 1",
      value2: "Value 2",
      percentage: "Percentage",
      result: "Result",
      calculationSteps: "Calculation Steps",
      finalAnswer: "Final Answer",
      percentageSymbol: "Percentage",
      is: "is",
      from: "from",
      to: "to",
      cannotDivideByZero: "Cannot divide by zero",
      errorDivisionByZero: "Error: Division by zero",
      cannotCalculatePercentageChange: "Cannot calculate percentage change from zero",
      errorOriginalValueZero: "Error: Original value cannot be zero",
      enterValuesToCalculate: "Enter values to calculate",
      stepsWillAppearHere: "Steps will appear here",
      // Step texts
      step1DividePercentageBy100: "Step 1: Divide percentage by 100:",
      step2MultiplyByNumber: "Step 2: Multiply by the number:",
      step1DividePartByWhole: "Step 1: Divide the part by the whole:",
      step2MultiplyBy100: "Step 2: Multiply by 100:",
      step1CalculateDifference: "Step 1: Calculate difference:",
      step2DivideByOriginalValue: "Step 2: Divide by original value:",
      step3MultiplyBy100: "Step 3: Multiply by 100:",
      step1ConvertPercentageToDecimal: "Step 1: Convert percentage to decimal:",
      step2Add1: "Step 2: Add 1:",
      step2SubtractFrom1: "Step 2: Subtract from 1:",
      step3MultiplyByOriginalValue: "Step 3: Multiply by original value:",
      // Result texts
      increasedBy: "increased by",
      decreasedBy: "decreased by",
      increase: "increase",
      decrease: "decrease",
      // Examples
      example50to65: "$50 to $65 = +30% increase",
      example200to150: "$200 to $150 = -25% decrease",
      example100to120: "$100 to $120 = +20% increase",
      example200increasedBy15: "200 increased by 15% = 230",
      example100increasedBy25: "100 increased by 25% = 125",
      example50increasedBy10: "50 increased by 10% = 55",
      example500decreasedBy25: "500 decreased by 25% = 375",
      example200decreasedBy20: "200 decreased by 20% = 160",
      example100decreasedBy15: "100 decreased by 15% = 85",
      // Additional UI texts
      description: "Calculate percentages, percentage changes, and solve various percentage problems",
      quickExamples: "Quick Examples",
      // More examples
      example20percentOf150: "20% of 150 = 30",
      example15percentOf200: "15% of 200 = 30",
      example25percentOf80: "25% of 80 = 20",
      example25whatPercentOf200: "25 is what % of 200? = 12.5%",
      example30whatPercentOf120: "30 is what % of 120? = 25%",
      example45whatPercentOf90: "45 is what % of 90? = 50%",
      percentageof: "percentageOf",
      whatpercent: "whatPercent",
      percentagechange: "percentageChange",
      increaseby: "increaseBy",
      decreaseby: "decreaseBy",
  },
    es: {
      title: "Calculadora de Porcentajes",
      calculationType: "Tipo de Cálculo",
      percentageOf: "¿Qué es X% de Y?",
      whatPercent: "¿Qué % es X de Y?",
      percentageChange: "Cambio porcentual de X a Y",
      increaseBy: "Aumentar X en Y%",
      decreaseBy: "Disminuir X en Y%",
      value1: "Valor 1",
      value2: "Valor 2",
      percentage: "Porcentaje",
      result: "Resultado",
      calculationSteps: "Pasos de Cálculo",
      finalAnswer: "Respuesta Final",
      percentageSymbol: "Porcentaje",
      is: "es",
      from: "de",
      to: "a",
      cannotDivideByZero: "No se puede dividir por cero",
      errorDivisionByZero: "Error: División por cero",
      cannotCalculatePercentageChange: "No se puede calcular el cambio porcentual desde cero",
      errorOriginalValueZero: "Error: El valor original no puede ser cero",
      enterValuesToCalculate: "Ingresa valores para calcular",
      stepsWillAppearHere: "Los pasos aparecerán aquí",
      // Step texts
      step1DividePercentageBy100: "Paso 1: Dividir porcentaje por 100:",
      step2MultiplyByNumber: "Paso 2: Multiplicar por el número:",
      step1DividePartByWhole: "Paso 1: Dividir la parte por el todo:",
      step2MultiplyBy100: "Paso 2: Multiplicar por 100:",
      step1CalculateDifference: "Paso 1: Calcular diferencia:",
      step2DivideByOriginalValue: "Paso 2: Dividir por valor original:",
      step3MultiplyBy100: "Paso 3: Multiplicar por 100:",
      step1ConvertPercentageToDecimal: "Paso 1: Convertir porcentaje a decimal:",
      step2Add1: "Paso 2: Sumar 1:",
      step2SubtractFrom1: "Paso 2: Restar de 1:",
      step3MultiplyByOriginalValue: "Paso 3: Multiplicar por valor original:",
      // Result texts
      increasedBy: "aumentado en",
      decreasedBy: "disminuido en",
      increase: "aumento",
      decrease: "disminución",
      // Examples
      example50to65: "$50 a $65 = +30% aumento",
      example200to150: "$200 a $150 = -25% disminución",
      example100to120: "$100 a $120 = +20% aumento",
      example200increasedBy15: "200 aumentado en 15% = 230",
      example100increasedBy25: "100 aumentado en 25% = 125",
      example50increasedBy10: "50 aumentado en 10% = 55",
      example500decreasedBy25: "500 disminuido en 25% = 375",
      example200decreasedBy20: "200 disminuido en 20% = 160",
      example100decreasedBy15: "100 disminuido en 15% = 85",
      // Additional UI texts
      description: "Calcula porcentajes, cambios porcentuales y resuelve diversos problemas de porcentajes",
      quickExamples: "Ejemplos Rápidos",
      // More examples
      example20percentOf150: "20% de 150 = 30",
      example15percentOf200: "15% de 200 = 30",
      example25percentOf80: "25% de 80 = 20",
      example25whatPercentOf200: "¿25 es qué % de 200? = 12.5%",
      example30whatPercentOf120: "¿30 es qué % de 120? = 25%",
      example45whatPercentOf90: "¿45 es qué % de 90? = 50%",
      percentageof: "percentageOf",
      whatpercent: "whatPercent",
      percentagechange: "percentageChange",
      increaseby: "increaseBy",
      decreaseby: "decreaseBy",
  },
    pt: {
      title: "Calculadora de Porcentagem",
      calculationType: "Tipo de Cálculo",
      percentageOf: "Qual é X% de Y?",
      whatPercent: "Que % é X de Y?",
      percentageChange: "Mudança porcentual de X para Y",
      increaseBy: "Aumentar X em Y%",
      decreaseBy: "Diminuir X em Y%",
      value1: "Valor 1",
      value2: "Valor 2",
      percentage: "Porcentagem",
      result: "Resultado",
      calculationSteps: "Passos de Cálculo",
      finalAnswer: "Resposta Final",
      percentageSymbol: "Porcentagem",
      is: "é",
      from: "de",
      to: "para",
      cannotDivideByZero: "Não é possível dividir por zero",
      errorDivisionByZero: "Erro: Divisão por zero",
      cannotCalculatePercentageChange: "Não é possível calcular a mudança percentual a partir de zero",
      errorOriginalValueZero: "Erro: O valor original não pode ser zero",
      enterValuesToCalculate: "Digite valores para calcular",
      stepsWillAppearHere: "Os passos aparecerão aqui",
      // Step texts
      step1DividePercentageBy100: "Passo 1: Dividir porcentagem por 100:",
      step2MultiplyByNumber: "Passo 2: Multiplicar pelo número:",
      step1DividePartByWhole: "Passo 1: Dividir a parte pelo todo:",
      step2MultiplyBy100: "Passo 2: Multiplicar por 100:",
      step1CalculateDifference: "Passo 1: Calcular diferença:",
      step2DivideByOriginalValue: "Passo 2: Dividir pelo valor original:",
      step3MultiplyBy100: "Passo 3: Multiplicar por 100:",
      step1ConvertPercentageToDecimal: "Passo 1: Converter porcentagem para decimal:",
      step2Add1: "Passo 2: Adicionar 1:",
      step2SubtractFrom1: "Passo 2: Subtrair de 1:",
      step3MultiplyByOriginalValue: "Passo 3: Multiplicar pelo valor original:",
      // Result texts
      increasedBy: "aumentado em",
      decreasedBy: "diminuído em",
      increase: "aumento",
      decrease: "diminuição",
      // Examples
      example50to65: "$50 para $65 = +30% aumento",
      example200to150: "$200 para $150 = -25% diminuição",
      example100to120: "$100 para $120 = +20% aumento",
      example200increasedBy15: "200 aumentado em 15% = 230",
      example100increasedBy25: "100 aumentado em 25% = 125",
      example50increasedBy10: "50 aumentado em 10% = 55",
      example500decreasedBy25: "500 diminuído em 25% = 375",
      example200decreasedBy20: "200 diminuído em 20% = 160",
      example100decreasedBy15: "100 diminuído em 15% = 85",
      // Additional UI texts
      description: "Calcule porcentagens, mudanças percentuais e resolva diversos problemas de porcentagem",
      quickExamples: "Exemplos Rápidos",
      // More examples
      example20percentOf150: "20% de 150 = 30",
      example15percentOf200: "15% de 200 = 30",
      example25percentOf80: "25% de 80 = 20",
      example25whatPercentOf200: "25 é que % de 200? = 12.5%",
      example30whatPercentOf120: "30 é que % de 120? = 25%",
      example45whatPercentOf90: "45 é que % de 90? = 50%",
      percentageof: "percentageOf",
      whatpercent: "whatPercent",
      percentagechange: "percentageChange",
      increaseby: "increaseBy",
      decreaseby: "decreaseBy",
  },
    fr: {
      title: "Calculateur de Pourcentage",
      calculationType: "Type de Calcul",
      percentageOf: "Quel est X% de Y?",
      whatPercent: "Quel % est X de Y?",
      percentageChange: "Changement pourcentuel de X à Y",
      increaseBy: "Augmenter X de Y%",
      decreaseBy: "Diminuer X de Y%",
      value1: "Valeur 1",
      value2: "Valeur 2",
      percentage: "Pourcentage",
      result: "Résultat",
      calculationSteps: "Étapes Calcul",
      finalAnswer: "Réponse Finale",
      percentageSymbol: "Pourcentage",
      is: "est",
      from: "de",
      to: "à",
      cannotDivideByZero: "Impossible de diviser par zéro",
      errorDivisionByZero: "Erreur : Division par zéro",
      cannotCalculatePercentageChange: "Impossible de calculer le changement en pourcentage à partir de zéro",
      errorOriginalValueZero: "Erreur : La valeur originale ne peut pas être zéro",
      enterValuesToCalculate: "Entrez des valeurs pour calculer",
      stepsWillAppearHere: "Les étapes apparaîtront ici",
      // Step texts
      step1DividePercentageBy100: "Étape 1 : Diviser le pourcentage par 100 :",
      step2MultiplyByNumber: "Étape 2 : Multiplier par le nombre :",
      step1DividePartByWhole: "Étape 1 : Diviser la partie par le tout :",
      step2MultiplyBy100: "Étape 2 : Multiplier par 100 :",
      step1CalculateDifference: "Étape 1 : Calculer la différence :",
      step2DivideByOriginalValue: "Étape 2 : Diviser par la valeur originale :",
      step3MultiplyBy100: "Étape 3 : Multiplier par 100 :",
      step1ConvertPercentageToDecimal: "Étape 1 : Convertir le pourcentage en décimal :",
      step2Add1: "Étape 2 : Ajouter 1 :",
      step2SubtractFrom1: "Étape 2 : Soustraire de 1 :",
      step3MultiplyByOriginalValue: "Étape 3 : Multiplier par la valeur originale :",
      // Result texts
      increasedBy: "augmenté de",
      decreasedBy: "diminué de",
      increase: "augmentation",
      decrease: "diminution",
      // Examples
      example50to65: "$50 à $65 = +30% augmentation",
      example200to150: "$200 à $150 = -25% diminution",
      example100to120: "$100 à $120 = +20% augmentation",
      example200increasedBy15: "200 augmenté de 15% = 230",
      example100increasedBy25: "100 augmenté de 25% = 125",
      example50increasedBy10: "50 augmenté de 10% = 55",
      example500decreasedBy25: "500 diminué de 25% = 375",
      example200decreasedBy20: "200 diminué de 20% = 160",
      example100decreasedBy15: "100 diminué de 15% = 85",
      // Additional UI texts
      description: "Calculez les pourcentages, les changements en pourcentage et résolvez divers problèmes de pourcentages",
      quickExamples: "Exemples Rapides",
      // More examples
      example20percentOf150: "20% de 150 = 30",
      example15percentOf200: "15% de 200 = 30",
      example25percentOf80: "25% de 80 = 20",
      example25whatPercentOf200: "25 est quel % de 200 ? = 12.5%",
      example30whatPercentOf120: "30 est quel % de 120 ? = 25%",
      example45whatPercentOf90: "45 est quel % de 90 ? = 50%",
      percentageof: "percentageOf",
      whatpercent: "whatPercent",
      percentagechange: "percentageChange",
      increaseby: "increaseBy",
      decreaseby: "decreaseBy",
  }
};

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculatePercentage = () => {
    let resultText = '';
    let stepsText = '';
    let finalAnswerValue = 0;
    let percentageDisplay = '';

    switch (calculationType) {
      case 'percentageOf':
        // What is percentage% of value1?
        finalAnswerValue = (percentage / 100) * value1;
        resultText = `${percentage}% of ${value1} = ${finalAnswerValue.toFixed(2)}`;
        stepsText = `${t.step1DividePercentageBy100} ${percentage} ÷ 100 = ${(percentage / 100).toFixed(4)}\n${t.step2MultiplyByNumber} ${(percentage / 100).toFixed(4)} × ${value1} = ${finalAnswerValue.toFixed(2)}`;
        percentageDisplay = `${percentage}%`;
        break;

      case 'whatPercent':
        // What percentage is value2 of value1?
        if (value1 === 0) {
          resultText = t.cannotDivideByZero;
          stepsText = t.errorDivisionByZero;
          break;
        }
        finalAnswerValue = (value2 / value1) * 100;
        resultText = `${value2}${t.is}${finalAnswerValue.toFixed(2)}% of ${value1}`;
        stepsText = `${t.step1DividePartByWhole} ${value2} ÷ ${value1} = ${(value2 / value1).toFixed(4)}\n${t.step2MultiplyBy100} ${(value2 / value1).toFixed(4)} × 100 = ${finalAnswerValue.toFixed(2)}%`;
        percentageDisplay = `${finalAnswerValue.toFixed(2)}%`;
        break;

      case 'percentageChange':
        // Percentage change from value2 to value1
        if (value2 === 0) {
          resultText = t.cannotCalculatePercentageChange;
          stepsText = t.errorOriginalValueZero;
          break;
        }
        const change = value1 - value2;
        finalAnswerValue = (change / Math.abs(value2)) * 100;
        const changeType = finalAnswerValue >= 0 ? t.increase : t.decrease;
        resultText = `${Math.abs(finalAnswerValue).toFixed(2)}% ${changeType}${t.from}${value2}${t.to}${value1}`;
        stepsText = `${t.step1CalculateDifference} ${value1} - ${value2} = ${change}\n${t.step2DivideByOriginalValue} ${change} ÷ ${Math.abs(value2)} = ${(change / Math.abs(value2)).toFixed(4)}\n${t.step3MultiplyBy100} ${(change / Math.abs(value2)).toFixed(4)} × 100 = ${Math.abs(finalAnswerValue).toFixed(2)}%`;
        percentageDisplay = `${finalAnswerValue >= 0 ? '+' : ''}${finalAnswerValue.toFixed(2)}%`;
        break;

      case 'increaseBy':
        // Increase value1 by percentage%
        finalAnswerValue = value1 * (1 + percentage / 100);
        resultText = `${value1} ${t.increasedBy} ${percentage}% = ${finalAnswerValue.toFixed(2)}`;
        stepsText = `${t.step1ConvertPercentageToDecimal} ${percentage} ÷ 100 = ${(percentage / 100).toFixed(4)}\n${t.step2Add1} 1 + ${(percentage / 100).toFixed(4)} = ${(1 + percentage / 100).toFixed(4)}\n${t.step3MultiplyByOriginalValue} ${(1 + percentage / 100).toFixed(4)} × ${value1} = ${finalAnswerValue.toFixed(2)}`;
        percentageDisplay = `+${percentage}%`;
        break;

      case 'decreaseBy':
        // Decrease value1 by percentage%
        finalAnswerValue = value1 * (1 - percentage / 100);
        resultText = `${value1} ${t.decreasedBy} ${percentage}% = ${finalAnswerValue.toFixed(2)}`;
        stepsText = `${t.step1ConvertPercentageToDecimal} ${percentage} ÷ 100 = ${(percentage / 100).toFixed(4)}\n${t.step2SubtractFrom1} 1 - ${(percentage / 100).toFixed(4)} = ${(1 - percentage / 100).toFixed(4)}\n${t.step3MultiplyByOriginalValue} ${(1 - percentage / 100).toFixed(4)} × ${value1} = ${finalAnswerValue.toFixed(2)}`;
        percentageDisplay = `-${percentage}%`;
        break;

      default:
        break;
    }

    setResult(resultText);
    setSteps(stepsText);
    setAnswer(finalAnswerValue);
    setPercentageValue(percentageDisplay);
  };

  useEffect(() => {
    calculatePercentage();
  }, [calculationType, value1, value2, percentage]);

  const renderInputs = () => {
    switch (calculationType) {
      case 'percentageOf':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.percentage}
              </label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="1000"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.value1}
              </label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
          </>
        );

      case 'whatPercent':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Part ({t.value2})
              </label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Whole ({t.value1})
              </label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
          </>
        );

      case 'percentageChange':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Value ({t.value1})
              </label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Value ({t.value2})
              </label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.01"
              />
            </div>
          </>
        );

      case 'increaseBy':
      case 'decreaseBy':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Value ({t.value1})
              </label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.percentage}
              </label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="1000"
                step="0.01"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.calculationType}
            </label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="percentageOf">{t.percentageOf}</option>
              <option value="whatPercent">{t.whatPercent}</option>
              <option value="percentageChange">{t.percentageChange}</option>
              <option value="increaseBy">{t.increaseBy}</option>
              <option value="decreaseBy">{t.decreaseBy}</option>
            </select>
          </div>

          {renderInputs()}

          {/* Quick Examples */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{t.quickExamples}</h3>
            <div className="text-xs text-gray-600 space-y-1">
              {calculationType === 'percentageOf' && (
                <>
                  <div>{t.example20percentOf150}</div>
                  <div>{t.example15percentOf200}</div>
                  <div>{t.example25percentOf80}</div>
                </>
              )}
              {calculationType === 'whatPercent' && (
                <>
                  <div>{t.example25whatPercentOf200}</div>
                  <div>{t.example30whatPercentOf120}</div>
                  <div>{t.example45whatPercentOf90}</div>
                </>
              )}
              {calculationType === 'percentageChange' && (
                <>
                  <div>{t.example50to65}</div>
                  <div>{t.example200to150}</div>
                  <div>{t.example100to120}</div>
                </>
              )}
              {calculationType === 'increaseBy' && (
                <>
                  <div>{t.example200increasedBy15}</div>
                  <div>{t.example100increasedBy25}</div>
                  <div>{t.example50increasedBy10}</div>
                </>
              )}
              {calculationType === 'decreaseBy' && (
                <>
                  <div>{t.example500decreasedBy25}</div>
                  <div>{t.example200decreasedBy20}</div>
                  <div>{t.example100decreasedBy15}</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{t.result}</h3>
            <div className="text-2xl font-bold text-blue-600 min-h-[48px] flex items-center">
              {result || t.enterValuesToCalculate}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-green-900 mb-2">{t.calculationSteps}</h3>
            <div className="text-sm text-green-700 whitespace-pre-line font-mono">
              {steps || t.stepsWillAppearHere}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">{t.finalAnswer}</h4>
              <div className="text-lg font-bold text-purple-600">
                {isNaN(answer) ? '0.00' : answer.toFixed(2)}
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-orange-900 mb-1">{t.percentageSymbol}</h4>
              <div className="text-lg font-bold text-orange-600">
                {percentageValue || '0%'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
