'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { fetchPlaceDetails } from '@/lib/api-utils/api';
import { cn } from '@/lib/utils';
import { themeContext } from '@/context/themeContext';

const SearchPlace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { appTheme } = useContext(themeContext);

  useEffect(() => {
    const handler = _.debounce(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    handler();

    return () => handler.cancel();
  }, [searchTerm]);

  const {
    data: places,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['placeDetails', debouncedSearch],
    queryFn: () => fetchPlaceDetails(debouncedSearch),
    enabled: !!debouncedSearch,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Place Explorer</h1>
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn(
            'w-full p-2 border rounded',
            appTheme === 'light' ? 'text-black' : 'text-black',
          )}
          placeholder="Enter a place or location..."
        />
      </div>

      {isLoading && <p>Loading place details...</p>}
      {isError && (
        <p>
          Failed to fetch place details. Please check the search term and try
          again.
        </p>
      )}
      {places && places.results && places.results.length > 0
        ? places.results.map((place: any) => (
            <div key={place.fsq_id} className="border rounded p-4 mb-4">
              <h2 className="text-2xl font-bold">{place.name}</h2>
              <p>
                <strong>Category:</strong>{' '}
                {place.categories?.[0]?.name || 'N/A'}
              </p>
              <p>
                <strong>Address:</strong> {place.location?.address || 'N/A'}
              </p>
              <p>
                <strong>Distance:</strong> {place.distance} meters
              </p>
              <p>
                <strong>Latitude:</strong> {place.location?.lat || 'N/A'}
              </p>
              <p>
                <strong>Longitude:</strong> {place.location?.lng || 'N/A'}
              </p>
            </div>
          ))
        : searchTerm !== '' && <p>No places found for the given search.</p>}
    </div>
  );
};

export default SearchPlace;
