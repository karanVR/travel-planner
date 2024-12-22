'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchCityDetails } from '@/lib/api-utils/api';

const CityDetailsDynamicPage = () => {
  const params = useParams();
  const cityName = decodeURIComponent(params!?.cityName as any);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cityDetails', cityName],
    queryFn: () => fetchCityDetails(cityName),
    enabled: !!cityName,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">City Details</h1>

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

export default CityDetailsDynamicPage;

