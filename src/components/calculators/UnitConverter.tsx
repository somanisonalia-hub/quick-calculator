'use client';

import { useState, useEffect } from 'react';

interface UnitConverterProps {
  lang?: string;
}

export default function UnitConverter({ lang = 'en' }: UnitConverterProps) {
  // Embedded translations following CALCULATOR_CREATION_AGENT.md approach
  const translations = {
    en: {
      title: "Unit Converter",
      description: "Convert between different units of measurement",
      value: "Value",
      from: "From",
      to: "To",
      convert: "Convert",
      result: "Result",
      selectCategory: "Select Category",
      length: "Length",
      weight: "Weight",
      temperature: "Temperature",
      area: "Area",
      volume: "Volume",
      speed: "Speed",
      time: "Time",
      // Length units
      meters: "Meters",
      feet: "Feet",
      inches: "Inches",
      centimeters: "Centimeters",
      millimeters: "Millimeters",
      kilometers: "Kilometers",
      miles: "Miles",
      yards: "Yards",
      // Weight units
      kilograms: "Kilograms",
      grams: "Grams",
      pounds: "Pounds",
      ounces: "Ounces",
      tons: "Tons",
      // Temperature units
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      kelvin: "Kelvin",
      // Area units
      squareMeters: "Square Meters",
      squareFeet: "Square Feet",
      squareInches: "Square Inches",
      squareKilometers: "Square Kilometers",
      acres: "Acres",
      hectares: "Hectares",
      // Volume units
      liters: "Liters",
      milliliters: "Milliliters",
      cubicMeters: "Cubic Meters",
      gallons: "Gallons",
      quarts: "Quarts",
      pints: "Pints",
      cups: "Cups",
      fluidOunces: "Fluid Ounces",
      // Speed units
      metersPerSecond: "Meters/Second",
      kilometersPerHour: "Kilometers/Hour",
      milesPerHour: "Miles/Hour",
      feetPerSecond: "Feet/Second",
      knots: "Knots",
      // Time units
      seconds: "Seconds",
      minutes: "Minutes",
      hours: "Hours",
      days: "Days",
      weeks: "Weeks",
      months: "Months",
      years: "Years"
    },
    es: {
      title: "Convertidor de Unidades",
      description: "Convierte entre diferentes unidades de medida",
      value: "Valor",
      from: "De",
      to: "A",
      convert: "Convertir",
      result: "Resultado",
      selectCategory: "Seleccionar Categoría",
      length: "Longitud",
      weight: "Peso",
      temperature: "Temperatura",
      area: "Área",
      volume: "Volumen",
      speed: "Velocidad",
      time: "Tiempo",
      // Length units
      meters: "Metros",
      feet: "Pies",
      inches: "Pulgadas",
      centimeters: "Centímetros",
      millimeters: "Milímetros",
      kilometers: "Kilómetros",
      miles: "Millas",
      yards: "Yardas",
      // Weight units
      kilograms: "Kilogramos",
      grams: "Gramos",
      pounds: "Libras",
      ounces: "Onzas",
      tons: "Toneladas",
      // Temperature units
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      kelvin: "Kelvin",
      // Area units
      squareMeters: "Metros Cuadrados",
      squareFeet: "Pies Cuadrados",
      squareInches: "Pulgadas Cuadradas",
      squareKilometers: "Kilómetros Cuadrados",
      acres: "Acres",
      hectares: "Hectáreas",
      // Volume units
      liters: "Litros",
      milliliters: "Mililitros",
      cubicMeters: "Metros Cúbicos",
      gallons: "Galones",
      quarts: "Cuartos",
      pints: "Pintas",
      cups: "Tazas",
      fluidOunces: "Onzas Líquidas",
      // Speed units
      metersPerSecond: "Metros/Segundo",
      kilometersPerHour: "Kilómetros/Hora",
      milesPerHour: "Millas/Hora",
      feetPerSecond: "Pies/Segundo",
      knots: "Nudos",
      // Time units
      seconds: "Segundos",
      minutes: "Minutos",
      hours: "Horas",
      days: "Días",
      weeks: "Semanas",
      months: "Meses",
      years: "Años"
    },
    pt: {
      title: "Conversor de Unidades",
      description: "Converta entre diferentes unidades de medida",
      value: "Valor",
      from: "De",
      to: "Para",
      convert: "Converter",
      result: "Resultado",
      selectCategory: "Selecionar Categoria",
      length: "Comprimento",
      weight: "Peso",
      temperature: "Temperatura",
      area: "Área",
      volume: "Volume",
      speed: "Velocidade",
      time: "Tempo",
      // Length units
      meters: "Metros",
      feet: "Pés",
      inches: "Polegadas",
      centimeters: "Centímetros",
      millimeters: "Milímetros",
      kilometers: "Quilômetros",
      miles: "Milhas",
      yards: "Jardas",
      // Weight units
      kilograms: "Quilogramas",
      grams: "Gramas",
      pounds: "Libras",
      ounces: "Onças",
      tons: "Toneladas",
      // Temperature units
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      kelvin: "Kelvin",
      // Area units
      squareMeters: "Metros Quadrados",
      squareFeet: "Pés Quadrados",
      squareInches: "Polegadas Quadradas",
      squareKilometers: "Quilômetros Quadrados",
      acres: "Acres",
      hectares: "Hectares",
      // Volume units
      liters: "Litros",
      milliliters: "Mililitros",
      cubicMeters: "Metros Cúbicos",
      gallons: "Galões",
      quarts: "Quartos",
      pints: "Pints",
      cups: "Copos",
      fluidOunces: "Onças Líquidas",
      // Speed units
      metersPerSecond: "Metros/Segundo",
      kilometersPerHour: "Quilômetros/Hora",
      milesPerHour: "Milhas/Hora",
      feetPerSecond: "Pés/Segundo",
      knots: "Nós",
      // Time units
      seconds: "Segundos",
      minutes: "Minutos",
      hours: "Horas",
      days: "Dias",
      weeks: "Semanas",
      months: "Meses",
      years: "Anos"
    },
    fr: {
      title: "Convertisseur d'Unités",
      description: "Convertissez entre différentes unités de mesure",
      value: "Valeur",
      from: "De",
      to: "À",
      convert: "Convertir",
      result: "Résultat",
      selectCategory: "Sélectionner Catégorie",
      length: "Longueur",
      weight: "Poids",
      temperature: "Température",
      area: "Surface",
      volume: "Volume",
      speed: "Vitesse",
      time: "Temps",
      // Length units
      meters: "Mètres",
      feet: "Pieds",
      inches: "Pouces",
      centimeters: "Centimètres",
      millimeters: "Millimètres",
      kilometers: "Kilomètres",
      miles: "Miles",
      yards: "Yards",
      // Weight units
      kilograms: "Kilogrammes",
      grams: "Grammes",
      pounds: "Livres",
      ounces: "Onces",
      tons: "Tonnes",
      // Temperature units
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      kelvin: "Kelvin",
      // Area units
      squareMeters: "Mètres Carrés",
      squareFeet: "Pieds Carrés",
      squareInches: "Pouces Carrés",
      squareKilometers: "Kilomètres Carrés",
      acres: "Acres",
      hectares: "Hectares",
      // Volume units
      liters: "Litres",
      milliliters: "Millilitres",
      cubicMeters: "Mètres Cubes",
      gallons: "Gallons",
      quarts: "Quarts",
      pints: "Pintes",
      cups: "Tasses",
      fluidOunces: "Onces Liquides",
      // Speed units
      metersPerSecond: "Mètres/Seconde",
      kilometersPerHour: "Kilomètres/Heure",
      milesPerHour: "Miles/Heure",
      feetPerSecond: "Pieds/Seconde",
      knots: "Nœuds",
      // Time units
      seconds: "Secondes",
      minutes: "Minutes",
      hours: "Heures",
      days: "Jours",
      weeks: "Semaines",
      months: "Mois",
      years: "Années"
    },
    de: {
      title: "Einheitskonverter",
      description: "Konvertiert zwischen verschiedenen Maßeinheiten",
      value: "Wert",
      from: "Von",
      to: "Zu",
      convert: "Konvertieren",
      result: "Ergebnis",
      selectCategory: "Kategorie Wählen",
      length: "Länge",
      weight: "Gewicht",
      temperature: "Temperatur",
      area: "Fläche",
      volume: "Volumen",
      speed: "Geschwindigkeit",
      time: "Zeit",
      // Length units
      meters: "Meter",
      feet: "Fuß",
      inches: "Zoll",
      centimeters: "Zentimeter",
      millimeters: "Millimeter",
      kilometers: "Kilometer",
      miles: "Meilen",
      yards: "Yards",
      // Weight units
      kilograms: "Kilogramm",
      grams: "Gramm",
      pounds: "Pfund",
      ounces: "Unzen",
      tons: "Tonnen",
      // Temperature units
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      kelvin: "Kelvin",
      // Area units
      squareMeters: "Quadratmeter",
      squareFeet: "Quadratfuß",
      squareInches: "Quadratzoll",
      squareKilometers: "Quadratkilometer",
      acres: "Acres",
      hectares: "Hektar",
      // Volume units
      liters: "Liter",
      milliliters: "Milliliter",
      cubicMeters: "Kubikmeter",
      gallons: "Gallonen",
      quarts: "Quarts",
      pints: "Pints",
      cups: "Tassen",
      fluidOunces: "Flüssige Unzen",
      // Speed units
      metersPerSecond: "Meter/Sekunde",
      kilometersPerHour: "Kilometer/Stunde",
      milesPerHour: "Meilen/Stunde",
      feetPerSecond: "Fuß/Sekunde",
      knots: "Knoten",
      // Time units
      seconds: "Sekunden",
      minutes: "Minuten",
      hours: "Stunden",
      days: "Tage",
      weeks: "Wochen",
      months: "Monate",
      years: "Jahre"
    },
    nl: {
      title: "Eenheidsconverter",
      description: "Converteer tussen verschillende maateenheden",
      value: "Waarde",
      from: "Van",
      to: "Naar",
      convert: "Converteren",
      result: "Resultaat",
      selectCategory: "Selecteer Categorie",
      length: "Lengte",
      weight: "Gewicht",
      temperature: "Temperatuur",
      area: "Oppervlakte",
      volume: "Volume",
      speed: "Snelheid",
      time: "Tijd",
      // Length units
      meters: "Meter",
      feet: "Voet",
      inches: "Inch",
      centimeters: "Centimeter",
      millimeters: "Millimeter",
      kilometers: "Kilometer",
      miles: "Mijl",
      yards: "Yards",
      // Weight units
      kilograms: "Kilogram",
      grams: "Gram",
      pounds: "Pond",
      ounces: "Ounce",
      tons: "Tonnen",
      // Temperature units
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      kelvin: "Kelvin",
      // Area units
      squareMeters: "Vierkante meter",
      squareFeet: "Vierkante voet",
      squareInches: "Vierkante inch",
      squareKilometers: "Vierkante kilometer",
      acres: "Acres",
      hectares: "Hectare",
      // Volume units
      liters: "Liter",
      milliliters: "Milliliter",
      cubicMeters: "Kubieke meter",
      gallons: "Gallon",
      quarts: "Quart",
      pints: "Pint",
      cups: "Beker",
      fluidOunces: "Vloeistof Ounce",
      // Speed units
      metersPerSecond: "Meter/Seconde",
      kilometersPerHour: "Kilometer/Uur",
      milesPerHour: "Mijl/Uur",
      feetPerSecond: "Voet/Seconde",
      knots: "Knopen",
      // Time units
      seconds: "Seconden",
      minutes: "Minuten",
      hours: "Uren",
      days: "Dagen",
      weeks: "Weken",
      months: "Maanden",
      years: "Jaren"
    }
  };const t = translations[lang as keyof typeof translations] || translations.en;

  const [value, setValue] = useState('');
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [result, setResult] = useState('');

  const resetCalculator = () => {
    // Reset to default values
    setValue(0);
    setCategory(0);
    setFromUnit(0);
    // Additional state resets may be needed
  };

  // Unit categories and their units
  const categories = {
    length: {
      label: t.length,
      units: {
        meters: t.meters,
        feet: t.feet,
        inches: t.inches,
        centimeters: t.centimeters,
        millimeters: t.millimeters,
        kilometers: t.kilometers,
        miles: t.miles,
        yards: t.yards
      }
    },
    weight: {
      label: t.weight,
      units: {
        kilograms: t.kilograms,
        grams: t.grams,
        pounds: t.pounds,
        ounces: t.ounces,
        tons: t.tons
      }
    },
    temperature: {
      label: t.temperature,
      units: {
        celsius: t.celsius,
        fahrenheit: t.fahrenheit,
        kelvin: t.kelvin
      }
    },
    area: {
      label: t.area,
      units: {
        squareMeters: t.squareMeters,
        squareFeet: t.squareFeet,
        squareInches: t.squareInches,
        squareKilometers: t.squareKilometers,
        acres: t.acres,
        hectares: t.hectares
      }
    },
    volume: {
      label: t.volume,
      units: {
        liters: t.liters,
        milliliters: t.milliliters,
        cubicMeters: t.cubicMeters,
        gallons: t.gallons,
        quarts: t.quarts,
        pints: t.pints,
        cups: t.cups,
        fluidOunces: t.fluidOunces
      }
    },
    speed: {
      label: t.speed,
      units: {
        metersPerSecond: t.metersPerSecond,
        kilometersPerHour: t.kilometersPerHour,
        milesPerHour: t.milesPerHour,
        feetPerSecond: t.feetPerSecond,
        knots: t.knots
      }
    },
    time: {
      label: t.time,
      units: {
        seconds: t.seconds,
        minutes: t.minutes,
        hours: t.hours,
        days: t.days,
        weeks: t.weeks,
        months: t.months,
        years: t.years
      }
    }
  };

  // Conversion functions for each category
  const convertValue = (value: number, from: string, to: string, category: string): number => {
    // Base unit conversions (to meters, then to target)
    const toBase = (unit: string, category: string): number => {
      switch (category) {
        case 'length':
          switch (unit) {
            case 'meters': return 1;
            case 'feet': return 0.3048;
            case 'inches': return 0.0254;
            case 'centimeters': return 0.01;
            case 'millimeters': return 0.001;
            case 'kilometers': return 1000;
            case 'miles': return 1609.344;
            case 'yards': return 0.9144;
            default: return 1;
          }
        case 'weight':
          switch (unit) {
            case 'kilograms': return 1;
            case 'grams': return 0.001;
            case 'pounds': return 0.453592;
            case 'ounces': return 0.0283495;
            case 'tons': return 1000;
            default: return 1;
          }
        case 'temperature':
          return value; // Handle temperature separately
        case 'area':
          switch (unit) {
            case 'squareMeters': return 1;
            case 'squareFeet': return 0.092903;
            case 'squareInches': return 0.00064516;
            case 'squareKilometers': return 1000000;
            case 'acres': return 4046.86;
            case 'hectares': return 10000;
            default: return 1;
          }
        case 'volume':
          switch (unit) {
            case 'liters': return 1;
            case 'milliliters': return 0.001;
            case 'cubicMeters': return 1000;
            case 'gallons': return 3.78541;
            case 'quarts': return 0.946353;
            case 'pints': return 0.473176;
            case 'cups': return 0.236588;
            case 'fluidOunces': return 0.0295735;
            default: return 1;
          }
        case 'speed':
          switch (unit) {
            case 'metersPerSecond': return 1;
            case 'kilometersPerHour': return 1/3.6;
            case 'milesPerHour': return 0.44704;
            case 'feetPerSecond': return 0.3048;
            case 'knots': return 0.514444;
            default: return 1;
          }
        case 'time':
          switch (unit) {
            case 'seconds': return 1;
            case 'minutes': return 60;
            case 'hours': return 3600;
            case 'days': return 86400;
            case 'weeks': return 604800;
            case 'months': return 2629746; // Average month
            case 'years': return 31556952; // Average year
            default: return 1;
          }
        default: return 1;
      }
    };

    const fromBase = (unit: string, category: string): number => {
      return 1 / toBase(unit, category);
    };

    // Special handling for temperature
    if (category === 'temperature') {
      if (from === to) return value;

      // Convert to Celsius first
      let celsius: number;
      switch (from) {
        case 'celsius': celsius = value; break;
        case 'fahrenheit': celsius = (value - 32) * 5/9; break;
        case 'kelvin': celsius = value - 273.15; break;
        default: celsius = value;
      }

      // Convert from Celsius to target
      switch (to) {
        case 'celsius': return celsius;
        case 'fahrenheit': return celsius * 9/5 + 32;
        case 'kelvin': return celsius + 273.15;
        default: return celsius;
      }
    }

    // For other categories, convert through base unit
    const baseValue = value * toBase(from, category);
    return baseValue * fromBase(to, category);
  };

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult('');
      return;
    }

    const converted = convertValue(numValue, fromUnit, toUnit, category);
    const fromLabel = categories[category as keyof typeof categories].units[fromUnit as keyof typeof categories[keyof typeof categories]['units']];
    const toLabel = categories[category as keyof typeof categories].units[toUnit as keyof typeof categories[keyof typeof categories]['units']];

    setResult(`${numValue} ${fromLabel} = ${converted.toFixed(6).replace(/\.?0+$/, '')} ${toLabel}`);
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, fromUnit, toUnit, category]);

  // Update default units when category changes
  useEffect(() => {
    const categoryUnits = Object.keys(categories[category as keyof typeof categories].units);
    setFromUnit(categoryUnits[0]);
    setToUnit(categoryUnits[1] || categoryUnits[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      {/* Category Tabs - Mobile optimized */}
      <div className="mb-6 sm:mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-hide" aria-label="Unit Categories">
            {Object.entries(categories).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => {
                  setCategory(key);
                  const categoryUnits = Object.keys(cat.units);
                  setFromUnit(categoryUnits[0]);
                  setToUnit(categoryUnits[1] || categoryUnits[0]);
                }}
                className={`whitespace-nowrap py-2 px-2 sm:py-3 sm:px-4 border-b-2 font-medium text-xs sm:text-sm transition-all rounded-t-md flex-shrink-0 ${
                  category === key
                    ? 'border-blue-500 text-blue-600 bg-blue-50 shadow-sm'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Active Category Indicator */}
        <div className="mt-2 text-xs sm:text-sm text-gray-600">
          <span className="font-medium">{categories[category as keyof typeof categories].label}</span> conversion
        </div>
      </div>

      <div className="space-y-6">
        {/* Conversion Interface */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200">
          {/* Auto-calculation indicator for mobile */}
          <div className="sm:hidden text-center mb-4">
            <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Auto-calculates as you type
            </div>
          </div>
          {/* Mobile: Stacked layout, Desktop: Side-by-side */}
          <div className="space-y-4 sm:space-y-6">
            {/* Value Input - Full width on mobile, 1/3 on desktop */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.value}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base sm:text-lg"
              />
            </div>

            {/* From/To Selectors - Side by side on mobile, stacked on very small screens */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.from}</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm sm:text-base"
                >
                  {Object.entries(categories[category as keyof typeof categories].units).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={convertValue}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.calculate}
            </button>
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.to}</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm sm:text-base"
                >
                  {Object.entries(categories[category as keyof typeof categories].units).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Convert Button - Hidden on mobile since we have auto-calculation */}
            <div className="hidden sm:block text-center">
              <button
                onClick={convert}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-base shadow-sm"
              >
                {t.convert}
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 sm:p-6 rounded-lg border border-green-200 shadow-sm">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <div className="bg-green-100 rounded-full p-1.5 sm:p-2">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 text-center">{t.result}</h3>
            <div className="text-lg sm:text-2xl font-bold text-center text-gray-800 bg-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-200 shadow-inner break-words">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
