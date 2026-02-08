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
  options?: (string | { value: string; label: string })[];
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
    <div className="calculator-form-ssr">
      {/* Hidden semantic data for crawlers */}
      <meta itemProp="name" content={calculatorName} />
      <meta itemProp="description" content={`${calculatorName} with ${inputs.length} input fields`} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        {/* Input Section */}
        <div className="space-y-2 sm:space-y-3" role="form" aria-label={t('inputs')}>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t('inputs')}</h3>
          
          {inputs.map((input, index) => (
            <div key={`${input.name}-${index}`} className="space-y-1 sm:space-y-2" itemProp="potentialAction" itemScope itemType="https://schema.org/ControlAction">
              <meta itemProp="name" content={input.label} />
              
              <label 
                htmlFor={`calc-input-${input.name}`}
                className="block text-xs sm:text-sm font-medium text-gray-700"
              >
                {input.label}
                {input.unit && <span className="text-gray-500 ml-1">({input.unit})</span>}
              </label>

              {input.type === 'select' ? (
                <select
                  id={`calc-input-${input.name}`}
                  name={input.name}
                  defaultValue={
                    input.default || 
                    (input.options && input.options[0] && 
                      (typeof input.options[0] === 'string' 
                        ? input.options[0] 
                        : input.options[0].value))
                  }
                  className="w-full px-2.5 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  itemProp="object"
                  aria-label={input.label}
                >
                  {input.options?.map((option, idx) => {
                    const optionValue = typeof option === 'string' ? option : option.value;
                    const optionLabel = typeof option === 'string' ? option : option.label;
                    return (
                      <option key={`${optionValue}-${idx}`} value={optionValue}>
                        {optionLabel}
                      </option>
                    );
                  })}
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
                  className="w-full px-2.5 py-2 sm:px-4 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">{t('results')}</h3>
          
          {/* Primary Output */}
          {output && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 sm:p-3 lg:p-4">
              <div className="text-xs text-gray-600 mb-1">{output.label}</div>
              <div 
                className="text-xl sm:text-2xl font-bold text-blue-600"
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
            <>
              {additionalOutputs.map((addOutput) => (
                <div 
                  key={addOutput.field}
                  className="bg-white border border-gray-200 p-2.5 sm:p-3 rounded-md shadow-sm"
                >
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    {addOutput.label}
                  </div>
                  <div 
                    className="text-base sm:text-lg font-bold text-gray-900"
                    itemProp="additionalProperty"
                    aria-live="polite"
                  >
                    —
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Formula display for SEO */}
          {formula && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 sm:p-3 lg:p-4">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{t('formula')}</div>
              <div className="text-xs sm:text-sm font-mono text-gray-800 bg-white p-2 rounded border">
                {formula}
              </div>
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
