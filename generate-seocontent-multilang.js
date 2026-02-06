#!/usr/bin/env node

/**
 * Generate multi-language seoContent for calculators
 * Follows the same pattern as existing calculators (mortgage-calculator.json, sales-tax-calculator.json)
 * Creates seoContent sections for EN, ES, PT, FR, DE
 */

const fs = require('fs');
const path = require('path');

// Template structure for seoContent
const seoContentTemplate = {
  metaTitle: '',
  metaDescription: '',
  keywords: [],
  h1: '',
  introduction: '',
  benefits: [],
  steps: [],
  inputsExplained: [],
  formulaExplanation: '',
  examples: [],
  resultsExplanation: [],
  whoItsFor: '',
  disclaimer: '',
  howDoesWork: '',
  completeGuide: '',
  relatedTools: [],
  faqs: []
};

/**
 * Generate content in multiple languages based on calculator title
 */
function generateSEOContent(calculatorData, language) {
  const title = calculatorData.title || 'Calculator';
  const description = calculatorData.description || 'Use this calculator to get accurate results.';
  const category = calculatorData.category || 'general';
  
  const translations = {
    en: {
      metaTitle: `${title} - Calculate and Analyze Results`,
      metaDescription: `Free ${title.toLowerCase()} to help you calculate and understand your financial information accurately.`,
      keywords: [
        `${title.toLowerCase()}`,
        'calculator',
        'calculate',
        'analysis',
        'financial tools'
      ],
      h1: title,
      introduction: `A ${title.toLowerCase()} is an essential tool that helps you calculate and understand your situation accurately. By entering your specific values, you can quickly obtain accurate results and make informed decisions. This calculator simplifies complex calculations and provides instant, reliable results that you can use for planning, analysis, and decision-making.`,
      benefits: [
        'Make informed decisions with accurate calculations',
        'Understand your financial situation better',
        'Compare different scenarios easily',
        'Save time with instant results',
        'Get reliable calculations in seconds',
        'Plan effectively for your future'
      ],
      steps: [
        'Enter your values in the input fields',
        'Review the calculated results',
        'Adjust values to explore different scenarios',
        'Use the insights for better planning',
        'Save your calculations for reference',
        'Share results with financial advisors if needed'
      ],
      inputsExplained: [
        'Enter all required values accurately for best results',
        'Use realistic numbers based on your actual situation',
        'Adjust inputs to explore different scenarios'
      ],
      formulaExplanation: `This calculator uses industry-standard formulas and proven calculation methods to ensure accuracy. The results are calculated based on your inputs using well-established mathematical principles and best practices.`,
      examples: [
        `Example 1: Basic scenario with typical values`,
        `Example 2: Higher values to see impact of scale`,
        `Example 3: Lower values for conservative estimates`
      ],
      resultsExplanation: [
        'Main Result: The primary calculated value based on your inputs',
        'Secondary Metrics: Additional metrics for comprehensive analysis',
        'Comparisons: How your scenario compares to others'
      ],
      whoItsFor: `This calculator is ideal for anyone who needs to make informed decisions. Whether you're a beginner or expert, this tool provides valuable insights and saves time on calculations.`,
      disclaimer: `Results are estimates based on the information provided. Actual results may vary based on additional factors. For critical decisions, please consult with relevant professionals or experts in the field.`,
      howDoesWork: `This calculator uses proven mathematical formulas to calculate accurate results based on your inputs. It processes your data and applies industry-standard methods to ensure reliable calculations.`,
      completeGuide: `To use this calculator effectively: 1) Enter your values in the input fields, 2) Review the results shown below, 3) Adjust values to explore different scenarios, 4) Use the insights for planning and decision-making, 5) Share or save results for future reference. This calculator helps you make informed decisions quickly and easily.`,
      relatedTools: [
        'Budget Calculator',
        'Financial Planning Calculator',
        'Analysis Tools'
      ],
      faqs: [
        {
          question: 'How accurate is this calculator?',
          answer: `This calculator uses proven formulas and industry-standard methods to provide accurate results based on the inputs you provide. Results are estimates and may vary based on additional factors.`
        },
        {
          question: 'What information do I need to use this calculator?',
          answer: 'You need to provide the specific values required by the calculator. All required fields are clearly labeled with explanations.'
        },
        {
          question: 'Can I save or share my results?',
          answer: 'Yes, you can save results by taking a screenshot or noting the values. You can also share the calculator link with others.'
        },
        {
          question: 'How often should I use this calculator?',
          answer: 'Use the calculator whenever you need to make informed decisions or verify calculations. Many users review calculations regularly as circumstances change.'
        },
        {
          question: 'Is this professional financial advice?',
          answer: 'No, this calculator provides estimates for informational purposes only. For professional advice, consult with qualified professionals.'
        }
      ]
    },
    es: {
      metaTitle: `${title} - Calcula y Analiza Resultados`,
      metaDescription: `Calculadora de ${title.toLowerCase()} gratuita para ayudarte a calcular y comprender tu información de manera precisa.`,
      keywords: [
        `calculadora de ${title.toLowerCase()}`,
        'calculadora',
        'calcular',
        'análisis',
        'herramientas financieras'
      ],
      h1: title,
      introduction: `Una calculadora de ${title.toLowerCase()} es una herramienta esencial que te ayuda a calcular y comprender tu situación de manera precisa. Al ingresar tus valores específicos, puedes obtener rápidamente resultados exactos y tomar decisiones informadas. Esta calculadora simplifica los cálculos complejos y proporciona resultados instantáneos y confiables que puedes usar para la planificación, análisis y toma de decisiones.`,
      benefits: [
        'Toma decisiones informadas con cálculos precisos',
        'Comprende mejor tu situación financiera',
        'Compara diferentes escenarios fácilmente',
        'Ahorra tiempo con resultados instantáneos',
        'Obtén cálculos confiables en segundos',
        'Planifica efectivamente tu futuro'
      ],
      steps: [
        'Ingresa tus valores en los campos de entrada',
        'Revisa los resultados calculados',
        'Ajusta los valores para explorar diferentes escenarios',
        'Utiliza los resultados para mejor planificación',
        'Guarda tus cálculos para referencia',
        'Comparte los resultados con asesores si es necesario'
      ],
      inputsExplained: [
        'Ingresa todos los valores requeridos con precisión para mejores resultados',
        'Utiliza números realistas basados en tu situación actual',
        'Ajusta los valores para explorar diferentes escenarios'
      ],
      formulaExplanation: `Esta calculadora utiliza fórmulas estándar de la industria y métodos de cálculo comprobados para garantizar precisión. Los resultados se calculan basándose en tus valores utilizando principios matemáticos bien establecidos.`,
      examples: [
        `Ejemplo 1: Escenario básico con valores típicos`,
        `Ejemplo 2: Valores más altos para ver el impacto de la escala`,
        `Ejemplo 3: Valores bajos para estimaciones conservadoras`
      ],
      resultsExplanation: [
        'Resultado Principal: El valor calculado primario basado en tus valores',
        'Métricas Secundarias: Métricas adicionales para análisis completo',
        'Comparaciones: Cómo tu escenario se compara con otros'
      ],
      whoItsFor: `Esta calculadora es ideal para cualquiera que necesite tomar decisiones informadas. Ya seas principiante o experto, esta herramienta proporciona información valiosa y ahorra tiempo en cálculos.`,
      disclaimer: `Los resultados son estimaciones basadas en la información proporcionada. Los resultados reales pueden variar según factores adicionales. Para decisiones críticas, consulta con profesionales relevantes o expertos en el campo.`,
      howDoesWork: `Esta calculadora utiliza fórmulas matemáticas comprobadas para calcular resultados precisos basándose en tus valores. Procesa tus datos y aplica métodos estándar de la industria para garantizar cálculos confiables.`,
      completeGuide: `Para usar esta calculadora efectivamente: 1) Ingresa tus valores en los campos de entrada, 2) Revisa los resultados mostrados, 3) Ajusta los valores para explorar diferentes escenarios, 4) Utiliza los resultados para planificación y toma de decisiones, 5) Comparte o guarda los resultados para referencia futura. Esta calculadora te ayuda a tomar decisiones informadas rápida y fácilmente.`,
      relatedTools: [
        'Calculadora de Presupuesto',
        'Calculadora de Planificación Financiera',
        'Herramientas de Análisis'
      ],
      faqs: [
        {
          question: '¿Qué tan precisa es esta calculadora?',
          answer: `Esta calculadora utiliza fórmulas comprobadas y métodos estándar de la industria para proporcionar resultados precisos basándose en tus valores. Los resultados son estimaciones y pueden variar según factores adicionales.`
        },
        {
          question: '¿Qué información necesito para usar esta calculadora?',
          answer: 'Necesitas proporcionar los valores específicos requeridos por la calculadora. Todos los campos requeridos están claramente etiquetados con explicaciones.'
        },
        {
          question: '¿Puedo guardar o compartir mis resultados?',
          answer: 'Sí, puedes guardar resultados tomando una captura de pantalla o anotando los valores. También puedes compartir el enlace de la calculadora con otros.'
        },
        {
          question: '¿Con qué frecuencia debo usar esta calculadora?',
          answer: 'Utiliza la calculadora siempre que necesites tomar decisiones informadas o verificar cálculos. Muchos usuarios revisan los cálculos regularmente a medida que cambian las circunstancias.'
        },
        {
          question: '¿Es esto consejo financiero profesional?',
          answer: 'No, esta calculadora proporciona estimaciones solo para propósitos informativos. Para consejo profesional, consulta con profesionales calificados.'
        }
      ]
    },
    pt: {
      metaTitle: `${title} - Calcule e Analise Resultados`,
      metaDescription: `Calculadora de ${title.toLowerCase()} gratuita para ajudá-lo a calcular e compreender sua situação com precisão.`,
      keywords: [
        `calculadora de ${title.toLowerCase()}`,
        'calculadora',
        'calcular',
        'análise',
        'ferramentas financeiras'
      ],
      h1: title,
      introduction: `Uma calculadora de ${title.toLowerCase()} é uma ferramenta essencial que ajuda você a calcular e compreender sua situação com precisão. Ao inserir seus valores específicos, você pode obter rapidamente resultados precisos e tomar decisões informadas. Esta calculadora simplifica cálculos complexos e oferece resultados instantâneos e confiáveis que você pode usar para planejamento, análise e tomada de decisões.`,
      benefits: [
        'Tome decisões informadas com cálculos precisos',
        'Compreenda melhor sua situação financeira',
        'Compare diferentes cenários facilmente',
        'Economize tempo com resultados instantâneos',
        'Obtenha cálculos confiáveis em segundos',
        'Planeje efetivamente seu futuro'
      ],
      steps: [
        'Insira seus valores nos campos de entrada',
        'Revise os resultados calculados',
        'Ajuste os valores para explorar diferentes cenários',
        'Use os resultados para melhor planejamento',
        'Salve seus cálculos para referência',
        'Compartilhe os resultados com consultores se necessário'
      ],
      inputsExplained: [
        'Insira todos os valores necessários com precisão para melhores resultados',
        'Use números realistas baseados em sua situação atual',
        'Ajuste os valores para explorar diferentes cenários'
      ],
      formulaExplanation: `Esta calculadora usa fórmulas padrão da indústria e métodos de cálculo comprovados para garantir precisão. Os resultados são calculados com base em seus valores usando princípios matemáticos bem estabelecidos.`,
      examples: [
        `Exemplo 1: Cenário básico com valores típicos`,
        `Exemplo 2: Valores mais altos para ver o impacto da escala`,
        `Exemplo 3: Valores baixos para estimativas conservadores`
      ],
      resultsExplanation: [
        'Resultado Principal: O valor calculado principal baseado em seus valores',
        'Métricas Secundárias: Métricas adicionais para análise abrangente',
        'Comparações: Como seu cenário se compara com outros'
      ],
      whoItsFor: `Esta calculadora é ideal para qualquer pessoa que precise tomar decisões informadas. Seja você iniciante ou especialista, esta ferramenta oferece insights valiosos e economiza tempo em cálculos.`,
      disclaimer: `Os resultados são estimativas baseadas nas informações fornecidas. Os resultados reais podem variar com base em fatores adicionais. Para decisões críticas, consulte profissionais relevantes ou especialistas no campo.`,
      howDoesWork: `Esta calculadora usa fórmulas matemáticas comprovadas para calcular resultados precisos com base em seus valores. Ela processa seus dados e aplica métodos padrão da indústria para garantir cálculos confiáveis.`,
      completeGuide: `Para usar esta calculadora de forma eficaz: 1) Insira seus valores nos campos de entrada, 2) Revise os resultados mostrados, 3) Ajuste os valores para explorar diferentes cenários, 4) Use os resultados para planejamento e tomada de decisões, 5) Compartilhe ou salve os resultados para referência futura. Esta calculadora ajuda você a tomar decisões informadas de forma rápida e fácil.`,
      relatedTools: [
        'Calculadora de Orçamento',
        'Calculadora de Planejamento Financeiro',
        'Ferramentas de Análise'
      ],
      faqs: [
        {
          question: 'Quão precisa é esta calculadora?',
          answer: `Esta calculadora usa fórmulas comprovadas e métodos padrão da indústria para fornecer resultados precisos com base em seus valores. Os resultados são estimativas e podem variar com base em fatores adicionais.`
        },
        {
          question: 'Que informações preciso para usar esta calculadora?',
          answer: 'Você precisa fornecer os valores específicos necessários pela calculadora. Todos os campos obrigatórios estão claramente rotulados com explicações.'
        },
        {
          question: 'Posso salvar ou compartilhar meus resultados?',
          answer: 'Sim, você pode salvar resultados tomando uma captura de tela ou anotando os valores. Você também pode compartilhar o link da calculadora com outros.'
        },
        {
          question: 'Com que frequência devo usar esta calculadora?',
          answer: 'Use a calculadora sempre que precisar tomar decisões informadas ou verificar cálculos. Muitos usuários revisam os cálculos regularmente conforme as circunstâncias mudam.'
        },
        {
          question: 'Isto é conselho financeiro profissional?',
          answer: 'Não, esta calculadora fornece estimativas apenas para fins informativos. Para aconselhamento profissional, consulte profissionais qualificados.'
        }
      ]
    },
    fr: {
      metaTitle: `${title} - Calculez et Analysez les Résultats`,
      metaDescription: `Calculatrice ${title.toLowerCase()} gratuite pour vous aider à calculer et comprendre votre situation avec précision.`,
      keywords: [
        `calculatrice ${title.toLowerCase()}`,
        'calculatrice',
        'calculer',
        'analyse',
        'outils financiers'
      ],
      h1: title,
      introduction: `Une calculatrice ${title.toLowerCase()} est un outil essentiel qui vous aide à calculer et comprendre votre situation avec précision. En entrant vos valeurs spécifiques, vous pouvez rapidement obtenir des résultats précis et prendre des décisions éclairées. Cette calculatrice simplifie les calculs complexes et fournit des résultats instantanés et fiables que vous pouvez utiliser pour la planification, l'analyse et la prise de décision.`,
      benefits: [
        'Prenez des décisions éclairées avec des calculs précis',
        'Comprenez mieux votre situation financière',
        'Comparez facilement différents scénarios',
        'Économisez du temps avec des résultats instantanés',
        'Obtenez des calculs fiables en quelques secondes',
        'Planifiez efficacement votre avenir'
      ],
      steps: [
        'Entrez vos valeurs dans les champs de saisie',
        'Vérifiez les résultats calculés',
        'Ajustez les valeurs pour explorer différents scénarios',
        'Utilisez les résultats pour une meilleure planification',
        'Enregistrez vos calculs pour référence',
        'Partagez les résultats avec des conseillers si nécessaire'
      ],
      inputsExplained: [
        'Entrez tous les valeurs requises avec précision pour de meilleurs résultats',
        'Utilisez des chiffres réalistes basés sur votre situation actuelle',
        'Ajustez les valeurs pour explorer différents scénarios'
      ],
      formulaExplanation: `Cette calculatrice utilise des formules standard de l'industrie et des méthodes de calcul éprouvées pour garantir la précision. Les résultats sont calculés en fonction de vos valeurs à l'aide de principes mathématiques bien établis.`,
      examples: [
        `Exemple 1: Scénario de base avec valeurs typiques`,
        `Exemple 2: Valeurs plus élevées pour voir l'impact de l'échelle`,
        `Exemple 3: Valeurs basses pour des estimations conservatrices`
      ],
      resultsExplanation: [
        'Résultat Principal: La valeur calculée principale basée sur vos valeurs',
        'Métriques Secondaires: Métriques supplémentaires pour une analyse complète',
        'Comparaisons: Comment votre scénario se compare aux autres'
      ],
      whoItsFor: `Cette calculatrice est idéale pour quiconque a besoin de prendre des décisions éclairées. Que vous soyez débutant ou expert, cet outil fournit des informations précieuses et économise du temps sur les calculs.`,
      disclaimer: `Les résultats sont des estimations basées sur les informations fournies. Les résultats réels peuvent varier en fonction de facteurs supplémentaires. Pour les décisions critiques, veuillez consulter des professionnels pertinents ou des experts dans le domaine.`,
      howDoesWork: `Cette calculatrice utilise des formules mathématiques éprouvées pour calculer des résultats précis en fonction de vos valeurs. Elle traite vos données et applique des méthodes standard de l'industrie pour garantir des calculs fiables.`,
      completeGuide: `Pour utiliser cette calculatrice efficacement: 1) Entrez vos valeurs dans les champs de saisie, 2) Vérifiez les résultats affichés, 3) Ajustez les valeurs pour explorer différents scénarios, 4) Utilisez les résultats pour la planification et la prise de décision, 5) Partagez ou enregistrez les résultats pour référence future. Cette calculatrice vous aide à prendre des décisions éclairées rapidement et facilement.`,
      relatedTools: [
        'Calculatrice de Budget',
        'Calculatrice de Planification Financière',
        'Outils d\'Analyse'
      ],
      faqs: [
        {
          question: 'Quelle est la précision de cette calculatrice?',
          answer: `Cette calculatrice utilise des formules éprouvées et des méthodes standard de l'industrie pour fournir des résultats précis basés sur vos valeurs. Les résultats sont des estimations et peuvent varier en fonction de facteurs supplémentaires.`
        },
        {
          question: 'Quelles informations ai-je besoin pour utiliser cette calculatrice?',
          answer: 'Vous devez fournir les valeurs spécifiques requises par la calculatrice. Tous les champs obligatoires sont clairement étiquetés avec des explications.'
        },
        {
          question: 'Puis-je enregistrer ou partager mes résultats?',
          answer: 'Oui, vous pouvez enregistrer les résultats en prenant une capture d\'écran ou en notant les valeurs. Vous pouvez également partager le lien de la calculatrice avec d\'autres.'
        },
        {
          question: 'À quelle fréquence dois-je utiliser cette calculatrice?',
          answer: 'Utilisez la calculatrice chaque fois que vous devez prendre des décisions éclairées ou vérifier des calculs. De nombreux utilisateurs révisent régulièrement les calculs à mesure que les circonstances changent.'
        },
        {
          question: 'Est-ce un conseil financier professionnel?',
          answer: 'Non, cette calculatrice fournit des estimations à titre informatif uniquement. Pour des conseils professionnels, veuillez consulter des professionnels qualifiés.'
        }
      ]
    },
    de: {
      metaTitle: `${title} - Berechnen und Analysieren Sie Ergebnisse`,
      metaDescription: `Kostenloser ${title.toLowerCase()}, mit dem Sie Ihre Situation präzise berechnen und verstehen können.`,
      keywords: [
        `${title.toLowerCase()} rechner`,
        'rechner',
        'berechnen',
        'analyse',
        'finanzwerkzeuge'
      ],
      h1: title,
      introduction: `Ein ${title.toLowerCase()} ist ein wesentliches Werkzeug, das Ihnen hilft, Ihre Situation präzise zu berechnen und zu verstehen. Durch die Eingabe Ihrer spezifischen Werte können Sie schnell genaue Ergebnisse erhalten und fundierte Entscheidungen treffen. Dieser Rechner vereinfacht komplexe Berechnungen und liefert sofortige, zuverlässige Ergebnisse, die Sie für Planung, Analyse und Entscheidungsfindung nutzen können.`,
      benefits: [
        'Treffen Sie fundierte Entscheidungen mit genauen Berechnungen',
        'Verstehen Sie Ihre finanzielle Situation besser',
        'Vergleichen Sie verschiedene Szenarien einfach',
        'Sparen Sie Zeit mit sofortigen Ergebnissen',
        'Erhalten Sie zuverlässige Berechnungen in Sekunden',
        'Planen Sie effektiv Ihre Zukunft'
      ],
      steps: [
        'Geben Sie Ihre Werte in die Eingabefelder ein',
        'Überprüfen Sie die berechneten Ergebnisse',
        'Passen Sie die Werte an, um verschiedene Szenarien zu erkunden',
        'Nutzen Sie die Ergebnisse für bessere Planung',
        'Speichern Sie Ihre Berechnungen zur Referenz',
        'Teilen Sie die Ergebnisse mit Beratern, falls erforderlich'
      ],
      inputsExplained: [
        'Geben Sie alle erforderlichen Werte genau ein, um beste Ergebnisse zu erzielen',
        'Verwenden Sie realistische Zahlen basierend auf Ihrer aktuellen Situation',
        'Passen Sie die Werte an, um verschiedene Szenarien zu erkunden'
      ],
      formulaExplanation: `Dieser Rechner verwendet branchenübliche Formeln und bewährte Berechnungsmethoden, um Genauigkeit zu gewährleisten. Die Ergebnisse werden basierend auf Ihren Eingaben unter Verwendung gut etablierter mathematischer Prinzipien berechnet.`,
      examples: [
        `Beispiel 1: Grundlegendes Szenario mit typischen Werten`,
        `Beispiel 2: Höhere Werte, um die Auswirkungen der Skalierung zu sehen`,
        `Beispiel 3: Niedrigere Werte für konservative Schätzungen`
      ],
      resultsExplanation: [
        'Hauptergebnis: Der primäre berechnete Wert basierend auf Ihren Eingaben',
        'Sekundäre Metriken: Zusätzliche Metriken für umfassende Analyse',
        'Vergleiche: Wie sich Ihr Szenario mit anderen vergleicht'
      ],
      whoItsFor: `Dieser Rechner ist ideal für jeden, der fundierte Entscheidungen treffen muss. Egal ob Anfänger oder Experte, dieses Werkzeug bietet wertvolle Erkenntnisse und spart Zeit bei Berechnungen.`,
      disclaimer: `Die Ergebnisse sind Schätzungen basierend auf den bereitgestellten Informationen. Die tatsächlichen Ergebnisse können basierend auf zusätzlichen Faktoren variieren. Bitte konsultieren Sie für kritische Entscheidungen relevante Fachleute oder Experten auf dem Gebiet.`,
      howDoesWork: `Dieser Rechner verwendet bewährte mathematische Formeln, um genaue Ergebnisse basierend auf Ihren Eingaben zu berechnen. Er verarbeitet Ihre Daten und wendet branchenübliche Methoden an, um zuverlässige Berechnungen zu gewährleisten.`,
      completeGuide: `Um diesen Rechner effektiv zu nutzen: 1) Geben Sie Ihre Werte in die Eingabefelder ein, 2) Überprüfen Sie die angezeigten Ergebnisse, 3) Passen Sie die Werte an, um verschiedene Szenarien zu erkunden, 4) Nutzen Sie die Ergebnisse für Planung und Entscheidungsfindung, 5) Teilen oder speichern Sie die Ergebnisse zur zukünftigen Referenz. Dieser Rechner hilft Ihnen, schnell und einfach fundierte Entscheidungen zu treffen.`,
      relatedTools: [
        'Budget-Rechner',
        'Finanzplanungs-Rechner',
        'Analyse-Tools'
      ],
      faqs: [
        {
          question: 'Wie genau ist dieser Rechner?',
          answer: `Dieser Rechner verwendet bewährte Formeln und branchenübliche Methoden, um genaue Ergebnisse basierend auf Ihren Eingaben zu liefern. Die Ergebnisse sind Schätzungen und können basierend auf zusätzlichen Faktoren variieren.`
        },
        {
          question: 'Welche Informationen benötige ich zur Nutzung dieses Rechners?',
          answer: 'Sie müssen die spezifischen Werte bereitstellen, die der Rechner benötigt. Alle erforderlichen Felder sind deutlich gekennzeichnet und mit Erklärungen versehen.'
        },
        {
          question: 'Kann ich meine Ergebnisse speichern oder teilen?',
          answer: 'Ja, Sie können Ergebnisse speichern, indem Sie einen Screenshot machen oder die Werte notieren. Sie können auch den Rechner-Link mit anderen teilen.'
        },
        {
          question: 'Wie oft sollte ich diesen Rechner nutzen?',
          answer: 'Verwenden Sie den Rechner, wenn Sie fundierte Entscheidungen treffen oder Berechnungen überprüfen müssen. Viele Nutzer überprüfen regelmäßig die Berechnungen, wenn sich die Umstände ändern.'
        },
        {
          question: 'Ist dies professionelle Finanzberatung?',
          answer: 'Nein, dieser Rechner bietet Schätzungen nur zu Informationszwecken. Für professionelle Beratung konsultieren Sie bitte qualifizierte Fachleute.'
        }
      ]
    }
  };

  return translations[language] || translations.en;
}

