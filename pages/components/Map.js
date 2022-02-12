import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import styles from "../../styles/Home.module.css";

// How to connect two Markers!!!
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxsZW5zdW4xMTMiLCJhIjoiY2t5engyaHV4MG43ZjJvcm12cGhjZ3NzYiJ9.yddnnKrY3jf2ua-MbrRNow";
const url = "";

const Map = ({ pickup, setPickup, dropoff, setDropoff }) => {
  useEffect(() => {
    if (pickup && dropoff) {
      url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]},${pickup[1]};${dropoff[0]},${dropoff[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;
    }
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [120.98, 24.8],
      zoom: 12,
    });
    if (pickup) {
      addToMap(map, pickup, 1);
    }
    if (dropoff) {
      addToMap(map, dropoff, 2);
    }
    if (pickup && dropoff) {
      map.fitBounds([pickup, dropoff], { padding: 60 });
    }
    const getRoute = async () => {
      const json = await fetch(url, { method: "GET" }).then((res) =>
        res.json()
      );
      const data = await json.routes[0];
      const route = data.geometry.coordinates;
      const duration = data.duration;
      const distance = data.distance;

      const instruction = document.getElementById("instruction");
      instruction.innerHTML = `
      <div >${
        duration > 3600
          ? (duration / 3600).toFixed(2) + " hour"
          : (duration / 60).toFixed(2) + " minute"
      } </div> 
      
      <div id:"tag2">${
        distance > 1000
          ? Math.floor(distance / 1000) + " km"
          : Math.floor(distance) + " m"
      } </div>`;

      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      // if the route already exists on the map, we'll reset it using setData
      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      } else {
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
      // add turn instructions here at the end
    };
    map.on("load", () => {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute();
      // Add starting point to the map
      map.addLayer({
        id: "point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: pickup,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 5,
          "circle-color": "#3887be",
        },
      });
      // this is where the code from the next step will go
    });
  }, [pickup, dropoff]);

  const addToMap = (map, coordinate, id) => {
    const popupOffset = {
      bottom: [0, -25],
    };
    const popup = new mapboxgl.Popup({
      offset: popupOffset,
      className: styles.popup,
      closeButton: false,
    }).setHTML(id === 1 ? "From" : "To");

    if (id === 1) {
      const marker1 = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat(coordinate)
        .addTo(map)
        .setPopup(popup)
        .togglePopup();

      marker1.on("dragend", () => {
        const lngLat = marker1.getLngLat();
        setPickup([lngLat.lng, lngLat.lat]);
      });
    }

    if (id === 2) {
      const marker2 = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat(coordinate)
        .addTo(map)
        .setPopup(popup)
        .togglePopup();

      marker2.on("dragend", () => {
        const lngLat = marker2.getLngLat();
        setDropoff([lngLat.lng, lngLat.lat]);
      });
    }
  };

  return (
    <>
      <div className={styles.map} id="map">
        Map
      </div>
      <div id="instruction" className={styles.instruction}></div>
    </>
  );
};

export default Map;
