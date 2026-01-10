#!/bin/bash

# Script to systematically add embedded translations to calculator components
# that still have hardcoded English text

echo "=== FIXING HARDCODED ENGLISH TEXT IN CALCULATOR COMPONENTS ==="
echo ""

# Function to add basic translations template
add_translations() {
    local file="$1"
    local component_name=$(basename "$file" .tsx)
    
    echo "Processing: $component_name"
    
    # Create backup
    cp "$file" "${file}.backup"
    
    # Add translations object after lang prop
    sed -i '' '/lang = '\''en'\'' }: /a\
  // Embedded translations following CALCULATOR_CREATION_AGENT.md approach\
  const translations = {\
    en: {\
      title: "'$component_name'",\
      description: "Calculate values for '$component_name'",\
      calculate: "Calculate",\
      result: "Result",\
      error: "Error",\
      reset: "Reset"\
    },\
    es: {\
      title: "'$component_name' (ES)",\
      description: "Calcular valores para '$component_name'",\
      calculate: "Calcular",\
      result: "Resultado",\
      error: "Error",\
      reset: "Reiniciar"\
    },\
    pt: {\
      title: "'$component_name' (PT)",\
      description: "Calcular valores para '$component_name'",\
      calculate: "Calcular",\
      result: "Resultado",\
      error: "Erro",\
      reset: "Reiniciar"\
    },\
    fr: {\
      title: "'$component_name' (FR)",\
      description: "Calculer les valeurs pour '$component_name'",\
      calculate: "Calculer",\
      result: "Résultat",\
      error: "Erreur",\
      reset: "Réinitialiser"\
    }\
  };\
\
  const t = translations[lang as keyof typeof translations] || translations.en;\
' "$file"
    
    # Replace useTranslation import and usage
    sed -i '' 's/import { useTranslation } from '\''react-i18next'\'';//g' "$file"
    sed -i '' 's/const { t } = useTranslation('\''common'\'');//g' "$file"
    sed -i '' 's/const { t, i18n } = useTranslation('\''common'\'');//g' "$file"
    
    echo "  ✓ Added embedded translations to $component_name"
}

# Process each calculator without translations
for file in *.tsx; do
    if [ "$file" != "CalculatorRegistry.tsx" ] && ! grep -q 'translations.*=' "$file"; then
        add_translations "$file"
    fi
done

echo ""
echo "=== TRANSLATIONS ADDED TO ALL CALCULATORS ==="
echo "Note: Manual review needed to customize translations for each calculator's specific UI text"
