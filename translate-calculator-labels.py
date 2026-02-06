#!/usr/bin/env python3
"""
Translate calculator input/output labels across all language sections in calculator JSON files.
This script finds English labels in non-English sections and translates them.
"""

import json
import os
import glob
from pathlib import Path

# Translation dictionaries for common calculator labels
TRANSLATIONS = {
    'es': {
        # Common inputs
        'Loan Amount ($)': 'Monto del Préstamo ($)',
        'Interest Rate (%)': 'Tasa de Interés (%)',
        'Loan Term (years)': 'Plazo del Préstamo (años)',
        'Down Payment ($)': 'Pago Inicial ($)',
        'Extra Monthly Payment ($)': 'Pago Extra Mensual ($)',
        'Annual Property Tax ($)': 'Impuesto a la Propiedad Anual ($)',
        'Annual Home Insurance ($)': 'Seguro del Hogar Anual ($)',
        'Monthly Payment ($)': 'Pago Mensual ($)',
        'Payment Frequency': 'Frecuencia de Pago',
        'Loan Type': 'Tipo de Préstamo',
        'Credit Score': 'Puntaje de Crédito',
        'Payment Amount ($)': 'Monto del Pago ($)',
        'Number of Payments': 'Número de Pagos',
        'Principal Amount ($)': 'Monto Principal ($)',
        'Time Period (years)': 'Período de Tiempo (años)',
        'Time Period (months)': 'Período de Tiempo (meses)',
        'Current Balance ($)': 'Saldo Actual ($)',
        'Minimum Payment ($)': 'Pago Mínimo ($)',
        'Extra Payment ($)': 'Pago Extra ($)',
        'APR (%)': 'TAE (%)',
        'Amount ($)': 'Monto ($)',
        'Rate (%)': 'Tasa (%)',
        'Term (years)': 'Plazo (años)',
        'Term (months)': 'Plazo (meses)',
        
        # Common outputs
        'Total Monthly Payment': 'Pago Mensual Total',
        'Monthly Payment': 'Pago Mensual',
        'Total Interest': 'Interés Total',
        'Total Payment': 'Pago Total',
        'Total Cost': 'Costo Total',
        'Principal & Interest': 'Principal e Intereses',
        'Months Saved': 'Meses Ahorrados',
        'Total Interest Paid': 'Interés Total Pagado',
        'Years to Payoff': 'Años para Pagar',
        'Interest Saved': 'Interés Ahorrado',
        'Payoff Date': 'Fecha de Pago',
        'Total Payments': 'Pagos Totales',
        'Property Tax': 'Impuesto a la Propiedad',
        'Home Insurance': 'Seguro del Hogar',
        'PMI': 'Seguro Hipotecario',
        'Result': 'Resultado',
        
        # Default values
        'Enter loan details above': 'Ingrese los detalles del préstamo arriba',
        'Enter values above': 'Ingrese los valores arriba',
        'Calculate': 'Calcular',
    },
    'pt': {
        # Common inputs
        'Loan Amount ($)': 'Valor do Empréstimo ($)',
        'Interest Rate (%)': 'Taxa de Juros (%)',
        'Loan Term (years)': 'Prazo do Empréstimo (anos)',
        'Down Payment ($)': 'Entrada ($)',
        'Extra Monthly Payment ($)': 'Pagamento Extra Mensal ($)',
        'Annual Property Tax ($)': 'Imposto Predial Anual ($)',
        'Annual Home Insurance ($)': 'Seguro Residencial Anual ($)',
        'Monthly Payment ($)': 'Pagamento Mensal ($)',
        'Payment Frequency': 'Frequência de Pagamento',
        'Loan Type': 'Tipo de Empréstimo',
        'Credit Score': 'Pontuação de Crédito',
        'Payment Amount ($)': 'Valor do Pagamento ($)',
        'Number of Payments': 'Número de Pagamentos',
        'Principal Amount ($)': 'Valor Principal ($)',
        'Time Period (years)': 'Período de Tempo (anos)',
        'Time Period (months)': 'Período de Tempo (meses)',
        'Current Balance ($)': 'Saldo Atual ($)',
        'Minimum Payment ($)': 'Pagamento Mínimo ($)',
        'Extra Payment ($)': 'Pagamento Extra ($)',
        'APR (%)': 'TAC (%)',
        'Amount ($)': 'Valor ($)',
        'Rate (%)': 'Taxa (%)',
        'Term (years)': 'Prazo (anos)',
        'Term (months)': 'Prazo (meses)',
        
        # Common outputs
        'Total Monthly Payment': 'Pagamento Mensal Total',
        'Monthly Payment': 'Pagamento Mensal',
        'Total Interest': 'Juros Totais',
        'Total Payment': 'Pagamento Total',
        'Total Cost': 'Custo Total',
        'Principal & Interest': 'Principal e Juros',
        'Months Saved': 'Meses Economizados',
        'Total Interest Paid': 'Juros Total Pago',
        'Years to Payoff': 'Anos para Quitar',
        'Interest Saved': 'Juros Economizados',
        'Payoff Date': 'Data de Quitação',
        'Total Payments': 'Pagamentos Totais',
        'Property Tax': 'Imposto Predial',
        'Home Insurance': 'Seguro Residencial',
        'PMI': 'Seguro Hipotecário',
        'Result': 'Resultado',
        
        # Default values
        'Enter loan details above': 'Digite os detalhes do empréstimo acima',
        'Enter values above': 'Digite os valores acima',
        'Calculate': 'Calcular',
    },
    'fr': {
        # Common inputs
        'Loan Amount ($)': 'Montant du Prêt ($)',
        'Interest Rate (%)': 'Taux d\'Intérêt (%)',
        'Loan Term (years)': 'Durée du Prêt (années)',
        'Down Payment ($)': 'Mise de Fonds ($)',
        'Extra Monthly Payment ($)': 'Paiement Supplémentaire Mensuel ($)',
        'Annual Property Tax ($)': 'Taxe Foncière Annuelle ($)',
        'Annual Home Insurance ($)': 'Assurance Habitation Annuelle ($)',
        'Monthly Payment ($)': 'Paiement Mensuel ($)',
        'Payment Frequency': 'Fréquence de Paiement',
        'Loan Type': 'Type de Prêt',
        'Credit Score': 'Score de Crédit',
        'Payment Amount ($)': 'Montant du Paiement ($)',
        'Number of Payments': 'Nombre de Paiements',
        'Principal Amount ($)': 'Montant Principal ($)',
        'Time Period (years)': 'Période de Temps (années)',
        'Time Period (months)': 'Période de Temps (mois)',
        'Current Balance ($)': 'Solde Actuel ($)',
        'Minimum Payment ($)': 'Paiement Minimum ($)',
        'Extra Payment ($)': 'Paiement Supplémentaire ($)',
        'APR (%)': 'TEG (%)',
        'Amount ($)': 'Montant ($)',
        'Rate (%)': 'Taux (%)',
        'Term (years)': 'Durée (années)',
        'Term (months)': 'Durée (mois)',
        
        # Common outputs
        'Total Monthly Payment': 'Paiement Mensuel Total',
        'Monthly Payment': 'Paiement Mensuel',
        'Total Interest': 'Intérêts Totaux',
        'Total Payment': 'Paiement Total',
        'Total Cost': 'Coût Total',
        'Principal & Interest': 'Principal et Intérêts',
        'Months Saved': 'Mois Économisés',
        'Total Interest Paid': 'Intérêts Total Payé',
        'Years to Payoff': 'Années pour Rembourser',
        'Interest Saved': 'Intérêts Économisés',
        'Payoff Date': 'Date de Remboursement',
        'Total Payments': 'Paiements Totaux',
        'Property Tax': 'Taxe Foncière',
        'Home Insurance': 'Assurance Habitation',
        'PMI': 'Assurance Hypothécaire',
        'Result': 'Résultat',
        
        # Default values
        'Enter loan details above': 'Entrez les détails du prêt ci-dessus',
        'Enter values above': 'Entrez les valeurs ci-dessus',
        'Calculate': 'Calculer',
    }
}

