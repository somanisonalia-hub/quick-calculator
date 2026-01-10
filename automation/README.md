# Calculator Content Automation Pipeline

This automation system crawls calculator websites, extracts content, generates expanded SEO-friendly descriptions, and translates everything into multiple languages - ready for your multi-language calculator site.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd automation
pip install -r requirements.txt
```

### 2. Run the Complete Pipeline
```bash
# Basic usage (English only)
python run_pipeline.py --sitemap https://www.calculatorsoup.com/sitemap.xml --limit 5

# With AI content generation and translations
export OPENAI_API_KEY=your_openai_key
python run_pipeline.py --sitemap https://www.calculatorsoup.com/sitemap.xml --ai --languages es,fr,de
```

### 3. Update Your Application
```bash
cd ..
npm run build
```

## 📋 Pipeline Overview

```
Sitemap URL → Content Extraction → SEO Generation → Translation → JSON Output
     ↓              ↓                    ↓              ↓          ↓
 Calculator   Extract title,          Expand to      Translate    Save as
 Discovery    description, form       500-700 words  to 10+       modular
             fields, instructions     with examples   languages    JSON files
```

## 🛠️ Individual Scripts

### Content Generator (`content_generator.py`)
Extracts and generates calculator content from web pages.

```bash
# Generate English content only
python content_generator.py --sitemap https://example.com/sitemap.xml --output ../content/en/calculators/

# With AI enhancement
python content_generator.py --sitemap https://example.com/sitemap.xml --output ../content/en/calculators/ --openai-key your_key
```

### Content Translator (`translate_content.py`)
Translates English JSON files to multiple languages.

```bash
# Using Google Translate (free)
python translate_content.py --input ../content/en/calculators/ --output ../content/ --languages es,fr,de

# Using DeepL (premium, higher quality)
export DEEPL_API_KEY=your_deepl_key
python translate_content.py --input ../content/en/calculators/ --output ../content/ --languages es,fr,de --service deepl
```

### Full Pipeline (`run_pipeline.py`)
Orchestrates the complete process from crawling to translation.

## 🔧 Configuration

### API Keys (Optional)

**OpenAI API Key** - For AI-powered content generation:
```bash
export OPENAI_API_KEY=sk-your-openai-api-key
```

**DeepL API Key** - For premium translations:
```bash
export DEEPL_API_KEY=your-deepl-api-key
```

### Supported Languages
- `es` - Spanish
- `fr` - French
- `de` - German
- `it` - Italian
- `pt` - Portuguese
- `ja` - Japanese
- `ko` - Korean
- `zh` - Chinese
- `ru` - Russian

## 📊 Output Structure

The pipeline generates content in this modular structure:

```
content/
├── en/
│   ├── calculators/
│   │   ├── addition-calculator.json
│   │   ├── loan-calculator.json
│   │   └── bmi-calculator.json
│   ├── categories/
│   │   ├── math.json
│   │   ├── financial.json
│   │   └── health.json
│   ├── labels.json
│   └── homepage.json
├── es/
│   ├── calculators/
│   │   ├── addition-calculator.json
│   │   └── loan-calculator.json
│   └── labels.json
└── fr/
    └── [translated content...]
```

## 📄 JSON Schema

Each calculator JSON follows this structure:

```json
{
  "title": "Loan Calculator",
  "metaDescription": "Plan your personal or business loans efficiently...",
  "instructions": [
    "Enter the loan amount. This is the total money you plan to borrow...",
    "Enter the interest rate. This is the annual percentage rate...",
    "Enter the loan term in months...",
    "Click 'Calculate' to see your monthly payment..."
  ],
  "examples": [
    {
      "input": { "amount": 10000, "rate": 5, "term": 24 },
      "output": "Monthly Payment: $438.71 — this includes principal and interest over 24 months."
    }
  ],
  "applications": "This calculator is useful for personal loans, car loans...",
  "formFields": [
    { "name": "loanAmount", "label": "Loan Amount", "type": "number" }
  ]
}
```

## 🎯 Content Quality Features

### AI-Enhanced Generation (Optional)
- Uses GPT-3.5-turbo for natural, comprehensive content
- Generates contextual examples and applications
- Ensures 500-700 word count for AdSense compliance

### Template-Based Generation (Default)
- Fast, reliable content expansion
- Template-driven approach for consistency
- No API costs or rate limits

### SEO Optimization
- Meta descriptions: 120-160 characters
- Comprehensive instructions with context
- Practical examples with real values
- Application descriptions for search visibility

## 🔍 Sitemap Compatibility

The system works with various sitemap formats:
- Standard XML sitemaps
- Calculator-heavy sites like CalculatorSoup, Omni Calculator
- Custom sitemaps with calculator URLs

### URL Pattern Recognition
Automatically identifies calculator pages by checking for:
- `/calculators/` paths
- `-calculator` or `calculator-` in URLs
- `/calc/` paths

## ⚡ Performance & Scaling

- **Batch Processing**: Process multiple calculators efficiently
- **Rate Limiting**: Built-in delays to respect website policies
- **Error Handling**: Continues processing even if individual calculators fail
- **Resume Capability**: Can restart from interrupted runs

## 🚨 Important Notes

### Rate Limiting
- Respects website crawl policies
- Built-in delays between requests
- Can be configured for different rates

### Content Quality
- AI-generated content should be reviewed for accuracy
- Template content is more predictable but less creative
- Always validate calculations and examples

### API Costs
- OpenAI: ~$0.02 per calculator for content generation
- DeepL: Pay-per-character pricing
- Google Translate: Free (with usage limits)

### Legal Considerations
- Ensure compliance with website terms of service
- Content extraction should be for legitimate purposes
- Respect robots.txt and crawl delays

## 🐛 Troubleshooting

### Common Issues

**Module Import Errors**
```bash
pip install -r requirements.txt
```

**OpenAI API Errors**
```bash
export OPENAI_API_KEY=your_valid_key
```

**Sitemap Access Denied**
- Check if the sitemap is publicly accessible
- Some sites block automated access

**Translation Quality Issues**
- Switch to DeepL for higher quality translations
- Review and edit translated content manually

## 📈 Advanced Usage

### Custom Content Templates
Modify the template generation in `content_generator.py` for specific calculator types.

### Custom Extractors
Extend the HTML parsing in `_extract_calculator_content()` for different website structures.

### Integration with Build Process
Add the pipeline to your CI/CD workflow for automatic content updates.

---

**Ready to scale your calculator site?** Run the pipeline and watch your content library grow! 🎯📊
