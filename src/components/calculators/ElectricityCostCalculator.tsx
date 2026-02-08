'use client';

import React, { useState } from 'react';

interface ElectricityCostCalculatorProps {
  lang?: string;
}

const translations = {
  en: {
    title: 'Electricity Cost Calculator',
    monthlyUsageLabel: 'Monthly Usage (kWh)',
    monthlyUsagePlaceholder: 'Enter kWh',
    rateLabel: 'Rate per kWh ($)',
    ratePlaceholder: 'Enter rate',
    calculate: 'Calculate Cost',
    monthlyCost: 'Monthly Cost',
    dailyCost: 'Daily Cost',
    yearlyCost: 'Yearly Cost',
    weeklyCost: 'Weekly Cost',
    savingsLabel: 'Potential Savings',
    reductionLabel: 'Reduce Usage By (%)',
    reductionPlaceholder: 'Enter %',
    savings: 'You could save',
    perMonth: 'per month',
    perYear: 'per year',
    breakdown: 'Cost Breakdown',
    showBreakdown: 'Show Breakdown',
    hideBreakdown: 'Hide Breakdown',
    appliances: 'Common Appliances',
    refrigerator: 'Refrigerator (1.5-2.0 kWh/day)',
    ac: 'Air Conditioner (10-15 kWh/day)',
    heater: 'Heater (15-20 kWh/day)',
    washingMachine: 'Washing Machine (2.5-3.0 kWh/wash)',
    tv: 'TV (0.15-0.3 kWh/hour)',
    lightbulb: 'LED Bulb (0.01 kWh/hour)',
    disclaimer: 'This is an estimate. Your actual bill may vary based on usage patterns and utility rates.',
    enterValues: 'Enter monthly usage and rate to calculate',
    totalCost: 'Total Cost',
      reset: "Reset"
  },
  es: {
    title: 'Calculadora de Costo de Electricidad',
    monthlyUsageLabel: 'Uso Mensual (kWh)',
    monthlyUsagePlaceholder: 'Ingresa kWh',
    rateLabel: 'Tarifa por kWh ($)',
    ratePlaceholder: 'Ingresa tarifa',
    calculate: 'Calcular Costo',
    monthlyCost: 'Costo Mensual',
    dailyCost: 'Costo Diario',
    yearlyCost: 'Costo Anual',
    weeklyCost: 'Costo Semanal',
    savingsLabel: 'Ahorros Potenciales',
    reductionLabel: 'Reducir Uso Por (%)',
    reductionPlaceholder: 'Ingresa %',
    savings: 'Podrías ahorrar',
    perMonth: 'por mes',
    perYear: 'por año',
    breakdown: 'Desglose de Costos',
    showBreakdown: 'Mostrar Desglose',
    hideBreakdown: 'Ocultar Desglose',
    appliances: 'Electrodomésticos Comunes',
    refrigerator: 'Refrigerador (1.5-2.0 kWh/día)',
    ac: 'Aire Acondicionado (10-15 kWh/día)',
    heater: 'Calefactor (15-20 kWh/día)',
    washingMachine: 'Lavadora (2.5-3.0 kWh/lavado)',
    tv: 'Televisor (0.15-0.3 kWh/hora)',
    lightbulb: 'Bombilla LED (0.01 kWh/hora)',
    disclaimer: 'Esta es una estimación. Tu factura real puede variar según los patrones de uso y las tarifas de servicios.',
    enterValues: 'Ingresa uso mensual y tarifa para calcular',
    totalCost: 'Costo Total',
      reset: "Restablecer"
  },
  pt: {
    title: 'Calculadora de Custo de Eletricidade',
    monthlyUsageLabel: 'Uso Mensal (kWh)',
    monthlyUsagePlaceholder: 'Digite kWh',
    rateLabel: 'Taxa por kWh ($)',
    ratePlaceholder: 'Digite taxa',
    calculate: 'Calcular Custo',
    monthlyCost: 'Custo Mensal',
    dailyCost: 'Custo Diário',
    yearlyCost: 'Custo Anual',
    weeklyCost: 'Custo Semanal',
    savingsLabel: 'Economia Potencial',
    reductionLabel: 'Reduzir Uso Por (%)',
    reductionPlaceholder: 'Digite %',
    savings: 'Você poderia economizar',
    perMonth: 'por mês',
    perYear: 'por ano',
    breakdown: 'Detalhamento de Custos',
    showBreakdown: 'Mostrar Detalhamento',
    hideBreakdown: 'Ocultar Detalhamento',
    appliances: 'Eletrodomésticos Comuns',
    refrigerator: 'Refrigerador (1.5-2.0 kWh/dia)',
    ac: 'Ar Condicionado (10-15 kWh/dia)',
    heater: 'Aquecedor (15-20 kWh/dia)',
    washingMachine: 'Máquina de Lavar (2.5-3.0 kWh/lavagem)',
    tv: 'TV (0.15-0.3 kWh/hora)',
    lightbulb: 'Lâmpada LED (0.01 kWh/hora)',
    disclaimer: 'Esta é uma estimativa. Sua fatura real pode variar dependendo dos padrões de uso e das tarifas de serviços.',
    enterValues: 'Digite uso mensal e taxa para calcular',
    totalCost: 'Custo Total',
      reset: "Redefinir"
  },
  fr: {
    title: 'Calculatrice des Coûts d\'Électricité',
    monthlyUsageLabel: 'Consommation Mensuelle (kWh)',
    monthlyUsagePlaceholder: 'Entrez kWh',
    rateLabel: 'Tarif par kWh ($)',
    ratePlaceholder: 'Entrez tarif',
    calculate: 'Calculer le Coût',
    monthlyCost: 'Coût Mensuel',
    dailyCost: 'Coût Quotidien',
    yearlyCost: 'Coût Annuel',
    weeklyCost: 'Coût Hebdomadaire',
    savingsLabel: 'Économies Potentielles',
    reductionLabel: 'Réduire la Consommation Par (%)',
    reductionPlaceholder: 'Entrez %',
    savings: 'Vous pourriez économiser',
    perMonth: 'par mois',
    perYear: 'par an',
    breakdown: 'Ventilation des Coûts',
    showBreakdown: 'Afficher la Ventilation',
    hideBreakdown: 'Masquer la Ventilation',
    appliances: 'Appareils Ménagers Courants',
    refrigerator: 'Réfrigérateur (1,5-2,0 kWh/jour)',
    ac: 'Climatiseur (10-15 kWh/jour)',
    heater: 'Chauffage (15-20 kWh/jour)',
    washingMachine: 'Lave-linge (2,5-3,0 kWh/lavage)',
    tv: 'Télévision (0,15-0,3 kWh/heure)',
    lightbulb: 'Ampoule LED (0,01 kWh/heure)',
    disclaimer: 'Ceci est une estimation. Votre facture réelle peut varier en fonction des habitudes de consommation et des tarifs des services.',
    enterValues: 'Entrez la consommation mensuelle et le tarif pour calculer',
    totalCost: 'Coût Total',
      reset: "Réinitialiser"
  }
};

