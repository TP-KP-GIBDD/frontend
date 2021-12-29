import * as tt from '@tomtom-international/web-sdk-maps';
import { React, useEffect, useState, useRef } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export default function MyMap({
  children,
  // center = [55.751574, 37.573856],
  centerLat,
  centerLon,
  zoom = 6,
}) {
  const [lat, setLat] = useState(56.52);
  const [lon, setLon] = useState(35.52);

  useEffect(() => {
    if (!isNaN(centerLat)) {
      setLat(centerLat);
    }

    if (!isNaN(centerLon)) {
      setLon(centerLon);
    }
  }, [centerLat, centerLon, lat, lon]);

  return (
    <div className="map-wrapper">
      {console.log(lat, lon)}
      <YMaps>
        <Map
          width={700}
          height={400}
          state={{
            center: [lat, lon],
            // center: [55.751574, 37.573856],
            zoom: zoom,
          }}
          // state={{ center: center, zoom: 5 }}
        >
          {children}
        </Map>
      </YMaps>
    </div>
  );
}
