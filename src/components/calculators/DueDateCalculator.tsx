'use client';

import React, { useState } from 'react';

interface DueDateCalculatorProps {
  lang?: string;
}

const translations = {
  en: {
    title: 'Due Date Calculator',
    subtitle: 'Calculate your estimated due date',
    lastPeriod: 'First Day of Last Period',
    cycleLength: 'Average Cycle Length (days)',
    calculate: 'Calculate Due Date',
    dueDate: 'Estimated Due Date',
    conception: 'Estimated Conception Date',
    trimester1: 'First Trimester Ends',
    trimester2: 'Second Trimester Ends',
    weeksPregnant: 'Weeks Pregnant Today',
    weeks: 'weeks',
    days: 'days',
    currentWeek: 'Current Week',
    disclaimer: 'This calculator provides estimates only. Please consult your healthcare provider for accurate information.',
    milestones: 'Pregnancy Milestones',
    heartbeat: 'First Heartbeat (6 weeks)',
    movement: 'First Movement (16-20 weeks)',
    viability: 'Viability (24 weeks)',
    fullTerm: 'Full Term (37 weeks)',
      reset: "Reset"
  },
  es: {
    title: 'Calculadora de Fecha de Parto',
    subtitle: 'Calcula tu fecha estimada de parto',
    lastPeriod: 'Primer Día del Último Período',
    cycleLength: 'Duración Promedio del Ciclo (días)',
    calculate: 'Calcular Fecha de Parto',
    dueDate: 'Fecha Estimada de Parto',
    conception: 'Fecha Estimada de Concepción',
    trimester1: 'Fin del Primer Trimestre',
    trimester2: 'Fin del Segundo Trimestre',
    weeksPregnant: 'Semanas de Embarazo Hoy',
    weeks: 'semanas',
    days: 'días',
    currentWeek: 'Semana Actual',
    disclaimer: 'Esta calculadora proporciona solo estimaciones. Consulte a su proveedor de atención médica para obtener información precisa.',
    milestones: 'Hitos del Embarazo',
    heartbeat: 'Primer Latido (6 semanas)',
    movement: 'Primer Movimiento (16-20 semanas)',
    viability: 'Viabilidad (24 semanas)',
    fullTerm: 'Término Completo (37 semanas)',
      reset: "Restablecer"
  },
  pt: {
    title: 'Calculadora de Data Prevista',
    subtitle: 'Calcule sua data prevista de parto',
    lastPeriod: 'Primeiro Dia da Última Menstruação',
    cycleLength: 'Duração Média do Ciclo (dias)',
    calculate: 'Calcular Data Prevista',
    dueDate: 'Data Prevista de Parto',
    conception: 'Data Estimada de Concepção',
    trimester1: 'Fim do Primeiro Trimestre',
    trimester2: 'Fim do Segundo Trimestre',
    weeksPregnant: 'Semanas de Gravidez Hoje',
    weeks: 'semanas',
    days: 'dias',
    currentWeek: 'Semana Atual',
    disclaimer: 'Esta calculadora fornece apenas estimativas. Consulte seu profissional de saúde para informações precisas.',
    milestones: 'Marcos da Gravidez',
    heartbeat: 'Primeiro Batimento (6 semanas)',
    movement: 'Primeiro Movimento (16-20 semanas)',
    viability: 'Viabilidade (24 semanas)',
    fullTerm: 'Termo Completo (37 semanas)',
      reset: "Redefinir"
  },
  fr: {
    title: "Calculateur de Date d'Accouchement",
    subtitle: "Calculez votre date d'accouchement prévue",
    lastPeriod: 'Premier Jour des Dernières Règles',
    cycleLength: 'Durée Moyenne du Cycle (jours)',
    calculate: 'Calculer la Date Prévue',
    dueDate: "Date d'Accouchement Prévue",
    conception: 'Date de Conception Estimée',
    trimester1: 'Fin du Premier Trimestre',
    trimester2: 'Fin du Deuxième Trimestre',
    weeksPregnant: "Semaines de Grossesse Aujourd'hui",
    weeks: 'semaines',
    days: 'jours',
    currentWeek: 'Semaine Actuelle',
    disclaimer: "Ce calculateur fournit uniquement des estimations. Veuillez consulter votre professionnel de santé pour des informations précises.",
    milestones: 'Étapes de la Grossesse',
    heartbeat: 'Premier Battement (6 semaines)',
    movement: 'Premier Mouvement (16-20 semaines)',
    viability: 'Viabilité (24 semaines)',
    fullTerm: 'Terme Complet (37 semaines)',
      reset: "Réinitialiser"
  }
};

export default function DueDateCalculator({ lang = 'en' }: DueDateCalculatorProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [results, setResults] = useState<{
    dueDate: Date;
    conception: Date;
    trimester1End: Date;
    trimester2End: Date;
    weeksPregnant: number;
    daysPregnant: number;
  } | null>(null);

  const calculateDueDate = () => {
    if (!lastPeriod) return;

    const lmp = new Date(lastPeriod);
    const cycleAdjustment = cycleLength - 28;
    
    // Naegele's Rule: LMP + 280 days, adjusted for cycle length
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280 + cycleAdjustment);
    
    // Conception is approximately 14 days after LMP (adjusted for cycle)
    const conception = new Date(lmp);
    conception.setDate(conception.getDate() + 14 + (cycleAdjustment / 2));
    
    // Trimester end dates
    const trimester1End = new Date(lmp);
    trimester1End.setDate(trimester1End.getDate() + 84); // 12 weeks
    
    const trimester2End = new Date(lmp);
    trimester2End.setDate(trimester2End.getDate() + 182); // 26 weeks
    
    // Calculate weeks pregnant
    const today = new Date();
    const diffTime = today.getTime() - lmp.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeksPregnant = Math.floor(diffDays / 7);
    const daysPregnant = diffDays % 7;

    setResults({
      dueDate,
      conception,
      trimester1End,
      trimester2End,
      weeksPregnant,
      daysPregnant
    });
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(lang === 'en' ? 'en-US' : lang, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-5xl">👶</span>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.lastPeriod}
          </label>
          <input
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.cycleLength}
          </label>
          <input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
            min={21}
            max={45}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          onClick={calculateDueDate}
          disabled={!lastPeriod}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50"
        >
          {t.calculate}
        </button>
      </div>

      {results && (
        <div className="mt-8 space-y-6">
          {/* Due Date */}
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-xl p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">{t.dueDate}</p>
            <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
              {formatDate(results.dueDate)}
            </p>
          </div>

          {/* Current Progress */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-2">{t.weeksPregnant}</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {results.weeksPregnant} {t.weeks}, {results.daysPregnant} {t.days}
            </p>
            <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all"
                style={{ width: `${Math.min((results.weeksPregnant / 40) * 100, 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">{t.currentWeek} {results.weeksPregnant} / 40</p>
          </div>

          {/* Key Dates Grid */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.conception}</p>
              <p className="font-semibold text-gray-800 dark:text-white">{formatDate(results.conception)}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.trimester1}</p>
              <p className="font-semibold text-gray-800 dark:text-white">{formatDate(results.trimester1End)}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.trimester2}</p>
              <p className="font-semibold text-gray-800 dark:text-white">{formatDate(results.trimester2End)}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.fullTerm}</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {formatDate(new Date(new Date(lastPeriod).setDate(new Date(lastPeriod).getDate() + 259)))}
              </p>
            </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>
  </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            ⚠️ {t.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
