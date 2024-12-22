export interface ICityCardProps {
  name: string;
  country?: string;
  placesToVisit?: string[];
  temprature: number;
  feels_like: number;
  weather_description?: string;
  cover?: string;
  flag?: string;
  onCityClick?: any;
  latitude?:number;
  longitude?:number;
}
