import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './styles.scss';

interface MapProps {
  coordinates?: number[];
};

const Map: React.FC<MapProps> = ({coordinates}) => {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng] = useState(31.1133);
  const [lat] = useState(-17.8312);
  const [zoom] = useState(14);
  const [API_KEY] = useState('K3nIE8357BqEg4o20PPG');

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      //@ts-ignore
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      //@ts-ignore
      center: coordinates ? coordinates : [lng, lat],
      zoom: zoom
    });

  }, [API_KEY, coordinates, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;