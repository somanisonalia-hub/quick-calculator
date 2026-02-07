import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const validLanguages = ['en', 'es', 'pt', 'fr', 'de', 'nl'];

const translations = {
  en: {
    title: 'Contact Us | Quick Calculator',
    description: 'Get in touch with Quick Calculator team.',
    heading: 'Contact Us',
    intro: 'We\'d love to hear from you! If you have any questions, suggestions, or feedback, please don\'t hesitate to reach out to us.',
    email: 'Email',
    generalEmail: 'General Inquiries: contact@quick-calculator.org',
    supportEmail: 'Support: support@quick-calculator.org',
    privacyEmail: 'Privacy Concerns: privacy@quick-calculator.org',
    response: 'Response Time',
    responseText: 'We typically respond to all inquiries within 24-48 hours during business days.',
    lastUpdated: 'Last Updated: January 2026'
  },
  es: {
    title: 'Contacto | Quick Calculator',
    description: 'Póngase en contacto con el equipo de Quick Calculator.',
    heading: 'Contacto',
    intro: '¡Nos encantaría saber de usted! Si tiene alguna pregunta, sugerencia o comentario, no dude en contactarnos.',
    email: 'Correo Electrónico',
    generalEmail: 'Consultas Generales: contact@quick-calculator.org',
    supportEmail: 'Soporte: support@quick-calculator.org',
    privacyEmail: 'Preocupaciones de Privacidad: privacy@quick-calculator.org',
    response: 'Tiempo de Respuesta',
    responseText: 'Normalmente respondemos a todas las consultas dentro de 24-48 horas durante los días hábiles.',
    lastUpdated: 'Última Actualización: Enero 2026'
  },
  pt: {
    title: 'Contato | Quick Calculator',
    description: 'Entre em contato com a equipe do Quick Calculator.',
    heading: 'Contato',
    intro: 'Adoraríamos ouvir de você! Se você tiver alguma pergunta, sugestão ou feedback, não hesite em nos contatar.',
    email: 'E-mail',
    generalEmail: 'Consultas Gerais: contact@quick-calculator.org',
    supportEmail: 'Suporte: support@quick-calculator.org',
    privacyEmail: 'Preocupações com Privacidade: privacy@quick-calculator.org',
    response: 'Tempo de Resposta',
    responseText: 'Normalmente respondemos a todas as consultas dentro de 24-48 horas durante os dias úteis.',
    lastUpdated: 'Última Atualização: Janeiro 2026'
  },
  fr: {
    title: 'Contact | Quick Calculator',
    description: 'Contactez l\'équipe de Quick Calculator.',
    heading: 'Contact',
    intro: 'Nous serions ravis de vous entendre! Si vous avez des questions, des suggestions ou des commentaires, n\'hésitez pas à nous contacter.',
    email: 'E-mail',
    generalEmail: 'Demandes Générales: contact@quick-calculator.org',
    supportEmail: 'Support: support@quick-calculator.org',
    privacyEmail: 'Préoccupations en Matière de Confidentialité: privacy@quick-calculator.org',
    response: 'Temps de Réponse',
    responseText: 'Nous répondons généralement à toutes les demandes dans les 24 à 48 heures pendant les jours ouvrables.',
    lastUpdated: 'Dernière Mise à Jour: Janvier 2026'
  },
  de: {
    title: 'Kontakt | Quick Calculator',
    description: 'Kontaktieren Sie das Quick Calculator-Team.',
    heading: 'Kontakt',
    intro: 'Wir würden gerne von Ihnen hören! Wenn Sie Fragen, Vorschläge oder Feedback haben, wenden Sie sich bitte an uns.',
    email: 'E-Mail',
    generalEmail: 'Allgemeine Anfragen: contact@quick-calculator.org',
    supportEmail: 'Unterstützung: support@quick-calculator.org',
    privacyEmail: 'Datenschutzbedenken: privacy@quick-calculator.org',
    response: 'Antwortzeit',
    responseText: 'Wir antworten normalerweise auf alle Anfragen innerhalb von 24-48 Stunden an Arbeitstagen.',
    lastUpdated: 'Zuletzt aktualisiert: Januar 2026'
  },
  nl: {
    title: 'Contact | Quick Calculator',
    description: 'Neem contact op met het Quick Calculator-team.',
    heading: 'Contact',
    intro: 'Wij horen graag van u! Heeft u vragen, suggesties of feedback, neem dan gerust contact met ons op.',
    email: 'E-mail',
    generalEmail: 'Algemene Vragen: contact@quick-calculator.org',
    supportEmail: 'Ondersteuning: support@quick-calculator.org',
    privacyEmail: 'Privacybedenken: privacy@quick-calculator.org',
    response: 'Reactietijd',
    responseText: 'We reageren normaal op alle verzoeken binnen 24-48 uur op werkdagen.',
    lastUpdated: 'Laatst bijgewerkt: januari 2026'
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
      canonical: lang === 'en' ? 'https://quick-calculator.org/contact' : `https://quick-calculator.org/${lang}/contact`,
      languages: {
        'en': 'https://quick-calculator.org/en/contact',
        'es': 'https://quick-calculator.org/es/contact',
        'pt': 'https://quick-calculator.org/pt/contact',
        'fr': 'https://quick-calculator.org/fr/contact',
        'de': 'https://quick-calculator.org/de/contact',
        'nl': 'https://quick-calculator.org/nl/contact',
        'x-default': 'https://quick-calculator.org/en/contact',
      }
    }
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
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
            <p>{t.intro}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t.email}</h2>
            <ul className="list-none space-y-2">
              <li>{t.generalEmail}</li>
              <li>{t.supportEmail}</li>
              <li>{t.privacyEmail}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{t.response}</h2>
            <p>{t.responseText}</p>
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
