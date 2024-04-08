import * as React from 'react';
import ReactMapGL, { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGlldHJvY2giLCJhIjoiY2xjaXgxeWM5MG85ODN2cXVnaXJ0dDRmdSJ9.VQJNdyNecuRNPEd44Nu4Dw';

const data = {
  origins: [
    { country: { iso: 'FR' } },
    { country: { iso: 'GB' } },
  ],
};

const countryColors = {
  FR: '#0074D9', // Blue for France
  GB: '#FF4136', // Red for Great Britain
};

const App = () => {

  const layerStyle = {
    id: 'admin-1-fill',
    type: 'fill',
    source: 'countries',
    'source-layer': 'country_boundaries',
    paint: {
      'fill-color': '#FF4136'
    }
  }

  return (
    <>
      <h1>Map</h1>
      <ReactMapGL
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 20,
          latitude: 50,
          zoom: 2
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        projection="mercator"
        style={{ width: '1000px', height: '500px' }}
      >
        <FullscreenControl />
        <GeolocateControl />
        <NavigationControl />
        <ScaleControl />
        <Source
          id="admin-1"
          type="vector"
          url="mapbox://mapbox.country-boundaries-v1">
          <Layer {...layerStyle}
          >

          </Layer>
        </Source>
      </ReactMapGL >
    </>
  );
}

export default App;
