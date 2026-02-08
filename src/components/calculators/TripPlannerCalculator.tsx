'use client';

import { useState } from 'react';

interface TripPlannerCalculatorProps {
  lang?: string;
}

export default function TripPlannerCalculator({ lang = 'en' }: TripPlannerCalculatorProps) {
  const [inputs, setInputs] = useState({
    numberOfPeople: 2,
    tripDuration: 7,
    dailyAccommodation: 5000,
    dailyMealsPerPerson: 1500,
    dailyActivities: 2000,
    dailyTransport: 1000,
    dailyMisc: 500,
    currency: 'EUR',
    currencySymbol: '€'
  });

  const [results, setResults] = useState({
    totalAccommodation: 0,
    totalMeals: 0,
    totalActivities: 0,
    totalTransport: 0,
    totalMisc: 0,
    grandTotal: 0,
    perPersonCost: 0,
    dailyBudget: 0
  });

  const [calculated, setCalculated] = useState(false);

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
    { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  ];

  const translations = {
    en: {
      title: 'Trip Budget Planner',
      subtitle: 'Plan your trip budget comprehensively across accommodation, meals, activities, transport, and miscellaneous expenses',
      numberOfPeople: 'Number of People',
      tripDuration: 'Trip Duration (Days)',
      dailyBudgetItems: 'Daily Budget Items',
      dailyAccommodation: 'Daily Accommodation Cost',
      dailyMeals: 'Daily Meals Cost (per person)',
      dailyActivities: 'Daily Activities & Attractions',
      dailyTransport: 'Daily Transport & Local Travel',
      dailyMisc: 'Daily Miscellaneous',
      currency: 'Currency',
      calculate: 'Calculate Trip Budget',
      results: 'Trip Budget Summary',
      totalAccommodation: 'Total Accommodation',
      totalMeals: 'Total Meals',
      totalActivities: 'Total Activities',
      totalTransport: 'Total Transport',
      totalMisc: 'Total Miscellaneous',
      grandTotal: 'Grand Total Budget',
      perPersonCost: 'Cost Per Person',
      dailyBudget: 'Daily Budget',
      breakdown: 'Budget Breakdown',
      costBreakdown: 'Cost Breakdown Percentage',
      tips: 'Budget Planning Tips',
      tip1: 'Accommodation usually takes 40-50% of budget',
      tip2: 'Food and activities should be 20-30%',
      tip3: 'Transport costs vary; budget 10-20% depending on distance',
      tip4: 'Keep 10-15% for miscellaneous and emergencies',
      tip5: 'Research local prices and transport options in advance',
      reset: "Reset"
    },
    es: {
      title: 'Planificador de Presupuesto de Viaje',
      subtitle: 'Planifica tu presupuesto de viaje de manera integral considerando alojamiento, comidas, actividades, transporte y gastos varios',
      numberOfPeople: 'Número de Personas',
      tripDuration: 'Duración del Viaje (Días)',
      dailyBudgetItems: 'Elementos del Presupuesto Diario',
      dailyAccommodation: 'Costo de Alojamiento Diario',
      dailyMeals: 'Costo de Comidas Diario (por persona)',
      dailyActivities: 'Actividades y Atracciones Diarias',
      dailyTransport: 'Transporte y Viajes Locales Diarios',
      dailyMisc: 'Gastos Varios Diarios',
      currency: 'Moneda',
      calculate: 'Calcular Presupuesto de Viaje',
      results: 'Resumen de Presupuesto de Viaje',
      totalAccommodation: 'Alojamiento Total',
      totalMeals: 'Comidas Totales',
      totalActivities: 'Actividades Totales',
      totalTransport: 'Transporte Total',
      totalMisc: 'Gastos Varios Totales',
      grandTotal: 'Presupuesto Total',
      perPersonCost: 'Costo por Persona',
      dailyBudget: 'Presupuesto Diario',
      breakdown: 'Desglose del Presupuesto',
      costBreakdown: 'Porcentaje de Desglose de Costos',
      tips: 'Consejos de Planificación de Presupuesto',
      tip1: 'El alojamiento generalmente representa el 40-50% del presupuesto',
      tip2: 'Comida y actividades deben ser el 20-30%',
      tip3: 'Los costos de transporte varían; presupueste 10-20% según la distancia',
      tip4: 'Mantenga el 10-15% para gastos varios y emergencias',
      tip5: 'Investigue precios locales y opciones de transporte con antelación',
      reset: "Restablecer"
    },
    pt: {
      title: 'Planejador de Orçamento de Viagem',
      subtitle: 'Planeje seu orçamento de viagem de forma abrangente considerando hospedagem, refeições, atividades, transporte e despesas diversas',
      numberOfPeople: 'Número de Pessoas',
      tripDuration: 'Duração da Viagem (Dias)',
      dailyBudgetItems: 'Items Diários de Orçamento',
      dailyAccommodation: 'Custo de Hospedagem Diária',
      dailyMeals: 'Custo de Refeições Diário (por pessoa)',
      dailyActivities: 'Atividades e Atrações Diárias',
      dailyTransport: 'Transporte e Viagens Locais Diários',
      dailyMisc: 'Despesas Diversas Diárias',
      currency: 'Moeda',
      calculate: 'Calcular Orçamento de Viagem',
      results: 'Resumo do Orçamento de Viagem',
      totalAccommodation: 'Hospedagem Total',
      totalMeals: 'Refeições Totais',
      totalActivities: 'Atividades Totais',
      totalTransport: 'Transporte Total',
      totalMisc: 'Despesas Diversas Totais',
      grandTotal: 'Orçamento Total',
      perPersonCost: 'Custo por Pessoa',
      dailyBudget: 'Orçamento Diário',
      breakdown: 'Divisão do Orçamento',
      costBreakdown: 'Porcentagem de Divisão de Custos',
      tips: 'Dicas de Planejamento de Orçamento',
      tip1: 'A hospedagem geralmente representa 40-50% do orçamento',
      tip2: 'Comida e atividades devem ser 20-30%',
      tip3: 'Custos de transporte variam; orçamento de 10-20% dependendo da distância',
      tip4: 'Mantenha 10-15% para despesas diversas e emergências',
      tip5: 'Pesquise preços locais e opções de transporte com antecedência',
      reset: "Redefinir"
    },
    fr: {
      title: 'Planificateur de Budget de Voyage',
      subtitle: 'Planifiez votre budget de voyage de manière complète en tenant compte du logement, des repas, des activités, du transport et des dépenses diverses',
      numberOfPeople: 'Nombre de Personnes',
      tripDuration: 'Durée du Voyage (Jours)',
      dailyBudgetItems: 'Articles du Budget Quotidien',
      dailyAccommodation: 'Coût du Logement Quotidien',
      dailyMeals: 'Coût des Repas par Jour (par personne)',
      dailyActivities: 'Activités et Attractions Quotidiennes',
      dailyTransport: 'Transport et Voyages Locaux Quotidiens',
      dailyMisc: 'Dépenses Diverses Quotidiennes',
      currency: 'Devise',
      calculate: 'Calculer le Budget de Voyage',
      results: 'Résumé du Budget de Voyage',
      totalAccommodation: 'Logement Total',
      totalMeals: 'Repas Totaux',
      totalActivities: 'Activités Totales',
      totalTransport: 'Transport Total',
      totalMisc: 'Dépenses Diverses Totales',
      grandTotal: 'Budget Total',
      perPersonCost: 'Coût par Personne',
      dailyBudget: 'Budget Quotidien',
      breakdown: 'Ventilation du Budget',
      costBreakdown: 'Pourcentage de Ventilation des Coûts',
      tips: 'Conseils de Planification Budgétaire',
      tip1: 'Le logement représente généralement 40-50% du budget',
      tip2: 'La nourriture et les activités doivent être 20-30%',
      tip3: 'Les coûts de transport varient; budgétez 10-20% selon la distance',
      tip4: 'Behalten Sie 10-15% für sonstige Ausgaben und Notfälle',
      tip5: 'Recherchieren Sie im Voraus lokale Preise und Transportoptionen',
      reset: "Réinitialiser"
    },
    nl: {
      title: 'Reisbudgetplanner',
      subtitle: 'Plan uw reisbudget uitgebreid met accommodatie, maaltijden, activiteiten, vervoer en overige uitgaven',
      numberOfPeople: 'Aantal Personen',
      tripDuration: 'Reisduur (Dagen)',
      dailyBudgetItems: 'Dagelijkse Budgetitems',
      dailyAccommodation: 'Dagelijkse Logieskosten',
      dailyMeals: 'Dagelijkse Maaltijdkosten (per persoon)',
      dailyActivities: 'Dagelijkse Activiteiten en Attracties',
      dailyTransport: 'Dagelijks Vervoer en Lokale Reizen',
      dailyMisc: 'Dagelijkse Overige Uitgaven',
      currency: 'Valuta',
      calculate: 'Reisbudget Berekenen',
      results: 'Reisbudget Samenvatting',
      totalAccommodation: 'Totale Logies',
      totalMeals: 'Totale Maaltijden',
      totalActivities: 'Totale Activiteiten',
      totalTransport: 'Totaal Vervoer',
      totalMisc: 'Totale Overige Uitgaven',
      grandTotal: 'Totaal Budget',
      perPersonCost: 'Kosten per Persoon',
      dailyBudget: 'Dagelijks Budget',
      breakdown: 'Budgetindeling',
      costBreakdown: 'Kostendeling Percentage',
      tips: 'Budgetplanningsstips',
      tip1: 'Logies vertegenwoordigt meestal 40-50% van het budget',
      tip2: 'Voedsel en activiteiten moeten 20-30% bedragen',
      tip3: 'Vervoerskosten variëren; budget 10-20% afhankelijk van afstand',
      tip4: 'Houd 10-15% achter voor overige uitgaven en noodgevallen',
      tip5: 'Onderzoek van tevoren lokale prijzen en vervoersopties',
      reset: "Resetten"
    },
    de: {
      title: 'Reisebudget-Planer',
      subtitle: 'Planen Sie Ihr Reisebudget umfassend mit Unterkunft, Mahlzeiten, Aktivitäten, Transport und sonstige Ausgaben',
      numberOfPeople: 'Anzahl der Personen',
      tripDuration: 'Reisedauer (Tage)',
      dailyBudgetItems: 'Tägliche Budgetposten',
      dailyAccommodation: 'Tägliche Unterkunftskosten',
      dailyMeals: 'Tägliche Mahlzeitenkosten (pro Person)',
      dailyActivities: 'Tägliche Aktivitäten und Attraktionen',
      dailyTransport: 'Täglicher Transport und lokales Reisen',
      dailyMisc: 'tägliche sonstige Ausgaben',
      currency: 'Währung',
      calculate: 'Reisebudget Berechnen',
      results: 'Reisebudget Übersicht',
      totalAccommodation: 'Gesamtunterkunft',
      totalMeals: 'Gesamtmahlzeiten',
      totalActivities: 'Gesamtaktivitäten',
      totalTransport: 'Gesamttransport',
      totalMisc: 'Gesamtsonstige Ausgaben',
      grandTotal: 'Gesamtbudget',
      perPersonCost: 'Kosten pro Person',
      dailyBudget: 'Tägliches Budget',
      breakdown: 'Budgetaufschlüsselung',
      costBreakdown: 'Kostenaufschlüsselung Prozentsatz',
      tips: 'Budgetplanungstipps',
      tip1: 'Unterkunft macht in der Regel 40-50% des Budgets aus',
      tip2: 'Lebensmittel und Aktivitäten sollten 20-30% betragen',
      tip3: 'Transportkosten variieren; Budget 10-20% je nach Entfernung',
      tip4: 'Behalten Sie 10-15% für sonstige Ausgaben und Notfälle',
      tip5: 'Recherchieren Sie im Voraus lokale Preise und Transportoptionen',
      reset: "Zurücksetzen"
    }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  const calculateBudget = () => {
    const accommodation = inputs.dailyAccommodation * inputs.tripDuration;
    const meals = inputs.dailyMealsPerPerson * inputs.numberOfPeople * inputs.tripDuration;
    const activities = inputs.dailyActivities * inputs.tripDuration;
    const transport = inputs.dailyTransport * inputs.tripDuration;
    const misc = inputs.dailyMisc * inputs.tripDuration;
    const total = accommodation + meals + activities + transport + misc;
    const perPerson = total / inputs.numberOfPeople;
    const dailyTotal = total / inputs.tripDuration;

    setResults({
      totalAccommodation: accommodation,
      totalMeals: meals,
      totalActivities: activities,
      totalTransport: transport,
      totalMisc: misc,
      grandTotal: total,
      perPersonCost: perPerson,
      dailyBudget: dailyTotal
    });
    setCalculated(true);
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

  const accommodationPercent = (results.totalAccommodation / results.grandTotal * 100).toFixed(1);
  const mealsPercent = (results.totalMeals / results.grandTotal * 100).toFixed(1);
  const activitiesPercent = (results.totalActivities / results.grandTotal * 100).toFixed(1);
  const transportPercent = (results.totalTransport / results.grandTotal * 100).toFixed(1);
  const miscPercent = (results.totalMisc / results.grandTotal * 100).toFixed(1);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Input Grid */}
        <div className="grid lg:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
              {t.numberOfPeople}
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={inputs.numberOfPeople}
              onChange={(e) => setInputs({...inputs, numberOfPeople: Number(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
              {t.tripDuration}
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={inputs.tripDuration}
              onChange={(e) => setInputs({...inputs, tripDuration: Number(e.target.value)})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
              {t.currency}
            </label>
            <select
              value={inputs.currency}
              onChange={(e) => {
                const selected = currencies.find(c => c.code === e.target.value);
                if (selected) {
                  setInputs({...inputs, currency: selected.code, currencySymbol: selected.symbol});
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Daily Costs */}
        <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t.dailyBudgetItems}</h3>
          <div className="grid lg:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
                {t.dailyAccommodation}
              </label>
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400">{inputs.currencySymbol}</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={inputs.dailyAccommodation}
                  onChange={(e) => setInputs({...inputs, dailyAccommodation: Number(e.target.value)})}
                  className="flex-1 ml-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
                {t.dailyMeals}
              </label>
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400">{inputs.currencySymbol}</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={inputs.dailyMealsPerPerson}
                  onChange={(e) => setInputs({...inputs, dailyMealsPerPerson: Number(e.target.value)})}
                  className="flex-1 ml-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
                {t.dailyActivities}
              </label>
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400">{inputs.currencySymbol}</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={inputs.dailyActivities}
                  onChange={(e) => setInputs({...inputs, dailyActivities: Number(e.target.value)})}
                  className="flex-1 ml-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
                {t.dailyTransport}
              </label>
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400">{inputs.currencySymbol}</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={inputs.dailyTransport}
                  onChange={(e) => setInputs({...inputs, dailyTransport: Number(e.target.value)})}
                  className="flex-1 ml-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
                {t.dailyMisc}
              </label>
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400">{inputs.currencySymbol}</span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={inputs.dailyMisc}
                  onChange={(e) => setInputs({...inputs, dailyMisc: Number(e.target.value)})}
                  className="flex-1 ml-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={calculateBudget}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {t.calculate}
        </button>
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>
          </div>



        {/* Results */}
        {calculated && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 font-medium">{t.grandTotal}</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {inputs.currencySymbol} {results.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 font-medium">{t.perPersonCost}</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {inputs.currencySymbol} {results.perPersonCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-1 font-medium">{t.dailyBudget}</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {inputs.currencySymbol} {results.dailyBudget.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t.breakdown}</h3>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{t.totalAccommodation}</span>
                    <span className="text-gray-900 dark:text-white font-bold">{inputs.currencySymbol} {results.totalAccommodation.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{t.totalMeals}</span>
                    <span className="text-gray-900 dark:text-white font-bold">{inputs.currencySymbol} {results.totalMeals.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{t.totalActivities}</span>
                    <span className="text-gray-900 dark:text-white font-bold">{inputs.currencySymbol} {results.totalActivities.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{t.totalTransport}</span>
                    <span className="text-gray-900 dark:text-white font-bold">{inputs.currencySymbol} {results.totalTransport.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t-2 border-gray-300 dark:border-gray-600">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{t.totalMisc}</span>
                    <span className="text-gray-900 dark:text-white font-bold">{inputs.currencySymbol} {results.totalMisc.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t.costBreakdown}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${accommodationPercent}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 w-12">{accommodationPercent}%</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.totalAccommodation}</p>

                    <div className="flex items-center mt-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${mealsPercent}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 w-12">{mealsPercent}%</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.totalMeals}</p>

                    <div className="flex items-center mt-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${activitiesPercent}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 w-12">{activitiesPercent}%</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.totalActivities}</p>

                    <div className="flex items-center mt-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${transportPercent}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 w-12">{transportPercent}%</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.totalTransport}</p>

                    <div className="flex items-center mt-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${miscPercent}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300 w-12">{miscPercent}%</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t.totalMisc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{t.tips}</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• {t.tip1}</li>
                <li>• {t.tip2}</li>
                <li>• {t.tip3}</li>
                <li>• {t.tip4}</li>
                <li>• {t.tip5}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
