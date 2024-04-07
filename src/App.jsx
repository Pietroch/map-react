import * as React from 'react';
import Map from 'react-map-gl';

function App() {
  return (
    <>
      <h1>Map</h1>
      <Map
        mapboxAccessToken="eyJ1IjoicGlldHJvY2giLCJhIjoiY2xjaXgxeWM5MG85ODN2cXVnaXJ0dDRmdSJ9"
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </>
  );
}

export default App;