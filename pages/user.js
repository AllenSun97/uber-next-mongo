import styles from "../styles/Home.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faWallet,
  faClock,
  faChevronDown,
  faEnvelope,
  faTicketAlt,
  faGrinTears,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "./contexts/AuthContext";
import Link from "next/link";

const user = () => {
  const { user } = useAuth();
  return (
    <div>
      <Link href="/">
        <FontAwesomeIcon icon={faChevronDown} className={styles.userBack} />
      </Link>
      <div class="flex justify-between items-center px-4">
        <div class="text-2xl font-bold">{user.name}</div>
        <img src={user && user.photoUrl} class="h-12 rounded-full" />
      </div>
      <div className={styles.box}>
        <div className={styles.userBtn}>
          <FontAwesomeIcon icon={faHandshake} className={styles.userIcon} />
          <text>Help</text>
        </div>

        <div className={styles.userBtn}>
          <FontAwesomeIcon icon={faWallet} className={styles.userIcon} />
          <text>Wallet</text>
        </div>
        <div className={styles.userBtn}>
          <FontAwesomeIcon icon={faClock} className={styles.userIcon} />
          <text>Trips</text>
        </div>
      </div>

      <hr class="w-[-webkit-fill-available] border-0 border-t-[6px] mt-2" />
      <FontAwesomeIcon icon={faEnvelope} />
      <FontAwesomeIcon icon={faTicketAlt} />
      <FontAwesomeIcon icon={faGrinTears} />
    </div>
  );
};

export default user;
