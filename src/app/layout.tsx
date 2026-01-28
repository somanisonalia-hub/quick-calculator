import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import CookieConsent from "@/components/CookieConsent";
import LangProvider from "@/components/LangProvider";
import HtmlLangSetter from "@/components/HtmlLangSetter";

// Optimize font loading with minimal weights for performance
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"], // Only 2 weights for optimal performance
  display: "swap",
  preload: true, // Preload for better FCP
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://quick-calculator.org'),
  title: {
    default: "Free Online Calculators - Math, Finance, Health & More",
    template: "%s | Quick Calculator"
  },
  description: "Use our free online calculators for math, finance, health, conversions and more. All calculations performed instantly in your browser with detailed explanations.",
  keywords: ["calculator", "online calculator", "math calculator", "financial calculator", "health calculator", "free calculator", "web calculator", "calculation tool"],
  authors: [{ name: "Quick Calculator" }],
  creator: "Quick Calculator",
  publisher: "Quick Calculator",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES", "pt_PT", "fr_FR"],
    url: "https://quick-calculator.org",
    title: "Free Online Calculators - Math, Finance, Health & More",
    description: "Use our free online calculators for math, finance, health, conversions and more. All calculations performed instantly in your browser with detailed explanations.",
    siteName: "Quick Calculator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quick Calculator - Free Online Calculators"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Calculators - Math, Finance, Health & More",
    description: "Use our free online calculators for math, finance, health, conversions and more.",
    images: ["/og-image.png"],
    creator: "@quickcalc"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        {/* Google Analytics - Defer to improve FCP/LCP */}
        <script async defer src="https://www.googletagmanager.com/gtag/js?id=G-WJ29X5ZT2M"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WJ29X5ZT2M');
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <HtmlLangSetter />
        <I18nProvider>
          <LangProvider>
            <main className="flex-1">
                {children}
              </main>
          </LangProvider>
          <CookieConsent />
        </I18nProvider>
      </body>
    </html>
  );
}
