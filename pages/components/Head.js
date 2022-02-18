import React from "react";
import Head from "next/head";

const Header = () => {
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/50334a99e9.js"
          crossorigin="anonymous"
        ></script>
        <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js"></script>
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css"
          type="text/css"
        />
        {/* Import Mapbox GL Directions  */}
        <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.2/mapbox-gl-directions.js"></script>
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.2/mapbox-gl-directions.css"
          type="text/css"
        />
        {/* Import Turf and Polyline  */}
        <script src="https://npmcdn.com/@turf/turf/turf.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mapbox-polyline/1.1.1/polyline.js"></script>
      </Head>
      <style jsx global>{`
        .mapboxgl-ctrl-top-right {
          position: fixed;
          top: -1px;
          left: 15%;
        }
        .mapboxgl-ctrl-geocoder {
          box-shadow: none;
        }
        .mapboxgl-ctrl-geocoder--input {
          padding: 4px 6px;
          height: initial;
          background: #eeeef0;
          border-radius: 3px;
          outline: none;
          font-size: smaller;
        }
        .mapboxgl-ctrl-geocoder--input:focus {
          outline: unset;
        }

        .mapboxgl-ctrl-geocoder--icon-search {
          display: none;
        }
        .mapboxgl-ctrl button:not(:disabled),
        .mapboxgl-ctrl button:not(:disabled):hover {
          background: none;
        }
        .mapboxgl-ctrl-geocoder .mapboxgl-ctrl-geocoder--pin-right > * {
          top: -1px;
        }
        .close {
          transition: 0.5s;
          height: 33%;
        }
      `}</style>
    </>
  );
};

export default Header;
