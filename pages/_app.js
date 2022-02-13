import "mapbox-gl/dist/mapbox-gl.css";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "./contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Yantramanav:wght@100;300;400;500;700;900&display=swap");
        body {
          height: 100vh;
          overflow: hidden;
        }
        * {
          box-sizing: border-box;
          font-family: "Yantramanav", sans-serif;
        }
      `}</style>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
