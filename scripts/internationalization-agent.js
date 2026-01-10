#!/usr/bin/env node

/**
 * Internationalization Agent for Quick Calculator
 *
 * This script provides comprehensive internationalization support:
 * 1. Fix broken translations: Replace {t.something} calls in translations objects
 * 2. Extract hardcoded strings: Find hardcoded English strings and internationalize them
 * 3. Quality validation: Ensure translations are complete and accurate
 *
 * Usage:
 * node scripts/internationalization-agent.js [mode] [file]
 *
 * Modes:
 * - fix: Fix broken translations (default)
 * - extract: Extract and internationalize hardcoded strings (includes line-by-line review)
 * - validate: Check translation completeness and quality
 * - verify: Test component rendering in different languages
 * - comprehensive: Run complete verification suite on single file
 * - all: Process all calculator files with extract mode
 *
 * Features:
 * - Multi-pattern string detection (JSX, template literals, comments)
 * - Smart translation categorization (UI labels vs content)
 * - Native-quality translations with proper localization
 * - Backup creation and error recovery
 * - Build validation and testing
 */

const fs = require('fs');
const path = require('path');

// Configuration
const COMPONENT_DIR = 'src/components/calculators';
const LANGUAGES = ['en', 'es', 'pt', 'fr'];

// Function to extract existing translations from a file
function extractExistingTranslations(content) {
  const extractedTranslations = {};

  // Extract the translations object
  const translationsMatch = content.match(/const translations = ({[\s\S]*?});/);
  if (translationsMatch) {
    try {
      // Simple extraction - look for language sections
      const translationsContent = translationsMatch[1];

      // Extract each language section
      const langRegex = /(\w+):\s*{([^}]+)}/g;
      let langMatch;
      while ((langMatch = langRegex.exec(translationsContent)) !== null) {
        const lang = langMatch[1];
        const langContent = langMatch[2];

        extractedTranslations[lang] = {};

        // Extract key-value pairs from this language section
        const keyValueRegex = /(\w+):\s*["']([^"']*)["']/g;
        let kvMatch;
        while ((kvMatch = keyValueRegex.exec(langContent)) !== null) {
          const key = kvMatch[1];
          const value = kvMatch[2];
          extractedTranslations[lang][key] = value;
        }
      }
    } catch (e) {
      // If extraction fails, return empty object
      console.log(`⚠️  Could not extract existing translations: ${e.message}`);
    }
  }

  return extractedTranslations;
}

// Function to find existing key for a translation value
function findExistingKeyForValue(value, lang = 'en', existingTranslations = {}) {
  if (existingTranslations[lang]) {
    for (const [key, translationValue] of Object.entries(existingTranslations[lang])) {
      if (translationValue === value) {
        return key;
      }
    }
  }
  return null;
}

// Enhanced translation system with learning from past mistakes
// Enhanced translation system with learning from past mistakes
const BASIC_TRANSLATIONS = {
  en: {
    // Common UI terms
    title: "Title",
    description: "Description",
    calculate: "Calculate",
    reset: "Reset",
    result: "Result",
    value: "Value",
    from: "From",
    to: "To",
    convert: "Convert",
    show: "Show",
    hide: "Hide",

    // Learned from LeanBodyMassCalculator fixes
    note: "Note:",
    measurementtips: "📏 Measurement Tips",
    healthyranges: "🎯 Healthy Ranges",
    navymethodmeasurements: "Navy Method Measurements",
    disclaimertext1: "These calculations provide estimates based on established formulas.",
    disclaimertext2: "For highest accuracy, consult professional body composition testing methods like DEXA scans or hydrostatic weighing.",
    disclaimertext3: "Individual results may vary based on body composition, measurement accuracy, and specific population characteristics.",
    export: "Export",
    import: "Import",
    save: "Save",
    load: "Load",
    clear: "Clear",
    copy: "Copy",
    paste: "Paste",
    close: "Close",
    open: "Open",
    back: "Back",
    next: "Next",
    previous: "Previous",
    cancel: "Cancel",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
    ok: "OK",

    // Common calculator terms
    amount: "Amount",
    rate: "Rate",
    time: "Time",
    period: "Period",
    total: "Total",
    sum: "Sum",
    average: "Average",
    minimum: "Minimum",
    maximum: "Maximum",
    range: "Range",
    count: "Count",
    number: "Number",
    percentage: "Percentage",
    percent: "Percent",

    // Financial terms
    principal: "Principal",
    interest: "Interest",
    balance: "Balance",
    payment: "Payment",
    loan: "Loan",
    mortgage: "Mortgage",
    credit: "Credit",
    debit: "Debit",
    income: "Income",
    expense: "Expense",
    profit: "Profit",
    loss: "Loss",
    tax: "Tax",
    fee: "Fee",
    charge: "Charge",

    // Units and measurements
    meter: "Meter",
    foot: "Foot",
    inch: "Inch",
    centimeter: "Centimeter",
    kilogram: "Kilogram",
    pound: "Pound",
    liter: "Liter",
    gallon: "Gallon",
    degree: "Degree",
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",

    // Learned from LeanBodyMassCalculator fixes
    note: "Nota:",
    measurementtips: "📏 Consejos de Medición",
    healthyranges: "🎯 Rangos Saludables",
    navymethodmeasurements: "Mediciones del Método Navy",
    disclaimertext1: "Estos cálculos proporcionan estimaciones basadas en fórmulas establecidas.",
    disclaimertext2: "Para mayor precisión, consulta métodos profesionales de composición corporal como escáneres DEXA o pesaje hidrostático.",
    disclaimertext3: "Los resultados individuales pueden variar según la composición corporal, la precisión de las mediciones y las características específicas de la población."
  },
  es: {
    // Spanish translations
    title: "Título",
    description: "Descripción",
    calculate: "Calcular",
    reset: "Reiniciar",
    result: "Resultado",
    value: "Valor",
    from: "De",
    to: "A",
    convert: "Convertir",
    show: "Mostrar",
    hide: "Ocultar",
    export: "Exportar",
    import: "Importar",
    save: "Guardar",
    load: "Cargar",
    clear: "Limpiar",
    copy: "Copiar",
    paste: "Pegar",
    close: "Cerrar",
    open: "Abrir",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    cancel: "Cancelar",
    confirm: "Confirmar",
    yes: "Sí",
    no: "No",
    ok: "Aceptar",

    amount: "Cantidad",
    rate: "Tasa",
    time: "Tiempo",
    period: "Período",
    total: "Total",
    sum: "Suma",
    average: "Promedio",
    minimum: "Mínimo",
    maximum: "Máximo",
    range: "Rango",
    count: "Conteo",
    number: "Número",
    percentage: "Porcentaje",
    percent: "Por ciento",

    principal: "Principal",
    interest: "Intereses",
    balance: "Saldo",
    payment: "Pago",
    loan: "Préstamo",
    mortgage: "Hipoteca",
    credit: "Crédito",
    debit: "Débito",
    income: "Ingreso",
    expense: "Gasto",
    profit: "Ganancia",
    loss: "Pérdida",
    tax: "Impuesto",
    fee: "Tarifa",
    charge: "Cargo",

    meter: "Metro",
    foot: "Pie",
    inch: "Pulgada",
    centimeter: "Centímetro",
    kilogram: "Kilogramo",
    pound: "Libra",
    liter: "Litro",
    gallon: "Galón",
    degree: "Grado",
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",

    // Learned from LeanBodyMassCalculator fixes
    note: "Nota:",
    measurementtips: "📏 Dicas de Medição",
    healthyranges: "🎯 Faixas Saudáveis",
    navymethodmeasurements: "Medidas do Método Navy",
    disclaimertext1: "Estes cálculos fornecem estimativas baseadas em fórmulas estabelecidas.",
    disclaimertext2: "Para maior precisão, consulte métodos profissionais de composição corporal como exames DEXA ou pesagem hidrostática.",
    disclaimertext3: "Os resultados individuais podem variar com base na composição corporal, precisão das medições e características específicas da população."
  },
  pt: {
    // Portuguese translations
    title: "Título",
    description: "Descrição",
    calculate: "Calcular",
    reset: "Reiniciar",
    result: "Resultado",
    value: "Valor",
    from: "De",
    to: "Para",
    convert: "Converter",
    show: "Mostrar",
    hide: "Ocultar",
    export: "Exportar",
    import: "Importar",
    save: "Salvar",
    load: "Carregar",
    clear: "Limpar",
    copy: "Copiar",
    paste: "Colar",
    close: "Fechar",
    open: "Abrir",
    back: "Voltar",
    next: "Próximo",
    previous: "Anterior",
    cancel: "Cancelar",
    confirm: "Confirmar",
    yes: "Sim",
    no: "Não",
    ok: "OK",

    amount: "Quantidade",
    rate: "Taxa",
    time: "Tempo",
    period: "Período",
    total: "Total",
    sum: "Soma",
    average: "Média",
    minimum: "Mínimo",
    maximum: "Máximo",
    range: "Faixa",
    count: "Contagem",
    number: "Número",
    percentage: "Porcentagem",
    percent: "Por cento",

    principal: "Principal",
    interest: "Juros",
    balance: "Saldo",
    payment: "Pagamento",
    loan: "Empréstimo",
    mortgage: "Hipoteca",
    credit: "Crédito",
    debit: "Débito",
    income: "Renda",
    expense: "Despesa",
    profit: "Lucro",
    loss: "Prejuízo",
    tax: "Imposto",
    fee: "Taxa",
    charge: "Cobrança",

    meter: "Metro",
    foot: "Pé",
    inch: "Polegada",
    centimeter: "Centímetro",
    kilogram: "Quilograma",
    pound: "Libra",
    liter: "Litro",
    gallon: "Galão",
    degree: "Grau",
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",

    // Learned from LeanBodyMassCalculator fixes
    note: "Note:",
    measurementtips: "📏 Conseils de Mesure",
    healthyranges: "🎯 Fourchettes Saines",
    navymethodmeasurements: "Mesures de la Méthode Navy",
    disclaimertext1: "Ces calculs fournissent des estimations basées sur des formules établies.",
    disclaimertext2: "Pour une précision maximale, consultez des méthodes professionnelles d'analyse de la composition corporelle comme les scanners DEXA ou la pesée hydrostatique.",
    disclaimertext3: "Les résultats individuels peuvent varier en fonction de la composition corporelle, de la précision des mesures et des caractéristiques spécifiques de la population."
  },
  fr: {
    // French translations
    title: "Titre",
    description: "Description",
    calculate: "Calculer",
    reset: "Réinitialiser",
    result: "Résultat",
    value: "Valeur",
    from: "De",
    to: "À",
    convert: "Convertir",
    show: "Afficher",
    hide: "Masquer",
    export: "Exporter",
    import: "Importer",
    save: "Sauvegarder",
    load: "Charger",
    clear: "Effacer",
    copy: "Copier",
    paste: "Coller",
    close: "Fermer",
    open: "Ouvrir",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    cancel: "Annuler",
    confirm: "Confirmer",
    yes: "Oui",
    no: "Non",
    ok: "OK",

    amount: "Montant",
    rate: "Taux",
    time: "Temps",
    period: "Période",
    total: "Total",
    sum: "Somme",
    average: "Moyenne",
    minimum: "Minimum",
    maximum: "Maximum",
    range: "Plage",
    count: "Nombre",
    number: "Numéro",
    percentage: "Pourcentage",
    percent: "Pour cent",

    principal: "Principal",
    interest: "Intérêts",
    balance: "Solde",
    payment: "Paiement",
    loan: "Prêt",
    mortgage: "Hypothèque",
    credit: "Crédit",
    debit: "Débit",
    income: "Revenus",
    expense: "Dépense",
    profit: "Profit",
    loss: "Perte",
    tax: "Taxe",
    fee: "Frais",
    charge: "Charge",

    meter: "Mètre",
    foot: "Pied",
    inch: "Pouce",
    centimeter: "Centimètre",
    kilogram: "Kilogramme",
    pound: "Livre",
    liter: "Litre",
    gallon: "Gallon",
    degree: "Degré",
    celsius: "Celsius",
    fahrenheit: "Fahrenheit"
  }
};

