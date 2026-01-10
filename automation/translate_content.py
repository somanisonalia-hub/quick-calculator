#!/usr/bin/env python3
"""
Content Translator - Automated Translation Pipeline

This script translates calculator content JSON files to multiple languages
using Google Translate API or DeepL API.

Usage:
    python translate_content.py --input /content/en/calculators/ --output /content/ --languages es,fr,de
"""

import argparse
import json
import os
from typing import Dict, List, Any
import time

try:
    from googletrans import Translator
    GOOGLE_TRANS_AVAILABLE = True
except ImportError:
    GOOGLE_TRANS_AVAILABLE = False

try:
    import deepl
    DEEPL_AVAILABLE = True
except ImportError:
    DEEPL_AVAILABLE = False


class ContentTranslator:
    """Automated content translation for calculator JSON files."""

    def __init__(self, translation_service: str = 'google', api_key: str = None):
        """Initialize translator.

        Args:
            translation_service: 'google' or 'deepl'
            api_key: API key for DeepL (required for DeepL)
        """
        self.service = translation_service
        self.api_key = api_key

        if translation_service == 'deepl' and not DEEPL_AVAILABLE:
            raise ImportError("DeepL library not installed. Run: pip install deepl")
        if translation_service == 'google' and not GOOGLE_TRANS_AVAILABLE:
            raise ImportError("Google Translate library not installed. Run: pip install googletrans==4.0.0rc1")

        if translation_service == 'deepl' and not api_key:
            raise ValueError("DeepL API key required for DeepL translation")

    def translate_text(self, text: str, target_lang: str, source_lang: str = 'en') -> str:
        """Translate text to target language.

        Args:
            text: Text to translate
            target_lang: Target language code (e.g., 'es', 'fr', 'de')
            source_lang: Source language code (default: 'en')

        Returns:
            Translated text
        """
        if not text or not text.strip():
            return text

        try:
            if self.service == 'deepl':
                return self._translate_deepl(text, target_lang, source_lang)
            elif self.service == 'google':
                return self._translate_google(text, target_lang, source_lang)
            else:
                raise ValueError(f"Unsupported translation service: {self.service}")
        except Exception as e:
            print(f"Translation failed: {e}")
            return text  # Return original text on failure

    def _translate_deepl(self, text: str, target_lang: str, source_lang: str = 'en') -> str:
        """Translate using DeepL API."""
        translator = deepl.Translator(self.api_key)

        # Convert language codes to DeepL format
        deepl_target = self._to_deepl_lang(target_lang)
        deepl_source = self._to_deepl_lang(source_lang)

        result = translator.translate_text(
            text,
            target_lang=deepl_target,
            source_lang=deepl_source if source_lang != 'auto' else None
        )

        return result.text

    def _translate_google(self, text: str, target_lang: str, source_lang: str = 'en') -> str:
        """Translate using Google Translate."""
        translator = Translator()

        # Handle rate limiting
        time.sleep(0.5)

        result = translator.translate(text, src=source_lang, dest=target_lang)
        return result.text

    def _to_deepl_lang(self, lang_code: str) -> str:
        """Convert ISO language code to DeepL format."""
        mapping = {
            'en': 'EN-US',
            'es': 'ES',
            'fr': 'FR',
            'de': 'DE',
            'it': 'IT',
            'pt': 'PT-BR',
            'ja': 'JA',
            'ko': 'KO',
            'zh': 'ZH',
            'ru': 'RU'
        }
        return mapping.get(lang_code, lang_code.upper())

    def translate_calculator_content(self, content: Dict[str, Any], target_lang: str) -> Dict[str, Any]:
        """Translate calculator content dictionary.

        Args:
            content: Calculator content dictionary
            target_lang: Target language code

        Returns:
            Translated content dictionary
        """
        translated = content.copy()

        # Translate simple string fields
        string_fields = ['title', 'metaDescription', 'applications']
        for field in string_fields:
            if field in translated and isinstance(translated[field], str):
                translated[field] = self.translate_text(translated[field], target_lang)

        # Translate instructions array
        if 'instructions' in translated and isinstance(translated['instructions'], list):
            translated['instructions'] = [
                self.translate_text(instr, target_lang)
                for instr in translated['instructions']
            ]

        # Translate examples
        if 'examples' in translated and isinstance(translated['examples'], list):
            translated_examples = []
            for example in translated['examples']:
                translated_example = example.copy()

                # Translate output text
                if 'output' in translated_example:
                    translated_example['output'] = self.translate_text(
                        translated_example['output'], target_lang
                    )

                # Note: Input field values are typically numbers and don't need translation
                translated_examples.append(translated_example)

            translated['examples'] = translated_examples

        # Translate form field labels
        if 'formFields' in translated and isinstance(translated['formFields'], list):
            translated_fields = []
            for field in translated['formFields']:
                translated_field = field.copy()
                if 'label' in translated_field:
                    translated_field['label'] = self.translate_text(
                        translated_field['label'], target_lang
                    )
                translated_fields.append(translated_field)

            translated['formFields'] = translated_fields

        return translated

    def translate_file(self, input_file: str, output_file: str, target_lang: str):
        """Translate a single JSON file.

        Args:
            input_file: Path to input JSON file
            output_file: Path to output JSON file
            target_lang: Target language code
        """
        try:
            # Load input file
            with open(input_file, 'r', encoding='utf-8') as f:
                content = json.load(f)

            # Translate content
            translated_content = self.translate_calculator_content(content, target_lang)

            # Create output directory if needed
            os.makedirs(os.path.dirname(output_file), exist_ok=True)

            # Save translated content
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(translated_content, f, indent=2, ensure_ascii=False)

            print(f"✅ Translated: {input_file} → {output_file}")

        except Exception as e:
            print(f"❌ Translation failed for {input_file}: {e}")

    def translate_directory(self, input_dir: str, output_base_dir: str, target_languages: List[str]):
        """Translate all JSON files in a directory to multiple languages.

        Args:
            input_dir: Directory containing English JSON files
            output_base_dir: Base output directory
            target_languages: List of target language codes
        """
        if not os.path.exists(input_dir):
            print(f"❌ Input directory not found: {input_dir}")
            return

        # Find all JSON files
        json_files = []
        for root, dirs, files in os.walk(input_dir):
            for file in files:
                if file.endswith('.json'):
                    json_files.append(os.path.join(root, file))

        print(f"📁 Found {len(json_files)} JSON files to translate")
        print(f"🌍 Target languages: {', '.join(target_languages)}")

        total_translations = 0

        for input_file in json_files:
            # Calculate relative path for output
            rel_path = os.path.relpath(input_file, input_dir)
            filename = os.path.basename(input_file)

            for lang in target_languages:
                # Create output path: /content/{lang}/calculators/filename.json
                output_file = os.path.join(output_base_dir, lang, 'calculators', filename)

                self.translate_file(input_file, output_file, lang)
                total_translations += 1

                # Rate limiting to avoid API limits
                time.sleep(0.1)

        print(f"✅ Translation complete! Created {total_translations} translated files")

    def get_supported_languages(self) -> List[str]:
        """Get list of supported languages."""
        return ['es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ru']


def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(description="Translate calculator content JSON files")
    parser.add_argument('--input', required=True, help='Input directory with English JSON files')
    parser.add_argument('--output', required=True, help='Base output directory for translations')
    parser.add_argument('--languages', required=True, help='Comma-separated target languages (e.g., es,fr,de)')
    parser.add_argument('--service', choices=['google', 'deepl'], default='google', help='Translation service')
    parser.add_argument('--deepl-key', help='DeepL API key (required for DeepL service)')

    args = parser.parse_args()

    target_languages = [lang.strip() for lang in args.languages.split(',')]

    # Initialize translator
    translator = ContentTranslator(
        translation_service=args.service,
        api_key=args.deepl_key if args.service == 'deepl' else None
    )

    # Run translation pipeline
    translator.translate_directory(args.input, args.output, target_languages)


if __name__ == '__main__':
    main()
