export const fetchWeather = async (latitude: number, longitude: number) => {
  const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
  );
  if (!response.ok) throw new Error('Failed to fetch weather data');
  return response.json();
};

export const fetchPlaces = async (latitude: number, longitude: number) => {
  const API_KEY =
    process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY ??
    'fsq3FftqatgNpRpCnfX69O8eLGWWYJhrf7gHKH7mQBiJ03c';
  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&radius=5000&limit=10`,
    { headers: { Authorization: API_KEY } },
  );
  if (!response.ok) throw new Error('Failed to fetch places data');
  return response.json();
};

export const fetchCityAutocomplete = async (query: string) => {
  const API_KEY =
    process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY ??
    'fsq3FftqatgNpRpCnfX69O8eLGWWYJhrf7gHKH7mQBiJ03c';
  const response = await fetch(
    `https://api.foursquare.com/v3/autocomplete?query=${query}`,
    { headers: { Authorization: API_KEY } },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch autocomplete suggestions');
  }
  return response.json();
};

export const fetchPlaceDetails = async (query: string) => {
  const API_KEY =
    process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY ??
    'fsq3FftqatgNpRpCnfX69O8eLGWWYJhrf7gHKH7mQBiJ03c';
  if (!query) return null;
  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?query=${encodeURIComponent(query)}`,
    { headers: { Authorization: API_KEY, accept: 'application/json' } },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch place details');
  }
  return response.json();
};

export const fetchCityDetails = async (cityName: string) => {
  const API_KEY =
    process.env.NEXT_PUBLIC_API_NINJAS_API_KEY ??
    'zGmrq2LHEtfJzdIKoJjeBQ==TSqIsmn9kjvjFvB5';
  if (!cityName) {
    throw new Error('City name is required');
  }

  const response = await fetch(
    `https://api.api-ninjas.com/v1/city?name=${encodeURIComponent(cityName)}`,
    { headers: { 'X-Api-Key': API_KEY } },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch city details');
  }

  const data = await response.json();

  if (data.length === 0) {
    throw new Error('No city data found for the given name');
  }

  return data[0];
};

export const fetchCountryDetails = async (countryCode: string) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch country details');
  }
  const countryData = await response.json();
  return countryData[0];
};
