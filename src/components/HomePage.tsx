'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getAllCalculatorsForHomepage, CALCULATOR_CATEGORIES } from '@/lib/categoryUtils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface HomePageProps {
  language?: string;
}

export default function HomePage({ language }: HomePageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [allCalculators, setAllCalculators] = useState<{ category: string; calculators: any[] }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCalculators, setFilteredCalculators] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Get current language from pathname
  const getCurrentLang = (path: string) => {
    if (path.startsWith('/es/') || path === '/es') return 'es';
    if (path.startsWith('/pt/') || path === '/pt') return 'pt';
    if (path.startsWith('/fr/') || path === '/fr') return 'fr';
    if (path.startsWith('/en/') || path === '/en') return 'en';
    return 'en';
  };

  const currentLang = language || getCurrentLang(pathname);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCalculators([]);
      setShowResults(false);
      return;
    }

    const allCalcs = getAllCalculatorsForHomepage(currentLang);
    const filtered = allCalcs.filter(calc =>
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCalculators(filtered);
    setShowResults(true);
  }, [searchQuery, currentLang]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Comprehensive homepage content
  const content = {
    en: {
      // Hero Section
      title: 'Free Online Calculators for Finance, Health & Everyday Math',
      introParagraph: 'Quick Calculator provides fast, accurate, and easy-to-use online calculators to help you make better financial, health, and everyday decisions. Whether you\'re planning a mortgage, calculating loan interest, checking your BMI, or solving math problems, our tools give instant results with clear explanations.',
      searchPrompt: 'Find the calculator in second',

      // Category Navigation
      exploreCategoriesTitle: 'Explore Our Categories',

      // Most Popular Calculators
      mostPopularTitle: 'Most Popular Calculators',
      mostPopularIntro: 'Use these trusted tools every day to make smarter decisions:',
      popularCalculators: [
        { name: 'Mortgage Calculator', desc: 'Estimate monthly home loan payments and interest' },
        { name: 'Loan Calculator', desc: 'Calculate loan repayments and total interest' },
        { name: 'BMI Calculator', desc: 'Check your body mass index and weight category' },
        { name: 'Savings Calculator', desc: 'Calculate savings growth and goal planning' },
        { name: 'Percentage Calculator', desc: 'Solve percentage increase, decrease, and values' },
        { name: 'Tip Calculator', desc: 'Calculate tips and split bills at restaurants' }
      ],

      // Financial Calculators
      financialTitle: 'Financial Calculators',
      financialDesc: 'Financial Focus: 6 calculators for highest-value category. Managing money becomes easier when you understand the numbers. Our financial calculators help you plan loans, mortgages, savings, and repayments with confidence.',
      financialPopular: ['Mortgage Calculator', 'Loan Calculator', 'Savings Calculator', 'Investment Calculator', 'Budget Calculator', 'Credit Card Calculator'],
      viewAllFinancial: 'View all financial calculators',

      // Health Calculators
      healthTitle: 'Health & Fitness Calculators',
      healthDesc: 'Health Awareness: 5 calculators for wellness tracking. Understanding your health metrics is an important step toward a healthier lifestyle. Our health calculators use standard formulas to provide quick insights into weight, body composition, and daily calorie needs.',
      healthPopular: ['BMI Calculator', 'BMR Calculator', 'Calorie Calculator', 'Body Fat Calculator', 'Ideal Weight Calculator'],
      exploreHealth: 'Explore health calculators',

      // Math Calculators
      mathTitle: 'Math & Everyday Calculators',
      mathDesc: 'Math Essentials: 8 calculators for everyday calculations. From simple percentages to advanced geometry, our math calculators help students, professionals, and families get accurate answers instantly—without manual calculations.',
      mathPopular: ['Percentage Calculator', 'Fraction Calculator', 'Average Calculator', 'Unit Converter', 'Scientific Calculator', 'Pythagorean Theorem', 'Standard Deviation', 'Circle Area'],
      browseMath: 'Browse math calculators',

      // Lifestyle Calculators
      lifestyleTitle: 'Lifestyle Calculators',
      lifestyleDesc: 'Lifestyle Calculators: 4 calculators for personal planning. From budgeting and tipping to academic performance, make informed decisions about your personal finances and daily activities.',
      lifestylePopular: ['Age Calculator', 'Tip Calculator', 'GPA Calculator', 'Budget Calculator'],
      exploreLifestyle: 'Explore lifestyle calculators',

      // Utility Calculators
      utilityTitle: 'Utility Calculators',
      utilityDesc: 'Utility Calculators: 3 calculators for productivity. Essential tools for everyday tasks like word counting, date calculations, and number conversions.',
      utilityPopular: ['Word Counter', 'Numbers to Words Converter', 'Date Calculator'],
      exploreUtility: 'Explore utility calculators',

      // Why Use Section
      whyUseTitle: 'Why Use Online Calculators?',
      whyUseDesc: 'Online calculators save time, reduce errors, and help you make informed decisions. Instead of guessing or relying on complex formulas, you get instant results using reliable calculation methods.',
      benefits: [
        'Fast and accurate results',
        'Based on standard and trusted formulas',
        'No registration required',
        'Mobile-friendly and easy to use',
        'Free access to all calculators'
      ],

      // Accuracy & Trust
      accuracyTitle: 'Accurate, Simple & Free',
      accuracyDesc: 'Every calculator on Quick Calculator is designed with clarity and accuracy in mind. Results are easy to understand and often include explanations to help you learn—not just calculate.',
      idealFor: 'Our tools are ideal for:',
      useCases: [
        'Home buyers and borrowers',
        'Students and teachers',
        'Fitness and health tracking',
        'Everyday financial planning'
      ],

      // Get Started
      getStartedTitle: 'Start Calculating Today',
      getStartedDesc: 'Explore our complete collection of free online calculators and take control of your numbers with confidence.',
      browseAll: 'Browse all calculators',
      exploreGuidance: 'Explore calculators by category above or visit our comprehensive collection',

      brand: 'Quick Calculator',
      footer: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        contact: 'Contact',
        cookie: 'Cookie Policy',
        disclaimer: 'Disclaimer',
        about: 'About Us',
        copyright: '© 2026 Quick Calculator. All rights reserved.'
      }
    },
    es: {
      // Hero Section
      title: 'Calculadoras en Línea Gratis para Finanzas, Salud y Matemáticas Cotidianas',
      introParagraph: 'Calculadora Rápida ofrece calculadoras en línea rápidas, precisas y fáciles de usar para ayudarte a tomar mejores decisiones financieras, de salud y cotidianas. Ya sea que estés planeando una hipoteca, calculando intereses de préstamos, verificando tu IMC o resolviendo problemas matemáticos, nuestras herramientas dan resultados instantáneos con explicaciones claras.',
      searchPrompt: 'Encuentra la calculadora en segundo',

      // Category Navigation
      exploreCategoriesTitle: 'Explora Nuestras Categorías',

      // Most Popular Calculators
      mostPopularTitle: 'Calculadoras Más Populares',
      mostPopularIntro: 'Usa estas herramientas confiables todos los días para tomar decisiones más inteligentes:',
      popularCalculators: [
        { name: 'Calculadora de Hipoteca', desc: 'Estima pagos mensuales de préstamo hipotecario e intereses' },
        { name: 'Calculadora de Préstamos', desc: 'Calcula pagos de préstamos e intereses totales' },
        { name: 'Calculadora IMC', desc: 'Verifica tu índice de masa corporal y categoría de peso' },
        { name: 'Calculadora de Ahorros', desc: 'Calcula el crecimiento de ahorros y planificación de metas' },
        { name: 'Calculadora de Porcentajes', desc: 'Resuelve aumentos, disminuciones y valores porcentuales' },
        { name: 'Calculadora de Propina', desc: 'Calcula propinas y divide cuentas en restaurantes' }
      ],

      // Financial Calculators
      financialTitle: 'Calculadoras Financieras',
      financialDesc: 'Enfoque Financiero: 6 calculadoras para la categoría de mayor valor. Administrar el dinero se vuelve más fácil cuando entiendes los números. Nuestras calculadoras financieras te ayudan a planificar préstamos, hipotecas, ahorros y pagos con confianza.',
      financialPopular: ['Calculadora de Hipoteca', 'Calculadora de Préstamos', 'Calculadora de Ahorros', 'Calculadora de Inversiones', 'Calculadora de Presupuesto', 'Calculadora de Tarjeta de Crédito'],
      viewAllFinancial: 'Ver todas las calculadoras financieras',

      // Health Calculators
      healthTitle: 'Calculadoras de Salud y Fitness',
      healthDesc: 'Conciencia de Salud: 5 calculadoras para seguimiento de bienestar. Entender tus métricas de salud es un paso importante hacia un estilo de vida más saludable. Nuestras calculadoras de salud usan fórmulas estándar para proporcionar información rápida sobre peso, composición corporal y necesidades calóricas diarias.',
      healthPopular: ['Calculadora IMC', 'Calculadora TMB', 'Calculadora de Calorías', 'Calculadora de Grasa Corporal', 'Calculadora de Peso Ideal'],
      exploreHealth: 'Explorar calculadoras de salud',

      // Math Calculators
      mathTitle: 'Calculadoras de Matemáticas y Cotidianas',
      mathDesc: 'Esenciales Matemáticos: 8 calculadoras para cálculos cotidianos. Desde porcentajes simples hasta geometría avanzada, nuestras calculadoras matemáticas ayudan a estudiantes, profesionales y familias a obtener respuestas precisas al instante, sin cálculos manuales.',
      mathPopular: ['Calculadora de Porcentajes', 'Calculadora de Fracciones', 'Calculadora de Promedio', 'Convertidor de Unidades', 'Calculadora Científica', 'Teorema de Pitágoras', 'Desviación Estándar', 'Área del Círculo'],
      browseMath: 'Explorar calculadoras matemáticas',

      // Lifestyle Calculators
      lifestyleTitle: 'Calculadoras de Estilo de Vida',
      lifestyleDesc: 'Calculadoras de Estilo de Vida: 4 calculadoras para planificación personal. Desde presupuestos y propinas hasta seguimiento del rendimiento académico, tome decisiones informadas sobre sus finanzas personales y actividades diarias.',
      lifestylePopular: ['Calculadora de Edad', 'Calculadora de Propina', 'Calculadora GPA', 'Calculadora de Presupuesto'],
      exploreLifestyle: 'Explorar calculadoras de estilo de vida',

      // Utility Calculators
      utilityTitle: 'Calculadoras de Utilidad',
      utilityDesc: 'Calculadoras de Utilidad: 3 calculadoras para productividad. Herramientas esenciales para tareas cotidianas como conteo de palabras, cálculos de fechas y conversiones de números.',
      utilityPopular: ['Contador de Palabras', 'Convertidor Números a Palabras', 'Calculadora de Fecha'],
      exploreUtility: 'Explorar calculadoras de utilidad',

      // Why Use Section
      whyUseTitle: '¿Por Qué Usar Calculadoras en Línea?',
      whyUseDesc: 'Las calculadoras en línea ahorran tiempo, reducen errores y te ayudan a tomar decisiones informadas. En lugar de adivinar o depender de fórmulas complejas, obtienes resultados instantáneos usando métodos de cálculo confiables.',
      benefits: [
        'Resultados rápidos y precisos',
        'Basados en fórmulas estándar y confiables',
        'Sin registro requerido',
        'Amigables para móviles y fáciles de usar',
        'Acceso gratuito a todas las calculadoras'
      ],

      // Accuracy & Trust
      accuracyTitle: 'Preciso, Simple y Gratis',
      accuracyDesc: 'Cada calculadora en Calculadora Rápida está diseñada con claridad y precisión en mente. Los resultados son fáciles de entender y a menudo incluyen explicaciones para ayudarte a aprender, no solo calcular.',
      idealFor: 'Nuestras herramientas son ideales para:',
      useCases: [
        'Compradores de vivienda y prestatarios',
        'Estudiantes y maestros',
        'Seguimiento de fitness y salud',
        'Planificación financiera cotidiana'
      ],

      // Get Started
      getStartedTitle: 'Comienza a Calcular Hoy',
      getStartedDesc: 'Explora nuestra colección completa de calculadoras en línea gratuitas y toma control de tus números con confianza.',
      browseAll: 'Explorar todas las calculadoras',
      exploreGuidance: 'Explora calculadoras por categoría arriba o visita nuestra colección completa',

      brand: 'Calculadora Rápida',
      footer: {
        privacy: 'Política de Privacidad',
        terms: 'Términos de Servicio',
        contact: 'Contacto',
        cookie: 'Política de Cookies',
        disclaimer: 'Descargo de Responsabilidad',
        about: 'Sobre Nosotros',
        copyright: '© 2026 Calculadora Rápida. Todos los derechos reservados.'
      }
    },
    pt: {
      // Hero Section
      title: 'Calculadoras Online Gratuitas para Finanças, Saúde e Matemática Cotidiana',
      introParagraph: 'A Calculadora Rápida oferece calculadoras online rápidas, precisas e fáceis de usar para ajudá-lo a tomar melhores decisões financeiras, de saúde e cotidianas. Seja planejando uma hipoteca, calculando juros de empréstimos, verificando seu IMC ou resolvendo problemas matemáticos, nossas ferramentas fornecem resultados instantâneos com explicações claras.',
      searchPrompt: 'Encontre a calculadora em segundo',

      // Category Navigation
      exploreCategoriesTitle: 'Explore Nossas Categorias',

      // Most Popular Calculators
      mostPopularTitle: 'Calculadoras Mais Populares',
      mostPopularIntro: 'Use essas ferramentas confiáveis todos os dias para tomar decisões mais inteligentes:',
      popularCalculators: [
        { name: 'Calculadora de Hipoteca', desc: 'Estime pagamentos mensais de empréstimo imobiliário e juros' },
        { name: 'Calculadora de Empréstimos', desc: 'Calcule pagamentos de empréstimos e juros totais' },
        { name: 'Calculadora IMC', desc: 'Verifique seu índice de massa corporal e categoria de peso' },
        { name: 'Calculadora de Poupança', desc: 'Calcule o crescimento de poupança e planejamento de metas' },
        { name: 'Calculadora de Porcentagens', desc: 'Resolva aumentos, diminuições e valores percentuais' },
        { name: 'Calculadora de Gorjeta', desc: 'Calcule gorjetas e divida contas em restaurantes' }
      ],

      // Financial Calculators
      financialTitle: 'Calculadoras Financeiras',
      financialDesc: 'Foco Financeiro: 6 calculadoras para a categoria de maior valor. Gerenciar dinheiro fica mais fácil quando você entende os números. Nossas calculadoras financeiras ajudam você a planejar empréstimos, hipotecas, poupanças e pagamentos com confiança.',
      financialPopular: ['Calculadora de Hipoteca', 'Calculadora de Empréstimos', 'Calculadora de Poupança', 'Calculadora de Investimentos', 'Calculadora de Orçamento', 'Calculadora de Cartão de Crédito'],
      viewAllFinancial: 'Ver todas as calculadoras financeiras',

      // Health Calculators
      healthTitle: 'Calculadoras de Saúde e Fitness',
      healthDesc: 'Conscientização da Saúde: 5 calculadoras para acompanhamento do bem-estar. Entender suas métricas de saúde é um passo importante para um estilo de vida mais saudável. Nossas calculadoras de saúde usam fórmulas padrão para fornecer insights rápidos sobre peso, composição corporal e necessidades calóricas diárias.',
      healthPopular: ['Calculadora IMC', 'Calculadora TMB', 'Calculadora de Calorias', 'Calculadora de Gordura Corporal', 'Calculadora de Peso Ideal'],
      exploreHealth: 'Explorar calculadoras de saúde',

      // Math Calculators
      mathTitle: 'Calculadoras de Matemática e Cotidianas',
      mathDesc: 'Essenciais Matemáticos: 8 calculadoras para cálculos cotidianos. De porcentagens simples a geometria avançada, nossas calculadoras matemáticas ajudam estudantes, profissionais e famílias a obter respostas precisas instantaneamente, sem cálculos manuais.',
      mathPopular: ['Calculadora de Porcentagens', 'Calculadora de Frações', 'Calculadora de Média', 'Conversor de Unidades', 'Calculadora Científica', 'Teorema de Pitágoras', 'Desvio Padrão', 'Área do Círculo'],
      browseMath: 'Explorar calculadoras matemáticas',

      // Lifestyle Calculators
      lifestyleTitle: 'Calculadoras de Estilo de Vida',
      lifestyleDesc: 'Calculadoras de Estilo de Vida: 4 calculadoras para planejamento pessoal. De orçamentos e gorjetas até acompanhamento do desempenho acadêmico, tome decisões informadas sobre suas finanças pessoais e atividades diárias.',
      lifestylePopular: ['Calculadora de Idade', 'Calculadora de Gorjeta', 'Calculadora GPA', 'Calculadora de Orçamento'],
      exploreLifestyle: 'Explorar calculadoras de estilo de vida',

      // Utility Calculators
      utilityTitle: 'Calculadoras de Utilitários',
      utilityDesc: 'Calculadoras de Utilitários: 3 calculadoras para produtividade. Ferramentas essenciais para tarefas cotidianas como contagem de palavras, cálculos de datas e conversões de números.',
      utilityPopular: ['Contador de Palavras', 'Conversor Números para Palavras', 'Calculadora de Data'],
      exploreUtility: 'Explorar calculadoras de utilitários',

      // Why Use Section
      whyUseTitle: 'Por Que Usar Calculadoras Online?',
      whyUseDesc: 'Calculadoras online economizam tempo, reduzem erros e ajudam você a tomar decisões informadas. Em vez de adivinhar ou depender de fórmulas complexas, você obtém resultados instantâneos usando métodos de cálculo confiáveis.',
      benefits: [
        'Resultados rápidos e precisos',
        'Baseados em fórmulas padrão e confiáveis',
        'Sem registro necessário',
        'Amigáveis para dispositivos móveis e fáceis de usar',
        'Acesso gratuito a todas as calculadoras'
      ],

      // Accuracy & Trust
      accuracyTitle: 'Preciso, Simples e Grátis',
      accuracyDesc: 'Cada calculadora na Calculadora Rápida é projetada com clareza e precisão em mente. Os resultados são fáceis de entender e frequentemente incluem explicações para ajudá-lo a aprender, não apenas calcular.',
      idealFor: 'Nossas ferramentas são ideais para:',
      useCases: [
        'Compradores de imóveis e tomadores de empréstimos',
        'Estudantes e professores',
        'Acompanhamento de fitness e saúde',
        'Planejamento financeiro cotidiano'
      ],

      // Get Started
      getStartedTitle: 'Comece a Calcular Hoje',
      getStartedDesc: 'Explore nossa coleção completa de calculadoras online gratuitas e tome controle de seus números com confiança.',
      browseAll: 'Explorar todas as calculadoras',
      exploreGuidance: 'Explore calculadoras por categoria acima ou visite nossa coleção completa',

      brand: 'Calculadora Rápida',
      footer: {
        privacy: 'Política de Privacidade',
        terms: 'Termos de Serviço',
        contact: 'Contato',
        cookie: 'Política de Cookies',
        disclaimer: 'Isenção de Responsabilidade',
        about: 'Sobre Nós',
        copyright: '© 2026 Calculadora Rápida. Todos os direitos reservados.'
      }
    },
    fr: {
      // Hero Section
      title: 'Calculateurs en Ligne Gratuits pour Finance, Santé et Mathématiques Quotidiennes',
      introParagraph: 'Calculateur Rapide fournit des calculateurs en ligne rapides, précis et faciles à utiliser pour vous aider à prendre de meilleures décisions financières, de santé et quotidiennes. Que vous planifiez une hypothèque, calculiez les intérêts de prêt, vérifiez votre IMC ou résolviez des problèmes mathématiques, nos outils donnent des résultats instantanés avec des explications claires.',
      searchPrompt: 'Trouvez la calculatrice en seconde',

      // Category Navigation
      exploreCategoriesTitle: 'Explorez Nos Catégories',

      // Most Popular Calculators
      mostPopularTitle: 'Calculateurs les Plus Populaires',
      mostPopularIntro: 'Utilisez ces outils fiables tous les jours pour prendre des décisions plus intelligentes :',
      popularCalculators: [
        { name: 'Calculateur d\'Hypothèque', desc: 'Estimez les paiements mensuels de prêt immobilier et les intérêts' },
        { name: 'Calculateur de Prêt', desc: 'Calculez les remboursements de prêt et les intérêts totaux' },
        { name: 'Calculateur IMC', desc: 'Vérifiez votre indice de masse corporelle et votre catégorie de poids' },
        { name: 'Calculateur d\'Épargne', desc: 'Calculez la croissance des épargnes et la planification des objectifs' },
        { name: 'Calculateur de Pourcentages', desc: 'Résolvez les augmentations, diminutions et valeurs en pourcentage' },
        { name: 'Calculateur de Pourboire', desc: 'Calculez les pourboires et partagez les additions au restaurant' }
      ],

      // Financial Calculators
      financialTitle: 'Calculateurs Financiers',
      financialDesc: 'Focus Financier: 6 calculateurs pour la catégorie de plus haute valeur. La gestion de l\'argent devient plus facile quand vous comprenez les chiffres. Nos calculateurs financiers vous aident à planifier des prêts, des hypothèques, des économies et des remboursements en toute confiance.',
      financialPopular: ['Calculateur d\'Hypothèque', 'Calculateur de Prêt', 'Calculateur d\'Épargne', 'Calculateur d\'Investissement', 'Calculateur de Budget', 'Calculateur de Carte de Crédit'],
      viewAllFinancial: 'Voir tous les calculateurs financiers',

      // Health Calculators
      healthTitle: 'Calculateurs de Santé et Fitness',
      healthDesc: 'Sensibilité Santé: 5 calculateurs pour le suivi du bien-être. Comprendre vos métriques de santé est une étape importante vers un mode de vie plus sain. Nos calculateurs de santé utilisent des formules standard pour fournir des informations rapides sur le poids, la composition corporelle et les besoins caloriques quotidiens.',
      healthPopular: ['Calculateur IMC', 'Calculateur MB', 'Calculateur de Calories', 'Calculateur de Graisse Corporelle', 'Calculateur de Poids Idéal'],
      exploreHealth: 'Explorer les calculateurs de santé',

      // Math Calculators
      mathTitle: 'Calculateurs de Mathématiques et Quotidien',
      mathDesc: 'Essentiels Mathématiques: 8 calculateurs pour les calculs quotidiens. Des pourcentages simples à la géométrie avancée, nos calculateurs mathématiques aident les étudiants, les professionnels et les familles à obtenir des réponses précises instantanément, sans calculs manuels.',
      mathPopular: ['Calculateur de Pourcentages', 'Calculateur de Fractions', 'Calculateur de Moyenne', 'Convertisseur d\'Unités', 'Calculateur Scientifique', 'Théorème de Pythagore', 'Écart Type', 'Aire du Cercle'],
      browseMath: 'Parcourir les calculateurs mathématiques',

      // Lifestyle Calculators
      lifestyleTitle: 'Calculateurs de Style de Vie',
      lifestyleDesc: 'Calculateurs de Style de Vie: 4 calculateurs pour la planification personnelle. Des budgets et pourboires au suivi des performances académiques, prenez des décisions éclairées concernant vos finances personnelles et vos activités quotidiennes.',
      lifestylePopular: ['Calculateur d\'Âge', 'Calculateur de Pourboire', 'Calculateur GPA', 'Calculateur de Budget'],
      exploreLifestyle: 'Explorer les calculateurs de style de vie',

      // Utility Calculators
      utilityTitle: 'Calculateurs Utilitaires',
      utilityDesc: 'Calculateurs Utilitaires: 3 calculateurs pour la productivité. Outils essentiels pour les tâches quotidiennes comme le comptage de mots, les calculs de dates et les conversions de nombres.',
      utilityPopular: ['Compteur de Mots', 'Convertisseur Nombres en Lettres', 'Calculateur de Date'],
      exploreUtility: 'Explorer les calculateurs utilitaires',

      // Why Use Section
      whyUseTitle: 'Pourquoi Utiliser des Calculateurs en Ligne ?',
      whyUseDesc: 'Les calculateurs en ligne économisent du temps, réduisent les erreurs et vous aident à prendre des décisions éclairées. Au lieu de deviner ou de compter sur des formules complexes, vous obtenez des résultats instantanés utilisant des méthodes de calcul fiables.',
      benefits: [
        'Résultats rapides et précis',
        'Basés sur des formules standard et fiables',
        'Aucune inscription requise',
        'Conviviaux pour mobiles et faciles à utiliser',
        'Accès gratuit à tous les calculateurs'
      ],

      // Accuracy & Trust
      accuracyTitle: 'Précis, Simple et Gratuit',
      accuracyDesc: 'Chaque calculateur sur Calculateur Rapide est conçu avec la clarté et la précision à l\'esprit. Les résultats sont faciles à comprendre et incluent souvent des explications pour vous aider à apprendre, pas seulement à calculer.',
      idealFor: 'Nos outils sont idéaux pour :',
      useCases: [
        'Acheteurs immobiliers et emprunteurs',
        'Étudiants et enseignants',
        'Suivi fitness et santé',
        'Planification financière quotidienne'
      ],

      // Get Started
      getStartedTitle: 'Commencez à Calculer Aujourd\'hui',
      getStartedDesc: 'Explorez notre collection complète de calculateurs en ligne gratuits et prenez le contrôle de vos chiffres en toute confiance.',
      browseAll: 'Parcourir tous les calculateurs',
      exploreGuidance: 'Explorez les calculateurs par catégorie ci-dessus ou visitez notre collection complète',

      brand: 'Calculateur Rapide',
      footer: {
        privacy: 'Politique de Confidentialité',
        terms: 'Conditions d\'Utilisation',
        contact: 'Contact',
        cookie: 'Politique des Cookies',
        disclaimer: 'Avis de Non-Responsabilité',
        about: 'À Propos de Nous',
        copyright: '© 2026 Calculateur Rapide. Tous droits réservés.'
      }
    }
  };

  // Select the appropriate language content
  const selectedContent = content[currentLang as keyof typeof content] || content.en;

  // Load all calculators and group by category
  useEffect(() => {
    const calculators = getAllCalculatorsForHomepage(currentLang);

    // Group calculators by category
    const grouped: { [key: string]: any[] } = {};
    calculators.forEach(calc => {
      const category = (CALCULATOR_CATEGORIES as any)[calc.slug] || 'utility';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(calc);
    });

    // Sort categories and calculators within categories
    const categoryOrder = ['financial', 'lifestyle', 'health', 'math', 'utility'];
    const sortedCategories = Object.keys(grouped).sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    const groupedCalculators = sortedCategories.map(category => ({
      category,
      calculators: grouped[category].sort((a, b) => a.name.localeCompare(b.name))
    }));

    setAllCalculators(groupedCalculators);
  }, [currentLang]);

  // Helper function to create language-aware links
  const createLink = (path: string) => {
    return `/${currentLang}${path}`;
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header currentLang={currentLang} />

      {/* Hero Section */}
      <section id='calculator-search' className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-[10px]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Search */}
          <div className="max-w-md mx-auto relative search-container">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`🔍 ${selectedContent.searchPrompt}`}
                className="w-full px-4 py-3 pl-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
              />
              {showResults && filteredCalculators.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                  {filteredCalculators.slice(0, 8).map((calc) => (
                    <button
                      key={calc.slug}
                      onClick={() => {
                        setSearchQuery('');
                        setShowResults(false);
                        router.push(createLink(`/${calc.slug}`));
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-gray-50"
                    >
                      <div className="font-medium text-gray-900">{calc.name}</div>
                      <div className="text-sm text-gray-600 truncate">{calc.summary}</div>
                    </button>
                  ))}
                  {filteredCalculators.length > 8 && (
                    <div className="px-4 py-2 text-sm text-gray-500 text-center border-t border-gray-100">
                      {filteredCalculators.length - 8} more results...
                    </div>
                  )}
                </div>
              )}
              {showResults && filteredCalculators.length === 0 && searchQuery.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500 z-50">
                  No calculators found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Introduction/About Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 leading-tight text-blue-600">
            {selectedContent.title}
          </h1>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            {selectedContent.introParagraph}
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {selectedContent.exploreCategoriesTitle}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href={createLink('/categories/financial')} className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              💰 Financial
            </Link>
            <Link href={createLink('/categories/health')} className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
              🏥 Health
            </Link>
            <Link href={createLink('/categories/math')} className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
              🧮 Math
            </Link>
            <Link href={createLink('/categories/utility')} className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              🛠️ Utility
            </Link>
            <Link href={createLink('/categories/lifestyle')} className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors">
              🏠 Lifestyle
            </Link>
          </div>
        </div>
      </section>

      {/* Most Popular Calculators */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              ⭐ {selectedContent.mostPopularTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {selectedContent.mostPopularIntro}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedContent.popularCalculators.map((calc, index) => {
              // Map popular calculator names to their slugs
              const slugMap: { [key: string]: string } = {
                'Mortgage Calculator': 'mortgage-calculator',
                'Loan Calculator': 'loan-calculator',
                'BMI Calculator': 'bmi-calculator',
                'Savings Calculator': 'savings-calculator',
                'Percentage Calculator': 'percentage-calculator',
                'Tip Calculator': 'tip-calculator',
                'Calculadora de Hipoteca': 'mortgage-calculator',
                'Calculadora de Préstamos': 'loan-calculator',
                'Calculadora IMC': 'bmi-calculator',
                'Calculadora de Ahorros': 'savings-calculator',
                'Calculadora de Porcentajes': 'percentage-calculator',
                'Calculadora de Propina': 'tip-calculator',
                'Calculateur d\'Hypothèque': 'mortgage-calculator',
                'Calculateur de Prêt': 'loan-calculator',
                'Calculateur IMC': 'bmi-calculator',
                'Calculateur d\'Épargne': 'savings-calculator',
                'Calculateur de Pourcentages': 'percentage-calculator',
                'Calculateur de Pourboire': 'tip-calculator'
              };

              const slug = slugMap[calc.name] || calc.name.toLowerCase().replace(/\s+/g, '-');

              return (
                <Link key={index} href={createLink(`/${slug}`)} className="block">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer">
                    <h3 className="font-semibold text-gray-900 mb-1">{calc.name}</h3>
                    <p className="text-sm text-gray-600">{calc.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Financial Calculators */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💰 {selectedContent.financialTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {selectedContent.financialDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {selectedContent.financialPopular.map((calc, index) => {
              // Map financial calculator names to their slugs
              const financialSlugMap: { [key: string]: string } = {
                'Mortgage Calculator': 'mortgage-calculator',
                'Loan Calculator': 'loan-calculator',
                'Interest Calculator': 'interest-calculator',
                'Savings Calculator': 'savings-calculator',
                'Credit Card Payoff Calculator': 'credit-card-calculator'
              };

              const slug = financialSlugMap[calc] || calc.toLowerCase().replace(/\s+/g, '-');

              return (
                <Link key={index} href={createLink(`/${slug}`)} className="block">
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-300 hover:shadow-md hover:border-blue-400 transition-all cursor-pointer text-center">
                    <span className="text-gray-800">{calc}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link href={createLink('/categories/financial')} className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              👉 {selectedContent.viewAllFinancial}
            </Link>
          </div>
        </div>
      </section>

      {/* Health Calculators */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🏥 {selectedContent.healthTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {selectedContent.healthDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {selectedContent.healthPopular.map((calc, index) => {
              // Map health calculator names to their slugs
              const healthSlugMap: { [key: string]: string } = {
                'BMI Calculator': 'bmi-calculator',
                'BMR Calculator': 'bmr-calculator',
                'Body Fat Calculator': 'body-fat-calculator',
                'Ideal Weight Calculator': 'ideal-weight-calculator'
              };

              const slug = healthSlugMap[calc] || calc.toLowerCase().replace(/\s+/g, '-');

              return (
                <Link key={index} href={createLink(`/${slug}`)} className="block">
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-green-300 hover:shadow-md hover:border-green-400 transition-all cursor-pointer text-center">
                    <span className="text-gray-800">{calc}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link href={createLink('/categories/health')} className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
              👉 {selectedContent.exploreHealth}
            </Link>
          </div>
        </div>
      </section>

      {/* Math Calculators */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🔢 {selectedContent.mathTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {selectedContent.mathDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {selectedContent.mathPopular.map((calc, index) => {
              // Map math calculator names to their slugs
              const mathSlugMap: { [key: string]: string } = {
                'Percentage Calculator': 'percentage-calculator',
                'Average Calculator': 'average-calculator',
                'Fraction Calculator': 'fraction-calculator',
                'Unit Conversion Calculator': 'unit-conversion-calculator',
                'Calculadora de Porcentajes': 'percentage-calculator',
                'Calculadora de Promedio': 'average-calculator',
                'Calculadora de Fracciones': 'fraction-calculator',
                'Calculadora de Conversión de Unidades': 'unit-conversion-calculator',
                'Calculadora de Porcentagens': 'percentage-calculator',
                'Calculadora de Média': 'average-calculator',
                'Calculadora de Frações': 'fraction-calculator',
                'Calculadora de Conversão de Unidades': 'unit-conversion-calculator',
                'Calculateur de Pourcentages': 'percentage-calculator',
                'Calculateur de Moyenne': 'average-calculator',
                'Calculateur de Fractions': 'fraction-calculator',
                'Calculateur de Conversion d\'Unités': 'unit-conversion-calculator'
              };

              const slug = mathSlugMap[calc] || calc.toLowerCase().replace(/\s+/g, '-');

              return (
                <Link key={index} href={createLink(`/${slug}`)} className="block">
                  <div className="bg-white rounded-lg p-4 border-2 border-purple-300 hover:shadow-md hover:border-purple-400 transition-all cursor-pointer text-center">
                    <span className="text-gray-800">{calc}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link href={createLink('/categories/math')} className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
              👉 {selectedContent.browseMath}
            </Link>
          </div>
        </div>
      </section>

      {/* Lifestyle Calculators */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎭 {selectedContent.lifestyleTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {selectedContent.lifestyleDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {selectedContent.lifestylePopular.map((calc, index) => {
              // Map lifestyle calculator names to their slugs
              const lifestyleSlugMap: { [key: string]: string } = {
                'Age Calculator': 'age-calculator',
                'Tip Calculator': 'tip-calculator',
                'GPA Calculator': 'gpa-calculator',
                'Budget Calculator': 'budget-calculator'
              };

              const slug = lifestyleSlugMap[calc] || calc.toLowerCase().replace(/\s+/g, '-');

              return (
                <Link key={index} href={createLink(`/${slug}`)} className="block">
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-indigo-300 hover:shadow-md hover:border-indigo-400 transition-all cursor-pointer text-center">
                    <span className="text-gray-800">{calc}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link href={createLink('/categories/lifestyle')} className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
              👉 {selectedContent.exploreLifestyle}
            </Link>
          </div>
        </div>
      </section>

      {/* Utility Calculators */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🛠️ {selectedContent.utilityTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {selectedContent.utilityDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {selectedContent.utilityPopular.map((calc, index) => {
              // Map utility calculator names to their slugs
              const utilitySlugMap: { [key: string]: string } = {
                'Word Counter': 'word-counter',
                'Numbers to Words Converter': 'numbers-to-words-converter',
                'Date Calculator': 'date-calculator'
              };

              const slug = utilitySlugMap[calc] || calc.toLowerCase().replace(/\s+/g, '-');

              return (
                <Link key={index} href={createLink(`/${slug}`)} className="block">
                  <div className="bg-white rounded-lg p-4 border-2 border-teal-300 hover:shadow-md hover:border-teal-400 transition-all cursor-pointer text-center">
                    <span className="text-gray-800">{calc}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link href={createLink('/categories/utility')} className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
              👉 {selectedContent.exploreUtility}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Use Online Calculators */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📘 {selectedContent.whyUseTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {selectedContent.whyUseDesc}
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {selectedContent.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-left">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accuracy & Trust */}
      <section className="py-10 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🛡️ {selectedContent.accuracyTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {selectedContent.accuracyDesc}
          </p>

          <div className="text-center max-w-4xl mx-auto">
            <p className="text-gray-700 mb-4 font-medium">{selectedContent.idealFor}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {selectedContent.useCases.map((useCase, index) => (
                <div key={index} className="flex items-center justify-center sm:justify-start">
                  <span className="text-blue-500 mr-2 text-lg">•</span>
                  <span className="text-gray-700">{useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-10 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🚀 {selectedContent.getStartedTitle}
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {selectedContent.getStartedDesc}
          </p>

          <div className="text-center">
            <p className="text-sm text-gray-400 mb-4">
              {selectedContent.exploreGuidance}
            </p>
            <Link href={createLink('/')} className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
              🔄 Back to Top
            </Link>
          </div>
        </div>
      </section>

      <Footer currentLang={currentLang} />
    </main>
  );
}
