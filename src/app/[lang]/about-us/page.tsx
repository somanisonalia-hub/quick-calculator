import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const validLanguages = ['en', 'es', 'pt', 'fr'];

const translations = {
  en: {
    title: 'About Us | Quick Calculator',
    description: 'Learn more about Quick Calculator and our mission to provide free, easy-to-use calculators.',
    heading: 'About Us',
    mission: 'Our Mission',
    missionText: 'Quick Calculator is dedicated to providing free, accurate, and easy-to-use calculators for everyone. Whether you need financial calculators, health tools, or mathematical utilities, we aim to make complex calculations simple and accessible.',
    what: 'What We Offer',
    whatText: 'We offer a wide range of calculators across multiple categories including financial, health, math, utility, and lifestyle calculators. All our tools are free to use and require no registration.',
    commitment: 'Our Commitment',
    commitmentText: 'We are committed to maintaining accurate calculators, protecting your privacy, and continuously improving our services based on user feedback.',
    lastUpdated: 'Last Updated: January 2026'
  },
  es: {
    title: 'Sobre Nosotros | Quick Calculator',
    description: 'Conozca más sobre Quick Calculator y nuestra misión de proporcionar calculadoras gratuitas y fáciles de usar.',
    heading: 'Sobre Nosotros',
    mission: 'Nuestra Misión',
    missionText: 'Quick Calculator se dedica a proporcionar calculadoras gratuitas, precisas y fáciles de usar para todos. Ya sea que necesite calculadoras financieras, herramientas de salud o utilidades matemáticas, nuestro objetivo es hacer que los cálculos complejos sean simples y accesibles.',
    what: 'Lo Que Ofrecemos',
    whatText: 'Ofrecemos una amplia gama de calculadoras en múltiples categorías, incluyendo calculadoras financieras, de salud, matemáticas, de utilidad y de estilo de vida. Todas nuestras herramientas son gratuitas y no requieren registro.',
    commitment: 'Nuestro Compromiso',
    commitmentText: 'Estamos comprometidos a mantener calculadoras precisas, proteger su privacidad y mejorar continuamente nuestros servicios basados en los comentarios de los usuarios.',
    lastUpdated: 'Última Actualización: Enero 2026'
  },
  pt: {
    title: 'Sobre Nós | Quick Calculator',
    description: 'Saiba mais sobre o Quick Calculator e nossa missão de fornecer calculadoras gratuitas e fáceis de usar.',
    heading: 'Sobre Nós',
    mission: 'Nossa Missão',
    missionText: 'Quick Calculator é dedicado a fornecer calculadoras gratuitas, precisas e fáceis de usar para todos. Seja você precisando de calculadoras financeiras, ferramentas de saúde ou utilidades matemáticas, nosso objetivo é tornar cálculos complexos simples e acessíveis.',
    what: 'O Que Oferecemos',
    whatText: 'Oferecemos uma ampla gama de calculadoras em várias categorias, incluindo calculadoras financeiras, de saúde, matemáticas, de utilidades e de estilo de vida. Todas as nossas ferramentas são gratuitas e não requerem registro.',
    commitment: 'Nosso Compromisso',
    commitmentText: 'Estamos comprometidos em manter calculadoras precisas, proteger sua privacidade e melhorar continuamente nossos serviços com base no feedback dos usuários.',
    lastUpdated: 'Última Atualização: Janeiro 2026'
  },
  fr: {
    title: 'À Propos de Nous | Quick Calculator',
    description: 'En savoir plus sur Quick Calculator et notre mission de fournir des calculatrices gratuites et faciles à utiliser.',
    heading: 'À Propos de Nous',
    mission: 'Notre Mission',
    missionText: 'Quick Calculator est dédié à fournir des calculatrices gratuites, précises et faciles à utiliser pour tous. Que vous ayez besoin de calculatrices financières, d\'outils de santé ou d\'utilitaires mathématiques, notre objectif est de rendre les calculs complexes simples et accessibles.',
    what: 'Ce Que Nous Offrons',
    whatText: 'Nous offrons une large gamme de calculatrices dans plusieurs catégories, y compris les calculatrices financières, de santé, mathématiques, utilitaires et de style de vie. Tous nos outils sont gratuits et ne nécessitent aucune inscription.',
    commitment: 'Notre Engagement',
    commitmentText: 'Nous nous engageons à maintenir des calculatrices précises, à protéger votre vie privée et à améliorer continuellement nos services en fonction des commentaires des utilisateurs.',
    lastUpdated: 'Dernière Mise à Jour: Janvier 2026'
  }
};

export async function generateStaticParams() {
  return validLanguages.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  if (!validLanguages.includes(lang)) {
    return {};
  }

  const t = translations[lang as keyof typeof translations];
  
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `https://quick-calculator.org/${lang}/about-us`,
      languages: {
        'en': 'https://quick-calculator.org/en/about-us',
        'es': 'https://quick-calculator.org/es/about-us',
        'fr': 'https://quick-calculator.org/fr/about-us',
        'pt': 'https://quick-calculator.org/pt/about-us',
        'x-default': 'https://quick-calculator.org/en/about-us',
      }
    }
  };
}

export default async function AboutUsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  if (!validLanguages.includes(lang)) {
    notFound();
  }

  const t = translations[lang as keyof typeof translations];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t.heading}</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t.mission}</h2>
            <p>{t.missionText}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t.what}</h2>
            <p>{t.whatText}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t.commitment}</h2>
            <p>{t.commitmentText}</p>
          </section>

          <section className="bg-gray-100 p-4 rounded-lg mt-8">
            <p className="text-sm text-gray-600">
              <strong>{t.lastUpdated}</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
