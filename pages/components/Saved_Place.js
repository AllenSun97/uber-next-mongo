import React, { useEffect, useState } from "react";
import Link from "next/link";

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
                class="flex items-center p-[6px] pl-1 hover:cursor-pointer"
                key={location._id}
                onClick={() => {
                  setPlace(location.address);
                }}
              >
                <i class="fas fa-star fill-current text-white bg-star-grey text-xs p-star mx-2 rounded-full"></i>
                <div class="flex flex-col">
                  <div class="font-bold text-xs">{location.name}</div>
                  <div class="text-star-grey text-[10px]">
                    {location.address}
                  </div>
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
