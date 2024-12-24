'use client';

import React, { useContext, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  fetchCityDetails,
  fetchCountryDetails,
  fetchPlaces,
  fetchWeather,
} from '@/lib/api-utils/api';
import { themeContext } from '@/hooks/useThemeContext.hook';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import {
  CityData,
  savedCitiesContext,
  useSavedCities,
} from '@/hooks/useSavedCitiesContext.hook';
import SaveButton from '@/components/addCityButton';
const MapComponent = dynamic(() => import('@/components/mapComponent'), {
  ssr: false,
});
const DynamicLoader = dynamic(() => import('@/components/loader'), {
  ssr: false,
});

const CityDetailsDynamicPage = () => {
  const params = useParams();
  const cityName = decodeURIComponent(params!?.cityName as any);
  const { appTheme } = useContext(themeContext);
  const { addCity, removeCity } = useContext(savedCitiesContext);
  const { savedCities } = useSavedCities();
  const [placesCoordinates, setPlacesCoordinates] = useState<any>({
    latitude: null,
    longitude: null,
  });

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

  const isCitySaved = savedCities.some(
    (savedCity: any) => savedCity.name === cityData!?.name,
  );

  const handleSaveCity = () => {
    if (!isCitySaved && cityData && weatherData) {
      const cityDetails: CityData = {
        name: cityData.name,
        weather: weatherData,
        places: places || [],
        latitude: cityData.latitude,
        longitude: cityData.longitude,
      };
      addCity(cityDetails);
    }
    if (isCitySaved) {
      removeCity(cityData.name);
    }
  };

  return (
    <div className="p-4">
      <h1
        className={cn(
          'text-4xl font-bold pb-8 m-auto w-[100vw]',
          appTheme === 'light'
            ? 'bg-gradient-to-r from-red-400 to-pink-600 text-transparent bg-clip-text'
            : 'bg-gradient-to-r from-red-500 to-purple-700 text-transparent bg-clip-text',
        )}
        role="heading"
        aria-level={1}
      >
        City Details
      </h1>
      {cityData && countryData && (
        <div className="flex flex-col gap-2">
          <div className="flex space-between w-[100%]">
            {' '}
            <h2 className="text-2xl font-bold" role="heading" aria-level={2}>
              {cityData.name}
            </h2>
            <SaveButton
              city={cityData.name}
              onButtonClick={handleSaveCity}
              aria-label={isCitySaved ? 'Remove from saved cities' : 'Add to saved cities'}
              //@ts-ignore
              role={"button" as any}
              tabIndex={0}
            />
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

      {isCityLoading && <DynamicLoader />}
      {isCityError && (
        <p className="text-red-500" role="alert" aria-live="assertive">
          Error: {cityError.message}
        </p>
      )}

      {isCountryLoading && <DynamicLoader />}
      {isCountryError && (
        <p className="text-red-500" role="alert" aria-live="assertive">
          Error: {countryError.message}
        </p>
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

      {isPlacesLoading && <DynamicLoader />}
      {isPlacesError && (
        <p className="text-red-500" role="alert" aria-live="assertive">
          Error: {placesError.message}
        </p>
      )}

      {places && (
        <div className="border rounded p-2 my-4">
          <h3 className="text-xl font-bold" role="heading" aria-level={3}>
            Places to Visit
          </h3>
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
            role="button"
            tabIndex={0}
            aria-label={`View details for ${place.name}`}
          >
            {place.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityDetailsDynamicPage;
