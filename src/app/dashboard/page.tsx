'use client';

import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  fetchWeather,
  fetchPlaces,
  fetchCityDetails,
} from '@/lib/api-utils/api';
import CityCard from '@/components/cityCard';
import { themeContext } from '@/hooks/useThemeContext.hook';
import { cn } from '@/lib/utils';
import useWindowDimensions from '@/hooks/useWindowDimensions.hook';
import dynamic from 'next/dynamic';
import CardSkeleton from '@/components/cardSkeleton';
const FeaturedCities = dynamic(() => import('@/components/featuredCities'), { ssr: false });

const CityPage = () => {
  const [placesCoordinates, setPlacesCoordinates] = useState<any>({
    latitude: null,
    longitude: null,
  });
  const { appTheme } = useContext(themeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();

  const { data, isLoading, error } = useQuery({
    queryKey: ['cityData', cityQuery],
    queryFn: async () => {
      if (!cityQuery) return null;

      const cityDetails = await fetchCityDetails(cityQuery);

      if (!cityDetails) throw new Error('City not found');
      const { latitude, longitude } = cityDetails;
      setPlacesCoordinates({ latitude, longitude });
      const weather = await fetchWeather(latitude, longitude);
      const places = await fetchPlaces(latitude, longitude);
      return { name: cityQuery, weather, places: places.results };
    },
    enabled: !!cityQuery,
    staleTime: 1000 * 60 * 10,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      setCityQuery(searchTerm.trim());
    }
  };

  const handleCardClick = () => {
    router.push(`/city/${encodeURIComponent(cityQuery)}`);
  };

  console.log(placesCoordinates, 'coord');

  return (
    <div
      className={`p-4 ${appTheme === 'light' ? 'text-black' : 'text-white'}`}
    >
      <h1
        className={cn(
          'text-3xl font-bold mb-4 text-center',
          appTheme === 'light'
            ? 'bg-gradient-to-r from-red-400 to-pink-600 text-transparent bg-clip-text'
            : 'bg-gradient-to-r from-red-500 to-purple-700 text-transparent bg-clip-text',
        )}
        aria-label="Search a travel destination"
      >
        Search a travel destination
      </h1>
      <div
        className={cn(
          'mb-6 flex gap-2',
          windowWidth! > 740 ? 'flex-row' : 'flex-col',
        )}
      >
        <label htmlFor="city-search" className="sr-only">
          Enter city name
        </label>
        <input
          id="city-search"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Enter city name"
          className="border rounded px-4 py-2 w-full text-black"
          aria-label="Search city"
        />
        <button
          className={cn(
            'animated-btn px-2 py-2 mb-4 bg-red-400 m-auto rounded-md text-sm',
            windowWidth! > 740 ? 'w-fit' : 'w-[100%]',
          )}
          onClick={handleSearchSubmit}
          tabIndex={0}
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <CardSkeleton />
      ) : error instanceof Error ? (
        <p className="text-red-500">Error: {error?.message}</p>
      ) : data ? (
        <div
          onClick={handleCardClick}
          className={cn('mb-4', windowWidth! > 740 ? 'max-w-[25vw] ' : '')}
          role="button"
          tabIndex={0}
          aria-label={`City details for ${data?.name}`}
        >
          <CityCard
            key={data?.name}
            name={data?.name as any}
            temprature={data?.weather?.main?.temp}
            feels_like={data?.weather?.main?.feels_like}
            placesToVisit={data?.places || []}
            weather_description={data?.weather?.weather[0]?.description}
            latitude={placesCoordinates?.latitude}
            longitude={placesCoordinates?.longitude}
          />
        </div>
      ) : (
        cityQuery !== '' && <p>No city searched yet.</p>
      )}
      <p className="text-center text-zinc-500">
        Or select from below featured cities
      </p>
      <FeaturedCities />
    </div>
  );
};

export default CityPage;
