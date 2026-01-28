'use client';

import React, { useState } from 'react';

interface Assignment {
  id: string;
  name: string;
  score: number;
  weight: number;
}

interface GradeCalculatorProps {
  lang?: string;
}

export default function GradeCalculator({ lang = 'en' }: GradeCalculatorProps) {
  const translations = {
    en: {
      title: "Grade Calculator",
      currentGrade: "Current Grade",
      assignments: "Assignments",
      assignmentName: "Assignment Name",
      score: "Score (%)",
      weight: "Weight (%)",
      addAssignment: "Add Assignment",
      removeAssignment: "Remove",
      finalExamWeight: "Final Exam Weight (%)",
      desiredGrade: "Desired Final Grade (%)",
      calculateGrade: "Calculate Grade Needed",
      results: "Results",
      yourCurrentGrade: "Your Current Grade",
      scoreNeeded: "Score Needed on Final",
      feasible: "Feasible",
      notFeasible: "Not Feasible",
      impossible: "(Over 100% - Not possible)",
      tip: "Tip",
      tipText: "Add all your completed assignments with their weights. Then enter your desired final grade and final exam weight to see what score you need.",
      reset: "Reset"
    },
    es: {
      title: "Calculadora de Calificaciones",
      currentGrade: "Calificación Actual",
      assignments: "Tareas",
      assignmentName: "Nombre de Tarea",
      score: "Puntuación (%)",
      weight: "Peso (%)",
      addAssignment: "Agregar Tarea",
      removeAssignment: "Eliminar",
      finalExamWeight: "Peso del Examen Final (%)",
      desiredGrade: "Calificación Final Deseada (%)",
      calculateGrade: "Calcular Calificación Necesaria",
      results: "Resultados",
      yourCurrentGrade: "Tu Calificación Actual",
      scoreNeeded: "Puntuación Necesaria en Final",
      feasible: "Factible",
      notFeasible: "No Factible",
      impossible: "(Más del 100% - No posible)",
      tip: "Consejo",
      tipText: "Agrega todas tus tareas completadas con sus pesos. Luego ingresa tu calificación final deseada y peso del examen final para ver qué puntuación necesitas.",
      reset: "Reiniciar"
    },
    pt: {
      title: "Calculadora de Notas",
      currentGrade: "Nota Atual",
      assignments: "Trabalhos",
      assignmentName: "Nome do Trabalho",
      score: "Pontuação (%)",
      weight: "Peso (%)",
      addAssignment: "Adicionar Trabalho",
      removeAssignment: "Remover",
      finalExamWeight: "Peso do Exame Final (%)",
      desiredGrade: "Nota Final Desejada (%)",
      calculateGrade: "Calcular Nota Necessária",
      results: "Resultados",
      yourCurrentGrade: "Sua Nota Atual",
      scoreNeeded: "Pontuação Necessária no Final",
      feasible: "Viável",
      notFeasible: "Não Viável",
      impossible: "(Mais de 100% - Não possível)",
      tip: "Dica",
      tipText: "Adicione todos os seus trabalhos completados com seus pesos. Em seguida, digite sua nota final desejada e peso do exame final para ver que pontuação você precisa.",
      reset: "Reiniciar"
    },
    fr: {
      title: "Calculateur de Notes",
      currentGrade: "Note Actuelle",
      assignments: "Devoirs",
      assignmentName: "Nom du Devoir",
      score: "Score (%)",
      weight: "Poids (%)",
      addAssignment: "Ajouter Devoir",
      removeAssignment: "Supprimer",
      finalExamWeight: "Poids de l'Examen Final (%)",
      desiredGrade: "Note Finale Désirée (%)",
      calculateGrade: "Calculer Note Nécessaire",
      results: "Résultats",
      yourCurrentGrade: "Votre Note Actuelle",
      scoreNeeded: "Score Nécessaire au Final",
      feasible: "Réalisable",
      notFeasible: "Non Réalisable",
      impossible: "(Plus de 100% - Pas possible)",
      tip: "Astuce",
      tipText: "Ajoutez tous vos devoirs complétés avec leurs poids. Ensuite, entrez votre note finale désirée et le poids de l'examen final pour voir quel score vous avez besoin.",
      reset: "Réinitialiser"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', name: 'Assignment 1', score: 0, weight: 0 }
  ]);
  const [finalExamWeight, setFinalExamWeight] = useState<number>(30);
  const [desiredGrade, setDesiredGrade] = useState<number>(90);
  const [results, setResults] = useState<{
    currentGrade: number;
    scoreNeeded: number;
    feasible: boolean;
  } | null>(null);

  const addAssignment = () => {
    const newId = (Math.max(...assignments.map(a => parseInt(a.id)), 0) + 1).toString();
    setAssignments([...assignments, { id: newId, name: `Assignment ${newId}`, score: 0, weight: 0 }]);
  };

  const removeAssignment = (id: string) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const updateAssignment = (id: string, field: keyof Assignment, value: string | number) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const calculateGrade = () => {
    // Calculate current grade (weighted average of completed assignments)
    const totalWeight = assignments.reduce((sum, a) => sum + a.weight, 0);
    const weightedSum = assignments.reduce((sum, a) => sum + (a.score * a.weight), 0);
    const currentGrade = totalWeight > 0 ? weightedSum / totalWeight : 0;

    // Calculate score needed on final exam
    // Formula: (Desired Grade × 100) - (Current Grade × Current Weight) = Score Needed × Final Exam Weight
    // Score Needed = [(Desired Grade × 100) - (Current Grade × Current Weight)] / Final Exam Weight
    
    const currentWeight = totalWeight;
    const scoreNeeded = ((desiredGrade * 100) - (currentGrade * currentWeight)) / finalExamWeight;
    
    setResults({
      currentGrade: Math.round(currentGrade * 100) / 100,
      scoreNeeded: Math.round(scoreNeeded * 100) / 100,
      feasible: scoreNeeded <= 100
    });
  };

  const resetCalculator = () => {
    setAssignments([{ id: '1', name: 'Assignment 1', score: 0, weight: 0 }]);
    setFinalExamWeight(30);
    setDesiredGrade(90);
    setResults(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>{t.tip}:</strong> {t.tipText}
          </p>
        </div>
      </div>

      {/* Assignments Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.assignments}</h3>
        <div className="space-y-3">
          {assignments.map((assignment, index) => (
            <div key={assignment.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.assignmentName}
                </label>
                <input
                  type="text"
                  value={assignment.name}
                  onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.score}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={assignment.score || ''}
                  onChange={(e) => updateAssignment(assignment.id, 'score', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.weight}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={assignment.weight || ''}
                  onChange={(e) => updateAssignment(assignment.id, 'weight', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeAssignment(assignment.id)}
                  disabled={assignments.length === 1}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {t.removeAssignment}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addAssignment}
          className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          + {t.addAssignment}
        </button>
      </div>

      {/* Final Exam & Desired Grade */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.finalExamWeight}
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={finalExamWeight}
            onChange={(e) => setFinalExamWeight(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.desiredGrade}
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={desiredGrade}
            onChange={(e) => setDesiredGrade(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={calculateGrade}
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          {t.calculateGrade}
        </button>
        <button
          onClick={resetCalculator}
          className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
        >
          {t.reset}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t.results}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 mb-1">{t.yourCurrentGrade}</p>
              <p className="text-3xl font-bold text-blue-600">{results.currentGrade.toFixed(2)}%</p>
            </div>
            
            <div className={`p-4 bg-white rounded-lg shadow-sm ${!results.feasible ? 'border-2 border-red-400' : ''}`}>
              <p className="text-sm text-gray-600 mb-1">{t.scoreNeeded}</p>
              <p className={`text-3xl font-bold ${results.feasible ? 'text-green-600' : 'text-red-600'}`}>
                {results.scoreNeeded.toFixed(2)}%
              </p>
              <p className={`text-sm mt-2 ${results.feasible ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                {results.feasible ? `✅ ${t.feasible}` : `❌ ${t.notFeasible} ${t.impossible}`}
              </p>
            </div>
          </div>

          {!results.feasible && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Note:</strong> The required score exceeds 100%. You may need to adjust your target grade or discuss extra credit options with your instructor.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
