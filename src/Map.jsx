import {useState, useMemo, useCallback} from 'react';
import ReactMapGL, { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGlldHJvY2giLCJhIjoiY2xjaXgxeWM5MG85ODN2cXVnaXJ0dDRmdSJ9.VQJNdyNecuRNPEd44Nu4Dw';

const data = {
  origins: [
    {
      id: 1, country: { name: 'France', iso: 'FR' }, percentage: 95,
    },
    {
      id: 2, country: { name: 'Allemagne', iso: 'DE' }, percentage: 100,
    },
    {
      id: 3, country: { name: 'Suisse', iso: 'CH' }, percentage: 90,
    },
    {
      id: 4, country: { name: 'Italie', iso: 'IT' }, percentage: 10,
    },
  ],
};

const Map = () => {

  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

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
  for (const origin of data.origins) {
    const adjustedPercentage = origin.percentage * 0.9 + 10;
    const opacity = adjustedPercentage / 100;
    console.log(opacity)
    const color = `rgba(255, 0, 0, ${opacity})`;
    countryColors[origin.country.iso] = color;
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

  const onHover = useCallback(event => {
    const country = event.features && event.features[0];
      setHoverInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
      });
      setSelectedCountry(country);
  }, []);

  console.log(hoverInfo)

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
      <div>Selected Country: {selectedCountry ? selectedCountry : 'NONE'}</div>
      <ReactMapGL
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 20,
          latitude: 50,
          zoom: 3
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        projection="mercator"
        style={{ width: '1000px', height: '500px' }}
        onMouseMove={onHover}
        interactiveLayerIds={['countries']}
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

export default Map;
