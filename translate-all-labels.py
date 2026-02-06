#!/usr/bin/env python3
"""
Comprehensive script to translate ALL calculator labels in JSON files.
Translates inputs, outputs, and additional outputs for ES, PT, and FR sections.
"""

import json
import os
import glob
from pathlib import Path

# Comprehensive translation dictionaries
LABEL_TRANSLATIONS = {
    'es': {
        # Financial - Loan/Mortgage
        'Loan Amount ($)': 'Monto del Préstamo ($)',
        'Interest Rate (%)': 'Tasa de Interés (%)',
        'Loan Term (years)': 'Plazo del Préstamo (años)',
        'Loan Term (months)': 'Plazo del Préstamo (meses)',
        'Down Payment ($)': 'Pago Inicial ($)',
        'Extra Monthly Payment ($)': 'Pago Extra Mensual ($)',
        'Extra Payment ($)': 'Pago Extra ($)',
        'Annual Property Tax ($)': 'Impuesto a la Propiedad Anual ($)',
        'Annual Home Insurance ($)': 'Seguro del Hogar Anual ($)',
        'Monthly Payment ($)': 'Pago Mensual ($)',
        'Payment Amount ($)': 'Monto del Pago ($)',
        'Minimum Payment ($)': 'Pago Mínimo ($)',
        'Home Price ($)': 'Precio de la Vivienda ($)',
        'Purchase Price ($)': 'Precio de Compra ($)',
        'Property Value ($)': 'Valor de la Propiedad ($)',
        'Assessment Value ($)': 'Valor de Tasación ($)',
        'Tax Rate (%)': 'Tasa de Impuesto (%)',
        'APR (%)': 'TAE (%)',
        'Annual Rate (%)': 'Tasa Anual (%)',
        'Monthly Rate (%)': 'Tasa Mensual (%)',
        'Number of Payments': 'Número de Pagos',
        'Payment Frequency': 'Frecuencia de Pago',
        'Loan Type': 'Tipo de Préstamo',
        'Credit Score': 'Puntaje de Crédito',
        
        # Financial - General
        'Amount ($)': 'Monto ($)',
        'Principal Amount ($)': 'Monto Principal ($)',
        'Current Balance ($)': 'Saldo Actual ($)',
        'Initial Amount ($)': 'Monto Inicial ($)',
        'Final Amount ($)': 'Monto Final ($)',
        'Rate (%)': 'Tasa (%)',
        'Term (years)': 'Plazo (años)',
        'Term (months)': 'Plazo (meses)',
        'Time Period (years)': 'Período de Tiempo (años)',
        'Time Period (months)': 'Período de Tiempo (meses)',
        'Compounding Frequency': 'Frecuencia de Capitalización',
        
        # Outputs
        'Total Monthly Payment': 'Pago Mensual Total',
        'Monthly Payment': 'Pago Mensual',
        'Total Interest': 'Interés Total',
        'Total Interest Paid': 'Interés Total Pagado',
        'Total Payment': 'Pago Total',
        'Total Cost': 'Costo Total',
        'Total Payments': 'Pagos Totales',
        'Principal & Interest': 'Principal e Intereses',
        'Principal and Interest': 'Principal e Intereses',
        'Months Saved': 'Meses Ahorrados',
        'Years to Payoff': 'Años para Pagar',
        'Interest Saved': 'Interés Ahorrado',
        'Payoff Date': 'Fecha de Pago',
        'Property Tax': 'Impuesto a la Propiedad',
        'Home Insurance': 'Seguro del Hogar',
        'PMI': 'Seguro Hipotecario',
        'Result': 'Resultado',
        'Total': 'Total',
        
        # Health/Fitness
        'Weight (kg)': 'Peso (kg)',
        'Weight (lbs)': 'Peso (lbs)',
        'Height (cm)': 'Altura (cm)',
        'Height (in)': 'Altura (in)',
        'Age (years)': 'Edad (años)',
        'Gender': 'Género',
        'Activity Level': 'Nivel de Actividad',
        'Goal': 'Objetivo',
        
        # Math/Science
        'Primary Value': 'Valor Principal',
        'Secondary Value': 'Valor Secundario',
        'Value': 'Valor',
        'Number': 'Número',
        'Enter Number': 'Ingrese el Número',
        'Enter Value': 'Ingrese el Valor',
        
        # Default messages
        'Enter loan details above': 'Ingrese los detalles del préstamo arriba',
        'Enter mortgage details above': 'Ingrese los detalles de la hipoteca arriba',
        'Enter values above': 'Ingrese los valores arriba',
        'Enter details above': 'Ingrese los detalles arriba',
        'Calculate': 'Calcular',
        'Result will appear here': 'El resultado aparecerá aquí',
        'Enter values to calculate': 'Ingrese valores para calcular',
    },
    'pt': {
        # Financial - Loan/Mortgage
        'Loan Amount ($)': 'Valor do Empréstimo ($)',
        'Interest Rate (%)': 'Taxa de Juros (%)',
        'Loan Term (years)': 'Prazo do Empréstimo (anos)',
        'Loan Term (months)': 'Prazo do Empréstimo (meses)',
        'Down Payment ($)': 'Entrada ($)',
        'Extra Monthly Payment ($)': 'Pagamento Extra Mensal ($)',
        'Extra Payment ($)': 'Pagamento Extra ($)',
        'Annual Property Tax ($)': 'Imposto Predial Anual ($)',
        'Annual Home Insurance ($)': 'Seguro Residencial Anual ($)',
        'Monthly Payment ($)': 'Pagamento Mensal ($)',
        'Payment Amount ($)': 'Valor do Pagamento ($)',
        'Minimum Payment ($)': 'Pagamento Mínimo ($)',
        'Home Price ($)': 'Preço da Casa ($)',
        'Purchase Price ($)': 'Preço de Compra ($)',
        'Property Value ($)': 'Valor do Imóvel ($)',
        'Assessment Value ($)': 'Valor de Avaliação ($)',
        'Tax Rate (%)': 'Taxa de Imposto (%)',
        'APR (%)': 'TAC (%)',
        'Annual Rate (%)': 'Taxa Anual (%)',
        'Monthly Rate (%)': 'Taxa Mensal (%)',
        'Number of Payments': 'Número de Pagamentos',
        'Payment Frequency': 'Frequência de Pagamento',
        'Loan Type': 'Tipo de Empréstimo',
        'Credit Score': 'Pontuação de Crédito',
        
        # Financial - General
        'Amount ($)': 'Valor ($)',
        'Principal Amount ($)': 'Valor Principal ($)',
        'Current Balance ($)': 'Saldo Atual ($)',
        'Initial Amount ($)': 'Valor Inicial ($)',
        'Final Amount ($)': 'Valor Final ($)',
        'Rate (%)': 'Taxa (%)',
        'Term (years)': 'Prazo (anos)',
        'Term (months)': 'Prazo (meses)',
        'Time Period (years)': 'Período de Tempo (anos)',
        'Time Period (months)': 'Período de Tempo (meses)',
        'Compounding Frequency': 'Frequência de Capitalização',
        
        # Outputs
        'Total Monthly Payment': 'Pagamento Mensal Total',
        'Monthly Payment': 'Pagamento Mensal',
        'Total Interest': 'Juros Totais',
        'Total Interest Paid': 'Juros Total Pago',
        'Total Payment': 'Pagamento Total',
        'Total Cost': 'Custo Total',
        'Total Payments': 'Pagamentos Totais',
        'Principal & Interest': 'Principal e Juros',
        'Principal and Interest': 'Principal e Juros',
        'Months Saved': 'Meses Economizados',
        'Years to Payoff': 'Anos para Quitar',
        'Interest Saved': 'Juros Economizados',
        'Payoff Date': 'Data de Quitação',
        'Property Tax': 'Imposto Predial',
        'Home Insurance': 'Seguro Residencial',
        'PMI': 'Seguro Hipotecário',
        'Result': 'Resultado',
        'Total': 'Total',
        
        # Health/Fitness
        'Weight (kg)': 'Peso (kg)',
        'Weight (lbs)': 'Peso (lbs)',
        'Height (cm)': 'Altura (cm)',
        'Height (in)': 'Altura (in)',
        'Age (years)': 'Idade (anos)',
        'Gender': 'Gênero',
        'Activity Level': 'Nível de Atividade',
        'Goal': 'Objetivo',
        
        # Math/Science
        'Primary Value': 'Valor Principal',
        'Secondary Value': 'Valor Secundário',
        'Value': 'Valor',
        'Number': 'Número',
        'Enter Number': 'Digite o Número',
        'Enter Value': 'Digite o Valor',
        
        # Default messages
        'Enter loan details above': 'Digite os detalhes do empréstimo acima',
        'Enter mortgage details above': 'Digite os detalhes da hipoteca acima',
        'Enter values above': 'Digite os valores acima',
        'Enter details above': 'Digite os detalhes acima',
        'Calculate': 'Calcular',
        'Result will appear here': 'O resultado aparecerá aqui',
        'Enter values to calculate': 'Digite valores para calcular',
    },
    'fr': {
        # Financial - Loan/Mortgage
        'Loan Amount ($)': 'Montant du Prêt ($)',
        'Interest Rate (%)': 'Taux d\'Intérêt (%)',
        'Loan Term (years)': 'Durée du Prêt (années)',
        'Loan Term (months)': 'Durée du Prêt (mois)',
        'Down Payment ($)': 'Mise de Fonds ($)',
        'Extra Monthly Payment ($)': 'Paiement Supplémentaire Mensuel ($)',
        'Extra Payment ($)': 'Paiement Supplémentaire ($)',
        'Annual Property Tax ($)': 'Taxe Foncière Annuelle ($)',
        'Annual Home Insurance ($)': 'Assurance Habitation Annuelle ($)',
        'Monthly Payment ($)': 'Paiement Mensuel ($)',
        'Payment Amount ($)': 'Montant du Paiement ($)',
        'Minimum Payment ($)': 'Paiement Minimum ($)',
        'Home Price ($)': 'Prix de la Maison ($)',
        'Purchase Price ($)': 'Prix d\'Achat ($)',
        'Property Value ($)': 'Valeur de la Propriété ($)',
        'Assessment Value ($)': 'Valeur d\'Évaluation ($)',
        'Tax Rate (%)': 'Taux d\'Imposition (%)',
        'APR (%)': 'TEG (%)',
        'Annual Rate (%)': 'Taux Annuel (%)',
        'Monthly Rate (%)': 'Taux Mensuel (%)',
        'Number of Payments': 'Nombre de Paiements',
        'Payment Frequency': 'Fréquence de Paiement',
        'Loan Type': 'Type de Prêt',
        'Credit Score': 'Score de Crédit',
        
        # Financial - General
        'Amount ($)': 'Montant ($)',
        'Principal Amount ($)': 'Montant Principal ($)',
        'Current Balance ($)': 'Solde Actuel ($)',
        'Initial Amount ($)': 'Montant Initial ($)',
        'Final Amount ($)': 'Montant Final ($)',
        'Rate (%)': 'Taux (%)',
        'Term (years)': 'Durée (années)',
        'Term (months)': 'Durée (mois)',
        'Time Period (years)': 'Période de Temps (années)',
        'Time Period (months)': 'Période de Temps (mois)',
        'Compounding Frequency': 'Fréquence de Capitalisation',
        
        # Outputs
        'Total Monthly Payment': 'Paiement Mensuel Total',
        'Monthly Payment': 'Paiement Mensuel',
        'Total Interest': 'Intérêts Totaux',
        'Total Interest Paid': 'Intérêts Total Payé',
        'Total Payment': 'Paiement Total',
        'Total Cost': 'Coût Total',
        'Total Payments': 'Paiements Totaux',
        'Principal & Interest': 'Principal et Intérêts',
        'Principal and Interest': 'Principal et Intérêts',
        'Months Saved': 'Mois Économisés',
        'Years to Payoff': 'Années pour Rembourser',
        'Interest Saved': 'Intérêts Économisés',
        'Payoff Date': 'Date de Remboursement',
        'Property Tax': 'Taxe Foncière',
        'Home Insurance': 'Assurance Habitation',
        'PMI': 'Assurance Hypothécaire',
        'Result': 'Résultat',
        'Total': 'Total',
        
        # Health/Fitness
        'Weight (kg)': 'Poids (kg)',
        'Weight (lbs)': 'Poids (lbs)',
        'Height (cm)': 'Taille (cm)',
        'Height (in)': 'Taille (in)',
        'Age (years)': 'Âge (années)',
        'Gender': 'Genre',
        'Activity Level': 'Niveau d\'Activité',
        'Goal': 'Objectif',
        
        # Math/Science
        'Primary Value': 'Valeur Principale',
        'Secondary Value': 'Valeur Secondaire',
        'Value': 'Valeur',
        'Number': 'Nombre',
        'Enter Number': 'Entrez le Nombre',
        'Enter Value': 'Entrez la Valeur',
        
        # Default messages
        'Enter loan details above': 'Entrez les détails du prêt ci-dessus',
        'Enter mortgage details above': 'Entrez les détails de l\'hypothèque ci-dessus',
        'Enter values above': 'Entrez les valeurs ci-dessus',
        'Enter details above': 'Entrez les détails ci-dessus',
        'Calculate': 'Calculer',
        'Result will appear here': 'Le résultat apparaîtra ici',
        'Enter values to calculate': 'Entrez des valeurs pour calculer',
    }
}

