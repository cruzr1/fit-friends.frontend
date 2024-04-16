import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import { LocationsCoordinates, LOCATION_ZOOM, TILE_LAYER_URL, ATTRIBUTION, Location } from '../const';

export default function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  location: Location
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: LocationsCoordinates[location].latitude,
          lng: LocationsCoordinates[location].longitude
        },
        zoom: LOCATION_ZOOM
      });

      const layer = new TileLayer(
        TILE_LAYER_URL,
        {
          attribution: ATTRIBUTION
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
    map?.setView([LocationsCoordinates[location].latitude, LocationsCoordinates[location].longitude]);
    return () => {
      isMounted = false;
    };
  }, [map, mapRef, location]);

  return map;
}
