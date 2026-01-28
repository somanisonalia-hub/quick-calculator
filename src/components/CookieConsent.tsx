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
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Banner */}
      <div className="relative w-full max-w-4xl bg-white rounded-t-lg shadow-2xl">
        <div className="p-6 md:p-8">
          {!showDetails ? (
            // Simple View
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
              <p className="text-gray-700 mb-6">{t.description}</p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  {t.rejectAll}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  {t.acceptAll}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {t.learnMore}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    {t.privacyLink}
                  </Link>
                </p>
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  {t.managePreferences}
                </button>
              </div>
            </>
          ) : (
            // Detailed View
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.title}</h2>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {/* Analytics */}
                <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={() => toggleConsent('analytics')}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{t.analytics}</p>
                    <p className="text-sm text-gray-600">{t.analyticsDesc}</p>
                  </div>
                </label>

                {/* Advertising */}
                <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.advertising}
                    onChange={() => toggleConsent('advertising')}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{t.advertising}</p>
                    <p className="text-sm text-gray-600">{t.advertisingDesc}</p>
                  </div>
                </label>

                {/* Performance */}
                <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent.performance}
                    onChange={() => toggleConsent('performance')}
                    className="mt-1 w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{t.performance}</p>
                    <p className="text-sm text-gray-600">{t.performanceDesc}</p>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  {t.rejectAll}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  {t.savePreferences}
                </button>
              </div>

              <p className="text-xs text-gray-600 mt-4">
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  {t.privacyLink}
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