def translate_label(label, lang):
    """Translate a label to the target language."""
    if not label or lang not in LABEL_TRANSLATIONS:
        return label
    return LABEL_TRANSLATIONS[lang].get(label, label)

def translate_calculator_component(component, lang):
    """Translate all labels in a calculator component."""
    if not component:
        return component
    
    modified = False
    
    # Translate input labels
    if 'inputs' in component:
        for input_field in component['inputs']:
            if 'label' in input_field:
                original = input_field['label']
                translated = translate_label(original, lang)
                if original != translated:
                    input_field['label'] = translated
                    modified = True
    
    # Translate output label and default
    if 'output' in component:
        if 'label' in component['output']:
            original = component['output']['label']
            translated = translate_label(original, lang)
            if original != translated:
                component['output']['label'] = translated
                modified = True
        
        if 'default' in component['output']:
            original = component['output']['default']
            translated = translate_label(original, lang)
            if original != translated:
                component['output']['default'] = translated
                modified = True
    
    # Translate additional outputs
    if 'additionalOutputs' in component:
        for output in component['additionalOutputs']:
            if 'label' in output:
                original = output['label']
                translated = translate_label(original, lang)
                if original != translated:
                    output['label'] = translated
                    modified = True
    
    return modified

def process_calculator_file(filepath):
    """Process a single calculator JSON file."""
    filename = os.path.basename(filepath)
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        file_modified = False
        
        # Process each language section
        for lang in ['es', 'pt', 'fr']:
            if lang in data and 'calculatorComponent' in data[lang]:
                modified = translate_calculator_component(data[lang]['calculatorComponent'], lang)
                if modified:
                    file_modified = True
        
        if file_modified:
            # Write back to file
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"✓ {filename}")
            return True
        else:
            return False
            
    except Exception as e:
        print(f"✗ {filename}: {e}")
        return False

def main():
    """Main function to process all calculator files."""
    content_dir = Path('content/calculators')
    
    if not content_dir.exists():
        print(f"Error: Directory {content_dir} does not exist")
        return
    
    calculator_files = sorted(list(content_dir.glob('*.json')))
    print(f"Processing {len(calculator_files)} calculator files...\n")
    
    updated_count = 0
    for filepath in calculator_files:
        if process_calculator_file(filepath):
            updated_count += 1
    
    print(f"\n{'='*60}")
    print(f"✓ Complete! Updated {updated_count}/{len(calculator_files)} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
