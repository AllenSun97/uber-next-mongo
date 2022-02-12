import React from "react";
import Head from "next/head";

const Header = () => {
  return (
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
    </Head>
  );
};

export default Header;
