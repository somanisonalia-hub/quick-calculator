import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const validLanguages = ['en', 'es', 'pt', 'fr'];

const translations = {
  en: {
    title: 'Terms of Service | Quick Calculator',
    description: 'Terms and conditions for using Quick Calculator services.',
    heading: 'Terms of Service',
    intro: 'By accessing and using the Quick Calculator website (quick-calculator.org), you accept and agree to be bound by the terms and provision of this agreement.',
    sections: {
      agreement: 'Agreement to Terms',
      license: 'Use License',
      disclaimer: 'Disclaimer',
      limitations: 'Limitations',
      revisions: 'Revisions and Errata',
      links: 'Links',
      modifications: 'Modifications',
      governing: 'Governing Law',
      contact: 'Contact Us',
      contactEmail: 'Email: support@quick-calculator.org',
      lastUpdated: 'Last Updated: January 2026'
    }
  },
  es: {
    title: 'Términos de Servicio | Quick Calculator',
    description: 'Términos y condiciones para usar los servicios de Quick Calculator.',
    heading: 'Términos de Servicio',
    intro: 'Al acceder y usar el sitio web Quick Calculator (quick-calculator.org), acepta y acepta estar sujeto a los términos y disposiciones de este acuerdo.',
    sections: {
      agreement: 'Acuerdo con los Términos',
      license: 'Licencia de Uso',
      disclaimer: 'Descargo de Responsabilidad',
      limitations: 'Limitaciones',
      revisions: 'Revisiones y Erratas',
      links: 'Enlaces',
      modifications: 'Modificaciones',
      governing: 'Ley Aplicable',
      contact: 'Contáctenos',
      contactEmail: 'Email: support@quick-calculator.org',
      lastUpdated: 'Última Actualización: Enero 2026'
    }
  },
  pt: {
    title: 'Termos de Serviço | Quick Calculator',
    description: 'Termos e condições para usar os serviços do Quick Calculator.',
    heading: 'Termos de Serviço',
    intro: 'Ao acessar e usar o site Quick Calculator (quick-calculator.org), você aceita e concorda em estar vinculado aos termos e provisões deste acordo.',
    sections: {
      agreement: 'Acordo com os Termos',
      license: 'Licença de Uso',
      disclaimer: 'Isenção de Responsabilidade',
      limitations: 'Limitações',
      revisions: 'Revisões e Errata',
      links: 'Links',
      modifications: 'Modificações',
      governing: 'Lei Aplicável',
      contact: 'Entre em Contato',
      contactEmail: 'Email: support@quick-calculator.org',
      lastUpdated: 'Última Atualização: Janeiro 2026'
    }
  },
  fr: {
    title: 'Conditions d\'Utilisation | Quick Calculator',
    description: 'Termes et conditions pour utiliser les services de Quick Calculator.',
    heading: 'Conditions d\'Utilisation',
    intro: 'En accédant et en utilisant le site Web Quick Calculator (quick-calculator.org), vous acceptez et acceptez d\'être lié par les termes et dispositions de cet accord.',
    sections: {
      agreement: 'Accord avec les Conditions',
      license: 'Licence d\'Utilisation',
      disclaimer: 'Avis de Non-Responsabilité',
      limitations: 'Limitations',
      revisions: 'Révisions et Errata',
      links: 'Liens',
      modifications: 'Modifications',
      governing: 'Loi Applicable',
      contact: 'Nous Contacter',
      contactEmail: 'Email: support@quick-calculator.org',
      lastUpdated: 'Dernière Mise à Jour: Janvier 2026'
    }
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
      canonical: lang === 'en' ? 'https://quick-calculator.org/terms-of-service' : `https://quick-calculator.org/${lang}/terms-of-service`,
      languages: {
        'en': 'https://quick-calculator.org/en/terms-of-service',
        'es': 'https://quick-calculator.org/es/terms-of-service',
        'fr': 'https://quick-calculator.org/fr/terms-of-service',
        'pt': 'https://quick-calculator.org/pt/terms-of-service',
        'x-default': 'https://quick-calculator.org/en/terms-of-service',
      }
    }
  };
}

export default async function TermsOfServicePage({ params }: { params: Promise<{ lang: string }> }) {
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
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. {t.sections.agreement}</h2>
            <p>{t.intro}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. {t.sections.license}</h2>
            <p>{lang === 'en' ? 'Permission is granted to temporarily download one copy of the materials (information or software) on the Quick Calculator website for personal, non-commercial transitory viewing only.' :
               lang === 'es' ? 'Se otorga permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de Quick Calculator solo para visualización transitoria personal y no comercial.' :
               lang === 'pt' ? 'É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Quick Calculator apenas para visualização transitória pessoal e não comercial.' :
               'La permission est accordée de télécharger temporairement une copie des matériaux (informations ou logiciels) sur le site Web Quick Calculator uniquement pour un affichage transitoire personnel et non commercial.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. {t.sections.disclaimer}</h2>
            <p>{lang === 'en' ? 'The materials on the Quick Calculator website are provided "as is". Quick Calculator makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.' :
               lang === 'es' ? 'Los materiales en el sitio web de Quick Calculator se proporcionan "tal cual". Quick Calculator no ofrece garantías, expresas o implícitas, y por la presente rechaza y niega todas las demás garantías.' :
               lang === 'pt' ? 'Os materiais no site Quick Calculator são fornecidos "como estão". Quick Calculator não oferece garantias, expressas ou implícitas, e por meio deste renuncia e nega todas as outras garantias.' :
               'Les matériaux sur le site Web Quick Calculator sont fournis "tels quels". Quick Calculator ne donne aucune garantie, expresse ou implicite, et décline par la présente toutes les autres garanties.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. {t.sections.limitations}</h2>
            <p>{lang === 'en' ? 'In no event shall Quick Calculator or its suppliers be liable for any damages arising out of the use or inability to use the materials on Quick Calculator website.' :
               lang === 'es' ? 'En ningún caso Quick Calculator o sus proveedores serán responsables de ningún daño que surja del uso o la imposibilidad de usar los materiales en el sitio web de Quick Calculator.' :
               lang === 'pt' ? 'Em nenhuma circunstância Quick Calculator ou seus fornecedores serão responsáveis por quaisquer danos decorrentes do uso ou incapacidade de usar os materiais no site Quick Calculator.' :
               'En aucun cas Quick Calculator ou ses fournisseurs ne seront responsables de tout dommage découlant de l\'utilisation ou de l\'impossibilité d\'utiliser les matériaux sur le site Web Quick Calculator.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. {t.sections.contact}</h2>
            <p>{t.sections.contactEmail}</p>
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