def translate_label(label, lang):
    """Translate a label to the target language."""
    if lang not in TRANSLATIONS:
        return label
    return TRANSLATIONS[lang].get(label, label)

def translate_calculator_component(component, lang):
    """Translate all labels in a calculator component."""
    if not component:
        return component
    
    # Translate input labels
    if 'inputs' in component:
        for input_field in component['inputs']:
            if 'label' in input_field:
                input_field['label'] = translate_label(input_field['label'], lang)
    
    # Translate output label
    if 'output' in component and 'label' in component['output']:
        component['output']['label'] = translate_label(component['output']['label'], lang)
    
    if 'output' in component and 'default' in component['output']:
        component['output']['default'] = translate_label(component['output']['default'], lang)
    
    # Translate additional outputs
    if 'additionalOutputs' in component:
        for output in component['additionalOutputs']:
            if 'label' in output:
                output['label'] = translate_label(output['label'], lang)
    
    return component

def process_calculator_file(filepath):
    """Process a single calculator JSON file."""
    print(f"\nProcessing: {filepath}")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        modified = False
        
        # Process each language section
        for lang in ['es', 'pt', 'fr']:
            if lang in data and 'calculatorComponent' in data[lang]:
                original = json.dumps(data[lang]['calculatorComponent'], ensure_ascii=False)
                data[lang]['calculatorComponent'] = translate_calculator_component(
                    data[lang]['calculatorComponent'], 
                    lang
                )
                new_content = json.dumps(data[lang]['calculatorComponent'], ensure_ascii=False)
                
                if original != new_content:
                    modified = True
                    print(f"  ✓ Translated {lang} section")
        
        if modified:
            # Write back to file
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"  ✓ File updated")
            return True
        else:
            print(f"  - No changes needed")
            return False
            
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def main():
    """Main function to process all calculator files."""
    content_dir = Path('content/calculators')
    
    if not content_dir.exists():
        print(f"Error: Directory {content_dir} does not exist")
        return
    
    calculator_files = list(content_dir.glob('*.json'))
    print(f"Found {len(calculator_files)} calculator files")
    
    updated_count = 0
    for filepath in sorted(calculator_files):
        if process_calculator_file(filepath):
            updated_count += 1
    
    print(f"\n{'='*60}")
    print(f"Complete! Updated {updated_count}/{len(calculator_files)} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
