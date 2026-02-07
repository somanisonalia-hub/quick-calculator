import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const validLanguages = ['en', 'es', 'pt', 'fr', 'de', 'nl'];

const translations = {
  en: {
    title: 'Disclaimer | Quick Calculator',
    description: 'Important disclaimers and limitations regarding the use of Quick Calculator.',
    heading: 'Disclaimer',
    lastUpdated: 'Last Updated: January 2026'
  },
  es: {
    title: 'Descargo de Responsabilidad | Quick Calculator',
    description: 'Descargos de responsabilidad y limitaciones importantes sobre el uso de Quick Calculator.',
    heading: 'Descargo de Responsabilidad',
    lastUpdated: 'Última Actualización: Enero 2026'
  },
  pt: {
    title: 'Isenção de Responsabilidade | Quick Calculator',
    description: 'Isenções de responsabilidade e limitações importantes sobre o uso do Quick Calculator.',
    heading: 'Isenção de Responsabilidade',
    lastUpdated: 'Última Atualização: Janeiro 2026'
  },
  fr: {
    title: 'Avis de Non-Responsabilité | Quick Calculator',
    description: 'Avis de non-responsabilité et limitations importantes concernant l\'utilisation de Quick Calculator.',
    heading: 'Avis de Non-Responsabilité',
    lastUpdated: 'Dernière Mise à Jour: Janvier 2026'
  },
  de: {
    title: 'Haftungsausschluss | Quick Calculator',
    description: 'Wichtige Haftungsausschlüsse und Einschränkungen bezüglich der Nutzung von Quick Calculator.',
    heading: 'Haftungsausschluss',
    lastUpdated: 'Zuletzt aktualisiert: Januar 2026'
  },
  nl: {
    title: 'Disclaimer | Quick Calculator',
    description: 'Belangrijke disclaimers en beperkingen met betrekking tot het gebruik van Quick Calculator.',
    heading: 'Disclaimer',
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
      canonical: lang === 'en' ? 'https://quick-calculator.org/disclaimer' : `https://quick-calculator.org/${lang}/disclaimer`,
      languages: {
        'en': 'https://quick-calculator.org/en/disclaimer',
        'es': 'https://quick-calculator.org/es/disclaimer',
        'pt': 'https://quick-calculator.org/pt/disclaimer',
        'fr': 'https://quick-calculator.org/fr/disclaimer',
        'de': 'https://quick-calculator.org/de/disclaimer',
        'nl': 'https://quick-calculator.org/nl/disclaimer',
        'x-default': 'https://quick-calculator.org/en/disclaimer',
      }
    }
  };
}

