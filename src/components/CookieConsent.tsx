'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const CookieConsent: React.FC<{ lang?: string }> = ({ lang = 'en' }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState({
    analytics: false,
    advertising: false,
    performance: false,
  });

  const texts = {
    en: {
      title: 'Your Privacy Choices',
      description: 'We use cookies for services, performance, and ads. With your consent, partners use data for analytics and advertising.',
      analytics: 'Analytics',
      analyticsDesc: 'Help us improve by anonymously tracking how you use our site',
      advertising: 'Advertising',
      advertisingDesc: 'Show you relevant ads based on your interests',
      performance: 'Performance',
      performanceDesc: 'Measure site performance and optimize user experience',
      privacyLink: 'Privacy Policy',
      learnMore: 'Learn more about our ',
      acceptAll: 'Accept all',
      rejectAll: 'Do not consent',
      savePreferences: 'Save Preferences',
      managePreferences: 'Manage Preferences',
    },
    es: {
      title: 'Tus Opciones de Privacidad',
      description: 'Usamos cookies para servicios, rendimiento y anuncios. Con tu consentimiento, los socios utilizan datos para análisis y publicidad.',
      analytics: 'Análisis',
      analyticsDesc: 'Ayúdanos a mejorar rastreando anónimamente cómo usas nuestro sitio',
      advertising: 'Publicidad',
      advertisingDesc: 'Mostrarte anuncios relevantes basados en tus intereses',
      performance: 'Rendimiento',
      performanceDesc: 'Medir el rendimiento del sitio y optimizar la experiencia del usuario',
      privacyLink: 'Política de Privacidad',
      learnMore: 'Aprende más sobre nuestra ',
      acceptAll: 'Aceptar todo',
      rejectAll: 'No consentir',
      savePreferences: 'Guardar Preferencias',
      managePreferences: 'Gestionar Preferencias',
    },
    pt: {
      title: 'Suas Escolhas de Privacidade',
      description: 'Usamos cookies para serviços, desempenho e anúncios. Com seu consentimento, parceiros usam dados para análise e publicidade.',
      analytics: 'Análise',
      analyticsDesc: 'Ajude-nos a melhorar rastreando anonimamente como você usa nosso site',
      advertising: 'Publicidade',
      advertisingDesc: 'Mostrar anúncios relevantes com base em seus interesses',
      performance: 'Desempenho',
      performanceDesc: 'Medir o desempenho do site e otimizar a experiência do usuário',
      privacyLink: 'Política de Privacidade',
      learnMore: 'Saiba mais sobre nossa ',
      acceptAll: 'Aceitar tudo',
      rejectAll: 'Não consentir',
      savePreferences: 'Salvar Preferências',
      managePreferences: 'Gerenciar Preferências',
    },
    fr: {
      title: 'Vos Choix de Confidentialité',
      description: 'Nous utilisons des cookies pour les services, les performances et les publicités. Avec votre consentement, les partenaires utilisent les données pour l\'analyse et la publicité.',
      analytics: 'Analyse',
      analyticsDesc: 'Aidez-nous à améliorer en suivant anonymement comment vous utilisez notre site',
      advertising: 'Publicité',
      advertisingDesc: 'Vous montrer des annonces pertinentes basées sur vos intérêts',
      performance: 'Performance',
      performanceDesc: 'Mesurer les performances du site et optimiser l\'expérience utilisateur',
      privacyLink: 'Politique de Confidentialité',
      learnMore: 'En savoir plus sur notre ',
      acceptAll: 'Accepter tout',
      rejectAll: 'Ne pas consentir',
      savePreferences: 'Enregistrer les Préférences',
      managePreferences: 'Gérer les Préférences',
    },
  };

  const t = texts[lang as keyof typeof texts] || texts.en;

  useEffect(() => {
    // Check if user has already made a choice
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cookieConsent');
      if (!saved) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent = { analytics: true, advertising: true, performance: true };
    localStorage.setItem('cookieConsent', JSON.stringify(allConsent));
    setConsent(allConsent);
    setShowBanner(false);
    // Trigger analytics/ads scripts here
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: 'consent_accepted' });
    }
  };

  const handleRejectAll = () => {
    const noConsent = { analytics: false, advertising: false, performance: false };
    localStorage.setItem('cookieConsent', JSON.stringify(noConsent));
    setConsent(noConsent);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const toggleConsent = (type: keyof typeof consent) => {
    setConsent(prev => ({ ...prev, [type]: !prev[type] }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Small banner at bottom */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          {!showDetails ? (
            // Simple Compact View
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-700">
                  {t.description}
                  <Link href="/privacy" className="ml-1 text-blue-600 hover:underline font-semibold">
                    {t.privacyLink}
                  </Link>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleRejectAll}
                  className="px-3 py-1.5 text-xs md:text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition font-medium"
                >
                  {t.rejectAll}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-3 py-1.5 text-xs md:text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
                >
                  {t.acceptAll}
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-3 py-1.5 text-xs md:text-sm text-blue-600 hover:underline font-medium"
                >
                  {t.managePreferences}
                </button>
              </div>
            </div>
          ) : (
            // Detailed View (still compact)
            <div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{t.title}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3 max-h-32 overflow-y-auto">
                {/* Analytics */}
                <label className="flex items-start p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={() => toggleConsent('analytics')}
                    className="mt-0.5 w-3 h-3 text-blue-600 rounded"
                  />
                  <div className="ml-2">
                    <p className="text-xs font-semibold text-gray-900">{t.analytics}</p>
                    <p className="text-xs text-gray-600">{t.analyticsDesc}</p>
                  </div>
                </label>

                {/* Advertising */}
                <label className="flex items-start p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.advertising}
                    onChange={() => toggleConsent('advertising')}
                    className="mt-0.5 w-3 h-3 text-blue-600 rounded"
                  />
                  <div className="ml-2">
                    <p className="text-xs font-semibold text-gray-900">{t.advertising}</p>
                    <p className="text-xs text-gray-600">{t.advertisingDesc}</p>
                  </div>
                </label>

                {/* Performance */}
                <label className="flex items-start p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.performance}
                    onChange={() => toggleConsent('performance')}
                    className="mt-0.5 w-3 h-3 text-blue-600 rounded"
                  />
                  <div className="ml-2">
                    <p className="text-xs font-semibold text-gray-900">{t.performance}</p>
                    <p className="text-xs text-gray-600">{t.performanceDesc}</p>
                  </div>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-3 py-1.5 text-xs md:text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition font-medium"
                >
                  {t.rejectAll}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-3 py-1.5 text-xs md:text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
                >
                  {t.savePreferences}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
