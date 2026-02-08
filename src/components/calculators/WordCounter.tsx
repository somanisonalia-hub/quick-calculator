// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';

interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: string;
  placeholder?: string;
}

interface CalculatorOutput {
  label: string;
  default: string;
  format: string;
}

interface AdditionalOutput {
  label: string;
  field: string;
  format: string;
}

interface WordCounterProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
  lang?: string;
}

const translations = {
  en: {
    writingtips: "Writing Tips",
      second: "second",
      minute: "minute",
      thisisashortpiececonsideraddingmoredetailsorexamples: "This is a short piece. Consider adding more details or examples.",
      goodlengthforablogpostorshortarticle: "Good length for a blog post or short article.",
      excellentlengthformostarticlesandessays: "Excellent length for most articles and essays.",
      longformcontentconsiderbreakingintosectionsorchapters: "Long-form content. Consider breaking into sections or chapters.",
      averagesentencelengthishightryvaryingsentencestructureforbetterreadability: "Average sentence length is high. Try varying sentence structure for better readability.",
      manyshortsentencesconsidercombiningsomeforbetterflow: "Many short sentences. Consider combining some for better flow.",
      calculate: "🔄 Recalculate",
      reset: "Reset"
  },
  es: {
    writingtips: "Consejos de escritura",
      second: "segundo",
      minute: "minuto",
      thisisashortpiececonsideraddingmoredetailsorexamples: "Esta es una pieza corta. Considera agregar más detalles o ejemplos.",
      goodlengthforablogpostorshortarticle: "Buena longitud para una publicación de blog o artículo corto.",
      excellentlengthformostarticlesandessays: "Longitud excelente para la mayoría de artículos y ensayos.",
      longformcontentconsiderbreakingintosectionsorchapters: "Contenido de formato largo. Considera dividirlo en secciones o capítulos.",
      averagesentencelengthishightryvaryingsentencestructureforbetterreadability: "La longitud promedio de las oraciones es alta. Intenta variar la estructura de las oraciones para una mejor legibilidad.",
      manyshortsentencesconsidercombiningsomeforbetterflow: "Muchas oraciones cortas. Considera combinar algunas para un mejor flujo.",
      calculate: "🔄 Recalcular",
      reset: "Restablecer"
  },
  pt: {
    writingtips: "Consejos de escrita",
      second: "segundo",
      minute: "minuto",
      thisisashortpiececonsideraddingmoredetailsorexamples: "Esta é uma peça curta. Considere adicionar mais detalhes ou exemplos.",
      goodlengthforablogpostorshortarticle: "Bom comprimento para uma postagem de blog ou artigo curto.",
      excellentlengthformostarticlesandessays: "Comprimento excelente para a maioria dos artigos e ensaios.",
      longformcontentconsiderbreakingintosectionsorchapters: "Conteúdo de formato longo. Considere dividir em seções ou capítulos.",
      averagesentencelengthishightryvaryingsentencestructureforbetterreadability: "O comprimento médio das frases é alto. Tente variar a estrutura das frases para uma melhor legibilidade.",
      manyshortsentencesconsidercombiningsomeforbetterflow: "Muitas frases curtas. Considere combinar algumas para um melhor fluxo.",
      calculate: "🔄 Recalcular",
      reset: "Redefinir"
  },
  fr: {
    writingtips: "Conseils d'écriture",
      second: "seconde",
      minute: "minute",
      thisisashortpiececonsideraddingmoredetailsorexamples: "Ceci est un morceau court. Envisagez d'ajouter plus de détails ou d'exemples.",
      goodlengthforablogpostorshortarticle: "Bonne longueur pour un article de blog ou un court article.",
      excellentlengthformostarticlesandessays: "Longueur excellente pour la plupart des articles et essais.",
      longformcontentconsiderbreakingintosectionsorchapters: "Contenu de longue forme. Envisagez de le diviser en sections ou chapitres.",
      averagesentencelengthishightryvaryingsentencestructureforbetterreadability: "La longueur moyenne des phrases est élevée. Essayez de varier la structure des phrases pour une meilleure lisibilité.",
      manyshortsentencesconsidercombiningsomeforbetterflow: "Beaucoup de phrases courtes. Envisagez d'en combiner certaines pour un meilleur flux.",
      calculate: "🔄 Recalculer",
      reset: "Réinitialiser"
  },
};


