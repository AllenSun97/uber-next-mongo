import React from "react";
import styles from "../../styles/Home.module.css";
import { carList } from "../api/carList";

const Rides = ({ distance, setCar, setPrice }) => {
  const setInfo = (car) => {
    setCar(car.service);
    setPrice(((car.multiplier * distance) / 1000).toFixed(2));
  };

  return (
    <>
      <div class="font-mono text-xs bg-white py-2 text-center shadow-md font-yan">
        Choose a ride or swipe up for more
      </div>
      <div className={styles.actionItems}>
        <div className={styles.ridebox}>
          {carList.map((car) => {
            return (
              <div className={styles.onecar} onClick={() => setInfo(car)}>
                <div style={{ display: "flex" }}>
                  <img src={car.imgUrl} className={styles.choosecar} />
                  <div className={styles.choosecartxt}>
                    <text>{car.service}</text>
                    <text className={styles.minsaway}>
                      {car.minsaway} mins away
                    </text>
                  </div>
                </div>
                <div className={styles.price}>
                  $ {((car.multiplier * distance) / 1000).toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Rides;
