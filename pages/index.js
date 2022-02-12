import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import Map from "./components/Map";

import clientPromise from "../lib/mongodb";

export default function Home({ isConnected }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
    });
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <Map />
        <div className={styles.actionItems}>
          <div className={styles.header}>
            <div className={styles.box}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
                className={styles.uber}
              />
              <div>
                <img
                  src={user && user.photoUrl}
                  className={styles.user}
                  onClick={() => signOut(auth)}
                />
                <div className={styles.userName}>{user && user.name}</div>
              </div>
            </div>
            <div className={styles.box}>
              <Link href="/search">
                <div className={styles.btn}>
                  <img
                    src="https://i.ibb.co/cyvcpfF/uberx.png"
                    className={styles.uberIcon}
                  />
                  <text>Ride</text>
                </div>
              </Link>
              <div className={styles.btn}>
                <img
                  src="https://i.ibb.co/n776JLm/bike.png"
                  className={styles.uberIcon}
                />
                <text>2-Wheels</text>
              </div>
              <div className={styles.btn}>
                <img
                  src="https://i.ibb.co/5RjchBg/uberschedule.png"
                  className={styles.uberIcon}
                />
                <text>Reserve</text>
              </div>
            </div>
            <Link href="/search">
              <div className={styles.whereTo}>Where to?</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
