'use client';

import React, { useContext } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions.hook';
import { cn } from '@/lib/utils';
import { themeContext } from '@/hooks/useThemeContext.hook';
import FeaturedCities from '@/components/featuredCities';
import SavedCitiesPage from '@/components/savedCities';
const Dashboad = () => {
  const { width: windowWidth } = useWindowDimensions();
  const { appTheme } = useContext(themeContext);

  return (
    <div className="w-[100%]">
      <div className="flex flex-col justify-center gap-8 items-center px-6 w-[100%]">
        <div className="flex flex-col justify-center items-center">
          {' '}
          <h2
            className={cn(
              'font-[900] text-center',
              windowWidth! > 740 ? 'text-4xl' : 'text-2xl',
              appTheme === 'light'
                ? 'bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text'
                : 'bg-gradient-to-r from-green-300 to-green-500 text-transparent bg-clip-text',
            )}
          >
            Discover the vacation of your dreams
          </h2>
        </div>
      </div>
      {/* <SavedCitiesPage /> */}
      <FeaturedCities />
    </div>
  );
};

export default Dashboad;
