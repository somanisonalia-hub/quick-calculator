/**
 * Server-Side Rendered Calculator Form
 * Renders the complete calculator form structure in HTML for SEO
 * This ensures Google and other crawlers see all input fields without JavaScript
 */

interface CalculatorInput {
  name: string;
  label: string;
  type: string;
  default?: any;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

interface CalculatorFormSSRProps {
  inputs: CalculatorInput[];
  formula?: string;
  output?: {
    label: string;
    default?: string;
  };
  additionalOutputs?: Array<{
    label: string;
    field: string;
  }>;
  lang?: string;
  calculatorName?: string;
}

export default function CalculatorFormSSR({ 
  inputs = [], 
  formula = '', 
  output, 
  additionalOutputs = [],
  lang = 'en',
  calculatorName = 'Calculator'
}: CalculatorFormSSRProps) {
  
  const translations = {
    calculate: { en: 'Calculate', es: 'Calcular', pt: 'Calcular', fr: 'Calculer', de: 'Berechnen', nl: 'Berekenen' },
    results: { en: 'Results', es: 'Resultados', pt: 'Resultados', fr: 'Résultats', de: 'Ergebnisse', nl: 'Resultaten' },
    formula: { en: 'Formula', es: 'Fórmula', pt: 'Fórmula', fr: 'Formule', de: 'Formel', nl: 'Formule' },
    inputs: { en: 'Calculator Inputs', es: 'Entradas de Calculadora', pt: 'Entradas da Calculadora', fr: 'Entrées de Calculateur', de: 'Rechner-Eingaben', nl: 'Rekenmachine Invoer' }
  };

  const t = (key: keyof typeof translations) => {
    return translations[key][lang as keyof typeof translations.calculate] || translations[key].en;
  };

  return (
    <div className="calculator-form-ssr" itemScope itemType="https://schema.org/CalculatorAction">
      {/* Hidden semantic data for crawlers */}
      <meta itemProp="name" content={calculatorName} />
      <meta itemProp="description" content={`${calculatorName} with ${inputs.length} input fields`} />
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4" role="form" aria-label={t('inputs')}>
          <h2 className="sr-only">{t('inputs')}</h2>
          
          {inputs.map((input, index) => (
            <div key={`${input.name}-${index}`} className="form-group" itemProp="potentialAction" itemScope itemType="https://schema.org/ControlAction">
              <meta itemProp="name" content={input.label} />
              
              <label 
                htmlFor={`calc-input-${input.name}`}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {input.label}
                {input.unit && <span className="text-gray-500 ml-1">({input.unit})</span>}
              </label>

              {input.type === 'select' ? (
                <select
                  id={`calc-input-${input.name}`}
                  name={input.name}
                  defaultValue={input.default || (input.options && input.options[0])}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  itemProp="object"
                  aria-label={input.label}
                >
                  {input.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`calc-input-${input.name}`}
                  type={input.type}
                  name={input.name}
                  defaultValue={input.default}
                  min={input.min}
                  max={input.max}
                  step={input.step || 1}
                  placeholder={input.label}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  itemProp="object"
                  aria-label={input.label}
                  aria-describedby={input.min !== undefined ? `${input.name}-range` : undefined}
                />
              )}

              {/* Range information for screen readers and crawlers */}
              {input.min !== undefined && input.max !== undefined && (
                <p id={`${input.name}-range`} className="sr-only">
                  Valid range: {input.min} to {input.max}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <h2 className="sr-only">{t('results')}</h2>
          
          {/* Formula display for SEO */}
          {formula && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">{t('formula')}:</h3>
              <div className="text-sm text-blue-800 font-mono bg-white p-2 rounded border border-blue-100">
                {formula}
              </div>
            </div>
          )}

          {/* Primary Output */}
          {output && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {output.label}
              </label>
              <div 
                className="text-3xl font-bold text-green-700"
                itemProp="result"
                aria-live="polite"
                aria-atomic="true"
              >
                {output.default || '—'}
              </div>
            </div>
          )}

          {/* Additional Outputs */}
          {additionalOutputs.length > 0 && (
            <div className="space-y-3">
              {additionalOutputs.map((addOutput) => (
                <div 
                  key={addOutput.field}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {addOutput.label}
                  </label>
                  <div 
                    className="text-lg font-semibold text-gray-900"
                    itemProp="additionalProperty"
                    aria-live="polite"
                  >
                    —
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Calculator Instructions - Hidden but crawlable */}
          <div className="sr-only">
            <p>
              This {calculatorName} has {inputs.length} input fields. 
              Enter your values to calculate the result using the formula: {formula}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
