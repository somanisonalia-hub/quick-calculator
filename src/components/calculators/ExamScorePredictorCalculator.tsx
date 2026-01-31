'use client';

import { useState } from 'react';

interface ExamScorePredictorCalculatorProps {
  lang?: string;
}

export default function ExamScorePredictorCalculator({ lang = 'en' }: ExamScorePredictorCalculatorProps) {
  const translations = {
    en: {
      title: "Exam Score Predictor",
      currentAverage: "Current Average (%)",
      examWeight: "Final Exam Weight (%)",
      desiredGrade: "Desired Final Grade (%)",
      calculate: "Calculate Required Score",
      results: "Results",
      requiredScore: "Required Exam Score",
      achievable: "Goal is achievable!",
      difficult: "Goal is challenging - aim for 100%!",
      impossible: "Goal is mathematically impossible with this exam weight.",
      tip: "Study hard and you can achieve your goal!",
    },
    es: {
      title: "Predictor de Puntuación de Examen",
      currentAverage: "Promedio Actual (%)",
      examWeight: "Peso del Examen Final (%)",
      desiredGrade: "Calificación Final Deseada (%)",
      calculate: "Calcular Puntuación Requerida",
      results: "Resultados",
      requiredScore: "Puntuación de Examen Requerida",
      achievable: "¡El objetivo es alcanzable!",
      difficult: "¡El objetivo es desafiante - apunta al 100%!",
      impossible: "El objetivo es matemáticamente imposible con este peso de examen.",
      tip: "¡Estudia mucho y puedes lograr tu objetivo!",
    },
    fr: {
      title: "Prédicteur de Score d'Examen",
      currentAverage: "Moyenne Actuelle (%)",
      examWeight: "Poids de l'Examen Final (%)",
      desiredGrade: "Note Finale Souhaitée (%)",
      calculate: "Calculer le Score Requis",
      results: "Résultats",
      requiredScore: "Score d'Examen Requis",
      achievable: "L'objectif est réalisable !",
      difficult: "L'objectif est difficile - visez 100% !",
      impossible: "L'objectif est mathématiquement impossible avec ce poids d'examen.",
      tip: "Étudiez dur et vous pouvez atteindre votre objectif !",
    },
    pt: {
      title: "Preditor de Pontuação de Exame",
      currentAverage: "Média Atual (%)",
      examWeight: "Peso do Exame Final (%)",
      desiredGrade: "Nota Final Desejada (%)",
      calculate: "Calcular Pontuação Necessária",
      results: "Resultados",
      requiredScore: "Pontuação de Exame Necessária",
      achievable: "O objetivo é alcançável!",
      difficult: "O objetivo é desafiador - mire em 100%!",
      impossible: "O objetivo é matematicamente impossível com este peso de exame.",
      tip: "Estude muito e você pode alcançar seu objetivo!",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [currentAverage, setCurrentAverage] = useState<number>(75);
  const [examWeight, setExamWeight] = useState<number>(30);
  const [desiredGrade, setDesiredGrade] = useState<number>(80);
  const [calculated, setCalculated] = useState(false);

  const calculateRequiredScore = () => {
    const currentWeight = 100 - examWeight;
    const currentContribution = (currentAverage / 100) * currentWeight;
    const neededFromExam = desiredGrade - currentContribution;
    const requiredScore = (neededFromExam / examWeight) * 100;

    return {
      requiredScore: Math.max(0, requiredScore),
      achievable: requiredScore <= 100,
      difficult: requiredScore > 100,
      impossible: requiredScore > 120,
    };
  };

  const results = calculateRequiredScore();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.currentAverage}
            </label>
            <input
              type="number"
              step="0.1"
              value={currentAverage}
              onChange={(e) => setCurrentAverage(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.examWeight}
            </label>
            <input
              type="number"
              step="1"
              value={examWeight}
              onChange={(e) => setExamWeight(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.desiredGrade}
            </label>
            <input
              type="number"
              step="0.1"
              value={desiredGrade}
              onChange={(e) => setDesiredGrade(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {t.calculate}
        </button>
      </div>

      {calculated && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">{t.results}</h3>

          <div className={`${results.achievable ? 'bg-green-50' : results.impossible ? 'bg-red-50' : 'bg-yellow-50'} p-6 rounded-lg mb-6`}>
            <div className="text-sm text-gray-600 mb-2">{t.requiredScore}</div>
            <div className={`text-5xl font-bold ${results.achievable ? 'text-green-600' : results.impossible ? 'text-red-600' : 'text-yellow-600'}`}>
              {results.requiredScore.toFixed(1)}%
            </div>
          </div>

          <div className="border-t pt-4">
            {results.achievable && !results.difficult && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-600 font-semibold">✓ {t.achievable}</p>
                <p className="text-gray-700 mt-2">{t.tip}</p>
              </div>
            )}

            {results.difficult && !results.impossible && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-600 font-semibold">⚠ {t.difficult}</p>
              </div>
            )}

            {results.impossible && (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-600 font-semibold">✕ {t.impossible}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
