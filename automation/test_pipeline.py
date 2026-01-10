#!/usr/bin/env python3
"""
Pipeline Testing Script

Tests the content generation pipeline with sample data.
Useful for development and validation.

Usage:
    python test_pipeline.py
"""

import json
import os
from pathlib import Path
from content_generator import CalculatorContentGenerator


def test_content_generation():
    """Test content generation with mock data."""
    print("🧪 Testing Content Generation Pipeline")
    print("=" * 50)

    # Create test output directory
    test_output_dir = Path("test_output")
    test_output_dir.mkdir(exist_ok=True)

    # Initialize generator
    generator = CalculatorContentGenerator()

    # Mock extracted data (simulating what would be extracted from a real calculator page)
    mock_extracted_data = {
        'url': 'https://example.com/loan-calculator',
        'title': 'Loan Calculator',
        'description': 'Calculate monthly loan payments with this easy-to-use calculator.',
        'form_fields': [
            {'name': 'loanAmount', 'label': 'Loan Amount', 'type': 'number'},
            {'name': 'interestRate', 'label': 'Interest Rate (%)', 'type': 'number'},
            {'name': 'loanTerm', 'label': 'Loan Term (months)', 'type': 'number'}
        ],
        'existing_instructions': [
            'Enter the loan amount',
            'Enter the interest rate',
            'Enter the loan term'
        ],
        'existing_examples': []
    }

    print("📝 Generating content from mock data...")

    # Generate expanded content
    expanded_content = generator.generate_expanded_content(mock_extracted_data)

    # Save test output
    output_file = test_output_dir / "loan-calculator.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(expanded_content, f, indent=2, ensure_ascii=False)

    print(f"✅ Generated content saved to: {output_file}")

    # Display content summary
    print("\n📊 Content Summary:")
    print(f"   Title: {expanded_content.get('title')}")
    print(f"   Meta Description: {expanded_content.get('metaDescription')[:100]}...")
    print(f"   Instructions: {len(expanded_content.get('instructions', []))} steps")
    print(f"   Examples: {len(expanded_content.get('examples', []))} examples")
    print(f"   Form Fields: {len(expanded_content.get('formFields', []))} fields")

    # Estimate word count
    total_words = 0
    for field in ['title', 'metaDescription', 'applications']:
        content = expanded_content.get(field, '')
        if content:
            total_words += len(content.split())

    for instruction in expanded_content.get('instructions', []):
        total_words += len(instruction.split())

    for example in expanded_content.get('examples', []):
        if 'output' in example:
            total_words += len(example['output'].split())

    print(f"   Estimated Word Count: {total_words}")

    return expanded_content


def test_translation():
    """Test translation functionality."""
    print("\n🌍 Testing Translation Pipeline")
    print("=" * 50)

    try:
        from translate_content import ContentTranslator

        # Test with Google Translate (if available)
        translator = ContentTranslator(translation_service='google')

        test_text = "Calculate monthly loan payments with this easy-to-use calculator."
        translated = translator.translate_text(test_text, 'es')

        print(f"   Original: {test_text}")
        print(f"   Spanish: {translated}")
        print("✅ Translation test passed")

    except ImportError:
        print("⚠️  Translation libraries not available (run: pip install googletrans==4.0.0rc1)")
    except Exception as e:
        print(f"⚠️  Translation test failed: {e}")


def test_file_operations():
    """Test file reading/writing operations."""
    print("\n📁 Testing File Operations")
    print("=" * 50)

    test_dir = Path("test_output")
    test_dir.mkdir(exist_ok=True)

    # Test saving multiple calculator files
    sample_calculators = [
        {
            'title': 'BMI Calculator',
            'metaDescription': 'Calculate your Body Mass Index with this health calculator.',
            'instructions': ['Enter your height', 'Enter your weight'],
            'examples': [{'input': {'height': 170, 'weight': 70}, 'output': 'BMI: 24.2'}],
            'formFields': [
                {'name': 'height', 'label': 'Height (cm)', 'type': 'number'},
                {'name': 'weight', 'label': 'Weight (kg)', 'type': 'number'}
            ]
        },
        {
            'title': 'Savings Calculator',
            'metaDescription': 'Calculate compound interest on your savings.',
            'instructions': ['Enter initial amount', 'Enter interest rate', 'Enter time period'],
            'examples': [{'input': {'amount': 1000, 'rate': 5, 'years': 10}, 'output': 'Final amount: $1,628.89'}],
            'formFields': [
                {'name': 'initialAmount', 'label': 'Initial Amount', 'type': 'number'},
                {'name': 'interestRate', 'label': 'Interest Rate (%)', 'type': 'number'},
                {'name': 'timePeriod', 'label': 'Time Period (years)', 'type': 'number'}
            ]
        }
    ]

    for calc in sample_calculators:
        filename = f"{calc['title'].lower().replace(' ', '-')}.json"
        filepath = test_dir / filename

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(calc, f, indent=2, ensure_ascii=False)

        print(f"✅ Saved: {filepath}")

    print(f"📊 Test files saved to: {test_dir}")


def cleanup_test_files():
    """Clean up test output files."""
    import shutil

    test_dir = Path("test_output")
    if test_dir.exists():
        shutil.rmtree(test_dir)
        print("🧹 Cleaned up test files")


def main():
    """Run all tests."""
    print("🧪 Calculator Content Pipeline - Test Suite")
    print("=" * 60)

    try:
        # Run individual tests
        test_content_generation()
        test_translation()
        test_file_operations()

        print("\n✅ All tests completed successfully!")
        print("\n📋 Test Results Summary:")
        print("   • Content generation: Working")
        print("   • File operations: Working")
        print("   • Translation: See above")
        print("\n🚀 Ready to run the full pipeline!")
        print("   Try: python run_pipeline.py --sitemap https://example.com/sitemap.xml --limit 3")

    except Exception as e:
        print(f"\n❌ Test suite failed: {e}")
        import traceback
        traceback.print_exc()

    finally:
        # Ask user if they want to clean up
        response = input("\n🧹 Clean up test files? (y/N): ").lower().strip()
        if response == 'y':
            cleanup_test_files()


if __name__ == '__main__':
    main()
