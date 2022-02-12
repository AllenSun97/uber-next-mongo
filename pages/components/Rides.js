import React from "react";
import styles from "../../styles/Home.module.css";
import { carList } from "../api/carList";

const Rides = () => {
  return (
    <>
      <div className={styles.choose}>Choose a ride or swipe up for more</div>
      <div className={styles.actionItems}>
        <div className={styles.ridebox}>
          {carList.map((car) => {
            return (
              <div className={styles.onecar}>
                <div style={{ display: "flex" }}>
                  <img src={car.imgUrl} className={styles.choosecar} />
                  <div className={styles.choosecartxt}>
                    <text>{car.service}</text>
                    <text className={styles.minsaway}>15 mins away</text>
                  </div>
                </div>
                <div className={styles.price}>$24.20</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Rides;