export default function WordCounter({ inputs, output, additionalOutputs, lang = 'en' }: WordCounterProps) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, any>>({});

  // Calculate text statistics
  useEffect(() => {
    const calculateStats = () => {
      const text = values.text || '';

      if (text.trim() === '') {
        setResults({});
        return;
      }

      // Word count
      const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;

      // Character counts
      const charactersWithSpaces = text.length;
      const charactersNoSpaces = text.replace(/\s/g, '').length;

      // Sentence count (basic - counts periods, exclamation marks, question marks)
      const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;

      // Paragraph count (counts line breaks)
      const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0).length || 1;

      // Reading time (average 200 words per minute)
      const readingTimeSeconds = Math.ceil((words / 200) * 60);
      let readingTime = '';
      if (readingTimeSeconds < 60) {
        readingTime = `${readingTimeSeconds}${t.second}${readingTimeSeconds !== 1 ? 's' : ''}`;
      } else {
        const minutes = Math.floor(readingTimeSeconds / 60);
        const seconds = readingTimeSeconds % 60;
        readingTime = `${minutes}${t.minute}${minutes !== 1 ? 's' : ''}`;
        if (seconds > 0) {
          readingTime += ` ${seconds}${t.second}${seconds !== 1 ? 's' : ''}`;
        }
      }

      setResults({
        words,
        charactersWithSpaces,
        charactersNoSpaces,
        sentences,
        paragraphs,
        readingTime
      });
    };



    calculateStats();
  }, [values]);

  const handleInputChange = (name: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="space-y-3 sm:space-y-4">
        {/* Text Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {inputs[0]?.label}
          </label>
          <textarea
            value={values.text}
            onChange={(e) => handleInputChange('text', e.target.value)}
            placeholder={inputs[0]?.placeholder}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical min-h-[100px] sm:min-h-[120px] text-sm"
          />
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {/* Main Output */}
          <div className="bg-blue-50 p-2 sm:p-3 rounded-md border-l-3 border-blue-500 col-span-2 sm:col-span-3 lg:col-span-2">
            <div className="text-xs text-gray-600 mb-0.5">{output.label}</div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {results.words !== undefined ? results.words.toLocaleString() : output.default}
            </div>
          </div>

          {/* Additional Outputs */}
          {additionalOutputs.map((additionalOutput) => (
            <div key={additionalOutput.field} className="bg-white border border-gray-200 p-2 rounded-md shadow-sm">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5 truncate" title={additionalOutput.label}>
                {additionalOutput.label.replace('Count', '').replace('Estimated ', '')}
              </div>
              <div className="text-sm sm:text-base font-bold text-gray-900">
                {results[additionalOutput.field] !== undefined
                  ? (typeof results[additionalOutput.field] === 'number'
                      ? results[additionalOutput.field].toLocaleString()
                      : results[additionalOutput.field])
                  : '—'
                }
              </div>
            </div>
          ))}
        </div>

        {/* Writing Tips */}
        {results.words > 0 && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">{t.writingtips}</h4>
            <div className="text-xs sm:text-sm text-green-800 space-y-1">
              {results.words < 300 && (
                <div>{t.thisisashortpiececonsideraddingmoredetailsorexamples}</div>
              )}
              {results.words >= 300 && results.words < 600 && (
                <div>{t.goodlengthforablogpostorshortarticle}</div>
              )}
              {results.words >= 600 && results.words < 1000 && (
                <div>{t.excellentlengthformostarticlesandessays}</div>
              )}
              {results.words >= 1000 && (
                <div>{t.longformcontentconsiderbreakingintosectionsorchapters}</div>
              )}
              {results.sentences > 0 && results.words / results.sentences > 25 && (
                <div>{t.averagesentencelengthishightryvaryingsentencestructureforbetterreadability}</div>
              )}
              {results.sentences > 0 && results.words / results.sentences < 10 && (
                <div>{t.manyshortsentencesconsidercombiningsomeforbetterflow}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
