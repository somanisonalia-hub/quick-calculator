'use client';

import React, { useState } from 'react';

interface PaceCalculatorProps {
  lang?: string;
}

const translations = {
  en: {
    title: 'Pace Calculator',
    subtitle: 'Calculate running/walking pace, time, or distance',
    mode: 'Calculate',
    pace: 'Pace',
    time: 'Time',
    distance: 'Distance',
    enterDistance: 'Distance',
    enterTime: 'Time',
    enterPace: 'Pace',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    calculate: 'Calculate',
    result: 'Result',
    splits: 'Split Times',
    km: 'km',
    mi: 'miles',
    perKm: 'per km',
    perMi: 'per mile',
    commonDistances: 'Common Race Distances',
    marathon: 'Marathon',
    halfMarathon: 'Half Marathon',
    tenK: '10K',
    fiveK: '5K'
  },
  es: {
    title: 'Calculadora de Ritmo',
    subtitle: 'Calcula ritmo de carrera/caminata, tiempo o distancia',
    mode: 'Calcular',
    pace: 'Ritmo',
    time: 'Tiempo',
    distance: 'Distancia',
    enterDistance: 'Distancia',
    enterTime: 'Tiempo',
    enterPace: 'Ritmo',
    hours: 'Horas',
    minutes: 'Minutos',
    seconds: 'Segundos',
    calculate: 'Calcular',
    result: 'Resultado',
    splits: 'Tiempos Parciales',
    km: 'km',
    mi: 'millas',
    perKm: 'por km',
    perMi: 'por milla',
    commonDistances: 'Distancias de Carrera Comunes',
    marathon: 'Maratón',
    halfMarathon: 'Medio Maratón',
    tenK: '10K',
    fiveK: '5K'
  },
  pt: {
    title: 'Calculadora de Ritmo',
    subtitle: 'Calcule ritmo de corrida/caminhada, tempo ou distância',
    mode: 'Calcular',
    pace: 'Ritmo',
    time: 'Tempo',
    distance: 'Distância',
    enterDistance: 'Distância',
    enterTime: 'Tempo',
    enterPace: 'Ritmo',
    hours: 'Horas',
    minutes: 'Minutos',
    seconds: 'Segundos',
    calculate: 'Calcular',
    result: 'Resultado',
    splits: 'Tempos Parciais',
    km: 'km',
    mi: 'milhas',
    perKm: 'por km',
    perMi: 'por milha',
    commonDistances: 'Distâncias de Corrida Comuns',
    marathon: 'Maratona',
    halfMarathon: 'Meia Maratona',
    tenK: '10K',
    fiveK: '5K'
  },
  fr: {
    title: 'Calculateur d\'Allure',
    subtitle: 'Calculez l\'allure de course/marche, le temps ou la distance',
    mode: 'Calculer',
    pace: 'Allure',
    time: 'Temps',
    distance: 'Distance',
    enterDistance: 'Distance',
    enterTime: 'Temps',
    enterPace: 'Allure',
    hours: 'Heures',
    minutes: 'Minutes',
    seconds: 'Secondes',
    calculate: 'Calculer',
    result: 'Résultat',
    splits: 'Temps Intermédiaires',
    km: 'km',
    mi: 'miles',
    perKm: 'par km',
    perMi: 'par mile',
    commonDistances: 'Distances de Course Communes',
    marathon: 'Marathon',
    halfMarathon: 'Semi-Marathon',
    tenK: '10K',
    fiveK: '5K'
  }
};

