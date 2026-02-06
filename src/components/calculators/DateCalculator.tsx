'use client';

import { useState } from 'react';

interface DateCalculatorProps {
  lang?: string;
}

export default function DateCalculator({ lang = 'en' }: DateCalculatorProps) {
  // Embedded translations following CALCULATOR_CREATION_AGENT.md approach
  const translations = {
    en: {
      title: "Date Calculator",
      description: "Calculate differences between dates",
      startDate: "Start Date",
      endDate: "End Date",
      result: "Result",
      daysBetween: "days between the dates"
    },
    es: {
      title: "Calculadora de Fechas",
      description: "Calcula diferencias entre fechas",
      startDate: "Fecha de Inicio",
      endDate: "Fecha Final",
      result: "Resultado",
      daysBetween: "días entre las fechas"
    },
    pt: {
      title: "Calculadora de Datas",
      description: "Calcule diferenças entre datas",
      startDate: "Data Inicial",
      endDate: "Data Final",
      result: "Resultado",
      daysBetween: "dias entre as datas"
    },
    fr: {
      title: "Calculateur de Dates",
      description: "Calculez les différences entre dates",
      startDate: "Date de Début",
      endDate: "Date de Fin",
      result: "Résultat",
      daysBetween: "jours entre les dates"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState('');

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setResult(`${diffDays} ${t.daysBetween}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.startDate}</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t.endDate}</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={calculateDifference}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Calculate Difference
        </button>

        {result && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">{t.result}</h3>
            <div className="text-xl font-bold text-green-600">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}
