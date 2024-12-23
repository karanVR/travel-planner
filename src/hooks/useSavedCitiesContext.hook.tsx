'use client';

import { createContext, useState, useContext, useEffect } from 'react';

export interface CityData {
  name: string;
  weather: {
    main: {
      temp: number;
      feels_like: number;
    };
    weather: { description: string }[];
  };
  places: { name: string }[];
}

interface SavedCitiesContextType {
  savedCities: CityData[];
  addCity: (city: CityData) => void;
  removeCity: (cityName: string) => void;
}

export const savedCitiesContext = createContext<SavedCitiesContextType>({
  savedCities: [],
  addCity: () => {},
  removeCity: () => {},
});

export const SavedCitiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [savedCities, setSavedCities] = useState<CityData[]>([]);

  useEffect(() => {
    const savedCitiesFromStorage = localStorage.getItem('savedCities');
    if (savedCitiesFromStorage) {
      setSavedCities(JSON.parse(savedCitiesFromStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
  }, [savedCities]);

  const addCity = (city: CityData) => {
    setSavedCities((prev) => {
      if (
        prev.some(
          (savedCity) =>
            savedCity.name.toLowerCase() === city.name.toLowerCase(),
        )
      ) {
        return prev;
      }
      return [...prev, city];
    });
  };

  const removeCity = (cityName: string) => {
    setSavedCities((prev) =>
      prev.filter(
        (savedCity) =>
          savedCity.name.toLowerCase() !== cityName.toLowerCase(),
      ),
    );
  };

  return (
    <savedCitiesContext.Provider value={{ savedCities, addCity, removeCity }}>
      {children}
    </savedCitiesContext.Provider>
  );
};

export const useSavedCities = () => useContext(savedCitiesContext);
