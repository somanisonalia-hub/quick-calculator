#!/usr/bin/env python3
import re

file_path = '/Users/asomani16/Repository/quick-calculator-v3/src/lib/categoryUtils.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Translation additions
translations_de_nl = {
    "formulaWorks": ("Wie die Formel funktioniert", "Hoe de Formule Werkt"),
    "understandingYourResults": ("Ihre Ergebnisse Verstehen", "Uw Resultaten Begrijpen"),
    "exampleScenarios": ("Beispielszenarien", "Voorbeeldscenario's"),
    "popularSearchTerms": ("Beliebte Suchbegriffe", "Populaire Zoektermen"),
    "relatedTools": ("Verwandte Tools", "Gerelateerde Hulpmiddelen"),
    "getStartedToday": ("Beginnen Sie Heute", "Begin Vandaag"),
    "accurateCalculations": ("Genaue Berechnungen", "Nauwkeurige Berekeningen"),
    "timeSaving": ("Zeitsparend", "Tijdbesparing"),
    "educationalValue": ("Pädagogischer Wert", "Educatieve Waarde"),
    "seoOptimized": ("SEO-optimiert", "SEO-geoptimaliseerd"),
    "decisionSupport": ("Entscheidungsunterstützung", "Beslissingsondersteuning"),
    "ourCalculatorConsiders": ("Unser Rechner berücksichtigt", "Onze rekenmachine overweegt"),
    "keyInputs": ("Schlüsseleingaben, um genaue Ergebnisse zu liefern:", "sleutelingangen om nauwkeurige resultaten te leveren:"),
    "theseFactors": ("Diese Faktoren werden sorgfältig berücksichtigt, um sicherzustellen, dass Ihre Berechnungen Bedingungen der realen Welt widerspiegeln.", "Deze factoren worden zorgvuldig overwogen om ervoor te zorgen dat uw berekeningen real-world omstandigheden weerspiegelen."),
    "mathematicalFormula": ("Diese mathematische Formel gewährleistet genaue Ergebnisse basierend auf etablierten", "Deze wiskundige formule garandeert nauwkeurige resultaten op basis van gevestigde"),
    "principles": ("Prinzipien und Industriestandards.", "principes en industrienormen."),
    "primaryResult": ("Primäres Ergebnis:", "Primair Resultaat:"),
    "yourMainResult": ("Ihr Hauptergebnis wird angezeigt in", "Uw hoofdresultaat wordt weergegeven in"),
    "format": ("Format zur einfachen Interpretation.", "formaat voor gemakkelijke interpretatie."),
    "additionalDetails": ("Zusätzliche Details:", "Aanvullende Details:"),
    "providesDetailedInfo": ("Bietet detaillierte Aufschlüsselungsinformationen", "Biedt gedetailleerde uitsplitsingsinformatie"),
    "peopleFrequentlySearch": ("Menschen suchen häufig nach verwandten Begriffen, wenn sie nach", "Mensen zoeken frequent naar deze gerelateerde termen wanneer ze zoeken naar"),
    "ourCalculatorCovers": ("Unser Rechner deckt alle diese Suchanfragen und mehr ab und bietet umfassende", "Onze rekenmachine dekt al deze zoekopdrachten en meer af en biedt uitgebreide"),
    "capabilities": ("Fähigkeiten.", "mogelijkheden."),
    "youMayAlsoFind": ("Sie könnten auch diese verwandten Rechner hilfreich finden:", "U kunt deze gerelateerde rekenmachines ook nuttig vinden:"),
    "readyToUse": ("Bereit, unseren", "Klaar om onze"),
    "providesClarity": ("bietet Klarheit und genaue Berechnungen, um Ihnen fundierten Entscheidungen zu helfen.", "biedt duidelijkheid en nauwkeurige berekeningen om u weloverwogen beslissingen te helpen nemen."),
    "tryNow": ("Versuchen", "Probeer"),
    "now": ("Jetzt", "Nu"),
    "perfectFor": ("Perfekt für", "Perfect voor"),
    "andMore": ("und mehr!", "en nog veel meer!"),
}

updated_count = 0
for key, (de_text, nl_text) in translations_de_nl.items():
    # Find pattern: key: { en: '...', es: '...', pt: '...', fr: '...' }
    pattern = rf"(\s+{key}:\s*{{\s*en:\s*'[^']*',\s*es:\s*'[^']*',\s*pt:\s*'[^']*',\s*fr:\s*'[^']*')(\s*}})"
    
    if re.search(pattern, content):
        # Replace with version including de and nl
        replacement = rf"\1, de: '{de_text}', nl: '{nl_text}'\2"
        new_content = re.sub(pattern, replacement, content)
        if new_content != content:
            content = new_content
            updated_count += 1
            print(f"✓ Updated: {key}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✓ Successfully updated {updated_count} translation keys!")
