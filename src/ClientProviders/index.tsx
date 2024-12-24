'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useThemeContext.hook';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const { appTheme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', appTheme);
  }, [appTheme]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
