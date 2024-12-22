'use client';

import React, { useContext } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  fetchCityDetails,
  fetchCountryDetails,
  fetchPlaces,
  fetchWeather,
} from '@/lib/api-utils/api';
import { themeContext } from '@/context';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
const MapComponent = dynamic(() => import('@/components/mapComponent'), { ssr: false });

const CityDetailsDynamicPage = () => {
  const params = useParams();
  const cityName = decodeURIComponent(params!?.cityName as any);
  const { appTheme } = useContext(themeContext);

  const {
    data: cityData,
    isLoading: isCityLoading,
    isError: isCityError,
    error: cityError,
  } = useQuery({
    queryKey: ['cityDetails', cityName],
    queryFn: () => fetchCityDetails(cityName),
    enabled: !!cityName,
    staleTime: 1000 * 60 * 10,
  });

  const {
    data: countryData,
    isLoading: isCountryLoading,
    isError: isCountryError,
    error: countryError,
  } = useQuery({
    queryKey: ['countryDetails', cityData?.country],
    queryFn: () => fetchCountryDetails(cityData?.country),
    enabled: !!cityData?.country,
    staleTime: 1000 * 60 * 10,
  });

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
    error: weatherError,
  } = useQuery({
    queryKey: ['weatherData', cityData?.latitude, cityData?.longitude],
    queryFn: () => fetchWeather(cityData?.latitude, cityData?.longitude),
    enabled: !!cityData?.latitude && !!cityData?.longitude,
    staleTime: 1000 * 60 * 10,
  });

  const {
    data: placesData,
    isLoading: isPlacesLoading,
    isError: isPlacesError,
    error: placesError,
  } = useQuery({
    queryKey: ['placesData', cityData?.latitude, cityData?.longitude],
    queryFn: () => fetchPlaces(cityData?.latitude, cityData?.longitude),
    enabled: !!cityData?.latitude && !!cityData?.longitude,
    staleTime: 1000 * 60 * 10,
  });

  const places = placesData?.results.map((place: any) => ({
    latitude: place?.geocodes?.main?.latitude,
    longitude: place?.geocodes?.main?.longitude,
    name: place?.name,
  }));

  console.log(placesData,'placesData')


  return (
    <div className="p-4">
      <h1
        className={cn(
          'text-4xl font-bold pb-8 m-auto w-[100vw]',
          appTheme === 'light'
            ? 'bg-gradient-to-r from-red-400 to-pink-600 text-transparent bg-clip-text'
            : 'bg-gradient-to-r from-red-500 to-purple-700 text-transparent bg-clip-text',
        )}
      >
        City Details
      </h1>
      {cityData && countryData && (
        <div className="flex flex-col gap-2">
          <div className="flex space-between w-[100%]">
            {' '}
            <h2 className="text-2xl font-bold">{cityData.name}</h2>
            <button className="animated-btn px-2 py-2 bg-red-400 ml-auto rounded-md text-xs">
              Save to itenary
            </button>
          </div>
          <p className="font-bold text-lg">
            {countryData.name.common}
            {countryData.flag},
            {cityData.region && (
              <span className="font-light text-sm">
                Region: {cityData.region}
              </span>
            )}
          </p>
          <p>Population: {cityData.population?.toLocaleString() || 'N/A'}</p>
        </div>
      )}

      {isCityLoading && <p>Loading city details...</p>}
      {isCityError && (
        <p className="text-red-500">Error: {cityError.message}</p>
      )}

      {isCountryLoading && <p>Loading country details...</p>}
      {isCountryError && (
        <p className="text-red-500">Error: {countryError.message}</p>
      )}

      <p className="text-xl font-bold mt-4">
        Weather: <p>{weatherData?.weather[0]?.description}</p>
      </p>
      <p>
        <strong>Temperature:</strong> {weatherData?.main?.temp}°C
      </p>
      <p>
        <strong>Feels like:</strong> {weatherData?.main?.feels_like}°C
      </p>

      {isPlacesLoading && <p>Loading places to visit...</p>}
      {isPlacesError && <p className="text-red-500">Error: {placesError.message}</p>}

      {places && (
        <div className="border rounded p-2 my-4">
          <h3 className="text-xl font-bold">Places to Visit</h3>
          <MapComponent places={places} />
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {placesData?.results?.map((place: any, index: number) => (
          <div
            className={cn(
              'cursor-pointer animated-btn text-sm border rounded-lg p-2 bg-zinc-200',
              appTheme === 'light' ? '' : 'text-black',
            )}
            key={index}
          >
            {place.name}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CityDetailsDynamicPage;
