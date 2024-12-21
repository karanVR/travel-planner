'use client';

import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useWindowDimensions from '../../hooks/useWindowDimensions.hook';
import { CITIES } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { fetchPlaces, fetchWeather } from '@/lib/api-utils/api';
import { cn } from '@/lib/utils';
import { themeContext } from '../../context';
import CityCard from '@/components/cityCard';

const Dashboad = () => {
  const { width: windowWidth } = useWindowDimensions();
  const { appTheme } = useContext(themeContext);

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

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

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
          <p
            className={cn(
              'text-zinc',
              windowWidth! > 740 ? 'text-sm' : 'text-xs',
            )}
          >
            Search low prices on flights, hotels, food and much more...
          </p>
        </div>
      </div>
      <div className="text-center">
        <h1
          className={cn(
            'font-[900] py-8',
            appTheme === 'light'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'
              : 'bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text', // Adjusted colors for dark theme
            windowWidth! > 740 ? 'text-3xl' : 'text-2xl',
          )}
        >
          Featured Places
        </h1>

        <div
          className={cn(
            'flex flex-wrap gap-4 w-[100%] justify-center items-center',
            windowWidth! < 740 ? 'flex-col' : 'flex-row',
          )}
        >
          {data!?.map((city: any, index: number) => {
            const {
              name,
              weather: {
                main: { temp, feels_like },
              },
              places,
            } = city;
            return (
              <CityCard
                key={uuidv4()}
                name={name}
                temprature={temp}
                feels_like={feels_like}
                placesToVisit={places}
                weather_description={city.weather.weather[0].description}
                // cover={}
                // flag={}
                // country={}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboad;
