'use client';

import {
  savedCitiesContext,
  useSavedCities,
} from '@/hooks/useSavedCitiesContext.hook';
import useWindowDimensions from '@/hooks/useWindowDimensions.hook';
import { cn } from '@/lib/utils';
import { ICityCardProps } from '@/models';
import React, { useContext } from 'react';
import MapComponent from '../mapComponent';
import { v4 as uuidv4 } from 'uuid';

const CityCard = ({
  name,
  country,
  placesToVisit,
  temprature,
  feels_like,
  weather_description,
  flag,
  latitude,
  longitude,
  textColor,
}: ICityCardProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const { addCity, removeCity } = useContext(savedCitiesContext);
  const { savedCities } = useSavedCities();
  const isCitySaved = savedCities.some(
    (savedCity: any) => savedCity.name === name!,
  );
  const handleAddRemove = () => {
    if (!isCitySaved) {
      addCity(name as any);
    }
    if (isCitySaved) {
      removeCity(name as any);
    }
  };
  const places: any = [{ latitude: latitude, longitude: longitude }];
  return (
    <div
      className={cn(
        'flex flex-col relative gap-2 border rounded-lg p-4 shadow cursor-pointer',
        windowWidth! > 740 ? 'w-[100%] h-[45vh]' : 'w-[100%] h-[45vh]',
      )}
      style={{ color: textColor && textColor }}
    >
      <MapComponent places={places} />
      <div className="flex flex-row gap-4 w-[100%] items-center space-between">
        <p className="font-bold w-fit inline">{name}</p>
      </div>
      {(country || flag) && (
        <div className="flex space-between font-bold">
          {country} {flag}
        </div>
      )}
      <div className="flex items-center gap-2 w-[100%] space-evenly text-sm">
        <p>Temprature: {temprature}°C</p>
        <p>Feels like: {feels_like}°C</p>
        <p>{weather_description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4 space-between text-sm">
        <p className="font-semibold">Attractions:</p>
        {placesToVisit?.slice(0, 3).map((place: any) => (
          <div
            key={uuidv4()}
            className="text-xs rounded-lg border p-1 truncate w-fit cursor-pointer"
            title={place.name}
          >
            {place.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityCard;