// Check if a file has broken translations (contains {t.something} in translations object)
function hasBrokenTranslations(content) {
  // Look for patterns like: title: {t.caloriecalculator},
  const brokenPattern = /^\s*[a-zA-Z_][a-zA-Z0-9_]*:\s*\{t\.[a-zA-Z_][a-zA-Z0-9_]*\},?$/gm;
  return brokenPattern.test(content);
}

// Fix broken translations by replacing {t.something} with actual translated strings
function fixBrokenTranslations(content, fileName) {
  console.log(`🔧 Fixing broken translations in ${fileName}`);

  let fixedContent = content;
  let fixesCount = 0;

  // Find all broken translation patterns
  const brokenPattern = /^\s*([a-zA-Z_][a-zA-Z0-9_]*):\s*\{t\.([a-zA-Z_][a-zA-Z0-9_]*)\},?$/gm;

  let match;
  while ((match = brokenPattern.exec(content)) !== null) {
    const key = match[1];
    const tKey = match[2];

    // Try to find a matching translation
    let replacement = `"${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}"`; // Default: convert camelCase to Title Case

    // Look for basic translations
    for (const lang of ['en', 'es', 'pt', 'fr']) {
      if (BASIC_TRANSLATIONS[lang] && BASIC_TRANSLATIONS[lang][key]) {
        replacement = `"${BASIC_TRANSLATIONS[lang][key]}"`;
        break;
      }
    }

    // Replace the broken pattern
    const brokenLine = match[0];
    const fixedLine = `      ${key}: ${replacement},`;

    fixedContent = fixedContent.replace(brokenLine, fixedLine);
    fixesCount++;

    console.log(`   ✅ Fixed: ${key} -> ${replacement}`);
  }

  return { fixedContent, fixesCount };
}

