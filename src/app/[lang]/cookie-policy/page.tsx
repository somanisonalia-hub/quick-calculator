import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const validLanguages = ['en', 'es', 'pt', 'fr'];

const translations = {
  en: {
    title: 'Cookie Policy | Quick Calculator',
    description: 'Learn about how Quick Calculator uses cookies and similar technologies.',
    heading: 'Cookie Policy',
    lastUpdated: 'Last Updated: January 2026'
  },
  es: {
    title: 'Política de Cookies | Quick Calculator',
    description: 'Conozca cómo Quick Calculator utiliza cookies y tecnologías similares.',
    heading: 'Política de Cookies',
    lastUpdated: 'Última Actualización: Enero 2026'
  },
  pt: {
    title: 'Política de Cookies | Quick Calculator',
    description: 'Saiba como o Quick Calculator usa cookies e tecnologias semelhantes.',
    heading: 'Política de Cookies',
    lastUpdated: 'Última Atualização: Janeiro 2026'
  },
  fr: {
    title: 'Politique des Cookies | Quick Calculator',
    description: 'Découvrez comment Quick Calculator utilise les cookies et technologies similaires.',
    heading: 'Politique des Cookies',
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
      canonical: lang === 'en' ? 'https://quick-calculator.org/cookie-policy' : `https://quick-calculator.org/${lang}/cookie-policy`,
      languages: {
        'en': 'https://quick-calculator.org/en/cookie-policy',
        'es': 'https://quick-calculator.org/es/cookie-policy',
        'fr': 'https://quick-calculator.org/fr/cookie-policy',
        'pt': 'https://quick-calculator.org/pt/cookie-policy',
        'x-default': 'https://quick-calculator.org/en/cookie-policy',
      }
    }
  };
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ lang: string }> }) {
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
            <p>{lang === 'en' ? 'This Cookie Policy explains how Quick Calculator uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.' :
               lang === 'es' ? 'Esta Política de Cookies explica cómo Quick Calculator utiliza cookies y tecnologías similares para reconocerlo cuando visita nuestro sitio web. Explica qué son estas tecnologías y por qué las usamos, así como sus derechos para controlar nuestro uso de ellas.' :
               lang === 'pt' ? 'Esta Política de Cookies explica como o Quick Calculator usa cookies e tecnologias semelhantes para reconhecê-lo quando você visita nosso site. Ela explica o que são essas tecnologias e por que as usamos, bem como seus direitos de controlar nosso uso delas.' :
               'Cette Politique des Cookies explique comment Quick Calculator utilise les cookies et technologies similaires pour vous reconnaître lorsque vous visitez notre site Web. Elle explique ce que sont ces technologies et pourquoi nous les utilisons, ainsi que vos droits de contrôler notre utilisation de celles-ci.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{lang === 'en' ? 'What are cookies?' : lang === 'es' ? '¿Qué son las cookies?' : lang === 'pt' ? 'O que são cookies?' : 'Que sont les cookies?'}</h2>
            <p>{lang === 'en' ? 'Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.' :
               lang === 'es' ? 'Las cookies son pequeños archivos de datos que se colocan en su computadora o dispositivo móvil cuando visita un sitio web. Las cookies son ampliamente utilizadas por los propietarios de sitios web para hacer que sus sitios web funcionen, o para que funcionen de manera más eficiente, así como para proporcionar información de informes.' :
               lang === 'pt' ? 'Cookies são pequenos arquivos de dados que são colocados em seu computador ou dispositivo móvel quando você visita um site. Os cookies são amplamente usados pelos proprietários de sites para fazer seus sites funcionarem, ou para funcionarem de forma mais eficiente, bem como para fornecer informações de relatórios.' :
               'Les cookies sont de petits fichiers de données qui sont placés sur votre ordinateur ou appareil mobile lorsque vous visitez un site Web. Les cookies sont largement utilisés par les propriétaires de sites Web pour faire fonctionner leurs sites Web, ou pour les faire fonctionner plus efficacement, ainsi que pour fournir des informations de rapport.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{lang === 'en' ? 'Types of cookies we use' : lang === 'es' ? 'Tipos de cookies que usamos' : lang === 'pt' ? 'Tipos de cookies que usamos' : 'Types de cookies que nous utilisons'}</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>{lang === 'en' ? 'Essential cookies' : lang === 'es' ? 'Cookies esenciales' : lang === 'pt' ? 'Cookies essenciais' : 'Cookies essentiels'}:</strong> {lang === 'en' ? 'Required for the website to function properly' : lang === 'es' ? 'Necesarias para que el sitio web funcione correctamente' : lang === 'pt' ? 'Necessários para que o site funcione corretamente' : 'Requis pour que le site Web fonctionne correctement'}</li>
              <li><strong>{lang === 'en' ? 'Analytics cookies' : lang === 'es' ? 'Cookies analíticas' : lang === 'pt' ? 'Cookies analíticos' : 'Cookies analytiques'}:</strong> {lang === 'en' ? 'Help us understand how visitors use our site' : lang === 'es' ? 'Nos ayudan a comprender cómo los visitantes usan nuestro sitio' : lang === 'pt' ? 'Nos ajudam a entender como os visitantes usam nosso site' : 'Nous aident à comprendre comment les visiteurs utilisent notre site'}</li>
              <li><strong>{lang === 'en' ? 'Advertising cookies' : lang === 'es' ? 'Cookies publicitarias' : lang === 'pt' ? 'Cookies de publicidade' : 'Cookies publicitaires'}:</strong> {lang === 'en' ? 'Used to display relevant advertisements' : lang === 'es' ? 'Utilizadas para mostrar anuncios relevantes' : lang === 'pt' ? 'Usados para exibir anúncios relevantes' : 'Utilisés pour afficher des publicités pertinentes'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{lang === 'en' ? 'How to control cookies' : lang === 'es' ? 'Cómo controlar las cookies' : lang === 'pt' ? 'Como controlar cookies' : 'Comment contrôler les cookies'}</h2>
            <p>{lang === 'en' ? 'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.' :
               lang === 'es' ? 'Puede controlar y/o eliminar cookies como desee. Puede eliminar todas las cookies que ya están en su computadora y puede configurar la mayoría de los navegadores para evitar que se coloquen.' :
               lang === 'pt' ? 'Você pode controlar e/ou excluir cookies como desejar. Você pode excluir todos os cookies que já estão em seu computador e pode configurar a maioria dos navegadores para impedir que sejam colocados.' :
               'Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies qui sont déjà sur votre ordinateur et vous pouvez configurer la plupart des navigateurs pour empêcher leur placement.'}</p>
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
