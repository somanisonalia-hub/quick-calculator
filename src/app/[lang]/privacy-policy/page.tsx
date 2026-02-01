import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const validLanguages = ['en', 'es', 'pt', 'fr'];

const translations = {
  en: {
    title: 'Privacy Policy | Quick Calculator',
    description: 'Our privacy policy outlines how we collect, use, and protect your data.',
    heading: 'Privacy Policy',
    intro: 'Quick Calculator ("we", "our", or "us") operates the quick-calculator.org website (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.',
    sections: {
      collection: {
        title: 'Information Collection and Use',
        cookies: 'Cookies',
        cookiesDesc: 'We use cookies and similar tracking technologies to track activity on our Site and to hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.',
        logData: 'Log Data',
        logDataDesc: 'We collect information that your browser sends whenever you visit our Site ("Log Data"). This may include your computer\'s Internet Protocol ("IP") address, browser type, browser version, the pages you visit, the time and date of your visit, and other statistics.',
      },
      use: 'Use of Data',
      security: 'Security of Data',
      rights: 'Your Data Protection Rights',
      cookies: 'Cookie Management',
      thirdParty: 'Third-Party Services',
      children: 'Children\'s Privacy',
      changes: 'Changes to This Privacy Policy',
      contact: 'Contact Us',
      lastUpdated: 'Last Updated: January 2026'
    },
    contactEmail: 'Email: privacy@quick-calculator.org'
  },
  es: {
    title: 'Política de Privacidad | Quick Calculator',
    description: 'Nuestra política de privacidad describe cómo recopilamos, usamos y protegemos sus datos.',
    heading: 'Política de Privacidad',
    intro: 'Quick Calculator ("nosotros", "nuestro" o "nos") opera el sitio web quick-calculator.org (el "Sitio"). Esta página le informa sobre nuestras políticas con respecto a la recopilación, uso y divulgación de datos personales cuando utiliza nuestro Servicio y las opciones que tiene asociadas con esos datos.',
    sections: {
      collection: {
        title: 'Recopilación y Uso de Información',
        cookies: 'Cookies',
        cookiesDesc: 'Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro Sitio y para mantener cierta información. Las cookies son archivos con una pequeña cantidad de datos que pueden incluir un identificador único anónimo.',
        logData: 'Datos de Registro',
        logDataDesc: 'Recopilamos información que su navegador envía cada vez que visita nuestro Sitio ("Datos de Registro"). Esto puede incluir la dirección de Protocolo de Internet ("IP") de su computadora, tipo de navegador, versión del navegador, las páginas que visita, la hora y fecha de su visita y otras estadísticas.',
      },
      use: 'Uso de Datos',
      security: 'Seguridad de Datos',
      rights: 'Sus Derechos de Protección de Datos',
      cookies: 'Gestión de Cookies',
      thirdParty: 'Servicios de Terceros',
      children: 'Privacidad de Menores',
      changes: 'Cambios a Esta Política de Privacidad',
      contact: 'Contáctenos',
      lastUpdated: 'Última Actualización: Enero 2026'
    },
    contactEmail: 'Email: privacy@quick-calculator.org'
  },
  pt: {
    title: 'Política de Privacidade | Quick Calculator',
    description: 'Nossa política de privacidade descreve como coletamos, usamos e protegemos seus dados.',
    heading: 'Política de Privacidade',
    intro: 'Quick Calculator ("nós", "nosso" ou "nos") opera o site quick-calculator.org (o "Site"). Esta página informa sobre nossas políticas em relação à coleta, uso e divulgação de dados pessoais quando você usa nosso Serviço e as escolhas que você tem associadas a esses dados.',
    sections: {
      collection: {
        title: 'Coleta e Uso de Informações',
        cookies: 'Cookies',
        cookiesDesc: 'Usamos cookies e tecnologias de rastreamento semelhantes para rastrear a atividade em nosso Site e para manter certas informações. Os cookies são arquivos com uma pequena quantidade de dados que podem incluir um identificador único anônimo.',
        logData: 'Dados de Registro',
        logDataDesc: 'Coletamos informações que seu navegador envia sempre que você visita nosso Site ("Dados de Registro"). Isso pode incluir o endereço de Protocolo de Internet ("IP") do seu computador, tipo de navegador, versão do navegador, as páginas que você visita, a hora e data da sua visita e outras estatísticas.',
      },
      use: 'Uso de Dados',
      security: 'Segurança de Dados',
      rights: 'Seus Direitos de Proteção de Dados',
      cookies: 'Gerenciamento de Cookies',
      thirdParty: 'Serviços de Terceiros',
      children: 'Privacidade de Crianças',
      changes: 'Alterações a Esta Política de Privacidade',
      contact: 'Entre em Contato',
      lastUpdated: 'Última Atualização: Janeiro 2026'
    },
    contactEmail: 'Email: privacy@quick-calculator.org'
  },
  fr: {
    title: 'Politique de Confidentialité | Quick Calculator',
    description: 'Notre politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos données.',
    heading: 'Politique de Confidentialité',
    intro: 'Quick Calculator ("nous", "notre" ou "nos") exploite le site Web quick-calculator.org (le "Site"). Cette page vous informe de nos politiques concernant la collecte, l\'utilisation et la divulgation de données personnelles lorsque vous utilisez notre Service et les choix que vous avez associés à ces données.',
    sections: {
      collection: {
        title: 'Collecte et Utilisation des Informations',
        cookies: 'Cookies',
        cookiesDesc: 'Nous utilisons des cookies et des technologies de suivi similaires pour suivre l\'activité sur notre Site et pour conserver certaines informations. Les cookies sont des fichiers contenant une petite quantité de données qui peuvent inclure un identifiant unique anonyme.',
        logData: 'Données de Journal',
        logDataDesc: 'Nous collectons les informations que votre navigateur envoie chaque fois que vous visitez notre Site ("Données de Journal"). Cela peut inclure l\'adresse de protocole Internet ("IP") de votre ordinateur, le type de navigateur, la version du navigateur, les pages que vous visitez, l\'heure et la date de votre visite et d\'autres statistiques.',
      },
      use: 'Utilisation des Données',
      security: 'Sécurité des Données',
      rights: 'Vos Droits de Protection des Données',
      cookies: 'Gestion des Cookies',
      thirdParty: 'Services Tiers',
      children: 'Confidentialité des Enfants',
      changes: 'Modifications de Cette Politique de Confidentialité',
      contact: 'Nous Contacter',
      lastUpdated: 'Dernière Mise à Jour: Janvier 2026'
    },
    contactEmail: 'Email: privacy@quick-calculator.org'
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
      canonical: `https://quick-calculator.org/${lang}/privacy-policy`,
      languages: {
        'en': 'https://quick-calculator.org/en/privacy-policy',
        'es': 'https://quick-calculator.org/es/privacy-policy',
        'fr': 'https://quick-calculator.org/fr/privacy-policy',
        'pt': 'https://quick-calculator.org/pt/privacy-policy',
        'x-default': 'https://quick-calculator.org/en/privacy-policy',
      }
    }
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
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
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. {t.sections.collection.title}</h2>
            <p>{t.intro}</p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.sections.collection.cookies}</h3>
            <p>{t.sections.collection.cookiesDesc}</p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t.sections.collection.logData}</h3>
            <p>{t.sections.collection.logDataDesc}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. {t.sections.use}</h2>
            <p>{lang === 'en' ? 'Quick Calculator uses the collected data for various purposes including providing and maintaining our Service, notifying you about changes, providing customer support, gathering analysis or valuable information to improve our Service, monitoring usage, detecting and preventing technical issues, and providing you with news and special offers.' : 
               lang === 'es' ? 'Quick Calculator utiliza los datos recopilados para diversos propósitos, incluyendo proporcionar y mantener nuestro Servicio, notificarle sobre cambios, proporcionar atención al cliente, recopilar análisis o información valiosa para mejorar nuestro Servicio, monitorear el uso, detectar y prevenir problemas técnicos, y proporcionarle noticias y ofertas especiales.' :
               lang === 'pt' ? 'Quick Calculator usa os dados coletados para vários propósitos, incluindo fornecer e manter nosso Serviço, notificá-lo sobre mudanças, fornecer suporte ao cliente, coletar análises ou informações valiosas para melhorar nosso Serviço, monitorar o uso, detectar e prevenir problemas técnicos e fornecer notícias e ofertas especiais.' :
               'Quick Calculator utilise les données collectées à diverses fins, notamment pour fournir et maintenir notre Service, vous informer des changements, fournir un support client, recueillir des analyses ou des informations précieuses pour améliorer notre Service, surveiller l\'utilisation, détecter et prévenir les problèmes techniques et vous fournir des nouvelles et des offres spéciales.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. {t.sections.security}</h2>
            <p>{lang === 'en' ? 'The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.' :
               lang === 'es' ? 'La seguridad de sus datos es importante para nosotros, pero recuerde que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por usar medios comercialmente aceptables para proteger sus datos personales, no podemos garantizar su seguridad absoluta.' :
               lang === 'pt' ? 'A segurança dos seus dados é importante para nós, mas lembre-se de que nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro. Embora nos esforcemos para usar meios comercialmente aceitáveis para proteger seus dados pessoais, não podemos garantir sua segurança absoluta.' :
               'La sécurité de vos données est importante pour nous, mais rappelez-vous qu\'aucune méthode de transmission sur Internet ou méthode de stockage électronique n\'est sûre à 100%. Bien que nous nous efforcions d\'utiliser des moyens commercialement acceptables pour protéger vos données personnelles, nous ne pouvons garantir leur sécurité absolue.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. {t.sections.contact}</h2>
            <p>{t.contactEmail}</p>
          </section>

          <section className="bg-gray-100 p-4 rounded-lg mt-8">
            <p className="text-sm text-gray-600">
              <strong>{t.sections.lastUpdated}</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
