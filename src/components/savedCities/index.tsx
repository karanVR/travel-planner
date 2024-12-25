'use client';

import React from 'react';
import CityCard from '@/components/cityCard';
import { useSavedCities } from '@/hooks/useSavedCitiesContext.hook';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useThemeContext.hook';

const SavedCitiesPage = () => {
  const { savedCities } = useSavedCities();
  const router = useRouter();
  const { appTheme } = useTheme();
  const pathname = usePathname();
  const handleCardClick = (cityName: string) => {
    router.push(`/city/${encodeURIComponent(cityName)}`);
  };

  return (
    <div
      className={cn(
        'p-4 text-center',
        pathname === '/dashboard' && savedCities.length === 0 ? 'hidden' : '',
      )}
    >
      {pathname === '/saved-cities' ? (
        <h1
          className={cn(
            'text-3xl font-bold pb-8',
            appTheme === 'light'
              ? 'bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text'
              : 'bg-gradient-to-r from-green-300 to-green-500 text-transparent bg-clip-text',
          )}
        >
          Saved Cities
        </h1>
      ) : (
        <h1
          className={cn(
            'text-xl font-bold pb-8',
            appTheme === 'light'
              ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text'
              : 'bg-gradient-to-r from-blue-300 to-blue-500 text-transparent bg-clip-text',
          )}
        >
          Recent activity
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedCities.length > 0 ? (
          savedCities.map((data) => (
            <div
              className="flex w-full"
              onClick={() => handleCardClick(data.name)}
            >
              <CityCard
                key={data.name}
                name={data.name}
                temprature={data.weather?.main?.temp}
                feels_like={data.weather?.main?.feels_like}
                //@ts-ignore
                placesToVisit={data.places || [] || [{ name: '' }]}
                weather_description={data.weather?.weather[0]?.description}
                latitude={data.latitude}
                longitude={data.longitude}
              />
            </div>
          ))
        ) : (
          <p className="text-zinc-300 text-md ">
            Please add cities from featured cities dashboard or search for a
            city from cities section
          </p>
        )}
      </div>
    </div>
  );
};

export default SavedCitiesPage;
