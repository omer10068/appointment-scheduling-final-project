import { Stack } from '@mui/material';
import React from 'react';

// הגדרה של טיפוסים ל-google על האובייקט window
// declare global {
//   interface Window {
//     google: any;
//     initMap: () => void;
//   }
// }

const Map: React.FC = () => {
  // const initMap = (): void => {

  //   const mapOptions = {
  //     center: { lat: 31.776974014578446, lng: 35.3141629042159 },
  //     zoom: 8
  //   };

  //   // בדיקה להבטיח ש-google ו-google.maps קיימים
  //   if (window.google && window.google.maps) {
  //     const map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

  //     new window.google.maps.Marker({
  //       position: mapOptions.center,
  //       map: map,
  //       title: 'Hello World!'
  //     });
  //   }
  // };

  // useEffect(() => {
  //   window.initMap = initMap; // הגדרת initMap כפונקציה גלובלית

  //   // טעינת ה-API של Google Maps
  //   const script = document.createElement('script');
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&callback=initMap`;
  //   script.async = true;
  //   script.defer = true;
  //   document.head.appendChild(script);

  // }, []);

  // return <div id="map" style={{ height: '400px', width: '100%' }} />;
  return <Stack>
    Map
  </Stack>;
};

export default Map;
