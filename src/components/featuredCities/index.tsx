'use client';

import React, { useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useWindowDimensions from '../../hooks/useWindowDimensions.hook';
import { CITIES, themeColors } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { fetchPlaces, fetchWeather } from '@/lib/api-utils/api';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useThemeContext.hook';
import CityCard from '@/components/cityCard';
import { usePathname, useRouter } from 'next/navigation';
import CardSkeleton from '../cardSkeleton';

const FeaturedCities = () => {
  const { width: windowWidth } = useWindowDimensions();
  const router = useRouter();
  const pathname = usePathname();
  const { appTheme } = useTheme();

  const { data, isLoading, error } = useQuery({
    queryKey: ['cityData'],
    queryFn: async () => {
      const cityData = await Promise.all(
        CITIES.map(async (city) => {
          const weather = await fetchWeather(city.latitude, city.longitude);
          const places = await fetchPlaces(city.latitude, city.longitude);
          return { ...city, weather, places: places.results };
        }),
      );
      return cityData;
    },
    staleTime: 1000 * 60 * 10,
  });

  const cityCards = useMemo(() => {
    if (!data) return [];
    return data.map((city, index) => {
      const {
        name,
        weather: {
          main: { temp, feels_like },
        },
        places,
      } = city;

      return (
        <div
          key={uuidv4()}
          onClick={() => handleCityClick(name)}
          className={cn(
            `flex flex-wrap cursor-pointer w-fit p-0 m-0 rounded-lg`,
            windowWidth! > 740 ? 'w-[25vw]' : 'w-[90%]',
          )}
          style={{ backgroundColor: themeColors.light[index] }}
        >
          <CityCard
            name={name}
            temprature={temp}
            feels_like={feels_like}
            placesToVisit={places}
            weather_description={city.weather.weather[0].description}
            latitude={CITIES[index].latitude}
            longitude={CITIES[index].longitude}
            flag={CITIES[index].flag}
            country={CITIES[index].country}
            textColor={CITIES[index].textColor}
          />
        </div>
      );
    });
  }, [data, windowWidth]);

  const handleCityClick = useCallback((cityName: string) => {
    router.push(`/city/${encodeURIComponent(cityName)}`);
  }, []);

  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-[100%] flex flex-col items-center justify-center">
      <h1
        className={cn(
          'font-[900] py-8 ',
          appTheme === 'light'
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'
            : 'bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text',
          windowWidth! > 740 ? 'text-3xl' : 'text-2xl',
        )}
      >
        Featured Places
      </h1>
      {pathname !== '/city' && (
        <button
          className="animated-btn px-2 py-2 mb-4 bg-red-400 m-auto rounded-md text-xs"
          onClick={() => router.push('/city')}
        >
          Search your own!
        </button>
      )}

      {!isLoading ? (
        <div
          className={cn(
            'flex flex-wrap gap-4 w-[100%] justify-center items-center',
            windowWidth! < 740 ? 'flex-col' : 'flex-row',
          )}
        >
          {cityCards}
        </div>
      ) : (
        <div className="flex gap-4 flex-wrap w-[100%]">
          {[...Array(8)].map((_) => {
            return (
              <div
                key={uuidv4()}
                className={cn(
                  'flex flex-wrap',
                  windowWidth! > 740 ? 'w-[25vw]' : 'w-[100%]',
                )}
              >
                <CardSkeleton />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(FeaturedCities);
