import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Saved_Place = ({ locations, slice = 10, func = null }) => {
  const [place, setPlace] = useState("");

  useEffect(() => {
    func ? func(place) : null;
  }, [place]);

  return (
    <div>
      {locations.slice(0, slice).map((location) => {
        return (
          <Link
            href={{ pathname: place ? "/search" : "", query: { place: place } }}
          >
            <a>
              <div
                class="flex items-center p-[6px] pl-3 hover:cursor-pointer"
                key={location._id}
                onClick={() => {
                  setPlace(location.address);
                }}
              >
                <FontAwesomeIcon icon={faStar} className={styles.star} />

                <div class="flex flex-col pl-1">
                  <div class="font-medium text-[13px]">{location.name}</div>
                  <div class="text-star-grey text-xs">{location.address}</div>
                </div>
              </div>
              <hr class="w-[-webkit-fill-available]" />
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default Saved_Place;
