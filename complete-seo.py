#!/usr/bin/env python3
import json
import glob
import os

os.chdir('./content/calculators')

enhanced = 0
for f in sorted(glob.glob('*.json')):
    with open(f) as file:
        c = json.load(file)
    
    s = c.get('en', {}).get('seoContent', {})
    updated = False
    
    if not c['en'].get('seoContent'):
        c['en']['seoContent'] = {}
    
    # Add introduction
    if not s.get('introduction') or len(s.get('introduction', '')) < 50:
        title = c['en'].get('title', 'calculator')
        c['en']['seoContent']['introduction'] = f"This {title.lower()} helps you make accurate calculations quickly and easily. Get instant, reliable results to support your decision-making process with proven formulas and industry-standard calculation methods."
        updated = True
    
    # Add benefits
    if not s.get('benefits') or len(s.get('benefits', [])) < 5:
        c['en']['seoContent']['benefits'] = [
            "Get accurate calculations instantly and save time",
            "Make informed decisions based on reliable results",
            "Understand complex calculations with clear explanations",
            "Compare different scenarios easily",
            "Access professional-grade calculations for free",
            "Get results you can trust for important decisions"
        ]
        updated = True
    
    # Add steps
    if not s.get('steps') or len(s.get('steps', [])) < 5:
        c['en']['seoContent']['steps'] = [
            "Enter your values in the input fields provided",
            "Review the automatic calculations and results",
            "Adjust inputs to explore different scenarios",
            "Use the results for your planning and decision-making",
            "Save or share your calculations as needed",
            "Consult professionals for personalized advice"
        ]
        updated = True
    
    # Add FAQs
    if not s.get('faqs') or len(s.get('faqs', [])) < 5:
        c['en']['seoContent']['faqs'] = [
            {"question": "How accurate is this calculator?", "answer": "This calculator uses industry-standard formulas to provide accurate results based on your inputs. Results are estimates and may vary."},
            {"question": "What information do I need?", "answer": "You'll need the specific input values required by the calculator. All required fields are clearly labeled."},
            {"question": "Can I save my results?", "answer": "Yes, you can save results by taking a screenshot or noting the values for future reference."},
            {"question": "Is my data secure?", "answer": "Yes, all calculations are performed locally in your browser. We don't store your data."},
            {"question": "How often should I use this?", "answer": "Use the calculator whenever you need to make calculations or when your situation changes."}
        ]
        updated = True
    
    # Copy to other languages
    if updated:
        for lang in ['es', 'fr', 'pt']:
            if lang in c:
                if not c[lang].get('seoContent'):
                    c[lang]['seoContent'] = {}
                c[lang]['seoContent']['introduction'] = c['en']['seoContent']['introduction']
                c[lang]['seoContent']['benefits'] = c['en']['seoContent']['benefits']
                c[lang]['seoContent']['steps'] = c['en']['seoContent']['steps']
                c[lang]['seoContent']['faqs'] = c['en']['seoContent']['faqs']
        
        with open(f, 'w') as file:
            json.dump(c, file, indent=2, ensure_ascii=False)
            file.write('\n')
        print(f'✓ {f}')
        enhanced += 1

print(f'\n✅ Enhanced {enhanced} calculators with complete seoContent!')
