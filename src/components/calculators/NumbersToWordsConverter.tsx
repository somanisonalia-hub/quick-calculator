// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';


interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default: string;
  placeholder?: string;
  options?: string[];
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

interface NumbersToWordsConverterProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
  lang?: string;
}

export default function NumbersToWordsConverter({ inputs, output, additionalOutputs, lang = 'en' }: NumbersToWordsConverterProps) {
  
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      supportedFormats: "Supported Formats",
      numbers: "Numbers",
      currency: "Currency",
      ordinals: "Ordinals",
      languages: "Languages",
      supportedLanguages: "English & Spanish",
      numberExamples: "1234 → one thousand...",
      currencyExamples: "$567.89 → five hundred...",
      ordinalsExamples: "1st → first, 2nd → second",
      result: "Result"
    },
    es: {
      supportedFormats: "Formatos Compatibles",
      numbers: "Números",
      currency: "Moneda",
      ordinals: "Ordinales",
      languages: "Idiomas",
      supportedLanguages: "Inglés y Español",
      numberExamples: "1234 → mil doscientos treinta y cuatro...",
      currencyExamples: "$567,89 → quinientos sesenta y siete...",
      ordinalsExamples: "1º → primero, 2º → segundo",
      result: "Resultado"
    },
    pt: {
      supportedFormats: "Formatos Suportados",
      numbers: "Números",
      currency: "Moeda",
      ordinals: "Ordinais",
      languages: "Idiomas",
      supportedLanguages: "Inglês e Espanhol",
      numberExamples: "1234 → mil duzentos e trinta e quatro...",
      currencyExamples: "R$567,89 → quinhentos e sessenta e sete...",
      ordinalsExamples: "1º → primeiro, 2º → segundo",
      result: "Resultado"
    },
    fr: {
      supportedFormats: "Formats Supportés",
      numbers: "Nombres",
      currency: "Devises",
      ordinals: "Ordinaux",
      languages: "Langues",
      supportedLanguages: "Anglais et Espagnol",
      numberExamples: "1234 → mille deux cent trente-quatre...",
      currencyExamples: "567,89 € → cinq cent soixante-sept...",
      ordinalsExamples: "1er → premier, 2e → deuxième",
      result: "Résultat"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    inputs.forEach(input => {
      initial[input.name] = input.default;
    });
    return initial;
  });

  const [results, setResults] = useState<Record<string, string | number>>({});

  // Number to words conversion functions
  const englishUnits = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const englishTeens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const englishTens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  const spanishUnits = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  const spanishTeens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const spanishTens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];

  const numberToWordsEnglish = (num: number): string => {
    if (num === 0) return 'zero';

    const convertLessThanThousand = (n: number): string => {
      if (n === 0) return '';
      if (n < 10) return englishUnits[n];
      if (n < 20) return englishTeens[n - 10];
      if (n < 100) {
        const tenPart = englishTens[Math.floor(n / 10)];
        const unitPart = n % 10 === 0 ? '' : ' ' + englishUnits[n % 10];
        return tenPart + unitPart;
      }
      const hundredPart = englishUnits[Math.floor(n / 100)] + ' hundred';
      const rest = n % 100;
      const restPart = rest === 0 ? '' : ' ' + convertLessThanThousand(rest);
      return hundredPart + restPart;
    };

    const convert = (n: number): string => {
      if (n === 0) return '';

      let result = '';

      // Billions
      if (Math.floor(n / 1000000000) > 0) {
        result += convertLessThanThousand(Math.floor(n / 1000000000)) + ' billion ';
        n %= 1000000000;
      }

      // Millions
      if (Math.floor(n / 1000000) > 0) {
        result += convertLessThanThousand(Math.floor(n / 1000000)) + ' million ';
        n %= 1000000;
      }

      // Thousands
      if (Math.floor(n / 1000) > 0) {
        result += convertLessThanThousand(Math.floor(n / 1000)) + ' thousand ';
        n %= 1000;
      }

      // Hundreds, tens, units
      if (n > 0) {
        result += convertLessThanThousand(n);
      }

      return result.trim();
    };

    return convert(num);
  };

  const numberToWordsSpanish = (num: number): string => {
    if (num === 0) return 'cero';

    const convertLessThanThousand = (n: number): string => {
      if (n === 0) return '';
      if (n < 10) return spanishUnits[n];
      if (n < 20) return spanishTeens[n - 10];
      if (n < 100) {
        const tenPart = spanishTens[Math.floor(n / 10)];
        const unitPart = n % 10 === 0 ? '' : ' y ' + spanishUnits[n % 10];
        return tenPart + unitPart;
      }
      const hundredPart = n === 100 ? 'cien' : (n < 200 ? 'ciento' : spanishUnits[Math.floor(n / 100)] + 'cientos');
      const rest = n % 100;
      const restPart = rest === 0 ? '' : ' ' + convertLessThanThousand(rest);
      return hundredPart + restPart;
    };

    const convert = (n: number): string => {
      if (n === 0) return '';

      let result = '';

      // Millions
      if (Math.floor(n / 1000000) > 0) {
        const millionPart = Math.floor(n / 1000000);
        if (millionPart === 1) {
          result += 'un millón ';
        } else {
          result += convertLessThanThousand(millionPart) + ' millones ';
        }
        n %= 1000000;
      }

      // Thousands
      if (Math.floor(n / 1000) > 0) {
        const thousandPart = Math.floor(n / 1000);
        if (thousandPart === 1) {
          result += 'mil ';
        } else {
          result += convertLessThanThousand(thousandPart) + ' mil ';
        }
        n %= 1000;
      }

      // Hundreds, tens, units
      if (n > 0) {
        result += convertLessThanThousand(n);
      }

      return result.trim();
    };

    return convert(num);
  };

  const ordinalToWordsEnglish = (ordinal: string): string => {
    const num = parseInt(ordinal.replace(/[^\d]/g, ''));
    if (!num) return '';

    const words = numberToWordsEnglish(num);
    if (!words) return '';

    // Special cases
    const specialOrdinals: Record<number, string> = {
      1: 'first', 2: 'second', 3: 'third', 5: 'fifth', 8: 'eighth', 9: 'ninth', 12: 'twelfth'
    };

    if (specialOrdinals[num]) return specialOrdinals[num];

    // General rules
    if (words.endsWith('one')) return words.slice(0, -3) + 'first';
    if (words.endsWith('two')) return words.slice(0, -3) + 'second';
    if (words.endsWith('three')) return words.slice(0, -5) + 'third';
    if (words.endsWith('five')) return words.slice(0, -4) + 'fifth';
    if (words.endsWith('eight')) return words.slice(0, -5) + 'eighth';
    if (words.endsWith('nine')) return words.slice(0, -4) + 'ninth';
    if (words.endsWith('twelve')) return words.slice(0, -6) + 'twelfth';

    return words + 'th';
  };

  const convertCurrencyEnglish = (amount: string): string => {
    const cleanAmount = amount.replace(/[^\d.]/g, '');
    const [dollars, cents] = cleanAmount.split('.');

    const dollarAmount = parseInt(dollars) || 0;
    const centAmount = parseInt(cents?.padEnd(2, '0').slice(0, 2)) || 0;

    let result = '';

    if (dollarAmount === 1) {
      result = 'one dollar';
    } else if (dollarAmount > 1) {
      result = numberToWordsEnglish(dollarAmount) + ' dollars';
    }

    if (centAmount > 0) {
      if (result) result += ' and ';
      if (centAmount === 1) {
        result += 'one cent';
      } else {
        result += numberToWordsEnglish(centAmount) + ' cents';
      }
    }

    return result || 'zero dollars';
  };

  // Convert input to words
  useEffect(() => {
    const convertToWords = () => {
      const input = values.number.trim();
      const language = values.language;

      if (!input) {
        setResults({});
        return;
      }

      let convertedText = '';
      let numberType = 'Number';
      const digitCount = input.replace(/[^\d]/g, '').length;

      // Check for currency
      if (input.match(/^\$[\d,]+(\.\d{1,2})?$/)) {
        if (language === 'english') {
          convertedText = convertCurrencyEnglish(input);
          numberType = 'Currency';
        }
        // Spanish currency conversion could be added here
      }
      // Check for ordinal (1st, 2nd, 3rd, etc.)
      else if (input.match(/^\d+(st|nd|rd|th)$/i)) {
        if (language === 'english') {
          convertedText = ordinalToWordsEnglish(input);
          numberType = 'Ordinal';
        }
        // Spanish ordinal conversion could be added here
      }
      // Regular number
      else {
        const cleanNumber = input.replace(/[^\d]/g, '');
        const num = parseInt(cleanNumber);

        if (!isNaN(num) && num >= 0 && num <= 999999999) {
          if (language === 'english') {
            convertedText = numberToWordsEnglish(num);
          } else if (language === 'spanish') {
            convertedText = numberToWordsSpanish(num);
          }
          numberType = 'Cardinal Number';
        } else {
          convertedText = 'Number too large or invalid';
          numberType = 'Invalid';
        }
      }

      setResults({
        words: convertedText,
        numberType,
        digitCount
      });
    };

    convertToWords();
  }, [values]);

  const handleInputChange = (name: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Inputs */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Input</h3>

          {inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {input.label}
              </label>

              {input.type === 'select' && input.options ? (
                <select
                  value={values[input.name] || ''}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {input.options.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={input.type}
                  value={values[input.name] || ''}
                  onChange={(e) => handleInputChange(input.name, e.target.value)}
                  placeholder={input.placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{results.numberType || t.result}</h3>

          {/* Main Output */}
          <div className="bg-blue-50 p-2 sm:p-3 rounded-md border-l-3 border-blue-500">
            <div className="text-xs text-gray-600 mb-1">{output.label}</div>
            <div className="text-sm sm:text-lg font-semibold text-blue-900 break-words leading-relaxed">
              {results.words || output.default}
            </div>
          </div>

          {/* Additional Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {additionalOutputs.map((additionalOutput) => (
              <div key={additionalOutput.field} className="bg-white border border-gray-200 p-2 rounded-md shadow-sm">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{additionalOutput.label}</div>
                <div className="text-sm font-bold text-gray-900 mt-0.5">
                  {results[additionalOutput.field] !== undefined ? results[additionalOutput.field] : '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Usage Examples */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
            <h4 className="font-bold text-gray-800 mb-3 text-sm flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
{t.supportedFormats}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
              <div className="bg-white p-2 rounded border">
                <div className="font-medium text-gray-900 mb-1">{t.numbers}</div>
                <div>{t.numberExamples}</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="font-medium text-gray-900 mb-1">{t.currency}</div>
                <div>{t.currencyExamples}</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="font-medium text-gray-900 mb-1">{t.ordinals}</div>
                <div>{t.ordinalsExamples}</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="font-medium text-gray-900 mb-1">{t.languages}</div>
                <div>{t.supportedLanguages}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
