'use client';

import React, { useState } from 'react';

interface LoveCalculatorProps {
  lang?: string;
}

const translations = {
  en: {
    title: 'Love Calculator',
    name1: 'Your Name',
    name2: "Partner's Name",
    calculate: 'Calculate Love',
    result: 'Love Compatibility',
    percentage: 'compatibility',
    messages: {
      high: "You're a perfect match! 💕",
      medium: "There's potential for a great relationship! 💖",
      low: "Love can bloom with effort and understanding! 💝",
      perfect: "Soulmates! You were meant to be together! 💞",
      reset: "Reset",
      calculate: "🔄 Recalcular"
    },
    disclaimer: 'This is for entertainment purposes only.',
    enterNames: 'Enter both names to calculate love compatibility'
  },
  es: {
    title: 'Calculadora de Amor',
    name1: 'Tu Nombre',
    name2: 'Nombre de tu Pareja',
    calculate: 'Calcular Amor',
    result: 'Compatibilidad Amorosa',
    percentage: 'compatibilidad',
    messages: {
      high: "¡Son la pareja perfecta! 💕",
      medium: "¡Hay potencial para una gran relación! 💖",
      low: "¡El amor puede florecer con esfuerzo y comprensión! 💝",
      perfect: "¡Almas gemelas! ¡Estaban destinados a estar juntos! 💞"
    },
    disclaimer: 'Esto es solo para entretenimiento.',
    enterNames: 'Ingresa ambos nombres para calcular la compatibilidad'
  },
  pt: {
    title: 'Calculadora do Amor',
    name1: 'Seu Nome',
    name2: 'Nome do Parceiro(a)',
    calculate: 'Calcular Amor',
    result: 'Compatibilidade Amorosa',
    percentage: 'compatibilidade',
    messages: {
      high: "Vocês são o par perfeito! 💕",
      medium: "Há potencial para um ótimo relacionamento! 💖",
      low: "O amor pode florescer com esforço e compreensão! 💝",
      perfect: "Almas gêmeas! Vocês foram feitos um para o outro! 💞",
      reset: "Redefinir"
    },
    disclaimer: 'Isso é apenas para entretenimento.',
    enterNames: 'Digite ambos os nomes para calcular a compatibilidade'
  },
  fr: {
    title: "Calculateur d'Amour",
    name1: 'Votre Nom',
    name2: 'Nom du Partenaire',
    calculate: "🔄 Recalculer",
    result: 'Compatibilité Amoureuse',
    percentage: 'compatibilité',
    messages: {
      high: "Vous êtes le couple parfait ! 💕",
      medium: "Il y a du potentiel pour une belle relation ! 💖",
      low: "L'amour peut s'épanouir avec effort et compréhension ! 💝",
      perfect: "Âmes sœurs ! Vous étiez faits l'un pour l'autre ! 💞",
      reset: "Réinitialiser"
    },
    disclaimer: 'Ceci est uniquement à des fins de divertissement.',
    enterNames: 'Entrez les deux noms pour calculer la compatibilité'
  }
};

export default function LoveCalculator({ lang = 'en' }: LoveCalculatorProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) return;
    
    setIsCalculating(true);
    
    // Fun algorithm based on names
    const combined = (name1 + name2).toLowerCase().replace(/[^a-z]/g, '');
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = ((hash << 5) - hash) + combined.charCodeAt(i);
      hash = hash & hash;
    }
    
    // Generate percentage between 50-100 for fun results
    const percentage = 50 + Math.abs(hash % 51);
    
    setTimeout(() => {
      setResult(percentage);
      setIsCalculating(false);
    }, 1500);
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

  const getMessage = (percentage: number) => {
    if (percentage >= 95) return t.messages.perfect;
    if (percentage >= 80) return t.messages.high;
    if (percentage >= 65) return t.messages.medium;
    return t.messages.low;
  };

  const getHeartColor = (percentage: number) => {
    if (percentage >= 80) return 'text-red-500';
    if (percentage >= 65) return 'text-pink-500';
    return 'text-pink-400';
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <span className="text-5xl">💕</span>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{t.title}</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.name1}
            </label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your name..."
            />
          </div>

          <div className="flex justify-center">
            <span className="text-3xl">❤️</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.name2}
            </label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter partner's name..."
            />
          </div>

          <button
            onClick={calculateLove}
            disabled={!name1.trim() || !name2.trim() || isCalculating}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-lg hover:from-pink-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCalculating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-pulse">💕</span>
                Calculating...
              </span>
            ) : (
              t.calculate
            )}
          </button>

          <button
            onClick={resetCalculator}
            className="w-full bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
          >
            {t.reset}
          </button>
        </div>

        <div className="space-y-4">
          {result !== null && (
            <div className="text-center animate-fade-in">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <p className="text-gray-600 dark:text-gray-400 mb-2">{t.result}</p>
                <div className={`text-6xl font-bold ${getHeartColor(result)} mb-4`}>
                  {result}%
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {getMessage(result)}
                </p>
                <div className="mt-4 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${i < Math.ceil(result / 20) ? 'opacity-100' : 'opacity-30'}`}
                    >
                      ❤️
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  {t.disclaimer}
                </p>
              </div>
            </div>
          )}

          {result === null && name1.trim() && name2.trim() && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              {t.enterNames}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
