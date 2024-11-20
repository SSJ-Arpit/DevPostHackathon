import React, { useEffect, useRef } from 'react';
import { ThreeJSOverlayView } from '@googlemaps/three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const GLBModelOverlay = ({ modelPath, map, coordinates={ lat: 37.7749, lng: -122.4194 }
}) => {
  const overlayRef = useRef(null);
  const modelLoadedRef = useRef(false); // Ref to track if the model has already been loaded
  useEffect(() => {
    console.log('GLBModelOverlay useEffect triggered');
    console.log('Map reference:', map);
    console.log('Model path:', modelPath);

    if (map && coordinates && !modelLoadedRef.current) {
      console.log('Map is available, initializing Three.js scene');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 50); // Adjust the camera position to zoom into the model
      const renderer = new THREE.WebGLRenderer({ alpha: true });

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      console.log('Starting to load GLB model from path:', modelPath);
      loader.load(modelPath, (gltf) => {
        console.log('GLB model loaded successfully');
        const model = gltf.scene;
        model.scale.set(10, 10, 10);

        // Convert geographic coordinates to world position
        const latLngToVector3 = (lat, lng) => {
          const projection = map.getProjection();
          const latLng = new google.maps.LatLng(lat, lng);
          const worldPoint = projection.fromLatLngToPoint(latLng);
          return new THREE.Vector3(
            (worldPoint.x - 0.5) * 256, // Adjust for map tile scaling
            -(worldPoint.y - 0.5) * 256, // Adjust for Y-axis flipping
            0
          );
        };

        const position = latLngToVector3(coordinates.lat, coordinates.lng);
        model.position.copy(position);

        scene.add(model);

        const overlay = new ThreeJSOverlayView({
          scene,
          camera,
          map,
          renderer,
        });

        overlayRef.current = overlay;
        overlay.setMap(map);
        console.log('ThreeJSOverlayView set on the map');
        modelLoadedRef.current = true; // Set the flag to indicate the model has been loaded
      }, undefined, (error) => {
        console.error('An error happened while loading the GLB model:', error);
      });

      return () => {
        console.log('GLBModelOverlay unmounted');
        if (overlayRef.current) {
          overlayRef.current.setMap(null);
        }
      };
    } else {
      console.log('Map is not available yet, coordinates missing, or model already loaded');
    }
  }, [map, modelPath, coordinates]);

  return null;
};

export default GLBModelOverlay;
