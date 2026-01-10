#!/usr/bin/env python3
"""
Calculator Priority Analysis - Identify High-Traffic Calculators

Analyzes CalculatorSoup sitemap and identifies calculators with highest traffic potential.
"""

import json
from typing import List, Dict, Any
from urllib.parse import urlparse

# High-traffic calculator categories based on search volume
HIGH_TRAFFIC_CATEGORIES = {
    'financial': [
        'mortgage', 'loan', 'credit', 'retirement', 'savings',
        'investment', 'tax', 'salary', 'paycheck', 'budget'
    ],
    'health': [
        'bmi', 'calorie', 'pregnancy', 'body', 'weight', 'height'
    ],
    'math': [
        'percentage', 'fraction', 'ratio', 'average', 'mean'
    ],
    'time': [
        'age', 'date', 'time', 'birthday', 'calendar'
    ],
    'business': [
        'sales', 'markup', 'profit', 'margin', 'break'
    ],
    'construction': [
        'concrete', 'paint', 'area', 'volume', 'square'
    ]
}

def analyze_calculator_urls(urls: List[str]) -> Dict[str, Any]:
    """Analyze calculator URLs and rank by traffic potential."""

    calculators = []

    for url in urls:
        path = urlparse(url).path.lower()

        # Skip non-calculator pages
        if '/calculators/' not in path:
            continue

        # Extract calculator name from URL
        parts = path.split('/calculators/')[-1].split('/')
        if len(parts) < 2:
            continue

        category = parts[0]
        calc_name = parts[1].replace('.php', '').replace('-calculator', '').replace('_', '-')

        # Calculate traffic score based on keywords
        score = calculate_traffic_score(calc_name, category)

        if score > 0:  # Only include calculators with traffic potential
            calculators.append({
                'url': url,
                'name': calc_name.replace('-', ' ').title(),
                'slug': calc_name,
                'category': category,
                'traffic_score': score,
                'search_terms': get_search_terms(calc_name)
            })

    # Sort by traffic score (highest first)
    calculators.sort(key=lambda x: x['traffic_score'], reverse=True)

    return {
        'total_calculators': len(calculators),
        'top_calculators': calculators[:25],  # Top 25 for initial build
        'categories': list(set(calc['category'] for calc in calculators))
    }

def calculate_traffic_score(calc_name: str, category: str) -> int:
    """Calculate traffic potential score for a calculator."""

    score = 0
    name_lower = calc_name.lower()

    # Base score by category
    category_scores = {
        'financial': 100,
        'health': 80,
        'math': 60,
        'time': 50,
        'business': 70,
        'construction': 40,
        'algebra': 30,
        'trigonometry': 20
    }
    score += category_scores.get(category, 10)

    # Keyword bonus points
    high_value_keywords = [
        'mortgage', 'loan', 'credit', 'retirement', 'savings', 'investment',
        'tax', 'salary', 'bmi', 'calorie', 'pregnancy', 'age', 'date',
        'percentage', 'fraction', 'concrete', 'paint', 'sales', 'profit'
    ]

    for keyword in high_value_keywords:
        if keyword in name_lower:
            score += 50

    # Length penalty (shorter names are better)
    if len(calc_name) > 20:
        score -= 10

    return max(score, 0)

def get_search_terms(calc_name: str) -> List[str]:
    """Generate potential search terms for a calculator."""

    terms = []
    name_clean = calc_name.replace('-', ' ')

    # Basic terms
    terms.extend([name_clean, f"{name_clean} calculator"])

    # Add common variations
    if 'percentage' in name_clean:
        terms.extend(['percent calculator', 'percentage increase', 'percentage decrease'])
    elif 'mortgage' in name_clean:
        terms.extend(['home loan calculator', 'monthly mortgage payment'])
    elif 'bmi' in name_clean:
        terms.extend(['body mass index', 'bmi calculator'])
    elif 'age' in name_clean:
        terms.extend(['how old am i', 'age in days'])

    return list(set(terms))  # Remove duplicates

def save_calculator_list(analysis: Dict[str, Any], filename: str = 'calculator_analysis.json'):
    """Save calculator analysis to JSON file."""

    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(analysis, f, indent=2, ensure_ascii=False)

    print(f"✅ Saved calculator analysis to {filename}")
    print(f"📊 Found {analysis['total_calculators']} calculators")
    print(f"🎯 Top 25 high-traffic calculators identified")

def main():
    """Main analysis function."""

    # This would normally fetch from sitemap, but for demo we'll use sample data
    # In real implementation, this would parse the actual sitemap

    sample_urls = [
        "https://www.calculatorsoup.com/calculators/financial/mortgage-calculator.php",
        "https://www.calculatorsoup.com/calculators/financial/loan-calculator.php",
        "https://www.calculatorsoup.com/calculators/financial/savings-calculator.php",
        "https://www.calculatorsoup.com/calculators/financial/credit-card-payoff-calculator.php",
        "https://www.calculatorsoup.com/calculators/health/bmi-calculator.php",
        "https://www.calculatorsoup.com/calculators/health/calorie-calculator.php",
        "https://www.calculatorsoup.com/calculators/math/percentage-calculator.php",
        "https://www.calculatorsoup.com/calculators/time/age-calculator.php",
        "https://www.calculatorsoup.com/calculators/financial/tax-calculator.php",
        "https://www.calculatorsoup.com/calculators/financial/retirement-calculator.php",
        "https://www.calculatorsoup.com/calculators/construction/concrete-calculator.php",
        "https://www.calculatorsoup.com/calculators/financial/sales-tax-calculator.php"
    ]

    analysis = analyze_calculator_urls(sample_urls)
    save_calculator_list(analysis)

    # Print top calculators
    print("\n🎯 TOP HIGH-TRAFFIC CALCULATORS:")
    print("-" * 50)
    for i, calc in enumerate(analysis['top_calculators'][:10], 1):
        print(f"{i:2d}. {calc['name']} (Score: {calc['traffic_score']})")
        print(f"    Category: {calc['category']}")
        print(f"    Search terms: {', '.join(calc['search_terms'][:2])}")
        print()

if __name__ == '__main__':
    main()
