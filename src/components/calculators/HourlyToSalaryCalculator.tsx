'use client';

import { useState, useEffect } from 'react';

interface HourlyToSalaryCalculatorProps {
  lang?: string;
}

export default function HourlyToSalaryCalculator({ lang = 'en' }: HourlyToSalaryCalculatorProps) {
  const [inputs, setInputs] = useState({
    hourlyRate: 20,
    hoursPerWeek: 40,
    weeksPerYear: 52,
    includeOvertime: false,
    overtimeHours: 0,
    overtimeMultiplier: 1.5
  });

  const [results, setResults] = useState({
    annualSalary: 0,
    monthlySalary: 0,
    biweeklySalary: 0,
    weeklySalary: 0,
    hourlyEquivalent: 0,
    overtimePay: 0,
    totalEarnings: 0
  });

  const translations = {
    en: {
      title: "Hourly to Salary Calculator",
      description: "Convert hourly wages to annual salary and compare different pay structures",
      hourlyRate: "Hourly Rate",
      hoursPerWeek: "Hours per Week",
      weeksPerYear: "Weeks per Year",
      includeOvertime: "Include Overtime Pay",
      overtimeHours: "Overtime Hours per Week",
      overtimeMultiplier: "Overtime Multiplier",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      results: "Salary Breakdown",
      annualSalary: "Annual Salary",
      monthlySalary: "Monthly Salary",
      biweeklySalary: "Biweekly Salary",
      weeklySalary: "Weekly Salary",
      hourlyEquivalent: "Effective Hourly Rate",
      overtimePay: "Annual Overtime Pay",
      totalEarnings: "Total Annual Earnings",
      currency: "$",
      perHour: "/hour",
      regularTime: "Regular Time",
      overtime: "Overtime",
      formula: "Formula: Annual Salary = (Hourly Rate × Hours/Week × Weeks/Year) + Overtime",
      note: "Note: Overtime is calculated at 1.5x or 2x your regular hourly rate for hours worked beyond 40 per week.",
      examples: "Examples",
      example1: "Full-time employee: $25/hour × 40 hours/week × 52 weeks = $52,000/year",
      example2: "With overtime: $20/hour + 10 hours/week at 1.5x = $41,600 + $7,800 = $49,400/year"
    },
    es: {
      title: "Calculadora de Horas a Salario",
      description: "Convierte salarios por hora a salario anual y compara diferentes estructuras de pago",
      hourlyRate: "Tarifa por Hora",
      hoursPerWeek: "Horas por Semana",
      weeksPerYear: "Semanas por Año",
      includeOvertime: "Incluir Pago de Horas Extras",
      overtimeHours: "Horas Extras por Semana",
      overtimeMultiplier: "Multiplicador de Horas Extras",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      results: "Desglose Salarial",
      annualSalary: "Salario Anual",
      monthlySalary: "Salario Mensual",
      biweeklySalary: "Salario Quincenal",
      weeklySalary: "Salario Semanal",
      hourlyEquivalent: "Tarifa por Hora Efectiva",
      overtimePay: "Pago Anual de Horas Extras",
      totalEarnings: "Ganancias Anuales Totales",
      currency: "$",
      perHour: "/hora",
      regularTime: "Tiempo Regular",
      overtime: "Horas Extras",
      formula: "Fórmula: Salario Anual = (Tarifa por Hora × Horas/Semana × Semanas/Año) + Horas Extras",
      note: "Nota: Las horas extras se calculan a 1.5x o 2x tu tarifa por hora regular por horas trabajadas más allá de 40 por semana.",
      examples: "Ejemplos",
      example1: "Empleado de tiempo completo: $25/hora × 40 horas/semana × 52 semanas = $52,000/año",
      example2: "Con horas extras: $20/hora + 10 horas/semana a 1.5x = $41,600 + $7,800 = $49,400/año"
    },
    pt: {
      title: "Calculadora de Horas para Salário",
      description: "Converte salários por hora para salário anual e compara diferentes estruturas de pagamento",
      hourlyRate: "Taxa por Hora",
      hoursPerWeek: "Horas por Semana",
      weeksPerYear: "Semanas por Ano",
      includeOvertime: "Incluir Pagamento de Horas Extras",
      overtimeHours: "Horas Extras por Semana",
      overtimeMultiplier: "Multiplicador de Horas Extras",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      results: "Quebra Salarial",
      annualSalary: "Salário Anual",
      monthlySalary: "Salário Mensal",
      biweeklySalary: "Salário Quinzenal",
      weeklySalary: "Salário Semanal",
      hourlyEquivalent: "Taxa por Hora Efetiva",
      overtimePay: "Pagamento Anual de Horas Extras",
      totalEarnings: "Ganhos Anuais Totais",
      currency: "R$",
      perHour: "/hora",
      regularTime: "Tempo Regular",
      overtime: "Horas Extras",
      formula: "Fórmula: Salário Anual = (Taxa por Hora × Horas/Semana × Semanas/Ano) + Horas Extras",
      note: "Nota: Horas extras são calculadas a 1.5x ou 2x sua taxa por hora regular por horas trabalhadas além de 40 por semana.",
      examples: "Exemplos",
      example1: "Funcionário em tempo integral: R$25/hora × 40 horas/semana × 52 semanas = R$52.000/ano",
      example2: "Com horas extras: R$20/hora + 10 horas/semana a 1.5x = R$41.600 + R$7.800 = R$49.400/ano"
    },
    fr: {
      title: "Calculateur d'Heures en Salaire",
      description: "Convertissez les salaires horaires en salaire annuel et comparez différentes structures de paiement",
      hourlyRate: "Taux Horaire",
      hoursPerWeek: "Heures par Semaine",
      weeksPerYear: "Semaines par An",
      includeOvertime: "Inclure Paiement des Heures Supplémentaires",
      overtimeHours: "Heures Supplémentaires par Semaine",
      overtimeMultiplier: "Multiplicateur d'Heures Supplémentaires",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      results: "Ventilation Salariale",
      annualSalary: "Salaire Annuel",
      monthlySalary: "Salaire Mensuel",
      biweeklySalary: "Salaire Bihebdomadaire",
      weeklySalary: "Salaire Hebdomadaire",
      hourlyEquivalent: "Taux Horaire Effectif",
      overtimePay: "Paiement Annuel d'Heures Supplémentaires",
      totalEarnings: "Revenus Annuels Totaux",
      currency: "€",
      perHour: "/heure",
      regularTime: "Temps Régulier",
      overtime: "Heures Supplémentaires",
      formula: "Formule: Salaire Annuel = (Taux Horaire × Heures/Semaine × Semaines/An) + Heures Supplémentaires",
      note: "Note: Les heures supplémentaires sont calculées à 1.5x ou 2x votre taux horaire régulier pour les heures travaillées au-delà de 40 par semaine.",
      examples: "Exemples",
      example1: "Employé à temps plein: €25/heure × 40 heures/semaine × 52 semaines = €52.000/an",
      example2: "Avec heures supplémentaires: €20/heure + 10 heures/semaine à 1.5x = €41.600 + €7.800 = €49.400/an"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateResults = () => {
    const regularHours = inputs.hoursPerWeek;
    const overtimeHours = inputs.includeOvertime ? inputs.overtimeHours : 0;
    const overtimeRate = inputs.hourlyRate * inputs.overtimeMultiplier;

    const regularPay = inputs.hourlyRate * regularHours * inputs.weeksPerYear;
    const overtimePay = overtimeRate * overtimeHours * inputs.weeksPerYear;
    const totalEarnings = regularPay + overtimePay;

    const annualSalary = totalEarnings;
    const monthlySalary = annualSalary / 12;
    const biweeklySalary = annualSalary / 26;
    const weeklySalary = annualSalary / inputs.weeksPerYear;
    const hourlyEquivalent = totalEarnings / (inputs.hoursPerWeek * inputs.weeksPerYear);

    return {
      annualSalary: Math.round(annualSalary),
      monthlySalary: Math.round(monthlySalary),
      biweeklySalary: Math.round(biweeklySalary),
      weeklySalary: Math.round(weeklySalary),
      hourlyEquivalent: Math.round(hourlyEquivalent * 100) / 100,
      overtimePay: Math.round(overtimePay),
      totalEarnings: Math.round(totalEarnings)
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
      hourlyRate: 20,
      hoursPerWeek: 40,
      weeksPerYear: 52,
      includeOvertime: false,
      overtimeHours: 0,
      overtimeMultiplier: 1.5
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.hourlyRate} ({t.currency})
            </label>
            <input
              type="number"
              value={inputs.hourlyRate}
              onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.hoursPerWeek}
            </label>
            <input
              type="number"
              value={inputs.hoursPerWeek}
              onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
              min="1"
              max="80"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.weeksPerYear}
            </label>
            <input
              type="number"
              value={inputs.weeksPerYear}
              onChange={(e) => handleInputChange('weeksPerYear', e.target.value)}
              min="1"
              max="52"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={inputs.includeOvertime}
                onChange={(e) => handleInputChange('includeOvertime', e.target.checked)}
                className="mr-2"
              />
              {t.includeOvertime}
            </label>
          </div>

          {inputs.includeOvertime && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.overtimeHours}
                </label>
                <input
                  type="number"
                  value={inputs.overtimeHours}
                  onChange={(e) => handleInputChange('overtimeHours', e.target.value)}
                  min="0"
                  max="40"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.overtimeMultiplier}
                </label>
                <select
                  value={inputs.overtimeMultiplier}
                  onChange={(e) => handleInputChange('overtimeMultiplier', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1.5">1.5x</option>
                  <option value="2.0">2.0x</option>
                </select>
              </div>
            </>
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
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">{t.annualSalary}</div>
                <div className="text-2xl font-bold text-green-600">
                  {t.currency}{results.annualSalary.toLocaleString()}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">{t.monthlySalary}</div>
                <div className="text-xl font-semibold text-blue-600">
                  {t.currency}{results.monthlySalary.toLocaleString()}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">{t.biweeklySalary}</div>
                <div className="text-xl font-semibold text-blue-600">
                  {t.currency}{results.biweeklySalary.toLocaleString()}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">{t.weeklySalary}</div>
                <div className="text-xl font-semibold text-blue-600">
                  {t.currency}{results.weeklySalary.toLocaleString()}
                </div>
              </div>

              {inputs.includeOvertime && results.overtimePay > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="text-sm text-gray-600">{t.overtimePay}</div>
                  <div className="text-xl font-semibold text-yellow-600">
                    {t.currency}{results.overtimePay.toLocaleString()}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-sm text-gray-600">{t.hourlyEquivalent}</div>
                <div className="text-xl font-semibold text-blue-600">
                  {t.currency}{results.hourlyEquivalent}{t.perHour}
                </div>
              </div>
            </div>
          </div>

          {/* Formula and Examples */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">{t.formula}</h4>
            <p className="text-sm text-gray-600 mb-4">{t.note}</p>

            <div className="space-y-2">
              <div className="text-sm">
                <strong>{t.regularTime}:</strong> {t.currency}{inputs.hourlyRate}/hour × {inputs.hoursPerWeek} hours/week × {inputs.weeksPerYear} weeks = {t.currency}{(inputs.hourlyRate * inputs.hoursPerWeek * inputs.weeksPerYear).toLocaleString()}
              </div>
              {inputs.includeOvertime && inputs.overtimeHours > 0 && (
                <div className="text-sm">
                  <strong>{t.overtime}:</strong> {t.currency}{(inputs.hourlyRate * inputs.overtimeMultiplier).toFixed(2)}/hour × {inputs.overtimeHours} hours/week × {inputs.weeksPerYear} weeks = {t.currency}{results.overtimePay.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
