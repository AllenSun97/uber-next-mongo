import React, { useState, useEffect, createRef } from "react";
import Link from "next/link";
import Header from "./components/Head";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxsZW5zdW4xMTMiLCJhIjoiY2t5engyaHV4MG43ZjJvcm12cGhjZ3NzYiJ9.yddnnKrY3jf2ua-MbrRNow";

const stored_loc_add = () => {
  let overLay = createRef("boo");
  const [name, setName] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const addPlace = async (name, searchResult) => {
    const data = await fetch(
      `http://localhost:3000/api/addPlace?name=${name}&address=${searchResult}`
    );
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [120.98, 24.8],
      zoom: 13,
    });
    const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: "Enter an address",
      proximity: {
        longitude: 25.033933287859334,
        latitude: 121.56526214602783,
      },
    });
    // Add the geocoder to the map
    map.addControl(geocoder);

    map.on("load", () => {
      map.addSource("single-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
      map.addLayer({
        id: "point",
        source: "single-point",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#448ee4",
        },
      });

      geocoder.on("result", (e) => {
        if (overLay.current) {
          overLay.current.classList.add("close");
        }
        setSearchResult({
          coordinates: e.result.center,
          name: e.result.place_name.split(",").slice(0, 2).join(" "),
        });
        map.getSource("single-point").setData(e.result.geometry);
      });
    });
  }, []);

  return (
    <>
      <Header />

      <div>
        <div class="flex items-center shadow-lg p-2 z-10">
          <Link href="/stored_loc">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/left.png"
              class="w-8 hover:cursor-pointer"
            />
          </Link>
        </div>

        <div class="flex relative " style={{ height: "100vh" }} id="map">
          Map
        </div>
      </div>
      <div
        ref={overLay}
        class="h-[5.5%] w-[-webkit-fill-available] flex flex-col absolute bottom-0 bg-white rounded-t-lg transition-[0.5s] ease-in"
      >
        <div class=" flex bg-black text-white w-[-webkit-fill-available] justify-center items-center py-2 rounded-t-lg ">
          Save Place
          <i
            class="fa-regular fa-circle-xmark absolute hover:cursor-pointer right-4 mt-1"
            onClick={() =>
              searchResult ? overLay.current.classList.toggle("close") : null
            }
          ></i>
        </div>
        <div class="flex flex-col pl-3 p-1">
          <small class="text-blue-600 font-light">Name</small>
          <input
            class=" text-[13px] outline-none py-1"
            placeholder="e.g Allen's Home"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <hr class="w-[97%] self-end" />
        <div class="flex flex-col pl-3 p-1">
          <small class="text-zinc-400 font-light">Address</small>
          <input
            class=" text-[13px] outline-none py-1"
            value={searchResult["name"]}
          />
        </div>
        <hr class="w-[-webkit-fill-available]" />

        <button
          onClick={() => {
            name && searchResult ? addPlace(name, searchResult["name"]) : null;
          }}
          class="text-[15px] bg-black text-white w-fit self-center p-savePlace m-auto transition-[0.5s] ease-in"
        >
          {name && searchResult ? (
            <Link href="/stored_loc">Save Place</Link>
          ) : (
            <div class="text-red-500">🅘 Invalid Name</div>
          )}
        </button>
      </div>
    </>
  );
};

export default stored_loc_add;
