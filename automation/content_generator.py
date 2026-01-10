#!/usr/bin/env python3
"""
Calculator Content Generator - Automated Content Creation Pipeline

This script automates the process of:
1. Crawling sitemaps to discover calculator pages
2. Extracting content and form fields from calculator pages
3. Generating expanded, SEO-friendly content (500-700 words)
4. Outputting structured JSON for multi-language deployment

Usage:
    python content_generator.py --sitemap https://www.calculatorsoup.com/sitemap.xml --output /content/en/calculators/
"""

import argparse
import json
import os
import re
import time
from typing import Dict, List, Optional, Any
from urllib.parse import urljoin, urlparse
from xml.etree import ElementTree as ET

import requests
from bs4 import BeautifulSoup
import openai  # For content generation (optional)


class CalculatorContentGenerator:
    """Main class for automated calculator content generation."""

    def __init__(self, api_key: Optional[str] = None):
        """Initialize the content generator.

        Args:
            api_key: OpenAI API key for content generation (optional)
        """
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (compatible; CalculatorContentGenerator/1.0)'
        })
        self.api_key = api_key
        if api_key:
            openai.api_key = api_key

    def parse_sitemap(self, sitemap_url: str) -> List[str]:
        """Parse sitemap XML and extract calculator URLs.

        Args:
            sitemap_url: URL of the sitemap to parse

        Returns:
            List of calculator page URLs
        """
        print(f"Fetching sitemap: {sitemap_url}")

        try:
            response = self.session.get(sitemap_url)
            response.raise_for_status()

            # Parse XML
            root = ET.fromstring(response.content)

            # Extract URLs (handle both sitemap formats)
            urls = []
            for url_elem in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
                url = url_elem.text
                if url and self._is_calculator_url(url):
                    urls.append(url)

            print(f"Found {len(urls)} calculator URLs")
            return urls

        except Exception as e:
            print(f"Error parsing sitemap: {e}")
            return []

    def _is_calculator_url(self, url: str) -> bool:
        """Check if URL is a calculator page.

        Args:
            url: URL to check

        Returns:
            True if URL appears to be a calculator page
        """
        # Customize these patterns based on the target site
        calculator_patterns = [
            '/calculators/',
            '-calculator',
            'calculator-',
            '/calc/'
        ]

        url_lower = url.lower()
        return any(pattern in url_lower for pattern in calculator_patterns)

    def extract_calculator_content(self, url: str) -> Dict[str, Any]:
        """Extract content and form fields from a calculator page.

        Args:
            url: Calculator page URL

        Returns:
            Dictionary containing extracted content
        """
        print(f"Extracting content from: {url}")

        try:
            response = self.session.get(url)
            response.raise_for_status()

            soup = BeautifulSoup(response.content, 'html.parser')

            # Extract basic information
            title = self._extract_title(soup)
            description = self._extract_description(soup)
            form_fields = self._extract_form_fields(soup)

            # Try to extract existing instructions/examples
            existing_instructions = self._extract_instructions(soup)
            existing_examples = self._extract_examples(soup)

            return {
                'url': url,
                'title': title,
                'description': description,
                'form_fields': form_fields,
                'existing_instructions': existing_instructions,
                'existing_examples': existing_examples,
                'raw_html': str(soup)[:1000]  # Keep some raw HTML for reference
            }

        except Exception as e:
            print(f"Error extracting content from {url}: {e}")
            return {'url': url, 'error': str(e)}

    def _extract_title(self, soup: BeautifulSoup) -> str:
        """Extract page title."""
        title_tag = soup.find('title')
        if title_tag:
            return title_tag.get_text().strip()

        h1_tag = soup.find('h1')
        if h1_tag:
            return h1_tag.get_text().strip()

        return "Calculator"

    def _extract_description(self, soup: BeautifulSoup) -> str:
        """Extract page description from meta tags or content."""
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc:
            return meta_desc.get('content', '').strip()

        # Look for description in first paragraph or specific sections
        first_p = soup.find('p')
        if first_p:
            return first_p.get_text().strip()[:300]

        return ""

    def _extract_form_fields(self, soup: BeautifulSoup) -> List[Dict[str, str]]:
        """Extract form input fields and their labels."""
        fields = []

        # Find all input elements
        inputs = soup.find_all('input')

        for input_elem in inputs:
            input_type = input_elem.get('type', 'text')
            input_name = input_elem.get('name', '')
            input_id = input_elem.get('id', '')

            # Try to find associated label
            label_text = ""
            if input_id:
                label = soup.find('label', attrs={'for': input_id})
                if label:
                    label_text = label.get_text().strip()

            # If no label found, look for nearby text
            if not label_text and input_name:
                # Look for text in parent elements
                parent = input_elem.parent
                if parent:
                    label_text = parent.get_text().strip()
                    # Remove the input value if present
                    if input_elem.get('value'):
                        label_text = label_text.replace(input_elem.get('value'), '').strip()

            # Skip submit buttons and hidden fields
            if input_type not in ['submit', 'button', 'hidden']:
                fields.append({
                    'name': input_name or f'field_{len(fields)}',
                    'label': label_text or f'Input Field {len(fields) + 1}',
                    'type': input_type,
                    'id': input_id
                })

        return fields

    def _extract_instructions(self, soup: BeautifulSoup) -> List[str]:
        """Extract existing instructions from the page."""
        instructions = []

        # Look for instruction sections
        instruction_selectors = [
            '.instructions', '.how-to', '.steps',
            '[class*="instruction"]', '[class*="step"]',
            'ol li', 'ul li'
        ]

        for selector in instruction_selectors:
            elements = soup.select(selector)
            for elem in elements:
                text = elem.get_text().strip()
                if len(text) > 10 and text not in instructions:
                    instructions.append(text)

        return instructions[:10]  # Limit to first 10 instructions

    def _extract_examples(self, soup: BeautifulSoup) -> List[Dict[str, Any]]:
        """Extract existing examples from the page."""
        examples = []

        # Look for example sections
        example_selectors = [
            '.example', '.examples', '[class*="example"]',
            'table tr', '.calculation'
        ]

        for selector in example_selectors:
            elements = soup.select(selector)
            for elem in elements:
                text = elem.get_text().strip()
                if len(text) > 20:
                    examples.append({
                        'text': text,
                        'type': 'existing'
                    })

        return examples[:5]  # Limit to 5 examples

    def generate_expanded_content(self, extracted_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate expanded, SEO-friendly content from extracted data.

        Args:
            extracted_data: Data extracted from calculator page

        Returns:
            Expanded content dictionary
        """
        print(f"Generating expanded content for: {extracted_data.get('title', 'Unknown')}")

        # Use AI generation if API key is available, otherwise use template-based generation
        if self.api_key:
            return self._generate_with_ai(extracted_data)
        else:
            return self._generate_with_templates(extracted_data)

    def _generate_with_ai(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate content using OpenAI API."""
        try:
            prompt = self._build_ai_prompt(data)

            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=2000,
                temperature=0.7
            )

            ai_content = response.choices[0].message.content

            # Parse AI response into structured format
            return self._parse_ai_response(ai_content, data)

        except Exception as e:
            print(f"AI generation failed: {e}")
            return self._generate_with_templates(data)

    def _build_ai_prompt(self, data: Dict[str, Any]) -> str:
        """Build prompt for AI content generation."""
        title = data.get('title', 'Calculator')
        description = data.get('description', '')
        form_fields = data.get('form_fields', [])

        prompt = f"""
Generate comprehensive content for a calculator web page. Use this extracted data:

Title: {title}
Description: {description}
Form Fields: {json.dumps(form_fields, indent=2)}

Create:
1. SEO-friendly meta description (120-160 characters)
2. Expanded instructions (3-5 detailed steps)
3. 2-3 practical examples with inputs and outputs
4. Additional context and applications

Ensure total word count is 500-700 words.
Output as JSON with this structure:
{{
  "metaDescription": "...",
  "instructions": ["step 1", "step 2", ...],
  "examples": [
    {{"input": {{"field1": "value1"}}, "output": "result description"}},
    ...
  ],
  "applications": "paragraph about when to use this calculator"
}}
"""
        return prompt

    def _parse_ai_response(self, ai_content: str, original_data: Dict[str, Any]) -> Dict[str, Any]:
        """Parse AI response into structured format."""
        try:
            # Try to extract JSON from response
            json_match = re.search(r'\{.*\}', ai_content, re.DOTALL)
            if json_match:
                parsed = json.loads(json_match.group())
                return {
                    'title': original_data.get('title', ''),
                    'metaDescription': parsed.get('metaDescription', ''),
                    'instructions': parsed.get('instructions', []),
                    'examples': parsed.get('examples', []),
                    'applications': parsed.get('applications', ''),
                    'formFields': original_data.get('form_fields', [])
                }
        except:
            pass

        # Fallback to template generation
        return self._generate_with_templates(original_data)

    def _generate_with_templates(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate content using template-based expansion."""
        title = data.get('title', 'Calculator')
        description = data.get('description', '')
        form_fields = data.get('form_fields', [])

        # Generate meta description
        meta_desc = self._generate_meta_description(title, description)

        # Generate expanded instructions
        instructions = self._generate_instructions(form_fields, data.get('existing_instructions', []))

        # Generate examples
        examples = self._generate_examples(form_fields, data.get('existing_examples', []))

        # Generate applications text
        applications = self._generate_applications(title)

        return {
            'title': title,
            'metaDescription': meta_desc,
            'instructions': instructions,
            'examples': examples,
            'applications': applications,
            'formFields': form_fields
        }

    def _generate_meta_description(self, title: str, description: str) -> str:
        """Generate SEO-friendly meta description."""
        if description and len(description) > 50:
            # Truncate and clean existing description
            clean_desc = re.sub(r'[^\w\s.,-]', '', description)
            if len(clean_desc) > 140:
                clean_desc = clean_desc[:137] + "..."
            return clean_desc

        # Generate from title
        base_desc = f"Use our free online {title.lower()} to quickly calculate results. Get accurate calculations with detailed explanations and examples."
        return base_desc[:155] + "..." if len(base_desc) > 155 else base_desc

    def _generate_instructions(self, form_fields: List[Dict], existing: List[str]) -> List[str]:
        """Generate expanded instructions."""
        instructions = []

        # Use existing instructions if available
        if existing:
            for instr in existing[:4]:
                # Expand each instruction to 2-3 sentences
                expanded = self._expand_instruction(instr)
                instructions.append(expanded)
        else:
            # Generate from form fields
            for i, field in enumerate(form_fields[:4]):
                field_name = field.get('label', f'Field {i+1}')
                instr = f"Enter the {field_name.lower()}. This is an important input that affects your calculation results. Make sure to enter accurate values for the best results."
                instructions.append(instr)

        # Add general instruction
        instructions.append("Click the 'Calculate' button to process your inputs. The calculator will instantly display the results along with any additional information or explanations.")

        return instructions

    def _expand_instruction(self, instruction: str) -> str:
        """Expand a single instruction to be more detailed."""
        if len(instruction) > 100:
            return instruction  # Already detailed

        # Add context and detail
        expanded = instruction
        if not instruction.endswith('.'):
            expanded += '.'

        expanded += " This step is crucial for obtaining accurate calculation results. Take your time to enter the correct information."

        return expanded

    def _generate_examples(self, form_fields: List[Dict], existing: List[Dict]) -> List[Dict]:
        """Generate practical examples."""
        examples = []

        # Use existing examples if available
        for existing_example in existing[:3]:
            if 'input' in existing_example or 'text' in existing_example:
                examples.append(existing_example)

        # Generate additional examples if needed
        while len(examples) < 3:
            example = self._generate_example(form_fields, len(examples))
            examples.append(example)

        return examples

    def _generate_example(self, form_fields: List[Dict], index: int) -> Dict[str, Any]:
        """Generate a single example."""
        # Create sample inputs based on field types
        inputs = {}
        for field in form_fields[:3]:  # Use first 3 fields
            field_name = field.get('name', f'field_{len(inputs)}')
            field_type = field.get('type', 'number')

            if field_type == 'number':
                # Generate realistic sample values
                if 'amount' in field_name.lower() or 'price' in field_name.lower():
                    inputs[field_name] = [1000, 5000, 10000][index % 3]
                elif 'rate' in field_name.lower() or 'percent' in field_name.lower():
                    inputs[field_name] = [3.5, 5.0, 7.5][index % 3]
                elif 'month' in field_name.lower() or 'year' in field_name.lower():
                    inputs[field_name] = [12, 24, 36][index % 3]
                else:
                    inputs[field_name] = [10, 25, 50][index % 3]
            else:
                inputs[field_name] = f"Sample {field_name}"

        return {
            'input': inputs,
            'output': f"Calculation result {index + 1}: ${[150.75, 287.50, 412.25][index % 3]} - This demonstrates a typical calculation scenario.",
            'type': 'generated'
        }

    def _generate_applications(self, title: str) -> str:
        """Generate applications text."""
        calculator_type = title.lower().replace(' calculator', '')

        applications_text = f"""
This {calculator_type} is useful in many real-world scenarios. Students can use it to verify homework calculations and understand mathematical concepts. Professionals in finance, engineering, and other technical fields rely on accurate calculations for their work. Homeowners and individuals can make informed decisions by quickly calculating different scenarios.

Beyond basic calculations, this tool helps users understand the relationships between different variables and how changes in one input affect the final result. Whether you're planning a budget, analyzing investment options, or solving complex mathematical problems, having access to reliable calculation tools is essential in today's data-driven world.

The calculator's step-by-step approach also makes it an excellent educational tool, helping users learn the underlying mathematical principles while getting practical results they can apply immediately.
"""

        return applications_text.strip()

    def generate_slug(self, title: str) -> str:
        """Generate URL slug from title."""
        # Convert to lowercase, replace spaces with hyphens, remove special chars
        slug = re.sub(r'[^\w\s-]', '', title.lower())
        slug = re.sub(r'[-\s]+', '-', slug).strip('-')
        return slug

    def save_calculator_json(self, calculator_data: Dict[str, Any], output_dir: str):
        """Save calculator data as JSON file."""
        title = calculator_data.get('title', 'Unknown Calculator')
        slug = self.generate_slug(title)

        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)

        # Save JSON file
        filename = f"{slug}.json"
        filepath = os.path.join(output_dir, filename)

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(calculator_data, f, indent=2, ensure_ascii=False)

        print(f"Saved: {filepath}")

    def process_sitemap(self, sitemap_url: str, output_dir: str, limit: Optional[int] = None):
        """Complete pipeline: sitemap → content extraction → generation → JSON output."""
        print("🚀 Starting calculator content generation pipeline")
        print(f"📍 Sitemap: {sitemap_url}")
        print(f"📁 Output: {output_dir}")

        # Step 1: Parse sitemap
        calculator_urls = self.parse_sitemap(sitemap_url)
        if not calculator_urls:
            print("❌ No calculator URLs found")
            return

        # Limit processing if specified
        if limit:
            calculator_urls = calculator_urls[:limit]

        print(f"📊 Processing {len(calculator_urls)} calculators")

        # Step 2-4: Process each calculator
        successful = 0
        for i, url in enumerate(calculator_urls, 1):
            print(f"\n🔄 Processing {i}/{len(calculator_urls)}: {url}")

            try:
                # Extract content
                extracted = self.extract_calculator_content(url)

                if 'error' in extracted:
                    print(f"❌ Extraction failed: {extracted['error']}")
                    continue

                # Generate expanded content
                expanded = self.generate_expanded_content(extracted)

                # Save JSON
                self.save_calculator_json(expanded, output_dir)

                successful += 1

                # Rate limiting
                time.sleep(1)

            except Exception as e:
                print(f"❌ Processing failed for {url}: {e}")

        print(f"\n✅ Pipeline complete! Successfully processed {successful}/{len(calculator_urls)} calculators")


def main():
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(description="Generate calculator content from sitemaps")
    parser.add_argument('--sitemap', required=True, help='Sitemap URL to process')
    parser.add_argument('--output', required=True, help='Output directory for JSON files')
    parser.add_argument('--limit', type=int, help='Limit number of calculators to process')
    parser.add_argument('--openai-key', help='OpenAI API key for AI-powered content generation')

    args = parser.parse_args()

    # Initialize generator
    generator = CalculatorContentGenerator(api_key=args.openai_key)

    # Run pipeline
    generator.process_sitemap(args.sitemap, args.output, args.limit)


if __name__ == '__main__':
    main()
