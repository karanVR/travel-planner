'use client';

import React from 'react';
import CityCard from '@/components/cityCard';
import router from 'next/router';
import { useSavedCities } from '@/hooks/useSavedCitiesContext.hook';

const SavedCitiesPage = () => {
  const { savedCities } = useSavedCities();
  const handleCardClick = (cityName: string) => {
    router.push(`/city/${encodeURIComponent(cityName)}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold pb-8">Saved Cities</h1>
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
