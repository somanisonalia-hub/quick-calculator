'use client';

import { useState, useEffect } from 'react';

interface CurrencyConverterProps {
  lang?: string;
}

export default function CurrencyConverter({ lang = 'en' }: CurrencyConverterProps) {
  // Embedded translations - CRITICAL REQUIREMENT
  const translations = {
    en: {
      title: "Currency Converter",
      description: "Convert between different currencies with real-time exchange rates",
      fromAmount: "From Amount",
      fromCurrency: "From Currency",
      toCurrency: "To Currency",
      convert: "Convert",
      reset: "Reset",
      currencyConversion: "Currency Conversion",
      conversionResult: "Conversion Result",
      exchangeRateDetails: "Exchange Rate Details",
      currentRate: "Current Rate",
      inverseRate: "Inverse Rate",
      amount: "Amount",
      convertedAmount: "Converted Amount",
      exchangeRate: "Exchange Rate",
      lastUpdated: "Last Updated",
      currency: "$",
      understandingCurrencyConversion: "Understanding Currency Conversion",
      exchangeRateLabel: "Exchange Rate:",
      exchangeRateDesc: "Price of one currency in terms of another",
      baseCurrencyLabel: "Base Currency:",
      baseCurrencyDesc: "Currency being converted from",
      quoteCurrencyLabel: "Quote Currency:",
      quoteCurrencyDesc: "Currency being converted to",
      realTimeRatesLabel: "Real-time Rates:",
      realTimeRatesDesc: "Exchange rates fluctuate constantly"
    },
    es: {
      title: "Conversor de Moneda",
      description: "Convierte entre diferentes monedas con tasas de cambio en tiempo real",
      fromAmount: "Monto Desde",
      fromCurrency: "Moneda Desde",
      toCurrency: "Moneda Hasta",
      convert: "Convertir",
      reset: "Reiniciar",
      currencyConversion: "Conversión de Moneda",
      conversionResult: "Resultado de Conversión",
      exchangeRateDetails: "Detalles de Tasa de Cambio",
      currentRate: "Tasa Actual",
      inverseRate: "Tasa Inversa",
      amount: "Monto",
      convertedAmount: "Monto Convertido",
      exchangeRate: "Tasa de Cambio",
      lastUpdated: "Última Actualización",
      currency: "$",
      understandingCurrencyConversion: "Entendiendo la Conversión de Moneda",
      exchangeRateLabel: "Tasa de Cambio:",
      exchangeRateDesc: "Precio de una moneda en términos de otra",
      baseCurrencyLabel: "Moneda Base:",
      baseCurrencyDesc: "Moneda desde la que se convierte",
      quoteCurrencyLabel: "Moneda de Cotización:",
      quoteCurrencyDesc: "Moneda a la que se convierte",
      realTimeRatesLabel: "Tasas en Tiempo Real:",
      realTimeRatesDesc: "Las tasas de cambio fluctúan constantemente"
    },
    pt: {
      title: "Conversor de Moeda",
      description: "Converte entre diferentes moedas com taxas de câmbio em tempo real",
      fromAmount: "Valor De",
      fromCurrency: "Moeda De",
      toCurrency: "Moeda Para",
      convert: "Converter",
      reset: "Reiniciar",
      currencyConversion: "Conversão de Moeda",
      conversionResult: "Resultado da Conversão",
      exchangeRateDetails: "Detalhes da Taxa de Câmbio",
      currentRate: "Taxa Atual",
      inverseRate: "Taxa Inversa",
      amount: "Valor",
      convertedAmount: "Valor Convertido",
      exchangeRate: "Taxa de Câmbio",
      lastUpdated: "Última Atualização",
      currency: "R$",
      understandingCurrencyConversion: "Entendendo a Conversão de Moeda",
      exchangeRateLabel: "Taxa de Câmbio:",
      exchangeRateDesc: "Preço de uma moeda em termos de outra",
      baseCurrencyLabel: "Moeda Base:",
      baseCurrencyDesc: "Moeda da qual se converte",
      quoteCurrencyLabel: "Moeda de Cotação:",
      quoteCurrencyDesc: "Moeda para a qual se converte",
      realTimeRatesLabel: "Taxas em Tempo Real:",
      realTimeRatesDesc: "As taxas de câmbio flutuam constantemente"
    },
    fr: {
      title: "Convertisseur de Devise",
      description: "Convertissez entre différentes devises avec des taux de change en temps réel",
      fromAmount: "Montant De",
      fromCurrency: "Devise De",
      toCurrency: "Devise Vers",
      convert: "Convertir",
      reset: "Réinitialiser",
      currencyConversion: "Conversion de Devise",
      conversionResult: "Résultat de Conversion",
      exchangeRateDetails: "Détails du Taux de Change",
      currentRate: "Taux Actuel",
      inverseRate: "Taux Inverse",
      amount: "Montant",
      convertedAmount: "Montant Convertit",
      exchangeRate: "Taux de Change",
      lastUpdated: "Dernière Mise à Jour",
      currency: "€",
      understandingCurrencyConversion: "Comprendre la Conversion de Devise",
      exchangeRateLabel: "Taux de Change:",
      exchangeRateDesc: "Prix d'une devise en termes d'une autre",
      baseCurrencyLabel: "Devise de Base:",
      baseCurrencyDesc: "Devise à partir de laquelle on convertit",
      quoteCurrencyLabel: "Devise de Cotation:",
      quoteCurrencyDesc: "Devise vers laquelle on convertit",
      realTimeRatesLabel: "Taux en Temps Réel:",
      realTimeRatesDesc: "Les taux de change fluctuent constamment"
    },
    de: {
      title: "Währungsumrechner",
      description: "Konvertieren Sie zwischen verschiedenen Währungen mit Echtzeit-Wechselkursen",
      fromAmount: "Von Betrag",
      fromCurrency: "Von Währung",
      toCurrency: "Zu Währung",
      convert: "Umrechnen",
      reset: "Zurücksetzen",
      currencyConversion: "Währungsumrechnung",
      conversionResult: "Konversionsergebnis",
      exchangeRateDetails: "Wechselkursdetails",
      currentRate: "Aktueller Satz",
      inverseRate: "Umgekehrter Satz",
      amount: "Betrag",
      convertedAmount: "Umgerechneter Betrag",
      exchangeRate: "Wechselkurs",
      lastUpdated: "Zuletzt aktualisiert",
      currency: "€",
      understandingCurrencyConversion: "Währungsumrechnung verstehen",
      exchangeRateLabel: "Wechselkurs:",
      exchangeRateDesc: "Preis einer Währung in Bezug auf eine andere",
      baseCurrencyLabel: "Basis-Währung:",
      baseCurrencyDesc: "Währung, von der konvertiert wird",
      quoteCurrencyLabel: "Notierungs-Währung:",
      quoteCurrencyDesc: "Währung, in die konvertiert wird",
      realTimeRatesLabel: "Echtzeitkurse:",
      realTimeRatesDesc: "Wechselkurse schwanken ständig"
    },
    nl: {
      title: "Valutaomzetter",
      description: "Zet om tussen verschillende valuta's met realtime wisselkoersen",
      fromAmount: "Bedrag Van",
      fromCurrency: "Valuta Van",
      toCurrency: "Valuta Naar",
      convert: "Omzetten",
      reset: "Opnieuw instellen",
      currencyConversion: "Valutaomzetting",
      conversionResult: "Omzettingsresultaat",
      exchangeRateDetails: "Wisselkoersdetails",
      currentRate: "Huidigekoers",
      inverseRate: "Omgekeerde Koers",
      amount: "Bedrag",
      convertedAmount: "Omgerekend Bedrag",
      exchangeRate: "Wisselkoers",
      lastUpdated: "Laatst bijgewerkt",
      currency: "€",
      understandingCurrencyConversion: "Valutaomzetting begrijpen",
      exchangeRateLabel: "Wisselkoers:",
      exchangeRateDesc: "Prijs van de ene valuta in termen van de andere",
      baseCurrencyLabel: "Basisvaluta:",
      baseCurrencyDesc: "Valuta waarvan wordt omgezet",
      quoteCurrencyLabel: "Gevraagde Valuta:",
      quoteCurrencyDesc: "Valuta waar naar wordt omgezet",
      realTimeRatesLabel: "Realtimekoersen:",
      realTimeRatesDesc: "Wisselkoersen schommelen constant"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const [fromAmount, setFromAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [results, setResults] = useState<any>({});

  // Mock exchange rates (in a real app, these would come from an API)
  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110.0, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, SEK: 8.60, NZD: 1.40, MXN: 20.0, SGD: 1.35, HKD: 7.80, NOK: 8.50, KRW: 1180.0, TRY: 8.30, RUB: 75.0, INR: 74.5, BRL: 5.20, ZAR: 14.8 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129.0, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.60, SEK: 10.1, NZD: 1.65, MXN: 23.5, SGD: 1.59, HKD: 9.20, NOK: 10.0, KRW: 1390.0, TRY: 9.80, RUB: 88.0, INR: 87.5, BRL: 6.10, ZAR: 17.4 },
    GBP: { USD: 1.37, EUR: 1.17, JPY: 150.0, CAD: 1.71, AUD: 1.85, CHF: 1.26, CNY: 8.85, SEK: 11.8, NZD: 1.92, MXN: 27.4, SGD: 1.85, HKD: 10.7, NOK: 11.6, KRW: 1615.0, TRY: 11.4, RUB: 102.0, INR: 101.5, BRL: 7.10, ZAR: 20.2 },
    JPY: { USD: 0.0091, EUR: 0.0078, GBP: 0.0067, CAD: 0.0114, AUD: 0.0123, CHF: 0.0083, CNY: 0.0586, SEK: 0.078, NZD: 0.0127, MXN: 0.181, SGD: 0.0123, HKD: 0.0709, NOK: 0.077, KRW: 106.8, TRY: 0.075, RUB: 6.75, INR: 6.71, BRL: 0.469, ZAR: 1.33 },
    CAD: { USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 87.5, AUD: 1.08, CHF: 0.74, CNY: 5.16, SEK: 6.88, NZD: 1.12, MXN: 16.0, SGD: 1.08, HKD: 6.24, NOK: 6.80, KRW: 940.0, TRY: 6.64, RUB: 59.5, INR: 59.1, BRL: 4.16, ZAR: 11.8 },
    AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 81.0, CAD: 0.93, CHF: 0.68, CNY: 4.78, SEK: 6.37, NZD: 1.04, MXN: 14.8, SGD: 1.00, HKD: 5.78, NOK: 6.30, KRW: 870.0, TRY: 6.15, RUB: 55.0, INR: 54.6, BRL: 3.85, ZAR: 10.9 },
    CHF: { USD: 1.09, EUR: 0.93, GBP: 0.79, JPY: 120.0, CAD: 1.35, AUD: 1.47, CNY: 7.00, SEK: 9.30, NZD: 1.52, MXN: 21.7, SGD: 1.47, HKD: 8.48, NOK: 9.20, KRW: 1275.0, TRY: 9.00, RUB: 80.5, INR: 79.9, BRL: 5.60, ZAR: 15.9 },
    CNY: { USD: 0.155, EUR: 0.132, GBP: 0.113, JPY: 17.1, CAD: 0.194, AUD: 0.209, CHF: 0.143, SEK: 1.33, NZD: 0.217, MXN: 3.10, SGD: 0.209, HKD: 1.21, NOK: 1.31, KRW: 182.0, TRY: 1.29, RUB: 11.5, INR: 11.4, BRL: 0.806, ZAR: 2.29 },
    BRL: { USD: 0.192, EUR: 0.164, GBP: 0.141, JPY: 2.13, CAD: 0.241, AUD: 0.260, CHF: 0.179, CNY: 1.24, SEK: 1.65, NZD: 0.269, MXN: 3.85, SGD: 0.260, HKD: 1.50, NOK: 1.63, KRW: 225.0, TRY: 1.60, RUB: 14.3, INR: 14.2, ZAR: 2.84 }
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }
  ];

  const convertCurrency = () => {
    if (fromAmount <= 0 || fromCurrency === toCurrency) {
      setResults({});
      return;
    }

    const rate = exchangeRates[fromCurrency]?.[toCurrency];
    if (!rate) {
      setResults({});
      return;
    }

    const convertedAmount = fromAmount * rate;
    const inverseRate = 1 / rate;

    setResults({
      convertedAmount: convertedAmount.toFixed(2),
      exchangeRate: rate.toFixed(4),
      inverseRate: inverseRate.toFixed(4),
      lastUpdated: new Date().toLocaleString()
    });
  };

  const resetCalculator = () => {
    setFromAmount(1000);
    setFromCurrency('USD');
    setToCurrency('EUR');
    setResults({});
  };

  // Auto-convert when inputs change
  useEffect(() => {
    convertCurrency();
  }, [fromAmount, fromCurrency, toCurrency]);

  return (
    <div className="space-y-6">
      <div className="mb-6 hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.fromAmount}</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">{t.currency}</span>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(Number(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="100"
                  min="0.01"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.fromCurrency}</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.name} ({currency.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.toCurrency}</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.name} ({currency.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={convertCurrency}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.convert}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {t.reset}
            </button>
          </div>

          {/* Formula Display */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Currency Conversion Formula</h4>
            <div className="text-xs text-blue-700 font-mono">
              Converted Amount = From Amount × Exchange Rate
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Exchange rates are updated periodically
            </div>
          </div>
        </div>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={convertCurrency}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.calculate}
            </button>
          </div>


        {/* Results Section */}
        <div className="space-y-4">
          {Object.keys(results).length > 0 ? (
            <div className="space-y-4">
              {/* Main Result */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-700 font-medium mb-2">{t.convertedAmount}</div>
                <div className="text-4xl font-bold text-blue-800">
                  {currencies.find(c => c.code === toCurrency)?.symbol}{results.convertedAmount}
                </div>
                <div className="text-xs text-blue-600 mt-2">
                  {fromAmount} {fromCurrency} → {toCurrency} conversion
                </div>
              </div>

              {/* Additional Results */}
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.exchangeRate}</div>
                  <div className="text-lg font-bold text-gray-900">
                    1 {fromCurrency} = {results.exchangeRate} {toCurrency}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">{t.inverseRate}</div>
                  <div className="text-lg font-bold text-gray-900">
                    1 {toCurrency} = {results.inverseRate} {fromCurrency}
                  </div>
                </div>
              </div>

              {/* Educational Info */}
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">{t.understandingCurrencyConversion}</h4>
                <div className="text-xs text-indigo-700 space-y-1">
                  <div><strong>{t.exchangeRateLabel}</strong> {t.exchangeRateDesc}</div>
                  <div><strong>{t.baseCurrencyLabel}</strong> {t.baseCurrencyDesc}</div>
                  <div><strong>{t.quoteCurrencyLabel}</strong> {t.quoteCurrencyDesc}</div>
                  <div><strong>{t.realTimeRatesLabel}</strong> {t.realTimeRatesDesc}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Convert Currency</h3>
              <p className="text-gray-500">Enter amount and select currencies above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}