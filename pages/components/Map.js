import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import styles from "../../styles/Home.module.css";

// How to connect two Markers!!!
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxsZW5zdW4xMTMiLCJhIjoiY2t5engyaHV4MG43ZjJvcm12cGhjZ3NzYiJ9.yddnnKrY3jf2ua-MbrRNow";
const url = "";

const Map = ({
  pickup,
  setPickup,
  dropoff,
  setDropoff,
  setDistance,
  result = "",
  from,
  to,
}) => {
  useEffect(() => {
    console.log(result);
  }, [result]);

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
      const steps = data.legs[0].steps;
      const route = data.geometry.coordinates;
      const duration = data.duration;
      const distance = data.distance;
      setDistance(data.distance);

      let tripInstructions = "";
      for (const step of steps) {
        tripInstructions += `<li>${step.maneuver.instruction}</li><hr>`;
      }

      const instruction = document.getElementById("instruction");
      instruction.innerHTML = `
      <div class="text-xl bg-zinc-800 px-3 ">
      <div >${
        duration > 3600
          ? (duration / 3600).toFixed(2) + " hour"
          : (duration / 60).toFixed(2) + " minute"
      } </div> 
      <div >${
        distance > 1000
          ? Math.floor(distance / 1000) + " km"
          : Math.floor(distance) + " m"
      } </div>
      </div>
      
      <hr class="border-t-[3px]">${
        result === "" ? "" : `<ul class="p-1 pl-3">${tripInstructions}</ul>`
      }`;

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
          //gradient: the source must have the 'lineMetrics' option set to true
          source: {
            type: "geojson",
            lineMetrics: true,
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-width": 5,
            "line-opacity": 0.75,
            "line-gradient": [
              "interpolate",
              ["linear"],
              ["line-progress"],
              0,
              "black",
              1,
              "#47daff",
            ],
          },
        });
      }
      // add turn instructions here at the end
    };
    map.on("load", () => {
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
          "circle-radius": 3,
          "circle-color": "black",
        },
      });
      map.addLayer({
        id: "end",
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
                  coordinates: dropoff,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 4,
          "circle-color": "#4ffffc",
        },
      });
    });
  }, [pickup, dropoff, result]);

  const addToMap = (map, coordinate, id) => {
    const popupOffset = {
      bottom: [20, -30],
    };
    const popup = new mapboxgl.Popup({
      offset: popupOffset,
    }).setHTML(
      id === 1
        ? `<text class="text-sm">From</text> ${from}`
        : `<text class="text-sm">To</text> ${to}`
    );

    if (id === 1) {
      const marker1 = new mapboxgl.Marker({
        draggable: true,
        color: "black",
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
        color: "#4ddaf0",
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
      <style jsx global>{`
        .mapboxgl-popup-tip {
          display: none;
        }
        .mapboxgl-popup-content {
          box-shadow: 1px 4px 6px rgb(0 0 0 / 30%);
          padding: 6px 10px;
          position: relative;
          bottom: -6px;
        }
      `}</style>
      <div className={result === "" ? styles.map : styles.bigMap} id="map">
        Map
      </div>
      <div id="instruction" className={styles.instruction}></div>
    </>
  );
};

export default Map;
