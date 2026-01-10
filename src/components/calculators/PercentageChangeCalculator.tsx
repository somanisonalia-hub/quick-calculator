'use client';

import { useState, useEffect } from 'react';

interface PercentageChangeCalculatorProps {
  lang?: string;
}

export default function PercentageChangeCalculator({ lang = 'en' }: PercentageChangeCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<'percentage_change' | 'find_new_value'>('percentage_change');
  const [originalValue, setOriginalValue] = useState(100);
  const [newValue, setNewValue] = useState(120);
  const [percentage, setPercentage] = useState(20);
  const [changeDirection, setChangeDirection] = useState<'increase' | 'decrease'>('increase');
  const [showSteps, setShowSteps] = useState(false);

  const [results, setResults] = useState({
    percentageChange: 0,
    absoluteChange: 0,
    changeType: 'increase' as 'increase' | 'decrease' | 'no change',
    multiplier: 0
  });

  const [steps, setSteps] = useState<string[]>([]);

  const translations = {
    en: {
      title: "Percentage Change Calculator",
      description: "Calculate percentage increase, decrease, and change between two values",
      calculationMode: "Calculation Mode",
      calculatePercentageChange: "Calculate Percentage Change",
      findNewValue: "Find New Value",
      originalValue: "Original Value",
      newValue: "New Value",
      percentage: "Percentage",
      changeDirection: "Change Direction",
      calculate: "Calculate",
      reset: "Reset Values",
      percentageChange: "Percentage Change",
      absoluteChange: "Absolute Change",
      changeType: "Change Type",
      multiplier: "Multiplier",
      increase: "Increase",
      decrease: "Decrease",
      noChange: "No Change",
      showSteps: "Show Step-by-Step",
      stepByStep: "Step-by-Step Calculation",
      formula: "Formula",
      examples: "Examples",
      explanation: "Explanation",
      step: "Step",
      calculation: "Calculation",
      result: "Result",
      enterOriginalAndNew: "Enter original and new values to calculate percentage change",
      enterOriginalPercentageDirection: "Enter original value, percentage, and direction to find new value",
      visualchange: "Visual Change",
      difference: "Difference",
      percentagechange: "Percentage change",
      newvalueoriginal1percentage100increase: "New Value = Original × (1 + Percentage/100)",
      newvalueoriginal1percentage100decrease: "New Value = Original × (1 - Percentage/100)",
      stockprice506020increase: "Stock price: $50 → $60 = +20% increase",
      temperature80f68f15decrease: "Temperature: 80°F → 68°F = -15% decrease",
      population1000120020growth: "Population: 1,000 → 1,200 = +20% growth",
      sales10000850015decline: "Sales: $10,000 → $8,500 = -15% decline",
      salary5000010increase55000: "Salary: $50,000 + 10% increase = $55,000",
      price10020discount80: "Price: $100 - 20% discount = $80",
      tax50015deduction425: "Tax: $500 - 15% deduction = $425",
      investment100025return1250: "Investment: $1,000 + 25% return = $1,250",
      percentageChangeFormula: "Percentage Change = ((New - Original) ÷ |Original|) × 100",
      positiveResultIncrease: "Positive result = Increase",
      negativeResultDecrease: "Negative result = Decrease",
      zeroResultNoChange: "Zero result = No change",
      newValueIncreaseFormula: "New Value = Original × (1 + Percentage/100)",
      newValueDecreaseFormula: "New Value = Original × (1 - Percentage/100)",
      multiplyByIncrease: "Multiply by (1 + percentage/100)",
      multiplyByDecrease: "Multiply by (1 - percentage/100)",
      originalLabel: "Original",
      newLabel: "New",
  },
    es: {
      title: "Calculadora de Cambio Porcentual",
      description: "Calcula aumento porcentual, disminución y cambio entre dos valores",
      calculationMode: "Modo de Cálculo",
      calculatePercentageChange: "Calcular Cambio Porcentual",
      findNewValue: "Encontrar Valor Nuevo",
      originalValue: "Valor Original",
      newValue: "Valor Nuevo",
      percentage: "Porcentaje",
      changeDirection: "Dirección del Cambio",
      calculate: "Calcular",
      reset: "Reiniciar Valores",
      percentageChange: "Cambio Porcentual",
      absoluteChange: "Cambio Absoluto",
      changeType: "Tipo de Cambio",
      multiplier: "Multiplicador",
      increase: "Aumento",
      decrease: "Disminución",
      noChange: "Sin Cambio",
      showSteps: "Mostrar Paso a Paso",
      stepByStep: "Cálculo Paso a Paso",
      formula: "Fórmula",
      examples: "Ejemplos",
      explanation: "Explicación",
      step: "Paso",
      calculation: "Cálculo",
      result: "Resultado",
      enterOriginalAndNew: "Ingresa valores original y nuevo para calcular cambio porcentual",
      enterOriginalPercentageDirection: "Ingresa valor original, porcentaje y dirección para encontrar valor nuevo",
      visualchange: "Cambio Visual",
      difference: "Diferencia",
      percentagechange: "Cambio porcentual",
      newvalueoriginal1percentage100increase: "Nuevo Valor = Original × (1 + Porcentaje/100)",
      newvalueoriginal1percentage100decrease: "Nuevo Valor = Original × (1 - Porcentaje/100)",
      stockprice506020increase: "Precio de acciones: $50 → $60 = +20% aumento",
      temperature80f68f15decrease: "Temperatura: 80°F → 68°F = -15% disminución",
      population1000120020growth: "Población: 1,000 → 1,200 = +20% crecimiento",
      sales10000850015decline: "Ventas: $10,000 → $8,500 = -15% declive",
      salary5000010increase55000: "Salario: $50,000 + 10% aumento = $55,000",
      price10020discount80: "Precio: $100 - 20% descuento = $80",
      tax50015deduction425: "Impuesto: $500 - 15% deducción = $425",
      investment100025return1250: "Inversión: $1,000 + 25% retorno = $1,250",
      percentageChangeFormula: "Cambio Porcentual = ((Nuevo - Original) ÷ |Original|) × 100",
      positiveResultIncrease: "Resultado positivo = Aumento",
      negativeResultDecrease: "Resultado negativo = Disminución",
      zeroResultNoChange: "Resultado cero = Sin cambio",
      newValueIncreaseFormula: "Valor Nuevo = Original × (1 + Porcentaje/100)",
      newValueDecreaseFormula: "Valor Nuevo = Original × (1 - Porcentaje/100)",
      multiplyByIncrease: "Multiplicar por (1 + porcentaje/100)",
      multiplyByDecrease: "Multiplicar por (1 - porcentaje/100)",
      originalLabel: "Original",
      newLabel: "Nuevo",
  },
    pt: {
      title: "Calculadora de Mudança Percentual",
      description: "Calcule aumento percentual, diminuição e mudança entre dois valores",
      calculationMode: "Modo de Cálculo",
      calculatePercentageChange: "Calcular Mudança Percentual",
      findNewValue: "Encontrar Valor Novo",
      originalValue: "Valor Original",
      newValue: "Valor Novo",
      percentage: "Porcentagem",
      changeDirection: "Direção da Mudança",
      calculate: "Calcular",
      reset: "Reiniciar Valores",
      percentageChange: "Mudança Percentual",
      absoluteChange: "Mudança Absoluta",
      changeType: "Tipo de Mudança",
      multiplier: "Multiplicador",
      increase: "Aumento",
      decrease: "Diminuição",
      noChange: "Sem Mudança",
      showSteps: "Mostrar Passo a Passo",
      stepByStep: "Cálculo Passo a Passo",
      formula: "Fórmula",
      examples: "Exemplos",
      explanation: "Explicação",
      step: "Passo",
      calculation: "Cálculo",
      result: "Resultado",
      enterOriginalAndNew: "Digite valores original e novo para calcular mudança percentual",
      enterOriginalPercentageDirection: "Digite valor original, porcentagem e direção para encontrar valor novo",
      visualchange: "Mudança Visual",
      difference: "Diferença",
      percentagechange: "Mudança porcentual",
      stockprice506020increase: "Preço das ações: $50 → $60 = +20% aumento",
      temperature80f68f15decrease: "Temperatura: 80°F → 68°F = -15% diminuição",
      population1000120020growth: "População: 1,000 → 1,200 = +20% crescimento",
      sales10000850015decline: "Vendas: $10,000 → $8,500 = -15% declínio",
      salary5000010increase55000: "Salário: $50,000 + 10% aumento = $55,000",
      price10020discount80: "Preço: $100 - 20% desconto = $80",
      tax50015deduction425: "Imposto: $500 - 15% dedução = $425",
      investment100025return1250: "Investimento: $1,000 + 25% retorno = $1,250",
      percentageChangeFormula: "Mudança Percentual = ((Novo - Original) ÷ |Original|) × 100",
      positiveResultIncrease: "Resultado positivo = Aumento",
      negativeResultDecrease: "Resultado negativo = Diminuição",
      zeroResultNoChange: "Resultado zero = Sem mudança",
      newValueIncreaseFormula: "Valor Novo = Original × (1 + Porcentagem/100)",
      newValueDecreaseFormula: "Valor Novo = Original × (1 - Porcentagem/100)",
      multiplyByIncrease: "Multiplicar por (1 + porcentagem/100)",
      multiplyByDecrease: "Multiplicar por (1 - porcentagem/100)",
      originalLabel: "Original",
      newLabel: "Novo",
  },
    fr: {
      title: "Calculateur de Changement de Pourcentage",
      description: "Calculez augmentation, diminution et changement de pourcentage entre deux valeurs",
      calculationMode: "Mode de Calcul",
      calculatePercentageChange: "Calculer Changement de Pourcentage",
      findNewValue: "Trouver Nouvelle Valeur",
      originalValue: "Valeur Originale",
      newValue: "Nouvelle Valeur",
      percentage: "Pourcentage",
      changeDirection: "Direction du Changement",
      calculate: "Calculer",
      reset: "Réinitialiser les Valeurs",
      percentageChange: "Changement de Pourcentage",
      absoluteChange: "Changement Absolu",
      changeType: "Type de Changement",
      multiplier: "Multiplicateur",
      increase: "Augmentation",
      decrease: "Diminution",
      noChange: "Aucun Changement",
      showSteps: "Afficher Étape par Étape",
      stepByStep: "Calcul Étape par Étape",
      formula: "Formule",
      examples: "Exemples",
      explanation: "Explication",
      step: "Étape",
      calculation: "Calcul",
      result: "Résultat",
      enterOriginalAndNew: "Entrez les valeurs originale et nouvelle pour calculer le changement de pourcentage",
      enterOriginalPercentageDirection: "Entrez la valeur originale, le pourcentage et la direction pour trouver la nouvelle valeur",
      visualchange: "Changement Visuel",
      difference: "Différence",
      percentagechange: "Changement de pourcentage",
      newvalueoriginal1percentage100increase: "Nouvelle Valeur = Original × (1 + Pourcentage/100)",
      newvalueoriginal1percentage100decrease: "Nouvelle Valeur = Original × (1 - Pourcentage/100)",
      stockprice506020increase: "Prix des actions: $50 → $60 = +20% augmentation",
      temperature80f68f15decrease: "Température: 80°F → 68°F = -15% diminution",
      population1000120020growth: "Population: 1,000 → 1,200 = +20% croissance",
      sales10000850015decline: "Ventes: $10,000 → $8,500 = -15% déclin",
      salary5000010increase55000: "Salaire: $50,000 + 10% augmentation = $55,000",
      price10020discount80: "Prix: $100 - 20% remise = $80",
      tax50015deduction425: "Impôt: $500 - 15% déduction = $425",
      investment100025return1250: "Investissement: $1,000 + 25% rendement = $1,250",
      percentageChangeFormula: "Changement de Pourcentage = ((Nouveau - Original) ÷ |Original|) × 100",
      positiveResultIncrease: "Résultat positif = Augmentation",
      negativeResultDecrease: "Résultat négatif = Diminution",
      zeroResultNoChange: "Résultat zéro = Aucun changement",
      newValueIncreaseFormula: "Nouvelle Valeur = Original × (1 + Pourcentage/100)",
      newValueDecreaseFormula: "Nouvelle Valeur = Original × (1 - Pourcentage/100)",
      multiplyByIncrease: "Multiplier par (1 + pourcentage/100)",
      multiplyByDecrease: "Multiplier par (1 - pourcentage/100)",
      originalLabel: "Original",
      newLabel: "Nouveau",
  }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculatePercentageChange = () => {
    let calculatedNewValue = newValue;
    let absoluteChange = 0;
    let percentageChange = 0;
    let changeType: 'increase' | 'decrease' | 'no change' = 'no change';
    let multiplier = 1;

    if (calculationMode === 'percentage_change') {
      // Calculate percentage change from two values
      absoluteChange = newValue - originalValue;
      calculatedNewValue = newValue;

      if (originalValue === 0) {
        percentageChange = newValue === 0 ? 0 : Infinity;
        changeType = newValue > 0 ? 'increase' : newValue < 0 ? 'decrease' : 'no change';
      } else {
        percentageChange = (absoluteChange / Math.abs(originalValue)) * 100;
        changeType = absoluteChange > 0 ? 'increase' : absoluteChange < 0 ? 'decrease' : 'no change';
      }

      multiplier = originalValue !== 0 ? newValue / originalValue : 1;
    } else {
      // Find new value from original + percentage + direction
      const percentageDecimal = percentage / 100;
      if (changeDirection === 'increase') {
        calculatedNewValue = originalValue * (1 + percentageDecimal);
        percentageChange = percentage;
        changeType = 'increase';
      } else {
        calculatedNewValue = originalValue * (1 - percentageDecimal);
        percentageChange = -percentage;
        changeType = 'decrease';
      }

      absoluteChange = calculatedNewValue - originalValue;
      multiplier = calculatedNewValue / originalValue;
    }

    setResults({
      percentageChange,
      absoluteChange,
      changeType,
      multiplier
    });

    // Generate steps if requested
    if (showSteps) {
      let stepsArray: string[] = [];

      if (calculationMode === 'percentage_change') {
        stepsArray = [
          `${t.originalValue}: ${originalValue}`,
          `${t.newValue}: ${newValue}`,
          `${t.difference}: ${newValue} - ${originalValue} = ${absoluteChange}`,
          `${t.percentagechange}: (${absoluteChange} ÷ ${Math.abs(originalValue)}) × 100 = ${percentageChange.toFixed(2)}%`,
          `${t.changeType}: ${changeType === 'increase' ? t.increase : changeType === 'decrease' ? t.decrease : t.noChange}`,
          `${t.multiplier}: ${newValue} ÷ ${originalValue} = ${multiplier.toFixed(3)}`
        ];
      } else {
        const operation = changeDirection === 'increase' ? '+' : '-';
        stepsArray = [
          `${t.originalValue}: ${originalValue}`,
          `${t.percentage}: ${percentage}%`,
          `${t.changeDirection}: ${changeDirection === 'increase' ? t.increase : t.decrease}`,
          `${t.newValue}: ${originalValue} × (1 ${operation} ${percentage / 100}) = ${calculatedNewValue.toFixed(2)}`,
          `${t.percentagechange}: ${percentageChange > 0 ? '+' : ''}${percentageChange.toFixed(2)}%`,
          `${t.multiplier}: ${calculatedNewValue.toFixed(2)} ÷ ${originalValue} = ${multiplier.toFixed(3)}`
        ];
      }

      setSteps(stepsArray);
    }
  };

  useEffect(() => {
    calculatePercentageChange();
  }, [originalValue, newValue, percentage, changeDirection, calculationMode, showSteps]);

  const resetCalculator = () => {
    setCalculationMode('percentage_change');
    setOriginalValue(100);
    setNewValue(120);
    setPercentage(20);
    setChangeDirection('increase');
    setShowSteps(false);
  };

  const getChangeColor = () => {
    switch (results.changeType) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    switch (results.changeType) {
      case 'increase': return '↗️';
      case 'decrease': return '↘️';
      default: return '➡️';
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
          {/* Calculation Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.calculationMode}</label>
            <select
              value={calculationMode}
              onChange={(e) => setCalculationMode(e.target.value as 'percentage_change' | 'find_new_value')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="percentage_change">{t.calculatePercentageChange}</option>
              <option value="find_new_value">{t.findNewValue}</option>
            </select>
          </div>

          {/* Mode-specific inputs */}
          {calculationMode === 'percentage_change' ? (
            <>
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                {t.enterOriginalAndNew}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.originalValue}</label>
                  <input
                    type="number"
                    value={originalValue}
                    onChange={(e) => setOriginalValue(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="any"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.newValue}</label>
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="any"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                {t.enterOriginalPercentageDirection}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.originalValue}</label>
                  <input
                    type="number"
                    value={originalValue}
                    onChange={(e) => setOriginalValue(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="any"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.percentage} (%)</label>
                  <input
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step="any"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.changeDirection}</label>
                <select
                  value={changeDirection}
                  onChange={(e) => setChangeDirection(e.target.value as 'increase' | 'decrease')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="increase">{t.increase}</option>
                  <option value="decrease">{t.decrease}</option>
                </select>
              </div>
            </>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showSteps"
              checked={showSteps}
              onChange={(e) => setShowSteps(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showSteps" className="text-sm text-gray-700">{t.showSteps}</label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={calculatePercentageChange}
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
            <h4 className="text-sm font-semibold text-green-900 mb-2">{t.formula}</h4>
            {calculationMode === 'percentage_change' ? (
              <>
                <div className="text-sm font-mono text-green-700">
                  {t.percentageChangeFormula}
                </div>
                <div className="text-xs text-green-600 mt-2">
                  • {t.positiveResultIncrease}<br/>
                  • {t.negativeResultDecrease}<br/>
                  • {t.zeroResultNoChange}
                </div>
              </>
            ) : (
              <>
                <div className="text-sm font-mono text-green-700">
                  {changeDirection === 'increase'
                    ? t.newValueIncreaseFormula
                    : t.newValueDecreaseFormula}
                </div>
                <div className="text-xs text-green-600 mt-2">
                  • {t.increase}: {t.multiplyByIncrease}<br/>
                  • {t.decrease}: {t.multiplyByDecrease}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">{t.percentageChange}</h3>
            <div className="text-center">
              <div className={`text-5xl font-bold mb-2 ${getChangeColor()}`}>
                {getChangeIcon()} {results.percentageChange.toFixed(2)}%
              </div>
              <div className={`text-lg font-semibold ${getChangeColor()}`}>
                {results.changeType === 'increase' ? t.increase :
                 results.changeType === 'decrease' ? t.decrease : t.noChange}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">{t.absoluteChange}</h4>
              <div className="text-lg font-bold text-purple-600">
                {results.absoluteChange >= 0 ? '+' : ''}{results.absoluteChange.toFixed(2)}
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="text-sm font-semibold text-orange-900 mb-1">{t.multiplier}</h4>
              <div className="text-lg font-bold text-orange-600">
                {results.multiplier.toFixed(3)}x
              </div>
            </div>
          </div>

          {/* Step-by-Step Calculation */}
          {showSteps && steps.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">{t.stepByStep}</h4>
              <div className="space-y-2 text-sm">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Examples */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.examples}</h4>
            {calculationMode === 'percentage_change' ? (
              <div className="text-xs text-indigo-700 space-y-1">
                <div>{t.stockprice506020increase}</div>
                <div>{t.temperature80f68f15decrease}</div>
                <div>{t.population1000120020growth}</div>
                <div>{t.sales10000850015decline}</div>
              </div>
            ) : (
              <div className="text-xs text-indigo-700 space-y-1">
                <div>{t.salary5000010increase55000}</div>
                <div>{t.price10020discount80}</div>
                <div>{t.investment100025return1250}</div>
                <div>{t.tax50015deduction425}</div>
              </div>
            )}
          </div>

          {/* Visual Representation */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-red-900 mb-2">{t.visualchange}</h4>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-xs text-gray-600">{t.originalLabel}</div>
                <div className="font-bold">{originalValue}</div>
              </div>
              <div className="text-2xl text-gray-400">→</div>
              <div className="text-center">
                <div className="text-2xl mb-1">📈</div>
                <div className="text-xs text-gray-600">{t.newLabel}</div>
                <div className={`font-bold ${getChangeColor()}`}>{newValue}</div>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className={`text-sm font-semibold ${getChangeColor()}`}>
                {results.changeType === 'increase' && '📈 Growth'}
                {results.changeType === 'decrease' && '📉 Decline'}
                {results.changeType === 'no change' && '➡️ Stable'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
