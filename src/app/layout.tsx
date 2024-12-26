import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { SavedCitiesProvider } from '@/hooks/useSavedCitiesContext.hook';
import { ThemeProvider } from '@/hooks/useThemeContext.hook';
import ClientProviders from '@/ClientProviders';
import ErrorBoundary from '@/components/errorBoundary';
import Header from '@/components/header';
import Head from 'next/head';
import AuthLayout from '@/components/authLayout';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Plan Away - Explore Cities, Weather, and Places Worldwide',
  description:
    'Discover cities around the world with Plan Away. Check weather updates, explore popular places to visit, and view interactive maps effortlessly.',
  keywords:
    'travel app, city weather, places to visit, world city search, city maps, Plan Away',
  openGraph: {
    title: 'Plan Away - Explore Cities, Weather, and Places Worldwide',
    description:
      'Plan your trips with ease! Search for cities, view weather details, explore top attractions, and navigate through maps.',
    url: 'https://travel-planner-git-main-karan-veer-raghuvanshis-projects.vercel.app/',
    type: 'website',
    images: [
      {
        url: '/assets/logo.png',
        width: 1200,
        height: 630,
        alt: 'Plan Away travel app banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plan Away - Explore Cities, Weather, and Places Worldwide',
    description:
      'Your ultimate travel companion! Discover cities, check weather, and explore popular places worldwide.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Plan Away',
    description:
      'Discover cities, check weather updates, explore popular places to visit, and view interactive maps with Plan Away.',
    url: 'https://travel-planner-git-main-karan-veer-raghuvanshis-projects.vercel.app/',
    image: '/assets/logo.png',
    applicationCategory: 'Travel',
    keywords:
      'travel app, city weather, places to visit, world city search, city maps',
    operatingSystem: 'Web',
    potentialAction: {
      '@type': 'SearchAction',
      target:
        'https://travel-planner-git-main-karan-veer-raghuvanshis-projects.vercel.app/city?city={city_name}',
      query: '{city_name}',
    },
  };

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body className={`${poppins.variable} antialiased`}>
        <ErrorBoundary>
          <ClerkProvider>
            <ThemeProvider>
              <SavedCitiesProvider>
                <ClientProviders>
                  <div className="flex flex-col w-full h-full min-h-screen py-2">
                    <Header />
                    <main>
                      <AuthLayout>{children}</AuthLayout>
                    </main>
                  </div>
                </ClientProviders>
              </SavedCitiesProvider>
            </ThemeProvider>
          </ClerkProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