export default async function DisclaimerPage({ params }: { params: Promise<{ lang: string }> }) {
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
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{lang === 'en' ? 'General Information' : lang === 'es' ? 'Información General' : lang === 'pt' ? 'Informação Geral' : 'Informations Générales'}</h2>
            <p>{lang === 'en' ? 'The information provided by Quick Calculator is for general informational purposes only. All calculators and information on the website are provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the site.' :
               lang === 'es' ? 'La información proporcionada por Quick Calculator es solo para fines informativos generales. Todas las calculadoras e información en el sitio web se proporcionan de buena fe, sin embargo, no hacemos ninguna representación o garantía de ningún tipo, expresa o implícita, con respecto a la precisión, adecuación, validez, confiabilidad, disponibilidad o integridad de cualquier información en el sitio.' :
               lang === 'pt' ? 'As informações fornecidas pelo Quick Calculator são apenas para fins informativos gerais. Todas as calculadoras e informações no site são fornecidas de boa fé, no entanto, não fazemos nenhuma representação ou garantia de qualquer tipo, expressa ou implícita, em relação à precisão, adequação, validade, confiabilidade, disponibilidade ou completude de qualquer informação no site.' :
               'Les informations fournies par Quick Calculator sont uniquement à des fins d\'information générale. Toutes les calculatrices et informations sur le site Web sont fournies de bonne foi, cependant nous ne faisons aucune représentation ou garantie de quelque nature que ce soit, expresse ou implicite, concernant l\'exactitude, l\'adéquation, la validité, la fiabilité, la disponibilité ou l\'exhaustivité de toute information sur le site.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{lang === 'en' ? 'Not Professional Advice' : lang === 'es' ? 'No es Asesoramiento Profesional' : lang === 'pt' ? 'Não é Aconselhamento Profissional' : 'Pas de Conseil Professionnel'}</h2>
            <p>{lang === 'en' ? 'The calculators and information on this website are not intended to provide financial, legal, medical, or any other professional advice. You should consult with appropriate professionals for specific advice tailored to your situation.' :
               lang === 'es' ? 'Las calculadoras e información en este sitio web no están destinadas a proporcionar asesoramiento financiero, legal, médico o cualquier otro asesoramiento profesional. Debe consultar con profesionales apropiados para obtener asesoramiento específico adaptado a su situación.' :
               lang === 'pt' ? 'As calculadoras e informações neste site não se destinam a fornecer aconselhamento financeiro, jurídico, médico ou qualquer outro aconselhamento profissional. Você deve consultar profissionais apropriados para obter aconselhamento específico adaptado à sua situação.' :
               'Les calculatrices et informations sur ce site Web ne sont pas destinées à fournir des conseils financiers, juridiques, médicaux ou tout autre conseil professionnel. Vous devez consulter des professionnels appropriés pour obtenir des conseils spécifiques adaptés à votre situation.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{lang === 'en' ? 'Limitation of Liability' : lang === 'es' ? 'Limitación de Responsabilidad' : lang === 'pt' ? 'Limitação de Responsabilidade' : 'Limitation de Responsabilité'}</h2>
            <p>{lang === 'en' ? 'Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.' :
               lang === 'es' ? 'Bajo ninguna circunstancia tendremos ninguna responsabilidad hacia usted por cualquier pérdida o daño de cualquier tipo incurrido como resultado del uso del sitio o la confianza en cualquier información proporcionada en el sitio. Su uso del sitio y su confianza en cualquier información en el sitio es únicamente bajo su propio riesgo.' :
               lang === 'pt' ? 'Sob nenhuma circunstância teremos qualquer responsabilidade perante você por qualquer perda ou dano de qualquer tipo incorrido como resultado do uso do site ou confiança em qualquer informação fornecida no site. Seu uso do site e sua confiança em qualquer informação no site é exclusivamente por sua conta e risco.' :
               'En aucune circonstance nous n\'aurons de responsabilité envers vous pour toute perte ou dommage de quelque nature que ce soit encouru à la suite de l\'utilisation du site ou de la confiance dans toute information fournie sur le site. Votre utilisation du site et votre confiance dans toute information sur le site sont uniquement à vos propres risques.'}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{lang === 'en' ? 'Accuracy of Calculations' : lang === 'es' ? 'Precisión de los Cálculos' : lang === 'pt' ? 'Precisão dos Cálculos' : 'Précision des Calculs'}</h2>
            <p>{lang === 'en' ? 'While we strive to provide accurate calculators, we cannot guarantee that all calculations are error-free. Always verify important calculations with a qualified professional before making decisions based on the results.' :
               lang === 'es' ? 'Si bien nos esforzamos por proporcionar calculadoras precisas, no podemos garantizar que todos los cálculos estén libres de errores. Siempre verifique los cálculos importantes con un profesional calificado antes de tomar decisiones basadas en los resultados.' :
               lang === 'pt' ? 'Embora nos esforcemos para fornecer calculadoras precisas, não podemos garantir que todos os cálculos estejam livres de erros. Sempre verifique cálculos importantes com um profissional qualificado antes de tomar decisões com base nos resultados.' :
               'Bien que nous nous efforcions de fournir des calculatrices précises, nous ne pouvons garantir que tous les calculs sont exempts d\'erreurs. Vérifiez toujours les calculs importants avec un professionnel qualifié avant de prendre des décisions basées sur les résultats.'}</p>
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
