import React, { useRef, useCallback, useState, useMemo } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../config';
import GLBModelOverlay from './GLBModelOverlay';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

// Ensure you have a valid Map ID from Google Cloud Console
const options = {
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  rotateControl: true,
  scaleControl: true,
  fullscreenControl: true,
  draggable: true,
  tilt: 45,
  mapTypeId: 'satellite',
  mapId: 'MAP_ID', // Replace with your valid Map ID
};

const modelPath = '/models/Room.glb'; // Path to the sample GLB model
const modelPosition = { lat: 37.7749, lng: -122.4194 }; // Position of the model in the map

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    map.setTilt(45);
    map.setHeading(90);
    console.log('Map loaded');
    setMapReady(true);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
    setMapReady(false);
  }, []);

  const rotateLeft = useCallback(() => {
    if (mapRef.current) {
      const heading = mapRef.current.getHeading() || 0;
      const newHeading = (heading - 90) % 360;
      mapRef.current.setHeading(newHeading);
    }
  }, []);

  const rotateRight = useCallback(() => {
    if (mapRef.current) {
      const heading = mapRef.current.getHeading() || 0;
      const newHeading = (heading + 90) % 360;
      mapRef.current.setHeading(newHeading);
    }
  }, []);

  const focusOnModel = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.panTo(modelPosition);
      mapRef.current.setZoom(20); // Increase zoom level for better focus on the model
      console.log('Focusing on model at:', modelPosition);
    }
  }, []);

  const glbModelOverlay = useMemo(() => {
    console.log('Creating GLBModelOverlay');
    return <GLBModelOverlay modelPath={modelPath} map={mapRef.current} />;
  }, [mapReady, modelPath]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ position: 'relative' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={options}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Always render the GLBModelOverlay component */}
        {mapReady && glbModelOverlay}
      </GoogleMap>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
        <button onClick={rotateLeft}>Rotate Left</button>
        <button onClick={rotateRight}>Rotate Right</button>
        <button onClick={focusOnModel}>Focus on Model</button>
      </div>
    </div>
  );
}

export default Map;
