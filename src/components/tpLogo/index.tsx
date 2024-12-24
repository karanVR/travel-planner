'use client';

import { useTheme } from '@/hooks/useThemeContext.hook';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaRegPaperPlane } from 'react-icons/fa6';

const TpLogo = () => {
  const { appTheme } = useTheme();
  const router = useRouter();
  const handleLogoClick = () => {
    router.push('/dashboard');
  };
  return (
    <div
      className={cn(
        'border-dashed border-[4px] rounded-lg px-4 py-2',
        appTheme === 'dark' ? 'border-white' : 'border-black',
      )}
      onClick={handleLogoClick}
    >
      <FaRegPaperPlane />
      PlanAway
    </div>
  );
};

export default React.memo(TpLogo);
