import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

import mapboxgl from "mapbox-gl";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import clientPromise from "../lib/mongodb";
import Saved_Place from "./components/Saved_Place";
import Header from "./components/Head";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxsZW5zdW4xMTMiLCJhIjoiY2t5engyaHV4MG43ZjJvcm12cGhjZ3NzYiJ9.yddnnKrY3jf2ua-MbrRNow";

const search = ({ locations }) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const router = useRouter();
  const { place } = router.query;

  const pull_data = (data) => {
    setDropoff(data);
  };
  useEffect(() => {
    console.log(pickup);
    console.log(dropoff);
  }, [pickup]);

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: "Pickup Location",
    });
    geocoder.addTo("#input1");
    geocoder.on("result", (e) => {
      setPickup(e.result.place_name.split(",").slice(0, 2).join(" "));
    });

    setDropoff(place);
  }, []);

  return (
    <>
      <Header />
      <style jsx global>{`
        .mapboxgl-ctrl-geocoder {
          margin-left: 0;
          background: #f2f3f7;
          min-width: 100%;
        }

        .mapboxgl-ctrl-geocoder input[type="text"] {
          background: #f2f3f7;
          height: 0;
          padding: 12px 4px;
        }

        .mapboxgl-ctrl-geocoder input[type="text"]:focus {
          background: #e0e1e6;
        }
      `}</style>
      <div>
        <div className={styles.shadow}>
          <Link href="/">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/left.png"
              className={styles.back}
            />
          </Link>

          <div style={{ display: "flex", background: "white" }}>
            <div className={styles.FromTo}>
              <img
                src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png"
                className={styles.circle}
              />
              <img
                src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png"
                className={styles.string}
              />
              <img
                src="https://img.icons8.com/windows/50/000000/square-full.png"
                className={styles.cube}
              />
            </div>

            <div className={styles.InputBox}>
              <div id="input1"></div>

              <input
                placeholder="Where TO?"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className={styles.Input}
              />
            </div>
            <FontAwesomeIcon icon={faPlus} className={styles.plus} />
          </div>
        </div>

        <div className={styles.saved_place}>
          <Link href={{ pathname: "/stored_loc" }}>
            <div className={styles.saved_placeIn}>
              <FontAwesomeIcon icon={faStar} className={styles.star} />
              <div className={styles.storedLocT}>Saved Places</div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className={styles.storedLocE}
              />
            </div>
          </Link>
        </div>
        <hr class="w-[-webkit-fill-available] border-0 border-t-[6px] " />

        <Saved_Place locations={locations} slice={3} func={pull_data} />

        <Link
          href={{
            pathname: "/confirm",
            query: {
              pickup: pickup,
              dropoff: dropoff,
            },
          }}
        >
          <button
            className={
              pickup && dropoff ? styles.ConfirmBtn : styles.ConfirmBtnDis
            }
          >
            Confirm Locations
          </button>
        </Link>
        {pickup && dropoff ? (
          ""
        ) : (
          <div className={styles.warning}>🅘 PLEASE ENTER VALID ADDRESS</div>
        )}
      </div>
    </>
  );
};

export default search;

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db("Uber-Clone");

  let locations = await db.collection("stored_locations").find({}).toArray();
  locations = JSON.parse(JSON.stringify(locations));

  return {
    props: { locations },
  };
}