// Enhanced duplicate key prevention - learned from LeanBodyMassCalculator experience
function checkForDuplicateKeys(content) {
  const keyCounts = {};
  const lines = content.split('\n');
  let currentLang = null;
  const duplicates = [];

  for (const line of lines) {
    const langMatch = line.match(/^\s*([a-z]{2}):\s*\{/);
    if (langMatch) {
      currentLang = langMatch[1];
      continue;
    }

    if (currentLang && line.includes(':')) {
      const keyMatch = line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
      if (keyMatch) {
        const key = keyMatch[1];
        const fullKey = `${currentLang}.${key}`;
        keyCounts[fullKey] = (keyCounts[fullKey] || 0) + 1;
      }
    }
  }

  for (const [key, count] of Object.entries(keyCounts)) {
    if (count > 1) {
      duplicates.push(key);
    }
  }

  return duplicates;
}

// Extract hardcoded strings from JSX and create translations
function extractHardcodedStrings(content, fileName) {
  console.log(`🔍 Extracting hardcoded strings from ${fileName}`);

  // Learning from LeanBodyMassCalculator: Check for duplicate keys first
  const duplicates = checkForDuplicateKeys(content);
  if (duplicates.length > 0) {
    console.log(`⚠️  Warning: Found ${duplicates.length} duplicate translation keys before processing:`);
    duplicates.slice(0, 5).forEach(key => console.log(`    - ${key}`));
    console.log(`   💡 These may cause issues and should be reviewed manually.`);
  }

  // Extract existing translations to avoid duplicates
  const existingTranslations = extractExistingTranslations(content);

  const strings = [];
  let processedContent = content;

  // Find hardcoded strings in template literals (like "second", "minute")
  const templateLiteralRegex = /`([^`]+)`/g;
  let match;
  while ((match = templateLiteralRegex.exec(content)) !== null) {
    const templateContent = match[1];
    // Extract individual strings from template literals (excluding ${} expressions)
    const stringParts = templateContent.split(/(\$\{[^}]+\})/);
    stringParts.forEach(part => {
      if (!part.startsWith('${') && part.trim().length > 0) {
        const cleanStr = part.trim();
        // Only simple words like "second", "minute", "hour" etc.
        if (isSimpleWord(cleanStr) && isLikelyEnglish(cleanStr) && !isTranslationCall(cleanStr)) {
          strings.push(cleanStr);
        }
      }
    });
  }

  // Find hardcoded strings in JSX that are user-facing text
  // Look for bullet-pointed text that appears in the HTML output
  const bulletTextRegex = />•\s*([^<>]+)</gi;
  while ((match = bulletTextRegex.exec(content)) !== null) {
    const textContent = match[1].trim();
    // Skip if it contains JSX expressions or is already translated
    if (!containsJsxExpressions(textContent) &&
        textContent.length > 10 && // Reasonable minimum length
        isLikelyEnglish(textContent) &&
        !isTranslationCall(textContent)) {
      strings.push(textContent);
    }
  }

  // Enhanced JSX detection - learned from LeanBodyMassCalculator experience
  // Detect emoji-prefixed headings (📏 Measurement Tips, 🎯 Healthy Ranges)
  const emojiHeadingRegex = />\s*([📏🎯⭐🔥⚡📊📈📉])\s*([^<>]+)</gi;
  while ((match = emojiHeadingRegex.exec(content)) !== null) {
    const textContent = match[2].trim();
    if (textContent.length > 3 &&
        isLikelyEnglish(textContent) &&
        !isTranslationCall(textContent)) {
      strings.push(`${match[1]} ${textContent}`);
    }
  }

  // Detect strong/bold text patterns (learned from disclaimer sections)
  const strongTextRegex = /><strong>\s*([^<>]+)\s*<\/strong>/gi;
  while ((match = strongTextRegex.exec(content)) !== null) {
    const textContent = match[1].trim();
    if (textContent.length > 2 &&
        isLikelyEnglish(textContent) &&
        !isTranslationCall(textContent)) {
      strings.push(textContent);
    }
  }

  // Detect section headings and titles (learned pattern)
  const sectionHeadingRegex = />\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\s*</g;
  while ((match = sectionHeadingRegex.exec(content)) !== null) {
    const textContent = match[1].trim();
    if (textContent.length > 5 &&
        textContent.length < 30 &&
        isLikelyEnglish(textContent) &&
        !isTranslationCall(textContent) &&
        !textContent.includes('Calculator')) { // Skip component names
      strings.push(textContent);
    }
  }

  // CRITICAL IMPROVEMENT: Detect simple text labels in common HTML elements
  // This catches simple labels like "Original", "New" in div/span/label tags
  const simpleLabelRegex = /<(div|span|label|p|h[1-6]|th|td)\s+[^>]*>\s*([A-Z][a-z]{2,})\s*<\/\1>/gi;
  while ((match = simpleLabelRegex.exec(content)) !== null) {
    const textContent = match[2].trim();
    // Only catch simple words (3-15 chars) that are likely UI labels
    if (textContent.length >= 3 &&
        textContent.length <= 15 &&
        isLikelyEnglish(textContent) &&
        !isTranslationCall(textContent) &&
        // Skip common technical terms and component names
        !textContent.match(/^(Component|Props|State|Error|Success|Warning|Info)$/i) &&
        !textContent.includes('Calculator')) {
      strings.push(textContent);
    }
  }

  // COMPREHENSIVE LINE-BY-LINE REVIEW: Check every line for hardcoded UI text
  // This systematic approach catches strings missed by pattern matching
  const lines = content.split('\n');
  let inTranslationsObject = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip the entire translations object section
    if (line.includes('const translations = {')) {
      inTranslationsObject = true;
      continue;
    }
    if (inTranslationsObject && line.includes('};')) {
      inTranslationsObject = false;
      continue;
    }
    if (inTranslationsObject) {
      continue;
    }

    // Skip lines that are clearly not user-facing content
    if (line.includes('import ') || line.includes('export ') || line.includes('const ') ||
        line.includes('function ') || line.includes('interface ') || line.includes('type ') ||
        line.includes('return ') || line.includes('useState') || line.includes('useEffect') ||
        line.includes('setResults') || line.includes('setValues') || line.includes('Math.') ||
        line.includes('parseFloat') || line.includes('toFixed') || line.includes('toLocaleString') ||
        line.includes('addEventListener') || line.includes('removeEventListener') ||
        line.includes('className=') || line.includes('onClick=') || line.includes('onChange=') ||
        line.includes('placeholder=') || line.includes('min=') || line.includes('max=') ||
        line.includes('step=') || line.includes('type=') || line.includes('id=') ||
        line.includes('name=') || line.includes('value=') || line.includes('key=') ||
        line.includes('for=') || line.includes('aria-') || line.includes('data-') ||
        line.startsWith('//') || line.startsWith('/*') || line.startsWith('*') ||
        line.includes('translations[') || line.includes('const t =') ||
        line.includes('t.') || line.includes('{t.') ||
        line.includes('React.') || line.includes('useState(') || line.includes('useEffect(')) {
      continue;
    }

    // Look for quoted strings that appear to be user-facing text
    const quoteMatches = line.match(/"([^"]*)"|'([^']*)'/g);
    if (quoteMatches) {
      for (const match of quoteMatches) {
        const text = match.slice(1, -1); // Remove quotes

        // Skip very short strings, numbers, URLs, CSS classes, technical terms, etc.
        if (text.length < 3 || /^\d+$/.test(text) || text.includes('http') ||
            text.includes('px') || text.includes('rem') || text.includes('em') ||
            text.includes('%') || text.includes('#') || text.includes('rgb') ||
            text.includes('class=') || text.includes('style=') ||
            text.startsWith('$') && text.length < 10 || // Skip currency strings like "$100"
            text.includes('bg-') || text.includes('text-') || text.includes('border-') ||
            text.includes('hover:') || text.includes('focus:') ||
            text.includes('w-') || text.includes('h-') || text.includes('p-') ||
            text.includes('m-') || text.includes('rounded-') ||
            text === 'use client' || text === 'currency' || // Technical terms
            text === 'download' || text === 'hidden' || // HTML/CSS attributes
            text === 'yearly' || text === 'monthly' || // Code values, not user text
            text.includes('\n') || // Skip multiline strings like CSV headers
            text.includes('React') || text.includes('import') || text.includes('export') ||
            text.includes('function') || text.includes('const') || text.includes('let') ||
            text.includes('var') || text.includes('interface') || text.includes('type') ||
            /^\w+,\w+/.test(text) || // Skip CSV headers like "Year,Payments,..."
            isTranslationCall(text)) {
          continue;
        }

        // Look for common UI text patterns
        if ((text.length >= 4 && text.length <= 50) && // Reasonable text length
            /^[A-Z][a-zA-Z\s]+$/.test(text) || // Capitalized words
            /^[a-z][a-zA-Z\s]+$/.test(text) && text.length > 5 || // Lowercase but longer
            /\b(Remove|Add|Calculate|Reset|Save|Load|Clear|Copy|Paste|Close|Open|Back|Next|Previous|Cancel|Confirm|Yes|No|OK)\b/.test(text) ||
            /\b(Monthly|Weekly|Daily|Yearly|Total|Current|New|Previous|Next|First|Last|Start|End|Begin|Finish)\b/.test(text) ||
            /\b(Balance|Amount|Rate|Payment|Interest|Cost|Price|Value|Sum|Average|Minimum|Maximum|Range|Count|Number)\b/.test(text)) {

          // Additional validation - check if it looks like user-facing text
          if (isLikelyEnglish(text) && !isTranslationCall(text) && !containsJsxExpressions(text)) {
            strings.push(text);
          }
        }
      }
    }

    // Look for text content in JSX elements (not wrapped in quotes)
    // Focus on elements that commonly contain user-facing text
    const commonJsxElements = ['span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'label', 'td', 'th', 'button', 'option'];
    for (const element of commonJsxElements) {
      const elementRegex = new RegExp(`<${element}[^>]*>\\s*([^<{][^<]*?)\\s*</${element}>`, 'gi');
      let elementMatch;
      while ((elementMatch = elementRegex.exec(line)) !== null) {
        const textContent = elementMatch[1].trim();

        // Skip if contains JSX expressions, too short, too long, or looks like code
        if (textContent.includes('{') || textContent.includes('}') ||
            textContent.length < 4 || textContent.length > 60 ||
            /^\s*$/.test(textContent) ||
            textContent.includes('className=') || textContent.includes('onClick=') ||
            textContent.includes('style=') || /^\d/.test(textContent)) {
          continue;
        }

        // Additional filtering for common non-user text
        if (textContent === 'hidden' || textContent === 'download' ||
            textContent.includes('\n') || /^\w+,\w+/.test(textContent)) {
          continue;
        }

        if (isLikelyEnglish(textContent) && !isTranslationCall(textContent)) {
          strings.push(textContent);
        }
      }
    }
  }

  // Remove duplicates
  const uniqueStrings = [...new Set(strings)];

  if (uniqueStrings.length === 0) {
    console.log(`   ℹ️  No hardcoded strings found in ${fileName}`);
    return { processedContent, stringsFound: 0 };
  }

  console.log(`   📝 Found ${uniqueStrings.length} hardcoded strings:`);
  uniqueStrings.forEach(str => console.log(`      - "${str}"`));

  // Add translations to the file
  processedContent = addTranslationsToFile(processedContent, uniqueStrings, existingTranslations);

  // Replace hardcoded strings with translation calls
  uniqueStrings.forEach(str => {
    const key = generateTranslationKey(str);
    // Split content into translations and component parts
    const translationsEndIndex = processedContent.indexOf('};\n\n') + 4; // End of translations object
    const translationsPart = processedContent.substring(0, translationsEndIndex);
    const componentPart = processedContent.substring(translationsEndIndex);

    // Replace in template literals: handle complex template literals
    // Look for template literals that contain the string and replace the specific part
    const templateLiteralRegex = /`([^`]*)`/g;
    let updatedComponentPart = componentPart;
    let templateMatch;

    while ((templateMatch = templateLiteralRegex.exec(componentPart)) !== null) {
      const fullTemplate = templateMatch[0];
      const templateContent = templateMatch[1];

      if (templateContent.includes(str)) {
        // Split template content by expressions and replace the string part
        const parts = templateContent.split(/(\$\{[^}]+\})/);
        const replacedParts = parts.map(part => {
          if (!part.startsWith('${') && part.trim() === str) {
            return `\${t.${key}}`;
          }
          return part;
        });
        const newTemplateContent = replacedParts.join('');
        const newTemplate = `\`${newTemplateContent}\``;

        updatedComponentPart = updatedComponentPart.replace(fullTemplate, newTemplate);
      }
    }

    // Replace in JSX: handle bullet-pointed text specifically
    // Pattern: >• String.</div> -> >{t.key}</div>
    const bulletRegex = new RegExp(`>\\s*•\\s*${escapeRegex(str)}\\s*</div>`, 'g');
    console.log(`   🔍 Looking for bullet pattern: >• ${str}</div>`);
    updatedComponentPart = updatedComponentPart.replace(bulletRegex, `>{t.${key}}</div>`);

    // Replace in JSX: general case
    const simpleJsxRegex = new RegExp(`>([\\s]*${escapeRegex(str)}[\\s]*)<`, 'g');
    updatedComponentPart = updatedComponentPart.replace(simpleJsxRegex, `>{t.${key}}<`);

    // Recombine
    processedContent = translationsPart + updatedComponentPart;
  });

  return { processedContent, stringsFound: uniqueStrings.length };
}

