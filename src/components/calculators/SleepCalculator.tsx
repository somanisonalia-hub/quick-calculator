'use client';

import { useState } from 'react';

interface SleepCalculatorProps {
  lang?: string;
}

export default function SleepCalculator({ lang = 'en' }: SleepCalculatorProps) {
  const translations = {
    en: {
      title: "Sleep Calculator",
      mode: "Calculate:",
      wakeTime: "Wake Time",
      bedTime: "Bed Time",
      wakeTimeLabel: "What time do you want to wake up?",
      bedTimeLabel: "What time do you go to bed?",
      calculate: "Calculate Sleep Times",
      results: "Results",
      suggestedBedTimes: "Suggested Bed Times",
      suggestedWakeTimes: "Suggested Wake Times",
      sleepCycles: "sleep cycles",
      hoursOfSleep: "hours of sleep",
      tip: "A good night's sleep consists of 5-6 complete sleep cycles.",
      note: "Each sleep cycle is approximately 90 minutes.",
    },
    es: {
      title: "Calculadora de Sueño",
      mode: "Calcular:",
      wakeTime: "Hora de Despertar",
      bedTime: "Hora de Dormir",
      wakeTimeLabel: "¿A qué hora quieres despertar?",
      bedTimeLabel: "¿A qué hora te vas a dormir?",
      calculate: "Calcular Horarios de Sueño",
      results: "Resultados",
      suggestedBedTimes: "Horas Sugeridas para Dormir",
      suggestedWakeTimes: "Horas Sugeridas para Despertar",
      sleepCycles: "ciclos de sueño",
      hoursOfSleep: "horas de sueño",
      tip: "Un buen sueño consiste en 5-6 ciclos completos de sueño.",
      note: "Cada ciclo de sueño dura aproximadamente 90 minutos.",
    },
    fr: {
      title: "Calculateur de Sommeil",
      mode: "Calculer :",
      wakeTime: "Heure de Réveil",
      bedTime: "Heure de Coucher",
      wakeTimeLabel: "À quelle heure voulez-vous vous réveiller ?",
      bedTimeLabel: "À quelle heure allez-vous vous coucher ?",
      calculate: "Calculer les Heures de Sommeil",
      results: "Résultats",
      suggestedBedTimes: "Heures de Coucher Suggérées",
      suggestedWakeTimes: "Heures de Réveil Suggérées",
      sleepCycles: "cycles de sommeil",
      hoursOfSleep: "heures de sommeil",
      tip: "Un bon sommeil comprend 5 à 6 cycles de sommeil complets.",
      note: "Chaque cycle de sommeil dure environ 90 minutes.",
    },
    pt: {
      title: "Calculadora de Sono",
      mode: "Calcular:",
      wakeTime: "Hora de Acordar",
      bedTime: "Hora de Dormir",
      wakeTimeLabel: "A que horas você quer acordar?",
      bedTimeLabel: "A que horas você vai dormir?",
      calculate: "Calcular Horários de Sono",
      results: "Resultados",
      suggestedBedTimes: "Horários Sugeridos para Dormir",
      suggestedWakeTimes: "Horários Sugeridos para Acordar",
      sleepCycles: "ciclos de sono",
      hoursOfSleep: "horas de sono",
      tip: "Uma boa noite de sono consiste em 5-6 ciclos completos de sono.",
      note: "Cada ciclo de sono dura aproximadamente 90 minutos.",
    },
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [mode, setMode] = useState<'wake' | 'bed'>('wake');
  const [time, setTime] = useState<string>('07:00');
  const [calculated, setCalculated] = useState(false);

  const calculateSleepTimes = () => {
    const [hours, minutes] = time.split(':').map(Number);
    const cycleMinutes = 90; // Sleep cycle duration
    const fallAsleepTime = 14; // Average time to fall asleep
    const cycles = [6, 5, 4, 3]; // Recommended sleep cycles

    const times: { time: string; cycles: number; hours: number }[] = [];

    cycles.forEach(cycleCount => {
      const totalMinutes = cycleCount * cycleMinutes + fallAsleepTime;
      
      if (mode === 'wake') {
        // Calculate bed times
        let bedHours = hours;
        let bedMinutes = minutes - totalMinutes;
        
        while (bedMinutes < 0) {
          bedMinutes += 60;
          bedHours--;
        }
        while (bedHours < 0) {
          bedHours += 24;
        }
        
        const formattedTime = `${String(bedHours).padStart(2, '0')}:${String(bedMinutes).padStart(2, '0')}`;
        times.push({
          time: formattedTime,
          cycles: cycleCount,
          hours: cycleCount * 1.5,
        });
      } else {
        // Calculate wake times
        let wakeHours = hours;
        let wakeMinutes = minutes + totalMinutes;
        
        while (wakeMinutes >= 60) {
          wakeMinutes -= 60;
          wakeHours++;
        }
        while (wakeHours >= 24) {
          wakeHours -= 24;
        }
        
        const formattedTime = `${String(wakeHours).padStart(2, '0')}:${String(wakeMinutes).padStart(2, '0')}`;
        times.push({
          time: formattedTime,
          cycles: cycleCount,
          hours: cycleCount * 1.5,
        });
      }
    });

    return times;
  };

  const results = calculateSleepTimes();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">{t.mode}</label>
          <div className="flex gap-4">
            <button
              onClick={() => setMode('wake')}
              className={`flex-1 py-2 px-4 rounded-md ${mode === 'wake' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {t.wakeTime}
            </button>
            <button
              onClick={() => setMode('bed')}
              className={`flex-1 py-2 px-4 rounded-md ${mode === 'bed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {t.bedTime}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'wake' ? t.wakeTimeLabel : t.bedTimeLabel}
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {t.calculate}
        </button>
      </div>

      {calculated && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {mode === 'wake' ? t.suggestedBedTimes : t.suggestedWakeTimes}
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {results.map((result, index) => (
              <div key={index} className={`${index === 1 ? 'bg-green-50 border-2 border-green-300' : 'bg-blue-50'} p-4 rounded-lg`}>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {result.time}
                </div>
                <div className="text-sm text-gray-600">
                  {result.cycles} {t.sleepCycles}
                </div>
                <div className="text-sm text-gray-600">
                  {result.hours} {t.hoursOfSleep}
                </div>
                {index === 1 && (
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    ✓ {lang === 'es' ? 'Recomendado' : lang === 'fr' ? 'Recommandé' : lang === 'pt' ? 'Recomendado' : 'Recommended'}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <p className="text-gray-700">💡 {t.tip}</p>
            <p className="text-gray-600 text-sm">{t.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}
