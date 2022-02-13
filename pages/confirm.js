import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Map from "./components/Map";
import Rides from "./components/Rides";

import { useAuth } from "./contexts/AuthContext";

const confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;
  const { getUser } = useAuth();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distance, setDistance] = useState(1);
  const [car, setCar] = useState("UberX");
  const [price, setPrice] = useState(0);
  const [result, setResult] = useState("");

  const addTrip = async (pickup, dropoff, car, price) => {
    const userName = getUser().displayName;
    const data = await fetch(
      `http://localhost:3000/api/addTrip?user=${userName}&from=${pickup}&to=${dropoff}&car=${car}&price=${price}`
    ).then((res) => setResult(res));
  };

  const getFrom = (location) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiYWxsZW5zdW4xMTMiLCJhIjoiY2t5engyaHV4MG43ZjJvcm12cGhjZ3NzYiJ9.yddnnKrY3jf2ua-MbrRNow",
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => setFrom(data.features[0].center));
  };

  const getTo = (location) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiYWxsZW5zdW4xMTMiLCJhIjoiY2t5engyaHV4MG43ZjJvcm12cGhjZ3NzYiJ9.yddnnKrY3jf2ua-MbrRNow",
          limit: 1,
        })
    )
      .then((res) => res.json())
      .then((data) => setTo(data.features[0].center));
  };

  useEffect(() => {
    getFrom(pickup);
    getTo(dropoff);
  }, [pickup, dropoff]);

  return (
    <div class="h-[100vh] flex flex-col bg-white">
      <Link href="/search">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/left.png"
          className={styles.back1}
        />
      </Link>
      <Map
        pickup={from}
        setPickup={setFrom}
        dropoff={to}
        setDropoff={setTo}
        setDistance={setDistance}
        distance={distance}
        result={result}
      />
      <Rides
        distance={distance}
        setCar={setCar}
        price={price}
        setPrice={setPrice}
      />
      <hr class="w-[-webkit-fill-available]" />
      <button
        class="w-5/6 bg-black text-slate-100  py-1 px-[2px] self-center my-2"
        onClick={() => addTrip(pickup, dropoff, car, price)}
      >
        Confirm {car}
      </button>
    </div>
  );
};

export default confirm;
