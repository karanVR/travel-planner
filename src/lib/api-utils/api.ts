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



