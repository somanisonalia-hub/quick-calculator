'use client';

import { useState, useEffect } from 'react';

interface OvertimePayCalculatorProps {
  lang?: string;
}

export default function OvertimePayCalculator({ lang = 'en' }: OvertimePayCalculatorProps) {
  const [hourlyRate, setHourlyRate] = useState(20);
  const [totalHours, setTotalHours] = useState(45);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState(1.5);

  const [results, setResults] = useState({
    regularHours: 40,
    overtimeHours: 0,
    overtimeRate: 0,
    regularPay: 0,
    overtimePay: 0,
    totalPay: 0
  });

  const calculateResults = () => {
    const regularHours = Math.min(40, totalHours);
    const overtimeHours = Math.max(0, totalHours - 40);
    const overtimeRate = hourlyRate * overtimeMultiplier;
    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * overtimeRate;
    const totalPay = regularPay + overtimePay;

    setResults({
      regularHours,
      overtimeHours,
      overtimeRate,
      regularPay,
      overtimePay,
      totalPay
    });
  };

  useEffect(() => {
    calculateResults();
  }, [hourlyRate, totalHours, overtimeMultiplier]);

  const translations = {
    en: {
      title: "Overtime Pay Calculator",
      description: "Calculate overtime pay for hours worked over 40 per week",
      hourlyRate: "Regular Hourly Rate ($)",
      totalHours: "Total Hours Worked",
      overtimeMultiplier: "Overtime Multiplier",
      calculate: "🔄 Recalculate",
      reset: "Reset",
      results: "Pay Breakdown",
      regularHours: "Regular Hours (40 max)",
      overtimeHours: "Overtime Hours",
      overtimeRate: "Overtime Rate",
      regularPay: "Regular Pay",
      overtimePay: "Overtime Pay",
      totalPay: "Total Weekly Pay",
      perHour: "/hour",
      hours: "hours",
      overtimeTypes: {
        "1.5": "1.5x (Standard Overtime)",
        "2.0": "2.0x (Double Time)"
      },
      explanation: "Overtime pay is calculated at your regular rate multiplied by the overtime factor for hours worked beyond 40 in a week."
    },
    es: {
      title: "Calculadora de Pago de Horas Extras",
      description: "Calcula el pago de horas extras por horas trabajadas más de 40 por semana",
      hourlyRate: "Tarifa Horaria Regular ($)",
      totalHours: "Total de Horas Trabajadas",
      overtimeMultiplier: "Multiplicador de Horas Extras",
      calculate: "🔄 Recalcular",
      reset: "Reiniciar",
      results: "Desglose de Pago",
      regularHours: "Horas Regulares (40 máx)",
      overtimeHours: "Horas Extras",
      overtimeRate: "Tarifa de Horas Extras",
      regularPay: "Pago Regular",
      overtimePay: "Pago de Horas Extras",
      totalPay: "Pago Semanal Total",
      perHour: "/hora",
      hours: "horas",
      overtimeTypes: {
        "1.5": "1.5x (Horas Extras Estándar)",
        "2.0": "2.0x (Doble Tiempo)"
      },
      explanation: "El pago de horas extras se calcula a su tarifa regular multiplicada por el factor de horas extras por horas trabajadas más allá de 40 en una semana."
    },
    pt: {
      title: "Calculadora de Pagamento de Horas Extras",
      description: "Calcule o pagamento de horas extras para horas trabalhadas acima de 40 por semana",
      hourlyRate: "Taxa Horária Regular ($)",
      totalHours: "Total de Horas Trabalhadas",
      overtimeMultiplier: "Multiplicador de Horas Extras",
      calculate: "🔄 Recalcular",
      reset: "Redefinir",
      results: "Detalhamento do Pagamento",
      regularHours: "Horas Regulares (40 máx)",
      overtimeHours: "Horas Extras",
      overtimeRate: "Taxa de Horas Extras",
      regularPay: "Pagamento Regular",
      overtimePay: "Pagamento de Horas Extras",
      totalPay: "Pagamento Semanal Total",
      perHour: "/hora",
      hours: "horas",
      overtimeTypes: {
        "1.5": "1.5x (Horas Extras Padrão)",
        "2.0": "2.0x (Tempo Duplo)"
      },
      explanation: "O pagamento de horas extras é calculado à sua taxa regular multiplicada pelo fator de horas extras por horas trabalhadas além de 40 em uma semana."
    },
    fr: {
      title: "Calculateur de Paiement des Heures Supplémentaires",
      description: "Calculez le paiement des heures supplémentaires pour les heures travaillées au-delà de 40 par semaine",
      hourlyRate: "Taux Horaire Régulier ($)",
      totalHours: "Total des Heures Travaillées",
      overtimeMultiplier: "Multiplicateur d'Heures Supplémentaires",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser",
      results: "Décomposition du Paiement",
      regularHours: "Heures Régulières (40 max)",
      overtimeHours: "Heures Supplémentaires",
      overtimeRate: "Taux des Heures Supplémentaires",
      regularPay: "Paiement Régulier",
      overtimePay: "Paiement des Heures Supplémentaires",
      totalPay: "Paiement Hebdomadaire Total",
      perHour: "/heure",
      hours: "heures",
      overtimeTypes: {
        "1.5": "1.5x (Heures Supplémentaires Standard)",
        "2.0": "2.0x (Double Temps)"
      },
      explanation: "Le paiement des heures supplémentaires est calculé à votre taux régulier multiplié par le facteur d'heures supplémentaires pour les heures travaillées au-delà de 40 heures par semaine."
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const resetCalculator = () => {
    setHourlyRate(20);
    setTotalHours(45);
    setOvertimeMultiplier(1.5);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Input Values</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.hourlyRate}
            </label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              min="0"
              max="500"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.totalHours}
            </label>
            <input
              type="number"
              value={totalHours}
              onChange={(e) => setTotalHours(Number(e.target.value))}
              min="0"
              max="80"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.overtimeMultiplier}
            </label>
            <select
              value={overtimeMultiplier}
              onChange={(e) => setOvertimeMultiplier(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1.5}>{t.overtimeTypes["1.5"]}</option>
              <option value={2.0}>{t.overtimeTypes["2.0"]}</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={calculateResults}
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
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t.results}</h2>

          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{t.regularHours}:</span>
              <span className="font-semibold">{results.regularHours} {t.hours}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t.overtimeHours}:</span>
              <span className="font-semibold">{results.overtimeHours} {t.hours}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t.overtimeRate}:</span>
              <span className="font-semibold">${results.overtimeRate.toFixed(2)} {t.perHour}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between">
              <span className="text-gray-600">{t.regularPay}:</span>
              <span className="font-semibold">${results.regularPay.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t.overtimePay}:</span>
              <span className="font-semibold">${results.overtimePay.toFixed(2)}</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-lg">
              <span className="font-semibold text-gray-800">{t.totalPay}:</span>
              <span className="font-bold text-green-600">${results.totalPay.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">{t.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

