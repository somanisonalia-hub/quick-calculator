import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import CookieConsent from "@/components/CookieConsent";
import LangProvider from "@/components/LangProvider";
import HtmlLangSetter from "@/components/HtmlLangSetter";

// Optimize font loading with minimal weights for performance
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Reduced weights for better performance
  display: "swap",
  preload: false,
  fallback: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"], // Reduced weights for better performance
  display: "swap",
  preload: false,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Free Online Calculators - Math, Finance, Health & More",
  description: "Use our free online calculators for math, finance, health, conversions and more. All calculations performed instantly in your browser with detailed explanations.",
  keywords: "calculator, online calculator, math calculator, financial calculator, health calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HPRXB52PX3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HPRXB52PX3');
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col`}
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
