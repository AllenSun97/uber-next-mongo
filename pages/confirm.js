import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Map from "./components/Map";
import Rides from "./components/Rides";
import { useRouter } from "next/router";
import Link from "next/link";

const confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

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
    <div className={styles.container}>
      <Link href="/search">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/left.png"
          className={styles.back1}
        />
      </Link>
      <Map pickup={from} setPickup={setFrom} dropoff={to} setDropoff={setTo} />
      <Rides />
    </div>
  );
};

export default confirm;