// Check if string is a simple word (like "second", "minute")
function isSimpleWord(str) {
  // Only lowercase letters, no spaces, no punctuation except apostrophes
  return /^[a-z']+$/.test(str) && str.length >= 2 && str.length <= 20;
}

// Check if string contains JSX expressions or variables
function containsJsxExpressions(str) {
  return str.includes('{') || str.includes('}') || str.includes('/*') || str.includes('*/');
}

// Check if text is likely user-facing (not code or technical)
function isUserFacingText(str) {
  // Must be meaningful text that users actually see
  const startsWithBullet = str.startsWith('•');
  const startsWithCapital = /^[A-Z]/.test(str.trim());
  const hasReasonableLength = str.length >= 8 && str.length <= 300; // Expanded range
  const hasProperPunctuation = /[.!?]/.test(str); // Should end with punctuation
  const isHelpfulContent = /\b(add|consider|try|length|content|sentence|readability|flow)\b/i.test(str); // Writing advice keywords

  // More inclusive criteria - catch writing tips, help text, etc.
  return (startsWithBullet || startsWithCapital) &&
         hasReasonableLength &&
         hasProperPunctuation &&
         (isHelpfulContent || startsWithBullet); // Bullet points are usually user content
}

// Helper function to escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Check if string contains translatable text (not just symbols, numbers, etc.)
function containsTranslatableText(str) {
  // Must contain at least one letter and not be mostly punctuation
  const letterCount = (str.match(/[a-zA-Z]/g) || []).length;
  const totalChars = str.length;
  const punctuationRatio = (str.match(/[•.!?,\-:;]/g) || []).length / totalChars;

  return letterCount > 0 && punctuationRatio < 0.8; // Allow some punctuation but not mostly punctuation
}

// Check if string is a translation call
function isTranslationCall(str) {
  // More specific check: look for {t.something} or t.something (not just any "t.")
  return /\{t\.[a-zA-Z_][a-zA-Z0-9_]*\}/.test(str) || /\bt\.[a-zA-Z_][a-zA-Z0-9_]*\b/.test(str) || str.includes('translations[');
}

// Check if string is likely English (not already translated)
function isLikelyEnglish(str) {
  // Skip if it contains non-English characters or looks like another language
  const nonEnglishIndicators = [
    /[áéíóúüñ]/i,  // Spanish characters
    /[ãõç]/i,      // Portuguese characters
    /[àâäéèêëïîôöùûüÿ]/i,  // French characters
    /Calculadora|Mensual|Total|Detalles/i,  // Spanish words
    /Calculadora|Pagamento|Custo|Detalhes/i,  // Portuguese words
    /Calculateur|Mensuel|Total|Détails/i,     // French words
  ];

  return !nonEnglishIndicators.some(regex => regex.test(str));
}

// Check if string is already a translation key
function isTranslationKey(str) {
  return str.includes('t.') || str.includes('translations[') || str.includes('Translations');
}

// Check if string should not be translated
function isNonTranslatable(str) {
  const nonTranslatable = [
    'USD', 'EUR', 'GBP', 'JPY', 'BTC', 'ETH', // currencies
    'PDF', 'CSV', 'JSON', 'XML', // file formats
    'API', 'URL', 'HTTP', 'HTTPS', // technical terms
    'min', 'max', 'step', // form attributes
    'type', 'name', 'value', 'className', // HTML attributes
    'useState', 'useEffect', // React hooks
    'console', 'log', 'error' // debugging
  ];

  return nonTranslatable.some(term => str.includes(term));
}

// Generate translation key from string
function generateTranslationKey(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, '')
    .replace(/^[0-9]/, 'num'); // Handle numbers at start
}

