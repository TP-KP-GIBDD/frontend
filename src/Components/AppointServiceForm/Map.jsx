import * as tt from '@tomtom-international/web-sdk-maps';
import { React, useEffect, useState, useRef } from 'react';

export default function Map({ Lat, Lon }) {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [centerLat, setCenterLat] = useState(56.52);
  const [centerLon, setCenterLon] = useState(35.52);

  useEffect(() => {
    if (!isNaN(Lat)) {
      setCenterLat(Lat);
    }

    if (!isNaN(Lon)) {
      setCenterLon(Lon);
    }

    // setCenterLat(Lat);
    // setCenterLon(Lon);
    console.log('ИЗМЕНИЛОСЬ' + Lat);

    let map = tt.map({
      key: 'RovcfnycG7GakEIaGc8c51FsyOCFRVuP',
      container: mapElement.current,
      // center: [55.75322, 37.622513],
      center: [centerLon, centerLat],
      zoom: 8,
    });

    setMap(map);

    const addMarker = () => {
      const element = document.createElement('div');
      element.className = 'map-marker';

      const marker = new tt.Marker({
        draggable: true,
        // offset: [-32, 0],
        anchor: 'center',
        element: element,
      })
        .setLngLat([37.622513, 55.75322])
        .addTo(map);
    };

    addMarker();

    return () => map.remove();
  }, [Lat, Lon]);

  return (
    <div className="map-container" style={{ height: 400, width: 800 }}>
      <div className="map-element" ref={mapElement}></div>
      {/* <div>{centerLat + ' ' + centerLon}</div> */}
    </div>
  );
}
