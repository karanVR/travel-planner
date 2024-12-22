'use client';

import useWindowDimensions from '@/hooks/useWindowDimensions.hook';
import { cn } from '@/lib/utils';
import { ICityCardProps } from '@/models';
import React from 'react';
import { FiBookmark } from 'react-icons/fi';

const CityCard = ({
  name,
  country,
  placesToVisit,
  temprature,
  feels_like,
  weather_description,
  cover,
  flag,
  onCityClick,
}: ICityCardProps) => {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <div
      onClick={() => onCityClick!(name!)}
      className={cn(
        'flex flex-col relative gap-2 border rounded-lg p-4 shadow cursor-pointer',
        windowWidth! > 740 ? 'w-[100%] h-[53vh]' : 'w-[100%]',
      )}
    >
      <img
        src={cover}
        alt={name}
        width="100%"
        className="object-contain aspect-video"
      />
      <div className="flex flex-row gap-4 w-[100%] items-center space-between">
        <p className="font-bold w-fit inline">{name}</p>
        <div
          title="Save"
          className="ml-auto flex rounded-xl px-2 py-1 items-center text-gray-500 gap-2 hover:scale-[1.25] transition-all duration-200 ease-in"
        >
          <FiBookmark size="22px" />
        </div>
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
        {placesToVisit?.slice(0, 3).map((place: any, i: number) => (
          <div
            key={place}
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