// Add translations to component
function addTranslationsToFile(content, strings, existingTranslations = {}) {
  if (strings.length === 0) return content;

  let processedContent = content;

  // Check if translations object exists
  if (!content.includes('const translations = {')) {
    // Add translations object before the component
    const componentMatch = content.match(/export default function \w+/);
    if (componentMatch) {
      const insertPoint = componentMatch.index;
      const translationsObj = generateTranslationsObject(strings, existingTranslations);
      processedContent = content.slice(0, insertPoint) + translationsObj + '\n\n' + content.slice(insertPoint);
    }
  } else {
    // Update existing translations object
    processedContent = updateExistingTranslations(content, strings, existingTranslations);
  }

  return processedContent;
}

// Generate translations object for new strings
function generateTranslationsObject(strings, existingTranslations = {}) {
  let translationsObj = 'const translations = {\n';
  LANGUAGES.forEach(lang => {
    translationsObj += `  ${lang}: {\n`;
    strings.forEach(str => {
      // Check if this string already has a translation key
      let key = findExistingKeyForValue(str, lang === 'en' ? 'en' : 'en'); // Check English first for the base key
      if (!key) {
        key = generateTranslationKey(str);
      }

      let translation;

      if (lang === 'en') {
        // English: use original string
        translation = str;
      } else {
        // Check if translation already exists in existing translations
        if (existingTranslations[lang] && existingTranslations[lang][key]) {
          translation = existingTranslations[lang][key];
        } else {
          // Other languages: provide appropriate translations
          if (str.length <= 20) {
            // Short strings (like "second", "minute") - use basic translations
            translation = getBasicTranslation(str, lang) || str;
          } else {
            // Long strings (UI text) - use writing tip translations first, then placeholder
            translation = getWritingTipTranslation(str, lang);
            if (!translation || translation === str) {
              // No translation found - use placeholder indicating professional translation needed
              translation = `[${lang.toUpperCase()}] ${str}`;
            }
          }
        }
      }

      translationsObj += `    ${key}: "${translation.replace(/"/g, '\\"')}",\n`;
    });
    translationsObj += '  },\n';
  });
  translationsObj += '};\n';

  return translationsObj;
}

// Get basic translation for simple strings
function getBasicTranslation(str, lang) {
  const basicTranslations = {
    es: {
      "writing tips": "Consejos de Escritura",
      second: "segundo",
      minute: "minuto",
      years: "años",
      is: "es",
      from: "de",
      to: "a",
      // Add more common UI words as needed
      calculate: "calcular",
      result: "resultado",
      value: "valor",
      total: "total"
    },
    pt: {
      "writing tips": "Dicas de Escrita",
      second: "segundo",
      minute: "minuto",
      years: "anos",
      is: "é",
      from: "de",
      to: "para",
      // Add more common UI words as needed
      calculate: "calcular",
      result: "resultado",
      value: "valor",
      total: "total"
    },
    fr: {
      "writing tips": "Conseils d'Écriture",
      second: "seconde",
      minute: "minute",
      years: "ans",
      is: "est",
      from: "de",
      to: "à",
      // Add more common UI words as needed
      calculate: "calculer",
      result: "résultat",
      value: "valeur",
      total: "total"
    }
  };

  // Try both the original string and the generated key
  return basicTranslations[lang]?.[str.toLowerCase()] || basicTranslations[lang]?.[generateTranslationKey(str)];
}

// Get translations for writing tips and complex text
function getWritingTipTranslation(str, lang) {
  // Writing tip translations
  const writingTipTranslations = {
    es: {
      "Writing Tips": "Consejos de Escritura",
      "This is a short piece. Consider adding more details or examples.": "Esta es una pieza corta. Considera agregar más detalles o ejemplos.",
      "Good length for a blog post or short article.": "Buena longitud para una publicación de blog o artículo corto.",
      "Excellent length for most articles and essays.": "Longitud excelente para la mayoría de artículos y ensayos.",
      "Long-form content. Consider breaking into sections or chapters.": "Contenido de formato largo. Considera dividirlo en secciones o capítulos.",
      "Average sentence length is high. Try varying sentence structure for better readability.": "La longitud promedio de las oraciones es alta. Intenta variar la estructura de las oraciones para una mejor legibilidad.",
      "Many short sentences. Consider combining some for better flow.": "Muchas oraciones cortas. Considera combinar algunas para un mejor flujo."
    },
    pt: {
      "Writing Tips": "Dicas de Escrita",
      "This is a short piece. Consider adding more details or examples.": "Esta é uma peça curta. Considere adicionar mais detalhes ou exemplos.",
      "Good length for a blog post or short article.": "Bom comprimento para uma postagem de blog ou artigo curto.",
      "Excellent length for most articles and essays.": "Comprimento excelente para a maioria dos artigos e ensaios.",
      "Long-form content. Consider breaking into sections or chapters.": "Conteúdo de formato longo. Considere dividir em seções ou capítulos.",
      "Average sentence length is high. Try varying sentence structure for better readability.": "O comprimento médio das frases é alto. Tente variar a estrutura das frases para uma melhor legibilidade.",
      "Many short sentences. Consider combining some for better flow.": "Muitas frases curtas. Considere combinar algumas para um melhor fluxo."
    },
    fr: {
      "Writing Tips": "Conseils d'Écriture",
      "This is a short piece. Consider adding more details or examples.": "Ceci est un morceau court. Envisagez d'ajouter plus de détails ou d'exemples.",
      "Good length for a blog post or short article.": "Bonne longueur pour un article de blog ou un court article.",
      "Excellent length for most articles and essays.": "Longueur excellente pour la plupart des articles et essais.",
      "Long-form content. Consider breaking into sections or chapters.": "Contenu de longue forme. Envisagez de le diviser en sections ou chapitres.",
      "Average sentence length is high. Try varying sentence structure for better readability.": "La longueur moyenne des phrases est élevée. Essayez de varier la structure des phrases pour une meilleure lisibilité.",
      "Many short sentences. Consider combining some for better flow.": "Beaucoup de phrases courtes. Envisagez d'en combiner certaines pour un meilleur flux."
    }
  };

  // Return translation if available, otherwise fallback to original
  return writingTipTranslations[lang]?.[str] || str;
}

