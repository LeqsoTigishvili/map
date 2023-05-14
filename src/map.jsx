import React from 'react';
import GoogleMapReact from 'google-map-react';

const MapComponent = ({ latitude, longitude }) => {
  const isValidCoordinates = !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude));

  if (!isValidCoordinates) {
    return <div><h1>Enter a User</h1></div>;
  }

  const mapOptions = {
    center: {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude)
    },
    zoom: 15
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAl0ijm-pA0nPq0xhusvnoZ6Pu3Q_coYMw' }} // Replace with your API key
        defaultCenter={mapOptions.center}
        defaultZoom={mapOptions.zoom}
      >
        <Marker
          lat={parseFloat(latitude)}
          lng={parseFloat(longitude)}
          text="Location"
        />
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ text }) => (
  <div
    style={{
      color: 'white',
      background: 'red',
      padding: '5px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    {text}
  </div>
);

export default MapComponent;
