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
import { useRouter } from 'next/navigation';

const FeaturedCities = () => {
  const { width: windowWidth } = useWindowDimensions();
  const { appTheme } = useContext(themeContext);
  const router = useRouter();

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

  const handleCityClick = (cityName: string) => {
    router.push(`/city/${encodeURIComponent(cityName)}`);
  };

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
            <React.Fragment key={uuidv4()}>
              <div
                onClick={() => handleCityClick(name)}
                className={cn(
                  'flex flex-wrap cursor-pointer w-fit p-0 m-0',
                  windowWidth! > 740 ? 'w-[25vw]' : 'w-[90%]',
                )}
              >
                <CityCard
                  name={name}
                  temprature={temp}
                  feels_like={feels_like}
                  placesToVisit={places}
                  weather_description={city.weather.weather[0].description}
                  // cover={}
                  flag={CITIES[index].flag}
                  country={CITIES[index].country}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCities;