// Update existing translations object
function updateExistingTranslations(content, strings, existingTranslations = {}) {
  let updatedContent = content;

  strings.forEach(str => {
    // First check if this string value already exists in any language
    let existingKey = null;
    for (const lang of LANGUAGES) {
      existingKey = findExistingKeyForValue(str, lang === 'en' ? 'en' : 'en', existingTranslations);
      if (existingKey) break;
    }

    const key = existingKey || generateTranslationKey(str);

    // Check if key already exists
    if (updatedContent.includes(`"${key}":`)) {
      console.log(`   ⚠️  Key "${key}" already exists for "${str}"`);
      return;
    }

    // Add to each language section
    LANGUAGES.forEach(lang => {
      // Check if key already exists in this language section
      const keyExistsRegex = new RegExp(`${key}\\s*:`, 'm');
      if (keyExistsRegex.test(updatedContent)) {
        console.log(`   ⚠️  Key '${key}' already exists in ${lang} section - skipping duplicate`);
        return; // Skip this language
      }

      // Check if this exact value already exists in this language
      const valueExistsRegex = new RegExp(`:\\s*"${str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'm');
      if (valueExistsRegex.test(updatedContent)) {
        console.log(`   ⚠️  Value "${str}" already exists in ${lang} section - skipping duplicate`);
        return; // Skip this language
      }

      let translation;

      if (lang === 'en') {
        translation = str;
      } else {
        // Check existing translations first
        if (existingTranslations[lang] && existingTranslations[lang][key]) {
          translation = existingTranslations[lang][key];
        } else {
          // Other languages: provide appropriate translations
          if (str.length <= 20) {
            // Short strings (like "second", "minute") - use basic translations
            translation = getBasicTranslation(str, lang) || str;
          } else {
            // Long strings (UI text) - use writing tip translations first, then placeholder
            translation = getWritingTipTranslation(str, lang);
            if (!translation || translation === str) {
              // No translation found - use placeholder indicating professional translation needed
              translation = `[${lang.toUpperCase()}] ${str}`;
            }
          }
        }
      }

      const langSection = new RegExp(`(${lang}:\\s*{[^}]*})`, 's');

      updatedContent = updatedContent.replace(langSection, (match, langBlock) => {
        // Remove trailing } and add new translation
        const newBlock = langBlock.replace(/}\s*$/, `    ${key}: "${translation.replace(/"/g, '\\"')}",\n  }`);
        return newBlock;
      });
    });
  });

  return updatedContent;
}

// Process a single file
function processFile(filePath, mode = 'fix') {
  const fileName = path.basename(filePath);
  console.log(`\n📄 Processing: ${fileName}`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let processedContent = content;
    let changesMade = false;
    let fixesCount = 0;
    let stringsFound = 0;

    if (mode === 'fix' || mode === 'all') {
      // Fix broken translations
      if (hasBrokenTranslations(content)) {
        const { fixedContent, fixesCount: fixes } = fixBrokenTranslations(content, fileName);
        processedContent = fixedContent;
        fixesCount = fixes;
        changesMade = true;
      } else {
        console.log(`   ℹ️  No broken translations found in ${fileName}`);
      }
    }

    if (mode === 'extract') {
      // Extract hardcoded strings
      const { processedContent: extractedContent, stringsFound: strings } = extractHardcodedStrings(processedContent, fileName);
      processedContent = extractedContent;
      stringsFound = strings;
      if (strings > 0) changesMade = true;
    }

    if (mode === 'validate') {
      // Just validate - don't modify
      const issues = validateTranslations(content, fileName);
      return issues.length > 0;
    }

    if (changesMade) {
      // Create backup
      const backupPath = `${filePath}.backup.${Date.now()}`;
      fs.writeFileSync(backupPath, content);
      console.log(`   💾 Backup created: ${path.basename(backupPath)}`);

      // Write processed content
      fs.writeFileSync(filePath, processedContent);
      console.log(`   ✅ Updated ${fileName}`);
      if (fixesCount > 0) console.log(`      - Fixed ${fixesCount} broken translations`);
      if (stringsFound > 0) console.log(`      - Internationalized ${stringsFound} hardcoded strings`);
      return true;
    } else {
      console.log(`   ℹ️  No changes needed for ${fileName}`);
      return false;
    }

  } catch (error) {
    console.error(`   ❌ Error processing ${fileName}:`, error.message);
    return false;
  }
}

// Validate translation completeness and quality
// Comprehensive Verification System
function runComprehensiveVerification(filePath) {
  const fileName = path.basename(filePath);
  console.log(`\n🔍 COMPREHENSIVE VERIFICATION: ${fileName}`);
  console.log(`═`.repeat(60));

  let allPassed = true;
  const results = [];

  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // 1. Hardcoded String Detection
    console.log(`\n1️⃣  HARD CODED STRING DETECTION:`);
    const hardcodedIssues = checkHardcodedStrings(content);
    results.push(...hardcodedIssues);
    hardcodedIssues.forEach(issue => {
      console.log(`   ${issue.status === 'PASSED' ? '✅' : '❌'} ${issue.check}: ${issue.details}`);
      if (issue.examples && issue.examples.length > 0) {
        console.log(`      Examples: ${issue.examples.slice(0, 2).join(', ')}`);
      }
    });

    // 2. Translation Completeness
    console.log(`\n2️⃣  TRANSLATION COMPLETENESS:`);
    const completenessIssues = checkTranslationCompleteness(content, fileName);
    results.push(...completenessIssues);
    completenessIssues.forEach(issue => {
      console.log(`   ${issue.status === 'PASSED' ? '✅' : '❌'} ${issue.check}: ${issue.details}`);
      if (issue.examples && issue.examples.length > 0) {
        console.log(`      Examples: ${issue.examples.slice(0, 2).join(', ')}`);
      }
    });

    // 3. Translation Quality
    console.log(`\n3️⃣  TRANSLATION QUALITY:`);
    const qualityIssues = checkTranslationQuality(content);
    results.push(...qualityIssues);
    qualityIssues.forEach(issue => {
      console.log(`   ${issue.status === 'PASSED' ? '✅' : issue.status === 'WARNING' ? '⚠️' : '❌'} ${issue.check}: ${issue.details}`);
      if (issue.examples && issue.examples.length > 0) {
        console.log(`      Examples: ${issue.examples.slice(0, 2).join(', ')}`);
      }
    });

    // 4. Syntax Validation
    console.log(`\n4️⃣  SYNTAX VALIDATION:`);
    const syntaxIssues = checkSyntaxValidation(content);
    results.push(...syntaxIssues);
    syntaxIssues.forEach(issue => {
      console.log(`   ${issue.status === 'PASSED' ? '✅' : '❌'} ${issue.check}: ${issue.details}`);
    });

    // 5. Build Compatibility
    console.log(`\n5️⃣  BUILD COMPATIBILITY:`);
    const buildIssues = checkBuildCompatibility(filePath);
    results.push(...buildIssues);
    buildIssues.forEach(issue => {
      console.log(`   ${issue.status === 'PASSED' ? '✅' : '❌'} ${issue.check}: ${issue.details}`);
      if (issue.examples && issue.examples.length > 0) {
        console.log(`      Error: ${issue.examples[0]}`);
      }
    });

    // 6. TypeScript Validation
    console.log(`\n6️⃣  TYPESCRIPT VALIDATION:`);
    const tsIssues = checkTypeScriptErrors(filePath);
    results.push(...tsIssues);
    tsIssues.forEach(issue => {
      console.log(`   ${issue.status === 'PASSED' ? '✅' : '❌'} ${issue.check}: ${issue.details}`);
    });

    // 7. Final Assessment
    console.log(`\n🎯 FINAL ASSESSMENT:`);
    const passedChecks = results.filter(r => r.passed).length;
    const totalChecks = results.length;
    const score = Math.round((passedChecks / totalChecks) * 100);

    if (score >= 90) {
      console.log(`   ✅ EXCELLENT: ${score}% (${passedChecks}/${totalChecks})`);
      console.log(`   🎉 Component is production-ready!`);
    } else if (score >= 75) {
      console.log(`   ⚠️  GOOD: ${score}% (${passedChecks}/${totalChecks})`);
      console.log(`   🔧 Minor fixes needed`);
    } else {
      console.log(`   ❌ NEEDS WORK: ${score}% (${passedChecks}/${totalChecks})`);
      console.log(`   🛠️  Significant fixes required`);
      allPassed = false;
    }

    // Generate verification URLs
    console.log(`\n🌐 VERIFICATION URLs (for manual testing):`);
    const componentSlug = fileName.replace('Calculator.tsx', '').replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
    LANGUAGES.forEach(lang => {
      const url = `http://localhost:3000/${lang}/${componentSlug}-calculator/`;
      console.log(`   ${lang.toUpperCase()}: ${url}`);
    });

    return allPassed;

  } catch (error) {
    console.log(`   ❌ VERIFICATION FAILED: ${error.message}`);
    return false;
  }
}