export default function PaceCalculator({ lang = 'en' }: PaceCalculatorProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [mode, setMode] = useState<'pace' | 'time' | 'distance'>('pace');
  const [unit, setUnit] = useState<'km' | 'mi'>('km');
  const [distance, setDistance] = useState(10);
  const [timeHours, setTimeHours] = useState(0);
  const [timeMinutes, setTimeMinutes] = useState(50);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [paceMinutes, setPaceMinutes] = useState(5);
  const [paceSeconds, setPaceSeconds] = useState(0);
  const [result, setResult] = useState<string>('');
  const [splits, setSplits] = useState<string[]>([]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculate = () => {
    const totalTimeSeconds = timeHours * 3600 + timeMinutes * 60 + timeSeconds;
    const paceInSeconds = paceMinutes * 60 + paceSeconds;

    let resultText = '';
    const newSplits: string[] = [];

    if (mode === 'pace') {
      // Calculate pace from distance and time
      if (distance > 0 && totalTimeSeconds > 0) {
        const pacePerUnit = totalTimeSeconds / distance;
        resultText = `${formatTime(pacePerUnit)} ${unit === 'km' ? t.perKm : t.perMi}`;
        
        // Generate splits
        for (let i = 1; i <= Math.min(distance, 42); i++) {
          newSplits.push(`${i} ${unit}: ${formatTime(pacePerUnit * i)}`);
        }
      }
    } else if (mode === 'time') {
      // Calculate time from distance and pace
      if (distance > 0 && paceInSeconds > 0) {
        const totalTime = distance * paceInSeconds;
        resultText = formatTime(totalTime);
        
        // Generate splits
        for (let i = 1; i <= Math.min(distance, 42); i++) {
          newSplits.push(`${i} ${unit}: ${formatTime(paceInSeconds * i)}`);
        }
      }
    } else {
      // Calculate distance from time and pace
      if (totalTimeSeconds > 0 && paceInSeconds > 0) {
        const dist = totalTimeSeconds / paceInSeconds;
        resultText = `${dist.toFixed(2)} ${unit}`;
      }
    }

    setResult(resultText);
    setSplits(newSplits.slice(0, 10));
  };

  const raceDistances = [
    { name: t.fiveK, km: 5, mi: 3.1 },
    { name: t.tenK, km: 10, mi: 6.2 },
    { name: t.halfMarathon, km: 21.1, mi: 13.1 },
    { name: t.marathon, km: 42.2, mi: 26.2 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-5xl">🏃</span>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* Unit Toggle */}
      <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 mb-6">
        <button
          onClick={() => setUnit('km')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            unit === 'km' ? 'bg-white dark:bg-gray-600 shadow' : ''
          }`}
        >
          Kilometers
        </button>
        <button
          onClick={() => setUnit('mi')}
          className={`flex-1 py-2 rounded-lg font-medium transition-all ${
            unit === 'mi' ? 'bg-white dark:bg-gray-600 shadow' : ''
          }`}
        >
          Miles
        </button>
      </div>

      {/* Mode Selection */}
      <div className="mb-6 hidden">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.mode}
        </label>
        <div className="flex gap-2">
          {(['pace', 'time', 'distance'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-3 rounded-lg font-medium border-2 transition-all ${
                mode === m 
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-600' 
                  : 'border-gray-200 dark:border-gray-600'
              }`}
            >
              {t[m]}
            </button>
          ))}
        </div>
  </div>

      {/* Distance Input */}
      {mode !== 'distance' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.enterDistance} ({unit})
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
              step="0.1"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex gap-1">
              {raceDistances.map((race) => (
                <button
                  key={race.name}
                  onClick={() => setDistance(unit === 'km' ? race.km : race.mi)}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  title={race.name}
                >
                  {race.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Time Input */}
      {mode !== 'time' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.enterTime}
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={timeHours}
                onChange={(e) => setTimeHours(parseInt(e.target.value) || 0)}
                min={0}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="0"
              />
              <span className="text-xs text-gray-500">{t.hours}</span>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={timeMinutes}
                onChange={(e) => setTimeMinutes(parseInt(e.target.value) || 0)}
                min={0}
                max={59}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="0"
              />
              <span className="text-xs text-gray-500">{t.minutes}</span>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={timeSeconds}
                onChange={(e) => setTimeSeconds(parseInt(e.target.value) || 0)}
                min={0}
                max={59}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="0"
              />
              <span className="text-xs text-gray-500">{t.seconds}</span>
            </div>
          </div>
        </div>
      )}

      {/* Pace Input */}
      {mode !== 'pace' && (
        <div className="mb-6 hidden">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t.enterPace} ({unit === 'km' ? t.perKm : t.perMi})
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                type="number"
                value={paceMinutes}
                onChange={(e) => setPaceMinutes(parseInt(e.target.value) || 0)}
                min={0}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <span className="text-xs text-gray-500">{t.minutes}</span>
            </div>
            <div className="flex-1">
              <input
                type="number"
                value={paceSeconds}
                onChange={(e) => setPaceSeconds(parseInt(e.target.value) || 0)}
                min={0}
                max={59}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <span className="text-xs text-gray-500">{t.seconds}</span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={calculate}
        className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
      >
        {t.calculate}
      </button>

      {result && (
        <div className="mt-8 space-y-4">
          <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {mode === 'pace' ? t.pace : mode === 'time' ? t.time : t.distance}
            </p>
            <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">
              {result}
            </p>
          </div>

          {splits.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">{t.splits}</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                {splits.map((split, i) => (
                  <div key={i} className="bg-white dark:bg-gray-600 rounded p-2 text-center">
                    {split}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
