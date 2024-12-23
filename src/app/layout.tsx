'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import './globals.css';
import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import clsx from 'clsx';
import HeaderRightThemeToggle from '../components/headerRightThemeProfile';
import TpLogo from '../components/tpLogo';
import Navbar from '../components/navbar';
import useWindowDimensions from '../hooks/useWindowDimensions.hook';
import Sidebar from '../components/sidebar';
import { cn } from '@/lib/utils';
import { SavedCitiesProvider } from '@/hooks/useSavedCitiesContext.hook';
import { ThemeProvider } from '@/hooks/useThemeContext.hook';

const queryClient = new QueryClient();

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [appTheme, setAppTheme] = useState<string>('light');
  const { width: windowWidth } = useWindowDimensions();
  return (
    <ClerkProvider>
      <ThemeProvider>
        <SavedCitiesProvider>
          <QueryClientProvider client={queryClient}>
            <html lang="en">
              <body className={` ${poppins.variable} antialiased`}>
                <div
                  className={cn(
                    'flex flex-col w-[100%] flex-grow-1 h-[100%] min-h-[100vh] justify-start py-4',
                    appTheme === 'light'
                      ? 'bg-white-text-black'
                      : 'bg-black text-white',
                  )}
                >
                  <header className="flex justify-between">
                    <div className="font-bold text-2xl pl-6">
                      <TpLogo />
                    </div>
                    <HeaderRightThemeToggle />
                  </header>
                  <main>
                    <SignedOut>
                      <div className="flex w-[100dvw] h-[100dvh] items-center justify-center">
                        <SignIn routing="hash" forceRedirectUrl="/dashboard" />
                      </div>
                    </SignedOut>
                    <SignedIn>
                      <div className="h-full relative">
                        <div className="hidden md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80] bg-gray-900">
                          <Sidebar />
                        </div>
                        <div
                          className={cn(
                            'relative w-full',
                            windowWidth! < 740 ? '' : 'md:pl-72',
                          )}
                        >
                          <Navbar />
                          {children}
                        </div>
                      </div>
                    </SignedIn>
                  </main>
                </div>
              </body>
            </html>
          </QueryClientProvider>
        </SavedCitiesProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