function checkHardcodedStrings(content) {
  const issues = [];
  let passed = true;

  // Check for hardcoded strings in JSX
  const jsxStrings = content.match(/>\s*([A-Z][^<]*?)\s*</g) || [];
  const filteredStrings = jsxStrings
    .map(match => match.replace(/[><\s]/g, ''))
    .filter(str =>
      str.length > 3 &&
      str.length < 50 &&
      !str.includes('{t.') &&
      !str.includes('Calculator') &&
      !str.match(/^\d/) &&
      !['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'li'].includes(str.toLowerCase())
    );

  if (filteredStrings.length > 0) {
    issues.push({
      check: 'Hardcoded JSX Strings',
      status: 'FAILED',
      details: `Found ${filteredStrings.length} potential hardcoded strings`,
      examples: filteredStrings.slice(0, 3),
      passed: false
    });
    passed = false;
  } else {
    issues.push({
      check: 'Hardcoded JSX Strings',
      status: 'PASSED',
      details: 'No hardcoded strings found in JSX',
      passed: true
    });
  }

  // Check for hardcoded template literals
  const templateLiterals = content.match(/`[^`]*\$?\{[^}]*\}[^`]*`/g) || [];
  const hardcodedTemplates = templateLiterals.filter(literal =>
    literal.includes('second') || literal.includes('minute') ||
    literal.includes('inches') || literal.includes('cm')
  );

  if (hardcodedTemplates.length > 0) {
    issues.push({
      check: 'Hardcoded Template Literals',
      status: 'FAILED',
      details: `Found ${hardcodedTemplates.length} hardcoded template literals`,
      examples: hardcodedTemplates.slice(0, 2),
      passed: false
    });
    passed = false;
  } else {
    issues.push({
      check: 'Hardcoded Template Literals',
      status: 'PASSED',
      details: 'No hardcoded template literals found',
      passed: true
    });
  }

  return issues;
}

function checkTranslationCompleteness(content, fileName) {
  const issues = [];
  let passed = true;

  // Check translations object exists
  if (!content.includes('const translations = {')) {
    issues.push({
      check: 'Translations Object',
      status: 'FAILED',
      details: 'No translations object found',
      passed: false
    });
    passed = false;
  } else {
    issues.push({
      check: 'Translations Object',
      status: 'PASSED',
      details: 'Translations object found',
      passed: true
    });
  }

  // Check all required languages
  LANGUAGES.forEach(lang => {
    const langExists = content.includes(`${lang}: {`);
    issues.push({
      check: `${lang.toUpperCase()} Translations`,
      status: langExists ? 'PASSED' : 'FAILED',
      details: langExists ? `${lang} translations found` : `${lang} translations missing`,
      passed: langExists
    });
    if (!langExists) passed = false;
  });

  // Check for duplicate keys (learned: some "duplicates" are nested structures)
  const duplicateKeys = findDuplicateTranslationKeys(content);
  const realDuplicates = duplicateKeys.filter(key => {
    // Filter out false positives: nested keys like methodOptions.bmi vs top-level bmi
    const parts = key.split('.');
    return parts.length === 2; // Only flag true duplicates at the same level
  });

  if (realDuplicates.length > 0) {
    issues.push({
      check: 'Duplicate Keys',
      status: 'FAILED',
      details: `Found ${realDuplicates.length} duplicate translation keys`,
      examples: realDuplicates.slice(0, 3),
      passed: false
    });
    passed = false;
  } else {
    issues.push({
      check: 'Duplicate Keys',
      status: 'PASSED',
      details: 'No duplicate translation keys found',
      passed: true
    });
  }

  return issues;
}

function checkTranslationQuality(content) {
  const issues = [];
  let passed = true;

  // Check for placeholder translations
  const placeholders = content.match(/"\[[A-Z]{2}\]\s*[^"]*"/g) || [];
  if (placeholders.length > 0) {
    issues.push({
      check: 'Placeholder Translations',
      status: 'FAILED',
      details: `Found ${placeholders.length} placeholder translations`,
      examples: placeholders.slice(0, 3),
      passed: false
    });
    passed = false;
  } else {
    issues.push({
      check: 'Placeholder Translations',
      status: 'PASSED',
      details: 'No placeholder translations found',
      passed: true
    });
  }

  // Check for very short translations (potential issues)
  const lines = content.split('\n');
  let currentLang = null;
  const shortTranslations = [];

  for (const line of lines) {
    const langMatch = line.match(/^\s*([a-z]{2}):\s*\{/);
    if (langMatch) {
      currentLang = langMatch[1];
      continue;
    }

    if (currentLang && currentLang !== 'en' && line.includes(':')) {
      const valueMatch = line.match(/:\s*"([^"]*)"/);
      if (valueMatch) {
        const value = valueMatch[1];
        if (value.length < 3 && value !== '') {
          shortTranslations.push(`${currentLang}: "${value}"`);
        }
      }
    }
  }

  if (shortTranslations.length > 0) {
    issues.push({
      check: 'Translation Length',
      status: 'WARNING',
      details: `Found ${shortTranslations.length} very short translations`,
      examples: shortTranslations.slice(0, 3),
      passed: true // Not a failure, just a warning
    });
  }

  return issues;
}

function checkSyntaxValidation(content) {
  const issues = [];

  // Check for basic syntax issues
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;

  if (openBraces !== closeBraces) {
    issues.push({
      check: 'Brace Balance',
      status: 'FAILED',
      details: `Unbalanced braces: ${openBraces} open, ${closeBraces} close`,
      passed: false
    });
  } else {
    issues.push({
      check: 'Brace Balance',
      status: 'PASSED',
      details: 'Braces are balanced',
      passed: true
    });
  }

  // Check for missing commas in translation objects
  const lines = content.split('\n');
  let inTranslations = false;
  let missingCommas = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('const translations = {')) {
      inTranslations = true;
      continue;
    }
    if (inTranslations && line.includes('};')) {
      inTranslations = false;
      continue;
    }
    if (inTranslations && line.includes(':') && !line.includes(',') && !line.includes('}') && lines[i + 1] && !lines[i + 1].includes('}')) {
      missingCommas++;
    }
  }

  if (missingCommas > 0) {
    issues.push({
      check: 'Missing Commas',
      status: 'FAILED',
      details: `Found ${missingCommas} missing commas in translations`,
      passed: false
    });
  } else {
    issues.push({
      check: 'Missing Commas',
      status: 'PASSED',
      details: 'No missing commas detected',
      passed: true
    });
  }

  return issues;
}

