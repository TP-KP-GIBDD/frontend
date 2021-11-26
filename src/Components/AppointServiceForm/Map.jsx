import * as tt from '@tomtom-international/web-sdk-maps';
import { React, useEffect, useState, useRef } from 'react';

export default function Map() {
  const mapElement = useRef();
  const [map, setMap] = useState({});

  useEffect(() => {
    let map = tt.map({
      key: 'RovcfnycG7GakEIaGc8c51FsyOCFRVuP',
      container: mapElement.current,
    });

    setMap(map);
  }, []);

  return (
    <div>
      <div ref={mapElement}></div>
    </div>
  );
}
