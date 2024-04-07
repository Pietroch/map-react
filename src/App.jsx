import * as React from 'react';
import Map, { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoicGlldHJvY2giLCJhIjoiY2xjaXgxeWM5MG85ODN2cXVnaXJ0dDRmdSJ9.VQJNdyNecuRNPEd44Nu4Dw';


const App = () => {
  return (
    <>
      <h1>Map</h1>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 1,
          latitude: 1,
          zoom: 3
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
          id="country-boundaries"
          type="vector"
          url="mapbox://mapbox.country-boundaries-v1">
          <Layer
            id="countries-fill"
            type="fill"
            source="admin-0"
            sourceLayer="boundaries_admin_0"
            paint={{
              "fill-color": "#0000FF",
              "fill-opacity": 0.7,
            }}
          />
        </Source>
      </Map>
    </>
  );
}

export default App;