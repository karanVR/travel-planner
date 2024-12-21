'use client';

import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCityDetails } from '@/lib/api-utils/api';
import { cn } from '@/lib/utils';
import { themeContext } from '@/context';

const CityDetailsPage = () => {
  const [cityName, setCityName] = useState('');
  const [submittedCity, setSubmittedCity] = useState('');
  const { appTheme } = useContext(themeContext);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cityDetails', submittedCity],
    queryFn: () => fetchCityDetails(submittedCity),
    enabled: !!submittedCity,
    staleTime: 1000 * 60 * 10,
  });

  const handleSearch = () => {
    if (cityName.trim()) {
      setSubmittedCity(cityName.trim());
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">City Details</h1>
      <div className="mb-6">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className={cn(
            'w-full p-2 border rounded',
            appTheme === 'light' ? 'text-black' : 'text-black',
          )}
          placeholder="Enter a city name..."
        />
        <button
          onClick={handleSearch}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {isLoading && <p>Loading city details...</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <div className="border rounded p-4 mb-4">
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p>
            <strong>Country:</strong> {data.country}
          </p>
          <p>
            <strong>Region:</strong> {data.region}
          </p>
          <p>
            <strong>Population:</strong>{' '}
            {data.population?.toLocaleString() || 'N/A'}
          </p>
          <p>
            <strong>Latitude:</strong> {data.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {data.longitude}
          </p>
        </div>
      )}
    </div>
  );
};

export default CityDetailsPage;
