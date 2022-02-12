import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Header from "./components/Head";
import Link from "next/link";
import { useRouter } from "next/router";
import clientPromise from "../lib/mongodb";
import Saved_Place from "./components/Saved_Place";

const search = ({ locations }) => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const router = useRouter();
  const { place } = router.query;

  const pull_data = (data) => {
    console.log("pulll");
    setDropoff(data);
  };

  useEffect(() => {
    console.log("It's placeee");
    setDropoff(place);
  }, []);

  return (
    <>
      <Header />

      <div>
        <div className={styles.shadow}>
          <Link href="/">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/left.png"
              class="w-8 mx-2 pt-2 hover:cursor-pointer"
            />
          </Link>

          <div style={{ display: "flex", background: "white" }}>
            <div className={styles.FromTo}>
              <img
                src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png"
                class="w-[7px] h-[7px] relative left-[11px]"
              />
              <img
                src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png"
                class="w-9 h-6 relative left-[6px] "
              />
              <img
                src="https://img.icons8.com/windows/50/000000/square-full.png"
                class="w-2 h-2 relative left-[11px]"
              />
            </div>

            <div className={styles.InputBox}>
              <input
                placeholder="Current Location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                class="bg-[#f2f3f7] text-xs mb-2 outline-none rounded-sm p-1 focus:bg-[#e0e1e6]"
              />
              <input
                placeholder="Where TO?"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                class="bg-[#f2f3f7] text-xs mb-2 outline-none rounded-sm p-1 focus:bg-[#e0e1e6]"
              />
            </div>
            <i class="fa-solid fa-plus  bg-[#ebecf1] h-fit m-1 mt-3 mr-2 p-2 rounded-full "></i>
          </div>
        </div>

        <div class="flex px-[5px] py-[10px] items-center hover:cursor-pointer">
          <Link href={{ pathname: "/stored_loc" }}>
            <div class="flex items-center ">
              <i class="fas fa-star fill-current text-white bg-star-grey text-xs p-star ml-2 rounded-full"></i>
              <div class="text-Poppins pl-[6px] font-bold text-xs">
                Stored Places
              </div>
              <i class="fa-solid fa-chevron-right absolute  right-4 fill-current text-gray-400 text-xs"></i>
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