/**
 * Apply seoContent to a calculator file for all languages
 */
function applySeoContentToCalculator(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const calculator = JSON.parse(content);

    const languages = Object.keys(calculator).filter(key => 
      typeof calculator[key] === 'object' && calculator[key].title
    );

    let modified = false;

    languages.forEach(lang => {
      if (!calculator[lang].seoContent) {
        const generatedContent = generateSEOContent(calculator[lang], lang);
        calculator[lang].seoContent = generatedContent;
        modified = true;
        console.log(`✓ Added seoContent for ${lang}: ${calculator[lang].title}`);
      } else {
        console.log(`✓ Already has seoContent for ${lang}: ${calculator[lang].title}`);
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(calculator, null, 2) + '\n');
      console.log(`✓ Updated: ${path.basename(filePath)}\n`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`✗ Error processing ${path.basename(filePath)}:`, error.message);
    return false;
  }
}

/**
 * Process multiple calculator files
 */
function processCalculators(calculatorNames = []) {
  const calculatorsDir = path.join(__dirname, 'content', 'calculators');

  if (!fs.existsSync(calculatorsDir)) {
    console.error(`Calculators directory not found: ${calculatorsDir}`);
    process.exit(1);
  }

  const files = calculatorNames.length > 0
    ? calculatorNames.map(name => `${name}.json`)
    : fs.readdirSync(calculatorsDir).filter(f => f.endsWith('.json'));

  console.log(`\n📋 Processing ${files.length} calculator(s)...\n`);

  let processed = 0;
  let updated = 0;

  files.forEach(file => {
    const filePath = path.join(calculatorsDir, file);
    if (fs.existsSync(filePath)) {
      processed++;
      if (applySeoContentToCalculator(filePath)) {
        updated++;
      }
    } else {
      console.warn(`⚠ File not found: ${file}`);
    }
  });

  console.log(`\n✨ Summary:`);
  console.log(`   Processed: ${processed} files`);
  console.log(`   Updated: ${updated} files`);
  console.log(`   Skipped: ${processed - updated} files (already complete)\n`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length > 0) {
  processCalculators(args);
} else {
  // Process all calculators
  processCalculators();
}