function checkBuildCompatibility(filePath) {
  const issues = [];
  const { execSync } = require('child_process');

  try {
    // Quick syntax check with TypeScript
    execSync('npx tsc --noEmit --skipLibCheck ' + filePath, { stdio: 'pipe' });
    issues.push({
      check: 'TypeScript Compilation',
      status: 'PASSED',
      details: 'TypeScript compilation successful',
      passed: true
    });
  } catch (error) {
    issues.push({
      check: 'TypeScript Compilation',
      status: 'FAILED',
      details: 'TypeScript compilation failed',
      examples: [error.message.split('\n')[0]],
      passed: false
    });
  }

  return issues;
}

function checkTypeScriptErrors(filePath) {
  const issues = [];
  const { execSync } = require('child_process');

  try {
    // Check for any TypeScript errors in this specific file
    const result = execSync('npx tsc --noEmit --strict ' + filePath, { stdio: 'pipe', encoding: 'utf8' });
    if (result.includes('error')) {
      issues.push({
        check: 'TypeScript Strict Mode',
        status: 'FAILED',
        details: 'TypeScript strict mode errors found',
        passed: false
      });
    } else {
      issues.push({
        check: 'TypeScript Strict Mode',
        status: 'PASSED',
        details: 'No TypeScript strict mode errors',
        passed: true
      });
    }
  } catch (error) {
    issues.push({
      check: 'TypeScript Strict Mode',
      status: 'FAILED',
      details: 'TypeScript strict mode check failed',
      passed: false
    });
  }

  return issues;
}

function findDuplicateTranslationKeys(content) {
  const duplicates = [];
  const keyCounts = {};

  const lines = content.split('\n');
  let currentLang = null;

  for (const line of lines) {
    const langMatch = line.match(/^\s*([a-z]{2}):\s*\{/);
    if (langMatch) {
      currentLang = langMatch[1];
      continue;
    }

    if (currentLang && line.includes(':')) {
      const keyMatch = line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
      if (keyMatch) {
        const key = keyMatch[1];
        const fullKey = `${currentLang}.${key}`;
        keyCounts[fullKey] = (keyCounts[fullKey] || 0) + 1;
      }
    }
  }

  for (const [key, count] of Object.entries(keyCounts)) {
    if (count > 1) {
      duplicates.push(key);
    }
  }

  return duplicates;
}

function validateTranslations(content, fileName) {
  console.log(`🔍 Validating translations in ${fileName}`);

  let issues = [];

  try {
    // Check if translations object exists
    if (!content.includes('const translations = {')) {
      issues.push('❌ No translations object found');
      return issues;
    }

    // Check for required languages
    LANGUAGES.forEach(lang => {
      if (!content.includes(`${lang}: {`)) {
        issues.push(`❌ Missing ${lang} translations`);
      }
    });

    // Check for incomplete translations (English strings in other languages)
    const lines = content.split('\n');
    let currentLang = null;

    for (const line of lines) {
      // Track current language section
      const langMatch = line.match(/^\s*([a-z]{2}):\s*\{/);
      if (langMatch) {
        currentLang = langMatch[1];
        continue;
      }

      // Check for untranslated strings in non-English sections
      if (currentLang && currentLang !== 'en' && line.includes(':')) {
        const valueMatch = line.match(/:\s*"([^"]*)"/);
        if (valueMatch) {
          const value = valueMatch[1];
          // Flag if it looks like untranslated English (starts with capital, short word)
          if (value.match(/^[A-Z][a-z]{2,20}$/) && !value.includes(' ') &&
              !['segundo', 'minuto', 'seconde', 'Consejos', 'Dicas', 'Conseils'].includes(value)) {
            issues.push(`⚠️  Possible untranslated English in ${currentLang}: "${value}"`);
          }
        }
      }
    }

  } catch (e) {
    issues.push(`❌ Validation error: ${e.message}`);
  }

  if (issues.length === 0) {
    console.log(`✅ Translations validation passed`);
  } else {
    console.log(`⚠️  Found ${issues.length} translation issues:`);
    issues.forEach(issue => console.log(`   ${issue}`));
  }

  return issues;
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'fix';
  const fileArg = args[1];

  console.log(`🌍 Internationalization Agent Starting...`);
  console.log(`📋 Mode: ${mode}\n`);

  let filesToProcess = [];

  if (fileArg && fileArg !== 'all') {
    // Process specific file
    const filePath = fileArg;
    if (fs.existsSync(filePath)) {
      filesToProcess = [filePath];
    } else {
      console.error(`❌ File not found: ${filePath}`);
      process.exit(1);
    }
  } else {
    // Process all calculator files
    const componentDir = path.resolve(COMPONENT_DIR);
    if (!fs.existsSync(componentDir)) {
      console.error(`❌ Component directory not found: ${componentDir}`);
      process.exit(1);
    }

    filesToProcess = fs.readdirSync(componentDir)
      .filter(file => file.endsWith('.tsx') && !file.endsWith('.backup.tsx'))
      .map(file => path.join(componentDir, file));
  }

  console.log(`📁 Will process ${filesToProcess.length} file(s)\n`);

  let totalFixed = 0;
  let totalFiles = 0;
  let totalStrings = 0;
  let totalIssues = 0;

  filesToProcess.forEach(filePath => {
    if (mode === 'validate') {
      const issues = validateTranslations(fs.readFileSync(filePath, 'utf8'), path.basename(filePath));
      totalIssues += issues.length;
    } else if (mode === 'verify') {
      const result = verifyComponent(filePath);
      if (result) totalFixed++;
    } else if (mode === 'comprehensive') {
      const result = runComprehensiveVerification(filePath);
      if (result) totalFixed++;
    } else {
      const result = processFile(filePath, mode);
      if (result) totalFixed++;
    }
    totalFiles++;
  });

  console.log(`\n🎉 Processing Complete!`);
  console.log(`📊 Processed: ${totalFiles} files`);
  if (mode === 'validate') {
    console.log(`🔍 Validation issues found: ${totalIssues}`);
  } else {
    console.log(`🔧 Updated: ${totalFixed} files`);
    if (mode === 'extract') {
      console.log(`🔤 Total strings internationalized: ${totalStrings}`);
    }
  }
  console.log(`💡 Run 'npm run build' to verify all changes work correctly`);
}

/**
 * Verify component internationalization by testing rendering
 */
function verifyComponent(filePath) {
  const fileName = path.basename(filePath, '.tsx');
  const componentSlug = fileName.replace('Calculator', '').replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');

  console.log(`🔍 Generating verification URLs for: ${fileName}`);

  // Generate verification URLs for each language
  const verificationUrls = LANGUAGES.map(lang =>
    `http://localhost:3000/${lang}/${componentSlug}-calculator/`
  );

  console.log(`   🌐 Verification URLs (start dev server first):`);
  verificationUrls.forEach((url, index) => {
    console.log(`      ${LANGUAGES[index].toUpperCase()}: ${url}`);
  });

  console.log(`   💡 Manual verification checklist:`);
  console.log(`      - All text appears in correct language`);
  console.log(`      - No English text in non-English versions`);
  console.log(`      - Layout and formatting look correct`);
  console.log(`      - Calculator functionality works in all languages`);
  console.log(`      - No broken text or encoding issues`);

  return true;
}

// Run the agent
if (require.main === module) {
  main();
}

module.exports = { hasBrokenTranslations, fixBrokenTranslations, extractHardcodedStrings };
