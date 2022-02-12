import React from "react";
import Link from "next/link";
import Header from "./components/Head";
import clientPromise from "../lib/mongodb";

import Saved_Place from "./components/Saved_Place";

const stored_loc = ({ locations }) => {
  return (
    <>
      <Header />

      <div class="flex items-center shadow-md p-2">
        <Link href="/search">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/left.png"
            class="w-8 hover:cursor-pointer"
          />
        </Link>
        <div class="font-poppin text-base ml-2"> Choose a Place</div>
      </div>

      <Saved_Place locations={locations} />

      <Link href="/stored_loc_add">
        <div class="flex items-center justify-between py-1 hover:cursor-pointer">
          <div class="flex flex-col pl-4">
            <div class="text-xs text-blue-800">Add Saved Place</div>
            <div class="text-star-grey text-xs">
              Get to your favorite destination faster
            </div>
          </div>
          <i class="fas fa-chevron-right fill-current text-star-grey pr-3"></i>
        </div>
      </Link>

      <hr class="w-[-webkit-fill-available]" />
    </>
  );
};

export default stored_loc;

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db("Uber-Clone");

  let locations = await db.collection("stored_locations").find({}).toArray();
  locations = JSON.parse(JSON.stringify(locations));

  return {
    props: { locations },
  };
}
