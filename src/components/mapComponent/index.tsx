import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Place {
  latitude: number;
  longitude: number;
  name: string;
}

interface MapComponentProps {
  places: Place[];
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;

const MapComponent: React.FC<MapComponentProps> = ({ places }) => {
  const containerStyle = { width: '100%', height: '400px' };

  const center = {
    lat: places.length > 0 ? places[0].latitude : 0,
    lng: places.length > 0 ? places[0].longitude : 0,
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
        {places.map((place, index) => (
          <Marker
            key={index}
            position={{ lat: place.latitude, lng: place.longitude }}
            title={place.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
