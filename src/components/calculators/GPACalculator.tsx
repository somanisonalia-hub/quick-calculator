'use client';

import { useState, useEffect } from 'react';

interface GPACalculatorProps {
  lang?: string;
}

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

export default function GPACalculator({ lang = 'en' }: GPACalculatorProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "GPA Calculator",
      description: "Calculate your Grade Point Average (GPA) for multiple courses",
      courseGrades: "Course Grades",
      addCourse: "Add Course",
      calculateGPA: "Calculate GPA",
      reset: "Reset",
      courseName: "Course Name",
      grade: "Grade",
      credits: "Credits",
      actions: "Actions",
      remove: "Remove",
      noCourses: "No courses added. Click \"Add Course\" to begin.",
      gpaResults: "GPA Results",
      overallGPA: "Overall GPA",
      totalCredits: "Total Credits",
      totalGradePoints: "Total Grade Points",
      gradeScale: "Grade Scale",
      outOfScale: "Out of 4.0 scale",
      gradeA: "A (4.0)",
      gradeB: "B (3.0)",
      gradeC: "C (2.0)",
      gradeD: "D (1.0)",
      gradeF: "F (0.0)",
      gradeADisplay: "A = 4.0",
      gradeBDisplay: "B = 3.0",
      gradeCDisplay: "C = 2.0",
      gradeDDisplay: "D = 1.0",
      gradeFDisplay: "F = 0.0",
      calculateYourGPA: "Calculate Your GPA",
      addCoursesMessage: "Add courses above to see your GPA calculation"
    },
    es: {
      title: "Calculadora de GPA",
      description: "Calcula tu Promedio de Calificaciones (GPA) para múltiples cursos",
      courseGrades: "Calificaciones de Cursos",
      addCourse: "Agregar Curso",
      calculateGPA: "Calcular GPA",
      reset: "Reiniciar",
      courseName: "Nombre del Curso",
      grade: "Calificación",
      credits: "Créditos",
      actions: "Acciones",
      remove: "Eliminar",
      noCourses: "No se agregaron cursos. Haz clic en \"Agregar Curso\" para comenzar.",
      gpaResults: "Resultados GPA",
      overallGPA: "GPA General",
      totalCredits: "Créditos Totales",
      totalGradePoints: "Puntos de Calificación Totales",
      gradeScale: "Escala de Calificaciones",
      outOfScale: "Fuera de escala 4.0",
      gradeA: "A (4.0)",
      gradeB: "B (3.0)",
      gradeC: "C (2.0)",
      gradeD: "D (1.0)",
      gradeF: "F (0.0)",
      gradeADisplay: "A = 4.0",
      gradeBDisplay: "B = 3.0",
      gradeCDisplay: "C = 2.0",
      gradeDDisplay: "D = 1.0",
      gradeFDisplay: "F = 0.0",
      calculateYourGPA: "Calcula Tu GPA",
      addCoursesMessage: "Agrega cursos arriba para ver el cálculo de tu GPA"
    },
    pt: {
      title: "Calculadora de GPA",
      description: "Calcule sua Média de Pontos de Graduação (GPA) para múltiplas disciplinas",
      courseGrades: "Notas das Disciplinas",
      addCourse: "Adicionar Disciplina",
      calculateGPA: "Calcular GPA",
      reset: "Reiniciar",
      courseName: "Nome da Disciplina",
      grade: "Nota",
      credits: "Créditos",
      actions: "Ações",
      remove: "Remover",
      noCourses: "Nenhuma disciplina adicionada. Clique em \"Adicionar Disciplina\" para começar.",
      gpaResults: "Resultados GPA",
      overallGPA: "GPA Geral",
      totalCredits: "Créditos Totais",
      totalGradePoints: "Pontos de Graduação Totais",
      gradeScale: "Escala de Notas",
      outOfScale: "Fora da escala 4.0",
      gradeA: "A (4.0)",
      gradeB: "B (3.0)",
      gradeC: "C (2.0)",
      gradeD: "D (1.0)",
      gradeF: "F (0.0)",
      gradeADisplay: "A = 4.0",
      gradeBDisplay: "B = 3.0",
      gradeCDisplay: "C = 2.0",
      gradeDDisplay: "D = 1.0",
      gradeFDisplay: "F = 0.0",
      calculateYourGPA: "Calcule Seu GPA",
      addCoursesMessage: "Adicione disciplinas acima para ver o cálculo do seu GPA"
    },
    fr: {
      title: "Calculateur de GPA",
      description: "Calculez votre Moyenne Générale (GPA) pour plusieurs cours",
      courseGrades: "Notes de Cours",
      addCourse: "Ajouter un Cours",
      calculateGPA: "Calculer GPA",
      reset: "Réinitialiser",
      courseName: "Nom du Cours",
      grade: "Note",
      credits: "Crédits",
      actions: "Actions",
      remove: "Supprimer",
      noCourses: "Aucun cours ajouté. Cliquez sur \"Ajouter un Cours\" pour commencer.",
      gpaResults: "Résultats GPA",
      overallGPA: "GPA Global",
      totalCredits: "Crédits Totaux",
      totalGradePoints: "Points de Grade Totaux",
      gradeScale: "Échelle de Notes",
      outOfScale: "Sur échelle 4.0",
      gradeA: "A (4.0)",
      gradeB: "B (3.0)",
      gradeC: "C (2.0)",
      gradeD: "D (1.0)",
      gradeF: "F (0.0)",
      gradeADisplay: "A = 4.0",
      gradeBDisplay: "B = 3.0",
      gradeCDisplay: "C = 2.0",
      gradeDDisplay: "D = 1.0",
      gradeFDisplay: "F = 0.0",
      calculateYourGPA: "Calculez Votre GPA",
      addCoursesMessage: "Ajoutez des cours ci-dessus pour voir le calcul de votre GPA"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [courses, setCourses] = useState<Course[]>([]);
  const [gpa, setGpa] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalGradePoints, setTotalGradePoints] = useState<number>(0);

  const gradePoints: { [key: string]: number } = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now(),
      name: '',
      grade: 'A',
      credits: 3
    };
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (id: number, field: keyof Course, value: string | number) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const calculateGPA = () => {
    if (courses.length === 0) {
      setGpa(null);
      setTotalCredits(0);
      setTotalGradePoints(0);
      return;
    }

    let totalPoints = 0;
    let totalCreditsValue = 0;

    courses.forEach(course => {
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * course.credits;
      totalCreditsValue += course.credits;
    });

    const calculatedGPA = totalCreditsValue > 0 ? totalPoints / totalCreditsValue : 0;

    setGpa(calculatedGPA);
    setTotalCredits(totalCreditsValue);
    setTotalGradePoints(totalPoints);
  };

  const resetCalculator = () => {
    setCourses([]);
    setGpa(null);
    setTotalCredits(0);
    setTotalGradePoints(0);
  };

  useEffect(() => {
    calculateGPA();
  }, [courses]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">{t.courseGrades}</h3>
            <button
              onClick={addCourse}
              className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
            >
              {t.addCourse}
            </button>
          </div>

          {courses.length > 0 ? (
            <div className="space-y-3">
              {courses.map((course, index) => (
                <div key={course.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-12 gap-3 items-end">
                    <div className="col-span-12 sm:col-span-4">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t.courseName}
                      </label>
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder={`Course ${index + 1}`}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t.grade}
                      </label>
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="A">A (4.0)</option>
                        <option value="B">B (3.0)</option>
                        <option value="C">C (2.0)</option>
                        <option value="D">D (1.0)</option>
                        <option value="F">F (0.0)</option>
                      </select>
                    </div>

                    <div className="col-span-4 sm:col-span-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t.credits}
                      </label>
                      <input
                        type="number"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        min="0"
                        max="6"
                        step="0.5"
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="w-full px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-500"
                      >
                        {t.remove}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">{t.noCourses}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={calculateGPA}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.calculateGPA}
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
          {gpa !== null ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.gpaResults}</h3>

              {/* GPA Result */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <div className="text-sm text-green-700 font-medium mb-2">{t.overallGPA}</div>
                <div className="text-5xl font-bold text-green-800">
                  {gpa.toFixed(2)}
                </div>
                <div className="text-xs text-green-600 mt-2">
                  {t.outOfScale}
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">{t.totalCredits}</div>
                  <div className="text-2xl font-bold text-blue-800">{totalCredits}</div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 font-medium mb-1">{t.totalGradePoints}</div>
                  <div className="text-2xl font-bold text-purple-800">{totalGradePoints.toFixed(1)}</div>
                </div>
              </div>

              {/* Grade Scale Reference */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">{t.gradeScale}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-white p-2 rounded border">
                    {t.gradeADisplay}
                  </div>
                  <div className="bg-white p-2 rounded border">
                    {t.gradeBDisplay}
                  </div>
                  <div className="bg-white p-2 rounded border">
                    {t.gradeCDisplay}
                  </div>
                  <div className="bg-white p-2 rounded border">
                    {t.gradeDDisplay}
                  </div>
                  <div className="bg-white p-2 rounded border">
                    {t.gradeFDisplay}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t.calculateYourGPA}</h3>
              <p className="text-gray-500">{t.addCoursesMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}