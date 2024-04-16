import { useState, useMemo, useCallback } from 'react';
import ReactMapGL, { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGlldHJvY2giLCJhIjoiY2xjaXgxeWM5MG85ODN2cXVnaXJ0dDRmdSJ9.VQJNdyNecuRNPEd44Nu4Dw';

const data = {
  origins: [
    {
      id: 1, country: { name: 'France', iso: 'FR' }, percentage: 95,
    },
    {
      id: 2, country: { name: 'Allemagne', iso: 'MT' }, percentage: 100,
    },
    {
      id: 3, country: { name: 'Espagne', iso: 'ES' }, percentage: 70,
    },
    {
      id: 4, country: { name: 'Italie', iso: 'RU' }, percentage: 10,
    },
  ],
};

const colors = ['blue', 'red', 'yellow', 'green', 'purple', 'lightblue'];

const Map2 = () => {

  // Sort data by percentage
  data.origins.sort((a, b) => b.percentage - a.percentage);

  const WORLDVIEW = 'US';
  const worldviewFilter = [
    'all',
    ['==', ['get', 'disputed'], 'false'],
    [
      'any',
      ['==', 'all', ['get', 'worldview']],
      ['in', WORLDVIEW, ['get', 'worldview']]
    ]
  ];

  const countryColors = {};

  // Loop through data origins to set colors
  for (let i = 0; i < data.origins.length; i++) {
    const color = colors[i % colors.length]; // This will loop back to the first color after the last one
    countryColors[data.origins[i].country.iso] = color;
  }
  // Filter countries based on ISO codes in data
  const filteredCountries = data.origins.map(
    (origin) => origin.country.iso,
  );
  console.log(filteredCountries)

  // Build the list of colors for the filter
  const fillColor = ["match", ["get", "iso_3166_1"]];
  filteredCountries.forEach((country) => {
    fillColor.push(country, countryColors[country]);
  });
  fillColor.push("rgba(0, 0, 0, 0)"); // Default color for unspecified countries

  const layerStyle = {
    id: "countries-join",
    type: "fill",
    source: "countries",
    "source-layer": "country_boundaries",
    filter: worldviewFilter,
    paint: {
      "fill-color": fillColor,
      "fill-opacity": 1,
    }
  }

  return (
    <>
      <h1>Map</h1>
      <ReactMapGL
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 0,
          latitude: 30,
          zoom: 0.9
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
          <Layer
            beforeId="admin-1-boundary-bg"
            {...layerStyle}
          >
          </Layer>
        </Source>
      </ReactMapGL >
    </>
  );
}

export default Map2;
