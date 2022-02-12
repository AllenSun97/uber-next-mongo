import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        className={styles.uber1}
      />
      <div className={styles.loginTxt}>LOG IN TO ACCESS YOUR ACCOUNT</div>
      <img
        src="https://i.ibb.co/CsV9RYZ/login-image.png"
        className={styles.loginImg}
      />
      <button
        className={styles.Signin}
        onClick={() => signInWithPopup(auth, provider)}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
