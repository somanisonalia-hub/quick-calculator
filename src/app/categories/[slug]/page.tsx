import React from 'next';
import { notFound, redirect } from 'next/navigation';
import { Metadata } from 'next';

const validCategories = ['financial', 'health', 'math', 'utility', 'lifestyle'];

export async function generateStaticParams() {
  return validCategories.map(category => ({
    slug: category
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  if (!validCategories.includes(slug)) {
    return {};
  }

  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Calculators | Quick Calculator`,
    description: `Browse our collection of ${slug} calculators.`,
    alternates: {
      canonical: `https://quick-calculator.org/categories/${slug}`,
    }
  };
}

export default async function CategoryRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Validate category exists
  if (!validCategories.includes(slug)) {
    notFound();
  }

  // Redirect to the English version of the category page
  redirect(`/en/categories/${slug}`);
}
