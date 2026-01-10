#!/usr/bin/env python3
"""
Extract Calculators from CalculatorSoup Sitemap

Parses the sitemap.xml and extracts calculator URLs, prioritizing by traffic potential.
"""

import xml.etree.ElementTree as ET
import requests
import json
from urllib.parse import urlparse
from typing import List, Dict, Any

# High-value calculator keywords (based on search volume)
HIGH_VALUE_KEYWORDS = [
    'mortgage', 'loan', 'credit', 'retirement', 'savings', 'investment',
    'tax', 'salary', 'paycheck', 'budget', 'bmi', 'calorie', 'pregnancy',
    'body', 'weight', 'height', 'percentage', 'fraction', 'age', 'date',
    'concrete', 'paint', 'sales', 'profit', 'markup', 'break', 'area'
]

def fetch_sitemap(url: str) -> str:
    """Fetch sitemap XML content."""
    print(f"📡 Fetching sitemap: {url}")
    response = requests.get(url)
    response.raise_for_status()
    return response.text

def parse_sitemap(xml_content: str) -> List[str]:
    """Parse sitemap XML and extract URLs."""
    root = ET.fromstring(xml_content)
    urls = []

    for url_elem in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
        if url_elem.text:
            urls.append(url_elem.text)

    return urls

def is_calculator_url(url: str) -> bool:
    """Check if URL is a calculator page."""
    path = urlparse(url).path.lower()
    return '/calculators/' in path and path.endswith('.php')

def extract_calculator_info(url: str) -> Dict[str, Any]:
    """Extract calculator information from URL."""
    path = urlparse(url).path
    parts = path.strip('/').split('/')

    if len(parts) >= 3 and parts[0] == 'calculators':
        category = parts[1]
        filename = parts[2].replace('.php', '')

        # Convert filename to readable name
        name = filename.replace('-calculator', '').replace('-', ' ').title()

        return {
            'url': url,
            'name': name,
            'slug': filename,
            'category': category,
            'filename': filename
        }

    return None

def calculate_traffic_score(calculator: Dict[str, Any]) -> int:
    """Calculate traffic potential score."""
    score = 0
    name_lower = calculator['name'].lower()
    slug_lower = calculator['slug'].lower()
    category = calculator['category']

    # Category base scores
    category_scores = {
        'financial': 100,
        'health': 80,
        'math': 60,
        'time': 50,
        'business': 70,
        'construction': 40,
        'algebra': 30,
        'trigonometry': 20,
        'chemistry': 25,
        'geometry': 35
    }
    score += category_scores.get(category, 10)

    # Keyword bonus
    for keyword in HIGH_VALUE_KEYWORDS:
        if keyword in name_lower or keyword in slug_lower:
            score += 30

    # Specific high-value calculators
    high_value_calcs = [
        'mortgage', 'loan', 'credit', 'retirement', 'savings',
        'bmi', 'calorie', 'tax', 'salary', 'percentage', 'age'
    ]

    for calc in high_value_calcs:
        if calc in slug_lower:
            score += 100

    return score

def get_related_calculators(calculator: Dict[str, Any]) -> List[Dict[str, str]]:
    """Get related calculators for cross-linking."""
    category = calculator['category']
    slug = calculator['slug']

    related = []

    # Financial calculators
    if category == 'financial':
        if 'mortgage' in slug:
            related.extend([
                {'name': 'Loan Calculator', 'slug': 'loan-calculator'},
                {'name': 'Car Payment Calculator', 'slug': 'car-payment-calculator'}
            ])
        elif 'loan' in slug:
            related.extend([
                {'name': 'Mortgage Calculator', 'slug': 'mortgage-calculator'},
                {'name': 'Credit Card Calculator', 'slug': 'credit-card-calculator'}
            ])
        elif 'credit' in slug:
            related.extend([
                {'name': 'Loan Calculator', 'slug': 'loan-calculator'},
                {'name': 'Savings Calculator', 'slug': 'savings-calculator'}
            ])
        elif 'retirement' in slug or 'savings' in slug:
            related.extend([
                {'name': 'Mortgage Calculator', 'slug': 'mortgage-calculator'},
                {'name': 'Tax Calculator', 'slug': 'tax-calculator'}
            ])

    # Health calculators
    elif category == 'health':
        if 'bmi' in slug or 'calorie' in slug:
            related.extend([
                {'name': 'BMI Calculator', 'slug': 'bmi-calculator'},
                {'name': 'Calorie Calculator', 'slug': 'calorie-calculator'}
            ])

    # Math calculators
    elif category == 'math':
        if 'percentage' in slug:
            related.extend([
                {'name': 'Loan Calculator', 'slug': 'loan-calculator'},
                {'name': 'Savings Calculator', 'slug': 'savings-calculator'}
            ])

    # Time calculators
    elif category == 'time':
        if 'age' in slug:
            related.extend([
                {'name': 'BMI Calculator', 'slug': 'bmi-calculator'},
                {'name': 'Tip Calculator', 'slug': 'tip-calculator'}
            ])

    return related[:2]  # Limit to 2 related calculators

def main():
    """Main extraction function."""
    sitemap_url = "https://www.calculatorsoup.com/sitemap.xml"

    try:
        # Fetch and parse sitemap
        xml_content = fetch_sitemap(sitemap_url)
        all_urls = parse_sitemap(xml_content)

        print(f"📊 Found {len(all_urls)} total URLs in sitemap")

        # Extract calculator URLs
        calculator_urls = [url for url in all_urls if is_calculator_url(url)]
        print(f"🧮 Found {len(calculator_urls)} calculator URLs")

        # Process calculators
        calculators = []
        for url in calculator_urls:
            info = extract_calculator_info(url)
            if info:
                info['traffic_score'] = calculate_traffic_score(info)
                info['related_calculators'] = get_related_calculators(info)
                calculators.append(info)

        # Sort by traffic score
        calculators.sort(key=lambda x: x['traffic_score'], reverse=True)

        # Create analysis
        analysis = {
            'total_calculators': len(calculators),
            'top_calculators': calculators[:30],  # Top 30 for comprehensive build
            'categories': list(set(calc['category'] for calc in calculators)),
            'high_traffic_count': len([c for c in calculators if c['traffic_score'] > 50])
        }

        # Save analysis
        with open('calculator_analysis.json', 'w', encoding='utf-8') as f:
            json.dump(analysis, f, indent=2, ensure_ascii=False)

        # Print summary
        print(f"\n✅ Analysis complete!")
        print(f"📊 Total calculators: {len(calculators)}")
        print(f"🎯 High-traffic calculators: {analysis['high_traffic_count']}")
        print(f"📁 Categories: {', '.join(analysis['categories'])}")

        print(f"\n🎯 TOP 10 HIGH-TRAFFIC CALCULATORS:")
        print("-" * 50)
        for i, calc in enumerate(calculators[:10], 1):
            print(f"{i}. {calc['name']}")
            print(f"   Category: {calc['category']}")
            print(f"   Traffic Score: {calc['traffic_score']}")
            print(f"   Related: {len(calc['related_calculators'])} calculators")
            print()

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
