'use client';

import { useState, useEffect } from 'react';

interface SalaryCalculatorProps {
  lang?: string;
}

export default function SalaryCalculator({ lang = 'en' }: SalaryCalculatorProps) {
  const [inputs, setInputs] = useState({
    baseSalary: 75000,
    bonusType: 'percentage',
    bonusPercentage: 10,
    bonusFixed: 0,
    benefitsValue: 15000,
    stockOptions: 0,
    includeEmployerCost: true,
    employerTaxRate: 7.65
  });

  const [results, setResults] = useState({
    totalCompensation: 0,
    totalBonus: 0,
    totalBenefits: 0,
    employerCost: 0,
    employerTaxes: 0,
    costPerDollar: 0
  });

  const translations = {
    en: {
      title: "Salary Calculator",
      description: "Calculate total compensation packages including salary, bonuses, benefits, and employer costs",
      baseSalary: "Base Annual Salary",
      bonusType: "Bonus Type",
      bonusPercentage: "Bonus Percentage",
      bonusFixed: "Fixed Bonus Amount",
      benefitsValue: "Annual Benefits Value",
      stockOptions: "Stock Options/Equity Value",
      includeEmployerCost: "Calculate Employer Cost",
      employerTaxRate: "Employer Tax Rate",
      percentage: "Percentage",
      fixed: "Fixed Amount",
      calculate: "Calculate Compensation",
      reset: "Reset",
      results: "Compensation Breakdown",
      totalCompensation: "Total Compensation",
      totalBonus: "Bonus Amount",
      benefits: "Benefits Value",
      employerCost: "Total Employer Cost",
      employerTaxes: "Employer Taxes",
      costPerDollar: "Cost per $1 of Compensation",
      currency: "$",
      formula: "Formula: Total Compensation = Base Salary + Bonus + Benefits + Stock Options",
      employerCostFormula: "Employer Cost = Total Compensation × (1 + Tax Rate)",
      note: "Note: Employer cost includes additional payroll taxes and benefits. Actual costs may vary by location and benefits plan.",
      examples: "Examples"
    },
    es: {
      title: "Calculadora de Salario",
      description: "Calcula paquetes de compensación total incluyendo salario, bonos, beneficios y costos para empleador",
      baseSalary: "Salario Base Anual",
      bonusType: "Tipo de Bono",
      bonusPercentage: "Porcentaje de Bono",
      bonusFixed: "Monto Fijo de Bono",
      benefitsValue: "Valor Anual de Beneficios",
      stockOptions: "Valor de Opciones de Acciones/Capital",
      includeEmployerCost: "Calcular Costo para Empleador",
      employerTaxRate: "Tasa de Impuestos de Empleador",
      percentage: "Porcentaje",
      fixed: "Monto Fijo",
      calculate: "Calcular Compensación",
      reset: "Reiniciar",
      results: "Desglose de Compensación",
      totalCompensation: "Compensación Total",
      totalBonus: "Monto de Bono",
      benefits: "Valor de Beneficios",
      employerCost: "Costo Total para Empleador",
      employerTaxes: "Impuestos de Empleador",
      costPerDollar: "Costo por $1 de Compensación",
      currency: "$",
      formula: "Fórmula: Compensación Total = Salario Base + Bono + Beneficios + Opciones de Acciones",
      employerCostFormula: "Costo para Empleador = Compensación Total × (1 + Tasa de Impuestos)",
      note: "Nota: El costo para empleador incluye impuestos adicionales de nómina y beneficios. Los costos reales pueden variar por ubicación y plan de beneficios.",
      examples: "Ejemplos"
    },
    pt: {
      title: "Calculadora de Salário",
      description: "Calcula pacotes de compensação total incluindo salário, bônus, benefícios e custos para empregador",
      baseSalary: "Salário Base Anual",
      bonusType: "Tipo de Bônus",
      bonusPercentage: "Porcentagem de Bônus",
      bonusFixed: "Valor Fixo de Bônus",
      benefitsValue: "Valor Anual de Benefícios",
      stockOptions: "Valor de Opções de Ações/Equity",
      includeEmployerCost: "Calcular Custo para Empregador",
      employerTaxRate: "Taxa de Impostos de Empregador",
      percentage: "Porcentagem",
      fixed: "Valor Fixo",
      calculate: "Calcular Compensação",
      reset: "Reiniciar",
      results: "Quebra de Compensação",
      totalCompensation: "Compensação Total",
      totalBonus: "Valor de Bônus",
      benefits: "Valor de Benefícios",
      employerCost: "Custo Total para Empregador",
      employerTaxes: "Impostos de Empregador",
      costPerDollar: "Custo por R$1 de Compensação",
      currency: "R$",
      formula: "Fórmula: Compensação Total = Salário Base + Bônus + Benefícios + Opções de Ações",
      employerCostFormula: "Custo para Empregador = Compensação Total × (1 + Taxa de Impostos)",
      note: "Nota: O custo para empregador inclui impostos adicionais de folha de pagamento e benefícios. Os custos reais podem variar por localização e plano de benefícios.",
      examples: "Exemplos"
    },
    fr: {
      title: "Calculateur de Salaire",
      description: "Calcule les packages de compensation totale incluant salaire, primes, avantages et coûts employeur",
      baseSalary: "Salaire de Base Annuel",
      bonusType: "Type de Prime",
      bonusPercentage: "Pourcentage de Prime",
      bonusFixed: "Montant Fixe de Prime",
      benefitsValue: "Valeur Annuelle d'Avantages",
      stockOptions: "Valeur d'Options d'Actions/Equity",
      includeEmployerCost: "Calculer Coût Employeur",
      employerTaxRate: "Taux d'Impôts Employeur",
      percentage: "Pourcentage",
      fixed: "Montant Fixe",
      calculate: "Calculer la Compensation",
      reset: "Réinitialiser",
      results: "Ventilation de Compensation",
      totalCompensation: "Compensation Totale",
      totalBonus: "Montant de Prime",
      benefits: "Valeur d'Avantages",
      employerCost: "Coût Total Employeur",
      employerTaxes: "Impôts Employeur",
      costPerDollar: "Coût par €1 de Compensation",
      currency: "€",
      formula: "Formule: Compensation Totale = Salaire de Base + Prime + Avantages + Options d'Actions",
      employerCostFormula: "Coût Employeur = Compensation Totale × (1 + Taux d'Impôts)",
      note: "Note: Le coût employeur inclut impôts supplémentaires de paie et avantages. Les coûts réels peuvent varier selon localisation et plan d'avantages.",
      examples: "Exemples"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateResults = () => {
    const bonus = inputs.bonusType === 'percentage'
      ? (inputs.baseSalary * inputs.bonusPercentage / 100)
      : inputs.bonusFixed;

    const totalCompensation = inputs.baseSalary + bonus + inputs.benefitsValue + inputs.stockOptions;

    let employerCost = totalCompensation;
    let employerTaxes = 0;
    let costPerDollar = 1;

    if (inputs.includeEmployerCost) {
      employerTaxes = totalCompensation * (inputs.employerTaxRate / 100);
      employerCost = totalCompensation + employerTaxes;
      costPerDollar = employerCost / totalCompensation;
    }

    return {
      totalCompensation: Math.round(totalCompensation),
      totalBonus: Math.round(bonus),
      totalBenefits: Math.round(inputs.benefitsValue),
      employerCost: Math.round(employerCost),
      employerTaxes: Math.round(employerTaxes),
      costPerDollar: Math.round(costPerDollar * 100) / 100
    };
  };

  useEffect(() => {
    const results = calculateResults();
    setResults(results);
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : Number(value) || 0
    }));
  };

  const resetCalculator = () => {
    setInputs({
      baseSalary: 75000,
      bonusType: 'percentage',
      bonusPercentage: 10,
      bonusFixed: 0,
      benefitsValue: 15000,
      stockOptions: 0,
      includeEmployerCost: true,
      employerTaxRate: 7.65
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.baseSalary} ({t.currency})
            </label>
            <input
              type="number"
              value={inputs.baseSalary}
              onChange={(e) => handleInputChange('baseSalary', e.target.value)}
              min="0"
              max="1000000"
              step="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.bonusType}
            </label>
            <select
              value={inputs.bonusType}
              onChange={(e) => handleInputChange('bonusType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="percentage">{t.percentage}</option>
              <option value="fixed">{t.fixed}</option>
            </select>
          </div>

          {inputs.bonusType === 'percentage' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.bonusPercentage} (%)
              </label>
              <input
                type="number"
                value={inputs.bonusPercentage}
                onChange={(e) => handleInputChange('bonusPercentage', e.target.value)}
                min="0"
                max="100"
                step="0.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.bonusFixed} ({t.currency})
              </label>
              <input
                type="number"
                value={inputs.bonusFixed}
                onChange={(e) => handleInputChange('bonusFixed', e.target.value)}
                min="0"
                max="500000"
                step="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.benefitsValue} ({t.currency})
            </label>
            <input
              type="number"
              value={inputs.benefitsValue}
              onChange={(e) => handleInputChange('benefitsValue', e.target.value)}
              min="0"
              max="100000"
              step="500"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.stockOptions} ({t.currency})
            </label>
            <input
              type="number"
              value={inputs.stockOptions}
              onChange={(e) => handleInputChange('stockOptions', e.target.value)}
              min="0"
              max="1000000"
              step="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={inputs.includeEmployerCost}
                onChange={(e) => handleInputChange('includeEmployerCost', e.target.checked)}
                className="mr-2"
              />
              {t.includeEmployerCost}
            </label>
          </div>

          {inputs.includeEmployerCost && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.employerTaxRate} (%)
              </label>
              <input
                type="number"
                value={inputs.employerTaxRate}
                onChange={(e) => handleInputChange('employerTaxRate', e.target.value)}
                min="0"
                max="20"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setResults(calculateResults())}
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
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.results}</h3>

            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-sm text-gray-600">{t.totalCompensation}</div>
                <div className="text-2xl font-bold text-green-600">
                  {t.currency}{results.totalCompensation.toLocaleString()}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-gray-600">{t.totalBonus}</div>
                <div className="text-xl font-semibold text-blue-600">
                  {t.currency}{results.totalBonus.toLocaleString()}
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-sm text-gray-600">{t.benefits}</div>
                <div className="text-xl font-semibold text-purple-600">
                  {t.currency}{results.totalBenefits.toLocaleString()}
                </div>
              </div>

              {inputs.includeEmployerCost && (
                <>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="text-sm text-gray-600">{t.employerCost}</div>
                    <div className="text-xl font-semibold text-red-600">
                      {t.currency}{results.employerCost.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="text-sm text-gray-600">{t.employerTaxes}</div>
                    <div className="text-lg font-semibold text-orange-600">
                      {t.currency}{results.employerTaxes.toLocaleString()}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="text-sm text-gray-600">{t.costPerDollar}</div>
                    <div className="text-lg font-semibold text-yellow-600">
                      {t.currency}{results.costPerDollar.toFixed(2)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Formula and Examples */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">{t.formula}</h4>
            {inputs.includeEmployerCost && (
              <h4 className="font-medium text-gray-900 mb-2">{t.employerCostFormula}</h4>
            )}
            <p className="text-sm text-gray-600 mb-4">{t.note}</p>

            <div className="space-y-2 text-sm">
              <div>
                <strong>{t.baseSalary}:</strong> {t.currency}{inputs.baseSalary.toLocaleString()}
              </div>
              <div>
                <strong>{t.totalBonus}:</strong> {t.currency}{results.totalBonus.toLocaleString()}
              </div>
              <div>
                <strong>{t.benefits}:</strong> {t.currency}{results.totalBenefits.toLocaleString()}
              </div>
              {inputs.stockOptions > 0 && (
                <div>
                  <strong>{t.stockOptions}:</strong> {t.currency}{inputs.stockOptions.toLocaleString()}
                </div>
              )}
              <div className="border-t pt-2">
                <strong>{t.totalCompensation}:</strong> {t.currency}{results.totalCompensation.toLocaleString()}
              </div>
              {inputs.includeEmployerCost && (
                <div>
                  <strong>{t.employerCost}:</strong> {t.currency}{results.employerCost.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
