import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Page with Metadata',
  description: 'This is a test page',
  alternates: {
    canonical: 'https://quick-calculator.org/test-page',
  },
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Test Page"
    })
  }
};

export default function TestPage() {
  return (
    <div>
      <h1>Test Page</h1>
      <p>This page tests the Metadata API.</p>
    </div>
  );
}