export default function ElectricityCostCalculator({ lang = 'en' }: ElectricityCostCalculatorProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const [monthlyUsage, setMonthlyUsage] = useState('');
  const [rate, setRate] = useState('');
  const [reduction, setReduction] = useState('');
  const [showBreakdown, setShowBreakdown] = useState(false);

  const calculateCost = () => {
    const usage = parseFloat(monthlyUsage);
    const rateValue = parseFloat(rate);

    if (!usage || !rateValue || usage <= 0 || rateValue <= 0) return null;

    const monthly = usage * rateValue;
    const daily = monthly / 30;
    const weekly = monthly / 4.33;
    const yearly = monthly * 12;

    return {
      monthly,
      daily,
      weekly,
      yearly
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
  };

  const calculateSavings = () => {
    const usage = parseFloat(monthlyUsage);
    const rateValue = parseFloat(rate);
    const reductionPercent = parseFloat(reduction);

    if (!usage || !rateValue || !reductionPercent || reductionPercent <= 0 || reductionPercent > 100) {
      return null;
    }

    const currentMonthly = usage * rateValue;
    const reducedUsage = usage * (1 - reductionPercent / 100);
    const newMonthly = reducedUsage * rateValue;
    const savingsMonth = currentMonthly - newMonthly;
    const savingsYear = savingsMonth * 12;

    return {
      savingsMonth,
      savingsYear
    };
  };

  const costs = calculateCost();
  const savings = calculateSavings();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-5xl">⚡</span>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{t.title}</h2>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.monthlyUsageLabel}
              </label>
              <input
                type="number"
                value={monthlyUsage}
                onChange={(e) => setMonthlyUsage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                placeholder={t.monthlyUsagePlaceholder}
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.rateLabel}
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                placeholder={t.ratePlaceholder}
                step="0.01"
              />
            
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={calculateCost}
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

</div>
          </div>
        </div>

        {/* Results Section */}
        {costs && (
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{t.breakdown}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-gray-600 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.dailyCost}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${costs.daily.toFixed(2)}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-gray-600 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.weeklyCost}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${costs.weekly.toFixed(2)}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-gray-600 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.monthlyCost}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${costs.monthly.toFixed(2)}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-gray-600 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.yearlyCost}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${costs.yearly.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Savings Section */}
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">{t.savingsLabel}</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.reductionLabel}
            </label>
            <input
              type="number"
              value={reduction}
              onChange={(e) => setReduction(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white mb-4"
              placeholder={t.reductionPlaceholder}
              min="0"
              max="100"
              step="1"
            />
          </div>

          {savings && (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-gray-600 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.savingsLabel}</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${savings.savingsMonth.toFixed(2)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.perMonth}</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-gray-600 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t.savingsLabel}</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${savings.savingsYear.toFixed(2)}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t.perYear}</p>
              </div>
            </div>
          )}
        </div>

        {/* Appliances Reference */}
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full text-left font-bold text-gray-800 dark:text-white flex items-center justify-between"
          >
            {t.appliances}
            <span>{showBreakdown ? '▼' : '▶'}</span>
          </button>
          {showBreakdown && (
            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>• {t.refrigerator}</p>
              <p>• {t.ac}</p>
              <p>• {t.heater}</p>
              <p>• {t.washingMachine}</p>
              <p>• {t.tv}</p>
              <p>• {t.lightbulb}</p>
            </div>
          )}
        </div>
      </div>

      {!costs && (monthlyUsage || rate) && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
          {t.enterValues}
        </p>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
        {t.disclaimer}
      </p>
    </div>
  );
}
