import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';
import { MapComponentProps } from '@/models';
import { cn } from '@/lib/utils';
import useWindowDimensions from '@/hooks/useWindowDimensions.hook';
const DynamicLoader = dynamic(() => import('@/components/loader'), {
  ssr: false,
});



const areEqual = (
  prevProps: MapComponentProps,
  nextProps: MapComponentProps,
) => {
  return JSON.stringify(prevProps.places) === JSON.stringify(nextProps.places);
};



const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || '';

const MapComponent: React.FC<MapComponentProps> = ({ places }) => {
  const {width:windowWidth} = useWindowDimensions();
  const containerStyle = { width: '100%', height: '400px' };
  const center = {
    lat: places.length > 0 ? places[0].latitude : 0,
    lng: places.length > 0 ? places[0].longitude : 0,
  };

  if (!API_KEY) {
    return (
      <div>
        <DynamicLoader />
      </div>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      loadingElement={<Skeleton className={cn("h-[61%]  rounded-xl", windowWidth!>740?"30%":"w-[100%]")} />}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
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

export default memo(MapComponent, areEqual);
